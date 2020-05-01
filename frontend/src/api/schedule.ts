import axios from "axios";
import { ScheduleState, fetchScheduleProps } from "../states/event/schedule";

const url: string = "http://localhost:3000/event/schedule";
export const deleteScheduleApi = (param: number) => {
  try {
    const apiresult = axios.delete(url, {
      params: {
        Id: param,
      },
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    });
    return { isSuccess: true, response: apiresult, error: null };
  } catch (error) {
    return { isSuccess: false, data: null, error: error.response };
  }
};

export const fetchScheduleApi = (param: fetchScheduleProps) => {
  return axios.get(url, {
    params: param,
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
  });
};

export const addScheduleApi = (schedule: ScheduleState) => {
  const data = {
    ...schedule,
    Date: schedule.Date.format("YYYY-MM-DD"),
    Start: schedule.Start.format("HH:mm"),
    End: schedule.End.format("HH:mm"),
  };
  return axios.post(url, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
  });
};
