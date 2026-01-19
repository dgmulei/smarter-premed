# Architecture

**How Smarter Pre-Med works under the hood.**

This document explains the system architecture, data flow, AI analysis approach, and key design decisions.

---

## System Overview

```
┌─────────────────┐
│   Student       │
│   (Browser)     │
└────────┬────────┘
         │
         │ 1. Answers 30 questions
         ↓
┌─────────────────────────┐
│  QuestionnaireForm.tsx  │
│  (React Component)      │
└───────────┬─────────────┘
            │
            │ 2. Submit FormData
            ↓
┌────────────────────────────┐
│  POST /api/analyze         │
│  (Next.js API Route)       │
└────────────┬───────────────┘
             │
             │ 3. Build comprehensive prompt
             │    with Whitecoat Framework
             ↓
┌──────────────────────────────┐
│  Anthropic Claude API        │
│  (Sonnet 4.5)                │
│                              │
│  • Applies framework         │
│  • Professional judgment     │
│  • Returns JSON              │
└────────────┬─────────────────┘
             │
             │ 4. Parse response
             ↓
┌────────────────────────────┐
│  Competency Scores (6)     │
│  Cohort Rankings (5)       │
│  Fit Analyses (text)       │
└────────────┬───────────────┘
             │
             │ 5. Display results
             ↓
┌─────────────────────────────┐
│  Results Dashboard          │
│  (Radar Chart + Cards)      │
└─────────────────────────────┘
```

---

## Data Flow

### 1. Questionnaire Input

**Component**: `/components/QuestionnaireForm.tsx`

**30 Questions across 5 sections**:
- Research Experience (Q1-5): Hours, types, leadership, outputs
- Clinical Experience (Q6-12): Hours, settings, patient interaction, underserved work
- Academic Performance (Q13-19): GPA, MCAT, confidence, strengths/weaknesses
- Leadership & Service (Q20-23): Roles, scale, outcomes
- Vision & Strategy (Q24-30): Gaps, focus areas, timeline, academic history

**Three Input Types**:
```typescript
{
  select: string,              // Dropdown single-choice
  checkbox: string[],          // Multi-select checkboxes
  scale: string                // 1-5 rating buttons
}
```

**Validation**:
- All fields required
- Checkbox minimum: 1 selection
- Scale minimum: 1 rating
- Auto-scroll to first error

### 2. API Request

**Endpoint**: `POST /api/analyze`

**Request Body**:
```typescript
{
  responses: QuestionnaireResponses  // 30 fields mapped to questions
}
```

**Example**:
```json
{
  "responses": {
    "research_hours_total": "301-500",
    "research_types": ["wet-lab", "data-analysis"],
    "gpa": "3.6-3.8",
    "mcat": "not-taken",
    "clinical_settings": ["hospital", "community-clinic"],
    ...
  }
}
```

### 3. AI Analysis Process

**File**: `/app/api/analyze/route.ts`

#### Step 1: Build Prompt

```typescript
function buildAnalysisPrompt(responses: QuestionnaireResponses): string {
  return `
    You are an expert medical school admissions consultant...

    ## THE WHITECOAT COHORT FRAMEWORK
    [Complete framework with 5 cohorts embedded]

    ## SCORING FRAMEWORK
    [Six competency dimensions with guidance]

    ## STUDENT'S QUESTIONNAIRE RESPONSES
    [All 30 responses formatted]

    ## YOUR TASK
    Analyze and return JSON with:
    - competency_scores (6 dimensions, 0-100)
    - cohort_rankings (5 cohorts with fit scores & analyses)
  `;
}
```

**Prompt Size**: ~6,000-7,000 tokens

#### Step 2: Call Anthropic API

```typescript
const message = await anthropic.messages.create({
  model: 'claude-sonnet-4-5-20250929',
  max_tokens: 8192,
  temperature: 0.7,
  messages: [{
    role: 'user',
    content: buildAnalysisPrompt(responses)
  }]
});
```

**Response Time**: 8-15 seconds
**Token Usage**: ~10,000 tokens total
**Cost**: ~$0.08-$0.10 per analysis

#### Step 3: Parse JSON Response

```typescript
const analysisData = JSON.parse(textContent.text);

// Validate structure
if (!analysisData.competency_scores ||
    !analysisData.cohort_rankings ||
    analysisData.cohort_rankings.length !== 5) {
  throw new Error('Invalid analysis structure');
}
```

