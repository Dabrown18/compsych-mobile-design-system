'use client';

import type { ReactNode } from 'react';
import { Button, type ButtonVariant, type ButtonSize } from '@/components/ds/mobile-button/mobile-button';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { CodeBlock } from '@/components/code-block/code-block';

const VARIANTS: ButtonVariant[] = ['filled', 'tonal', 'outlined', 'elevated', 'text', 'danger', 'danger-outlined'];
const SIZES: ButtonSize[] = ['sm', 'md', 'lg', 'xl'];

export default function MobileButtonPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="Button"
      description="Primary interactive element for mobile surfaces. Seven visual variants cover every emphasis level. All four sizes meet the 48 dp minimum tap target at lg/xl. Supports loading state, icon-only mode, and full-width layout."
    >
      <Section heading="Playground" lead="Adjust any control to see the component update in the phone frame.">
        <MobilePlayground
          render={(values) => (
            <div style={{ padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Button
                variant={values.variant as ButtonVariant}
                size={values.size as ButtonSize}
                label={values.label as string}
                disabled={values.disabled as boolean}
                loading={values.loading as boolean}
              />
            </div>
          )}
          controls={[
            { name: 'variant', type: 'enum', label: 'Variant', options: VARIANTS, defaultValue: 'filled' },
            { name: 'size', type: 'enum', label: 'Size', options: SIZES, defaultValue: 'md' },
            { name: 'label', type: 'string', label: 'Label', defaultValue: 'Schedule Appointment', placeholder: 'Button label' },
            { name: 'disabled', type: 'boolean', label: 'Disabled', defaultValue: false },
            { name: 'loading', type: 'boolean', label: 'Loading', defaultValue: false },
          ]}
        />
      </Section>
      <Section heading="Code Example">
        <CodeBlock code={`import { View } from 'react-native';
import { Button } from '@compsych/mobile-ui';

export default function Screen() {
  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Button label="Continue" variant="filled" onPress={() => {}} />
      <Button label="Learn more" variant="outlined" onPress={() => {}} />
      <Button label="Dismiss" variant="text" onPress={() => {}} />
      <Button label="Save" variant="tonal" loading onPress={() => {}} />
    </View>
  );
}`} language="tsx" />
      </Section>

      <Section heading="Variants" lead="Seven variants spanning filled → text and danger tones.">
        <Surface>
          <div className="flex flex-col gap-4 w-full max-w-xs">
            {VARIANTS.map((v) => (
              <div key={v} className="flex flex-col gap-1">
                <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>{v}</code>
                <Button variant={v} label={v.charAt(0).toUpperCase() + v.slice(1)} />
              </div>
            ))}
          </div>
        </Surface>
      </Section>

      <Section heading="Sizes" lead="sm (32px), md (40px), lg (48px), xl (56px).">
        <Surface>
          <div className="flex flex-col gap-4 w-full max-w-xs items-start">
            {SIZES.map((s) => (
              <div key={s} className="flex items-center gap-4 w-full">
                <code className="ref-caption font-mono w-6 shrink-0" style={{ color: 'var(--sys-color-on-surface-variant)' }}>{s}</code>
                <Button size={s} label="Schedule" />
              </div>
            ))}
          </div>
        </Surface>
      </Section>

      <Section heading="States">
        <Surface>
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <Button label="Default" />
            <Button label="Loading" loading />
            <Button label="Disabled" disabled />
            <Button label="Full Width" fullWidth style={{ maxWidth: 200 }} />
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
