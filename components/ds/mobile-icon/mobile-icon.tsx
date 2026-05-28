'use client';

import React from 'react';

import type { LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

export type IconSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
export type IconName = string;

export interface IconProps {
  size?: IconSize;
  color?: string;
  'aria-label'?: string;
}

export const SIZE_MAP: Record<IconSize, { px: number; strokeWidth: number }> = {
  xsmall: { px: 16, strokeWidth: 1 },
  small:  { px: 20, strokeWidth: 1 },
  medium: { px: 24, strokeWidth: 1.5 },
  large:  { px: 32, strokeWidth: 1.5 },
  xlarge: { px: 48, strokeWidth: 1.5 },
};

/** Strip trailing "Icon" suffix and look up the matching lucide-react component. */
export function resolveIcon(name: string): LucideIcon | undefined {
  const componentName = name.endsWith('Icon') ? name.slice(0, -4) : name;
  return (LucideIcons as Record<string, unknown>)[componentName] as LucideIcon | undefined;
}

function makeIconComponent(lucideComponent: LucideIcon) {
  return function Icon({ size = 'medium', color = 'currentColor', 'aria-label': label }: IconProps) {
    const { px, strokeWidth } = SIZE_MAP[size];
    const C = lucideComponent as React.FC<{ size: number; color: string; strokeWidth: number; 'aria-hidden'?: boolean; 'aria-label'?: string; style?: React.CSSProperties }>;
    return (
      <C
        size={px}
        color={color}
        strokeWidth={strokeWidth}
        aria-hidden={!label}
        aria-label={label}
        style={{ display: 'block', flexShrink: 0 }}
      />
    );
  };
}

/** Canonical icon list matching the Figma design-system spec. */
const ICON_ENTRIES: Array<{ name: string; label: string }> = [
  { name: 'ActivityIcon',                  label: 'activity' },
  { name: 'ArrowLeftIcon',                 label: 'arrow-left' },
  { name: 'AtomIcon',                      label: 'atom' },
  { name: 'AwardIcon',                     label: 'award' },
  { name: 'BabyIcon',                      label: 'baby' },
  { name: 'BinocularsIcon',               label: 'binoculars' },
  { name: 'BlendIcon',                     label: 'blend' },
  { name: 'BookCheckIcon',                 label: 'book-check' },
  { name: 'BookMarkedIcon',                label: 'book-marked' },
  { name: 'BookOpenTextIcon',              label: 'book-open-text' },
  { name: 'BookUserIcon',                  label: 'book-user' },
  { name: 'BoxIcon',                       label: 'box' },
  { name: 'BriefcaseBusinessIcon',         label: 'briefcase-business' },
  { name: 'BuildingIcon',                  label: 'building' },
  { name: 'CalculatorIcon',                label: 'calculator' },
  { name: 'CalendarDaysIcon',              label: 'calendar-days' },
  { name: 'CannabisIcon',                  label: 'cannabis' },
  { name: 'CaptionsIcon',                  label: 'captions' },
  { name: 'ChartColumnBigIcon',            label: 'chart-column-big' },
  { name: 'ChartPieIcon',                  label: 'chart-pie' },
  { name: 'CheckCheckIcon',                label: 'check-check' },
  { name: 'CigaretteIcon',                 label: 'cigarette' },
  { name: 'CircleCheckBigIcon',            label: 'circle-check-big' },
  { name: 'CirclePlusIcon',                label: 'circle-plus' },
  { name: 'ClipboardCheckIcon',            label: 'clipboard-check' },
  { name: 'CloudCheckIcon',                label: 'cloud-check' },
  { name: 'CompassIcon',                   label: 'compass' },
  { name: 'DogIcon',                       label: 'dog' },
  { name: 'DownloadIcon',                  label: 'download' },
  { name: 'EllipsisIcon',                  label: 'ellipsis' },
  { name: 'FileChartColumnIncreasingIcon', label: 'file-chart-column-increasing' },
  { name: 'FileQuestionIcon',              label: 'file-question' },
  { name: 'FlagIcon',                      label: 'flag' },
  { name: 'FrownIcon',                     label: 'frown' },
  { name: 'GlobeIcon',                     label: 'globe' },
  { name: 'GraduationCapIcon',             label: 'graduation-cap' },
  { name: 'HandHeartIcon',                 label: 'hand-heart' },
  { name: 'HandshakeIcon',                 label: 'handshake' },
  { name: 'HazeIcon',                      label: 'haze' },
  { name: 'HeartIcon',                     label: 'heart' },
  { name: 'HeartHandshakeIcon',            label: 'heart-handshake' },
  { name: 'HeartPlusIcon',                 label: 'heart-plus' },
  { name: 'HospitalIcon',                  label: 'hospital' },
  { name: 'HouseHeartIcon',               label: 'house-heart' },
  { name: 'HouseWifiIcon',                 label: 'house-wifi' },
  { name: 'HourglassIcon',                 label: 'hourglass' },
  { name: 'IdCardIcon',                    label: 'id-card' },
  { name: 'ImagePlayIcon',                 label: 'image-play' },
  { name: 'InboxIcon',                     label: 'inbox' },
  { name: 'LandPlotIcon',                  label: 'land-plot' },
  { name: 'LassoIcon',                     label: 'lasso' },
  { name: 'LayersIcon',                    label: 'layers' },
  { name: 'ListTodoIcon',                  label: 'list-todo' },
  { name: 'LockIcon',                      label: 'lock' },
  { name: 'LockKeyholeIcon',               label: 'lock-keyhole' },
  { name: 'LockOpenIcon',                  label: 'lock-open' },
  { name: 'MapIcon',                       label: 'map' },
  { name: 'MapPinPlusIcon',                label: 'map-pin-plus' },
  { name: 'MapPinnedIcon',                 label: 'map-pinned' },
  { name: 'MaximizeIcon',                  label: 'maximize' },
  { name: 'MegaphoneIcon',                 label: 'megaphone' },
  { name: 'MessageCircleMoreIcon',         label: 'message-circle-more' },
  { name: 'MessageCirclePlusIcon',         label: 'message-circle-plus' },
  { name: 'MicIcon',                       label: 'mic' },
  { name: 'MicOffIcon',                    label: 'mic-off' },
  { name: 'MinimizeIcon',                  label: 'minimize' },
  { name: 'MonitorPlayIcon',               label: 'monitor-play' },
  { name: 'MoonIcon',                      label: 'moon' },
  { name: 'MountainSnowIcon',              label: 'mountain-snow' },
  { name: 'PanelsTopLeftIcon',             label: 'panels-top-left' },
  { name: 'PenLineIcon',                   label: 'pen-line' },
  { name: 'PhoneIcon',                     label: 'phone' },
  { name: 'PhoneOffIcon',                  label: 'phone-off' },
  { name: 'PodcastIcon',                   label: 'podcast' },
  { name: 'PresentationIcon',              label: 'presentation' },
  { name: 'RotateCcwIcon',                 label: 'rotate-ccw' },
  { name: 'ScanFaceIcon',                  label: 'scan-face' },
  { name: 'ScanHeartIcon',                 label: 'scan-heart' },
  { name: 'ScanSearchIcon',                label: 'scan-search' },
  { name: 'ScrollTextIcon',                label: 'scroll-text' },
  { name: 'SendIcon',                      label: 'send' },
  { name: 'SendHorizontalIcon',            label: 'send-horizontal' },
  { name: 'SettingsIcon',                  label: 'settings' },
  { name: 'ShieldUserIcon',                label: 'shield-user' },
  { name: 'SkipBackIcon',                  label: 'skip-back' },
  { name: 'SkipForwardIcon',               label: 'skip-forward' },
  { name: 'SmartphoneIcon',                label: 'smartphone' },
  { name: 'SmileIcon',                     label: 'smile' },
  { name: 'SnowflakeIcon',                 label: 'snowflake' },
  { name: 'SquareArrowOutUpRightIcon',     label: 'square-arrow-out-up-right' },
  { name: 'SquaresExcludeIcon',            label: 'squares-exclude' },
  { name: 'StarIcon',                      label: 'star' },
  { name: 'StethoscopeIcon',               label: 'stethoscope' },
  { name: 'StickyNoteIcon',                label: 'sticky-note' },
  { name: 'TabletSmartphoneIcon',          label: 'tablet-smartphone' },
  { name: 'TextIcon',                      label: 'text' },
  { name: 'ThumbsDownIcon',                label: 'thumbs-down' },
  { name: 'ThumbsUpIcon',                  label: 'thumbs-up' },
  { name: 'TicketsPlaneIcon',              label: 'tickets-plane' },
  { name: 'TrashIcon',                     label: 'trash' },
  { name: 'TrendingUpIcon',                label: 'trending-up' },
  { name: 'TvMinimalIcon',                 label: 'tv-minimal' },
  { name: 'TvMinimalPlayIcon',             label: 'tv-minimal-play' },
  { name: 'UserRoundIcon',                 label: 'user-round' },
  { name: 'UserRoundCheckIcon',            label: 'user-round-check' },
  { name: 'UsersIcon',                     label: 'users' },
  { name: 'UsersRoundIcon',                label: 'users-round' },
  { name: 'VideoOffIcon',                  label: 'video-off' },
  { name: 'VolumeIcon',                    label: 'volume' },
  { name: 'Volume1Icon',                   label: 'volume-1' },
  { name: 'Volume2Icon',                   label: 'volume-2' },
  { name: 'VolumeOffIcon',                 label: 'volume-off' },
  { name: 'VolumeXIcon',                   label: 'volume-x' },
  { name: 'WarehouseIcon',                 label: 'warehouse' },
  { name: 'WheatIcon',                     label: 'wheat' },
];

type IconEntry = { name: string; label: string; Component: ReturnType<typeof makeIconComponent> };

export const ALL_ICONS: IconEntry[] = ICON_ENTRIES.reduce<IconEntry[]>((acc, { name, label }) => {
  const lucide = resolveIcon(name);
  if (lucide) acc.push({ name, label, Component: makeIconComponent(lucide) });
  return acc;
}, []);

export const ICON_NAMES = ALL_ICONS.map((i) => i.name);
