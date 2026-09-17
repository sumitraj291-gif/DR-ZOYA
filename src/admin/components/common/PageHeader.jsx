import React from 'react';

export const PageHeader = ({ title, subtitle, category = "CLINIC MANAGEMENT", actionBtn }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        {category && (
          <span className="text-[10px] font-bold tracking-[0.2em] text-gold uppercase">
            {category}
          </span>
        )}
        <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-obsidian tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs text-slate-500 font-normal mt-1 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {actionBtn && <div className="flex items-center gap-3">{actionBtn}</div>}
    </div>
  );
};
