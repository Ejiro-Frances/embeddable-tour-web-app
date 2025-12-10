"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DeleteTourModal from "../../_components/modals/delete-tour-modal";
import { StepFormValues, TourFormValues } from "../../_schemas/tour-schema";
import { ArrowLeft, CopyIcon, PencilIcon, TrashIcon } from "lucide-react";
import { toast } from "sonner";
import { getEmbedScript } from "@/lib/utils";
import Loader from "@/components/loader";

// Type for API response
interface TourApiResponse {
	tour: {
		id: string;
		name: string;
		description: string | null;
		steps: {
			id: string;
			order_number: number;
			title: string;
			description: string;
		}[];
	};
}

const ViewTourPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const tourId = Array.isArray(params.id)
    ? params.id[0]
    : (params.id as string);

  const [tour, setTour] = useState<TourFormValues | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Fetch tour via API route
  useEffect(() => {
    if (!tourId) return;

    const fetchTour = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/tours/${tourId}`);
        if (!res.ok) throw new Error("Failed to fetch tour");

        const data: TourApiResponse = await res.json();
        const fetchedTour = data.tour;

        // Map API response to your TourFormValues type
        const mappedTour: TourFormValues = {
          id: fetchedTour.id,
          name: fetchedTour.name,
          description: fetchedTour.description || "",
          steps: fetchedTour.steps.map<StepFormValues>((s) => ({
            id: s.id,
            order: s.order_number,
            title: s.title,
            description: s.description,
          })),
        };

        setTour(mappedTour);
      } catch (err) {
        console.error("Error fetching tour:", err);
        toast.error("Failed to load tour");
        setTour(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [tourId]);

  const handleCopyEmbed = () => {
    if (!tour?.id) return;
    const embedCode = getEmbedScript(tour.id);
    navigator.clipboard.writeText(embedCode);
    toast.success("Embed code copied to clipboard!");
  };

  const handleEdit = () => {
    if (!tour?.id) return;
    router.push(`/tours/edit/${tour.id}`);
  };

  if (loading) return <Loader itemName="tour details" />;
  if (!tour)
    return <p className="text-center mt-10 text-red-500">Tour not found</p>;

  return (
    <div className="max-w-4xl mx-auto mt-6 space-y-6">
      <Button
        variant="outline"
        size="sm"
        onClick={() => router.back()}
        className="mb-4"
      >
        <ArrowLeft className="mr-2" /> Back
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

      {tour.id && (
        <DeleteTourModal
          tourId={tour.id}
          tourName={tour.name}
          open={isDeleteModalOpen}
          onOpenChange={setIsDeleteModalOpen}
          onDeleted={() => router.push("/tours")}
        />
      )}
    </div>
  );
};

export default ViewTourPage;
