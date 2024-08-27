import { XIcon } from "lucide-react";
import Link from "next/link";

export function CloseButton() {
  return (
    <Link href="/" prefetch={false}>
      <XIcon className="absolute right-3 top-3 z-50 w-4 h-4 cursor-pointer" />
    </Link>
  );
}
