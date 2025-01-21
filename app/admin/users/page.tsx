"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { ADMIN_USERS } from "@/lib/config/users";
import { AdminLayout } from "@/components/AdminLayout";

interface UserStats {
  totalInquiries: number;
  completedInquiries: number;
  activeChats: number;
  lastActive: string;
}

interface AdminUserWithStats {
  username: string;
  displayName: string;
  stats: UserStats;
}

const UsersPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<AdminUserWithStats[]>([]);

  useEffect(() => {
    loadUsers();
    setIsLoading(false);
  }, []);

  const loadUsers = () => {
    // Transform ADMIN_USERS into AdminUserWithStats
    const usersWithStats = ADMIN_USERS.map(user => ({
      ...user,
      stats: {
        totalInquiries: Math.floor(Math.random() * 50) + 10,
        completedInquiries: Math.floor(Math.random() * 30) + 5,
        activeChats: Math.floor(Math.random() * 5),
        lastActive: new Date(Date.now() - Math.random() * 86400000).toISOString(),
      }
    }));

    setUsers(usersWithStats);
  };

  if (error) {
    return (
      <AdminLayout>
        <div className="text-red-500">{error}</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <section className="w-full space-y-4">
        <h1 className="header">Пользователи</h1>
        <p className="text-dark-700">
          Управление пользователями системы
        </p>
      </section>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <div
            key={user.username}
            className="rounded-lg border border-dark-400 bg-dark-300 p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-18-bold">{user.displayName}</h3>
                <p className="text-14-regular text-dark-600">@{user.username}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-dark-400">
                <Image
                  src="/assets/icons/user.svg"
                  alt="user"
                  width={20}
                  height={20}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Всего заявок:</span>
                <span className="text-16-semibold">{user.stats.totalInquiries}</span>
              </div>
              <div className="flex justify-between">
                <span>Завершено:</span>
                <span className="text-green-500">{user.stats.completedInquiries}</span>
              </div>
              <div className="flex justify-between">
                <span>Активные чаты:</span>
                <span className="text-blue-500">{user.stats.activeChats}</span>
              </div>
              <div className="flex justify-between">
                <span>Последняя активность:</span>
                <span className="text-14-regular text-dark-600">
                  {new Date(user.stats.lastActive).toLocaleTimeString("ru-RU")}
                </span>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button className="shad-primary-btn rounded-lg px-4 py-2 text-14-medium">
                Редактировать
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default UsersPage; 