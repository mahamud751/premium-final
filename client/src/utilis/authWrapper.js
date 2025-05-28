"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthWrapper({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (pathname.startsWith("/dashboard") && !token) {
      router.replace("/");
      return;
    }

    setLoading(false);
  }, [router, pathname]);

  if (loading) return null;

  return <>{children}</>;
}
