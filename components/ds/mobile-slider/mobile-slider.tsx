'use client';

import { useState, useCallback, useRef, type HTMLAttributes } from 'react';

export interface SliderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number) => void;
  disabled?: boolean;
}

function snap(v: number, min: number, max: number, step: number) {
  const stepped = Math.round((v - min) / step) * step + min;
  return Math.min(max, Math.max(min, stepped));
}

export function Slider({
  value: valueProp,
  defaultValue,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  disabled = false,
  style,
  ...rest
}: SliderProps) {
  const [internal, setInternal] = useState(defaultValue ?? min);
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp! : internal;
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const pct = ((value - min) / (max - min)) * 100;

  const update = useCallback((clientX: number) => {
    if (!trackRef.current) return;
    const { left, width } = trackRef.current.getBoundingClientRect();
    const rawPct = (clientX - left) / width;
    const rawVal = min + rawPct * (max - min);
    const next = snap(rawVal, min, max, step);
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  }, [min, max, step, isControlled, onValueChange]);

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 8, ...style }}
      {...rest}
    >
      <div
        ref={trackRef}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        tabIndex={disabled ? -1 : 0}
        onMouseDown={(e) => {
          if (disabled) return;
          isDragging.current = true;
          update(e.clientX);
          const up = () => { isDragging.current = false; window.removeEventListener('mouseup', up); window.removeEventListener('mousemove', move); };
          const move = (ev: MouseEvent) => { if (isDragging.current) update(ev.clientX); };
          window.addEventListener('mouseup', up);
          window.addEventListener('mousemove', move);
        }}
        onKeyDown={(e) => {
          if (disabled) return;
          let next = value;
          if (e.key === 'ArrowRight' || e.key === 'ArrowUp') next = snap(value + step, min, max, step);
          if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') next = snap(value - step, min, max, step);
          if (next !== value) { if (!isControlled) setInternal(next); onValueChange?.(next); }
        }}
        style={{
          position: 'relative',
          height: 20,
          display: 'flex',
          alignItems: 'center',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.48 : 1,
          userSelect: 'none',
        }}
      >
        {/* Track background */}
        <div style={{ position: 'absolute', left: 0, right: 0, height: 4, borderRadius: 9999, background: 'var(--sys-color-surface-container-high)' }} />
        {/* Active track */}
        <div style={{ position: 'absolute', left: 0, width: `${pct}%`, height: 4, borderRadius: 9999, background: 'var(--sys-color-primary)' }} />
        {/* Thumb */}
        <div style={{
          position: 'absolute',
          left: `calc(${pct}% - 10px)`,
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: 'var(--sys-color-primary)',
          boxShadow: '0 2px 8px rgba(0,0,0,.15)',
          transition: 'transform .1s',
        }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--sys-color-on-surface-variant)', fontSize: 12 }}>
        <span>{min}</span>
        <span style={{ fontWeight: 500, color: 'var(--sys-color-on-surface)' }}>{value}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
