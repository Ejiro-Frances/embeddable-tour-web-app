"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TourStats, CompletionTrend } from "@/types/database";

interface TourStatsCardProps {
  tourId: string;
}

export default function TourStatsCard({ tourId }: TourStatsCardProps) {
  const [stats, setStats] = useState<TourStats | null>(null);
  const [, setTrend] = useState<CompletionTrend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [statsRes, trendRes] = await Promise.all([
          fetch(`/api/analytics/stats?tourId=${tourId}`),
          fetch(`/api/analytics/completion-trend?tourId=${tourId}`),
        ]);

        if (!statsRes.ok || !trendRes.ok) {
          throw new Error("Failed to fetch analytics data");
        }

        const statsData: { stats: TourStats } = await statsRes.json();
        const trendData: { trend: CompletionTrend[] } = await trendRes.json();

        setStats(statsData.stats);
        setTrend(trendData.trend);
      } catch (err) {
        console.error(err);
        setError("Unable to load tour stats.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tourId]);


  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-24 mb-2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error || !stats) {
    return (
      <p className="text-center text-red-500">
        {error || "No stats available"}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Tours</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">
          {stats.totalToursCreated}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Tours Completed</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">
          {stats.totalToursCompleted}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Completion Rate</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">
          {stats.completionRate}%
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Steps Skipped</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">
          {stats.stepsSkipped}
        </CardContent>
      </Card>
    </div>
  );
}
