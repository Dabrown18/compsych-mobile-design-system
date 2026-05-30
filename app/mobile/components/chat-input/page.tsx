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
      description="A chat message composer with an optional attachment button on the left, a multiline auto-expanding text field in the center, and a send button on the right. The text field grows line-by-line as the user types (max 120 px) and shrinks when text is deleted. The send button activates (turns orange) when text is present. Supports disabled state."
    >
      <Section
        heading="Playground"
        lead="Type a message to activate the send button."
      >
        <MobilePlayground
          render={(values) => (
            <div style={{ width: 340, maxWidth: '100%', padding: '16px 0' }}>
              <ChatInput
                placeholder={values.placeholder as string}
                showAttachButton={values.showAttachButton as boolean}
              />
            </div>
          )}
          controls={[
            {
              name: 'placeholder',
              type: 'string',
              label: 'Placeholder',
              defaultValue: 'Ask Sol Anything...',
              placeholder: 'Placeholder text',
            },
            {
              name: 'showAttachButton',
              type: 'boolean',
              label: 'Attach button',
              defaultValue: true,
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
      placeholder="Ask Sol Anything..."
      onSend={() => {
        console.log('send:', text);
        setText('');
      }}
      onAttach={() => {
        // open image picker
      }}
    />
  );
}`}
          language="tsx"
        />
      </Section>

      <Section
        heading="States"
        lead="empty: send button inactive (gray). has-text: send button activates (orange) and field grows as lines are added. disabled: 48% opacity throughout."
      >
        <Surface>
          <div className="flex flex-col gap-4 w-full max-w-sm">
            {[
              { label: 'empty', value: '', disabled: false },
              { label: 'has-text', value: "I'm feeling overwhelmed with work and personal life. Any advice?", disabled: false },
              { label: 'disabled', value: '', disabled: true },
            ].map(({ label, value, disabled }) => (
              <div key={label} className="flex flex-col gap-1">
                <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>{label}</code>
                <ChatInput value={value} placeholder="Ask Sol Anything..." disabled={disabled} />
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
