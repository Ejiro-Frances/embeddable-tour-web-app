"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TourFormValues } from "../_schemas/tour-schema";
import EmptyState from "./empty-state";
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
import DeleteTourModal from "./delete-tour-modal";

const CreatedTours: React.FC = () => {
  const router = useRouter();

  // 1. Initialize tours state from localStorage
  const [tours, setTours] = useState<TourFormValues[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("tours");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  // 2. State to track which tour is being deleted
  const [tourToDelete, setTourToDelete] = useState<TourFormValues | null>(null);

  // 3. Centralized delete function
  const handleDelete = (id: string) => {
    const updated = tours.filter((t) => t.id !== id);
    setTours(updated);
    localStorage.setItem("tours", JSON.stringify(updated));
    setTourToDelete(null);
  };

  // 4. Navigation handlers
  const handleViewDetails = (tourId: string) => {
    router.push(`/tours/${tourId}`);
  };

  const handleEdit = (tourId: string) => {
    router.push(`/tours/edit/${tourId}`);
  };

  const handleCopyEmbed = (tourId: string) => {
    const embedCode = `<script src="https://your-app.com/embed/${tourId}.js"></script>`;
    navigator.clipboard.writeText(embedCode);
    alert("Embed code copied to clipboard!");
  };

  if (tours.length === 0) return <EmptyState />;

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
                {/* Edit */}
                <DropdownMenuItem onClick={() => handleEdit(tour.id!)}>
                  <PencilIcon className="w-4 h-4 mr-2" /> Edit
                </DropdownMenuItem>

                {/* Delete */}
                <DropdownMenuItem
                  className="text-red-600 focus:text-red-600"
                  onClick={() => setTourToDelete(tour)}
                >
                  <TrashIcon className="w-4 h-4 mr-2" /> Delete
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {/* Copy Embed Code */}
                <DropdownMenuItem onClick={() => handleCopyEmbed(tour.id!)}>
                  <CopyIcon className="w-4 h-4 mr-2" /> Copy Embed Code
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

      {/* Render the modal outside the map, only when a tour is selected for deletion */}
      {tourToDelete && (
        <DeleteTourModal
          tourName={tourToDelete.name}
          onConfirm={() => handleDelete(tourToDelete.id!)}
          open={!!tourToDelete}
          onOpenChange={(open) => {
            if (!open) setTourToDelete(null);
          }}
        />
      )}
    </div>
  );
};

export default CreatedTours;
// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { TourFormValues } from "../_schemas/tour-schema";
// import EmptyState from "./empty-state";
// import {
//   CopyIcon,
//   EllipsisVertical,
//   PencilIcon,
//   TrashIcon,
// } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
//   DropdownMenuSeparator,
// } from "@/components/ui/dropdown-menu";
// import DeleteTourModal from "./delete-tour-modal";

// const CreatedTours: React.FC = () => {
//   const router = useRouter();

//   // 1. Initialize tours state from localStorage
//   const [tours, setTours] = useState<TourFormValues[]>(() => {
//     if (typeof window !== "undefined") {
//       const stored = localStorage.getItem("tours");
//       return stored ? JSON.parse(stored) : [];
//     }
//     return [];
//   });

//   // 2. State to track which tour is being deleted
//   const [tourToDelete, setTourToDelete] = useState<TourFormValues | null>(null);

//   // 3. Centralized delete function
//   const handleDelete = (id: string) => {
//     const updated = tours.filter((t) => t.id !== id);
//     setTours(updated);
//     localStorage.setItem("tours", JSON.stringify(updated));
//     // Clear the tourToDelete state to close the modal
//     setTourToDelete(null);
//   };

//   // 4. Navigation handlers
//   const handleViewDetails = (tourId: string) => {
//     router.push(`/tours/${tourId}`);
//   };

//   if (tours.length === 0) return <EmptyState />;

//   return (
//     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//       {tours.map((tour) => (
//         <Card
//           key={tour.id}
//           className="rounded-2xl p-4 shadow hover:shadow-lg transition relative"
//         >
//           <CardHeader className="flex flex-row justify-between items-start space-x-4">
//             <CardTitle className="text-lg font-semibold">{tour.name}</CardTitle>

//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" size="icon" className="p-2 ml-auto">
//                   <EllipsisVertical className="w-5 h-5" />
//                 </Button>
//               </DropdownMenuTrigger>

//               <DropdownMenuContent align="end" className="bg-background">
//                 {/* Edit */}
//                 <DropdownMenuItem onClick={() => alert(`Edit ${tour.name}`)}>
//                   <PencilIcon className="w-4 h-4 mr-2" /> Edit
//                 </DropdownMenuItem>

//                 {/* Delete - This is where we set the state */}
//                 <DropdownMenuItem
//                   className="text-red-600 focus:text-red-600"
//                   onClick={() => setTourToDelete(tour)} // Open modal & pass tour data
//                 >
//                   <TrashIcon className="w-4 h-4 mr-2" /> Delete
//                 </DropdownMenuItem>

//                 <DropdownMenuSeparator />

//                 {/* Copy Embed Code */}
//                 <DropdownMenuItem
//                   onClick={() => {
//                     const embedCode = `<script src="https://your-app.com/embed/${tour.id}.js"></script>`;
//                     navigator.clipboard.writeText(embedCode);
//                     alert("Embed code copied to clipboard!");
//                   }}
//                 >
//                   <CopyIcon className="w-4 h-4 mr-2" /> Copy Embed Code
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </CardHeader>

//           <CardContent className="space-y-2">
//             <p className="text-gray-600">
//               {tour.description || "No description provided."}
//             </p>
//             <p className="text-sm text-gray-500">{tour.steps.length} Steps</p>
//           </CardContent>

//           <CardFooter className="flex justify-end">
//             <Button size="sm" onClick={() => handleViewDetails(tour.id!)}>
//               View Details
//             </Button>
//           </CardFooter>
//         </Card>
//       ))}

//       {/* 4. Render the modal outside the map, but only when a tour is selected for deletion */}
//       {tourToDelete && (
//         <DeleteTourModal
//           tourName={tourToDelete.name}
//           // FIX: Use the non-null assertion operator '!' on tourToDelete.id
//           onConfirm={() => handleDelete(tourToDelete.id!)}
//           open={!!tourToDelete}
//           onOpenChange={(open) => {
//             if (!open) setTourToDelete(null); // Close modal by clearing state
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default CreatedTours;
