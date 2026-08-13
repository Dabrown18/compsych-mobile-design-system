'use client';

import { useState } from 'react';

import { Input } from '../mobile-input/mobile-input';

function validateEmail(emailAddress: string): boolean {
  return /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/.test(emailAddress.trim());
}

export interface EmailFieldProps {
  label?: string;
  required?: boolean;
  value: string;
  onChangeText: (value: string) => void;
  onValidChange?: (valid: boolean) => void;
  placeholder?: string;
  invalidEmailMessage: string;
}

export function EmailField({
  label,
  required,
  value,
  onChangeText,
  onValidChange,
  placeholder,
  invalidEmailMessage,
}: EmailFieldProps) {
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleChange = (v: string) => {
    onChangeText(v);
    if (emailError !== null && (v.trim().length === 0 || validateEmail(v))) {
      setEmailError(null);
      onValidChange?.(true);
    }
  };

  const handleBlur = () => {
    if (value.trim().length > 0 && !validateEmail(value)) {
      setEmailError(invalidEmailMessage);
      onValidChange?.(false);
    } else {
      setEmailError(null);
      onValidChange?.(true);
    }
  };

  return (
    <Input
      label={required && label ? `${label} *` : label}
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      onBlur={handleBlur}
      invalid={emailError !== null}
      errorText={emailError ?? undefined}
      type="email"
      placeholder={placeholder}
    />
  );
}
