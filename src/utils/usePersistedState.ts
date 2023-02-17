import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Response<T> = [T, Dispatch<SetStateAction<T>>];

interface MyObject {
  [key: string]: unknown;
}

interface ObjectWithUnknownValues extends Record<string, unknown> {}

/**
 * It returns a stateful value, and a function to update it. Both values are initialized to the value
 * of the localStorage item with the given key, or the initialState argument if the key doesn't exist.
 * The returned state value is also kept in sync with localStorage
 * @param {string} key - string - The key to store the state in localStorage.
 * @param {T} initialState - The initial state of the value you want to persist.
 * @returns An array with two elements.
 */
function usePersistedState<T extends MyObject>(
  key: string,
  initialState: T
): Response<T> {
  const [state, setState] = useState(() => {
    const storageValue = localStorage.getItem(key);

    if (storageValue) {
      try {
        const parsedValue = parseJSON(storageValue, initialState);
        return parsedValue;
      } catch (error) {
        console.warn(`Failed to parse value`);
      }
    }

    return initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

function parseJSON<T>(
  json: string,
  expectedType: T & ObjectWithUnknownValues
): T {
  const parsedValue = JSON.parse(json);
  const keys = Object.keys(expectedType);
  const actualKeys = Object.keys(parsedValue);

  if (
    keys.length !== actualKeys.length ||
    !keys.every((key) => actualKeys.includes(key))
  ) {
    throw new Error("JSON does not match expected type");
  }

  return parsedValue as T;
}

export default usePersistedState;
