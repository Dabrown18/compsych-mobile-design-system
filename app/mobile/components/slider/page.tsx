'use client';

import type { ReactNode } from 'react';
import { Slider } from '@/components/ds/mobile-slider/mobile-slider';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { FoundationPageShell } from '@/components/foundation-page-shell';

export default function MobileSliderPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="Slider"
      description="A draggable range control for numeric input. Supports controlled (value + onValueChange) and uncontrolled (defaultValue) usage. Custom min, max, and step values are supported. Keyboard-navigable — arrow keys move by one step."
    >
      <Section heading="Playground" lead="Drag the thumb or use arrow keys to preview the slider.">
        <MobilePlayground
          render={() => (
            <div style={{ padding: '24px 32px', width: '100%' }}>
              <Slider defaultValue={40} />
            </div>
          )}
          controls={[]}
        />
      </Section>

      <Section heading="Examples">
        <Surface>
          <div className="flex flex-col gap-8 w-full">
            <div className="flex flex-col gap-2">
              <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>default (0–100, step 1)</code>
              <Slider defaultValue={40} />
            </div>
            <div className="flex flex-col gap-2">
              <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>step 10</code>
              <Slider defaultValue={50} step={10} />
            </div>
            <div className="flex flex-col gap-2">
              <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>custom range (18–65)</code>
              <Slider defaultValue={30} min={18} max={65} />
            </div>
            <div className="flex flex-col gap-2">
              <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>disabled</code>
              <Slider defaultValue={60} disabled />
            </div>
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
