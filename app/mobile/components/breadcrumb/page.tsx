'use client';

import type { ReactNode } from 'react';
import { Breadcrumb, type BreadcrumbSize } from '@/components/ds/mobile-breadcrumb/mobile-breadcrumb';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { FoundationPageShell } from '@/components/foundation-page-shell';

const SIZES: BreadcrumbSize[] = ['sm', 'lg'];

const DEMO_ITEMS = [
  { label: 'Home', href: '#' },
  { label: 'My Care', href: '#' },
  { label: 'Appointments' },
];

export default function MobileBreadcrumbPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="Breadcrumb"
      description="Navigation trail showing the current location within a hierarchy. Each segment except the last is tappable and navigates up. Two sizes: sm (12px) for dense headers, lg (14px) for standard navigation bars."
    >
      <Section heading="Playground" lead="Adjust the size to preview both scales.">
        <MobilePlayground
          render={(values) => (
            <div style={{ padding: 16, width: '100%' }}>
              <Breadcrumb items={DEMO_ITEMS} size={values.size as BreadcrumbSize} />
            </div>
          )}
          controls={[
            { name: 'size', type: 'enum', label: 'Size', options: SIZES, defaultValue: 'lg' },
          ]}
        />
      </Section>

      <Section heading="Sizes">
        <Surface>
          <div className="flex flex-col gap-6 w-full">
            {SIZES.map((s) => (
              <div key={s} className="flex flex-col gap-2">
                <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>{s}</code>
                <Breadcrumb items={DEMO_ITEMS} size={s} />
              </div>
            ))}
          </div>
        </Surface>
      </Section>

      <Section heading="Depths" lead="Two-level through four-level hierarchies.">
        <Surface>
          <div className="flex flex-col gap-4 w-full">
            <Breadcrumb items={[{ label: 'My Care', href: '#' }, { label: 'Appointments' }]} />
            <Breadcrumb items={DEMO_ITEMS} />
            <Breadcrumb items={[...DEMO_ITEMS, { label: 'Session details' }]} />
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
