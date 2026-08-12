# Contributing

Thank you for improving Aegis Atlas.

## Workflow

1. Create a focused branch.
2. Keep secrets, customer data, and production identifiers out of fixtures and logs.
3. Run `npm ci` and `npm run build`.
4. Add tests for behavior changes.
5. Include screenshots for visible UI changes.
6. Explain security, privacy, and deployment impact in the pull request.

## Design expectations

- Preserve the metadata-only, zero-trust model.
- Keep collection read-only unless a change explicitly introduces a separately approved remediation boundary.
- Make findings explainable with evidence and confidence.
- Maintain keyboard access, responsive behavior, and readable contrast.

## Issues

Use issues for bugs and feature proposals, but do not include secrets, sensitive logs, customer payloads, or unpublished vulnerability details.
