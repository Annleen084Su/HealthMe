import React, { useState, useEffect } from 'react';
import { Question, LiteracyDimension, StudentScore, StudentProfile, LiteracyLevel } from '../types';
import { ASSESSMENT_QUESTIONS, SCORE_LEVEL_CONFIGS, DIMENSION_LABELS, DIMENSION_FEEDBACK } from '../constants';
import { Send, CheckCircle, Trophy, Star, Sprout, ArrowRight, Sparkles, Heart, Lightbulb, Quote, Snail, Rabbit, Bird, Rocket } from 'lucide-react';
// @ts-ignore
import confetti from 'canvas-confetti';

interface Props {
  onComplete: (profile: StudentProfile) => void;
  onCancel: () => void;
}

const AssessmentForm: React.FC<Props> = ({ onComplete, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [studentInfo, setStudentInfo] = useState({ name: '', grade: '', age: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultProfile, setResultProfile] = useState<StudentProfile | null>(null);

  useEffect(() => {
    if (resultProfile) {
        // Celebratory confetti burst
        const count = 200;
        const defaults = {
            origin: { y: 0.7 },
            zIndex: 1000, 
        };

        function fire(particleRatio: number, opts: any) {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio)
            });
        }

        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45 });
    }
  }, [resultProfile]);

  const handleAnswer = (score: number) => {
    setAnswers(prev => ({ ...prev, [ASSESSMENT_QUESTIONS[currentStep].id]: score }));
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    if (currentStep < ASSESSMENT_QUESTIONS.length) {
        setCurrentStep(prev => prev + 1);
    }
  };

  const calculateResults = () => {
    setIsSubmitting(true);
    // Simulate calculation logic
    const scores: StudentScore = {
      [LiteracyDimension.TRADITIONAL]: 0,
      [LiteracyDimension.INFORMATION]: 0,
      [LiteracyDimension.MEDIA]: 0,
      [LiteracyDimension.HEALTH]: 0,
      [LiteracyDimension.COMPUTER]: 0,
      [LiteracyDimension.SCIENCE]: 0,
    };

    const counts: Record<string, number> = {};

    ASSESSMENT_QUESTIONS.forEach(q => {
      const rawScore = answers[q.id] || 0; // 1-5 scale
      // Convert 1-5 to 0-100
      const normalized = (rawScore / 5) * 100;
      
      const dim = q.dimension;
      scores[dim] = (scores[dim] || 0) + normalized;
      counts[dim] = (counts[dim] || 0) + 1;
    });

    // Average out
    Object.keys(scores).forEach(k => {
      const key = k as LiteracyDimension;
      if (counts[key]) scores[key] = Math.round(scores[key] / counts[key]);
    });

    const totalAvg = Object.values(scores).reduce((a, b) => a + b, 0) / 6;
    let riskLevel: 'Low' | 'Moderate' | 'High' = 'Low';
    if (totalAvg < 50) riskLevel = 'High';
    else if (totalAvg < 70) riskLevel = 'Moderate';

    // Determine LiteracyLevel based on totalAvg
    let level: LiteracyLevel = 'Beginner';
    if (totalAvg >= 80) level = 'Advanced';
    else if (totalAvg >= 70) level = 'Proficient';
    else if (totalAvg >= 60) level = 'Intermediate';
    else if (totalAvg >= 50) level = 'Basic';
    else level = 'Beginner';

    const newProfile: StudentProfile = {
      id: `ST${Date.now()}`,
      name: studentInfo.name,
      grade: studentInfo.grade,
      gender: 'Other', // Simplified for demo
      age: parseInt(studentInfo.age) || 12,
      scores,
      totalScore: parseFloat(totalAvg.toFixed(1)),
      level,
      riskLevel,
      assessedAt: new Date().toISOString().split('T')[0],
      history: [{ date: new Date().toISOString().split('T')[0], totalScore: parseFloat(totalAvg.toFixed(1)) }]
    };

    setTimeout(() => {
        setResultProfile(newProfile);
        setIsSubmitting(false);
    }, 800);
  };

  // Render Result Screen (The "Cute" Update)
  if (resultProfile) {
    // Use SCORE_LEVEL_CONFIGS based on the 5-tier level for accurate mapping
    const config = SCORE_LEVEL_CONFIGS[resultProfile.level];
    
    // Select Icon based on mascot config
    let IconComponent = Snail;
    if (config.iconName === 'rabbit') IconComponent = Rabbit;
    if (config.iconName === 'bird') IconComponent = Bird;
    if (config.iconName === 'rocket') IconComponent = Rocket;
    if (config.iconName === 'sparkles') IconComponent = Sparkles;

    return (
        <div className="max-w-md mx-auto my-8 animate-fade-in-up">
            <div className={`bg-white rounded-[2rem] shadow-xl overflow-hidden border-4 ${config.borderColor}`}>
                {/* Header Section */}
                <div className={`${config.bg} p-8 text-center flex flex-col items-center relative overflow-hidden`}>
                     {/* Background Decoration */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                        <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-full"></div>
                        <div className="absolute bottom-4 right-4 w-20 h-20 bg-white rounded-full"></div>
                    </div>

                    <div className="bg-white p-6 rounded-full shadow-lg mb-4 animate-pop-in relative z-10 border-4 border-white">
                        <IconComponent className={`w-20 h-20 ${config.textColor}`} strokeWidth={1.5} fill="currentColor" fillOpacity={0.1} />
                    </div>
                    
                    <h2 className={`text-2xl font-black ${config.textColor} mb-2 relative z-10`}>
                        {config.title}
                    </h2>
                    
                    <div className={`inline-block px-4 py-2 rounded-full bg-white shadow-sm text-sm font-bold ${config.textColor} relative z-10 mb-4`}>
                        {resultProfile.name}
                    </div>

                    <div className="flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm rounded-2xl p-4 w-full border border-white/50">
                        <span className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-1">คะแนนรวมของเธอ</span>
                        <span className="text-5xl font-black text-gray-800">{Math.round(resultProfile.totalScore)}</span>
                    </div>
                </div>

                {/* Body Section */}
                <div className="p-8 bg-white relative">
                    {/* Badge */}
                    <div className="flex justify-center -mt-12 mb-6 relative z-20">
                         <div className={`px-6 py-2 rounded-full shadow-md text-white font-bold text-lg flex items-center gap-2
                             ${resultProfile.level === 'Advanced' ? 'bg-emerald-400' : 
                               resultProfile.level === 'Proficient' ? 'bg-blue-400' : 
                               resultProfile.level === 'Intermediate' ? 'bg-amber-400' :
                               resultProfile.level === 'Basic' ? 'bg-orange-400' : 'bg-rose-400'}`}>
                             {config.badge}
                         </div>
                    </div>

                    {/* Encouragement Message (Distinct Section) */}
                    <div className="mb-6 relative">
                        <div className={`p-4 rounded-xl ${config.bg} border-l-4 ${config.borderColor} flex gap-3 items-start`}>
                            <Quote className={`w-6 h-6 ${config.textColor} shrink-0`} />
                            <p className={`${config.textColor} font-bold text-lg italic leading-tight`}>
                                "{config.encouragement}"
                            </p>
                        </div>
                    </div>

                    {/* What this means (Description) */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
                            <h3 className="font-bold text-gray-800 text-lg">ระดับนี้หมายความว่า...</h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed font-medium bg-gray-50 p-4 rounded-xl border border-gray-100">
                            {config.description}
                        </p>
                    </div>

                    {/* Next Steps (Recommendations) */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-3">
                            <Lightbulb className="w-5 h-5 text-amber-500 fill-amber-500" />
                            <h3 className="font-bold text-gray-800 text-lg">สิ่งที่ควรทำต่อไป</h3>
                        </div>
                        <ul className="space-y-2">
                            {config.recommendations.map((step, index) => (
                                <li key={index} className="flex gap-3 bg-white border border-gray-100 p-3 rounded-lg shadow-sm">
                                    <div className={`w-6 h-6 rounded-full ${config.bg} ${config.textColor} flex items-center justify-center font-bold text-xs shrink-0 mt-0.5`}>
                                        {index + 1}
                                    </div>
                                    <span className="text-gray-700 text-sm font-medium">{step}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Score Breakdown */}
                    <div className="mb-8 pt-6 border-t border-gray-100">
                         <h3 className="font-bold text-gray-800 mb-4 text-center text-sm uppercase tracking-wide">คะแนนรายด้าน</h3>
                         <div className="space-y-3">
                            {Object.entries(resultProfile.scores).map(([key, score]) => (
                                <div key={key}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600 font-medium">{DIMENSION_LABELS[key as LiteracyDimension]}</span>
                                        <span className="font-bold text-gray-800">{score}/100</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                                        <div 
                                            className={`h-2.5 rounded-full transition-all duration-1000 ease-out ${
                                                (score as number) >= 80 ? 'bg-green-400' : 
                                                (score as number) >= 50 ? 'bg-sky-400' : 'bg-orange-400'
                                            }`} 
                                            style={{ width: `${score}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                         </div>
                    </div>

                    <button
                        onClick={() => onComplete(resultProfile)}
                        className={`w-full py-4 rounded-xl shadow-lg shadow-indigo-200 text-white font-bold text-lg flex items-center justify-center gap-2 transition-transform transform active:scale-95 bg-indigo-500 hover:bg-indigo-600`}
                    >
                        ไปที่แฟ้มสะสมผลงาน
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
  }

  // Render Confirmation Step (Input Info)
  if (currentStep === ASSESSMENT_QUESTIONS.length && Object.keys(answers).length === ASSESSMENT_QUESTIONS.length) {
    return (
      <div className="max-w-lg mx-auto bg-white p-8 rounded-3xl shadow-xl text-center animate-fade-in-up border border-gray-100">
         <div className="mb-6 flex justify-center">
            <div className="bg-green-100 p-6 rounded-full animate-bounce">
                <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
         </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">ทำแบบประเมินเสร็จแล้ว!</h2>
        <p className="text-gray-500 mb-8">เก่งมากเลย มาดูกันว่าเธอได้คะแนนเท่าไหร่</p>
        
        <div className="space-y-4 text-left bg-gray-50 p-6 rounded-2xl mb-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">ชื่อ-นามสกุล</label>
            <input 
              type="text" 
              className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-3"
              value={studentInfo.name}
              onChange={e => setStudentInfo({...studentInfo, name: e.target.value})}
              placeholder="เช่น ด.ช. รักเรียน ..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">ชั้นเรียน</label>
                <input 
                  type="text" 
                  className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-3"
                  value={studentInfo.grade}
                  onChange={e => setStudentInfo({...studentInfo, grade: e.target.value})}
                  placeholder="เช่น ม.1/1"
                />
             </div>
             <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">อายุ</label>
                <input 
                  type="number" 
                  className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-3"
                  value={studentInfo.age}
                  onChange={e => setStudentInfo({...studentInfo, age: e.target.value})}
                  placeholder="12"
                />
             </div>
          </div>
        </div>

        <button
          onClick={calculateResults}
          disabled={!studentInfo.name || isSubmitting}
          className="w-full py-4 rounded-xl shadow-md text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isSubmitting ? 'กำลังคำนวณคะแนน...' : '✨ ดูผลลัพธ์ของฉัน ✨'}
        </button>
      </div>
    );
  }

  // Render Intermediate Feedback Screen
  if (showFeedback) {
      const currentQ = ASSESSMENT_QUESTIONS[currentStep];
      const feedback = DIMENSION_FEEDBACK[currentQ.dimension];
      
      return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-xl min-h-[400px] flex flex-col justify-center items-center text-center animate-pop-in border border-gray-100">
           <div className="bg-green-100 p-6 rounded-full mb-6">
              <Sparkles className="w-12 h-12 text-green-600" />
           </div>
           <h3 className="text-xl font-bold text-gray-800 mb-4">เยี่ยมมาก!</h3>
           <p className="text-gray-600 mb-8 text-lg font-medium leading-relaxed">{feedback}</p>
           <button 
             onClick={handleNextQuestion}
             className="w-full py-4 rounded-xl bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
           >
             ไปข้อต่อไป <ArrowRight className="w-5 h-5" />
           </button>
        </div>
      );
  }

  // Render Question Step
  const question = ASSESSMENT_QUESTIONS[currentStep];

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-xl min-h-[400px] flex flex-col justify-between animate-fade-in-up border border-gray-100">
      <div>
        <div className="flex justify-between items-center mb-8">
            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold tracking-wider uppercase">
                ข้อที่ {currentStep + 1} / {ASSESSMENT_QUESTIONS.length}
            </span>
            <span className="text-xs text-gray-400 font-medium bg-gray-50 px-2 py-1 rounded">
                ด้าน: {DIMENSION_LABELS[question.dimension]}
            </span>
        </div>
        
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-10 leading-relaxed text-center">
          "{question.text}"
        </h3>

        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((score) => (
            <button
              key={score}
              onClick={() => handleAnswer(score)}
              className={`w-full text-left px-6 py-4 border-2 rounded-2xl transition-all duration-200 flex items-center group
                ${answers[question.id] === score 
                    ? 'border-indigo-500 bg-indigo-50 shadow-md transform scale-[1.02]' 
                    : 'border-gray-100 hover:border-indigo-200 hover:bg-gray-50'}`}
            >
              <span className={`w-8 h-8 rounded-full border-2 mr-4 flex items-center justify-center text-sm font-bold transition-colors
                 ${answers[question.id] === score ? 'border-indigo-500 bg-indigo-500 text-white' : 'border-gray-300 text-gray-400 group-hover:border-indigo-300'}`}>
                 {answers[question.id] === score ? <Send className="w-4 h-4" /> : score}
              </span>
              <span className={`font-medium ${answers[question.id] === score ? 'text-indigo-900' : 'text-gray-600'}`}>
                {score === 5 ? '😊 ทำได้ดีมาก / เห็นด้วยอย่างยิ่ง' : 
                 score === 4 ? '🙂 ทำได้ดี / เห็นด้วย' :
                 score === 3 ? '😐 พอใช้ / เฉยๆ' :
                 score === 2 ? '😕 ควรปรับปรุง / ไม่เห็นด้วย' : '☹️ ทำไม่ได้เลย / ไม่เห็นด้วยอย่างยิ่ง'}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-4">
        <div className="w-full bg-gray-100 rounded-full h-2">
            <div 
                className="bg-indigo-500 h-2 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${((Object.keys(answers).length) / ASSESSMENT_QUESTIONS.length) * 100}%` }}
            ></div>
        </div>
        <button onClick={onCancel} className="text-sm text-gray-400 hover:text-gray-600 self-center">
            ยกเลิกการทำแบบประเมิน
        </button>
      </div>
    </div>
  );
};

export default AssessmentForm;