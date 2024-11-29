import axiosInstance from "@/lib/axiosInstance";
import { create } from "zustand";

export interface User {
  id: string;
  displayName: string;
  pictureUrl: string;
  address?: string;
  shopName?: string;
  phoneNumber?: string;
}

interface UserState {
  user: User | null;
  isUSerLoading: boolean;
  getUser: () => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isUSerLoading: false,
  getUser: async () => {
    set({ isUSerLoading: true });
    try {
      const response = await axiosInstance.get("/api/users");
      const res = response.data;

      set({ user: res });
    } catch (error) {
      console.error("Error fetching cart:", error);
      set({ isUSerLoading: false });
    }
  },

  logout: () => {
    set({ user: null });
  },

  updateUser: async (userInfo) => {
    try {
      const { data } = await axiosInstance.put("/api/users", userInfo);
      set({ user: data });
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  },
}));
