# ⚡ Quick Setup Guide

Get Smarter Pre-Med running with real AI analysis in 3 minutes.

---

## 📋 Prerequisites

- Node.js 18+ installed
- Anthropic API key ([get one here](https://console.anthropic.com/settings/keys))

---

## 🚀 Setup Steps

### 1. Clone & Install

```bash
cd ~/Desktop/smarter-premed
npm install
```

### 2. Configure API Key

Create `.env.local` file:

```bash
touch .env.local
```

Add your Anthropic API key:

```env
ANTHROPIC_API_KEY=sk-ant-api03-your-key-here
```

**Get API Key:** [https://console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys)

### 3. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## ✅ Test It Works

1. Fill out the 8-question questionnaire
2. Click "See My Results"
3. Wait 3-5 seconds for AI analysis
4. See your personalized competency scores and cohort rankings

If you see real scores and personalized fit analyses (not generic text), it's working! 🎉

---

## 🐛 Troubleshooting

### "API configuration error"
- Check that `.env.local` exists in project root
- Verify `ANTHROPIC_API_KEY` is set correctly
- Restart dev server: `Ctrl+C` then `npm run dev`

### "Failed to analyze profile"
- Check your internet connection
- Verify API key is valid (test at [console.anthropic.com](https://console.anthropic.com))
- Check browser console for detailed error messages

### No results showing
- Make sure you filled out all questionnaire fields
- Check that you clicked "See My Results" button
- Check browser console for errors

---

## 🚀 Deploy to Vercel

### Quick Deploy

```bash
# Commit your changes
git add .
git commit -m "Add AI analysis with Anthropic API"
git push origin main

# Vercel auto-deploys from main branch
```

### Add Environment Variable in Vercel

1. Go to [vercel.com](https://vercel.com) → Your Project
2. Settings → Environment Variables
3. Add `ANTHROPIC_API_KEY` = `your-key`
4. Select: Production, Preview, Development
5. Save → Redeploy

---

## 📚 Documentation

- **`DAY_TWO_COMPLETE.md`** - Detailed technical documentation
- **`README_FIRST.md`** - Project overview
- **`DEPLOY_NOW.md`** - Vercel deployment guide
- **`WHATS_NEW.md`** - Day One features

---

## 🎯 What You'll See

### Real AI Analysis Includes:

1. **6 Competency Scores (0-100)**
   - Academic Rigor
   - Clinical Exposure
   - Research Activities
   - Leadership & Service
   - Technical Skills
   - Specialty Preparation

2. **5 Cohorts Ranked by Fit**
   - Clinical-Investigative
   - Research-Intensive
   - Community-Clinical
   - Patient-Centered
   - Mission-Driven

3. **Personalized Fit Analysis** for each cohort
   - Acknowledges your specific strengths
   - References your questionnaire responses
   - Provides 1-2 actionable recommendations

4. **Interactive Radar Chart**
   - Compare your profile vs each cohort archetype
   - Visual representation of fit

---

**That's it! You're ready to use Smarter Pre-Med with real AI analysis.**

Questions? Check the detailed docs or test with different questionnaire inputs to see how the AI adapts.
