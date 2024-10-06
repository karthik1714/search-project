// app/[...slug]/page.js
"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const CatchAllRoute = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to custom 404 page
    router.push("/404");
  }, [router]);

  return null; // Nothing renders for this route
};

export default CatchAllRoute;
