# Smarter Premed: Day Three Revision Plan

---

## Purpose: Built to Be Viral

**Scoped super-narrowly:**
- One job: Tell premeds their competitive profile and school fit
- No feature creep - just questionnaire → AI analysis → actionable insights

**Immediately useful:**
- Solves real pain point: "Where do I stand? What should I focus on?"
- Takes existing behavior (asking advisors/Reddit/forums) and makes it instant + data-driven
- 10 minutes to personalized results = low friction

**Built to be viral:**
- Shareable insight (radar chart visualization + doctor personality hook)
- Fills gap in premed discourse (fit over prestige)
- Contrarian positioning (antidote to US News hierarchy)
- Free, no barriers to trying and sharing
- Natural conversation starter in 200K+ member r/premed community

**Must look great on mobile:**
- Essential for virality

**Day Three Goal:** Sharpen the storytelling, add educational scaffolding, make the tool more intuitive and shareable.

---

## Priority-Ordered Tasks

---

## 0. Landing Page Message Refinement

**Current issues:**
- "60 seconds" is inaccurate (takes 8-10 min)
- "Few questions" undersells 30 questions
- "Free assessment" may signal low value

**New messaging:**

**Headline:**
- "Where Do You Stand as a Premed?"

**Subhead:**
- "10-minute assessment reveals your competitive profile across 6 core areas—so you know where to focus your energy next."

**Trust signal:**
- "Built from AAMC data and 173 medical school profiles" 
- **Work on this in concert with methodology section - needs refinement**

**Remove:** 
- "in 60 seconds" timeline promise
- "Free Assessment" indicator (possibly)

### The thinking is...

**Parent brand:** Smarter Premed
**Tool name:** TBD (needs sticky, shareable name)
**Display format:** "[Tool Name] by Smarter Premed"

**Why:**
- Allows tool virality while building parent brand
- Students share "I took the [Tool Name]" not vague "Smarter Premed"
- Future-proofs for additional tools under umbrella


---

## 1. Add Free Response Field to Questionnaire

**Location:** End of questionnaire (after Q30, before submit button)

**Field specs:**
- Label: "Say more about yourself"
- Placeholder: "Share anything else about your plans, goals, or circumstances that helps us understand your premed story..."
- Type: Textarea, 500 character limit
- ID: `additional_context`

**Why this matters:** Captures nuance the checkboxes miss. Lets students narrate their own story. Critical for soul-searching aspect.

---

## 2. Fix Questionnaire UX Issues

**Changes:**
- **Number all questions** (Q1, Q2, etc.) and make question text bold
- **Rewrite Q21** ("scale of your service") - current wording is unclear
  - Consider: "What's the reach of your service/volunteer work?"
  - Or: "How many people have your service activities impacted?"
  - **We need to get this right. It's confusing as written.**

---

## 3. Results Page: Add Profile Summary Above Radar Chart

**Location:** Between page header and radar chart

**Content:** 2-3 sentence summary (50 words max) that:
- Names top 2-3 competency strengths, articulates weaknesses
- States best-fit(s) cohort alignment  
- Invites exploration of other types
- Philosophy: The premed is in the driver's seat. Continue to build on strengths, embrace new opportunities to fill in existing gaps, etc. The longer the time horizon to application, the greater the opportunity to expand to cohorts that are currently a lesser fit. The shorter the time horizon to application, the more important to focus on existing top fits. 

---

## 4. Make Dynamic Text Changes Visible

**Problem:** Users don't realize the analysis text below radar chart changes when clicking different cohorts

**Solutions:**
- **Open each cohort's analysis with ranking indicator:**
  - 1st: "Your best fit: [Cohort Name]"
  - 2nd: "Your second-best fit: [Cohort Name]"
  - 3rd: "Your third-best fit: [Cohort Name]"
  - etc...

- **Add color gradient visual cue** beside text and in cohort selector:
  - Green (1st) → Red (5th)
  - Could use opacity/saturation gradient? Remember, we want a high-end Apple look. 

---

## 5. Create Friendly Cohort Names (Writer Task - Quick)

**Problem:** Hyphenated formal names (Mission-Driven, Clinical-Investigative) aren't memorable or shareable

**Solution:** Create conversational, non-hyphenated display names

**Requirements:**
- Memorable, shareable, natural in conversation
- Still captures essence of each cohort
- Use in UI; keep formal names in methodology

