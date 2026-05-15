'use client';

import type { HTMLAttributes, ReactNode } from 'react';

export interface ScreenContainerProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export function ScreenContainer({ children, style, ...rest }: ScreenContainerProps) {
  return (
    <div
      style={{
        flex: 1,
        overflowY: 'auto',
        backgroundColor: 'var(--sys-color-surface-container-lowest)',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 8,
        paddingBottom: 8,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
