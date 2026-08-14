'use client';

import { useState, type ReactNode } from 'react';
import { CrisisCloseModal } from '@/components/ds/mobile-crisis-close-modal/mobile-crisis-close-modal';
import { resolveIcon } from '@/components/ds/mobile-icon/mobile-icon';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { CodeBlock } from '@/components/code-block/code-block';
import { PhoneFrame } from '@/components/phone-frame/phone-frame';

const ShieldAlert = resolveIcon('ShieldAlert');

const DEFAULT_CTAS = [
  { id: 'call911', label: 'Call 911', subtitle: 'Emergency services', tone: 'danger' as const },
  { id: 'call988', label: 'Call 988', subtitle: 'Suicide & Crisis Lifeline', tone: 'danger' as const },
  { id: 'clinician', label: 'Call your clinician', subtitle: undefined, tone: 'warning' as const },
  { id: 'safe', label: "I'm safe", subtitle: undefined, tone: 'primary' as const },
];

export default function MobileCrisisCloseModalPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="CrisisCloseModal"
      description="A centered modal alert for crisis-exit confirmation flows — an icon badge, a title, a description, and a flexible list of CTAs (each with its own color tone and optional subtitle), rather than Dialog's fixed 2-button footer. Shares Dialog's chrome (backdrop, fade, close button, icon circle); the only difference is the footer. All text and callbacks are props — no internal data-fetching or translation, so the consuming app resolves its own content."
    >
      <Section heading="Playground" lead="Tap 'Trigger crisis close' inside the phone frame to preview the modal.">
        <MobilePlayground
          render={(values) => (
            <CrisisCloseModalDemo
              title={values.title as string}
              description={values.description as string}
              showIcon={values.showIcon as boolean}
            />
          )}
          controls={[
            { name: 'title', type: 'string', label: 'Title', defaultValue: 'Need to talk to someone right now?', placeholder: 'Title' },
            {
              name: 'description',
              type: 'string',
              label: 'Description',
              defaultValue: 'If you are in crisis, help is available right now.',
              placeholder: 'Description',
            },
            { name: 'showIcon', type: 'boolean', label: 'Show icon', defaultValue: true },
          ]}
        />
      </Section>

      <Section heading="Code Example">
        <CodeBlock
          code={`import { useState } from 'react';
import { View, Button } from 'react-native';
import { CrisisCloseModal } from '@compsych/mobile-ui';
import { ShieldAlert } from 'lucide-react-native';

export default function AssistantChatScreen() {
  const [crisisModalVisible, setCrisisModalVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Button title="Trigger crisis close" onPress={() => setCrisisModalVisible(true)} />
      <CrisisCloseModal
        visible={crisisModalVisible}
        title="Need to talk to someone right now?"
        description="If you are in crisis, help is available right now."
        icon={<ShieldAlert size={28} color="#570f0f" />}
        ctas={[
          { id: 'call911', label: 'Call 911', subtitle: 'Emergency services', tone: 'danger', onPress: () => {/* Linking.openURL('tel:911') */} },
          { id: 'call988', label: 'Call 988', subtitle: 'Suicide & Crisis Lifeline', tone: 'danger', onPress: () => {/* Linking.openURL('tel:988') */} },
          { id: 'clinician', label: 'Call your clinician', tone: 'warning', onPress: () => {/* Linking.openURL(clinicianPhoneUri) */} },
          { id: 'safe', label: "I'm safe", tone: 'primary', onPress: () => setCrisisModalVisible(false) },
        ]}
        onClose={() => setCrisisModalVisible(false)}
      />
    </View>
  );
}`}
          language="tsx"
        />
      </Section>

      <Section heading="Anatomy" lead="Close button, icon badge, title, description, then a flexible list of color-coded CTAs — centered, not bottom-anchored, same chrome as Dialog.">
        <Surface>
          <div
            style={{
              width: '100%',
              maxWidth: 320,
              borderRadius: 28,
              border: '1px solid var(--sys-color-outline-variant)',
              background: 'var(--sys-color-surface-container-low)',
              padding: '16px 0 24px',
            }}
          >
            <CrisisCloseModalContent showIcon />
          </div>
        </Surface>
      </Section>
    </FoundationPageShell>
  );
}

function CrisisCloseModalDemo({
  title,
  description,
  showIcon,
}: {
  title: string;
  description: string;
  showIcon: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <PhoneFrame>
      <div
        style={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          padding: '0 16px',
        }}
      >
        <p className="ref-body" style={{ color: 'var(--sys-color-on-surface-variant)', margin: 0, textAlign: 'center' }}>
          Background screen content
        </p>
        <button
          type="button"
          onClick={() => setOpen(true)}
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
          Trigger crisis close
        </button>
        <CrisisCloseModal
          visible={open}
          title={title}
          description={description}
          icon={showIcon && ShieldAlert ? <ShieldAlert size={28} color="var(--sys-color-error)" /> : undefined}
          ctas={DEFAULT_CTAS.map((cta) => ({ ...cta, onPress: () => setOpen(false) }))}
          onClose={() => setOpen(false)}
        />
      </div>
    </PhoneFrame>
  );
}

function CrisisCloseModalContent({ showIcon }: { showIcon: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '0 16px' }}>
        {showIcon && ShieldAlert && (
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              border: '1px solid var(--sys-color-error-container)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ShieldAlert size={28} color="var(--sys-color-error)" />
          </div>
        )}
        <p style={{ margin: 0, fontSize: 17, fontWeight: 600, textAlign: 'center', color: 'var(--sys-color-on-surface)' }}>
          Need to talk to someone right now?
        </p>
        <p style={{ margin: 0, fontSize: 14, textAlign: 'center', color: 'var(--sys-color-on-surface-variant)' }}>
          If you are in crisis, help is available right now.
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 16px' }}>
        {DEFAULT_CTAS.map((cta) => {
          const bg =
            cta.tone === 'danger'
              ? 'var(--sys-color-error-container)'
              : cta.tone === 'warning'
                ? 'var(--sys-color-warning-container)'
                : 'var(--sys-color-primary)';
          const color =
            cta.tone === 'danger'
              ? 'var(--sys-color-on-error-container)'
              : cta.tone === 'warning'
                ? 'var(--sys-color-on-warning-container)'
                : 'var(--sys-color-on-primary)';
          return (
            <div
              key={cta.id}
              style={{
                borderRadius: 9999,
                background: bg,
                color,
                paddingBlock: 8,
                paddingInline: 24,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 600 }}>{cta.label}</span>
              {cta.subtitle && <span style={{ fontSize: 12 }}>{cta.subtitle}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Section({ heading, lead, children }: { heading: string; lead?: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1 max-w-3xl">
        <h2 className="ref-heading-lg" style={{ margin: 0 }}>
          {heading}
        </h2>
        {lead && (
          <p className="ref-body" style={{ color: 'var(--sys-color-on-surface-variant)', margin: 0 }}>
            {lead}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}

function Surface({ children }: { children: ReactNode }) {
  return (
    <div
      className="rounded-lg p-8 flex items-center justify-center"
      style={{ border: '1px solid var(--sys-color-outline-variant)', backgroundColor: 'var(--sys-color-surface-container-low)' }}
    >
      {children}
    </div>
  );
}
