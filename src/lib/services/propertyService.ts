import api from "../axios";
import type { Property } from "@/types";

export const propertyService = {
  async getAll(): Promise<Property[]> {
    const res = await api.get<Property[]>("/properties");
    return res.data;
  },

  getPropertyById: async (id: number): Promise<Property> => {
    const response = await api.get(`/property-filters?property_id=${id}`);
    const properties = response.data;
    return properties[0]; // Assuming unique IDs
  },

  saveProperty: async (propertyId: number): Promise<void> => {
    // This would call your backend API to save the property for the user
    await api.post("/user/saved-properties", { propertyId });
  },

  unsaveProperty: async (propertyId: number): Promise<void> => {
    await api.delete(`/user/saved-properties/${propertyId}`);
  },
};
