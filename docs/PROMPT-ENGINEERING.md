# Prompt Engineering - Positioned AI Analysis

**Purpose:** Central reference for AI prompt design, iteration, and quality control

**Last Updated:** January 21, 2026
**Current Prompt Location:** `/app/api/analyze/route.ts` (lines ~75-650)
**Prompt Length:** ~600 lines

---

## Current Architecture

### Three-Layer Quality Control System

```
Layer 1: Detailed Instructions
   ├─ Profile Summary (~80 lines)
   ├─ Fit Analysis (~85 lines)
   └─ Framework Definition (~300 lines)
          ↓
Layer 2: Section-Specific Self-Checks
   ├─ Profile: 6-point validation
   └─ Fit Analysis: 7-point validation (x5 school types)
          ↓
Layer 3: Final Requirements Check
   └─ 25-line quality gate before JSON generation
          ↓
        OUTPUT
```

---

## Section 1: Profile Summary ("Where You Stand")

**Location:** Lines ~435-551 in route.ts
**Purpose:** Make student feel SEEN and UNDERSTOOD for who they are RIGHT NOW
**Tone:** Observational journalist describing a photograph
**Word Limit:** 75 words ABSOLUTE (target 65-72)

### Current Instruction Components:

1. **ABSOLUTE LIMIT** - Failure language if over 75 words
2. **PURPOSE** - Zero advice-giving, pure recognition
3. **STRUCTURE** - 3-sentence breakdown with word targets
4. **TONE** - Observational journalist, evidence-based recognition
5. **MANDATORY ELEMENTS** - 7 requirements (friendly names, cite numbers, name capabilities, etc.)
6. **FORBIDDEN ELEMENTS** - 5 categories to avoid (advice, gaps, directives, labels, data dumps)
7. **WORD COUNT DISCIPLINE** - "Plan 65-72, DELETE clauses if over 75"
8. **5 EXAMPLES** - Concrete examples (67-74 words) showing different applicant types
9. **WHY THESE WORK** - Explanation of what makes examples effective
10. **SELF-CHECK** - 6 validation questions before finalizing

### Key Design Decisions:

**Why observational vs prescriptive?**
- Profile summary is about recognition ("They SEE me")
- Strategic advice belongs in fit analysis sections
- Builds trust before delivering recommendations

**Why 75-word limit?**
- Forces conciseness and clarity
- Prevents AI from meandering or listing
- Fits cleanly in results page card UI
- Target 65-72 leaves buffer for variation

**Why 5 examples?**
- Covers different applicant archetypes (research-depth, community-service, balanced, translational, mission-driven)
- Shows PATTERN rather than just rules
- Demonstrates word count discipline in practice

### Known Challenges:

1. **Word count creep** - AI tendency to exceed limits
2. **Prescriptive language leakage** - "Focus on," "build," "develop" slipping in
3. **Generic data listing** - Numbers without insight
4. **Capability naming** - Vague vs specific ("strong candidate" vs "translational capability")

### Monitoring Priorities:

- [ ] Word counts consistently ≤75
- [ ] Zero prescriptive language in production outputs
- [ ] Specific numbers cited (hours, GPA ranges, settings)
- [ ] Capabilities named (not just data listed)
- [ ] Timeline mentioned as neutral context (not pressure)

---

## Section 2: Fit Analysis (5 School Types)

**Location:** Lines ~356-426 in route.ts
**Purpose:** Evidence-based gap analysis with conditional guidance
**Tone:** Strategic advisor doing comparative analysis
**Word Limit:** 75 words per school type (target 65-72)

### Current Instruction Components:

1. **ABSOLUTE LIMIT** - 75 words per school type (failure language)
2. **PURPOSE** - "IF you pursue this school type, THEN..."
3. **STRUCTURE** - 3-sentence breakdown (fit + gap + action)
4. **TONE** - Strategic advisor, evidence-based, honest but not harsh
5. **MANDATORY ELEMENTS** - 8 requirements (friendly names, cite numbers, compare to benchmarks, specify TYPE, explain WHY, timeline-aware)
6. **FORBIDDEN ELEMENTS** - 6 categories (generic advice, vague recs, multiple gaps, data without comparison, advice without rationale, technical names)
7. **WORD COUNT DISCIPLINE** - "Plan 65-72, DELETE sentences if over 75"
8. **6 EXAMPLES** - Different scenarios (strong fit with gap, moderate fit, lower fit, timeline-adjusted, strong fit, major MCAT gap)
9. **WHY THESE WORK** - Explanation of effectiveness
10. **SELF-CHECK** - 7 validation questions (for EACH of 5 school types)

