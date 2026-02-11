import { ApplicationError } from "@/types/ApplicationError";
import { reportApplicationError } from "@/utils/ReportApplicationError";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

export const gaioApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL_GAIO}`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

gaioApi.interceptors.request.use(
  (config) => {
    const token = process.env.NEXT_PUBLIC_TOKEN_GAIO
    if (token) {
      config.headers!["Authorization"] = `Bearer ${token}`;
    }
    if (config.data instanceof FormData) {
      delete config.headers!["Content-Type"];
      delete config.headers!["Accept"];
    }

    return config;
  },
  (error) => Promise.reject(error)
);


gaioApi.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error instanceof AxiosError) {
      const applicationError: ApplicationError = {
        type: "REQUEST",
        text: error.request.response,
        request: {
          url: error.config?.url,
          params: error.config?.params,
          statusCode: error.request?.status,
          body: error.config?.data,
          method: error.config?.method,
          headers: error.config?.headers,
          userAgent: navigator.userAgent,
        },
      };
      reportApplicationError(applicationError);
      if (error.response?.status === 401 && window.location.pathname !== "/") {
        toast.error("Sessão expirada. Por favor, faça login novamente");
        setTimeout(() => {
          window.location.href = "/";
          localStorage.clear();
        }, 2000);
      } else if (error.response?.data?.display_text) {
        error.response.headers.customErrorMessage =
          error.response?.data?.display_text;
      }
    }

    return Promise.reject(error);
  }
);
