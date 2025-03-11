import { create } from "zustand";

export interface EventType {
  name: string;
  created_at: string;
  expiry_date: string;
}

interface StoreType {
  chooseEvent: EventType | null;
  addChooseEvent: (event: EventType) => void;
}

const useAppStore = create<StoreType>((set) => ({
  chooseEvent: null,
  addChooseEvent: (event) => set({ chooseEvent: event }),
}));

export default useAppStore;
