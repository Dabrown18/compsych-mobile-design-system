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
        height: 4,
        borderRadius: 9999,
        background: 'var(--sys-color-surface-container-highest)',
        overflow: 'hidden',
        ...style,
      }}
      {...rest}
    >
      {clamped > 0 && (
        <div style={{
          width: `${clamped}%`,
          height: '100%',
          borderRadius: 9999,
          background: 'var(--sys-color-success)',
          transition: 'width .3s ease',
        }} />
      )}
    </div>
  );
}

// ── ProgressTracker ───────────────────────────────────────────────────────────

export type StepState = 'completed' | 'active' | 'pending';

export interface TrackerStep {
  label?: string;
  /**
   * Visual state of this step:
   * - `completed` — full green fill (100%)
   * - `active`    — partial green fill (~25%), indicates in-progress
   * - `pending`   — gray track only, no fill
   */
  state: StepState;
}

export type ProgressTrackerSize = 'sm' | 'lg';

export interface ProgressTrackerProps extends HTMLAttributes<HTMLDivElement> {
  steps: TrackerStep[];
  size?: ProgressTrackerSize;
  /** Render step labels above each bar. Default false. */
  showLabels?: boolean;
}

const FONT_SIZE: Record<ProgressTrackerSize, number> = { sm: 11, lg: 13 };
const LABEL_GAP: Record<ProgressTrackerSize, number> = { sm: 8, lg: 16 };
const STEP_GAP: Record<ProgressTrackerSize, number>  = { sm: 4, lg: 8 };

function stepProgress(state: StepState): number {
  switch (state) {
    case 'completed': return 100;
    case 'active':    return 25;
    case 'pending':   return 0;
  }
}

export function ProgressTracker({
  steps,
  size = 'lg',
  showLabels = false,
  style,
  ...rest
}: ProgressTrackerProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: STEP_GAP[size],
        alignItems: 'flex-start',
        width: '100%',
        ...style,
      }}
      {...rest}
    >
      {steps.map((step, i) => {
        const labelColor =
          step.state !== 'pending'
            ? 'var(--sys-color-on-surface)'
            : 'var(--sys-color-on-surface-variant)';

        return (
          <div key={i} style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: showLabels ? LABEL_GAP[size] : 0 }}>
            {showLabels && step.label && (
              <span style={{
                fontSize: FONT_SIZE[size],
                color: labelColor,
                lineHeight: 1.3,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {step.label}
              </span>
            )}
            <ProgressBar progress={stepProgress(step.state)} />
          </div>
        );
      })}
    </div>
  );
}
