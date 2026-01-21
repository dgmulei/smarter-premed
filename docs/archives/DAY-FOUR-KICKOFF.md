# Day Four Kickoff - Fitfinder

**Date:** Ready to start
**Goal:** Integrate Claude API for real, personalized results

---

## What We Accomplished on Day Three ✅

### Landing Page
- ✅ Rebranded to "Fitfinder by Smarter Premed"
- ✅ Header in card with generous padding
- ✅ Updated tagline: "See Where You Stand. Focus On What Matters."
- ✅ Added "Questionnaire" header with instructions
- ✅ Added methodology expandable tab (bottom-right pull tab)
- ✅ Restructured feature bullets (personal profile, 6 competencies, 5 school types)

### Results Page
- ✅ Finalized all cohort modal content with archetypes and superpowers
- ✅ Fixed modal padding issues
- ✅ Removed unnecessary colons from headers
- ✅ Added methodology expandable tab
- ✅ Changed "Start Over" to "Back to Questionnaire" with arrow icon
- ✅ Cleaned up footer

### Content & Copy
- ✅ Updated all 5 cohort descriptions
- ✅ Finalized school lists for each cohort
- ✅ Created doctor archetype sections with "Think:" pattern
- ✅ Added superpower language for each cohort
- ✅ Wrote comprehensive methodology text (173 schools, MSAR data)

### Documentation Cleanup
- ✅ Created `PROJECT-STATUS.md` - comprehensive project overview
- ✅ Created `DAY-FOUR-PLAN.md` - detailed roadmap
- ✅ Updated `README.md` - clean project introduction
- ✅ Organized docs into `docs/` and `docs/archives/`
- ✅ Archived old iteration files

---

## Current State

### What's Working
**Frontend:** Fully functional UI/UX
- Landing page with questionnaire
- Results page with radar chart
- Cohort modals with detailed information
- Responsive design (mobile-optimized)
- Professional styling and animations

### What's Mocked
**Backend:** All data is hardcoded
- Profile summaries (template text)
- Cohort fit scores (not calculated)
- Radar chart data (static)
- Fit analyses (generic text)

---

## Day Four Mission

**Transform Fitfinder from a beautiful prototype into a functional AI-powered tool.**

### Primary Objective
Integrate Claude API to generate real, personalized results based on questionnaire responses.

### Success Criteria
- [ ] User submits questionnaire → API processes responses
- [ ] Claude generates personalized profile summary
- [ ] Claude calculates fit scores for all 5 cohorts
- [ ] Claude writes custom fit analysis for top cohort
- [ ] Results page displays real data (not mock)
- [ ] Proper loading states during AI processing
- [ ] Graceful error handling if API fails

---

## Implementation Plan

### Phase 1: API Route Setup (1-2 hours)
**File:** `/app/api/analyze/route.ts`

**Tasks:**
1. Create API route that accepts questionnaire responses
2. Set up Anthropic SDK
3. Validate environment variables
4. Add error handling
5. Test with simple prompt

**Expected Output:**
```typescript
POST /api/analyze
Body: { responses: Record<string, string> }
Response: {
  profileSummary: string,
  userScores: { academic_rigor: number, ... },
  rankedCohorts: [
    { name: string, fitScore: number, fitAnalysis: string }
  ]
}
```

---

### Phase 2: Prompt Engineering (2-3 hours)
**Goal:** Design prompts that generate accurate, helpful results

**Key Prompts to Design:**

1. **Profile Summary Prompt**
   - Input: 30 questionnaire responses
   - Output: 2-3 sentence summary of student's strengths
   - Tone: Supportive, specific, actionable

2. **Competency Scoring Prompt**
   - Input: Questionnaire responses
   - Output: Scores 1-10 for each of 6 competencies
   - Logic: Based on response patterns

3. **Cohort Fit Analysis Prompt**
   - Input: User profile + cohort definition
   - Output: Personalized fit score (1-100) + analysis paragraph
   - Tone: Honest assessment with actionable guidance

**Testing Strategy:**
- Create 3-5 test profiles with different characteristics
- Run each through prompts
- Validate output quality and consistency

---

### Phase 3: Frontend Integration (1-2 hours)
**File:** `/app/results/page.tsx`

**Tasks:**
1. Add API call on component mount
2. Add loading state while AI processes
3. Replace mock data with API response
4. Handle errors gracefully
5. Add retry logic

**UX Enhancements:**
- Loading spinner with message: "Analyzing your profile..."
- Progress indicator if possible
- Error state: "Something went wrong. Please try again."

---

### Phase 4: Testing & Refinement (1-2 hours)

