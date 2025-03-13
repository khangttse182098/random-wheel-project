import api from "../../config/axios";
import { UpdateEventData } from "../../models/event";

// Danh sách sự kiện
export const getEventList = () => {
  return api.get("/api/v1/events");
};

// Sửa sự kiện
export const updateEvent = (id: string, data: UpdateEventData) => {
  return api.put(`/api/v1/events/${id}`, data);
};
