import { AxiosResponse, AxiosError } from "axios";

export interface ApiResponse {
  isSuccess: boolean;
  response: AxiosResponse;
  error: AxiosResponse;
}