**Expected JSON Format**:
```json
{
  "competency_scores": {
    "academic_rigor": 78,
    "clinical_exposure": 45,
    "research_activities": 72,
    "leadership_service": 38,
    "technical_skills": 55,
    "specialty_preparation": 62
  },
  "cohort_rankings": [
    {
      "name": "Clinical-Investigative",
      "fitScore": 82,
      "fitAnalysis": "Your 500 research hours and strong GPA (3.6-3.8) align well with Clinical-Investigative programs like UCSF and Duke. However, your limited clinical exposure (50 hours) is a gap. Build to 200+ hours via EMT certification within the next year to become competitive."
    },
    // ... 4 more cohorts
  ]
}
```

### 4. Response to Client

**Success Response** (200):
```json
{
  "userScores": {
    "academic_rigor": 78,
    "clinical_exposure": 45,
    ...
  },
  "rankedCohorts": [
    {
      "name": "Clinical-Investigative",
      "fitScore": 82,
      "fitAnalysis": "..."
    },
    ...
  ]
}
```

**Error Response** (500):
```json
{
  "error": "Failed to analyze profile"
}
```

### 5. Results Display

**Component**: `/app/results/page.tsx`

**State Management**:
```typescript
const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
const [selectedCohort, setSelectedCohort] = useState<number>(0);
```

**UI Elements**:
- **Radar Chart**: Shows 6 competency scores (0-100 scale)
- **Cohort Selector**: 5 cards ranked by fit score
- **Fit Analysis Panel**: Personalized text for selected cohort

---

## The Whitecoat Framework

### Core Components

#### 1. Five Cohorts

Each cohort has:
- **Institutional Priorities**: What schools value
- **Quantitative Benchmarks**: GPA/MCAT ranges, clinical/research hours
- **Valued Certifications**: EMT, CNA, phlebotomy, etc.
- **Valued Settings**: Hospital types, community clinics, research facilities
- **Example Schools**: 20-30 schools per cohort

**Data Source**: AAMC Medical School Admission Requirements (MSAR) + institutional analysis

#### 2. Six Competencies

Each scored 0-100:

1. **Academic Rigor (25% weight)**
   - GPA trends (40%)
   - MCAT balanced performance (35%)
   - Course rigor/prerequisites (25%)

2. **Clinical Exposure (25% weight)**
   - Direct patient hours (35%)
   - Consistency over time (30%)
   - Settings variety (20%)
   - Quality of reflection (15%)

3. **Research Activities (15% weight)**
   - Project engagement (40%)
   - Output quality (30%)
   - Skills development (20%)
   - Independence (10%)

4. **Leadership & Service (15% weight)**
   - Impact measurement (35%)
   - Sustained commitment (30%)
   - Role progression (20%)
   - Community engagement (15%)

5. **Technical Skills (10% weight)**
   - Healthcare competencies (40%)
   - Data/analytical (30%)
   - Communication (20%)
   - Professional development (10%)

6. **Specialty Preparation (10% weight)**
   - Specialty exposure (40%)
   - Experience alignment (30%)
   - Career planning (20%)
   - Network development (10%)

**Note**: Sub-weights provided as guidance, not rigid formulas. AI applies professional judgment.

---

## AI Analysis Approach

### "Jazz Charts" Philosophy

**Principle**: The AI is given framework benchmarks like a jazz musician gets chord charts—structure to guide improvisation, not a rigid score.

**How It Works**:

1. **Benchmarks as Reference Points**
   - "Research-Intensive expects 1,200-1,500+ hours"
   - "Mission-Driven median MCAT: ~508.5"
   - AI uses these to calibrate, not calculate

2. **Professional Judgment Applied**
   ```
   Student A: 800 research hours, all in one lab, 2 publications
   Student B: 800 research hours, 4 different labs, 0 publications

   Rigid Formula: Both score 65/100
   Jazz Charts: Student A scores 75, Student B scores 55

   Why? Longitudinal commitment + outputs > scattered involvement
   ```

3. **Context Matters**
   - Non-traditional pathway? Adjust expectations
   - Upward GPA trend? Weight recent performance
   - Gap year research? Different from undergrad research
   - Community college transfer? Mission-Driven boost

4. **Cohort-Specific Scoring**
   - Same profile may score differently for different cohorts
   - 3.5 GPA + 508 MCAT = competitive for Mission-Driven
   - 3.5 GPA + 508 MCAT = below average for Research-Intensive

### Scoring Principles

**Embedded in prompt**:

1. Weight recent experiences more heavily (but value sustained early involvement)
2. Growth trajectory thinking (consistent progression rewarded)
3. Time horizon adjustment (2026 vs 2028 cycle = different runway)
4. Holistic context (personal circumstances, non-traditional paths)
5. Quality over quantity (always)

