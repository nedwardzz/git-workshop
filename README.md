# Git Skills Workshop - Operations on Commit History

Welcome back! In this session, we’ll explore how different Git operations—**rebase**, **merge**, **squash**, and **cherry-pick**—can alter your project’s commit history. We’ll all start from the same minimal version of a Rock-Paper-Scissors (RPS) game, then gradually add features and use Git’s tools to reshape the history in various ways.

# Table of Contents

1. [What You’ll Need](#what-youll-need)
2. [Notes](#notes)
3. [Initial Setup Steps for the Base Environment](#initial-setup-steps-for-the-base-environment)
4. [The 4 Different Commit History Modification Techniques We'll Explore](#the-4-different-commit-history-modification-techniques-well-explore)
   - [Rebasing](#rebasing)
   - [Merging](#merging)
   - [Squashing](#squashing)
   - [Cherry-Picking](#cherry-picking)

## What You’ll Need

- A command-line interface (VS Code Terminal is what I'm using)
- [Git installed](https://git-scm.com/downloads) on your machine
- A web browser to test the game locally, open the index.html in a browser or the [VS Code Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) is great as well!

## Notes

- You do not need to fork or clone this repo, just have it open in your browser and follow along in your own local environment/ IDE
- These instructions assume you start with an empty folder. Adjust paths as needed for your environment.
- As you step through each scenario, you'll see the use of the following command: `git log --oneline --graph --decorate --all`
  - This command will show you the git commit history in your terminal in a user-friendly way that allows you to easily see and visualize that history across both the `main` and `feature-branch` branches.
  - [VS Code GitLens extension](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) is a great tool as well for visualizing commit history across multiple branches!

---

## Initial Setup Steps for the Base Environment

1. Create and enter a new directory:

```bash
mkdir git-playground
cd git-playground
```

2. Create a `start` directory within this directory.

```bash
mkdir start
cd start

git init
```

3. Copy the code from each file in the `app-stages/stage-1` folder to this folder. Your `start` folder should have:

   - `index.html`
   - `script.js`
   - `styles.css`

4. Open your `index.html` in your browser and familiarize yourself with the game! Play a few games!

5. Create the first commit on `main`

```bash
git add .
git commit -m "Initial commit - first version of RPS app"
git log --oneline --graph --decorate --all
```

5. Create the `feature-branch` branch

```bash
git checkout -b feature-branch
```

6. Add the first feature - Current Round Stats - and commit it
   - Copy the code from the `index.html` in the `app-stages/stage-2` to the current `index.html` in your `start` directory
   - Add and commit the changes

```bash
git add index.html
git commit -m "First Feature Commit - Add Current Round Stats capability"
git log --oneline --graph --decorate --all

```

7. Add the second feature - Current Round Stats - and commit it
   - Copy the code from the `index.html` in the `app-stages/stage-3` to the current `index.html` in your `start` directory
   - Add and commit the changes

```bash
git add index.html
git commit -m "Second Feature Commit - Add Overall Round Stats capability"
git log --oneline --graph --decorate --all
```

8. Add the third and final feature - Round Results Styling
   - Copy the code from the `script.js` in the `app-stages/stage-4` to the current `script.js` in your `start` directory
   - Add and commit the changes

```bash
git add script.js
git commit -m "Third Feature Commit - Add Background Styling for End of Round Results"
git log --oneline --graph --decorate --all
```

Our initial setup is now complete! Great work!

---

## The 4 Different Commit History Modification Techniques We'll Explore

### Rebasing

Rebasing allows you to move or replay a set of commits onto a new base commit. This is commonly used to keep a clean, linear commit history.

Example Use Case: You're working on a `feature-branch`, and the `main` branch has been updated since you started. You can rebase your `feature-branch` onto the latest version of the `main` branch.

```bash
// Make sure you start in git-playground
cp -r start rebase-ex
cd rebase-ex

git checkout main
git log --oneline --graph --decorate --all

// Add a change to index.html
git add index.html
git commit -m "Describe your changes"
git log --oneline --graph --decorate --all

git checkout feature-branch
git rebase main

git log --oneline --graph --decorate --all

// How to move code to main? Use a "fast-forward" merge - no new commits on main history
git checkout main
git merge feature-branch
```

This rewrites the feature branch commits on top of the latest commits in `main`.

#### Pros:
- Creates a linear, cleaner commit history.

#### Cons:
- Rewrites commit history, which can cause issues if the branch has already been shared with others
- Can introduce conflicts that need to be resolved, adding complexity
- Requires close coordination among developers to avoid disrupting each other's work

#### Important Notes
If another developer branches off your `feature-branch` and you later rebase your `feature-branch` onto `main`, their branch will no longer align with the history on `main`. This can cause issues when they try to merge their branch into `main`, as their branch will have diverged from the rebased `feature-branch`. To avoid these issues, consider using merging instead of rebasing for shared branches.

---

### Merging

Merging combines two branches by creating a new commit that ties them together. It preserves the entire history of both branches.

Example Use Case: You finished work on a `feature-branch` and want to merge it into the `main` branch.

```bash
// Make sure you start in git-playground
cp -r start merge-ex
cd merge-ex

git checkout main
git log --oneline --graph --decorate --all

// Add a change to index.html
git add index.html
git commit -m "Describe your changes"
git log --oneline --graph --decorate --all

git merge feature-branch
git log --oneline --graph --decorate --all
```

This creates a merge commit that reflects changes from both branches.

#### Pros:

- Preserves the full history of all branches
- Non-destructive; doesn't rewrite history
- Easier to manage in a collaborative environment as it avoids the issues associated with rebasing

#### Cons:

- Can result in a cluttered commit history if done frequently
- Merge conflicts can still occur if the same code is modified in both branches

#### Important Notes

When working on a team, merging is generally safer than rebasing for shared branches. However, it's important to regularly pull changes from the `main` branch into your `feature-branch` to minimize conflicts and ensure your branch stays up-to-date. This practice helps to avoid large, complex merges at the end of the development cycle.

---

### Squashing

Squashing condenses multiple commits into a single commit. It's useful for combining a series of small, related changes into one meaningful commit before merging.

Example Use Case: You have multiple work-in-progress commits on a `feature-branch`, and you want to merge them into `main` as a single commit.

```bash
// Make sure you start in git-playground
cp -r start squash-ex-one
cd squash-ex-one

// Method 1
git checkout main
git log --oneline --graph --decorate --all

// Add a change to index.html
git add index.html
git commit -m "Describe your changes"
git log --oneline --graph --decorate --all

git merge --squash feature-branch
git commit -m "Add Current Round Stats, Overall Round Stats, and Round Results Styling"
git log --oneline --graph --decorate --all

// Method 2
// Make sure you start in git-playground
cp -r start squash-ex-two
cd squash-ex-two

// Add another change to index.html
git checkout main
git add index.html
git commit -m "Describe your changes"
git log --oneline --graph --decorate --all

git checkout feature-branch
git rebase -i main
// Change "pick" to "squash" for all but the first commit
// Save and close the editor
// Update the commit message as needed
git log --oneline --graph --decorate --all
```

#### Pros:

- Keeps the commit history concise and easier to read
- Combines related changes into a single, meaningful commit

#### Cons:

- Loses detailed history of individual changes in the squashed commits
- Can make it harder to track down specific changes if issues arise later

#### Important Notes

When working in a team, squashing can be useful for keeping the commit history clean, but it should be done with caution. If other developers are working on the same branch or have branched off from it, squashing can rewrite the commit history and cause issues similar to those encountered with rebasing. To avoid these issues, communicate with your team and ensure everyone is aware of the changes being made to the commit history.

---

### Cherry-Picking

Cherry-Picking allows you to apply specific commits from one branch to another without merging the entire branch.

Example Use Case: You want to apply a specific bug fix from a `feature-branch` to `main` without merging all the changes from that branch.

```bash
// Make sure you start in git-playground
cp -r start cherry-pick-ex
cd cherry-pick-ex

git checkout feature-branch
git log

git checkout main

git cherry-pick <commit-hash>
```

#### Pros:

- Flexibility to apply specific commits
- Useful for applying critical fixes without merging unrelated changes

#### Cons:

- Can lead to duplicate commits if not managed carefully
- May cause conflicts if the code has diverged significantly
- Can make the commit history harder to follow if overused

#### Important Notes

When working in a team, cherry-picking should be used with caution. If other developers are working on the same codebase, cherry-picking can introduce conflicts and duplicate commits. To avoid these issues, communicate with your team and ensure everyone is aware of the changes being made.

---

**END OF FILE**
