"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DeleteTourModalProps {
  tourId: string;
  tourName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleted?: () => void;
}

const DeleteTourModal: React.FC<DeleteTourModalProps> = ({
  tourId,
  tourName,
  open,
  onOpenChange,
  onDeleted,
}) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/tours/${tourId}`, { method: "DELETE" });

      if (!res.ok) {
        throw new Error("Failed to delete tour");
      }

      toast.success("Tour deleted successfully");
      onOpenChange(false);

      if (onDeleted) onDeleted();
    } catch (error) {
      console.error("Error deleting tour:", error);
      toast.error("Failed to delete tour");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Delete Tour</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the tour{" "}
            <span className="font-bold">{tourName}</span>? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTourModal;
