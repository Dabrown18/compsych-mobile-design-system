'use client';

import { useState, type ReactNode } from 'react';
import { MapPin, Clock, Star, Navigation } from 'lucide-react';
import { MobileBottomSheet, type BottomSheetSize } from '@/components/ds/mobile-bottom-sheet/mobile-bottom-sheet';
import { MobileListItem } from '@/components/ds/mobile-list-item/mobile-list-item';
import { PhoneFrame } from '@/components/phone-frame/phone-frame';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { CodeBlock } from '@/components/code-block/code-block';

function SheetContent() {
  return (
    <div>
      <MobileListItem headline="Get directions" leadingContent={<Navigation size={22} />} showChevron onClick={() => {}} />
      <div style={{ height: 1, background: 'var(--sys-color-outline-variant, #d7dbe0)', margin: '0 16px' }} />
      <MobileListItem headline="Save to favorites" leadingContent={<Star size={22} />} showChevron onClick={() => {}} />
      <div style={{ height: 1, background: 'var(--sys-color-outline-variant, #d7dbe0)', margin: '0 16px' }} />
      <MobileListItem headline="View hours" leadingContent={<Clock size={22} />} showChevron onClick={() => {}} />
      <div style={{ height: 1, background: 'var(--sys-color-outline-variant, #d7dbe0)', margin: '0 16px' }} />
      <MobileListItem headline="See on map" leadingContent={<MapPin size={22} />} showChevron onClick={() => {}} />
    </div>
  );
}

function BottomSheetDemo({
  size,
  title,
  showHandle,
  showOverlay,
}: {
  size: BottomSheetSize;
  title?: string;
  showHandle: boolean;
  showOverlay: boolean;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <PhoneFrame>
      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '0 16px' }}>
        <p className="ref-body" style={{ color: 'var(--sys-color-on-surface-variant, #565f6c)', margin: 0, textAlign: 'center' }}>
          Background screen content
        </p>
        <button
          type="button"
          onClick={() => setVisible(true)}
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
          Show sheet
        </button>
        <MobileBottomSheet
          visible={visible}
          onClose={() => setVisible(false)}
          title={title}
          size={size}
          showHandle={showHandle}
          showOverlay={showOverlay}
        >
          <SheetContent />
        </MobileBottomSheet>
      </div>
    </PhoneFrame>
  );
}

export default function BottomSheetPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="Bottom Sheet"
      description="A supplemental surface that slides up from the screen bottom. Use for contextual actions, details panels, or progressive disclosure — without navigating away from the current screen."
    >
      <Section heading="Playground" lead="Tap 'Show sheet' inside the simulator to preview. Tap the overlay to dismiss.">
        <MobilePlayground
          render={(values) => (
            <BottomSheetDemo
              size={values.size as BottomSheetSize}
              title={values.showTitle ? (values.title as string) : undefined}
              showHandle={values.showHandle as boolean}
              showOverlay={values.showOverlay as boolean}
            />
          )}
          controls={[
            { name: 'size', type: 'enum', label: 'Size', options: ['peek', 'half', 'full'], defaultValue: 'half' },
            { name: 'showTitle', type: 'boolean', label: 'Show title', defaultValue: true },
            { name: 'title', type: 'string', label: 'Title', defaultValue: 'Quick actions', placeholder: 'Sheet title' },
            { name: 'showHandle', type: 'boolean', label: 'Show handle', defaultValue: true },
            { name: 'showOverlay', type: 'boolean', label: 'Show overlay', defaultValue: true },
          ]}
        />
      </Section>

      <Section heading="Sizes" lead="Three size presets: peek (180px), half (55% of screen), full (90% of screen).">
        <div className="flex flex-wrap gap-8">
          {([
            { size: 'peek', label: 'peek' },
            { size: 'half', label: 'half' },
            { size: 'full', label: 'full' },
          ] as const).map(({ size, label }) => (
            <div key={size} className="flex flex-col gap-2 items-center">
              <div style={{ position: 'relative' }}>
                <PhoneFrame>
                  <div style={{ position: 'relative', height: '100%' }}>
                    <div style={{ padding: '20px 16px' }}>
                      <p className="ref-body" style={{ color: 'var(--sys-color-on-surface-variant, #565f6c)', margin: 0 }}>Background content</p>
                    </div>
                    <MobileBottomSheet title="Quick actions" size={size}>
                      <SheetContent />
                    </MobileBottomSheet>
                  </div>
                </PhoneFrame>
              </div>
              <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant, #565f6c)' }}>{label}</code>
            </div>
          ))}
        </div>
      </Section>

      <Section heading="React Native">
        <CodeBlock code={`import { useState } from 'react';
import { View, Button } from 'react-native';
import { BottomSheet } from '@compsych/mobile-ui';

export default function Screen() {
  const [open, setOpen] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Button title="Show sheet" onPress={() => setOpen(true)} />
      <BottomSheet
        visible={open}
        onClose={() => setOpen(false)}
        title="Quick actions"
        size="half"
        showHandle
        showOverlay
      >
        {/* sheet content */}
      </BottomSheet>
    </View>
  );
}`} language="tsx" />
      </Section>

      <Section heading="Canonical sources">
        <div className="flex flex-col gap-2">
          <LinkRow label="Specification" href="#" hint="specs/bottom-sheet.spec.md" />
          <LinkRow label="React Native reference" href="#" hint="reference/components/ds/mobile-bottom-sheet/" />
        </div>
      </Section>
    </FoundationPageShell>
  );
}

function Section({ heading, lead, children }: { heading: string; lead?: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1 max-w-3xl">
        <h2 className="ref-heading-lg" style={{ margin: 0 }}>{heading}</h2>
        {lead && <p className="ref-body" style={{ color: 'var(--sys-color-on-surface-variant, #565f6c)', margin: 0 }}>{lead}</p>}
      </div>
      {children}
    </section>
  );
}

function LinkRow({ label, href, hint }: { label: string; href: string; hint?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="flex items-center justify-between rounded-md px-4 py-3"
      style={{ border: '1px solid var(--sys-color-outline-variant, #d7dbe0)', backgroundColor: 'var(--sys-color-surface-container-lowest, #ffffff)', color: 'var(--sys-color-on-surface, #1b1d22)', textDecoration: 'none' }}>
      <span className="ref-body font-medium">{label}</span>
      {hint && <span className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant, #565f6c)' }}>{hint}</span>}
    </a>
  );
}
