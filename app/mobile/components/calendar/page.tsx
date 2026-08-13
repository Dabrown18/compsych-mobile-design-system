'use client';

import { useState, type ReactNode } from 'react';
import { Calendar } from '@/components/ds/mobile-calendar/mobile-calendar';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { CodeBlock } from '@/components/code-block/code-block';

const AVAILABLE_TIMES = ['9:00 AM', '10:30 AM', '1:00 PM', '2:30 PM', '4:00 PM'];

export default function MobileCalendarPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="Calendar"
      description="A month calendar for picking a date, with an optional time-slot list that appears once a date is selected. Supports a bounded date range (today through maxMonthsAhead) and an optional allow-list of bookable dates. An optional info row can display the user's detected language and timezone."
    >
      <Section heading="Playground" lead="Pick a date to reveal the time-slot list.">
        <MobilePlayground
          render={(values) => (
            <CalendarDemo
              availableTimeLabel={values.availableTimeLabel as string}
              maxMonthsAhead={Number(values.maxMonthsAhead)}
              languageLabel={(values.languageLabel as string) || undefined}
              timezoneLabel={(values.timezoneLabel as string) || undefined}
            />
          )}
          controls={[
            { name: 'availableTimeLabel', type: 'string', label: 'Time list heading', defaultValue: 'Available times', placeholder: 'Available times' },
            { name: 'maxMonthsAhead', type: 'select', label: 'Max months ahead', options: ['1', '2', '3'], defaultValue: '1' },
            { name: 'languageLabel', type: 'string', label: 'Language label', defaultValue: 'English', placeholder: 'e.g. English' },
            { name: 'timezoneLabel', type: 'string', label: 'Timezone label', defaultValue: 'America/Chicago', placeholder: 'e.g. America/Chicago' },
          ]}
        />
      </Section>
      <Section heading="Code Example">
        <CodeBlock code={`import { useState } from 'react';
import { View } from 'react-native';
import { Calendar } from '@compsych/mobile-ui';

export default function Screen() {
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Calendar
        selectedDate={date}
        onSelectDate={setDate}
        selectedTime={time}
        onSelectTime={setTime}
        availableTimes={['9:00 AM', '10:30 AM', '1:00 PM']}
        availableTimeLabel="Available times"
        maxMonthsAhead={1}
        languageLabel="English"
        timezoneLabel="America/Chicago"
      />
    </View>
  );
}`} language="tsx" />
      </Section>

      <Section heading="Anatomy" lead="Calendar grid, optional time-slot list (once a date is selected), and an optional display-only language/timezone info row.">
        <Surface>
          <Calendar
            selectedDate={null}
            onSelectDate={() => {}}
            selectedTime={null}
            onSelectTime={() => {}}
            availableTimes={AVAILABLE_TIMES}
            availableTimeLabel="Available times"
            languageLabel="English"
            timezoneLabel="America/Chicago"
          />
        </Surface>
      </Section>
    </FoundationPageShell>
  );
}

function CalendarDemo({
  availableTimeLabel,
  maxMonthsAhead,
  languageLabel,
  timezoneLabel,
}: {
  availableTimeLabel: string;
  maxMonthsAhead: number;
  languageLabel?: string;
  timezoneLabel?: string;
}) {
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);

  return (
    <Calendar
      selectedDate={date}
      onSelectDate={setDate}
      selectedTime={time}
      onSelectTime={setTime}
      availableTimes={AVAILABLE_TIMES}
      availableTimeLabel={availableTimeLabel}
      maxMonthsAhead={maxMonthsAhead}
      languageLabel={languageLabel}
      timezoneLabel={timezoneLabel}
    />
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
