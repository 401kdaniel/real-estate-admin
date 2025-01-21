"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { ADMIN_USERS, ADMIN_PASSWORD } from "@/lib/config/users";

const AdminLogin = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Check if username exists and password matches
      const user = ADMIN_USERS.find(u => u.username === username);
      if (user && password === ADMIN_PASSWORD) {
        // Store authentication state with display name
        const authString = `${username}:${password}:${encodeURIComponent(user.displayName)}`;
        const authToken = btoa(authString);
        localStorage.setItem("accessKey", authToken);
        
        // Use await to ensure the navigation completes
        await router.push("/admin/dashboard");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-dark-200 px-6 py-8">
      <Link href="/" className="mb-8">
        <Image
          src="/assets/icons/7apartamentov-logo.svg"
          alt="logo"
          width={162}
          height={32}
          className="h-8 w-fit"
        />
      </Link>

      <div className="w-full max-w-md space-y-8 rounded-2xl bg-dark-300 p-8 shadow-lg">
        <div className="text-center">
          <h2 className="text-24-bold text-light-200">
            Вход в панель администратора
          </h2>
          <p className="mt-2 text-14-regular text-dark-600">
            Введите свои учетные данные для доступа
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="shad-input-label">
                Имя пользователя
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="shad-input mt-2 w-full rounded-lg"
                placeholder="admin"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="shad-input-label">
                Пароль
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shad-input mt-2 w-full rounded-lg"
                placeholder="••••••"
                required
              />
            </div>
          </div>

          {error && (
            <p className="text-14-regular text-center text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="shad-primary-btn w-full rounded-lg py-3 text-16-semibold"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                <span>Вход...</span>
              </div>
            ) : (
              "Войти"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin; 