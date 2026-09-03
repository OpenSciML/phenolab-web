# Analysis Pipelines

Analysis pipeline UI and payload schemas are retained for dataset-level LgoPy workflows, but the backend `/api/pipelines` routes currently return `501 Not Implemented` while execution is moved onto PhenoLab's durable operations path.

![Analysis pipelines](../images/analysis-pipelines.svg)

## Step-by-Step Usage

1. Use **Analysis Modules** to install and inspect reusable LgoPy components.
2. Use the pipeline builder UI only for payload review while the backend route is disabled.
3. Use operation-backed upload and file-processing flows for active background work.
4. Track operation progress, logs, and failures through the operation-backed surfaces available in the editor.

## Payload Shape

The retained payload shape stores the selected dataset, run name, ordered blocks, versions, and block arguments:

```json
{
  "dataset_id": "7",
  "pipeline_name": "Pipeline_10:42:11am",
  "pipeline": [
    {
      "block": "ndvi_index",
      "version": "0.1.0",
      "args": {
        "nir_band": 5,
        "red_band": 3
      }
    }
  ]
}
```

## Current Backend Status

The active FastAPI router returns:

```json
{
  "message": "Pipeline execution is temporarily disabled while operations are implemented."
}
```

Operation-backed upload completion, file processing, and deletion workflows continue to use the embedded local queue or the Celery/RabbitMQ worker stack.

## Operation States

| State | Meaning |
| --- | --- |
| `pending` | The operation exists but has not been claimed yet. |
| `queued` | The operation is ready for a worker. |
| `running` | A worker is executing a file-processing or delete task. |
| `completed` | The operation finished and outputs were recorded. |
| `failed` | The worker recorded an error. |
| `cancelled` | The user cancelled the run. |

## Best Practices

- Start with a small dataset while validating a new module.
- Inspect logs before retrying a failed run.
- Use clear dataset and file names for auditability while the pipeline backend is disabled.
- Download generated artifacts immediately when sharing results outside PhenoLab.

## Limitations

- Pipeline execution is temporarily disabled at `/api/pipelines`.
- Long-running operations require the embedded local worker or the Celery/RabbitMQ worker stack used by your deployment.
