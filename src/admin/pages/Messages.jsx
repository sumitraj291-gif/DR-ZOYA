import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/common/PageHeader';
import { Badge } from '../components/ui/Badge';
import { Mail, CheckCircle, Reply, Archive, Eye, Search } from 'lucide-react';

export const Messages = () => {
  const { messages, updateMessageStatus, setSelectedMessage } = useApp();
  const [filterTab, setFilterTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const defaultMessages = messages || [
    { id: 'MSG-01', name: 'Dr. Arjun Verma', email: 'arjun.v@apollohospitals.com', subject: 'Referral for Full Mouth Smile Reconstruction', date: '2026-09-15', status: 'New', message: 'Dear Dr. Zoya, referring my patient Mr. Raghav for cosmetic smile designing consultation.' },
    { id: 'MSG-02', name: 'Sonal Kapoor', email: 'sonal.k@gmail.com', subject: 'Inquiry on Invisible Aligners financing', date: '2026-09-14', status: 'Replied', message: 'Could you please let me know if you provide zero interest EMI for clear aligners?' }
  ];

  const filteredMessages = defaultMessages.filter((msg) => {
    const matchesSearch =
      (msg.name && msg.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (msg.subject && msg.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (msg.email && msg.email.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTab = filterTab === 'All' || (msg.status && msg.status.toLowerCase() === filterTab.toLowerCase());

    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6 animate-modal-in">
      <PageHeader
        category="WEBSITE MANAGEMENT"
        title="Contact Messages Inbox"
        subtitle="Incoming inquiries from the clinic website contact form and inter-clinic referrals."
      />

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['All', 'New', 'Read', 'Replied', 'Archived'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilterTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterTab === tab
                ? 'bg-obsidian text-white shadow-md'
                : 'bg-white text-slate-600 border border-[#E8E2D9] hover:bg-[#FAF8F5]'
            }`}
          >
            {tab} Messages
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="luxury-table-container">
        <table className="w-full text-left luxury-table">
          <thead>
            <tr>
              <th>Sender</th>
              <th>Email</th>
              <th>Subject Line</th>
              <th>Received Date</th>
              <th>Status</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredMessages.map((msg) => (
              <tr key={msg.id}>
                <td>
                  <div className="font-semibold text-slate-900 text-xs">{msg.name}</div>
                </td>
                <td>
                  <div className="text-xs text-slate-600 font-medium">{msg.email}</div>
                </td>
                <td>
                  <div className="text-xs text-slate-800 font-semibold line-clamp-1">{msg.subject}</div>
                </td>
                <td>
                  <div className="text-xs text-slate-500 font-mono">{msg.date}</div>
                </td>
                <td>
                  <Badge status={msg.status} />
                </td>
                <td className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        if (setSelectedMessage) setSelectedMessage(msg);
                        if (msg.status === 'New' && updateMessageStatus) updateMessageStatus(msg.id, 'Read');
                      }}
                      className="px-3 py-1.5 bg-[#FAF8F5] border border-[#E8E2D9] text-obsidian text-xs font-bold rounded-xl hover:bg-[#F1ECE5]"
                    >
                      View Inbox Message
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
