"use client";

import { useEffect, useState } from "react";
import DashboardTitle from "../_components/dashboard-title";
import TourStatsCard from "../_components/tour-stats-card";
import TourChart from "../_components/tour-chart";
import EmptyState from "../_components/empty-state";
import { TourFormValues } from "../_schemas/tour-schema";
import Loader from "@/components/loader";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useUser } from "@/hooks/use-user";

export default function DashboardPage() {
  const [tours, setTours] = useState<TourFormValues[]>([]);
  const [loading, setLoading] = useState(true);
  // find loggedIn query params
  const searchParams = useSearchParams();
  const loggedIn = searchParams.get("loggedIn");
  const {user} = useUser()
  const username = user && user.user_metadata?.username;
  console.log(username);


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
  
    // show already loggedin toast
    useEffect(() => {
      if (loggedIn) {
        toast.info(`You are already logged in as ${loggedIn}. Please log out first to log in to another account.`)
      }
    }, [loggedIn])

  if (loading) return <Loader itemName="dashboard" />

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
