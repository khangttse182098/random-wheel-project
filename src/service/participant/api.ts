import api from "../../config/axios";
import {
  CreateParticipantData,
  UpdateParticipantData,
} from "../../models/participant";

// Danh sách người tham dự
export const getParticipantList = (eventId: string) => {
  return api.get(`/api/v1/participants/event/${eventId}`);
};

export const updateParticipant = (id: string, data: UpdateParticipantData) => {
  return api.put(`/api/v1/participants/${id}`, data);
};

export const createParticipant = (data: CreateParticipantData[]) => {
  return api.post("/api/v1/participants/list", data);
};

export const deleteParticipant = (ids: string[]) => {
  return api.delete("/api/v1/participants/delete", { data: ids });
};

// Hủy danh sách trúng giải
export const deleteWinnerList = (ids: string[]) => {
  return api.delete("/api/v1/reward-winner/event/delete-winner-list", {
    data: ids,
  });
};
