'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import RadarChart from '@/components/RadarChart';
import { COHORT_ARCHETYPES, MOCK_USER_PROFILE } from '@/lib/cohortData';

interface CohortRanking {
  name: string;
  fitScore: number;
  fitAnalysis: string;
}

interface UserScores {
  academic_rigor: number;
  clinical_exposure: number;
  research_activities: number;
  leadership_service: number;
  technical_skills: number;
  specialty_preparation: number;
}

interface AnalysisData {
  profileSummary: string;
  userScores: UserScores;
  rankedCohorts: CohortRanking[];
}

export default function Results() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCohort, setSelectedCohort] = useState<string>('Clinical-Investigative');
  const [showSchools, setShowSchools] = useState(false);
  const [isTextTransitioning, setIsTextTransitioning] = useState(false);
  const [showCohortModal, setShowCohortModal] = useState(false);
  const [showMethodology, setShowMethodology] = useState(false);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  // Refs for scroll targets
  const chartRef = useRef<HTMLDivElement>(null);
  const analysisRef = useRef<HTMLDivElement>(null);

  // Loading messages that rotate during AI analysis
  const loadingMessages = [
    "Understanding your profile...",
    "Comparing to 173 AAMC mission statements...",
    "Assessing your strengths...",
    "Analyzing competency gaps...",
    "Calculating fit scores...",
    "Crafting personalized insights...",
    "Finalizing your results..."
  ];

  // Rotate loading messages every 3.5 seconds
  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setLoadingMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isLoading, loadingMessages.length]);

  // State for AI analysis results
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);

  // Color mapping for rank indicators (Teal to Warm Neutrals)
  const getRankColor = (rank: number): string => {
    const colors = {
      1: '#0d9488', // brand teal
      2: '#0891b2', // cyan-teal
      3: '#6b7280', // cool gray
      4: '#78716c', // warm gray
      5: '#a8a29e', // light warm gray
    };
    return colors[rank as keyof typeof colors] || colors[5];
  };

  const getRankLabel = (rank: number): string => {
    const labels = {
      1: 'Your Best Fit',
      2: 'Second Fit',
      3: 'Third Fit',
      4: 'Fourth Fit',
      5: 'Least Fit',
    };
    return labels[rank as keyof typeof labels] || '';
  };

  const getShortCohortName = (cohortName: string): string => {
    const shortNames: Record<string, string> = {
      'Research-Intensive': 'Discover',
      'Clinical-Investigative': 'Translate',
      'Community-Clinical': 'Community',
      'Patient-Centered': 'Bedside',
      'Mission-Driven': 'Mission',
    };
    return shortNames[cohortName] || cohortName;
  };

  // Cohort information for modal
  const getCohortInfo = (cohortName: string) => {
    const cohortInfo: Record<string, { description: string; schools: string[]; archetype: string; superpower: string }> = {
      'Research-Intensive': {
        description: 'Research powerhouses with high NIH funding, MD-PhD programs, and cutting-edge technologies. These schools train physician-scientists who advance medical knowledge through investigation.',
        schools: [
          'Harvard Medical School',
          'Johns Hopkins University',
          'Stanford University',
          'Yale School of Medicine',
          'Washington University in St. Louis',
          'University of Pennsylvania Perelman',
          'UCSF',
          'University of Michigan',
          'Duke University',
          'University of Wisconsin-Madison'
        ],
        archetype: 'Dr. Paul Farmer (global health pioneer), Dr. Atul Gawande (surgeon-writer), Dr. Siddhartha Mukherjee (oncologist-author), Dr. Jennifer Doudna (CRISPR pioneer), Dr. Gregory House (House M.D.)',
        superpower: 'These are **scientific investigators** who push the boundaries of medical knowledge. Their superpower: asking "why?" and "what if?" until they unlock breakthroughs that change how we treat disease.'
      },
      'Clinical-Investigative': {
        description: 'Bridge builders between bench and bedside. These schools integrate clinical trials with patient care, training physicians who apply research discoveries directly to treatment.',
        schools: [
          'UCSF',
          'Columbia University',
          'Duke University',
          'Northwestern Feinberg',
          'University of Pennsylvania Perelman',
          'NYU Grossman',
          'Vanderbilt University',
          'Icahn School of Medicine at Mount Sinai',
          'Emory University',
          'USC Keck'
        ],
        archetype: 'Dr. Eric Topol (digital medicine innovator), Dr. Vivek Murthy (U.S. Surgeon General), Dr. Lisa Sanders (diagnostician-writer), Dr. Cristina Yang (Grey\'s Anatomy), Dr. Shaun Murphy (The Good Doctor)',
        superpower: 'These are **bridge builders** who take discoveries from the lab and bring them to patients\' bedsides. Their superpower: seeing how research and real-world care strengthen each other.'
      },
      'Patient-Centered': {
        description: 'Master communicators and empathetic caregivers. These schools emphasize patient relationships, cultural competency, and longitudinal clinical experiences from day one.',
        schools: [
          'University of Chicago Pritzker',
          'University of Virginia',
          'Case Western Reserve',
          'Dartmouth Geisel',
          'University of Rochester',
          'Weill Cornell Medicine',
          'Wake Forest',
          'Ohio State University',
          'Loyola Stritch',
          'Penn State College of Medicine'
        ],
        archetype: 'Dr. Abraham Verghese (bedside advocate), Dr. Danielle Ofri (narrative medicine), Dr. Lucy Kalanithi (palliative care), Dr. Meredith Grey (Grey\'s Anatomy), Dr. John Carter (ER)',
        superpower: 'These are **master healers** who understand that medicine is as much about listening as diagnosing. Their superpower: building trust and connection that makes patients feel truly seen and cared for.'
      },
      'Community-Clinical': {
        description: 'Community health champions focused on primary care, public health, and addressing local health needs through service and research partnerships.',
        schools: [
          'University of Washington',
          'UNC Chapel Hill',
          'University of Pittsburgh',
          'UC Davis',
          'University of Minnesota',
          'University of Colorado',
          'Oregon Health & Science',
          'Tulane University',
          'Georgetown University',
          'University of Massachusetts'
        ],
        archetype: 'Dr. Jim Withers (street medicine founder), Dr. Nadine Burke Harris (ACEs researcher), Dr. Leana Wen (public health leader), Dr. Miranda Bailey (Grey\'s Anatomy), Dr. Kerry Weaver (ER)',
        superpower: 'These are **community champions** who meet patients where they are and address health at the neighborhood level. Their superpower: seeing the social forces shaping health and organizing care that reaches the hardest-to-reach.'
      },
      'Mission-Driven': {
        description: 'Health equity warriors dedicated to eliminating disparities. These schools train physicians committed to serving underserved communities and addressing systemic healthcare injustice.',
        schools: [
          'Howard University',
          'Morehouse School of Medicine',
          'University of New Mexico',
          'Virginia Commonwealth University',
          'CUNY School of Medicine',
          'UC Riverside',
          'Charles R. Drew University',
          'Meharry Medical College',
          'University of Arizona',
          'University of Alabama Birmingham'
        ],
        archetype: 'Dr. Regina Benjamin (rural health advocate), Dr. Camara Phyllis Jones (health equity researcher), Dr. Jim Yong Kim (global health leader), Dr. Mark Greene (ER), Dr. Peter Benton (ER)',
        superpower: 'These are **equity warriors** who fight systemic injustice in healthcare. Their superpower: unwavering commitment to serving communities that the system has failed, transforming compassion into action.'
      }
    };

    return cohortInfo[cohortName] || { description: '', schools: [], archetype: '', superpower: '' };
  };

  // Scroll functions for nudge bars
  const scrollToChart = () => {
    chartRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToAnalysis = () => {
    analysisRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleCohortChange = (cohortName: string) => {
    if (cohortName === selectedCohort) return;
    setIsTextTransitioning(true);
    setTimeout(() => {
      setSelectedCohort(cohortName);
      setShowSchools(false);
      setIsTextTransitioning(false);
    }, 150);
  };

  // Use real data if available, otherwise fall back to mock data
  const userProfile = analysisData ? { scores: analysisData.userScores } : MOCK_USER_PROFILE;
  const cohortData = COHORT_ARCHETYPES[selectedCohort];

  const rankedCohorts = analysisData?.rankedCohorts || [
    { name: 'Clinical-Investigative', fitScore: 0, fitAnalysis: '' },
    { name: 'Research-Intensive', fitScore: 0, fitAnalysis: '' },
    { name: 'Community-Clinical', fitScore: 0, fitAnalysis: '' },
    { name: 'Patient-Centered', fitScore: 0, fitAnalysis: '' },
    { name: 'Mission-Driven', fitScore: 0, fitAnalysis: '' },
  ];

  // Build fit analyses from API data
  const fitAnalyses: Record<string, string> = {};
  rankedCohorts.forEach(cohort => {
    fitAnalyses[cohort.name] = cohort.fitAnalysis;
  });

  useEffect(() => {
    const fetchAnalysis = async () => {
      // Guard against SSR/hydration issues
      if (typeof window === 'undefined') {
        return;
      }

      let responses: string | null = null;
      try {
        responses = sessionStorage.getItem('questionnaireResponses');
      } catch {
        // sessionStorage access failed (private browsing, etc.)
        router.push('/');
        return;
      }

      if (!responses) {
        router.push('/');
        return;
      }

      let parsedResponses;
      try {
        parsedResponses = JSON.parse(responses);
      } catch {
        // Corrupted sessionStorage data
        sessionStorage.removeItem('questionnaireResponses');
        router.push('/');
        return;
      }

      try {
        // Call the analysis API with 90-second timeout and retry logic
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 90000); // 90 second timeout

        let lastError: Error | null = null;
        let response: Response | null = null;
        const MAX_RETRIES = 2;

        for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
          try {
            console.log(`API request attempt ${attempt}/${MAX_RETRIES}`);

            response = await fetch('/api/analyze', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ responses: parsedResponses }),
              signal: controller.signal,
            });

            clearTimeout(timeoutId);
            break; // Success - exit retry loop
          } catch (fetchError) {
            console.error(`Attempt ${attempt} failed:`, fetchError);
            lastError = fetchError instanceof Error ? fetchError : new Error('Network error');

            // If it's the last attempt, throw
            if (attempt === MAX_RETRIES) {
              throw lastError;
            }

            // Wait 2 seconds before retry (allows cold start to complete)
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
        }

        if (!response) {
          throw lastError || new Error('Failed to get response');
        }

        if (!response.ok) {
          let errorMessage = 'Failed to analyze profile';
          try {
            const errorData = await response.json();
            errorMessage = errorData.error || errorMessage;
          } catch {
            // Response wasn't valid JSON
          }
          throw new Error(errorMessage);
        }

        const data: AnalysisData = await response.json();
        setAnalysisData(data);

        // Set the first ranked cohort as selected by default
        if (data.rankedCohorts?.length > 0) {
          setSelectedCohort(data.rankedCohorts[0].name);
        }

        setIsLoading(false);
      } catch (err) {
        console.error('Analysis error:', err);

        // Better error messages for users
        let userMessage = 'Failed to analyze profile';
        if (err instanceof Error) {
          if (err.name === 'AbortError') {
            userMessage = 'Analysis timed out. Please try again - it should be faster on the second attempt.';
          } else if (err.message.includes('fetch')) {
            userMessage = 'Network error. Please check your connection and try again.';
          } else {
            userMessage = err.message;
          }
        }

        setError(userMessage);
        setIsLoading(false);
      }
    };

    fetchAnalysis();
  }, [router]);

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-atmosphere">
        <div className="text-center animate-fadeUp">
          <div className="w-8 h-8 border-[1.5px] border-gray-200 border-t-gray-600 rounded-full animate-spin mx-auto mb-5"></div>
          <p className="text-[15px] text-[#86868b] transition-opacity duration-300">
            {loadingMessages[loadingMessageIndex]}
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-atmosphere px-6">
        <div className="max-w-md text-center animate-fadeUp">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-[#1d1d1f] mb-2">Analysis Error</h2>
          <p className="text-[15px] text-[#515154] mb-6">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="px-5 py-3 rounded-full bg-[#0071e3] hover:bg-[#0077ed] active:bg-[#006edb] text-white text-[15px] font-medium transition-all duration-200 shadow-[0_2px_8px_rgba(0,113,227,0.35)]"
          >
            Start Over
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-atmosphere">
      <div className="results-loading-container">

        {/* Content */}
        <div className="flex flex-col">

          {/* Branded Header */}
          <div className="form-card px-6 py-6 text-center mb-8 animate-fadeUp">
            <h1 className="text-4xl font-semibold text-[#1d1d1f] mb-1" style={{ fontFamily: 'Georgia, serif' }}>
              Positioned
            </h1>
            <p className="text-base text-[#0d9488]" style={{ fontFamily: 'Georgia, serif' }}>
              by Smarter Premed
            </p>
          </div>

          {/* Profile Summary */}
          {analysisData?.profileSummary && (
            <>
              <div className="form-card mb-10 animate-fadeUp" style={{ animationDelay: '0.1s' }}>
                <h2 className="text-xl font-semibold text-[#1d1d1f] mb-3 text-center" style={{ fontFamily: 'Georgia, serif' }}>
                  Where You Stand
                </h2>
                <p className="text-[15px] leading-relaxed text-[#1d1d1f]" style={{ fontFamily: 'Georgia, serif' }}>
                  {analysisData.profileSummary}
                </p>
              </div>

              {/* Scroll nudge bar */}
              <button
                onClick={scrollToChart}
                className="animate-fadeUp w-full transition-opacity duration-200 hover:opacity-100"
                style={{
                  animationDelay: '0.11s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  padding: '16px 0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#86868b" strokeWidth={2} style={{ opacity: 0.5 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>

                <p style={{
                  color: '#86868b',
                  fontSize: '10px',
                  fontWeight: '500',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  margin: 0,
                  lineHeight: 1,
                  opacity: 0.7
                }}>
                  COMPARE YOUR FIT ACROSS 5 SCHOOL TYPES
                </p>

                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#86868b" strokeWidth={2} style={{ opacity: 0.5 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </>
          )}

          {/* Chart Card */}
          <div ref={chartRef} className="form-card animate-fadeUp" style={{ animationDelay: '0.12s' }}>
            {/* Brand Overline */}
            <p className="text-[10px] text-[#86868b] uppercase tracking-[0.2em] text-center mb-3">
              Smarter Premed
            </p>

            {/* Best Fit Header - Three Lines */}
            <div
              className="text-center mb-8"
              style={{
                opacity: isTextTransitioning ? 0 : 1,
                transition: 'opacity 0.15s ease'
              }}
            >
              <p className="text-xl font-semibold text-[#1d1d1f] mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                {getRankLabel(rankedCohorts.findIndex(c => c.name === selectedCohort) + 1)}:
              </p>
              <button
                onClick={() => setShowCohortModal(true)}
                className="text-3xl font-bold transition-all duration-200 cursor-pointer mb-1 rounded-lg"
                style={{
                  fontFamily: 'Georgia, serif',
                  color: getRankColor(rankedCohorts.findIndex(c => c.name === selectedCohort) + 1),
                  border: `1px solid ${getRankColor(rankedCohorts.findIndex(c => c.name === selectedCohort) + 1)}`,
                  backgroundColor: 'transparent',
                  padding: '4px 18px'
                }}
              >
                {getShortCohortName(selectedCohort)}
              </button>
              <p className="text-base text-[#86868b]" style={{ fontFamily: 'Georgia, serif' }}>
                Med Schools
              </p>
            </div>

            {/* Legend */}
            <div className="flex justify-center mb-4 sm:mb-8" style={{ marginTop: '24px' }}>
              <div className="inline-flex items-center gap-8 px-4 py-3 border border-black/[0.08] rounded-none">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-pink-500"></div>
                  <span className="text-xs text-[#86868b]">You</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-400"></div>
                  <span className="text-xs text-[#86868b]">School Type</span>
                </div>
              </div>
            </div>

            <RadarChart
              userScores={userProfile.scores}
              cohortScores={cohortData.scores}
              showComparison={true}
            />

            {/* Radio Button Selector */}
            <div className="mt-4 sm:mt-8">
              <p className="text-[15px] text-[#0d9488] font-semibold text-center" style={{ marginBottom: '12px' }}>COMPARE ACROSS SCHOOL TYPES</p>

              {/* Mobile: Stack vertically */}
              <div className="flex flex-col gap-2.5 sm:hidden">
                {rankedCohorts.map((cohort, index) => {
                  const rank = index + 1;
                  const rankColor = getRankColor(rank);
                  const isSelected = selectedCohort === cohort.name;
                  const shortName = getShortCohortName(cohort.name);
                  return (
                    <button
                      key={cohort.name}
                      onClick={() => handleCohortChange(cohort.name)}
                      className={`
                        flex items-center gap-2 px-4 py-2.5 rounded-lg text-[14px] font-medium transition-all duration-200 w-full
                        ${isSelected
                          ? 'bg-[#1d1d1f] text-white'
                          : 'bg-black/[0.06] text-[#1d1d1f] hover:bg-black/[0.1]'
                        }
                      `}
                    >
                      <span
                        className="font-bold"
                        style={{ color: isSelected ? '#ffffff' : rankColor }}
                      >
                        {rank}
                      </span>
                      <span>
                        {shortName}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Tablet/Desktop: 2+3 grid */}
              <div className="hidden sm:flex flex-col items-center gap-2.5">
                {/* First row - top 2 */}
                <div className="flex justify-center gap-2.5">
                  {rankedCohorts.slice(0, 2).map((cohort, index) => {
                    const rank = index + 1;
                    const rankColor = getRankColor(rank);
                    const isSelected = selectedCohort === cohort.name;
                    const shortName = getShortCohortName(cohort.name);
                    return (
                      <button
                        key={cohort.name}
                        onClick={() => handleCohortChange(cohort.name)}
                        className={`
                          flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium transition-all duration-200
                          ${isSelected
                            ? 'bg-[#1d1d1f] text-white'
                            : 'bg-black/[0.06] text-[#1d1d1f] hover:bg-black/[0.1]'
                          }
                        `}
                      >
                        <span
                          className="font-bold"
                          style={{ color: isSelected ? '#ffffff' : rankColor }}
                        >
                          {rank}
                        </span>
                        <span className="whitespace-nowrap">
                          {shortName}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {/* Second row - bottom 3 */}
                <div className="flex justify-center gap-2.5">
                  {rankedCohorts.slice(2, 5).map((cohort, index) => {
                    const rank = index + 3;
                    const rankColor = getRankColor(rank);
                    const isSelected = selectedCohort === cohort.name;
                    const shortName = getShortCohortName(cohort.name);
                    return (
                      <button
                        key={cohort.name}
                        onClick={() => handleCohortChange(cohort.name)}
                        className={`
                          flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium transition-all duration-200
                          ${isSelected
                            ? 'bg-[#1d1d1f] text-white'
                            : 'bg-black/[0.06] text-[#1d1d1f] hover:bg-black/[0.1]'
                          }
                        `}
                      >
                        <span
                          className="font-bold"
                          style={{ color: isSelected ? '#ffffff' : rankColor }}
                        >
                          {rank}
                        </span>
                        <span className="whitespace-nowrap">
                          {shortName}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Scroll nudge bar */}
          <button
            onClick={scrollToAnalysis}
            className="animate-fadeUp w-full transition-opacity duration-200 hover:opacity-100"
            style={{
              animationDelay: '0.14s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              padding: '16px 0',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#86868b" strokeWidth={2} style={{ opacity: 0.5 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>

            <p style={{
              color: '#86868b',
              fontSize: '10px',
              fontWeight: '500',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              margin: 0,
              lineHeight: 1,
              opacity: 0.7
            }}>
              SEE YOUR FIT ANALYSIS FOR EACH TYPE
            </p>

            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#86868b" strokeWidth={2} style={{ opacity: 0.5 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>

          {/* Cohort Analysis Card */}
          <div
            ref={analysisRef}
            className="form-card animate-fadeUp"
            style={{
              animationDelay: '0.16s',
              borderLeft: `4px solid ${getRankColor(rankedCohorts.findIndex(c => c.name === selectedCohort) + 1)}`,
              opacity: isTextTransitioning ? 0 : 1,
              transition: 'opacity 0.15s ease, border-left-color 0.15s ease'
            }}
          >
            <h3
              className="text-lg font-semibold mb-3 text-center"
              style={{
                fontFamily: 'Georgia, serif',
              }}
            >
              How{' '}
              <span style={{ color: getRankColor(rankedCohorts.findIndex(c => c.name === selectedCohort) + 1) }}>
                <button
                  onClick={() => setShowCohortModal(true)}
                  className="font-bold transition-all duration-200 cursor-pointer rounded-md"
                  style={{
                    fontFamily: 'Georgia, serif',
                    color: getRankColor(rankedCohorts.findIndex(c => c.name === selectedCohort) + 1),
                    border: `1px solid ${getRankColor(rankedCohorts.findIndex(c => c.name === selectedCohort) + 1)}`,
                    backgroundColor: 'transparent',
                    padding: '2px 6px'
                  }}
                >
                  {getShortCohortName(selectedCohort)}
                </button>
              </span>
              {' '}Fits You
            </h3>
            <p
              className="text-[15px] leading-relaxed text-[#515154]"
              style={{
                fontFamily: 'Georgia, serif',
              }}
            >
              {fitAnalyses[selectedCohort]}
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-center animate-fadeUp" style={{ animationDelay: '0.2s', padding: '16px 0' }}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 transition-opacity duration-200 hover:opacity-100"
              style={{
                color: '#86868b',
                fontSize: '10px',
                fontWeight: '500',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                opacity: 0.7,
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#86868b" strokeWidth={2} style={{ opacity: 0.5 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              Back to the Top
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#86868b" strokeWidth={2} style={{ opacity: 0.5 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>

          {/* Methodology Button */}
          <div className="mt-6 animate-fadeUp" style={{ animationDelay: '0.24s' }}>
            <div className="flex justify-end">
              <button
                onClick={() => setShowMethodology(true)}
                className="text-[13px] text-[#86868b] hover:text-[#1d1d1f] border border-black/[0.1] rounded-md bg-white hover:bg-black/[0.02] transition-all duration-200"
                style={{ fontFamily: 'Georgia, serif', padding: '4px 18px' }}
              >
                The Whitecoat Framework
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Cohort Info Modal */}
      {showCohortModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 sm:px-6 animate-fadeUp"
          onClick={() => setShowCohortModal(false)}
        >
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
            style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
          >
            <div className="p-4 sm:p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <h3
                  className="text-2xl font-semibold"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  About{' '}
                  <span style={{ color: getRankColor(rankedCohorts.findIndex(c => c.name === selectedCohort) + 1) }}>
                    "{getShortCohortName(selectedCohort)}"
                  </span>
                  {' '}Med Schools
                </h3>
                <button
                  onClick={() => setShowCohortModal(false)}
                  className="text-[#86868b] hover:text-[#1d1d1f] transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="space-y-6">
                {/* Description */}
                <div className="bg-black/[0.02] rounded-none" style={{ padding: '24px' }}>
                  <h4 className="text-[15px] font-semibold text-[#1d1d1f]" style={{ marginBottom: '16px' }}>
                    What These Schools Prioritize
                  </h4>
                  <p className="text-[15px] text-[#515154] leading-relaxed">
                    {getCohortInfo(selectedCohort).description}
                  </p>
                </div>

                {/* Example Schools */}
                <div className="bg-black/[0.02] rounded-none" style={{ padding: '24px' }}>
                  <h4 className="text-[15px] font-semibold text-[#1d1d1f]" style={{ marginBottom: '16px' }}>
                    Example Schools (by selectivity)
                  </h4>
                  <ul className="space-y-2.5">
                    {getCohortInfo(selectedCohort).schools.map((school, index) => (
                      <li key={index} className="text-[14px] text-[#515154] flex items-start">
                        <span className="text-[#86868b] mr-2.5">•</span>
                        {school}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Doctor Archetype */}
                <div className="bg-black/[0.02] rounded-none" style={{ padding: '24px' }}>
                  <h4 className="text-[15px] font-semibold text-[#1d1d1f]" style={{ marginBottom: '16px' }}>
                    The Type
                  </h4>
                  <p className="text-[14px] text-[#515154] leading-relaxed" style={{ marginBottom: '16px' }}>
                    Think {getCohortInfo(selectedCohort).archetype}
                  </p>
                  <p className="text-[14px] text-[#515154] leading-relaxed">
                    {getCohortInfo(selectedCohort).superpower.split('**').map((part, index) =>
                      index % 2 === 1 ? <strong key={index}>{part}</strong> : part
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Methodology Modal */}
      {showMethodology && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 sm:px-6 animate-fadeUp"
          onClick={() => setShowMethodology(false)}
        >
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
            style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
          >
            <div className="p-4 sm:p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <h3
                  className="text-2xl font-semibold text-[#1d1d1f]"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  The Whitecoat Framework
                </h3>
                <button
                  onClick={() => setShowMethodology(false)}
                  className="text-[#86868b] hover:text-[#1d1d1f] transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="bg-black/[0.02] rounded-none" style={{ padding: '24px' }}>
                <p className="text-[13px] text-[#515154] leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
                  The Whitecoat Framework is a research-based classification system developed through systematic analysis of 173 AAMC-accredited U.S. medical schools. Using data from the Medical School Admission Requirements (MSAR) database, institutional websites, and published mission statements, Smarter Premed categorized schools into five cohorts based on measurable institutional priorities and applicant expectations. Each cohort reflects what schools actually prioritize—not prestige rankings. Mission-Driven ("Mission") schools emphasize health equity and community engagement. Patient-Centered ("Bedside") schools focus on communication and longitudinal clinical experiences. Community-Clinical ("Community") schools integrate primary care with public health. Clinical-Investigative ("Translate") schools bridge research and patient care. Research-Intensive ("Discover") schools advance medical science through high NIH funding and MD-PhD programs. Schools were validated against quantitative benchmarks (median GPA/MCAT ranges, expected clinical hours, research outputs, NIH funding levels) and qualitative institutional indicators (curriculum structure, research programs, community partnerships). This evidence-based system helps students identify schools aligned with their demonstrated strengths and career goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
