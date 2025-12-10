"use client";

import { useEffect, useState } from "react";
import DashboardTitle from "../_components/dashboard-title";
import TourStatsCard from "../_components/tour-stats-card";
import TourChart from "../_components/tour-chart";
import EmptyState from "../_components/empty-state";
import { TourFormValues } from "../_schemas/tour-schema";

export default function DashboardPage() {
  const [tours, setTours] = useState<TourFormValues[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch("/api/tours");
        const data = await res.json();
        setTours(data.tours || []);
      } catch (err) {
        console.error("Failed to fetch tours:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="space-y-6">
      <DashboardTitle
        heading="Dashboard"
        description="Welcome to your dashboard"
      />

      {!tours.length ? (
        <EmptyState message="No tours found. Create a tour to see stats and charts." />
      ) : (
        <>
          <TourStatsCard tourId={tours[0].id!} />
          <TourChart tourId={tours[0].id!} />
        </>
      )}
    </div>
  );
}
