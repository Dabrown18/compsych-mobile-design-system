'use client';

import type { ReactNode } from 'react';
import { Avatar, type AvatarSize, type AvatarVariant } from '@/components/ds/mobile-avatar/mobile-avatar';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { FoundationPageShell } from '@/components/foundation-page-shell';

const SIZES: AvatarSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'];
const VARIANTS: AvatarVariant[] = ['text', 'image', 'icon'];

export default function MobileAvatarPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="Avatar"
      description="User identity representation. Three variants — text (initials), image, and icon. Seven sizes from xs (24px) to 3xl (120px). Optional activity ring and presence badge add state at a glance."
    >
      <Section heading="Playground" lead="Choose a variant and size to preview the avatar in the phone frame.">
        <MobilePlayground
          render={(values) => (
            <div style={{ padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Avatar
                variant={values.variant as AvatarVariant}
                size={values.size as AvatarSize}
                initials={values.initials as string}
                activityRing={values.activityRing as boolean}
                presenceBadge={values.presenceBadge as boolean}
              />
            </div>
          )}
          controls={[
            { name: 'variant', type: 'enum', label: 'Variant', options: VARIANTS, defaultValue: 'text' },
            { name: 'size', type: 'enum', label: 'Size', options: SIZES, defaultValue: 'md' },
            { name: 'initials', type: 'string', label: 'Initials', defaultValue: 'CP', placeholder: 'Up to 2 chars' },
            { name: 'activityRing', type: 'boolean', label: 'Activity Ring', defaultValue: false },
            { name: 'presenceBadge', type: 'boolean', label: 'Presence Badge', defaultValue: false },
          ]}
        />
      </Section>

      <Section heading="Variants" lead="text uses initials, image renders a photo, icon uses a person glyph by default.">
        <Surface>
          <div className="flex gap-8 items-center justify-center">
            {VARIANTS.map((v) => (
              <div key={v} className="flex flex-col items-center gap-2">
                <Avatar variant={v} size="lg" initials="CP" />
                <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>{v}</code>
              </div>
            ))}
          </div>
        </Surface>
      </Section>

      <Section heading="Sizes" lead="Seven sizes from 24px (xs) to 120px (3xl).">
        <Surface>
          <div className="flex flex-wrap gap-6 items-end justify-center">
            {SIZES.map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <Avatar size={s} initials="CP" />
                <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>{s}</code>
              </div>
            ))}
          </div>
        </Surface>
      </Section>

      <Section heading="With ring and badge" lead="activityRing adds a primary border; presenceBadge adds a shield-check at bottom-right.">
        <Surface>
          <div className="flex gap-8 items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <Avatar size="xl" initials="CP" activityRing />
              <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>activityRing</code>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar size="xl" initials="CP" presenceBadge />
              <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>presenceBadge</code>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar size="xl" initials="CP" activityRing presenceBadge />
              <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>both</code>
            </div>
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
