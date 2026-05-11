'use client';

import type { HTMLAttributes } from 'react';

export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeStyle = 'filled' | 'positive' | 'danger' | 'elevated' | 'tonal' | 'dot';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  label?: number | string;
  size?: BadgeSize;
  badgeStyle?: BadgeStyle;
}

const SIZE: Record<BadgeSize, { size: number; fontSize: number; px: number }> = {
  sm: { size: 16, fontSize: 10, px: 4 },
  md: { size: 20, fontSize: 12, px: 6 },
  lg: { size: 24, fontSize: 12, px: 8 },
};

const COLORS: Record<BadgeStyle, { bg: string; color: string; shadow?: string }> = {
  filled:   { bg: 'var(--sys-color-primary)', color: 'var(--sys-color-on-primary)' },
  positive: { bg: 'var(--sys-color-success)', color: 'var(--sys-color-on-success)' },
  danger:   { bg: 'var(--sys-color-error)', color: 'var(--sys-color-on-error)' },
  elevated: { bg: 'var(--sys-color-surface-container-lowest)', color: 'var(--sys-color-on-surface)', shadow: '0 2px 8px rgba(0,0,0,.10)' },
  tonal:    { bg: 'var(--sys-color-surface-container)', color: 'var(--sys-color-on-surface)' },
  dot:      { bg: 'transparent', color: 'transparent' },
};

export function Badge({ label, size = 'md', badgeStyle = 'filled', style, ...rest }: BadgeProps) {
  const s = SIZE[size];
  const c = COLORS[badgeStyle];
  const displayLabel = label !== undefined ? String(label) : '';

  if (badgeStyle === 'dot') {
    const dotSize = s.size * 0.5;
    return (
      <span
        style={{
          display: 'inline-flex',
          width: s.size,
          height: s.size,
          alignItems: 'center',
          justifyContent: 'center',
          ...style,
        }}
        {...rest}
      >
        <span style={{
          width: dotSize,
          height: dotSize,
          borderRadius: '50%',
          background: 'var(--sys-color-primary)',
          display: 'block',
        }} />
      </span>
    );
  }

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: s.size,
        height: s.size,
        borderRadius: 9999,
        paddingInline: s.px,
        background: c.bg,
        color: c.color,
        fontSize: s.fontSize,
        fontWeight: 500,
        lineHeight: 1,
        boxShadow: c.shadow,
        ...style,
      }}
      {...rest}
    >
      {displayLabel}
    </span>
  );
}
