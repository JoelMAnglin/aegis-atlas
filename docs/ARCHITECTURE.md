# Architecture

## Design goals

Aegis Atlas is designed as a control plane, not an inline proxy. Observability must not become a new availability dependency or a repository of secrets and customer payloads.

Core principles:

1. Collect metadata, not business payloads.
2. Keep collection read-only by default.
3. Authenticate every workload and authorize every action.
4. Separate discovery, analysis, and remediation permissions.
5. Preserve environment and tenant boundaries through the full pipeline.
6. Make every recommendation explainable and auditable.

## Logical components

| Component | Responsibility | Trust boundary |
| --- | --- | --- |
| Collector | Discovers integrations and emits health/cost metadata | Runs inside the customer environment |
| Ingestion gateway | Authenticates workload identity, validates schema, rate limits | Public or private ingress |
| Normalizer | Removes sensitive fields and converts vendor records to a common model | Processing boundary |
| Integration graph | Stores systems, routes, owners, policies, and dependencies | Tenant-isolated data layer |
| Signal engine | Computes health, latency, freshness, cost, and anomaly findings | Analysis boundary |
| Policy evaluator | Tests routes against least privilege and identity requirements | Security boundary |
| UI/API | Presents inventory, findings, impact, and remediation guidance | User access boundary |
| Remediation worker | Performs separately approved actions | Privileged, isolated boundary |

## Proposed data model

- `Environment`: production, staging, development, region, account, tenant
- `Product`: SaaS product, internal service, data store, middleware, or cloud resource
- `Connection`: source, destination, protocol, owner, purpose, environment
- `Identity`: workload identity, authentication method, rotation state, scopes
- `Signal`: availability, latency, error rate, volume, cost, freshness
- `Policy`: condition, enforcement mode, severity, exception, expiry
- `Finding`: evidence, impact, confidence, owner, recommended action, status
- `Change`: actor, source, before/after state, timestamp, correlation ID

## Collector contract

A connector should emit a versioned envelope:

```json
{
  "schema_version": "1.0",
  "tenant_id": "opaque-tenant-id",
  "environment": "production",
  "observed_at": "2026-08-12T19:00:00Z",
  "source": "vendor-connector",
  "connections": [],
  "signals": [],
  "redaction_report": {}
}
```

Forbidden fields should include access tokens, refresh tokens, API keys, authorization headers, request/response bodies, unredacted query parameters, and end-user personal data.

## Scale strategy

- Partition records by tenant and environment.
- Treat raw signals as append-only with a short retention window.
- Materialize current topology and health summaries for fast UI reads.
- Use idempotency keys for collector retries.
- Apply backpressure and per-connector rate limits at ingestion.
- Separate real-time break detection from slower cost analysis.

## Failure behavior

If Aegis Atlas is unavailable, monitored integrations continue to operate. Collectors buffer a bounded amount of metadata and retry with jitter. Automated remediation remains disabled unless a separately authorized worker receives an explicit, auditable approval.
