import { create } from "zustand";

export interface User {
  id: string;
  name: string;
  email: string;
  address: string;
}

interface UserState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,

  login: (user) => {
    set({ user });
  },

  logout: () => {
    set({ user: null });
  },

  updateUser: (userData) => {
    set((state) => ({
      user: { ...state.user, ...userData } as User,
    }));
  },
}));
