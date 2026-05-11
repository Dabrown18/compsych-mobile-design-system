'use client';

import { useState, type HTMLAttributes } from 'react';

export type RadioButtonSize = 'sm' | 'md';

export interface RadioButtonProps extends Omit<HTMLAttributes<HTMLLabelElement>, 'onChange'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: RadioButtonSize;
  label?: string;
  description?: string;
  disabled?: boolean;
  invalid?: boolean;
}

const SIZE: Record<RadioButtonSize, { ring: number; dot: number; fontSize: number; descSize: number }> = {
  sm: { ring: 18, dot: 8,  fontSize: 13, descSize: 12 },
  md: { ring: 22, dot: 10, fontSize: 15, descSize: 13 },
};

export function RadioButton({
  checked: checkedProp,
  defaultChecked = false,
  onChange,
  size = 'md',
  label,
  description,
  disabled = false,
  invalid = false,
  style,
  ...rest
}: RadioButtonProps) {
  const [internal, setInternal] = useState(defaultChecked);
  const isControlled = checkedProp !== undefined;
  const checked = isControlled ? checkedProp : internal;
  const s = SIZE[size];

  function handleChange() {
    if (disabled || checked) return;
    if (!isControlled) setInternal(true);
    onChange?.(true);
  }

  const ringColor = invalid
    ? 'var(--sys-color-error)'
    : checked
    ? 'var(--sys-color-primary)'
    : 'var(--sys-color-outline)';

  return (
    <label
      onClick={handleChange}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.48 : 1,
        userSelect: 'none',
        ...style,
      }}
      {...rest}
    >
      {/* Ring */}
      <span style={{
        flexShrink: 0,
        width: s.ring,
        height: s.ring,
        borderRadius: '50%',
        border: `2px solid ${ringColor}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
        transition: 'border-color .15s',
      }}>
        {checked && (
          <span style={{
            width: s.dot,
            height: s.dot,
            borderRadius: '50%',
            background: 'var(--sys-color-primary)',
            display: 'block',
          }} />
        )}
      </span>

      {(label || description) && (
        <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {label && <span style={{ fontSize: s.fontSize, color: 'var(--sys-color-on-surface)', lineHeight: 1.4 }}>{label}</span>}
          {description && <span style={{ fontSize: s.descSize, color: 'var(--sys-color-on-surface-variant)', lineHeight: 1.4 }}>{description}</span>}
        </span>
      )}
    </label>
  );
}
