'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import QuestionnaireForm from '@/components/QuestionnaireForm';

export default function Home() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: Record<string, string>) => {
    setIsSubmitting(true);

    try {
      // Save email to database
      const response = await fetch('/api/submit-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      if (!response.ok) {
        throw new Error('Failed to save email');
      }

      // Store questionnaire responses in session storage
      sessionStorage.setItem('questionnaireResponses', JSON.stringify(formData));

      // Navigate to results
      setTimeout(() => {
        router.push('/results');
      }, 800);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      alert('There was an error submitting your information. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-atmosphere">
      <div className="landing-container">

        {/* Header Card */}
        <div className="form-card text-center mb-6 animate-fadeUp" style={{ padding: '48px 32px' }}>
          <div className="inline-flex items-center gap-1.5 mb-6">
            <span className="text-xs font-medium tracking-wide text-[#86868b]">Free Assessment</span>
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-[#1d1d1f] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Positioned
          </h1>

          <p className="text-base text-[#0d9488] mb-6">
            by <span className="font-semibold">Smarter Premed</span>
          </p>

          <p className="text-xl text-[#1d1d1f] tracking-tight mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            See Where You Stand.<br/>
            Focus On What Matters.
          </p>

          <div className="text-sm text-[#86868b] space-y-1">
            <p>Your personal profile</p>
            <div className="flex items-center justify-center gap-3">
              <span>6 core competencies</span>
              <span>•</span>
              <span>5 school types</span>
            </div>
            <p className="mt-2">
              Built on AAMC accredited member school matriculation data
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="form-card animate-fadeUp" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-2xl font-semibold text-[#1d1d1f] mb-1 text-center" style={{ fontFamily: 'Georgia, serif' }}>
            FitFinder Questionnaire
          </h2>
          <p className="text-[15px] text-[#86868b] text-center mb-8" style={{ fontFamily: 'Georgia, serif' }}>
            (30 questions)
          </p>
          <QuestionnaireForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>

        {/* Submit Button Card */}
        <div className="form-card mt-6 animate-fadeUp flex justify-center" style={{ animationDelay: '0.2s' }}>
          <button
            type="submit"
            form="questionnaire-form"
            disabled={isSubmitting}
            className={`
              group text-3xl font-bold rounded-lg
              transition-all duration-200
              flex items-center justify-center gap-2
              ${
                isSubmitting
                  ? 'border border-[#86868b] cursor-not-allowed text-[#86868b]'
                  : 'border border-[#0d9488] text-[#0d9488] ghost-btn-teal ghost-btn-pulse'
              }
            `}
            style={{
              fontFamily: 'Georgia, serif',
              backgroundColor: isSubmitting ? '#86868b10' : '#0d948810',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              padding: '4px 18px'
            }}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="3"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Analyzing</span>
              </>
            ) : (
              <span>See My Results</span>
            )}
          </button>
        </div>

      </div>
    </main>
  );
}
