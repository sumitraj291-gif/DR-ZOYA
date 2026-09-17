import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export const Drawer = ({ isOpen, onClose, title, subtitle, children }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-obsidian/60 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-white shadow-2xl border-l border-[#E8E2D9] flex flex-col animate-drawer-in">
          {/* Header */}
          <div className="p-6 bg-obsidian text-white border-b border-gold/30 flex items-center justify-between">
            <div>
              <span className="text-[10px] tracking-widest uppercase text-gold font-semibold">
                {subtitle || 'STUDIO CRM DETAIL'}
              </span>
              <h2 className="font-serif-heading text-2xl font-bold text-white mt-0.5">
                {title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-charcoal transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 bg-[#FAF8F5]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
