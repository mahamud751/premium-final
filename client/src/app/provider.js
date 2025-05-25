"use client";
import { UserProvider } from "@/services/contexts/UserProvider";
import React, { Suspense } from "react";

export default function Providers({ children }) {
  return (
    <UserProvider>
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </UserProvider>
  );
}
