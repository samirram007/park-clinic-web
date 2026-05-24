import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contactMessageService } from '../data/api';
import type { ContactMessage } from '../data/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Mail, MailOpen, ChevronLeft, ChevronRight } from 'lucide-react';

export const ContactMessageComponent: React.FC = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'read' | 'unread'>('unread');

  const { data, isLoading } = useQuery({
    queryKey: ['contact-messages', page, search, filter],
    queryFn: () => contactMessageService.getMessages({ 
      page, 
      search, 
      status: filter === 'all' ? undefined : filter 
    }),
  });

  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const markAsReadMutation = useMutation({
    mutationFn: contactMessageService.markAsRead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['contact-messages'] }),
  });

  const markAsUnreadMutation = useMutation({
    mutationFn: contactMessageService.markAsUnread,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['contact-messages'] }),
  });

  const handleOpenMessage = (msg: ContactMessage) => {
    setSelectedMessage(msg);
    if (!msg.readAt) {
      markAsReadMutation.mutate(msg.id);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  const messages = data?.data ?? [];
  const meta = data?.meta;

  return (
    <div className="p-8">
      <div className="flex flex-col gap-4 mb-6">
        <h1 className="text-3xl font-bold">Contact Messages</h1>
        <div className="flex gap-4">
          <Input 
            placeholder="Search messages..." 
            value={search} 
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="max-w-xs"
          />
      <Tabs value={filter} defaultValue="unread" onValueChange={(v) => { setFilter(v as any); setPage(1); }}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="read">Read</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="space-y-2">
        {messages.map((msg: ContactMessage) => (
          <div 
            key={msg.id} 
            className={`p-4 border rounded cursor-pointer hover:bg-slate-50 flex items-center justify-between ${!msg.readAt ? 'font-bold bg-slate-50' : ''}`}
            onClick={() => handleOpenMessage(msg)}
          >
            <div className="flex items-center gap-3 overflow-hidden flex-1">
              {msg.readAt ? <MailOpen className="text-slate-400" size={20} /> : <Mail className="text-blue-600" size={20} />}
              <div className="flex items-center gap-4 w-full overflow-hidden">
                <div className="flex flex-col shrink-0 w-48 truncate">
                  <p className={`text-sm ${!msg.readAt ? 'font-bold' : 'font-medium'} truncate`}>{msg.name}</p>
                  <p className="text-xs text-slate-400 truncate">{msg.email}</p>
                </div>
                <div className="flex items-center gap-2 overflow-hidden flex-1">
                  <p className={`text-sm ${!msg.readAt ? 'font-bold' : 'font-medium'} text-slate-800 truncate`}>{msg.subject}</p>
                  <span className="text-slate-300 shrink-0">-</span>
                  <p className="text-sm text-slate-500 truncate flex-1">{msg.message}</p>
                </div>
              </div>
            </div>
            <span className="text-xs text-slate-400 shrink-0">{new Date(msg.createdAt).toLocaleString()}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-6">
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}><ChevronLeft size={16}/></Button>
        <span>Page {page} of {meta?.last_page || 1}</span>
        <Button disabled={page >= (meta?.last_page || 1)} onClick={() => setPage(page + 1)}><ChevronRight size={16}/></Button>
      </div>

      <Sheet open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <SheetContent className="w-[400px] sm:w-[600px] p-0 flex flex-col h-full">
          {selectedMessage && (
            <>
              <SheetHeader className="px-6 pt-6 pb-4 border-b">
                <SheetTitle className="text-xl">{selectedMessage.subject}</SheetTitle>
                <div className="text-sm text-slate-500 mt-1">
                  From: <span className="font-semibold text-slate-900">{selectedMessage.name}</span> &lt;{selectedMessage.email}&gt;
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Received: {new Date(selectedMessage.createdAt).toLocaleString()}
                </div>
              </SheetHeader>
              
              <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm whitespace-pre-line text-slate-700 leading-relaxed">
                  {selectedMessage.message}
                </div>
              </div>

              <div className="p-6 border-t flex justify-between items-center bg-white">
                {selectedMessage.readAt && <Badge variant="secondary" className="px-3 py-1">Read</Badge>}
                {!selectedMessage.readAt && <div />}
                <Button variant="outline" onClick={() => markAsUnreadMutation.mutate(selectedMessage.id)}>
                  Mark as Unread
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};
