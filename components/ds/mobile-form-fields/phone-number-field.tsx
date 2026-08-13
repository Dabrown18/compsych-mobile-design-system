'use client';

import { Input } from '../mobile-input/mobile-input';

function formatPhoneNumberUS(text: string): string {
  const cleaned = text.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
  if (match) {
    const parts = [match[1], match[2], match[3]].filter(Boolean);
    return parts.join('-');
  }
  return text;
}

export interface PhoneNumberFieldProps {
  label: string;
  required?: boolean;
  value: string;
  onChangeText: (formatted: string) => void;
  placeholder?: string;
}

export function PhoneNumberField({ label, required, value, onChangeText, placeholder }: PhoneNumberFieldProps) {
  return (
    <Input
      label={required ? `${label} *` : label}
      value={value}
      onChange={(e) => onChangeText(formatPhoneNumberUS(e.target.value))}
      type="tel"
      maxLength={12}
      placeholder={placeholder}
    />
  );
}
