'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import QuestionnaireForm from '@/components/QuestionnaireForm';

export default function Home() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMethodology, setShowMethodology] = useState(false);

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

        {/* Header Card */}
        <div className="form-card text-center mb-6 animate-fadeUp" style={{ padding: '48px 32px' }}>
          <div className="inline-flex items-center gap-1.5 mb-6">
            <span className="text-xs font-medium tracking-wide text-[#86868b]">Free 10-minute assessment</span>
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

        {/* Methodology Expandable */}
        <div className="mt-6 animate-fadeUp" style={{ animationDelay: '0.2s' }}>
          <div className="flex justify-end">
            <button
              onClick={() => setShowMethodology(!showMethodology)}
              className="flex items-center gap-2 px-4 py-2 text-[13px] text-[#86868b] hover:text-[#1d1d1f] border border-black/[0.1] rounded-lg bg-white hover:bg-black/[0.02] transition-all duration-200"
            >
              About the Whitecoat Framework
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${showMethodology ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {showMethodology && (
            <div className="form-card mt-4 animate-fadeUp">
              <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                About the Whitecoat Cohort System
              </h3>
              <p className="text-[13px] text-[#515154] leading-relaxed italic" style={{ fontFamily: 'Georgia, serif' }}>
                The Whitecoat Framework is a research-based classification system developed through systematic analysis of 173 AAMC-accredited U.S. and Canadian medical schools. Using data from the Medical School Admission Requirements (MSAR) database, institutional websites, and published mission statements, Smarter Premed categorized schools into five cohorts based on measurable institutional priorities and applicant expectations. Each cohort reflects what schools actually prioritize—not prestige rankings. Mission-Driven ("Mission") schools emphasize health equity and community engagement. Patient-Centered ("Bedside") schools focus on communication and longitudinal clinical experiences. Community-Clinical ("Community") schools integrate primary care with public health. Clinical-Investigative ("Translate") schools bridge research and patient care. Research-Intensive ("Discover") schools advance medical science through high NIH funding and MD-PhD programs. Schools were validated against quantitative benchmarks (median GPA/MCAT ranges, expected clinical hours, research outputs, NIH funding levels) and qualitative institutional indicators (curriculum structure, research programs, community partnerships). This evidence-based system helps students identify schools aligned with their demonstrated strengths and career goals.
              </p>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
