# Product analysis and roadmap

## Problem analysis

Integration estates fail organizationally before they fail technically. Ownership, identity, topology, health, and cost usually live in different tools. The useful unit is therefore not an API call; it is a governed connection between two products in a specific environment, with a purpose, owner, identity, policy, service level, and cost model.

## Value model

| Outcome | Evidence |
| --- | --- |
| Faster break detection | Mean time to detect and percentage discovered before downstream users |
| Faster recovery | Mean time to resolve by connection and failure class |
| Reduced attack surface | Long-lived credentials removed, scopes reduced, stale identities revoked |
| Lower operating cost | Verified savings after change, excluding one-time estimates |
| Better governance | Percentage of routes with owner, purpose, policy, and review date |

## Prioritization

### Phase 1: trustworthy inventory

- Connector SDK and schema
- Environment-aware integration graph
- Ownership and purpose metadata
- Manual annotations and review workflow
- Read-only signals and audit log

### Phase 2: operational intelligence

- Break and degradation detection
- Dependency/blast-radius analysis
- Credential and certificate expiry findings
- Cost normalization and explainable recommendations
- Alert routing and ticket integrations

### Phase 3: governed remediation

- Policy-as-code
- Approval workflows
- Short-lived privileged remediation workers
- Safe actions with dry run, rollback, and evidence
- Outcome measurement

## Risks and tradeoffs

- Breadth versus depth: many shallow connectors create inventory but limited diagnosis. Start with a few high-value systems and a strong shared model.
- Real-time versus cost: not every signal needs streaming. Break detection may be near real time; license overlap may be daily.
- Automation versus safety: automatic remediation increases value and risk. Keep it separate and approval-gated.
- Visibility versus privacy: payload inspection can improve diagnosis but violates the minimum-data goal. Prefer metadata and customer-side aggregation.
- Estimated versus realized savings: always distinguish opportunity, approved action, and measured result.

## Success criteria for a production pilot

- 90% of in-scope connections discovered and assigned an owner
- No secrets or business payloads observed in ingestion tests
- Detection of injected failures within the agreed SLA
- Correct tenant and environment isolation verified by adversarial tests
- Cost recommendations reproduce against source billing data
- Audit trail covers every identity, policy, connector, and remediation change
