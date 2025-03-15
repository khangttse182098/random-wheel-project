import api from "../../config/axios";
import { CreateEventData, UpdateEventData } from "../../models/event";

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

// Giải quay
export const getRewardList = (eventId: string) => {
  return api.get(`/api/v1/rewards/event/${eventId}`);
};
