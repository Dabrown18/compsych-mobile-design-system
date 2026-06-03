'use client';

import { useState, type ReactNode } from 'react';

import { List, Map } from 'lucide-react';

import { CodeBlock } from '@/components/code-block/code-block';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { resolveIcon, type IconName } from '@/components/ds/mobile-icon/mobile-icon';
import { SegmentedControl, type SegmentedControlOption } from '@/components/ds/mobile-segmented-control/mobile-segmented-control';


const ICON_OPTIONS: IconName[] = [
  'HeartHandshakeIcon', 'UserRoundIcon', 'GlobeIcon', 'HandshakeIcon',
  'StethoscopeIcon', 'GraduationCapIcon', 'HandHeartIcon', 'AtomIcon',
  'HourglassIcon', 'IdCardIcon', 'MessageCirclePlusIcon', 'BinocularsIcon',
  'FlagIcon', 'MountainSnowIcon', 'SnowflakeIcon', 'HazeIcon',
  'CalendarDaysIcon', 'CalendarRangeIcon', 'CalendarIcon', 'CalendarCheckIcon',
];

const BASE_OPTIONS = [
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
];

function resolveIconNode(name: string | undefined, size = 16): ReactNode | undefined {
  if (!name) return undefined;
  const Icon = resolveIcon(name);
  return Icon ? <Icon size={size} /> : undefined;
}

function PlaygroundDemo({ iconName }: { iconName: string }) {
  const [value, setValue] = useState('day');
  const icon = resolveIconNode(iconName || undefined);
  const options: SegmentedControlOption[] = BASE_OPTIONS.map((opt) => ({ ...opt, icon }));
  return <SegmentedControl options={options} value={value} onChange={setValue} />;
}

function SegmentedDemo({ options }: { options: SegmentedControlOption[] }) {
  const [value, setValue] = useState(options[0].value);
  return <SegmentedControl options={options} value={value} onChange={setValue} />;
}

export default function MobileSegmentedControlPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="SegmentedControl"
      description="A tabbed toggle for switching between mutually exclusive views. Each option has a label (required) and an optional icon. The active segment gets a filled blue pill; inactive segments get a gray pill. Always full width — scrolls horizontally when options overflow."
    >
      <Section heading="Playground" lead="Pick an icon to preview how it looks alongside labels.">
        <MobilePlayground
          render={(values) => (
            <div style={{ padding: 24, width: '100%' }}>
              <PlaygroundDemo iconName={values.icon as string} />
            </div>
          )}
          controls={[
            { name: 'icon', type: 'select', label: 'Icon', options: ICON_OPTIONS, defaultValue: '', placeholder: '— none —' },
          ]}
        />
      </Section>

      <Section heading="Code example">
        <CodeBlock code={`import { useState } from 'react';
import { View } from 'react-native';
import { SegmentedControl } from '@compsych/mobile-ui';

export default function Screen() {
  const [view, setView] = useState('day');

  return (
    <View style={{ padding: 16 }}>
      {/* Text only */}
      <SegmentedControl
        options={[
          { label: 'Day', value: 'day' },
          { label: 'Week', value: 'week' },
          { label: 'Month', value: 'month' },
        ]}
        value={view}
        onChange={setView}
      />

      {/* With icons — pass any Lucide icon name as the icon prop */}
      <SegmentedControl
        options={[
          { label: 'Day',   value: 'day',   icon: 'CalendarDaysIcon' },
          { label: 'Week',  value: 'week',  icon: 'CalendarRangeIcon' },
          { label: 'Month', value: 'month', icon: 'CalendarIcon' },
          { label: 'Year',  value: 'year',  icon: 'CalendarCheckIcon' },
        ]}
        value={view}
        onChange={setView}
      />
    </View>
  );
}`} language="tsx" />
      </Section>

      <Section
        heading="With icons"
        lead="Add an icon to any option via the icon prop — pass any Lucide icon name string. Icons appear to the left of the label and inherit the segment's active/inactive color automatically."
      >
        <Surface>
          <SegmentedDemo
            options={[
              { label: 'Day', value: 'day', icon: resolveIconNode('CalendarDaysIcon') },
              { label: 'Week', value: 'week', icon: resolveIconNode('CalendarRangeIcon') },
              { label: 'Month', value: 'month', icon: resolveIconNode('CalendarIcon') },
              { label: 'Year', value: 'year', icon: resolveIconNode('CalendarCheckIcon') },
            ]}
          />
        </Surface>
      </Section>

      <Section heading="With icons — code example">
        <CodeBlock code={`import { useState } from 'react';
import { View } from 'react-native';
import { SegmentedControl } from '@compsych/mobile-ui';

export default function Screen() {
  const [view, setView] = useState('day');

  return (
    <View style={{ padding: 16 }}>
      <SegmentedControl
        options={[
          { label: 'Day',   value: 'day',   icon: 'CalendarDaysIcon' },
          { label: 'Week',  value: 'week',  icon: 'CalendarRangeIcon' },
          { label: 'Month', value: 'month', icon: 'CalendarIcon' },
          { label: 'Year',  value: 'year',  icon: 'CalendarCheckIcon' },
        ]}
        value={view}
        onChange={setView}
      />
    </View>
  );
}`} language="tsx" />
      </Section>

      <Section heading="Text only">
        <Surface>
          <SegmentedDemo options={BASE_OPTIONS} />
        </Surface>
      </Section>

      <Section heading="Many options (scrolls)" lead="When options overflow the container width the row scrolls horizontally.">
        <Surface>
          <SegmentedDemo
            options={[
              { label: 'All', value: 'all', icon: <Map size={16} /> },
              { label: 'Watch', value: 'watch', icon: <List size={16} /> },
              { label: 'Read', value: 'read' },
              { label: 'Interact', value: 'interact' },
              { label: 'Listen', value: 'listen' },
              { label: 'Explore', value: 'explore' },
            ]}
          />
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
