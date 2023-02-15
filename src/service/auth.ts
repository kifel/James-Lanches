import api from "./api";

export const apiRequest = async () => {
  try {
    const response = await api.get("/users/logged");
    return response.data;
  } catch (error: any) {
    if (error.message === "Failed to refresh token") {
      return "Failed to refresh token";
    }
  }
};

export const isAuthenticatedAdmin = async () => {
  const data = await apiRequest();
  if (data && data.roles && data.roles.length > 0) {
    for (let i = 0; i < data.roles.length; i++) {
      if (data.roles[i].name === "ROLE_ADMIN") {
        return "true";
      }
    }
  }
  if (data === "Failed to refresh token") {
    return "Failed to refresh token";
  }
  return "false";
};

export const isAuthenticated = async () => {
  try {
    const response = await api.get("/users/logged");
    return response.data ? true : false;
  } catch (error) {
    return "false";
  }
};
