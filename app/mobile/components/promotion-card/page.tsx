'use client';

import type { ReactNode } from 'react';
import {
  PromotionCard,
  type PromotionCardVariant,
  type PromotionCardUsage,
  type PromotionCardSize,
} from '@/components/ds/mobile-promotion-card/mobile-promotion-card';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { CodeBlock } from '@/components/code-block/code-block';

const VARIANTS: PromotionCardVariant[] = ['filled', 'tonal'];
const USAGES: PromotionCardUsage[] = [
  'neutral', 'informative', 'positive', 'danger', 'warning', 'image',
];
const SIZES: PromotionCardSize[] = ['md', 'lg'];

export default function PromotionCardPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="PromotionCard"
      description="Compact promotional surface with a chip, title/description, action button, optional ring timer, and progress bar. Available in two sizes (md/lg), filled and tonal style × six usage contexts."
    >
      <Section heading="Playground" lead="Adjust size, variant, usage, and content to preview every combination.">
        <MobilePlayground
          render={(values) => (
            <PromotionCard
              size={values.size as PromotionCardSize}
              variant={values.variant as PromotionCardVariant}
              usage={values.usage as PromotionCardUsage}
              chipLabel={values.chipLabel as string}
              title={values.title as string}
              description={values.description as string}
              progress={Number(values.progress) / 100}
              showProgressBar={values.showProgressBar as boolean}
              showRingTimer={values.showRingTimer as boolean}
            />
          )}
          controls={[
            { name: 'size', type: 'enum', label: 'Size', options: SIZES, defaultValue: 'md' },
            { name: 'variant', type: 'enum', label: 'Variant', options: VARIANTS, defaultValue: 'filled' },
            { name: 'usage', type: 'enum', label: 'Usage', options: USAGES, defaultValue: 'neutral' },
            { name: 'chipLabel', type: 'string', label: 'Chip label', defaultValue: 'New', placeholder: 'Chip text' },
            { name: 'title', type: 'string', label: 'Title', defaultValue: 'Your next session', placeholder: 'Card title' },
            { name: 'description', type: 'string', label: 'Description', defaultValue: 'Tuesday, June 3 · 2:00 PM', placeholder: 'Card description' },
            { name: 'progress', type: 'string', label: 'Progress (0–100)', defaultValue: '40', placeholder: '0–100' },
            { name: 'showProgressBar', type: 'boolean', label: 'Progress bar', defaultValue: true },
            { name: 'showRingTimer', type: 'boolean', label: 'Ring timer', defaultValue: true },
          ]}
        />
      </Section>

      <Section heading="Code Example">
        <CodeBlock code={`import { PromotionCard } from '@compsych/mobile-ui';

// md size — filled variants (dark backgrounds)
<PromotionCard usage="neutral"     chipLabel="New"      title="Next session" />
<PromotionCard usage="informative" chipLabel="Tip"      title="Track progress" />
<PromotionCard usage="positive"    chipLabel="Done"     title="Goal reached!" />
<PromotionCard usage="danger"      chipLabel="Urgent"   title="Action needed" />
<PromotionCard usage="warning"     chipLabel="Expiring" title="Plan renews soon" />

// md size — tonal variants (light backgrounds)
<PromotionCard variant="tonal" usage="informative" chipLabel="Tip" title="New article" />

// lg size — larger card with pagination dots
<PromotionCard size="lg" usage="neutral"     chipLabel="New"  title="Next session" />
<PromotionCard size="lg" usage="informative" chipLabel="Tip"  title="Track progress" />

// Control progress bar and ring timer (0–1)
<PromotionCard usage="neutral" chipLabel="Offer" title="Limited time" progress={0.7} showProgressBar showRingTimer />`} language="tsx" />
      </Section>

      <Section heading="md — Filled Variants" lead="Dark/saturated backgrounds — white text on all coloured usages.">
        <Surface>
          <div className="flex flex-col gap-4 w-full max-w-sm">
            {USAGES.filter((u) => u !== 'image').map((u) => (
              <div key={u} className="flex flex-col gap-1">
                <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>{u}</code>
                <PromotionCard
                  size="md"
                  variant="filled"
                  usage={u}
                  chipLabel={u.charAt(0).toUpperCase() + u.slice(1)}
                  title="Your next session"
                  description="Tuesday, June 3 · 2:00 PM"
                  progress={0.4}
                  showProgressBar
                  showRingTimer
                />
              </div>
            ))}
          </div>
        </Surface>
      </Section>

      <Section heading="md — Tonal Variants" lead="Light container backgrounds — on-container text for all coloured usages.">
        <Surface>
          <div className="flex flex-col gap-4 w-full max-w-sm">
            {USAGES.filter((u) => u !== 'image').map((u) => (
              <div key={u} className="flex flex-col gap-1">
                <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>{u}</code>
                <PromotionCard
                  size="md"
                  variant="tonal"
                  usage={u}
                  chipLabel={u.charAt(0).toUpperCase() + u.slice(1)}
                  title="Your next session"
                  description="Tuesday, June 3 · 2:00 PM"
                  progress={0.4}
                  showProgressBar
                  showRingTimer
                />
              </div>
            ))}
          </div>
        </Surface>
      </Section>

      <Section heading="lg Variants" lead="Taller card with larger typography and pagination dots. Neutral uses filled tokens; others use tonal tokens.">
        <Surface>
          <div className="flex flex-col gap-6 w-full" style={{ maxWidth: 424 }}>
            {USAGES.filter((u) => u !== 'image').map((u) => (
              <div key={u} className="flex flex-col gap-1">
                <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>{u}</code>
                <PromotionCard
                  size="lg"
                  usage={u}
                  chipLabel={u.charAt(0).toUpperCase() + u.slice(1)}
                  title="Your next session"
                  description="Tuesday, June 3 · 2:00 PM"
                  progress={0.4}
                  showProgressBar
                  showRingTimer
                />
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
