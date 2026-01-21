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
    'Clinical & Lab Skills',
    'Clinical Exposure',
    'Research Activities',
    'Academic Rigor',
    'Specialty Focus',
  ];

  const datasets = [];

  // Cohort archetype (blue) - render first so it's behind
  if (showComparison && cohortScores) {
    datasets.push({
      label: 'Cohort',
      data: [
        cohortScores.leadership_service,
        cohortScores.technical_skills,
        cohortScores.clinical_exposure,
        cohortScores.research_activities,
        cohortScores.academic_rigor,
        cohortScores.specialty_preparation,
      ],
      backgroundColor: 'rgba(96, 165, 250, 0.12)',
      borderColor: 'rgba(96, 165, 250, 0.7)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(96, 165, 250, 1)',
      pointBorderColor: '#fff',
      pointBorderWidth: 1.5,
      pointRadius: 4,
      pointHoverRadius: 6,
    });
  }

  // User profile (pink) - render on top
  datasets.push({
    label: 'You',
    data: [
      userScores.leadership_service,
      userScores.technical_skills,
      userScores.clinical_exposure,
      userScores.research_activities,
      userScores.academic_rigor,
      userScores.specialty_preparation,
    ],
    backgroundColor: 'rgba(244, 114, 182, 0.1)',
    borderColor: 'rgba(236, 72, 153, 0.7)',
    borderWidth: 2,
    pointBackgroundColor: 'rgba(236, 72, 153, 1)',
    pointBorderColor: '#fff',
    pointBorderWidth: 1.5,
    pointRadius: 4,
    pointHoverRadius: 6,
  });

  const chartData = {
    labels,
    datasets,
  };

  const options: ChartOptions<'radar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        min: 0,
        ticks: {
          stepSize: 20,
          color: 'rgba(0, 0, 0, 0.25)',
          backdropColor: 'transparent',
          font: {
            size: 10,
            family: 'Inter, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
          },
          display: true,
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.04)',
          circular: true,
        },
        pointLabels: {
          color: 'rgba(0, 0, 0, 0.45)',
          font: {
            size: 11,
            weight: 500,
            family: 'Inter, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
          },
          padding: 3,
        },
        angleLines: {
          color: 'rgba(0, 0, 0, 0.04)',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(29, 29, 31, 0.95)',
        titleColor: '#fff',
        bodyColor: 'rgba(255, 255, 255, 0.85)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 10,
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
    <div className="w-full mx-auto" style={{ height: '342px', maxWidth: '342px' }}>
      <Radar data={chartData} options={options} />
    </div>
  );
}
