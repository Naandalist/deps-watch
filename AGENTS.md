# Agent and admin brief

You are helping maintain **Deps Watch**, a static English-language board at `https://naandalist.github.io/deps-watch/`.

Goal: make it obvious what JavaScript/npm security work a contributor can do today. The site does not accept visitor edits. Fixes happen upstream, on GitHub issues and PRs.

Owner: Listiananda Apriliawan ([naandalist.com](https://naandalist.com), GitHub `@Naandalist`).

## Default task

Unless the human asks for a design or code change, assume the task is a **daily content update**:

1. Refresh `src/_data/items.yaml`
2. Rewrite `src/_data/brief.yaml` from the new board state
3. Set `src/_data/site.json` → `updated` to today's date
4. Push `main` and check the live page

Do not create extra pages, filters, accounts, or APIs.

## Files you may edit for a daily update

- `src/_data/items.yaml`
- `src/_data/brief.yaml`
- `src/_data/site.json` (`updated` only, unless the human asks otherwise)

Leave templates, CSS, `board.js`, and the workflow alone unless the human asked for a product change.

## Item rules

One object per `package` + `id`. If the same advisory moves from `needs-pr` to `pr-open`, update the existing object. Do not add a second card.

Required fields:

- `package` — exact npm name
- `id` — one GHSA or CVE
- `severity` — `Critical` | `High` | `Medium`
- `status` — `needs-pr` | `pr-open` | `fixed-unreleased` | `fixed`
- `date` — last real change, quoted string: `"2026-09-11"`
- `summary` — one English sentence, action-oriented, not a CVE essay
- `action_url` — one URL. Use the open PR when `status` is `pr-open`. Otherwise the tracking issue or advisory

Optional fields. Omit them when unknown. Never invent `0` or `n/a`:

- `version_note`
- `weekly_downloads` — integer from npm last-week
- `github_stars` / `github_forks` — integers from the real repo
- `source` — `snyk` | `ghsa` | `manual`

Always quote dates:

```yaml
date: "2026-09-11"
```

Unquoted YAML dates become Date objects and the board can render empty.

Only change `date` when status, summary, or `action_url` actually changed.

## How the board is built

`board.js` groups cards at build time:

| Status | Column |
| --- | --- |
| `needs-pr` | Ready to work |
| `pr-open` | In progress |
| `fixed-unreleased`, `fixed` | Recently resolved |

Age from `date` to `site.updated`:

- `needs-pr` 14 days
- `pr-open` 10 days
- `fixed-unreleased` 5 days
- `fixed` 2 days

Quotas: Ready 12, In progress 8, Resolved 5.

Overflow drop order: lower severity, then lower weekly downloads, then older date.

The CVE/GHSA text on a card links to Snyk search. The package name links to `action_url`.

## How to write Today

Edit `src/_data/brief.yaml`. This is an editorial note, not another card list.

```yaml
headline: One sentence about the board today.
paragraphs:
  - What changed, what is still open, and why it matters.
  - Priority advice. Point at downloads or review load when you have real numbers.
pick:
  label: Worth doing today
  package: exact-npm-name
  action_label: Review the open PR
  action_url: https://github.com/org/repo/pull/123
  approach: Concrete first step. Do not write a full exploit or a patch recipe.
```

Brief rules:

- English
- Base it on cards that are actually on the board
- Prefer high weekly downloads or an already-open PR over a quiet package
- `pick.package` must exist in `items.yaml`
- `pick.action_url` must be a real issue, PR, or advisory
- No CVE exploitation detail. Point people at the PR or issue

## Stats

Snapshots only. Pull npm last-week downloads and GitHub stars/forks if you can. If you cannot verify a number, omit the field.

Do not guess popularity.

## After you push

1. Wait for **Deploy GitHub Pages** to finish
2. Open `https://naandalist.github.io/deps-watch/`
3. Confirm Today is the new brief and the kanban still has cards
4. If every column is `0`, you probably shipped an unquoted date or a `board.js` parse failure. Quote dates and rebuild

## Do not do this

- Add visitor editing, comments, accounts, or drag-and-drop
- Add detail pages, pagination, or `js.org`
- Copy the npm logo
- Put the same card list back into Today
- Change brand, URL, or stack unless the human asked
- Invent CVEs, PRs, download counts, or stars
