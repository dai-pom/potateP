import axios, { AxiosError } from "axios";
import { EventState } from "../states/event/event";
import { AddMemberState } from "../actions/event/event";

const url: string = "http://localhost:3000/event";
export const fetchEventApi = async (uid: string) => {
  try {
    const apiresult = await axios.get(url, {
      params: {
        Id: uid,
      },
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    });
    return { isSuccess: true, response: apiresult, error: null };
  } catch (error) {
    return { isSuccess: false, data: null, error: error.response };
  }
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

export const fetchMemberApi = async (eid: number) => {
  try {
    const apiresult = await axios.get(`${url}/member`, {
      params: {
        Id: eid,
      },
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    });
    return { isSuccess: true, response: apiresult, error: null };
  } catch (error) {
    return { isSuccess: false, data: null, error: error.response };
  }
};

export const addMemberApi = async (req: AddMemberState) => {
  try {
    const apiresult = await axios.post(`${url}/member`, req, {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    });
    return { isSuccess: true, response: apiresult, error: null };
  } catch (error) {
    return { isSuccess: false, response: null, error: error.response };
  }
};
