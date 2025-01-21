"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { Property, SAMPLE_PROPERTIES } from "@/lib/config/properties";
import { ADMIN_USERS } from "@/lib/config/users";
import { AdminLayout } from "@/components/AdminLayout";

const PropertiesPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load properties
    setProperties(SAMPLE_PROPERTIES);
    setIsLoading(false);
  }, []);

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
        <h1 className="header">Объекты недвижимости</h1>
        <p className="text-dark-700">
          Управление объектами недвижимости и их статусом
        </p>
      </section>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <div
            key={property.id}
            className="rounded-lg border border-dark-400 bg-dark-300 p-4"
          >
            <div className="relative h-48 w-full overflow-hidden rounded-lg">
              <Image
                src={property.images[0]}
                alt={property.title}
                fill
                className="object-cover"
              />
              <div className="absolute right-2 top-2 rounded-full bg-dark-300 px-3 py-1 text-14-medium">
                {property.status === "available" && (
                  <span className="text-green-500">Доступно</span>
                )}
                {property.status === "reserved" && (
                  <span className="text-yellow-500">Бронь</span>
                )}
                {property.status === "sold" && (
                  <span className="text-red-500">Продано</span>
                )}
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <h3 className="text-18-bold">{property.title}</h3>
              <p className="text-16-semibold text-green-500">
                {property.price.toLocaleString("ru-RU")} ₽
              </p>
              <div className="flex justify-between text-14-regular text-dark-600">
                <span>{property.area} м²</span>
                <span>{property.district}</span>
              </div>
              <p className="text-14-regular text-dark-600">{property.address}</p>
              <div className="flex flex-wrap gap-2">
                {property.features.map((feature) => (
                  <span
                    key={feature}
                    className="rounded-full bg-dark-400 px-3 py-1 text-12-regular"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              <div className="mt-4 border-t border-dark-400 pt-4">
                <p className="text-14-regular text-dark-600">
                  Ответственный: {ADMIN_USERS.find(u => u.username === property.assignedTo)?.displayName}
                </p>
                <p className="text-14-regular text-dark-600">
                  Телефон: {property.sellerPhone}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default PropertiesPage; 