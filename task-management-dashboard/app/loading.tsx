import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-row gap-4 w-full overflow-x-auto p-4 whitespace-nowrap">
      {[1, 2, 3].map((col) => (
        <div key={col} className="w-64 p-2 shadow-lg rounded-[10px] bg-white flex flex-col">
          <div className="mb-2">
            <Skeleton className="h-6 w-32 rounded" /> {/* Column title */}
          </div>
          <div className="space-y-2">
            {[1, 2, 3].map((card) => (
              <Skeleton key={card} className="h-24 w-full rounded-lg" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
