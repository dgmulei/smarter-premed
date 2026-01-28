# Positioned by Smarter Premed

**See Where You Stand. Focus On What Matters.**

A free assessment that helps pre-med students understand their strategic positioning and discover which medical school cohorts align with their strengths and career goals.

---

## What is Positioned?

Positioned uses the **Whitecoat Framework**—a research-based classification system analyzing 173 AAMC-accredited U.S. and Canadian medical schools—to help students identify schools where their profile naturally fits.

Built on data from the Medical School Admission Requirements (MSAR) database, institutional websites, and published mission statements, the framework categorizes schools into five cohorts based on measurable institutional priorities and applicant expectations.

### What You Get

- **Your Personal Profile**: Analysis across 6 core competencies
- **Cohort Rankings**: See which of 5 school types best match your strengths
- **School Examples**: 10 specific schools for each cohort, sorted by selectivity
- **Doctor Archetypes**: Understand the type of physician each cohort cultivates

---

## The Five Cohorts

### 1. Discover (Research-Intensive)
**Color:** Teal (#0d9488)
**Schools:** Harvard, Johns Hopkins, Stanford, Yale, WashU, Penn Perelman, UCSF, Michigan, Duke, Wisconsin-Madison
**Archetype:** Scientific investigators who push the boundaries of medical knowledge

### 2. Translate (Clinical-Investigative)
**Color:** Cyan-Teal (#0891b2)
**Schools:** UCSF, Columbia, Duke, Northwestern, Penn Perelman, NYU Grossman, Vanderbilt, Mount Sinai, Emory, USC Keck
**Archetype:** Bridge builders who take discoveries from lab to bedside

### 3. Bedside (Patient-Centered)
**Color:** Cool Gray (#6b7280)
**Schools:** UChicago Pritzker, UVA, Case Western, Dartmouth Geisel, Rochester, Weill Cornell, Wake Forest, Ohio State, Loyola Stritch, Penn State
**Archetype:** Master healers who build trust through communication

### 4. Community (Community-Clinical)
**Color:** Warm Gray (#78716c)
**Schools:** UWashington, UNC, UPittsburgh, UC Davis, Minnesota, Colorado, Oregon Health & Science, Tulane, Georgetown, UMass
**Archetype:** Community champions who address health at neighborhood level

### 5. Mission (Mission-Driven)
**Color:** Light Warm Gray (#a8a29e)
**Schools:** Howard, Morehouse, UNM, VCU, CUNY, UC Riverside, Charles R. Drew, Meharry, Arizona, UAB
**Archetype:** Equity warriors fighting systemic healthcare injustice

---

## Six Competency Dimensions

The assessment evaluates students across:

1. **Academic Rigor** - GPA, coursework difficulty, academic achievements
2. **Clinical Exposure** - Patient interaction hours, clinical settings
3. **Research Activities** - Publications, lab work, research projects
4. **Leadership & Service** - Community engagement, volunteer work, leadership roles
5. **Clinical & Lab Skills** - Technical proficiency, hands-on experience
6. **Specialty Focus** - Clear direction toward specific medical specialties

---

## Current Status

**Version:** 1.5.0 (Soft Launch Ready)
**Live at:** https://smarterpremed.com

### What's Working
✅ Landing page with clear value proposition
✅ 30-question questionnaire with free response field
✅ Claude AI-powered profile analysis (claude-sonnet-4-5-20250929)
✅ Results page with radar chart visualization
✅ Five cohort modals with detailed school information
✅ Methodology section explaining the framework
✅ Responsive design (540px max-width, mobile-optimized)
✅ Custom domain with Open Graph meta tags for link previews
✅ Contact email (hello@smarterpremed.com)
✅ Database storage for questionnaire responses and results

See `PROJECT-STATUS.md` for detailed status.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Charts:** D3.js
- **AI:** Claude API (Anthropic) - claude-sonnet-4-5-20250929
- **Database:** Vercel Postgres
- **Hosting:** Vercel (Pro plan)
- **DNS/Email:** Cloudflare

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm
- Anthropic API key (for AI features)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd smarter-premed

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Add your ANTHROPIC_API_KEY to .env.local

# Run development server
npm run dev
```

Visit `http://localhost:3000`

---

## Project Structure

```
smarter-premed/
├── app/
│   ├── page.tsx              # Landing page
│   ├── results/page.tsx      # Results page
│   └── api/
│       ├── analyze/          # Claude AI analysis
│       └── submit-email/     # Email + data storage
├── components/
│   ├── QuestionnaireForm.tsx # Main questionnaire
│   └── RadarChart.tsx        # D3 radar chart
├── lib/
│   ├── cohortData.ts         # Cohort definitions
│   └── db.ts                 # Database utilities
├── public/
│   └── og-image.png          # Open Graph image
├── docs/
│   ├── CHANGELOG.md          # Version history
│   ├── COHORT_FRAMEWORK.md   # Framework documentation
│   ├── QUESTIONNAIRE.md      # Question design
│   └── API_DESIGN.md         # API architecture
└── PROJECT-STATUS.md         # Current status & roadmap
```

---

## Documentation

- **Project Status:** `PROJECT-STATUS.md`
- **Changelog:** `docs/CHANGELOG.md`
- **Production Monitoring:** `docs/MONITORING.md`
- **Architecture:** `ARCHITECTURE.md`
- **Development Setup:** `DEVELOPMENT.md`
- **Whitecoat Framework:** `docs/COHORT_FRAMEWORK.md`
- **Questionnaire Design:** `docs/QUESTIONNAIRE.md`
- **API Design:** `docs/API_DESIGN.md`

---

## Design Philosophy

### Aesthetic
- **Typography:** Georgia serif for editorial feel
- **Colors:** Teal accent (#0d9488) with gradient ranking system
- **Layout:** 540px max-width, card-based, generous padding
- **Tone:** Professional but approachable, educational without being academic

### UX Principles
- **Transparency:** Methodology clearly explained
- **Credibility:** Data sources cited (173 schools, MSAR database)
- **Personalization:** Results tailored to individual strengths
- **Education:** Help students understand medical school landscape

---

## Contributing

This is currently a private project. For questions or collaboration inquiries, please contact the project owner.

---

## License

Proprietary - All rights reserved

---

## Acknowledgments

- Built on AAMC MSAR data
- Powered by Claude AI (Anthropic)
- Inspired by the need for better med school guidance tools

---

**Last Updated:** January 28, 2026 (v1.5.0 - Soft Launch Infrastructure)
