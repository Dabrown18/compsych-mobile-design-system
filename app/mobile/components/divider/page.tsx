'use client';

import type { ReactNode } from 'react';
import { Divider } from '@/components/ds/mobile-divider/mobile-divider';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { CodeBlock } from '@/components/code-block/code-block';

export default function MobileDividerPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="Divider"
      description="A thin rule for separating related content. Supports horizontal and vertical orientations, thin (1px) and thick (2px) weight, and an optional dashed style. Colour resolves to sys.color.outline-variant."
    >
      <Section heading="Playground" lead="Adjust variant, weight, and dashed to see every combination.">
        <MobilePlayground
          render={(values) => (
            <div style={{ padding: 24, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {values.variant === 'vertical' ? (
                <div style={{ display: 'flex', height: 80, alignItems: 'center', gap: 16 }}>
                  <span style={{ fontSize: 14, color: 'var(--sys-color-on-surface-variant)' }}>Left</span>
                  <Divider variant="vertical" weight={values.weight as 'thin' | 'thick'} dashed={values.dashed as boolean} />
                  <span style={{ fontSize: 14, color: 'var(--sys-color-on-surface-variant)' }}>Right</span>
                </div>
              ) : (
                <div style={{ width: '100%' }}>
                  <Divider variant="horizontal" weight={values.weight as 'thin' | 'thick'} dashed={values.dashed as boolean} />
                </div>
              )}
            </div>
          )}
          controls={[
            { name: 'variant', type: 'enum', label: 'Variant', options: ['horizontal', 'vertical'], defaultValue: 'horizontal' },
            { name: 'weight', type: 'enum', label: 'Weight', options: ['thin', 'thick'], defaultValue: 'thin' },
            { name: 'dashed', type: 'boolean', label: 'Dashed', defaultValue: false },
          ]}
        />
      </Section>

      <Section heading="Variants">
        <Surface>
          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-2">
              <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>horizontal thin</code>
              <Divider />
            </div>
            <div className="flex flex-col gap-2">
              <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>horizontal thick</code>
              <Divider weight="thick" />
            </div>
            <div className="flex flex-col gap-2">
              <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>horizontal dashed</code>
              <Divider dashed />
            </div>
            <div className="flex flex-col gap-2">
              <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>vertical</code>
              <div style={{ display: 'flex', height: 48, alignItems: 'center', gap: 16 }}>
                <span style={{ fontSize: 14, color: 'var(--sys-color-on-surface-variant)' }}>Section A</span>
                <Divider variant="vertical" />
                <span style={{ fontSize: 14, color: 'var(--sys-color-on-surface-variant)' }}>Section B</span>
              </div>
            </div>
          </div>
        </Surface>
      </Section>

      <Section heading="React Native">
        <CodeBlock code={`import { View } from 'react-native';
import { Divider } from '@compsych/mobile-ui';

export default function Screen() {
  return (
    <View style={{ padding: 16, gap: 16 }}>
      {/* Full-width */}
      <Divider />

      {/* Inset — indented from left */}
      <Divider inset />

      {/* Vertical inside a row */}
      <View style={{ flexDirection: 'row', height: 24, alignItems: 'center', gap: 12 }}>
        <Divider orientation="vertical" />
      </View>
    </View>
  );
}`} language="tsx" />
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
