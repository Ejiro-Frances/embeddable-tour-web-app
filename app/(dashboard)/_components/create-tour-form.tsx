"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { tourSchema, TourFormValues } from "../_schemas/tour-schema";
import { toast } from "sonner";

interface Props {
  existingTour?: TourFormValues;
  mode?: "create" | "edit";
  onTourCreated?: (tour: TourFormValues) => void;
}

const CreateTourForm: React.FC<Props> = ({
  existingTour,
  mode = "create",
  onTourCreated,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isEditMode = mode === "edit";

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TourFormValues>({
    resolver: zodResolver(tourSchema),
    defaultValues: existingTour || {
      name: "",
      description: "",
      steps: Array.from({ length: 5 }, (_, i) => ({
        title: "",
        description: "",
        order: i + 1,
      })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "steps",
  });

  const onSubmit = async (data: TourFormValues) => {
    setLoading(true);

    try {
      const res = await fetch("/api/tours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Failed to create tour");

      toast.success("Tour created successfully!");

      if (onTourCreated) onTourCreated(result.tour);

      router.push("/tours");
    } catch (error) {
      console.error(error);
      toast.error("Unable to create tour.");
    }

    setLoading(false);
  };

  return (
    <article className="w-full mt-6 max-w-5xl mx-auto">
      <header className="sticky top-7 z-10 flex justify-between items-center mb-4 border-b backdrop-blur-3xl pb-4 shadow-2xl">
        <h3 className="text-2xl lg:text-3xl font-bold">
          {isEditMode ? "Edit Tour" : "Create Your Tour"}
        </h3>

        <Button
          type="button"
          onClick={() =>
            append({
              title: "",
              description: "",
              order: fields.length + 1,
            })
          }
        >
          Add Step
        </Button>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Tour Name</Label>
          <Input id="name" {...register("name")} />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" {...register("description")} />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Steps</h3>

          <div className="grid md:grid-cols-2 gap-5">
            {fields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-lg space-y-4">
                <div className="flex justify-between">
                  <h4 className="font-medium">Step {index + 1}</h4>
                  {fields.length > 5 && (
                    <Button
                      variant="destructive"
                      size="sm"
                      type="button"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>

                <Input
                  placeholder="Step Title"
                  {...register(`steps.${index}.title` as const)}
                />
                <Textarea
                  placeholder="Step Description"
                  {...register(`steps.${index}.description` as const)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/tours")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Tour"}
          </Button>
        </div>
      </form>
    </article>
  );
};

export default CreateTourForm;
