export enum LiteracyDimension {
  TRADITIONAL = 'Traditional', // การรู้หนังสือทั่วไป
  INFORMATION = 'Information', // การรู้สารสนเทศ
  MEDIA = 'Media',       // การรู้เท่าทันสื่อ
  HEALTH = 'Health',      // การรู้สุขภาพ
  COMPUTER = 'Computer',    // การรู้คอมพิวเตอร์
  SCIENCE = 'Science'      // การรู้วิทยาศาสตร์
}

export interface Question {
  id: number;
  text: string;
  dimension: LiteracyDimension;
}

export interface StudentScore {
  [LiteracyDimension.TRADITIONAL]: number;
  [LiteracyDimension.INFORMATION]: number;
  [LiteracyDimension.MEDIA]: number;
  [LiteracyDimension.HEALTH]: number;
  [LiteracyDimension.COMPUTER]: number;
  [LiteracyDimension.SCIENCE]: number;
}

export type LiteracyLevel = 'Beginner' | 'Basic' | 'Intermediate' | 'Proficient' | 'Advanced';

export interface StudentProfile {
  id: string;
  name: string;
  grade: string; // ชั้นเรียน
  gender: 'Male' | 'Female' | 'Other';
  age: number;
  scores: StudentScore;
  totalScore: number; // 0-100 normalized
  level: LiteracyLevel; // New 5-tier level
  riskLevel: 'Low' | 'Moderate' | 'High'; // Kept for Teacher Dashboard logic
  assessedAt: string;
  history: { date: string; totalScore: number }[]; // For progress tracking
}

export interface ClassSummary {
  totalStudents: number;
  atRiskCount: number;
  averageScores: StudentScore;
}
