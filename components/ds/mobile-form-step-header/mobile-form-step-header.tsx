'use client';

import { useMemo } from 'react';

import { ProgressTracker } from '../mobile-progress-tracker/mobile-progress-tracker';

export interface FormStepHeaderProps {
  currentStep: number;
  totalSteps: number;
}

export function FormStepHeader({ currentStep, totalSteps }: FormStepHeaderProps) {
  const steps = useMemo(
    () =>
      Array.from({ length: totalSteps }, (_, i) => ({
        state:
          i === currentStep - 1
            ? ('active' as const)
            : i < currentStep - 1
              ? ('completed' as const)
              : ('pending' as const),
      })),
    [currentStep, totalSteps],
  );

  return (
    <div style={{ paddingInline: 16, paddingTop: 16, paddingBottom: 12, background: 'var(--sys-color-surface)' }}>
      <ProgressTracker steps={steps} />
    </div>
  );
}
