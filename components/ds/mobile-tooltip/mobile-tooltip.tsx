'use client';

import type { HTMLAttributes } from 'react';

export type TooltipVariant = 'filled' | 'elevated';
export type TooltipDirection = 'none' | 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  variant?: TooltipVariant;
  direction?: TooltipDirection;
}

const ARROW_SIZE = 8;

function arrowStyle(direction: TooltipDirection, bg: string, border?: string): React.CSSProperties {
  const base: React.CSSProperties = {
    position: 'absolute',
    width: 0,
    height: 0,
  };
  switch (direction) {
    case 'top':    return { ...base, bottom: -ARROW_SIZE, left: '50%', transform: 'translateX(-50%)', borderLeft: `${ARROW_SIZE}px solid transparent`, borderRight: `${ARROW_SIZE}px solid transparent`, borderTop: `${ARROW_SIZE}px solid ${bg}` };
    case 'bottom': return { ...base, top: -ARROW_SIZE, left: '50%', transform: 'translateX(-50%)', borderLeft: `${ARROW_SIZE}px solid transparent`, borderRight: `${ARROW_SIZE}px solid transparent`, borderBottom: `${ARROW_SIZE}px solid ${bg}` };
    case 'left':   return { ...base, right: -ARROW_SIZE, top: '50%', transform: 'translateY(-50%)', borderTop: `${ARROW_SIZE}px solid transparent`, borderBottom: `${ARROW_SIZE}px solid transparent`, borderLeft: `${ARROW_SIZE}px solid ${bg}` };
    case 'right':  return { ...base, left: -ARROW_SIZE, top: '50%', transform: 'translateY(-50%)', borderTop: `${ARROW_SIZE}px solid transparent`, borderBottom: `${ARROW_SIZE}px solid transparent`, borderRight: `${ARROW_SIZE}px solid ${bg}` };
    default:       return {};
  }
}

export function Tooltip({ text, variant = 'filled', direction = 'none', style, ...rest }: TooltipProps) {
  const isFilled = variant === 'filled';
  const bg = isFilled ? 'var(--sys-color-inverse-surface)' : 'var(--sys-color-surface-container-lowest)';
  const color = isFilled ? 'var(--sys-color-inverse-on-surface)' : 'var(--sys-color-on-surface)';

  return (
    <div
      role="tooltip"
      style={{
        position: 'relative',
        display: 'inline-block',
        padding: '8px 12px',
        borderRadius: 8,
        background: bg,
        color,
        fontSize: 13,
        lineHeight: 1.4,
        border: isFilled ? 'none' : '1px solid var(--sys-color-outline-variant)',
        boxShadow: isFilled ? undefined : '0 2px 12px rgba(0,0,0,.10)',
        maxWidth: 240,
        ...style,
      }}
      {...rest}
    >
      {text}
      {direction !== 'none' && (
        <span style={arrowStyle(direction, bg)} aria-hidden="true" />
      )}
    </div>
  );
}
