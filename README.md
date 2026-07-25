# Next Resource Studio — Docs

MkDocs Material site for all Next Resource Studio FiveM resources.

## Run locally

```bash
pip install -r requirements.txt
mkdocs serve
```

Open http://127.0.0.1:8000 — pages hot-reload as you edit.

## Adding a new resource

1. Copy `docs/resources/ice_crafting/` as a starting point.
2. Add the new folder + pages under `nav:` in `mkdocs.yml`.
3. Add a row to `docs/resources/index.md`.

## Deploy (free, GitHub Pages)

1. Push this folder to its own GitHub repo.
2. In the repo's **Settings → Pages**, set the source to the `gh-pages` branch (created automatically by the workflow below).
3. Update `site_url` / `repo_url` / `repo_name` in `mkdocs.yml` to match the real repo.
4. Push to `main` — `.github/workflows/deploy.yml` builds and publishes to `https://<user>.github.io/<repo>/` automatically.

To deploy manually instead of via CI: `mkdocs gh-deploy --force`.
