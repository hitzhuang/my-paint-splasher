import React from 'react';

interface UIOverlayProps {
  children: React.ReactNode;
}

const UIOverlay = ({ children }: UIOverlayProps) => (
  <div className="select-none absolute left-0 right-0 top-0 bottom-0 bg-black/80 flex flex-col justify-center items-center">
    {children}
  </div>
);

export default UIOverlay;
