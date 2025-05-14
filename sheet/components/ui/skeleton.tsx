import React from 'react';
const Skeleton = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} data-testid="skeleton" />
);
export default Skeleton;
