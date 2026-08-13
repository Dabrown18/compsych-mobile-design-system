'use client';

import { useState, type ReactNode } from 'react';
import { Dialog } from '@/components/ds/mobile-dialog/mobile-dialog';
import { resolveIcon } from '@/components/ds/mobile-icon/mobile-icon';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { CodeBlock } from '@/components/code-block/code-block';
import { PhoneFrame } from '@/components/phone-frame/phone-frame';

const ExternalLink = resolveIcon('ExternalLink');

export default function MobileDialogPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="Dialog"
      description="A centered modal alert with a dimmed backdrop and fade transition — an optional icon badge, a heading, a description, and up to two action buttons. Distinct from ActionSheet, which is bottom-anchored and slides up. Use Dialog for 'confirm before you leave the app' style prompts, like an external-link disclaimer."
    >
      <Section heading="Playground" lead="Tap 'Show dialog' inside the phone frame to preview the Dialog.">
        <MobilePlayground
          render={(values) => (
            <DialogDemo
              heading={values.heading as string}
              description={values.description as string}
              primaryLabel={values.primaryLabel as string}
              secondaryLabel={(values.secondaryLabel as string) || undefined}
              showIcon={values.showIcon as boolean}
            />
          )}
          controls={[
            { name: 'heading', type: 'string', label: 'Heading', defaultValue: 'External Link Disclaimer', placeholder: 'Heading' },
            {
              name: 'description',
              type: 'string',
              label: 'Description',
              defaultValue:
                'The link you clicked will open in a new browser tab or window. ComPsych is not liable or responsible for the content of any external site.',
              placeholder: 'Description',
            },
            { name: 'primaryLabel', type: 'string', label: 'Primary action', defaultValue: 'Continue', placeholder: 'Primary' },
            { name: 'secondaryLabel', type: 'string', label: 'Secondary action', defaultValue: 'Cancel', placeholder: 'Secondary' },
            { name: 'showIcon', type: 'boolean', label: 'Show icon', defaultValue: true },
          ]}
        />
      </Section>

      <Section heading="Code Example">
        <CodeBlock
          code={`import { useState } from 'react';
import { View, Button } from 'react-native';
import { Dialog } from '@compsych/mobile-ui';
import { ExternalLink } from 'lucide-react-native';

export default function ExternalLinkScreen() {
  const [open, setOpen] = useState(false);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Open external link" onPress={() => setOpen(true)} />
      <Dialog
        visible={open}
        heading="External Link Disclaimer"
        description="The link you clicked will open in a new browser tab or window. ComPsych is not liable or responsible for the content of any external site."
        icon={<ExternalLink size={32} color="#075cba" strokeWidth={1} />}
        primaryLabel="Continue"
        secondaryLabel="Cancel"
        onPrimaryAction={() => {/* navigate to the external link */}}
        onClose={() => setOpen(false)}
      />
    </View>
  );
}`}
          language="tsx"
        />
      </Section>

      <Section heading="Anatomy" lead="Close button, icon badge, heading, description, then primary and secondary buttons — centered, not bottom-anchored.">
        <Surface>
          <div
            style={{
              width: '100%',
              maxWidth: 320,
              borderRadius: 28,
              border: '1px solid var(--sys-color-outline-variant)',
              background: 'var(--sys-color-surface-container-low)',
              padding: 24,
            }}
          >
            <DialogContent
              heading="External Link Disclaimer"
              description="The link you clicked will open in a new browser tab or window. ComPsych is not liable or responsible for the content of any external site."
              showIcon
            />
          </div>
        </Surface>
      </Section>
    </FoundationPageShell>
  );
}

function DialogDemo({
  heading,
  description,
  primaryLabel,
  secondaryLabel,
  showIcon,
}: {
  heading: string;
  description: string;
  primaryLabel: string;
  secondaryLabel?: string;
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
          Show dialog
        </button>
        <Dialog
          visible={open}
          heading={heading}
          description={description}
          primaryLabel={primaryLabel}
          secondaryLabel={secondaryLabel}
          icon={showIcon && ExternalLink ? <ExternalLink size={32} color="var(--sys-color-primary)" strokeWidth={1} /> : undefined}
          onPrimaryAction={() => setOpen(false)}
          onClose={() => setOpen(false)}
        />
      </div>
    </PhoneFrame>
  );
}

function DialogContent({
  heading,
  description,
  showIcon,
}: {
  heading: string;
  description: string;
  showIcon: boolean;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      {showIcon && ExternalLink && (
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: '50%',
            border: '1px solid color-mix(in srgb, var(--sys-color-primary) 8%, transparent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 4,
          }}
        >
          <div
            style={{
              width: 84,
              height: 84,
              borderRadius: '50%',
              background: 'color-mix(in srgb, var(--sys-color-primary) 8%, transparent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ExternalLink size={32} color="var(--sys-color-primary)" strokeWidth={1} />
          </div>
        </div>
      )}
      <p style={{ margin: 0, fontSize: 17, fontWeight: 600, textAlign: 'center', color: 'var(--sys-color-on-surface)' }}>{heading}</p>
      <p style={{ margin: 0, fontSize: 14, textAlign: 'center', color: 'var(--sys-color-on-surface-variant)' }}>{description}</p>
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
