import { useState } from "react";

export function useLocaleStorage(key, initialValue) {
  const [data, setData] = useState(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue);
    } else {
      localStorage.setItem(key, JSON.stringify(initialValue));
      return initialValue;
    }
  });

  function updateStorage(value) {
    localStorage.setItem(key, JSON.stringify(value));
    setData(value);
  }

  return [data, updateStorage];
}
