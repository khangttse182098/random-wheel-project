import api from "../../config/axios";
import { UpdateParticipantData } from "../../models/participant";

// Danh sách người tham dự
export const getParticipantList = () => {
  return api.get("/api/v1/participants");
};

export const updateParticipant = (id: string, data: UpdateParticipantData) => {
  return api.put(`/api/v1/participants/${id}`, data);
};
