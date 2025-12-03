import React, { useState } from 'react';
import { Activity, BookOpen, Users, LogOut, BarChart2, PlusCircle, AlertTriangle, Bell } from 'lucide-react';
import AssessmentForm from './components/AssessmentForm';
import { MOCK_STUDENTS } from './constants';
import { StudentProfile } from './types';
import { ScoreRadarChart, ClassComparisonChart } from './components/DashboardCharts';
import StudentProfileView from './components/StudentProfileView';
import { generateClassReport } from './services/geminiService';

enum AppMode {
  LANDING,
  STUDENT_ASSESSMENT,
  STUDENT_DASHBOARD, // New mode for student viewing their own result
  TEACHER_DASHBOARD,
}

function App() {
  const [mode, setMode] = useState<AppMode>(AppMode.LANDING);
  const [students, setStudents] = useState<StudentProfile[]>(MOCK_STUDENTS);
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);
  const [classReport, setClassReport] = useState<string | null>(null);
  const [generatingReport, setGeneratingReport] = useState(false);

  const handleAssessmentComplete = (profile: StudentProfile) => {
    setStudents(prev => [profile, ...prev]);
    setSelectedStudent(profile);
    // Switch to Student Dashboard mode instead of Teacher Dashboard
    setMode(AppMode.STUDENT_DASHBOARD); 
  };

  const handleGenerateClassReport = async () => {
    setGeneratingReport(true);
    const report = await generateClassReport(students);
    setClassReport(report);
    setGeneratingReport(false);
  };

  const renderLanding = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 p-10 flex flex-col justify-center bg-indigo-600 text-white">
          <div className="mb-6 bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Health-Me</h1>
          <p className="text-indigo-100 text-lg leading-relaxed mb-8">
            ระบบแฟ้มสะสมสุขภาพดิจิทัลอัจฉริยะ ติดตามและพัฒนาความฉลาดรู้ทางสุขภาพอิเล็กทรอนิกส์ (e-Health Literacy) สำหรับนักเรียนยุคใหม่
          </p>
          <div className="flex gap-2 text-sm font-medium bg-indigo-800/30 p-4 rounded-lg">
             <AlertTriangle className="w-5 h-5 text-yellow-300 shrink-0" />
             <span>ระบบ AI ช่วยวิเคราะห์ความเสี่ยงและแจ้งเตือนครูอัตโนมัติ</span>
          </div>
        </div>
        <div className="md:w-1/2 p-10 flex flex-col justify-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">เข้าสู่ระบบ</h2>
            
            <button 
                onClick={() => setMode(AppMode.STUDENT_ASSESSMENT)}
                className="w-full group relative flex items-center p-4 border-2 border-gray-100 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200"
            >
                <div className="bg-blue-100 p-3 rounded-full mr-4 group-hover:bg-blue-200 transition-colors">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-left">
                    <span className="block font-bold text-gray-800">สำหรับนักเรียน</span>
                    <span className="text-sm text-gray-500">ทำแบบประเมินสุขภาพ (E-Health Survey)</span>
                </div>
            </button>

            <button 
                onClick={() => setMode(AppMode.TEACHER_DASHBOARD)}
                className="w-full group relative flex items-center p-4 border-2 border-gray-100 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200"
            >
                <div className="bg-emerald-100 p-3 rounded-full mr-4 group-hover:bg-emerald-200 transition-colors">
                    <Users className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="text-left">
                    <span className="block font-bold text-gray-800">สำหรับครู / ผู้บริหาร</span>
                    <span className="text-sm text-gray-500">ดู Dashboard และรายงานภาพรวม</span>
                </div>
            </button>
        </div>
      </div>
    </div>
  );

  const renderTeacherDashboard = () => {
    const highRiskStudents = students.filter(s => s.riskLevel === 'High');

    return (
    <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
            <div className="p-6 border-b border-gray-100 flex items-center gap-2">
                <Activity className="w-6 h-6 text-indigo-600" />
                <span className="font-bold text-gray-800">HealthPortfolio</span>
            </div>
            <nav className="flex-1 p-4 space-y-1">
                <button 
                    onClick={() => setSelectedStudent(null)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors
                    ${!selectedStudent ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                    <BarChart2 className="w-5 h-5" />
                    ภาพรวมห้องเรียน
                </button>
                <div className="pt-4 pb-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider flex justify-between items-center">
                    นักเรียน
                    {highRiskStudents.length > 0 && (
                        <span className="bg-red-100 text-red-600 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                            {highRiskStudents.length} alerts
                        </span>
                    )}
                </div>
                <div className="space-y-1 overflow-y-auto max-h-[500px]">
                    {students.map(s => (
                        <button
                            key={s.id}
                            onClick={() => setSelectedStudent(s)}
                            className={`w-full flex items-center justify-between px-4 py-2 text-sm rounded-lg transition-colors
                            ${selectedStudent?.id === s.id ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            <span>{s.name}</span>
                            {s.riskLevel === 'High' && <AlertTriangle className="w-4 h-4 text-red-500" />}
                        </button>
                    ))}
                </div>
            </nav>
            <div className="p-4 border-t border-gray-100">
                <button onClick={() => setMode(AppMode.LANDING)} className="flex items-center gap-2 text-gray-500 hover:text-red-600 text-sm font-medium">
                    <LogOut className="w-4 h-4" />
                    ออกจากระบบ
                </button>
            </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10 px-4 md:px-8 py-4 flex justify-between items-center md:hidden">
                <div className="flex items-center gap-2">
                    <Activity className="w-6 h-6 text-indigo-600" />
                    <span className="font-bold text-gray-800">HealthPortfolio</span>
                </div>
                <div className="flex items-center gap-3">
                     {highRiskStudents.length > 0 && (
                        <div className="relative">
                            <Bell className="w-5 h-5 text-gray-500" />
                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                        </div>
                     )}
                    <button onClick={() => setMode(AppMode.LANDING)} className="text-gray-500"><LogOut className="w-5 h-5"/></button>
                </div>
            </header>

            <main className="p-4 md:p-8 max-w-7xl mx-auto">
                {selectedStudent ? (
                    <StudentProfileView student={selectedStudent} onBack={() => setSelectedStudent(null)} />
                ) : (
                    <div className="space-y-8 animate-fade-in">
                        {/* High Risk Notification Banner */}
                        {highRiskStudents.length > 0 && (
                            <div className="bg-white border-l-4 border-red-500 rounded-xl shadow-sm p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-fade-in-up">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-red-50 rounded-full shrink-0">
                                        <AlertTriangle className="w-6 h-6 text-red-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-lg">แจ้งเตือนกลุ่มเสี่ยง (High Risk Alerts)</h3>
                                        <p className="text-gray-600 mt-1">
                                            พบนักเรียน <span className="font-bold text-red-600">{highRiskStudents.length} คน</span> มีระดับความฉลาดรู้ทางสุขภาพต่ำกว่าเกณฑ์
                                        </p>
                                    </div>
                                </div>
                                <div className="w-full md:w-auto flex flex-wrap gap-2 justify-end">
                                    {highRiskStudents.map(s => (
                                        <button 
                                            key={s.id}
                                            onClick={() => setSelectedStudent(s)}
                                            className="flex items-center gap-2 px-3 py-1.5 bg-red-50 hover:bg-red-100 border border-red-100 rounded-full transition-colors group"
                                        >
                                            <span className="text-xs font-semibold text-red-700">{s.name}</span>
                                            <AlertTriangle className="w-3 h-3 text-red-400 group-hover:text-red-600" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">ภาพรวมห้องเรียน (ม.1)</h1>
                                <p className="text-gray-500">ติดตามสถานะ E-Health Literacy และกลุ่มเสี่ยง</p>
                            </div>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => setMode(AppMode.STUDENT_ASSESSMENT)}
                                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm font-medium"
                                >
                                    <PlusCircle className="w-4 h-4" />
                                    จำลอง นร. ทำแบบทดสอบ
                                </button>
                                <button 
                                    onClick={handleGenerateClassReport}
                                    disabled={generatingReport}
                                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium disabled:opacity-50"
                                >
                                    {generatingReport ? 'กำลังสร้าง...' : 'สร้างรายงานสรุป (AI)'}
                                </button>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <div className="text-sm font-medium text-gray-500 mb-1">นักเรียนทั้งหมด</div>
                                <div className="text-3xl font-bold text-gray-900">{students.length}</div>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden">
                                {highRiskStudents.length > 0 && <div className="absolute right-0 top-0 w-16 h-16 bg-red-100 rounded-bl-full -mr-8 -mt-8"></div>}
                                <div className="text-sm font-medium text-gray-500 mb-1">กลุ่มเสี่ยง (High Risk)</div>
                                <div className={`text-3xl font-bold ${highRiskStudents.length > 0 ? 'text-red-600' : 'text-gray-900'}`}>
                                    {highRiskStudents.length}
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <div className="text-sm font-medium text-gray-500 mb-1">คะแนนเฉลี่ยรวม</div>
                                <div className="text-3xl font-bold text-indigo-600">
                                    {(students.reduce((acc, s) => acc + s.totalScore, 0) / students.length).toFixed(1)}
                                </div>
                            </div>
                        </div>

                        {/* Charts Area */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="font-semibold text-gray-800 mb-6">คะแนนเฉลี่ยรายด้าน (Class Average)</h3>
                                <ClassComparisonChart students={students} />
                             </div>

                             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
                                <h3 className="font-semibold text-gray-800 mb-4">รายงานสรุปผล (AI Report)</h3>
                                <div className="flex-1 bg-indigo-50 rounded-lg p-4 text-sm text-gray-700 overflow-y-auto max-h-[300px]">
                                    {classReport ? (
                                        <div className="prose prose-sm max-w-none whitespace-pre-line">
                                            {classReport}
                                        </div>
                                    ) : (
                                        <div className="h-full flex flex-col items-center justify-center text-gray-400 text-center">
                                            <p>ยังไม่มีรายงาน</p>
                                            <p className="text-xs mt-1">กดปุ่ม "สร้างรายงานสรุป" เพื่อวิเคราะห์ข้อมูลห้องเรียน</p>
                                        </div>
                                    )}
                                </div>
                             </div>
                        </div>

                        {/* Table */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100">
                                <h3 className="font-semibold text-gray-800">รายชื่อนักเรียนและสถานะ</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-50 text-gray-500 font-medium">
                                        <tr>
                                            <th className="px-6 py-3">ชื่อ-นามสกุล</th>
                                            <th className="px-6 py-3">ชั้น</th>
                                            <th className="px-6 py-3">คะแนนรวม</th>
                                            <th className="px-6 py-3">สถานะความเสี่ยง</th>
                                            <th className="px-6 py-3">วันที่ประเมิน</th>
                                            <th className="px-6 py-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {students.map((s) => (
                                            <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 font-medium text-gray-900">{s.name}</td>
                                                <td className="px-6 py-4 text-gray-500">{s.grade}</td>
                                                <td className="px-6 py-4">
                                                    <span className="font-semibold">{s.totalScore}</span>
                                                    <span className="text-gray-400 text-xs ml-1">/100</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold
                                                        ${s.riskLevel === 'High' ? 'bg-red-100 text-red-700' : 
                                                          s.riskLevel === 'Moderate' ? 'bg-yellow-100 text-yellow-700' : 
                                                          'bg-green-100 text-green-700'}`}>
                                                        {s.riskLevel}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-gray-500">{s.assessedAt}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <button 
                                                        onClick={() => setSelectedStudent(s)}
                                                        className="text-indigo-600 hover:text-indigo-900 font-medium"
                                                    >
                                                        ดูรายละเอียด
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    </div>
    );
  };

  return (
    <div className="font-sans text-gray-900">
      {mode === AppMode.LANDING && renderLanding()}
      {mode === AppMode.STUDENT_ASSESSMENT && (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
             <div className="max-w-3xl mx-auto mb-8 text-center">
                <h1 className="text-2xl font-bold text-gray-800">แบบประเมินความฉลาดรู้ทางสุขภาพ</h1>
                <p className="text-gray-600">Health Literacy Assessment (Norman & Skinner)</p>
             </div>
            <AssessmentForm 
                onComplete={handleAssessmentComplete} 
                onCancel={() => setMode(AppMode.LANDING)} 
            />
        </div>
      )}
      
      {/* New Mode: Student viewing their own dashboard */}
      {mode === AppMode.STUDENT_DASHBOARD && selectedStudent && (
        <div className="min-h-screen bg-indigo-50/50">
             <header className="bg-white border-b border-gray-200 sticky top-0 z-10 px-4 md:px-8 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Activity className="w-6 h-6 text-indigo-600" />
                    <span className="font-bold text-gray-800">แฟ้มสะสมงานของฉัน</span>
                </div>
                <button onClick={() => setMode(AppMode.LANDING)} className="text-sm font-bold text-indigo-600 hover:text-indigo-800">
                    เสร็จสิ้น
                </button>
            </header>
            <main className="p-4 md:p-8 max-w-4xl mx-auto">
                <StudentProfileView 
                    student={selectedStudent} 
                    onBack={() => setMode(AppMode.LANDING)}
                    backLabel="กลับหน้าหลัก"
                />
            </main>
        </div>
      )}

      {mode === AppMode.TEACHER_DASHBOARD && renderTeacherDashboard()}
    </div>
  );
}

export default App;