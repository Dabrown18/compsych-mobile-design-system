'use client';

import { useState } from 'react';

import { ActionSheet } from '../mobile-action-sheet/mobile-action-sheet';

export interface DropdownFieldOption<T extends string | number> {
  value: T;
  label: string;
}

export interface DropdownFieldProps<T extends string | number> {
  options: DropdownFieldOption<T>[];
  value: T | null;
  onSelect: (value: T) => void;
  placeholder: string;
  title: string;
  invalid?: boolean;
}

export function DropdownField<T extends string | number>({
  options,
  value,
  onSelect,
  placeholder,
  title,
  invalid,
}: DropdownFieldProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          borderRadius: 8,
          padding: '14px 16px',
          border: `1px solid ${invalid ? 'var(--sys-color-error)' : 'var(--sys-color-outline)'}`,
          background: 'var(--sys-color-surface-container-lowest)',
          cursor: 'pointer',
        }}
      >
        <span
          style={{
            fontSize: 14,
            color: selectedOption ? 'var(--sys-color-on-surface)' : 'var(--sys-color-on-surface-variant)',
          }}
        >
          {selectedOption?.label ?? placeholder}
        </span>
        <span style={{ fontSize: 14, color: 'var(--sys-color-on-surface-variant)' }}>▾</span>
      </button>
      <ActionSheet
        visible={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {options.map((option) => {
            const isSelected = value === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onSelect(option.value);
                  setIsOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderRadius: 8,
                  padding: '14px 16px',
                  border: `${isSelected ? '1.5px' : '1px'} solid ${isSelected ? 'var(--sys-color-primary)' : 'var(--sys-color-outline)'}`,
                  background: 'var(--sys-color-surface-container-lowest)',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span
                  style={{
                    fontSize: 14,
                    color: isSelected ? 'var(--sys-color-primary)' : 'var(--sys-color-on-surface)',
                  }}
                >
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      </ActionSheet>
    </>
  );
}
