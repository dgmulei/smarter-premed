# Test Profiles for AI Analysis Validation

**Purpose**: Systematic testing of Smarter Pre-Med AI analysis across diverse student archetypes.

**Date Created**: January 19, 2026

---

## How to Use These Profiles

1. Start the local development server: `npm run dev`
2. Navigate to http://localhost:3000
3. Copy the response data for each profile from below
4. Fill out the questionnaire form
5. Review the AI analysis results
6. Compare against "Expected Results" for each profile

---

## Profile A: Research-Intensive Student

**Archetype**: Classic research powerhouse, some clinical gaps
**Expected Cohort Ranking**: Research-Intensive (1st), Clinical-Investigative (2nd)
**Expected Strengths**: Academic Rigor (80-90), Research Activities (85-95)
**Expected Weaknesses**: Clinical Exposure (50-65), Leadership & Service (55-70)

### Complete Questionnaire Responses:

**Research Experience (Q1-5)**
- Q1 (research_hours_total): "800-1,200 hours"
- Q2 (research_hours_weekly): "15-20 hours/week"
- Q3 (research_types): ["Basic science/lab research", "Data analysis/computational"]
- Q4 (research_leadership): "Led independent project/sub-project"
- Q5 (research_outputs): "Published (co-author) or accepted for publication"

**Clinical Experience (Q6-12)**
- Q6 (clinical_hours_hs): "0-100 hours"
- Q7 (clinical_hours_college): "100-300 hours"
- Q8 (clinical_settings): ["Hospital/inpatient"]
- Q9 (patient_interaction_intensity): "Direct patient contact (hands-on care)"
- Q10 (underserved_hours): "0-50 hours"
- Q11 (certification_plans): "Will obtain before applying"
- Q12 (certification_hours_weekly): "Not currently working as EMT/CNA"

**Academic Performance (Q13-19)**
- Q13 (gpa): "3.7-3.89"
- Q14 (mcat): "515-519"
- Q15 (academic_preparedness): "4 - Very prepared"
- Q16 (academic_improvement_areas): ["None - academically very strong"]
- Q17 (academic_strengths): ["STEM coursework", "Research methods"]
- Q18 (mcat_confidence): "5 - Very confident (scored at or above goal)"
- Q19 (gpa_confidence): "4 - Confident (upward trend or strong overall)"

**Leadership & Service (Q20-23)**
- Q20 (leadership_roles_count): "1-2 significant roles"
- Q21 (service_scale): "3 - Moderate community engagement"
- Q22 (extracurricular_hours_weekly): "5-10 hours/week"
- Q23 (service_outcomes): "Participated regularly, some documented impact"

**Vision & Strategy (Q24-30)**
- Q24 (application_gaps): ["Limited community service", "Limited underserved/diverse populations exposure"]
- Q25 (primary_focus): ["Academic research", "Maintaining/improving academic metrics"]
- Q26 (greatest_weakness): "Limited breadth of clinical exposure or lack of longitudinal clinical experience"
- Q27 (future_contributions): ["Medical research/academic medicine", "Advancing medical knowledge through research"]
- Q28 (target_cycle): "Next cycle (1 year away)"
- Q29 (timeline_flexibility): "Flexible - willing to take gap year(s) if needed"
- Q30 (academic_history_flags): ["None - clean academic record"]

---

## Profile B: Service-Oriented Student

**Archetype**: Mission-driven, community-focused, lower research
**Expected Cohort Ranking**: Mission-Driven (1st), Patient-Centered (2nd)
**Expected Strengths**: Clinical Exposure (75-85), Leadership & Service (80-90)
**Expected Weaknesses**: Research Activities (40-55), Academic Rigor (65-75)

### Complete Questionnaire Responses:

**Research Experience (Q1-5)**
- Q1 (research_hours_total): "50-200 hours"
- Q2 (research_hours_weekly): "1-5 hours/week"
- Q3 (research_types): ["Community health/public health"]
- Q4 (research_leadership): "Contributed as team member"
- Q5 (research_outputs): "Poster presentation at local/regional conference"

