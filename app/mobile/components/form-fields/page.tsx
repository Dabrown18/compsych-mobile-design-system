'use client';

import { useState, type ReactNode } from 'react';
import { CheckboxField } from '@/components/ds/mobile-form-fields/checkbox-field';
import { DropdownField } from '@/components/ds/mobile-form-fields/dropdown-field';
import { EmailField } from '@/components/ds/mobile-form-fields/email-field';
import { FieldLabel } from '@/components/ds/mobile-form-fields/field-label';
import { PhoneNumberField } from '@/components/ds/mobile-form-fields/phone-number-field';
import { RadioGroup } from '@/components/ds/mobile-form-fields/radio-group';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { CodeBlock } from '@/components/code-block/code-block';
import { PhoneFrame } from '@/components/phone-frame/phone-frame';

const RADIO_OPTIONS = [
  { value: 'primary', label: 'Primary' },
  { value: 'spouse', label: 'Spouse' },
  { value: 'dependent', label: 'Dependent' },
];

const DROPDOWN_OPTIONS = [
  { value: 'mobile', label: 'Mobile' },
  { value: 'home', label: 'Home' },
  { value: 'work', label: 'Work' },
];

export default function MobileFormFieldsPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="FormFields"
      description="A family of composite form field components — a label, a control, and validation state bundled together. FieldLabel and CheckboxField/RadioGroup are self-contained; DropdownField reuses ActionSheet, and EmailField/PhoneNumberField reuse Input. Built for assembling intake-style forms without redoing label/required/invalid handling on every screen."
    >
      <Section heading="FieldLabel" lead="A label row with an optional required asterisk, used above DropdownField, PhoneNumberField, and RadioGroup.">
        <Surface>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 280 }}>
            <FieldLabel label="First name" />
            <FieldLabel label="Last name" required />
          </div>
        </Surface>
      </Section>

      <Section heading="CheckboxField" lead="Tap the row inside the phone frame to toggle it.">
        <PlaygroundFrame>
          <CheckboxFieldDemo />
        </PlaygroundFrame>
      </Section>

      <Section heading="RadioGroup" lead="A bordered group of radio options; the selected item gets a highlighted border.">
        <PlaygroundFrame>
          <RadioGroupDemo />
        </PlaygroundFrame>
      </Section>

      <Section heading="RadioGroup — cards variant" lead="variant=&quot;cards&quot; renders each option as its own independent bordered card instead of one shared grouped list — for flows like AGC's Send a Question that need standalone selectable cards.">
        <PlaygroundFrame>
          <RadioGroupCardsDemo />
        </PlaygroundFrame>
      </Section>

      <Section heading="DropdownField" lead="Tap the trigger to open an ActionSheet of options.">
        <PlaygroundFrame>
          <DropdownFieldDemo />
        </PlaygroundFrame>
      </Section>

      <Section heading="EmailField" lead="Validates on blur and reports validity via onValidChange. Try an invalid address, then blur.">
        <PlaygroundFrame>
          <EmailFieldDemo />
        </PlaygroundFrame>
      </Section>

      <Section heading="PhoneNumberField" lead="Formats digits as 555-123-4567 while typing.">
        <PlaygroundFrame>
          <PhoneNumberFieldDemo />
        </PlaygroundFrame>
      </Section>

      <Section heading="Code Example">
        <CodeBlock code={`import { useState } from 'react';
import { View } from 'react-native';
import {
  CheckboxField,
  DropdownField,
  EmailField,
  FieldLabel,
  PhoneNumberField,
  RadioGroup,
} from '@compsych/mobile-ui';

export default function IntakeForm() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [relationship, setRelationship] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);

  return (
    <View style={{ gap: 16, padding: 16 }}>
      <View style={{ gap: 8 }}>
        <FieldLabel label="Relationship" required />
        <RadioGroup
          options={[
            { value: 'primary', label: 'Primary', testID: 'relationship-primary' },
            { value: 'spouse', label: 'Spouse', testID: 'relationship-spouse' },
          ]}
          selected={relationship}
          onSelect={setRelationship}
        />
      </View>
      <EmailField
        label="Email"
        required
        value={email}
        onChangeText={setEmail}
        testID="email"
        invalidEmailMessage="Please enter a valid email address"
      />
      <PhoneNumberField
        label="Phone number"
        value={phone}
        onChangeText={setPhone}
        testID="phone"
      />
      <CheckboxField
        checked={agreed}
        onPress={() => setAgreed((v) => !v)}
        label="I agree to the terms"
        required
      />
    </View>
  );
}`} language="tsx" />
      </Section>
    </FoundationPageShell>
  );
}

function CheckboxFieldDemo() {
  const [checked, setChecked] = useState(false);
  return (
    <CheckboxField
      checked={checked}
      onPress={() => setChecked((v) => !v)}
      label="I agree to the terms"
      required
    />
  );
}

function RadioGroupDemo() {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <div style={{ width: '100%' }}>
      <RadioGroup
        options={RADIO_OPTIONS}
        selected={selected}
        onSelect={setSelected}
      />
    </div>
  );
}

function RadioGroupCardsDemo() {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <div style={{ width: '100%' }}>
      <RadioGroup
        options={RADIO_OPTIONS}
        selected={selected}
        onSelect={setSelected}
        variant="cards"
      />
    </div>
  );
}

function DropdownFieldDemo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <div style={{ width: '100%' }}>
      <DropdownField
        options={DROPDOWN_OPTIONS}
        value={value}
        onSelect={setValue}
        placeholder="Select phone type"
        title="Phone type"
      />
    </div>
  );
}

function EmailFieldDemo() {
  const [value, setValue] = useState('');
  return (
    <div style={{ width: '100%' }}>
      <EmailField
        label="Email"
        required
        value={value}
        onChangeText={setValue}
        invalidEmailMessage="Please enter a valid email address"
      />
    </div>
  );
}

function PhoneNumberFieldDemo() {
  const [value, setValue] = useState('');
  return (
    <div style={{ width: '100%' }}>
      <PhoneNumberField
        label="Phone number"
        value={value}
        onChangeText={setValue}
      />
    </div>
  );
}

function PlaygroundFrame({ children }: { children: ReactNode }) {
  return (
    <PhoneFrame>
      <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        {children}
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
