'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import QuestionnaireForm from '@/components/QuestionnaireForm';

export default function Home() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: Record<string, string>) => {
    setIsSubmitting(true);

    // Store responses in sessionStorage for results page
    sessionStorage.setItem('questionnaireResponses', JSON.stringify(formData));

    // Simulate brief processing time for premium feel
    setTimeout(() => {
      router.push('/results');
    }, 1000);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-8">
      <div className="max-w-3xl w-full fade-in">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8">
            <svg className="w-4 h-4 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-indigo-300">Free Assessment</span>
          </div>
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-serif mb-8 tracking-tight gradient-text">
            Smarter Pre-Med
          </h1>
          <p className="text-2xl sm:text-3xl text-gray-200 mb-6 font-light">
            Discover your medical school cohort in 60 seconds
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Answer a few questions about your academic journey, and we'll show you exactly where you stand across 6 key competencies—and which medical school cohort matches your profile.
          </p>
        </div>

        {/* Questionnaire Form */}
        <QuestionnaireForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />

        {/* Footer */}
        <div className="text-center mt-16 text-sm text-gray-500">
          <p>Built for pre-med students who want clarity, not confusion.</p>
        </div>
      </div>
    </main>
  );
}
