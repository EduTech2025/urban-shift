import api from "../axios";
import { Property } from "@/types";

interface ToggleFavoriteResponse {
  message: string;
}

const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("Not authenticated");
  return { Authorization: `Bearer ${token}` };
};

export const favoriteService = {
  // Get all favorite properties for the logged-in user
  getFavorites: async (): Promise<Property[]> => {
    const response = await api.get(
      "http://localhost:8000/api/properties/favorites/",
      { headers: getAuthHeaders() }
    );
    return response.data.favorites;
  },

  // Add a property to favorites
  addFavorite: async (propertyId: number): Promise<ToggleFavoriteResponse> => {
    const response = await api.post(
      `http://localhost:8000/api/properties/favorites/add/${propertyId}/`,
      {},
      { headers: getAuthHeaders() }
    );
    return response.data;
  },

  // Remove a property from favorites
  removeFavorite: async (
    propertyId: number
  ): Promise<ToggleFavoriteResponse> => {
    const response = await api.post(
      `http://localhost:8000/api/properties/favorites/remove/${propertyId}/`,
      {},
      { headers: getAuthHeaders() }
    );
    return response.data;
  },

  // Toggle favorite: if already favorited remove, else add
  toggleFavorite: async (propertyId: number, isFavorite: boolean) => {
    if (isFavorite) {
      return favoriteService.removeFavorite(propertyId);
    } else {
      return favoriteService.addFavorite(propertyId);
    }
  },
};
