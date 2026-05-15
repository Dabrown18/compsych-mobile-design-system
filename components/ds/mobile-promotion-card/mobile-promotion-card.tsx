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

export interface PromotionCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'style'> {
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

const CARD_HEIGHT = 197;
const RING_R = 14;
const RING_C = 2 * Math.PI * RING_R;
const BUTTON_SIZE = 32;

export function PromotionCard({
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
  const t = TOKENS[variant][usage];
  const isImage = usage === 'image';
  const p = Math.max(0, Math.min(1, progress));
  const ringArc = RING_C * p;

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 361,
    height: CARD_HEIGHT,
    borderRadius: 16,
    padding: 16,
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
      {isImage && image && (
        <>
          <img
            src={image}
            alt=""
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
          />
          <div
            style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.12) 50%, rgba(0,0,0,0.4) 100%)', zIndex: 1 }}
          />
        </>
      )}

      {/* Chip */}
      {chipLabel && (
        <div style={{
          position: 'relative', zIndex: 2,
          display: 'inline-flex', alignItems: 'center', gap: 4,
          alignSelf: 'flex-start',
          height: 24, borderRadius: 999,
          paddingLeft: 12, paddingRight: 12,
          backgroundColor: t.chipBg,
        }}>
          {chipIcon && (
            <span style={{ display: 'flex', width: 16, height: 16, alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {chipIcon}
            </span>
          )}
          <span style={{ fontSize: 14, lineHeight: '20px', letterSpacing: '0.07px', color: t.chipTextColor, whiteSpace: 'nowrap' }}>
            {chipLabel}
          </span>
        </div>
      )}

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: 4, maxWidth: '78%' }}>
        {title && (
          <p style={{ margin: 0, fontSize: 20, lineHeight: '28px', color: t.titleColor }}>
            {title}
          </p>
        )}
        {description && (
          <p style={{ margin: 0, fontSize: 14, lineHeight: '20px', color: t.descColor, opacity: t.descOpacity }}>
            {description}
          </p>
        )}
      </div>

      {/* Arrow button */}
      <div style={{ position: 'absolute', bottom: 16, right: 16, width: BUTTON_SIZE, height: BUTTON_SIZE, zIndex: 2 }}>
        <div style={{
          width: BUTTON_SIZE, height: BUTTON_SIZE, borderRadius: '50%',
          backgroundColor: t.buttonBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
        }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={t.buttonIconColor} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </div>
        {showRingTimer && (
          <svg width={BUTTON_SIZE} height={BUTTON_SIZE} style={{ position: 'absolute', inset: 0 }} viewBox={`0 0 ${BUTTON_SIZE} ${BUTTON_SIZE}`}>
            <circle
              cx={BUTTON_SIZE / 2} cy={BUTTON_SIZE / 2} r={RING_R}
              stroke={t.progressColor} strokeWidth={2} fill="none"
              strokeDasharray={`${ringArc} ${RING_C - ringArc}`}
              strokeLinecap="round"
              transform={`rotate(-90 ${BUTTON_SIZE / 2} ${BUTTON_SIZE / 2})`}
            />
          </svg>
        )}
      </div>

      {/* Progress bar */}
      {showProgressBar && (
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, backgroundColor: 'rgba(0,0,0,0.08)', zIndex: 2 }}>
          <div style={{ height: 2, width: `${p * 100}%`, backgroundColor: t.progressColor }} />
        </div>
      )}
    </div>
  );
}
