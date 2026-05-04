# nextcloud-report (frontend-only)

This repository contains a documentation site built with Create React App located in the `frontend/` directory. Backend and test artifacts can be removed if you prefer to keep the repository focused on the documentation frontend; by default they are left in place unless you ask for deletion.

## Quick summary

- Frontend: `frontend/` (Create React App + CRACO + Tailwind)
- Backend: optional (FastAPI) — not required to run the docs site

## Local development

1. Install dependencies and start dev server:

```powershell
cd frontend
yarn       # or `npm install`
yarn start # or `npm start`
# Open http://localhost:3000
```

## Build for production

```powershell
cd frontend
yarn build # or `npm run build`
```

Production files will be in `frontend/build`.

## Deploy to Netlify

This repository includes a `netlify.toml` configured to build from the `frontend` directory.

Netlify settings:

- Base directory: `frontend`
- Build command: `yarn build` (or `npm run build`)
- Publish directory: `frontend/build`

After connecting the repo to Netlify and setting the base directory, Netlify will build and deploy the site automatically.

If you'd like, I can also delete the backend and test artifacts now and keep a backup branch with them. Tell me whether to delete them or leave them as-is.

