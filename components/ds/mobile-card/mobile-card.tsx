'use client';

import type { HTMLAttributes, ReactNode } from 'react';
import { resolveIcon, SIZE_MAP, type IconName, type IconSize } from '../mobile-icon/mobile-icon';

export type ServiceCardVariant = 'outlined' | 'tonal' | 'filled' | 'doubled' | 'image';
export type ServiceCardSize = 'sm' | 'md' | 'lg';

export interface ServiceCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: ServiceCardVariant;
  size?: ServiceCardSize;
  title?: string;
  description?: string;
  icon?: IconName;
  image?: string;
  buttonIcon?: ReactNode;
  interactive?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  children?: ReactNode;
  fullWidth?: boolean;
}

const VARIANT: Record<ServiceCardVariant, {
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
    bg: 'var(--sys-color-primary-container)',
    titleColor: 'var(--sys-color-on-primary)',
    descColor: 'var(--sys-color-transparent-white-80)',
  },
  doubled: {
    bg: 'var(--sys-color-surface-container-lowest)',
    border: '1px solid var(--sys-color-outline)',
    titleColor: 'var(--sys-color-on-surface)',
    descColor: 'var(--sys-color-on-surface-variant)',
  },
  image: {
    bg: 'transparent',
    titleColor: 'var(--sys-color-inverse-on-surface)',
    descColor: 'var(--sys-color-transparent-white-80)',
  },
};

const SIZE: Record<ServiceCardSize, { px: number; py: number; radius: number; layout: 'row' | 'column'; titleSize: number; descSize: number; gap: number; width?: number; height?: number }> = {
  sm: { px: 16, py: 12, radius: 12, layout: 'row',    titleSize: 16, descSize: 14, gap: 12, width: 480 },
  md: { px: 16, py: 16, radius: 16, layout: 'column', titleSize: 16, descSize: 14, gap: 24, width: 480 },
  lg: { px: 16, py: 16, radius: 16, layout: 'column', titleSize: 20, descSize: 14, gap: 32, width: 480 },
};

const CARD_TO_ICON_SIZE: Record<ServiceCardSize, IconSize> = { sm: 'small', md: 'medium', lg: 'large' };

const SAMPLE_IMAGE = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80';

export function ServiceCard({
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
}: ServiceCardProps) {
  const v = VARIANT[variant];
  const s = SIZE[size];
  const isRow = s.layout === 'row';
  const imgSrc = variant === 'image' ? (image ?? SAMPLE_IMAGE) : undefined;

  const LucideIcon = icon ? resolveIcon(icon) : null;
  const ChevronRight = resolveIcon('ChevronRight');
  const iconColor = variant === 'doubled' ? 'var(--sys-color-on-primary)' : v.titleColor;
  const { px: iconPx, strokeWidth: iconSW } = SIZE_MAP[CARD_TO_ICON_SIZE[size]];
  const renderedIcon = LucideIcon
    ? <LucideIcon size={iconPx} color={iconColor} strokeWidth={iconSW} />
    : null;

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
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.12) 40%, rgba(0,0,0,0.12) 60%, rgba(0,0,0,0.4) 100%)', zIndex: 1 }} />
      )}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: isRow ? 'row' : 'column', alignItems: isRow ? 'center' : 'flex-start', gap: s.gap, width: '100%' }}>
        {renderedIcon && variant === 'doubled' ? (
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: 'var(--sys-color-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            {renderedIcon}
          </div>
        ) : renderedIcon ? (
          <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{renderedIcon}</span>
        ) : null}
        {(title || description) && (
          <div style={{ flex: isRow ? 1 : undefined }}>
            {title && <p style={{ margin: 0, color: v.titleColor, fontSize: s.titleSize, fontWeight: 500 }}>{title}</p>}
            {description && !isRow && <p style={{ margin: '4px 0 0', color: v.descColor, fontSize: s.descSize }}>{description}</p>}
          </div>
        )}
        {isRow && ChevronRight && (
          <ChevronRight size={20} color={variant === 'image' ? '#ffffff' : v.titleColor} strokeWidth={1.5} style={{ marginLeft: 'auto', flexShrink: 0, opacity: 0.5 }} />
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
