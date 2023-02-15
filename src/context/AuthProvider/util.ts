import { IUser } from "./types";

export function setUserLocalStorage(user: IUser | null) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function getUserLocalStorage(): IUser | null {
  const json = localStorage.getItem("user");

  if (!json) {
    return null;
  }

  const object = JSON.parse(json);

  return object ?? null;
}

