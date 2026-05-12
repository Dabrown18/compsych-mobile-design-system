'use client';

import type { ReactNode } from 'react';
import { Chip, type ChipUsage, type ChipSize } from '@/components/ds/mobile-chip/mobile-chip';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { CodeBlock } from '@/components/code-block/code-block';

const USAGES: ChipUsage[] = ['neutral', 'informative', 'positive', 'danger', 'warning'];
const SIZES: ChipSize[] = ['sm', 'md', 'lg', 'xl'];

export default function MobileChipPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="Chip"
      description="Compact pill for filters, tags, and status labels. Five semantic usages, four sizes. Supports leading icons, count badges, and a dismiss button. All colours resolve through sys.* tokens."
    >
      <Section heading="Playground" lead="Adjust usage, size, and text to preview every combination.">
        <MobilePlayground
          render={(values) => (
            <div style={{ padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Chip
                label={values.label as string}
                usage={values.usage as ChipUsage}
                size={values.size as ChipSize}
                dismissible={values.dismissible as boolean}
                badge={values.badge as string || undefined}
              />
            </div>
          )}
          controls={[
            { name: 'usage', type: 'enum', label: 'Usage', options: USAGES, defaultValue: 'neutral' },
            { name: 'size', type: 'enum', label: 'Size', options: SIZES, defaultValue: 'md' },
            { name: 'label', type: 'string', label: 'Label', defaultValue: 'Cardiology', placeholder: 'Chip label' },
            { name: 'dismissible', type: 'boolean', label: 'Dismissible', defaultValue: false },
            { name: 'badge', type: 'string', label: 'Badge', defaultValue: '', placeholder: 'Count' },
          ]}
        />
      </Section>
      <Section heading="Code Example">
        <CodeBlock code={`import { useState } from 'react';
import { ScrollView } from 'react-native';
import { Chip } from '@compsych/mobile-ui';

const FILTERS = ['All', 'Therapy', 'Coaching', 'Crisis'];

export default function Screen() {
  const [active, setActive] = useState('All');

  return (
    <ScrollView horizontal contentContainerStyle={{ gap: 8, padding: 16 }}>
      {FILTERS.map((f) => (
        <Chip
          key={f}
          label={f}
          selected={active === f}
          onPress={() => setActive(f)}
        />
      ))}
    </ScrollView>
  );
}`} language="tsx" />
      </Section>

      <Section heading="Usage" lead="Five semantic usages mapping to different sys.* color roles.">
        <Surface>
          <div className="flex flex-wrap gap-4 items-center justify-center">
            {USAGES.map((u) => (
              <div key={u} className="flex flex-col items-center gap-2">
                <Chip label={u} usage={u} />
                <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>{u}</code>
              </div>
            ))}
          </div>
        </Surface>
      </Section>

      <Section heading="Sizes" lead="sm (20px), md (24px), lg (32px), xl (40px).">
        <Surface>
          <div className="flex flex-wrap gap-4 items-center justify-center">
            {SIZES.map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <Chip label="Schedule" size={s} />
                <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>{s}</code>
              </div>
            ))}
          </div>
        </Surface>
      </Section>

      <Section heading="With badge and dismiss" lead="badge adds a count pill; dismissible adds an × button.">
        <Surface>
          <div className="flex gap-4 items-center flex-wrap justify-center">
            <Chip label="Appointments" badge={3} />
            <Chip label="Filter active" dismissible />
            <Chip label="Messages" badge="12" dismissible usage="informative" size="lg" />
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
    <div className="rounded-lg p-8 flex items-center justify-center"
      style={{ border: '1px solid var(--sys-color-outline-variant)', backgroundColor: 'var(--sys-color-surface-container-low)' }}>
      {children}
    </div>
  );
}
