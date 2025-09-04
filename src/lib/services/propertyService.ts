import api from "../axios"; // your axios instance
import { Property } from "@/types";

const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const propertyService = {
  // Fetch all properties
  getAll: async (): Promise<Property[]> => {
    const response = await api.get(`/properties/`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  },

  // Fetch a single property by ID
  getById: async (id: number): Promise<Property> => {
    const response = await api.get(
      `/properties/${id}/`,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  },

  // Create a new property
  createProperty: async (propertyData: Partial<Property>): Promise<Property> => {
    const response = await api.post(
      `/properties/create/`,
      propertyData,
      { headers: getAuthHeaders() }
    );
    return response.data;
  },

  // Update an existing property
  updateProperty: async (
    id: number,
    propertyData: Partial<Property>
  ): Promise<Property> => {
    const response = await api.put(
      `/properties/${id}/update/`,
      propertyData,
      { headers: getAuthHeaders() }
    );
    return response.data;
  },

  // Delete a property
  deleteProperty: async (id: number): Promise<void> => {
    await api.delete(`/properties/${id}/delete/`, {
      headers: getAuthHeaders(),
    });
  },
};
