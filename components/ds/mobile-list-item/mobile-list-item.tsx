'use client';

import type { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import styles from './mobile-list-item.module.css';

export type ListItemSize = 'sm' | 'md' | 'lg';

export interface MobileListItemProps {
  headline: string;
  supportingText?: string;
  overlineText?: string;
  leadingContent?: ReactNode;
  trailingContent?: ReactNode;
  showChevron?: boolean;
  size?: ListItemSize;
  disabled?: boolean;
  onClick?: () => void;
}

export function MobileListItem({
  headline,
  supportingText,
  overlineText,
  leadingContent,
  trailingContent,
  showChevron = false,
  size = 'md',
  disabled = false,
  onClick,
}: MobileListItemProps) {
  const Tag = onClick ? 'button' : 'div';

  return (
    <Tag
      className={`${styles.root} ${styles[size]} ${disabled ? styles.disabled : ''} ${onClick ? styles.interactive : ''}`}
      onClick={!disabled ? onClick : undefined}
      disabled={Tag === 'button' ? disabled : undefined}
      type={Tag === 'button' ? 'button' : undefined}
    >
      {leadingContent && (
        <span className={styles.leading} aria-hidden>{leadingContent}</span>
      )}

      <span className={styles.text}>
        {overlineText && <span className={styles.overline}>{overlineText}</span>}
        <span className={styles.headline}>{headline}</span>
        {supportingText && <span className={styles.supporting}>{supportingText}</span>}
      </span>

      {(trailingContent || showChevron) && (
        <span className={styles.trailing}>
          {trailingContent}
          {showChevron && <ChevronRight size={18} aria-hidden className={styles.chevron} />}
        </span>
      )}
    </Tag>
  );
}
