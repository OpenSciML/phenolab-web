# FAQ

## What is PhenoLab for?

PhenoLab is a crop phenotyping web platform for managing studies, registering plot-level multimodal assets, running analysis pipelines, and reviewing derived outputs. The backend currently runs locally in this checkout, but the architecture is intended to support a cloud-hosted backend.

## Do I need the app running for scripts?

Dataset and SDK-style scripts can often use the Python package and configured stores directly. Browser workflows require the FastAPI backend and Next.js frontend; in a future hosted deployment, users would connect to the cloud backend instead of starting it locally.

## Which UI mode should I use?

Use the Next.js development or production server for the full authenticated UI. The packaged FastAPI-served UI is a lightweight fallback shell for local packaging scenarios.

## Where are files stored?

By default, file-backed outputs live under `~/.phenolab` or the configured `PHENOLAB_DATA_DIR`. The database stores metadata and URIs.

## How do I change the application name or theme?

Edit the selected public app config file, usually `phenolab.config.json`, or set `PHENOLAB_APP_CONFIG_FILE` to another file.

## Why did I get signed out after restarting?

Changing `AUTH_SECRET` or `NEXTAUTH_SECRET` invalidates existing Auth.js sessions. Keep the secret stable for a given environment.

## How should I improve background processing reliability?

Keep datasets scoped to coherent acquisition batches, validate externally developed analysis modules on small datasets before scaling up, and confirm the embedded worker or Celery/RabbitMQ worker path is active before submitting long operations. The `/api/pipelines` route is temporarily disabled while pipeline execution is moved onto the durable operations path.

## Can collaborators see every project?

No. Project access is scoped through ownership, administrator status, and project collaborator assignments.
