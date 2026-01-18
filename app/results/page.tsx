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
        <div className="text-center mb-8 fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif mb-4 tracking-tight">
            Your Competitive Profile
          </h1>
          <p className="text-lg sm:text-xl text-gray-300">{userProfile.summary}</p>
        </div>

        {/* Top 3 Cohorts Overview */}
        <div className="mb-12 slide-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl sm:text-3xl font-serif mb-6 text-center">
            Exploring the Cohorts
          </h2>
          <p className="text-center text-gray-300 mb-8 max-w-3xl mx-auto">
            After spending time clicking through the Cohort Comparison Dashboard, Zach begins to sense where he might fit best. Among the five cohorts, three stand out as the strong possibilities: <span className="font-semibold text-white">Patient-Centered</span>, <span className="font-semibold text-white">Clinical-Investigative</span>, and <span className="font-semibold text-white">Community-Clinical</span>. Their priorities resonate with him—he feels a natural alignment with his goals and values.
          </p>
        </div>

        {/* Cohort Selector */}
        <div className="glass-panel p-6 mb-8 slide-up" style={{ animationDelay: '0.3s' }}>
          <label className="block text-sm text-gray-400 mb-3">Select Cohort for Comparison:</label>
          <div className="flex flex-wrap gap-3">
            {Object.keys(COHORT_ARCHETYPES).map((cohortName) => (
              <button
                key={cohortName}
                onClick={() => setSelectedCohort(cohortName)}
                className={`px-6 py-3 rounded-lg smooth-transition ${
                  selectedCohort === cohortName
                    ? 'bg-white/20 border-2 border-white/40'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                {cohortName}
              </button>
            ))}
          </div>
        </div>

        {/* Main Comparison View */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left: Radar Chart */}
          <div className="glass-panel p-8 slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-serif">{selectedCohort}</h3>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[rgba(100,181,246,0.8)]"></div>
                  <span className="text-gray-400">{selectedCohort}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[rgba(216,181,194,0.9)]"></div>
                  <span className="text-gray-400">Pre-Med</span>
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
              <h3 className="text-xl font-serif mb-4">
                Your Profile Aligns with {selectedCohort} Schools
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                {cohortData.description}
              </p>
            </div>

            {/* Why This Cohort Fits */}
            <div className="glass-panel p-8 slide-up" style={{ animationDelay: '0.6s' }}>
              <h4 className="text-lg font-serif mb-4">
                Why This Cohort is a Strong Fit for You:
              </h4>
              <ul className="space-y-3">
                {cohortData.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-300">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What Schools Prioritize */}
            <div className="glass-panel p-8 slide-up" style={{ animationDelay: '0.7s' }}>
              <h4 className="text-lg font-serif mb-4">
                What {selectedCohort} Schools Prioritize:
              </h4>
              <ul className="space-y-2">
                {cohortData.whatSchoolsPrioritize.map((priority, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-300">
                    <span className="text-blue-400">•</span>
                    <span>{priority}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <p className="text-sm text-gray-400 mb-2">Example Schools:</p>
                <p className="text-gray-300">{cohortData.exampleSchools.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Strategic Guidance */}
        <div className="glass-panel p-8 sm:p-12 mb-12 slide-up" style={{ animationDelay: '0.8s' }}>
          <h3 className="text-xl sm:text-2xl font-serif mb-4">Recognizing a Gap</h3>
          <p className="text-gray-300 leading-relaxed">
            As Zach explores Smarter Pre-Med, the Radar Charts and High-Impact Action Plans confirm what he's been suspecting for some time—he will need to gain meaningful patient interaction experience. This insight sparks a critical next question in Zach's mind.
          </p>
          <div className="mt-6 p-6 bg-white/5 rounded-lg border border-white/10">
            <p className="text-gray-300 leading-relaxed italic">
              {cohortData.strategicGuidance}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center slide-up" style={{ animationDelay: '0.9s' }}>
          <button
            onClick={() => router.push('/')}
            className="px-8 py-4 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 smooth-transition text-lg"
          >
            Start New Assessment
          </button>
          <button
            onClick={() => window.print()}
            className="px-8 py-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 smooth-transition text-lg"
          >
            Save Results (Print)
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
