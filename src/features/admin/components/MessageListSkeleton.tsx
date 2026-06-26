import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export const MessageListSkeleton: React.FC = () => {
  return (
    <div className="space-y-1">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="px-4 py-3 flex items-center gap-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-[220px_1fr_120px] items-center gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-48" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-16 ml-auto" />
          </div>
        </div>
      ))}
    </div>
  )
}
