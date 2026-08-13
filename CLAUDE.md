# Claude Code Instructions

## Publish to Mobile-DS-sandbox

Whenever a component or gallery page is added or changed in this repo, the update must also be published to `~/Projects/Mobile-DS-sandbox` (a persistent local clone of the `Mobile-DS-sandbox` GHE repo) before the task is considered done.

That clone has no shared git history with this repo (or this repo's own GitHub remote) — it's kept in sync by overwriting its working tree from this repo and committing fresh each time, not by sharing commits. Do not try to reconcile the two histories or force-push.

```bash
cd ~/Projects/Mobile-DS-sandbox
git pull --ff-only origin main

rsync -a --delete \
  --exclude='.git' --exclude='node_modules' --exclude='.next' \
  --exclude='*.tsbuildinfo' --exclude='.env*' --exclude='*.local' \
  ~/Projects/compsych-mobile-design-system/ ~/Projects/Mobile-DS-sandbox/

git status --short   # should show exactly the files you just changed here — nothing more
git add -A
git commit -m "<short description of what changed>"
git push origin main
```

If `git status --short` shows unrelated files, stop and figure out why before committing — that usually means this repo has other uncommitted work that isn't ready to publish yet.

If a component here was itself ported from `~/Projects/Compsych-Mobile-Component` (the `@compsych/mobile-ui` React Native library), see that repo's `.claude/skills/sync-design-system-gallery/SKILL.md` for the full port-and-publish workflow.
