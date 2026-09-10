# Deps Watch plan

Locked product decisions. Change these only when the owner asks.

## Product

Deps Watch is a daily read-only board of JavaScript/npm security issues. The point is contribution insight, not a vulnerability database.

- Brand: Deps Watch
- Wordmark: `deps-watch`
- Live URL: https://naandalist.github.io/deps-watch/
- Repo: https://github.com/Naandalist/deps-watch
- Stack: Eleventy 3
- Host: GitHub Pages via GitHub Actions
- Language: English
- One page, no detail pages
- Visitors cannot edit anything
- Visual tone: light, npm-homepage-like. Gray canvas, white panels, red section rules. No dark gradient, no npm trademark mark

## Page layout

1. Header with wordmark and `updated` date
2. Today: editorial brief from `src/_data/brief.yaml`
3. Kanban
   - 🚨 Ready to work (`needs-pr`)
   - 🔧 In progress (`pr-open`)
   - ✅ Recently resolved (`fixed-unreleased`, `fixed`)
4. Footer: snapshot note, source links, credit to Listiananda Apriliawan → https://naandalist.com

Today must not repeat the kanban as a card list.

## Item schema

Required: `package`, `id`, `severity`, `status`, `date`, `summary`, `action_url`  
Optional: `version_note`, `weekly_downloads`, `github_stars`, `github_forks`, `source`

Allowed values:

- severity: `Critical` | `High` | `Medium`
- status: `needs-pr` | `pr-open` | `fixed-unreleased` | `fixed`
- source: `snyk` | `ghsa` | `manual`
- date: quoted `YYYY-MM-DD`

One package + one id = one card. Status change updates the same card.

`action_url` is the open PR when a PR exists. CVE/GHSA text links to Snyk search.

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

## Daily ritual

Around 06:00 Asia/Jakarta:

1. Update `src/_data/items.yaml`
2. Rewrite `src/_data/brief.yaml`
3. Set `src/_data/site.json` `updated`
4. Push `main`

## Out of scope for phase 1

`js.org`, pagination, detail pages, archive, live npm/GitHub widgets, visitor accounts, Snyk API automation.
