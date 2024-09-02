"use client";

import { Button } from "@/components/ui/button";

type GoToSiteProps = {
  link: string;
};

export function GoToSite({ link }: GoToSiteProps) {
  function handleGoToSite() {
    window.open(link, "_blank");
  }

  return (
    <Button className="w-full" onClick={handleGoToSite}>
      Ir para site
    </Button>
  );
}
