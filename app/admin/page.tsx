"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ADMIN_USERS, ADMIN_PASSWORD } from "@/lib/config/users";

const AdminPage = () => {
  const router = useRouter();

  useEffect(() => {
    const accessKey = localStorage.getItem("accessKey");
    if (!accessKey) {
      router.push("/admin/login");
      return;
    }

    try {
      const [username, password, encodedName] = atob(accessKey).split(":");
      const displayName = decodeURIComponent(encodedName);
      const user = ADMIN_USERS.find(u => u.username === username);
      
      if (user && password === ADMIN_PASSWORD) {
        router.push("/admin/dashboard");
      } else {
        router.push("/admin/login");
      }
    } catch {
      router.push("/admin/login");
    }
  }, [router]);

  // Show loading state while checking auth
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex items-center space-x-2">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-green-500 border-t-transparent"></div>
        <span>Загрузка...</span>
      </div>
    </div>
  );
};

export default AdminPage; 