import { ApplicationError } from "@/types/ApplicationError";
import { reportApplicationError } from "@/utils/ReportApplicationError";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

export const priceApi = axios.create({
  baseURL: "https://daily-price-updates-744a4ed25af1.herokuapp.com/prices/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

priceApi.interceptors.request.use(
  (config) => {
    const token =
      "7b7bb51876405bf634a09b7b8d14b0ed768df56a5a827cf26b4bb93b0f79a07e22";

    if (token) {
      config.headers!["X-API-Key"] = token;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

priceApi.interceptors.response.use(
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
