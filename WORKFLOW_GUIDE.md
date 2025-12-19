# Development Workflow Guide

## ✅ Your Site is Working! Now What?

## Where to Code

### ✅ Code on Your Mac (Local Machine)

**This is where you do all your development:**
- Edit files in `/Users/jessica-leetingley/Documents/zero-render`
- Use your code editor (VS Code, Cursor, etc.)
- Run `npm run dev` locally to test
- Commit and push changes to GitHub

### ❌ Don't Code on the VPS

**The VPS is only for:**
- Running PostgreSQL database
- Running Redis cache
- Running supporting services
- **NOT for editing your Next.js code**

## Your Development Workflow

### 1. Code Locally (On Your Mac)

```bash
# Navigate to your project
cd /Users/jessica-leetingley/Documents/zero-render

# Make changes to your code
# Edit files in your editor

# Test locally
npm run dev
# Visit http://localhost:3000
```

### 2. Commit and Push

```bash
# Stage changes
git add .

# Commit
git commit -m "Your commit message"

# Push to GitHub
git push
```

### 3. Vercel Auto-Deploys

**Vercel automatically:**
- Detects the push to GitHub
- Builds your Next.js app
- Deploys it to production
- Your site updates automatically!

**No need to do anything on the VPS!**

## What Runs Where

```
┌─────────────────────────────────┐
│  Your Mac (Local Development)   │
│                                  │
│  ✅ Edit code                    │
│  ✅ Run npm run dev              │
│  ✅ Commit & push to GitHub      │
└─────────────────────────────────┘
              │
              │ git push
              ▼
┌─────────────────────────────────┐
│  GitHub                          │
│                                  │
│  ✅ Stores your code             │
│  ✅ Triggers Vercel deploy       │
└─────────────────────────────────┘
              │
              │ auto-deploy
              ▼
┌─────────────────────────────────┐
│  Vercel                          │
│                                  │
│  ✅ Builds Next.js app           │
│  ✅ Hosts your website           │
│  ✅ Connects to VPS services     │
└─────────────────────────────────┘
              │
              │ connects to
              ▼
┌─────────────────────────────────┐
│  Your VPS (74.208.155.182)      │
│                                  │
│  ✅ PostgreSQL database          │
│  ✅ Redis cache                  │
│  ✅ Supporting services          │
│  ❌ NOT for editing code         │
└─────────────────────────────────┘
```

## When to Use the VPS

**Only use the VPS for:**

1. **Database management:**
   ```bash
   ssh root@74.208.155.182
   psql -h localhost -U zerorender_user -d zerorender
   ```

2. **Service management:**
   ```bash
   # Check services
   sudo systemctl status postgresql
   pm2 list
   ```

3. **Setting up new services:**
   - Installing Redis
   - Setting up background jobs
   - Configuring API servers

**NOT for:**
- ❌ Editing your Next.js code
- ❌ Running `npm run dev`
- ❌ Committing changes

## Quick Reference

### Daily Development (On Your Mac)

```bash
# 1. Make changes to code
# 2. Test locally
npm run dev

# 3. Commit and push
git add .
git commit -m "Your changes"
git push

# 4. Wait for Vercel to deploy (automatic)
# 5. Your site updates!
```

### VPS Management (Only When Needed)

```bash
# Connect to VPS
ssh root@74.208.155.182

# Check database
psql -h localhost -U zerorender_user -d zerorender

# Check services
pm2 list
sudo systemctl status postgresql

# Exit when done
exit
```

## Summary

✅ **Code on your Mac** - Edit files, commit, push  
✅ **Vercel handles deployment** - Automatic after git push  
✅ **VPS runs services** - Database, Redis, etc.  
❌ **Don't code on VPS** - It's just for services

**You can leave the VPS alone now!** Just code on your Mac and push to GitHub. Vercel will handle the rest. 🚀

