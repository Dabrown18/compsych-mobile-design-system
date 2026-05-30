'use client';

import { useRef, useState, type HTMLAttributes } from 'react';

export interface ChatInputProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string;
  onChange?: (value: string) => void;
  onSend?: (value: string) => void;
  placeholder?: string;
  showAttachButton?: boolean;
  disabled?: boolean;
}

export function ChatInput({
  value: controlledValue,
  onChange,
  onSend,
  placeholder = 'Ask Sol Anything...',
  showAttachButton = true,
  disabled = false,
  style,
  ...rest
}: ChatInputProps) {
  const [internalValue, setInternalValue] = useState('');
  const [textareaHeight, setTextareaHeight] = useState(24);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const value = controlledValue ?? internalValue;
  const hasText = value.trim().length > 0;
  const canSend = hasText && !disabled;

  function handleChange(v: string) {
    setInternalValue(v);
    onChange?.(v);
  }

  function handleSend() {
    if (!canSend) return;
    onSend?.(value);
    setInternalValue('');
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 8,
        padding: '8px 12px',
        borderRadius: 16,
        border: '1px solid var(--sys-color-outline-variant, #d7dbe0)',
        backgroundColor: 'var(--sys-color-surface-container-lowest, #fff)',
        opacity: disabled ? 0.48 : 1,
        boxSizing: 'border-box',
        width: '100%',
        ...style,
      }}
      {...rest}
    >
      {showAttachButton && (
        <button
          type="button"
          aria-label="Add attachment"
          disabled={disabled}
          style={{
            width: 32,
            height: 32,
            borderRadius: 9999,
            background: 'none',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: disabled ? 'not-allowed' : 'pointer',
            flexShrink: 0,
            padding: 0,
            color: 'var(--sys-color-on-surface, #1b1d22)',
          }}
        >
          <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      )}

      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => {
          handleChange(e.target.value);
          e.target.style.height = 'auto';
          const natural = Math.max(24, Math.min(120, e.target.scrollHeight));
          e.target.style.height = `${natural}px`;
          setTextareaHeight(natural);
        }}
        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
        placeholder={placeholder}
        disabled={disabled}
        rows={1}
        style={{
          flex: 1,
          border: 'none',
          background: 'transparent',
          outline: 'none',
          fontSize: 16,
          lineHeight: '24px',
          color: 'var(--sys-color-on-surface, #1b1d22)',
          fontFamily: "'GoogleSans_400Regular', sans-serif",
          padding: '4px 0',
          minWidth: 0,
          resize: 'none',
          overflowY: textareaHeight >= 120 ? 'auto' : 'hidden',
          height: textareaHeight,
          cursor: disabled ? 'not-allowed' : 'text',
        }}
      />

      <button
        type="button"
        onClick={handleSend}
        disabled={!canSend}
        aria-label="Send"
        style={{
          width: 32,
          height: 32,
          borderRadius: 9999,
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
          transition: 'background 150ms ease',
        }}
      >
        <svg
          viewBox="0 0 24 24"
          width={16}
          height={16}
          fill="none"
          stroke={canSend ? '#ffffff' : 'var(--sys-color-on-surface-variant, #565f6c)'}
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
