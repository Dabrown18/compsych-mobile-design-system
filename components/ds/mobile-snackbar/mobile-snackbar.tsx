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
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        padding: '12px 16px',
        borderRadius: 12,
        width: '100%',
        boxSizing: 'border-box',
        background: isFilled
          ? 'var(--sys-color-primary-container, #070f36)'
          : 'var(--sys-color-surface-container-lowest, #fff)',
        border: isFilled
          ? 'none'
          : '1px solid var(--sys-color-outline-variant, #d7dbe0)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.16), 0 2px 6px rgba(0,0,0,0.12)',
        ...style,
      }}
      {...rest}
    >
      {/* Message */}
      <span
        style={{
          flex: 1,
          minWidth: 0,
          fontSize: 16,
          fontWeight: 400,
          lineHeight: '24px',
          letterSpacing: 0,
          color: isFilled ? '#ffffff' : 'var(--sys-color-on-surface, #1b1d22)',
          fontFamily: "'GoogleSans_400Regular', sans-serif",
        }}
      >
        {message}
      </span>

      {/* Action slot */}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        {actionLabel && (
          <button
            type="button"
            onClick={onAction}
            style={{
              background: 'none',
              border: 'none',
              padding: '4px 0',
              fontSize: 14,
              fontWeight: 500,
              lineHeight: '20px',
              letterSpacing: '0.07px',
              color: isFilled ? '#ffffff' : 'var(--sys-color-primary, #075cba)',
              fontFamily: "'GoogleSans_500Medium', sans-serif",
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {actionLabel}
          </button>
        )}

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Dismiss"
            style={{
              width: 24,
              height: 24,
              borderRadius: 9999,
              background: isFilled ? 'rgba(255,255,255,0.1)' : 'var(--sys-color-surface-container, #f3f4f6)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: 0,
              flexShrink: 0,
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width={16}
              height={16}
              fill="none"
              stroke={isFilled ? '#ffffff' : 'var(--sys-color-on-surface-variant, #565f6c)'}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
