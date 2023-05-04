import React from 'react';

interface UIBackdropProps {
  open: boolean;
  children: React.ReactNode;
}

const UIBackdrop = ({ open, children }: UIBackdropProps) => (
  <div
    className={`select-none absolute left-0 right-0 top-0 bottom-0 bg-black/80 flex flex-col justify-center items-center ${
      open ? 'fade-in' : 'fade-out'
    }`}
  >
    {children}
  </div>
);

export default UIBackdrop;
