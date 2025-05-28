import { AxiosInstance } from "axios";

export interface ApiResponse<T = unknown> {
  error: any;
  success: boolean;
  message: string;
  data?: T;
}

export interface UseAxiosResponse {
  axios: AxiosInstance;
  loading: boolean;
}

export interface NetworkPayload {
  hideErrorMessage?: boolean;
}
