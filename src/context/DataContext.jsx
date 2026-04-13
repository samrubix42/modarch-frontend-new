// src/context/DataContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const base = import.meta.env.VITE_API_BASE_URL;
        const res = await fetch(`${base}/projects`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setProjectData(json?.data);
      } catch (err) {
        console.error("Data fetch error:", err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ projectData, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (ctx === null) {
    throw new Error("useData must be used within a DataProvider");
  }
  return ctx;
};
