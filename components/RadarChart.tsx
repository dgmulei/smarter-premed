'use client';

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface RadarChartProps {
  userScores: {
    academic_rigor: number;
    clinical_exposure: number;
    research_activities: number;
    leadership_service: number;
    technical_skills: number;
    specialty_preparation: number;
  };
  cohortScores?: {
    academic_rigor: number;
    clinical_exposure: number;
    research_activities: number;
    leadership_service: number;
    technical_skills: number;
    specialty_preparation: number;
  };
  showComparison?: boolean;
}

export default function RadarChart({ userScores, cohortScores, showComparison = false }: RadarChartProps) {
  const labels = [
    'Leadership & Service',
    'Technical Skills',
    'Clinical Exposure',
    'Research Activities',
    'Academic Rigor',
    'Specialty Preparation',
  ];

  const datasets = [];

  // Cohort archetype (blue) - render first so it's behind
  if (showComparison && cohortScores) {
    datasets.push({
      label: 'Clinical-Investigative',
      data: [
        cohortScores.leadership_service,
        cohortScores.technical_skills,
        cohortScores.clinical_exposure,
        cohortScores.research_activities,
        cohortScores.academic_rigor,
        cohortScores.specialty_preparation,
      ],
      backgroundColor: 'rgba(100, 181, 246, 0.15)',
      borderColor: 'rgba(100, 181, 246, 0.8)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(100, 181, 246, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(100, 181, 246, 1)',
      pointRadius: 4,
      pointHoverRadius: 6,
    });
  }

  // User profile (pink) - render on top
  datasets.push({
    label: 'Pre-Med',
    data: [
      userScores.leadership_service,
      userScores.technical_skills,
      userScores.clinical_exposure,
      userScores.research_activities,
      userScores.academic_rigor,
      userScores.specialty_preparation,
    ],
    backgroundColor: 'rgba(216, 181, 194, 0.25)',
    borderColor: 'rgba(216, 181, 194, 0.9)',
    borderWidth: 2,
    pointBackgroundColor: 'rgba(216, 181, 194, 1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(216, 181, 194, 1)',
    pointRadius: 4,
    pointHoverRadius: 6,
  });

  const chartData = {
    labels,
    datasets,
  };

  const options: ChartOptions<'radar'> = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        min: 0,
        ticks: {
          stepSize: 20,
          color: 'rgba(245, 240, 232, 0.4)',
          backdropColor: 'transparent',
          font: {
            size: 11,
          },
          display: true,
        },
        grid: {
          color: 'rgba(245, 240, 232, 0.08)',
          circular: true,
        },
        pointLabels: {
          color: 'rgba(245, 240, 232, 0.85)',
          font: {
            size: 13,
            family: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif',
          },
          padding: 20,
        },
        angleLines: {
          color: 'rgba(245, 240, 232, 0.08)',
        },
      },
    },
    plugins: {
      legend: {
        display: showComparison,
        position: 'bottom',
        labels: {
          color: 'rgba(245, 240, 232, 0.8)',
          font: {
            size: 13,
            family: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif',
          },
          padding: 15,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(26, 26, 31, 0.95)',
        titleColor: 'rgba(245, 240, 232, 1)',
        bodyColor: 'rgba(245, 240, 232, 0.8)',
        borderColor: 'rgba(212, 184, 150, 0.3)',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.r}`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Radar data={chartData} options={options} />
    </div>
  );
}
