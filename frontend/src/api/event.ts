import axios from "axios";
import { EventState } from "../states/event/event";

const url: string = "http://localhost:3000/event";
export const fetchEventApi = (uid: string) => {
  return axios.get(url, {
    params: {
      Id: uid,
    },
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
  });
};
export const addEventApi = (event: EventState) => {
  const data = {
    ...event,
    StartDate: event.StartDate.format("YYYY-MM-DD"),
    EndDate: event.EndDate.format("YYYY-MM-DD"),
  };
  return axios.post(url, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
  });
};
