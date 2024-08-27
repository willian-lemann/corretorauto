import { Listings } from "@/app/listings/listings";
import { Header } from "@/components/header";
import { Search } from "@/components/search";
import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";
import { Skeleton } from "./listings/skeleton";

type HomePageProps = {
  searchParams: { page: number; q: string; filter: string; type: string };
};

export default function HomePage({ searchParams }: HomePageProps) {
  const { userId: isLogged } = auth();

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row">
        <div className="container p-0">
          <div className="py-4">{isLogged ? <Search /> : null}</div>

          <div className="mt-0">
            <Suspense fallback={<Skeleton />}>
              <Listings searchParams={searchParams} />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
