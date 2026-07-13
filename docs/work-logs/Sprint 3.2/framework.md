I think we should formalize the workflow before writing any more code. At this stage, you're effectively running a small software project with three distinct roles. Keeping those roles separate will improve code quality and reduce context switching.

## Proposed Execution Framework

### Role 1 — ChatGPT (Principal Architect & Technical Lead)

**Purpose:** Own architecture, planning, reviews, and governance.

This chat remains the **single source of truth**. We do **not** write production code here unless reviewing or correcting a specific issue.

### Responsibilities

* Sprint planning
* Architecture decisions
* Technical reviews
* Enterprise best practices
* Design reviews
* Performance reviews
* Accessibility reviews
* ADRs
* Test strategy
* Acceptance criteria
* Git strategy
* Release readiness
* Sprint reports
* Code review after implementation
* Decide next task

---

### Role 2 — AI Coding Assistant (Implementation Engineer)

This AI focuses only on implementation.

Responsibilities:

* Produce production-ready Angular code
* Modify requested files only
* Write unit tests
* Preserve architecture
* Follow coding standards
* No architecture changes unless instructed

It should **not** redesign the application.

---

### Role 3 — You (Technical Lead / QA)

Responsibilities:

* Implement or accept generated code
* Compile
* Run application
* Execute tests
* Commit changes
* Report findings
* Return here for review

This mirrors a real enterprise workflow:

```
Architecture
      │
      ▼
Implementation
      │
      ▼
Testing
      │
      ▼
Technical Review
      │
      ▼
Git Commit
      │
      ▼
ADR
      │
      ▼
Next Task
```

---

# Chat Workflow

For every Sprint 3.2 task, follow this sequence:

### Step 1

This chat prepares the task.

Deliverables:

* Architecture Review
* Design Decisions
* Folder Structure
* Files to Modify
* Acceptance Criteria
* Risks
* AI Coding Prompt

---

### Step 2

Open a **new AI Coding Assistant chat**.

Paste only the generated implementation prompt.

The coding assistant returns:

* Code
* Tests
* Modified files

No architectural discussion.

---

### Step 3

Implement locally.

Run:

* Build
* Lint
* Unit tests
* Manual verification

---

### Step 4

Return to this chat.

Provide:

* Changed files
* Git diff (or upload files)
* Any compilation/runtime issues

I perform:

* Principal Architect Review
* Enterprise Review
* Accessibility Review
* Performance Review
* Technical Debt Review

---

### Step 5

After approval:

* Git Commit
* ADR Update
* Sprint Report Update

Only then move to the next task.

---

# Folder Organization

I recommend keeping all project management artifacts under a dedicated folder:

```text
project-docs/
│
├── sprint-plans/
│     Sprint3.1.md
│     Sprint3.2.md
│
├── adr/
│     ADR-001.md
│     ADR-007.md
│
├── ai-prompts/
│     S3.2-M1-Dashboard.md
│     S3.2-M2-Product.md
│     S3.2-M3-Auth.md
│
├── reviews/
│     Review-001.md
│
├── reports/
│     Sprint3.2-Progress.md
```

This keeps prompts, ADRs, and reviews versioned alongside the codebase.

---

# Sprint 3.2 Milestone Breakdown

| Milestone | Task                         | Estimated Complexity |
| --------- | ---------------------------- | -------------------- |
| M1        | Dashboard Refactoring        | Medium               |
| M2        | Product Module Integration   | High                 |
| M3        | Authentication Modernization | Medium               |
| M4        | Inventory Integration        | Medium               |
| M5        | UX Polish                    | Medium               |
| M6        | Enterprise Optimization      | High                 |

Each task should end with:

* ✅ Technical Lead Review
* ✅ Git Commit
* ✅ ADR Update (if needed)
* ✅ Sprint Report Update

---

# Standard Deliverables for Every Task

Each task in this chat will consistently include:

1. Architecture Review
2. Design Decisions
3. Folder Structure
4. Files to Modify
5. Files to Create (if any)
6. AI Coding Assistant Prompt
7. Acceptance Criteria
8. Unit Test Checklist
9. Integration Test Checklist
10. Manual Testing Checklist
11. Accessibility Review
12. Performance Review
13. Technical Lead Review Checklist
14. Git Commit Message
15. ADR Update (if applicable)
16. Sprint Report Update

This keeps every change traceable and reviewable.

---

# Definition of Done (DoD)

A task is complete only when all of the following are true:

* Code compiles without errors.
* Lint passes.
* Existing functionality is preserved (no regressions).
* Unit tests pass.
* Manual testing passes.
* Accessibility requirements are met.
* Performance has not regressed.
* Technical Lead review is approved.
* Git commit is created.
* ADR updated if the change affects architecture.
* Sprint report updated.

---

## Final Recommendation

I recommend keeping **this chat as the permanent Architecture & Technical Lead session** for Sprint 3.2. For each implementation task, we'll generate a focused, production-ready prompt for your AI coding assistant. After implementation, you'll return here with the code or changed files for a formal enterprise review before committing and moving to the next task.

This gives you a disciplined workflow very similar to an enterprise team, with clear separation between architecture, implementation, QA, and governance, while keeping context manageable across longer sprints.

With this framework agreed, we'll start Sprint 3.2 with **Milestone 1 – Dashboard Refactoring (Phase 1)**, and I'll prepare the first implementation package for your AI coding assistant.