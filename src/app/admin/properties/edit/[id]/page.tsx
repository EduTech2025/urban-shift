// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { Property } from "@/types";
// import { propertyService } from "@/lib/services/propertyService";
// import { toast } from "sonner";
// import AddPropertyPage from "@/app/add-property/"; // move your form to a reusable component

// const EditPropertyPage: React.FC = () => {
//   const router = useRouter();
//   const params = useParams();
//   const propertyId = Number(params.id);

//   const [formData, setFormData] = useState<Partial<Property> | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!propertyId) return;

//     const fetchProperty = async () => {
//       try {
//         const data = await propertyService.getById(propertyId);
//         setFormData(data);
//       } catch (error) {
//         console.error("Failed to fetch property:", error);
//         toast.error("Failed to load property data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProperty();
//   }, [propertyId]);

//   const handleSubmit = async (updatedData: Partial<Property>) => {
//     try {
//       await propertyService.update(propertyId, updatedData);
//       toast.success("Property updated successfully!");
//       router.push("/admin/properties");
//     } catch (error) {
//       console.error("Error updating property:", error);
//       toast.error("Failed to update property");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-gray-500">Loading property details...</p>
//       </div>
//     );
//   }

//   if (!formData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-red-500">Property not found.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#faf3ee] py-8 px-4">
//       <div className="max-w-4xl mx-auto">
//         <AddPropertyPage
//           initialData={formData}
//           onSubmit={handleSubmit}
//           isEdit={true}
//         />
//       </div>
//     </div>
//   );
// };

// export default EditPropertyPage;
