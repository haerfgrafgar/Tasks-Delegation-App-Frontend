import axios from "axios";
import {
  CalendarWorkDto,
  CorrigirWorkDto,
  CreateWorkRequestDto,
  TimeRangeDto,
  Work,
} from "../../Interfaces";
import { BASE_API, handleApiRequestError } from "../api";

//---------------------------------------------------GET---------------------------------------------------//

export const GetInProgressWork = async () => {
  try {
    const data = await axios.get<Work>(BASE_API + "/work/atual");
    return data.data;
  } catch (error) {
    handleApiRequestError(error);
  }
};

export const GetWorkById = async (workId: number) => {
  try {
    const data = await axios.get<Work>(BASE_API + `/work/${workId}`);
    return data.data;
  } catch (error) {
    handleApiRequestError(error);
  }
};

export const GetUserInProgressWork = async (username: string) => {
  try {
    const data = await axios.get<Work>(BASE_API + `/work/atual/${username}`);
    return data.data;
  } catch (error) {
    handleApiRequestError(error);
  }
};

export const GetExecutingWorks = async () => {
  try {
    const data = await axios.get<Work[]>(BASE_API + "/work/executando");
    return data.data;
  } catch (error) {
    handleApiRequestError(error);
  }
};

export const GetCoordenatingWorks = async () => {
  try {
    const data = await axios.get<Work[]>(BASE_API + "/work/coordenando");
    return data.data;
  } catch (error) {
    handleApiRequestError(error);
  }
};

export const GetCalendarCoordenatingWorks = async () => {
  try {
    const data = await axios.get<CalendarWorkDto[]>(
      BASE_API + "/work/calendar/coordenando"
    );
    return data.data;
  } catch (error) {
    handleApiRequestError(error);
  }
};

export const GetCalendarExecutingWorks = async () => {
  try {
    const data = await axios.get<CalendarWorkDto[]>(
      BASE_API + "/work/calendar/executando"
    );
    return data.data;
  } catch (error) {
    handleApiRequestError(error);
  }
};

export const GetFinishedWorks = async () => {
  try {
    const data = await axios.get<Work[]>(BASE_API + "/work/finalizado");
    return data.data;
  } catch (error) {
    handleApiRequestError(error);
  }
};

export const GetUserExecutingWorks = async (username: string) => {
  try {
    const data = await axios.get<Work[]>(
      BASE_API + `/work/executando/${username}`
    );
    return data.data;
  } catch (error) {
    handleApiRequestError(error);
  }
};

export const GetUserCalendarExecutingWorks = async (
  username: string,
  timeRange: TimeRangeDto
) => {
  try {
    const data = await axios.get<CalendarWorkDto[]>(
      BASE_API + `/work/calendar/executando/${username}`,
      { params: timeRange }
    );
    return data.data;
  } catch (error) {
    handleApiRequestError(error);
  }
};

//---------------------------------------------------POST---------------------------------------------------//

export const CriarWork = async (workDto: CreateWorkRequestDto) => {
  try {
    const data = await axios.post<Work>(BASE_API + `/work`, workDto);
    return data.data;
  } catch (error) {
    handleApiRequestError(error);
  }
};

//---------------------------------------------------PUT---------------------------------------------------//

export const FinalizarWork = async (workId: number) => {
  try {
    const data = await axios.put<Work>(BASE_API + `/work/finalizar/${workId}`);
    return data.data;
  } catch (error) {
    handleApiRequestError(error);
  }
};

export const CorrigirWork = async (
  workDto: CorrigirWorkDto,
  workId: number
) => {
  try {
    const data = await axios.put<Work>(
      BASE_API + `/work/corrigir/${workId}`,
      workDto
    );
    return data.data;
  } catch (error) {
    handleApiRequestError(error);
  }
};

//---------------------------------------------------DELETE---------------------------------------------------//
