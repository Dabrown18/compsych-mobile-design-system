'use client';

import { useState, type ReactNode } from 'react';
import { InfoActionSheet } from '@/components/ds/mobile-info-action-sheet/mobile-info-action-sheet';
import { resolveIcon } from '@/components/ds/mobile-icon/mobile-icon';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { CodeBlock } from '@/components/code-block/code-block';
import { PhoneFrame } from '@/components/phone-frame/phone-frame';

const Phone = resolveIcon('Phone');

export default function MobileInfoActionSheetPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="InfoActionSheet"
      description="An ActionSheet preset for a single piece of informational content — an optional icon badge, a heading, a description, an optional highlighted callout (e.g. a phone number), and up to two action buttons. Useful for 'here's how to reach someone' or 'here's what happens next' prompts."
    >
      <Section heading="Playground" lead="Tap 'Show sheet' inside the phone frame to preview the InfoActionSheet.">
        <MobilePlayground
          render={(values) => (
            <InfoActionSheetDemo
              heading={values.heading as string}
              description={values.description as string}
              alertText={(values.alertText as string) || undefined}
              primaryLabel={values.primaryLabel as string}
              secondaryLabel={values.secondaryLabel as string}
              showIcon={values.showIcon as boolean}
            />
          )}
          controls={[
            { name: 'heading', type: 'string', label: 'Heading', defaultValue: 'Ask for a GuidanceConsultant', placeholder: 'Heading' },
            {
              name: 'description',
              type: 'string',
              label: 'Description',
              defaultValue: 'A GuidanceConsultant is here to connect you to a wide range of helpful services, products, and resources to support your unique needs.',
              placeholder: 'Description',
            },
            { name: 'alertText', type: 'string', label: 'Callout text', defaultValue: 'You can reach a GuidanceConsultant at this number for a confidential consultation:', placeholder: 'Callout text' },
            { name: 'primaryLabel', type: 'string', label: 'Primary action', defaultValue: 'Call 833-927-1863', placeholder: 'Primary' },
            { name: 'secondaryLabel', type: 'string', label: 'Secondary action', defaultValue: 'Cancel', placeholder: 'Secondary' },
            { name: 'showIcon', type: 'boolean', label: 'Show icon', defaultValue: true },
          ]}
        />
      </Section>
      <Section heading="Code Example">
        <CodeBlock code={`import { useState } from 'react';
import { View, Button } from 'react-native';
import { InfoActionSheet } from '@compsych/mobile-ui';
import { Phone } from 'lucide-react-native';

export default function ConnectScreen() {
  const [open, setOpen] = useState(false);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Talk with an expert" onPress={() => setOpen(true)} />
      <InfoActionSheet
        visible={open}
        title="Talk with an Expert"
        heading="Ask for a GuidanceConsultant"
        description="A GuidanceConsultant is here to connect you to helpful resources."
        alertText="You can reach a GuidanceConsultant at this number:"
        primaryLabel="Call 833-927-1863"
        secondaryLabel="Cancel"
        icon={<Phone size={48} color="#075cba" strokeWidth={1.5} />}
        onClose={() => setOpen(false)}
        onPrimaryAction={() => {/* dial the number */}}
      />
    </View>
  );
}`} language="tsx" />
      </Section>

      <Section heading="Anatomy" lead="Icon badge, heading, description, optional callout box, then primary and secondary buttons.">
        <Surface>
          <div style={{ width: '100%', maxWidth: 360, borderRadius: 20, border: '1px solid var(--sys-color-outline-variant)', background: 'var(--sys-color-surface-container-low)', padding: '16px' }}>
            <InfoActionSheetContent
              heading="Ask for a GuidanceConsultant"
              description="A GuidanceConsultant is here to connect you to a wide range of helpful services, products, and resources to support your unique needs."
              alertText="You can reach a GuidanceConsultant at this number for a confidential consultation:"
              showIcon
            />
          </div>
        </Surface>
      </Section>
    </FoundationPageShell>
  );
}

function InfoActionSheetDemo({
  heading,
  description,
  alertText,
  primaryLabel,
  secondaryLabel,
  showIcon,
}: {
  heading: string;
  description: string;
  alertText?: string;
  primaryLabel: string;
  secondaryLabel: string;
  showIcon: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <PhoneFrame>
      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '0 16px' }}>
        <p className="ref-body" style={{ color: 'var(--sys-color-on-surface-variant)', margin: 0, textAlign: 'center' }}>
          Background screen content
        </p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{
            height: 44, paddingInline: 24, borderRadius: 9999,
            border: 'none', background: 'var(--sys-color-primary)',
            color: 'var(--sys-color-on-primary)', fontSize: 15, fontWeight: 600, cursor: 'pointer',
          }}
        >
          Talk with an expert
        </button>
        <InfoActionSheet
          visible={open}
          title="Talk with an Expert"
          heading={heading}
          description={description}
          alertText={alertText}
          primaryLabel={primaryLabel}
          secondaryLabel={secondaryLabel}
          icon={showIcon && Phone ? <Phone size={48} color="var(--sys-color-primary)" /> : undefined}
          onClose={() => setOpen(false)}
          onPrimaryAction={() => setOpen(false)}
        />
      </div>
    </PhoneFrame>
  );
}

function InfoActionSheetContent({
  heading,
  description,
  alertText,
  showIcon,
}: {
  heading: string;
  description: string;
  alertText?: string;
  showIcon: boolean;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      {showIcon && Phone && (
        <div style={{ width: 120, height: 120, borderRadius: '50%', border: '1px solid color-mix(in srgb, var(--sys-color-primary) 8%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
          <div style={{ width: 108, height: 108, borderRadius: '50%', background: 'color-mix(in srgb, var(--sys-color-primary) 8%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Phone size={48} color="var(--sys-color-primary)" />
          </div>
        </div>
      )}
      <p style={{ margin: 0, fontSize: 17, fontWeight: 600, textAlign: 'center', color: 'var(--sys-color-on-surface)' }}>{heading}</p>
      <p style={{ margin: 0, fontSize: 14, textAlign: 'center', color: 'var(--sys-color-on-surface-variant)' }}>{description}</p>
      {alertText && (
        <div style={{ width: '100%', borderRadius: 12, padding: '12px 16px', background: 'var(--sys-color-info-container)' }}>
          <p style={{ margin: 0, fontSize: 14, textAlign: 'center', color: 'var(--sys-color-on-info-container)' }}>{alertText}</p>
        </div>
      )}
    </div>
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
