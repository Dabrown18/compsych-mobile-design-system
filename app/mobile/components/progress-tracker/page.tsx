'use client';

import type { ReactNode } from 'react';
import { ProgressBar, ProgressTracker, type ProgressTrackerSize } from '@/components/ds/mobile-progress-tracker/mobile-progress-tracker';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { CodeBlock } from '@/components/code-block/code-block';

const SIZES: ProgressTrackerSize[] = ['sm', 'lg'];

const STEPS = [
  { label: 'Intake', state: 'completed' as const },
  { label: 'Assessment', state: 'completed' as const },
  { label: 'Matching', state: 'active' as const },
  { label: 'First session', state: 'pending' as const },
];

export default function MobileProgressTrackerPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="ProgressTracker"
      description="Two progress components: ProgressBar for continuous progress (0–100) and ProgressTracker for discrete step-based flows. ProgressTracker supports completed, active, and pending step states, two sizes, and an optional label row."
    >
      <Section heading="ProgressBar" lead="A simple horizontal bar. progress accepts 0–100 and is clamped automatically.">
        <MobilePlayground
          render={(values) => (
            <div style={{ padding: 24, width: '100%' }}>
              <ProgressBar progress={values.progress as number} />
            </div>
          )}
          controls={[
            { name: 'progress', type: 'string', label: 'Progress (0–100)', defaultValue: '60', placeholder: '0–100' },
          ]}
        />
      </Section>

      <Section heading="ProgressBar — examples">
        <Surface>
          <div className="flex flex-col gap-6 w-full">
            {[0, 25, 50, 75, 100].map((p) => (
              <div key={p} className="flex flex-col gap-1">
                <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>{p}%</code>
                <ProgressBar progress={p} />
              </div>
            ))}
          </div>
        </Surface>
      </Section>

      <Section heading="ProgressTracker" lead="Step-based indicator. Each step has a state: completed, active, or pending.">
        <MobilePlayground
          render={(values) => (
            <div style={{ padding: 24, width: '100%' }}>
              <ProgressTracker
                steps={STEPS}
                size={values.size as ProgressTrackerSize}
                showLabels={values.showLabels as boolean}
              />
            </div>
          )}
          controls={[
            { name: 'size', type: 'enum', label: 'Size', options: SIZES, defaultValue: 'lg' },
            { name: 'showLabels', type: 'boolean', label: 'Show labels', defaultValue: true },
          ]}
        />
      </Section>

      <Section heading="Sizes">
        <Surface>
          <div className="flex flex-col gap-6 w-full">
            {SIZES.map((s) => (
              <div key={s} className="flex flex-col gap-2">
                <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>{s}</code>
                <ProgressTracker steps={STEPS} size={s} />
              </div>
            ))}
          </div>
        </Surface>
      </Section>

      <Section heading="Code Example">
        <CodeBlock code={`import { View } from 'react-native';
import { ProgressTracker } from '@compsych/mobile-ui';

export default function Screen() {
  return (
    <View style={{ padding: 16, gap: 24 }}>
      <ProgressTracker
        steps={4}
        currentStep={1}
        labels={['Intake', 'Match', 'Schedule', 'Session']}
      />
      <ProgressTracker steps={3} currentStep={2} />
    </View>
  );
}`} language="tsx" />
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
