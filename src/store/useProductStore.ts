import axiosInstance from "@/lib/axiosInstance";
import { create } from "zustand";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
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
  fetchProducts: () => {
    const mockProducts: Product[] = [
      {
        id: "1",
        name: "Product 1",
        price: 100,
        description: "Description for product 1",
        image: "/images/product1.jpg",
        category: "Category 1",
        stock: 10,
      },
      {
        id: "2",
        name: "Product 2",
        price: 200,
        description: "Description for product 2",
        image: "/images/product2.jpg",
        category: "Category 2",
        stock: 5,
      },
    ];
    set({ products: mockProducts });
  },

  fetchHighlights: async () => {

    set({ isLoading: true });
    try {

      const response = await axiosInstance.get("/api/products/highlight");

      console.log(`response => `, response)

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
