
import liff from "@line/liff";
import { create } from "zustand";
import { useCartStore } from "./useCartStore";

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
  isUserLoading: boolean;
  isLoggedIn: boolean;
  initUser: () => Promise<void>;
  logout: () => void;
  // updateUser: (userData: Partial<User>) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isUserLoading: false,
  isLoggedIn: false,
  initUser: async () => {
    set({ isUserLoading: true });
    try {
      const liffId = process.env.NEXT_PUBLIC_LIFF_ID;

      if (!liffId) {
        throw new Error(
          "LIFF ID is not defined. Check your environment variables."
        );
      }

      await liff.init({ liffId });

      if (!liff.isLoggedIn()) {
        liff.login();
      } else {

        const profile = await liff.getProfile();
        const accessToken = liff.getAccessToken();


        set({
          user: {
            id: profile.userId,
            displayName: profile.displayName,
            pictureUrl: profile.pictureUrl,
          },
          isLoggedIn: true,
        });

        localStorage.setItem("id_token", accessToken);

        useCartStore.getState().fetchCart()
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      set({ isUserLoading: false });
    }
  },
  logout: () => {
    try {
      set({ isUserLoading: true });
      localStorage.removeItem("id_token");
      liff.logout();
      set({ user: null });
    } catch (error) {
      console.log("Error logging out:", error);
    } finally {
      set({ isUserLoading: false });
    }
  }

}));
