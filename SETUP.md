# Setup Guide

Get Smarter Pre-Med running locally with real AI analysis in **3 minutes**.

---

## Prerequisites

- **Node.js 18+** ([Download](https://nodejs.org/))
- **Anthropic API Key** ([Get one here](https://console.anthropic.com/settings/keys))

---

## Installation Steps

### 1. Clone & Install Dependencies

```bash
# Navigate to project directory
cd smarter-premed

# Install dependencies
npm install
```

**Expected time**: ~1 minute

### 2. Configure API Key

Create environment file from template:

```bash
cp .env.local.example .env.local
```

Open `.env.local` and add your Anthropic API key:

```env
ANTHROPIC_API_KEY=sk-ant-api03-YOUR-ACTUAL-KEY-HERE
```

**Where to get API key**:
1. Visit [https://console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys)
2. Sign in or create account
3. Click "Create Key"
4. Copy the key (starts with `sk-ant-api03-`)
5. Paste into `.env.local`

**⚠️ Important**: Never commit `.env.local` to git. It's already in `.gitignore`.

### 3. Run Development Server

```bash
npm run dev
```

The app will start at **http://localhost:3000**

**Expected startup time**: ~5 seconds

---

## Verify Installation

1. **Navigate to**: http://localhost:3000
2. **Fill out questionnaire**: Answer all 30 questions
3. **Click "See My Results"**
4. **Wait 8-15 seconds** for AI analysis
5. **View results**: You should see:
   - Radar chart with 6 competency scores
   - 5 cohort cards ranked by fit score
   - Personalized analyses for each cohort

**If this works, you're all set! ✅**

---

## Troubleshooting

### Issue: "API configuration error"

**Cause**: Missing or invalid `ANTHROPIC_API_KEY`

**Fix**:
```bash
# Check if .env.local exists
ls -la .env.local

# Verify it contains your key
cat .env.local

# Make sure key starts with: sk-ant-api03-
```

If file doesn't exist, run `cp .env.local.example .env.local` and add your key.

### Issue: "Module not found" errors

**Cause**: Dependencies not installed

**Fix**:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Port 3000 already in use

**Cause**: Another app is using port 3000

**Fix**:
```bash
# Use a different port
PORT=3001 npm run dev

# Or kill the process using port 3000
lsof -ti:3000 | xargs kill
```

### Issue: Slow API responses (>30 seconds)

**Cause**: Normal for first request (cold start) or network issues

**Fix**:
- First analysis may take longer—try again
- Check internet connection
- Verify API key is valid at [console.anthropic.com](https://console.anthropic.com)

### Issue: Invalid JSON response from AI

**Cause**: Rare AI parsing error

**Fix**:
- Retry the submission
- If persistent, check that `/app/api/analyze/route.ts` hasn't been modified

---

## Development Commands

```bash
# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run type checking
npx tsc --noEmit

# Lint code
npm run lint
```

---

## Project Structure

```
smarter-premed/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── questionnaire/
│   │   └── page.tsx                # 30-question form
│   ├── results/
│   │   └── page.tsx                # Results dashboard
│   └── api/
│       └── analyze/
│           └── route.ts            # AI analysis endpoint
├── components/
│   ├── QuestionnaireForm.tsx       # 30-question form component
│   ├── RadarChart.tsx              # Competency visualization
│   └── CohortCard.tsx              # Cohort fit card
├── public/                          # Static assets
├── .env.local                       # API keys (not in git)
├── .env.local.example               # Template for API keys
└── [documentation files]
```

---

## Environment Variables

Only one environment variable is required:

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key | ✅ Yes | `sk-ant-api03-...` |

**For production deployment** (Vercel, etc.):
Add this variable in your hosting platform's environment settings.

---

## Testing the Full Flow

### Sample Test Data

For quick testing, use this profile:

**Research (Q1-5)**:
- Total hours: `301-500`
- Weekly: `11-15 hours`
- Types: `Wet Lab`, `Data Analysis`
- Leadership: `None`
- Outputs: `1 output`

**Clinical (Q6-12)**:
- HS hours: `300+`
- College hours: `None yet`
- Settings: `Hospital`, `Community Clinic`
- Interaction: `Extensive (16-30/day)`
- Underserved: `None yet`
- Certification: `Planning within 1 year`
- Weekly: `6-15 hours`

**Academic (Q13-19)**:
- GPA: `3.6-3.8`
- MCAT: `Haven't taken practice test yet`
- Preparedness: `5`
- Improvement: `Science Prerequisites`
- Strengths: `Science foundation`, `Quantitative expertise`
- MCAT confidence: `3`
- GPA confidence: `5`

**Leadership (Q20-23)**:
- Roles: `None yet`
- Service: `Small-scale`
- Weekly hours: `0-1 hour`
- Outcomes: `None yet`

**Vision (Q24-30)**:
- Gaps: `Limited clinical`, `Need more research`
- Focus: `Clinical`, `Research`
- Weakness: `Clinical`
- Contributions: `Patient Care`, `Research`
- Target: `2028`
- Flexibility: `Very flexible`
- History: `None (standard record)`

**Expected Results**:
- Top cohorts: Clinical-Investigative or Research-Intensive
- Recommendations: Build clinical hours, pursue certification
- Academic Rigor: High (75-85)
- Research Activities: Moderate-High (65-75)
- Clinical Exposure: Developing (40-55)

---

## Deploy to Vercel

### Quick Deploy

```bash
# Commit your changes
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Add Environment Variable in Vercel

1. Go to [vercel.com](https://vercel.com) → Your Project
2. Settings → Environment Variables
3. Add `ANTHROPIC_API_KEY` = `your-key`
4. Select: Production, Preview, Development
5. Save → Redeploy

Vercel auto-deploys from your main branch.

---

## Next Steps

Once you've verified the installation:

1. **Read [ARCHITECTURE.md](ARCHITECTURE.md)** - Understand how the system works
2. **Read [DEVELOPMENT.md](DEVELOPMENT.md)** - Learn about testing and deployment
3. **Explore [docs/](docs/)** - Deep dive into questionnaire and framework details

---

## Support

**Issues with setup?**
- Check [Troubleshooting](#troubleshooting) section above
- Review [DEVELOPMENT.md](DEVELOPMENT.md) for common problems
- Email: dgmulei@gmail.com

---

**Ready to analyze pre-med profiles!** 🎉
