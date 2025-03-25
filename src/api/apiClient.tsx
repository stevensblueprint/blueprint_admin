import axios, {
  type AxiosRequestConfig,
  type Method,
  type AxiosResponse,
} from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "",
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
  },
  withCredentials: true,
} satisfies AxiosRequestConfig);

const request = async (
  method: Method,
  url: string,
  params?: unknown
): Promise<AxiosResponse> => {
  return await apiClient.request({ method, url });
};

export default request;
