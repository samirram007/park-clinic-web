import React from 'react';
import { Mail, MailOpen } from 'lucide-react';
import type { ContactMessage } from '../data/schema';
import { formatMessageDate } from '@/lib/date-utils';
import { ImportantToggle } from './ImportantToggle';

interface MessageListItemProps {
  msg: ContactMessage;
  onClick: (msg: ContactMessage) => void;
  onToggleImportant: (e: React.MouseEvent, id: number) => void; 
}

export const MessageListItem: React.FC<MessageListItemProps> = ({ msg, onClick, onToggleImportant }) => {
  const dateFormatted = formatMessageDate(msg.createdAt);

  return (
    <div 
      key={msg.id} 
      className={`group px-4 py-3 border-b border-slate-100 transition-all duration-200 flex items-center gap-4 ${!msg.readAt ? 'bg-white' : 'bg-white hover:bg-slate-50'}`}
    >
      <div className={`p-1.5 rounded-full ${!msg.readAt ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
        {msg.readAt ? <MailOpen size={16} /> : <Mail size={16} />}
      </div>

      <ImportantToggle 
        isImportant={msg.isImportant} 
        onToggle={(e) => onToggleImportant(e, msg.id)}  
      />

      <div 
        className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-[220px_1fr_120px] items-center gap-2 md:gap-4 cursor-pointer"
        onClick={() => onClick(msg)}
      >
        <div className="min-w-0 truncate">
          <p className={`text-sm font-semibold truncate ${!msg.readAt ? 'text-slate-900' : 'text-slate-400'}`}>{msg.name}</p>
          <p className="text-xs text-slate-400 truncate">{msg.email}</p>
        </div>

        <div className="grid grid-cols-[auto_auto_1fr] items-center gap-2 min-w-0">
          <span className={`text-sm font-semibold truncate ${!msg.readAt ? 'text-slate-900' : 'text-slate-400'}`}>{msg.subject}</span>
          <span className="text-slate-300 shrink-0">—</span>
          <span className={`text-sm truncate ${!msg.readAt ? 'text-slate-500' : 'text-slate-400'}`}>{msg.message}</span>
        </div>

        <div className="text-right shrink-0 hidden md:block text-xs font-medium text-slate-400">
          {dateFormatted}
        </div>
      </div>
    </div>
  );
};

