"use client";

import { useEffect, useState } from "react";

import { AdminLayout } from "@/components/AdminLayout";

interface Settings {
  notifications: {
    email: boolean;
    browser: boolean;
    mobile: boolean;
  };
  display: {
    theme: "light" | "dark" | "system";
    language: "ru" | "en";
    timezone: string;
  };
  security: {
    twoFactorAuth: boolean;
    sessionTimeout: number;
  };
  email: {
    inquiryNotification: boolean;
    chatNotification: boolean;
    dailyReport: boolean;
    weeklyReport: boolean;
  };
}

const SettingsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<Settings>({
    notifications: {
      email: true,
      browser: true,
      mobile: false,
    },
    display: {
      theme: "dark",
      language: "ru",
      timezone: "Europe/Moscow",
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
    },
    email: {
      inquiryNotification: true,
      chatNotification: true,
      dailyReport: false,
      weeklyReport: true,
    },
  });

  useEffect(() => {
    loadSettings();
    setIsLoading(false);
  }, []);

  const loadSettings = () => {
    // Load settings from localStorage if they exist
    const savedSettings = localStorage.getItem("adminSettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  };

  const handleSettingChange = (
    category: keyof Settings,
    setting: string,
    value: any
  ) => {
    setSettings((prev) => {
      const newSettings = {
        ...prev,
        [category]: {
          ...prev[category],
          [setting]: value,
        },
      };
      localStorage.setItem("adminSettings", JSON.stringify(newSettings));
      return newSettings;
    });
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
        <h1 className="header">Настройки</h1>
        <p className="text-dark-700">
          Настройте параметры панели администратора
        </p>
      </section>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Notifications */}
        <div className="rounded-lg border border-dark-400 bg-dark-300 p-6">
          <h3 className="text-18-bold mb-4">Уведомления</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Email уведомления</span>
              <input
                type="checkbox"
                checked={settings.notifications.email}
                onChange={(e) =>
                  handleSettingChange("notifications", "email", e.target.checked)
                }
                className="h-4 w-4 rounded border-dark-400"
              />
            </div>
            <div className="flex items-center justify-between">
              <span>Браузерные уведомления</span>
              <input
                type="checkbox"
                checked={settings.notifications.browser}
                onChange={(e) =>
                  handleSettingChange(
                    "notifications",
                    "browser",
                    e.target.checked
                  )
                }
                className="h-4 w-4 rounded border-dark-400"
              />
            </div>
            <div className="flex items-center justify-between">
              <span>Мобильные уведомления</span>
              <input
                type="checkbox"
                checked={settings.notifications.mobile}
                onChange={(e) =>
                  handleSettingChange(
                    "notifications",
                    "mobile",
                    e.target.checked
                  )
                }
                className="h-4 w-4 rounded border-dark-400"
              />
            </div>
          </div>
        </div>

        {/* Display Settings */}
        <div className="rounded-lg border border-dark-400 bg-dark-300 p-6">
          <h3 className="text-18-bold mb-4">Отображение</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Тема</span>
              <select
                value={settings.display.theme}
                onChange={(e) =>
                  handleSettingChange(
                    "display",
                    "theme",
                    e.target.value as "light" | "dark" | "system"
                  )
                }
                className="rounded-lg bg-dark-400 px-3 py-1"
              >
                <option value="light">Светлая</option>
                <option value="dark">Темная</option>
                <option value="system">Системная</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span>Язык</span>
              <select
                value={settings.display.language}
                onChange={(e) =>
                  handleSettingChange(
                    "display",
                    "language",
                    e.target.value as "ru" | "en"
                  )
                }
                className="rounded-lg bg-dark-400 px-3 py-1"
              >
                <option value="ru">Русский</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="rounded-lg border border-dark-400 bg-dark-300 p-6">
          <h3 className="text-18-bold mb-4">Безопасность</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Двухфакторная аутентификация</span>
              <input
                type="checkbox"
                checked={settings.security.twoFactorAuth}
                onChange={(e) =>
                  handleSettingChange(
                    "security",
                    "twoFactorAuth",
                    e.target.checked
                  )
                }
                className="h-4 w-4 rounded border-dark-400"
              />
            </div>
            <div className="flex items-center justify-between">
              <span>Тайм-аут сессии (минуты)</span>
              <input
                type="number"
                value={settings.security.sessionTimeout}
                onChange={(e) =>
                  handleSettingChange(
                    "security",
                    "sessionTimeout",
                    parseInt(e.target.value)
                  )
                }
                className="w-20 rounded-lg bg-dark-400 px-3 py-1"
                min="1"
                max="120"
              />
            </div>
          </div>
        </div>

        {/* Email Settings */}
        <div className="rounded-lg border border-dark-400 bg-dark-300 p-6">
          <h3 className="text-18-bold mb-4">Email уведомления</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Новые заявки</span>
              <input
                type="checkbox"
                checked={settings.email.inquiryNotification}
                onChange={(e) =>
                  handleSettingChange(
                    "email",
                    "inquiryNotification",
                    e.target.checked
                  )
                }
                className="h-4 w-4 rounded border-dark-400"
              />
            </div>
            <div className="flex items-center justify-between">
              <span>Новые сообщения в чате</span>
              <input
                type="checkbox"
                checked={settings.email.chatNotification}
                onChange={(e) =>
                  handleSettingChange(
                    "email",
                    "chatNotification",
                    e.target.checked
                  )
                }
                className="h-4 w-4 rounded border-dark-400"
              />
            </div>
            <div className="flex items-center justify-between">
              <span>Ежедневный отчет</span>
              <input
                type="checkbox"
                checked={settings.email.dailyReport}
                onChange={(e) =>
                  handleSettingChange("email", "dailyReport", e.target.checked)
                }
                className="h-4 w-4 rounded border-dark-400"
              />
            </div>
            <div className="flex items-center justify-between">
              <span>Еженедельный отчет</span>
              <input
                type="checkbox"
                checked={settings.email.weeklyReport}
                onChange={(e) =>
                  handleSettingChange("email", "weeklyReport", e.target.checked)
                }
                className="h-4 w-4 rounded border-dark-400"
              />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SettingsPage; 