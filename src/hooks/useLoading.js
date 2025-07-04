import { useState, useEffect } from 'react';

/**
 * A custom hook to simulate a loading state for a given duration.
 * @param {number} duration - The duration of the loading state in milliseconds.
 * @param {any[]} [deps=[]] - An array of dependencies that will re-trigger the loading state.
 * @returns {boolean} - A boolean indicating if the component is in a loading state.
 */
export const useLoading = (duration, deps = []) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, duration);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return loading;
};