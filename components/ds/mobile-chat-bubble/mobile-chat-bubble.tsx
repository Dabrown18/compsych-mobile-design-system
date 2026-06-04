'use client';

import type { HTMLAttributes } from 'react';

export type ChatBubbleVariant = 'incoming' | 'outgoing';

export interface ChatBubbleProps extends HTMLAttributes<HTMLDivElement> {
  variant: ChatBubbleVariant;
  message: string;
  timestamp?: string;
  showReactions?: boolean;
  onThumbsUp?: () => void;
  onThumbsDown?: () => void;
}

export function ChatBubble({
  variant,
  message,
  timestamp,
  showReactions,
  onThumbsUp,
  onThumbsDown,
  style,
  ...rest
}: ChatBubbleProps) {
  const isOutgoing = variant === 'outgoing';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: isOutgoing ? 'flex-end' : 'flex-start',
        width: '100%',
        paddingLeft: isOutgoing ? 32 : 0,
        paddingRight: isOutgoing ? 0 : 64,
        boxSizing: 'border-box',
        ...style,
      }}
      {...rest}
    >
      <div>
        {/* Bubble */}
        <div
          style={{
            padding: '12px 16px',
            borderTopLeftRadius: 24,
            borderTopRightRadius: isOutgoing ? 24 : 16,
            borderBottomLeftRadius: isOutgoing ? 24 : 4,
            borderBottomRightRadius: isOutgoing ? 4 : 4,
            background: isOutgoing
              ? 'var(--sys-color-primary, #075cba)'
              : 'var(--sys-color-surface-container, #f3f4f6)',
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 16,
              fontWeight: 400,
              lineHeight: '24px',
              color: isOutgoing ? '#ffffff' : 'var(--sys-color-on-surface, #1b1d22)',
              fontFamily: "'GoogleSans_400Regular', sans-serif",
            }}
          >
            {message}
          </p>
        </div>

        {/* Meta row */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: isOutgoing ? 'flex-end' : 'flex-start',
            gap: 8,
            marginTop: 4,
          }}
        >
          {timestamp && (
            <span
              style={{
                fontSize: 12,
                lineHeight: '18px',
                fontWeight: 500,
                color: isOutgoing
                  ? 'rgba(255,255,255,0.64)'
                  : 'var(--sys-color-on-surface-variant, #565f6c)',
                fontFamily: "'GoogleSans_500Medium', sans-serif",
              }}
            >
              {timestamp}
            </span>
          )}

          {!isOutgoing && showReactions && (
            <>
              <button
                type="button"
                onClick={onThumbsUp}
                aria-label="Thumbs up"
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 2,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  color: 'var(--sys-color-on-surface-variant, #565f6c)',
                }}
              >
                <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M7 10v12M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={onThumbsDown}
                aria-label="Thumbs down"
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 2,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  color: 'var(--sys-color-on-surface-variant, #565f6c)',
                }}
              >
                <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M17 14V2M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
