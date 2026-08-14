'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

export type CrisisCloseModalCtaTone = 'danger' | 'warning' | 'primary';

export interface CrisisCloseModalCta {
  id: string;
  label: string;
  subtitle?: string;
  tone: CrisisCloseModalCtaTone;
  onPress: () => void;
}

export interface CrisisCloseModalProps {
  visible: boolean;
  title: string;
  description: string;
  ctas: CrisisCloseModalCta[];
  icon?: ReactNode;
  onClose: () => void;
}

const TONE_STYLES: Record<CrisisCloseModalCtaTone, { bg: string; color: string }> = {
  danger: { bg: 'var(--sys-color-error-container)', color: 'var(--sys-color-on-error-container)' },
  warning: { bg: 'var(--sys-color-warning-container)', color: 'var(--sys-color-on-warning-container)' },
  primary: { bg: 'var(--sys-color-primary)', color: 'var(--sys-color-on-primary)' },
};

export function CrisisCloseModal({ visible, title, description, ctas, icon, onClose }: CrisisCloseModalProps) {
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

      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 320,
          background: 'var(--sys-color-surface-container-lowest)',
          borderRadius: 28,
          paddingTop: 16,
          paddingBottom: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          opacity: entered ? 1 : 0,
          transform: entered ? 'scale(1)' : 'scale(0.96)',
          transition: 'opacity 200ms ease, transform 200ms ease',
          boxShadow: '0 4px 16px rgba(0,0,0,.12)',
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

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '0 16px' }}>
          {icon && (
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                border: '1px solid var(--sys-color-error-container)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {icon}
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
            {title}
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 16px' }}>
          {ctas.map((cta) => {
            const tone = TONE_STYLES[cta.tone];
            return (
              <button
                key={cta.id}
                type="button"
                onClick={cta.onPress}
                style={{
                  borderRadius: 9999,
                  border: 'none',
                  background: tone.bg,
                  color: tone.color,
                  paddingBlock: 8,
                  paddingInline: 24,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 600 }}>{cta.label}</span>
                {cta.subtitle && <span style={{ fontSize: 12 }}>{cta.subtitle}</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
