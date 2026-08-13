'use client';

import { useState } from 'react';

import { resolveIcon } from '../mobile-icon/mobile-icon';

export interface WebViewModalProps {
  visible: boolean;
  url: string;
  onClose: () => void;
  title?: string;
  errorRetryLabel?: string;
  errorCloseLabel?: string;
}

const ArrowLeft = resolveIcon('ArrowLeft');

/**
 * Web stand-in for the native WebViewModal — renders an <iframe> in place of
 * react-native-webview's <WebView>, since that native module has no web
 * equivalent. Everything else (header, loading overlay, error state) mirrors
 * the real component 1:1.
 */
export function WebViewModal({
  visible,
  url,
  onClose,
  title,
  errorRetryLabel = 'Try Again',
  errorCloseLabel = 'Close',
}: WebViewModalProps) {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  if (!visible) return null;

  const handleRetry = () => {
    setHasError(false);
    setLoading(true);
    setReloadKey((key) => key + 1);
  };

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--sys-color-surface)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: 56,
          paddingInline: 8,
          borderBottom: '1px solid var(--sys-color-outline)',
          background: 'var(--sys-color-surface-container-lowest)',
          flexShrink: 0,
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Back"
          style={{
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
          }}
        >
          {ArrowLeft && <ArrowLeft size={20} color="var(--sys-color-on-surface)" strokeWidth={1.5} />}
        </button>
        <p
          style={{
            flex: 1,
            textAlign: 'center',
            margin: 0,
            fontSize: 15,
            fontWeight: 600,
            color: 'var(--sys-color-on-surface)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </p>
        <div style={{ width: 40, flexShrink: 0 }} />
      </div>

      {hasError ? (
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            padding: 24,
          }}
        >
          <p style={{ margin: 0, textAlign: 'center', color: 'var(--sys-color-error)', fontSize: 14 }}>
            Failed to load page
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 240 }}>
            <button
              type="button"
              onClick={handleRetry}
              style={{
                height: 44, borderRadius: 9999, cursor: 'pointer',
                border: '1px solid var(--sys-color-primary)', background: 'transparent',
                color: 'var(--sys-color-primary)', fontSize: 14, fontWeight: 600,
              }}
            >
              {errorRetryLabel}
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                height: 44, borderRadius: 9999, cursor: 'pointer',
                border: 'none', background: 'transparent',
                color: 'var(--sys-color-on-surface)', fontSize: 14,
              }}
            >
              {errorCloseLabel}
            </button>
          </div>
        </div>
      ) : (
        <div style={{ position: 'relative', flex: 1 }}>
          <iframe
            key={reloadKey}
            src={url}
            title={title ?? 'Web content'}
            style={{ width: '100%', height: '100%', border: 'none' }}
            onLoad={() => setLoading(false)}
            onError={() => {
              setLoading(false);
              setHasError(true);
            }}
          />
          {loading && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--sys-color-surface)',
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  border: '3px solid var(--sys-color-outline-variant)',
                  borderTopColor: 'var(--sys-color-primary)',
                  animation: 'mobile-web-view-modal-spin 0.8s linear infinite',
                }}
              />
              <style>{`@keyframes mobile-web-view-modal-spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
