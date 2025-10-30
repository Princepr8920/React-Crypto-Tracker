import axios from "axios";
import { useEffect, useState } from "react";

const useGetHookEffect = (url) => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => makeGetRequest(), 1800000); // auto-refresh in every 30 minutes

    async function makeGetRequest() {
      try {
        const res = await axios.get(url);
        setResponse(res);
      } catch (err) {
        setResponse(err);
      }
    }

    makeGetRequest();
    return () => clearInterval(interval);
  }, [url]);

  return response;
};

export default useGetHookEffect;
