'use client';

import type { ReactNode } from 'react';
import styles from './phone-frame.module.css';

interface PhoneFrameProps {
  children: ReactNode;
  /** Background color of the screen area. Defaults to sys-color-surface. */
  screenBackground?: string;
}

/**
 * PhoneFrame — renders content inside a CSS phone device mockup.
 * Used by MobilePlayground and mobile gallery pages to give context
 * for how components appear on a real device.
 */
export function PhoneFrame({ children, screenBackground }: PhoneFrameProps) {
  return (
    <div className={styles.device}>
      <div className={styles.bezel}>
        {/* Dynamic Island */}
        <div className={styles.dynamicIsland} aria-hidden />

        {/* Screen */}
        <div
          className={styles.screen}
          style={
            screenBackground ? { background: screenBackground } : undefined
          }
        >
          {/* Status bar */}
          <div className={styles.statusBar} aria-hidden>
            <span className={styles.statusTime}>9:41</span>
            <span className={styles.statusIcons}>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor" aria-hidden>
                <rect x="0" y="3" width="3" height="9" rx="1" opacity="0.4" />
                <rect x="4.5" y="2" width="3" height="10" rx="1" opacity="0.6" />
                <rect x="9" y="0" width="3" height="12" rx="1" />
                <rect x="13.5" y="1" width="2" height="10" rx="0.5" opacity="0.3" />
              </svg>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor" aria-hidden>
                <path d="M8 2C10.5 2 12.7 3.1 14.2 4.8L15.5 3.5C13.6 1.4 11 0 8 0C5 0 2.4 1.4 0.5 3.5L1.8 4.8C3.3 3.1 5.5 2 8 2Z" />
                <path d="M8 5C9.7 5 11.2 5.7 12.3 6.8L13.6 5.5C12.1 4.0 10.1 3 8 3C5.9 3 3.9 4.0 2.4 5.5L3.7 6.8C4.8 5.7 6.3 5 8 5Z" />
                <circle cx="8" cy="10" r="2" />
              </svg>
              <svg width="25" height="12" viewBox="0 0 25 12" fill="currentColor" aria-hidden>
                <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="currentColor" strokeOpacity="0.35" fill="none" />
                <rect x="2" y="2" width="17" height="8" rx="2" />
                <path d="M23 4.5v3a1.5 1.5 0 0 0 0-3Z" opacity="0.4" />
              </svg>
            </span>
          </div>

          {/* Content area */}
          <div className={styles.content}>{children}</div>

          {/* Home indicator */}
          <div className={styles.homeIndicator} aria-hidden />
        </div>
      </div>
    </div>
  );
}
