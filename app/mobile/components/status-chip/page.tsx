'use client';

import type { ReactNode } from 'react';

import { CodeBlock } from '@/components/code-block/code-block';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import {
  StatusChip,
  type StatusChipVariant,
  type StatusChipAlign,
} from '@/components/ds/mobile-status-chip/mobile-status-chip';
import { type IconName } from '@/components/ds/mobile-icon/mobile-icon';

const VARIANTS: StatusChipVariant[] = ['warning', 'error'];
const ALIGNS: StatusChipAlign[] = ['left', 'center', 'right'];
const ICON_OPTIONS: IconName[] = [
  'ClockFadingIcon',
  'ClockAlertIcon',
  'TimerIcon',
  'AlertCircleIcon',
  'InfoIcon',
  'BellIcon',
  'ShieldAlertIcon',
  'TriangleAlertIcon',
];

export default function MobileStatusChipPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="StatusChip"
      description="A pill-shaped status indicator with an icon and label. Two semantic variants — warning (amber) and error (red) — with configurable icon and text alignment."
    >
      <Section heading="Playground" lead="Adjust variant, alignment, and icon to preview every combination.">
        <MobilePlayground
          render={(values) => (
            <div style={{ padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <StatusChip
                label={values.label as string}
                variant={values.variant as StatusChipVariant}
                align={values.align as StatusChipAlign}
                icon={(values.icon as string) || undefined}
                fullWidth={values.fullWidth as boolean}
              />
            </div>
          )}
          controls={[
            { name: 'label', type: 'string', label: 'Label', defaultValue: '10 minutes remaining' },
            { name: 'variant', type: 'select', label: 'Variant', options: VARIANTS, defaultValue: 'warning' },
            { name: 'align', type: 'select', label: 'Align', options: ALIGNS, defaultValue: 'center' },
            { name: 'icon', type: 'select', label: 'Icon', options: ICON_OPTIONS, defaultValue: 'ClockFadingIcon', placeholder: '— default —' },
            { name: 'fullWidth', type: 'boolean', label: 'Full width', defaultValue: false },
          ]}
        />
      </Section>

      <Section heading="Variants">
        <Surface>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
            {VARIANTS.map((v) => (
              <StatusChip key={v} variant={v} label={v === 'warning' ? '10 minutes remaining' : 'Your session has ended'} />
            ))}
          </div>
        </Surface>
      </Section>

      <Section heading="Alignment" lead="Controls where icon + text sit within the chip. Useful with fullWidth.">
        <Surface>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', maxWidth: 360 }}>
            {ALIGNS.map((a) => (
              <StatusChip key={a} variant="warning" label={`Align: ${a}`} align={a} fullWidth />
            ))}
          </div>
        </Surface>
      </Section>

      <Section heading="Code example">
        <CodeBlock language="tsx" code={`import { StatusChip } from '@compsych/mobile-ui';

// Warning chip (default)
<StatusChip
  label="10 minutes remaining"
  variant="warning"
/>

// Error chip, full width, left aligned
<StatusChip
  label="Your session has ended"
  variant="error"
  align="left"
  fullWidth
/>

// Custom icon
<StatusChip
  label="Session paused"
  variant="warning"
  icon="TimerIcon"
/>`} />
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
