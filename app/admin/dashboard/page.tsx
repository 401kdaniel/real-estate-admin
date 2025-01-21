"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { StatCard } from "@/components/StatCard";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { AdminLayout } from "@/components/AdminLayout";

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

const AdminDashboard = () => {
  const [inquiries, setInquiries] = useState<PropertyInquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get inquiries from localStorage
  useEffect(() => {
    const loadInquiries = () => {
      try {
        if (typeof window === 'undefined') return;
        
        const storedInquiries = localStorage.getItem('inquiries');
        if (storedInquiries) {
          const parsedInquiries = JSON.parse(storedInquiries);
          setInquiries(Array.isArray(parsedInquiries) ? parsedInquiries : []);
        } else {
          setInquiries([]);
        }
      } catch (error) {
        console.error('Error loading inquiries:', error);
        setError('Failed to load inquiries');
        setInquiries([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadInquiries();
  }, []);

  const newCount = inquiries.filter(doc => doc.status === "new").length;
  const inProgressCount = inquiries.filter(doc => doc.status === "inProgress").length;
  const completedCount = inquiries.filter(doc => doc.status === "completed").length;

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
        <h1 className="header">Заявки</h1>
        <p className="text-dark-700">
          Начните день с управления новыми заявками
        </p>
      </section>

      <section className="admin-stat">
        <StatCard
          type="new"
          count={newCount}
          label="Новые заявки"
          icon="/assets/icons/new.svg"
        />
        <StatCard
          type="inProgress"
          count={inProgressCount}
          label="В обработке"
          icon="/assets/icons/in-progress.svg"
        />
        <StatCard
          type="completed"
          count={completedCount}
          label="Завершенные"
          icon="/assets/icons/completed.svg"
        />
      </section>

      <DataTable columns={columns} data={inquiries} />
    </AdminLayout>
  );
};

export default AdminDashboard; 