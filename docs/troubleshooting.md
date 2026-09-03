# Troubleshooting

## Frontend Cannot Reach the API

**Symptoms**

- Login fails.
- Pages show loading or network errors.
- Browser requests point at the wrong host or port.

**Possible causes**

- `NEXT_PUBLIC_PHENOLAB_API_BASE_URL` is unset or stale.
- Backend is not running.
- Backend port differs from the frontend configuration.

**Resolution**

1. Start the backend.
2. Confirm the API is reachable at `/api/config`.
3. Restart the Next.js frontend with the correct API base URL.

## Branding Does Not Match the Config File

**Symptoms**

- The sidebar title, subtitle, or theme do not match your JSON file.

**Possible causes**

- `.env` points `PHENOLAB_APP_CONFIG_FILE` at another file.
- The browser has cached stale public config.
- Backend was not restarted after a config change.

**Resolution**

1. Check `PHENOLAB_APP_CONFIG_FILE`.
2. Restart the backend.
3. Request `/api/config`.
4. Clear local browser storage if stale values persist.

## Operation Stays Pending or Queued

**Symptoms**

- A pipeline run, upload completion, or delete operation appears but never progresses.

**Possible causes**

- No worker loop is running.
- Embedded worker is disabled.
- Celery/RabbitMQ is not running when `PHENOLAB_OPERATION_QUEUE_BACKEND=celery`.
- Database connection is unavailable.

**Resolution**

1. Start the backend with embedded worker enabled, or run the Celery worker used by your deployment.
2. Check backend, worker, and RabbitMQ logs.
3. Retry the operation after worker startup.

## Operation Fails Immediately

**Symptoms**

- Operation status becomes `failed`.
- Error message appears in the operation or file status surface.

**Possible causes**

- Dataset lacks required asset modalities.
- Module dependencies are missing.
- Parameters do not match the module schema.

**Resolution**

1. Open the operation or pipeline log.
2. Confirm dataset modalities in the editor.
3. Inspect module requirements.
4. Correct parameters and retry.

## Large Images Are Slow to Preview

**Symptoms**

- Browser becomes sluggish.
- Image preview takes a long time.

**Possible causes**

- Large raster files are being loaded without optimized previews.
- Asset visualization settings require expensive conversion.

**Resolution**

1. Use optimized preview assets when available.
2. Keep raw large rasters in file-backed storage.
3. Validate visualization settings before opening many assets.

## API Key Secret Is Lost

**Symptoms**

- You copied the key ID but not the secret token.

**Possible causes**

- API secrets are shown only once.

**Resolution**

1. Revoke the lost key.
2. Create a new key.
3. Store the new secret securely.
