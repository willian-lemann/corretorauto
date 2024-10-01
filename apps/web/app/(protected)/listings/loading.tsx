import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </header>

      <nav className="mb-4">
        <Skeleton className="h-4 w-64" />
      </nav>

      <h1 className="mb-6">
        <Skeleton className="h-8 w-3/4" />
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Skeleton className="h-[400px] w-full" />
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-[190px] w-full" />
          ))}
        </div>
      </div>
      {/* TODO */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-10 w-48" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center space-x-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>

      <Button className="w-full" disabled>
        <Skeleton className="h-4 w-32" />
      </Button>
    </div>
  );
}
