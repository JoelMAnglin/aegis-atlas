# Security and zero-trust model

## Zero-trust interpretation

Zero trust means no user, collector, service, environment, or remediation action is trusted solely because of its network location. Each request must have verified identity, explicit authorization, minimal scope, and sufficient context.

## Controls

- Short-lived workload identity instead of static connector keys when vendors support it
- Mutual TLS or signed requests between collectors and ingestion
- Tenant and environment isolation in authorization and storage keys
- Least-privilege read scopes for inventory and telemetry collection
- Separate identities for observation and remediation
- Encryption in transit and at rest
- Central secret manager with rotation; no secrets in source or logs
- Immutable audit events for access, policy, connector, and remediation changes
- Schema validation, payload size limits, and allowlisted metadata fields
- Egress restrictions for privileged workers

## Data minimization

A production implementation should collect topology, configuration metadata, aggregate performance signals, and cost counters. It should not collect business payloads, customer content, raw authorization material, or sensitive headers.

## Threat analysis

| Threat | Primary mitigation |
| --- | --- |
| Stolen collector credential | Short TTL, workload identity, audience binding, rapid revocation |
| Cross-tenant data access | Tenant-scoped authorization and storage partitioning |
| Secret leakage in telemetry | Connector-side redaction plus ingestion rejection rules |
| Compromised third-party API | Read-only scope, rate limits, circuit breakers, anomaly detection |
| Unauthorized remediation | Separate privileged identity, approval, audit trail, rollback |
| Misleading cost recommendation | Evidence, confidence score, owner approval, measured result |
| Supply-chain compromise | Lockfiles, dependency scanning, signed artifacts, protected releases |

## Production checklist

- Complete a formal threat model and data classification review.
- Define retention and deletion policy per signal type.
- Add SSO, RBAC/ABAC, and break-glass procedures.
- Add audit export and security-event alerting.
- Enable dependency, container, and secret scanning.
- Perform penetration testing before onboarding production credentials.
- Document subprocessors and compliance boundary.

## Reporting vulnerabilities

Do not open public issues containing sensitive vulnerability details. Until a dedicated security contact is configured, use GitHub's private vulnerability reporting feature for the repository owner.
