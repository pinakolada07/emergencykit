import React from 'react';

interface StatusBadgeProps {
  status: 'safe' | 'critical' | 'alert' | 'warning' | 'info' | 'resolved' | 'coordinating' | 'available' | 'busy';
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  pulse?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  size = 'md',
  pulse = true,
}) => {
  const getBadgeConfig = () => {
    switch (status) {
      case 'safe':
      case 'resolved':
      case 'available':
        return {
          dotColor: 'bg-safe',
          textColor: 'text-emerald-400',
          bgColor: 'bg-emerald-500/10',
          borderColor: 'border-emerald-500/20',
          defaultLabel: status === 'safe' ? 'YOU ARE SAFE' : status === 'resolved' ? 'RESOLVED' : 'AVAILABLE',
          pulseColor: 'bg-emerald-400',
        };
      case 'critical':
      case 'alert':
        return {
          dotColor: 'bg-alert',
          textColor: 'text-red-400',
          bgColor: 'bg-red-500/15',
          borderColor: 'border-red-500/30',
          defaultLabel: status === 'critical' ? 'CRITICAL EMERGENCY' : 'ALERT ACTIVE',
          pulseColor: 'bg-red-400',
        };
      case 'warning':
      case 'coordinating':
      case 'busy':
        return {
          dotColor: 'bg-warning',
          textColor: 'text-amber-400',
          bgColor: 'bg-amber-500/10',
          borderColor: 'border-amber-500/20',
          defaultLabel: status === 'coordinating' ? 'COORDINATING' : status === 'busy' ? 'BUSY' : 'WARNING',
          pulseColor: 'bg-amber-400',
        };
      case 'info':
      default:
        return {
          dotColor: 'bg-cyan',
          textColor: 'text-cyan',
          bgColor: 'bg-cyan/10',
          borderColor: 'border-cyan/20',
          defaultLabel: 'ACTIVE',
          pulseColor: 'bg-cyan',
        };
    }
  };

  const config = getBadgeConfig();
  const text = label || config.defaultLabel;

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 tracking-wider gap-1.5',
    md: 'text-xs px-2.5 py-1 tracking-wider gap-2',
    lg: 'text-sm px-3.5 py-1.5 tracking-widest font-semibold gap-2.5',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-display border font-medium uppercase ${sizeClasses[size]} ${config.bgColor} ${config.textColor} ${config.borderColor}`}
    >
      <span className="relative flex h-2 w-2">
        {pulse && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${config.pulseColor}`}
          />
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${config.dotColor}`} />
      </span>
      {text}
    </span>
  );
};
