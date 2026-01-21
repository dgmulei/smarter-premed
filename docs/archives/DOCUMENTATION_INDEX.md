# Documentation Index

**Complete guide to Smarter Pre-Med documentation.**

Last Updated: January 19, 2025

---

## 📖 Start Here (Read in Order)

### 1. [README.md](README.md)
**Project overview and quick reference**

- What Smarter Pre-Med does
- The Whitecoat Framework explained
- 5 cohorts and 6 competencies
- Tech stack and current status
- Example use cases

**Read this first** if you're new to the project.

### 2. [SETUP.md](SETUP.md)
**Get running in 3 minutes**

- Installation steps
- API key configuration
- Verify installation
- Troubleshooting guide
- Sample test data

**Read this to get the app running locally.**

### 3. [ARCHITECTURE.md](ARCHITECTURE.md)
**How the system works**

- Data flow diagram
- Whitecoat Framework integration
- AI analysis approach ("jazz charts" philosophy)
- Key design decisions
- Performance characteristics

**Read this to understand the technical implementation.**

### 4. [DEVELOPMENT.md](DEVELOPMENT.md)
**For developers and contributors**

- Testing guide
- Deployment instructions
- Common development tasks
- Code structure
- Contributing guidelines

**Read this if you're developing features or deploying.**

---

## 📚 Reference Documentation

### [docs/QUESTIONNAIRE.md](docs/QUESTIONNAIRE.md)
**Complete 30-question specification**

- All 30 questions with answer options
- Organized by section:
  - Research Experience (Q1-5)
  - Clinical Experience (Q6-12)
  - Academic Performance (Q13-19)
  - Leadership & Service (Q20-23)
  - Vision & Strategy (Q24-30)
- Input types and validation rules

**Use this as the definitive questionnaire reference.**

### [docs/COHORT_FRAMEWORK.md](docs/COHORT_FRAMEWORK.md)
**Whitecoat Framework complete specification**

- All 5 cohorts defined in detail
- Quantitative benchmarks (GPA, MCAT, hours)
- Institutional and applicant indicators
- Example schools for each cohort (173 total)
- Cohort-specific weighting insights
- Methodology and data sources

**Use this to understand how cohorts are classified.**

### [docs/API_DESIGN.md](docs/API_DESIGN.md)
**API prompt engineering approach**

- Complete embedded prompt structure
- Framework integration strategy
- Scoring principles and guidance
- Output format specification
- "Jazz charts" philosophy explained

**Use this to understand or modify the AI analysis logic.**

### [docs/CHANGELOG.md](docs/CHANGELOG.md)
**Version history**

- v1.0.0: MVP release (Day Two)
- v0.2.0: UI polish (Day One)
- v0.1.0: Initial setup
- Planned features (Phase 2-4)

**Use this to track what's changed and what's coming.**

---

## 🗂️ File Organization

```
smarter-premed/
├── README.md                      # Start here
├── SETUP.md                       # Installation
├── ARCHITECTURE.md                # How it works
├── DEVELOPMENT.md                 # Developer guide
├── DOCUMENTATION_INDEX.md         # This file
│
├── docs/                          # Reference docs
│   ├── QUESTIONNAIRE.md           # 30-question spec
│   ├── COHORT_FRAMEWORK.md        # Framework details
│   ├── API_DESIGN.md              # Prompt engineering
│   └── CHANGELOG.md               # Version history
│
├── Documentation-Archive/         # Historical docs (read-only)
│   ├── README.md                  # Archive index
│   ├── Day-Two/                   # Day Two notes
│   └── [legacy files]             # Obsolete documentation
│
├── app/                           # Next.js app
├── components/                    # React components
├── public/                        # Static assets
└── [code files]
```

---

## 🎯 Quick Navigation by Task

### "I want to..."

**...understand what this project does**
→ [README.md](README.md)

**...run the app locally**
→ [SETUP.md](SETUP.md)

