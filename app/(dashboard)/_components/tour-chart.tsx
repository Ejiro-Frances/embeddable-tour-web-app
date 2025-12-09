"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  //   PieChart,
  //   Pie,
  //   Cell,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/* -----------------------------------------------
   TYPE DEFINITIONS
------------------------------------------------ */

// Line chart: completion trend
export interface CompletionTrend {
  day: string;
  completed: number;
  [key: string]: string | number;
}

// Bar chart: steps analytics
export interface StepAnalytics {
  step: string;
  completed: number;
  skipped: number;
  [key: string]: string | number;
}

// Pie chart: device usage
export interface DeviceAnalytics {
  name: string;
  value: number;
  [key: string]: string | number;
}

/* -----------------------------------------------
   COMPONENT
------------------------------------------------ */

const TourChart = () => {
  const [loading, setLoading] = useState(true);

  const [completionTrend, setCompletionTrend] = useState<CompletionTrend[]>([]);
  const [stepData, setStepData] = useState<StepAnalytics[]>([]);
  //   const [deviceData, setDeviceData] = useState<DeviceAnalytics[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Fake API Data
      setCompletionTrend([
        { day: "Mon", completed: 14 },
        { day: "Tue", completed: 21 },
        { day: "Wed", completed: 18 },
        { day: "Thu", completed: 26 },
        { day: "Fri", completed: 32 },
        { day: "Sat", completed: 25 },
        { day: "Sun", completed: 19 },
      ]);

      setStepData([
        { step: "Step 1", completed: 120, skipped: 14 },
        { step: "Step 2", completed: 118, skipped: 9 },
        { step: "Step 3", completed: 112, skipped: 20 },
        { step: "Step 4", completed: 95, skipped: 30 },
        { step: "Step 5", completed: 80, skipped: 25 },
      ]);

      //   setDeviceData([
      //     { name: "Mobile", value: 64 },
      //     { name: "Desktop", value: 36 },
      //   ]);

      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  /* -----------------------------------------------
     LOADING STATE (Skeleton)
  ------------------------------------------------ */
  if (loading) {
    return (
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {[...Array(2)].map((_, i) => (
          <Card key={i} className="p-4">
            <Skeleton className="h-6 w-32 mb-4" />
            <Skeleton className="h-64 w-full" />
          </Card>
        ))}
      </div>
    );
  }

  /* -----------------------------------------------
     RENDER CHARTS
  ------------------------------------------------ */

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-10 lg:mt-16">
      {/* Line Chart – Completion Trend */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Tour Completion Trend (This Week)</CardTitle>
        </CardHeader>

        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={completionTrend}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#3b82f6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bar Chart – Steps Completed vs Skipped */}
      <Card className="rounded-2xl">
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

      {/* Pie Chart – Device Distribution */}
      {/* <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Device Distribution</CardTitle>
        </CardHeader>

        <CardContent>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={deviceData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={4}
              >
                <Cell fill="#3b82f6" />
                <Cell fill="#8b5cf6" />
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card> */}
    </div>
  );
};

export default TourChart;
