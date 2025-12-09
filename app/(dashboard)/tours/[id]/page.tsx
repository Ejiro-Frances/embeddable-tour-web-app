"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DeleteTourModal from "../../_components/delete-tour-modal";
import { StepFormValues, TourFormValues } from "../../_schemas/tour-schema";
import { ArrowLeft, CopyIcon, PencilIcon, TrashIcon } from "lucide-react";

const ViewTourPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();

  const id = Array.isArray(params.id) ? params.id[0] : (params.id as string);

  const [tour, setTour] = useState<TourFormValues | null>(() => {
    // Initialize state with the tour data on mount
    if (typeof window === "undefined" || !id) return null;

    try {
      const storedTours = localStorage.getItem("tours");
      if (!storedTours) return null;

      const tours: TourFormValues[] = JSON.parse(storedTours);
      return tours.find((t) => t.id === id) ?? null;
    } catch (error) {
      console.error("Failed to parse tours from localStorage:", error);
      return null;
    }
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    // Only run when ID changes (for navigation between different tours)
    if (typeof window === "undefined" || !id) return;

    const loadTour = () => {
      try {
        const storedTours = localStorage.getItem("tours");
        if (!storedTours) {
          setTour(null);
          return;
        }

        const tours: TourFormValues[] = JSON.parse(storedTours);
        const foundTour = tours.find((t) => t.id === id) ?? null;
        setTour(foundTour);
      } catch (error) {
        console.error("Failed to parse tours from localStorage:", error);
        setTour(null);
      }
    };

    loadTour();

    // Optional: Listen for storage changes (if updating from another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "tours") {
        loadTour();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [id]);

  const handleDelete = () => {
    if (!tour) return;

    try {
      const storedTours = localStorage.getItem("tours");
      if (!storedTours) return;

      const tours: TourFormValues[] = JSON.parse(storedTours);
      const updatedTours = tours.filter((t) => t.id !== tour.id);
      localStorage.setItem("tours", JSON.stringify(updatedTours));

      setIsDeleteModalOpen(false);
      router.push("/tours");
    } catch (error) {
      console.error("Failed to delete tour:", error);
    }
  };

  const handleCopyEmbed = () => {
    if (!tour) return;
    const embedCode = `<script src="https://your-app.com/embed/${tour.id}.js"></script>`;
    navigator.clipboard.writeText(embedCode);
    alert("Embed code copied to clipboard!");
  };

  const handleEdit = () => {
    if (!tour) return;
    router.push(`/tours/edit/${tour.id}`);
  };

  if (!tour) return <p className="text-center mt-10">Tour not found</p>;

  return (
    <div className="max-w-4xl mx-auto mt-6 space-y-6">
      <Button
        variant="outline"
        size="sm"
        onClick={() => router.push("/tours")}
        className="mb-4"
      >
        <ArrowLeft />
      </Button>
      <header className="flex flex-col md:flex-row justify-between gap-5 md:items-center pb-4 border-b">
        <h1 className="text-3xl font-bold">{tour.name}</h1>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleEdit}>
            <PencilIcon className="w-4 h-4 mr-2" /> Edit
          </Button>
          <Button variant="outline" size="sm" onClick={handleCopyEmbed}>
            <CopyIcon className="w-4 h-4 mr-2" /> Copy Script
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            <TrashIcon className="w-4 h-4 mr-2" /> Delete
          </Button>
        </div>
      </header>

      {tour.description && (
        <Card className="rounded-xl shadow p-4">
          <CardTitle className="text-lg mb-2">Description</CardTitle>
          <p className="text-gray-600">{tour.description}</p>
        </Card>
      )}

      <h2 className="text-2xl font-semibold mt-6">
        Steps ({tour.steps.length})
      </h2>

      <div className="space-y-4 mt-4">
        {tour.steps.map((step: StepFormValues) => (
          <Card key={step.id} className="rounded-xl shadow p-4">
            <CardHeader className="p-0 pb-2">
              <CardTitle className="text-xl font-medium">
                Step {step.order}: {step.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p>{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <DeleteTourModal
        tourName={tour.name}
        onConfirm={handleDelete}
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
      />
    </div>
  );
};

export default ViewTourPage;
