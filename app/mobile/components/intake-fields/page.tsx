'use client';

import { useState, type ReactNode } from 'react';
import { IntakeFields } from '@/components/ds/mobile-intake-fields/mobile-intake-fields';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { CodeBlock } from '@/components/code-block/code-block';
import { PhoneFrame } from '@/components/phone-frame/phone-frame';

const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

const AGE_RANGE_OPTIONS = ['18-24', '25-34', '35-44', '45-54', '55+'].map((v) => ({ value: v, label: v }));

const US_STATE_OPTIONS = ['California', 'New York', 'Texas'].map((v) => ({ value: v, label: v }));

const BENEFIT_HOLDER_OPTIONS = [
  { value: 'primary', label: 'Primary benefit holder' },
  { value: 'spouse', label: 'Spouse' },
  { value: 'dependent', label: 'Dependent' },
];

export default function MobileIntakeFieldsPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="IntakeFields"
      description="A pre-composed intake form section — description, first/last name, gender identity, age range, age confirmation, US state, and benefit holder relationship — built entirely from FormFields and Input. Use this instead of hand-assembling the same eight fields on every intake-style screen."
    >
      <Section heading="Playground">
        <MobilePlayground
          render={() => <IntakeFieldsDemo />}
          controls={[]}
        />
      </Section>
      <Section heading="Code Example">
        <CodeBlock code={`import { useState } from 'react';
import { ScrollView } from 'react-native';
import { IntakeFields } from '@compsych/mobile-ui';

export default function IntakeScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other' | null>(null);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  // ...one state slot per field

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <IntakeFields
        firstName={{ label: 'First name', value: firstName, onChangeText: setFirstName, testID: 'first-name' }}
        lastName={{ label: 'Last name', value: lastName, onChangeText: setLastName, testID: 'last-name' }}
        genderIdentity={{
          label: 'Gender identity',
          required: true,
          options: [
            { value: 'male', label: 'Male', testID: 'gender-male' },
            { value: 'female', label: 'Female', testID: 'gender-female' },
          ],
          selected: gender,
          onSelect: setGender,
        }}
        ageConfirmed={{
          label: 'I confirm I am 18 or older',
          checked: ageConfirmed,
          onPress: () => setAgeConfirmed((v) => !v),
          testID: 'age-confirm-row',
          checkboxTestID: 'age-confirm-checkbox',
        }}
        // ...ageRange, usState, benefitHolderRelationship
      />
    </ScrollView>
  );
}`} language="tsx" />
      </Section>
    </FoundationPageShell>
  );
}

function IntakeFieldsDemo() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState<string | null>(null);
  const [ageRange, setAgeRange] = useState<string | null>(null);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [usState, setUsState] = useState<string | null>(null);
  const [benefitHolder, setBenefitHolder] = useState<string | null>(null);

  return (
    <PhoneFrame>
      <div style={{ height: '100%', overflowY: 'auto', padding: 16 }}>
        <IntakeFields
          firstName={{ label: 'First name', value: firstName, onChangeText: setFirstName }}
          lastName={{ label: 'Last name', value: lastName, onChangeText: setLastName }}
          genderIdentity={{
            label: 'Gender identity',
            required: true,
            options: GENDER_OPTIONS,
            selected: gender,
            onSelect: setGender,
          }}
          ageRange={{
            label: 'Age range',
            options: AGE_RANGE_OPTIONS,
            value: ageRange,
            onSelect: setAgeRange,
            placeholder: 'Select age range',
            title: 'Age range',
          }}
          ageConfirmed={{
            label: 'I confirm I am 18 or older',
            checked: ageConfirmed,
            onPress: () => setAgeConfirmed((v) => !v),
            required: true,
          }}
          usState={{
            label: 'US state',
            options: US_STATE_OPTIONS,
            value: usState,
            onSelect: setUsState,
            placeholder: 'Select state',
            title: 'US state',
          }}
          benefitHolderRelationship={{
            label: 'Which of the following best describes you?',
            required: true,
            options: BENEFIT_HOLDER_OPTIONS,
            selected: benefitHolder,
            onSelect: setBenefitHolder,
          }}
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
