import { LiteracyDimension, Question, StudentProfile, LiteracyLevel } from './types';

export const DIMENSION_LABELS: Record<LiteracyDimension, string> = {
  [LiteracyDimension.TRADITIONAL]: 'การรู้หนังสือทั่วไป',
  [LiteracyDimension.INFORMATION]: 'การรู้สารสนเทศ',
  [LiteracyDimension.MEDIA]: 'การรู้เท่าทันสื่อ',
  [LiteracyDimension.HEALTH]: 'การรู้สุขภาพ',
  [LiteracyDimension.COMPUTER]: 'การรู้คอมพิวเตอร์',
  [LiteracyDimension.SCIENCE]: 'การรู้วิทยาศาสตร์'
};

export const DIMENSION_ADVICE: Record<string, string> = {
  'การรู้หนังสือทั่วไป': 'ลองฝึกอ่านฉลากยาหรือบทความสุขภาพสั้นๆ วันละนิด จะช่วยให้เข้าใจศัพท์ยากๆ ได้ดีขึ้นนะ',
  'การรู้สารสนเทศ': 'ก่อนเชื่อข้อมูลในเน็ต ลองเช็คดูว่าใครเป็นคนเขียน และมีวันที่ระบุชัดเจนไหม',
  'การรู้เท่าทันสื่อ': 'อย่าเพิ่งรีบแชร์! ลองตรวจสอบกับข่าวหลายๆ ช่องทางก่อนนะว่าจริงหรือมั่ว',
  'การรู้สุขภาพ': 'สังเกตอาการตัวเองบ่อยๆ และลองจดบันทึกดูว่าทำอะไรแล้วสุขภาพดีขึ้นบ้าง',
  'การรู้คอมพิวเตอร์': 'ฝึกใช้แอปฯ สุขภาพหรือเว็บหมอพร้อม จะช่วยให้เข้าถึงข้อมูลได้ไวขึ้นนะ',
  'การรู้วิทยาศาสตร์': 'ลองตั้งคำถามว่า "ทำไม" กับเรื่องสุขภาพดู เช่น ทำไมเราต้องล้างมือ? จะช่วยให้เข้าใจลึกซึ้งขึ้น'
};

export const DIMENSION_FEEDBACK: Record<LiteracyDimension, string> = {
  [LiteracyDimension.TRADITIONAL]: 'การอ่านและเข้าใจศัพท์แพทย์เป็นพื้นฐานสำคัญ เยี่ยมมากที่หนูพยายามเรียนรู้!',
  [LiteracyDimension.INFORMATION]: 'การรู้แหล่งข้อมูลที่ถูกต้องช่วยให้เราปลอดภัยจากความเชื่อผิดๆ นะ',
  [LiteracyDimension.MEDIA]: 'ในยุคนี้ข่าวปลอมเยอะมาก การคิดก่อนเชื่อคือเกราะป้องกันที่ดีที่สุด!',
  [LiteracyDimension.HEALTH]: 'ความเข้าใจเรื่องสุขภาพจะช่วยให้หนูดูแลตัวเองและคนที่รักได้ดียิ่งขึ้น',
  [LiteracyDimension.COMPUTER]: 'เทคโนโลยีทำให้เราเข้าถึงหมอและข้อมูลได้ไวขึ้น ฝึกใช้บ่อยๆ เก่งแน่นอน!',
  [LiteracyDimension.SCIENCE]: 'วิทยาศาสตร์ช่วยอธิบายเหตุผลของสิ่งต่างๆ ได้ ความสงสัยคือจุดเริ่มต้นของการเรียนรู้!'
};

interface LevelConfig {
  title: string;
  iconName: 'snail' | 'rabbit' | 'bird' | 'rocket' | 'sparkles';
  color: string;
  bg: string;
  borderColor: string;
  textColor: string;
  badge: string;
  description: string;
  recommendations: string[];
  encouragement: string;
}

