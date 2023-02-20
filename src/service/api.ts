import axios from "axios";
import {
  getUserLocalStorage,
  setUserLocalStorage
} from "../context/AuthProvider/util";

const API_BASE_URL = "https://james-api-production.up.railway.app/api";
const AUTH_ENDPOINTS = {
  SIGN_IN: "/auth/signin",
  REFRESH_TOKEN: "/auth/refreshtoken",
  CONFIRM_ACCOUNT: "/auth/confirm-account",
  RESET_PASSWORD: "/password-recovery/reset",
};

/* This is creating a new instance of axios with the baseURL and headers. */
const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* This is adding the access token to the header of the request. */
instance.interceptors.request.use(
  (config) => {
    const user = getUserLocalStorage();
    if (user !== null) {
      config.headers["Authorization"] = "Bearer " + user?.accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/* Intercepting the response and checking if the response is 401 (unauthorized) and if it is, it will
try to refresh the token. */
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const user = getUserLocalStorage();
    const originalConfig = err.config;

    if (
      originalConfig.url !== AUTH_ENDPOINTS.SIGN_IN &&
      err.response &&
      originalConfig.url !== AUTH_ENDPOINTS.REFRESH_TOKEN &&
      !originalConfig.url.startsWith(AUTH_ENDPOINTS.CONFIRM_ACCOUNT) &&
      !originalConfig.url.startsWith(AUTH_ENDPOINTS.RESET_PASSWORD)
    ) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await instance.post("/auth/refreshtoken", {
            refreshToken: user?.refreshToken,
          });
          setUserLocalStorage(rs.data);

          return instance(originalConfig);
        } catch (_error) {
          throw new Error("Failed to refresh token");
        }
      }
    }

    return Promise.reject(err);
  }
);

export default instance;
