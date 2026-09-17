import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Drawer } from '../ui/Drawer';
import { Badge } from '../ui/Badge';
import { useToast } from '../../context/ToastContext';
import { Mail, Reply, Archive } from 'lucide-react';

export const MessageDetailDrawer = () => {
  const { selectedMessage, setSelectedMessage, updateMessageStatus } = useApp();
  const { addToast } = useToast();
  const [replyText, setReplyText] = useState('');

  if (!selectedMessage) return null;

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    if (updateMessageStatus) updateMessageStatus(selectedMessage.id, 'Replied');
    addToast(`Reply dispatched to ${selectedMessage.email}`);
    setReplyText('');
    setSelectedMessage(null);
  };

  return (
    <Drawer
      isOpen={!!selectedMessage}
      onClose={() => setSelectedMessage(null)}
      subtitle={`WEBSITE MESSAGE — ${selectedMessage.id}`}
      title={selectedMessage.subject}
    >
      <div className="space-y-6 text-xs">
        <div className="bg-white p-5 rounded-3xl border border-[#E8E2D9] shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-obsidian text-sm">{selectedMessage.name}</span>
            <Badge status={selectedMessage.status} />
          </div>
          <p className="text-slate-500">{selectedMessage.email}</p>
          <span className="text-[10px] text-slate-400 font-mono block">{selectedMessage.date}</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E8E2D9] shadow-sm space-y-2">
          <span className="text-[10px] font-bold tracking-widest text-gold uppercase">MESSAGE BODY</span>
          <p className="text-slate-800 bg-[#FAF8F5] p-4 rounded-2xl border border-[#F1ECE5] leading-relaxed">
            {selectedMessage.message}
          </p>
        </div>

        <form onSubmit={handleSendReply} className="bg-white p-5 rounded-3xl border border-[#E8E2D9] shadow-sm space-y-3">
          <span className="text-[10px] font-bold tracking-widest text-gold uppercase">DISPATCH OFFICIAL REPLY</span>
          <textarea
            rows={4}
            placeholder="Type your official concierge response here..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="w-full p-3 border rounded-2xl bg-[#FAF8F5] text-xs"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                if (updateMessageStatus) updateMessageStatus(selectedMessage.id, 'Archived');
                setSelectedMessage(null);
              }}
              className="px-4 py-2 border rounded-xl font-semibold text-slate-600 hover:bg-slate-100"
            >
              Archive Message
            </button>
            <button type="submit" className="btn-gold-primary px-5 py-2 font-bold flex items-center gap-1.5">
              <Reply className="w-3.5 h-3.5" />
              <span>Send Email Reply</span>
            </button>
          </div>
        </form>
      </div>
    </Drawer>
  );
};
