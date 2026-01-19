# Development Guide

**For developers working on Smarter Pre-Med.**

This guide covers testing, deployment, contributing guidelines, and common development tasks.

---

## Table of Contents

- [Local Development](#local-development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Common Tasks](#common-tasks)
- [Code Structure](#code-structure)
- [Contributing Guidelines](#contributing-guidelines)
- [Troubleshooting](#troubleshooting)

---

## Local Development

### Prerequisites

```bash
# Check Node.js version (18+ required)
node --version

# Check npm version
npm --version
```

### Initial Setup

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.local.example .env.local

# Add your Anthropic API key to .env.local
ANTHROPIC_API_KEY=sk-ant-api03-YOUR-KEY-HERE
```

### Development Server

```bash
# Start with hot reload
npm run dev

# Start on different port
PORT=3001 npm run dev

# Start with turbopack (faster)
npm run dev --turbo
```

Access at: http://localhost:3000

**Hot Reload**: Changes to `.tsx`, `.ts`, `.css` files trigger automatic reload

---

## Testing

### Manual Testing Flow

#### 1. Test Questionnaire Form

**Navigate to**: http://localhost:3000

**Test scenarios**:

**A. Validation**:
- Try submitting with empty fields → Should show errors
- Fill only some questions → Should highlight missing fields
- Should auto-scroll to first error

**B. Input Types**:
- Select dropdowns: Should allow single selection
- Checkboxes: Should allow multiple selections
- Scale ratings (1-5): Should toggle selection visually

**C. Sample Data**:
Use the test profile from [SETUP.md](SETUP.md#testing-the-full-flow) to verify full flow

#### 2. Test API Integration

**Check network tab** (Browser DevTools):

```javascript
// Request
POST /api/analyze
Content-Type: application/json
Body: { responses: { ... } }

// Expected response (200 OK)
{
  "userScores": {
    "academic_rigor": 75,
    "clinical_exposure": 55,
    ...
  },
  "rankedCohorts": [
    {
      "name": "Clinical-Investigative",
      "fitScore": 82,
      "fitAnalysis": "..."
    },
    ...
  ]
}
```

**Response time**: Should be 8-15 seconds

**Status codes to test**:
- `200`: Successful analysis
- `400`: Invalid request (missing fields)
- `500`: Server error (API key issue, AI failure)

#### 3. Test Results Display

**After successful submission**:

✅ **Radar Chart**:
- Should show 6 axes (0-100 scale)
- Blue filled area shows user scores
- Should be interactive (hover shows values)

✅ **Cohort Selector**:
- 5 cards ranked by fit score (highest first)
- Each card shows cohort name + fit score
- Clicking card updates analysis panel

✅ **Fit Analysis Panel**:
- Should show personalized text (2-3 sentences)
- Should reference student's specific responses
- Should provide actionable recommendations

### Automated Testing (Future)

**Not yet implemented** - Suggested structure:

```bash
# Unit tests
npm test

# E2E tests (Playwright)
npm run test:e2e

# Type checking
npx tsc --noEmit

# Linting
npm run lint
```

**TODO**: Add test files:
- `__tests__/QuestionnaireForm.test.tsx`
- `__tests__/api/analyze.test.ts`
- `e2e/questionnaire-flow.spec.ts`

---

## Deployment

### Vercel (Recommended)

**Automatic deployment from GitHub:**

1. **Connect Repository**:
   ```bash
   # Push to GitHub
   git push origin main
   ```

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js

3. **Add Environment Variables**:
   - Project Settings → Environment Variables
   - Add `ANTHROPIC_API_KEY` = `sk-ant-api03-...`
   - Select: Production, Preview, Development
   - Save

4. **Deploy**:
   - Vercel auto-deploys on every push to `main`
   - Preview deployments on pull requests
   - Production: `your-project.vercel.app`

**Manual deployment**:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Build Verification

```bash
# Test production build locally
npm run build
npm start

# Check for build errors
# Should see output like:
# Route (app)                              Size     First Load JS
# ○ /                                       5.2 kB          92 kB
# ○ /questionnaire                          8.1 kB          95 kB
# ○ /results                                7.4 kB          94 kB
```

**Common build issues**:
- TypeScript errors: Fix before deployment
- Missing dependencies: Check `package.json`
- Environment variable references: Ensure `.env.local` variables exist

### Other Platforms

**Netlify**:
```bash
# Build command
npm run build

# Publish directory
.next

# Environment variables
ANTHROPIC_API_KEY=sk-ant-api03-...
```

**AWS Amplify, Railway, Render**: Similar configuration

---

## Common Tasks

### Update Questionnaire

**File**: `/components/QuestionnaireForm.tsx`

**To add a question**:

```typescript
const questions: QuestionConfig[] = [
  // ... existing questions
  {
    id: 'new_question_id',
    label: 'Your new question text?',
    type: 'select', // or 'checkbox' or 'scale'
    options: [
      { value: '', label: 'Select an option' },
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ],
  },
];
```

**Also update**:
1. TypeScript interface in `/app/api/analyze/route.ts`:
   ```typescript
   interface QuestionnaireResponses {
     // ... existing fields
     new_question_id: string;
   }
   ```

2. API prompt in `buildAnalysisPrompt()`:
   ```typescript
   **New Section:**
   - New field: ${responses.new_question_id}
   ```

### Update Cohort Framework

**File**: `/app/api/analyze/route.ts`

**Find**: `buildAnalysisPrompt()` function

**Edit framework text**:
```typescript
### Mission-Driven Cohort

**Quantitative Benchmarks:**
- Typical GPA: 3.50-3.80 (Median: ~3.65)  // ← Update here
- Typical MCAT: 505-512 (Median: ~508.5)  // ← Update here
...
```

**Test changes**:
- Submit test questionnaire
- Verify AI references updated benchmarks in analysis

### Modify AI Scoring Approach

**File**: `/app/api/analyze/route.ts`

**Find**: Scoring principles section in prompt

**Example - Add new principle**:
```typescript
### Scoring Principles:

1. **Weight Recent Experiences More Heavily**
2. **Growth Trajectory Thinking**
3. **Time Horizon Adjustment**
4. **Holistic Context**
5. **Cohort-Specific Lens**
6. **NEW PRINCIPLE** ← Add here with explanation
```

**Be careful**: Changes to scoring logic affect consistency across analyses

### Change AI Model

**File**: `/app/api/analyze/route.ts`

**Find**:
```typescript
const message = await anthropic.messages.create({
  model: 'claude-sonnet-4.5-20250929',  // ← Change here
  max_tokens: 8192,
  temperature: 0.7,
```

**Options**:
- `claude-haiku-4-5-20251001`: Faster, cheaper, less nuanced
- `claude-sonnet-4-5-20250929`: Current (balanced)
- `claude-opus-4-5-20251101`: Slower, expensive, more nuanced

**Test thoroughly** if changing - different models may interpret prompts differently

### Add New Cohort (Advanced)

**Steps**:

1. **Update framework** in `buildAnalysisPrompt()`:
   ```typescript
   ### New-Cohort-Name

   **Institutional Priorities:**
   ...

   **Quantitative Benchmarks:**
   ...

   **Example Schools:**
   ...
   ```

2. **Update expected cohorts** in validation:
   ```typescript
   if (analysisData.cohort_rankings.length !== 6) {  // ← Change from 5 to 6
     throw new Error('Invalid analysis structure');
   }
   ```

3. **Update results page** (`/app/results/page.tsx`):
   - Ensure cohort selector handles 6 cards
   - Add cohort description to UI

4. **Update documentation**:
   - README.md
   - ARCHITECTURE.md
   - docs/COHORT_FRAMEWORK.md

---

## Code Structure

### App Router Structure

```
app/
├── page.tsx                          # Landing page (/)
├── questionnaire/
│   └── page.tsx                      # Questionnaire form (/questionnaire)
├── results/
│   └── page.tsx                      # Results dashboard (/results)
├── api/
│   └── analyze/
│       └── route.ts                  # POST /api/analyze endpoint
├── layout.tsx                        # Root layout
└── globals.css                       # Global styles
```

### Component Organization

```
components/
├── QuestionnaireForm.tsx             # 30-question form (630 lines)
├── RadarChart.tsx                    # Chart.js wrapper for radar visualization
├── CohortCard.tsx                    # Individual cohort card in results
└── [future components]
```

**Naming conventions**:
- Components: PascalCase (`QuestionnaireForm.tsx`)
- Utilities: camelCase (`buildPrompt.ts`)
- Types: PascalCase (`QuestionnaireResponses`)

### TypeScript Interfaces

**Key interfaces**:

```typescript
// Questionnaire responses (30 fields)
interface QuestionnaireResponses {
  research_hours_total: string;
  // ... 29 more fields
}

// API response
interface AnalysisResult {
  userScores: CompetencyScores;
  rankedCohorts: CohortRanking[];
}

// Competency scores
interface CompetencyScores {
  academic_rigor: number;
  clinical_exposure: number;
  research_activities: number;
  leadership_service: number;
  technical_skills: number;
  specialty_preparation: number;
}

// Cohort ranking
interface CohortRanking {
  name: string;
  fitScore: number;
  fitAnalysis: string;
}
```

**Location**: Defined in `/app/api/analyze/route.ts`

**Shared types**: Consider moving to `/types/index.ts` if used across multiple files

---

## Contributing Guidelines

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes
# ... edit files ...

# Commit with descriptive message
git add .
git commit -m "Add: new cohort analysis feature"

# Push to GitHub
git push origin feature/your-feature-name

# Create Pull Request on GitHub
```

### Commit Message Convention

**Format**: `<type>: <description>`

**Types**:
- `Add`: New feature or file
- `Fix`: Bug fix
- `Update`: Modify existing feature
- `Refactor`: Code restructuring (no functional change)
- `Docs`: Documentation only
- `Style`: Formatting, whitespace
- `Test`: Add or update tests

**Examples**:
```
Add: transcript upload feature
Fix: questionnaire validation error on checkbox fields
Update: cohort framework with 2025 MSAR data
Docs: add API architecture diagram
```

### Code Style

**TypeScript**:
- Use interfaces over types for object shapes
- Prefer `const` over `let`
- Use async/await over .then()

**React**:
- Functional components only
- Use hooks (useState, useEffect)
- Avoid inline styles (use Tailwind classes)

**Formatting**:
```bash
# Prettier (if configured)
npm run format

# ESLint
npm run lint
```

### Pull Request Checklist

Before submitting:

- [ ] Code builds without errors (`npm run build`)
- [ ] All TypeScript types resolve (`npx tsc --noEmit`)
- [ ] Tested locally with real data
- [ ] Updated documentation if needed
- [ ] No console.log() statements left in
- [ ] Environment variables documented if new ones added

---

## Troubleshooting

### Development Issues

#### Issue: Changes not reflecting in browser

**Cause**: Hot reload failed

**Fix**:
```bash
# Hard refresh
Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

# Restart dev server
Ctrl+C
npm run dev
```

#### Issue: "Module not found" after git pull

**Cause**: New dependencies added

**Fix**:
```bash
npm install
```

#### Issue: TypeScript errors in IDE but builds fine

**Cause**: IDE using different TypeScript version

**Fix**:
```bash
# In VS Code, select correct TypeScript version:
# Cmd+Shift+P → "TypeScript: Select TypeScript Version" → "Use Workspace Version"
```

### API Issues

#### Issue: "API configuration error" in production

**Cause**: Environment variable not set

**Fix**:
1. Check Vercel dashboard → Settings → Environment Variables
2. Ensure `ANTHROPIC_API_KEY` exists for Production
3. Redeploy after adding

#### Issue: AI returns incomplete or malformed JSON

**Cause**: Prompt too complex or max_tokens too low

**Fix**:
```typescript
// Increase max_tokens in route.ts
max_tokens: 8192,  // ← Try increasing to 10000

// Or simplify prompt (reduce framework detail)
```

#### Issue: Slow API responses (>30 seconds)

**Possible causes**:
1. **Cold start**: First request may be slower
2. **Model overload**: Anthropic API experiencing high load
3. **Token limit**: Increase max_tokens if response is cut off

**Fix**:
- Retry analysis
- Check [status.anthropic.com](https://status.anthropic.com)
- Consider switching to Haiku for faster responses (less nuanced)

### Build/Deploy Issues

#### Issue: Build fails with "Type error"

**Cause**: TypeScript type mismatch

**Fix**:
```bash
# Check specific error
npm run build

# Common fix: ensure all interfaces match
# Check QuestionnaireResponses matches form fields
```

#### Issue: Deployment succeeds but site shows 500 error

**Cause**: Missing environment variable

**Fix**:
1. Check Vercel logs: Dashboard → Deployments → View Function Logs
2. Look for "ANTHROPIC_API_KEY is not set"
3. Add variable and redeploy

#### Issue: CSS not loading correctly in production

**Cause**: Tailwind purge removed classes

**Fix**:
```javascript
// In tailwind.config.js, ensure content paths include all files:
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  ...
}
```

---

## Performance Optimization

### Current Metrics

- **Page Load**: ~1-2 seconds
- **API Response**: 8-15 seconds
- **Bundle Size**: ~95KB First Load JS

### Potential Optimizations

1. **Client-side caching**:
   ```typescript
   // Cache questionnaire responses in localStorage
   localStorage.setItem('questionnaire', JSON.stringify(formData));
   ```

2. **API response caching**:
   ```typescript
   // If same responses → return cached result
   const cacheKey = hash(responses);
   if (cache.has(cacheKey)) {
     return cache.get(cacheKey);
   }
   ```

3. **Code splitting**:
   ```typescript
   // Lazy load Chart.js only on results page
   const RadarChart = dynamic(() => import('@/components/RadarChart'));
   ```

4. **Image optimization**:
   ```typescript
   // Use Next.js Image component
   import Image from 'next/image';
   <Image src="/hero.jpg" width={600} height={400} />
   ```

---

## Monitoring & Analytics

### Logging

**Current**: Console.log in API route

**Consider adding**:
- Structured logging (Winston, Pino)
- Error tracking (Sentry)
- Analytics (Vercel Analytics, Posthog)

**Example**:
```typescript
// In route.ts
import * as Sentry from "@sentry/nextjs";

try {
  // ... analysis logic
} catch (error) {
  Sentry.captureException(error);
  console.error('Analysis error:', error);
}
```

### Metrics to Track

**User flow**:
- Questionnaire completion rate
- Average time to complete
- Most common cohort results
- API response time distribution

**Errors**:
- API failure rate
- Invalid JSON responses
- Timeout frequency

---

## Related Documentation

- **[README.md](README.md)** - Project overview
- **[SETUP.md](SETUP.md)** - Getting started
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System design
- **[docs/](docs/)** - Reference documentation

---

## Getting Help

**Issues?**
1. Check [Troubleshooting](#troubleshooting) section
2. Review [ARCHITECTURE.md](ARCHITECTURE.md) for system understanding
3. Search GitHub issues (if repository public)
4. Email: dgmulei@gmail.com

---

**Happy coding!** 🚀
