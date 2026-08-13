'use client';

export interface CheckboxFieldProps {
  checked: boolean;
  onPress: () => void;
  label: string;
  required?: boolean;
  invalid?: boolean;
}

export function CheckboxField({ checked, onPress, label, required, invalid }: CheckboxFieldProps) {
  return (
    <button
      type="button"
      onClick={onPress}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        alignSelf: 'stretch',
        width: '100%',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        padding: 0,
        textAlign: 'left',
      }}
    >
      <span
        style={{
          width: 20,
          height: 20,
          borderRadius: 4,
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor: invalid
            ? 'var(--sys-color-error)'
            : checked
              ? 'var(--sys-color-primary)'
              : 'var(--sys-color-outline)',
          background: checked ? 'var(--sys-color-primary)' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {checked && <span style={{ color: '#fff', fontSize: 12 }}>✓</span>}
      </span>
      <span style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--sys-color-on-surface)' }}>
          {label}
        </span>
        {required && (
          <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--sys-color-error)' }}>*</span>
        )}
      </span>
    </button>
  );
}
