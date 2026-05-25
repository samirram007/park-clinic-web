import React from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImportantToggleProps {
  isImportant: boolean;
  onToggle: (e: React.MouseEvent) => void; 
}

export const ImportantToggle: React.FC<ImportantToggleProps> = ({ isImportant, onToggle }) => {
  const handleOnClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(e); 
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`cursor-pointer h-8 w-8 transition-colors ${isImportant ? 'text-yellow-400' : 'text-slate-300 hover:text-yellow-400'}`}
      onClick={handleOnClick}
    >
      <Star size={16} fill={isImportant ? 'currentColor' : 'none'} />
    </Button>
  );
};
