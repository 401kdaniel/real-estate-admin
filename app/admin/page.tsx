import Image from "next/image";
import Link from "next/link";

import { StatCard } from "@/components/StatCard";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { getRecentInquiryList } from "@/lib/actions/inquiry.actions";

const AdminPage = async () => {
  const inquiries = await getRecentInquiryList();

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

        <p className="text-16-semibold">Панель администратора</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Добро пожаловать 👋</h1>
          <p className="text-dark-700">
            Начните день с управления новыми заявками
          </p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="new"
            count={inquiries.newCount}
            label="Новые заявки"
            icon={"/assets/icons/new.svg"}
          />
          <StatCard
            type="inProgress"
            count={inquiries.inProgressCount}
            label="В обработке"
            icon={"/assets/icons/in-progress.svg"}
          />
          <StatCard
            type="completed"
            count={inquiries.completedCount}
            label="Завершенные"
            icon={"/assets/icons/completed.svg"}
          />
        </section>

        <DataTable columns={columns} data={inquiries.documents} />
      </main>
    </div>
  );
};

export default AdminPage;
