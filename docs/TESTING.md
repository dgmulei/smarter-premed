# Testing Tools for Prompt Engineering

Quick reference for testing AI prompts with different student profiles.

---

## 🎯 Recommended Workflow: `test-and-save.js`

**Perfect for Claude Desktop collaboration** - Saves complete input/output to files that Desktop can read.

```bash
# Terminal 1: Start dev server (if not running)
npm run dev

# Terminal 2: Run test (Claude Code triggers this)
node test-and-save.js research
```

**Files created in `/test-results/`:**
- `latest-input.json` - Questionnaire responses (what went in)
- `latest-output.txt` - Formatted analysis with word counts & violations
- `latest-raw.json` - Raw API response
- `{profile}-{timestamp}.txt` - Archived for history

**Desktop can then:**
1. Read `test-results/latest-output.txt`
2. See word count violations highlighted with ⚠️
3. See competency scores (radar chart data)
4. Compare against PROMPT-ENGINEERING.md standards
5. Suggest prompt improvements

---

## Alternative Testing Approaches

### 1. `test-api.js` - Full Stack Testing (Recommended)
Tests the complete Next.js API endpoint with production environment.

**When to use:**
- Testing the full production flow
- Verifying API route changes
- Testing with the exact production setup

**Setup:**
```bash
# Start dev server in one terminal
npm run dev

# Run test in another terminal
node test-api.js research    # Research-heavy profile
node test-api.js service     # Service-oriented profile
node test-api.js balanced    # Balanced profile
```

**Output:**
- Profile summary with word count
- All 5 fit analyses with word counts
- Competency scores (6 dimensions)

---

### 2. `test-prompt.js` - Direct API Testing (Faster)
Calls Anthropic API directly, bypassing Next.js for rapid iteration.

**When to use:**
- Quick prompt iteration
- Testing prompt changes without restarting server
- Faster feedback loop

**Setup:**
```bash
# No server needed - calls API directly
node test-prompt.js research    # Research-heavy profile
node test-prompt.js service     # Service-oriented profile
node test-prompt.js balanced    # Balanced profile
```

**Output:**
- Profile summary with word count
- All 5 fit analyses with word counts
- Competency scores (6 dimensions)

---

## Test Profiles

### Research Profile
- **Research:** 800-1,200 hours, publications
- **Clinical:** 100-300 hours (limited)
- **Academic:** GPA 3.7-3.89, MCAT 515-519
- **Expected fit:** Discover schools (primary gap = clinical hours)

### Service Profile
- **Research:** 50-200 hours (limited)
- **Clinical:** 500-1,000 hours in community settings
- **Academic:** GPA 3.5-3.69, MCAT 508-511
- **Expected fit:** Community/Mission schools (primary gap = research)

### Balanced Profile
- **Research:** 200-500 hours
- **Clinical:** 300-500 hours
- **Academic:** GPA 3.7-3.89, MCAT 512-514
- **Expected fit:** Translate/Bedside schools (moderate across all)

---

## What to Monitor

### Word Count Compliance
**Target:** 65-72 words per section (absolute max 75)

**Check:**
```bash
# Both scripts show word counts automatically
node test-api.js research
```

Look for:
- Profile summary: ≤75 words ✅
- Each fit analysis: ≤75 words ✅

### Terminology Consistency
**Required:** Friendly names (Discover, Translate, Bedside, Community, Mission)
**Forbidden:** Technical names (Research-Intensive, Clinical-Investigative, etc.)

**Check output for:**
- ✅ "Discover schools expect..."
- ❌ "Research-Intensive cohort..."

### Tone Validation
**Profile Summary:** Pure observation (no advice)
**Fit Analysis:** Strategic advice with rationale

**Forbidden in Profile Summary:**
- "focus on," "build," "strengthen," "you should"

### Specificity Checks
**Fit Analysis Must Include:**
- ✅ Student numbers cited
- ✅ Benchmark ranges compared ("below 400-600")
- ✅ ONE gap identified (not multiple)
- ✅ Specific TYPE of experience ("EMT certification")
- ✅ WHY explained for school type

---

## Iteration Workflow

1. **Baseline Test** - Run all 3 profiles with current prompt
   ```bash
   node test-prompt.js research > results-before.txt
   node test-prompt.js service >> results-before.txt
   node test-prompt.js balanced >> results-before.txt
   ```

2. **Edit Prompt** - Modify `/app/api/analyze/route.ts`
   - For `test-prompt.js`: Also update prompt in that file (lines 112-599)

3. **Test Changes** - Run same profiles again
   ```bash
   node test-prompt.js research > results-after.txt
   node test-prompt.js service >> results-after.txt
   node test-prompt.js balanced >> results-after.txt
   ```

4. **Compare** - Check improvements
   - Word counts: All ≤75? ✅
   - Terminology: Friendly names used? ✅
   - Tone: Profile = observational? ✅
   - Specificity: Benchmarks cited? ✅

5. **Deploy** - If improved, commit changes

---

## Common Issues

### Issue: Word counts exceed 75
**Solution:** Strengthen enforcement language in prompt
- Change "max 75" → "ABSOLUTE LIMIT: 75 words. If over, you have FAILED."
- Add more deletion emphasis
- Provide more 65-72 word examples

### Issue: Generic advice
**Solution:** Add more specific examples
- Show bad: "get more hours"
- Show good: "EMT certification in community setting"
- Expand FORBIDDEN ELEMENTS list

### Issue: Technical cohort names
**Solution:** Reinforce terminology section
- Add more ✅/❌ examples
- Move CRITICAL: USER-FACING TERMINOLOGY higher in prompt
- Add to FINAL REQUIREMENTS CHECK

---

## Files

- `/test-api.js` - Full stack API testing
- `/test-prompt.js` - Direct Anthropic API testing
- `/scripts/test-api.js` - Older version (root version preferred)
- `/app/api/analyze/route.ts` - Production prompt (lines ~75-650)

---

**See also:**
- `docs/PROMPT-ENGINEERING.md` - Comprehensive prompt engineering guide
- `TEST_PROFILES.md` - Detailed test profile specifications
- `docs/DAY-FIVE-COMPLETE.md` - Recent prompt refinements

---

**Last Updated:** January 21, 2026
**Status:** Ready for focused prompt iteration work
