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
  return axios.post(url, event, {
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
  });
};
