import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface EventType {
  id: string;
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

const useAppStore = create<StoreType>()(
  persist(
    (set) => ({
      chooseEvent: null,
      isSlotSpinning: false,
      addChooseEvent: (event) => set({ chooseEvent: event }),
      setIsSlotSpinning: (value) => set({ isSlotSpinning: value }),
    }),
    {
      name: "EventData",
      storage: createJSONStorage(() => sessionStorage),

      merge: (persistedState, currentState) => ({
        ...currentState,
        ...(persistedState as StoreType),
      }),
    }
  )
);

export default useAppStore;
