////////////APPROACH WITH CUSTOM TYPE//////////////////////

import { useEffect, useState } from "react";


// Custom type
interface IData {
  id: number;
  name: string;
}

interface IFetchResult1 {
  data: IData | null;
  error: any;
}

// React component
const ExampleComponent1: React.FC = () => {
  const [fetchResult, setFetchResult] = useState<IFetchResult1>({ data: null, error: null });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.example.com/data");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data: IData = await response.json();
        setFetchResult({ data, error: null });
      } catch (error) {
        setFetchResult({ data: null, error });
      }
    };

    fetchData();
  }, []);

  if (fetchResult.error) {
    return <div>Error: {fetchResult.error.message}</div>;
  }

  if (!fetchResult.data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{fetchResult.data.name}</h1>
    </div>
  );
};




////////////APPROACH WITH GENERICS//////////////////////
// Generic type
interface IData {
  id: number;
  name: string;
}

interface IFetchResult2<Type> {
  data: Type | null;
  error: any;
}

// React component
const ExampleComponent2: React.FC = () => {
  const [fetchResult, setFetchResult] = useState<IFetchResult2<IData>>({ data: null, error: null });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.example.com/data");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data: IData = await response.json();
        setFetchResult({ data, error: null });
      } catch (error) {
        setFetchResult({ data: null, error });
      }
    };

    fetchData();
  }, []);

  if (fetchResult.error) {
    return <div>Error: {fetchResult.error.message}</div>;
  }

  if (!fetchResult.data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{fetchResult.data.name}</h1>
    </div>
  );
};
