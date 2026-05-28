'use client';

import type { ReactNode } from 'react';

import {
  ServiceCard,
  type IconName,
  type ServiceCardSize,
  type ServiceCardVariant,
} from '@/components/ds/mobile-card/mobile-card';

import { CodeBlock } from '@/components/code-block/code-block';
import { FoundationPageShell } from '@/components/foundation-page-shell';
import { MobilePlayground } from '@/components/mobile-playground/mobile-playground';

const VARIANTS: ServiceCardVariant[] = ['outlined', 'tonal', 'filled', 'doubled', 'image'];
const SIZES: ServiceCardSize[] = ['sm', 'md', 'lg'];

const ICON_NAMES: IconName[] = [
  'ActivityIcon', 'ArrowLeftIcon', 'AtomIcon', 'AwardIcon', 'BabyIcon',
  'BinocularsIcon', 'BlendIcon', 'BookCheckIcon', 'BookMarkedIcon', 'BookOpenTextIcon',
  'BookUserIcon', 'BoxIcon', 'BriefcaseBusinessIcon', 'BuildingIcon', 'CalculatorIcon',
  'CalendarDaysIcon', 'CannabisIcon', 'CaptionsIcon', 'ChartColumnBigIcon', 'ChartPieIcon',
  'CheckCheckIcon', 'CigaretteIcon', 'CircleCheckBigIcon', 'CirclePlusIcon', 'ClipboardCheckIcon',
  'CloudCheckIcon', 'CompassIcon', 'DogIcon', 'DownloadIcon', 'EllipsisIcon',
  'FileChartColumnIncreasingIcon', 'FileQuestionIcon', 'FlagIcon', 'FrownIcon', 'GlobeIcon',
  'GraduationCapIcon', 'HandHeartIcon', 'HandshakeIcon', 'HazeIcon', 'HeartIcon',
  'HeartHandshakeIcon', 'HeartPlusIcon', 'HospitalIcon', 'HouseHeartIcon', 'HouseWifiIcon',
  'HourglassIcon', 'IdCardIcon', 'ImagePlayIcon', 'InboxIcon', 'LandPlotIcon',
  'LassoIcon', 'LayersIcon', 'ListTodoIcon', 'LockIcon', 'LockKeyholeIcon',
  'LockOpenIcon', 'MapIcon', 'MapPinPlusIcon', 'MapPinnedIcon', 'MaximizeIcon',
  'MegaphoneIcon', 'MessageCircleMoreIcon', 'MessageCirclePlusIcon', 'MicIcon', 'MicOffIcon',
  'MinimizeIcon', 'MonitorPlayIcon', 'MoonIcon', 'MountainSnowIcon', 'PanelsTopLeftIcon',
  'PenLineIcon', 'PhoneIcon', 'PhoneOffIcon', 'PodcastIcon', 'PresentationIcon',
  'RotateCcwIcon', 'ScanFaceIcon', 'ScanHeartIcon', 'ScanSearchIcon', 'ScrollTextIcon',
  'SendIcon', 'SendHorizontalIcon', 'SettingsIcon', 'ShieldUserIcon', 'SkipBackIcon',
  'SkipForwardIcon', 'SmartphoneIcon', 'SmileIcon', 'SnowflakeIcon', 'SquareArrowOutUpRightIcon',
  'SquaresExcludeIcon', 'StarIcon', 'StethoscopeIcon', 'StickyNoteIcon', 'TabletSmartphoneIcon',
  'TextIcon', 'ThumbsDownIcon', 'ThumbsUpIcon', 'TicketsPlaneIcon', 'TrashIcon',
  'TrendingUpIcon', 'TvMinimalIcon', 'TvMinimalPlayIcon', 'UserRoundIcon', 'UserRoundCheckIcon',
  'UsersIcon', 'UsersRoundIcon', 'VideoOffIcon', 'VolumeIcon', 'Volume1Icon',
  'Volume2Icon', 'VolumeOffIcon', 'VolumeXIcon', 'WarehouseIcon', 'WheatIcon',
];

const DEFAULT_ICON: IconName = 'StethoscopeIcon';

// Stable hero photo used as the default background for the image variant
const CARD_IMAGE = { uri: '/images/service-card-hero.jpg' };

// Shared display width for all card sizes in the sandbox — 1/8 larger than the
// Figma spec (358 × 1.125 ≈ 403). Applied via the style prop so the component
// itself stays dimension-free.
const CARD_WIDTH = 403;
const CARD_WIDTH_STYLE = { width: CARD_WIDTH };
const LG_DISPLAY_STYLE = { width: CARD_WIDTH, height: 164, justifyContent: 'space-between' as const };

// Arrow circle button — used as buttonIcon on lg/md cards
const ArrowButton = ({ light = false }: { light?: boolean }) => (
  <div
    style={{
      width: 36,
      height: 36,
      borderRadius: '50%',
      background: light ? 'rgba(255,255,255,0.9)' : '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
    }}
  >
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1b1d22"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={16}
      height={16}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  </div>
);

