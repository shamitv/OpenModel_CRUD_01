---
version: alpha
name: Survey Studio
description: A product design direction for a survey creation application. The interface is light-first, calm, and operational: built for creators who repeatedly draft surveys, inspect response health, share public links, and review analytics. The visual language favors dense but readable layouts, clear form hierarchy, restrained color, and predictable controls over marketing spectacle.

colors:
  primary: "#2563eb"
  primary-hover: "#1d4ed8"
  primary-active: "#1e40af"
  primary-soft: "#dbeafe"
  primary-soft-hover: "#bfdbfe"
  canvas: "#f6f7fb"
  canvas-subtle: "#eef2f7"
  surface: "#ffffff"
  surface-raised: "#fdfefe"
  surface-muted: "#f8fafc"
  ink: "#111827"
  body: "#374151"
  muted: "#6b7280"
  muted-soft: "#9ca3af"
  hairline: "#e5e7eb"
  hairline-strong: "#d1d5db"
  focus-ring: "#93c5fd"
  on-primary: "#ffffff"
  success: "#15803d"
  success-soft: "#dcfce7"
  warning: "#b45309"
  warning-soft: "#fef3c7"
  error: "#b91c1c"
  error-soft: "#fee2e2"
  chart-blue: "#2563eb"
  chart-teal: "#0f766e"
  chart-amber: "#d97706"
  chart-violet: "#7c3aed"
  chart-rose: "#e11d48"

typography:
  display-lg:
    fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif"
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0
  display-md:
    fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif"
    fontSize: 26px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: 0
  title-lg:
    fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif"
    fontSize: 22px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: 0
  title-md:
    fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: 0
  title-sm:
    fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
  body-md:
    fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0
  body-sm:
    fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  caption:
    fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  table:
    fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: 0
  button:
    fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0
  code:
    fontFamily: "'JetBrains Mono', 'Fira Code', ui-monospace, monospace"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0

rounded:
  xs: 4px
  sm: 6px
  md: 8px
  lg: 10px
  xl: 12px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  base: 16px
  md: 20px
  lg: 24px
  xl: 32px
  xxl: 48px
  page: 32px

layout:
  app-shell-width: 100%
  sidebar-width: 248px
  content-max-width: 1280px
  form-max-width: 760px
  public-form-max-width: 720px
  analytics-grid: 12 columns

components:
  app-shell:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.body}"
    typography: "{typography.body-md}"
  sidebar:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.hairline}"
    width: 248px
  top-bar:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.hairline}"
    height: 64px
  page-header:
    typography: "{typography.display-md}"
    textColor: "{colors.ink}"
    spacingAfter: 24px
  card:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.hairline}"
    rounded: "{rounded.xl}"
    padding: 24px
  compact-card:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.hairline}"
    rounded: "{rounded.lg}"
    padding: 16px
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    height: 44px
    padding: 0 16px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline-strong}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    height: 44px
    padding: 0 16px
  button-ghost:
    backgroundColor: transparent
    textColor: "{colors.body}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    height: 40px
    padding: 0 12px
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline-strong}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    height: 44px
    padding: 10px 12px
  textarea:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline-strong}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    minHeight: 112px
    padding: 10px 12px
  select:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline-strong}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    height: 44px
  status-pill:
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: 4px 10px
  table:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.hairline}"
    typography: "{typography.table}"
  question-card:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.hairline}"
    rounded: "{rounded.xl}"
    padding: 20px
  analytics-panel:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.hairline}"
    rounded: "{rounded.xl}"
    padding: 20px
---

## Overview

Survey Studio is a focused application for creating, distributing, and analyzing surveys. The design must support two different audiences:

- **Survey creators** need a productive workspace for building surveys, managing status, copying public links, and reading results.
- **Respondents** need a calm, low-friction public form that works without login and makes progress, validation, and submission status obvious.

This redesign is a product UI system for the survey app described in `docs/plans/appl_plan.md`.

## Product Principles

