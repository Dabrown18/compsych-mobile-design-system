'use client';

import { resolveIcon, type IconName } from '../mobile-icon/mobile-icon';

export interface ResourceCardProps {
  title: string;
  description?: string;
  typeLabel: string;
  icon?: IconName;
  onPress: () => void;
  gradientColors?: readonly [string, string];
}

const DEFAULT_GRADIENT: readonly [string, string] = [
  'rgba(7, 92, 186, 0.1)',
  'rgba(255,255,255,0.1)',
];

export function ResourceCard({
  title,
  description,
  typeLabel,
  icon,
  onPress,
  gradientColors = DEFAULT_GRADIENT,
}: ResourceCardProps) {
  const Icon = icon ? resolveIcon(icon) : null;

  return (
    <button
      onClick={onPress}
      style={{
        all: 'unset',
        display: 'block',
        cursor: 'pointer',
        width: '100%',
        boxSizing: 'border-box',
        marginBottom: 12,
        backgroundColor: 'var(--sys-color-surface-container-lowest)',
        borderRadius: 20,
        border: '1px solid var(--sys-color-outline)',
        overflow: 'hidden',
      }}
    >
      {/* Inner card: an 8px border in "on-primary" color creates the inset gap around the gradient */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          borderRadius: 20,
          border: '8px solid var(--sys-color-on-primary)',
          padding: '16px 8px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 16,
            background: `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`,
          }}
        />
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: 'var(--sys-color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {Icon && (
              <Icon size={24} color="var(--sys-color-inverse-on-surface)" strokeWidth={1.5} />
            )}
          </div>
          <p style={{ margin: 0, fontWeight: 600, color: 'var(--sys-color-primary)' }}>
            {typeLabel}
          </p>
        </div>
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={{ margin: 0, fontWeight: 600, color: 'var(--sys-color-on-surface)' }}>
            {title}
          </p>
          {description && (
            <p
              style={{
                margin: 0,
                fontSize: 14,
                textAlign: 'left',
                color: 'var(--sys-color-on-surface-variant)',
              }}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}
