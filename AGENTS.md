# AGENTS.md — qbmzc.github.io

Personal blog built with **Hexo 7.3** + **Kratos-Rebirth** theme. Deployed to GitHub Pages.

## Dev commands

| Command | What it does |
|---------|-------------|
| `npm run server` | Dev server at `localhost:4000` |
| `npm run build` | Generate static site into `public/` |
| `npm run clean` | Delete generated files & db.json |
| `npm run deploy` | Build + push `public/` to `gh-pages` branch |

## Writing posts

```
hexo new "Post Title"
```
Creates `source/_posts/<title>.md`. Frontmatter scaffold:

```yaml
title: {{ title }}
date: {{ date }}
tags:
```

## CI / Deploy

- Push to `main` → GitHub Actions builds & deploys.
- Deploy method: `hexo-deployer-git` pushes to `gh-pages`.
- Deploy SSH key stored in repo secret `HEXO_DEPLOY_KEY`.
- Git identity: qbmzc / mxlyzc@163.com.
- Timezone set to `Asia/Shanghai` in CI.

## Config files

| File | Purpose |
|------|---------|
| `_config.yml` | Site-wide Hexo config |
| `themes/kratos-rebirth/_config.yml` | Theme config (comments, nav, sidebar, etc.) |

## Notes

- Lockfile is `yarn.lock` but CI uses `npm install`. Both work.
- No formatter, linter, typechecker, or test suite.
- `.deploy_git/` in repo root = checked-out `gh-pages` branch during CI.
- `scaffolds/` contains post/page/draft templates.
