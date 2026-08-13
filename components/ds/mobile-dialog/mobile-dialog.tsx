'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

export interface DialogProps {
  visible: boolean;
  heading: string;
  description: ReactNode;
  icon?: ReactNode;
  primaryLabel: string;
  secondaryLabel?: string;
  onPrimaryAction: () => void;
  onClose: () => void;
}

export function Dialog({
  visible,
  heading,
  description,
  icon,
  primaryLabel,
  secondaryLabel,
  onPrimaryAction,
  onClose,
}: DialogProps) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (visible) {
      const id = requestAnimationFrame(() => setEntered(true));
      return () => cancelAnimationFrame(id);
    }
    setEntered(false);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,.40)',
          opacity: entered ? 1 : 0,
          transition: 'opacity 200ms ease',
        }}
      />

      {/* Card */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 320,
          background: 'var(--sys-color-surface-container-lowest)',
          borderRadius: 28,
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
          opacity: entered ? 1 : 0,
          transform: entered ? 'scale(1)' : 'scale(0.96)',
          transition: 'opacity 200ms ease, transform 200ms ease',
          boxShadow: '0 4px 16px rgba(0,0,0,.10)',
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            width: 32,
            height: 32,
            borderRadius: 9999,
            border: 'none',
            background: 'var(--sys-color-surface-container)',
            color: 'var(--sys-color-on-surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: 16,
            lineHeight: 1,
          }}
        >
          ×
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          {icon && (
            <div
              style={{
                width: 96,
                height: 96,
                borderRadius: '50%',
                border: '1px solid color-mix(in srgb, var(--sys-color-primary) 8%, transparent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 4,
              }}
            >
              <div
                style={{
                  width: 84,
                  height: 84,
                  borderRadius: '50%',
                  background: 'color-mix(in srgb, var(--sys-color-primary) 8%, transparent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {icon}
              </div>
            </div>
          )}

          <p
            style={{
              margin: 0,
              fontSize: 17,
              fontWeight: 600,
              textAlign: 'center',
              color: 'var(--sys-color-on-surface)',
            }}
          >
            {heading}
          </p>

          <p
            style={{
              margin: 0,
              fontSize: 14,
              textAlign: 'center',
              color: 'var(--sys-color-on-surface-variant)',
            }}
          >
            {description}
          </p>
        </div>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button
            type="button"
            onClick={onPrimaryAction}
            style={{
              width: '100%',
              height: 48,
              borderRadius: 9999,
              border: 'none',
              background: 'var(--sys-color-primary)',
              color: 'var(--sys-color-on-primary)',
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {primaryLabel}
          </button>
          {secondaryLabel && (
            <button
              type="button"
              onClick={onClose}
              style={{
                width: '100%',
                height: 48,
                borderRadius: 9999,
                border: '1px solid var(--sys-color-outline)',
                background: 'transparent',
                color: 'var(--sys-color-on-surface)',
                fontSize: 16,
                fontWeight: 400,
                cursor: 'pointer',
              }}
            >
              {secondaryLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
