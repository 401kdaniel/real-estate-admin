export interface ChatMessage {
  id: string;
  content: string;
  sender: string; // username
  timestamp: string;
}

export interface ChatRoom {
  id: string;
  name: string;
  participants: string[]; // usernames
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

// Sample chat data
export const SAMPLE_CHAT_ROOMS: ChatRoom[] = [
  {
    id: "chat1",
    name: "Общий чат",
    participants: ["admin", "elena", "ivan", "anna", "mikhail"],
    messages: [
      {
        id: "msg1",
        content: "Доброе утро! Есть новые заявки на просмотр квартир?",
        sender: "elena",
        timestamp: new Date().toISOString(),
      },
      {
        id: "msg2",
        content: "Да, три новых заявки на Арбате",
        sender: "ivan",
        timestamp: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "chat2",
    name: "Элитная недвижимость",
    participants: ["admin", "anna", "mikhail"],
    messages: [
      {
        id: "msg3",
        content: "Новый пентхаус в Москва-Сити доступен для показа",
        sender: "anna",
        timestamp: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]; 