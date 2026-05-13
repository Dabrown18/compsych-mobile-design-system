'use client';

import type { ReactNode } from 'react';
import { Card, type CardVariant, type CardSize } from '@/components/ds/mobile-card/mobile-card';
import { HeartHandshakeIcon, HandshakeIcon } from '@/components/ds/mobile-icon/mobile-icon';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { CodeBlock } from '@/components/code-block/code-block';

const VARIANTS: CardVariant[] = ['outlined', 'tonal', 'filled', 'doubled', 'image'];
const SIZES: CardSize[] = ['sm', 'md', 'lg'];

const ArrowButton = ({ variant }: { variant: CardVariant }) => {
  const filled = variant === 'outlined' || variant === 'doubled';
  return (
    <div style={{
      width: 36, height: 36, borderRadius: '50%',
      background: filled ? 'var(--sys-color-primary)' : '#ffffff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
    }}>
      <HandshakeIcon size="xsmall" color={filled ? '#ffffff' : '#1b1d22'} />
    </div>
  );
};

export default function MobileCardPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="Card"
      description="Content surface with five visual variants and three layout sizes. Supports a title, description, icon, and image. The sm size uses a horizontal row layout; md/lg use a vertical column layout. Set interactive or onPress to make the card tappable."
    >
      <Section heading="Playground" lead="Adjust variant, size, and content to preview every combination.">
        <MobilePlayground
          render={(values) => (
            <Card
              variant={values.variant as CardVariant}
              size={values.size as CardSize}
              title={values.title as string}
              description={values.description as string}
              icon={values.showIcon ? <HeartHandshakeIcon size="small" color="currentColor" /> : undefined}
              buttonIcon={values.showButton ? <ArrowButton variant={values.variant as CardVariant} /> : undefined}
            />
          )}
          controls={[
            { name: 'variant', type: 'enum', label: 'Variant', options: VARIANTS, defaultValue: 'outlined' },
            { name: 'size', type: 'enum', label: 'Size', options: SIZES, defaultValue: 'lg' },
            { name: 'title', type: 'string', label: 'Title', defaultValue: 'Therapy Session', placeholder: 'Card title' },
            { name: 'description', type: 'string', label: 'Description', defaultValue: 'Tuesday, June 3 · 2:00 PM with Dr. Patel', placeholder: 'Card description' },
            { name: 'showIcon', type: 'boolean', label: 'Icon', defaultValue: false },
            { name: 'showButton', type: 'boolean', label: 'Button Icon', defaultValue: false },
          ]}
        />
      </Section>
      <Section heading="Code Example">
        <CodeBlock code={`import { Card, HeartHandshakeIcon, HandshakeIcon } from '@compsych/mobile-ui';

<Card
  variant="tonal"
  title="Today's check-in"
  icon={<HeartHandshakeIcon size="small" color="#fff" />}
  buttonIcon={<HandshakeIcon size="xsmall" color="#fff" />}
  onPress={() => {}}
/>`} language="tsx" />
      </Section>

      <Section heading="Variants" lead="Five visual styles: outlined (default + shadow), tonal (primary-fixed), filled (primary bg), doubled (nested card), image (photo background).">
        <Surface>
          <div className="flex flex-col gap-4 w-full max-w-sm">
            {VARIANTS.map((v) => (
              <div key={v} className="flex flex-col gap-1">
                <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>{v}</code>
                <Card
                  variant={v}
                  title="Upcoming Appointment"
                  description="Tuesday, June 3 · 2:00 PM"
                  icon={<HeartHandshakeIcon size="small" color="currentColor" />}
                  buttonIcon={<ArrowButton variant={v} />}
                />
              </div>
            ))}
          </div>
        </Surface>
      </Section>

      <Section heading="Sizes" lead="sm uses a horizontal row; md and lg use a vertical column with increasing spacing.">
        <Surface>
          <div className="flex flex-col gap-4 w-full max-w-sm">
            {SIZES.map((s) => (
              <div key={s} className="flex flex-col gap-1">
                <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>{s}</code>
                <Card size={s} title="Session with Dr. Patel" description="Tuesday · 2:00 PM" icon={<HeartHandshakeIcon size="small" color="currentColor" />} buttonIcon={<ArrowButton variant="outlined" />} />
              </div>
            ))}
          </div>
        </Surface>
      </Section>

    </FoundationPageShell>
  );
}

function Section({ heading, lead, children }: { heading: string; lead?: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1 max-w-3xl">
        <h2 className="ref-heading-lg" style={{ margin: 0 }}>{heading}</h2>
        {lead && <p className="ref-body" style={{ color: 'var(--sys-color-on-surface-variant)', margin: 0 }}>{lead}</p>}
      </div>
      {children}
    </section>
  );
}

function Surface({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg p-8 flex items-start justify-center"
      style={{ border: '1px solid var(--sys-color-outline-variant)', backgroundColor: 'var(--sys-color-surface-container-low)' }}>
      {children}
    </div>
  );
}