### Key Design Decisions:

**Why ONE gap only?**
- Focus creates clarity and actionability
- Multiple gaps overwhelm and dilute message
- Forces prioritization of what matters most

**Why compare to benchmarks explicitly?**
- Shows AI "did the math" against framework
- Builds credibility through specificity
- Helps student understand where they stand objectively

**Why explain school-specific WHY?**
- Prevents generic advice ("more hours")
- Connects recommendation to institutional priorities
- Helps student understand fit vs prestige logic

**Why 75 words per school type?**
- 5 school types × 75 words = 375 words total fit analysis
- Balanced with profile summary (75 words)
- Forces concise, actionable messaging

### Known Challenges:

1. **Generic advice** - "Get more clinical hours" vs "EMT certification in community setting"
2. **Multiple gaps listed** - AI wants to be comprehensive but creates confusion
3. **Comparison omission** - Saying "you have 300 hours" without "vs 400-800 benchmark"
4. **WHY rationale missing** - Advice without explaining school-specific importance
5. **Word count variation** - Some school types get 65 words, others 85

### Monitoring Priorities:

- [ ] All 5 school types ≤75 words each
- [ ] ONE primary gap identified per school type
- [ ] Student numbers compared to benchmark ranges
- [ ] Specific experience TYPE named (not "more hours")
- [ ] WHY explained for each school type
- [ ] Urgency reflects timeline (HIGH/MODERATE/LOW)

---

## Section 3: Final Requirements Check

**Location:** Lines ~462-490 in route.ts
**Purpose:** Last quality gate before JSON generation
**Length:** 25 lines

### Components:

1. **WORD LIMITS** - Profile ≤75, each fit ≤75
2. **DELETION STRATEGY** - "Plan 65-72, DELETE clauses if over 75"
3. **PROFILE SUMMARY MUST** - 4 requirements
4. **FIT ANALYSES MUST** - 4 requirements (all 5 school types)
5. **INVALID RESPONSES** - 4 failure conditions
6. **CLOSING** - "Brevity is mandatory"

### Key Design Decisions:

**Why add this layer?**
- Final reinforcement right before generation
- Complements section checks without redundancy
- Provides "checklist" mental model
- Emphasizes critical requirements one last time

**Why so concise (25 lines)?**
- Must be read and processed (not skipped)
- High signal-to-noise ratio
- References detailed sections without repeating

### Monitoring Priorities:

- [ ] Check if AI outputs show evidence of final review
- [ ] Word counts suggest deletion strategy being used
- [ ] Invalid response types are absent

---

## Section 4: Dynamic Date Awareness

**Location:** Lines ~76-84 (date injection), Lines ~119-136 (urgency assessment)
**Purpose:** Timeline-appropriate advice that stays current
**Implementation:** Date calculated at request time, urgency assessed dynamically

### Current Components:

**Date Injection (JavaScript):**
```typescript
const currentDate = new Date().toISOString().split('T')[0]; // "2026-01-21"
const currentYear = new Date().getFullYear(); // 2026
const currentMonth = new Date().toLocaleString('en-US', { month: 'long' }); // "January"
```

**Urgency Calculation (Prompt):**
- HIGH: target cycle year = current year OR current year + 1
- MODERATE: target cycle year = current year + 2
- LOW: target cycle year ≥ current year + 3

**Advice Calibration:**
- HIGH: Immediate, executable, time-bound actions
- MODERATE: Balance quick wins and long-term projects
- LOW: Exploratory work, foundation-building

### Key Design Decisions:

**Why dynamic vs hardcoded?**
- Self-updating as time passes
- No manual maintenance required
- Accurate timeline assessment regardless of when student takes assessment

**Why three-tier urgency?**
- Simple enough to apply consistently
- Meaningful differentiation in advice style
- Avoids complex date math that could error

