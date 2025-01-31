import { Header } from "./components/header";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="border rounded-xl overflow-hidden space-y-4"
            >
              <Skeleton className="w-full h-40 rounded-none" />
              <div className="px-4 py-4 space-y-2">
                <Skeleton className="w-3/4 h-6" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-1/2 h-4" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
