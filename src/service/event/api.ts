import api from "../../config/axios";
import { CreateEventData, UpdateEventData } from "../../models/event";
import { UpdateEventSettingData } from "../../models/eventSetting";
import { CreateRewardData } from "../../models/reward";
import { SaveWinnerData } from "../../models/winner";

// Danh sách sự kiện
export const getEventList = () => {
  return api.get("/api/v1/events");
};

// Sửa sự kiện
export const updateEvent = (id: string, data: UpdateEventData) => {
  return api.put(`/api/v1/events/${id}`, data);
};

// Thêm sự kiện
export const addEvent = (data: CreateEventData) => {
  return api.post("/api/v1/events", data);
};

// Cấu hình sự kiện
export const getConfigureEvent = (eventId: string) => {
  return api.get(`/api/v1/event-settings/event/${eventId}`);
};

// Sửa cấu hình sự kiện
export const updateEventSetting = (
  eventSettingId: number,
  data: UpdateEventSettingData
) => {
  return api.put(`/api/v1/event-settings/${eventSettingId}`, data);
};

// Giải quay
export const getRewardList = (eventId: string) => {
  return api.get(`/api/v1/rewards/event/${eventId}`);
};

//danh sách trúng giải
export const getWinnerList = (eventId: string) => {
  return api.get(`/api/v1/reward-winner/event/${eventId}`);
};

// Tạo giải thưởng
export const createAward = (data: CreateRewardData) => {
  return api.post("/api/v1/rewards", data);
};

//Lấy số lượt quay dựa trên giải
export const getRollingNumber = (rewardId: number) => {
  return api.get(`/api/v1/rewards/${rewardId}`);
};

// Lưu người trúng thưởng
export const saveWinner = (data: SaveWinnerData) => {
  return api.post("/api/v1/reward-winner/event/winner-list", data);
};
