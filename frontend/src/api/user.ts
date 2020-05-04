import axios from "axios";
import { UserState } from "../states/user";

const url: string = "http://localhost:3000/user";

export const fetchUserDetail = (id: string) => {
  return axios.get(`${url}/fetch`, {
    params: {
      Id: id,
    },
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
  });
};
export const searchUserApi = async (email: string) => {
  try {
    const apiresult = await axios.get(`${url}/fetch/email`, {
      params: {
        Email: email,
      },
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    });
    return { isSuccess: true, response: apiresult, error: null };
  } catch (error) {
    return { isSuccess: false, response: null, error: error.response };
  }
};
export const registerUser = (input: UserState) => {
  return axios.post(
    `${url}/register`,
    {
      Id: input.uid,
      Name: input.name,
      Email: input.email,
      Description: input.description,
    },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    }
  );
};
