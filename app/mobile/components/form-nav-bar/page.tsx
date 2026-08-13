'use client';

import type { ReactNode } from 'react';
import { FormNavBar } from '@/components/ds/mobile-form-nav-bar/mobile-form-nav-bar';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { CodeBlock } from '@/components/code-block/code-block';
import { PhoneFrame } from '@/components/phone-frame/phone-frame';

export default function MobileFormNavBarPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="FormNavBar"
      description="A bottom bar with a back button and a continue button for multi-step forms. The continue button's disabled look and its ability to block onNext are deliberately decoupled: it only becomes natively non-interactive while isLoading — while merely invalid (canContinue false), it stays pressable and calls onDisabledPress instead, so a screen can scroll to and highlight the first invalid field rather than silently doing nothing."
      whyThisMatters="A truly disabled button gives users no feedback about why they can't continue. Keeping it pressable — just visually muted — lets the screen respond to the tap (e.g. surface validation errors) instead of leaving the user stuck with no explanation."
    >
      <Section heading="Playground" lead="Toggle 'Can continue' and 'Loading' to see the button's states. With 'Can continue' off, tapping Continue calls onDisabledPress instead of onNext.">
        <MobilePlayground
          render={(values, setValue) => (
            <FormNavBarDemo
              canContinue={values.canContinue as boolean}
              isLoading={values.isLoading as boolean}
              continueLabel={values.continueLabel as string}
              onDisabledFired={() => setValue('lastAction', 'onDisabledPress fired')}
              onNextFired={() => setValue('lastAction', 'onNext fired')}
              onBackFired={() => setValue('lastAction', 'onBack fired')}
              lastAction={values.lastAction as string}
            />
          )}
          controls={[
            { name: 'canContinue', type: 'boolean', label: 'Can continue', defaultValue: true },
            { name: 'isLoading', type: 'boolean', label: 'Loading', defaultValue: false },
            { name: 'continueLabel', type: 'string', label: 'Continue label', defaultValue: 'Continue', placeholder: 'Continue' },
            { name: 'lastAction', type: 'string', label: 'Last action', defaultValue: '(none yet)' },
          ]}
        />
      </Section>
      <Section heading="Code Example">
        <CodeBlock code={`import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { FormNavBar } from '@compsych/mobile-ui';

export default function IntakeStep() {
  const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const handleDisabledPress = () => {
    // scroll to and highlight the first invalid field
    scrollToFirstInvalidField(scrollRef);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView ref={scrollRef}>{/* form fields */}</ScrollView>
      <FormNavBar
        onBack={() => navigation.goBack()}
        onNext={submitStep}
        onDisabledPress={handleDisabledPress}
        canContinue={isValid}
        isLoading={isSubmitting}
      />
    </View>
  );
}`} language="tsx" />
      </Section>

      <Section heading="Anatomy" lead="Back button, continue button (enabled, visually-disabled, and loading states).">
        <Surface>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 340 }}>
            <FormNavBar
              onBack={() => {}}
              onNext={() => {}}
            />
            <FormNavBar
              onBack={() => {}}
              onNext={() => {}}
              canContinue={false}
            />
            <FormNavBar
              onBack={() => {}}
              onNext={() => {}}
              isLoading
            />
          </div>
        </Surface>
      </Section>
    </FoundationPageShell>
  );
}

function FormNavBarDemo({
  canContinue,
  isLoading,
  continueLabel,
  onDisabledFired,
  onNextFired,
  onBackFired,
  lastAction,
}: {
  canContinue: boolean;
  isLoading: boolean;
  continueLabel: string;
  onDisabledFired: () => void;
  onNextFired: () => void;
  onBackFired: () => void;
  lastAction: string;
}) {
  return (
    <PhoneFrame>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ padding: 16, textAlign: 'center' }}>
          <span className="ref-body" style={{ color: 'var(--sys-color-on-surface-variant)' }}>{lastAction}</span>
        </div>
        <FormNavBar
          onBack={onBackFired}
          onNext={onNextFired}
          onDisabledPress={onDisabledFired}
          canContinue={canContinue}
          isLoading={isLoading}
          continueLabel={continueLabel || 'Continue'}
        />
      </div>
    </PhoneFrame>
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
