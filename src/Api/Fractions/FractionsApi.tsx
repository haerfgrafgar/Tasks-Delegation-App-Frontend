import axios from "axios";
import { FractionOfTime } from "../../Interfaces";
import { BASE_API, handleApiRequestError } from "../api";

//---------------------------------------------------GET---------------------------------------------------//

export const GetUserCurrentFraction = async (username: string) => {
  try {
    const data = await axios.get<FractionOfTime>(
      BASE_API + `/fractions/username/${username}`
    );
    return data.data;
  } catch (error) {
    handleApiRequestError(error);
  }
};

export const GetUserDayHistory = async (username: string, day: Date) => {
  try {
    const data = await axios.get<FractionOfTime>(
      BASE_API + `/fractions/history/${username}`,
      {
        params: {
          day: day,
        },
      }
    );
    return data.data;
  } catch (error) {
    handleApiRequestError(error);
  }
};

//---------------------------------------------------POST---------------------------------------------------//

export const StartFraction = async (workId: number) => {
  try {
    const data = await axios.post<FractionOfTime>(
      BASE_API + `/fractions/start/${workId}`
    );
    return data.data;
  } catch (error) {
    handleApiRequestError(error);
  }
};

//---------------------------------------------------PUT---------------------------------------------------//

export const StopFraction = async () => {
  try {
    const data = await axios.put<FractionOfTime>(BASE_API + `/fractions/stop`);
    return data.data;
  } catch (error) {
    handleApiRequestError(error);
  }
};

//---------------------------------------------------DELETE---------------------------------------------------//
