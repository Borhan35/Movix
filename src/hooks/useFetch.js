import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  //   useEffect(() => {
  //     setLoading("loading...");
  //     setData(null);
  //     setError(null);

  //     fetchDataFromApi(url)
  //       .then((res) => {
  //         setLoading(false);
  //         setData(res);
  //       })
  //       .catch((err) => {
  //         setLoading(false);
  //         setError("Something went wrong!");
  //       });
  //   }, [url]);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading("loading...");
      setData(null);
      setError(null);

      const [response, errorResponse] = await Promise.allSettled([
        fetchDataFromApi(url),
        new Promise((resolve) =>
          setTimeout(() => resolve({ timeout: true }), 200)
        ),
      ]);

      if (isMounted) {
        if (response.status === "fulfilled") {
          const data = await response.value;
          setData(data);
          setError(null);
        } else {
          setError(
            errorResponse.status === "fulfilled"
              ? new Error("Network error")
              : errorResponse.reason
          );
        }
        setLoading(false);
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
