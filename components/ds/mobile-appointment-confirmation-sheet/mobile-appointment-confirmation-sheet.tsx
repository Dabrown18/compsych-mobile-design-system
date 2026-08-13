'use client';

import { resolveIcon } from '../mobile-icon/mobile-icon';
import { Button } from '../mobile-button/mobile-button';

const Calendar = resolveIcon('Calendar');
const Clock = resolveIcon('Clock');
const Globe = resolveIcon('Globe');

export interface AppointmentConfirmationSheetProps {
  formattedDate: string;
  formattedTime: string;
  location: string;
  clientName: string;
  certificationNumber: string;
  discussionTopic: string;
  supportPhone?: string;
  onReturn: () => void;
  headingLabel?: string;
  subtitleLabel?: string;
  appointmentDetailsLabel?: string;
  dateLabel?: string;
  timeLabel?: string;
  locationLabel?: string;
  forYourRecordsLabel?: string;
  personSeeingLabel?: string;
  certificationNumberLabel?: string;
  discussionTopicLabel?: string;
  needToChangeLabel?: string;
  contactUsLabel?: string;
  returnButtonLabel?: string;
}

export function AppointmentConfirmationSheet({
  formattedDate,
  formattedTime,
  location,
  clientName,
  certificationNumber,
  discussionTopic,
  supportPhone,
  onReturn,
  headingLabel = "You're all set",
  subtitleLabel = 'A confirmation has been sent to your email.',
  appointmentDetailsLabel = 'Appointment details',
  dateLabel = 'Date',
  timeLabel = 'Time',
  locationLabel = 'Location',
  forYourRecordsLabel = 'For your records',
  personSeeingLabel = 'Person you are seeing',
  certificationNumberLabel = 'Certification number',
  discussionTopicLabel = 'Discussion topic',
  needToChangeLabel = 'Need to change your appointment?',
  contactUsLabel = 'Contact us at',
  returnButtonLabel = 'Return home',
}: AppointmentConfirmationSheetProps) {
  const detailRow = (Icon: typeof Calendar, label: string, value: string) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px' }}>
      {Icon && <Icon size={20} color="var(--sys-color-on-surface)" strokeWidth={1.5} />}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontSize: 13, color: 'var(--sys-color-on-surface-variant)' }}>{label}</span>
        <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--sys-color-on-surface)' }}>{value}</span>
      </div>
    </div>
  );

  const recordRow = (label: string, value: string) => (
    <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <span style={{ fontSize: 13, color: 'var(--sys-color-on-surface-variant)' }}>{label}</span>
      <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--sys-color-on-surface)' }}>{value}</span>
    </div>
  );

  const divider = <div style={{ height: 1, marginInline: 16, background: 'var(--sys-color-outline-variant)' }} />;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        padding: 16,
        paddingBottom: 32,
        background: 'var(--sys-color-surface)',
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', marginBlock: 8 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--sys-color-success-container)',
          }}
        >
          <span style={{ fontSize: 24, fontWeight: 700, color: 'var(--sys-color-success)' }}>✓</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, paddingInline: 8 }}>
        <h2 className="ref-heading-lg" style={{ margin: 0 }}>{headingLabel}</h2>
        <p className="ref-body" style={{ margin: 0, textAlign: 'center' }}>{subtitleLabel}</p>
      </div>

      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--sys-color-on-surface)' }}>
        {appointmentDetailsLabel}
      </span>

      <div style={{ background: 'var(--sys-color-surface-container-lowest)', borderRadius: 12, overflow: 'hidden' }}>
        {detailRow(Calendar, dateLabel, formattedDate)}
        {divider}
        {detailRow(Clock, timeLabel, formattedTime)}
        {divider}
        {detailRow(Globe, locationLabel, location)}
      </div>

      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--sys-color-on-surface)' }}>
        {forYourRecordsLabel}
      </span>

      <div style={{ background: 'var(--sys-color-surface-container-lowest)', borderRadius: 12, overflow: 'hidden' }}>
        {recordRow(personSeeingLabel, clientName)}
        {divider}
        {recordRow(certificationNumberLabel, certificationNumber)}
        {divider}
        {recordRow(discussionTopicLabel, discussionTopic)}
      </div>

      {supportPhone && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--sys-color-on-surface)' }}>
            {needToChangeLabel}
          </span>
          <span style={{ fontSize: 15, color: 'var(--sys-color-on-surface)' }}>{contactUsLabel} </span>
          <button
            type="button"
            onClick={() => {}}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              alignSelf: 'flex-start',
              fontSize: 15,
              fontWeight: 600,
              color: 'var(--sys-color-primary)',
              cursor: 'pointer',
            }}
          >
            {supportPhone}
          </button>
        </div>
      )}

      <Button
        variant="elevated"
        fullWidth
        label={returnButtonLabel}
        onClick={onReturn}
      />
    </div>
  );
}
