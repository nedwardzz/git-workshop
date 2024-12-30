# Git Skills Workshop - Operations on Commit History

Welcome back! In this session, we’ll explore how different Git operations—**rebase**, **merge**, **squash**, and **cherry-pick**—can alter your project’s commit history. We’ll all start from the same minimal version of a Rock-Paper-Scissors (RPS) game, then gradually add features and use Git’s tools to reshape the history in various ways.

**What You’ll Need:**
- A command-line interface (VS Code Terminal is what I'm using)
- [Git installed](https://git-scm.com/downloads) on your machine
- A web browser to test the game locally, open the index.html in a browser or the [VS Code Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) is great as well!

**Notes:**
- You do not need to fork or clone this repo, just have it open in your browser and follow along in your own local environment/ IDE
- These instructions assume you start with an empty folder. Adjust paths as needed for your environment.
- When prompted for <full-file-path-to-start> in the 4 different git ops sections, you can find this by *right-clicking* on your `start` folder in your IDE and choosing "Copy Path". You want the full path here.
- As you step through each scenario, you'll see the use of the following command: `git log --oneline --graph --decorate --all`
    - This command will show you the git commit history in your terminal in a user friendly way that allows you to easily see and visualize that history across both the `main` and `feature-branch` branches.
    - [VS Code GitLens extension](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) is a great tool as well for visualizing commit history across multiple branches!

---

## Initial Set Up Steps for the Base Environment

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

4. Create the first commit on `main`
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
git add .
git commit -m "First Feature Commit - Add Current Round Stats capability"
git log --oneline --graph --decorate --all

```

7. Add the second feature - Current Round Stats - and commit it
    - Copy the code from the `index.html` in the `app-stages/stage-3` to the current `index.html` in your `start` directory
    - Add and commit the changes
```bash
git add .
git commit -m "Second Feature Commit - Add Overall Round Stats capability"
git log --oneline --graph --decorate --all
```

8. Add the third an final feature - Round Results Styling
    - Copy the code from the `script.js` in the `app-stages/stage-4` to the current `script.js` in your `start` directory
    - Add and commit the changes
```bash
git add .
git commit -m "Third Feature Commit - Add Background Styling for End of Round Results"
git log --oneline --graph --decorate --all
```

Our initial setup is now complete! Great work!

---

## The 4 Different Commit History Modification Techniques We'll Explore

### Rebasing
Rebasing allows you to move or replay a set of commits onto a new base commit. This is commonly used to keep a clean, linear commit history.

Example Use Case: You're working on a feature branch, and the main branch has been updated since you started. You can rebase your feature branch onto the latest version of the main branch.

```bash
// Make sure you start in git-playground
mkdir rebase-ex
git clone <full-file-path-to-start> rebase-ex
cd .\rebase-ex\

git checkout main
git log --oneline --graph --decorate --all

// Add a change to index.html
git add .
git commit -m "Update main branch with a new comment"
git log --oneline --graph --decorate --all

git checkout feature-branch
git rebase main
git log --oneline --graph --decorate --all

// How to move code to main? Use a "fast-forward" merge - no new commits on main history
cd ..
git merge feature-branch
```

This rewrites the feature branch commits on top of the latest commits in main.

#### Pros:

Creates a linear, cleaner commit history.

#### Cons:

Rewrites commit history, which can cause issues if the branch has already been shared with others.

### Merging
Merging combines two branches by creating a new commit that ties them together. It preserves the entire history of both branches.

Example Use Case: You finished work on a feature branch and want to merge it into the main branch.

```bash
// Make sure you start in git-playground
mkdir merge-ex
git clone <full-file-path-to-start> merge-ex
cd .\merge-ex\

git checkout main
git log --oneline --graph --decorate --all

// Add a change to index.html 
git add .
git commit -m "Update main branch with a new comment"
git log --oneline --graph --decorate --all

git merge feature-branch
git log --oneline --graph --decorate --all
```

This creates a merge commit that reflects changes from both branches.

#### Pros:

Preserves the full history of all branches.
Non-destructive; doesn't rewrite history.

#### Cons:

Can result in a cluttered commit history if done frequently.

### Squashing
Squashing condenses multiple commits into a single commit. It's useful for combining a series of small, related changes into one meaningful commit before merging.

Example Use Case: You have multiple work-in-progress commits on a feature branch, and you want to merge them into main as a single commit.

```bash
// Make sure you start in git-playground
mkdir squash-ex
git clone <full-file-path-to-start> squash-ex
cd .\squash-ex\

git checkout main
git log --oneline --graph --decorate --all

// Add a change to index.html 
git add .
git commit -m "Update main branch with a new comment"
git log --oneline --graph --decorate --all

git merge --squash feature-branch
git commit -m "Add Current Round Stats, Overall Round Stats, and Round Results Styling"
git log --oneline --graph --decorate --all
```

#### Pros:

Keeps the commit history concise and easier to read.

#### Cons:

Loses detailed history of individual changes in the squashed commits.

### Cherry-Picking
Cherry-Picking allows you to apply specific commits from one branch to another without merging the entire branch.

Example Use Case: You want to apply a specific bug fix from a feature branch to main without merging all the changes from that branch.

```bash
mkdir cherry-pick-ex
git clone <full-file-path-to-start> cherry-pick-ex
cd .\cherry-pick-ex\

git checkout feature-branch
git log

git checkout main

git cherry-pick <commit-hash>
```

#### Pros:

Flexibility to apply specific commits.

#### Cons:

Can lead to duplicate commits if not managed carefully.
May cause conflicts if the code has diverged significantly.

---

**END OF FILE**



