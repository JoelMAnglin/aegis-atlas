# Troubleshooting runbook

## Triage sequence

1. Identify the affected environment, connection, owner, and user impact.
2. Determine whether the failure is in Aegis Atlas, the collector, or the monitored integration.
3. Correlate the first failure with recent configuration, credential, vendor, or deployment changes.
4. Preserve correlation IDs and sanitized evidence.
5. Mitigate user impact before optimizing the permanent fix.
6. Verify recovery from both source and destination perspectives.

## Application does not start

**Symptoms:** command exits, blank response, module-not-found error.

Checks:

```bash
node --version
npm ci
npm run build
```

Use Node 22.13 or newer and install from the committed lockfile. If the build succeeds but the development server fails, check whether port 3000 is already in use and whether another instance is running.

## Blank or incomplete dashboard

1. Open browser developer tools and check console errors.
2. Confirm the page returns HTTP 200.
3. Verify static CSS and JavaScript assets load without 404 responses.
4. Clear an obsolete service-worker/browser cache if the build changed.
5. Reproduce with a clean production build.

## Build fails

- Remove only generated output and reinstall dependencies from the lockfile.
- Confirm no uncommitted lockfile/package manifest mismatch.
- Check TypeScript errors before treating warnings as blockers.
- Verify required runtime variables exist without printing secret values.
- Compare Node and package-manager versions with CI.

## Collector reports stale data

| Check | Expected |
| --- | --- |
| Last successful observation | Inside connector freshness SLA |
| Workload identity | Valid, correct audience, correct tenant |
| Vendor quota | Remaining capacity and no sustained 429s |
| Clock skew | Within identity-provider tolerance |
| Queue backlog | Stable or decreasing |
| Schema version | Accepted by ingestion |

If retries are required, use exponential backoff with jitter and an idempotency key. Do not broaden connector permissions as a first response.

## Integration shown as critical

Validate independently:

1. Source service health and authentication
2. DNS/TLS/connectivity from the integration runtime
3. Destination service health and quota
4. Recent token, certificate, scope, or endpoint changes
5. Error rate and latency relative to the route's baseline
6. Downstream dependency impact

Never rotate or revoke credentials from the observability identity. Escalate a proposed change through the separately authorized remediation path.

## Cost numbers look wrong

- Confirm currency, billing period, timezone, and tax treatment.
- Check whether usage is estimated, invoiced, amortized, or list price.
- Remove retry traffic and internal health checks from billable-call assumptions when appropriate.
- Detect duplicate vendor/account records.
- Compare the recommendation against at least one complete billing cycle.
- Require an owner and confidence interval before presenting savings as committed value.

## Authentication or access denied

1. Confirm the user or workload is authenticating to the intended environment.
2. Check token audience, issuer, expiry, and assigned role.
3. Check tenant/environment context and policy decision logs.
4. Confirm system clock health.
5. Do not bypass the access layer or reuse a broader role to make the error disappear.

## TLS or hosted deployment timeout

Certificate provisioning can lag a successful application build. Confirm DNS and certificate status, wait for the provider's documented propagation window, then retry the same immutable version. Do not create repeated projects or change hostnames unless the provider reports a permanent conflict.

## Incident evidence template

- Environment:
- Affected connection(s):
- First observed / last known good:
- User or business impact:
- Correlation IDs:
- Sanitized error signature:
- Recent changes:
- Mitigation:
- Owner and next update:
- Root cause / corrective action:
