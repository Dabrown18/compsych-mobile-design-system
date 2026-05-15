'use client';

import type { HTMLAttributes, ReactNode } from 'react';

export type PromotionCardVariant = 'filled' | 'tonal';
export type PromotionCardUsage =
  | 'neutral'
  | 'informative'
  | 'positive'
  | 'danger'
  | 'warning'
  | 'image';
export type PromotionCardSize = 'md' | 'lg';

export interface PromotionCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'style'> {
  size?: PromotionCardSize;
  variant?: PromotionCardVariant;
  usage?: PromotionCardUsage;
  title?: string;
  description?: string;
  chipLabel?: string;
  chipIcon?: ReactNode;
  image?: string;
  progress?: number;
  showProgressBar?: boolean;
  showRingTimer?: boolean;
  onPress?: () => void;
  style?: React.CSSProperties;
}

type VariantTokens = {
  cardBg: string;
  chipBg: string;
  chipTextColor: string;
  titleColor: string;
  descColor: string;
  descOpacity: number;
  buttonBg: string;
  buttonIconColor: string;
  progressColor: string;
};

const TOKENS: Record<PromotionCardVariant, Record<PromotionCardUsage, VariantTokens>> = {
  filled: {
    neutral: {
      cardBg: 'var(--sys-color-surface-container-lowest)',
      chipBg: 'var(--sys-color-surface-container-highest)',
      chipTextColor: 'var(--sys-color-on-surface)',
      titleColor: '#0f0f0f',
      descColor: 'var(--sys-color-on-surface-variant)',
      descOpacity: 1,
      buttonBg: 'var(--sys-color-primary-fixed-dim)',
      buttonIconColor: 'var(--sys-color-on-primary-fixed)',
      progressColor: 'var(--sys-color-primary)',
    },
    informative: {
      cardBg: 'var(--sys-color-on-info-container)',
      chipBg: 'var(--sys-color-info-container)',
      chipTextColor: 'var(--sys-color-on-info-container)',
      titleColor: 'var(--sys-color-on-info)',
      descColor: 'rgba(255,255,255,0.8)',
      descOpacity: 1,
      buttonBg: 'var(--sys-color-on-info)',
      buttonIconColor: 'var(--sys-color-on-info-container)',
      progressColor: 'var(--sys-color-on-info)',
    },
    positive: {
      cardBg: 'var(--sys-color-on-success-container)',
      chipBg: 'var(--sys-color-success-container)',
      chipTextColor: 'var(--sys-color-on-success-container)',
      titleColor: 'var(--sys-color-on-success)',
      descColor: 'rgba(255,255,255,0.8)',
      descOpacity: 1,
      buttonBg: 'var(--sys-color-on-success)',
      buttonIconColor: 'var(--sys-color-on-success-container)',
      progressColor: 'var(--sys-color-on-success)',
    },
    danger: {
      cardBg: 'var(--sys-color-on-error-container)',
      chipBg: 'var(--sys-color-error-container)',
      chipTextColor: 'var(--sys-color-on-error-container)',
      titleColor: 'var(--sys-color-on-error)',
      descColor: 'rgba(255,255,255,0.8)',
      descOpacity: 1,
      buttonBg: 'var(--sys-color-on-error)',
      buttonIconColor: 'var(--sys-color-on-error-container)',
      progressColor: 'var(--sys-color-on-error)',
    },
    warning: {
      cardBg: 'var(--sys-color-on-warning-container)',
      chipBg: 'var(--sys-color-warning-container)',
      chipTextColor: 'var(--sys-color-on-warning-container)',
      titleColor: 'var(--sys-color-on-warning)',
      descColor: 'rgba(255,255,255,0.8)',
      descOpacity: 1,
      buttonBg: 'var(--sys-color-on-warning)',
      buttonIconColor: 'var(--sys-color-on-warning-container)',
      progressColor: 'var(--sys-color-on-warning)',
    },
    image: {
      cardBg: 'transparent',
      chipBg: 'rgba(255,255,255,0.2)',
      chipTextColor: '#ffffff',
      titleColor: '#ffffff',
      descColor: 'rgba(255,255,255,0.8)',
      descOpacity: 1,
      buttonBg: '#ffffff',
      buttonIconColor: '#1b1d22',
      progressColor: '#ffffff',
    },
  },
  tonal: {
    neutral: {
      cardBg: 'var(--sys-color-surface-container-lowest)',
      chipBg: 'var(--sys-color-surface-container-highest)',
      chipTextColor: 'var(--sys-color-on-surface)',
      titleColor: '#0f0f0f',
      descColor: 'var(--sys-color-on-surface-variant)',
      descOpacity: 1,
      buttonBg: 'var(--sys-color-primary-fixed-dim)',
      buttonIconColor: 'var(--sys-color-on-primary-fixed)',
      progressColor: 'var(--sys-color-primary)',
    },
    informative: {
      cardBg: 'var(--sys-color-info-container)',
      chipBg: 'var(--sys-color-on-info)',
      chipTextColor: 'var(--sys-color-on-info-container)',
      titleColor: 'var(--sys-color-on-info-container)',
      descColor: 'var(--sys-color-on-info-container)',
      descOpacity: 0.64,
      buttonBg: 'var(--sys-color-info)',
      buttonIconColor: 'var(--sys-color-on-info)',
      progressColor: 'var(--sys-color-info)',
    },
    positive: {
      cardBg: 'var(--sys-color-success-container)',
      chipBg: 'var(--sys-color-on-success)',
      chipTextColor: 'var(--sys-color-on-success-container)',
      titleColor: 'var(--sys-color-on-success-container)',
      descColor: 'var(--sys-color-on-success-container)',
      descOpacity: 0.64,
      buttonBg: 'var(--sys-color-success)',
      buttonIconColor: 'var(--sys-color-on-success)',
      progressColor: 'var(--sys-color-success)',
    },
    danger: {
      cardBg: 'var(--sys-color-error-container)',
      chipBg: 'var(--sys-color-on-error)',
      chipTextColor: 'var(--sys-color-on-error-container)',
      titleColor: 'var(--sys-color-on-error-container)',
      descColor: 'var(--sys-color-on-error-container)',
      descOpacity: 0.64,
      buttonBg: 'var(--sys-color-error)',
      buttonIconColor: 'var(--sys-color-on-error)',
      progressColor: 'var(--sys-color-error)',
    },
    warning: {
      cardBg: 'var(--sys-color-warning-container)',
      chipBg: 'var(--sys-color-on-warning)',
      chipTextColor: 'var(--sys-color-on-warning-container)',
      titleColor: 'var(--sys-color-on-warning-container)',
      descColor: 'var(--sys-color-on-warning-container)',
      descOpacity: 0.64,
      buttonBg: 'var(--sys-color-warning)',
      buttonIconColor: 'var(--sys-color-on-warning)',
      progressColor: 'var(--sys-color-warning)',
    },
    image: {
      cardBg: 'transparent',
      chipBg: 'rgba(255,255,255,0.2)',
      chipTextColor: '#ffffff',
      titleColor: '#ffffff',
      descColor: 'rgba(255,255,255,0.8)',
      descOpacity: 1,
      buttonBg: '#ffffff',
      buttonIconColor: '#1b1d22',
      progressColor: '#ffffff',
    },
  },
};

