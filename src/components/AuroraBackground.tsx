import React from 'react';

export const AuroraBackground: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none bg-white bg-[radial-gradient(ellipse_80%_80%_at_85%_-10%,rgba(11,99,206,0.14),transparent_50%),radial-gradient(ellipse_70%_70%_at_10%_25%,rgba(56,189,248,0.12),transparent_50%),radial-gradient(ellipse_80%_80%_at_90%_55%,rgba(99,102,241,0.09),transparent_55%),radial-gradient(ellipse_70%_70%_at_15%_80%,rgba(14,165,233,0.09),transparent_50%),radial-gradient(ellipse_80%_80%_at_85%_105%,rgba(11,99,206,0.11),transparent_50%)]"
      aria-hidden="true"
    />
  );
};
