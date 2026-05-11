'use client';

import { useState, type HTMLAttributes } from 'react';

export interface SwitchProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'onChange' | 'defaultValue'> {
  value?: boolean;
  defaultValue?: boolean;
  onValueChange?: (value: boolean) => void;
  disabled?: boolean;
  accessibilityLabel?: string;
}

const TRACK_W = 56;
const TRACK_H = 32;
const THUMB = 24;
const PAD = 4;
const THUMB_OFF = PAD;
const THUMB_ON = TRACK_W - PAD - THUMB;

export function Switch({
  value: valueProp,
  defaultValue = false,
  onValueChange,
  disabled = false,
  accessibilityLabel,
  style,
  ...rest
}: SwitchProps) {
  const [internal, setInternal] = useState(defaultValue);
  const isControlled = valueProp !== undefined;
  const toggled = isControlled ? valueProp! : internal;

  function handlePress() {
    if (disabled) return;
    const next = !toggled;
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={toggled}
      aria-label={accessibilityLabel}
      disabled={disabled}
      onClick={handlePress}
      style={{
        position: 'relative',
        width: TRACK_W,
        height: TRACK_H,
        borderRadius: TRACK_H / 2,
        border: 'none',
        background: toggled
          ? 'var(--sys-color-primary)'
          : 'var(--sys-color-surface-container-highest)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        padding: 0,
        opacity: disabled ? 0.48 : 1,
        transition: 'background .2s',
        flexShrink: 0,
        ...style,
      }}
      {...rest}
    >
      {/* Thumb */}
      <span style={{
        position: 'absolute',
        top: PAD,
        left: toggled ? THUMB_ON : THUMB_OFF,
        width: THUMB,
        height: THUMB,
        borderRadius: '50%',
        background: toggled
          ? 'var(--sys-color-on-primary)'
          : 'var(--sys-color-surface)',
        boxShadow: '0 2px 4px rgba(0,0,0,.15)',
        transition: 'left .2s, background .2s',
        display: 'block',
      }} />
    </button>
  );
}
