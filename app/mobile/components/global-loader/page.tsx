'use client';

import { useState, type ReactNode } from 'react';
import { GlobalLoader } from '@/components/ds/mobile-global-loader/mobile-global-loader';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { CodeBlock } from '@/components/code-block/code-block';
import { PhoneFrame } from '@/components/phone-frame/phone-frame';

export default function MobileGlobalLoaderPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="GlobalLoader"
      description="A full-screen, blocking spinner overlay for in-flight async work — a dimmed backdrop with a centered spinner. Renders nothing when not visible. How the app decides when to show it (a global loading service, a screen's own request state, etc.) is a consumer concern, not part of this component."
    >
      <Section heading="Playground" lead="Tap the button inside the phone frame to toggle the loader.">
        <MobilePlayground
          render={() => <GlobalLoaderDemo />}
          controls={[]}
        />
      </Section>
      <Section heading="Code Example">
        <CodeBlock code={`import { useState } from 'react';
import { Button, View } from 'react-native';
import { GlobalLoader } from '@compsych/mobile-ui';

export default function Screen() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await submitForm();
    setLoading(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <Button title="Submit" onPress={handleSubmit} />
      <GlobalLoader visible={loading} />
    </View>
  );
}`} language="tsx" />
      </Section>

      <Section heading="Anatomy" lead="Dimmed full-screen backdrop with a centered spinner. Renders nothing when visible is false.">
        <Surface>
          <PhoneFrame>
            <div style={{ position: 'relative', height: '100%' }}>
              <GlobalLoader visible />
            </div>
          </PhoneFrame>
        </Surface>
      </Section>
    </FoundationPageShell>
  );
}

function GlobalLoaderDemo() {
  const [visible, setVisible] = useState(false);

  return (
    <PhoneFrame>
      <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          style={{
            height: 44, paddingInline: 24, borderRadius: 9999,
            border: 'none', background: 'var(--sys-color-primary)',
            color: 'var(--sys-color-on-primary)', fontSize: 15, fontWeight: 600, cursor: 'pointer',
          }}
        >
          {visible ? 'Hide loader' : 'Show loader'}
        </button>
        <GlobalLoader visible={visible} />
      </div>
    </PhoneFrame>
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
