# Deps Watch plan

Daily read-only board of JavaScript dependency security issues that people can help fix.

## Locked decisions

- Brand: Deps Watch
- URL: https://naandalist.github.io/deps-watch/
- Stack: Eleventy 3
- Hosting: GitHub Pages via GitHub Actions
- Language: English
- One page, no detail pages
- Visitors cannot edit the board
- Admin updates `src/_data/items.yaml` and `src/_data/site.json`

## Page layout

1. Header
2. Today: items whose `date` matches `site.updated`
3. Kanban
   - Ready to work (`needs-pr`)
   - In progress (`pr-open`)
   - Recently resolved (`fixed-unreleased`, `fixed`)
4. Footer snapshot note

## Item schema

Required: `package`, `id`, `severity`, `status`, `date`, `summary`, `action_url`  
Optional: `version_note`, `weekly_downloads`, `github_stars`, `github_forks`, `source`

Allowed values:

- severity: `Critical` | `High` | `Medium`
- status: `needs-pr` | `pr-open` | `fixed-unreleased` | `fixed`
- source: `snyk` | `ghsa` | `manual`
- date: `YYYY-MM-DD`

One package + one id = one card. Update the existing card when status changes.

## Board rules

Age from `date` to `site.updated`:

- `needs-pr`: 14 days
- `pr-open`: 10 days
- `fixed-unreleased`: 5 days
- `fixed`: 2 days

Front-page quotas:

- Ready to work: 12
- In progress: 8
- Recently resolved: 5

Overflow drop order: lower severity, then lower weekly downloads, then older date.

Today is rebuilt every update cycle. Open work stays until it is resolved, expires, or is pushed off by quota.

## Daily admin ritual

1. Edit findings in `src/_data/items.yaml`
2. Set `updated` in `src/_data/site.json`
3. Commit and push around 06:00

## Out of scope for phase 1

js.org, pagination, detail pages, archive, live npm/GitHub stats, visitor accounts, Snyk API automation.
