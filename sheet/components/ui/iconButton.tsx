import React from 'react';

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  'aria-label': string;
  children: React.ReactNode;
};

const IconButton: React.FC<IconButtonProps> = ({
  'aria-label': ariaLabel,
  tabIndex = 0,
  className = '',
  children,
  ...props
}) => (
  <button
    type="button"
    aria-label={ariaLabel}
    tabIndex={tabIndex}
    className={`rounded-full p-1 cursor-pointer hover:bg-gray-200 focus:outline-none transition disabled:pointer-events-none disabled:opacity-50 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default IconButton;
