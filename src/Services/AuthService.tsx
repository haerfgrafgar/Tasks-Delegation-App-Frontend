import axios from "axios";
import { BASE_API } from "../Api/api";
import { handleError } from "../Helper";
import { UserProfileToken } from "../Models/User";

export const loginAPI = async (username: string, password: string) => {
  try {
    const data = await axios.post<UserProfileToken>(
      BASE_API + "/account/login",
      {
        username: username,
        password: password,
      }
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const registerAPI = async (
  email: string,
  username: string,
  password: string,
  position: string
) => {
  try {
    const data = await axios.post<UserProfileToken>(
      BASE_API + "account/register",
      {
        email: email,
        username: username,
        password: password,
        position: position,
      }
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};
