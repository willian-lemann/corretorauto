"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CloseButton } from "./close-button";
import { usePathname } from "next/navigation";

export function ModalPage({ children }: React.PropsWithChildren) {
  const pathname = usePathname();

  return (
    <Dialog open={pathname === "/login"}>
      <DialogContent>
        <CloseButton />

        {children}
      </DialogContent>
    </Dialog>
  );
}
