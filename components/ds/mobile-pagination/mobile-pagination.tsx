'use client';

import type { HTMLAttributes } from 'react';

export type PaginationSize = 'sm' | 'lg';

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
  size?: PaginationSize;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  compact?: boolean;
}

const SIZE: Record<PaginationSize, { itemSize: number; fontSize: number }> = {
  sm: { itemSize: 32, fontSize: 13 },
  lg: { itemSize: 40, fontSize: 15 },
};

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function getPages(total: number, current: number, siblings: number): (number | '…')[] {
  const totalSlots = siblings * 2 + 5;
  if (total <= totalSlots) return range(1, total);

  // Clamp to [2, total-1] so the always-present first and last pages never appear in the range.
  const leftSibling = Math.max(current - siblings, 2);
  const rightSibling = Math.min(current + siblings, total - 1);
  const showLeft = leftSibling > 2;
  const showRight = rightSibling < total - 1;

  const pages: (number | '…')[] = [1];
  if (showLeft) pages.push('…');
  pages.push(...range(leftSibling, rightSibling));
  if (showRight) pages.push('…');
  pages.push(total);
  return pages;
}

export function Pagination({
  size = 'lg',
  totalPages,
  currentPage,
  onPageChange,
  siblingCount = 1,
  compact = false,
  style,
  ...rest
}: PaginationProps) {
  const s = SIZE[size];

  const btn = (label: string | number, page: number | null, active = false, disabled = false) => (
    <button
      key={`${label}`}
      type="button"
      onClick={() => page !== null && onPageChange(page)}
      disabled={disabled || page === null}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: s.itemSize,
        height: s.itemSize,
        borderRadius: 9999,
        border: active ? 'none' : '1px solid var(--sys-color-outline-variant)',
        background: active ? 'var(--sys-color-primary)' : 'transparent',
        color: active ? 'var(--sys-color-on-primary)' : 'var(--sys-color-on-surface)',
        fontSize: s.fontSize,
        fontWeight: active ? 600 : 400,
        cursor: disabled || page === null ? 'default' : 'pointer',
        opacity: disabled ? 0.38 : 1,
        transition: 'background .15s',
      }}
    >
      {label}
    </button>
  );

  const prevDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= totalPages;

  if (compact) {
    return (
      <nav style={{ display: 'flex', alignItems: 'center', gap: 8, ...style }} {...rest}>
        {btn('‹', prevDisabled ? null : currentPage - 1, false, prevDisabled)}
        <span style={{ fontSize: s.fontSize, color: 'var(--sys-color-on-surface-variant)' }}>{currentPage} / {totalPages}</span>
        {btn('›', nextDisabled ? null : currentPage + 1, false, nextDisabled)}
      </nav>
    );
  }

  const pages = getPages(totalPages, currentPage, siblingCount);

  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: 4, ...style }} {...rest}>
      {btn('‹', prevDisabled ? null : currentPage - 1, false, prevDisabled)}
      {pages.map((p, i) =>
        p === '…'
          ? <span key={`ellipsis-${i}`} style={{ width: s.itemSize, textAlign: 'center', color: 'var(--sys-color-on-surface-variant)', fontSize: s.fontSize }}>…</span>
          : btn(p, p as number, p === currentPage)
      )}
      {btn('›', nextDisabled ? null : currentPage + 1, false, nextDisabled)}
    </nav>
  );
}
