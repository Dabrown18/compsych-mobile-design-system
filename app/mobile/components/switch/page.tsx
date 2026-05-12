'use client';

import type { ReactNode } from 'react';
import { Switch } from '@/components/ds/mobile-switch/mobile-switch';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { CodeBlock } from '@/components/code-block/code-block';

export default function MobileSwitchPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="Switch"
      description="Binary on/off toggle. Supports controlled (value + onValueChange) and uncontrolled (defaultValue) usage. Visual transition animates the thumb between states. All visual properties resolve to sys.* tokens."
    >
      <Section heading="Playground" lead="Toggle the value control to round-trip the interaction in the phone frame.">
        <MobilePlayground
          render={(values, setValue) => (
            <div style={{ padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Switch
                value={values.value as boolean}
                onValueChange={(v) => setValue('value', v)}
                disabled={values.disabled as boolean}
              />
            </div>
          )}
          controls={[
            { name: 'value', type: 'boolean', label: 'Value', defaultValue: false },
            { name: 'disabled', type: 'boolean', label: 'Disabled', defaultValue: false },
          ]}
        />
      </Section>
      <Section heading="Code Example">
        <CodeBlock code={`import { useState } from 'react';
import { View } from 'react-native';
import { Switch } from '@compsych/mobile-ui';

export default function Screen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={{ padding: 16, gap: 16 }}>
      <Switch
        value={notifications}
        onValueChange={setNotifications}
        label="Push notifications"
      />
      <Switch
        value={darkMode}
        onValueChange={setDarkMode}
        label="Dark mode"
      />
      <Switch value disabled label="Managed by admin" />
    </View>
  );
}`} language="tsx" />
      </Section>

      <Section heading="States" lead="Off (default), on (toggled), and disabled.">
        <Surface>
          <div className="flex gap-8 items-center">
            <div className="flex flex-col items-center gap-2">
              <Switch defaultValue={false} />
              <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>off</code>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Switch defaultValue={true} />
              <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>on</code>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Switch defaultValue={false} disabled />
              <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>disabled</code>
            </div>
          </div>
        </Surface>
      </Section>

      <Section heading="In context" lead="Typical usage inside a settings list row.">
        <Surface>
          <div style={{ width: '100%', maxWidth: 320, display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              { label: 'Enable notifications', sub: 'Get reminders before appointments' },
              { label: 'Allow SMS', sub: 'Receive text reminders' },
              { label: 'Auto-renew sessions', sub: 'Book follow-up automatically' },
            ].map((row, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 0',
                borderBottom: i < 2 ? '1px solid var(--sys-color-outline-variant)' : 'none',
              }}>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 15, color: 'var(--sys-color-on-surface)' }}>{row.label}</p>
                  <p style={{ margin: 0, fontSize: 12, color: 'var(--sys-color-on-surface-variant)' }}>{row.sub}</p>
                </div>
                <Switch defaultValue={i === 0} />
              </div>
            ))}
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
    <div className="rounded-lg p-8 flex items-center justify-center"
      style={{ border: '1px solid var(--sys-color-outline-variant)', backgroundColor: 'var(--sys-color-surface-container-low)' }}>
      {children}
    </div>
  );
}
