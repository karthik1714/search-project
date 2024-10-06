// app/404.js
"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Custom404 = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home after 3 seconds
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000);

    // Cleanup the timer on unmount
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center text-center mt-60">
      <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-300">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400">
        Sorry, the page you are looking for does not exist.
      </p>
      <p className="text-md text-gray-500 dark:text-gray-500">
        Redirecting you back to the home page...
      </p>
    </div>
  );
};

export default Custom404;
