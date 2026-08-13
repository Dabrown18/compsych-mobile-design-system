'use client';

export interface GlobalLoaderProps {
  visible: boolean;
}

export function GlobalLoader({ visible }: GlobalLoaderProps) {
  if (!visible) return null;

  return (
    <div
      data-testid="global-loader"
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,.40)',
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '3px solid rgba(255,255,255,0.35)',
          borderTopColor: 'var(--sys-color-primary)',
          animation: 'mobile-global-loader-spin 0.8s linear infinite',
        }}
      />
      <style>{`@keyframes mobile-global-loader-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
