import { useEffect, useState } from "react";
/** TSFetchMethods is a generic interface that takes a type T as a parameter */
interface TSFetchMethods<T> {
  /** get method  */
  get: () => Promise<void>;
  // /** post method */
  // post: (body: T | Partial<T>) => Promise<void>;
  // /** patch method */
  // patch: (body: T | Partial<T>) => Promise<void>;
  // /** delete method */
  // del: () => Promise<void>;
}

/** TSFetchData is a generic interface that takes a type T as a parameter */
interface TSFetchData<T> {
  /** loading method */
  isLoading: boolean;
  /** result of the fetch typed in generics */
  data: T | null;
  /** error message */
  error: null | string;
}
/** TSFetch is a generic type that takes a type T as a parameter */
type TSFetch<T> = [TSFetchData<T>, TSFetchMethods<T>];

/** useTSFetch is a custom hook for all fetching methods typed to the generics provided
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
 * const { data, isLoading, error }  = useTSFetch<CatFactAPIResponse>("https://catfact.ninja/facts");
 *
 * post data to the catfact api
 * const [{ data, isLoading, error }, { post }]  = useTSFetch<CatFactType[]>("https://catfact.ninja/facts");
 */
export function useTSFetch<T>(url: string): TSFetchData<T> {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<null | string>(null);

  const get = async () => {
    try {
      const response = await fetch(`${url}`);
      if (response.ok) {
        const data = await response.json();
        setData(data);
      }
    } catch (error) {
      const { message } = error as Error;
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const post = async (body: T | Partial<T>) => {
    try {
      const response = await fetch(`${url}`, {
        method: "POST",
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        setData(data);
      }
    } catch (error) {
      const { message } = error as Error;
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };
  const patch = async (body: T | Partial<T>) => {
    try {
      const response = await fetch(`${url}`, {
        method: "PATCH",
        body: JSON.stringify(body),
      });
      if (response.ok) {
        const data = await response.json();
        
        setData(data);
      }
    } catch (error) {
      const { message } = error as Error;
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const del = async () => {
    try {
      const response = await fetch(`${url}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const data = await response.json();
        setData(data);
      }
    } catch (error) {
      const { message } = error as Error;
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const tsFetch: TSFetchMethods<T> = {
    get,
    // post,
    // patch,
    // del,
  };

  useEffect(() => {
    get();
  }, []);

  /** return an array of the data, methods and the fetch */
  return { isLoading, data, error };
}