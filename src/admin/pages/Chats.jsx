import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/common/PageHeader';
import { Badge } from '../components/ui/Badge';
import { MessageCircle, Bot, UserCheck, Send, Sparkles, CheckCircle2, Phone } from 'lucide-react';

export const Chats = () => {
  const { chats, selectedChat, setSelectedChat, addLead } = useApp();
  const [inputText, setInputText] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedChat) return;

    selectedChat.messages.push({
      sender: 'admin',
      text: inputText,
      time: 'Just now',
    });

    setInputText('');
  };

  const handleConvertCapturedLead = () => {
    if (!selectedChat || !selectedChat.capturedData) return;
    const cap = selectedChat.capturedData;
    addLead({
      name: cap.name,
      phone: cap.phone,
      email: `${cap.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      interestedTreatment: cap.interestedTreatment,
      source: 'WhatsApp AI Bot',
      assignedStaff: 'Front Desk Concierge',
      notes: `Captured via WhatsApp AI bot for ${cap.preferredDate} at ${cap.preferredTime}`,
    });
  };

  return (
    <div className="space-y-6 animate-modal-in">
      <PageHeader
        category="AI & COMMUNICATION CRM"
        title="WhatsApp & AI Chat Inbox"
        subtitle="Real-time conversation stream with automated AI lead capture and instant WhatsApp responses."
      />

      {/* Split Pane Container */}
      <div className="bg-white rounded-3xl border border-[#E8E2D9] shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[550px]">
        {/* Left Pane: Chat List */}
        <div className="lg:col-span-4 border-r border-[#E8E2D9] flex flex-col bg-[#FAF8F5]">
          <div className="p-4 border-b border-[#E8E2D9] bg-white">
            <h3 className="font-serif text-lg font-bold text-obsidian">Recent Conversations</h3>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-[#F1ECE5]">
            {(chats || []).map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`p-4 cursor-pointer transition-colors ${
                  selectedChat?.id === chat.id ? 'bg-white border-l-4 border-gold shadow-sm' : 'hover:bg-white/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-obsidian">{chat.contactName}</span>
                  <span className="text-[9px] text-slate-400 font-mono">{chat.timestamp}</span>
                </div>
                <p className="text-xs text-slate-600 line-clamp-1 mb-2">{chat.lastMessage}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-mono">{chat.phone}</span>
                  {chat.capturedData && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-gold/15 text-gold border border-gold/30 flex items-center gap-1">
                      <Bot className="w-3 h-3" />
                      <span>AI Lead</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Pane: Conversation Details */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-white">
          {selectedChat ? (
            <>
              {/* Header */}
              <div className="p-4 border-b border-[#E8E2D9] bg-[#FAF8F5] flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-obsidian">{selectedChat.contactName}</h3>
                  <p className="text-xs text-slate-500 font-mono">{selectedChat.phone}</p>
                </div>

                {selectedChat.capturedData && (
                  <button
                    onClick={handleConvertCapturedLead}
                    className="btn-gold-primary px-3.5 py-1.5 text-xs font-bold flex items-center gap-1.5"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Convert to Lead</span>
                  </button>
                )}
              </div>

              {/* Chat Message Stream */}
              <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-[#FAF8F5]/50">
                {/* AI Captured Banner */}
                {selectedChat.capturedData && (
                  <div className="bg-obsidian text-white p-4 rounded-2xl border border-gold/40 shadow-sm space-y-2">
                    <div className="flex items-center gap-2 text-gold text-xs font-bold">
                      <Sparkles className="w-4 h-4" />
                      <span>AI BOT LEAD CAPTURED</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                      <div>Treatment: <span className="font-bold text-white">{selectedChat.capturedData.interestedTreatment}</span></div>
                      <div>Slot: <span className="font-bold text-white">{selectedChat.capturedData.preferredDate} ({selectedChat.capturedData.preferredTime})</span></div>
                    </div>
                  </div>
                )}

                {(selectedChat.messages || []).map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      m.sender === 'admin' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                        m.sender === 'admin'
                          ? 'bg-obsidian text-white rounded-br-none border border-gold/30'
                          : m.sender === 'ai_bot'
                          ? 'bg-gold/10 border border-gold/30 text-slate-900 rounded-bl-none font-medium'
                          : 'bg-white border border-[#E8E2D9] text-slate-900 rounded-bl-none'
                      }`}
                    >
                      <div className="text-[10px] font-bold text-gold uppercase mb-1">
                        {m.sender === 'admin' ? 'Studio Concierge' : m.sender === 'ai_bot' ? 'Dr. Zoya AI Bot' : selectedChat.contactName}
                      </div>
                      <p>{m.text}</p>
                      <span className="text-[9px] text-slate-400 block text-right mt-1 font-mono">{m.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Bar */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-[#E8E2D9] flex gap-2">
                <input
                  type="text"
                  placeholder="Type WhatsApp message..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 p-2.5 border border-slate-300 rounded-xl bg-[#FAF8F5] text-xs focus:outline-none focus:border-gold"
                />
                <button type="submit" className="btn-gold-primary px-4 py-2 text-xs font-bold flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 text-slate-400">
              Select a conversation to view chat history.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
