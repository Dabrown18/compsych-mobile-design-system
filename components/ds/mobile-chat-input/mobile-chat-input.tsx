'use client';

import { useEffect, useState, type HTMLAttributes } from 'react';

export type ChatInputSessionStatus = 'active' | 'warning' | 'ended';

export interface ChatInputProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string;
  onChange?: (value: string) => void;
  onSend?: (value: string) => void;
  placeholder?: string;
  isLocked?: boolean;
  isSendDisabled?: boolean;
  isDisabled?: boolean;
  sessionStatus?: ChatInputSessionStatus;
}

export function ChatInput({
  value: controlledValue,
  onChange,
  onSend,
  placeholder = 'Type a message...',
  isLocked = false,
  isSendDisabled = false,
  isDisabled = false,
  sessionStatus = 'active',
  style,
  ...rest
}: ChatInputProps) {
  const [internalValue, setInternalValue] = useState('');
  const value = controlledValue ?? internalValue;
  const isEnded = sessionStatus === 'ended';
  const canSend = !isLocked && !isSendDisabled && !isDisabled && !isEnded && value.trim().length > 0;
  const hasMultipleLines = value.includes('\n') || value.length > 40;
  const borderRadius = hasMultipleLines ? 16 : 999;

  useEffect(() => {
    if (isEnded && value.length > 0) {
      setInternalValue('');
      onChange?.('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEnded]);

  function handleChange(v: string) {
    setInternalValue(v);
    onChange?.(v);
  }

  function handleSend() {
    if (!canSend) return;
    onSend?.(value);
    setInternalValue('');
  }

  const isEditable = !isEnded && !isLocked && !isDisabled;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
        padding: '2px 12px',
        backgroundColor: 'var(--sys-color-surface-container-lowest, #fff)',
        boxSizing: 'border-box',
        width: '100%',
        ...style,
      }}
      {...rest}
    >
      <textarea
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        placeholder={placeholder}
        disabled={!isEditable}
        rows={1}
        style={{
          flex: 1,
          minHeight: 48,
          maxHeight: 96,
          border: '1px solid var(--sys-color-outline-variant, #d7dbe0)',
          borderRadius,
          backgroundColor: isEnded
            ? 'var(--sys-color-surface, #f3f4f6)'
            : 'var(--sys-color-surface-container-lowest, #fff)',
          outline: 'none',
          fontSize: 16,
          lineHeight: '20px',
          color: 'var(--sys-color-on-surface, #1b1d22)',
          fontFamily: "'GoogleSans_400Regular', sans-serif",
          padding: hasMultipleLines ? '12px' : '14px 16px',
          minWidth: 0,
          resize: 'none',
          opacity: isEnded ? 0.6 : 1,
          cursor: isEditable ? 'text' : 'not-allowed',
          boxSizing: 'border-box',
        }}
      />

      <button
        type="button"
        onClick={handleSend}
        disabled={!canSend}
        aria-label="Send"
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          border: 'none',
          background: canSend
            ? 'var(--sys-color-warning, #d67d00)'
            : 'var(--sys-color-surface-container-highest, #e6e8ea)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: canSend ? 'pointer' : 'not-allowed',
          flexShrink: 0,
          padding: 0,
          opacity: canSend ? 1 : 0.3,
          transition: 'background 150ms ease',
        }}
      >
        <svg
          viewBox="0 0 24 24"
          width={20}
          height={20}
          fill="none"
          stroke={canSend ? 'var(--sys-color-on-warning, #ffffff)' : 'var(--sys-color-on-surface-variant, #565f6c)'}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
}
