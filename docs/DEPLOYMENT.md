# Deployment

## Current hosted demo

The current version is deployed privately at:

<https://aegis-atlas-control-plane.anglinpgj.chatgpt.site>

The deployment is identity-gated and uses demonstration data.

## Option 1: OpenAI Sites

The repository includes `.openai/hosting.json` and produces the worker-compatible artifact expected by Sites. Sites is the recommended path for a private internal demo because access can remain restricted to explicitly allowed users.

Build before publishing:

```bash
npm ci
npm run build
```

Manage hosted runtime configuration in the platform environment settings. Do not add secrets to `.openai/hosting.json`.

## Option 2: Docker

Build and run:

```bash
docker build -t aegis-atlas .
docker run --rm -p 3000:3000 aegis-atlas
```

The application is then reachable on port 3000. In production, place it behind an HTTPS ingress and identity-aware access proxy. Inject configuration with the hosting platform's secret manager.

Suitable targets include Cloud Run, Azure Container Apps, AWS App Runner/ECS, Fly.io, and other OCI-compatible platforms.

## Option 3: Cloudflare-compatible hosting

`npm run build` creates a Cloudflare Worker-compatible output under `dist/`. A production Cloudflare deployment should use a dedicated account configuration, preview environment, production environment, and platform-managed secrets.

Before first deployment:

1. Bind the correct account and worker name.
2. Configure any D1/R2 resources if persistent storage is added.
3. Store secrets with the platform secret manager.
4. Add a custom domain and access policy.
5. Validate in a preview deployment before promotion.

## Environment strategy

Use physically or logically separate data and identities for development, staging, and production. A staging collector must never be able to read production APIs. Deployment promotion should move the same built artifact between environments.

## Minimum production requirements

- HTTPS-only ingress
- SSO and role-based access
- Secret manager integration
- Central logs, metrics, and alerting
- Backup and restore testing for persistent data
- Health and readiness probes
- Resource limits and autoscaling bounds
- Dependency and image vulnerability scanning
- Rollback to a known-good artifact