export const SCORE_LEVEL_CONFIGS: Record<LiteracyLevel, LevelConfig> = {
  Beginner: {
    title: 'Beginner',
    iconName: 'snail',
    color: 'text-rose-500',
    bg: 'bg-rose-50',
    borderColor: 'border-rose-200',
    textColor: 'text-rose-700',
    badge: 'น้องหอยทากจอมขยัน',
    description: 'หนูเพิ่งเริ่มต้นเดินทางในโลกสุขภาพดิจิทัล ค่อยๆ ก้าวไปทีละนิดเหมือนน้องหอยทากนะ ถึงจะช้าแต่ถ้าไม่หยุดเดินก็ถึงเส้นชัยแน่นอน!',
    recommendations: [
      'ถามคุณครูหรือผู้ปกครองเมื่อเจอข้อมูลสุขภาพที่ไม่เข้าใจ',
      'ระวังโฆษณาที่ดูเกินจริง หรือให้รางวัลแปลกๆ',
      'เริ่มจากอ่านฉลากขนมหรือนมที่ดื่มทุกวัน'
    ],
    encouragement: 'ก้าวแรกสำคัญที่สุด! ค่อยๆ เรียนรู้ไปนะ'
  },
  Basic: {
    title: 'Basic',
    iconName: 'rabbit',
    color: 'text-orange-500',
    bg: 'bg-orange-50',
    borderColor: 'border-orange-200',
    textColor: 'text-orange-700',
    badge: 'กระต่ายน้อยนักสำรวจ',
    description: 'หนูมีความรวดเร็วในการเรียนรู้เหมือนกระต่ายน้อย! แต่บางครั้งข้อมูลในโลกออนไลน์ก็ซับซ้อน ต้องระวังหลุมพรางข่าวปลอมด้วยนะ',
    recommendations: [
      'ฝึกสังเกต "วันที่" ของบทความว่าเก่าไปไหม',
      'ลองเปรียบเทียบข้อมูลจาก 2 เว็บไซต์ว่าตรงกันไหม',
      'ใช้แอปพลิเคชันสุขภาพง่ายๆ ในการบันทึกข้อมูล'
    ],
    encouragement: 'กระโดดไปข้างหน้า! เก็บเกี่ยวความรู้ใหม่ๆ เสมอนะ'
  },
  Intermediate: {
    title: 'Intermediate',
    iconName: 'bird',
    color: 'text-amber-500',
    bg: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-700',
    badge: 'นกน้อยเจ้าเวหา',
    description: 'บินสูงแล้ว! หนูเริ่มมองเห็นภาพรวมของสุขภาพได้กว้างไกลขึ้น แยกแยะข่าวจริง/ปลอมได้เก่ง พัฒนาทักษะการบิน (การวิเคราะห์) อีกนิดจะเยี่ยมเลย',
    recommendations: [
      'ตรวจสอบแหล่งที่มาของข้อมูล (เช่น .gov, .org เชื่อถือได้มากกว่า)',
      'ลองอธิบายเรื่องสุขภาพที่อ่านมาให้เพื่อนฟัง',
      'ระวังเรื่องความปลอดภัยข้อมูลส่วนตัวบนโลกออนไลน์'
    ],
    encouragement: 'บินให้สูงขึ้นไปอีก! ท้องฟ้าแห่งความรู้ไม่มีที่สิ้นสุด'
  },
  Proficient: {
    title: 'Proficient',
    iconName: 'rocket',
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700',
    badge: 'จรวดพุ่งทะยาน',
    description: 'ว้าว! ความรู้หนูพุ่งแรงเหมือนจรวด จัดการข้อมูลสุขภาพได้รวดเร็วและแม่นยำ เป็นที่พึ่งพาให้คนรอบข้างได้เลย',
    recommendations: [
      'ช่วยตรวจสอบข่าวปลอม (Fake News) ให้คนรอบข้าง',
      'ศึกษาเรื่องศัพท์เฉพาะทางวิทยาศาสตร์เพิ่มเติม',
      'นำความรู้ไปปรับใช้ดูแลสุขภาพคนในครอบครัว'
    ],
    encouragement: 'พุ่งทะยานสู่ดวงดาว! หนูทำได้ยอดเยี่ยมมาก'
  },
  Advanced: {
    title: 'Advanced',
    iconName: 'sparkles',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-700',
    badge: 'ซูเปอร์สตาร์สุขภาพ',
    description: 'เปล่งประกายสุดๆ! หนูคือดาวเด่นที่มีทักษะรอบด้าน วิเคราะห์ลึกซึ้งและแก้ปัญหาได้จริง ใครๆ ก็อยากขอคำแนะนำจากหนู',
    recommendations: [
      'เป็นผู้นำกิจกรรมสุขภาพในโรงเรียน',
      'สร้างคอนเทนต์หรือโปสเตอร์ให้ความรู้เพื่อนๆ',
      'ติดตามงานวิจัยหรือนวัตกรรมสุขภาพใหม่ๆ เสมอ'
    ],
    encouragement: 'หนูคือแบบอย่างที่ดีที่สุด! รักษาความสดใสนี้ไว้นะ'
  }
};

// Map old logic for backward compatibility (using Risk Level to map to closest Profile Level config)
export const LEVEL_CONFIGS = {
  Low: SCORE_LEVEL_CONFIGS.Proficient, 
  Moderate: SCORE_LEVEL_CONFIGS.Intermediate,
  High: SCORE_LEVEL_CONFIGS.Beginner
};

