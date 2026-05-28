'use client';

import type { ReactNode } from 'react';
import { ALL_ICONS, type IconSize } from '@/components/ds/mobile-icon/mobile-icon';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { CodeBlock } from '@/components/code-block/code-block';

const SIZES: IconSize[] = ['xsmall', 'small', 'medium', 'large', 'xlarge'];
const SIZE_PX: Record<IconSize, number> = { xsmall: 16, small: 20, medium: 24, large: 32, xlarge: 48 };
const SIZE_STROKE: Record<IconSize, number> = { xsmall: 1, small: 1.5, medium: 2, large: 2, xlarge: 2 };

const ICON_NAMES = ALL_ICONS.map((i) => i.name);

const SizePreviewIcon = ALL_ICONS[0].Component;
const ColorPreviewIcon = ALL_ICONS[2].Component;

export default function MobileIconPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="Icons"
      description="Icons are resolved from lucide-react-native at runtime — any icon on lucide.dev is available. Pass the PascalCase component name with an optional trailing 'Icon' suffix (e.g. 'StethoscopeIcon' or 'Stethoscope') to any icon prop. Five size tiers map to pixel sizes with matching stroke widths."
    >
      <Section heading="Playground" lead="Select an icon, size, and color to preview.">
        <MobilePlayground
          render={(values) => {
            const entry = ALL_ICONS.find((i) => i.name === values.icon) ?? ALL_ICONS[0];
            const Icon = entry.Component;
            const colorMap: Record<string, string> = {
              onSurface:      'var(--sys-color-on-surface)',
              primary:        'var(--sys-color-primary)',
              onPrimaryFixed: 'var(--sys-color-on-primary-fixed)',
              error:          'var(--sys-color-error)',
            };
            const color = colorMap[values.color as string] ?? colorMap.onSurface;
            return (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
                <Icon size={values.size as IconSize} color={color} />
              </div>
            );
          }}
          controls={[
            { name: 'icon', type: 'select', label: 'Icon', options: ICON_NAMES, defaultValue: ICON_NAMES[0] },
            { name: 'size', type: 'enum', label: 'Size', options: SIZES, defaultValue: 'medium' },
            { name: 'color', type: 'enum', label: 'Color', options: ['onSurface', 'primary', 'onPrimaryFixed', 'error'], defaultValue: 'onSurface' },
          ]}
        />
      </Section>

      <Section heading="Code Example">
        <CodeBlock code={`import { resolveIcon } from '@compsych/mobile-ui';

// Resolve any Lucide icon by name (trailing "Icon" suffix optional)
const Stethoscope = resolveIcon('StethoscopeIcon');
const Heart       = resolveIcon('Heart');

// Render with numeric size and strokeWidth
<Stethoscope size={24} color="#000" strokeWidth={2} />
<Heart       size={32} color="red"  strokeWidth={2} />

// Use the icon prop in design-system components — same string name
<ServiceCard   icon="StethoscopeIcon" title="Therapy Session" />
<SelectionCard icon="HeartIcon"       title="Wellness" />

// Any icon from https://lucide.dev/icons works — just use its PascalCase name`} language="tsx" />
      </Section>

      <Section heading="Gallery" lead="All design-system icons at medium size (24 × 24 px). Any additional icon from lucide.dev can be used the same way.">
        <Surface>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))', gap: 24, width: '100%' }}>
            {ALL_ICONS.map(({ name, label, Component }) => (
              <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48 }}>
                  <Component size="medium" color="var(--sys-color-on-surface)" />
                </div>
                <code style={{ fontSize: 10, color: 'var(--sys-color-on-surface-variant)', textAlign: 'center', lineHeight: 1.4 }}>{label}</code>
              </div>
            ))}
          </div>
        </Surface>
      </Section>

      <Section heading="Sizes" lead="Five size tiers with matching stroke widths.">
        <Surface>
          <div style={{ overflowX: 'auto', width: '100%' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '8px 16px 8px 0', color: 'var(--sys-color-on-surface-variant)', fontWeight: 500, borderBottom: '1px solid var(--sys-color-outline-variant)' }}>Size</th>
                  <th style={{ textAlign: 'left', padding: '8px 16px', color: 'var(--sys-color-on-surface-variant)', fontWeight: 500, borderBottom: '1px solid var(--sys-color-outline-variant)' }}>Pixels</th>
                  <th style={{ textAlign: 'left', padding: '8px 16px', color: 'var(--sys-color-on-surface-variant)', fontWeight: 500, borderBottom: '1px solid var(--sys-color-outline-variant)' }}>Stroke</th>
                  <th style={{ textAlign: 'left', padding: '8px 0 8px 16px', color: 'var(--sys-color-on-surface-variant)', fontWeight: 500, borderBottom: '1px solid var(--sys-color-outline-variant)' }}>Preview</th>
                </tr>
              </thead>
              <tbody>
                {SIZES.map((s) => (
                  <tr key={s}>
                    <td style={{ padding: '12px 16px 12px 0', borderBottom: '1px solid var(--sys-color-outline-variant)' }}>
                      <code style={{ fontSize: 12 }}>{s}</code>
                    </td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--sys-color-outline-variant)', color: 'var(--sys-color-on-surface-variant)' }}>{SIZE_PX[s]} × {SIZE_PX[s]} px</td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--sys-color-outline-variant)', color: 'var(--sys-color-on-surface-variant)' }}>{SIZE_STROKE[s]} px</td>
                    <td style={{ padding: '12px 0 12px 16px', borderBottom: '1px solid var(--sys-color-outline-variant)' }}>
                      <SizePreviewIcon size={s} color="var(--sys-color-on-surface)" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Surface>
      </Section>

      <Section heading="Color" lead="Icons inherit no color automatically. Always pass an explicit color resolved from a sys.color.* token.">
        <Surface>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'center' }}>
            {[
              { label: 'onSurface',      color: 'var(--sys-color-on-surface)' },
              { label: 'primary',        color: 'var(--sys-color-primary)' },
              { label: 'onPrimaryFixed', color: 'var(--sys-color-on-primary-fixed)' },
              { label: 'error',          color: 'var(--sys-color-error)' },
            ].map(({ label, color }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <ColorPreviewIcon size="large" color={color} />
                <code style={{ fontSize: 11, color: 'var(--sys-color-on-surface-variant)' }}>{label}</code>
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
    <section style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 768 }}>
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
