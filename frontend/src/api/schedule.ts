import axios from "axios";
import { ScheduleState, fetchScheduleProps } from "../states/event/schedule";

const url: string = "http://localhost:3000/event/schedule";

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
