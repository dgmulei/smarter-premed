'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import QuestionnaireForm from '@/components/QuestionnaireForm';

export default function Home() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: Record<string, string>) => {
    setIsSubmitting(true);
    sessionStorage.setItem('questionnaireResponses', JSON.stringify(formData));
    setTimeout(() => {
      router.push('/results');
    }, 800);
  };

  return (
    <main className="min-h-screen bg-atmosphere">
      <div className="max-w-[540px] mx-auto px-6 py-16 sm:py-20">

        {/* Header */}
        <header className="text-center mb-10 animate-fadeUp">
          <div className="inline-flex items-center gap-1.5 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
            <span className="text-xs font-medium tracking-wide text-[#86868b]">Free Assessment</span>
          </div>

          <h1 className="text-5xl font-semibold tracking-tight text-[#1d1d1f] mb-4">
            Smarter Pre-Med
          </h1>

          <p className="text-xl text-[#1d1d1f] tracking-tight">
            Find your medical school fit in 60 seconds
          </p>
        </header>

        {/* Form Card */}
        <div className="form-card animate-fadeUp" style={{ animationDelay: '0.1s' }}>
          <p className="text-[15px] text-[#86868b] leading-relaxed text-center mb-8">
            Answer a few questions about your journey, and we'll show you where you stand across 6 key competencies.
          </p>
          <QuestionnaireForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>

        {/* Footer */}
        <footer className="text-center mt-8 pt-6 border-t border-black/[0.06] animate-fadeUp" style={{ animationDelay: '0.2s' }}>
          <p className="text-[13px] text-[#86868b]">
            Built for pre-med students who want clarity.
          </p>
        </footer>
      </div>
    </main>
  );
}
