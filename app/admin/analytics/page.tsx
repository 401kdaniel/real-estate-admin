"use client";

import { useEffect, useState } from "react";

import { Property, SAMPLE_PROPERTIES } from "@/lib/config/properties";
import { AdminLayout } from "@/components/AdminLayout";

interface AnalyticsSummary {
  totalProperties: number;
  availableProperties: number;
  reservedProperties: number;
  soldProperties: number;
  averagePrice: number;
  popularDistrict: string;
  totalInquiries: number;
  conversionRate: number;
}

const AnalyticsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);

  useEffect(() => {
    calculateAnalytics();
    setIsLoading(false);
  }, []);

  const calculateAnalytics = () => {
    const properties = SAMPLE_PROPERTIES;
    
    // Calculate statistics
    const available = properties.filter(p => p.status === "available").length;
    const reserved = properties.filter(p => p.status === "reserved").length;
    const sold = properties.filter(p => p.status === "sold").length;
    
    // Calculate average price
    const avgPrice = properties.reduce((sum, p) => sum + p.price, 0) / properties.length;
    
    // Find most popular district
    const districtCounts = properties.reduce((acc, p) => {
      acc[p.district] = (acc[p.district] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const popularDistrict = Object.entries(districtCounts)
      .sort(([,a], [,b]) => b - a)[0][0];

    // Simulate some additional metrics
    const totalInquiries = Math.floor(Math.random() * 100) + 50;
    const conversionRate = (sold / totalInquiries) * 100;

    setAnalytics({
      totalProperties: properties.length,
      availableProperties: available,
      reservedProperties: reserved,
      soldProperties: sold,
      averagePrice: avgPrice,
      popularDistrict,
      totalInquiries,
      conversionRate,
    });
  };

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
        <h1 className="header">Аналитика</h1>
        <p className="text-dark-700">
          Статистика и аналитика по объектам недвижимости
        </p>
      </section>

      {analytics && (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Property Status */}
          <div className="rounded-lg border border-dark-400 bg-dark-300 p-6">
            <h3 className="text-18-bold mb-4">Статус объектов</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Всего объектов:</span>
                <span className="text-16-semibold">{analytics.totalProperties}</span>
              </div>
              <div className="flex justify-between">
                <span>Доступно:</span>
                <span className="text-green-500">{analytics.availableProperties}</span>
              </div>
              <div className="flex justify-between">
                <span>В резерве:</span>
                <span className="text-yellow-500">{analytics.reservedProperties}</span>
              </div>
              <div className="flex justify-between">
                <span>Продано:</span>
                <span className="text-blue-500">{analytics.soldProperties}</span>
              </div>
            </div>
          </div>

          {/* Price Analysis */}
          <div className="rounded-lg border border-dark-400 bg-dark-300 p-6">
            <h3 className="text-18-bold mb-4">Ценовой анализ</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Средняя цена:</span>
                <span className="text-16-semibold">
                  {analytics.averagePrice.toLocaleString("ru-RU")} ₽
                </span>
              </div>
              <div className="flex justify-between">
                <span>Популярный район:</span>
                <span className="text-16-semibold">{analytics.popularDistrict}</span>
              </div>
            </div>
          </div>

          {/* Conversion Metrics */}
          <div className="rounded-lg border border-dark-400 bg-dark-300 p-6">
            <h3 className="text-18-bold mb-4">Конверсия</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Всего заявок:</span>
                <span className="text-16-semibold">{analytics.totalInquiries}</span>
              </div>
              <div className="flex justify-between">
                <span>Конверсия:</span>
                <span className="text-16-semibold">
                  {analytics.conversionRate.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AnalyticsPage; 