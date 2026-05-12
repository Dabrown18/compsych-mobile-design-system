'use client';

import type { ReactNode } from 'react';
import { RadioButton, type RadioButtonSize } from '@/components/ds/mobile-radio-button/mobile-radio-button';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { CodeBlock } from '@/components/code-block/code-block';

const SIZES: RadioButtonSize[] = ['sm', 'md'];

export default function MobileRadioButtonPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="RadioButton"
      description="Single-selection control, typically used in a group where exactly one option can be selected at a time. Works controlled (checked + onChange) or uncontrolled (defaultChecked). Two sizes: sm (18px ring) and md (22px ring). Supports label, description, disabled, and invalid states."
    >
      <Section heading="Playground" lead="Toggle checked and adjust label in the phone frame.">
        <MobilePlayground
          render={(values, setValue) => (
            <div style={{ padding: 24, width: '100%' }}>
              <RadioButton
                checked={values.checked as boolean}
                onChange={(v) => setValue('checked', v)}
                size={values.size as RadioButtonSize}
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
            { name: 'label', type: 'string', label: 'Label', defaultValue: 'Schedule in-person session', placeholder: 'Label' },
            { name: 'description', type: 'string', label: 'Description', defaultValue: '', placeholder: 'Secondary text' },
            { name: 'disabled', type: 'boolean', label: 'Disabled', defaultValue: false },
            { name: 'invalid', type: 'boolean', label: 'Invalid', defaultValue: false },
          ]}
        />
      </Section>

      <Section heading="States">
        <Surface>
          <div className="flex flex-col gap-5 w-full">
            <RadioButton label="Unchecked" />
            <RadioButton label="Checked" defaultChecked />
            <RadioButton label="Disabled" disabled />
            <RadioButton label="Invalid — select an option to continue" invalid />
          </div>
        </Surface>
      </Section>

      <Section heading="In a group" lead="Compose multiple RadioButtons to form a mutually exclusive group.">
        <Surface>
          <div className="flex flex-col gap-4 w-full max-w-sm">
            {[
              { label: 'In-person session', sub: 'Meet at a local provider office' },
              { label: 'Video session', sub: 'Join via secure video link', checked: true },
              { label: 'Phone session', sub: 'Audio only call' },
            ].map((opt, i) => (
              <RadioButton key={i} label={opt.label} description={opt.sub} defaultChecked={!!opt.checked} />
            ))}
          </div>
        </Surface>
      </Section>

      <Section heading="React Native">
        <CodeBlock code={`import { useState } from 'react';
import { View } from 'react-native';
import { RadioButton } from '@compsych/mobile-ui';

const OPTIONS = ['Phone call', 'Video session', 'In person'];

export default function Screen() {
  const [selected, setSelected] = useState('Phone call');

  return (
    <View style={{ padding: 16, gap: 12 }}>
      {OPTIONS.map((opt) => (
        <RadioButton
          key={opt}
          label={opt}
          selected={selected === opt}
          onValueChange={() => setSelected(opt)}
        />
      ))}
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
