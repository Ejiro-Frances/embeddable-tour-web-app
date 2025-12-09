"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MapIcon,
  CheckCircle2Icon,
  PercentIcon,
  ForwardIcon,
  TimerIcon,
  FlagIcon,
  CircleSlash2Icon,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

interface Stat {
  title: string;
  value: string | number;
  icon: LucideIcon;
}
const TourStatsCard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stat[]>([]);

  useEffect(() => {
    // Simulate API call delay
    const timeout = setTimeout(() => {
      setStats([
        {
          title: "Total Tours Created",
          value: 128,
          icon: MapIcon,
        },
        {
          title: "Total Tours Completed",
          value: 102,
          icon: CheckCircle2Icon,
        },
        {
          title: "Completion Rate",
          value: "79%",
          icon: PercentIcon,
        },
        {
          title: "Steps Skipped",
          value: 34,
          icon: ForwardIcon,
        },
        {
          title: "Average Tour Duration",
          value: "12 mins",
          icon: TimerIcon,
        },
        {
          title: "Active Tours Today",
          value: 14,
          icon: FlagIcon,
        },
        {
          title: "Abandon Rate",
          value: "21%",
          icon: CircleSlash2Icon,
        },
      ]);

      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
      {loading
        ? [...Array(7)].map((_, i) => (
            <Card key={i} className="p-4">
              <Skeleton className="h-6 w-24 mb-4" />
              <Skeleton className="h-8 w-16" />
            </Card>
          ))
        : stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="rounded-2xl shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>

                  <Icon className="h-5 w-5 text-primary" />
                </CardHeader>

                <CardContent>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </CardContent>
              </Card>
            );
          })}
    </div>
  );
};

export default TourStatsCard;
