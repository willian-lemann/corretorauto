"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ListFilterIcon, SearchIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Label } from "./ui/label";

const types = [
  { label: "Apartamento", value: "Apartamento" },
  { label: "Comercial", value: "Comercial" },
  { label: "Residencial", value: "Residencial" },
];

const filters = [
  { label: "Aluguel", value: "Aluguel" },
  { label: "Venda", value: "Venda" },
];

export function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const [search, setSearch] = useState(params.get("q") || "");
  const [isFloating, setIsFloating] = useState(false);

  const hasFilters = params.has("filter") || params.has("type");

  function handleSearch() {
    if (search) {
      params.set("q", search);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  function handleFilter(filter: string) {
    if (filter) {
      params.set("filter", filter);
    } else {
      params.delete("filter");
    }
    params.delete("page");
    replace(`${pathname}?${params.toString()}`);
  }

  function handleType(type: string) {
    if (type) {
      params.set("type", type);
    } else {
      params.delete("type");
    }
    params.delete("page");
    replace(`${pathname}?${params.toString()}`);
  }

  function clearFilters() {
    params.delete("q");
    params.delete("filter");
    params.delete("type");
    replace(`${pathname}?${params.toString()}`);
    setSearch("");
  }

  useEffect(() => {
    function handleScroll() {
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop;
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const scrollPercentage =
        (scrollPosition / (documentHeight - windowHeight)) * 100;

      if (scrollPercentage >= 2) {
        setIsFloating(true);
      } else {
        if (scrollPercentage === 0) {
          setIsFloating(false);
        }
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function renderFloatingSearch() {
    return (
      <div
        data-floating={isFloating}
        className="-translate-y-[200px] md:-translate-y-[100px] data-[floating=true]:-translate-y-0 fixed z-[9999] flex transition-all md:max-w-4xl top-0  shadow-md md:top-2 left-1/2 -translate-x-1/2 py-6 md:rounded-3xl  md:mx-auto md:flex-row flex-col md:items-center justify-end px-4 md:container w-full gap-2 bg-background"
      >
        <div className="relative flex-1 max-w-lg flex">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Pesquise pelo nome, endereço ou código do imóvel"
            value={search}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-3 pl-12 pr-4 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />

          {/* mobile filters */}
          <div className="flex md:hidden gap-1 ml-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="default" className="gap-1">
                  <ListFilterIcon className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    {params.get("filter") || "Filtrar por"}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="">
                <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {filters.map((filter) => (
                  <DropdownMenuCheckboxItem
                    checked={params.get("filter") === filter.value}
                    key={filter.value}
                    onClick={() => handleFilter(filter.value)}
                  >
                    {filter.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="default" className="gap-1">
                  <ListFilterIcon className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    {params.get("type") || "Tipo de imóvel"}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel> Tipo de imóvel</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {types.map((type) => (
                  <DropdownMenuCheckboxItem
                    key={type.value}
                    checked={params.get("type") === type.value}
                    onClick={() => handleType(type.value)}
                  >
                    {type.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Button
          type="button"
          onClick={handleSearch}
          className="px-6 py-3 rounded-r-lg"
        >
          <SearchIcon className="mr-2 w-5 h-5" />
          Procurar
        </Button>

        {/* desktop filters */}
        <div className="hidden md:flex gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="default" className="gap-1">
                <ListFilterIcon className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  {params.get("filter") || "Filtrar por"}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="">
              <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {filters.map((filter) => (
                <DropdownMenuCheckboxItem
                  checked={params.get("filter") === filter.value}
                  key={filter.value}
                  onClick={() => handleFilter(filter.value)}
                >
                  {filter.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="default" className="gap-1">
                <ListFilterIcon className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  {params.get("type") || "Tipo de imóvel"}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel> Tipo de imóvel</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {types.map((type) => (
                <DropdownMenuCheckboxItem
                  key={type.value}
                  checked={params.get("type") === type.value}
                  onClick={() => handleType(type.value)}
                >
                  {type.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {hasFilters ? (
          <Button
            onClick={clearFilters}
            variant="secondary"
            className="flex items-center gap-2"
          >
            <Label className="cursor-pointer">Limpar filtros</Label>
            <XIcon className="h-4 w-4" />
          </Button>
        ) : null}
      </div>
    );
  }

  return (
    <>
      {renderFloatingSearch()}

      <div
        data-floating={isFloating}
        className="data-[floating=true]:invisible transition-all flex md:flex-row flex-col md:items-center justify-end px-4 md:container w-full gap-2 bg-background rounded-lg "
      >
        <div className="relative flex-1 max-w-lg flex">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Pesquise pelo nome, endereço ou código do imóvel"
            value={search}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-3 pl-12 pr-4 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />

          {/* mobile filters */}
          <div className="flex md:hidden gap-1 ml-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="default" className="gap-1">
                  <ListFilterIcon className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    {params.get("filter") || "Filtrar por"}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="">
                <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {filters.map((filter) => (
                  <DropdownMenuCheckboxItem
                    checked={params.get("filter") === filter.value}
                    key={filter.value}
                    onClick={() => handleFilter(filter.value)}
                  >
                    {filter.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="default" className="gap-1">
                  <ListFilterIcon className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    {params.get("type") || "Tipo de imóvel"}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel> Tipo de imóvel</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {types.map((type) => (
                  <DropdownMenuCheckboxItem
                    key={type.value}
                    checked={params.get("type") === type.value}
                    onClick={() => handleType(type.value)}
                  >
                    {type.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Button
          type="button"
          onClick={handleSearch}
          className="px-6 py-3 rounded-r-lg"
        >
          <SearchIcon className="mr-2 w-5 h-5" />
          Procurar
        </Button>

        {/* desktop filters */}
        <div className="hidden md:flex gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="default" className="gap-1">
                <ListFilterIcon className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  {params.get("filter") || "Filtrar por"}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="">
              <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {filters.map((filter) => (
                <DropdownMenuCheckboxItem
                  checked={params.get("filter") === filter.value}
                  key={filter.value}
                  onClick={() => handleFilter(filter.value)}
                >
                  {filter.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="default" className="gap-1">
                <ListFilterIcon className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  {params.get("type") || "Tipo de imóvel"}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel> Tipo de imóvel</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {types.map((type) => (
                <DropdownMenuCheckboxItem
                  key={type.value}
                  checked={params.get("type") === type.value}
                  onClick={() => handleType(type.value)}
                >
                  {type.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {hasFilters ? (
          <Button
            onClick={clearFilters}
            variant="secondary"
            className="flex items-center gap-2"
          >
            <Label className="cursor-pointer">Limpar filtros</Label>
            <XIcon className="h-4 w-4" />
          </Button>
        ) : null}
      </div>
    </>
  );
}
