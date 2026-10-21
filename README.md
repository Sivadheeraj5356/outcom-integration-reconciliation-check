# Outcom AI Integration Reconciliation Check

A small Node.js utility that compares expected and delivered SaaS integration events. It flags records that are missing from the target, delivered with a different status or payload hash, or present only in the target.

Built as a focused Outcom AI application project for backend integrations, webhook processing, and production data reconciliation.

## Run tests

```bash
npm test
```

## Scope

- deterministic event reconciliation;
- missing, mismatched, and unexpected event reporting;
- concise operator summary for support and reliability reviews.
