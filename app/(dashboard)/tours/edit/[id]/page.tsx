"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import CreateTourForm from "../../../_components/create-tour-form";
import { TourFormValues } from "../../../_schemas/tour-schema";

const EditTourPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id as string);

  const [tour, setTour] = useState<TourFormValues | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined" || !id) return;

    try {
      const storedTours = localStorage.getItem("tours");
      if (!storedTours) {
        router.push("/tours");
        return;
      }

      const tours: TourFormValues[] = JSON.parse(storedTours);
      const foundTour = tours.find((t) => t.id === id);

      if (foundTour) {
        setTour(foundTour);
      } else {
        router.push("/tours");
      }
    } catch (error) {
      console.error("Failed to load tour:", error);
      router.push("/tours");
    } finally {
      setLoading(false);
    }
  }, [id, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-lg">Loading tour...</p>
      </div>
    );
  }

  if (!tour) {
    return null;
  }

  return <CreateTourForm existingTour={tour} mode="edit" />;
};

export default EditTourPage;
