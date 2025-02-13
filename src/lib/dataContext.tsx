import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// Define the Data Type (Update with your actual data structure)
interface DataType {
  id: number;
  name: string;
  slug: string;
  [key: string]: any;
}

interface DataContextType {
  data: DataType[] | null;
  loading: boolean;
  error: string | null;
  getSingleData: (id: string) => DataType | undefined;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const [data, setData] = useState<DataType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://hello.seasidebeachvacations.com/listing-data.php"
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const result: DataType[] = await response.json();
        setData(result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Function to fetch a single item by ID
  const getSingleData = (id: string) => {
    return data?.find((item) => item.slug === id);
  };

  const value = { data, loading, error, getSingleData };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
