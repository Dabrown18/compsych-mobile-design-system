'use client';

import type { ReactNode } from 'react';
import { Bell, User, Settings, ChevronRight, Star, Heart } from 'lucide-react';
import { MobileListItem } from '@/components/ds/mobile-list-item/mobile-list-item';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { CodeBlock } from '@/components/code-block/code-block';
import { Switch as MobileSwitch } from '@/components/ds/mobile-switch/mobile-switch';
import { Badge as MobileBadge } from '@/components/ds/mobile-badge/mobile-badge';

export default function MobileListItemPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="List Item"
      description="The standard mobile list row. Supports one-, two-, and three-line layouts with leading content (icon, avatar, image) and trailing content (icon, badge, switch, metadata)."
    >
      <Section heading="Playground" lead="Adjust controls to preview list item configurations inside the phone frame.">
        <MobilePlayground
          render={(values, setValue) => (
            <div>
              <MobileListItem
                headline={values.headline as string}
                supportingText={values.supportingText as string || undefined}
                showChevron={values.showChevron as boolean}
                size={values.size as 'sm' | 'md' | 'lg'}
                disabled={values.disabled as boolean}
                leadingContent={values.showLeadingIcon ? <User size={24} /> : undefined}
                onClick={values.disabled ? undefined : () => {}}
              />
              <div style={{ height: 1, background: 'var(--sys-color-outline-variant, #d7dbe0)', margin: '0 16px' }} />
              <MobileListItem
                headline="Another item"
                supportingText="Supporting detail"
                size={values.size as 'sm' | 'md' | 'lg'}
                leadingContent={values.showLeadingIcon ? <Bell size={24} /> : undefined}
                showChevron={values.showChevron as boolean}
                onClick={() => {}}
              />
              <div style={{ height: 1, background: 'var(--sys-color-outline-variant, #d7dbe0)', margin: '0 16px' }} />
              <MobileListItem
                headline="Third item"
                size={values.size as 'sm' | 'md' | 'lg'}
                leadingContent={values.showLeadingIcon ? <Settings size={24} /> : undefined}
                showChevron={values.showChevron as boolean}
                onClick={() => {}}
              />
            </div>
          )}
          controls={[
            { name: 'headline', type: 'string', label: 'Headline', defaultValue: 'List item label' },
            { name: 'supportingText', type: 'string', label: 'Supporting text', defaultValue: 'Supporting detail', placeholder: 'Leave blank to hide' },
            { name: 'size', type: 'enum', label: 'Size', options: ['sm', 'md', 'lg'], defaultValue: 'md' },
            { name: 'showLeadingIcon', type: 'boolean', label: 'Leading icon', defaultValue: true },
            { name: 'showChevron', type: 'boolean', label: 'Trailing chevron', defaultValue: true },
            { name: 'disabled', type: 'boolean', label: 'Disabled', defaultValue: false },
          ]}
        />
      </Section>

      <Section heading="Sizes" lead="Three line heights: sm (48dp), md (56dp), lg (72dp — fits two lines of supporting text).">
        <Surface>
          <div className="flex flex-col gap-2 w-full max-w-sm">
            {(['sm', 'md', 'lg'] as const).map((size) => (
              <div key={size} className="flex flex-col gap-0.5">
                <span className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant, #565f6c)', paddingLeft: 8 }}>{size}</span>
                <div style={{ border: '1px solid var(--sys-color-outline-variant, #d7dbe0)', borderRadius: 8, overflow: 'hidden' }}>
                  <MobileListItem
                    headline="List item label"
                    supportingText={size === 'lg' ? 'Supporting text that can span up to two lines in this configuration' : 'Supporting detail'}
                    size={size}
                    leadingContent={<User size={24} />}
                    showChevron
                    onClick={() => {}}
                  />
                </div>
              </div>
            ))}
          </div>
        </Surface>
      </Section>

      <Section heading="Trailing content" lead="Common trailing slot patterns: chevron, badge, switch, metadata.">
        <Surface>
          <div className="w-full max-w-sm" style={{ border: '1px solid var(--sys-color-outline-variant, #d7dbe0)', borderRadius: 12, overflow: 'hidden' }}>
            <MobileListItem headline="Navigate somewhere" leadingContent={<Star size={24} />} showChevron onClick={() => {}} />
            <div style={{ height: 1, background: 'var(--sys-color-outline-variant, #d7dbe0)' }} />
            <MobileListItem headline="Notifications" leadingContent={<Bell size={24} />} trailingContent={<MobileBadge badgeStyle="danger" label="3" />} onClick={() => {}} />
            <div style={{ height: 1, background: 'var(--sys-color-outline-variant, #d7dbe0)' }} />
            <MobileListItem headline="Dark mode" leadingContent={<Settings size={24} />} trailingContent={<MobileSwitch value={false} />} />
            <div style={{ height: 1, background: 'var(--sys-color-outline-variant, #d7dbe0)' }} />
            <MobileListItem headline="Last synced" leadingContent={<Heart size={24} />} trailingContent={<span className="ref-caption" style={{ color: 'var(--sys-color-on-surface-variant, #565f6c)' }}>2m ago</span>} onClick={() => {}} />
          </div>
        </Surface>
      </Section>

      <Section heading="Canonical sources">
        <div className="flex flex-col gap-2">
          <LinkRow label="Specification" href="#" hint="specs/list-item.spec.md" />
          <LinkRow label="React Native reference" href="#" hint="reference/components/ds/mobile-list-item/" />
        </div>
      </Section>

      <Section heading="Code Example">
        <CodeBlock code={`import { View } from 'react-native';
import { ListItem } from '@compsych/mobile-ui';
import { Bell, Settings } from 'lucide-react-native';

export default function Screen() {
  return (
    <View style={{ padding: 16 }}>
      <ListItem
        headline="Notifications"
        subhead="Manage alerts"
        leadingContent={<Bell size={24} />}
        showChevron
        onPress={() => {}}
      />
      <ListItem
        headline="Settings"
        leadingContent={<Settings size={24} />}
        showChevron
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
        {lead && <p className="ref-body" style={{ color: 'var(--sys-color-on-surface-variant, #565f6c)', margin: 0 }}>{lead}</p>}
      </div>
      {children}
    </section>
  );
}

function Surface({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg p-8 flex items-center justify-center"
      style={{ border: '1px solid var(--sys-color-outline-variant, #d7dbe0)', backgroundColor: 'var(--sys-color-surface-container-low, #f9fafb)' }}>
      {children}
    </div>
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
