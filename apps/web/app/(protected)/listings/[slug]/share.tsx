"use client";

import { Button } from "@/components/ui/button";
import { Share2Icon } from "lucide-react";

export function Share() {
  const handleShare = () => {
    const encodedLink = encodeURIComponent(window.location.href);
    const whatsappLink = `https://api.whatsapp.com/send?text=${encodedLink}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="flex gap-4">
      <Button variant="outline" size="icon" onClick={handleShare}>
        <Share2Icon className="h-4 w-4" />
        <span className="sr-only">Share</span>
      </Button>
      {/* <Button variant="outline" size="icon">
        <HeartIcon className="h-4 w-4" />
        <span className="sr-only">Save</span>
      </Button> */}
    </div>
  );
}