**Why urgency-based vs month-counting?**
- Reduces hallucination risk (AI bad at date math)
- Clear tiers (HIGH/MODERATE/LOW) easier to reference
- User's target cycle selection provides the signal

### Monitoring Priorities:

- [ ] Advice reflects appropriate urgency for timeline
- [ ] HIGH urgency = concrete, time-bound actions
- [ ] LOW urgency = exploratory, foundation-building
- [ ] Timeline mentioned as neutral context (not pressure)

---

## Quality Metrics

### Word Count Compliance

**Target:**
- Profile summary: 65-72 words (absolute max 75)
- Each fit analysis: 65-72 words (absolute max 75 per school type)

**Monitoring:**
- Sample 10 production outputs
- Count words manually or with script
- Flag any over 75 for prompt adjustment

### Terminology Consistency

**Target:**
- 100% use of friendly names (Discover, Translate, Bedside, Community, Mission)
- 0% use of technical cohort names (Research-Intensive, Clinical-Investigative, etc.)
- "Schools" or "school types" (never "cohorts" or "programs")

**Monitoring:**
- Search outputs for forbidden terms
- Flag violations for prompt reinforcement

### Observational vs Prescriptive (Profile Summary)

**Target:**
- Profile summary: 100% observational (zero advice)
- Fit analysis: Can include recommendations

**Monitoring:**
- Check for forbidden words in profile: "focus on," "build," "develop," "strengthen," "you should," "you need to"
- Flag violations for prompt adjustment

### Specificity (Fit Analysis)

**Target:**
- Student numbers cited: 100%
- Benchmark comparison: 100%
- ONE gap identified: 100%
- Specific experience TYPE named: 100%
- WHY explained: 100%

**Monitoring:**
- Review fit analyses for generic advice
- Flag vague recommendations ("more hours," "gain experience")
- Check that benchmarks are cited ("400-800 hours," "3.70-3.90 GPA")

---

## Iteration Process

### When to Iterate

Iterate when production outputs show:
1. **Word count violations** (>75 words) in >10% of outputs
2. **Terminology violations** (cohorts/programs) in >5% of outputs
3. **Tone violations** (prescriptive language in profile summary) in >5% of outputs
4. **Generic advice** (no TYPE specified) in >20% of fit analyses
5. **Benchmark omission** (no comparison to ranges) in >20% of fit analyses

### How to Iterate

**Small adjustments:**
- Add enforcement language ("CRITICAL," "MANDATORY," "NEVER")
- Add negative examples showing what NOT to do
- Adjust example wording to reinforce pattern

**Medium adjustments:**
- Add new examples covering edge cases
- Expand self-check questions
- Reorder sections for emphasis

**Large adjustments:**
- Restructure prompt architecture
- Change tone framing
- Add new quality control layer

### Testing New Prompts

1. **Baseline** - Test current prompt with 5 diverse profiles
2. **Iterate** - Make prompt changes
3. **Test** - Test new prompt with same 5 profiles
4. **Compare** - Word counts, terminology, tone, specificity
5. **Deploy** - If improvement, push to production
6. **Monitor** - Sample 10 production outputs after 24 hours

---

## Test Profiles

### Profile 1: Research-Heavy
- 1,500 research hours, 3 publications
- 100 clinical hours
- GPA 3.9, MCAT 520
- Target: 2027 cycle

**Expected output:**
- Profile: Observational, cite numbers, "research depth" capability
- Discover fit: Strong fit, gap = clinical hours below 400-600
- Action: Gap year clinical role (EMT or research coordinator)

### Profile 2: Community-Focused
- 800 clinical hours in community health centers
- 150 research hours
- GPA 3.6, MCAT 508
- Target: 2027 cycle

**Expected output:**
- Profile: Observational, cite community hours, "commitment to underserved"
- Community fit: Strong fit, gap = research below 200-500
- Action: Community-based participatory research project

### Profile 3: Balanced Breadth
- 300 research, 400 clinical, 2-3 leadership roles
- GPA 3.5, MCAT pending
- Target: 2029 cycle

**Expected output:**
- Profile: Observational, "breadth across competencies," LOW urgency
- Multiple fits: Moderate across several school types
- Action: Exploratory, foundation-building language

