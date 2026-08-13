'use client';

import { useState, type ReactNode } from 'react';
import { WebViewModal } from '@/components/ds/mobile-web-view-modal/mobile-web-view-modal';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { CodeBlock } from '@/components/code-block/code-block';
import { PhoneFrame } from '@/components/phone-frame/phone-frame';

export default function MobileWebViewModalPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="WebViewModal"
      description="A fullscreen modal for showing external or embedded web content without leaving the app. Includes a back-button header, a loading state while the page loads, and an error state with retry/close actions. App-specific behavior — auth header injection, analytics, session-timeout handling — is left to the consuming screen via props, not baked into the component."
    >
      <Section heading="Playground" lead="Tap 'Open link' inside the phone frame to preview the modal.">
        <MobilePlayground
          render={(values) => (
            <WebViewModalDemo
              url={values.url as string}
              title={values.title as string || undefined}
            />
          )}
          controls={[
            { name: 'url', type: 'string', label: 'URL', defaultValue: 'https://example.com', placeholder: 'https://example.com' },
            { name: 'title', type: 'string', label: 'Header title', defaultValue: 'Help', placeholder: 'e.g. Help' },
          ]}
        />
      </Section>
      <Section heading="Code Example">
        <CodeBlock code={`import { useState } from 'react';
import { Button, View } from 'react-native';
import { WebViewModal } from '@compsych/mobile-ui';

export default function Screen() {
  const [open, setOpen] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Button title="Open help" onPress={() => setOpen(true)} />
      <WebViewModal
        visible={open}
        url="https://example.com/help"
        title="Help"
        onClose={() => setOpen(false)}
        // App-specific concerns are composed on top via props:
        headers={{ Cookie: myAuthCookie }}
        onMessage={handlePostMessage}
        onError={(message) => logToSentry(message)}
      />
    </View>
  );
}`} language="tsx" />
      </Section>

      <Section heading="Anatomy" lead="Header with back button and title, WebView content, loading overlay, and an error state with retry/close actions (not shown here — see Playground with an unreachable URL).">
        <Surface>
          <PhoneFrame>
            <WebViewModal
              visible
              url="about:blank"
              title="Help"
              onClose={() => {}}
            />
          </PhoneFrame>
        </Surface>
      </Section>
    </FoundationPageShell>
  );
}

function WebViewModalDemo({ url, title }: { url: string; title?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <PhoneFrame>
      <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{
            height: 44, paddingInline: 24, borderRadius: 9999,
            border: 'none', background: 'var(--sys-color-primary)',
            color: 'var(--sys-color-on-primary)', fontSize: 15, fontWeight: 600, cursor: 'pointer',
          }}
        >
          Open link
        </button>
        <WebViewModal
          visible={open}
          url={url}
          title={title}
          onClose={() => setOpen(false)}
        />
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
