'use client';

import { useState, type ReactNode } from 'react';
import { Snackbar, type SnackbarVariant } from '@/components/ds/mobile-snackbar/mobile-snackbar';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { CodeBlock } from '@/components/code-block/code-block';

const VARIANTS: SnackbarVariant[] = ['filled', 'outlined'];

function SnackbarDemo({ message, variant, actionLabel }: { message: string; variant: SnackbarVariant; actionLabel?: string }) {
  const [visible, setVisible] = useState(true);
  return (
    <div style={{
      width: 375,
      maxWidth: '100%',
      position: 'relative',
      minHeight: 180,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
      padding: '24px 0',
    }}>
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        style={{
          height: 44,
          paddingInline: 24,
          borderRadius: 9999,
          border: 'none',
          background: 'var(--sys-color-primary)',
          color: 'var(--sys-color-on-primary)',
          fontSize: 15,
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        {visible ? 'Hide snackbar' : 'Show snackbar'}
      </button>
      <div style={{
        position: 'absolute',
        bottom: 16,
        left: 16,
        right: 16,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 200ms ease, transform 200ms ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}>
        <Snackbar
          visible
          message={message}
          variant={variant}
          actionLabel={actionLabel}
          onAction={() => setVisible(false)}
          onClose={() => setVisible(false)}
        />
      </div>
    </div>
  );
}

export default function MobileSnackbarPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="Snackbar"
      description="A transient notification that appears at the bottom of the screen. Two variants: filled (dark primary-container surface) and outlined (white surface with outline-variant border and shadow). Optional action button provides a single recovery path. Controlled by visible — dismiss with onClose."
    >
      <Section heading="Playground" lead="Tap 'Show snackbar' inside the phone frame to preview.">
        <MobilePlayground
          render={(values) => (
            <SnackbarDemo
              message={values.message as string}
              variant={values.variant as SnackbarVariant}
              actionLabel={values.actionLabel as string || undefined}
            />
          )}
          controls={[
            { name: 'variant', type: 'enum', label: 'Variant', options: VARIANTS, defaultValue: 'filled' },
            { name: 'message', type: 'string', label: 'Message', defaultValue: 'Appointment saved', placeholder: 'Message' },
            { name: 'actionLabel', type: 'string', label: 'Action label', defaultValue: 'Undo', placeholder: 'Button label' },
          ]}
        />
      </Section>
      <Section heading="Code Example">
        <CodeBlock code={`import { useState } from 'react';
import { View, Button } from 'react-native';
import { Snackbar } from '@compsych/mobile-ui';

export default function Screen() {
  const [visible, setVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Button title="Save changes" onPress={() => setVisible(true)} />
      <Snackbar
        message="Changes saved successfully"
        visible={visible}
        onDismiss={() => setVisible(false)}
        action={{ label: 'Undo', onPress: () => {} }}
      />
    </View>
  );
}`} language="tsx" />
      </Section>

      <Section heading="Variants" lead="Static preview of both variants.">
        <Surface>
          <div className="flex flex-col gap-4 w-full max-w-sm">
            {VARIANTS.map((v) => (
              <div key={v} className="flex flex-col gap-2">
                <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>{v}</code>
                <Snackbar visible message="Appointment saved" variant={v} actionLabel="Undo" />
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
    <div className="rounded-lg p-8 flex items-start justify-center"
      style={{ border: '1px solid var(--sys-color-outline-variant)', backgroundColor: 'var(--sys-color-surface-container-low)' }}>
      {children}
    </div>
  );
}
