import React from 'react';

export const Skeleton = ({ className = '' }) => {
  return (
    <div
      className={`animate-pulse bg-[#F1ECE5] rounded-xl ${className}`}
    />
  );
};
