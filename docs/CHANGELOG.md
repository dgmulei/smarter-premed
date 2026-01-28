# Changelog

All notable changes to Positioned will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.5.0] - 2026-01-28

### 🚀 Soft Launch Infrastructure

**Goal**: Remove all friction from sharing for soft launch to ~25-50 friendlies (friends/family connections for testimonials).

### Added

#### Custom Domain & Branding
- **Production URL**: `smarterpremed.com` (custom domain via Cloudflare DNS → Vercel)
- **Open Graph image**: 1200x630 PNG with radar chart, "Positioned" branding, tagline
- **Meta tags**: Full OG and Twitter card support for link previews in iMessage, social media
- **Contact email**: `hello@smarterpremed.com` via Cloudflare Email Routing → Gmail

#### Database Infrastructure
- **`lib/db.ts`**: New database utilities module with TypeScript types
- **Questionnaire storage**: Full 30-question responses stored as JSONB
- **Top cohort tracking**: Analysis results saved for analytics
- **Returning user support**: Foundation for future tools without re-entering data

#### Messaging Blurbs
- **Direct-to-student**: "You're putting in the work — but which med schools actually fit your profile?..."
- **Counselor-to-counselor**: Detailed version with all 6 competencies listed
- **Counselor-to-student**: Warm forwarding version for advisors to share with students

### Changed

#### API Updates
- **`/api/submit-email`**: Now accepts `questionnaireResponses`, returns `submissionId`
- **`/api/analyze`**: Accepts `submissionId`, saves `top_cohort` after Claude analysis
- **Frontend flow**: Passes questionnaire data and submissionId through session storage

#### Database Schema
- Added `questionnaire_responses` column (JSONB)
- Added `top_cohort` column (VARCHAR)

### Technical Details

**Domain Setup:**
- Cloudflare DNS: A record → 76.76.21.21, CNAME www → cname.vercel-dns.com
- Cloudflare Email Routing: hello@ → dgmulei@gmail.com
- Domain transferred from Namecheap to Cloudflare

**Data Flow:**
1. User completes questionnaire → email + responses saved → submissionId returned
2. Results page calls analyze with submissionId → Claude runs → top_cohort saved
3. Returning users can be looked up by email for future tools

### Files Changed
- `lib/db.ts` (new)
- `app/api/submit-email/route.ts`
- `app/api/analyze/route.ts`
- `app/page.tsx`
- `app/results/page.tsx`
- `app/layout.tsx` (meta tags)
- `public/og-image.png` (new)

---

## [1.4.3] - 2026-01-27

### 🎨 Ghost Buttons & Navigation Polish

**Goal**: Improve button discoverability and navigation UX across the results page.

### Added

#### Ghost Button Styling
- **Visual depth for cohort buttons**: Added light background fill (6% opacity of rank color) and subtle shadow to make buttons more "button-y"
- **Hover effects**: Glow + background intensify on desktop hover (15% opacity background, 12px→14px glow radius)
- **Pulse animation**: Continuous 3-second pulse glow for mobile where hover doesn't exist
- **Rank-specific colors**: Each rank (1-5) has matching hover/pulse colors

#### Card #3 Navigation
- **Duplicate cohort selector**: Added "COMPARE ACROSS SCHOOL TYPES" selector to Card #3 (analysis card) so users can switch cohorts without scrolling back to chart
- **Synced state**: Both Card #2 and Card #3 selectors use same state and stay in sync

#### Color-Coded Card Borders
- **Card #2**: Added dynamic left border (4px) that matches selected cohort's rank color
- **Card #3**: Already had this styling, now both cards match

### Changed

