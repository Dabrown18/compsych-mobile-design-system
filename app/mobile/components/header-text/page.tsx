'use client';

import type { ReactNode } from 'react';
import { HeaderText, type HeaderVariant, type TextColor } from '@/components/ds/mobile-text/mobile-text';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { CodeBlock } from '@/components/code-block/code-block';

const DISPLAY_VARIANTS: HeaderVariant[] = ['large', 'medium', 'small'];
const HEADLINE_VARIANTS: HeaderVariant[] = ['headlineLarge', 'headlineMedium', 'headlineSmall'];
const TITLE_VARIANTS: HeaderVariant[] = ['titleLarge', 'titleMedium', 'titleSmall'];
const ALL_VARIANTS: HeaderVariant[] = [...DISPLAY_VARIANTS, ...HEADLINE_VARIANTS, ...TITLE_VARIANTS];

export default function HeaderTextPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="HeaderText"
      description="Display, headline, and title text for mobile screens. Maps to sys.typography.display.*, sys.typography.headline.*, and sys.typography.title.* tokens. Use large/medium/small for hero display text, headlineLarge–Small for screen titles, and titleLarge–Small for card headers and sub-headings."
    >
      <Section heading="Playground" lead="Select a variant and adjust controls.">
        <MobilePlayground
          render={(values) => (
            <div style={{ padding: 16 }}>
              <HeaderText
                variant={values.variant as HeaderVariant}
                color={values.color as TextColor}
                emphasized={values.emphasized as boolean}
              >
                {values.content as string}
              </HeaderText>
            </div>
          )}
          controls={[
            {
              name: 'variant',
              type: 'enum',
              label: 'Variant',
              options: ALL_VARIANTS,
              defaultValue: 'headlineMedium',
            },
            {
              name: 'color',
              type: 'enum',
              label: 'Color',
              options: ['default', 'muted', 'primary', 'error'],
              defaultValue: 'default',
            },
            { name: 'emphasized', type: 'boolean', label: 'Emphasized', defaultValue: false },
            {
              name: 'content',
              type: 'string',
              label: 'Content',
              defaultValue: 'Schedule an Appointment',
              placeholder: 'Type something…',
            },
          ]}
        />
      </Section>

      <Section heading="Display" lead="large, medium, small — hero-scale text for splash screens and onboarding.">
        <Surface>
          <div className="flex flex-col gap-6 w-full">
            {DISPLAY_VARIANTS.map((v) => (
              <ScaleRow key={v} variant={v}>
                <HeaderText variant={v}>Schedule an Appointment</HeaderText>
              </ScaleRow>
            ))}
          </div>
        </Surface>
      </Section>

      <Section heading="Headline" lead="headlineLarge, headlineMedium, headlineSmall — screen titles and primary section headings.">
        <Surface>
          <div className="flex flex-col gap-6 w-full">
            {HEADLINE_VARIANTS.map((v) => (
              <ScaleRow key={v} variant={v}>
                <HeaderText variant={v}>Schedule an Appointment</HeaderText>
              </ScaleRow>
            ))}
          </div>
        </Surface>
      </Section>

      <Section heading="Title" lead="titleLarge, titleMedium, titleSmall — card headers, list section labels, and sub-headings.">
        <Surface>
          <div className="flex flex-col gap-6 w-full">
            {TITLE_VARIANTS.map((v) => (
              <ScaleRow key={v} variant={v}>
                <HeaderText variant={v}>Your upcoming sessions</HeaderText>
              </ScaleRow>
            ))}
          </div>
        </Surface>
      </Section>

      <Section heading="Color" lead="Four semantic colors, all driven by sys.color.* tokens.">
        <Surface>
          <div className="flex flex-col gap-4 w-full">
            {(['default', 'muted', 'primary', 'error'] as TextColor[]).map((c) => (
              <div key={c} className="flex items-baseline gap-4">
                <span className="ref-caption font-mono w-16 shrink-0" style={{ color: 'var(--sys-color-on-surface-variant, #565f6c)' }}>{c}</span>
                <HeaderText variant="headlineSmall" color={c}>My Care Dashboard</HeaderText>
              </div>
            ))}
          </div>
        </Surface>
      </Section>

      <Section heading="Emphasized">
        <Surface>
          <div className="flex flex-col gap-4 w-full">
            {(['headlineSmall', 'titleMedium', 'titleSmall'] as HeaderVariant[]).map((v) => (
              <div key={v} className="flex flex-col gap-1">
                <span className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant, #565f6c)' }}>{v}</span>
                <div className="flex gap-8 flex-wrap items-baseline">
                  <HeaderText variant={v}>Regular</HeaderText>
                  <HeaderText variant={v} emphasized>Emphasized</HeaderText>
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

      <Section heading="React Native">
        <CodeBlock code={`import { View } from 'react-native';
import { HeaderText } from '@compsych/mobile-ui';

export default function Screen() {
  return (
    <View style={{ padding: 16, gap: 8 }}>
      <HeaderText variant="headlineLarge">Headline Large</HeaderText>
      <HeaderText variant="headlineMedium">Headline Medium</HeaderText>
      <HeaderText variant="headlineSmall">Headline Small</HeaderText>
      <HeaderText variant="titleLarge">Title Large</HeaderText>
      <HeaderText variant="titleMedium">Title Medium</HeaderText>
      <HeaderText variant="titleSmall">Title Small</HeaderText>
    </View>
  );
}`} language="tsx" />
      </Section>
    </FoundationPageShell>
  );
}

function ScaleRow({ variant, children }: { variant: HeaderVariant; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant, #565f6c)' }}>{variant}</span>
      {children}
    </div>
  );
}

function Section({ heading, lead, children }: { heading: string; lead?: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1 max-w-3xl">
        <h2 className="ref-heading-lg" style={{ margin: 0 }}>{heading}</h2>
        {lead && <p className="ref-body" style={{ color: 'var(--sys-color-on-surface-variant, #565f6c)', margin: 0 }}>{lead}</p>}
      </div>
      {children}
    </section>
  );
}

function Surface({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg p-8 flex items-start justify-center"
      style={{ border: '1px solid var(--sys-color-outline-variant, #d7dbe0)', backgroundColor: 'var(--sys-color-surface-container-low, #f9fafb)' }}>
      {children}
    </div>
  );
}

function LinkRow({ label, href, hint }: { label: string; href: string; hint?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="flex items-center justify-between rounded-md px-4 py-3"
      style={{ border: '1px solid var(--sys-color-outline-variant, #d7dbe0)', backgroundColor: 'var(--sys-color-surface-container-lowest, #ffffff)', color: 'var(--sys-color-on-surface, #1b1d22)', textDecoration: 'none' }}>
      <span className="ref-body font-medium">{label}</span>
      {hint && <span className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant, #565f6c)' }}>{hint}</span>}
    </a>
  );
}
