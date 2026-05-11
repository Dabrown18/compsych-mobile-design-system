'use client';

import type { HTMLAttributes } from 'react';

export type DividerVariant = 'horizontal' | 'vertical';
export type DividerWeight = 'thin' | 'thick';

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  variant?: DividerVariant;
  weight?: DividerWeight;
  dashed?: boolean;
}

const WEIGHT: Record<DividerWeight, number> = { thin: 1, thick: 2 };

export function Divider({ variant = 'horizontal', weight = 'thin', dashed = false, style, ...rest }: DividerProps) {
  const px = WEIGHT[weight];
  const isVertical = variant === 'vertical';

  return (
    <hr
      style={{
        border: 'none',
        margin: 0,
        width: isVertical ? px : '100%',
        height: isVertical ? '100%' : px,
        minHeight: isVertical ? 16 : undefined,
        background: dashed
          ? undefined
          : 'var(--sys-color-outline-variant)',
        backgroundImage: dashed
          ? isVertical
            ? `repeating-linear-gradient(to bottom, var(--sys-color-outline-variant) 0, var(--sys-color-outline-variant) 6px, transparent 6px, transparent 10px)`
            : `repeating-linear-gradient(to right, var(--sys-color-outline-variant) 0, var(--sys-color-outline-variant) 6px, transparent 6px, transparent 10px)`
          : undefined,
        flexShrink: 0,
        ...style,
      }}
      {...rest}
    />
  );
}
