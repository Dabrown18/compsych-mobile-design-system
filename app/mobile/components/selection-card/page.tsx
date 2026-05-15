'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import { SelectionCard, type SelectionCardSize } from '@/components/ds/mobile-selection-card/mobile-selection-card';
import { type IconName } from '@/components/ds/mobile-icon/mobile-icon';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { CodeBlock } from '@/components/code-block/code-block';

const SIZES: SelectionCardSize[] = ['md', 'sm'];

const ICON_OPTIONS: IconName[] = [
  'HeartHandshakeIcon', 'UserRoundIcon', 'GlobeIcon', 'HandshakeIcon',
  'StethoscopeIcon', 'GraduationCapIcon', 'HandHeartIcon', 'AtomIcon',
  'HourglassIcon', 'IdCardIcon', 'MessageCirclePlusIcon', 'BinocularsIcon',
  'FlagIcon', 'MountainSnowIcon', 'SnowflakeIcon', 'HazeIcon',
  'FileChartColumnIncreasingIcon', 'WheatIcon',
];

export default function SelectionCardPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile · Organisms"
      title="Selection Card"
      description="Tappable card for selecting one option (single-select) or multiple options (multi-select). Two sizes: md shows an icon in a filled circle above the title; sm shows a bare icon inline with the title. Selected state adds a primary border and ring shadow."
    >
      <Section heading="Playground" lead="Toggle selected and multi-select to preview all states.">
        <MobilePlayground
          render={(values) => {
            const icon = values.icon as string;
            return (
              <SelectionCard
                size={values.size as SelectionCardSize}
                title={values.title as string}
                icon={(icon || undefined) as IconName | undefined}
                selected={values.selected as boolean}
                multiSelect={values.multiSelect as boolean}
                disabled={values.disabled as boolean}
              />
            );
          }}
          controls={[
            { name: 'size',        type: 'enum',    label: 'Size',         options: SIZES,       defaultValue: 'md' },
            { name: 'icon',        type: 'select',  label: 'Icon',         options: ICON_OPTIONS, defaultValue: 'HeartHandshakeIcon', placeholder: '— none —' },
            { name: 'title',       type: 'string',  label: 'Title',        defaultValue: 'Therapy', placeholder: 'Label' },
            { name: 'selected',    type: 'boolean', label: 'Selected',     defaultValue: false },
            { name: 'multiSelect', type: 'boolean', label: 'Multi-select', defaultValue: false },
            { name: 'disabled',    type: 'boolean', label: 'Disabled',     defaultValue: false },
          ]}
        />
      </Section>

      <Section heading="Code Example">
        <CodeBlock code={`import { SelectionCard } from '@compsych/mobile-ui';

// Single-select (radio behaviour)
<SelectionCard
  title="Therapy"
  icon="HeartHandshakeIcon"
  selected={selected === 'therapy'}
  onPress={() => setSelected('therapy')}
/>

// Multi-select (checkbox behaviour)
<SelectionCard
  title="Coaching"
  icon="GraduationCapIcon"
  multiSelect
  selected={picks.includes('coaching')}
  onPress={() => togglePick('coaching')}
/>

// Small row layout
<SelectionCard
  size="sm"
  title="Meditation"
  icon="SnowflakeIcon"
  selected={selected === 'meditation'}
  onPress={() => setSelected('meditation')}
/>`} language="tsx" />
      </Section>

      <Section heading="States" lead="All states for both sizes and both selection modes.">
        <Surface>
          <StatesGrid />
        </Surface>
      </Section>

      <Section heading="Sizes">
        <Surface>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%', maxWidth: 480 }}>
            {SIZES.map((size) => (
              <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <code style={{ fontSize: 12, color: 'var(--sys-color-on-surface-variant)' }}>{size}</code>
                <SelectionCard size={size} title="Therapy" icon="HeartHandshakeIcon" />
              </div>
            ))}
          </div>
        </Surface>
      </Section>
    </FoundationPageShell>
  );
}

function StatesGrid() {
  const states = [
    { label: 'Enabled',  selected: false, disabled: false },
    { label: 'Selected', selected: true,  disabled: false },
    { label: 'Disabled', selected: false, disabled: true  },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, width: '100%' }}>
      {(['md', 'sm'] as SelectionCardSize[]).map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <code style={{ fontSize: 12, color: 'var(--sys-color-on-surface-variant)', minWidth: 24 }}>{size}</code>
            <span style={{ fontSize: 12, color: 'var(--sys-color-on-surface-variant)' }}>Single-select</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {states.map(({ label, selected, disabled }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: size === 'md' ? 160 : 220 }}>
                <span style={{ fontSize: 11, color: 'var(--sys-color-on-surface-variant)' }}>{label}</span>
                <SelectionCard size={size} title="Therapy" icon="HeartHandshakeIcon" selected={selected} disabled={disabled} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 }}>
            <code style={{ fontSize: 12, color: 'var(--sys-color-on-surface-variant)', minWidth: 24 }}>{size}</code>
            <span style={{ fontSize: 12, color: 'var(--sys-color-on-surface-variant)' }}>Multi-select</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {states.map(({ label, selected, disabled }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: size === 'md' ? 160 : 220 }}>
                <span style={{ fontSize: 11, color: 'var(--sys-color-on-surface-variant)' }}>{label}</span>
                <SelectionCard size={size} title="Therapy" icon="HeartHandshakeIcon" multiSelect selected={selected} disabled={disabled} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
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
