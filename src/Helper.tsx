import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { HoursMinutesSeconds, TokenPayload } from "./Interfaces";

export const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    var err = error.response;
    if (Array.isArray(err?.data.errors)) {
      for (let val of err?.data.errors) {
        toast.warning(val.description);
      }
    } else if (typeof err?.data.errors === "object") {
      for (let e in err.data.errors) {
        toast.warning(err.data.errors[e][0]);
      }
    } else if (err?.data) {
      toast.warning(err.data);
    } else if (err?.status == 401) {
      toast.warning("Not logged in");
      window.history.pushState({}, "LoginPage", "/login");
    } else if (err) {
      toast.warning(err.data);
    }
  }
};

export function getPriorityColor(priority: number): string {
  const colors: { [key: number]: string } = {
    1: "#ccffcc", // Light Green
    2: "#b3ffb3", // Pale Green
    3: "#99ff99", // Light Lime
    4: "#80ff80", // Yellow Green
    5: "#ffff99", // Light Yellow
    6: "#ffcc66", // Light Orange
    7: "#ff8844", // Orange
    8: "#ff6666", // Dark Orange
    9: "#ff4d4d", // Red Orange
    10: "#ff3333", // Strong Red
  };

  return colors[priority] || "#ffffff"; // White
}

export function getContrastColor(hexColor: string): "black" | "white" {
  const hex = hexColor.replace("#", "");

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? "black" : "white";
}

export function convertSeconds(seconds: number): HoursMinutesSeconds {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return { hours, minutes, seconds: remainingSeconds };
}

export function convertSecondsToString(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours)
    return `${hours} horas ${minutes} minutos ${remainingSeconds} segundos`;
  else return `${minutes} minutos ${remainingSeconds} segundos`;
}

export function convertSecondsToStringMinimalist(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours) return `${hours}h ${minutes}m ${Math.floor(remainingSeconds)}s`;
  else return `${minutes}m ${Math.floor(remainingSeconds)}s`;
}

export function convertHoursMinutesSecondsToStringMinimalist(
  time: HoursMinutesSeconds
): string {
  return `${time.hours}h ${String(time.minutes).padStart(2, "0")}m ${String(
    time.seconds
  ).padStart(2, "0")}s`;
}

export function sumHoursMinutesSeconds(
  time1: HoursMinutesSeconds,
  time2: HoursMinutesSeconds
): HoursMinutesSeconds {
  let totalSeconds = Math.floor(time1.seconds + time2.seconds);
  let totalMinutes =
    time1.minutes + time2.minutes + Math.floor(totalSeconds / 60);
  let totalHours = time1.hours + time2.hours + Math.floor(totalMinutes / 60);

  totalSeconds = totalSeconds % 60;
  totalMinutes = totalMinutes % 60;

  return {
    hours: totalHours,
    minutes: totalMinutes,
    seconds: totalSeconds,
  };
}

export function addOneSecond(time: HoursMinutesSeconds): HoursMinutesSeconds {
  time.seconds += 1;

  if (time.seconds >= 60) {
    time.seconds = 0;
    time.minutes += 1;
    if (time.minutes >= 60) {
      time.minutes = 0;
      time.hours += 1;
    }
  }

  return time;
}

export const getToken = (): TokenPayload | null => {
  const token = localStorage.getItem("token");

  if (token != null) {
    const decoded = jwtDecode<TokenPayload>(token);
    return decoded;
  }

  return null;
};

export const formatDateTimeLocal = (date: Date) => {
  var tzoffset = new Date().getTimezoneOffset() * 60000;
  return new Date(date.getTime() - tzoffset).toISOString().slice(0, 16); // Formats the date as 'YYYY-MM-DDTHH:mm'
};

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
