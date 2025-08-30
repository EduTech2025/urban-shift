"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import PropertyDetailsPage from "@/components/property/PropertyDetailsPage";
import { Property } from "@/types";
import { propertyService } from "@/lib/services/propertyService";

const PropertyPage = () => {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const propertyId = parseInt(params.id as string);
        const propertyData = await propertyService.getById(
          propertyId
        );
        setProperty(propertyData);
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProperty();
    }
  }, [params.id]);

  const handleBack = () => {
    router.back();
  };

  const handleSaveProperty = async (propertyId: number) => {
    try {
      console.log("Saving property:", propertyId);
      // await propertyService.saveProperty(propertyId);
    } catch (error) {
      console.error("Error saving property:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Property Not Found
          </h2>
          <button
            onClick={handleBack}
            className="text-indigo-600 hover:text-indigo-700 flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <PropertyDetailsPage
      property={property}
      onBack={handleBack}
      onSaveProperty={handleSaveProperty}
    />
  );
};

export default PropertyPage;
