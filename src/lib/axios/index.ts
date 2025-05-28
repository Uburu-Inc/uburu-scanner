import Axios, { AxiosError, AxiosRequestHeaders, AxiosResponse } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLogout } from "@/app/hooks/logout";
import { ApiResponse, NetworkPayload, UseAxiosResponse } from "./type";

export function useNetworkRequest({
  hideErrorMessage,
}: NetworkPayload): UseAxiosResponse {
  const { logout } = useLogout();
  const [loading, setLoading] = useState<boolean>(false);

  let token = "";
  if (typeof window !== "undefined") {
    const storedToken = window.sessionStorage.getItem("app_info");
    if (storedToken) token = JSON.parse(storedToken).token;
  }

  const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  });

  axios.interceptors.request.use(function (config) {
    setLoading(true);
    if (token) {
      const headers = config.headers ?? ({} as AxiosRequestHeaders);
      headers.Authorization = `Token ${token}`;
      headers["Cache-Control-Enabled"] = "false";
      config.headers = headers;
    }
    return config;
  });

  axios.interceptors.response.use(
    function (response: AxiosResponse) {
      setLoading(false);
      return response.data;
    },

    function (error: AxiosError<ApiResponse>) {
      setLoading(false);
      if (!error.response) {
        toast.error("Connection error");
        throw error;
      }

      const response = error.response;

      if (response.status >= 500) {
        toast.error("An unknown server error occurred");
      } else if (response.status === 404) {
        if (!hideErrorMessage) toast.error("Resource not found");
      } else if (response.status === 401) {
        if (!hideErrorMessage) toast.error(response.data.error.detail);
        logout();
        return;
      }
      if (!hideErrorMessage) toast.error(response.data.message);
      throw error;
    }
  );

  return { axios, loading };
}
