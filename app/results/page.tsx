'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import RadarChart from '@/components/RadarChart';
import { COHORT_ARCHETYPES, MOCK_USER_PROFILE } from '@/lib/cohortData';

const COHORT_COLORS: Record<string, string> = {
  'Clinical-Investigative': 'rgba(100, 181, 246, 0.15)',
  'Patient-Centered': 'rgba(150, 200, 212, 0.15)',
  'Community-Clinical': 'rgba(180, 212, 150, 0.15)',
  'Research-Intensive': 'rgba(212, 150, 180, 0.15)',
  'Mission-Driven': 'rgba(200, 150, 212, 0.15)',
};

export default function Results() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCohort, setSelectedCohort] = useState<string>('Clinical-Investigative');

  const userProfile = MOCK_USER_PROFILE;
  const cohortData = COHORT_ARCHETYPES[selectedCohort];

  useEffect(() => {
    // Check if user came from questionnaire
    const responses = sessionStorage.getItem('questionnaireResponses');

    if (!responses) {
      // No questionnaire data, redirect to home
      router.push('/');
      return;
    }

    // Simulate loading for premium feel
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // TODO: Later, send responses to API and get real results
    // const data = JSON.parse(responses);
    // const apiResults = await fetch('/api/analyze', { ... });
  }, [router]);

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center fade-in">
          <div className="w-16 h-16 border-4 border-white/20 border-t-white/80 rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-xl text-gray-300">Analyzing your profile...</p>
          <p className="text-sm text-gray-500 mt-2">Comparing across 6 competency dimensions</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-4 sm:p-8 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></div>
            <span className="text-sm font-medium text-indigo-300">Analysis Complete</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif mb-6 tracking-tight gradient-text">
            Your Competitive Profile
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
            {userProfile.summary}
          </p>
        </div>

        {/* Top 3 Cohorts Overview */}
        <div className="glass-panel p-8 sm:p-10 mb-12 slide-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-3xl sm:text-4xl font-serif mb-6 text-center">
            Exploring the Cohorts
          </h2>
          <p className="text-center text-gray-300 leading-relaxed max-w-3xl mx-auto">
            After spending time clicking through the Cohort Comparison Dashboard, Zach begins to sense where he might fit best. Among the five cohorts, three stand out as the strong possibilities: <span className="font-semibold text-white bg-white/5 px-2 py-0.5 rounded">Patient-Centered</span>, <span className="font-semibold text-white bg-white/5 px-2 py-0.5 rounded">Clinical-Investigative</span>, and <span className="font-semibold text-white bg-white/5 px-2 py-0.5 rounded">Community-Clinical</span>. Their priorities resonate with him—he feels a natural alignment with his goals and values.
          </p>
        </div>

        {/* Cohort Selector */}
        <div className="mb-10 slide-up" style={{ animationDelay: '0.3s' }}>
          <label className="block text-sm font-medium text-gray-400 mb-4 tracking-wide uppercase">
            Select Cohort for Comparison
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {Object.keys(COHORT_ARCHETYPES).map((cohortName) => (
              <button
                key={cohortName}
                onClick={() => setSelectedCohort(cohortName)}
                className={`cohort-card text-center ${
                  selectedCohort === cohortName ? 'cohort-card-active' : ''
                }`}
              >
                <div className="relative z-10">
                  <div className="text-sm font-semibold mb-0.5 text-white leading-tight">
                    {cohortName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {cohortName === 'Clinical-Investigative' && 'Research'}
                    {cohortName === 'Patient-Centered' && 'Patient Focus'}
                    {cohortName === 'Community-Clinical' && 'Health Equity'}
                    {cohortName === 'Research-Intensive' && 'Academic'}
                    {cohortName === 'Mission-Driven' && 'Social Impact'}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Comparison View */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left: Radar Chart */}
          <div className="glass-panel-elevated p-8 slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="mb-8">
              <h3 className="text-2xl font-serif text-white mb-4">{selectedCohort}</h3>
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm bg-[rgba(100,181,246,0.8)] border border-[rgba(100,181,246,1)]"></div>
                  <span className="text-gray-400">Cohort Archetype</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm bg-[rgba(216,181,194,0.8)] border border-[rgba(216,181,194,1)]"></div>
                  <span className="text-gray-400">Your Profile</span>
                </div>
              </div>
            </div>
            <RadarChart
              userScores={userProfile.scores}
              cohortScores={cohortData.scores}
              showComparison={true}
            />
          </div>

          {/* Right: Cohort Details */}
          <div className="space-y-6">
            {/* Profile Alignment */}
            <div className="glass-panel p-8 slide-up" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
                <h3 className="text-xl font-serif text-white">
                  Your Profile Aligns with {selectedCohort} Schools
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                {cohortData.description}
              </p>
            </div>

            {/* Why This Cohort Fits */}
            <div className="glass-panel p-8 slide-up" style={{ animationDelay: '0.6s' }}>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
                <h4 className="text-lg font-serif text-white">
                  Why This Cohort is a Strong Fit for You
                </h4>
              </div>
              <ul className="space-y-3">
                {cohortData.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
                    <svg className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What Schools Prioritize */}
            <div className="glass-panel p-8 slide-up" style={{ animationDelay: '0.7s' }}>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                <h4 className="text-lg font-serif text-white">
                  What {selectedCohort} Schools Prioritize
                </h4>
              </div>
              <ul className="space-y-3 mb-6">
                {cohortData.whatSchoolsPrioritize.map((priority, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0 mt-2"></div>
                    <span>{priority}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs text-gray-400 mb-3 uppercase tracking-wide font-medium">Example Schools</p>
                <div className="flex flex-wrap gap-2">
                  {cohortData.exampleSchools.map((school, index) => (
                    <span key={index} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300">
                      {school}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Strategic Guidance */}
        <div className="glass-panel p-8 sm:p-12 mb-12 slide-up" style={{ animationDelay: '0.8s' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
              <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif text-white">Recognizing a Gap</h3>
          </div>
          <p className="text-gray-300 leading-relaxed mb-6">
            As Zach explores Smarter Pre-Med, the Radar Charts and High-Impact Action Plans confirm what he's been suspecting for some time—he will need to gain meaningful patient interaction experience. This insight sparks a critical next question in Zach's mind.
          </p>
          <div className="p-6 bg-gradient-to-br from-amber-500/5 to-orange-500/5 rounded-xl border border-amber-500/20">
            <p className="text-gray-200 leading-relaxed italic">
              {cohortData.strategicGuidance}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center slide-up" style={{ animationDelay: '0.9s' }}>
          <button
            onClick={() => router.push('/')}
            className="group px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border border-indigo-500/50 smooth-transition text-lg font-medium shadow-lg shadow-indigo-500/20"
          >
            <span className="flex items-center justify-center gap-2">
              Start New Assessment
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
          <button
            onClick={() => window.print()}
            className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 smooth-transition text-lg font-medium"
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Save Results
            </span>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-gray-500 fade-in" style={{ animationDelay: '1s' }}>
          <p>SPM helps students understand where they fit best, removing guesswork from the application process.</p>
        </div>
      </div>
    </main>
  );
}
