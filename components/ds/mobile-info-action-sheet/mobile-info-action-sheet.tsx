'use client';

import type { ReactNode } from 'react';
import { ActionSheet } from '../mobile-action-sheet/mobile-action-sheet';

export interface InfoActionSheetProps {
  visible: boolean;
  title?: string;
  heading: string;
  description: ReactNode;
  alertText?: ReactNode;
  primaryLabel: string;
  secondaryLabel: string;
  onClose: () => void;
  onPrimaryAction: () => void;
  icon?: ReactNode;
}

export function InfoActionSheet({
  visible,
  title,
  heading,
  description,
  alertText,
  primaryLabel,
  secondaryLabel,
  onClose,
  onPrimaryAction,
  icon,
}: InfoActionSheetProps) {
  return (
    <ActionSheet
      visible={visible}
      onClose={onClose}
      title={title}
      primaryAction={{ label: primaryLabel, onPress: onPrimaryAction }}
      secondaryAction={{ label: secondaryLabel, onPress: onClose }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        {icon && (
          <div
            style={{
              width: 120,
              height: 120,
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
                width: 108,
                height: 108,
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

        {alertText && (
          <div
            style={{
              width: '100%',
              borderRadius: 12,
              padding: '12px 16px',
              background: 'var(--sys-color-info-container)',
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 14,
                textAlign: 'center',
                color: 'var(--sys-color-on-info-container)',
              }}
            >
              {alertText}
            </p>
          </div>
        )}
      </div>
    </ActionSheet>
  );
}
