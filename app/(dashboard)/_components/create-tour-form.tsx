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

// Utility to generate temporary random ID
const generateRandomId = () => Math.floor(Math.random() * 1000000).toString();

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
      id: generateRandomId(),
      name: "",
      description: "",
      steps: Array.from({ length: 5 }, (_, i) => ({
        id: generateRandomId(),
        order: i + 1,
        title: "",
        description: "",
      })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "steps",
  });

  const onSubmit = (data: TourFormValues) => {
    setLoading(true);

    setTimeout(() => {
      try {
        const storedTours = localStorage.getItem("tours");
        const tours: TourFormValues[] = storedTours
          ? JSON.parse(storedTours)
          : [];

        if (isEditMode && existingTour) {
          // Update existing tour
          const tourIndex = tours.findIndex((t) => t.id === existingTour.id);
          if (tourIndex !== -1) {
            // Preserve the original ID and update the tour
            tours[tourIndex] = { ...data, id: existingTour.id };
            localStorage.setItem("tours", JSON.stringify(tours));
            alert("Tour updated successfully!");
          } else {
            alert("Tour not found!");
            setLoading(false);
            return;
          }
        } else {
          // Create new tour
          tours.push(data);
          localStorage.setItem("tours", JSON.stringify(tours));
          alert("Tour created successfully!");
        }

        setLoading(false);
        if (onTourCreated) onTourCreated(data);

        // Navigate back to tours list
        router.push("/tours");
      } catch (error) {
        console.error("Failed to save tour:", error);
        alert("Failed to save tour. Please try again.");
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <article className="w-full mt-6 max-w-5xl mx-auto">
      {/* Sticky Header */}
      <header className="sticky top-7 z-10 flex justify-between items-center mb-4 border-b backdrop-blur-3xl pb-4 shadow-2xl">
        <h3 className="text-2xl lg:text-3xl font-bold">
          {isEditMode ? "Edit Tour" : "Create Your Tour"}
        </h3>

        <Button
          type="button"
          onClick={() =>
            append({
              id: generateRandomId(),
              order: fields.length + 1,
              title: "",
              description: "",
            })
          }
        >
          Add Step
        </Button>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Tour Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Tour Name</Label>
          <Input
            id="name"
            {...register("name")}
            placeholder="Enter the name of your tour"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Tour Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description (optional)</Label>
          <Textarea
            id="description"
            {...register("description")}
            placeholder="Describe your tour"
          />
        </div>

        {/* Steps */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Steps</h3>

          <div className="grid md:grid-cols-2 gap-5">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Step {index + 1}</h4>
                  {fields.length > 5 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>

                <div className="grid gap-2 space-y-2">
                  <Input
                    placeholder="Step Title"
                    {...register(`steps.${index}.title` as const)}
                  />
                  {errors.steps?.[index]?.title && (
                    <p className="text-red-500 text-sm">
                      {errors.steps[index]?.title?.message}
                    </p>
                  )}

                  <Textarea
                    placeholder="Step Description"
                    {...register(`steps.${index}.description` as const)}
                  />
                  {errors.steps?.[index]?.description && (
                    <p className="text-red-500 text-sm">
                      {errors.steps[index]?.description?.message}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {errors.steps?.message && (
            <p className="text-red-500 text-sm">{errors.steps.message}</p>
          )}
        </div>

        <div className="mt-4 text-sm text-gray-500">
          Minimum 5 steps required. After saving, you can generate an embed
          token/script.
        </div>

        {/* Submit / Cancel */}
        <div className="flex justify-end gap-4 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/tours")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : isEditMode ? "Update Tour" : "Save Tour"}
          </Button>
        </div>
      </form>
    </article>
  );
};

export default CreateTourForm;

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useForm, useFieldArray } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { tourSchema, TourFormValues } from "../_schemas/tour-schema";

// // Utility to generate temporary random ID
// const generateRandomId = () => Math.floor(Math.random() * 1000000).toString();

// interface Props {
//   onTourCreated?: (tour: TourFormValues) => void;
// }

// const CreateTourForm: React.FC<Props> = ({ onTourCreated }) => {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   const {
//     control,
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<TourFormValues>({
//     resolver: zodResolver(tourSchema),
//     defaultValues: {
//       id: generateRandomId(),
//       name: "",
//       description: "",
//       steps: Array.from({ length: 5 }, (_, i) => ({
//         id: generateRandomId(),
//         order: i + 1,
//         // selector: "",
//         title: "",
//         description: "",
//       })),
//     },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "steps",
//   });

//   const onSubmit = (data: TourFormValues) => {
//     setLoading(true);

//     // Simulate API call delay
//     setTimeout(() => {
//       // Save to localStorage
//       const storedTours = localStorage.getItem("tours");
//       const tours = storedTours ? JSON.parse(storedTours) : [];
//       tours.push(data);
//       localStorage.setItem("tours", JSON.stringify(tours));
//       router.push("/tours");

//       setLoading(false);

//       if (onTourCreated) onTourCreated(data);

//       alert("Tour saved locally!");
//     }, 1000);
//   };

//   return (
//     <article className="w-full mt-6 max-w-5xl mx-auto">
//       {/* Sticky Header */}
//       <header className="sticky top-7 z-10 flex justify-between items-center mb-4 border-b backdrop-blur-3xl pb-4 shadow-2xl">
//         <h3 className="text-2xl lg:text-3xl font-bold">Create Your Tour</h3>

//         <Button
//           type="button"
//           onClick={() =>
//             append({
//               id: generateRandomId(),
//               order: fields.length + 1,
//               //   selector: "",
//               title: "",
//               description: "",
//             })
//           }
//         >
//           Add Step
//         </Button>
//       </header>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         {/* Tour Name */}
//         <div className="space-y-2">
//           <Label htmlFor="name">Tour Name</Label>
//           <Input
//             id="name"
//             {...register("name")}
//             placeholder="Enter the name of your tour"
//           />
//           {errors.name && (
//             <p className="text-red-500 text-sm">{errors.name.message}</p>
//           )}
//         </div>

//         {/* Tour Description */}
//         <div className="space-y-2">
//           <Label htmlFor="description">Description (optional)</Label>
//           <Textarea
//             id="description"
//             {...register("description")}
//             placeholder="Describe your tour"
//           />
//         </div>

//         {/* Steps */}
//         <div className="space-y-4">
//           <h3 className="text-lg font-semibold">Steps</h3>

//           <div className="grid md:grid-cols-2 gap-5">
//             {fields.map((field, index) => (
//               <div
//                 key={field.id}
//                 className="p-4 border border-gray-200 rounded-lg"
//               >
//                 <div className="flex justify-between items-center mb-2">
//                   <h4 className="font-medium">Step {field.order}</h4>
//                   {fields.length > 5 && (
//                     <Button
//                       variant="destructive"
//                       size="sm"
//                       onClick={() => remove(index)}
//                     >
//                       Remove
//                     </Button>
//                   )}
//                 </div>

//                 <div className="grid gap-2 space-y-2">
//                   <Input
//                     placeholder="Step Title"
//                     {...register(`steps.${index}.title` as const)}
//                   />
//                   {errors.steps?.[index]?.title && (
//                     <p className="text-red-500 text-sm">
//                       {errors.steps[index]?.title?.message}
//                     </p>
//                   )}

//                   <Textarea
//                     placeholder="Step Description"
//                     {...register(`steps.${index}.description` as const)}
//                   />
//                   {errors.steps?.[index]?.description && (
//                     <p className="text-red-500 text-sm">
//                       {errors.steps[index]?.description?.message}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {errors.steps?.message && (
//             <p className="text-red-500 text-sm">{errors.steps.message}</p>
//           )}
//         </div>

//         <div className="mt-4 text-sm text-gray-500">
//           Minimum 5 steps required. After saving, you can generate an embed
//           token/script.
//         </div>

//         {/* Submit / Cancel */}
//         <div className="flex justify-end gap-4 mt-4">
//           <Button variant="outline" onClick={() => router.push("/tours")}>
//             Cancel
//           </Button>
//           <Button type="submit" disabled={loading}>
//             {loading ? "Saving..." : "Save Tour"}
//           </Button>
//         </div>
//       </form>
//     </article>
//   );
// };

// export default CreateTourForm;
