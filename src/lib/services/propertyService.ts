import api from "../axios"; // your axios instance
import { Property } from "@/types";

const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const propertyService = {
  // Fetch all properties
  getAll: async (): Promise<Property[]> => {
    const response = await api.get("http://localhost:8000/api/properties/", {
      headers: getAuthHeaders(),
    });
    return response.data;
  },

  // Fetch a single property by ID
  getById: async (id: number): Promise<Property> => {
    const response = await api.get(
      `http://localhost:8000/api/properties/${id}/`,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  },

  // Create a new property
  create: async (propertyData: Partial<Property>): Promise<Property> => {
    const response = await api.post(
      "http://localhost:8000/api/properties/create/",
      propertyData,
      { headers: getAuthHeaders() }
    );
    return response.data;
  },

  // Update an existing property
  update: async (
    id: number,
    propertyData: Partial<Property>
  ): Promise<Property> => {
    const response = await api.put(
      `http://localhost:8000/api/properties/${id}/update/`,
      propertyData,
      { headers: getAuthHeaders() }
    );
    return response.data;
  },

  // Delete a property
  delete: async (id: number): Promise<void> => {
    await api.delete(`http://localhost:8000/api/properties/${id}/delete/`, {
      headers: getAuthHeaders(),
    });
  },
};
