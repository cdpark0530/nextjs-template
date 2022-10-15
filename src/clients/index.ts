import { origin } from "@/utils/app";
import { QueryClient } from "@tanstack/react-query";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const initClient = (instance: AxiosInstance) => {
  instance.defaults.headers = axios.defaults.headers;

  instance.interceptors.request.use(
    (config: AxiosRequestConfig) => Promise.resolve(config),
    (err: unknown) => {
      return Promise.reject(err);
    },
  );

  instance.interceptors.response.use(
    (res: AxiosResponse) => res,
    (err: unknown) => {
      if (axios.isAxiosError(err)) {
        err.message = err.response?.data?.errorMsg ?? err.message;
      }

      return Promise.reject(err);
    },
  );

  return instance;
};

let selfClient: AxiosInstance;

export const getSelfClient = (): AxiosInstance => {
  if (selfClient) {
    return selfClient;
  }

  selfClient = initClient(axios.create({
    baseURL: origin,
    timeout: 20000,
  }));

  return selfClient;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: (failureCount: number, error: unknown): boolean => {
        if (axios.isAxiosError(error)) {
          if (
            // 네트워크 에러(타임아웃, 방화벽, SSL)인 경우
            error.code && !error.response
            || Math.floor((error.response?.status ?? 500) / 100) === 4
          ) {
            return false;
          }
        }

        return failureCount < 2;
      },
    },
  },
});
