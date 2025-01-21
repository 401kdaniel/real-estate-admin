"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ADMIN_FEATURES } from "@/lib/config/users";

export const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-20 h-screen w-64 border-r border-dark-400 bg-dark-300 px-4 py-6">
      <Link href="/" className="mb-8 block">
        <Image
          src="/assets/icons/7apartamentov-logo.svg"
          height={32}
          width={162}
          alt="logo"
          className="h-8 w-fit"
        />
      </Link>

      <nav className="mt-8 space-y-2">
        {Object.values(ADMIN_FEATURES).map((feature) => (
          <Link
            key={feature.path}
            href={feature.path}
            className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
              pathname === feature.path
                ? "bg-green-500 text-white"
                : "hover:bg-dark-400"
            }`}
          >
            <Image
              src={feature.icon}
              alt={feature.label}
              width={20}
              height={20}
              className={pathname === feature.path ? "brightness-0 invert" : ""}
            />
            <span className="text-14-medium">{feature.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}; 