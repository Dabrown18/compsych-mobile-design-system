'use client';

import type { HTMLAttributes, ReactNode } from 'react';

export type ChipSize = 'sm' | 'md' | 'lg' | 'xl';
export type ChipUsage = 'neutral' | 'informative' | 'positive' | 'danger' | 'warning';

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  label: string;
  size?: ChipSize;
  usage?: ChipUsage;
  leadingIcon?: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  badge?: number | string;
}

const SIZE: Record<ChipSize, { h: number; px: number; fontSize: number; gap: number }> = {
  sm: { h: 20, px: 8,  fontSize: 11, gap: 4 },
  md: { h: 24, px: 12, fontSize: 12, gap: 4 },
  lg: { h: 32, px: 16, fontSize: 13, gap: 6 },
  xl: { h: 40, px: 16, fontSize: 15, gap: 8 },
};

const COLORS: Record<ChipUsage, { bg: string; color: string; elevated?: boolean }> = {
  neutral:     { bg: 'var(--sys-color-surface-container-lowest)', color: 'var(--sys-color-on-surface)', elevated: true },
  informative: { bg: 'var(--sys-color-info)', color: 'var(--sys-color-on-info)' },
  positive:    { bg: 'var(--sys-color-success)', color: 'var(--sys-color-on-success)' },
  danger:      { bg: 'var(--sys-color-error)', color: 'var(--sys-color-on-error)' },
  warning:     { bg: 'var(--sys-color-warning)', color: 'var(--sys-color-on-warning)' },
};

export function Chip({ label, size = 'md', usage = 'neutral', leadingIcon, dismissible, onDismiss, badge, style, ...rest }: ChipProps) {
  const s = SIZE[size];
  const c = COLORS[usage];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: s.gap,
        height: s.h,
        paddingInline: s.px,
        borderRadius: 9999,
        background: c.bg,
        color: c.color,
        fontSize: s.fontSize,
        fontWeight: 500,
        lineHeight: 1,
        boxShadow: c.elevated ? '0 2px 8px rgba(0,0,0,.10)' : undefined,
        cursor: 'default',
        userSelect: 'none',
        ...style,
      }}
      {...rest}
    >
      {leadingIcon && <span style={{ display: 'flex', alignItems: 'center', fontSize: s.fontSize + 2 }}>{leadingIcon}</span>}
      {label}
      {badge !== undefined && (
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: s.h * 0.8,
          height: s.h * 0.8,
          borderRadius: 9999,
          background: 'rgba(255,255,255,.20)',
          color: c.color,
          fontSize: s.fontSize - 2,
          fontWeight: 500,
          paddingInline: 3,
        }}>
          {badge}
        </span>
      )}
      {dismissible && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: s.h * 0.75,
            height: s.h * 0.75,
            borderRadius: '50%',
            border: 'none',
            background: 'rgba(0,0,0,.12)',
            color: c.color,
            cursor: 'pointer',
            padding: 0,
            fontSize: s.fontSize,
            lineHeight: 1,
          }}
        >
          ×
        </button>
      )}
    </span>
  );
}
