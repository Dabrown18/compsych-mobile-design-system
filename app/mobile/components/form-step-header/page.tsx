'use client';

import { type ReactNode } from 'react';
import { FormStepHeader } from '@/components/ds/mobile-form-step-header/mobile-form-step-header';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { CodeBlock } from '@/components/code-block/code-block';
import { PhoneFrame } from '@/components/phone-frame/phone-frame';

export default function MobileFormStepHeaderPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="FormStepHeader"
      description="A padded header for multi-step forms — wraps ProgressTracker and derives each step's completed/active/pending state from the current step index, so callers only ever pass currentStep and totalSteps."
    >
      <Section heading="Playground">
        <MobilePlayground
          render={(values) => (
            <PhoneFrame>
              <div style={{ paddingTop: 8 }}>
                <FormStepHeader
                  currentStep={Number(values.currentStep)}
                  totalSteps={Number(values.totalSteps)}
                />
              </div>
            </PhoneFrame>
          )}
          controls={[
            { name: 'totalSteps', type: 'select', label: 'Total steps', options: ['3', '4', '5', '6'], defaultValue: '5' },
            { name: 'currentStep', type: 'select', label: 'Current step', options: ['1', '2', '3', '4', '5', '6'], defaultValue: '2' },
          ]}
        />
      </Section>
      <Section heading="Code Example">
        <CodeBlock code={`import { View } from 'react-native';
import { FormStepHeader } from '@compsych/mobile-ui';

export default function IntakeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <FormStepHeader currentStep={2} totalSteps={5} />
      {/* form fields for step 2 */}
    </View>
  );
}`} language="tsx" />
      </Section>

      <Section heading="Anatomy" lead="A padded container around ProgressTracker — no other UI, no close button (the source component declared one but never rendered it, so it isn't carried over here).">
        <Surface>
          <PhoneFrame>
            <div style={{ paddingTop: 8 }}>
              <FormStepHeader
                currentStep={3}
                totalSteps={5}
              />
            </div>
          </PhoneFrame>
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
