"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchAgents() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const [search, setSearch] = useState(params.get("query") || "");

  function handleSearch() {
    if (search) {
      params.set("query", search);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex w-full md:w-auto items-center space-x-2">
      <Input
        type="text"
        placeholder="Buscar agentes..."
        className="w-full md:w-[300px]"
        value={search}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button size="icon" onClick={handleSearch}>
        <Search className="h-4 w-4" />
        <span className="sr-only">Buscar</span>
      </Button>
    </div>
  );
}
