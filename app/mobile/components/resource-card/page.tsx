'use client';

import { type ReactNode } from 'react';
import { ResourceCard } from '@/components/ds/mobile-resource-card/mobile-resource-card';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { CodeBlock } from '@/components/code-block/code-block';
import { PhoneFrame } from '@/components/phone-frame/phone-frame';

export default function MobileResourceCardPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="ResourceCard"
      description="A pressable article/video/resource card — icon badge and type label above a title and optional description, over a subtle gradient wash. The caller supplies the type label and icon directly (no built-in asset-type mapping), so it stays reusable across any content taxonomy."
    >
      <Section heading="Playground">
        <MobilePlayground
          render={(values) => (
            <PhoneFrame>
              <div style={{ paddingTop: 16 }}>
                <ResourceCard
                  title={values.title as string}
                  description={(values.description as string) || undefined}
                  typeLabel={values.typeLabel as string}
                  icon="Newspaper"
                  onPress={() => {}}
                />
              </div>
            </PhoneFrame>
          )}
          controls={[
            { name: 'typeLabel', type: 'string', label: 'Type label', defaultValue: 'Article', placeholder: 'Article' },
            { name: 'title', type: 'string', label: 'Title', defaultValue: 'Having Your First Child', placeholder: 'Resource title' },
            {
              name: 'description',
              type: 'string',
              label: 'Description',
              defaultValue: 'Use the following information to help guide you along the way from pre- to post-natal health for both you and your child.',
              placeholder: 'Resource description',
            },
          ]}
        />
      </Section>
      <Section heading="Code Example">
        <CodeBlock code={`import { ResourceCard } from '@compsych/mobile-ui';

export function ResourceList({ resources, onSelect }) {
  return resources.map((resource) => (
    <ResourceCard
      key={resource.nodeId}
      title={resource.longTitle}
      description={resource.abstractText}
      typeLabel={getResourceTypeLabel(resource.assetType)}
      icon={getResourceTypeIcon(resource.assetType)}
      onPress={() => onSelect(resource)}
      testID={\`resource-card-\${resource.nodeId}\`}
    />
  ));
}`} language="tsx" />
      </Section>

      <Section heading="Anatomy" lead="Icon badge + type label row, then title and optional description, inside a gradient-washed inner card.">
        <Surface>
          <PhoneFrame>
            <div style={{ paddingTop: 16 }}>
              <ResourceCard
                title="Adopting a Stepchild"
                description="Although many families are content with stepparent-stepchild relationships, sometimes a stepparent decides to adopt their stepchildren."
                typeLabel="Article"
                icon="Newspaper"
                onPress={() => {}}
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
