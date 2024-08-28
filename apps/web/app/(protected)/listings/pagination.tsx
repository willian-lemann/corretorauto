"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams, useRouter } from "next/navigation";

type ListingsProps = {
  numberOfPages: number;
  page: number;
};

export function ListingPagination({ page, numberOfPages }: ListingsProps) {
  const params = useSearchParams();
  const searchparams = new URLSearchParams(params);
  const router = useRouter();

  function handlePage(page: number) {
    searchparams.set("page", page.toString());
    router.push(`?${searchparams.toString()}`);
  }

  function handleGoPrev() {
    if (page > 1) {
      handlePage(page - 1);
    }
  }

  function handleGoNext() {
    if (page < numberOfPages) {
      handlePage(page + 1);
    }
  }

  const limit = 5;
  const startPage = Math.max(1, page - Math.floor(limit / 2));
  const endPage = Math.min(startPage + limit - 1, numberOfPages);

  return (
    <Pagination className="py-10  md:block">
      <PaginationContent>
        {startPage >= 10 ? (
          <PaginationItem className="hidden md:block">
            <PaginationLink
              variant="ghost"
              className="px-10"
              isActive={page === 1}
              onClick={() => handlePage(1)}
            >
              Inicio
            </PaginationLink>
          </PaginationItem>
        ) : null}

        <PaginationItem className="px-3 md:px-0">
          <PaginationPrevious variant="ghost" onClick={handleGoPrev} />
        </PaginationItem>

        {Array.from({
          length: endPage - startPage + 1,
        }).map((_, index) => (
          <PaginationItem key={startPage + index}>
            <PaginationLink
              variant="ghost"
              isActive={startPage + index === page}
              onClick={() => handlePage(startPage + index)}
            >
              {startPage + index}
            </PaginationLink>
          </PaginationItem>
        ))}

        {endPage < numberOfPages && (
          <PaginationItem className="hidden md:block">
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem className="px-3 md:px-0">
          <PaginationNext variant="ghost" onClick={handleGoNext} />
        </PaginationItem>

        <PaginationItem className="hidden md:block">
          <PaginationLink
            className="px-10"
            variant="ghost"
            isActive={page === numberOfPages}
            onClick={() => handlePage(numberOfPages)}
          >
            Última
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
