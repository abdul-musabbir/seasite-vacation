import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// Define the Data Type (Replace `any` with the actual expected structure of your data)
interface DataType {
  // Example structure, update it as per your API response
  id: number;
  name: string;
  [key: string]: any; // Allow additional properties
}

// Define Context Value Type
interface DataContextType {
  data: DataType[] | null;
  loading: boolean;
  error: string | null;
  getSingleData: (id: string) => DataType | undefined;
}

// Create Context with a default value
const DataContext = createContext<DataContextType | undefined>(undefined);

// Provider Component
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
        const response = await fetch("http://localhost:5000/h.php");
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
    try {
      const response = data.find((item: { slug: string }) => item.slug === id);

      return response;
    } catch (error) {
      console.error("Error fetching single data:", error);
      return null;
    }
  };

  // Optimize re-renders using useMemo
  const value = useMemo(
    () => ({ data, loading, error, getSingleData }),
    [data, loading, error]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

// Custom Hook to Use Data
export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
