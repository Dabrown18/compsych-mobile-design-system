'use client';

import { useState, type ReactNode } from 'react';

import { type SnackbarVariant } from '@/components/ds/mobile-snackbar/mobile-snackbar';

import { CodeBlock } from '@/components/code-block/code-block';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';

const VARIANTS: SnackbarVariant[] = ['filled', 'outlined'];

// ── Static preview ─────────────────────────────────────────────────────────────
// The real Snackbar is position:absolute + animated, so it can't be rendered
// inline in a gallery surface. This purely-web card mirrors the exact design
// tokens without any positioning or animation — used only for static sections.

function SnackbarPreview({
  variant = 'filled',
  message,
  actionLabel,
  onAction,
  onClose,
}: {
  variant?: SnackbarVariant;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  onClose?: () => void;
}) {
  const isFilled = variant === 'filled';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '12px 16px',
        borderRadius: 12,
        gap: 16,
        width: '100%',
        boxSizing: 'border-box',
        // filled: dark primary-container; outlined: white surface
        background: isFilled
          ? 'var(--sys-color-primary-container, #070f36)'
          : 'var(--sys-color-surface-container-lowest, #fff)',
        // outlined: thin border to define edge on light backgrounds
        border: isFilled
          ? 'none'
          : '1px solid var(--sys-color-outline-variant, #d7dbe0)',
        // Elevation/lv3: radius 16 + radius 6 from Figma
        boxShadow: '0 4px 16px rgba(0,0,0,0.16), 0 2px 6px rgba(0,0,0,0.12)',
      }}
    >
      {/* Message — body-medium, weight 400, 16px */}
      <p
        style={{
          flex: 1,
          margin: 0,
          minWidth: 0,
          fontSize: 16,
          fontWeight: 400,
          lineHeight: '24px',
          color: isFilled ? '#ffffff' : 'var(--sys-color-on-surface, #1b1d22)',
          fontFamily: "'GoogleSans_400Regular', sans-serif",
          letterSpacing: 0,
        }}
      >
        {message}
      </p>

      {/* Action slot */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          flexShrink: 0,
        }}
      >
        {/* Action button — label-medium, weight 500, 14px */}
        {actionLabel && (
          <button
            type="button"
            onClick={onAction}
            style={{
              background: 'none',
              border: 'none',
              padding: '4px 0',
              fontSize: 14,
              fontWeight: 500,
              lineHeight: '20px',
              letterSpacing: '0.07px',
              color: isFilled ? '#ffffff' : 'var(--sys-color-primary, #075cba)',
              fontFamily: "'GoogleSans_500Medium', sans-serif",
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {actionLabel}
          </button>
        )}

        {/* Close button — 24×24 pill */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Dismiss"
            style={{
              width: 24,
              height: 24,
              borderRadius: 9999,
              background: isFilled
                ? 'rgba(255,255,255,0.1)'
                : 'var(--sys-color-surface-container, #f3f4f6)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: 0,
              flexShrink: 0,
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width={16}
              height={16}
              fill="none"
              stroke={
                isFilled
                  ? '#ffffff'
                  : 'var(--sys-color-on-surface-variant, #565f6c)'
              }
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

// ── Interactive demo ───────────────────────────────────────────────────────────
// Fixed 375px width so the snackbar renders at realistic mobile proportions.
// Uses the HTML SnackbarPreview (not the RN component) to avoid react-native-web
// positioning quirks — the visual is identical to the Variants section below.

function SnackbarDemo({
  message,
  variant,
  actionLabel,
}: {
  message: string;
  variant: SnackbarVariant;
  actionLabel?: string;
}) {
  const [visible, setVisible] = useState(true);
  return (
    <div
      style={{
        width: 375,
        maxWidth: '100%',
        position: 'relative',
        minHeight: 180,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        padding: '24px 0',
      }}
    >
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        style={{
          height: 44,
          paddingInline: 24,
          borderRadius: 9999,
          border: 'none',
          background: 'var(--sys-color-primary)',
          color: 'var(--sys-color-on-primary)',
          fontSize: 15,
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        {visible ? 'Hide snackbar' : 'Show snackbar'}
      </button>

      {/* Snackbar anchored to bottom of the 375px container */}
      <div
        style={{
          position: 'absolute',
          bottom: 16,
          left: 16,
          right: 16,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 200ms ease, transform 200ms ease',
          pointerEvents: visible ? 'auto' : 'none',
        }}
      >
        <SnackbarPreview
          variant={variant}
          message={message}
          actionLabel={actionLabel}
          onAction={() => setVisible(false)}
          onClose={() => setVisible(false)}
        />
      </div>
    </div>
  );
}

export default function MobileSnackbarPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="Snackbar"
      description="A transient notification that appears at the bottom of the screen. Two variants: filled (dark primary-container surface) and outlined (white surface with outline-variant border and shadow). Optional action button provides a single recovery path. Controlled by visible — dismiss with onClose."
    >
      <Section
        heading="Playground"
        lead="Tap 'Show snackbar' to preview. Change variant, message, and action label."
      >
        <MobilePlayground
          render={(values) => (
            <SnackbarDemo
              message={values.message as string}
              variant={values.variant as SnackbarVariant}
              actionLabel={(values.actionLabel as string) || undefined}
            />
          )}
          controls={[
            {
              name: 'variant',
              type: 'enum',
              label: 'Variant',
              options: VARIANTS,
              defaultValue: 'filled',
            },
            {
              name: 'message',
              type: 'string',
              label: 'Message',
              defaultValue: 'Appointment saved',
              placeholder: 'Message',
            },
            {
              name: 'actionLabel',
              type: 'string',
              label: 'Action label',
              defaultValue: 'Undo',
              placeholder: 'Leave empty to hide',
            },
          ]}
        />
      </Section>

      <Section heading="Code Example">
        <CodeBlock
          code={`import { useState } from 'react';
import { View } from 'react-native';
import { Snackbar } from '@compsych/mobile-ui';

export default function Screen() {
  const [visible, setVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Button label="Save changes" onPress={() => setVisible(true)} />

      {/* filled (default) — dark primary-container surface */}
      <Snackbar
        visible={visible}
        message="Changes saved successfully"
        actionLabel="Undo"
        onAction={() => {}}
        onClose={() => setVisible(false)}
      />

      {/* outlined — white surface with shadow, no border */}
      <Snackbar
        variant="outlined"
        visible={visible}
        message="Changes saved successfully"
        actionLabel="Undo"
        onAction={() => {}}
        onClose={() => setVisible(false)}
      />
    </View>
  );
}`}
          language="tsx"
        />
      </Section>

      <Section
        heading="Variants"
        lead="filled uses the dark primary-container (#070f36) background. outlined uses a white surface with a thin outline-variant border and shadow. Both support an optional action button and a dismiss button."
      >
        <Surface>
          <div className="flex flex-col gap-6 w-full max-w-sm">
            {VARIANTS.map((v) => (
              <div key={v} className="flex flex-col gap-3">
                <code
                  className="ref-caption font-mono"
                  style={{ color: 'var(--sys-color-on-surface-variant)' }}
                >
                  {v}
                </code>
                <div className="flex flex-col gap-2">
                  {/* with action + close */}
                  <SnackbarPreview
                    variant={v}
                    message="Appointment saved"
                    actionLabel="Undo"
                    onAction={() => {}}
                    onClose={() => {}}
                  />
                  {/* close only */}
                  <SnackbarPreview
                    variant={v}
                    message="Appointment saved"
                    onClose={() => {}}
                  />
                </div>
              </div>
            ))}
          </div>
        </Surface>
      </Section>
    </FoundationPageShell>
  );
}

function Section({
  heading,
  lead,
  children,
}: {
  heading: string;
  lead?: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1 max-w-3xl">
        <h2 className="ref-heading-lg" style={{ margin: 0 }}>
          {heading}
        </h2>
        {lead && (
          <p
            className="ref-body"
            style={{ color: 'var(--sys-color-on-surface-variant)', margin: 0 }}
          >
            {lead}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}

function Surface({ children }: { children: ReactNode }) {
  return (
    <div
      className="rounded-lg p-8 flex items-start justify-center"
      style={{
        border: '1px solid var(--sys-color-outline-variant)',
        backgroundColor: 'var(--sys-color-surface-container-low)',
      }}
    >
      {children}
    </div>
  );
}