**Clinical Experience (Q6-12)**
- Q6 (clinical_hours_hs): "100-300 hours"
- Q7 (clinical_hours_college): "500-1,000 hours"
- Q8 (clinical_settings): ["Community clinic", "Rural/underserved area", "Public health/community outreach"]
- Q9 (patient_interaction_intensity): "Direct patient contact (hands-on care)"
- Q10 (underserved_hours): "500+ hours"
- Q11 (certification_plans): "Already certified (EMT, CNA, etc.)"
- Q12 (certification_hours_weekly): "10-15 hours/week"

**Academic Performance (Q13-19)**
- Q13 (gpa): "3.5-3.69"
- Q14 (mcat): "508-511"
- Q15 (academic_preparedness): "3 - Adequately prepared"
- Q16 (academic_improvement_areas): ["MCAT score"]
- Q17 (academic_strengths): ["Communication skills", "Clinical/patient interaction skills"]
- Q18 (mcat_confidence): "3 - Neutral (scored near goal, considering retake)"
- Q19 (gpa_confidence): "3 - Neutral (some ups and downs)"

**Leadership & Service (Q20-23)**
- Q20 (leadership_roles_count): "3-4 significant roles"
- Q21 (service_scale): "5 - Extensive sustained service (founded org, major impact)"
- Q22 (extracurricular_hours_weekly): "15-20 hours/week"
- Q23 (service_outcomes): "Created lasting impact, measurable outcomes (expanded program, served X people)"

**Vision & Strategy (Q24-30)**
- Q24 (application_gaps): ["Limited research experience", "Lower academic metrics (GPA/MCAT)"]
- Q25 (primary_focus): ["Building clinical experience", "Community service/volunteer work"]
- Q26 (greatest_weakness): "Limited research experience or academic profile concerns (GPA/MCAT)"
- Q27 (future_contributions): ["Serving underserved populations", "Primary care/community medicine"]
- Q28 (target_cycle): "Next cycle (1 year away)"
- Q29 (timeline_flexibility): "Flexible - willing to take gap year(s) if needed"
- Q30 (academic_history_flags): ["Grade replacement/retakes (improved grades)"]

---

## Profile C: Balanced Student

**Archetype**: Solid across the board, no major spikes
**Expected Cohort Ranking**: Patient-Centered (1st), Community-Clinical (2nd)
**Expected Strengths**: All competencies 65-75 range
**Expected Weaknesses**: No standout weaknesses, but no standout strengths

### Complete Questionnaire Responses:

**Research Experience (Q1-5)**
- Q1 (research_hours_total): "200-500 hours"
- Q2 (research_hours_weekly): "5-10 hours/week"
- Q3 (research_types): ["Clinical research"]
- Q4 (research_leadership): "Contributed as team member"
- Q5 (research_outputs): "Manuscript in preparation or submitted"

**Clinical Experience (Q6-12)**
- Q6 (clinical_hours_hs): "100-300 hours"
- Q7 (clinical_hours_college): "300-500 hours"
- Q8 (clinical_settings): ["Hospital/inpatient", "Outpatient clinic"]
- Q9 (patient_interaction_intensity): "Direct patient contact (hands-on care)"
- Q10 (underserved_hours): "100-300 hours"
- Q11 (certification_plans): "Already certified (EMT, CNA, etc.)"
- Q12 (certification_hours_weekly): "5-10 hours/week"

**Academic Performance (Q13-19)**
- Q13 (gpa): "3.7-3.89"
- Q14 (mcat): "512-514"
- Q15 (academic_preparedness): "4 - Very prepared"
- Q16 (academic_improvement_areas): ["None - academically very strong"]
- Q17 (academic_strengths): ["STEM coursework", "Clinical/patient interaction skills"]
- Q18 (mcat_confidence): "4 - Confident (scored at or near goal)"
- Q19 (gpa_confidence): "4 - Confident (upward trend or strong overall)"

**Leadership & Service (Q20-23)**
- Q20 (leadership_roles_count): "3-4 significant roles"
- Q21 (service_scale): "4 - Significant involvement (leadership role, multi-year)"
- Q22 (extracurricular_hours_weekly): "10-15 hours/week"
- Q23 (service_outcomes): "Led initiative with clear outcomes (organized events, recruited volunteers)"

