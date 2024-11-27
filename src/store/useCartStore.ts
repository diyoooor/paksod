import axiosInstance from "@/lib/axiosInstance";
import Swal from "sweetalert2";
import { create } from "zustand";

export interface CartItem {
  productId: string;
  priceId: number;
  quantity: number;
  unit: string;
  prices?: Array<Price>;
  image?: string;
  name?: string;
}

interface Price {
  id: number;
  value: number;
  label: string;
}

interface CartState {
  cartItems: CartItem[];
  totalItems: number;
  isCartLoading: boolean;
  addToCart: (
    productId: string,
    priceId: number,
    quantity: number,
    unit: string
  ) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  fetchCart: () => Promise<void>;
  saveCart: () => Promise<void>;
  initCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],
  totalItems: 0,
  isCartLoading: false,

  fetchCart: async () => {
    set({ isCartLoading: true });
    try {
      const response = await axiosInstance.get("/api/cart");
      const { products } = response.data;
      set({
        cartItems: products,
        totalItems: products.length,
        isCartLoading: false,
      });
    } catch (error) {
      console.error("Error fetching cart:", error);
      set({ isCartLoading: false });
    }
  },

  saveCart: async () => {
    const { cartItems } = get();
    try {
      await axiosInstance.post("/api/cart", { cartItems });
      console.log("Cart saved successfully!");
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  },

  initCart: () => {
    axiosInstance.post("/api/cart", { initCart: true });
    set({ cartItems: [], totalItems: 0 });
  },
  addToCart: (
    productId: string,
    priceId: number,
    quantity: number,
    unit: string
  ) => {
    const existingItems: CartItem[] = get().cartItems;
    const existingItemIndex = existingItems.findIndex(
      (item: CartItem) => item.productId === productId
    );

    const updatedItems: CartItem[] = [...existingItems];

    if (existingItemIndex > -1) {
      const existingItem = updatedItems[existingItemIndex];
      const newQuantity =
        quantity === 1
          ? existingItem.quantity + 1
          : quantity === -1
          ? existingItem.quantity - 1
          : existingItem.quantity + quantity;

      if (newQuantity < 1) {
        const confirmDelete = window.confirm(
          `Are you sure you want to remove ${existingItem.name} from the cart?`
        );
        if (confirmDelete) {
          updatedItems.splice(existingItemIndex, 1);
          axiosInstance.delete("/api/cart").then(() => {
            Swal.fire("ลบสำเร็จ", "", "success");
          });
        }
      } else {
        updatedItems[existingItemIndex] = {
          ...existingItem,
          priceId,
          quantity: newQuantity,
          unit,
        };
      }

      axiosInstance.put("/api/cart", {
        productId,
        priceId,
        quantity: newQuantity,
        unit,
      });
    } else {
      axiosInstance.post("/api/cart", {
        productId,
        priceId,
        quantity,
        unit,
      });
      updatedItems.push({ productId, priceId, quantity, unit });
    }

    set({ cartItems: updatedItems, totalItems: updatedItems.length });
  },

  removeFromCart: (productId) => {
    const updatedItems = get().cartItems.filter(
      (item) => item.productId !== productId
    );

    set({ cartItems: updatedItems });
    get().saveCart(); // Save updated cart to the server
  },

  clearCart: () => {
    set({ cartItems: [] });
    get().saveCart(); // Clear cart on the server
  },
}));
