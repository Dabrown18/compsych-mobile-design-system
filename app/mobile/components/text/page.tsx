'use client';

import type { ReactNode } from 'react';
import {
  MobileText,
  HeaderText,
  TitleText,
  BodyText,
  LabelText,
  type TextVariant,
  type TextColor,
} from '@/components/ds/mobile-text/mobile-text';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { FoundationPageShell } from '@/components/foundation-page-shell';

const DISPLAY_VARIANTS: TextVariant[] = ['display-large', 'display-medium', 'display-small'];
const HEADLINE_VARIANTS: TextVariant[] = ['headline-large', 'headline-medium', 'headline-small'];
const TITLE_VARIANTS: TextVariant[] = ['title-large', 'title-medium', 'title-small'];
const BODY_VARIANTS: TextVariant[] = ['body-large', 'body-medium', 'body-small'];
const LABEL_VARIANTS: TextVariant[] = ['label-large', 'label-medium', 'label-small'];

const VARIANT_LABELS: Record<TextVariant, string> = {
  'display-large': 'Display Large — 80px',
  'display-medium': 'Display Medium — 72px',
  'display-small': 'Display Small — 64px',
  'headline-large': 'Headline Large — 48px',
  'headline-medium': 'Headline Medium — 40px',
  'headline-small': 'Headline Small — 32px',
  'title-large': 'Title Large — 28px',
  'title-medium': 'Title Medium — 24px',
  'title-small': 'Title Small — 20px',
  'body-large': 'Body Large — 20px',
  'body-medium': 'Body Medium — 16px',
  'body-small': 'Body Small — 14px',
  'label-large': 'Label Large — 16px',
  'label-medium': 'Label Medium — 14px',
  'label-small': 'Label Small — 12px',
};

const ALL_VARIANTS: TextVariant[] = [
  ...DISPLAY_VARIANTS, ...HEADLINE_VARIANTS, ...TITLE_VARIANTS,
  ...BODY_VARIANTS, ...LABEL_VARIANTS,
];

