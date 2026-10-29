/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ ﷺ InshaAllah */

import { create } from "zustand";

export const useTokenStore = create((set) => ({
  token: undefined,
  isLoggedOut: true,
  Login(token) {
    set({ token, isLoggedOut: false })
  },
  Loggout() {
    set({ token: undefined, isLoggedOut: true })
  }
}));

