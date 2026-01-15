// store/useAuthStore.ts
import { create } from 'zustand'

interface AuthState {
  userName: string;
  login: (name: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userName: '', 
  login: (name) => set({ userName: name }),
}))