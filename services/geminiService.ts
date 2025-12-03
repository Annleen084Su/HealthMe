import { GoogleGenAI } from "@google/genai";
import { StudentProfile, LiteracyDimension } from "../types";
import { DIMENSION_LABELS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeStudentProfile = async (profile: StudentProfile): Promise<string> => {
  const scoresText = Object.entries(profile.scores)
    .map(([key, value]) => `- ${DIMENSION_LABELS[key as LiteracyDimension]}: ${value}/100`)
    .join("\n");

  const prompt = `
    Analyze the following student's E-Health Literacy profile based on Norman & Skinner's dimensions.
    Student: ${profile.name} (Grade ${profile.grade}, Age ${profile.age})
    Overall Risk Level: ${profile.riskLevel}

    Scores:
    ${scoresText}

    Please provide a concise summary in Thai (ภาษาไทย):
    1. Identification of strengths.
    2. Specific areas that need improvement (especially low scores).
    3. Actionable advice for the teacher to help this student improve their health literacy.
    Keep the tone encouraging but professional. Limit to 150 words.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "ไม่สามารถวิเคราะห์ข้อมูลได้ในขณะนี้";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "เกิดข้อผิดพลาดในการเชื่อมต่อกับ AI";
  }
};

export const generateClassReport = async (students: StudentProfile[]): Promise<string> => {
  const riskCounts = { Low: 0, Moderate: 0, High: 0 };
  let lowScoreAreas: string[] = [];

  students.forEach(s => {
    riskCounts[s.riskLevel]++;
    Object.entries(s.scores).forEach(([dim, score]) => {
      if (score < 50) lowScoreAreas.push(DIMENSION_LABELS[dim as LiteracyDimension]);
    });
  });

  // Find most common low areas
  const frequency: Record<string, number> = {};
  lowScoreAreas.forEach(area => { frequency[area] = (frequency[area] || 0) + 1; });
  const topIssues = Object.entries(frequency).sort((a,b) => b[1] - a[1]).slice(0, 3).map(x => x[0]).join(", ");

  const prompt = `
    Act as a Health Education Consultant. Generate a strategic class report in Thai (ภาษาไทย).
    Data Summary:
    - Total Students: ${students.length}
    - High Risk Students: ${riskCounts.High}
    - Moderate Risk Students: ${riskCounts.Moderate}
    - Low Risk Students: ${riskCounts.Low}
    - Common Weaknesses found in class: ${topIssues}

    Please suggest:
    1. An overview of the class health literacy status.
    2. A suggested classroom activity or workshop topic to address the common weaknesses.
    3. A strategy for monitoring "High Risk" students without stigmatizing them.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "ไม่สามารถสร้างรายงานได้";
  } catch (error) {
    console.error("Gemini Class Report Error:", error);
    return "เกิดข้อผิดพลาดในการเชื่อมต่อกับ AI";
  }
};