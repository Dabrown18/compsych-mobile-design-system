'use client';

import type { HTMLAttributes } from 'react';

// ── ProgressBar ───────────────────────────────────────────────────────────────

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  /** 0–100 */
  progress: number;
}

export function ProgressBar({ progress, style, ...rest }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, progress));
  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{
        width: '100%',
        height: 8,
        borderRadius: 9999,
        background: 'var(--sys-color-surface-container-high)',
        overflow: 'hidden',
        ...style,
      }}
      {...rest}
    >
      <div style={{
        width: `${clamped}%`,
        height: '100%',
        borderRadius: 9999,
        background: 'var(--sys-color-primary)',
        transition: 'width .3s ease',
      }} />
    </div>
  );
}

// ── ProgressTracker ───────────────────────────────────────────────────────────

export type StepState = 'completed' | 'active' | 'pending';

export interface TrackerStep {
  label?: string;
  /**
   * Visual state of this step:
   * - `completed` — full green fill (progress 100%)
   * - `active`    — partial green fill (~25%), indicates in-progress
   * - `pending`   — gray track only, no fill (progress 0%)
   */
  state: StepState;
}

export type ProgressTrackerSize = 'sm' | 'lg';

export interface ProgressTrackerProps extends HTMLAttributes<HTMLDivElement> {
  steps: TrackerStep[];
  size?: ProgressTrackerSize;
  showLabels?: boolean;
}

const SIZE: Record<ProgressTrackerSize, { dotSize: number; lineH: number; fontSize: number }> = {
  sm: { dotSize: 8,  lineH: 2, fontSize: 11 },
  lg: { dotSize: 12, lineH: 2, fontSize: 13 },
};

export function ProgressTracker({ steps, size = 'lg', showLabels = true, style, ...rest }: ProgressTrackerProps) {
  const s = SIZE[size];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: showLabels ? 8 : 0, ...style }} {...rest}>
      {/* Track row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1;
          const dotColor =
            step.state === 'completed' ? 'var(--sys-color-primary)' :
            step.state === 'active'    ? 'var(--sys-color-primary)' :
                                          'var(--sys-color-outline-variant)';
          const lineColor = step.state === 'completed' ? 'var(--sys-color-primary)' : 'var(--sys-color-outline-variant)';

          return (
            <span key={i} style={{ display: 'flex', alignItems: 'center', flex: isLast ? 0 : 1 }}>
              <span style={{
                width: step.state === 'active' ? s.dotSize * 1.5 : s.dotSize,
                height: step.state === 'active' ? s.dotSize * 1.5 : s.dotSize,
                borderRadius: '50%',
                background: dotColor,
                display: 'block',
                flexShrink: 0,
                outline: step.state === 'active' ? `3px solid var(--sys-color-primary-container)` : undefined,
                transition: 'all .2s',
              }} />
              {!isLast && (
                <span style={{
                  flex: 1,
                  height: s.lineH,
                  background: lineColor,
                  display: 'block',
                  marginInline: 4,
                  minWidth: 12,
                }} />
              )}
            </span>
          );
        })}
      </div>

      {/* Labels row */}
      {showLabels && (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {steps.map((step, i) => (
            <span key={i} style={{
              fontSize: s.fontSize,
              color: step.state === 'pending' ? 'var(--sys-color-on-surface-variant)' : 'var(--sys-color-on-surface)',
              fontWeight: step.state === 'active' ? 500 : 400,
              lineHeight: 1.3,
              flex: 1,
              textAlign: i === 0 ? 'left' : i === steps.length - 1 ? 'right' : 'center',
            }}>
              {step.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
