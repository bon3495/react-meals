import { useState, useCallback } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const { url, body, headers, method } = requestConfig;
      const res = await fetch(url, {
        method: method || 'GET',
        body: body ? JSON.stringify(body) : null,
        headers: headers ? headers : {},
      });

      if (!res.ok) throw new Error('Loading meals failed. Try again!');
      const data = await res.json();
      applyData(data);
    } catch (error) {
      setError(error.message || 'Something went wrong!');
    }
    setIsLoading(false);
  }, []);

  return {
    sendRequest,
    error,
    isLoading,
  };
};

export default useHttp;