**Score Ranges**:
- **40-60**: Developing (significant gaps, needs substantial work)
- **60-75**: Emerging (on track but needs strengthening)
- **75-85**: Competitive (solid foundation, minor gaps)
- **85-95**: Exceptional (exceeds benchmarks)
- **95-100**: Outstanding (top-tier, rare)

### Fit Analysis Guidelines

**AI is instructed to provide 2-3 sentences (60-90 words) per cohort**:

- **Opening**: Acknowledge specific strengths
  - "Your 350 research hours in computational biology..."
- **Middle**: Cite framework benchmarks
  - "Research-Intensive schools expect 1,200+ hours with 2-5 publications..."
- **Closing**: 1-2 concrete, actionable recommendations
  - "Focus next year on securing a first-author publication and building clinical hours to 200+ via scribing"

**Tone**: Encouraging but honest, like a trusted advisor

---

## Key Design Decisions

### 1. Why Embedded Prompt vs Separate Documents?

**Decision**: Embed complete framework in prompt text

**Alternatives Considered**:
- Extended thinking with separate documents
- Pre-processing with smaller model
- Retrieval from vector database

**Rationale**:
- ✅ Direct control over exact context
- ✅ Faster response (no extended thinking overhead)
- ✅ More cost-effective
- ✅ Easier to version control and iterate
- ✅ Framework is stable and well-defined (~17KB text)

**Trade-offs**:
- ❌ Large prompt size (~6-7K tokens)
- ❌ Framework updates require code deploy
- ✅ But: Updates are infrequent, precision matters more than flexibility

### 2. Why 30 Questions vs Document Upload?

**Decision**: Comprehensive questionnaire instead of CV/transcript for MVP

**Rationale**:
- ✅ Structured data easier to analyze consistently
- ✅ No parsing challenges (diverse formats, OCR errors)
- ✅ Forces honest self-assessment (brackets vs embellished claims)
- ✅ Faster user experience (no upload/processing time)
- ✅ Captures exact data points needed for framework

**Future Enhancement**: Add transcript/CV upload as supplementary context (Phase 2/3)

### 3. Why Claude Sonnet 4.5?

**Decision**: Use Sonnet 4.5 instead of Opus 4 or Haiku 4

**Comparison**:
| Model | Speed | Cost | Quality | Best For |
|-------|-------|------|---------|----------|
| Haiku 4.5 | Fastest | Lowest | Good | Simple classification |
| Sonnet 4.5 | Fast | Moderate | Excellent | **Nuanced analysis** ✅ |
| Opus 4.5 | Slower | Highest | Best | Complex reasoning |

**Rationale**:
- ✅ Excellent at nuanced judgment (the "jazz charts" capability)
- ✅ 8-15 sec response time (acceptable for UX)
- ✅ ~$0.08/analysis (reasonable for MVP)
- ✅ Handles complex prompt with framework well
- ❌ Opus: Too expensive for marginal quality gain
- ❌ Haiku: Too formulaic, misses subtlety

### 4. Why JSON Output Format?

**Decision**: Require AI to return structured JSON, not prose

**Rationale**:
- ✅ Predictable parsing (no regex/NLP extraction)
- ✅ Type-safe in TypeScript
- ✅ Enables progressive rendering (scores → analyses)
- ✅ Easier to validate and handle errors

**Implementation**:
```typescript
// Prompt explicitly states:
"Return ONLY valid JSON (no markdown, no code blocks, no extra text)"

// With exact schema:
{
  "competency_scores": { ... },
  "cohort_rankings": [ ... ]
}
```

---

## Error Handling

### Client-Side

**QuestionnaireForm**:
```typescript
// Validation before submit
const validateForm = () => {
  questions.forEach(q => {
    if (!formData[q.id] || formData[q.id] === '') {
      errors[q.id] = 'This field is required';
    }
  });
};
```

**Results Page**:
```typescript
// Handle API errors gracefully
try {
  const response = await fetch('/api/analyze', { ... });
  if (!response.ok) throw new Error('Analysis failed');
  const data = await response.json();
} catch (error) {
  setError('Failed to analyze profile. Please try again.');
}
```

### Server-Side

**API Route**:
```typescript
// Validate request
if (!responses || typeof responses !== 'object') {
  return NextResponse.json(
    { error: 'Invalid request: missing responses' },
    { status: 400 }
  );
}

// Check API key
if (!process.env.ANTHROPIC_API_KEY) {
  return NextResponse.json(
    { error: 'API configuration error' },
    { status: 500 }
  );
}

// Parse AI response safely
try {
  analysisData = JSON.parse(textContent.text);
} catch (parseError) {
  console.error('Failed to parse:', textContent.text);
  throw new Error('Invalid JSON response from AI');
}

// Validate structure
if (!analysisData.cohort_rankings ||
    analysisData.cohort_rankings.length !== 5) {
  throw new Error('Invalid analysis structure');
}
```

