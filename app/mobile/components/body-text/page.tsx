'use client';

import type { ReactNode } from 'react';
import { BodyText, type BodyVariant, type TextColor } from '@/components/ds/mobile-text/mobile-text';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { CodeBlock } from '@/components/code-block/code-block';

const BODY_VARIANTS: BodyVariant[] = ['large', 'medium', 'small'];
const LABEL_VARIANTS: BodyVariant[] = ['labelLarge', 'labelMedium', 'labelSmall'];

export default function BodyTextPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="BodyText"
      description="Paragraph and label text for mobile screens. Maps to sys.typography.body.* and sys.typography.label.* tokens. Use BodyText for readable prose and descriptions; use LabelText for captions, metadata, button labels, and form field labels."
    >
      <Section heading="Playground" lead="Select a variant and adjust controls. The phone frame renders at true token-driven size.">
        <MobilePlayground
          render={(values) => (
            <div style={{ padding: 16 }}>
              <BodyText
                variant={values.variant as BodyVariant}
                color={values.color as TextColor}
                emphasized={values.emphasized as boolean}
              >
                {values.content as string}
              </BodyText>
            </div>
          )}
          controls={[
            {
              name: 'variant',
              type: 'enum',
              label: 'Variant',
              options: [...BODY_VARIANTS, ...LABEL_VARIANTS],
              defaultValue: 'medium',
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
              defaultValue: 'Therapy sessions are 50 minutes. You can reschedule up to 24 hours before your appointment.',
              placeholder: 'Type something…',
            },
          ]}
        />
      </Section>
      <Section heading="Code Example">
        <CodeBlock code={`import { View } from 'react-native';
import { BodyText } from '@compsych/mobile-ui';

export default function Screen() {
  return (
    <View style={{ padding: 16, gap: 8 }}>
      <BodyText variant="large">Large body copy for reading.</BodyText>
      <BodyText variant="medium">Standard paragraph text.</BodyText>
      <BodyText variant="small">Fine print or captions.</BodyText>
      <BodyText variant="labelLarge">Button label</BodyText>
      <BodyText variant="labelMedium">Tag label</BodyText>
    </View>
  );
}`} language="tsx" />
      </Section>

      <Section heading="Body variants" lead="large (20px), medium (16px), small (14px). For readable prose, descriptions, and content.">
        <Surface>
          <div className="flex flex-col gap-6 w-full">
            {BODY_VARIANTS.map((v) => (
              <ScaleRow key={v} variant={v}>
                <BodyText variant={v}>
                  Therapy sessions are 50 minutes. You can reschedule up to 24 hours before your appointment.
                </BodyText>
              </ScaleRow>
            ))}
          </div>
        </Surface>
      </Section>

      <Section heading="Label variants" lead="labelLarge (16px), labelMedium (14px), labelSmall (12px). Medium weight by default. For captions, metadata, button labels, and form elements.">
        <Surface>
          <div className="flex flex-col gap-6 w-full">
            {LABEL_VARIANTS.map((v) => (
              <ScaleRow key={v} variant={v}>
                <BodyText variant={v}>
                  Tuesday, June 3 · 2:00 PM
                </BodyText>
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
                <BodyText variant="medium" color={c}>
                  Your next session is on Tuesday at 2:00 PM.
                </BodyText>
              </div>
            ))}
          </div>
        </Surface>
      </Section>

      <Section heading="Emphasized" lead="Pass emphasized to use medium (500) weight — useful for inline strong text, active states, and interactive labels.">
        <Surface>
          <div className="flex flex-col gap-4 w-full">
            {(['large', 'medium', 'small', 'labelMedium'] as BodyVariant[]).map((v) => (
              <div key={v} className="flex flex-col gap-1">
                <span className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant, #565f6c)' }}>{v}</span>
                <div className="flex gap-8 flex-wrap items-baseline">
                  <BodyText variant={v}>Regular</BodyText>
                  <BodyText variant={v} emphasized>Emphasized</BodyText>
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

function ScaleRow({ variant, children }: { variant: BodyVariant; children: ReactNode }) {
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
