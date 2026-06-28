# AGENTS.md

Guidance for AI coding agents and contributors working in this repository.

## Working Branches

- Create a new branch before implementing any feature or meaningful change.
- Branch from the current parent branch unless the task explicitly says otherwise.
- Use clear branch names, for example:
  - `feature/survey-builder`
  - `feature/auth-flow`
  - `fix/response-validation`
- After implementation is complete and verified, merge the feature branch back into its parent branch.
- Do not merge unfinished work unless the user explicitly asks for it.

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

1. Start from the correct parent branch.
2. Create a new feature branch.
3. Create `docs/plans/<feature-name>/`.
4. Write the feature plan and TO-DO list before implementation.
5. Commit the plan and TO-DO list.
6. Implement the feature in meaningful, reviewable increments.
7. Commit after each meaningful change.
8. Run relevant tests or manual verification.
9. Write `IMPLEMENTATION_SUMMARY.md` in the same feature planning folder.
10. Commit the implementation summary.
11. Merge the completed feature branch back into the parent branch.

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
- Before merging, ensure the feature branch contains the plan, TO-DO list, implementation, verification, and implementation summary.
