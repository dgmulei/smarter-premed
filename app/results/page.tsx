'use client';

import { useEffect, useState } from 'react';
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

  // State for AI analysis results
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);

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
      const responses = sessionStorage.getItem('questionnaireResponses');
      if (!responses) {
        router.push('/');
        return;
      }

      try {
        const parsedResponses = JSON.parse(responses);

        // Call the analysis API
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ responses: parsedResponses }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to analyze profile');
        }

        const data: AnalysisData = await response.json();
        setAnalysisData(data);

        // Set the first ranked cohort as selected by default
        if (data.rankedCohorts.length > 0) {
          setSelectedCohort(data.rankedCohorts[0].name);
        }

        setIsLoading(false);
      } catch (err) {
        console.error('Analysis error:', err);
        setError(err instanceof Error ? err.message : 'Failed to analyze profile');
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
          <p className="text-[15px] text-[#86868b]">Analyzing your profile</p>
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
      <div className="max-w-[1100px] mx-auto px-6 lg:px-8 py-8 lg:py-12">

        {/* Mobile Header */}
        <header className="lg:hidden mb-6 animate-fadeUp">
          <div className="flex items-center gap-1.5 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
            <span className="text-xs font-medium tracking-wide text-[#86868b]">Analysis Complete</span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-[#1d1d1f]">Your Results</h1>
        </header>

        {/* Desktop Header */}
        <header className="hidden lg:block mb-8 animate-fadeUp">
          <div className="flex items-center gap-1.5 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
            <span className="text-xs font-medium tracking-wide text-[#86868b]">Analysis Complete</span>
          </div>
          <h1 className="text-[44px] font-semibold tracking-tight text-[#1d1d1f]">Your Results</h1>
        </header>

        {/* Main Grid */}
        <div className="flex flex-col lg:grid lg:grid-cols-[240px_1fr] gap-8 lg:gap-10">

          {/* Sidebar */}
          <aside className="order-2 lg:order-1 animate-fadeUp" style={{ animationDelay: '0.08s' }}>
            <div className="form-card">
              <p className="text-xs font-medium tracking-wide text-[#86868b] uppercase mb-4">Ranked by fit</p>
              <div className="flex flex-col gap-1.5">
              {rankedCohorts.map((cohort, index) => (
                <button
                  key={cohort.name}
                  onClick={() => handleCohortChange(cohort.name)}
                  className={`
                    flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl transition-colors duration-200
                    ${selectedCohort === cohort.name
                      ? 'bg-[#1d1d1f]'
                      : 'hover:bg-black/[0.04]'
                    }
                  `}
                >
                  <span className={`text-[13px] tabular-nums min-w-[16px] ${selectedCohort === cohort.name ? 'text-white/50' : 'text-[#86868b]'}`}>
                    {index + 1}
                  </span>
                  <span className={`text-[15px] ${selectedCohort === cohort.name ? 'text-white font-medium' : 'text-[#1d1d1f]'}`}>
                    {cohort.name}
                  </span>
                </button>
              ))}
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="order-1 lg:order-2 flex flex-col">

            {/* Chart Card */}
            <div className="form-card animate-fadeUp" style={{ animationDelay: '0.12s' }}>
              <RadarChart
                userScores={userProfile.scores}
                cohortScores={cohortData.scores}
                showComparison={true}
              />

              {/* Legend */}
              <div className="flex items-center justify-center gap-8 mt-6 pt-5 border-t border-black/[0.06]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-pink-500"></div>
                  <span className="text-xs text-[#86868b]">You</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-400"></div>
                  <span className="text-xs text-[#86868b]">Cohort</span>
                </div>
              </div>
            </div>

            {/* Analysis Text */}
            <p
              className="text-[16px] leading-relaxed text-[#515154] mt-8 max-w-[62ch] animate-fadeUp"
              style={{
                animationDelay: '0.2s',
                opacity: isTextTransitioning ? 0 : 1,
                transition: 'opacity 0.15s ease'
              }}
            >
              {fitAnalyses[selectedCohort]}
            </p>

            {/* School Tags */}
            <div
              className={`flex flex-wrap gap-2 overflow-hidden transition-all duration-300 ${showSchools ? 'mt-8 max-h-40 opacity-100' : 'mt-0 max-h-0 opacity-0'}`}
            >
              {cohortData.exampleSchools.map((school, index) => (
                <span
                  key={index}
                  className="px-3.5 py-2 bg-black/[0.04] text-[#1d1d1f] text-[13px] rounded-[10px]"
                >
                  {school}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 mt-8 animate-fadeUp" style={{ animationDelay: '0.28s' }}>
              <button
                onClick={() => setShowSchools(!showSchools)}
                className="px-5 py-3 rounded-full bg-[#0071e3] hover:bg-[#0077ed] active:bg-[#006edb] text-white text-[15px] font-medium transition-all duration-200 inline-flex items-center gap-2 shadow-[0_2px_8px_rgba(0,113,227,0.35)] hover:shadow-[0_4px_12px_rgba(0,113,227,0.3)] hover:-translate-y-px active:translate-y-0"
              >
                {showSchools ? 'Hide' : 'View'} example schools
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${showSchools ? 'rotate-90' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button
                onClick={() => router.push('/')}
                className="px-4 py-3 text-[#86868b] hover:text-[#1d1d1f] text-[15px] transition-colors duration-200"
              >
                Start Over
              </button>
            </div>

            {/* Footer */}
            <footer className="mt-12 pt-6 border-t border-black/[0.06] animate-fadeUp" style={{ animationDelay: '0.36s' }}>
              <p className="text-[13px] text-[#86868b]">
                SPM helps students understand where they fit best.
              </p>
            </footer>

          </div>
        </div>

      </div>
    </main>
  );
}
