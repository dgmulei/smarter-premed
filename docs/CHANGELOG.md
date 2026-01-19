# Changelog

All notable changes to Smarter Pre-Med will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
**Last Updated**: January 19, 2025
