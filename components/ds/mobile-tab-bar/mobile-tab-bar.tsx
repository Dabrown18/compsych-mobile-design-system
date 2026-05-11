'use client';

import styles from './mobile-tab-bar.module.css';

export interface MobileTabBarTab {
  label: string;
}

export interface MobileTabBarProps {
  tabs: MobileTabBarTab[];
  activeIndex?: number;
  onSelect?: (index: number) => void;
  scrollable?: boolean;
}

export function MobileTabBar({
  tabs,
  activeIndex = 0,
  onSelect,
  scrollable = false,
}: MobileTabBarProps) {
  return (
    <div
      className={`${styles.root} ${scrollable ? styles.scrollable : ''}`}
      role="tablist"
    >
      {tabs.map((tab, i) => {
        const active = i === activeIndex;
        return (
          <button
            key={tab.label}
            type="button"
            role="tab"
            aria-selected={active}
            className={`${styles.tab} ${active ? styles.active : ''}`}
            onClick={() => onSelect?.(i)}
          >
            <span className={styles.label}>{tab.label}</span>
            {active && <span className={styles.indicator} aria-hidden />}
          </button>
        );
      })}
    </div>
  );
}
