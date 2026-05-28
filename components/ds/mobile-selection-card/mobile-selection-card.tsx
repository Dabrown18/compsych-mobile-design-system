'use client';

import type { HTMLAttributes } from 'react';
import { resolveIcon, SIZE_MAP, type IconName } from '../mobile-icon/mobile-icon';

export type SelectionCardSize = 'sm' | 'md';

export interface SelectionCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  icon?: IconName;
  size?: SelectionCardSize;
  multiSelect?: boolean;
  selected?: boolean;
  disabled?: boolean;
  onPress?: () => void;
}

const SELECTED_RING = '1px 2px 0px var(--sys-color-primary)';

export function SelectionCard({
  title,
  icon,
  size = 'md',
  multiSelect = false,
  selected = false,
  disabled = false,
  onPress,
  style,
  ...rest
}: SelectionCardProps) {
  const LucideIcon = icon ? resolveIcon(icon) : null;
  const { px: iconPx, strokeWidth: iconSW } = SIZE_MAP['small'];

  const borderColor = selected ? 'var(--sys-color-primary)' : 'var(--sys-color-outline)';
  const checkboxColor = selected ? 'var(--sys-color-primary)' : 'var(--sys-color-outline)';

  const handleClick = disabled ? undefined : onPress;

  if (size === 'sm') {
    const iconColor = selected ? 'var(--sys-color-primary)' : 'var(--sys-color-on-surface)';

    return (
      <div
        role={multiSelect ? 'checkbox' : 'radio'}
        aria-checked={multiSelect ? selected : undefined}
        aria-selected={!multiSelect ? selected : undefined}
        aria-disabled={disabled}
        onClick={handleClick}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 16,
          paddingBottom: 16,
          width: 270,
          borderRadius: 12,
          border: `${selected ? 1.5 : 1}px solid ${borderColor}`,
          backgroundColor: 'var(--sys-color-surface-container-lowest)',
          boxShadow: selected ? SELECTED_RING : undefined,
          opacity: disabled ? 0.38 : 1,
          cursor: disabled ? 'not-allowed' : 'pointer',
          userSelect: 'none',
          ...style,
        }}
        {...rest}
      >
        {LucideIcon && (
          <div style={{ width: 24, height: 24, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LucideIcon size={iconPx} color={iconColor} strokeWidth={iconSW} />
          </div>
        )}
        <span style={{
          flex: 1,
          fontSize: 16,
          lineHeight: '22.4px',
          fontWeight: selected ? 500 : 400,
          color: 'var(--sys-color-on-surface)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {title}
        </span>
        {multiSelect && <Checkbox checked={selected} color={checkboxColor} />}
      </div>
    );
  }

  // ── Medium ──────────────────────────────────────────────────────────────────
  const iconBg = selected ? 'var(--sys-color-primary)' : 'var(--sys-color-surface-container)';
  const iconColor = selected ? 'var(--sys-color-on-primary)' : 'var(--sys-color-on-surface)';
  const titleColor = selected ? 'var(--sys-color-primary)' : 'var(--sys-color-on-surface)';

  return (
    <div
      role={multiSelect ? 'checkbox' : 'radio'}
      aria-checked={multiSelect ? selected : undefined}
      aria-selected={!multiSelect ? selected : undefined}
      aria-disabled={disabled}
      onClick={handleClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: 270,
        padding: 24,
        gap: 24,
        borderRadius: 16,
        border: `${selected ? 2 : 1.5}px solid ${borderColor}`,
        backgroundColor: 'var(--sys-color-surface-container-lowest)',
        boxShadow: selected ? SELECTED_RING : undefined,
        opacity: disabled ? 0.38 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        userSelect: 'none',
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
      {...rest}
    >
      {multiSelect ? (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%' }}>
          {LucideIcon && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 999, backgroundColor: iconBg, overflow: 'hidden' }}>
              <LucideIcon size={iconPx} color={iconColor} strokeWidth={iconSW} />
            </div>
          )}
          <Checkbox checked={selected} color={checkboxColor} />
        </div>
      ) : (
        LucideIcon && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 999, backgroundColor: iconBg, overflow: 'hidden' }}>
            <LucideIcon size={iconPx} color={iconColor} strokeWidth={iconSW} />
          </div>
        )
      )}
      <span style={{
        fontSize: 20,
        lineHeight: '28px',
        fontWeight: selected ? 500 : 400,
        color: titleColor,
      }}>
        {title}
      </span>
    </div>
  );
}

function Checkbox({ checked, color }: { checked: boolean; color: string }) {
  if (checked) {
    return (
      <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: 'var(--sys-color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }
  return (
    <div style={{ width: 20, height: 20, borderRadius: 4, border: `1.5px solid ${color}`, flexShrink: 0 }} />
  );
}