**Vision & Strategy (Q24-30)**
- Q24 (application_gaps): ["None - feel well-prepared"]
- Q25 (primary_focus): ["Building clinical experience", "Leadership development"]
- Q26 (greatest_weakness): "Time management or balancing multiple commitments"
- Q27 (future_contributions): ["Patient-centered clinical care", "Medical education/mentorship"]
- Q28 (target_cycle): "Next cycle (1 year away)"
- Q29 (timeline_flexibility): "Moderately flexible - prefer specific timeline but can adjust"
- Q30 (academic_history_flags): ["None - clean academic record"]

---

## Profile D: Developing Student

**Archetype**: Lower stats, limited hours, early in journey
**Expected Cohort Ranking**: Community-Clinical or Patient-Centered (depending on trajectory narrative)
**Expected Strengths**: Potential growth trajectory, honesty about gaps
**Expected Weaknesses**: Academic Rigor (50-60), Research Activities (30-45), Clinical Exposure (45-60)

### Complete Questionnaire Responses:

**Research Experience (Q1-5)**
- Q1 (research_hours_total): "0-50 hours"
- Q2 (research_hours_weekly): "Not currently engaged"
- Q3 (research_types): ["No research experience yet"]
- Q4 (research_leadership): "Minimal/no involvement"
- Q5 (research_outputs): "No outputs yet"

**Clinical Experience (Q6-12)**
- Q6 (clinical_hours_hs): "0-100 hours"
- Q7 (clinical_hours_college): "100-300 hours"
- Q8 (clinical_settings): ["Hospital/inpatient"]
- Q9 (patient_interaction_intensity): "Observation (shadowing, no hands-on)"
- Q10 (underserved_hours): "0-50 hours"
- Q11 (certification_plans): "Plan to obtain eventually (not immediate priority)"
- Q12 (certification_hours_weekly): "Not currently working as EMT/CNA"

**Academic Performance (Q13-19)**
- Q13 (gpa): "3.3-3.49"
- Q14 (mcat): "Not yet taken"
- Q15 (academic_preparedness): "2 - Somewhat underprepared"
- Q16 (academic_improvement_areas): ["STEM coursework (struggling)", "MCAT score", "Study skills/time management"]
- Q17 (academic_strengths): ["Work ethic/determination"]
- Q18 (mcat_confidence): "1 - Not confident (haven't taken yet or need significant prep)"
- Q19 (gpa_confidence): "2 - Concerned (downward trend or academic struggles)"

**Leadership & Service (Q20-23)**
- Q20 (leadership_roles_count): "1-2 significant roles"
- Q21 (service_scale): "2 - Some regular involvement"
- Q22 (extracurricular_hours_weekly): "1-5 hours/week"
- Q23 (service_outcomes): "Participated occasionally, minimal documentation"

**Vision & Strategy (Q24-30)**
- Q24 (application_gaps): ["Limited research experience", "Limited clinical hours", "Lower academic metrics (GPA/MCAT)", "Limited community service", "Limited underserved/diverse populations exposure"]
- Q25 (primary_focus): ["Maintaining/improving academic metrics", "Building clinical experience", "MCAT preparation"]
- Q26 (greatest_weakness): "Limited research experience or academic profile concerns (GPA/MCAT)"
- Q27 (future_contributions): ["Patient-centered clinical care"]
- Q28 (target_cycle): "2+ years away"
- Q29 (timeline_flexibility): "Very flexible - still exploring timeline"
- Q30 (academic_history_flags): ["Multiple withdrawals or incomplete grades", "Academic probation or warning (recovered)"]

---

## Profile E: Non-Traditional Student

**Archetype**: Gap years, career change, growth trajectory, unique path
**Expected Cohort Ranking**: Patient-Centered (1st), Community-Clinical (2nd)
**Expected Strengths**: Clinical Exposure (75-85), Leadership & Service (70-80), compelling narrative
**Expected Weaknesses**: Research Activities (45-60), some academic recovery needed

### Complete Questionnaire Responses:

**Research Experience (Q1-5)**
- Q1 (research_hours_total): "50-200 hours"
- Q2 (research_hours_weekly): "1-5 hours/week"
- Q3 (research_types): ["Clinical research", "Community health/public health"]
- Q4 (research_leadership): "Contributed as team member"
- Q5 (research_outputs): "Poster presentation at local/regional conference"

