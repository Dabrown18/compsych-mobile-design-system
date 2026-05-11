'use client';

import type { HTMLAttributes, ReactNode } from 'react';

export interface PlanCardItemData {
  label: string;
  value?: string;
  icon?: ReactNode;
}

export interface PlanCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  icon?: ReactNode;
  tag?: string;
  items?: PlanCardItemData[];
  expanded?: boolean;
  onToggle?: () => void;
  children?: ReactNode;
}

export function PlanCard({ title, icon, tag, items, expanded = false, onToggle, children, style, ...rest }: PlanCardProps) {
  return (
    <div
      style={{
        borderRadius: 16,
        border: '1px solid var(--sys-color-outline-variant)',
        background: 'var(--sys-color-surface-container-lowest)',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,.06)',
        ...style,
      }}
      {...rest}
    >
      {/* Header row */}
      <div
        onClick={onToggle}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '16px 16px',
          cursor: onToggle ? 'pointer' : 'default',
          userSelect: 'none',
        }}
      >
        {icon && (
          <span style={{
            width: 40, height: 40, borderRadius: '50%',
            background: 'var(--sys-color-primary-container)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--sys-color-on-primary-container)', fontSize: 20, flexShrink: 0,
          }}>
            {icon}
          </span>
        )}
        <span style={{ flex: 1, fontSize: 16, fontWeight: 500, color: 'var(--sys-color-on-surface)' }}>{title}</span>
        {tag && (
          <span style={{
            fontSize: 12, fontWeight: 500,
            padding: '3px 10px', borderRadius: 9999,
            background: 'var(--sys-color-primary-container)',
            color: 'var(--sys-color-on-primary-container)',
          }}>
            {tag}
          </span>
        )}
        {onToggle && (
          <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="var(--sys-color-on-surface-variant)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ transform: expanded ? 'rotate(180deg)' : undefined, transition: 'transform .2s', flexShrink: 0 }}>
            <path d="m6 9 6 6 6-6" />
          </svg>
        )}
      </div>

      {/* Expanded content */}
      {expanded && (
        <div style={{ borderTop: '1px solid var(--sys-color-outline-variant)', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {items?.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {item.icon && <span style={{ color: 'var(--sys-color-on-surface-variant)', fontSize: 16 }}>{item.icon}</span>}
              <span style={{ fontSize: 14, color: 'var(--sys-color-on-surface-variant)', flex: 1 }}>{item.label}</span>
              {item.value && <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--sys-color-on-surface)' }}>{item.value}</span>}
            </div>
          ))}
          {children}
        </div>
      )}
    </div>
  );
}