export default function MobileTextPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="Text"
      description="Typography components for mobile. Five semantic roles — Display, Headline, Title, Body, Label — each with three sizes. All sizes and weights resolve to sys.typography.* tokens so the full scale re-themes with the active brand."
    >
      <Section heading="Playground" lead="Pick any variant, color, or weight. The phone frame shows it at true token-driven size.">
        <MobilePlayground
          render={(values) => (
            <div style={{ padding: 16 }}>
              <MobileText
                variant={values.variant as TextVariant}
                color={values.color as TextColor}
                emphasized={values.emphasized as boolean}
              >
                {values.content as string}
              </MobileText>
            </div>
          )}
          controls={[
            {
              name: 'variant',
              type: 'enum',
              label: 'Variant',
              options: ALL_VARIANTS,
              defaultValue: 'headline-medium',
            },
            {
              name: 'color',
              type: 'enum',
              label: 'Color',
              options: ['default', 'muted', 'primary', 'error'],
              defaultValue: 'default',
            },
            { name: 'emphasized', type: 'boolean', label: 'Emphasized (medium weight)', defaultValue: false },
            {
              name: 'content',
              type: 'string',
              label: 'Content',
              defaultValue: 'The quick brown fox',
              placeholder: 'Type something…',
            },
          ]}
        />
      </Section>

      <Section heading="Named components" lead="HeaderText, TitleText, BodyText, and LabelText are convenience wrappers over MobileText with sensible variant defaults.">
        <Surface>
          <div className="flex flex-col gap-5 w-full">
            <Row label="<HeaderText />">
              <HeaderText>Schedule an Appointment</HeaderText>
            </Row>
            <Row label="<TitleText />">
              <TitleText>Your upcoming sessions</TitleText>
            </Row>
            <Row label="<BodyText />">
              <BodyText>Therapy sessions are 50 minutes. You can reschedule up to 24 hours before your appointment.</BodyText>
            </Row>
            <Row label="<LabelText />">
              <LabelText>Tuesday, June 3 · 2:00 PM</LabelText>
            </Row>
          </div>
        </Surface>
      </Section>

      <Section heading="Type scale" lead="15 steps across five roles. Display and Headline use the display font; Body and Label use the body font.">
        <Surface>
          <div className="flex flex-col gap-6 w-full overflow-x-auto">
            <ScaleGroup label="Display" variants={DISPLAY_VARIANTS} />
            <ScaleGroup label="Headline" variants={HEADLINE_VARIANTS} />
            <ScaleGroup label="Title" variants={TITLE_VARIANTS} />
            <ScaleGroup label="Body" variants={BODY_VARIANTS} />
            <ScaleGroup label="Label" variants={LABEL_VARIANTS} />
          </div>
        </Surface>
      </Section>

      <Section heading="Color" lead="Four semantic color roles driven by sys.color.* tokens.">
        <Surface>
          <div className="flex flex-col gap-3 w-full">
            {(['default', 'muted', 'primary', 'error'] as TextColor[]).map((c) => (
              <div key={c} className="flex items-baseline gap-4">
                <span
                  className="ref-caption font-mono w-16 shrink-0"
                  style={{ color: 'var(--sys-color-on-surface-variant, #565f6c)' }}
                >
                  {c}
                </span>
                <MobileText variant="body-medium" color={c}>
                  The quick brown fox jumps over the lazy dog
                </MobileText>
              </div>
            ))}
          </div>
        </Surface>
      </Section>

      <Section heading="Emphasized weight" lead="Pass emphasized to bump any variant to medium (500) weight — useful for labels, captions, and interactive text.">
        <Surface>
          <div className="flex flex-col gap-3 w-full">
            {(['body-large', 'body-medium', 'body-small', 'label-medium'] as TextVariant[]).map((v) => (
              <div key={v} className="flex items-baseline gap-4">
                <span
                  className="ref-caption font-mono w-24 shrink-0"
                  style={{ color: 'var(--sys-color-on-surface-variant, #565f6c)' }}
                >
                  {v}
                </span>
                <div className="flex gap-6 flex-wrap">
                  <MobileText variant={v}>Regular</MobileText>
                  <MobileText variant={v} emphasized>Emphasized</MobileText>
                </div>
              </div>
            ))}
          </div>
        </Surface>
      </Section>

      <Section heading="Canonical sources">
        <div className="flex flex-col gap-2">
          <LinkRow label="Specification" href="#" hint="specs/text.spec.md" />
          <LinkRow label="React Native reference" href="#" hint="reference/components/ds/mobile-text/" />
        </div>
      </Section>
    </FoundationPageShell>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function ScaleGroup({ label, variants }: { label: string; variants: TextVariant[] }) {
  return (
    <div className="flex flex-col gap-2">
      <span
        className="ref-caption uppercase tracking-wider font-semibold"
        style={{ color: 'var(--sys-color-on-surface-variant, #565f6c)' }}
      >
        {label}
      </span>
      {variants.map((v) => (
        <div key={v} className="flex items-baseline gap-4">
          <span
            className="ref-caption font-mono w-32 shrink-0"
            style={{ color: 'var(--sys-color-on-surface-variant, #565f6c)' }}
          >
            {VARIANT_LABELS[v].split(' — ')[1]}
          </span>
          <MobileText variant={v}>
            {label} {v.split('-')[1]}
          </MobileText>
        </div>
      ))}
    </div>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span
        className="ref-caption font-mono"
        style={{ color: 'var(--sys-color-on-surface-variant, #565f6c)' }}
      >
        {label}
      </span>
      {children}
    </div>
  );
}

function Section({ heading, lead, children }: { heading: string; lead?: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1 max-w-3xl">
        <h2 className="ref-heading-lg" style={{ margin: 0 }}>{heading}</h2>
        {lead && (
          <p className="ref-body" style={{ color: 'var(--sys-color-on-surface-variant, #565f6c)', margin: 0 }}>
            {lead}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}

function Surface({ children }: { children: ReactNode }) {
  return (
    <div
      className="rounded-lg p-8 flex items-start justify-center"
      style={{
        border: '1px solid var(--sys-color-outline-variant, #d7dbe0)',
        backgroundColor: 'var(--sys-color-surface-container-low, #f9fafb)',
      }}
    >
      {children}
    </div>
  );
}

function LinkRow({ label, href, hint }: { label: string; href: string; hint?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between rounded-md px-4 py-3"
      style={{
        border: '1px solid var(--sys-color-outline-variant, #d7dbe0)',
        backgroundColor: 'var(--sys-color-surface-container-lowest, #ffffff)',
        color: 'var(--sys-color-on-surface, #1b1d22)',
        textDecoration: 'none',
      }}
    >
      <span className="ref-body font-medium">{label}</span>
      {hint && (
        <span className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant, #565f6c)' }}>
          {hint}
        </span>
      )}
    </a>
  );
}
