"use client";

import React from "react";
import Link from "next/link";
import DashboardTitle from "../_components/dashboard-title";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreatedTours from "../_components/created-tours";

const Tours = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between flex-col md:flex-row gap-5 md:items-center">
        <DashboardTitle
          heading="Your Tours"
          description="Welcome to your Tour guide"
        />

        <Button asChild>
          <Link href="/tours/create">
            <Plus /> Create New Tour
          </Link>
        </Button>
      </div>

      {/* Show all created tours */}
      <CreatedTours />
    </div>
  );
};

export default Tours;
