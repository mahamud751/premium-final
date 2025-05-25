import React from "react";
import { CircularProgress } from "@mui/material";

interface LoadingErrorProps {
  loading: boolean;
  error: Error | null;
  children: React.ReactNode;
}

const LoadingError: React.FC<LoadingErrorProps> = ({
  loading,
  error,
  children,
}) => {
  if (loading)
    return (
      <div className="flex justify-center items-center h-100vh">
        <CircularProgress size={40} />
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;
  return <>{children}</>;
};

export default LoadingError;
