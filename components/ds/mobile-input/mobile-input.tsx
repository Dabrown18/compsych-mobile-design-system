'use client';

import type { InputHTMLAttributes, ReactNode } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: InputSize;
  label?: string;
  helperText?: string;
  errorText?: string;
  invalid?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

const SIZE: Record<InputSize, { h: number; px: number; fontSize: number; radius: number }> = {
  sm: { h: 40, px: 12, fontSize: 13, radius: 6 },
  md: { h: 48, px: 16, fontSize: 15, radius: 6 },
  lg: { h: 56, px: 20, fontSize: 15, radius: 8 },
};

export function Input({
  size = 'md',
  label,
  helperText,
  errorText,
  invalid = false,
  leadingIcon,
  trailingIcon,
  disabled,
  style,
  ...rest
}: InputProps) {
  const s = SIZE[size];
  const hasError = invalid || !!errorText;
  const supportingText = errorText ?? helperText;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
      {label && (
        <label style={{
          fontSize: 12,
          fontWeight: 500,
          color: hasError ? 'var(--sys-color-error)' : 'var(--sys-color-on-surface-variant)',
          paddingInlineStart: 4,
        }}>
          {label}
        </label>
      )}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        height: s.h,
        paddingInline: s.px,
        borderRadius: s.radius,
        border: `1.5px solid ${hasError ? 'var(--sys-color-error)' : 'var(--sys-color-outline-variant)'}`,
        background: 'var(--sys-color-surface-container-lowest)',
        opacity: disabled ? 0.48 : 1,
      }}>
        {leadingIcon && <span style={{ display: 'flex', alignItems: 'center', color: 'var(--sys-color-on-surface-variant)', fontSize: 18 }}>{leadingIcon}</span>}
        <input
          {...rest}
          disabled={disabled}
          style={{
            flex: 1,
            border: 'none',
            background: 'transparent',
            outline: 'none',
            fontSize: s.fontSize,
            color: 'var(--sys-color-on-surface)',
            ...style,
          }}
        />
        {trailingIcon && <span style={{ display: 'flex', alignItems: 'center', color: 'var(--sys-color-on-surface-variant)', fontSize: 18 }}>{trailingIcon}</span>}
      </div>
      {supportingText && (
        <p style={{
          margin: 0,
          fontSize: 12,
          color: hasError ? 'var(--sys-color-error)' : 'var(--sys-color-on-surface-variant)',
          paddingInlineStart: 4,
        }}>
          {supportingText}
        </p>
      )}
    </div>
  );
}
