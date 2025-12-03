import React, { useState } from 'react';
import { StudentProfile, LiteracyDimension } from '../types';
import { ScoreRadarChart } from './DashboardCharts';
import { BrainCircuit, BookOpen, Sprout, Sparkles, ChevronLeft, Heart, Home, Quote, Snail, Rabbit, Bird, Rocket } from 'lucide-react';
import { analyzeStudentProfile } from '../services/geminiService';
import { SCORE_LEVEL_CONFIGS, DIMENSION_LABELS } from '../constants';

interface Props {
  student: StudentProfile;
  onBack: () => void;
  backLabel?: string; // Optional prop to customize back button text
}

const StudentProfileView: React.FC<Props> = ({ student, onBack, backLabel = "กลับหน้ารายชื่อ" }) => {
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const handleAiAnalyze = async () => {
    setLoadingAi(true);
    const result = await analyzeStudentProfile(student);
    setAiAnalysis(result);
    setLoadingAi(false);
  };

  // Use SCORE_LEVEL_CONFIGS and student.level (5 levels) instead of riskLevel
  const levelConfig = SCORE_LEVEL_CONFIGS[student.level];

  const renderIcon = () => {
    switch (levelConfig.iconName) {
      case 'rabbit': return <Rabbit className={`w-12 h-12 ${levelConfig.textColor}`} />;
      case 'bird': return <Bird className={`w-12 h-12 ${levelConfig.textColor}`} />;
      case 'rocket': return <Rocket className={`w-12 h-12 ${levelConfig.textColor}`} />;
      case 'sparkles': return <Sparkles className={`w-12 h-12 ${levelConfig.textColor}`} />;
      default: return <Snail className={`w-12 h-12 ${levelConfig.textColor}`} />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Navigation */}
      <button onClick={onBack} className="text-sm text-gray-500 hover:text-indigo-600 flex items-center gap-1 transition-colors px-4 py-2 rounded-lg hover:bg-indigo-50 font-medium">
         {backLabel === "กลับหน้าหลัก" ? <Home className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />} 
         {backLabel}
      </button>

      {/* Hero Card - Cute Style */}
      <div className={`relative overflow-hidden rounded-[2rem] border-4 ${levelConfig.borderColor} bg-white shadow-sm transition-all hover:shadow-md mx-4 md:mx-0`}>
         {/* Background Decoration */}
         <div className={`absolute top-0 left-0 w-full h-32 ${levelConfig.bg}`}></div>

         <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end gap-6 p-8 pt-10">
            {/* Icon Bubble */}
            <div className="bg-white p-6 rounded-full shadow-lg border-4 border-white -mt-4 mb-2 animate-pop-in">
                {renderIcon()}
            </div>
            
            <div className="text-center md:text-left flex-1 mb-2">
                <div className="flex flex-col md:flex-row items-center md:items-end gap-3 mb-2">
                    <h2 className="text-3xl font-black text-gray-800 leading-none">{student.name}</h2>
                    <span className={`px-4 py-1.5 rounded-full text-sm font-bold text-white shadow-sm transform -translate-y-1
                        ${student.level === 'Advanced' ? 'bg-emerald-400' : 
                          student.level === 'Proficient' ? 'bg-blue-400' : 
                          student.level === 'Intermediate' ? 'bg-amber-400' :
                          student.level === 'Basic' ? 'bg-orange-400' : 'bg-rose-400'}`}>
                        {levelConfig.badge}
                    </span>
                </div>
                <p className="text-gray-500 font-medium">ชั้น {student.grade} | อายุ {student.age} ปี</p>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 min-w-[140px] text-center">
                <div className="text-4xl font-black text-indigo-600">{student.totalScore}</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">คะแนนรวม</div>
            </div>
         </div>

         {/* Encouragement Banner */}
         <div className="px-8 pb-4">
             <div className={`p-4 rounded-xl ${levelConfig.bg} border-l-4 ${levelConfig.borderColor} flex gap-3 items-start`}>
                <Quote className={`w-5 h-5 ${levelConfig.textColor} shrink-0`} />
                <p className={`${levelConfig.textColor} font-bold italic`}>
                    "{levelConfig.encouragement}"
                </p>
             </div>
         </div>

         {/* Description Section inside Card */}
         <div className="px-8 pb-8">
            <div className={`rounded-xl p-5 bg-white border border-gray-100 relative mt-2`}>
                <div className="flex items-center gap-2 mb-2 font-bold text-gray-800">
                     <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                     คำแนะนำสำหรับเธอ
                </div>
                <p className={`text-sm md:text-base text-gray-700 font-medium leading-relaxed`}>
                    "{levelConfig.description}"
                </p>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 md:px-0">
        {/* Chart Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                <div className="w-3 h-8 bg-indigo-500 rounded-full"></div>
                ระดับสมรรถนะ (6 ด้าน)
            </h3>
            <div className="bg-gray-50/50 rounded-2xl p-4 flex justify-center mb-6">
                <ScoreRadarChart scores={student.scores} />
            </div>
            <div className="grid grid-cols-2 gap-3">
                 {Object.entries(student.scores).map(([key, val]) => (
                     <div key={key} className="flex justify-between items-center text-sm p-3 rounded-xl bg-gray-50 hover:bg-indigo-50 transition-colors">
                         <span className="text-gray-600 truncate mr-2 font-medium">
                             {DIMENSION_LABELS[key as LiteracyDimension]}
                         </span>
                         <span className={`font-bold ${(val as number) >= 70 ? 'text-green-500' : (val as number) >= 50 ? 'text-blue-500' : 'text-orange-500'}`}>
                            {val as number}
                         </span>
                     </div>
                 ))}
            </div>
        </div>

        {/* AI Analysis Section */}
        <div className="flex flex-col bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden p-6">
             <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <BrainCircuit className="w-6 h-6 text-purple-600" />
                    AI Health Coach
                </h3>
                {!aiAnalysis && (
                    <button 
                        onClick={handleAiAnalyze}
                        disabled={loadingAi}
                        className="text-xs md:text-sm bg-purple-100 text-purple-700 border border-purple-200 px-4 py-2 rounded-full hover:bg-purple-200 transition-all font-bold disabled:opacity-50"
                    >
                        {loadingAi ? 'กำลังวิเคราะห์...' : '✨ ขอคำแนะนำเพิ่ม'}
                    </button>
                )}
             </div>
             
             <div className="flex-1 bg-purple-50/50 rounded-2xl p-6 border border-purple-100 text-gray-700 leading-relaxed overflow-y-auto max-h-[400px]">
                {aiAnalysis ? (
                    <div className="prose prose-sm prose-purple max-w-none whitespace-pre-line">
                        {aiAnalysis}
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 italic py-10">
                        <div className="bg-purple-100 p-4 rounded-full mb-3">
                             <Sparkles className="w-8 h-8 text-purple-400" />
                        </div>
                        <p className="text-center max-w-xs text-sm">กดปุ่ม "ขอคำแนะนำเพิ่ม" เพื่อให้ AI ช่วยวิเคราะห์จุดแข็งและจุดที่ควรพัฒนาให้เธออย่างละเอียด</p>
                    </div>
                )}
             </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileView;