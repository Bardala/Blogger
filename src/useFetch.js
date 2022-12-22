import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      fetch(url)
        .then((res) => {
          if (!res.ok) throw Error("could not fetch the data from the server"); // auto catches network / connection error
          return res.json();
        })
        .then((data) => {
          setIsPending(false);
          setData(data);
          setError(null);
        })
        .catch((err) => {
          // auto catches network / connection error
          setIsPending(false);
          setError(err.message);
        });
    }, 1000);
  }, [url]);
  return { data, error, isPending };
};

export default useFetch;

/**
 * Connect Json server
 * npx json-server --watch database/db.json --port 8000
 */
