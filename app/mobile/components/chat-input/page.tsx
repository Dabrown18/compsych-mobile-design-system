'use client';

import { type ReactNode } from 'react';

import { ChatInput } from '@/components/ds/mobile-chat-input/mobile-chat-input';
import { CodeBlock } from '@/components/code-block/code-block';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';

export default function MobileChatInputPage() {
  return (
    <FoundationPageShell
      eyebrow="Organisms"
      title="ChatInput"
      description="A chat message composer: a multiline text field that switches from a pill shape to a rounded rectangle once the message spans multiple lines, and a circular send button to the right that activates (turns orange) once there's text to send. isLocked and isDisabled both stop typing and sending (e.g. an escalation flow taking over, or a lost connection); isSendDisabled blocks sending only (e.g. a previous message still in flight). Setting sessionStatus to 'ended' clears and dims the field."
    >
      <Section
        heading="Playground"
        lead="Type a message to activate the send button. Try a long message to see the field switch from pill to rounded-rect."
      >
        <MobilePlayground
          render={(values) => (
            <div style={{ width: 340, maxWidth: '100%', padding: '16px 0' }}>
              <ChatInput
                placeholder={values.placeholder as string}
                isLocked={values.isLocked as boolean}
                isSendDisabled={values.isSendDisabled as boolean}
                isDisabled={values.isDisabled as boolean}
                sessionStatus={values.sessionStatus as 'active' | 'warning' | 'ended'}
              />
            </div>
          )}
          controls={[
            {
              name: 'placeholder',
              type: 'string',
              label: 'Placeholder',
              defaultValue: 'Type a message...',
              placeholder: 'Placeholder text',
            },
            {
              name: 'sessionStatus',
              type: 'enum',
              label: 'Session status',
              options: ['active', 'warning', 'ended'],
              defaultValue: 'active',
            },
            {
              name: 'isLocked',
              type: 'boolean',
              label: 'Locked',
              defaultValue: false,
            },
            {
              name: 'isSendDisabled',
              type: 'boolean',
              label: 'Send disabled',
              defaultValue: false,
            },
            {
              name: 'isDisabled',
              type: 'boolean',
              label: 'Fully disabled',
              defaultValue: false,
            },
          ]}
        />
      </Section>

      <Section heading="Code Example">
        <CodeBlock
          code={`import { useState } from 'react';
import { ChatInput } from '@compsych/mobile-ui';

export default function ChatScreen() {
  const [text, setText] = useState('');

  return (
    <ChatInput
      value={text}
      onChangeText={setText}
      placeholder="Type a message..."
      onSend={() => {
        console.log('send:', text);
        setText('');
      }}
      isSendDisabled={isMessageInFlight}
      sessionStatus={isSessionEnded ? 'ended' : 'active'}
    />
  );
}`}
          language="tsx"
        />
      </Section>

      <Section
        heading="States"
        lead="empty: send button inactive (gray). has-text: send button activates (orange). multi-line: the field switches to a rounded rectangle. ended: field dims and clears itself."
      >
        <Surface>
          <div className="flex flex-col gap-4 w-full max-w-sm">
            {[
              { label: 'empty', value: '' },
              { label: 'has-text', value: "I'm feeling overwhelmed" },
              { label: 'multi-line', value: "I'm feeling overwhelmed with work and personal life. Any advice?" },
              { label: 'ended', value: '', sessionStatus: 'ended' as const },
            ].map(({ label, value, sessionStatus }) => (
              <div key={label} className="flex flex-col gap-1">
                <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>{label}</code>
                <ChatInput value={value} placeholder="Type a message..." sessionStatus={sessionStatus} />
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
