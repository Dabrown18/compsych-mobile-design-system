'use client';

import { useState, type ReactNode } from 'react';
import { ActionSheet } from '@/components/ds/mobile-action-sheet/mobile-action-sheet';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { PhoneFrame } from '@/components/phone-frame/phone-frame';

export default function MobileActionSheetPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="ActionSheet"
      description="A bottom-up modal surface for presenting a focused set of actions. Includes a drag handle, optional title, optional body content, and up to two action buttons (primary + secondary). Tapping the overlay or swiping down closes the sheet."
    >
      <Section heading="Playground" lead="Tap 'Show sheet' inside the phone frame to preview the ActionSheet.">
        <MobilePlayground
          render={(values) => (
            <ActionSheetDemo
              title={values.title as string || undefined}
              primaryLabel={values.primaryLabel as string}
              secondaryLabel={values.secondaryLabel as string}
              destructive={values.destructive as boolean}
            />
          )}
          controls={[
            { name: 'title', type: 'string', label: 'Title', defaultValue: 'Cancel appointment?', placeholder: 'Sheet title' },
            { name: 'primaryLabel', type: 'string', label: 'Primary action', defaultValue: 'Yes, cancel', placeholder: 'Primary' },
            { name: 'secondaryLabel', type: 'string', label: 'Secondary action', defaultValue: 'Keep appointment', placeholder: 'Secondary' },
            { name: 'destructive', type: 'boolean', label: 'Primary is destructive', defaultValue: true },
          ]}
        />
      </Section>

      <Section heading="Anatomy">
        <Surface>
          <div style={{ width: '100%', maxWidth: 360, borderRadius: 20, border: '1px solid var(--sys-color-outline-variant)', background: 'var(--sys-color-surface-container-low)', padding: '8px 16px 32px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ alignSelf: 'center', width: 36, height: 4, borderRadius: 2, background: 'var(--sys-color-outline-variant)' }} />
            <p style={{ margin: '4px 0', textAlign: 'center', fontSize: 17, fontWeight: 600, color: 'var(--sys-color-on-surface)' }}>Cancel appointment?</p>
            <p style={{ margin: '0 0 4px', fontSize: 14, color: 'var(--sys-color-on-surface-variant)', textAlign: 'center' }}>This action cannot be undone.</p>
            <div style={{ height: 48, borderRadius: 9999, background: 'var(--sys-color-error)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--sys-color-on-error)', fontSize: 16, fontWeight: 600 }}>Yes, cancel</div>
            <div style={{ height: 48, borderRadius: 9999, border: '1px solid var(--sys-color-outline)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--sys-color-on-surface)', fontSize: 16 }}>Keep appointment</div>
          </div>
        </Surface>
      </Section>
    </FoundationPageShell>
  );
}

function ActionSheetDemo({ title, primaryLabel, secondaryLabel, destructive }: { title?: string; primaryLabel: string; secondaryLabel: string; destructive: boolean }) {
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
          Show sheet
        </button>
        <ActionSheet
          visible={open}
          onClose={() => setOpen(false)}
          title={title}
          primaryAction={{ label: primaryLabel, destructive, onPress: () => setOpen(false) }}
          secondaryAction={{ label: secondaryLabel, onPress: () => setOpen(false) }}
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
