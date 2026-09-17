import React from 'react';
import { useApp } from '../context/AppContext';
import { PageHeader } from '../components/common/PageHeader';
import { Bell, CheckCircle2, Trash2 } from 'lucide-react';

export const Notifications = () => {
  const { notifications, markNotificationRead, clearAllNotifications } = useApp();

  return (
    <div className="space-y-6 animate-modal-in">
      <PageHeader
        category="SYSTEM ALERTS"
        title="Notification Center"
        subtitle="Real-time notifications regarding appointments, patient enquiries, and review submissions."
        actionBtn={
          <button
            onClick={clearAllNotifications}
            className="px-4 py-2 bg-rose-50 text-rose-800 border border-rose-300 rounded-xl font-bold text-xs hover:bg-rose-100 flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Notifications</span>
          </button>
        }
      />

      <div className="bg-white rounded-3xl border border-[#E8E2D9] shadow-sm divide-y divide-[#F1ECE5] overflow-hidden">
        {(!notifications || notifications.length === 0) ? (
          <div className="p-12 text-center text-slate-400 text-xs">No notifications present.</div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => markNotificationRead(n.id)}
              className={`p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-[#FAF8F5] transition-colors ${
                !n.read ? 'bg-gold/5' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                  !n.read ? 'bg-gold text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-obsidian">{n.title}</h4>
                  <p className="text-xs text-slate-600 mt-0.5">{n.description}</p>
                  <span className="text-[10px] text-slate-400 font-mono mt-1 block">{n.time}</span>
                </div>
              </div>

              {!n.read && (
                <span className="text-[10px] font-bold text-gold px-2.5 py-1 bg-gold/10 rounded-full border border-gold/30">
                  Unread
                </span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
