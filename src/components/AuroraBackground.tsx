import React, { useEffect, useState } from 'react';

export const AuroraBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none bg-white"
      aria-hidden="true"
    >
      {/* Aurora Ambient Container with smooth mouse parallax */}
      <div
        className="absolute inset-0 transition-transform duration-1000 ease-out"
        style={{
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
        }}
      >
        {/* Aurora Orb 1: Royal Blue Glow (Top Right / Hero) */}
        <div
          className="absolute -top-40 right-[-10%] w-[700px] sm:w-[950px] h-[700px] sm:h-[950px] rounded-full bg-gradient-to-br from-[#0B63CE]/20 via-[#4FA8FF]/15 to-transparent blur-[140px] sm:blur-[180px] animate-aurora-1"
        />

        {/* Aurora Orb 2: Cyan & Sky Glow (Top Left / Hero to About) */}
        <div
          className="absolute top-[10%] -left-40 w-[650px] sm:w-[850px] h-[650px] sm:h-[850px] rounded-full bg-gradient-to-tr from-[#38BDF8]/20 via-[#60A5FA]/15 to-transparent blur-[130px] sm:blur-[170px] animate-aurora-2"
        />

        {/* Aurora Orb 3: Indigo & Soft Violet Glow (Services & Differentials) */}
        <div
          className="absolute top-[40%] right-[-15%] w-[700px] sm:w-[900px] h-[700px] sm:h-[900px] rounded-full bg-gradient-to-bl from-[#6366F1]/15 via-[#3B82F6]/15 to-transparent blur-[140px] sm:blur-[180px] animate-aurora-3"
        />

        {/* Aurora Orb 4: Sky & Cyan Glow (Simulator) */}
        <div
          className="absolute top-[65%] -left-32 w-[650px] sm:w-[850px] h-[650px] sm:h-[850px] rounded-full bg-gradient-to-r from-[#0EA5E9]/15 via-[#3B82F6]/15 to-transparent blur-[130px] sm:blur-[170px] animate-aurora-4"
        />

        {/* Aurora Orb 5: Royal Blue Glow (Contact & Footer transition) */}
        <div
          className="absolute bottom-[-10%] right-[10%] w-[700px] sm:w-[900px] h-[600px] sm:h-[800px] rounded-full bg-gradient-to-t from-[#0B63CE]/15 via-[#38BDF8]/10 to-transparent blur-[140px] sm:blur-[180px] animate-aurora-1"
        />
      </div>
    </div>
  );
};
