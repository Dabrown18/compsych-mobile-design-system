'use client';

import type { HTMLAttributes, ReactNode } from 'react';

import { resolveIcon } from '@/components/ds/mobile-icon/mobile-icon';

export type StatusChipVariant = 'warning' | 'error';
export type StatusChipAlign = 'left' | 'center' | 'right';

export interface StatusChipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  label: string;
  variant?: StatusChipVariant;
  icon?: string;
  align?: StatusChipAlign;
  fullWidth?: boolean;
}

const DEFAULT_ICONS: Record<StatusChipVariant, string> = {
  warning: 'ClockFadingIcon',
  error: 'ClockAlertIcon',
};

const COLORS: Record<StatusChipVariant, { bg: string; color: string }> = {
  warning: { bg: '#fdeed9', color: '#3a2304' },
  error: { bg: '#f7d4d4', color: '#570f0f' },
};

const JUSTIFY: Record<StatusChipAlign, string> = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

export function StatusChip({
  label,
  variant = 'warning',
  icon,
  align = 'center',
  fullWidth = false,
  style,
  ...rest
}: StatusChipProps) {
  const c = COLORS[variant];
  const iconName = icon ?? DEFAULT_ICONS[variant];
  const Icon = resolveIcon(iconName);

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: JUSTIFY[align],
        gap: 8,
        height: 32,
        paddingInline: 16,
        paddingBlock: 4,
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
      {Icon && <Icon size={16} color={c.color} />}
      <span style={{ fontSize: 14, fontWeight: 500, lineHeight: '20px', letterSpacing: '0.07px', whiteSpace: 'nowrap' }}>
        {label}
      </span>
    </div>
  );
}
