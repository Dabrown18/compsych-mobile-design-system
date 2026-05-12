'use client';

import { useState, type ReactNode } from 'react';
import { SegmentedControl, type SegmentedControlOption } from '@/components/ds/mobile-segmented-control/mobile-segmented-control';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { CodeBlock } from '@/components/code-block/code-block';

const OPTIONS: SegmentedControlOption[] = [
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
];

function SegmentedDemo({ options, fullWidth }: { options: SegmentedControlOption[]; fullWidth: boolean }) {
  const [value, setValue] = useState(options[0].value);
  return <SegmentedControl options={options} value={value} onChange={setValue} fullWidth={fullWidth} />;
}

export default function MobileSegmentedControlPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="SegmentedControl"
      description="A tabbed toggle for switching between mutually exclusive views. Each option has a label (required) and an optional icon. The active segment gets a white pill with shadow; inactive segments are transparent. fullWidth stretches to fill its container."
    >
      <Section heading="Playground" lead="Switch segments and toggle fullWidth to preview layout options.">
        <MobilePlayground
          render={(values) => (
            <div style={{ padding: 24, width: '100%', display: 'flex', justifyContent: 'center' }}>
              <SegmentedDemo options={OPTIONS} fullWidth={values.fullWidth as boolean} />
            </div>
          )}
          controls={[
            { name: 'fullWidth', type: 'boolean', label: 'Full width', defaultValue: false },
          ]}
        />
      </Section>
      <Section heading="Code Example">
        <CodeBlock code={`import { useState } from 'react';
import { View } from 'react-native';
import { SegmentedControl } from '@compsych/mobile-ui';

export default function Screen() {
  const [view, setView] = useState('Day');

  return (
    <View style={{ padding: 16, gap: 16 }}>
      <SegmentedControl
        options={['Day', 'Week', 'Month']}
        value={view}
        onValueChange={setView}
      />
    </View>
  );
}`} language="tsx" />
      </Section>

      <Section heading="Default (intrinsic width)">
        <Surface>
          <SegmentedDemo options={OPTIONS} fullWidth={false} />
        </Surface>
      </Section>

      <Section heading="Full width" lead="Pass fullWidth to stretch across the container — useful in screen headers.">
        <Surface>
          <div style={{ width: '100%', maxWidth: 360 }}>
            <SegmentedDemo options={OPTIONS} fullWidth />
          </div>
        </Surface>
      </Section>

      <Section heading="Two and four segments">
        <Surface>
          <div className="flex flex-col gap-4 w-full max-w-sm items-center">
            <SegmentedDemo options={[{ label: 'Map', value: 'map' }, { label: 'List', value: 'list' }]} fullWidth />
            <SegmentedDemo options={[...OPTIONS, { label: 'Year', value: 'year' }]} fullWidth />
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
