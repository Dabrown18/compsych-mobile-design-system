'use client';

import { useState, type HTMLAttributes } from 'react';

export type CheckboxSize = 'sm' | 'md';
export type CheckboxCheckedState = boolean | 'indeterminate';

export interface CheckboxProps extends Omit<HTMLAttributes<HTMLLabelElement>, 'onChange'> {
  checked?: CheckboxCheckedState;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: CheckboxSize;
  label?: string;
  description?: string;
  disabled?: boolean;
  invalid?: boolean;
}

const SIZE: Record<CheckboxSize, { box: number; fontSize: number; descSize: number }> = {
  sm: { box: 20, fontSize: 13, descSize: 12 },
  md: { box: 24, fontSize: 15, descSize: 13 },
};

export function Checkbox({
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
}: CheckboxProps) {
  const [internal, setInternal] = useState<CheckboxCheckedState>(defaultChecked);
  const isControlled = checkedProp !== undefined;
  const checked = isControlled ? checkedProp : internal;
  const s = SIZE[size];

  const isChecked = checked === true;
  const isIndeterminate = checked === 'indeterminate';

  function handleChange() {
    if (disabled) return;
    const next = !isChecked;
    if (!isControlled) setInternal(next);
    onChange?.(next);
  }

  const borderColor = invalid
    ? 'var(--sys-color-error)'
    : isChecked || isIndeterminate
    ? 'var(--sys-color-primary)'
    : 'var(--sys-color-outline)';

  const bgColor = isChecked || isIndeterminate
    ? 'var(--sys-color-primary)'
    : 'transparent';

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
      {/* Box */}
      <span style={{
        flexShrink: 0,
        width: s.box,
        height: s.box,
        borderRadius: 4,
        border: `2px solid ${borderColor}`,
        background: bgColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
        transition: 'background .15s, border-color .15s',
      }}>
        {isChecked && (
          <svg width={s.box * 0.65} height={s.box * 0.65} viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="var(--sys-color-on-primary)" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {isIndeterminate && (
          <span style={{ width: s.box * 0.5, height: 2, background: 'var(--sys-color-on-primary)', borderRadius: 1, display: 'block' }} />
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
