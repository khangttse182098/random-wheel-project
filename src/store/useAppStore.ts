import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Participant } from "../models/participant";
import { EventSettingData } from "../models/eventSetting";
import { RewardData } from "../models/reward";
import { WinnerData } from "../models/winner";

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
  eventSetting: EventSettingData | null;
  participantList: Participant[] | null;
  rewardList: RewardData[] | null;
  winnerList: WinnerData[] | null;
  setWinnerList: (newWinnerList: WinnerData[]) => void;
  setRewardList: (newRewardList: RewardData[]) => void;
  setEventSetting: (newEventSetting: EventSettingData) => void;
  setParticipantList: (newParticipantList: Participant[]) => void;
  setUser: (newUser: UserType) => void;
  addChooseEvent: (event: EventType) => void;
  resetAllEventData: () => void;
}

const useAppStore = create<StoreType>()(
  persist(
    (set) => ({
      user: {
        userName: "",
        password: "",
      },
      chooseEvent: null,
      eventSetting: null,
      participantList: null,
      rewardList: null,
      winnerList: null,
      setWinnerList: (newWinnerList) => set({ winnerList: newWinnerList }),
      setRewardList: (newRewardList) => set({ rewardList: newRewardList }),
      setEventSetting: (newEventSetting) =>
        set({ eventSetting: newEventSetting }),
      setParticipantList: (newParticipantList) =>
        set({ participantList: newParticipantList }),
      setUser: (newUser) => set({ user: newUser }),
      addChooseEvent: (event) => set({ chooseEvent: event }),
      resetAllEventData: () =>
        set({
          chooseEvent: null,
          eventSetting: null,
          participantList: null,
          rewardList: null,
          winnerList: null,
        }),
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
