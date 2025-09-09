export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin' | 'alumni';
  enrollmentNumber?: string;
  course?: string;
  year?: string;
  semester?: string;
  department?: string;
  graduationYear?: string;
  currentPosition?: string;
}

export interface Notice {
  id: string;
  title: string;
  date: string;
  content: string;
  isNew: boolean;
  category: 'general' | 'admission' | 'exam' | 'tender';
}

export interface Course {
  id: string;
  name: string;
  code: string;
  semester: number;
  department: string;
  credits: number;
}

export interface Result {
  id: string;
  studentId: string;
  courseId: string;
  courseName: string;
  marks: number;
  grade: string;
  semester: number;
  year: string;
}

export interface AlumniTestimonial {
  id: string;
  name: string;
  graduationYear: string;
  quote: string;
  currentPosition: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}