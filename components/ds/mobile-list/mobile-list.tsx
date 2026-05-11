'use client';

import type { HTMLAttributes, ReactNode } from 'react';

export type ListItemType = 'simple' | 'detailed';

export interface ListItemProps extends HTMLAttributes<HTMLDivElement> {
  type?: ListItemType;
  label: string;
  subLabel?: string;
  icon?: ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  showDivider?: boolean;
}

export interface ListProps extends HTMLAttributes<HTMLDivElement> {
  items: Omit<ListItemProps, 'showDivider'>[];
  type?: ListItemType;
}

export function ListItem({ type = 'simple', label, subLabel, icon, onPress, disabled = false, showDivider = true, style, ...rest }: ListItemProps) {
  const isDetailed = type === 'detailed';

  return (
    <div
      onClick={disabled ? undefined : onPress}
      role={onPress ? 'button' : undefined}
      tabIndex={onPress && !disabled ? 0 : undefined}
      style={{
        display: 'flex',
        alignItems: isDetailed ? 'flex-start' : 'center',
        gap: 12,
        padding: isDetailed ? '12px 16px' : '10px 16px',
        cursor: onPress && !disabled ? 'pointer' : 'default',
        opacity: disabled ? 0.48 : 1,
        borderBottom: showDivider ? '1px solid var(--sys-color-outline-variant)' : 'none',
        background: 'var(--sys-color-surface-container-lowest)',
        ...style,
      }}
      {...rest}
    >
      {icon && (
        <span style={{
          width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--sys-color-on-surface-variant)', fontSize: 20, flexShrink: 0,
          marginTop: isDetailed ? 2 : 0,
        }}>
          {icon}
        </span>
      )}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontSize: 15, color: 'var(--sys-color-on-surface)', lineHeight: 1.4 }}>{label}</span>
        {isDetailed && subLabel && (
          <span style={{ fontSize: 13, color: 'var(--sys-color-on-surface-variant)', lineHeight: 1.4 }}>{subLabel}</span>
        )}
      </div>
      {onPress && !disabled && (
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="var(--sys-color-on-surface-variant)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6" />
        </svg>
      )}
    </div>
  );
}

export function List({ items, type = 'simple', style, ...rest }: ListProps) {
  return (
    <div
      style={{
        borderRadius: 12,
        overflow: 'hidden',
        border: '1px solid var(--sys-color-outline-variant)',
        ...style,
      }}
      {...rest}
    >
      {items.map((item, i) => (
        <ListItem key={i} {...item} type={type} showDivider={i < items.length - 1} />
      ))}
    </div>
  );
}
