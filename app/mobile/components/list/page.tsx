'use client';

import type { ReactNode } from 'react';
import { List, ListItem } from '@/components/ds/mobile-list/mobile-list';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { CodeBlock } from '@/components/code-block/code-block';

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width="1em" height="1em">
    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const PersonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width="1em" height="1em">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

export default function MobileListPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="List"
      description="A grouped set of rows for navigation, settings, or data display. Two item types: simple (label + optional icon) and detailed (label + subLabel + optional icon). Pass items to List for automatic divider handling, or render individual ListItem components directly."
    >
      <Section heading="Playground" lead="Adjust the type to switch between simple and detailed layout.">
        <MobilePlayground
          render={(values) => (
            <div style={{ padding: 16, width: '100%' }}>
              <List
                type={values.type as 'simple' | 'detailed'}
                items={[
                  { label: 'Appointments', subLabel: 'View and manage sessions', icon: <CalendarIcon /> },
                  { label: 'My Therapist', subLabel: 'Dr. Sarah Patel · EAP', icon: <PersonIcon /> },
                  { label: 'Notifications', subLabel: 'SMS, push, email', onPress: () => {} },
                ]}
              />
            </div>
          )}
          controls={[
            { name: 'type', type: 'enum', label: 'Type', options: ['simple', 'detailed'], defaultValue: 'detailed' },
          ]}
        />
      </Section>

      <Section heading="Simple" lead="Label only, with optional leading icon and chevron on press.">
        <Surface>
          <div style={{ width: '100%', maxWidth: 360 }}>
            <List items={[
              { label: 'Appointments', icon: <CalendarIcon />, onPress: () => {} },
              { label: 'My Therapist', icon: <PersonIcon />, onPress: () => {} },
              { label: 'Notifications', onPress: () => {} },
            ]} />
          </div>
        </Surface>
      </Section>

      <Section heading="Detailed" lead="Label + subLabel, suitable for richer navigation rows.">
        <Surface>
          <div style={{ width: '100%', maxWidth: 360 }}>
            <List type="detailed" items={[
              { label: 'Appointments', subLabel: 'Next: Tue June 3 · 2:00 PM', icon: <CalendarIcon />, onPress: () => {} },
              { label: 'My Therapist', subLabel: 'Dr. Sarah Patel · EAP Provider', icon: <PersonIcon />, onPress: () => {} },
              { label: 'Notifications', subLabel: 'SMS and push enabled' },
            ]} />
          </div>
        </Surface>
      </Section>

      <Section heading="Code Example">
        <CodeBlock code={`import { View } from 'react-native';
import { List } from '@compsych/mobile-ui';

const ITEMS = [
  { id: '1', headline: 'Therapy sessions', subhead: 'Up to 8 per year' },
  { id: '2', headline: 'Crisis support', subhead: '24/7 availability' },
  { id: '3', headline: 'Financial coaching', subhead: '3 sessions included' },
];

export default function Screen() {
  return (
    <View style={{ padding: 16 }}>
      <List
        items={ITEMS}
        keyExtractor={(item) => item.id}
        renderItem={(item) => ({
          headline: item.headline,
          subhead: item.subhead,
          showChevron: true,
          onPress: () => {},
        })}
      />
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
    <div className="rounded-lg p-8 flex items-center justify-center"
      style={{ border: '1px solid var(--sys-color-outline-variant)', backgroundColor: 'var(--sys-color-surface-container-low)' }}>
      {children}
    </div>
  );
}
