'use client';

import { useState, type ReactNode } from 'react';
import { PrimaryBenefitHolderFields } from '@/components/ds/mobile-primary-benefit-holder-fields/mobile-primary-benefit-holder-fields';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { CodeBlock } from '@/components/code-block/code-block';
import { PhoneFrame } from '@/components/phone-frame/phone-frame';

const GROUP_OPTIONS = [
  { value: 1, label: 'Group A' },
  { value: 2, label: 'Group B' },
];

const PHONE_TYPE_OPTIONS = ['Mobile', 'Home', 'Work'].map((v) => ({ value: v, label: v }));

export default function MobilePrimaryBenefitHolderFieldsPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="PrimaryBenefitHolderFields"
      description="A pre-composed benefit-holder form section — first/last name, a read-only employer field, a group dropdown that shows a loading spinner while options are fetched, phone number, phone type, email, and follow-up consent. Built entirely from FormFields and Input, same as IntakeFields."
    >
      <Section heading="Playground" lead="Toggle 'Loading groups' to see the spinner replace the group dropdown.">
        <MobilePlayground
          render={(values) => <PrimaryBenefitHolderFieldsDemo isLoadingGroups={values.isLoadingGroups as boolean} />}
          controls={[{ name: 'isLoadingGroups', type: 'boolean', label: 'Loading groups', defaultValue: false }]}
        />
      </Section>
      <Section heading="Code Example">
        <CodeBlock code={`import { useState } from 'react';
import { ScrollView } from 'react-native';
import { PrimaryBenefitHolderFields } from '@compsych/mobile-ui';

export default function BenefitHolderStep() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [groupId, setGroupId] = useState<number | null>(null);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [followUp, setFollowUp] = useState(false);
  const { data: groups, isLoading } = useGetGroupsQuery();

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <PrimaryBenefitHolderFields
        firstName={{ label: 'First name', value: firstName, onChangeText: setFirstName, testID: 'first-name' }}
        lastName={{ label: 'Last name', value: lastName, onChangeText: setLastName, testID: 'last-name' }}
        employerLabel="Employer"
        employer={employerName}
        employerTestID="employer"
        isLoadingGroups={isLoading}
        groupsLoadingTestID="groups-loading"
        group={{
          label: 'Group', options: groups ?? [], value: groupId, onSelect: setGroupId,
          placeholder: 'Select group', title: 'Group', triggerTestID: 'group-dropdown',
        }}
        // ...phoneNumber, phoneType, email, followUpConsent
      />
    </ScrollView>
  );
}`} language="tsx" />
      </Section>
    </FoundationPageShell>
  );
}

function PrimaryBenefitHolderFieldsDemo({ isLoadingGroups }: { isLoadingGroups: boolean }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [groupId, setGroupId] = useState<number | null>(null);
  const [phone, setPhone] = useState('');
  const [phoneType, setPhoneType] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [followUp, setFollowUp] = useState(false);

  return (
    <PhoneFrame>
      <div style={{ height: '100%', overflowY: 'auto', padding: 16 }}>
        <PrimaryBenefitHolderFields
          firstName={{ label: 'First name', value: firstName, onChangeText: setFirstName }}
          lastName={{ label: 'Last name', value: lastName, onChangeText: setLastName }}
          employerLabel="Employer"
          employer="Acme Corp"
          isLoadingGroups={isLoadingGroups}
          group={{
            label: 'Group',
            options: GROUP_OPTIONS,
            value: groupId,
            onSelect: setGroupId,
            placeholder: 'Select group',
            title: 'Group',
          }}
          phoneNumber={{ label: 'Phone number', value: phone, onChangeText: setPhone }}
          phoneType={{
            label: 'Phone type',
            options: PHONE_TYPE_OPTIONS,
            value: phoneType,
            onSelect: setPhoneType,
            placeholder: 'Select type',
            title: 'Phone type',
          }}
          email={{
            label: 'Email',
            required: true,
            value: email,
            onChangeText: setEmail,
            invalidEmailMessage: 'Please enter a valid email address',
          }}
          followUpConsent={{
            label: 'Follow up with me',
            checked: followUp,
            onPress: () => setFollowUp((v) => !v),
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
