import React from 'react';
import { CheckCircle2, Clock, CircleDot, Circle } from 'lucide-react';
import { TimelineStep } from '../../types';

interface EmergencyTimelineProps {
  timeline: TimelineStep[];
  className?: string;
}

export const EmergencyTimeline: React.FC<EmergencyTimelineProps> = ({
  timeline,
  className = '',
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-cyan before:via-alert before:to-white/10">
        {timeline.map((step) => {
          const isCompleted = step.status === 'completed';
          const isInProgress = step.status === 'in_progress';

          return (
            <div key={step.id} className="relative flex items-start gap-3 group">
              <div className="absolute -left-6 top-0.5 flex items-center justify-center">
                {isCompleted ? (
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-safe flex items-center justify-center text-safe shadow-glow-safe">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                ) : isInProgress ? (
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400 shadow-sm animate-pulse">
                    <CircleDot className="w-3.5 h-3.5 animate-spin" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-surface-100 border border-white/20 flex items-center justify-center text-slate-500">
                    <Circle className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className={`font-display font-semibold text-xs sm:text-sm tracking-wide ${
                    isCompleted
                      ? 'text-white'
                      : isInProgress
                      ? 'text-amber-300 font-bold'
                      : 'text-slate-400'
                  }`}>
                    {step.label}
                  </span>
                  {step.timestamp && (
                    <span className="font-mono text-[10px] text-cyan flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {step.timestamp}
                    </span>
                  )}
                </div>

                {step.detail && (
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {step.detail}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
