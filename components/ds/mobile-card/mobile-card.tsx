'use client';

import type { HTMLAttributes, ReactNode } from 'react';

export type CardVariant = 'outlined' | 'tonal' | 'filled' | 'doubled' | 'image';
export type CardSize = 'sm' | 'md' | 'lg';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  size?: CardSize;
  title?: string;
  description?: string;
  icon?: ReactNode;
  image?: string;
  buttonIcon?: ReactNode;
  interactive?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  children?: ReactNode;
  fullWidth?: boolean;
}

const VARIANT: Record<CardVariant, {
  bg: string; border?: string; titleColor: string; descColor: string; shadow?: string;
}> = {
  outlined: {
    bg: 'var(--sys-color-surface-container-lowest)',
    border: '1px solid var(--sys-color-outline)',
    titleColor: 'var(--sys-color-on-surface)',
    descColor: 'var(--sys-color-on-surface-variant)',
    shadow: '0 2px 8px rgba(0,0,0,.06)',
  },
  tonal: {
    bg: 'var(--sys-color-primary-fixed-dim)',
    titleColor: 'var(--sys-color-on-primary-fixed)',
    descColor: 'var(--sys-color-on-primary-fixed)',
  },
  filled: {
    bg: 'var(--sys-color-primary)',
    titleColor: 'var(--sys-color-on-primary)',
    descColor: 'var(--sys-color-on-primary)',
    shadow: '0 2px 8px rgba(0,0,0,.08)',
  },
  doubled: {
    bg: 'var(--sys-color-surface-container-lowest)',
    border: '1px solid var(--sys-color-outline)',
    titleColor: 'var(--sys-color-on-surface)',
    descColor: 'var(--sys-color-on-surface-variant)',
  },
  image: {
    bg: 'transparent',
    titleColor: '#ffffff',
    descColor: 'rgba(255,255,255,.80)',
  },
};

const SIZE: Record<CardSize, { px: number; py: number; radius: number; layout: 'row' | 'column'; titleSize: number; descSize: number; gap: number; width?: number; height?: number }> = {
  sm: { px: 16, py: 12, radius: 12, layout: 'row',    titleSize: 15, descSize: 13, gap: 12, width: 480 },
  md: { px: 16, py: 16, radius: 16, layout: 'column', titleSize: 15, descSize: 13, gap: 16, width: 480 },
  lg: { px: 24, py: 24, radius: 16, layout: 'column', titleSize: 20, descSize: 14, gap: 32, width: 480, height: 233 },
};

const SAMPLE_IMAGE = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80';

export function Card({
  variant = 'outlined',
  size = 'lg',
  title,
  description,
  icon,
  image,
  buttonIcon,
  interactive,
  disabled,
  onPress,
  children,
  fullWidth = false,
  style,
  ...rest
}: CardProps) {
  const v = VARIANT[variant];
  const s = SIZE[size];
  const isRow = s.layout === 'row';
  const imgSrc = variant === 'image' ? (image ?? SAMPLE_IMAGE) : undefined;

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    flexDirection: isRow ? 'row' : 'column',
    alignItems: isRow ? 'center' : 'flex-start',
    gap: s.gap,
    padding: `${s.py}px ${s.px}px`,
    borderRadius: variant === 'doubled' ? 20 : s.radius,
    border: v.border,
    background: v.bg,
    boxShadow: v.shadow,
    opacity: disabled ? 0.48 : 1,
    cursor: (interactive || onPress) && !disabled ? 'pointer' : 'default',
    overflow: variant === 'image' ? 'hidden' : undefined,
    width: fullWidth ? '100%' : s.width ? s.width : undefined,
    height: s.height ?? undefined,
    ...style,
  };

  const content = (
    <>
      {imgSrc && (
        <img src={imgSrc} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
      )}
      {imgSrc && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.30)', zIndex: 1 }} />
      )}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: isRow ? 'row' : 'column', alignItems: isRow ? 'center' : 'flex-start', gap: s.gap, width: '100%' }}>
        {icon && variant === 'doubled' ? (
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: 'var(--sys-color-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--sys-color-on-primary)', fontSize: 20, flexShrink: 0,
          }}>
            {icon}
          </div>
        ) : icon ? (
          <span style={{ display: 'flex', alignItems: 'center', color: v.titleColor, fontSize: 24, flexShrink: 0 }}>{icon}</span>
        ) : null}
        {(title || description) && (
          <div style={{ flex: isRow ? 1 : undefined }}>
            {title && <p style={{ margin: 0, color: v.titleColor, fontSize: s.titleSize, fontWeight: 500 }}>{title}</p>}
            {description && !isRow && <p style={{ margin: '4px 0 0', color: v.descColor, fontSize: s.descSize }}>{description}</p>}
          </div>
        )}
        {isRow && (
          <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={v.titleColor} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 'auto', flexShrink: 0, opacity: 0.5 }}>
            <path d="m9 18 6-6-6-6" />
          </svg>
        )}
        {children}
      </div>
      {buttonIcon && !isRow && (
        <div style={{ position: 'absolute', bottom: s.py, right: s.px, zIndex: 3 }}>
          {buttonIcon}
        </div>
      )}
    </>
  );

  if (interactive || onPress) {
    return (
      <button
        onClick={disabled ? undefined : onPress}
        disabled={disabled}
        style={{ ...containerStyle, all: 'unset', display: 'flex', ...containerStyle }}
      >
        {content}
      </button>
    );
  }

  return (
    <div style={containerStyle} {...rest}>
      {content}
    </div>
  );
}
