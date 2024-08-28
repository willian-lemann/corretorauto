"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { login } from "@/app/utils/redirects";

export function SeeMore() {
  const router = useRouter();

  function seeMore() {
    router.push(login);
  }

  return (
    <div className="w-full mx-auto flex items-center justify-center py-10">
      <Button onClick={seeMore}>Ver mais</Button>
    </div>
  );
}
