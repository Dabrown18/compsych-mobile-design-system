'use client';

import { useState, type ReactNode } from 'react';
import { Pagination, type PaginationSize } from '@/components/ds/mobile-pagination/mobile-pagination';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { CodeBlock } from '@/components/code-block/code-block';

const SIZES: PaginationSize[] = ['sm', 'lg'];

function PaginationDemo({ totalPages, compact, size }: { totalPages: number; compact: boolean; size: PaginationSize }) {
  const [current, setCurrent] = useState(1);
  return <Pagination size={size} totalPages={totalPages} currentPage={current} onPageChange={setCurrent} compact={compact} />;
}

export default function MobilePaginationPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="Pagination"
      description="Page navigation control for multi-page content. Full mode shows numbered page buttons with ellipsis when needed; compact mode shows only prev / next arrows — ideal for narrow mobile viewports. Two sizes: sm (32px items) and lg (40px items)."
    >
      <Section heading="Playground" lead="Change total pages or toggle compact mode to preview different layouts.">
        <MobilePlayground
          render={(values, setValue) => (
            <div style={{ padding: 24, display: 'flex', justifyContent: 'center', width: '100%' }}>
              <PaginationDemo
                totalPages={values.totalPages as number}
                compact={values.compact as boolean}
                size={values.size as PaginationSize}
              />
            </div>
          )}
          controls={[
            { name: 'totalPages', type: 'string', label: 'Total pages', defaultValue: '10', placeholder: 'Number' },
            { name: 'size', type: 'enum', label: 'Size', options: SIZES, defaultValue: 'lg' },
            { name: 'compact', type: 'boolean', label: 'Compact (arrows only)', defaultValue: false },
          ]}
        />
      </Section>
      <Section heading="Code Example">
        <CodeBlock code={`import { useState } from 'react';
import { View } from 'react-native';
import { Pagination } from '@compsych/mobile-ui';

export default function Screen() {
  const [page, setPage] = useState(1);

  return (
    <View style={{ padding: 16, alignItems: 'center', gap: 16 }}>
      <Pagination
        totalPages={10}
        currentPage={page}
        onPageChange={setPage}
        siblingCount={1}
        size="lg"
      />

      {/* Compact variant */}
      <Pagination
        totalPages={10}
        currentPage={page}
        onPageChange={setPage}
        compact
        size="sm"
      />
    </View>
  );
}`} language="tsx" />
      </Section>

      <Section heading="Full vs compact">
        <Surface>
          <div className="flex flex-col gap-6 w-full items-center">
            <div className="flex flex-col items-center gap-2">
              <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>full</code>
              <PaginationDemo totalPages={10} compact={false} size="lg" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>compact</code>
              <PaginationDemo totalPages={10} compact={true} size="lg" />
            </div>
          </div>
        </Surface>
      </Section>

      <Section heading="Sizes">
        <Surface>
          <div className="flex flex-col gap-4 w-full items-center">
            {SIZES.map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <code className="ref-caption font-mono" style={{ color: 'var(--sys-color-on-surface-variant)' }}>{s}</code>
                <PaginationDemo totalPages={5} compact={false} size={s} />
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
    <div className="rounded-lg p-8 flex items-start justify-center"
      style={{ border: '1px solid var(--sys-color-outline-variant)', backgroundColor: 'var(--sys-color-surface-container-low)' }}>
      {children}
    </div>
  );
}
