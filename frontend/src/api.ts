import axios from "axios";
import { UserState } from "./states/user";

const url: string = "http://localhost:3000/user/register";

export const registerUser = (input: UserState) => {
  return axios.post(
    url,
    {
      Id: input.uid,
      Name: input.name,
      Description: input.description,
    },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    }
  );
};
