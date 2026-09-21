import React, { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'cyan' | 'alert' | 'safe' | 'glow';
  onClick?: () => void;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  variant = 'default',
  onClick,
  hoverEffect = false,
}) => {
  let variantStyles = 'bg-[#0B101B]/80 border-white/[0.08] shadow-glass-panel';

  if (variant === 'cyan') {
    variantStyles = 'bg-[#0B101B]/90 border-cyan/30 shadow-glow-cyan-sm';
  } else if (variant === 'alert') {
    variantStyles = 'bg-[#1C0D12]/90 border-alert/40 shadow-glow-alert';
  } else if (variant === 'safe') {
    variantStyles = 'bg-[#091E16]/85 border-safe/30 shadow-glow-safe';
  } else if (variant === 'glow') {
    variantStyles = 'bg-[#0E1526]/85 border-white/[0.12] hover:border-cyan/40 hover:shadow-glow-cyan-sm';
  }

  const hoverStyles = hoverEffect
    ? 'transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20'
    : '';

  return (
    <div
      onClick={onClick}
      className={`relative rounded-2xl backdrop-blur-xl border p-5 ${variantStyles} ${hoverStyles} ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
