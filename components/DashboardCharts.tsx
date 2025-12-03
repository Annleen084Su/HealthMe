import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { StudentScore, LiteracyDimension, StudentProfile } from '../types';
import { DIMENSION_LABELS } from '../constants';

interface ScoreRadarProps {
  scores: StudentScore;
}

export const ScoreRadarChart: React.FC<ScoreRadarProps> = ({ scores }) => {
  const data = Object.keys(scores).map((key) => ({
    subject: DIMENSION_LABELS[key as LiteracyDimension],
    A: scores[key as LiteracyDimension],
    fullMark: 100,
  }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#4b5563', fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Score"
            dataKey="A"
            stroke="#4f46e5"
            strokeWidth={2}
            fill="#6366f1"
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

interface ClassComparisonProps {
  students: StudentProfile[];
}

export const ClassComparisonChart: React.FC<ClassComparisonProps> = ({ students }) => {
    // Calculate averages
    const averages: Record<string, number> = {};
    const count = students.length;

    if (count === 0) return <div>No data</div>;

    Object.values(LiteracyDimension).forEach(dim => {
        const sum = students.reduce((acc, s) => acc + s.scores[dim], 0);
        averages[dim] = Math.round(sum / count);
    });

    const data = Object.keys(averages).map(key => ({
        name: DIMENSION_LABELS[key as LiteracyDimension],
        score: averages[key]
    }));

    return (
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12}} />
                    <Tooltip cursor={{fill: 'transparent'}} />
                    <Bar dataKey="score" fill="#10b981" radius={[0, 4, 4, 0]} barSize={20} name="คะแนนเฉลี่ย" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}