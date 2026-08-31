import React from 'react';
import { ShieldCheck, Award } from 'lucide-react';

interface AuthenticitySealProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AuthenticitySeal: React.FC<AuthenticitySealProps> = ({ 
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32 sm:w-36 sm:h-36',
    lg: 'w-40 h-40 sm:w-44 sm:h-44'
  };

  return (
    <div className={`relative flex items-center justify-center select-none ${sizeClasses[size]} ${className}`}>
      {/* Outer Rotating SVG Circular Text */}
      <svg 
        viewBox="0 0 200 200" 
        className="w-full h-full animate-spin-slow pointer-events-none"
      >
        <path
          id="sealCirclePath"
          d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
          fill="none"
        />
        <text className="text-[10.5px] font-extrabold uppercase tracking-[0.24em] fill-slate-800">
          <textPath href="#sealCirclePath" startOffset="0%">
            • JL OLIVEIRA CONTÁBIL • BRAGANÇA PAULISTA • DESDE 2005 • CRC ATIVO
          </textPath>
        </text>
      </svg>

      {/* Center Core Certified Badge */}
      <div className="absolute inset-0 m-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#0B63CE] to-[#084298] text-white flex flex-col items-center justify-center shadow-lg shadow-[#0B63CE]/25 border-2 border-white">
        <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-blue-200" />
        <span className="text-[9px] font-black uppercase tracking-wider text-white mt-0.5">
          100% Legal
        </span>
      </div>

      {/* Decorative Outer Ring */}
      <div className="absolute inset-1 rounded-full border border-dashed border-[#0B63CE]/30 pointer-events-none" />
    </div>
  );
};