**Test Cases:**
1. **High-achieving research student** (should rank Discover #1)
2. **Service-oriented student** (should rank Community or Mission #1)
3. **Balanced student** (should get nuanced ranking)
4. **Student with gaps** (should get constructive guidance)
5. **International/non-traditional** (should get relevant advice)

**What to Validate:**
- Profile summaries are specific and accurate
- Cohort rankings make sense
- Fit analyses are helpful and actionable
- No hallucinations about schools or stats
- Consistent tone across responses

---

## Technical Considerations

### Rate Limiting
- Claude API has rate limits
- Consider caching results (if same responses)
- Add delay between retries

### Error Handling
- API key invalid
- Rate limit exceeded
- Network timeout
- Malformed responses
- Partial failures

### Data Validation
- Ensure all 30 questions answered
- Validate response format
- Sanitize inputs before sending to API

### Performance
- API calls can take 5-15 seconds
- Need good loading UX
- Consider streaming responses (future)

---

## File Checklist

**Before Starting:**
- [ ] Review `/lib/cohortData.ts` - understand data structure
- [ ] Review `/app/results/page.tsx` - understand mock data usage
- [ ] Check `.env.local` - ensure API key is set
- [ ] Review `docs/COHORT_FRAMEWORK.md` - understand framework for prompts

**To Create:**
- [ ] `/app/api/analyze/route.ts` - Main API endpoint
- [ ] `/lib/prompts.ts` - Centralize prompt templates (optional)
- [ ] `/lib/anthropic.ts` - Claude SDK wrapper (optional)

**To Modify:**
- [ ] `/app/results/page.tsx` - Replace mock data with API calls
- [ ] `/package.json` - Add @anthropic-ai/sdk dependency

---

## Environment Setup

```bash
# Install Anthropic SDK
npm install @anthropic-ai/sdk

# Verify API key in .env.local
cat .env.local | grep ANTHROPIC_API_KEY

# Test API key (create simple test script)
node scripts/test-api.js
```

---

## Prompt Template Starters

### Profile Summary Template
```
You are analyzing a pre-med student's profile based on their questionnaire responses.

Student Responses:
{responses}

Generate a 2-3 sentence profile summary that:
1. Highlights their key strengths
2. Identifies their primary interests (research, clinical, service, etc.)
3. Is specific and actionable

Keep it supportive but honest. Use professional but warm tone.
```

### Cohort Fit Scoring Template
```
Based on this student's profile:
{profile}

Rate their fit for the following medical school cohort on a scale of 1-100:

Cohort: {cohortName}
Focus: {cohortDescription}
Schools: {exampleSchools}

Consider:
- Alignment of student's activities with cohort priorities
- Competitiveness of stats for this cohort
- Likelihood of admission success
- Long-term career fit

Return ONLY a number between 1-100.
```

---

## Common Pitfalls to Avoid

1. **Over-relying on single prompt** - Break into multiple focused prompts
2. **Not validating outputs** - Always parse and validate AI responses
3. **Ignoring edge cases** - Test with unusual/incomplete profiles
4. **Poor error messages** - Users should know what went wrong
5. **Slow UX** - Loading states are critical for 5-15s wait times
6. **Hallucinations** - Constrain prompts to prevent made-up schools/stats
7. **Inconsistent scoring** - Same inputs should produce similar outputs

---

## Resources

### Documentation
- `docs/COHORT_FRAMEWORK.md` - Framework details for prompt context
- `docs/API_DESIGN.md` - Original API design (may need updating)
- `TEST_PROFILES.md` - Sample profiles for testing
- `docs/QUESTIONNAIRE.md` - Question design and rationale

### External
- [Anthropic API Docs](https://docs.anthropic.com/)
- [Claude Prompt Engineering Guide](https://docs.anthropic.com/claude/docs/prompt-engineering)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

---

## End-of-Day Four Checklist

Before calling Day Four complete:

- [ ] API route functional and tested
- [ ] All prompts designed and validated
- [ ] Results page uses real API data
- [ ] Loading states implemented
- [ ] Error handling in place
- [ ] At least 3 test profiles run successfully
- [ ] Results feel personalized and accurate
- [ ] No console errors
- [ ] Mobile experience tested
- [ ] Documentation updated (CHANGELOG, PROJECT-STATUS)

---

## Questions to Answer During Development

1. **Single vs. Multiple API Calls:** Should we make one comprehensive API call or break into multiple?
2. **Streaming:** Should we stream responses to show progressive loading?
3. **Caching:** Should we cache results to save API costs?
4. **User Tracking:** Do we want to track completion rates or other metrics?
5. **Result Persistence:** Should results be saved server-side for sharing later?

---

## Let's Go! 🚀

Day Three built a beautiful, polished UI. Day Four brings it to life with AI.

**First step:** Review the questionnaire responses structure and design the data transformation for Claude.

See you on the other side of a functional AI-powered med school fitfinder!
