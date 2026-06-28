# AGENTS.md

Guidance for AI coding agents and contributors working in this repository.

## Feature Planning

For each feature, create a feature-specific planning directory under:

```text
docs/plans/<feature-name>/
```

Use lowercase, hyphenated directory names, for example:

```text
docs/plans/survey-builder/
docs/plans/user-authentication/
docs/plans/response-analytics/
```

Each feature planning directory should include:

- A plan document describing the intended implementation.
- A TO-DO list with concrete, checkable tasks.
- Notes about expected validation, tests, or manual verification.
- Explicit commit checkpoints after each meaningful change.

Suggested files:

```text
docs/plans/<feature-name>/PLAN.md
docs/plans/<feature-name>/TODO.md
docs/plans/<feature-name>/IMPLEMENTATION_SUMMARY.md
```

## Commit Discipline

- Commit early. Commit often.
- Commit after each meaningful change, especially after:
  - Adding or updating a feature plan.
  - Completing a coherent implementation step.
  - Adding tests or verification coverage.
  - Fixing a bug discovered during implementation.
  - Updating documentation after behavior changes.
- Keep commits focused and understandable.
- Use commit messages that explain the purpose of the change, for example:
  - `docs: add survey builder plan`
  - `feat: add survey question model`
  - `test: cover public survey submission`
  - `docs: summarize authentication implementation`

## Implementation Workflow

For every feature:

1. Create `docs/plans/<feature-name>/`.
2. Write the feature plan and TO-DO list before implementation.
3. Commit the plan and TO-DO list.
4. Implement the feature in meaningful, reviewable increments.
5. Commit after each meaningful change.
6. Run relevant tests or manual verification.
7. Write `IMPLEMENTATION_SUMMARY.md` in the same feature planning folder.
8. Commit the implementation summary.

## Implementation Summary

After completing a feature, write an implementation summary in:

```text
docs/plans/<feature-name>/IMPLEMENTATION_SUMMARY.md
```

The summary should include:

- What was implemented.
- Key files changed.
- Important design or technical decisions.
- Tests or verification performed.
- Known limitations or follow-up tasks.
- The commit history or major commit checkpoints for the feature.

## Repository Care

- Preserve user changes already present in the working tree.
- Do not revert unrelated changes.
- Keep planning documents updated as the implementation evolves.
- Prefer small, reviewable changes over large mixed commits.
- Before considering a feature complete, ensure it includes the plan, TO-DO list, implementation, verification, and implementation summary.
