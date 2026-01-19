# Smarter Pre-Med

**AI-powered cohort fit analysis for pre-medical students using the proprietary Whitecoat Framework.**

A focused assessment tool that helps pre-med students discover their medical school cohort profile and competitive standing across 6 key competencies in under 10 minutes.

---

## Overview

Smarter Pre-Med analyzes student profiles through a comprehensive 30-question questionnaire and provides:

- **Personalized Cohort Fit Analysis**: Ranking across 5 medical school cohorts based on real AAMC/MSAR data
- **6-Competency Radar Chart**: Visual representation of competitive profile
- **Actionable Recommendations**: Specific, framework-based guidance for each cohort
- **Professional Judgment AI**: Claude Sonnet 4.5 applies "jazz charts" philosophy—nuanced analysis over rigid formulas

**No document upload required.** The questionnaire captures all essential data points for accurate cohort matching.

---

## The Whitecoat Cohort Framework

A proprietary, data-driven classification system that categorizes 173 US and Canadian medical schools into 5 distinct cohorts based on institutional priorities and applicant expectations.

### The 5 Cohorts

1. **Mission-Driven**
   - **Focus**: Health equity, underserved populations, community engagement
   - **GPA**: 3.50-3.80 (Median: ~3.65) | **MCAT**: 505-512 (Median: ~508.5)
   - **Example Schools**: CUNY, Howard, Morehouse, UAB, VCU

2. **Patient-Centered**
   - **Focus**: Communication skills, patient engagement, culturally competent care
   - **GPA**: 3.60-3.85 (Median: ~3.725) | **MCAT**: 509-514 (Median: ~511.5)
   - **Example Schools**: UChicago Pritzker, Loyola Stritch, UVA, Case Western

3. **Community-Clinical**
   - **Focus**: Primary care, public health, community-based participatory research
   - **GPA**: 3.50-3.80 (Median: ~3.65) | **MCAT**: 505-511 (Median: ~508)
   - **Example Schools**: UNC Chapel Hill, Boston University, Georgetown, UC Davis

4. **Clinical-Investigative**
   - **Focus**: Integration of clinical practice with research, clinical trials
   - **GPA**: 3.70-3.90 (Median: ~3.80) | **MCAT**: 512-518 (Median: ~515)
   - **Example Schools**: UCSF, Columbia, Duke, Northwestern, Emory, NYU Grossman

5. **Research-Intensive**
   - **Focus**: High NIH funding, MD-PhD programs, cutting-edge research
   - **GPA**: 3.70-3.95 (Median: ~3.825) | **MCAT**: 515-522 (Median: ~518.5)
   - **Example Schools**: Harvard, Johns Hopkins, Stanford, WashU, Mayo Clinic

### The 6 Competencies (0-100 scale)

Each student receives personalized scores across:

1. **Academic Rigor** - GPA trends, MCAT performance, course rigor
2. **Clinical Exposure** - Direct patient hours, settings diversity, longitudinal commitment
3. **Research Activities** - Project engagement, outputs, independence/leadership
4. **Leadership & Service** - Impact scale, sustained commitment, tangible outcomes
5. **Technical Skills** - Certifications, data analysis, healthcare-specific competencies
6. **Specialty Preparation** - Exposure breadth, career planning maturity

---

## How It Works

### Student Experience (8-10 minutes)

1. **Answer 30 Questions**: Comprehensive assessment across research, clinical, academic, leadership, and vision
2. **Submit for Analysis**: AI processes responses using Whitecoat Framework benchmarks
3. **View Results**: Interactive radar chart + ranked cohort cards with personalized fit analyses

### Behind the Scenes

```
30-Question Responses
  ↓
Anthropic Claude Sonnet 4.5
(Embedded Whitecoat Framework + Professional Judgment)
  ↓
Competency Scores (6 dimensions, 0-100)
+
Cohort Rankings (5 cohorts with fit scores & analyses)
  ↓
Interactive Results Dashboard
```

**Analysis Time**: ~8-15 seconds
**Cost per Analysis**: ~$0.08-$0.10

---

## Tech Stack

- **Framework**: Next.js 15 (React 19, App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Chart.js + react-chartjs-2
- **AI**: Anthropic Claude API (Sonnet 4.5)
- **Deployment**: Vercel-ready

---

## Project Status

**Current Version**: MVP Complete (Day Two)

✅ **Completed**
- Premium Apple-inspired UI with glassmorphism
- 30-question comprehensive assessment
- Full Whitecoat Framework integration (all 5 cohorts)
- AI-powered analysis with Claude Sonnet 4.5
- Interactive radar chart visualization
- Cohort-specific fit analyses with actionable recommendations

🚧 **Planned Enhancements**
- Transcript upload and parsing (Phase 2)
- Resume/CV upload for contextual depth (Phase 3)
- Three personalized follow-up questions (Phase 4)
- Progress tracking over time
- School-specific matching (beyond cohort classification)
- PDF report generation

---

## Quick Links

- **[Setup Guide](SETUP.md)** - Get running in 3 minutes
- **[Architecture](ARCHITECTURE.md)** - How the system works
- **[Development Guide](DEVELOPMENT.md)** - Testing, deployment, contributing
- **[Questionnaire Specification](docs/QUESTIONNAIRE.md)** - All 30 questions detailed
- **[Cohort Framework](docs/COHORT_FRAMEWORK.md)** - Complete framework reference
- **[Changelog](docs/CHANGELOG.md)** - Version history

---

## Core Philosophy

### "Jazz Charts" Approach

The AI doesn't use rigid formulas—it applies **professional judgment** like a top-tier advisor:

- **Quality over quantity**: 300 hours in one sustained role > 300 scattered hours
- **Longitudinal commitment**: Sustained involvement weighted heavily
- **Growth trajectories**: Recent progression and improvement valued
- **Holistic context**: Non-traditional pathways, personal circumstances considered
- **Cohort-specific lens**: Same profile scored differently for different cohorts

### Why This Matters

Pre-med advising is an art informed by data, not pure mathematics. The Whitecoat Framework provides quantitative benchmarks, but the AI synthesizes these with qualitative insights—just like the best human advisors.

---

## Example Use Cases

**Student A**: Strong research (500 hrs, 2 publications), weak clinical (50 hrs)
- **Top Cohort**: Research-Intensive (85/100 fit)
- **Recommendation**: "Build clinical hours to 200+ over next year via EMT certification"

**Student B**: Extensive community service (800 hrs underserved), moderate academics (GPA 3.5, MCAT 508)
- **Top Cohort**: Mission-Driven (92/100 fit)
- **Recommendation**: "Your sustained community commitment aligns perfectly with Mission-Driven schools like Howard and Morehouse"

**Student C**: Balanced profile (GPA 3.75, MCAT 512, 300 clinical, 400 research)
- **Top Cohort**: Clinical-Investigative (88/100 fit)
- **Recommendation**: "Continue balanced approach; consider clinical research roles to strengthen integration narrative"

---

## License

Proprietary - Whitecoat Framework

---

## Contact

For questions about the Whitecoat Framework or implementation:
- Email: dgmulei@gmail.com

---

**Built for pre-med students who want clarity, not confusion.**
