import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationControlsProps {
  page: number;
  lastPage: number;
  onPageChange: (page: number) => void;
  compact?: boolean;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({ page, lastPage, onPageChange, compact = false }) => (
  <div className={`flex items-center gap-2 ${compact ? '' : 'justify-center py-4 border-t border-slate-100 my-4'}`}>
    <Button 
      variant="outline" 
      size="sm" 
      disabled={page === 1} 
      onClick={() => onPageChange(page - 1)}
      className="h-8 w-8 p-0 shadow-sm"
    >
      <ChevronLeft size={16}/>
    </Button>
    <span className="text-xs font-medium text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-200 min-w-[60px] text-center">
      {page} / {lastPage || 1}
    </span>
    <Button 
      variant="outline" 
      size="sm" 
      disabled={page >= (lastPage || 1)} 
      onClick={() => onPageChange(page + 1)}
      className="h-8 w-8 p-0 shadow-sm"
    >
      <ChevronRight size={16}/>
    </Button>
  </div>
);