**Clinical Experience (Q6-12)**
- Q6 (clinical_hours_hs): "0-100 hours"
- Q7 (clinical_hours_college): "1,000+ hours"
- Q8 (clinical_settings): ["Hospital/inpatient", "Emergency department", "Community clinic", "Long-term care/hospice"]
- Q9 (patient_interaction_intensity): "Direct patient contact (hands-on care)"
- Q10 (underserved_hours): "300-500 hours"
- Q11 (certification_plans): "Already certified (EMT, CNA, etc.)"
- Q12 (certification_hours_weekly): "20+ hours/week (working part/full-time)"

**Academic Performance (Q13-19)**
- Q13 (gpa): "3.5-3.69"
- Q14 (mcat): "510-512"
- Q15 (academic_preparedness): "4 - Very prepared"
- Q16 (academic_improvement_areas): ["GPA (improved with post-bacc or recent coursework)"]
- Q17 (academic_strengths): ["Clinical/patient interaction skills", "Life experience/maturity", "Communication skills"]
- Q18 (mcat_confidence): "4 - Confident (scored at or near goal)"
- Q19 (gpa_confidence): "4 - Confident (upward trend or strong overall)"

**Leadership & Service (Q20-23)**
- Q20 (leadership_roles_count): "5+ significant roles"
- Q21 (service_scale): "4 - Significant involvement (leadership role, multi-year)"
- Q22 (extracurricular_hours_weekly): "10-15 hours/week"
- Q23 (service_outcomes): "Led initiative with clear outcomes (organized events, recruited volunteers)"

**Vision & Strategy (Q24-30)**
- Q24 (application_gaps): ["Limited research experience"]
- Q25 (primary_focus): ["Building clinical experience", "Community service/volunteer work", "Personal statement/narrative development"]
- Q26 (greatest_weakness): "Non-traditional path or extended timeline (explaining gap years, career change)"
- Q27 (future_contributions): ["Serving underserved populations", "Primary care/community medicine", "Patient advocacy/healthcare policy"]
- Q28 (target_cycle): "Next cycle (1 year away)"
- Q29 (timeline_flexibility): "Committed to specific timeline (need to apply soon)"
- Q30 (academic_history_flags): ["Post-bacc or GPA repair coursework (upward trend)", "Transfer student (multiple institutions)"]

---

## Evaluation Criteria

### Scoring Accuracy
- **Good**: Scores differentiate meaningfully (not all clustered 65-75)
- **Good**: Scores align with profile strengths/weaknesses
- **Bad**: All competencies within 10-point range (generic)
- **Bad**: High scores for weak areas or low scores for strong areas

### Cohort Ranking Logic
- **Good**: Top cohort aligns with profile archetype
- **Good**: Fit scores show meaningful differences (not all 70-80)
- **Good**: Rationale cites specific benchmarks and data points
- **Bad**: Generic rankings with similar fit scores
- **Bad**: Rationale doesn't reference framework or questionnaire data

### Analysis Text Quality
- **Good**: Specific and actionable ("You have 800 research hours, which meets Research-Intensive benchmark of 1,200+ but...")
- **Good**: Cites actual benchmarks from framework
- **Good**: Balanced tone (acknowledges strengths and gaps)
- **Good**: Provides strategic guidance based on target cycle
- **Bad**: Generic platitudes ("You're a strong candidate")
- **Bad**: Doesn't cite specific data points or benchmarks
- **Bad**: Overly optimistic or overly pessimistic tone

---

## Testing Checklist

- [ ] Profile A (Research-Intensive): Test and evaluate
- [ ] Profile B (Service-Oriented): Test and evaluate
- [ ] Profile C (Balanced): Test and evaluate
- [ ] Profile D (Developing): Test and evaluate
- [ ] Profile E (Non-Traditional): Test and evaluate
- [ ] Overall assessment: Are scores differentiating appropriately?
- [ ] Overall assessment: Are cohort rankings logical and well-justified?
- [ ] Overall assessment: Is analysis text specific and actionable?
- [ ] Decision: Do prompts need refinement? If yes, document specific issues

---

**Next Steps After Testing:**
1. If satisfied → Proceed to production build test (`npm run build`)
2. If refinement needed → Document specific issues and adjust prompts in `/app/api/analyze/route.ts`
3. After refinement → Retest with same profiles to verify improvements
