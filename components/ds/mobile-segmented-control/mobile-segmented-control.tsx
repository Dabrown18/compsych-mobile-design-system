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
}

export function SegmentedControl({ options, value, onChange, style, ...rest }: SegmentedControlProps) {
  return (
    <div
      role="tablist"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        width: '100%',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        paddingBlock: 2,
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
              flexShrink: 0,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              height: 36,
              paddingInline: 16,
              borderRadius: 999,
              border: 'none',
              background: isActive
                ? 'var(--sys-color-primary)'
                : 'var(--sys-color-surface-container-high)',
              color: isActive ? 'var(--sys-color-on-primary)' : 'var(--sys-color-on-surface-variant)',
              fontSize: 14,
              fontWeight: isActive ? 600 : 400,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
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
