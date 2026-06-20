import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contactMessageService } from '../data/api';
import type { ContactMessage } from '../data/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw, Inbox, Search, Star, Mail, MailOpen } from 'lucide-react';
import { toast } from 'sonner';
import { MessageListItem } from './MessageListItem';
import { PaginationControls } from './PaginationControls';
import { MessageListSkeleton } from './MessageListSkeleton';
import { MessageDetailsSheet } from './MessageDetailsSheet';

export const ContactMessageComponent: React.FC = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'read' | 'unread' | 'important'>('unread');
  const [replyMessage, setReplyMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['contact-messages', page, perPage, search, filter],
    queryFn: () => contactMessageService.getMessages({ 
      page, 
      per_page: perPage,
      search, 
      status: (filter === 'all' || filter === 'important') ? undefined : filter,
      important: filter === 'important' ? true : undefined
    }),
    refetchInterval: 120000,
  });

  const { data: allData } = useQuery({
    queryKey: ['contact-messages-count-all'],
    queryFn: () => contactMessageService.getMessages({ status: 'all', per_page: 1 }),
  });

  const { data: unreadData } = useQuery({
    queryKey: ['contact-messages-count-unread'],
    queryFn: () => contactMessageService.getMessages({ status: 'unread', per_page: 1 }),
  });

  const { data: readData } = useQuery({
    queryKey: ['contact-messages-count-read'],
    queryFn: () => contactMessageService.getMessages({ status: 'read', per_page: 1 }),
  });

  const { data: importantData } = useQuery({
    queryKey: ['contact-messages-count-important'],
    queryFn: () => contactMessageService.getMessages({ important: true, per_page: 1 }),
  });

  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const invalidateCountQueries = () => {
    queryClient.invalidateQueries({ queryKey: ['contact-messages-count-all'] });
    queryClient.invalidateQueries({ queryKey: ['contact-messages-count-unread'] });
    queryClient.invalidateQueries({ queryKey: ['contact-messages-count-read'] });
    queryClient.invalidateQueries({ queryKey: ['contact-messages-count-important'] });
  };

  const markAsReadMutation = useMutation({
    mutationFn: contactMessageService.markAsRead,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['contact-messages'] });
      invalidateCountQueries();
      if (selectedMessage) {
        setSelectedMessage(response.data || response);
      }
    },
  });

  const markAsUnreadMutation = useMutation({
    mutationFn: contactMessageService.markAsUnread,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['contact-messages'] });
      invalidateCountQueries();
      if (selectedMessage) {
        setSelectedMessage(response.data || response);
      }
    },
  });

  const toggleImportantMutation = useMutation({
    mutationFn: contactMessageService.toggleImportant,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['contact-messages'] });
      invalidateCountQueries();
      // setSelectedMessage(response.data || response);
      setSelectedMessage(null);
      toast.success(response.data.isImportant ? 'Marked as important' : 'Removed from important');
    },
    onError: () => {
      toast.error('Failed to toggle important status.');
    }
  });

  const replyMutation = useMutation({
    mutationFn: contactMessageService.reply,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['contact-messages'] });
      invalidateCountQueries();
      setSelectedMessage(response.data || response);
      setReplyMessage('');
      setIsEditing(false);
      toast.success('Reply sent successfully!');
    },
    onError: () => {
      toast.error('Failed to send reply.');
    }
  });

  const handleReply = (id: number, message: string) => {
    replyMutation.mutate({ id, message });
  };

  const handleToggleImportant = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    toggleImportantMutation.mutate(id);
  };

  const handleOpenMessage = (msg: ContactMessage) => {
    setSelectedMessage(msg);
    setReplyMessage('');
    setIsEditing(false);
    if (!msg.readAt) {
      markAsReadMutation.mutate(msg.id);
    }
  };

  const messages = data?.data ?? [];
  const meta = data?.meta;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Contact Messages</h1>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
          <Tabs value={filter} defaultValue="unread" onValueChange={(v) => { setFilter(v as any); setPage(1); }} className="w-full sm:w-auto">
            <TabsList className="bg-slate-100/50 p-1">
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:border-indigo-200 border border-transparent transition-all"
              >
                <Inbox size={14} className="mr-2 text-indigo-500" />
                <span className="font-semibold">All</span> {allData?.meta?.total !== undefined ? `(${allData.meta.total})` : '(0)'}
              </TabsTrigger>
              <TabsTrigger 
                value="unread" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:border-blue-200 border border-transparent transition-all"
              >
                <Mail size={14} className="mr-2 text-blue-500" />
                <span className="font-semibold">Unread</span> {unreadData?.meta?.total !== undefined ? `(${unreadData.meta.total})` : '(0)'}
              </TabsTrigger>
              <TabsTrigger 
                value="read" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:border-emerald-200 border border-transparent transition-all"
              >
                <MailOpen size={14} className="mr-2 text-emerald-500" />
                <span className="font-semibold">Read</span> {readData?.meta?.total !== undefined ? `(${readData.meta.total})` : '(0)'}
              </TabsTrigger>
              <TabsTrigger 
                value="important" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:border-yellow-200 border border-transparent transition-all"
              >
                <Star size={14} className="mr-2 text-yellow-500" />
                <span className="font-semibold">Important</span> {importantData?.meta?.total !== undefined ? `(${importantData.meta.total})` : '(0)'}
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex items-center w-full sm:w-64">
              <Search className="absolute left-3 text-slate-400" size={16} />
              <Input 
                placeholder="Search..." 
                value={search} 
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="pl-9 h-9"
              />
            </div>
            <Button variant="ghost" size="icon" onClick={() => refetch()} title="Refresh" className="h-9 w-9 shrink-0 text-slate-500 hover:text-slate-900">
              <RefreshCw size={16} />
            </Button>
            <div className="hidden sm:flex">
              <PaginationControls page={page} lastPage={meta?.last_page || 1} onPageChange={setPage} compact perPage={perPage} onPerPageChange={(v) => { setPerPage(v); setPage(1) }} />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-1">
        {isLoading ? (
          <MessageListSkeleton />
        ) : (
          <>
            {messages.map((msg: ContactMessage) => (
              <MessageListItem 
                key={msg.id} 
                msg={msg} 
                onClick={handleOpenMessage} 
                onToggleImportant={handleToggleImportant} 
              />
            ))}
            <div className="flex justify-end pt-4">
              <PaginationControls page={page} lastPage={meta?.last_page || 1} onPageChange={setPage} perPage={perPage} onPerPageChange={(v) => { setPerPage(v); setPage(1) }} />
            </div>
          </>
        )}
      </div>

      <MessageDetailsSheet
        selectedMessage={selectedMessage}
        onClose={() => setSelectedMessage(null)}
        onToggleImportant={(id) => toggleImportantMutation.mutate(id)}
        onMarkAsUnread={(id) => markAsUnreadMutation.mutate(id)}
        onReply={handleReply}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        replyMessage={replyMessage}
        setReplyMessage={setReplyMessage}
        isReplying={replyMutation.isPending}
      />
    </div>
  );
};

