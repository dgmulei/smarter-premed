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
        <div className="text-center mb-12">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif mb-6 tracking-tight">
            Smarter Pre-Med
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-4">
            Discover your medical school cohort in 60 seconds
          </p>
          <p className="text-base text-gray-400 max-w-2xl mx-auto">
            Answer a few questions about your academic journey, and we'll show you exactly where you stand across 6 key competencies—and which medical school cohort matches your profile.
          </p>
        </div>

        {/* Questionnaire Form */}
        <QuestionnaireForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-gray-500">
          <p>Built for pre-med students who want clarity, not confusion.</p>
        </div>
      </div>
    </main>
  );
}
