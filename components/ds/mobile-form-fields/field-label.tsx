'use client';

export interface FieldLabelProps {
  label: string;
  required?: boolean;
}

export function FieldLabel({ label, required }: FieldLabelProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--sys-color-on-surface)' }}>
        {label}
      </span>
      {required && (
        <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--sys-color-error)' }}>*</span>
      )}
    </div>
  );
}
