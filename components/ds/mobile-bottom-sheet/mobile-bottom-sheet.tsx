'use client';

import type { ReactNode } from 'react';
import styles from './mobile-bottom-sheet.module.css';

export type BottomSheetSize = 'peek' | 'half' | 'full';

export interface MobileBottomSheetProps {
  visible?: boolean;
  onClose?: () => void;
  title?: string;
  children: ReactNode;
  size?: BottomSheetSize;
  showHandle?: boolean;
  showOverlay?: boolean;
}

const SIZE_HEIGHTS: Record<BottomSheetSize, string> = {
  peek: '180px',
  half: '55%',
  full: '90%',
};

export function MobileBottomSheet({
  visible = true,
  onClose,
  title,
  children,
  size = 'half',
  showHandle = true,
  showOverlay = true,
}: MobileBottomSheetProps) {
  if (!visible) return null;

  return (
    <div className={styles.root}>
      {showOverlay && (
        <div className={styles.overlay} aria-hidden onClick={onClose} />
      )}
      <div
        className={styles.sheet}
        style={{ height: SIZE_HEIGHTS[size] }}
        role="dialog"
        aria-modal="true"
        aria-label={title ?? 'Bottom sheet'}
      >
        {showHandle && <div className={styles.handle} aria-hidden />}
        {title && <div className={styles.header}>{title}</div>}
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
