'use client';

import type { HTMLAttributes } from 'react';

export interface SegmentedControlOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export interface SegmentedControlProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: SegmentedControlOption[];
  value: string;
  onChange: (value: string) => void;
  fullWidth?: boolean;
}

export function SegmentedControl({ options, value, onChange, fullWidth = false, style, ...rest }: SegmentedControlProps) {
  return (
    <div
      role="tablist"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: 4,
        borderRadius: 10,
        background: 'var(--sys-color-surface-container-high)',
        width: fullWidth ? '100%' : undefined,
        ...style,
      }}
      {...rest}
    >
      {options.map((opt) => {
        const isActive = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(opt.value)}
            style={{
              flex: fullWidth ? 1 : undefined,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              height: 36,
              paddingInline: 16,
              borderRadius: 8,
              border: 'none',
              background: isActive ? 'var(--sys-color-surface-container-lowest)' : 'transparent',
              color: isActive ? 'var(--sys-color-on-surface)' : 'var(--sys-color-on-surface-variant)',
              fontSize: 14,
              fontWeight: isActive ? 600 : 400,
              cursor: 'pointer',
              boxShadow: isActive ? '0 1px 4px rgba(0,0,0,.10)' : undefined,
              transition: 'background .15s, color .15s',
            }}
          >
            {opt.icon && <span style={{ display: 'flex', alignItems: 'center', fontSize: 16 }}>{opt.icon}</span>}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
