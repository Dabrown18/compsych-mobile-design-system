'use client';

import type { HTMLAttributes } from 'react';

export type BreadcrumbSize = 'sm' | 'lg';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onPress?: () => void;
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  size?: BreadcrumbSize;
}

const SIZE: Record<BreadcrumbSize, { fontSize: number; px: number; py: number }> = {
  sm: { fontSize: 12, px: 8, py: 2 },
  lg: { fontSize: 14, px: 10, py: 4 },
};

export function Breadcrumb({ items, size = 'lg', style, ...rest }: BreadcrumbProps) {
  const s = SIZE[size];

  return (
    <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 0, ...style }} {...rest}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} style={{ display: 'flex', alignItems: 'center' }}>
            {isLast ? (
              <span style={{
                fontSize: s.fontSize,
                fontWeight: 500,
                color: 'var(--sys-color-on-surface)',
                paddingInline: s.px,
                paddingBlock: s.py,
                borderRadius: 6,
              }}>
                {item.label}
              </span>
            ) : (
              <a
                href={item.href ?? '#'}
                onClick={item.onPress ? (e) => { e.preventDefault(); item.onPress?.(); } : undefined}
                style={{
                  fontSize: s.fontSize,
                  color: 'var(--sys-color-on-surface-variant)',
                  textDecoration: 'none',
                  paddingInline: s.px,
                  paddingBlock: s.py,
                  borderRadius: 6,
                  cursor: 'pointer',
                }}
              >
                {item.label}
              </a>
            )}
            {!isLast && (
              <span style={{ color: 'var(--sys-color-outline)', fontSize: s.fontSize, paddingInline: 2 }}>›</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
