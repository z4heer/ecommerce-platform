# Git Developer Cheat Sheet

## 1. Check Current Status

```bash
git status
```

Shows:

* Current branch
* Modified files
* Staged files
* Untracked files

---

## 2. Check Current Branch

```bash
git branch
```

Current branch has `*`

Example

```text
develop
* feature/layout-foundation
main
```

---

## 3. View All Branches

Local

```bash
git branch
```

Remote

```bash
git branch -r
```

All

```bash
git branch -a
```

---

# Creating Branches

Create new branch

```bash
git checkout -b feature/layout-foundation
```

or

```bash
git switch -c feature/layout-foundation
```

---

Create branch from develop

```bash
git checkout develop
git pull origin develop
git checkout -b feature/new-feature
```

---

# Switching Branches

Old

```bash
git checkout develop
```

New

```bash
git switch develop
```

---

# Rename Branch

Current branch

```bash
git branch -m new-name
```

Other branch

```bash
git branch -m old-name new-name
```

---

# Delete Branch

Local

Merged

```bash
git branch -d feature/demo
```

Force delete

```bash
git branch -D feature/demo
```

---

Remote

```bash
git push origin --delete feature/demo
```

---

# Clone Repository

```bash
git clone <repository-url>
```

Example

```bash
git clone https://github.com/company/project.git
```

---

# Add Files

Single file

```bash
git add app.py
```

Multiple

```bash
git add file1 file2
```

Everything

```bash
git add .
```

---

# Commit

```bash
git commit -m "Add layout foundation"
```

Good commit messages

```
feat: add sidebar layout

fix: login validation

refactor: split user service

docs: update README

test: add API tests
```

---

# Push

First push

```bash
git push -u origin feature/layout-foundation
```

Later

```bash
git push
```

---

# Pull

```bash
git pull
```

Specific branch

```bash
git pull origin develop
```

---

# Fetch

Download latest changes only

```bash
git fetch
```

Then compare before merging.

---

# Merge

Merge develop into feature

```bash
git checkout feature/layout-foundation
git merge develop
```

---

Merge feature into develop

```bash
git checkout develop
git merge feature/layout-foundation
```

---

# Rebase

```bash
git checkout feature/layout-foundation
git fetch origin
git rebase origin/develop
```

Useful for keeping a clean, linear history.

---

# View Commit History

Compact

```bash
git log --oneline
```

Graph

```bash
git log --graph --oneline --decorate --all
```

Detailed

```bash
git log
```

---

# Difference

Working directory

```bash
git diff
```

Staged

```bash
git diff --cached
```

Between branches

```bash
git diff develop feature/layout-foundation
```

---

# Undo Changes

Discard one file

```bash
git restore app.py
```

Discard all changes

```bash
git restore .
```

---

# Unstage Files

```bash
git restore --staged app.py
```

Everything

```bash
git restore --staged .
```

---

# Stash

Save work temporarily

```bash
git stash
```

List

```bash
git stash list
```

Restore

```bash
git stash pop
```

Keep stash

```bash
git stash apply
```

Delete stash

```bash
git stash drop
```

---

# Tags

Create

```bash
git tag v1.0
```

Push

```bash
git push origin v1.0
```

List

```bash
git tag
```

---

# Remote

View

```bash
git remote -v
```

Add

```bash
git remote add origin <url>
```

Change URL

```bash
git remote set-url origin <url>
```

---

# Reset

Soft

```bash
git reset --soft HEAD~1
```

Mixed (default)

```bash
git reset HEAD~1
```

Hard (⚠️ deletes local changes)

```bash
git reset --hard HEAD~1
```

---

# Revert

Create a new commit that undoes a previous commit

```bash
git revert <commit-id>
```

Preferred for shared branches because it preserves history.

---

# Cherry-pick

Copy one commit

```bash
git cherry-pick <commit-id>
```

---

# Clean

Preview

```bash
git clean -n
```

Delete untracked files

```bash
git clean -f
```

Delete untracked files and directories

```bash
git clean -fd
```

---

# Useful Inspections

Current branch

```bash
git branch --show-current
```

Last commit

```bash
git show
```

Who changed a line

```bash
git blame file.py
```

Search commits

```bash
git log --grep="login"
```

---

# Typical Feature Development Workflow

```text
main
│
└── develop
      │
      ├── feature/layout-foundation
      ├── feature/authentication
      ├── feature/product-catalog
      └── feature/orders
```

Daily workflow:

```bash
git checkout develop
git pull origin develop

git checkout feature/layout-foundation
git merge develop   # or git rebase origin/develop

# Make changes
git add .
git commit -m "feat: implement responsive layout"
git push
```

When feature is complete:

1. Open a Pull Request from `feature/layout-foundation` to `develop`.
2. After approval, merge the PR.
3. Update your local `develop`:

   ```bash
   git checkout develop
   git pull origin develop
   ```
4. Delete the feature branch locally and remotely:

   ```bash
   git branch -d feature/layout-foundation
   git push origin --delete feature/layout-foundation
   ```

---

# Common Problems & Fixes

| Problem                               | Command                                      |
| ------------------------------------- | -------------------------------------------- |
| See current status                    | `git status`                                 |
| Forgot to stage files                 | `git add .`                                  |
| Wrong branch                          | `git switch <branch>`                        |
| Undo unstaged changes                 | `git restore .`                              |
| Undo staged files                     | `git restore --staged .`                     |
| Undo last local commit (keep changes) | `git reset --soft HEAD~1`                    |
| Sync with remote                      | `git pull origin develop`                    |
| Save unfinished work                  | `git stash`                                  |
| Restore stashed work                  | `git stash pop`                              |
| Delete merged branch                  | `git branch -d feature/name`                 |
| Delete remote branch                  | `git push origin --delete feature/name`      |
| View commit graph                     | `git log --graph --oneline --decorate --all` |

### Best Practices

* Keep `main` production-ready.
* Branch new work from `develop`, not `main`.
* Pull the latest `develop` before creating a feature branch.
* Commit small, logical changes with meaningful messages.
* Push frequently to back up your work.
* Use Pull Requests for code review instead of pushing directly to shared branches.
* Prefer `git revert` over `git reset --hard` on shared branches to avoid rewriting history.
* Delete feature branches after they are merged to keep the repository clean.