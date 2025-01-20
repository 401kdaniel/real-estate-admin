import clsx from "clsx";
import Image from "next/image";

import { StatusIcon } from "@/constants";

interface StatusBadgeProps {
  type: "new" | "inProgress" | "completed";
  children: React.ReactNode;
}

export const StatusBadge = ({ type, children }: StatusBadgeProps) => {
  const statusStyles = {
    new: "bg-blue-100 text-blue-700",
    inProgress: "bg-yellow-100 text-yellow-700",
    completed: "bg-green-100 text-green-700",
  };

  return (
    <div
      className={`${statusStyles[type]} inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium`}
    >
      {children}
    </div>
  );
};
