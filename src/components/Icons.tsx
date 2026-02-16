'use client';

import type { CSSProperties } from 'react';

type IconProps = {
  size?: number;
  className?: string;
  style?: CSSProperties;
};

function Base({ children, size = 18, className, style }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export const Icons = {
  Lightning: (props: IconProps) => (
    <Base {...props}>
      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </Base>
  ),
  Lock: (props: IconProps) => (
    <Base {...props}>
      <path d="M7 11V8a5 5 0 0110 0v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M6.5 11h11A1.5 1.5 0 0119 12.5v7A2.5 2.5 0 0116.5 22h-9A2.5 2.5 0 015 19.5v-7A1.5 1.5 0 016.5 11z" stroke="currentColor" strokeWidth="1.8" />
    </Base>
  ),
  NoTax: (props: IconProps) => (
    <Base {...props}>
      <path d="M4 4l16 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M6.5 10.5a6.5 6.5 0 0110.9-4.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M17.5 13.5a6.5 6.5 0 01-10.9 4.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </Base>
  ),
  Globe: (props: IconProps) => (
    <Base {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 12h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 3c2.5 2.7 4 5.8 4 9s-1.5 6.3-4 9c-2.5-2.7-4-5.8-4-9s1.5-6.3 4-9z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </Base>
  ),
  X: (props: IconProps) => (
    <Base {...props}>
      <path d="M7 7l10 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M17 7L7 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </Base>
  ),
  Telegram: (props: IconProps) => (
    <Base {...props}>
      <path d="M21 4L3.7 11.2c-.9.4-.8 1.7.2 1.9l4.3 1.2 1.6 5c.3.9 1.4 1 1.9.3l2.6-3.2 4.8 3.5c.7.5 1.8.1 2-.8L23 5.8c.2-1.1-.9-2-2-1.8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8.2 14.3l11-7.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </Base>
  ),
  Discord: (props: IconProps) => (
    <Base {...props}>
      <path d="M8 7c1.2-.9 2.6-1.4 4-1.4S14.8 6.1 16 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M6 8.5c.7-.4 1.5-.7 2.3-.9M18 8.5c-.7-.4-1.5-.7-2.3-.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M7 18c1.7 1.3 3.7 2 5 2s3.3-.7 5-2c1.2-1 2-3 2-6 0-2.1-.6-3.8-1.6-5.1-1.3-.4-2.5-.6-3.7-.6l-.4 1.2" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M11 7.5l-.4-1.2c-1.2 0-2.4.2-3.7.6C5.6 8.2 5 9.9 5 12c0 3 0 5 2 6z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9.6 13.2h.01M14.4 13.2h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </Base>
  ),
  Rocket: (props: IconProps) => (
    <Base {...props}>
      <path d="M14 4c3 0 6 3 6 6-2 2-4.6 4.2-7.7 5.7L10 20l-2-2 4.3-2.3C9.8 14.6 7.6 12 6 10c0-3 3-6 6-6z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 15l-3 1 1-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 9.5h.01" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </Base>
  ),
  Copy: (props: IconProps) => (
    <Base {...props}>
      <path d="M9 9h10v12H9V9z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 15H4a1 1 0 01-1-1V4a1 1 0 011-1h10a1 1 0 011 1v1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </Base>
  ),
  Check: (props: IconProps) => (
    <Base {...props}>
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </Base>
  ),
  Save: (props: IconProps) => (
    <Base {...props}>
      <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l3 3v13a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M17 21v-8H7v8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 3v6h8" stroke="currentColor" strokeWidth="1.6" />
    </Base>
  ),
  Home: (props: IconProps) => (
    <Base {...props}>
      <path d="M3 11.5L12 4l9 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 10.5V20h11V10.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </Base>
  ),
};