**...understand how AI analysis works**
→ [ARCHITECTURE.md](ARCHITECTURE.md) → AI Analysis Approach section

**...see all 30 questions**
→ [docs/QUESTIONNAIRE.md](docs/QUESTIONNAIRE.md)

**...understand cohort classifications**
→ [docs/COHORT_FRAMEWORK.md](docs/COHORT_FRAMEWORK.md)

**...modify the questionnaire**
→ [DEVELOPMENT.md](DEVELOPMENT.md) → Common Tasks → Update Questionnaire

**...deploy to production**
→ [DEVELOPMENT.md](DEVELOPMENT.md) → Deployment section

**...add a new feature**
→ [DEVELOPMENT.md](DEVELOPMENT.md) → Contributing Guidelines

**...see what changed recently**
→ [docs/CHANGELOG.md](docs/CHANGELOG.md)

**...find old documentation**
→ [Documentation-Archive/](Documentation-Archive/)

---

## 📋 Documentation Standards

### Maintained Files

All non-archived documentation is actively maintained and kept up-to-date with code changes.

**When to update**:
- README.md: Major feature additions or project scope changes
- SETUP.md: Installation process, prerequisites, or troubleshooting changes
- ARCHITECTURE.md: System design changes, new components, data flow modifications
- DEVELOPMENT.md: New development tasks, deployment process changes
- docs/QUESTIONNAIRE.md: Any question additions, removals, or modifications
- docs/COHORT_FRAMEWORK.md: Benchmark updates, cohort reclassifications
- docs/API_DESIGN.md: Prompt engineering approach changes
- docs/CHANGELOG.md: Every release or significant change

### Writing Style

- **Clear and concise**: Assume reader is intelligent but unfamiliar with project
- **Code examples**: Include where helpful
- **Active voice**: "The AI analyzes..." not "Analysis is performed..."
- **Headers**: Use descriptive headers for easy scanning
- **Links**: Cross-reference related docs

### Formatting

- Markdown with GitHub-flavored syntax
- Code blocks with language specification (```typescript, ```bash, etc.)
- Tables for structured data (benchmarks, metrics)
- Horizontal rules (---) to separate major sections

---

## 🔄 Documentation Lifecycle

### Active Documentation (Root + /docs)

**Updated regularly** to reflect current state:
- README.md, SETUP.md, ARCHITECTURE.md, DEVELOPMENT.md
- All files in `/docs` folder

**When code changes that affect docs**:
1. Update relevant documentation files
2. Update CHANGELOG.md with changes
3. Commit docs with code in same PR/commit

### Archived Documentation (/Documentation-Archive)

**Read-only historical reference**:
- Day One/Two development notes
- Legacy setup guides
- Session handoff files

**Never updated** - preserved as snapshot of development process.

---

## ❓ Documentation FAQs

**Q: Which doc should I read first?**
A: [README.md](README.md) for overview, then [SETUP.md](SETUP.md) to get running.

**Q: Where are the full framework details?**
A: [docs/COHORT_FRAMEWORK.md](docs/COHORT_FRAMEWORK.md) has everything.

**Q: How do I modify the questionnaire?**
A: See [DEVELOPMENT.md](DEVELOPMENT.md) → Common Tasks → Update Questionnaire.

**Q: What's in the archive folder?**
A: Old development docs from Jan 17-19, 2025. Check [Documentation-Archive/README.md](Documentation-Archive/README.md).

**Q: Is the documentation up-to-date?**
A: Yes, all non-archived docs are maintained with code. Last verified: January 19, 2025.

**Q: Can I contribute to docs?**
A: Yes! See [DEVELOPMENT.md](DEVELOPMENT.md) → Contributing Guidelines.

---

## 📧 Questions?

**Documentation issues or suggestions**:
- Email: dgmulei@gmail.com
- Subject: "Smarter Pre-Med Documentation: [your topic]"

---

**Documentation hygiene maintained** ✅
