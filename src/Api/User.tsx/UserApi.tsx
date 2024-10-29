import axios from "axios";
import { GeneralSituationResponseDto } from "../../Interfaces";
import { BASE_API, handleApiRequestError } from "../api";

export const GetAllUsersGeneralSituation = async () => {
  try {
    const data = await axios.get<GeneralSituationResponseDto[]>(
      BASE_API + `/user`
    );
    return data.data;
  } catch (error) {
    handleApiRequestError(error);
  }
};
