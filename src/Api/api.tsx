import axios from "axios";

export const BASE_API = "http://localhost:5071/api";

export const handleApiRequestError = (error: any) => {
  if (axios.isAxiosError(error)) {
    console.log("error message: ", error.message);
    return error.message;
  } else {
    console.log("unexpected error: ", error);
    return "UNEXPECTED ERROR!";
  }
};
