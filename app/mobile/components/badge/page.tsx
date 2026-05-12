'use client';

import type { ReactNode } from 'react';
import { Badge, type BadgeSize, type BadgeStyle } from '@/components/ds/mobile-badge/mobile-badge';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { CodeBlock } from '@/components/code-block/code-block';

const STYLES: BadgeStyle[] = ['filled', 'positive', 'danger', 'elevated', 'tonal', 'dot'];
const SIZES: BadgeSize[] = ['sm', 'md', 'lg'];

export default function MobileBadgePage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="Badge"
      description="Compact indicator for counts, status, and notification states. Six semantic styles cover every use case. All colours resolve through sys.* tokens and re-theme automatically."
    >
      <Section heading="Playground" lead="Adjust badgeStyle, size, and label to preview every combination.">
        <MobilePlayground
          render={(values) => (
            <div style={{ padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Badge
                badgeStyle={values.badgeStyle as BadgeStyle}
                size={values.size as BadgeSize}
                label={values.badgeStyle === 'dot' ? undefined : values.label as string}
              />
            </div>
          )}
          controls={[
            { name: 'badgeStyle', type: 'enum', label: 'Badge Style', options: STYLES, defaultValue: 'filled' },
            { name: 'size', type: 'enum', label: 'Size', options: SIZES, defaultValue: 'md' },
            { name: 'label', type: 'string', label: 'Label', defaultValue: '9', placeholder: '0–99+' },
          ]}
        />
      </Section>
      <Section heading="Code Example">
        <CodeBlock code={`import { View } from 'react-native';
import { Badge } from '@compsych/mobile-ui';

export default function Screen() {
  return (
    <View style={{ flexDirection: 'row', gap: 8, padding: 16 }}>
      <Badge label="New" badgeStyle="filled" />
      <Badge label="3" badgeStyle="danger" size="sm" />
      <Badge label="Active" badgeStyle="positive" />
      <Badge badgeStyle="dot" />
    </View>
  );
}`} language="tsx" />
      </Section>

      <Section heading="Styles" lead="Six visual styles — filled (primary), positive (success), danger (error), elevated (surface + shadow), tonal (surface-container), dot (presence indicator).">
        <Surface>
          <div className="flex flex-wrap gap-8 items-center justify-center">
            {STYLES.map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <Badge badgeStyle={s} label={s === 'dot' ? undefined : '9'} />
                <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>{s}</code>
              </div>
            ))}
          </div>
        </Surface>
      </Section>

      <Section heading="Sizes" lead="sm (16px), md (20px), lg (24px).">
        <Surface>
          <div className="flex gap-8 items-center justify-center">
            {SIZES.map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <Badge size={s} label="9" />
                <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>{s}</code>
              </div>
            ))}
          </div>
        </Surface>
      </Section>

      <Section heading="Long labels" lead="The pill grows horizontally to fit longer strings; use 99+ to cap display.">
        <Surface>
          <div className="flex gap-4 items-center">
            {['1', '9', '99', '999'].map((n) => (
              <Badge key={n} label={n} />
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
