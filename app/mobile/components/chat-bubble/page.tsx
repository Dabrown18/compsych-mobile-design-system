'use client';

import { type ReactNode } from 'react';

import { ChatBubble } from '@/components/ds/mobile-chat-bubble/mobile-chat-bubble';
import { CodeBlock } from '@/components/code-block/code-block';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';

export default function MobileChatBubblePage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="ChatBubble"
      description="A single message bubble in a chat thread. Two variants: incoming (white surface, left-aligned, optional thumbs-up/down reactions) and outgoing (primary-blue surface, right-aligned). Displays an optional timestamp below the bubble."
    >
      <Section
        heading="Playground"
        lead="Adjust variant and message to preview the bubble."
      >
        <MobilePlayground
          render={(values) => (
            <div style={{ width: 340, maxWidth: '100%', padding: '16px 0' }}>
              <ChatBubble
                variant={values.variant as 'incoming' | 'outgoing'}
                message={values.message as string}
                timestamp={values.timestamp as string}
                showReactions={values.showReactions as boolean}
              />
            </div>
          )}
          controls={[
            {
              name: 'variant',
              type: 'enum',
              label: 'Variant',
              options: ['incoming', 'outgoing'],
              defaultValue: 'incoming',
            },
            {
              name: 'message',
              type: 'string',
              label: 'Message',
              defaultValue: "Thank you for using GuidanceResources Chat. We'll be with you shortly.",
              placeholder: 'Message text',
            },
            {
              name: 'timestamp',
              type: 'string',
              label: 'Timestamp',
              defaultValue: '11:30 AM',
              placeholder: 'e.g. 11:30 AM',
            },
            {
              name: 'showReactions',
              type: 'boolean',
              label: 'Reactions',
              defaultValue: true,
            },
          ]}
        />
      </Section>

      <Section heading="Code Example">
        <CodeBlock
          code={`import { ChatBubble } from '@compsych/mobile-ui';

// Incoming message with reactions
<ChatBubble
  variant="incoming"
  message="Thank you for using GuidanceResources Chat."
  timestamp="11:30 AM"
  onThumbsUp={() => console.log('up')}
  onThumbsDown={() => console.log('down')}
/>

// Outgoing message
<ChatBubble
  variant="outgoing"
  message="hey how are you"
  timestamp="11:30 AM"
/>`}
          language="tsx"
        />
      </Section>

      <Section
        heading="Variants"
        lead="incoming uses a white surface with an outline-variant border. outgoing uses the primary blue surface with white text. Both support an optional timestamp; only incoming shows reaction buttons."
      >
        <Surface>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 340, padding: '16px 0' }}>
            <ChatBubble
              variant="incoming"
              message="Thank you for using GuidanceResources Chat. We'll be with you shortly."
              timestamp="11:30 AM"
              showReactions
            />
            <ChatBubble
              variant="outgoing"
              message="hey how are you"
              timestamp="11:30 AM"
            />
            <ChatBubble
              variant="incoming"
              message="I'm doing well, thank you! How can I help you today?"
              timestamp="11:31 AM"
              showReactions
            />
          </div>
        </Surface>
      </Section>

      <Section
        heading="Anatomy"
        lead="bubble (background + text) → meta row (timestamp · thumbs-up · thumbs-down). The tail corner — bottom-left for incoming, bottom-right for outgoing — has a tighter radius to indicate message direction."
      >
        <Surface>
          <div className="flex flex-col gap-8 w-full max-w-sm">
            {(['incoming', 'outgoing'] as const).map((v) => (
              <div key={v} className="flex flex-col gap-2">
                <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>{v}</code>
                <ChatBubble
                  variant={v}
                  message={v === 'incoming' ? "Thank you for using GuidanceResources Chat. We'll be with you shortly." : 'hey how are you'}
                  timestamp="11:30 AM"
                  showReactions={v === 'incoming'}
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
    <div
      className="rounded-lg p-8 flex items-start justify-center"
      style={{ border: '1px solid var(--sys-color-outline-variant)', backgroundColor: 'var(--sys-color-surface-container-low)' }}
    >
      {children}
    </div>
  );
}
