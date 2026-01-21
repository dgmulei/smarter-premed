# Vercel Deployment Guide - Fitfinder

**Status:** Ready to deploy ✅

This guide will walk you through deploying Fitfinder to Vercel in under 10 minutes.

---

## Prerequisites

- GitHub account (you already have: dgmulei/smarter-premed)
- Vercel account (free tier is sufficient)
- Anthropic API key (you have this in `.env.local`)

---

## Step 1: Commit Changes to GitHub

**Note:** There are some staged changes that need to be committed. Run these commands in your terminal:

```bash
cd /path/to/smarter-premed

# Remove the git lock file if it exists
rm -f .git/index.lock

# Commit the staged changes
git commit -m "Day Five: Prepare for production deployment

- Updated documentation (PROJECT-STATUS.md, DAY-FIVE-PLAN.md)
- Completed AI integration with Claude API
- Added test profiles for validation
- Organized documentation into archives folder
- Ready for Vercel deployment

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# Push to GitHub
git push origin main
```

---

## Step 2: Connect GitHub to Vercel

1. **Go to Vercel:** https://vercel.com
2. **Sign up/Log in** with your GitHub account (dgmulei@gmail.com)
3. **Import Project:**
   - Click "Add New" → "Project"
   - Authorize Vercel to access your GitHub repositories
   - Select the `dgmulei/smarter-premed` repository

---

## Step 3: Configure Build Settings

Vercel should auto-detect Next.js. Verify these settings:

- **Framework Preset:** Next.js
- **Root Directory:** `./` (leave as is)
- **Build Command:** `npm run build`
- **Output Directory:** `.next` (auto-detected)
- **Install Command:** `npm install`

---

## Step 4: Add Environment Variables

**CRITICAL:** Before deploying, add your environment variables:

1. In the Vercel import screen, expand "Environment Variables"
2. Add the following variable:

**Variable Name:** `ANTHROPIC_API_KEY`
**Value:** `your-anthropic-api-key-here` (copy from your `.env.local` file)
**Environment:** Select all (Production, Preview, Development)

> ⚠️ **Security:** Never commit API keys to documentation or source code. Always add them directly in the Vercel dashboard.

3. Click "Add" to save the environment variable

---

## Step 5: Deploy

1. Click "Deploy" button
2. Wait for the build to complete (typically 2-3 minutes)
3. Vercel will show you the deployment progress in real-time

---

## Step 6: Test Your Deployment

Once deployed, Vercel will give you a URL like:
- `https://smarter-premed.vercel.app` (or similar)

**Test the full flow:**
1. Visit the URL
2. Fill out the questionnaire (use test data if needed)
3. Submit and wait for results (~20-25 seconds)
4. Verify the results page shows:
   - Profile summary
   - Radar chart with 6 competencies
   - Ranked cohorts (1-5)
   - Fit analyses

---

## Troubleshooting

### Build Fails

**Issue:** TypeScript errors or build errors
**Solution:** Check the build logs in Vercel dashboard. Common fixes:
- Ensure all dependencies are in `package.json`
- Check for TypeScript type errors

### API Route Times Out

**Issue:** `/api/analyze` returns 504 Gateway Timeout
**Solution:**
- Vercel free tier has 10-second function timeout
- Upgrade to Pro ($20/month) for 60-second timeout
- Or optimize the Claude API prompt to be faster

**Current timing:** API takes ~20-25 seconds, so you'll need Vercel Pro for production.

### Environment Variable Not Working

**Issue:** API returns "API key not found"
**Solution:**
- Go to Vercel Dashboard → Settings → Environment Variables
- Verify `ANTHROPIC_API_KEY` is set for "Production"
- Redeploy the project after adding variables

### Mobile Layout Issues

**Issue:** UI looks broken on mobile
**Solution:**
- The app is designed with 540px max-width and should be mobile-friendly
- Test on real devices, not just DevTools
- Check browser console for JavaScript errors

---

## Performance Optimization (Optional)

### Add Custom Domain

1. In Vercel Dashboard → Settings → Domains
2. Add your custom domain (e.g., `fitfinder.smarterpremed.com`)
3. Follow Vercel's DNS configuration instructions

### Enable Vercel Analytics

1. In Vercel Dashboard → Analytics
2. Click "Enable Analytics" (free for 2,500 events/month)
3. Track page views, API calls, and performance metrics

### Optimize API Response Time

If the 20-25 second API response is too slow:

**Option A: Reduce prompt size**
- Edit `/app/api/analyze/route.ts`
- Trim the Whitecoat Framework context
- Keep only essential information

**Option B: Use streaming**
- Implement SSE (Server-Sent Events)
- Show partial results as they arrive
- More complex but better UX

**Option C: Cache results**
- Store common profile patterns
- Serve cached results for similar inputs
- Requires database setup

---

## Important Notes

### Security
- ✅ API key is server-side only (not exposed to browser)
- ✅ `.env.local` is in `.gitignore` (not committed to GitHub)
- ✅ Vercel environment variables are encrypted

### Billing
- Vercel Free: 10-second function timeout (won't work for 20s API calls)
- Vercel Pro: $20/month, 60-second timeout (needed for production)
- Anthropic API: Pay-per-use, ~$0.01 per assessment

### Monitoring
After deployment, monitor:
- Error rates in Vercel dashboard
- API response times
- User completion rates
- Anthropic API usage/costs

---

## Post-Deployment Checklist

After successful deployment:

- [ ] Tested full questionnaire flow
- [ ] Verified AI analysis works
- [ ] Checked mobile responsiveness
- [ ] Shared URL with test users
- [ ] Monitored error logs
- [ ] Documented production URL in README.md

---

## Next Steps (Day Five Phase 2)

Once deployment is working:

1. **Add result sharing** - Let users share results via URL
2. **Implement analytics** - Track user behavior
3. **Add meta tags** - Improve social sharing
4. **Set up monitoring** - Alert on errors/downtime

See `docs/DAY-FIVE-PLAN.md` for full roadmap.

---

## Support

**Vercel Issues:** https://vercel.com/support
**Next.js Docs:** https://nextjs.org/docs/deployment
**Anthropic API:** https://docs.anthropic.com

---

**Last Updated:** January 20, 2026
**Deployment Status:** Ready to deploy
**Estimated Time:** 10 minutes
