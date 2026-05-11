'use client';

import type { HTMLAttributes } from 'react';

export type SnackbarVariant = 'filled' | 'outlined';

export interface SnackbarProps extends HTMLAttributes<HTMLDivElement> {
  visible: boolean;
  message: string;
  variant?: SnackbarVariant;
  actionLabel?: string;
  onAction?: () => void;
  onClose?: () => void;
}

export function Snackbar({
  visible,
  message,
  variant = 'filled',
  actionLabel,
  onAction,
  onClose,
  style,
  ...rest
}: SnackbarProps) {
  if (!visible) return null;

  const isFilled = variant === 'filled';

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 16px',
        borderRadius: 12,
        background: isFilled ? 'var(--sys-color-inverse-surface)' : 'var(--sys-color-surface-container-lowest)',
        border: isFilled ? 'none' : '1px solid var(--sys-color-outline-variant)',
        boxShadow: '0 4px 16px rgba(0,0,0,.12)',
        color: isFilled ? 'var(--sys-color-inverse-on-surface)' : 'var(--sys-color-on-surface)',
        fontSize: 14,
        maxWidth: 320,
        ...style,
      }}
      {...rest}
    >
      <span style={{ flex: 1 }}>{message}</span>
      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          style={{
            flexShrink: 0,
            border: 'none',
            background: 'transparent',
            color: isFilled ? 'var(--sys-color-inverse-primary)' : 'var(--sys-color-primary)',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            padding: 0,
          }}
        >
          {actionLabel}
        </button>
      )}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          style={{
            flexShrink: 0,
            border: 'none',
            background: 'transparent',
            color: isFilled ? 'var(--sys-color-inverse-on-surface)' : 'var(--sys-color-on-surface-variant)',
            fontSize: 18,
            lineHeight: 1,
            cursor: 'pointer',
            padding: 0,
            opacity: 0.7,
          }}
        >
          ×
        </button>
      )}
    </div>
  );
}
