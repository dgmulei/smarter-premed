# Changelog

All notable changes to Smarter Pre-Med will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.2.0] - 2026-01-21

### 🚀 Day Five: Production Launch + Prompt Engineering

**Status**: ✅ DEPLOYED to https://smarter-premed.vercel.app/

### Added

#### Production Infrastructure
- **Vercel deployment** with auto-deploy from GitHub main branch
- **Environment configuration** for production/preview/development
- **Pro plan** (60s function timeout for 20-25s AI responses)
- **iOS safe area support** for iPhone notch/dynamic island compatibility

#### Prompt Engineering (Major Refinements)
- **Profile Summary prompt** (~80 lines, up from ~30):
  - ABSOLUTE 75 WORD LIMIT enforcement
  - 5 concrete examples (67-74 words) covering different applicant types
  - Observational tone ("like describing a photograph")
  - 6-point self-check before finalizing
  - Target: 65-72 words with ruthless deletion over compression

- **Fit Analysis prompt** (~85 lines, up from ~35):
  - Changed from "max 100 words" to "75 WORDS MAXIMUM" per school type
  - 6 concrete examples (65-74 words) showing different fit scenarios
  - Focus on ONE primary gap (not multiple)
  - Must compare student numbers to benchmark ranges
  - 7-point self-check per school type

- **Final Requirements Check** (NEW):
  - 25-line quality gate before JSON generation
  - Reinforces deletion strategy
  - Clear INVALID RESPONSES list
  - Final reminder: "Brevity is mandatory"

- **Dynamic Date Awareness** (NEW):
  - Current date injection (YYYY-MM-DD, year, month)
  - TIMELINE URGENCY ASSESSMENT section
  - Auto-calculates HIGH/MODERATE/LOW urgency based on target cycle
  - Self-updating as time passes (no hardcoded years)

