# ComPsych Mobile Design System — Live Reference

A browsable gallery of the ComPsych mobile design system components, built with Next.js. Each page renders the real component code against live `sys.*` design tokens, with interactive controls to explore props and variants. Intended as a visual contract for React Native implementors and designers working in the mobile product surface.

## Getting started

```bash
npm install
npm run dev
```

Opens on [http://localhost:3000](http://localhost:3000) and redirects to the Mobile About page.

## Stack

- **Next.js 15** (App Router)
- **React 19**
- **Tailwind CSS v4** (layout only — no token redefinition)
- **TypeScript**

## Token system

All components reference `sys.*` design tokens exclusively via CSS custom properties (e.g. `var(--sys-color-primary)`). Raw hex values, `core.*`, `product.*`, and `brand.*` tokens are never used in UI code. This ensures every component responds correctly to theme switching across ComPsych's product surfaces (GRO, CRC, Absence Resources) and brand modes.

## Structure

```
app/
  mobile/
    about/          # Overview page
    components/     # One gallery page per component
components/
  ds/               # Mobile DS component implementations
  mobile-playground/  # Interactive controls + stage
  phone-frame/      # iOS simulator wrapper (used by Bottom Sheet)
public/
  styles/
    themes.css      # Generated sys.* token CSS (all brand × product combinations)
```

## Components

| Category | Components |
|----------|-----------|
| Atoms | Badge, Chip, Divider |
| Form | Checkbox, Input, RadioButton, SegmentedControl, Slider, Switch |
| Content | Alert, Avatar, Breadcrumb, BodyText, EmptyState, HeaderText, List, ListItem, Pagination, ProgressTracker, Tooltip |
| Actions | Button, Snackbar |
| Organisms | ActionSheet, Card, PlanCard, Tab Bar, Bottom Sheet |
