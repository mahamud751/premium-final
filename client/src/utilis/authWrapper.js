"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthWrapper({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (pathname !== "/" && !token) {
      router.push("/");
    } else if (pathname === "/" && token) {
      router.push("/dashboard");
    } else {
      setLoading(false);
    }
  }, [router, pathname]);

  if (loading) return null;

  return <>{children}</>;
}
