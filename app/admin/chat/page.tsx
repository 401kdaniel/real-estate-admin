"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

import { ADMIN_USERS, ADMIN_PASSWORD } from "@/lib/config/users";
import { ChatRoom, SAMPLE_CHAT_ROOMS } from "@/lib/config/chat";

const ChatPage = () => {
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");

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

        const [user, password, encodedName] = atob(accessKey).split(":");
        const name = decodeURIComponent(encodedName);
        const adminUser = ADMIN_USERS.find(u => u.username === user);
        
        if (!adminUser || password !== ADMIN_PASSWORD) {
          router.push("/admin/login");
          return;
        }

        setUsername(user);
        setDisplayName(name);
        // Load chat rooms
        setChatRooms(SAMPLE_CHAT_ROOMS);
        setSelectedRoom(SAMPLE_CHAT_ROOMS[0]);
        setIsLoading(false);
      } catch (error) {
        console.error("Auth error:", error);
        router.push("/admin/login");
      }
    };

    checkAuth();
  }, [router]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedRoom?.messages]);

  const handleLogout = () => {
    localStorage.removeItem("accessKey");
    router.push("/admin/login");
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedRoom) return;

    const message = {
      id: `msg${Date.now()}`,
      content: newMessage.trim(),
      sender: username,
      timestamp: new Date().toISOString(),
    };

    const updatedRoom = {
      ...selectedRoom,
      messages: [...selectedRoom.messages, message],
      updatedAt: new Date().toISOString(),
    };

    setChatRooms(rooms =>
      rooms.map(room =>
        room.id === selectedRoom.id ? updatedRoom : room
      )
    );
    setSelectedRoom(updatedRoom);
    setNewMessage("");
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

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/7apartamentov-logo.svg"
            height={32}
            width={162}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>

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

      <main className="admin-main">
        <div className="flex h-[calc(100vh-200px)] gap-6">
          {/* Chat rooms list */}
          <div className="w-64 space-y-4">
            <h2 className="text-18-bold">Чаты</h2>
            <div className="space-y-2">
              {chatRooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => setSelectedRoom(room)}
                  className={`w-full rounded-lg p-3 text-left transition-colors ${
                    selectedRoom?.id === room.id
                      ? "bg-green-500 text-white"
                      : "bg-dark-300 hover:bg-dark-400"
                  }`}
                >
                  <p className="text-16-semibold">{room.name}</p>
                  <p className="text-12-regular text-dark-600">
                    {room.participants.length} участников
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Chat messages */}
          {selectedRoom && (
            <div className="flex flex-1 flex-col rounded-lg bg-dark-300">
              <div className="border-b border-dark-400 p-4">
                <h3 className="text-18-bold">{selectedRoom.name}</h3>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto p-4">
                {selectedRoom.messages.map((message) => {
                  const sender = ADMIN_USERS.find(
                    (u) => u.username === message.sender
                  );
                  const isOwnMessage = message.sender === username;

                  return (
                    <div
                      key={message.id}
                      className={`flex ${
                        isOwnMessage ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          isOwnMessage
                            ? "bg-green-500 text-white"
                            : "bg-dark-400"
                        }`}
                      >
                        {!isOwnMessage && (
                          <p className="text-12-semibold text-green-500">
                            {sender?.displayName}
                          </p>
                        )}
                        <p className="text-14-regular">{message.content}</p>
                        <p className="text-12-regular text-dark-600">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              <form
                onSubmit={handleSendMessage}
                className="flex gap-4 border-t border-dark-400 p-4"
              >
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Введите сообщение..."
                  className="flex-1 rounded-lg bg-dark-400 px-4 py-2"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="shad-primary-btn rounded-lg px-6 py-2"
                >
                  Отправить
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ChatPage; 