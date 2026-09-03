# Configuration

PhenoLab is configured through environment variables and an optional public app configuration JSON file. The same configuration model supports the current local backend and the planned hosted backend direction.

The app is crop-agnostic by design. For a new crop, field campaign, or institutional deployment, keep the same web platform and change the public config JSON to customize the visible title, subtitle, logo, and color theme.

## Database Settings

PostgreSQL metadata settings are split so local scripts and deployment tools can override values independently:

```bash
export PHENOLAB_DB_HOST="localhost"
export PHENOLAB_DB_PORT="5432"
export PHENOLAB_DB_NAME="phenolab"
export PHENOLAB_DB_USER="postgres"
export PHENOLAB_DB_PASSWORD="postgres"
export PHENOLAB_DB_ADMIN_DATABASE="postgres"
```

SQLite is no longer a supported runtime database. Use PostgreSQL for local and hosted deployments.

## Data Directory

```bash
export PHENOLAB_DATA_DIR="$HOME/.phenolab"
```

In Docker Compose, `PHENOLAB_DATA_DIR` remains the in-container path
`/var/lib/phenolab`. The Mac folder mounted there is controlled separately:

```bash
export PHENOLAB_DATA_DIR_HOST="./data"
# or
export PHENOLAB_DATA_DIR_HOST="/Volumes/ExternalDrive/phenolab-data"
```

PhenoLab stores file-backed outputs in this structure:

```text
~/.phenolab/
  data/
    user_<user_id>/
      project_<project_id>/
        studies/
        datasets/
        pipelines/
        .staging/
  .tusd/
  blocks/
  config/
  logs/
  db/
```

Resumable upload staging defaults to `.tusd/` under `PHENOLAB_DATA_DIR`.
Set the canonical PhenoLab upload setting when you need a specific upload location:

```bash
export PHENOLAB_TUSD_UPLOAD_DIR="$HOME/.phenolab/.tusd"
```

### TiTiler URLs

PhenoLab uses two TiTiler-related URLs because they are read by different parts
of the system:

```bash
export PHENOLAB_TITILER_BASE_URL="/api/titiler"
export PHENOLAB_TITILER_COG_BASE_URL="http://api:9000/api"
```

`PHENOLAB_TITILER_BASE_URL` is the browser-facing tile route. In Compose, the
Next.js container proxies `/api/titiler` to `PHENOLAB_TITILER_INTERNAL_BASE_URL=http://titiler:8000`.

`PHENOLAB_TITILER_COG_BASE_URL` is the API URL embedded in generated COG tile
metadata so TiTiler can fetch the source raster through PhenoLab. Compose uses
`http://api:9000/api` because TiTiler and the API share the same Docker network.
When the backend runs on the host and only TiTiler runs in Docker, use
`http://host.docker.internal:9000/api` instead.

## Branding

The settings default public app config file is `phenolab.config.json`. Override it with:

```bash
export PHENOLAB_APP_CONFIG_FILE="/absolute/path/to/app-config.json"
```

The public config controls:

| Field | Purpose |
| --- | --- |
| `title` | Visible application title in the shell. |
| `subtitle` | Short workspace label beneath the title. |
| `logo` | Default icon or image logo. |
| `theme.light` / `theme.dark` | Material UI palette tokens. |

Example:

```json
{
  "title": "PhenoLab",
  "subtitle": "Crop Phenotyping Workspace",
  "theme": {
    "light": {
      "primary": { "main": "#2f7d5c" },
      "secondary": { "main": "#365f91" }
    }
  }
}
```

## LgoPy Catalog and Vector Index

LgoPy analysis modules are stored in the configured catalog directory:

```bash
export PHENOLAB_ANALYSIS_BLOCK_CATALOG_DIR="$HOME/.phenolab/blocks"
```

When PhenoLab uses PostgreSQL, it automatically maps the active database settings into `LGOPY_CATALOG_DB_*` variables for the LgoPy catalog vector index. This keeps the semantic-search `blocks` table in the same database as the rest of the PhenoLab metadata, which is useful when teams need searchable analytical methods across large catalogs of remote-sensing and phenotyping routines.

```bash
export PHENOLAB_DB_HOST="localhost"
export PHENOLAB_DB_PORT="5432"
export PHENOLAB_DB_NAME="phenolab"
export PHENOLAB_DB_USER="postgres"
export PHENOLAB_DB_PASSWORD="postgres"
```

Enable semantic search by setting a Gemini API key. Without this key, deterministic catalog search by name, metadata, tags, and category still works.

```bash
export GOOGLE_API_KEY="..."
export LGOPY_CATALOG_GEMINI_EMBEDDING_MODEL_ID="gemini-embedding-001"
```

Inspect the effective catalog and vector-index wiring:

```bash
phenolab analysis-blocks config
```

## Frontend API URL

When running Next.js separately from FastAPI, point the frontend at the API:

```bash
export NEXT_PUBLIC_PHENOLAB_API_BASE_URL="http://127.0.0.1:9000/api"
```

:::tip

Use `make run-dev CONFIG_FILE=phenolab.config.json` with GNU Make, or
`just CONFIG_FILE=phenolab.config.json run-dev` with `just`, when you want
to launch with the default public config file through a project task runner.

:::