### Profile 4: Major MCAT Gap
- 500 clinical hours in community clinics
- Sustained service leadership
- GPA 3.6, MCAT 502
- Target: 2028 cycle

**Expected output:**
- Profile: Observational, cite clinical hours and service
- Community fit: Strong clinical, but MCAT below 505-511
- Action: MCAT retake as #1 priority

### Profile 5: Non-Traditional
- Community college transfer, GPA 3.5
- 600 hours serving underserved populations
- Leadership in health equity programs
- Target: 2027 cycle

**Expected output:**
- Profile: Observational, acknowledge non-traditional pathway
- Mission fit: Strong fit, mention cultural competency
- Action: Maintain trajectory, possibly add research component

---

## Troubleshooting

### Issue: Word counts consistently exceed 75

**Symptoms:** >20% of outputs over 75 words

**Diagnosis:** Enforcement language insufficient

**Solution:**
1. Strengthen ABSOLUTE LIMIT language
2. Add more emphasis on DELETION (not compression)
3. Move word count check earlier in prompt
4. Add example showing 80-word draft → 70-word final

### Issue: Generic advice in fit analyses

**Symptoms:** "Get more hours," "build leadership," "gain experience"

**Diagnosis:** TYPE specification not emphasized enough

**Solution:**
1. Add more examples with specific TYPES
2. Expand FORBIDDEN ELEMENTS with generic phrases
3. Add self-check question: "Did I name specific TYPE?"
4. Provide list of acceptable TYPE specifications

### Issue: Prescriptive language in profile summary

**Symptoms:** "Focus on," "build," "strengthen," "you should"

**Diagnosis:** Observational tone not reinforced enough

**Solution:**
1. Add more negative examples
2. Strengthen FORBIDDEN ELEMENTS list
3. Change tone framing ("like describing a photograph")
4. Add self-check: "Would student feel judged or seen?"

### Issue: Benchmarks not cited in fit analysis

**Symptoms:** "You have 300 hours" without "vs 400-800 benchmark"

**Diagnosis:** Comparison requirement not emphasized

**Solution:**
1. Add more examples with explicit comparisons
2. Change MANDATORY from "cite benchmarks" to "compare to benchmarks"
3. Add self-check: "Did I cite the X-Y range?"
4. Show bad example: data without comparison

---

## Prompt Version History

### v1.2 (2026-01-21) - Current
- Profile summary: 80 lines, 75-word limit, 5 examples
- Fit analysis: 85 lines, 75-word limit per school type, 6 examples
- Added: Final Requirements Check (25 lines)
- Added: Dynamic date awareness with urgency assessment
- Total length: ~600 lines

### v1.1 (2026-01-20)
- Profile summary: 60 lines, "max 75 words" (soft limit), 2 examples
- Fit analysis: 60 lines, "max 100 words" per school type, 1 example
- No final requirements check
- No dynamic date awareness
- Total length: ~450 lines

### v1.0 (2026-01-19)
- Profile summary: 30 lines, no word limit, no examples
- Fit analysis: 35 lines, no word limit, no examples
- Basic framework definition
- Total length: ~350 lines

---

## Resources

**Current Prompt:** `/app/api/analyze/route.ts` (lines ~75-650)
**Test Profiles:** `/TEST_PROFILES.md`
**Framework Reference:** `/docs/COHORT_FRAMEWORK.md`
**API Design:** `/docs/API_DESIGN.md`

---

## Next Actions

### Immediate (Week 1)
- [ ] Monitor 20 production outputs for quality metrics
- [ ] Document any word count violations
- [ ] Document any terminology violations
- [ ] Create violation report with examples

### Short-term (Week 2-4)
- [ ] Test with 10 diverse profiles (research/clinical/balanced/gaps)
- [ ] Analyze patterns in AI responses
- [ ] Identify systematic issues vs random variations
- [ ] Plan prompt iteration based on findings

### Medium-term (Month 2-3)
- [ ] A/B test prompt variations
- [ ] Collect user feedback on analysis quality
- [ ] Benchmark against human advisor analyses
- [ ] Iterate toward production-grade quality

---

**Document Owner:** David Mulei
**Last Updated:** January 21, 2026
**Status:** Active - Ready for focused iteration
