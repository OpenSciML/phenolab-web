# Installation

## Clone the Repository

Install [Git for Windows](https://gitforwindows.org/) before cloning on
Windows. If you use the SSH clone URL, also configure
[GitHub SSH authentication](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
for your Windows user account first.

Clone PhenoLab with its submodules:

```bash
git clone --recurse-submodules git@github.com:OpenSciML/phenolab.git
cd phenolab
```

If you already cloned the repository without submodules, initialize them from
the repository root:

```bash
git submodule update --init --recursive
```

## Development Command Runner

The repository includes both a `Makefile` and a `justfile`. They expose the
same recipe names:

```bash
make install-backend
# or
just install-backend
```

Use GNU Make on Linux, macOS, or WSL. `just` works natively on Windows and is
also available on Linux and macOS, making it the recommended cross-platform
choice.

### Install `just` on Windows without admin permissions

Open PowerShell as your regular user, not as Administrator, and install Scoop
and `just` into your user profile:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
irm get.scoop.sh | iex
scoop install just
```

Close and reopen PowerShell, then verify it is available:

```powershell
just --version
```

If Scoop is already installed, run only `scoop install just`. You can also try
a per-user `winget` installation:

```powershell
winget install --id Casey.Just --exact --scope user
```

Use Scoop if the package does not support `winget`'s user scope on your system.

## Backend Installation

From the repository root:

```bash
python3 -m pip install -e ".[dev]"
```

If you use `uv` for local development:

```bash
uv sync --extra dev
```

## Frontend Installation

```bash
cd ui
npm install
```

The full authenticated UI depends on the Next.js runtime because authentication is wired through Auth.js route handlers.

## Verify the CLI

```bash
phenolab --help
phenolab analysis-blocks --help
```

You should see CLI commands for authentication, analysis module management, image upload, orthomosaic upload, and database deletion.

## Current CLI Commands

```bash
phenolab auth login
phenolab auth token-expiry
phenolab analysis-blocks config
phenolab analysis-blocks list
phenolab analysis-blocks search "vegetation index"
phenolab analysis-blocks install scripts/dist/ndvi_index
phenolab analysis-blocks source ndvi_index --version 0.1.0
phenolab analysis-blocks requirements ndvi_index --version 0.1.0
phenolab analysis-blocks remove ndvi_index --version 0.1.0
```

:::note

Study hierarchy and datasets are created through the browser UI. Use `phenolab --help` to inspect the current CLI surface for this checkout.

:::
