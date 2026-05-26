'use client';

import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'filled' | 'tonal' | 'outlined' | 'elevated' | 'text' | 'danger' | 'danger-outlined' | 'warning';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  label: string;
  loading?: boolean;
  fullWidth?: boolean;
  iconOnly?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

const SIZE: Record<ButtonSize, { h: number; px: number; fontSize: number; iconSize: number }> = {
  sm: { h: 32, px: 12, fontSize: 12, iconSize: 16 },
  md: { h: 40, px: 16, fontSize: 14, iconSize: 16 },
  lg: { h: 48, px: 24, fontSize: 16, iconSize: 18 },
  xl: { h: 56, px: 32, fontSize: 18, iconSize: 20 },
};

const VARIANT: Record<ButtonVariant, { bg: string; color: string; border?: string; shadow?: string }> = {
  'filled':          { bg: 'var(--sys-color-primary)', color: 'var(--sys-color-on-primary)' },
  'tonal':           { bg: 'var(--sys-color-primary-fixed-dim)', color: 'var(--sys-color-on-primary-fixed)' },
  'outlined':        { bg: 'transparent', color: 'var(--sys-color-on-surface)', border: '1px solid var(--sys-color-outline)' },
  'elevated':        { bg: 'var(--sys-color-surface-container-lowest)', color: 'var(--sys-color-on-surface)', shadow: '0 2px 8px rgba(0,0,0,.08)' },
  'text':            { bg: 'transparent', color: 'var(--sys-color-on-surface)' },
  'danger':          { bg: 'var(--sys-color-error)', color: 'var(--sys-color-on-error)' },
  'danger-outlined': { bg: 'transparent', color: 'var(--sys-color-error)', border: '1px solid var(--sys-color-error-container)' },
  'warning':         { bg: 'var(--sys-color-warning)', color: 'var(--sys-color-on-warning)' },
};

export function Button({
  variant = 'filled',
  size = 'md',
  label,
  loading = false,
  fullWidth = false,
  iconOnly = false,
  leadingIcon,
  trailingIcon,
  disabled,
  style,
  ...rest
}: ButtonProps) {
  const s = SIZE[size];
  const v = VARIANT[variant];
  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        height: iconOnly ? s.h : s.h,
        width: iconOnly ? s.h : fullWidth ? '100%' : undefined,
        paddingInline: iconOnly ? 0 : variant === 'text' ? 0 : s.px,
        borderRadius: 9999,
        border: v.border ?? 'none',
        background: v.bg,
        color: v.color,
        fontSize: s.fontSize,
        fontWeight: 600,
        lineHeight: 1,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        opacity: isDisabled ? 0.48 : 1,
        boxShadow: v.shadow,
        transition: 'opacity .15s',
        ...style,
      }}
      {...rest}
    >
      {loading ? (
        <span style={{ width: s.iconSize, height: s.iconSize, borderRadius: '50%', border: `2px solid ${v.color}`, borderTopColor: 'transparent', display: 'block', animation: 'spin 0.8s linear infinite' }} />
      ) : leadingIcon ? (
        <span style={{ display: 'flex', alignItems: 'center', fontSize: s.iconSize }}>{leadingIcon}</span>
      ) : null}
      {!iconOnly && <span>{label}</span>}
      {trailingIcon && <span style={{ display: 'flex', alignItems: 'center', fontSize: s.iconSize }}>{trailingIcon}</span>}
    </button>
  );
}