#### UI/UX Improvements
- **Header system**: 24px teal accent bar (lighter #86cac4, 50% opacity → solid)
- **Branded header card** on results page ("Fitfinder by Smarter Premed")
- **Square card edges** (replaced rounded corners for flush stacking)
- **iOS-specific fixes** for notch/dynamic island cutoff issues

#### Content Updates
- **Application cycles updated**:
  - Removed outdated 2026 cycle (due 2025)
  - Added current options: 2027, 2028, 2029, 2030+
- **Terminology enforcement**: Friendly names (Discover/Translate/Bedside/Community/Mission) throughout
- **Loading messages shortened** to prevent mobile text overflow

### Changed
- Prompt length: ~450 lines → ~600 lines (33% increase for quality)
- Card design: Rounded corners → Square edges for architectural aesthetic
- Header/footer: Initially with text → Simplified to plain bars → Footer removed
- Top padding: 24px → 40px to prevent content cutoff

### Fixed
- **iPhone cutoff issues** with safe-area-inset-top implementation
- **Hardcoded year references** in prompt (now references dynamic urgency system)
- **Terminology inconsistencies** (cohorts/programs → school types)
- **Loading message overflow** on mobile devices

### Documentation
- Created DAY-FIVE-COMPLETE.md (comprehensive Day 5 summary)
- Updated CHANGELOG.md (this file)
- Prepared PROMPT-ENGINEERING.md for focused iteration work

### Performance
- API response time: 20-25 seconds (acceptable with Pro plan)
- Mobile tested on real iPhone (fully responsive)
- Desktop and mobile both production-ready

---

## [1.1.0] - 2025-01-20

### 🎯 Day Three & Four: Polish + Reliability

**Day Three: Rebranding & UX Polish**

### Changed
- Rebranded from "Whitecoat Profile" to **Fitfinder**
- Updated tagline: "See Where You Stand. Focus On What Matters."
- Header card redesign with generous padding
- Cohort short names: Discover, Translate, Bedside, Community, Mission

### Added
- Expandable methodology section (both landing and results pages)
- "Back to Questionnaire" button with arrow icon
- Finalized cohort modal content:
  - Vivid archetype descriptions
  - "Think:" doctor personality examples
  - Superpower language for each cohort
  - 10 ranked example schools per cohort

**Day Four: AI Reliability & UX Improvements**

### Added
- **Rotating loading messages** during AI analysis (~25 second wait)
  - 7 messages cycling every 3.5 seconds
  - Reinforces framework credibility ("Comparing to 173 medical schools...")
- **API retry logic** for JSON parsing failures (up to 2 attempts)
- Null-safe array handling for all questionnaire fields

### Fixed
- `TypeError: Cannot read properties of undefined (reading 'join')` when optional arrays missing
- Malformed JSON responses from Claude now trigger automatic retry

### Documentation
- Updated PROJECT-STATUS.md to reflect AI integration complete
- Archived DAY-FOUR-KICKOFF.md
- Created DAY-FIVE-PLAN.md (deployment roadmap)
- Updated DOCUMENTATION-INDEX.md with Phase 4 complete

---

## [1.0.0] - 2025-01-19

### 🎉 Initial MVP Release

**Day Two: Backend Integration Complete**

### Added

#### Core Features
- **AI-Powered Analysis**: Integration with Anthropic Claude Sonnet 4.5
- **Comprehensive Questionnaire**: 30-question assessment across 5 categories
  - Research Experience (Q1-5)
  - Clinical Experience (Q6-12)
  - Academic Performance (Q13-19)
  - Leadership & Service (Q20-23)
  - Vision & Strategy (Q24-30)
- **Whitecoat Framework Integration**: Complete 5-cohort classification system embedded in AI prompt
- **Personalized Results**: 6 competency scores + ranked cohort fit analyses

#### Technical Implementation
- API route `/api/analyze` for processing questionnaire responses
- TypeScript interfaces for 30-question structure
- Embedded framework with all quantitative benchmarks
- "Jazz charts" professional judgment approach
- Error handling and validation throughout

#### UI Components
- QuestionnaireForm: 3 input types (select, checkbox, scale)
- Radar chart visualization (Chart.js)
- Interactive cohort selector
- Personalized fit analysis panels
- Loading states and error messaging

#### Documentation
- Comprehensive README with project overview
- SETUP guide for 3-minute installation
- ARCHITECTURE documentation explaining system design
- DEVELOPMENT guide for contributors
- Reference docs: QUESTIONNAIRE, COHORT_FRAMEWORK, API_DESIGN
- CHANGELOG (this file)

### Technical Details

**Model**: Claude Sonnet 4.5 (`claude-sonnet-4-5-20250929`)
- Max tokens: 8,192
- Temperature: 0.7
- Average response time: 8-15 seconds
- Cost per analysis: ~$0.08-$0.10

**Framework Coverage**: 173 medical schools classified
- 5 cohorts defined
- Quantitative benchmarks for GPA, MCAT, clinical hours, research expectations
- Institutional and applicant profile indicators

---

## [0.2.0] - 2025-01-18

### 🎨 Day One: UI Polish Complete

### Added
- Apple-inspired glassmorphism design system
- Premium animations and transitions
- Staggered fade-in effects
- Interactive radar chart
- Cohort selector with hover states

### Changed
- Complete UI redesign from basic to premium
- Color scheme: Blue (#0071e3) accents on white/glass backgrounds
- Typography: SF Pro Display font family
- Spacing: Generous padding and clean layouts

### Documentation (Day One)
- UI redesign specifications
- Polish implementation notes
- Day One completion summary

---

## [0.1.0] - 2025-01-17

### 🏗️ Initial Project Setup

### Added
- Next.js 15 project initialization
- React 19 with TypeScript
- Tailwind CSS configuration
- Basic page structure:
  - Landing page
  - Questionnaire page (8 placeholder questions)
  - Results page with mock data
- Chart.js + react-chartjs-2 for radar visualization
- Git repository initialization

### Technical Stack Established
- Framework: Next.js 15 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Charts: Chart.js
- Deployment target: Vercel

---

## [Unreleased]

### 🚧 Planned Features (Future Releases)

#### Phase 2: Transcript Upload (v2.0.0)
- PDF upload and parsing
- Exact GPA extraction (vs brackets)
- BCPM (science) GPA calculation
- Academic trend analysis (upward/downward)
- Course rigor assessment
- Transfer credit handling

#### Phase 3: Resume/CV Upload (v2.1.0)
- Multi-format support (PDF, DOCX)
- Activity extraction and parsing
- Narrative context integration
- Reconciliation with questionnaire data

#### Phase 4: Personalized Follow-Up (v2.2.0)
- AI-generated clarification questions (3 per analysis)
- Text input for nuanced responses
- Refined analysis based on follow-up
- Examples:
  - "Your transcript shows a C in Organic Chem. What happened?"
  - "800 research hours but no publications—can you describe your role?"

#### Future Enhancements (v3.0.0+)
- **Progress Tracking**: Save profiles, track improvement over time
- **School Matching**: Individual school recommendations beyond cohorts
- **Action Plans**: Detailed timelines for closing gaps
- **PDF Reports**: Downloadable analysis summaries
- **Chat Interface**: Conversational advisor mode
- **Community Features**: Peer comparisons, discussion forums
- **Mobile App**: Native iOS/Android applications

#### Technical Debt & Optimizations
- [ ] Add automated testing (Jest, Playwright)
- [ ] Implement response caching (reduce API costs)
- [ ] Add analytics tracking (Vercel Analytics, Posthog)
- [ ] Implement rate limiting (prevent abuse)
- [ ] Add error monitoring (Sentry)
- [ ] Optimize bundle size (lazy loading, code splitting)
- [ ] Add structured logging (Winston, Pino)

---

## Version Numbering

**Format**: MAJOR.MINOR.PATCH

- **MAJOR**: Incompatible API changes or significant feature additions
- **MINOR**: New features in a backward-compatible manner
- **PATCH**: Backward-compatible bug fixes

**Examples**:
- `1.0.0` → `1.0.1`: Bug fix (e.g., fix validation error)
- `1.0.0` → `1.1.0`: New feature (e.g., add transcript upload)
- `1.0.0` → `2.0.0`: Breaking change (e.g., redesign questionnaire structure)

---

## Categories

Changes are grouped into:

- **Added**: New features
- **Changed**: Changes to existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Security improvements

---

## Links

- [README](../README.md)
- [SETUP](../SETUP.md)
- [ARCHITECTURE](../ARCHITECTURE.md)
- [DEVELOPMENT](../DEVELOPMENT.md)

---

**Maintained by**: David Mulei (dgmulei@gmail.com)
**Last Updated**: January 20, 2025
