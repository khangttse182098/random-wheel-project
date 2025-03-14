import api from "../../config/axios";
import { LoginData } from "../../models/login";

export const loginFunction = (data: LoginData) => {
    return api.post("/api/v1/account/login", data);
  };