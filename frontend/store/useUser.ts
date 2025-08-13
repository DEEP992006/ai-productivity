import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserStore = {
  user: number;
  setUser: (id: number) => void;
  logout: () => void;
};

const useUser = create<UserStore>()(
  persist(
    (set) => ({
      user: 0,
      setUser: (id) => set({ user: id }),
      logout: () => set({ user: 0 }),
    }),
    {
      name: "user-store", // Key in localStorage
      partialize: (state) => ({ user: state.user }), // Save only user
    }
  )
);

export default useUser;
