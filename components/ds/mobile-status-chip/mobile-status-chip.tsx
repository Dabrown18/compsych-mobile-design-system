'use client';

import type { HTMLAttributes, ReactNode } from 'react';

import { resolveIcon } from '@/components/ds/mobile-icon/mobile-icon';

export type StatusChipVariant = 'warning' | 'error' | 'positive';
export type StatusChipAlign = 'left' | 'center' | 'right';
export type StatusChipSize = 'sm' | 'md';

export interface StatusChipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  label: string;
  variant?: StatusChipVariant;
  size?: StatusChipSize;
  icon?: string;
  hideIcon?: boolean;
  align?: StatusChipAlign;
  fullWidth?: boolean;
}

const DEFAULT_ICONS: Record<StatusChipVariant, string> = {
  warning: 'ClockFadingIcon',
  error: 'ClockAlertIcon',
  positive: 'CheckCircleIcon',
};

const COLORS: Record<StatusChipVariant, { bg: string; color: string }> = {
  warning: { bg: 'var(--sys-color-warning-container)', color: 'var(--sys-color-on-warning-container)' },
  error: { bg: 'var(--sys-color-error-container)', color: 'var(--sys-color-on-error-container)' },
  positive: { bg: 'var(--sys-color-success-container)', color: 'var(--sys-color-on-success-container)' },
};

const SIZE: Record<StatusChipSize, { height?: number; px: number; py: number; gap: number; fontSize: number; iconSize: number }> = {
  md: { height: 32, px: 16, py: 4, gap: 8, fontSize: 14, iconSize: 16 },
  sm: { px: 8, py: 3, gap: 4, fontSize: 10, iconSize: 12 },
};

const JUSTIFY: Record<StatusChipAlign, string> = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

export function StatusChip({
  label,
  variant = 'warning',
  size = 'md',
  icon,
  hideIcon = false,
  align = 'center',
  fullWidth = false,
  style,
  ...rest
}: StatusChipProps) {
  const c = COLORS[variant];
  const s = SIZE[size];
  const iconName = icon ?? DEFAULT_ICONS[variant];
  const Icon = hideIcon ? undefined : resolveIcon(iconName);

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: JUSTIFY[align],
        gap: s.gap,
        height: s.height,
        paddingInline: s.px,
        paddingBlock: s.py,
        borderRadius: 9999,
        background: c.bg,
        color: c.color,
        width: fullWidth ? '100%' : undefined,
        boxSizing: 'border-box',
        userSelect: 'none',
        ...style,
      }}
      {...rest}
    >
      {Icon && <Icon size={s.iconSize} color={c.color} />}
      <span style={{ fontSize: s.fontSize, fontWeight: 500, lineHeight: '20px', letterSpacing: '0.07px', whiteSpace: 'nowrap' }}>
        {label}
      </span>
    </div>
  );
}