function getLgTokens(usage: PromotionCardUsage): VariantTokens {
  if (usage === 'neutral') return TOKENS.filled.neutral;
  return TOKENS.tonal[usage];
}

const MD_HEIGHT = 197;
const LG_HEIGHT = 363;
const MD_WIDTH = 361;
const LG_WIDTH = 424;
const MD_BUTTON = 32;
const LG_BUTTON = 48;
const MD_RING_R = 14;
const LG_RING_R = 21;
const MD_RING_C = 2 * Math.PI * MD_RING_R;
const LG_RING_C = 2 * Math.PI * LG_RING_R;
const LG_DOT_SIZE = 6;
const LG_DOT_GAP = 4;
const LG_DOT_COUNT = 5;

export function PromotionCard({
  size = 'md',
  variant = 'filled',
  usage = 'neutral',
  title,
  description,
  chipLabel,
  chipIcon,
  image,
  progress = 0.25,
  showProgressBar = true,
  showRingTimer = true,
  onPress,
  style,
  ...rest
}: PromotionCardProps) {
  const isLg = size === 'lg';
  const t = isLg ? getLgTokens(usage) : TOKENS[variant][usage];
  const isImage = usage === 'image';
  const p = Math.max(0, Math.min(1, progress));

  const buttonSize = isLg ? LG_BUTTON : MD_BUTTON;
  const ringR = isLg ? LG_RING_R : MD_RING_R;
  const ringC = isLg ? LG_RING_C : MD_RING_C;
  const ringArc = ringC * p;
  const borderRadius = isLg ? 24 : 16;
  const padding = isLg ? 32 : 16;

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    ...(isLg ? { gap: 24 } : { justifyContent: 'space-between' }),
    width: isLg ? LG_WIDTH : MD_WIDTH,
    height: isLg ? LG_HEIGHT : MD_HEIGHT,
    borderRadius,
    padding,
    overflow: 'hidden',
    backgroundColor: t.cardBg,
    cursor: onPress ? 'pointer' : 'default',
    ...style,
  };

  return (
    <div
      style={containerStyle}
      onClick={onPress}
      role={onPress ? 'button' : undefined}
      tabIndex={onPress ? 0 : undefined}
      {...rest}
    >
      {isImage && (
        <>
          {image ? (
            <img
              src={image}
              alt=""
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
            />
          ) : (
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #1b2a3b 0%, #2d4a6e 50%, #1a3a5c 100%)', zIndex: 0 }} />
          )}
          <div
            style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.12) 50%, rgba(0,0,0,0.4) 100%)', zIndex: 1 }}
          />
        </>
      )}

      {/* Chip */}
      {chipLabel && (
        <div style={{
          position: 'relative', zIndex: 2,
          display: 'inline-flex', alignItems: 'center', gap: isLg ? 8 : 4,
          alignSelf: 'flex-start',
          height: isLg ? 32 : 24, borderRadius: 999,
          paddingLeft: isLg ? 16 : 12, paddingRight: isLg ? 16 : 12,
          backgroundColor: t.chipBg,
        }}>
          {chipIcon && (
            <span style={{ display: 'flex', width: isLg ? 20 : 16, height: isLg ? 20 : 16, alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {chipIcon}
            </span>
          )}
          <span style={{ fontSize: 14, lineHeight: '20px', letterSpacing: '0.07px', color: t.chipTextColor, whiteSpace: 'nowrap' }}>
            {chipLabel}
          </span>
        </div>
      )}

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        display: 'flex', flexDirection: 'column', gap: isLg ? 8 : 4,
        ...(isLg ? { flex: 1 } : { maxWidth: '78%' }),
      }}>
        {title && (
          <p style={{ margin: 0, fontSize: isLg ? 28 : 20, lineHeight: isLg ? '36px' : '28px', color: t.titleColor }}>
            {title}
          </p>
        )}
        {description && (
          <p style={{ margin: 0, fontSize: isLg ? 16 : 14, lineHeight: isLg ? '24px' : '20px', color: t.descColor, opacity: t.descOpacity }}>
            {description}
          </p>
        )}
      </div>

      {/* Arrow button */}
      <div style={{ position: 'absolute', bottom: padding, right: padding, width: buttonSize, height: buttonSize, zIndex: 2 }}>
        <div style={{
          width: buttonSize, height: buttonSize, borderRadius: '50%',
          backgroundColor: t.buttonBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
        }}>
          <svg width={isLg ? 24 : 16} height={isLg ? 24 : 16} viewBox="0 0 24 24" fill="none" stroke={t.buttonIconColor} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </div>
        {showRingTimer && (
          <svg width={buttonSize} height={buttonSize} style={{ position: 'absolute', inset: 0 }} viewBox={`0 0 ${buttonSize} ${buttonSize}`}>
            <circle
              cx={buttonSize / 2} cy={buttonSize / 2} r={ringR}
              stroke={t.progressColor} strokeWidth={2} fill="none"
              strokeDasharray={`${ringArc} ${ringC - ringArc}`}
              strokeLinecap="round"
              transform={`rotate(-90 ${buttonSize / 2} ${buttonSize / 2})`}
            />
          </svg>
        )}
      </div>

      {/* Pagination dots (lg only) */}
      {isLg && (
        <div style={{
          position: 'absolute',
          bottom: 53,
          left: padding,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: LG_DOT_GAP,
          zIndex: 2,
        }}>
          {Array.from({ length: LG_DOT_COUNT }).map((_, i) => (
            <div
              key={i}
              style={{
                width: LG_DOT_SIZE,
                height: LG_DOT_SIZE,
                borderRadius: '50%',
                backgroundColor: i === 0 ? t.progressColor : 'transparent',
                border: i === 0 ? 'none' : `1.5px solid ${t.progressColor}`,
                opacity: i === 0 ? 1 : 0.4,
              }}
            />
          ))}
        </div>
      )}

      {/* Progress bar */}
      {showProgressBar && (
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: isLg ? 4 : 2, backgroundColor: 'rgba(0,0,0,0.08)', zIndex: 2 }}>
          <div style={{ height: isLg ? 4 : 2, width: `${p * 100}%`, backgroundColor: t.progressColor }} />
        </div>
      )}
    </div>
  );
}
