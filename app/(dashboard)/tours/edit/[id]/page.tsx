"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import CreateTourForm from "../../../_components/create-tour-form";
import { TourFormValues, StepFormValues } from "../../../_schemas/tour-schema";
import { toast } from "sonner";
import Loader from "@/components/loader";

interface SupabaseStep {
  id: string;
  title: string;
  description: string | null;
  order_number: number;
}

interface SupabaseTour {
  id: string;
  name: string;
  description: string | null;
  steps: SupabaseStep[];
}

const EditTourPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id as string);

  const [tour, setTour] = useState<TourFormValues | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchTour = async () => {
      try {
        const res = await fetch(`/api/tours/${id}`);
        const data: { tour?: SupabaseTour; error?: string } = await res.json();

        if (!res.ok || !data.tour) {
          router.push("/tours");
          return;
        }

        const tourData: TourFormValues = {
          id: data.tour.id,
          name: data.tour.name,
          description: data.tour.description ?? "",
          steps: data.tour.steps.map((s: SupabaseStep) => ({
            order: s.order_number,
            title: s.title,
            description: s.description ?? "",
          })) as StepFormValues[],
        };

        setTour(tourData);
      } catch (error) {
        console.error("Failed to load tour:", error);
        router.push("/tours");
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [id, router]);

  const handleTourUpdated = async (updatedTour: TourFormValues) => {
    try {
      const res = await fetch(`/api/tours/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTour),
      });

      if (!res.ok) throw new Error("Failed to update tour");

      toast.success("Tour updated successfully!");
      router.push("/tours");
    } catch (error) {
      console.error("Error updating tour:", error);
      toast.error("Failed to update tour");
    }
  };

  if (loading) {
    return (
      <Loader itemName="tour details" />
    );
  }

  if (!tour) {
    return null;
  }

  return (
    <CreateTourForm
      existingTour={tour}
      mode="edit"
      onTourCreated={handleTourUpdated}
    />
  );
};

export default EditTourPage;
