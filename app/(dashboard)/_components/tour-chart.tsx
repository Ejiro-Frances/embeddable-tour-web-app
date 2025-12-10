"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface StepAnalytics {
  step: string;
  completed: number;
  skipped: number;
}

interface TourChartProps {
  tourId: string;
}

export default function TourChart({ tourId }: TourChartProps) {
  const [stepData, setStepData] = useState<StepAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStepAnalytics = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `/api/analytics/step-analytics?tourId=${tourId}`
        );
        if (!res.ok) throw new Error("Failed to fetch step analytics");
        const data = await res.json();
        setStepData(data.analytics || []);
      } catch (err) {
        console.error(err);
        setError("Unable to load step analytics.");
      } finally {
        setLoading(false);
      }
    };

    fetchStepAnalytics();
  }, [tourId]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-4 w-48 mb-2" />
        </CardHeader>
        <CardContent className="h-64">
          <Skeleton className="h-full w-full" />
        </CardContent>
      </Card>
    );
  }

  if (error || !stepData.length) {
    return (
      <p className="text-center text-red-500">
        {error || "No step analytics available."}
      </p>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Steps Completed vs Skipped</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={stepData}>
            <XAxis dataKey="step" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="completed" fill="#22c55e" />
            <Bar dataKey="skipped" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
