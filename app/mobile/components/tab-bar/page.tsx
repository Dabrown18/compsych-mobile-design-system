'use client';

import type { ReactNode } from 'react';
import { MobileTabBar } from '@/components/ds/mobile-tab-bar/mobile-tab-bar';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { FoundationPageShell } from '@/components/foundation-page-shell';

const SECTION_CONTENT: Record<string, string> = {
  Overview: 'Summary information and key metrics for this section.',
  Details: 'Detailed breakdown with additional context and data.',
  History: 'Activity log and historical records.',
  Settings: 'Configuration options for this section.',
  Reports: 'Generated reports and downloadable data.',
};

export default function TabBarPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="Tab Bar"
      description="Secondary in-screen navigation. Use to switch between views within the same page or section — not for top-level app destinations (use Bottom Navigation for that). Tabs are anchored to the top of the content area."
    >
      <Section heading="Playground" lead="Tap a tab in the phone frame to change the active selection.">
        <MobilePlayground
          render={(values, setValue) => {
            const tabs = (values.tabs as string).split(',').map((t) => ({ label: t.trim() }));
            const activeIndex = values.activeIndex as number;
            const safeIndex = Math.min(activeIndex, tabs.length - 1);
            const activeLabel = tabs[safeIndex]?.label ?? tabs[0]?.label ?? 'Overview';
            return (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <MobileTabBar
                  tabs={tabs}
                  activeIndex={safeIndex}
                  scrollable={values.scrollable as boolean}
                  onSelect={(i) => setValue('activeIndex', i)}
                />
                <div style={{ flex: 1, padding: '20px 16px', overflow: 'auto' }}>
                  <p className="ref-body" style={{ color: 'var(--sys-color-on-surface, #1b1d22)', margin: 0 }}>
                    {SECTION_CONTENT[activeLabel] ?? `Content for "${activeLabel}".`}
                  </p>
                </div>
              </div>
            );
          }}
          controls={[
            { name: 'tabs', type: 'string', label: 'Tab labels (comma-separated)', defaultValue: 'Overview, Details, History', placeholder: 'Tab1, Tab2, Tab3' },
            { name: 'activeIndex', type: 'enum', label: 'Active tab', options: ['0', '1', '2', '3', '4'], defaultValue: '0' },
            { name: 'scrollable', type: 'boolean', label: 'Scrollable', defaultValue: false },
          ]}
        />
      </Section>

      <Section heading="Variants" lead="Fixed tabs divide the bar equally. Scrollable tabs overflow horizontally for long label sets.">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="ref-caption" style={{ color: 'var(--sys-color-on-surface-variant, #565f6c)' }}>Fixed (3 tabs)</span>
            <div style={{ border: '1px solid var(--sys-color-outline-variant, #d7dbe0)', borderRadius: 12, overflow: 'hidden' }}>
              <MobileTabBar tabs={[{ label: 'Overview' }, { label: 'Details' }, { label: 'History' }]} activeIndex={0} />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="ref-caption" style={{ color: 'var(--sys-color-on-surface-variant, #565f6c)' }}>Scrollable (6 tabs)</span>
            <div style={{ border: '1px solid var(--sys-color-outline-variant, #d7dbe0)', borderRadius: 12, overflow: 'hidden' }}>
              <MobileTabBar
                tabs={[{ label: 'Overview' }, { label: 'Details' }, { label: 'History' }, { label: 'Settings' }, { label: 'Reports' }, { label: 'Billing' }]}
                activeIndex={0}
                scrollable
              />
            </div>
          </div>
        </div>
      </Section>

      <Section heading="Canonical sources">
        <div className="flex flex-col gap-2">
          <LinkRow label="Specification" href="#" hint="specs/tab-bar.spec.md" />
          <LinkRow label="React Native reference" href="#" hint="reference/components/ds/mobile-tab-bar/" />
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