- **Builder first.** The survey builder is the core workspace. It should feel structured, editable, and resilient rather than decorative.
- **Low-friction response flow.** Public survey pages should be quiet, readable, mobile-friendly, and trustworthy.
- **Operational density.** Dashboard, management, and analytics screens should prioritize scanning, comparison, filtering, and repeated actions.
- **Clear state language.** Draft, active, closed, copied, saved, invalid, empty, loading, and unauthorized states need explicit UI patterns.
- **Accessible by default.** Form controls, keyboard focus, status text, contrast, and target size are part of the base design, not polish.

## Visual Direction

The app is light-first with cool neutral surfaces, blue primary actions, and restrained semantic color. Cards are used for repeated content, forms, panels, and modals. Page sections should remain unframed and use the app shell background.

The design should avoid landing-page composition. The first screen after login is the creator dashboard. The first screen for a public link is the survey form itself.

## Colors

### Brand And Action

- **Primary** (`{colors.primary}` - #2563eb): Create survey, save, publish, submit, copy link confirmation accents.
- **Primary Hover** (`{colors.primary-hover}` - #1d4ed8): Hover state for primary actions.
- **Primary Active** (`{colors.primary-active}` - #1e40af): Pressed state for primary actions.
- **Primary Soft** (`{colors.primary-soft}` - #dbeafe): Selected nav item, selected answer, subtle info backgrounds.

### Surface

- **Canvas** (`{colors.canvas}` - #f6f7fb): Main application background.
- **Canvas Subtle** (`{colors.canvas-subtle}` - #eef2f7): Secondary app zones, public page banding.
- **Surface** (`{colors.surface}` - #ffffff): Cards, forms, tables, modals, top bars.
- **Surface Raised** (`{colors.surface-raised}` - #fdfefe): Popovers and dropdowns.
- **Surface Muted** (`{colors.surface-muted}` - #f8fafc): Table headers, option rows, disabled fields.

### Text And Borders

- **Ink** (`{colors.ink}` - #111827): Headings, labels, high-emphasis values.
- **Body** (`{colors.body}` - #374151): Default body text.
- **Muted** (`{colors.muted}` - #6b7280): Helper text, timestamps, secondary metadata.
- **Muted Soft** (`{colors.muted-soft}` - #9ca3af): Placeholders, disabled text.
- **Hairline** (`{colors.hairline}` - #e5e7eb): Standard borders and dividers.
- **Hairline Strong** (`{colors.hairline-strong}` - #d1d5db): Form control borders and selected table row edges.
- **Focus Ring** (`{colors.focus-ring}` - #93c5fd): Keyboard focus outline.

### Semantic And Charts

- **Success** (`{colors.success}` - #15803d): Active surveys, submitted responses, saved states.
- **Warning** (`{colors.warning}` - #b45309): Drafts, unsaved changes, low response count.
- **Error** (`{colors.error}` - #b91c1c): Validation errors, destructive confirmation.
- **Chart Colors:** Blue, teal, amber, violet, and rose are reserved for analytics visualizations.

## Typography

Use **Inter** for the entire product UI and **JetBrains Mono** only for UUIDs, share URLs when displayed as code-like text, or technical diagnostics.

Display sizes are intentionally moderate. This is an operational tool; headings should orient the user without consuming the workspace.

| Token | Size | Weight | Line Height | Use |
|---|---:|---:|---:|---|
| `{typography.display-lg}` | 32px | 600 | 1.2 | Auth title, public survey title on desktop |
| `{typography.display-md}` | 26px | 600 | 1.25 | Page title |
| `{typography.title-lg}` | 22px | 600 | 1.3 | Section title, analytics panel title |
| `{typography.title-md}` | 18px | 600 | 1.35 | Card title, survey title in lists |
| `{typography.title-sm}` | 16px | 600 | 1.4 | Form group title, question title |
| `{typography.body-md}` | 15px | 400 | 1.55 | Default body and form copy |
| `{typography.body-sm}` | 14px | 400 | 1.5 | Secondary UI copy |
| `{typography.caption}` | 12px | 500 | 1.4 | Pills, metadata, table labels |
| `{typography.table}` | 14px | 400 | 1.45 | Dashboard tables |
| `{typography.button}` | 14px | 600 | 1.2 | Buttons and toolbar controls |

All letter spacing is `0`.

## Layout

### App Shell

- Desktop uses a persistent left sidebar (`248px`) and a top bar (`64px`) above the content area.
- Content width caps at `1280px`, with `32px` page padding on desktop.
- Main pages use a header row, optional action cluster, and then the primary workspace.
- Mobile collapses the sidebar into a top navigation drawer and uses `16px` page padding.

### Page Types

- **Dashboard:** survey list, status filters, response summary, and primary "New survey" action.
- **Builder:** three-zone layout with question outline, editable canvas, and settings panel on desktop.
- **Public survey:** centered single-column form with progress, question groups, validation, and submit state.
- **Analytics:** overview metrics at top, charts and per-question results below.
- **Auth:** centered form card with minimal brand header and clear error handling.

## Core Screens

### Dashboard

The dashboard is the creator's home screen. It should load directly into useful survey management, not a promotional welcome page.

Required elements:

- Page title: "Surveys".
- Primary action: "New survey".
- Search input for survey title.
- Status filter segmented control: All, Draft, Active, Closed.
- Table or list with survey title, status, response count, last updated, and actions.
- Empty state with one primary action and one sentence of guidance.

Desktop default: table. Mobile default: stacked survey rows.

### Survey Builder

The builder must make editing predictable and prevent users from losing work.

Desktop layout:

- Left outline: survey title and ordered question list.
- Center canvas: title, description, and question cards.
- Right settings panel: selected question settings, required toggle, type-specific options.

Mobile layout:

- Single-column editor.
- Question outline becomes a collapsible menu.
- Settings open in a bottom sheet or full-width panel below the selected question.

Required controls:

- Add question button with type menu.
- Question type selector: multiple choice, short text, long text, rating.
- Reorder controls with drag handle plus keyboard-accessible move buttons.
- Duplicate question.
- Delete question with confirmation.
- Preview mode.
- Save state indicator: Saving, Saved, Unsaved changes, Failed to save.

### Public Survey Response

The public response page should feel lighter than the creator workspace but use the same tokens.

Required elements:

- Survey title and description.
- Optional progress indicator when the survey has more than three questions.
- One clear input pattern per question type.
- Required labels and inline validation.
- Submit button fixed near the end of the form, not sticky by default.
- Success screen after submission.
- Closed survey state.
- Invalid or missing survey URL state.

### Analytics

Analytics should emphasize comprehension over decoration.

Required elements:

- Response count, completion rate, latest response timestamp, and active/closed status.
- Per-question result panels.
- Multiple choice: horizontal bars with count and percentage.
- Rating: average, distribution, and response count.
- Short and long text: searchable response list.
- Export action placeholder if not implemented yet.

Charts should use the chart palette and always include readable labels, values, and non-color-only identification.

### Authentication

Auth screens should be direct and compact.

Required elements:

- Login and registration forms.
- Inline field validation.
- Form-level error for failed login or duplicate registration.
- Link between login and registration.
- Protected-route redirect message when applicable.

## Components

### Buttons

Buttons use 44px height for primary and secondary actions. Icon-only buttons use 40px square with visible focus state and accessible label.

- **Primary:** create, save, publish, submit.
- **Secondary:** preview, cancel, copy, export.
- **Ghost:** table row actions, sidebar actions.
- **Danger:** delete survey, delete question, destructive confirmation.

States:

- Hover: use hover color or subtle surface tint.
- Active: use active color or stronger border.
- Focus: 2px focus ring with 2px offset.
- Disabled: muted text, muted surface, no hover treatment.
- Loading: spinner plus label when action takes longer than a short click.

### Forms

Every form field needs:

- Visible label.
- Optional helper text.
- Error text below the field.
- Focus ring.
- Disabled state.
- Required indicator when applicable.

Question inputs must mirror the respondent experience in preview mode.

### Survey Cards And Rows

Survey rows are optimized for scanning:

- Title.
- Description snippet when useful.
- Status pill.
- Response count.
- Last updated date.
- Owner-visible actions: Edit, Copy link, View results, More.

Use cards for mobile and tables for desktop when there are many surveys.

### Status Pills

- Draft: warning text on warning-soft background.
- Active: success text on success-soft background.
- Closed: muted text on surface-muted background.
- Error: error text on error-soft background.

Pills are labels, not buttons, unless paired with a status menu.

### Question Cards

Question cards include:

- Drag handle.
- Question number.
- Question text input.
- Question type control.
- Required toggle.
- Type-specific editor.
- Duplicate and delete icon buttons.

Selected question cards use a primary-soft background or primary border, not a large shadow.

### Tables

Tables should support:

- Sticky header when content scrolls inside a panel.
- Row hover.
- Empty state row.
- Loading skeleton rows.
- Action menu aligned right.

Avoid hiding primary workflow actions inside menus. Menus are for less frequent actions.

### Modals And Drawers

Use modals for destructive confirmations and share link dialogs. Use drawers or side panels for settings that support ongoing editing.

Modal requirements:

- Clear title.
- Direct body copy.
- Primary and secondary actions.
- Escape key closes non-destructive modals.
- Focus returns to the invoking control.

## Interaction States

### Loading

- App shell: show a centered loading state only on first load.
- Dashboard: use skeleton rows.
- Analytics: show skeleton metric cards and chart panels.
- Public survey: show form skeleton, then render the form.

### Empty

Empty states should be concise and actionable:

- No surveys: "Create your first survey" primary action.
- No responses: show the share URL action and explain that results appear after the first submission.
- No matching filters: offer to clear filters.

### Error

Error states must name the problem and give the next action:

- Failed save: keep unsaved content visible and provide retry.
- Unauthorized: redirect to login with a short explanation.
- Closed survey: explain that responses are no longer accepted.
- Invalid survey URL: show a plain not-found state.

### Unsaved Changes

The builder must surface unsaved changes in the header. If the user navigates away with unsaved changes, show a confirmation.

## Responsive Behavior

| Breakpoint | Width | Behavior |
|---|---:|---|
| Mobile | < 640px | Single-column content, top nav drawer, cards instead of tables, 16px page padding |
| Tablet | 640px-1023px | Two-column where useful, sidebar may remain collapsed, 24px page padding |
| Desktop | >= 1024px | Persistent sidebar, 3-zone builder, table dashboard, 32px page padding |
| Wide | >= 1280px | Content caps at 1280px, analytics panels can use full 12-column grid |

Minimum touch target is 44px for primary controls and form inputs. Icon-only controls must be at least 40px square and not placed closer than 8px to another icon-only control.

## Accessibility Requirements

- All interactive controls require visible keyboard focus.
- Public survey forms must be fully usable with keyboard only.
- Field errors must be programmatically associated with fields.
- Color cannot be the only way to distinguish chart series or validation state.
- Status updates such as "Saved" and "Copied" should be announced politely.
- Use semantic headings in page order.
- Preserve readable contrast for muted text; do not use muted-soft for body copy.

## Implementation Notes

- Tailwind tokens should be mapped from this document before component work starts.
- Reuse the same form components across auth, builder, and public response pages.
- Use Chart.js for analytics, matching the roadmap.
- Keep component styles close to the product workflows before introducing a broad abstraction layer.
- Use Playwright checks for builder, public response, and analytics states as the UI becomes available.

## Known Gaps

- Final product name is not confirmed; "Survey Studio" is a working design name.
- Dark mode is out of scope for the first implementation.
- Export formats are not yet defined.
- Collaboration, templates, branching logic, and advanced survey logic are not in the current roadmap.
