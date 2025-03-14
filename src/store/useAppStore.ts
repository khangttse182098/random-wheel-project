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
  addChooseEvent: (event: EventType) => void;
}

const useAppStore = create<StoreType>()(
  persist(
    (set) => ({
      chooseEvent: null,
      addChooseEvent: (event) => set({ chooseEvent: event }),
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
