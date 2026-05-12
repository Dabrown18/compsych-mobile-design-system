'use client';

import { useState, type ReactNode } from 'react';
import { PlanCard } from '@/components/ds/mobile-plan-card/mobile-plan-card';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { CodeBlock } from '@/components/code-block/code-block';

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

const PLAN_ITEMS = [
  { label: 'Sessions per year', value: '12' },
  { label: 'Provider', value: 'In-network EAP' },
  { label: 'Copay', value: '$0' },
  { label: 'Status', value: 'Active' },
];

function PlanCardDemo({ title, tag, expanded: defaultExpanded }: { title: string; tag?: string; expanded?: boolean }) {
  const [expanded, setExpanded] = useState(!!defaultExpanded);
  return (
    <PlanCard
      title={title}
      tag={tag}
      icon={<HeartIcon />}
      items={PLAN_ITEMS}
      expanded={expanded}
      onToggle={() => setExpanded((e) => !e)}
    />
  );
}

export default function MobilePlanCardPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="PlanCard"
      description="Expandable card for displaying EAP plan details. Shows a header row with icon, title, and optional tag. Tapping the header toggles an expanded section that renders item rows or custom children. Controlled by expanded and onToggle."
    >
      <Section heading="Playground" lead="Tap the card inside the phone frame to toggle expansion.">
        <MobilePlayground
          render={(values) => (
            <div style={{ padding: 16, width: '100%' }}>
              <PlanCardDemo
                title={values.title as string}
                tag={values.tag as string || undefined}
              />
            </div>
          )}
          controls={[
            { name: 'title', type: 'string', label: 'Title', defaultValue: 'My EAP Plan', placeholder: 'Plan name' },
            { name: 'tag', type: 'string', label: 'Tag', defaultValue: 'Active', placeholder: 'Tag label' },
          ]}
        />
      </Section>

      <Section heading="Collapsed and expanded">
        <Surface>
          <div className="flex flex-col gap-4 w-full max-w-sm">
            <div className="flex flex-col gap-1">
              <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>collapsed</code>
              <PlanCard title="My EAP Plan" tag="Active" icon={<HeartIcon />} items={PLAN_ITEMS} />
            </div>
            <div className="flex flex-col gap-1">
              <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>expanded</code>
              <PlanCard title="My EAP Plan" tag="Active" icon={<HeartIcon />} items={PLAN_ITEMS} expanded />
            </div>
          </div>
        </Surface>
      </Section>

      <Section heading="React Native">
        <CodeBlock code={`import { View } from 'react-native';
import { PlanCard } from '@compsych/mobile-ui';

export default function Screen() {
  return (
    <View style={{ padding: 16, gap: 12 }}>
      <PlanCard
        planName="Standard EAP"
        sessions={8}
        used={3}
        renewalDate="Jan 1, 2027"
        onPress={() => {}}
      />
      <PlanCard
        planName="Premium Wellness"
        sessions={12}
        used={12}
        renewalDate="Jan 1, 2027"
        onPress={() => {}}
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
    <div className="rounded-lg p-8 flex items-start justify-center"
      style={{ border: '1px solid var(--sys-color-outline-variant)', backgroundColor: 'var(--sys-color-surface-container-low)' }}>
      {children}
    </div>
  );
}
