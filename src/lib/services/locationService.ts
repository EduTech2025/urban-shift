import api from "../axios";

export const locationService = {
  async getAll(): Promise<string[]> {
    const res = await api.get<string[]>("/all-locations");
    return res.data;
  },
};
