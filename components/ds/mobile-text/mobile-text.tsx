'use client';

import type { HTMLAttributes, ElementType } from 'react';
import styles from './mobile-text.module.css';

export type TextVariant =
  | 'display-large'
  | 'display-medium'
  | 'display-small'
  | 'headline-large'
  | 'headline-medium'
  | 'headline-small'
  | 'title-large'
  | 'title-medium'
  | 'title-small'
  | 'body-large'
  | 'body-medium'
  | 'body-small'
  | 'label-large'
  | 'label-medium'
  | 'label-small';

export type TextColor =
  | 'default'
  | 'muted'
  | 'primary'
  | 'error'
  | 'inverse';

export interface MobileTextProps extends HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  color?: TextColor;
  emphasized?: boolean;
  /** HTML element to render. Inferred from variant when omitted. */
  as?: ElementType;
  children: React.ReactNode;
}

const VARIANT_TAG: Record<TextVariant, ElementType> = {
  'display-large': 'h1',
  'display-medium': 'h1',
  'display-small': 'h1',
  'headline-large': 'h2',
  'headline-medium': 'h2',
  'headline-small': 'h3',
  'title-large': 'h4',
  'title-medium': 'h5',
  'title-small': 'h6',
  'body-large': 'p',
  'body-medium': 'p',
  'body-small': 'p',
  'label-large': 'span',
  'label-medium': 'span',
  'label-small': 'span',
};

export function MobileText({
  variant = 'body-medium',
  color = 'default',
  emphasized = false,
  as,
  className,
  children,
  ...rest
}: MobileTextProps) {
  const Tag = as ?? VARIANT_TAG[variant];
  const variantClass = styles[variant.replace(/-/g, '_') as keyof typeof styles];
  const colorClass = styles[`color_${color}` as keyof typeof styles];
  const emphasizedClass = emphasized ? styles.emphasized : '';

  return (
    <Tag
      className={[styles.root, variantClass, colorClass, emphasizedClass, className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export type BodyVariant = 'large' | 'medium' | 'small' | 'labelLarge' | 'labelMedium' | 'labelSmall';

const BODY_VARIANT_MAP: Record<BodyVariant, TextVariant> = {
  large: 'body-large',
  medium: 'body-medium',
  small: 'body-small',
  labelLarge: 'label-large',
  labelMedium: 'label-medium',
  labelSmall: 'label-small',
};

export interface BodyTextProps extends Omit<MobileTextProps, 'variant'> {
  variant?: BodyVariant;
}

export function BodyText({ variant = 'medium', ...props }: BodyTextProps) {
  return <MobileText {...props} variant={BODY_VARIANT_MAP[variant]} />;
}

export type HeaderVariant =
  | 'large'
  | 'medium'
  | 'small'
  | 'headlineLarge'
  | 'headlineMedium'
  | 'headlineSmall'
  | 'titleLarge'
  | 'titleMedium'
  | 'titleSmall';

const HEADER_VARIANT_MAP: Record<HeaderVariant, TextVariant> = {
  large: 'display-large',
  medium: 'display-medium',
  small: 'display-small',
  headlineLarge: 'headline-large',
  headlineMedium: 'headline-medium',
  headlineSmall: 'headline-small',
  titleLarge: 'title-large',
  titleMedium: 'title-medium',
  titleSmall: 'title-small',
};

export interface HeaderTextProps extends Omit<MobileTextProps, 'variant'> {
  variant?: HeaderVariant;
}

export function HeaderText({ variant = 'headlineMedium', ...props }: HeaderTextProps) {
  return <MobileText {...props} variant={HEADER_VARIANT_MAP[variant]} />;
}

export function TitleText(props: Omit<MobileTextProps, 'variant'> & { variant?: 'title-large' | 'title-medium' | 'title-small' }) {
  return <MobileText {...props} variant={props.variant ?? 'title-medium'} />;
}

export function LabelText(props: Omit<MobileTextProps, 'variant'> & { variant?: 'label-large' | 'label-medium' | 'label-small' }) {
  return <MobileText {...props} variant={props.variant ?? 'label-medium'} />;
}
