'use client';

import type { ReactNode } from 'react';
import { ProgressBar, ProgressTracker, type ProgressTrackerSize } from '@/components/ds/mobile-progress-tracker/mobile-progress-tracker';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { CodeBlock } from '@/components/code-block/code-block';

const SIZES: ProgressTrackerSize[] = ['sm', 'lg'];

const STEPS_STEP1 = [
  { label: 'Silo', state: 'active' as const },
  { label: 'Topic', state: 'pending' as const },
  { label: 'Verb', state: 'pending' as const },
];

const STEPS_STEP2 = [
  { label: 'Silo', state: 'completed' as const },
  { label: 'Topic', state: 'active' as const },
  { label: 'Verb', state: 'pending' as const },
];

const STEPS_COMPLETE = [
  { label: 'Silo', state: 'completed' as const },
  { label: 'Topic', state: 'completed' as const },
  { label: 'Verb', state: 'completed' as const },
];

export default function MobileProgressTrackerPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="ProgressTracker"
      description="Two progress components: ProgressBar for continuous progress (0–100) and ProgressTracker for discrete step-based flows. On mobile the tracker renders solid colour bars — sysSuccess (dark green) for completed/active steps and sysSuccessContainer (light green) for pending steps. Labels are hidden by default."
    >
      <Section heading="ProgressTracker" lead="Step-based indicator. Each step carries a state: completed, active, or pending. completed and active both render dark green; pending renders light green.">
        <MobilePlayground
          render={(values) => (
            <div style={{ padding: 24, width: '100%' }}>
              <ProgressTracker
                steps={STEPS_STEP2}
                size={values.size as ProgressTrackerSize}
                showLabels={values.showLabels as boolean}
              />
            </div>
          )}
          controls={[
            { name: 'size', type: 'enum', label: 'Size', options: SIZES, defaultValue: 'lg' },
            { name: 'showLabels', type: 'boolean', label: 'Show labels', defaultValue: false },
          ]}
        />
      </Section>

      <Section heading="Step states">
        <Surface>
          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-2">
              <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>Step 1 active</code>
              <ProgressTracker steps={STEPS_STEP1} />
            </div>
            <div className="flex flex-col gap-2">
              <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>Step 2 active</code>
              <ProgressTracker steps={STEPS_STEP2} />
            </div>
            <div className="flex flex-col gap-2">
              <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>All completed</code>
              <ProgressTracker steps={STEPS_COMPLETE} />
            </div>
          </div>
        </Surface>
      </Section>

      <Section heading="Sizes">
        <Surface>
          <div className="flex flex-col gap-6 w-full">
            {SIZES.map((s) => (
              <div key={s} className="flex flex-col gap-2">
                <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>{s}</code>
                <ProgressTracker steps={STEPS_STEP2} size={s} />
              </div>
            ))}
          </div>
        </Surface>
      </Section>

      <Section heading="With labels">
        <Surface>
          <ProgressTracker steps={STEPS_STEP2} showLabels />
        </Surface>
      </Section>

      <Section heading="Code example">
        <CodeBlock code={`import { View } from 'react-native';
import { ProgressTracker } from '@compsych/mobile-ui';

const steps = [
  { label: 'Silo',  state: 'completed' },
  { label: 'Topic', state: 'active' },
  { label: 'Verb',  state: 'pending' },
];

export default function GuideMe() {
  return (
    <View style={{ padding: 16 }}>
      {/* Default — no labels, bar-only */}
      <ProgressTracker steps={steps} />

      {/* With labels */}
      <ProgressTracker steps={steps} showLabels />
    </View>
  );
}`} language="tsx" />
      </Section>

      <Section heading="ProgressBar" lead="Standalone horizontal fill bar. progress accepts 0–100 and is clamped automatically.">
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
