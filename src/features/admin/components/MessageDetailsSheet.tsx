import React from 'react'
import { RefreshCw, Star } from 'lucide-react'
import type { ContactMessage } from '../data/schema'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface MessageDetailsSheetProps {
  selectedMessage: ContactMessage | null
  onClose: () => void
  onToggleImportant: (id: number) => void
  onMarkAsUnread: (id: number) => void
  onReply: (id: number, message: string) => void
  isEditing: boolean
  setIsEditing: (isEditing: boolean) => void
  replyMessage: string
  setReplyMessage: (msg: string) => void
  isReplying: boolean
}

export const MessageDetailsSheet: React.FC<MessageDetailsSheetProps> = ({
  selectedMessage,
  onClose,
  onToggleImportant,
  onMarkAsUnread,
  onReply,
  isEditing,
  setIsEditing,
  replyMessage,
  setReplyMessage,
  isReplying,
}) => {
  if (!selectedMessage) return null

  return (
    <Sheet open={!!selectedMessage} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-[400px] sm:w-[600px] p-0 flex flex-col h-full">
        <SheetHeader className="px-6 pt-6 pb-4 border-b">
          <SheetTitle className="text-xl">{selectedMessage.subject}</SheetTitle>
          <div className="text-sm text-slate-500 mt-1">
            From:{' '}
            <span className="font-semibold text-slate-900">
              {selectedMessage.name}
            </span>{' '}
            &lt;{selectedMessage.email}&gt;
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Received: {new Date(selectedMessage.createdAt).toLocaleString()}
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm whitespace-pre-line text-slate-700 leading-relaxed">
            {selectedMessage.message}
          </div>

          {selectedMessage.replyMessage && !isEditing ? (
            <div className="space-y-4">
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm space-y-2">
                <div className="flex justify-between items-center border-b border-blue-100 pb-2 mb-2">
                  <Label className="text-blue-900 font-bold uppercase text-[10px] tracking-wider">
                    Your Reply
                  </Label>
                  <span className="text-[10px] text-blue-500 font-medium">
                    {selectedMessage.replyAt &&
                      new Date(selectedMessage.replyAt).toLocaleString()}
                  </span>
                </div>
                <div className="text-blue-800 whitespace-pre-line leading-relaxed italic">
                  {selectedMessage.replyMessage}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 w-full"
                onClick={() => {
                  setReplyMessage(selectedMessage.replyMessage || '')
                  setIsEditing(true)
                }}
              >
                <RefreshCw size={14} className="mr-2" /> Resend or Edit Reply
              </Button>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label
                    htmlFor="reply"
                    className="text-slate-900 font-bold uppercase text-[10px] tracking-wider"
                  >
                    {isEditing ? 'Edit Reply' : 'Quick Reply'}
                  </Label>
                  {isEditing && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 text-[10px] text-slate-500 hover:text-slate-900"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
                <Textarea
                  id="reply"
                  placeholder="Type your response here..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  className="min-h-[120px] resize-none focus-visible:ring-blue-500"
                />
              </div>
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
                onClick={() => onReply(selectedMessage.id, replyMessage)}
                disabled={isReplying || !replyMessage.trim()}
              >
                {isReplying
                  ? 'Sending...'
                  : isEditing
                    ? 'Update & Resend'
                    : 'Send Reply'}
              </Button>
            </div>
          )}
        </div>

        <div className="p-6 border-t flex justify-between items-center bg-white">
          <div className="flex items-center gap-2">
            {selectedMessage.readAt && (
              <Badge variant="secondary" className="px-3 rounded-full">
                Read
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              className={`gap-2 ${selectedMessage.isImportant ? 'text-yellow-500' : 'text-slate-400'}`}
              onClick={() => onToggleImportant(selectedMessage.id)}
            >
              <Star
                size={16}
                fill={selectedMessage.isImportant ? 'currentColor' : 'none'}
              />
              {selectedMessage.isImportant ? 'Important' : 'Mark Important'}
            </Button>
          </div>
          <Button
            variant="outline"
            onClick={() => onMarkAsUnread(selectedMessage.id)}
          >
            Mark as Unread
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