---

## Performance Characteristics

### Response Times

| Stage | Time | Notes |
|-------|------|-------|
| Form submission | <100ms | Client → API |
| Prompt building | <50ms | Server-side |
| AI analysis | 8-15s | Anthropic API |
| Response parsing | <100ms | Server-side |
| **Total** | **8-15s** | User perception |

**First request**: May take 12-20s (cold start)
**Subsequent**: Typically 8-12s

### Token Usage

| Component | Tokens | Cost (Input) | Cost (Output) |
|-----------|--------|--------------|---------------|
| Framework embed | ~3,500 | $0.0105 | - |
| Student responses | ~1,500 | $0.0045 | - |
| System instructions | ~1,000 | $0.0030 | - |
| AI response | ~3,500 | - | $0.0525 |
| **Total** | **~10,000** | **$0.018** | **$0.0525** |

**Cost per analysis**: ~$0.07-$0.10

**Pricing** (as of Jan 2025):
- Input: $3.00 per 1M tokens
- Output: $15.00 per 1M tokens

### Scalability

**Current Architecture**:
- Next.js API routes (serverless on Vercel)
- No database (stateless)
- No caching (each analysis fresh)

**Bottleneck**: Anthropic API rate limits

**Capacity**:
- Tier 1 (default): 50 requests/minute
- Tier 2: 1,000 requests/minute
- Tier 3+: Custom limits

**For production at scale**, consider:
- Response caching (if same questionnaire = same analysis)
- Database storage (save analyses, enable progress tracking)
- Rate limiting on client (prevent abuse)
- Queue system for high traffic

---

## Security Considerations

### API Key Protection

**Never expose** `ANTHROPIC_API_KEY` to client:
- ✅ Stored in `.env.local` (git-ignored)
- ✅ Used only in API route (server-side)
- ✅ Not included in client bundle
- ✅ Vercel: Environment variable in dashboard

### Input Validation

**Sanitize user input**:
- All questionnaire responses are structured (select/checkbox/scale)
- No free-text input (XSS risk eliminated)
- Server-side validation before sending to AI

### Rate Limiting

**Consider adding** (not in MVP):
```typescript
// Example: Vercel Edge Config + KV
import { ratelimit } from '@/lib/ratelimit';

const { success } = await ratelimit.limit(
  request.ip ?? 'anonymous'
);
if (!success) {
  return new Response('Too many requests', { status: 429 });
}
```

---

## Future Architecture Considerations

### Phase 2: Transcript Upload

**New Components**:
- File upload UI (`<input type="file" accept=".pdf">`)
- PDF parsing library (pdf-parse or similar)
- GPA extraction logic (regex + validation)
- Transcript data merged with questionnaire

**Changes to Analysis**:
- Override GPA brackets with exact GPA
- Extract BCPM (science) GPA separately
- Identify academic trends (upward/downward)
- Flag anomalies (W's, retakes, pass/fail)

### Phase 3: Resume Upload

**New Components**:
- Multi-format support (PDF, DOCX)
- Text extraction (mammoth.js for DOCX)
- Structured parsing (activities, dates, roles)

**Changes to Analysis**:
- Use questionnaire as baseline
- Resume provides narrative context
- AI reconciles discrepancies (favor objective data)

### Phase 4: Follow-Up Questions

**New Flow**:
```
Initial Analysis
  ↓
AI identifies gaps/ambiguities
  ↓
Generate 3 targeted questions
  ↓
User responds (text input)
  ↓
Refined Analysis (better accuracy)
```

**Example Questions**:
- "Your transcript shows a C in Organic Chem. What happened?"
- "800 research hours but no publications—can you describe your role?"
- "You mention underserved work but low leadership scores. Can you clarify?"

---

## Related Documentation

- **[SETUP.md](SETUP.md)** - Get the system running
- **[DEVELOPMENT.md](DEVELOPMENT.md)** - Testing and deployment
- **[docs/QUESTIONNAIRE.md](docs/QUESTIONNAIRE.md)** - 30-question specification
- **[docs/COHORT_FRAMEWORK.md](docs/COHORT_FRAMEWORK.md)** - Complete framework details
- **[docs/CHANGELOG.md](docs/CHANGELOG.md)** - Version history

---

**Questions about architecture?** Email: dgmulei@gmail.com
