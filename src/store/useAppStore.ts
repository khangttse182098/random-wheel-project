import { create } from "zustand";

export interface EventType {
  name: string;
  created_at: string;
  expiry_date: string;
}

interface StoreType {
  chooseEvent: EventType | null;
  isSlotSpinning: boolean;
  addChooseEvent: (event: EventType) => void;
  setIsSlotSpinning: (value: boolean) => void;
}

const useAppStore = create<StoreType>((set) => ({
  chooseEvent: null,
  isSlotSpinning: false,
  addChooseEvent: (event) => set({ chooseEvent: event }),
  setIsSlotSpinning: (value) => set({ isSlotSpinning: value }),
}));

export default useAppStore;
