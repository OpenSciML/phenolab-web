# Results and Exports

PhenoLab records generated outputs as artifacts linked back to datasets, plots, and processing workflows. Pipeline-specific outputs are retained in the UI model, but `/api/pipelines` is temporarily disabled in this checkout.

![Pipeline artifacts](../images/results-artifacts.svg)

## Output Types

| Output | Description |
| --- | --- |
| Artifacts | JSON summaries, previews, masks, tables, logs, or other generated files. |
| Operation logs | Runtime messages appended while the worker runs. |

## Step-by-Step Usage

1. Open the surface that owns the completed operation or artifact.
2. Locate the completed operation.
3. Open logs to confirm runtime behavior.
4. Select the artifact action.
5. Preview text-based artifacts such as JSON or logs.
6. Download binary or tabular artifacts.

## Tips

- Keep operation, file, and dataset names aligned so exported files are easy to trace.
- Preview JSON artifacts before downloading to confirm the expected result.
- Use API keys for scripted retrieval when exporting many outputs.

## Limitations

- Only text-like artifacts are previewed directly in the dialog.
- Large binary files should be downloaded rather than opened in the browser.
