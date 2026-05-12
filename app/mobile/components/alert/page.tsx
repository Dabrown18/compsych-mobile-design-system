'use client';

import type { ReactNode } from 'react';
import { Alert, type AlertVariant, type AlertSize } from '@/components/ds/mobile-alert/mobile-alert';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { CodeBlock } from '@/components/code-block/code-block';

const VARIANTS: AlertVariant[] = ['default', 'elevated', 'informative', 'warning', 'positive', 'danger'];
const SIZES: AlertSize[] = ['sm', 'lg'];

export default function MobileAlertPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="Alert"
      description="Inline notification surface for contextual messages. Six semantic variants match the feedback tone — default, elevated, informative, warning, positive, danger. Two sizes: lg shows a title + body; sm is icon + body only. Both sizes support an action button and a dismiss control."
    >
      <Section heading="Playground" lead="Adjust variant, size, and content to preview every combination.">
        <MobilePlayground
          render={(values) => (
            <div style={{ padding: 16, width: '100%' }}>
              <Alert
                variant={values.variant as AlertVariant}
                size={values.size as AlertSize}
                title={values.size === 'lg' ? (values.title as string) || undefined : undefined}
                description={values.description as string}
                dismissible={values.dismissible as boolean}
                actionLabel={values.actionLabel as string || undefined}
              />
            </div>
          )}
          controls={[
            { name: 'variant', type: 'enum', label: 'Variant', options: VARIANTS, defaultValue: 'informative' },
            { name: 'size', type: 'enum', label: 'Size', options: SIZES, defaultValue: 'lg' },
            { name: 'title', type: 'string', label: 'Title (lg only)', defaultValue: 'Session rescheduled', placeholder: 'Title' },
            { name: 'description', type: 'string', label: 'Description', defaultValue: 'Your Thursday appointment has been moved to Friday at 2 PM.', placeholder: 'Description' },
            { name: 'dismissible', type: 'boolean', label: 'Dismissible', defaultValue: true },
            { name: 'actionLabel', type: 'string', label: 'Action label', defaultValue: 'View details', placeholder: 'Button label' },
          ]}
        />
      </Section>
      <Section heading="Code Example">
        <CodeBlock code={`import { View } from 'react-native';
import { Alert } from '@compsych/mobile-ui';

export default function Screen() {
  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Alert
        variant="info"
        title="Session expiring"
        description="You will be signed out in 5 minutes."
      />
      <Alert
        variant="error"
        title="Something went wrong"
        description="Please try again or contact support."
      />
      <Alert variant="success" title="Changes saved" />
    </View>
  );
}`} language="tsx" />
      </Section>

      <Section heading="Variants" lead="Six variants — each maps to a distinct sys.* color container + on-container pair.">
        <Surface>
          <div className="flex flex-col gap-4 w-full">
            {VARIANTS.map((v) => (
              <Alert
                key={v}
                variant={v}
                title={v.charAt(0).toUpperCase() + v.slice(1)}
                description="Your next therapy session is scheduled for Tuesday at 2:00 PM."
              />
            ))}
          </div>
        </Surface>
      </Section>

      <Section heading="Sizes">
        <Surface>
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-1">
              <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>lg — title + body</code>
              <Alert variant="informative" size="lg" title="Session rescheduled" description="Your Thursday appointment has moved to Friday at 2 PM." actionLabel="View details" />
            </div>
            <div className="flex flex-col gap-1">
              <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>sm — icon + body</code>
              <Alert variant="informative" size="sm" description="Session rescheduled to Friday at 2 PM." actionLabel="View" />
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
