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
      <div className="max-w-[540px] mx-auto px-6 py-16 sm:py-20">

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
          <h2 className="text-2xl font-semibold text-[#1d1d1f] mb-3 text-center" style={{ fontFamily: 'Georgia, serif' }}>
            Questionnaire
          </h2>
          <p className="text-[15px] text-[#86868b] text-center mb-8">
            Answer the 30 questions below to see where you stand.
          </p>
          <QuestionnaireForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>

      </div>
    </main>
  );
}
