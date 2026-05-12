'use client';

import type { ReactNode } from 'react';
import { Checkbox, type CheckboxSize } from '@/components/ds/mobile-checkbox/mobile-checkbox';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { CodeBlock } from '@/components/code-block/code-block';

const SIZES: CheckboxSize[] = ['sm', 'md'];

export default function MobileCheckboxPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="Checkbox"
      description="Binary selection control with an optional label and description. Supports three checked states: true, false, and 'indeterminate' for parent-child group headers. Two sizes: sm (20px box) and md (24px box). Works controlled (checked + onChange) or uncontrolled (defaultChecked)."
    >
      <Section heading="Playground" lead="Toggle the checked state and adjust label text in the phone frame.">
        <MobilePlayground
          render={(values, setValue) => (
            <div style={{ padding: 24, width: '100%' }}>
              <Checkbox
                checked={values.checked as boolean}
                onChange={(v) => setValue('checked', v)}
                size={values.size as CheckboxSize}
                label={values.label as string || undefined}
                description={values.description as string || undefined}
                disabled={values.disabled as boolean}
                invalid={values.invalid as boolean}
              />
            </div>
          )}
          controls={[
            { name: 'checked', type: 'boolean', label: 'Checked', defaultValue: false },
            { name: 'size', type: 'enum', label: 'Size', options: SIZES, defaultValue: 'md' },
            { name: 'label', type: 'string', label: 'Label', defaultValue: 'I agree to the terms', placeholder: 'Label text' },
            { name: 'description', type: 'string', label: 'Description', defaultValue: '', placeholder: 'Secondary text' },
            { name: 'disabled', type: 'boolean', label: 'Disabled', defaultValue: false },
            { name: 'invalid', type: 'boolean', label: 'Invalid', defaultValue: false },
          ]}
        />
      </Section>

      <Section heading="States" lead="Unchecked, checked, indeterminate, disabled, and invalid.">
        <Surface>
          <div className="flex flex-col gap-5 w-full">
            <Checkbox label="Unchecked" defaultChecked={false} />
            <Checkbox label="Checked" defaultChecked={true} />
            <Checkbox label="Indeterminate" checked="indeterminate" />
            <Checkbox label="Disabled" defaultChecked={false} disabled />
            <Checkbox label="Invalid — agree to continue" defaultChecked={false} invalid />
          </div>
        </Surface>
      </Section>

      <Section heading="Sizes">
        <Surface>
          <div className="flex flex-col gap-5 w-full">
            {SIZES.map((s) => (
              <div key={s} className="flex flex-col gap-1">
                <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>{s}</code>
                <Checkbox size={s} label="Receive appointment reminders" description="SMS and push notifications" defaultChecked />
              </div>
            ))}
          </div>
        </Surface>
      </Section>

      <Section heading="Code Example">
        <CodeBlock code={`import { useState } from 'react';
import { View } from 'react-native';
import { Checkbox } from '@compsych/mobile-ui';

export default function Screen() {
  const [checked, setChecked] = useState(false);

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Checkbox
        checked={checked}
        onValueChange={setChecked}
        label="I agree to the terms"
      />
      <Checkbox checked label="Pre-selected option" />
      <Checkbox checked={false} disabled label="Unavailable option" />
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
