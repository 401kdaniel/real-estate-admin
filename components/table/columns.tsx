"use client";

import { ColumnDef } from "@tanstack/react-table";

import { formatDate } from "@/lib/utils";
import { StatusBadge } from "../StatusBadge";

export const columns: ColumnDef<any>[] = [
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
      const propertyTypes = {
        apartment: "Квартира",
        house: "Дом",
        commercial: "Коммерческая недвижимость",
      };
      return propertyTypes[row.getValue("propertyType")] || row.getValue("propertyType");
    },
  },
  {
    accessorKey: "budget",
    header: "Бюджет",
    cell: ({ row }) => {
      const budget = row.getValue("budget");
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
      const status = row.getValue("status");
      const statusMap = {
        new: { label: "Новая", type: "new" },
        inProgress: { label: "В обработке", type: "inProgress" },
        completed: { label: "Завершена", type: "completed" },
      };
      const currentStatus = statusMap[status] || { label: status, type: status };
      return <StatusBadge type={currentStatus.type}>{currentStatus.label}</StatusBadge>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Дата",
    cell: ({ row }) => formatDate(row.getValue("createdAt")),
  },
];
