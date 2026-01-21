# Positioned - Project Status

**by Smarter Premed**

Last Updated: January 21, 2026 (Rebranding to Positioned)

---

## Product Overview

**Positioned** is a free 10-minute assessment that helps pre-med students understand their strategic positioning and discover which medical school cohorts align with their strengths and goals. Built on the Whitecoat Framework—a research-based classification of 173 AAMC-accredited medical schools.

**Tagline:** See Where You Stand. Focus On What Matters.

---

## Current Production Status

🚀 **Status: LIVE IN PRODUCTION**

**Deployment**: https://smarter-premed.vercel.app/
**Platform**: Vercel (Pro plan)
**Last Deploy**: January 21, 2026

### What's Working
- ✅ Landing page with clear value proposition
- ✅ 30-question questionnaire with free response field
- ✅ Results page with radar chart visualization
- ✅ Five cohort modals with detailed school information
- ✅ Methodology section explaining the framework
- ✅ Responsive design (540px max-width, mobile-optimized)
- ✅ Professional UI with Georgia serif typography

### What's Working (AI Integration)
- ✅ Claude API integration (claude-sonnet-4-5-20250929)
- ✅ Real-time profile analysis with comprehensive prompt
- ✅ Dynamic competency scoring (6 dimensions)
- ✅ Personalized cohort rankings and fit analyses

### What's Not Built Yet
- ❌ Data persistence beyond session
- ❌ User accounts
- ❌ Result sharing functionality
- ❌ Analytics tracking
- ❌ Admin dashboard

---

## Product Architecture

### Pages
1. **Landing Page** (`/app/page.tsx`)
   - Header card with product messaging
   - Questionnaire form (30 questions)
   - Methodology expandable

2. **Results Page** (`/app/results/page.tsx`)
   - Profile summary
   - Radar chart with 6 competencies
   - Ranked cohort list (1-5 with color gradients)
   - Cohort comparison buttons
   - Fit analysis text
   - Cohort modal popups
   - Methodology expandable

### Key Components
- `QuestionnaireForm.tsx` - Main questionnaire with validation
- `RadarChart.tsx` - D3 visualization of user competencies

### Data Structure
- `lib/cohortData.ts` - Cohort definitions and mock profiles
- Session storage for questionnaire responses
- No backend database (yet)

---

## The Whitecoat Framework

**Five Cohort Types:**

1. **Discover (Research-Intensive)** - #0d9488 (teal)
   - Schools: Harvard, Johns Hopkins, Stanford, Yale, etc.
   - Focus: Research powerhouses with high NIH funding

2. **Translate (Clinical-Investigative)** - #0891b2 (cyan-teal)
   - Schools: UCSF, Columbia, Duke, Northwestern, etc.
   - Focus: Bridge builders between bench and bedside

3. **Bedside (Patient-Centered)** - #6b7280 (cool gray)
   - Schools: UChicago Pritzker, UVA, Case Western, etc.
   - Focus: Master communicators and empathetic caregivers

4. **Community (Community-Clinical)** - #78716c (warm gray)
   - Schools: UWashington, UNC, UPittsburgh, UC Davis, etc.
   - Focus: Community health champions

5. **Mission (Mission-Driven)** - #a8a29e (light warm gray)
   - Schools: Howard, Morehouse, UNM, VCU, etc.
   - Focus: Health equity warriors

**Six Competency Dimensions:**
1. Academic Rigor
2. Clinical Exposure
3. Research Activities
4. Leadership & Service
5. Clinical & Lab Skills
6. Specialty Focus

---

## Technical Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Charts:** D3.js
- **AI:** Claude API (Anthropic) - claude-sonnet-4-5-20250929
- **Deployment:** Not yet deployed
- **Analytics:** None yet

---

## File Organization

```
smarter-premed/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── results/page.tsx         # Results page
│   ├── globals.css              # Global styles
│   └── api/
│       └── analyze/route.ts     # Claude API integration
├── components/
│   ├── QuestionnaireForm.tsx    # Main questionnaire
│   └── RadarChart.tsx           # D3 radar chart
├── lib/
│   └── cohortData.ts            # Cohort definitions and mock data
├── docs/
│   ├── DAY-THREE-REVISION-PLAN.md  # Completed Day 3 tasks
│   ├── DAY-FOUR-PLAN.md            # Next steps
│   ├── COHORT_FRAMEWORK.md         # Framework documentation
│   ├── QUESTIONNAIRE.md            # Question design
│   ├── API_DESIGN.md               # API architecture
│   └── CHANGELOG.md                # Version history
│   └── archives/                   # Old documentation
├── Documentation-Archive/       # Historical docs (pre-cleanup)
├── README.md                    # Project overview
├── ARCHITECTURE.md              # System architecture
├── DEVELOPMENT.md               # Dev setup guide
└── PROJECT-STATUS.md            # This file
```

---

## Day Three Accomplishments

### UX Refinements
- ✅ Put landing page header in card with generous padding
- ✅ Added "Questionnaire" header with instructions
- ✅ Rebranded from "Whitecoat Profile" to "Positioned" (interim name: Fitfinder)
- ✅ Updated tagline to "See Where You Stand. Focus On What Matters."
- ✅ Restructured feature bullets (personal profile, 6 competencies, 5 school types)

