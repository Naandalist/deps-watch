# Deps Watch

A daily board of JavaScript dependency security issues you can help fix.

Live site: [naandalist.github.io/deps-watch](https://naandalist.github.io/deps-watch/)

This is a read-only bulletin. Contributors work on the linked GitHub issue or pull request. Only an admin updates the board, by committing data to this repository.

## Update the board

1. Edit `src/_data/items.yaml`
2. Set `updated` in `src/_data/site.json` to today's date (`YYYY-MM-DD`)
3. Commit and push to `main`

The GitHub Action rebuilds the static site. Board grouping, age, and column quotas are applied at build time.

## Local development

```bash
npm install
npm start
```

Production-style GitHub Pages build:

```bash
npm run build:ghpages
```

## Project layout

```
src/_data/items.yaml   # source of truth for cards
src/_data/site.json    # site title, URL, update date
src/_data/board.js     # board rules
src/index.njk          # single page
src/_includes/card.njk
src/assets/style.css
```

See `PLAN.md` for the locked product rules.
