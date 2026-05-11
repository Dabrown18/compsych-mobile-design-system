'use client';

import type { ReactNode } from 'react';
import { EmptyState } from '@/components/ds/mobile-empty-state/mobile-empty-state';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { FoundationPageShell } from '@/components/foundation-page-shell';

export default function MobileEmptyStatePage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="EmptyState"
      description="Full-area placeholder for screens or sections with no content. Two visual styles: icon (circle graphic) and illustration. Two viewport presets — mobile uses smaller type and a 48px circle; desktop uses larger type and a 64px circle. Optional action button drives the primary recovery path."
    >
      <Section heading="Playground" lead="Adjust title, description, and action to preview the layout.">
        <MobilePlayground
          render={(values) => (
            <div style={{ width: '100%' }}>
              <EmptyState
                title={values.title as string}
                description={values.description as string || undefined}
                actionLabel={values.actionLabel as string || undefined}
                viewport="mobile"
              />
            </div>
          )}
          controls={[
            { name: 'title', type: 'string', label: 'Title', defaultValue: 'No appointments', placeholder: 'Empty state title' },
            { name: 'description', type: 'string', label: 'Description', defaultValue: 'Book a session to get started with your care plan.', placeholder: 'Secondary text' },
            { name: 'actionLabel', type: 'string', label: 'Action label', defaultValue: 'Book appointment', placeholder: 'CTA label' },
          ]}
        />
      </Section>

      <Section heading="Examples">
        <Surface>
          <div className="flex flex-col gap-8 w-full">
            <div className="flex flex-col gap-1">
              <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>no results (no action)</code>
              <EmptyState title="No results" description="Try adjusting your search or filters." viewport="mobile" />
            </div>
            <div style={{ height: 1, background: 'var(--sys-color-outline-variant)' }} />
            <div className="flex flex-col gap-1">
              <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>first-run (with action)</code>
              <EmptyState title="No appointments yet" description="Book a session to get started with your care plan." actionLabel="Book appointment" viewport="mobile" />
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
