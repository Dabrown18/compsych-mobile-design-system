import { FoundationPageShell } from '@/components/foundation-page-shell';
import { Smartphone, Layers, Palette, Code2 } from 'lucide-react';
import type { ReactNode } from 'react';

export default function MobileAboutPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="Mobile Components"
      description="The same token system, adapted for touch. Every component here maps to a React Native implementation driven by the same sys.* tokens — so the visual contract between web and mobile stays in sync automatically."
    >
      <div className="flex flex-col gap-8">
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}
        >
          <FeatureCard
            icon={<Layers size={20} />}
            title="Same token system"
            body="All mobile components reference sys.* tokens — the same tier that web components use. Change the active theme once and both surfaces update together."
          />
          <FeatureCard
            icon={<Smartphone size={20} />}
            title="Phone-frame previews"
            body="Every component gallery renders inside a device mockup so you can see exactly how it will look at native scale, with status bar and home indicator in place."
          />
          <FeatureCard
            icon={<Palette size={20} />}
            title="Live controls"
            body="Use the interactive playground on each component page to adjust variants, states, and props — the phone frame updates in real time."
          />
          <FeatureCard
            icon={<Code2 size={20} />}
            title="React Native ready"
            body="Each spec maps directly to a React Native implementation. Adopter teams copy the component from the spec and wire in the token package."
          />
        </div>

        <Section heading="Component inventory">
          <div className="flex flex-col gap-6">
            <ComponentGroup
              heading="Mobile Molecules"
              items={[
                { name: 'Text', href: '/mobile/components/text', description: 'HeaderText, TitleText, BodyText, LabelText — all 15 typography scale steps.' },
                { name: 'Button', href: '/mobile/components/button', description: 'Touch-optimized button with 48 dp minimum tap target.' },
                { name: 'Input Field', href: '/mobile/components/input-field', description: 'Mobile text input with floating label and validation states.' },
                { name: 'Switch', href: '/mobile/components/switch', description: 'iOS-style toggle for binary on/off settings.' },
                { name: 'Avatar', href: '/mobile/components/avatar', description: 'User image, initials, or icon representation.' },
                { name: 'Badge', href: '/mobile/components/badge', description: 'Notification count and status indicator.' },
                { name: 'Chip', href: '/mobile/components/chip', description: 'Filter, input, and suggestion chips.' },
                { name: 'List Item', href: '/mobile/components/list-item', description: 'Standard mobile list row with leading/trailing slots.' },
              ]}
            />
            <ComponentGroup
              heading="Mobile Organisms"
              items={[
                { name: 'Card', href: '/mobile/components/card', description: 'Content surface with elevation, image, and action slots.' },
                { name: 'Bottom Navigation', href: '/mobile/components/bottom-nav', description: 'Primary destination switcher anchored to the screen bottom.' },
                { name: 'Tab Bar', href: '/mobile/components/tab-bar', description: 'Secondary navigation within a screen section.' },
                { name: 'Bottom Sheet', href: '/mobile/components/bottom-sheet', description: 'Supplemental surface that slides up from the screen bottom.' },
              ]}
            />
          </div>
        </Section>

        <Section heading="Token rule">
          <div
            className="rounded-lg p-6"
            style={{
              border: '1px solid var(--sys-color-outline-variant, #d7dbe0)',
              backgroundColor: 'var(--sys-color-surface-container-low, #f9fafb)',
            }}
          >
            <p className="ref-body" style={{ margin: 0, color: 'var(--sys-color-on-surface, #1b1d22)' }}>
              Only <code style={{ fontFamily: 'monospace', fontSize: '0.9em', background: 'var(--sys-color-surface-container-high, #eceeef)', padding: '1px 5px', borderRadius: 4 }}>sys.*</code> tokens are applied in mobile components — the same rule as web. Never reference <code style={{ fontFamily: 'monospace', fontSize: '0.9em', background: 'var(--sys-color-surface-container-high, #eceeef)', padding: '1px 5px', borderRadius: 4 }}>core.*</code>, <code style={{ fontFamily: 'monospace', fontSize: '0.9em', background: 'var(--sys-color-surface-container-high, #eceeef)', padding: '1px 5px', borderRadius: 4 }}>product.*</code>, or <code style={{ fontFamily: 'monospace', fontSize: '0.9em', background: 'var(--sys-color-surface-container-high, #eceeef)', padding: '1px 5px', borderRadius: 4 }}>brand.*</code> tokens directly in a component implementation.
            </p>
          </div>
        </Section>
      </div>
    </FoundationPageShell>
  );
}

function FeatureCard({ icon, title, body }: { icon: ReactNode; title: string; body: string }) {
  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-3"
      style={{
        border: '1px solid var(--sys-color-outline-variant, #d7dbe0)',
        backgroundColor: 'var(--sys-color-surface-container-lowest, #ffffff)',
      }}
    >
      <div
        className="flex items-center justify-center w-9 h-9 rounded-lg"
        style={{
          backgroundColor: 'var(--sys-color-primary-container, #dce8ff)',
          color: 'var(--sys-color-on-primary-container, #004aad)',
        }}
      >
        {icon}
      </div>
      <div className="flex flex-col gap-1">
        <p className="ref-body font-semibold" style={{ margin: 0 }}>{title}</p>
        <p className="ref-caption" style={{ margin: 0, color: 'var(--sys-color-on-surface-variant, #565f6c)' }}>{body}</p>
      </div>
    </div>
  );
}

function Section({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="ref-heading-lg" style={{ margin: 0 }}>{heading}</h2>
      {children}
    </section>
  );
}

function ComponentGroup({
  heading,
  items,
}: {
  heading: string;
  items: Array<{ name: string; href: string; description: string }>;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p
        className="ref-caption uppercase tracking-wider font-semibold"
        style={{ margin: 0, color: 'var(--sys-color-on-surface-variant, #565f6c)' }}
      >
        {heading}
      </p>
      <div className="flex flex-col gap-1">
        {items.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="flex items-start gap-4 rounded-lg px-4 py-3"
            style={{
              border: '1px solid var(--sys-color-outline-variant, #d7dbe0)',
              backgroundColor: 'var(--sys-color-surface-container-lowest, #ffffff)',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <span className="ref-body font-medium" style={{ minWidth: 120 }}>{item.name}</span>
            <span className="ref-caption" style={{ color: 'var(--sys-color-on-surface-variant, #565f6c)' }}>{item.description}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
