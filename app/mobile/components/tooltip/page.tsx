'use client';

import type { ReactNode } from 'react';
import { Tooltip, type TooltipVariant, type TooltipDirection } from '@/components/ds/mobile-tooltip/mobile-tooltip';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { FoundationPageShell } from '@/components/foundation-page-shell';

const VARIANTS: TooltipVariant[] = ['filled', 'elevated'];
const DIRECTIONS: TooltipDirection[] = ['none', 'top', 'bottom', 'left', 'right'];

export default function MobileTooltipPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="Tooltip"
      description="A small informational bubble for contextual help. Two variants: filled (dark inverse surface) and elevated (surface container with border + shadow). Five direction options control which side the arrow appears on — use none for no arrow."
    >
      <Section heading="Playground" lead="Adjust text, variant, and direction to preview every combination.">
        <MobilePlayground
          render={(values) => (
            <div style={{ padding: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Tooltip
                text={values.text as string}
                variant={values.variant as TooltipVariant}
                direction={values.direction as TooltipDirection}
              />
            </div>
          )}
          controls={[
            { name: 'text', type: 'string', label: 'Text', defaultValue: 'Sessions are 50 minutes long', placeholder: 'Tooltip text' },
            { name: 'variant', type: 'enum', label: 'Variant', options: VARIANTS, defaultValue: 'filled' },
            { name: 'direction', type: 'enum', label: 'Direction', options: DIRECTIONS, defaultValue: 'none' },
          ]}
        />
      </Section>

      <Section heading="Variants">
        <Surface>
          <div className="flex flex-col gap-4 items-start">
            {VARIANTS.map((v) => (
              <div key={v} className="flex flex-col gap-2">
                <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>{v}</code>
                <Tooltip text="Sessions are 50 minutes long" variant={v} />
              </div>
            ))}
          </div>
        </Surface>
      </Section>

      <Section heading="Arrow directions" lead="Use direction to point the tooltip toward its trigger element.">
        <Surface>
          <div className="flex flex-wrap gap-8 justify-center">
            {(['top', 'bottom', 'left', 'right'] as TooltipDirection[]).map((d) => (
              <div key={d} className="flex flex-col items-center gap-2" style={{ padding: 12 }}>
                <Tooltip text="Tooltip" direction={d} />
                <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>{d}</code>
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
    <div className="rounded-lg p-8 flex items-center justify-center"
      style={{ border: '1px solid var(--sys-color-outline-variant)', backgroundColor: 'var(--sys-color-surface-container-low)' }}>
      {children}
    </div>
  );
}
