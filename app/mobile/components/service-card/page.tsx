'use client';

import type { ReactNode } from 'react';
import { ServiceCard, type ServiceCardVariant, type ServiceCardSize } from '@/components/ds/mobile-card/mobile-card';
import { type IconName } from '@/components/ds/mobile-icon/mobile-icon';

const ICON_OPTIONS: IconName[] = [
  'HeartHandshakeIcon', 'UserRoundIcon', 'GlobeIcon', 'HandshakeIcon',
  'StethoscopeIcon', 'GraduationCapIcon', 'HandHeartIcon', 'AtomIcon',
  'HourglassIcon', 'IdCardIcon', 'MessageCirclePlusIcon', 'BinocularsIcon',
  'FlagIcon', 'MountainSnowIcon', 'SnowflakeIcon', 'HazeIcon',
  'FileChartColumnIncreasingIcon', 'WheatIcon',
];
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { CodeBlock } from '@/components/code-block/code-block';

const VARIANTS: ServiceCardVariant[] = ['outlined', 'tonal', 'filled', 'doubled', 'image'];
const SIZES: ServiceCardSize[] = ['sm', 'md', 'lg'];

const ArrowButton = ({ variant }: { variant: ServiceCardVariant }) => {
  const filled = variant === 'outlined' || variant === 'doubled';
  return (
    <div style={{
      width: 36, height: 36, borderRadius: '50%',
      background: filled ? 'var(--sys-color-primary)' : '#ffffff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
    }}>
      <svg viewBox="0 0 24 24" fill="none" stroke={filled ? '#ffffff' : '#1b1d22'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </div>
  );
};

export default function MobileCardPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="ServiceCard"
      description="Content surface with five visual variants and three layout sizes. Supports a title, description, icon, and image. The sm size uses a horizontal row layout; md/lg use a vertical column layout. Set interactive or onPress to make the card tappable."
    >
      <Section heading="Playground" lead="Adjust variant, size, and content to preview every combination.">
        <MobilePlayground
          render={(values) => {
            const icon = values.icon as string;
            const variant = values.variant as ServiceCardVariant;
            const color1 = (values.gradientColor1 as string) || '#a855f7';
            const color2 = (values.gradientColor2 as string) || '#6366f1';
            const gradient = variant === 'doubled' && values.useGradient
              ? ([color1, color2] as const)
              : undefined;
            return (
              <ServiceCard
                variant={variant}
                size={values.size as ServiceCardSize}
                title={values.title as string}
                description={values.description as string}
                icon={(icon || undefined) as IconName | undefined}
                gradient={gradient}
                buttonIcon={values.showButton ? <ArrowButton variant={variant} /> : undefined}
              />
            );
          }}
          controls={[
            { name: 'variant', type: 'enum', label: 'Variant', options: VARIANTS, defaultValue: 'doubled' },
            { name: 'useGradient', type: 'boolean', label: 'Gradient', defaultValue: true },
            { name: 'gradientColor1', type: 'string', label: 'Gradient start', defaultValue: '#a855f7', placeholder: '#a855f7' },
            { name: 'gradientColor2', type: 'string', label: 'Gradient end', defaultValue: '#6366f1', placeholder: '#6366f1' },
            { name: 'size', type: 'enum', label: 'Size', options: SIZES, defaultValue: 'lg' },
            { name: 'title', type: 'string', label: 'Title', defaultValue: 'Therapy Session', placeholder: 'Card title' },
            { name: 'description', type: 'string', label: 'Description', defaultValue: 'Tuesday, June 3 · 2:00 PM with Dr. Patel', placeholder: 'Card description' },
            { name: 'icon', type: 'select', label: 'Icon', options: ICON_OPTIONS, defaultValue: 'HeartHandshakeIcon', placeholder: '— none —' },
            { name: 'showButton', type: 'boolean', label: 'Button Icon', defaultValue: false },
          ]}
        />
      </Section>
      <Section heading="Code Example">
        <CodeBlock code={`import { ServiceCard, type IconName } from '@compsych/mobile-ui';

// Standard variants
<ServiceCard variant="outlined" size="lg" title="Therapy Session" icon="StethoscopeIcon" />
<ServiceCard variant="tonal"    size="md" title="Today's check-in" icon="HeartHandshakeIcon" />
<ServiceCard variant="filled"   size="sm" title="Schedule"         icon="GraduationCapIcon" />

// doubled variant — solid tonal background (default)
<ServiceCard variant="doubled" title="Mental Health" icon="HeartHandshakeIcon" />

// doubled variant — gradient inner card (top → bottom)
<ServiceCard
  variant="doubled"
  title="Mental Health"
  icon="HeartHandshakeIcon"
  gradient={['#a855f7', '#6366f1']}
/>

// Custom gradient direction (left → right)
<ServiceCard
  variant="doubled"
  gradient={['#a855f7', '#6366f1']}
  gradientStart={{ x: 0, y: 0.5 }}
  gradientEnd={{ x: 1, y: 0.5 }}
  title="Custom direction"
/>`} language="tsx" />
      </Section>

      <Section heading="Variants" lead="Five visual styles: outlined (default + shadow), tonal (primary-fixed), filled (primary-container bg), doubled (nested card with optional gradient), image (photo background).">
        <Surface>
          <div className="flex flex-col gap-4 w-full max-w-sm">
            {VARIANTS.map((v) => (
              <div key={v} className="flex flex-col gap-1">
                <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>{v}{v === 'doubled' ? ' + gradient' : ''}</code>
                <ServiceCard
                  variant={v}
                  title="Upcoming Appointment"
                  description="Tuesday, June 3 · 2:00 PM"
                  icon="HeartHandshakeIcon"
                  gradient={v === 'doubled' ? ['#a855f7', '#6366f1'] : undefined}
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
                <ServiceCard size={s} title="Session with Dr. Patel" description="Tuesday · 2:00 PM" icon="HeartHandshakeIcon" buttonIcon={<ArrowButton variant="outlined" />} />
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
