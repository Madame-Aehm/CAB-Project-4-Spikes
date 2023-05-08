import { useEffect, useState } from "react";

/** useGet is a custom hook for get fetches typed to the generics provided
 * @param url - url to fetch data from
 * @returns data from the api typed to the genrics provided, loading and error states
 * @example
 interface CatFactAPIResponse {
  data: [
    {
      fact: string;
      length?: number;
    }
  ];
}
 * get data from the catfact api
 * const { data, isLoading, error } = useGet<CatFactAPIResponse>("https://catfact.ninja/facts");
 */

/** TSFetchData is a generic interface that takes a type FetchResult as a parameter */
interface ReturnData<FetchResult> {
  /** loading method */
  isLoading: boolean;
  /** result of the fetch typed in generics */
  data: FetchResult | null;
  /** error message */
  error: null | string;
}

/** NotOk is the shape of my custom error codes from my response */
interface NotOk {
  error: string
}

export function useGet<FetchResult>(url: string, token?: string): ReturnData<FetchResult> {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<FetchResult | null>(null);
  const [error, setError] = useState<null | string>(null);

  const get = async () => {
    setError(null);
    const headers = new Headers()
    if (token) {
      headers.append("Authorization", `Bearer ${token}`)
    }
    const options = {
      method: "GET",
      headers
    }
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        setData(data);
      } else {
        const { error } = await response.json() as NotOk;
        setData(null);
        setError(error);
      }
    } catch (error) {
      const { message } = error as Error;
      setError(message);
      setData(null)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    url && get();
  }, [url]);

  return { isLoading, data, error };
}