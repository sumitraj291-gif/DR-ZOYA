import React from 'react';

export const Badge = ({ status, className = '' }) => {
  const normStatus = (status || '').toLowerCase();

  let styles = 'bg-slate-100 text-slate-800 border-slate-200';

  if (
    normStatus === 'confirmed' ||
    normStatus === 'paid' ||
    normStatus === 'active' ||
    normStatus === 'published' ||
    normStatus === 'converted'
  ) {
    styles = 'bg-emerald-50 text-emerald-800 border-emerald-300';
  } else if (
    normStatus === 'new' ||
    normStatus === 'in review' ||
    normStatus === 'unread'
  ) {
    styles = 'bg-blue-50 text-blue-800 border-blue-300';
  } else if (
    normStatus === 'contacted' ||
    normStatus === 'follow-up' ||
    normStatus === 'pending' ||
    normStatus === 'pending review'
  ) {
    styles = 'bg-amber-50 text-amber-800 border-amber-300';
  } else if (normStatus === 'completed' || normStatus === 'replied') {
    styles = 'bg-purple-50 text-purple-800 border-purple-300';
  } else if (
    normStatus === 'cancelled' ||
    normStatus === 'no-show' ||
    normStatus === 'inactive' ||
    normStatus === 'danger' ||
    normStatus === 'archived'
  ) {
    styles = 'bg-rose-50 text-rose-800 border-rose-300';
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border capitalize tracking-wider ${styles} ${className}`}
    >
      {status}
    </span>
  );
};
