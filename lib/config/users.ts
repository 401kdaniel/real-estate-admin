export const ADMIN_USERS = [
  { username: "admin", displayName: "Администратор" },
  { username: "ivan", displayName: "Иван Петров" },
  { username: "elena", displayName: "Елена Смирнова" },
  { username: "dmitry", displayName: "Дмитрий Иванов" },
  { username: "anna", displayName: "Анна Козлова" },
  { username: "sergey", displayName: "Сергей Морозов" },
  { username: "olga", displayName: "Ольга Волкова" },
  { username: "mikhail", displayName: "Михаил Соколов" },
  { username: "natalia", displayName: "Наталья Попова" },
] as const;

// All users share the same password for simplicity
export const ADMIN_PASSWORD = "admin";

// Admin features and navigation
export const ADMIN_FEATURES = {
  INQUIRIES: {
    path: "/admin/dashboard",
    label: "Заявки",
    description: "Управление заявками на недвижимость",
    icon: "/assets/icons/appointments.svg",
  },
  PROPERTIES: {
    path: "/admin/properties",
    label: "Объекты",
    description: "Управление объектами недвижимости",
    icon: "/assets/icons/location.svg",
  },
  SCHEDULE: {
    path: "/admin/schedule",
    label: "Расписание",
    description: "Управление встречами и задачами",
    icon: "/assets/icons/calendar.svg",
  },
  CHAT: {
    path: "/admin/chat",
    label: "Чат",
    description: "Групповой чат с сотрудниками",
    icon: "/assets/icons/email.svg",
  },
  ANALYTICS: {
    path: "/admin/analytics",
    label: "Аналитика",
    description: "Статистика и аналитика по заявкам",
    icon: "/assets/icons/money.svg",
  },
  USERS: {
    path: "/admin/users",
    label: "Пользователи",
    description: "Управление пользователями системы",
    icon: "/assets/icons/user.svg",
  },
  SETTINGS: {
    path: "/admin/settings",
    label: "Настройки",
    description: "Настройки панели администратора",
    icon: "/assets/icons/check-circle.svg",
  },
} as const; 