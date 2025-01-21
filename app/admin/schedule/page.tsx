"use client";

import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";

interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: "viewing" | "meeting" | "call" | "other";
  status: "pending" | "completed" | "cancelled";
  assignedTo: string;
}

const SchedulePage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Просмотр квартиры на Арбате",
      description: "Встреча с клиентом для просмотра 2-комнатной квартиры",
      date: new Date().toISOString().split("T")[0],
      time: "10:00",
      type: "viewing",
      status: "pending",
      assignedTo: "elena",
    },
    {
      id: "2",
      title: "Звонок с инвестором",
      description: "Обсуждение коммерческой недвижимости в центре",
      date: new Date().toISOString().split("T")[0],
      time: "14:30",
      type: "call",
      status: "pending",
      assignedTo: "mikhail",
    },
  ]);

  const handleAddTask = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: "Новая задача",
      description: "Описание задачи",
      date: selectedDate.toISOString().split("T")[0],
      time: "12:00",
      type: "other",
      status: "pending",
      assignedTo: "admin",
    };

    setTasks([...tasks, newTask]);
  };

  const handleStatusChange = (taskId: string, status: Task["status"]) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status } : task
    ));
  };

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "completed":
        return "text-green-500";
      case "cancelled":
        return "text-red-500";
      default:
        return "text-yellow-500";
    }
  };

  const getTypeIcon = (type: Task["type"]) => {
    switch (type) {
      case "viewing":
        return "🏠";
      case "meeting":
        return "👥";
      case "call":
        return "📞";
      default:
        return "📝";
    }
  };

  return (
    <AdminLayout>
      <section className="w-full space-y-4">
        <h1 className="header">Расписание</h1>
        <p className="text-dark-700">
          Управление встречами и задачами
        </p>
      </section>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Calendar */}
        <div className="rounded-lg border border-dark-400 bg-dark-300 p-6">
          <h3 className="text-18-bold mb-4">Календарь</h3>
          <div className="space-y-4">
            <input
              type="date"
              value={selectedDate.toISOString().split("T")[0]}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              className="w-full rounded-lg bg-dark-400 px-4 py-2"
            />
            <button
              onClick={handleAddTask}
              className="shad-primary-btn w-full rounded-lg py-2"
            >
              Добавить задачу
            </button>
          </div>
        </div>

        {/* Tasks */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {tasks
              .filter(task => task.date === selectedDate.toISOString().split("T")[0])
              .sort((a, b) => a.time.localeCompare(b.time))
              .map((task) => (
                <div
                  key={task.id}
                  className="rounded-lg border border-dark-400 bg-dark-300 p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span>{getTypeIcon(task.type)}</span>
                        <h4 className="text-16-semibold">{task.title}</h4>
                      </div>
                      <p className="mt-1 text-14-regular text-dark-600">
                        {task.description}
                      </p>
                      <div className="mt-2 flex items-center gap-4 text-14-regular text-dark-600">
                        <span>🕒 {task.time}</span>
                        <span className={getStatusColor(task.status)}>
                          ● {task.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStatusChange(task.id, "completed")}
                        className="rounded-lg bg-green-500 px-3 py-1 text-12-medium text-white"
                      >
                        ✓
                      </button>
                      <button
                        onClick={() => handleStatusChange(task.id, "cancelled")}
                        className="rounded-lg bg-red-500 px-3 py-1 text-12-medium text-white"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SchedulePage; 