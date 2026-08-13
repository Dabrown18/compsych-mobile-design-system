'use client';

import { type ReactNode } from 'react';
import { AppointmentConfirmationSheet } from '@/components/ds/mobile-appointment-confirmation-sheet/mobile-appointment-confirmation-sheet';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { CodeBlock } from '@/components/code-block/code-block';
import { PhoneFrame } from '@/components/phone-frame/phone-frame';

export default function MobileAppointmentConfirmationSheetPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="AppointmentConfirmationSheet"
      description="A scrollable post-booking confirmation screen — success icon, appointment details card, a for-your-records card, an optional reschedule/contact section, and a return button. Every string is an individually-overridable label prop with a sensible English default, so it ships usable out of the box but stays fully translatable."
    >
      <Section heading="Playground" lead="Toggle the support phone off to see the 'need to change' section disappear.">
        <MobilePlayground
          render={(values) => (
            <PhoneFrame>
              <div style={{ height: '100%', overflowY: 'auto' }}>
                <AppointmentConfirmationSheet
                  formattedDate="Monday, February 2nd, 2026"
                  formattedTime="11:00 AM - 12:00 PM (CST)"
                  location="America/Chicago"
                  clientName="Jane Doe"
                  certificationNumber="2842418"
                  discussionTopic="Back Care"
                  supportPhone={(values.showSupportPhone as boolean) ? '800-272-7255' : undefined}
                  onReturn={() => {}}
                />
              </div>
            </PhoneFrame>
          )}
          controls={[{ name: 'showSupportPhone', type: 'boolean', label: 'Show support phone', defaultValue: true }]}
        />
      </Section>
      <Section heading="Code Example">
        <CodeBlock code={`import { AppointmentConfirmationSheet } from '@compsych/mobile-ui';

export default function ConfirmationScreen({ appointment, onReturn }) {
  return (
    <AppointmentConfirmationSheet
      formattedDate={appointment.formattedDate}
      formattedTime={appointment.formattedTime}
      location={appointment.location}
      clientName={appointment.clientName}
      certificationNumber={appointment.certificationNumber}
      discussionTopic={appointment.discussionTopic}
      supportPhone={appointment.supportPhone}
      onReturn={onReturn}
      // Every label below is optional — override for i18n, otherwise
      // sensible English defaults are used.
      headingLabel={t('confirmation.heading')}
      subtitleLabel={t('confirmation.subtitle')}
      returnButtonLabel={t('confirmation.returnButton')}
    />
  );
}`} language="tsx" />
      </Section>

      <Section heading="Anatomy" lead="Success icon, appointment details, for-your-records, optional change section, return button.">
        <Surface>
          <PhoneFrame>
            <div style={{ height: '100%', overflowY: 'auto' }}>
              <AppointmentConfirmationSheet
                formattedDate="Monday, February 2nd, 2026"
                formattedTime="11:00 AM - 12:00 PM (CST)"
                location="America/Chicago"
                clientName="Jane Doe"
                certificationNumber="2842418"
                discussionTopic="Back Care"
                supportPhone="800-272-7255"
                onReturn={() => {}}
              />
            </div>
          </PhoneFrame>
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
    <div className="rounded-lg p-8 flex items-center justify-center"
      style={{ border: '1px solid var(--sys-color-outline-variant)', backgroundColor: 'var(--sys-color-surface-container-low)' }}>
      {children}
    </div>
  );
}
