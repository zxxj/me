import { create } from 'zustand';
import { UserState } from './type';
import { persist } from 'zustand/middleware';

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      token: '',
      userInfo: null,
      setToken: (token) => set({ token }),
      setUserInfo: (user) => set({ userInfo: user }),
      clearState: () => set({ token: '', userInfo: null }),
    }),
    {
      name: 'blog-auth',
      partialize: (state) => ({
        token: state.token,
        userInfo: state.userInfo,
      }),
    },
  ),
);

export { useUserStore };
