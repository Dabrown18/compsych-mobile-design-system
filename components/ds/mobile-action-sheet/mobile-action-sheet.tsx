'use client';

import type { ReactNode } from 'react';

export interface ActionSheetAction {
  label: string;
  onPress?: () => void;
  destructive?: boolean;
}

export interface ActionSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  primaryAction?: ActionSheetAction;
  secondaryAction?: ActionSheetAction;
}

export function ActionSheet({ visible, onClose, title, children, primaryAction, secondaryAction }: ActionSheetProps) {
  if (!visible) return null;

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      zIndex: 50,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
    }}>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,.40)',
        }}
      />
      {/* Sheet */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: 400,
        background: 'var(--sys-color-surface-container-low)',
        borderRadius: '20px 20px 0 0',
        padding: '8px 16px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}>
        {/* Handle */}
        <div style={{ alignSelf: 'center', width: 36, height: 4, borderRadius: 2, background: 'var(--sys-color-outline-variant)', marginBottom: 8 }} />

        {title && (
          <p style={{ margin: '0 0 4px', fontSize: 17, fontWeight: 600, color: 'var(--sys-color-on-surface)', textAlign: 'center' }}>{title}</p>
        )}

        {children && (
          <div style={{ color: 'var(--sys-color-on-surface-variant)', fontSize: 14 }}>{children}</div>
        )}

        {primaryAction && (
          <button
            type="button"
            onClick={primaryAction.onPress}
            style={{
              width: '100%',
              height: 48,
              borderRadius: 9999,
              border: 'none',
              background: primaryAction.destructive ? 'var(--sys-color-error)' : 'var(--sys-color-primary)',
              color: primaryAction.destructive ? 'var(--sys-color-on-error)' : 'var(--sys-color-on-primary)',
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {primaryAction.label}
          </button>
        )}

        {secondaryAction && (
          <button
            type="button"
            onClick={secondaryAction.onPress}
            style={{
              width: '100%',
              height: 48,
              borderRadius: 9999,
              border: '1px solid var(--sys-color-outline)',
              background: 'transparent',
              color: secondaryAction.destructive ? 'var(--sys-color-error)' : 'var(--sys-color-on-surface)',
              fontSize: 16,
              fontWeight: 400,
              cursor: 'pointer',
            }}
          >
            {secondaryAction.label}
          </button>
        )}
      </div>
    </div>
  );
}
