'use client';

export interface RadioOption<T extends string> {
  value: T;
  label: string;
}

export interface RadioGroupProps<T extends string> {
  options: RadioOption<T>[];
  selected: T | null;
  onSelect: (value: T) => void;
  invalid?: boolean;
  variant?: 'grouped' | 'cards';
}

function RadioCircle({ isSelected }: { isSelected: boolean }) {
  return (
    <span
      style={{
        width: 20,
        height: 20,
        borderRadius: '50%',
        border: `1.5px solid ${isSelected ? 'var(--sys-color-primary)' : 'var(--sys-color-outline-variant)'}`,
        background: isSelected ? 'var(--sys-color-primary)' : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {isSelected && (
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'var(--sys-color-surface-container-lowest)',
          }}
        />
      )}
    </span>
  );
}

export function RadioGroup<T extends string>({ options, selected, onSelect, invalid, variant = 'grouped' }: RadioGroupProps<T>) {
  if (variant === 'cards') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {options.map((option) => {
          const isSelected = selected === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: 12,
                width: '100%',
                borderRadius: 8,
                border: `${isSelected ? 1.5 : 1}px solid ${
                  isSelected ? 'var(--sys-color-primary)' : invalid ? 'var(--sys-color-error)' : 'var(--sys-color-outline)'
                }`,
                background: 'transparent',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <RadioCircle isSelected={isSelected} />
              <span style={{ fontSize: 14, color: 'var(--sys-color-on-surface)' }}>{option.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      style={{
        border: `1px solid ${invalid ? 'var(--sys-color-error)' : 'var(--sys-color-outline)'}`,
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      {options.map((option, index) => {
        const isSelected = selected === option.value;
        const isLast = index === options.length - 1;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: 12,
              width: '100%',
              border: 'none',
              borderBottom: isSelected || isLast ? 'none' : '1px solid var(--sys-color-outline)',
              borderRadius: isSelected ? 4 : 0,
              boxShadow: isSelected ? 'inset 0 0 0 1.5px var(--sys-color-primary)' : 'none',
              background: 'transparent',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <RadioCircle isSelected={isSelected} />
            <span style={{ fontSize: 14, color: 'var(--sys-color-on-surface)' }}>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
