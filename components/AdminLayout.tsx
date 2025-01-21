"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ADMIN_USERS, ADMIN_PASSWORD } from "@/lib/config/users";
import { AdminSidebar } from "./AdminSidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [displayName, setDisplayName] = useState("");

  // Check authentication
  useEffect(() => {
    const checkAuth = () => {
      try {
        if (typeof window === 'undefined') return;

        const accessKey = localStorage.getItem("accessKey");
        if (!accessKey) {
          router.push("/admin/login");
          return;
        }

        const [username, password, encodedName] = atob(accessKey).split(":");
        const name = decodeURIComponent(encodedName);
        const user = ADMIN_USERS.find(u => u.username === username);
        
        if (!user || password !== ADMIN_PASSWORD) {
          router.push("/admin/login");
          return;
        }

        setDisplayName(name);
        setIsLoading(false);
      } catch (error) {
        console.error("Auth error:", error);
        router.push("/admin/login");
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("accessKey");
    router.push("/admin/login");
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-green-500 border-t-transparent"></div>
          <span>Загрузка...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 pl-64">
        <header className="flex h-16 items-center justify-end border-b border-dark-400 bg-dark-300 px-6">
          <div className="flex items-center gap-4">
            <p className="text-16-semibold">{displayName}</p>
            <button
              onClick={handleLogout}
              className="shad-danger-btn rounded-lg px-4 py-2 text-14-medium"
            >
              Выйти
            </button>
          </div>
        </header>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}; 