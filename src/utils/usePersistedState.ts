import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Response<T> = [T, Dispatch<SetStateAction<T>>];

/**
 * It returns a stateful value, and a function to update it. Both values are initialized to the value
 * of the localStorage item with the given key, or the initialState argument if the key doesn't exist.
 * The returned state value is also kept in sync with localStorage
 * @param {string} key - string - The key to store the state in localStorage.
 * @param {T} initialState - The initial state of the value you want to persist.
 * @returns An array with two elements.
 */
function usePersistedState<T>(key: string, initialState: T): Response<T> {
  const [state, setState] = useState(() => {
    const storageValue = localStorage.getItem(key);

    if (storageValue) {
      return JSON.parse(storageValue);
    }

    return initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default usePersistedState;
