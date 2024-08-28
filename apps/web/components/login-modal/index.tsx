"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CloseButton } from "./close-button";
import { useSearchParams } from "next/navigation";

import { PropsWithChildren } from "react";

export function LoginModal({ children }: PropsWithChildren) {
  const searchParams = useSearchParams();

  const open = searchParams.get("origin") === "modal";

  return (
    <Dialog open={open}>
      <DialogContent>
        <CloseButton />

        {children}
      </DialogContent>
    </Dialog>
  );
}
