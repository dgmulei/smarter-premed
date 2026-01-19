# ⚡ Quick Start - Test & Deploy

## Test Locally (2 minutes)

```bash
cd ~/Desktop/smarter-premed
npm run dev
```

Then:
1. Open http://localhost:3000
2. Fill out the 8 questions
3. Click "See My Results"
4. **Try the cohort selector** - Click each of the 5 cohort buttons
5. Watch the radar chart and panels update

---

## Deploy to Vercel (5 minutes)

### Step 1: Push to GitHub

```bash
# Get a GitHub token from: https://github.com/settings/tokens/new
# (Check "repo" scope)

cd ~/Desktop/smarter-premed
git push https://YOUR_TOKEN@github.com/dgmulei/smarter-premed.git main
```

### Step 2: Deploy on Vercel

**Option A: Web UI (Easiest)**
1. Go to https://vercel.com/new
2. Import `dgmulei/smarter-premed`
3. Click "Deploy"
4. Done! You'll get a URL like `https://smarter-premed.vercel.app`

**Option B: CLI**
```bash
npx vercel
```

---

## What to Test

### Landing Page
- ✅ 8 questions all render
- ✅ Form validation works
- ✅ All fields required
- ✅ Submit button shows loading state

### Results Page
- ✅ Loading animation shows
- ✅ Radar chart renders with dual overlays
- ✅ **Click each cohort button:**
  - Clinical-Investigative
  - Patient-Centered
  - Community-Clinical
  - Research-Intensive
  - Mission-Driven
- ✅ Chart updates when cohort changes
- ✅ Right panels update with new cohort data
- ✅ Example schools change per cohort
- ✅ Strategic guidance updates

---

## Expected Output

**Landing Page:**
- Dark gradient background
- Large serif "Smarter Pre-Med" header
- 8 questions in glass panels
- Clean, spacious design

**Results Page:**
- "Exploring the Cohorts" narrative section
- 5 cohort selector buttons
- Large radar chart with pink (you) and blue (cohort) overlays
- Legend showing "Pre-Med" and cohort name
- Right side panels:
  - "Your Profile Aligns with [Cohort] Schools"
  - "Why This Cohort is a Strong Fit for You" (with checkmarks)
  - "What [Cohort] Schools Prioritize" (with example schools)
- Bottom section: "Recognizing a Gap" with strategic guidance
- Print and New Assessment buttons

---

## Files Changed

- `components/RadarChart.tsx` - Added dual-overlay support
- `app/results/page.tsx` - Complete rebuild
- `lib/cohortData.ts` - NEW: All cohort archetypes

---

## Next Steps After Deployment

1. ✅ Share Vercel URL with friends/testers
2. ✅ Get feedback on UI
3. ✅ Make any tweaks
4. 🔜 Wire in real AI analysis (Anthropic API)
5. 🔜 Connect your meticulously ordered data
6. 🔜 Deploy updated version with real scoring

---

**Need help?** Check:
- `DEPLOY_NOW.md` - Detailed deployment steps
- `WHATS_NEW.md` - Complete feature breakdown
- `HANDOFF.md` - Original project context
