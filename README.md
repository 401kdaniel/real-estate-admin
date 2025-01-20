# 7Apartamentov - Московское Агентство Недвижимости

Веб-сайт для агентства недвижимости 7Apartamentov, специализирующегося на продаже и аренде недвижимости в Москве.

## Функциональность

- Форма заявки на подбор недвижимости
- Административная панель для управления заявками
- Интеграция с Appwrite для хранения данных
- Современный и отзывчивый дизайн

## Технологии

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Appwrite
- React Hook Form
- Zod для валидации

## Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/your-username/7apartamentov.git
cd 7apartamentov
```

2. Установите зависимости:
```bash
npm install
```

3. Создайте файл `.env.local` и добавьте необходимые переменные окружения:
```
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-project-id
NEXT_PUBLIC_DATABASE_ID=your-database-id
NEXT_PUBLIC_INQUIRIES_COLLECTION_ID=your-collection-id
```

4. Запустите проект в режиме разработки:
```bash
npm run dev
```

## Структура проекта

```
7apartamentov/
├── app/                    # Next.js app directory
├── components/            # React компоненты
├── lib/                   # Утилиты и конфигурация
├── public/               # Статические файлы
└── types/                # TypeScript типы
```

## Лицензия

MIT
