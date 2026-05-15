'use client';

import type { ReactNode } from 'react';
import { ScreenContainer } from '@/components/ds/mobile-screen-container/mobile-screen-container';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { CodeBlock } from '@/components/code-block/code-block';

export default function MobileScreenContainerPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="ScreenContainer"
      description="Root layout wrapper for every screen. Provides consistent horizontal padding (16 px), vertical padding (8 px), and a ScrollView so content scrolls when it overflows the viewport."
    >
      <Section heading="Preview" lead="A fixed-height frame simulating a mobile screen. Content scrolls inside.">
        <Surface>
          <div style={{
            width: 320,
            height: 480,
            border: '1px solid var(--sys-color-outline)',
            borderRadius: 24,
            overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
            backgroundColor: 'var(--sys-color-surface-container-lowest)',
          }}>
            <ScreenContainer style={{ height: '100%' }}>
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} style={{
                  height: 48,
                  marginBottom: 12,
                  borderRadius: 8,
                  backgroundColor: i % 2 === 0
                    ? 'var(--sys-color-primary-fixed-dim)'
                    : 'var(--sys-color-surface-container-high)',
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: 12,
                  fontSize: 13,
                  color: 'var(--sys-color-on-surface-variant)',
                }}>
                  Item {i + 1}
                </div>
              ))}
            </ScreenContainer>
          </div>
        </Surface>
      </Section>

      <Section heading="Spacing tokens">
        <Surface>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, width: '100%', maxWidth: 480 }}>
            {[
              { label: 'paddingHorizontal', value: '16 px', token: 'sys.dimensions.spacing.padding.sysPadding16' },
              { label: 'paddingVertical',   value: '8 px',  token: 'sys.dimensions.spacing.padding.sysPadding8'  },
            ].map(({ label, value, token }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--sys-color-on-surface-variant)' }}>{label}</span>
                <span style={{ fontSize: 20, fontWeight: 500, color: 'var(--sys-color-on-surface)' }}>{value}</span>
                <code style={{ fontSize: 11, color: 'var(--sys-color-on-surface-variant)' }}>{token}</code>
              </div>
            ))}
          </div>
        </Surface>
      </Section>

      <Section heading="Code Example">
        <CodeBlock code={`import { ScreenContainer } from '@compsych/mobile-ui';

export default function MyScreen() {
  return (
    <ScreenContainer>
      {/* all screen content goes here */}
      <Card title="Upcoming Appointment" icon="StethoscopeIcon" />
      <Card title="Today's Check-in" icon="HeartHandshakeIcon" />
    </ScreenContainer>
  );
}`} language="tsx" />
      </Section>
    </FoundationPageShell>
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