#### Spacing Adjustments
- **Selector spacing**: Added `<br />` tags above "COMPARE ACROSS SCHOOL TYPES" labels for better visual separation (margin wasn't working reliably)
- **Mobile top padding**: Reduced from 24px to 16px for tighter content-to-header spacing

#### Button Styling
- **"See My Results" button**: Changed to ghost button style with teal border, light fill, and pulse animation to match cohort buttons
- **Pulse intensity**: Increased glow radius (12px→14px) and opacity (0.4→0.46) by 15% for better visibility

### Files Changed

#### `app/results/page.tsx`
- Added ghost button styling to cohort name buttons (lines ~482-495, ~685-698)
- Added `getRankHoverClass()` helper function for dynamic CSS classes
- Added duplicate cohort selector in Card #3 (lines ~711-810)
- Added color-coded left border to Card #2 (line ~465)

#### `app/globals.css`
- Added `.ghost-btn-teal` hover class with glow effect
- Added `.ghost-btn-rank1` through `.ghost-btn-rank5` hover classes
- Added `@keyframes pulseGlow` animation
- Added `.ghost-btn-pulse` class for continuous pulse
- Added rank-specific `--pulse-color` CSS custom properties

#### `app/page.tsx`
- Changed "See My Results" button to ghost button style with `ghost-btn-teal ghost-btn-pulse` classes

### Technical Details

**Ghost Button Pattern:**
```tsx
<button
  className={`ghost-btn-pulse ${getRankHoverClass(rank)}`}
  style={{
    border: `1px solid ${rankColor}`,
    backgroundColor: `${rankColor}10`, // 6% opacity
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
  }}
>
```

**Pulse Animation:**
```css
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
  50% { box-shadow: 0 0 14px var(--pulse-color), 0 1px 3px rgba(0,0,0,0.08); }
}
.ghost-btn-pulse { animation: pulseGlow 3s ease-in-out infinite; }
```

---

## [1.4.2] - 2026-01-27

### 📱 Mobile Scroll Wobble Fix

**Goal**: Fix horizontal scroll wobble on iPhone that was degrading the mobile experience.

### Fixed

#### Mobile Horizontal Scroll Wobble
- **Root cause identified**: The "About the Whitecoat Framework" button was extending past the viewport edge on narrow iPhone screens, causing iOS Safari to detect horizontal scrollable content
- **Button text shortened**: "About the Whitecoat Framework" → "The Whitecoat Framework" (saved ~40px width)
- **Button alignment changed**: `justify-end` → `justify-center` to prevent edge overflow on any screen size
- **Result**: Wobble eliminated on iPhone without affecting iPad or desktop

#### Desktop Scroll Wheel Restored
- **Reverted aggressive CSS**: Removed `overscroll-behavior: none` from html/body that was breaking mouse scroll wheel
- **Removed unnecessary overflow rules**: Cleaned up redundant `overflow-x: hidden` on html and main elements
- **Restored native behaviors**: Pull-to-refresh on mobile and scroll wheel on desktop now work correctly

### Changed

#### Results Page (`app/results/page.tsx`)
- Methodology button text: "About the Whitecoat Framework" → "The Whitecoat Framework"
- Methodology modal title: Same text change for consistency
- Button container: `justify-end` → `justify-center`

#### Global Styles (`app/globals.css`)
- Removed `overscroll-behavior: none` from html, body
- Removed `max-width: 100vw/100dvw` rules from html, body, main
- Removed `-webkit-overflow-scrolling: touch` from html
- Kept only essential `overflow-x: hidden` on body

### Technical Details

**Investigation Process:**
1. Initial assumption: Missing CSS overflow properties → Added aggressive overflow/overscroll CSS
2. Result: Broke desktop scroll wheel functionality
3. User observation: Button appeared to extend past viewport edge in screenshot
4. Root cause: Content overflow, not missing CSS
5. Solution: Fix the content (shorter text + centered alignment)

**Lesson Learned:** When debugging scroll issues, first check if any content extends past the viewport. Aggressive CSS overflow rules can break other browser functionality. The minimal fix is usually the correct one.

---

## [1.4.1] - 2026-01-21

### 🔧 Reliability & Monitoring Improvements

**Goal**: Fix intermittent timeout errors and establish production monitoring capabilities.

### Added

#### Client-Side Reliability
- **Extended timeout**: Increased from browser default (30s) to 90 seconds for `/api/analyze`
- **Automatic retry logic**: 2 attempts with 2-second delay between retries
- **Better error messages**: User-friendly messages for timeout vs network errors
- **AbortController**: Proper timeout handling with cleanup

#### Server-Side Performance Logging
- **Request lifecycle tracking**: `[ANALYZE]` prefix on all API logs
- **Timing metrics**:
  - API call duration logged in milliseconds and seconds
  - Total request duration from start to completion
  - Timestamps for all major events
- **Error tracking**: Enhanced error logging with duration context

#### Monitoring Tools
- **`monitor-logs.sh`**: Formatted, color-coded live log viewer for Vercel CLI
- **`test-production-api.js`**: End-to-end API test with realistic questionnaire data
- **`test-vercel-endpoint.sh`**: Quick health check for production endpoint

#### Documentation
- **`docs/MONITORING.md`**: Comprehensive guide for production monitoring
  - Accessing logs via CLI vs Dashboard
  - CLI limitations (live logs only, no historical)
  - Tool usage instructions
  - Common issues and solutions
  - Log format reference
  - Performance benchmarks

### Changed

#### Results Page (`app/results/page.tsx`)
- Wrapped fetch call with retry logic and timeout handling
- Better error state management with specific messages
- Console logging for debugging retry attempts

#### API Route (`app/api/analyze/route.ts`)
- Added performance timing throughout request lifecycle
- Structured logging with consistent `[ANALYZE]` prefix
- Duration tracking for Anthropic API calls

### Fixed

- **Intermittent "Failed to fetch" errors**: Cold start (2-5s) + Claude API latency (15-30s) was exceeding browser's 30s default timeout
- **Improved first-request success rate**: Retry logic handles edge cases where first attempt times out
- **Better observability**: Can now diagnose production issues through logs

### Technical Details

**Before:**
- No explicit timeout → browser default ~30s
- No retry logic → single failure = error to user
- Minimal logging → hard to diagnose issues
- No monitoring tools

**After:**
- 90-second timeout with AbortController
- 2 automatic retries with backoff
- Detailed logging with timing data
- Full monitoring toolkit + documentation

**Typical Request Times:**
- Cold start: 2-5 seconds
- Claude API: 15-30 seconds
- Total: 18-35 seconds (comfortably under 90s timeout)

---

## [1.4.0] - 2026-01-21

### 📱 Screenshot Virality Optimizations

**Goal**: Make the results card Instagram Stories-ready without major redesign.

### Added

#### Results Card Branding
- **Brand overline**: "SMARTER PREMED" above headline (small, gray, uppercase, letter-spaced)
- **Three-line headline structure**:
  - "Your Best Fit:" (standard size)
  - Cohort name (text-3xl, bold, teal — the identity moment)
  - "Med Schools" (smaller, gray)
- **Bold cohort name** in both chart header and "How X Fits You" header

#### Defensive Error Handling
- `typeof window` guard for SSR/hydration timing issues
- try-catch around `sessionStorage.getItem()` (handles private browsing)
- Separate try-catch for `JSON.parse` (clears corrupted data, redirects)
- try-catch around error response parsing
- Optional chaining on `rankedCohorts?.length`

### Changed

#### Radar Chart Labels (Mobile Fit)
- Reduced label padding: 16px → 4px (labels closer to chart)
- Shortened labels for mobile screens:
  - "Clinical & Lab Skills" → "Hands-On"
  - "Clinical Exposure" → "Clinical"
  - "Research Activities" → "Research"
  - "Academic Rigor" → "Academics"
  - "Specialty Focus" → "Path Clarity"

### Fixed
- **Mobile label clipping**: Side labels no longer cut off on iPhone screens
- **Intermittent client-side errors**: Added defensive guards for hydration timing issues

### Not Implemented (Deferred)
- Personalized phrase with refresh (future feature)
- Footer branding (gets cropped in screenshots)
- Share button infrastructure

---

## [1.3.0] - 2026-01-21

### 🎯 Rebranding: Fitfinder → Positioned

**Rationale**: "Positioned" better reflects the strategic advisory nature of the tool and aligns with the Dr. Deb voice refinements. The name emphasizes understanding your positioning (strategic) vs finding a fit (transactional).

### Changed
- **App name**: Fitfinder → Positioned
- **Metadata**: Updated page titles and descriptions
- **Documentation**: Updated all active docs (README, PROJECT-STATUS, DOCUMENTATION-INDEX)
- **CHANGELOG**: Updated project reference from "Smarter Pre-Med" to "Positioned"

### Note
- Archive files retain "Fitfinder" references as historical records
- Core functionality unchanged, branding-only update

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
- **Branded header card** on results page (app branding)
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
- Rebranded from "Whitecoat Profile" (interim name: "Fitfinder", now "Positioned")
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
**Last Updated**: January 28, 2026
