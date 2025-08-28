import api from "../axios";
import type { PropertyFilters } from "@/types";

export const propertyFiltersService = {
  async getAll(): Promise<PropertyFilters[]> {
    const res = await api.get<PropertyFilters[]>("/property-filters");
    return res.data;
  },
};
