import { ContactFormData } from "@/types";
import api from "../axios";

export const contactService = {
  sendMessage: async (formData: ContactFormData): Promise<void> => {
    // In a real app, this would call your backend API
    await api.post("/contact", formData);
  },
};