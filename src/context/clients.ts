import {
  QueryClient,
} from "@tanstack/react-query";
import axios, {
  AxiosInstance,
  AxiosResponse,
} from "axios";
import {
  selectUserAgent,
} from "@/slices/userAgent";
import {
  isServerSide,
} from "@/utils";
import {
  store,
} from "./store";


const initClient = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config) => {
      if (isServerSide) {
        config.headers.setUserAgent(
          selectUserAgent(store.getState()).raw ?? "",
        );
      }

      return Promise.resolve(config);
    },
    (err: unknown) => {
      return Promise.reject(err);
    },
  );

  instance.interceptors.response.use(
    (res: AxiosResponse) => res,
    (err: unknown) => {
      return Promise.reject(err);
    },
  );

  return instance;
};

export const kakaopayClient = initClient(
  axios.create({
    baseURL: "http://localhost:8080",
    timeout: 5000,
  }),
);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount: number, error: unknown): boolean => {
        if (axios.isAxiosError(error)) {
          if (
            // in case it's network error(timeout, firewall, SSL version incompatible)
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
