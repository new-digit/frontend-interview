import React from "react";
const ChevronRightIcon = ({ className = "", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className={className} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);
export default ChevronRightIcon;
