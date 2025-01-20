import Image from "next/image";

interface StatCardProps {
  type: "new" | "inProgress" | "completed" | "appointments" | "pending" | "cancelled";
  count: number;
  label: string;
  icon: string;
}

export const StatCard = ({ type, count, label, icon }: StatCardProps) => {
  return (
    <div className="stat-card">
      <div className="flex items-center gap-3">
        <Image src={icon} alt={type} width={24} height={24} className="h-6 w-6" />
        <p className="text-14-medium text-dark-600">{label}</p>
      </div>

      <div className="mt-3 flex items-end justify-between">
        <p className="text-26-bold">{count}</p>
      </div>
    </div>
  );
};
