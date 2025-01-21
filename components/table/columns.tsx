"use client";

import { ColumnDef } from "@tanstack/react-table";

import { formatDate } from "@/lib/utils";
import { StatusBadge } from "../StatusBadge";

interface PropertyInquiry {
  name: string;
  email: string;
  phone: string;
  propertyType: string;
  budget: string;
  location: string;
  status: string;
  createdAt: string;
}

export const columns: ColumnDef<PropertyInquiry>[] = [
  {
    accessorKey: "name",
    header: "ФИО",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Телефон",
  },
  {
    accessorKey: "propertyType",
    header: "Тип недвижимости",
    cell: ({ row }) => {
      const propertyTypes: Record<string, string> = {
        apartment: "Квартира",
        house: "Дом",
        commercial: "Коммерческая недвижимость",
      };
      const value = row.getValue("propertyType") as string;
      return propertyTypes[value] || value;
    },
  },
  {
    accessorKey: "budget",
    header: "Бюджет",
    cell: ({ row }) => {
      const budget = row.getValue("budget") as string;
      return `₽${budget}`;
    },
  },
  {
    accessorKey: "location",
    header: "Район",
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const statusMap: Record<string, { label: string; type: string }> = {
        new: { label: "Новая", type: "new" },
        inProgress: { label: "В обработке", type: "inProgress" },
        completed: { label: "Завершена", type: "completed" },
      };
      const currentStatus = statusMap[status] || { label: status, type: status };
      return <StatusBadge type={currentStatus.type as any}>{currentStatus.label}</StatusBadge>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Дата",
    cell: ({ row }) => formatDate(row.getValue("createdAt") as string),
  },
];
