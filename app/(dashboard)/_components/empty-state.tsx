"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { FilePlus, Plus } from "lucide-react";
import Link from "next/link";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 space-y-4">
      {/* Icon */}
      <div className="text-gray-400">
        <FilePlus className="w-16 h-16 mx-auto" />
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-semibold">No Tours Created Yet</h2>

      {/* Description */}
      <p className="text-gray-400 max-w-md">
        You haven’t created any tours yet. Once you create a tour, it will
        appear here. Get started by creating your first interactive tour!
      </p>

      {/* Call-to-action button */}

      <Button asChild className="mt-4 flex items-center space-x-2">
        <Link href="/tours/create">
          <Plus className="w-4 h-4" />
          <span>Create Tour</span>
        </Link>
      </Button>
    </div>
  );
};

export default EmptyState;
