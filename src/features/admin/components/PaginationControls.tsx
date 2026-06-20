import React, { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ListOrdered } from 'lucide-react';

const PER_PAGE_OPTIONS = [10, 25, 50] as const

interface PaginationControlsProps {
  page: number;
  lastPage: number;
  onPageChange: (page: number) => void;
  compact?: boolean;
  perPage?: number;
  onPerPageChange?: (perPage: number) => void;
}

/**
 * Build a list of page numbers and ellipsis markers to render.
 *
 * Strategy:
 * - Always show first and last page.
 * - Show a sliding window of ~5 pages around the current page.
 * - Insert '...' when there is a gap between shown pages.
 */
function getPageNumbers(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages: (number | 'ellipsis')[] = []

  // Always include first page
  pages.push(1)

  // Calculate the window around current page
  const windowStart = Math.max(2, current - 2)
  const windowEnd = Math.min(total - 1, current + 2)

  // Gap after page 1?
  if (windowStart > 2) {
    pages.push('ellipsis')
  }

  // Window pages
  for (let i = windowStart; i <= windowEnd; i++) {
    pages.push(i)
  }

  // Gap before last page?
  if (windowEnd < total - 1) {
    pages.push('ellipsis')
  }

  // Always include last page
  if (total > 1) {
    pages.push(total)
  }

  return pages
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({ page, lastPage, onPageChange, compact = false, perPage, onPerPageChange }) => {
  const pageNumbers = useMemo(() => getPageNumbers(page, lastPage), [page, lastPage])

  return (
    <div className={`flex items-center gap-1.5 ${compact ? '' : 'justify-center py-4 border-t border-slate-100 my-4'}`}>
      {perPage !== undefined && onPerPageChange && (
        <>
          <div className="flex items-center gap-1.5 mr-2">
            <ListOrdered size={14} className="text-slate-400 shrink-0" />
            <Select
              value={String(perPage)}
              onValueChange={(v) => { onPerPageChange(parseInt(v, 10)); }}
            >
              <SelectTrigger className="h-8 w-16 text-xs px-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PER_PAGE_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={String(opt)} className="text-xs">
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-xs text-slate-400 hidden sm:inline">/ page</span>
          </div>
          <div className="h-5 w-px bg-slate-200 mx-1" />
        </>
      )}

      <Button 
        variant="outline" 
        size="sm" 
        disabled={page === 1} 
        onClick={() => onPageChange(1)}
        className="h-8 w-8 p-0 shadow-sm shrink-0"
        title="First page"
      >
        <ChevronsLeft size={16}/>
      </Button>

      <Button 
        variant="outline" 
        size="sm" 
        disabled={page === 1} 
        onClick={() => onPageChange(page - 1)}
        className="h-8 w-8 p-0 shadow-sm shrink-0"
        title="Previous page"
      >
        <ChevronLeft size={16}/>
      </Button>

      {pageNumbers.map((item, idx) =>
        item === 'ellipsis' ? (
          <span key={`ellipsis-${idx}`} className="px-1 text-slate-300 select-none text-xs">
            …
          </span>
        ) : (
          <Button
            key={item}
            variant={item === page ? 'default' : 'outline'}
            size="sm"
            onClick={() => onPageChange(item)}
            className={`h-8 min-w-8 p-0 text-xs font-medium shadow-sm shrink-0 ${
              item === page
                ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-default'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
            disabled={item === page}
            title={`Page ${item}`}
          >
            {item}
          </Button>
        )
      )}

      <Button 
        variant="outline" 
        size="sm" 
        disabled={page >= lastPage} 
        onClick={() => onPageChange(page + 1)}
        className="h-8 w-8 p-0 shadow-sm shrink-0"
        title="Next page"
      >
        <ChevronRight size={16}/>
      </Button>

      <Button 
        variant="outline" 
        size="sm" 
        disabled={page >= lastPage} 
        onClick={() => onPageChange(lastPage)}
        className="h-8 w-8 p-0 shadow-sm shrink-0"
        title="Last page"
      >
        <ChevronsRight size={16}/>
      </Button>
    </div>
  );
};
