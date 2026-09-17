import React from 'react';
import { Inbox } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = Inbox,
  title = "No data found",
  description = "There are no items matching your current filters or search query.",
  actionText,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white border border-[#E8E2D9] rounded-2xl shadow-sm my-4">
      <div className="w-14 h-14 rounded-full bg-[#FAF8F5] border border-gold/30 flex items-center justify-center mb-4 text-gold">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="font-serif-heading text-xl font-bold text-obsidian mb-1">
        {title}
      </h3>
      <p className="text-xs text-slate-500 max-w-md mb-6 leading-relaxed">
        {description}
      </p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="btn-gold-primary px-5 py-2.5 text-xs tracking-wider font-semibold"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
