import React from "react";
const DeleteIcon = ({ className = "", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg width="20" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <rect x="6" y="7" width="12" height="14" rx="2" />
    <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    <line x1="4" y1="7" x2="20" y2="7" />
  </svg>
);
export default DeleteIcon; 