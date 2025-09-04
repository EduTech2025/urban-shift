// src/app/add-property/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { Property } from "@/types";
import { propertyService } from "@/lib/services/propertyService";
import { toast } from "sonner";
import {
  Upload,
  MapPin,
  Home,
  DollarSign,
  Image as LucidImage,
  Check,
  X,
} from "lucide-react";

const AddPropertyPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const [propertyId, setPropertyId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState<Partial<Property>>({
    title: "",
    subtitle: "",
    description: "",
    location: "",
    location_map: "",
    main_image: "",
    show_image: [],
    price: 0,
    price_unit: "Lakhs",
    propertyType: "Residential Apartment",
    bhk_rk: "2BHK",
    furnishing: "Semi-furnished",
    availability: "Ready to Move",
    size: 0,
    size_unit: "sqft",
    has_parking_space: false,
    in_sector: false,
    is_featured: false,
  });

  const [dragOver, setDragOver] = useState(false);
  const [showImageFolder, setShowImageFolder] = useState("");
  const [extractingImages, setExtractingImages] = useState(false);

  const [hasError, setHasError] = useState(false);

  // Check if we're in edit mode
  useEffect(() => {
    if (params.id) {
      const id = Array.isArray(params.id) ? params.id[0] : params.id;
      setIsEditMode(true);
      setPropertyId(id);
      fetchPropertyData(Number(id));
    } else {
      setLoading(false);
    }
  }, [params]);

  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-200">
        <span className="text-gray-500">No image available</span>
      </div>
    );
  }

  const fetchPropertyData = async (id: number) => {
    try {
      setLoading(true);
      const propertyData = await propertyService.getById(id);
      setFormData(propertyData);
    } catch (error) {
      console.error("Error fetching property data:", error);
      toast.error("Failed to load property data");
    } finally {
      setLoading(false);
    }
  };

  // Helper function to convert Google Drive URLs
  const convertGoogleDriveUrl = (url: string): string => {
    if (!url) return url;

    // Handle file URLs
    const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (fileMatch) {
      return `https://drive.google.com/uc?export=view&id=${fileMatch[1]}`;
    }

    return url;
  };

  // Helper function to extract image URLs from Google Drive folder
  const extractImagesFromFolder = async (
    folderUrl: string
  ): Promise<string[]> => {
    try {
      // Extract folder ID from URL
      const folderMatch = folderUrl.match(/\/folders\/([a-zA-Z0-9_-]+)/);
      if (!folderMatch) {
        throw new Error("Invalid Google Drive folder URL");
      }

      const folderId = folderMatch[1];

      // Try to access the public folder view
      const publicFolderUrl = `https://drive.google.com/drive/folders/${folderId}`;

      try {
        // Use a proxy service to bypass CORS
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
          publicFolderUrl
        )}`;
        const response = await fetch(proxyUrl);

        if (!response.ok) {
          throw new Error("Failed to access folder");
        }

        const data = await response.json();
        const htmlContent = data.contents;

        // Parse the HTML to extract file IDs
        const fileIdMatches = htmlContent.match(
          /data-id="([a-zA-Z0-9_-]{25,})"/g
        );

        if (!fileIdMatches) {
          throw new Error("No files found or folder is not public");
        }

        // Extract file IDs and filter for images
        const fileIds = fileIdMatches
          .map((match: string) => {
            const idMatch = match.match(/data-id="([a-zA-Z0-9_-]+)"/);
            return idMatch ? idMatch[1] : null;
          })
          .filter(Boolean);

        // For each file ID, we need to check if it's an image
        // We'll convert all found files to direct URLs and let the browser handle invalid ones
        const imageUrls = fileIds.map(
          (id: string) => `https://drive.google.com/uc?export=view&id=${id}`
        );

        // Filter out duplicates
        const uniqueUrls = [...new Set(imageUrls)] as string[];

        if (uniqueUrls.length === 0) {
          throw new Error("No image files found in folder");
        }

        return uniqueUrls;
      } catch (proxyError) {
        // Fallback: Try alternative method using the embed view
        console.error("Proxy method failed, trying embed view...", proxyError);

        const embedUrl = `https://drive.google.com/embeddedfolderview?id=${folderId}#list`;
        const embedProxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
          embedUrl
        )}`;

        const embedResponse = await fetch(embedProxyUrl);
        if (!embedResponse.ok) {
          throw new Error("Folder may not be public or accessible");
        }

        const embedData = await embedResponse.json();
        const embedHtml = embedData.contents;

        // Extract file information from embed view
        const fileMatches = embedHtml.match(/"([a-zA-Z0-9_-]{25,})"/g);

        if (!fileMatches) {
          throw new Error(
            "Could not extract files from folder. Make sure the folder is public."
          );
        }

        // Define interface for file ID extraction
        interface FileIdExtractor {
          (match: string): string;
        }

        const fileIds: string[] = fileMatches
          .map(((match: string) => {
            return match.replace(/"/g, "");
          }) as FileIdExtractor)
          .filter((id: string) => id.length >= 25); // Filter valid Drive file IDs

        // Remove duplicates and convert to image URLs
        const uniqueFileIds = [...new Set(fileIds)];
        const imageUrls = uniqueFileIds
          .slice(0, 20)
          .map((id) => `https://drive.google.com/uc?export=view&id=${id}`);

        return imageUrls;
      }
    } catch (error) {
      console.error("Error extracting images:", error);
      let errorMessage = "Unknown error";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      throw new Error(`Failed to extract images: ${errorMessage}`);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else if (type === "number") {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      // Auto-convert Google Drive URLs for main_image
      const convertedValue =
        name === "main_image" ? convertGoogleDriveUrl(value) : value;
      setFormData({ ...formData, [name]: convertedValue });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const droppedText = e.dataTransfer.getData("text/plain");
    if (droppedText && droppedText.includes("drive.google.com")) {
      const convertedUrl = convertGoogleDriveUrl(droppedText);
      setFormData({ ...formData, main_image: convertedUrl });
      toast.success("Image URL added and converted!");
    }
  };

  const handleShowImageFolderAdd = async () => {
    if (!showImageFolder.trim()) {
      toast.error("Please enter a folder URL");
      return;
    }

    if (!showImageFolder.includes("drive.google.com/drive/folders/")) {
      toast.error("Please enter a valid Google Drive folder link");
      return;
    }

    setExtractingImages(true);

    try {
      const extractedImages = await extractImagesFromFolder(showImageFolder);
      const currentImages = formData.show_image || [];

      setFormData({
        ...formData,
        show_image: [...currentImages, ...extractedImages],
      });

      setShowImageFolder("");
      toast.success(`Added ${extractedImages.length} images from folder!`);
    } catch (error) {
      console.error("Error extracting images from folder:", error);
      toast.error("Failed to extract images from folder");
    } finally {
      setExtractingImages(false);
    }
  };

  const removeShowImage = (index: number) => {
    const currentImages = formData.show_image || [];
    const updatedImages = currentImages.filter((_, i) => i !== index);
    setFormData({ ...formData, show_image: updatedImages });
  };

  const validateForm = (data: typeof formData) => {
    if (!data.title?.trim()) return "Title is required";
    if (!data.propertyType) return "Property type is required";
    if (!data.bhk_rk) return "BHK / RK selection is required";
    if (!data.availability) return "Availability is required";
    if (!data.furnishing) return "Furnishing type is required";

    if (data.price != undefined && data.price < 0)
      return "Price must be greater than 0";
    if (!data.price_unit) return "Price unit is required";

    if (!data.main_image) return "Main image URL is required";

    // location_map is optional, but if provided, validate it
    if (data.location_map?.trim()) {
      try {
        new URL(data.location_map);
      } catch {
        return "Location map must be a valid URL";
      }
    }

    return null; // ✅ all good
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errorMsg = validateForm(formData);
    if (errorMsg) {
      toast.error(errorMsg);
      return; // stop submission
    }

    try {
      if (isEditMode && propertyId) {
        await propertyService.updateProperty(Number(propertyId), formData);
        toast.success("Property updated successfully!");
      } else {
        console.log(formData);

        await propertyService.createProperty(formData);

        toast.success("Property added successfully!");
      }
      router.push("/");
    } catch (error) {
      console.error("Error saving property:", error);
      toast.error(
        <div>
          Failed to {isEditMode ? "update" : "add"} property
          <br />
          Ensure all required fields (*) are filled correctly.
        </div>
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf3ee] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading property data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf3ee] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Home className="w-6 h-6 text-orange-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">
              {isEditMode ? "Edit Property" : "Add New Property"}
            </h1>
          </div>
          <p className="text-gray-600">
            {isEditMode
              ? "Update the details of your property"
              : "Fill in the details below to list your property"}
          </p>
        </div>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Luxury 3BHK Apartment in Sector 14"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subtitle
                </label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  placeholder="e.g., Prime location with modern amenities"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe the property features, amenities, and unique selling points..."
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-orange-600" />
              Location Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Sector 14, Gurgaon"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Map URL
                </label>
                <input
                  type="url"
                  name="location_map"
                  value={formData.location_map}
                  pattern="https?://.+"
                  onChange={handleChange}
                  placeholder="Google Maps link (optional)"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <LucidImage className="w-5 h-5 text-orange-600" />
              Property Images
            </h2>

            <div className="space-y-4">
              {/* Main Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Main Property Image *
                </label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg p-6 transition-all duration-200 ${
                    dragOver
                      ? "border-orange-400 bg-orange-50"
                      : "border-gray-300 hover:border-orange-300"
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <Upload className="w-8 h-8 text-gray-400" />
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-700">
                        Drop Google Drive image URL here or paste below
                      </p>
                      <p className="text-xs text-gray-500">
                        Supports Google Drive image links
                      </p>
                    </div>
                  </div>
                </div>
                <input
                  type="url"
                  name="main_image"
                  value={formData.main_image}
                  onChange={handleChange}
                  required
                  placeholder="https://drive.google.com/file/..."
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 mt-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Show Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Images
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  Add Google Drive folder containing multiple images
                </p>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={showImageFolder}
                    onChange={(e) => setShowImageFolder(e.target.value)}
                    placeholder="https://drive.google.com/drive/folders/1ABC...XYZ"
                    className="flex-1 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={handleShowImageFolderAdd}
                    disabled={extractingImages}
                    className={`px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-2 font-medium ${
                      extractingImages
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-orange-600 text-white hover:bg-orange-700"
                    }`}
                  >
                    {extractingImages ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Upload className="w-4 h-4" />
                    )}
                    {extractingImages ? "Extracting..." : "Extract Images"}
                  </button>
                </div>

                {/* Display extracted images */}
                {formData.show_image && formData.show_image.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Extracted Images ({formData.show_image.length})
                    </p>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {formData.show_image.map((imageUrl, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-100"
                        >
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                            <Image
                              src={imageUrl}
                              alt={`Property image ${index + 1}`}
                              width={500} // ✅ required in Next.js
                              height={300} // ✅ required in Next.js
                              className="w-full h-full object-cover"
                              onError={() => setHasError(true)} // ✅ handle fallback
                            />
                            <LucidImage className="w-6 h-6 text-gray-400 hidden" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-700 truncate">
                              Image {index + 1}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {imageUrl}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeShowImage(index)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Home className="w-5 h-5 text-orange-600" />
              Property Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type
                </label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white"
                >
                  <option value="Residential Apartment">
                    Residential Apartment
                  </option>
                  <option value="Commercial">Commercial</option>
                  <option value="Working Space">Working Space</option>
                  <option value="Rental">Rental</option>
                  <option value="Affordables">Affordables</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  BHK/RK Configuration
                </label>
                <select
                  name="bhk_rk"
                  value={formData.bhk_rk}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white"
                >
                  <option value="1BHK">1BHK</option>
                  <option value="2BHK">2BHK</option>
                  <option value="3BHK">3BHK</option>
                  <option value="4BHK">4BHK</option>
                  <option value="5BHK">5BHK</option>
                  <option value="RK">RK</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Furnishing Status
                </label>
                <select
                  name="furnishing"
                  value={formData.furnishing}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white"
                >
                  <option value="Furnished">Furnished</option>
                  <option value="Semi-furnished">Semi-furnished</option>
                  <option value="Unfurnished">Unfurnished</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability
                </label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white"
                >
                  <option value="Ready to Move">Ready to Move</option>
                  <option value="Under Construction">Under Construction</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Size
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    placeholder="1200"
                    className="flex-1 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  />
                  <select
                    name="size_unit"
                    value={formData.size_unit}
                    onChange={handleChange}
                    className="border border-gray-200 rounded-lg px-3 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white"
                  >
                    <option value="sqft">sq ft</option>
                    <option value="sqm">sq m</option>
                    <option value="yards">yards</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-orange-600" />
              Pricing Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  placeholder="50"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Unit
                </label>
                <select
                  name="price_unit"
                  value={formData.price_unit}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white"
                >
                  <option value="Thousand">Thousand</option>
                  <option value="Lakhs">Lakhs</option>
                  <option value="Crores">Crores</option>
                </select>
              </div>
            </div>

            <div className="mt-3 p-3 bg-orange-50 rounded-lg">
              <p className="text-sm text-orange-700">
                <span className="font-medium">Price Preview:</span> ₹
                {formData.price} {formData.price_unit}
              </p>
            </div>
          </div>

          {/* Features & Amenities */}
          <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              Features & Amenities
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="has_parking_space"
                      checked={formData.has_parking_space}
                      onChange={handleChange}
                      className="sr-only"
                      id="parking"
                    />
                    <label
                      htmlFor="parking"
                      className={`flex items-center justify-center w-5 h-5 border-2 rounded cursor-pointer transition-all duration-200 ${
                        formData.has_parking_space
                          ? "bg-orange-600 border-orange-600"
                          : "border-gray-300 hover:border-orange-400"
                      }`}
                    >
                      {formData.has_parking_space && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </label>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Parking Space Available
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="in_sector"
                      checked={formData.in_sector}
                      onChange={handleChange}
                      className="sr-only"
                      id="sector"
                    />
                    <label
                      htmlFor="sector"
                      className={`flex items-center justify-center w-5 h-5 border-2 rounded cursor-pointer transition-all duration-200 ${
                        formData.in_sector
                          ? "bg-orange-600 border-orange-600"
                          : "border-gray-300 hover:border-orange-400"
                      }`}
                    >
                      {formData.in_sector && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </label>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Located in Sector
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="is_featured"
                      checked={formData.is_featured}
                      onChange={handleChange}
                      className="sr-only"
                      id="featured"
                    />
                    <label
                      htmlFor="featured"
                      className={`flex items-center justify-center w-5 h-5 border-2 rounded cursor-pointer transition-all duration-200 ${
                        formData.is_featured
                          ? "bg-orange-600 border-orange-600"
                          : "border-gray-300 hover:border-orange-400"
                      }`}
                    >
                      {formData.is_featured && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </label>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Featured Property
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                type="button"
                onClick={() => router.push("/")}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:from-orange-700 hover:to-orange-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {isEditMode ? "Update Property" : "Add Property"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPropertyPage;