export const ASSESSMENT_QUESTIONS: Question[] = [
  // Traditional
  { id: 1, text: "ฉันสามารถอ่านและเข้าใจคำศัพท์ทางการแพทย์พื้นฐานได้", dimension: LiteracyDimension.TRADITIONAL },
  // Information
  { id: 2, text: "ฉันรู้วิธีค้นหาข้อมูลสุขภาพที่เชื่อถือได้จากอินเทอร์เน็ต", dimension: LiteracyDimension.INFORMATION },
  // Media
  { id: 3, text: "ฉันสามารถแยกแยะระหว่างข่าวสุขภาพจริงและข่าวปลอมได้", dimension: LiteracyDimension.MEDIA },
  // Health
  { id: 4, text: "ฉันเข้าใจวิธีการดูแลสุขภาพเบื้องต้นเมื่อเจ็บป่วย", dimension: LiteracyDimension.HEALTH },
  // Computer
  { id: 5, text: "ฉันใช้แอปพลิเคชันหรือเว็บไซต์เพื่อบันทึกข้อมูลสุขภาพได้", dimension: LiteracyDimension.COMPUTER },
  // Science
  { id: 6, text: "ฉันเข้าใจเหตุผลทางวิทยาศาสตร์เบื้องต้นเกี่ยวกับโรคระบาด", dimension: LiteracyDimension.SCIENCE },
];

export const MOCK_STUDENTS: StudentProfile[] = [
  {
    id: "ST001",
    name: "ด.ช. สมชาย ใจดี",
    grade: "ม.1/1",
    gender: "Male",
    age: 13,
    scores: {
      [LiteracyDimension.TRADITIONAL]: 80,
      [LiteracyDimension.INFORMATION]: 40,
      [LiteracyDimension.MEDIA]: 30,
      [LiteracyDimension.HEALTH]: 70,
      [LiteracyDimension.COMPUTER]: 90,
      [LiteracyDimension.SCIENCE]: 50,
    },
    totalScore: 60,
    level: "Intermediate",
    riskLevel: "Moderate",
    assessedAt: "2023-10-15",
    history: [{ date: "2023-01-10", totalScore: 55 }, { date: "2023-10-15", totalScore: 60 }]
  },
  {
    id: "ST002",
    name: "ด.ญ. มานี มีตา",
    grade: "ม.1/1",
    gender: "Female",
    age: 13,
    scores: {
      [LiteracyDimension.TRADITIONAL]: 90,
      [LiteracyDimension.INFORMATION]: 85,
      [LiteracyDimension.MEDIA]: 80,
      [LiteracyDimension.HEALTH]: 85,
      [LiteracyDimension.COMPUTER]: 95,
      [LiteracyDimension.SCIENCE]: 90,
    },
    totalScore: 87.5,
    level: "Advanced",
    riskLevel: "Low",
    assessedAt: "2023-10-15",
    history: [{ date: "2023-10-15", totalScore: 87.5 }]
  },
  {
    id: "ST003",
    name: "ด.ช. กล้าหาญ ชาญชัย",
    grade: "ม.1/2",
    gender: "Male",
    age: 12,
    scores: {
      [LiteracyDimension.TRADITIONAL]: 40,
      [LiteracyDimension.INFORMATION]: 30,
      [LiteracyDimension.MEDIA]: 20,
      [LiteracyDimension.HEALTH]: 50,
      [LiteracyDimension.COMPUTER]: 60,
      [LiteracyDimension.SCIENCE]: 30,
    },
    totalScore: 38.3,
    level: "Beginner",
    riskLevel: "High",
    assessedAt: "2023-10-18",
    history: [{ date: "2023-10-18", totalScore: 38.3 }]
  },
  {
    id: "ST004",
    name: "ด.ญ. กิ่งแก้ว แวววาว",
    grade: "ม.1/2",
    gender: "Female",
    age: 13,
    scores: {
      [LiteracyDimension.TRADITIONAL]: 60,
      [LiteracyDimension.INFORMATION]: 50,
      [LiteracyDimension.MEDIA]: 50,
      [LiteracyDimension.HEALTH]: 60,
      [LiteracyDimension.COMPUTER]: 50,
      [LiteracyDimension.SCIENCE]: 55,
    },
    totalScore: 54.1,
    level: "Basic",
    riskLevel: "Moderate",
    assessedAt: "2023-10-20",
    history: [{ date: "2023-10-20", totalScore: 54.1 }]
  },
  {
    id: "ST005",
    name: "ด.ช. ปัญญา เลิศล้ำ",
    grade: "ม.1/1",
    gender: "Male",
    age: 13,
    scores: {
      [LiteracyDimension.TRADITIONAL]: 80,
      [LiteracyDimension.INFORMATION]: 75,
      [LiteracyDimension.MEDIA]: 70,
      [LiteracyDimension.HEALTH]: 75,
      [LiteracyDimension.COMPUTER]: 80,
      [LiteracyDimension.SCIENCE]: 70,
    },
    totalScore: 75.0,
    level: "Proficient",
    riskLevel: "Low",
    assessedAt: "2023-10-21",
    history: [{ date: "2023-10-21", totalScore: 75.0 }]
  }
];