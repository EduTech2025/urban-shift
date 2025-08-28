import api from "../axios";
import type { Property } from "@/types";

export const propertyService = {
  async getAll(): Promise<Property[]> {
    const res = await api.get<Property[]>("/properties");
    return res.data;
  },
};
