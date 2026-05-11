'use client';

import type { HTMLAttributes, ReactNode } from 'react';

export type AlertVariant = 'default' | 'elevated' | 'informative' | 'warning' | 'positive' | 'danger';
export type AlertSize = 'sm' | 'lg';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  size?: AlertSize;
  title?: string;
  description: string;
  icon?: ReactNode;
  hideIcon?: boolean;
  actionLabel?: string;
  onAction?: () => void;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const COLORS: Record<AlertVariant, { bg: string; text: string; iconColor: string; shadow?: string; border?: string }> = {
  default:     { bg: 'var(--sys-color-surface-container-low)', text: 'var(--sys-color-on-surface)', iconColor: 'var(--sys-color-on-surface-variant)' },
  elevated:    { bg: 'var(--sys-color-surface-container-lowest)', text: 'var(--sys-color-on-surface)', iconColor: 'var(--sys-color-on-surface-variant)', shadow: '0 2px 12px rgba(0,0,0,.10)', border: '1px solid var(--sys-color-outline-variant)' },
  informative: { bg: 'var(--sys-color-info-container)', text: 'var(--sys-color-on-info-container)', iconColor: 'var(--sys-color-on-info-container)' },
  warning:     { bg: 'var(--sys-color-warning-container)', text: 'var(--sys-color-on-warning-container)', iconColor: 'var(--sys-color-on-warning-container)' },
  positive:    { bg: 'var(--sys-color-success-container)', text: 'var(--sys-color-on-success-container)', iconColor: 'var(--sys-color-on-success-container)' },
  danger:      { bg: 'var(--sys-color-error-container)', text: 'var(--sys-color-on-error-container)', iconColor: 'var(--sys-color-on-error-container)' },
};

const ICON: Record<AlertVariant, string> = {
  default:     'ℹ',
  elevated:    'ℹ',
  informative: 'ℹ',
  warning:     '⚠',
  positive:    '✓',
  danger:      '⚠',
};

export function Alert({
  variant = 'default',
  size = 'lg',
  title,
  description,
  icon,
  hideIcon = false,
  actionLabel,
  onAction,
  dismissible = false,
  onDismiss,
  style,
  ...rest
}: AlertProps) {
  const c = COLORS[variant];
  const isLg = size === 'lg';

  const resolvedIcon = !hideIcon && (icon ?? (
    <span style={{ fontSize: isLg ? 22 : 18, color: c.iconColor, lineHeight: 1 }}>{ICON[variant]}</span>
  ));

  return (
    <div
      role="alert"
      style={{
        display: 'flex',
        alignItems: isLg ? 'flex-start' : 'center',
        gap: isLg ? 16 : 12,
        padding: `${isLg ? 16 : 12}px ${isLg ? 24 : 16}px`,
        borderRadius: isLg ? 16 : 12,
        background: c.bg,
        border: c.border,
        boxShadow: c.shadow,
        color: c.text,
        ...style,
      }}
      {...rest}
    >
      {resolvedIcon && (
        <span style={{ flexShrink: 0, marginTop: isLg ? 2 : 0 }}>{resolvedIcon}</span>
      )}

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {isLg && title && (
            <p style={{ margin: 0, fontSize: 15, fontWeight: 500, color: c.text }}>{title}</p>
          )}
          <p style={{ margin: 0, fontSize: isLg ? 15 : 13, color: c.text }}>{description}</p>
        </div>
        {actionLabel && (
          <button
            type="button"
            onClick={onAction}
            style={{
              alignSelf: 'flex-start',
              border: isLg ? '1px solid var(--sys-color-outline-variant)' : 'none',
              background: isLg ? 'var(--sys-color-surface-container-lowest)' : 'transparent',
              color: isLg ? 'var(--sys-color-on-surface)' : c.text,
              fontSize: 13,
              fontWeight: isLg ? 400 : 500,
              borderRadius: isLg ? 9999 : 0,
              padding: isLg ? '6px 16px' : 0,
              cursor: 'pointer',
              boxShadow: isLg ? '0 1px 4px rgba(0,0,0,.08)' : undefined,
            }}
          >
            {actionLabel}
          </button>
        )}
      </div>

      {dismissible && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          style={{
            flexShrink: 0,
            border: 'none',
            background: 'transparent',
            color: c.iconColor,
            cursor: 'pointer',
            fontSize: 16,
            padding: 4,
            lineHeight: 1,
          }}
        >
          ×
        </button>
      )}
    </div>
  );
}
