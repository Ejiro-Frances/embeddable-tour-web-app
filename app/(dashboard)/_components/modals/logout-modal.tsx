"use client";

import { useState } from "react";
import { signOut } from "@/lib/supabase/auth";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function LogoutModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    try {
      setLoading(true);
      const { error } = await signOut();
      if (!error) {
        router.push("/login"); // redirect after logout
      }
    } finally {
      setLoading(false);
      onClose();
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Log Out</DialogTitle>
          <DialogDescription className="text-white/90 text-center">
            Are you sure you want to log out of your account?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-5">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={handleLogout}
            disabled={loading}
          >
            {loading ? "Logging out..." : "Logout"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
