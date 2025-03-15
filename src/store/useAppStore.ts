import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Participant } from "../models/participant";

export interface EventType {
  id: string;
  name: string;
  created_at: string;
  expiry_date: string;
}

export interface UserType {
  userName: string;
  password: string;
}

interface StoreType {
  chooseEvent: EventType | null;
  user: UserType;
  participantList: Participant[];
  setParticipantList: (newParticipantList: Participant[]) => void;
  setUser: (newUser: UserType) => void;
  addChooseEvent: (event: EventType) => void;
}

const useAppStore = create<StoreType>()(
  persist(
    (set) => ({
      chooseEvent: null,
      user: {
        userName: "",
        password: "",
      },
      participantList: [],
      setParticipantList: (newParticipantList) =>
        set({ participantList: newParticipantList }),
      setUser: (newUser) => set({ user: newUser }),
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
