'use client';

import type { ReactNode } from 'react';
import { Input, type InputSize } from '@/components/ds/mobile-input/mobile-input';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { CodeBlock } from '@/components/code-block/code-block';

const SIZES: InputSize[] = ['sm', 'md', 'lg'];

export default function MobileInputPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="Input"
      description="Mobile text input. Three sizes with optional label, helper text, and error text. Use errorText to show validation messages and invalid to trigger the error border without a message. Supports leading and trailing icon slots."
    >
      <Section heading="Playground" lead="Adjust label, helper text, error text, and size to preview each combination.">
        <MobilePlayground
          render={(values) => (
            <div style={{ padding: 24, width: '100%' }}>
              <Input
                size={values.size as InputSize}
                label={values.label as string || undefined}
                placeholder={values.placeholder as string}
                helperText={values.helperText as string || undefined}
                errorText={values.errorText as string || undefined}
                invalid={values.invalid as boolean}
                disabled={values.disabled as boolean}
              />
            </div>
          )}
          controls={[
            { name: 'size', type: 'enum', label: 'Size', options: SIZES, defaultValue: 'md' },
            { name: 'label', type: 'string', label: 'Label', defaultValue: 'Email address', placeholder: 'Label text' },
            { name: 'placeholder', type: 'string', label: 'Placeholder', defaultValue: 'you@compsych.com', placeholder: 'Placeholder' },
            { name: 'helperText', type: 'string', label: 'Helper text', defaultValue: '', placeholder: 'Helper text' },
            { name: 'errorText', type: 'string', label: 'Error text', defaultValue: '', placeholder: 'Error message' },
            { name: 'invalid', type: 'boolean', label: 'Invalid', defaultValue: false },
            { name: 'disabled', type: 'boolean', label: 'Disabled', defaultValue: false },
          ]}
        />
      </Section>
      <Section heading="Code Example">
        <CodeBlock code={`import { useState } from 'react';
import { View } from 'react-native';
import { Input } from '@compsych/mobile-ui';

export default function Screen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={{ padding: 16, gap: 16 }}>
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        error="Must be at least 8 characters"
      />
    </View>
  );
}`} language="tsx" />
      </Section>

      <Section heading="Sizes" lead="sm (40px), md (48px), lg (56px).">
        <Surface>
          <div className="flex flex-col gap-6 w-full max-w-sm">
            {SIZES.map((s) => (
              <div key={s} className="flex flex-col gap-1">
                <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>{s}</code>
                <Input size={s} placeholder="Placeholder" />
              </div>
            ))}
          </div>
        </Surface>
      </Section>

      <Section heading="States" lead="Default, focused (border turns primary), error (border + text turn error), disabled (opacity 0.48).">
        <Surface>
          <div className="flex flex-col gap-6 w-full max-w-sm">
            <div className="flex flex-col gap-1">
              <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>default</code>
              <Input label="Email" placeholder="you@compsych.com" helperText="We'll send a confirmation" />
            </div>
            <div className="flex flex-col gap-1">
              <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>error</code>
              <Input label="Email" placeholder="you@compsych.com" errorText="Invalid email address" />
            </div>
            <div className="flex flex-col gap-1">
              <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>disabled</code>
              <Input label="Email" placeholder="you@compsych.com" disabled />
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