### Results Page Improvements
- ✅ Finalized cohort modal content with archetypes and superpowers
- ✅ Fixed modal padding issues (inline styles bypass Tailwind conflicts)
- ✅ Removed colons from section headers
- ✅ Changed "The Type" section formatting
- ✅ Added "Back to Questionnaire" button with arrow icon
- ✅ Removed footer text from landing page

### Methodology Section
- ✅ Added expandable methodology tab (bottom-right pull tab)
- ✅ Added to both landing and results pages
- ✅ Finalized methodology text (173 schools, MSAR data, validation approach)
- ✅ Styled as smaller italic text in single paragraph

### Content Polish
- ✅ Updated all cohort descriptions to be more vivid and punchy
- ✅ Refined doctor archetypes with "Think:" pattern
- ✅ Added superpower language for each cohort
- ✅ Updated school lists for all five cohorts

---

## Known Issues & Technical Debt

### High Priority
1. **Error handling** - Basic error handling exists, could be more robust
2. **Loading states** - Loading spinner exists, could add progress indicators

### Medium Priority
1. **No data persistence** - Refresh loses all progress
2. **No analytics** - Can't track user behavior or completion rates
3. **No result sharing** - Can't share results with others
4. **Limited validation** - Form validation is basic

### Low Priority
1. **No keyboard navigation** - Accessibility could be better
2. **No progress indicator** - Users don't know how far through questionnaire
3. **No FAQ section** - Users might have questions
4. **No testimonials** - Could boost credibility

---

## Day Four Accomplishments

**Primary Goal:** ✅ Integrate Claude API for real, personalized results

1. ✅ Set up API route (`/app/api/analyze/route.ts`)
2. ✅ Design comprehensive 400-line prompt with full Whitecoat Framework
3. ✅ Connect results page to API
4. ✅ Add loading states and error handling
5. ✅ Test with real user profiles

---

## Day Five Accomplishments

**Primary Goal:** ✅ Production deployment + prompt engineering refinements

### Infrastructure
1. ✅ Deployed to Vercel production (https://smarter-premed.vercel.app/)
2. ✅ Configured environment variables and auto-deploy
3. ✅ Upgraded to Pro plan (60s function timeout)
4. ✅ Added iOS safe area support for iPhone compatibility
5. ✅ Tested full flow on desktop and mobile devices

### Prompt Engineering
1. ✅ Refined profile summary prompt (30 → 80 lines, 75-word limit, 5 examples)
2. ✅ Refined fit analysis prompt (35 → 85 lines, 75-word limit, 6 examples)
3. ✅ Added FINAL REQUIREMENTS CHECK quality gate
4. ✅ Added dynamic date awareness with timeline urgency assessment
5. ✅ Fixed all terminology inconsistencies (friendly names throughout)

### UX/UI Polish
1. ✅ Added 24px teal header bar with iOS safe area support
2. ✅ Changed cards from rounded to square edges (cleaner stacking)
3. ✅ Added branded header card on results page
4. ✅ Shortened loading messages for mobile
5. ✅ Updated application cycle years (2027-2030+)

### Documentation
1. ✅ Created DAY-FIVE-COMPLETE.md
2. ✅ Updated CHANGELOG.md with v1.2.0 entry
3. ✅ Updated PROJECT-STATUS.md (this file)
4. ✅ Prepared documentation for focused prompt engineering work

---

## Next Steps (v1.2 - Prompt Engineering Focus)

**Phase:** Refinement and iteration based on real user feedback

1. **Monitor prompt quality** - Review actual AI-generated analyses
2. **Test with diverse profiles** - Edge cases, non-traditional students
3. **Word count compliance** - Verify 75-word limits being respected
4. **Benchmark accuracy** - Ensure numbers cited match framework
5. **Tone consistency** - Profile summary = observational, Fit analysis = analytical

**Future enhancements (v1.3+):**
1. Result sharing (URL-based)
2. Vercel Analytics integration
3. Meta tags and OG images
4. User feedback collection
5. Performance optimizations (streaming, caching)

---

## Dependencies

```json
{
  "next": "^15.x",
  "react": "^19.x",
  "typescript": "^5.x",
  "tailwindcss": "^3.x",
  "d3": "^7.x",
  "@anthropic-ai/sdk": "^0.x" (to be added)
}
```

---

## Environment Variables Required

```
ANTHROPIC_API_KEY=sk-ant-...
```

---

## Questions for Day Four Kickoff

1. **AI Prompt Strategy:** Should we use a single comprehensive prompt or break into multiple API calls?
2. **Data Model:** Do we want to store results server-side, or keep everything client-side?
3. **Sharing:** Should we build result sharing on Day Four, or defer to later?
4. **Analytics:** What metrics matter most (completion rate, cohort distribution, time-to-complete)?
5. **Error UX:** How should we handle API failures gracefully?

---

## Contact & Resources

- **Whitecoat Framework:** See `docs/COHORT_FRAMEWORK.md`
- **API Design:** See `docs/API_DESIGN.md`
- **Questionnaire Design:** See `docs/QUESTIONNAIRE.md`
- **Changelog:** See `docs/CHANGELOG.md`
