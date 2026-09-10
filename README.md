# Deps Watch

A read-only daily board of JavaScript dependency security issues that people can help fix.

Live site: [https://naandalist.github.io/deps-watch/](https://naandalist.github.io/deps-watch/)

Visitors only read the board. Work happens on the linked GitHub issue or pull request. An admin, or an agent acting as admin, updates this repository and GitHub Pages rebuilds the site.

Created by [Listiananda Apriliawan](https://naandalist.com).

## If you are an admin or an agent

Read these in order:

1. This README
2. [`AGENTS.md`](./AGENTS.md) — operating brief, what to edit, what not to invent
3. [`PLAN.md`](./PLAN.md) — locked product rules

Do not start by redesigning the site. The usual job is a daily content update.

## Daily update

1. Edit cards in `src/_data/items.yaml`
2. Rewrite the morning brief in `src/_data/brief.yaml`
3. Set `updated` in `src/_data/site.json` to today, `YYYY-MM-DD`
4. Commit and push to `main`

The Action in `.github/workflows/deploy.yml` builds Eleventy and deploys GitHub Pages.

## Local development

```bash
npm install
npm start
```

GitHub Pages build:

```bash
npm run build:ghpages
```

## What each data file is for

| File | Role |
| --- | --- |
| `src/_data/items.yaml` | Cards on the kanban |
| `src/_data/brief.yaml` | Today section: summary, opinion, one recommended action |
| `src/_data/site.json` | Site title, live URL, `updated` date |
| `src/_data/board.js` | Age, quota, and column rules. Do not edit unless the rules change |

The Today section is **not** a list of cards. Cards belong on the kanban only.
