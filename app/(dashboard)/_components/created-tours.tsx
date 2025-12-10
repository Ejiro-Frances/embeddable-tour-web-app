"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TourFormValues } from "../_schemas/tour-schema";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EmptyState from "./empty-state";
import DeleteTourModal from "./modals/delete-tour-modal";
import {
  CopyIcon,
  EllipsisVertical,
  PencilIcon,
  TrashIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { getEmbedScript } from "@/lib/utils";
import Loader from "@/components/loader";

const CreatedTours: React.FC = () => {
  const router = useRouter();
  const [tours, setTours] = useState<TourFormValues[]>([]);
  const [loading, setLoading] = useState(true);
  const [tourToDelete, setTourToDelete] = useState<TourFormValues | null>(null);

  // Fetch tours from API
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch("/api/tours");
        const data = await res.json();
        setTours(data.tours || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const handleViewDetails = (tourId: string) => router.push(`/tours/${tourId}`);
  const handleEdit = (tourId: string) => router.push(`/tours/edit/${tourId}`);
  const handleCopyEmbed = (tourId: string) => {
    const embedCode = getEmbedScript(tourId);
    navigator.clipboard.writeText(embedCode);
    toast.success("Embed code copied to clipboard!");
  };

  if (loading) return <Loader itemName="your tours" />

  if (!tours.length) return <EmptyState />;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {tours.map((tour) => (
        <Card
          key={tour.id}
          className="rounded-2xl p-4 shadow hover:shadow-lg transition relative"
        >
          <CardHeader className="flex flex-row justify-between items-start space-x-4">
            <CardTitle className="text-lg font-semibold">{tour.name}</CardTitle>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="p-2 ml-auto">
                  <EllipsisVertical className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="bg-background">
                <DropdownMenuItem onClick={() => handleEdit(tour.id!)}>
                  <PencilIcon /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() => setTourToDelete(tour)}
                >
                  <TrashIcon /> Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleCopyEmbed(tour.id!)}>
                  <CopyIcon /> Copy Embed Code
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>

          <CardContent className="space-y-2">
            <p className="text-gray-600">
              {tour.description || "No description provided."}
            </p>
            <p className="text-sm text-gray-500">{tour.steps.length} Steps</p>
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button size="sm" onClick={() => handleViewDetails(tour.id!)}>
              View Details
            </Button>
          </CardFooter>
        </Card>
      ))}

      {tourToDelete && (
        <DeleteTourModal
          tourId={tourToDelete.id!}
          tourName={tourToDelete.name}
          open={!!tourToDelete}
          onOpenChange={(open) => {
            if (!open) setTourToDelete(null);
          }}
          onDeleted={() => {
            // remove the deleted tour from state
            setTours((prev) => prev.filter((t) => t.id !== tourToDelete.id));
            setTourToDelete(null);
          }}
        />
      )}
    </div>
  );
};

export default CreatedTours;
