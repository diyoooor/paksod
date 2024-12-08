import axiosInstance from "@/lib/axiosInstance";
import { create } from "zustand";

export interface Product {
  _id: string;
  name: string;
  prices: Price[];
  description: string;
  image: string;
  category: string[];
  type: string;
  otherNames: string[]
}

interface Price {
  id: number;
  value: number;
  label: string;
}

interface ProductState {
  products: Product[];
  isLoading: boolean;
  fetchProducts: () => void;
  fetchHighlights: () => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  isLoading: false,
  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/api/products");
      set({
        products: response.data,
        isLoading: false,
      })
    } catch (error) {
      console.error(`error => `, error)
    } finally {
      set({ isLoading: false });
    }
  },

  fetchHighlights: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/api/products/highlight");
      set({
        products: response.data,
        isLoading: false,
      })
    } catch (error) {
      console.error(`error => `, error)
    } finally {
      set({ isLoading: false });
    }
  }
}));
