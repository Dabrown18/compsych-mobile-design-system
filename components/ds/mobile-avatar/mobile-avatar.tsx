'use client';

import type { HTMLAttributes } from 'react';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
export type AvatarVariant = 'text' | 'image' | 'icon';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AvatarVariant;
  size?: AvatarSize;
  initials?: string;
  source?: string;
  icon?: React.ReactNode;
  activityRing?: boolean;
  presenceBadge?: boolean;
  accessibilityLabel?: string;
}

const DIAMETER: Record<AvatarSize, { d: number; font: number }> = {
  xs:  { d: 24,  font: 10 },
  sm:  { d: 32,  font: 12 },
  md:  { d: 40,  font: 14 },
  lg:  { d: 48,  font: 14 },
  xl:  { d: 64,  font: 14 },
  '2xl': { d: 88, font: 20 },
  '3xl': { d: 120, font: 24 },
};

export function Avatar({
  variant = 'text',
  size = 'md',
  initials = 'CP',
  source,
  icon,
  activityRing = false,
  presenceBadge = false,
  style,
  ...rest
}: AvatarProps) {
  const { d, font } = DIAMETER[size];
  const r = d / 2;

  return (
    <div
      style={{ position: 'relative', width: d, height: d, display: 'inline-block', ...style }}
      {...rest}
    >
      {/* Circle */}
      <div style={{
        width: d,
        height: d,
        borderRadius: r,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: variant !== 'image' ? 'var(--sys-color-info-container, #dce8ff)' : undefined,
        color: 'var(--sys-color-on-info-container, #004aad)',
        fontSize: font,
        fontWeight: 500,
      }}>
        {variant === 'text' && <span style={{ lineHeight: 1 }}>{initials?.slice(0, 2)}</span>}
        {variant === 'image' && source && (
          <img src={source} alt="" style={{ width: d, height: d, objectFit: 'cover' }} />
        )}
        {variant === 'icon' && (icon ?? (
          <svg width={font * 1.4} height={font * 1.4} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
          </svg>
        ))}
      </div>

      {/* Activity ring */}
      {activityRing && (
        <div style={{
          position: 'absolute',
          inset: -2,
          borderRadius: r + 2,
          border: '2px solid var(--sys-color-primary)',
          pointerEvents: 'none',
        }} />
      )}

      {/* Presence badge */}
      {presenceBadge && d >= 32 && (
        <div style={{
          position: 'absolute',
          bottom: -2,
          right: -2,
          width: Math.max(16, d * 0.3),
          height: Math.max(16, d * 0.3),
          borderRadius: '50%',
          background: 'var(--sys-color-surface-container-lowest)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: Math.max(10, d * 0.18),
          color: 'var(--sys-color-on-info-container, #004aad)',
        }}>
          <svg viewBox="0 0 24 24" fill="currentColor" width="70%" height="70%">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
          </svg>
        </div>
      )}
    </div>
  );
}