export default function MobileServiceCardPage() {
  return (
    <FoundationPageShell
      eyebrow="Mobile"
      title="ServiceCard"
      description="Content surface with five visual variants and three layout sizes. Supports a title, description, icon, and image. The sm size uses a horizontal row layout with a chevron; md/lg use a vertical column layout with an optional bottom-right button icon. Set interactive or onPress to make the card tappable."
    >
      <Section
        heading="Playground"
        lead="Adjust variant, size, icon, and content to preview every combination."
      >
        <MobilePlayground
          render={(values) => (
            <ServiceCard
              variant={values.variant as ServiceCardVariant}
              size={values.size as ServiceCardSize}
              title={values.title as string}
              description={values.description as string}
              icon={(values.icon as IconName) || undefined}
              image={values.variant === 'image' ? CARD_IMAGE : undefined}
              buttonIcon={
                values.size !== 'sm' ? <ArrowButton light={values.variant === 'image'} /> : undefined
              }
              interactive={values.interactive as boolean}
              style={values.size === 'lg' ? LG_DISPLAY_STYLE : CARD_WIDTH_STYLE}
            />
          )}
          controls={[
            {
              name: 'variant',
              type: 'enum',
              label: 'Variant',
              options: VARIANTS,
              defaultValue: 'outlined',
            },
            {
              name: 'size',
              type: 'enum',
              label: 'Size',
              options: SIZES,
              defaultValue: 'lg',
            },
            {
              name: 'icon',
              type: 'select',
              label: 'Icon',
              options: ICON_NAMES,
              defaultValue: DEFAULT_ICON,
              placeholder: '— none —',
            },
            {
              name: 'title',
              type: 'string',
              label: 'Title',
              defaultValue: 'Therapy Session',
              placeholder: 'Card title',
            },
            {
              name: 'description',
              type: 'string',
              label: 'Description',
              defaultValue: 'Tuesday, June 3 · 2:00 PM with Dr. Patel',
              placeholder: 'Card description',
            },
            { name: 'interactive', type: 'boolean', label: 'Interactive', defaultValue: false },
          ]}
        />
      </Section>

      <Section heading="Code Example">
        <CodeBlock
          code={`import { ServiceCard, type IconName } from '@compsych/mobile-ui';

// lg — full column layout with icon and arrow button
<ServiceCard
  variant="outlined"
  size="lg"
  title="Therapy Session"
  description="Tuesday, June 3 · 2:00 PM"
  icon="StethoscopeIcon"
  buttonIcon={<ArrowButton />}
/>

// sm — horizontal row with built-in chevron
<ServiceCard variant="tonal" size="sm" title="Schedule" icon="HeartHandshakeIcon" interactive onPress={() => {}} />

// image — photo background with overlay
<ServiceCard variant="image" size="lg" title="Mental Health" description="Resources and tools" icon="HandHeartIcon" image={require('./photo.jpg')} />`}
          language="tsx"
        />
      </Section>

      <Section
        heading="Variants"
        lead="Five visual styles: outlined (default + shadow), tonal (primary-fixed), filled (primary-container bg), doubled (nested card), image (photo background)."
      >
        <Surface>
          <div className="flex flex-col gap-4 w-full max-w-2xl">
            {VARIANTS.map((v) => (
              <div key={v} className="flex flex-col gap-1">
                <code
                  className="ref-caption font-mono"
                  style={{ color: 'var(--sys-color-on-surface-variant)' }}
                >
                  {v}
                </code>
                <ServiceCard
                  variant={v}
                  size="lg"
                  title="Upcoming Appointment"
                  description="Tuesday, June 3 · 2:00 PM"
                  icon={DEFAULT_ICON}
                  image={v === 'image' ? CARD_IMAGE : undefined}
                  buttonIcon={<ArrowButton light={v === 'image'} />}
                  style={LG_DISPLAY_STYLE}
                />
              </div>
            ))}
          </div>
        </Surface>
      </Section>

      <Section
        heading="Sizes"
        lead="sm uses a horizontal row with a built-in chevron; md and lg use a vertical column with an arrow button in the bottom-right corner."
      >
        <Surface>
          <div className="flex flex-col gap-4 w-full max-w-2xl">
            {SIZES.map((s) => (
              <div key={s} className="flex flex-col gap-1">
                <code
                  className="ref-caption font-mono"
                  style={{ color: 'var(--sys-color-on-surface-variant)' }}
                >
                  {s}
                </code>
                <ServiceCard
                  size={s}
                  title="Session with Dr. Patel"
                  description="Tuesday · 2:00 PM"
                  icon={DEFAULT_ICON}
                  buttonIcon={s !== 'sm' ? <ArrowButton /> : undefined}
                  style={s === 'lg' ? LG_DISPLAY_STYLE : CARD_WIDTH_STYLE}
                />
              </div>
            ))}
          </div>
        </Surface>
      </Section>

      <Section
        heading="Interactive"
        lead="Pass onPress (or interactive) to turn the card into a Pressable with pressed-opacity feedback."
      >
        <Surface>
          <div className="flex flex-col gap-4 w-full max-w-2xl">
            <ServiceCard
              variant="outlined"
              size="sm"
              title="View plan details"
              description="8 sessions · $0 copay"
              icon="IdCardIcon"
              interactive
              style={CARD_WIDTH_STYLE}
            />
            <ServiceCard
              variant="tonal"
              size="sm"
              title="Schedule a session"
              description="Next available: Tomorrow"
              icon="HeartHandshakeIcon"
              interactive
              style={CARD_WIDTH_STYLE}
            />
            <ServiceCard
              variant="filled"
              size="sm"
              title="Mental health resources"
              description="Articles, tools and more"
              icon="GlobeIcon"
              interactive
              style={CARD_WIDTH_STYLE}
            />
          </div>
        </Surface>
      </Section>

      <Section heading="Disabled" lead="Set disabled to block interaction and apply 48% opacity.">
        <Surface>
          <div className="flex flex-col gap-4 w-full max-w-2xl">
            <ServiceCard
              variant="outlined"
              size="sm"
              title="Unavailable service"
              description="Not available in your region"
              icon="FlagIcon"
              disabled
              interactive
              style={CARD_WIDTH_STYLE}
            />
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
          <p className="ref-body" style={{ color: 'var(--sys-color-on-surface-variant)', margin: 0 }}>
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
