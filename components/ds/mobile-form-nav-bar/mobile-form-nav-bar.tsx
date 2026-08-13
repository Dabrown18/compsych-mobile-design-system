'use client';

import { resolveIcon } from '../mobile-icon/mobile-icon';

const ArrowLeft = resolveIcon('ArrowLeft');

export interface FormNavBarProps {
  onBack: () => void;
  onNext: () => void;
  onDisabledPress?: () => void;
  canContinue?: boolean;
  isLoading?: boolean;
  continueLabel?: string;
}

export function FormNavBar({
  onBack,
  onNext,
  onDisabledPress,
  canContinue = true,
  isLoading = false,
  continueLabel = 'Continue',
}: FormNavBarProps) {
  const visuallyDisabled = !canContinue || isLoading;

  const handleNextClick = () => {
    if (isLoading) return;
    if (!canContinue) {
      onDisabledPress?.();
      return;
    }
    onNext();
  };

  return (
    <div
      style={{
        padding: 16,
        borderTop: '1px solid var(--sys-color-outline)',
        background: 'var(--sys-color-surface-container-lowest)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          style={{
            width: 56,
            height: 56,
            borderRadius: 999,
            border: 'none',
            background: 'var(--sys-color-primary-fixed-dim)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          {ArrowLeft && (
            <ArrowLeft size={24} color="var(--sys-color-on-primary-fixed-variant)" strokeWidth={1.5} />
          )}
        </button>
        <button
          type="button"
          onClick={handleNextClick}
          disabled={isLoading}
          aria-disabled={visuallyDisabled}
          style={{
            flex: 1,
            height: 56,
            borderRadius: 999,
            border: 'none',
            paddingInline: 32,
            cursor: isLoading ? 'default' : 'pointer',
            background:
              visuallyDisabled && !isLoading
                ? 'var(--sys-color-surface-container-highest)'
                : 'var(--sys-color-primary)',
            opacity: visuallyDisabled && !isLoading ? 0.48 : 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              opacity: visuallyDisabled && !isLoading ? 0.64 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isLoading ? (
              <span
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  border: '2.5px solid rgba(255,255,255,0.4)',
                  borderTopColor: 'var(--sys-color-on-primary)',
                  animation: 'mobile-form-nav-bar-spin 0.8s linear infinite',
                }}
              />
            ) : (
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: visuallyDisabled ? 'var(--sys-color-on-surface)' : 'var(--sys-color-on-primary)',
                }}
              >
                {continueLabel}
              </span>
            )}
          </span>
        </button>
      </div>
      <style>{`@keyframes mobile-form-nav-bar-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
