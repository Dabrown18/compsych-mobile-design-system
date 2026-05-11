'use client';

import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';

export type EmptyStateStyle = 'icon' | 'illustration';
export type EmptyStateViewport = 'desktop' | 'mobile';

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'style'> {
  emptyStyle?: EmptyStateStyle;
  viewport?: EmptyStateViewport;
  title?: string;
  description?: string;
  showDescription?: boolean;
  icon?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  style?: CSSProperties;
}

export function EmptyState({
  emptyStyle = 'icon',
  viewport = 'mobile',
  title = 'No results',
  description,
  showDescription = true,
  icon,
  actionLabel,
  onAction,
  style,
  ...rest
}: EmptyStateProps) {
  const isMobile = viewport === 'mobile';
  const circleSize = isMobile ? 64 : 80;
  const titleSize = isMobile ? 18 : 22;
  const descSize = isMobile ? 14 : 15;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
        padding: '32px 24px',
        textAlign: 'center',
        ...style,
      }}
      {...rest}
    >
      {/* Graphic */}
      <div style={{
        width: circleSize,
        height: circleSize,
        borderRadius: '50%',
        background: 'var(--sys-color-surface-container)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--sys-color-on-surface-variant)',
        fontSize: circleSize * 0.45,
      }}>
        {icon ?? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} width="55%" height="55%">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={{ margin: 0, fontSize: titleSize, fontWeight: 600, color: 'var(--sys-color-on-surface)' }}>{title}</p>
        {description && showDescription && (
          <p style={{ margin: 0, fontSize: descSize, color: 'var(--sys-color-on-surface-variant)' }}>{description}</p>
        )}
      </div>

      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          style={{
            height: 44,
            paddingInline: 24,
            borderRadius: 9999,
            border: '1px solid var(--sys-color-outline)',
            background: 'transparent',
            color: 'var(--sys-color-on-surface)',
            fontSize: 15,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
