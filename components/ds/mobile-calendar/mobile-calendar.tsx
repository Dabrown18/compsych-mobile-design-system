'use client';

import { useCallback, useMemo, useState } from 'react';

import { resolveIcon } from '../mobile-icon/mobile-icon';

export interface CalendarProps {
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
  availableTimes: string[];
  availableTimeLabel: string;
  availableDates?: string[];
  maxMonthsAhead?: number;
  /** Display-only label for the user's current language, e.g. "English". Not interactive. */
  languageLabel?: string;
  /** Display-only label for the user's current timezone, e.g. "America/Chicago". Not interactive. */
  timezoneLabel?: string;
}

const DAY_HEADERS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

function toLocalDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function addMonths(date: Date, count: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + count, 1);
}

export function Calendar({
  selectedDate,
  onSelectDate,
  selectedTime,
  onSelectTime,
  availableTimes,
  availableTimeLabel,
  availableDates,
  maxMonthsAhead = 1,
  languageLabel,
  timezoneLabel,
}: CalendarProps) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const maxDate = useMemo(() => {
    const d = addMonths(today, maxMonthsAhead);
    return new Date(d.getFullYear(), d.getMonth() + 1, 0);
  }, [today, maxMonthsAhead]);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const canGoPrev = viewYear > today.getFullYear() || viewMonth > today.getMonth();

  const canGoNext = useMemo(() => {
    const maxMonth = addMonths(today, maxMonthsAhead);
    return (
      viewYear < maxMonth.getFullYear() ||
      (viewYear === maxMonth.getFullYear() && viewMonth < maxMonth.getMonth())
    );
  }, [viewYear, viewMonth, today, maxMonthsAhead]);

  const handlePrevMonth = useCallback(() => {
    if (!canGoPrev) return;
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  }, [canGoPrev, viewMonth]);

  const handleNextMonth = useCallback(() => {
    if (!canGoNext) return;
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  }, [canGoNext, viewMonth]);

  const monthLabel = useMemo(() => {
    const d = new Date(viewYear, viewMonth, 1);
    return d.toLocaleString('default', { month: 'long', year: 'numeric' });
  }, [viewYear, viewMonth]);

  const calendarDays = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const cells: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [viewYear, viewMonth]);

  const availableDatesSet = useMemo(
    () => (availableDates ? new Set(availableDates) : null),
    [availableDates],
  );

  const isDisabled = useCallback(
    (day: number) => {
      const d = new Date(viewYear, viewMonth, day);
      d.setHours(0, 0, 0, 0);
      if (d < today || d > maxDate) return true;
      if (availableDatesSet) {
        return !availableDatesSet.has(toLocalDateString(d));
      }
      return false;
    },
    [viewYear, viewMonth, today, maxDate, availableDatesSet],
  );

  const isSelected = useCallback(
    (day: number) => {
      const d = new Date(viewYear, viewMonth, day);
      return toLocalDateString(d) === selectedDate;
    },
    [viewYear, viewMonth, selectedDate],
  );

  const handleDayPress = useCallback(
    (day: number) => {
      if (isDisabled(day)) return;
      const d = new Date(viewYear, viewMonth, day);
      onSelectDate(toLocalDateString(d));
    },
    [viewYear, viewMonth, isDisabled, onSelectDate],
  );

  const LanguagesIcon = resolveIcon('Languages');
  const GlobeIcon = resolveIcon('Globe');

  const weeks: (number | null)[][] = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }

  return (
    <div
      data-testid="calendar-picker"
      style={{
        borderRadius: 16,
        border: '1px solid var(--sys-color-outline)',
        overflow: 'hidden',
        background: 'var(--sys-color-surface-container-lowest)',
        width: '100%',
        maxWidth: 340,
      }}
    >
      {/* Calendar section */}
      <div style={{ padding: '16px 8px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 8,
          }}
        >
          <button
            type="button"
            data-testid="calendar-prev-button"
            onClick={handlePrevMonth}
            disabled={!canGoPrev}
            aria-label="Previous month"
            style={{
              padding: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              background: 'transparent',
              cursor: canGoPrev ? 'pointer' : 'default',
              opacity: canGoPrev ? 1 : 0.3,
              color: 'var(--sys-color-on-surface)',
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            {'<'}
          </button>

          <p
            data-testid="calendar-month-label"
            style={{
              margin: 0,
              fontSize: 16,
              fontWeight: 600,
              textAlign: 'center',
              flex: 1,
              color: 'var(--sys-color-on-surface)',
            }}
          >
            {monthLabel}
          </p>

          <button
            type="button"
            data-testid="calendar-next-button"
            onClick={handleNextMonth}
            disabled={!canGoNext}
            aria-label="Next month"
            style={{
              padding: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              background: 'transparent',
              cursor: canGoNext ? 'pointer' : 'default',
              opacity: canGoNext ? 1 : 0.3,
              color: 'var(--sys-color-on-surface)',
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            {'>'}
          </button>
        </div>

        <div style={{ display: 'flex' }}>
          {DAY_HEADERS.map((h) => (
            <div key={h} style={{ flex: 1, textAlign: 'center' }}>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 500,
                  color: 'var(--sys-color-on-surface-variant)',
                }}
              >
                {h}
              </span>
            </div>
          ))}
        </div>

        {weeks.map((week, wi) => (
          <div key={wi} style={{ display: 'flex' }}>
            {week.map((day, di) => {
              if (day === null) {
                return (
                  <div
                    key={`empty-${di}`}
                    style={{ flex: 1, aspectRatio: '1' }}
                  />
                );
              }
              const disabled = isDisabled(day);
              const selected = isSelected(day);

              return (
                <button
                  key={day}
                  type="button"
                  data-testid={`calendar-day-${day}`}
                  onClick={() => handleDayPress(day)}
                  disabled={disabled}
                  aria-label={`Day ${day}`}
                  aria-disabled={disabled}
                  aria-pressed={selected}
                  style={{
                    flex: 1,
                    aspectRatio: '1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    background: 'transparent',
                    cursor: disabled ? 'default' : 'pointer',
                    opacity: disabled ? 0.3 : 1,
                    padding: 2,
                  }}
                >
                  <span
                    style={{
                      width: '80%',
                      aspectRatio: '1',
                      borderRadius: 999,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 13,
                      fontWeight: 500,
                      background:
                        !disabled && !selected
                          ? 'var(--sys-color-surface-container-highest)'
                          : 'transparent',
                      border: selected ? '2px solid var(--sys-color-primary)' : 'none',
                      color: selected ? 'var(--sys-color-primary)' : 'var(--sys-color-on-surface)',
                    }}
                  >
                    {day}
                  </span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Divider + time section */}
      {selectedDate != null && (
        <>
          <div style={{ height: 1, width: '100%', background: 'var(--sys-color-outline)' }} />
          <div style={{ padding: 16 }}>
            <p
              data-testid="available-time-label"
              style={{
                margin: '0 0 12px',
                fontSize: 14,
                fontWeight: 500,
                textAlign: 'center',
                color: 'var(--sys-color-on-surface)',
              }}
            >
              {availableTimeLabel}
            </p>
            <div
              data-testid="time-slot-list"
              style={{
                maxHeight: 200,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              {availableTimes.map((slot) => {
                const slotTestId = `time-slot-${slot.replace(/[: ]/g, '-')}`;
                const slotSelected = slot === selectedTime;
                return (
                  <button
                    key={slot}
                    type="button"
                    data-testid={slotTestId}
                    onClick={() => onSelectTime(slot)}
                    aria-pressed={slotSelected}
                    style={{
                      borderRadius: 12,
                      padding: '12px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      background: 'var(--sys-color-surface-container-lowest)',
                      border: slotSelected
                        ? '2px solid var(--sys-color-primary)'
                        : '1.5px solid var(--sys-color-outline)',
                      color: slotSelected ? 'var(--sys-color-primary)' : 'var(--sys-color-on-surface)',
                      fontSize: 14,
                    }}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Language / timezone info row — display-only, not interactive */}
      {(languageLabel || timezoneLabel) && (
        <>
          <div style={{ height: 1, width: '100%', background: 'var(--sys-color-outline)' }} />
          <div
            data-testid="calendar-info-row"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '12px 16px',
            }}
          >
            {languageLabel && (
              <div
                data-testid="calendar-language-info"
                style={{ display: 'flex', alignItems: 'center', gap: 6 }}
              >
                {LanguagesIcon && (
                  <LanguagesIcon size={16} color="var(--sys-color-on-surface-variant)" strokeWidth={1.5} />
                )}
                <span
                  style={{ fontSize: 13, fontWeight: 500, color: 'var(--sys-color-on-surface-variant)' }}
                >
                  {languageLabel}
                </span>
              </div>
            )}
            {timezoneLabel && (
              <div
                data-testid="calendar-timezone-info"
                style={{ display: 'flex', alignItems: 'center', gap: 6 }}
              >
                {GlobeIcon && (
                  <GlobeIcon size={16} color="var(--sys-color-on-surface-variant)" strokeWidth={1.5} />
                )}
                <span
                  style={{ fontSize: 13, fontWeight: 500, color: 'var(--sys-color-on-surface-variant)' }}
                >
                  {timezoneLabel}
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