**Placeholder examples (to be workshopped):**
- Mission-Driven → "Community First" or "Service Driven"
- Patient-Centered → "Clinical Connection" or "Care Focused"
- Clinical-Investigative → "Clinical Innovator" or "Bedside Science"
- Research-Intensive → "Research Leader" or "Lab Powerhouse"
- Community-Clinical → "Local Impact" or "Community Care"

---

## 6. "?" Button Popups for Hexagon Points on radar Charts

**Competency explanations (on radar chart):**
- Add "?" button next to each of 6 competency labels
- Click opens popup with static content defining that competency
- Examples: "Academic Rigor: GPA trends, MCAT performance, course difficulty"
- Clean, work well on mobile

---

## 7. Consolidate Static Cohort Information into Expandable Section

**Replace current "View example schools" button with engaging cohort info section**

**Location:** Below the fit analysis text for each cohort. All cohort info in one logical place.

**New expandable section contains:**
1. **Brief cohort description** (1-2 sentences on what these schools prioritize)
2. **10 exemplar schools** (progressive disclosure from cohort selector) - as in the whitecoat framework, these schools should be listed from most selective to least selective within each cohort. Each cohort has a range of selectivity, which is key to the system. 
3. **Doctor personality hook** (Enneagram-style - both real + fictional doctors)
   - List examples. 3-5. 

**Button/section name:**
- "About this school type"

---

## 8. Change Page Headers and Labels

**Possible Changes:**
- Results page title: "Your Results" → "Your Premed Assessment"?
- Cohort selector header: "Ranked by fit" → "Explore Fit by School Type"? 
- Chart legend: "You" → "Your Profile"?

**Think about this carefully. We want to tell a cohesive story.**


---

## 9. Add Methodology Section (Expandable Footer)

**Location:** Bottom of results page, collapsible/expandable section

**Header:** "About the Whitecoat Cohort System"

**Content to pull from:** The methodology section in the Whitecoat Framework document explaining:
- How 173 schools were classified
- Data sources (AAMC/MSAR + institutional sites)
- What makes each cohort distinct
- Anti-hierarchy positioning: fit over prestige
- Keep to ~200-300 words

**Format:** Collapsed by default with "Learn more about our methodology" toggle

---

# SAVE FOR LATER (Currently a premed can simply screenshot and share. A bit messy, but perfectly fine for now)

## OPTION A. Add "Share My Profile" Export Feature

**Purpose:** Let premeds share unique radar chart + doctor personality hook

**Implementation:**
- Button below radar chart: "Share My Profile" (or better name TBD)
- Generates clean PNG/SVG export containing:
  - Their hexagon shape (no benchmark overlay)
  - Doctor personality hook: "You're a Dr. House"
  - Subtle branding: "by Smarter Premed"
  
**Why this matters:**
- Viral sharing optimized (Reddit/social/screenshot-ready)
- Empowering vs comparative (celebrates identity, not gaps)
- Low complexity (single button, simple image generation)

## OPTION B. Hero Card for Screenshots

**Location:** Top of results page, above current radar chart section

**Contents:**
- **Radar chart** (student's hexagon only, no benchmark overlay)
- **Doctor personality hook** (large, prominent): "You're a Dr. House"
- **Top cohort fit** (1-2 sentences): "Your best fit is [Cohort Name]. You're strongest in [top 2 competencies]."
- **Subtle branding footer**: "Smarter Premed" or "[Tool Name] by Smarter Premed"

**Design:**
- Card format with clean borders/shadow (Apple aesthetic)
- Optimized dimensions for social sharing (1080x1080 or 1200x628)
- Mobile-friendly (entire card visible without scrolling)

**Why this works:**
- Natural screenshot target (designed for it)
- Shareable without exposing gaps/weaknesses
- Clean, affirming, brand-consistent
- Doesn't require export button
- Rest of page provides depth for those who want it

**Effort:** Medium (new component, but uses existing data)

---

## Notes on Philosophy

This tool is about **self-discovery and agency**, not judgment. Like the Enneagram—it shows your current shape and invites intentional growth. We're not boxing students in; we're helping them see where they are and where they could go.

No stress. No urgency warnings. Just honest reflection and clear next steps.

**Anti-hierarchy positioning:** This system is built to be an antidote to hierarchical thinking. Students all know what the "top 10" or "top 30" are. But that's messed up. This is all built on the notion of finding the right fit for the student, not feeding the US News beast.

---

## Save for Later

- Advanced school list builder (beyond cohort → schools)
- Transcript upload & parsing
- Resume/CV upload
- Personalized follow-up questions
- Progress tracking over time
