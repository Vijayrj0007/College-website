import { Notice, Course, Result, AlumniTestimonial, User } from '../types';

export const mockNotices: Notice[] = [
  {
    id: '1',
    title: 'B.Tech Admission 2025-26: Applications Open via JEE Main/JCECE',
    date: '2025-01-15',
    content: 'Applications are now open for B.Tech programs in CSE, IT, ECE, and ME. Total intake: 210 seats. Eligibility: 10+2 with PCM (50% General, 40% reserved). Fees: ₹65,000-75,000 per year.',
    isNew: true,
    category: 'admission'
  },
  {
    id: '2',
    title: 'Semester Examination Schedule - Even Semester 2024-25',
    date: '2025-01-12',
    content: 'The examination schedule for even semester 2024-25 has been published. All students must check their exam dates and report to examination cell for any queries.',
    isNew: true,
    category: 'exam'
  },
  {
    id: '3',
    title: 'Library Extended Hours During Exam Period',
    date: '2025-01-10',
    content: 'The central library (10,000+ volumes) will remain open until 10 PM during the examination period to support student preparation.',
    isNew: false,
    category: 'general'
  },
  {
    id: '4',
    title: 'Tender Notice: Computer Lab Upgradation',
    date: '2025-01-08',
    content: 'Sealed tenders invited for computer lab upgradation and new equipment procurement for CSE and IT departments.',
    isNew: false,
    category: 'tender'
  },
  {
    id: '5',
    title: 'UCET TechFest 2025 - Annual Technical Festival',
    date: '2025-01-05',
    content: 'Registration open for UCET TechFest 2025 scheduled for March. Competitions in coding, robotics, project presentation, and technical paper presentation.',
    isNew: false,
    category: 'general'
  },
  {
    id: '6',
    title: 'Placement Drive Results - 40% Students Placed',
    date: '2025-01-03',
    content: 'Successful placement drive concluded with 40% placement rate. Recruiters: TCS, Infosys, Wipro, Cognizant, Accenture. Median package: ₹4-5 LPA.',
    isNew: false,
    category: 'placement'
  }
];

export const mockCourses: Course[] = [
  {
    id: '1',
    name: 'Introduction to Artificial Intelligence',
    code: 'AI101',
    semester: 1,
    department: 'Artificial Intelligence & Machine Learning',
    credits: 4
  },
  {
    id: '2',
    name: 'Engineering Mathematics I',
    code: 'MATH101',
    semester: 1,
    department: 'Mathematics',
    credits: 4
  },
  {
    id: '3',
    name: 'Programming in C',
    code: 'CS101',
    semester: 1,
    department: 'Computer Science',
    credits: 3
  },
  {
    id: '4',
    name: 'Engineering Chemistry',
    code: 'CHEM101',
    semester: 1,
    department: 'Chemistry',
    credits: 4
  }
];

export const mockResults: Result[] = [
  {
    id: '1',
    studentId: '20201234',
    courseId: '1',
    courseName: 'Introduction to Artificial Intelligence',
    marks: 88,
    grade: 'A',
    semester: 5,
    year: '2024'
  },
  {
    id: '2',
    studentId: '20201234',
    courseId: '2',
    courseName: 'Engineering Mathematics',
    marks: 92,
    grade: 'A+',
    semester: 5,
    year: '2024'
  },
  {
    id: '3',
    studentId: '20201234',
    courseId: '4',
    courseName: 'Engineering Chemistry',
    marks: 85,
    grade: 'A',
    semester: 5,
    year: '2024'
  }
];

export const mockAlumniTestimonials: AlumniTestimonial[] = [
  {
    id: '1',
    name: 'Anisha Kumari',
    graduationYear: '2018',
    quote: 'UCET VBU provided me with the foundational knowledge in computer science that enabled my transition into advanced research. The faculty support was instrumental in my journey to becoming an Assistant Professor and researcher in quantum computing.',
    currentPosition: 'Assistant Professor at KIIT University, Bhubaneswar'
  },
  {
    id: '2',
    name: 'Riti Kumari',
    graduationYear: '2019',
    quote: 'The practical approach to learning at UCET, especially in operating systems and database management, helped me build valuable resources that benefit the entire student community. The education here shaped my technical foundation.',
    currentPosition: 'Software Developer and CS Graduate from UCET VBU'
  },
  {
    id: '3',
    name: 'Sweta Sharma',
    graduationYear: '2020',
    quote: 'UCET fostered my interest in artificial intelligence and machine learning. The research culture and academic environment prepared me well for pursuing PhD studies and presenting at international conferences.',
    currentPosition: 'PhD Student at South Asian University'
  },
  {
    id: '4',
    name: 'Saurabh Kumar Deepak',
    graduationYear: '2016',
    quote: 'The comprehensive engineering education at UCET gave me the analytical and problem-solving skills that proved invaluable in my business career. The diverse learning environment prepared me for leadership roles.',
    currentPosition: 'Business Executive at IIFL Group'
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Rahul Kumar',
    email: 'rahul.kumar@student.vbu.ac.in',
    role: 'student',
    enrollmentNumber: '20211234',
    course: 'B.Tech Computer Science & Engineering',
    year: '2024',
    semester: '6',
    department: 'Computer Science & Engineering'
  },
  {
    id: '2',
    name: 'Mrs. Gita Sinha',
    email: 'gita.sinha@vbu.ac.in',
    role: 'teacher',
    department: 'Computer Science & Engineering',
    designation: 'Assistant Professor'
  },
  {
    id: '3',
    name: 'Dr. Kumar Vikas',
    email: 'ar2@vbu.ac.in',
    role: 'teacher',
    department: 'UCET',
    designation: 'Assistant Professor',
    mobile: '8340392633'
  },
  {
    id: '4',
    name: 'Dr. Ashish Kumar Saha',
    email: 'directorucet@vbu.ac.in',
    role: 'admin',
    department: 'Administration',
    designation: 'Director',
    mobile: '9430121110'
  },
  {
    id: '5',
    name: 'Mr. Arun Kumar Mishra',
    email: 'arun.mishra@vbu.ac.in',
    role: 'teacher',
    department: 'Information Technology',
    designation: 'Associate Professor'
  },
  {
    id: '6',
    name: 'Dr. Priya Sharma',
    email: 'priya.sharma@vbu.ac.in',
    role: 'teacher',
    department: 'Artificial Intelligence & Machine Learning',
    designation: 'Associate Professor',
    mobile: '9431387618'
  }
];

export const mockDepartments = [
  {
    name: 'Computer Science & Engineering',
    icon: '💻',
    description: 'Advanced computer science education focusing on programming, software development, AI, and emerging technologies. Well-equipped labs and industry-relevant curriculum.'
  },
  {
    name: 'Information Technology',
    icon: '🌐',
    description: 'Comprehensive IT programs covering software engineering, web development, database management, and modern IT solutions for industry applications.'
  },
  {
    name: 'Electronics & Communication Engineering',
    icon: '📡',
    description: 'Specialized programs in electronics, communication systems, signal processing, and embedded systems with state-of-the-art laboratories.'
  },
  {
    name: 'Mechanical Engineering',
    icon: '⚙️',
    description: 'Traditional mechanical engineering with modern CAD/CAM, manufacturing processes, thermal engineering, and industrial automation.'
  },
  {
    name: 'Artificial Intelligence & Machine Learning',
    icon: '🤖',
    description: 'Cutting-edge AI/ML programs focusing on deep learning, neural networks, data science, and intelligent systems with hands-on projects and industry applications.'
  }
];

export const mockPublications = [
  {
    title: 'UCET VBU Research Journal - Engineering & Technology',
    description: 'Annual peer-reviewed journal featuring research papers from faculty and students in engineering and technology.',
    downloadUrl: 'https://www.vbu.ac.in/department?dept=+UCET'
  },
  {
    title: 'B.Tech Syllabus and Curriculum 2024-25',
    description: 'Complete syllabus for all B.Tech programs: CSE, IT, ECE, and Mechanical Engineering.',
    downloadUrl: 'https://www.vbu.ac.in/department?dept=+UCET'
  },
  {
    title: 'UCET TechFest Proceedings',
    description: 'Collection of technical papers and project presentations from the annual technical festival.',
    downloadUrl: '#'
  },
  {
    title: 'Placement Brochure 2024',
    description: 'Comprehensive placement statistics, company profiles, and student achievements.',
    downloadUrl: '#'
  }
];

// Faculty data for detailed faculty section
export const facultyData = [
  {
    id: '1',
    name: 'Dr. Ashish Kumar Saha',
    designation: 'Director',
    department: 'Administration',
    qualification: 'Ph.D.',
    experience: '20+ years',
    mobile: '9430121110',
    email: 'directorucet@vbu.ac.in',
    alternateEmail: 'kumar_a_saha@yahoo.co.in',
    specialization: 'Administrative Leadership, Engineering Education',
    type: 'Regular'
  },
  {
    id: '2', 
    name: 'Mrs. Gita Sinha',
    designation: 'Assistant Professor',
    department: 'Computer Science & Engineering',
    qualification: 'M.Tech',
    experience: '158 months (13+ years)',
    joinDate: '03-10-2009',
    gender: 'Female',
    specialization: 'Computer Science, Software Engineering',
    type: 'Adhoc/Contractual'
  },
  {
    id: '3',
    name: 'Mr. Arun Kumar Mishra', 
    designation: 'Associate Professor',
    department: 'Information Technology',
    qualification: 'M.Tech',
    experience: '158 months (13+ years)',
    joinDate: '03-10-2009',
    gender: 'Male',
    specialization: 'Information Technology, Software Development',
    type: 'Adhoc/Contractual'
  },
  {
    id: '4',
    name: 'Dr. Kumar Vikas',
    designation: 'Assistant Professor', 
    department: 'UCET',
    qualification: 'Ph.D.',
    mobile: '8340392633',
    email: 'ar2@vbu.ac.in',
    specialization: 'Engineering, Research & Development',
    type: 'Regular'
  },
  {
    id: '5',
    name: 'Dr. Priya Sharma',
    designation: 'Associate Professor',
    department: 'Artificial Intelligence & Machine Learning',
    qualification: 'Ph.D.',
    mobile: '9431387618', 
    email: 'priya.sharma@vbu.ac.in',
    specialization: 'Machine Learning, Deep Learning, Data Science',
    type: 'Regular'
  }
];

// Placement data
export const placementData = {
  placementRate: '40-56%',
  medianPackage: '₹4-5 LPA',
  highestPackage: '₹8 LPA',
  recruiters: [
    'Tata Consultancy Services (TCS)',
    'Infosys Limited',
    'Wipro Technologies', 
    'Cognizant Technology Solutions',
    'Accenture',
    'Tech Mahindra',
    'Capgemini',
    'HCL Technologies'
  ],
  departments: {
    'Computer Science & Engineering': '50-60%',
    'Information Technology': '45-55%', 
    'Electronics & Communication': '35-45%',
    'Mechanical Engineering': '30-40%'
  }
};

// Campus facilities data
export const campusFacilities = {
  library: {
    name: 'Central Library',
    books: '10,000+ volumes',
    digitalResources: 'E-books, journals, research databases',
    facilities: 'Reading halls, computer terminals, Wi-Fi access'
  },
  labs: [
    'Computer Programming Lab',
    'Hardware & Networking Lab', 
    'Electronics & Communication Lab',
    'Mechanical Workshop',
    'AI & Machine Learning Lab',
    'CAD/CAM Lab'
  ],
  infrastructure: [
    'Wi-Fi enabled campus',
    'Modern classrooms with projectors',
    'Auditorium for events',
    'Gymnasium',
    'Medical facilities',
    'Transport facility',
    'Cafeteria'
  ],
  hostel: {
    girls: 'On-campus girls hostel',
    boys: 'Boys accommodation in nearby PG facilities'
  }
};

// Academic programs data
export const academicPrograms = {
  btech: {
    duration: '4 years',
    totalIntake: '~240 seats',
    departments: [
      {
        name: 'Computer Science & Engineering (CSE)',
        intake: '~60 seats',
        eligibility: '10+2 with PCM (50% General, 40% reserved)',
        fees: '₹65,000 - ₹75,000 per year'
      },
      {
        name: 'Information Technology (IT)', 
        intake: '~60 seats',
        eligibility: '10+2 with PCM (50% General, 40% reserved)',
        fees: '₹65,000 - ₹75,000 per year'
      },
      {
        name: 'Electronics & Communication Engineering (ECE)',
        intake: '~45 seats', 
        eligibility: '10+2 with PCM (50% General, 40% reserved)',
        fees: '₹65,000 - ₹75,000 per year'
      },
      {
        name: 'Mechanical Engineering (ME)',
        intake: '~45 seats',
        eligibility: '10+2 with PCM (50% General, 40% reserved)', 
        fees: '₹65,000 - ₹75,000 per year'
      },
      {
        name: 'Artificial Intelligence & Machine Learning (AI/ML)',
        intake: '~30 seats',
        eligibility: '10+2 with PCM (50% General, 40% reserved)', 
        fees: '₹75,000 - ₹85,000 per year'
      }
    ],
    admission: {
      process: 'JEE Main / JCECE',
      lateralEntry: 'Available for diploma holders',
      totalFees: '₹2.6 - ₹3.0 Lakhs (4 years)'
    }
  }
};

// Detailed Fee Structure
export const feeStructure = {
  btech: {
    categories: {
      general: {
        name: 'General Category',
        annualFees: {
          tuitionFee: 55000,
          developmentFee: 8000,
          libraryFee: 2000,
          labFee: 5000,
          examFee: 3000,
          miscFee: 2000,
          total: 75000
        },
        hostelFees: {
          hostelFee: 25000,
          messFee: 30000,
          total: 55000
        },
        otherFees: {
          cautionMoney: 5000,
          admissionFee: 2000,
          universityFee: 1500,
          total: 8500
        }
      },
      reserved: {
        name: 'Reserved Category (SC/ST/OBC)',
        annualFees: {
          tuitionFee: 45000,
          developmentFee: 6000,
          libraryFee: 2000,
          labFee: 5000,
          examFee: 3000,
          miscFee: 2000,
          total: 63000
        },
        hostelFees: {
          hostelFee: 20000,
          messFee: 25000,
          total: 45000
        },
        otherFees: {
          cautionMoney: 3000,
          admissionFee: 1500,
          universityFee: 1000,
          total: 5500
        }
      }
    },
    paymentSchedule: [
      { semester: 1, dueDate: 'July 2024', amount: '₹75,000 + ₹8,500 (one-time)' },
      { semester: 2, dueDate: 'January 2025', amount: '₹75,000' },
      { semester: 3, dueDate: 'July 2025', amount: '₹75,000' },
      { semester: 4, dueDate: 'January 2026', amount: '₹75,000' },
      { semester: 5, dueDate: 'July 2026', amount: '₹75,000' },
      { semester: 6, dueDate: 'January 2027', amount: '₹75,000' },
      { semester: 7, dueDate: 'July 2027', amount: '₹75,000' },
      { semester: 8, dueDate: 'January 2028', amount: '₹75,000' }
    ],
    scholarships: [
      {
        name: 'Merit Scholarship',
        eligibility: 'Top 10% students in JEE Main',
        amount: '50% tuition fee waiver'
      },
      {
        name: 'Need-based Scholarship',
        eligibility: 'Family income < ₹2 LPA',
        amount: '₹25,000 per year'
      },
      {
        name: 'VBU Merit Scholarship',
        eligibility: 'CGPA > 8.5',
        amount: '₹15,000 per year'
      }
    ]
  }
};

// Academic Calendar
export const academicCalendar = {
  currentSession: '2024-25',
  semesters: {
    odd: {
      name: 'Odd Semester (July - December)',
      startDate: 'July 15, 2024',
      endDate: 'December 20, 2024',
      examStartDate: 'December 1, 2024',
      examEndDate: 'December 15, 2024',
      resultDate: 'January 5, 2025'
    },
    even: {
      name: 'Even Semester (January - June)',
      startDate: 'January 8, 2025',
      endDate: 'June 15, 2025',
      examStartDate: 'May 25, 2025',
      examEndDate: 'June 10, 2025',
      resultDate: 'July 1, 2025'
    }
  },
  holidays: [
    { date: '2024-08-15', name: 'Independence Day' },
    { date: '2024-10-02', name: 'Gandhi Jayanti' },
    { date: '2024-10-24', name: 'Dussehra' },
    { date: '2024-11-12', name: 'Diwali' },
    { date: '2025-01-26', name: 'Republic Day' },
    { date: '2025-03-13', name: 'Holi' },
    { date: '2025-04-14', name: 'Ram Navami' }
  ]
};

// Detailed Curriculum
export const curriculumData = {
  cse: {
    name: 'Computer Science & Engineering',
    totalCredits: 160,
    semesters: [
      {
        semester: 1,
        subjects: [
          { code: 'MA101', name: 'Engineering Mathematics-I', credits: 4, type: 'Theory' },
          { code: 'PH101', name: 'Engineering Physics', credits: 4, type: 'Theory' },
          { code: 'CH101', name: 'Engineering Chemistry', credits: 4, type: 'Theory' },
          { code: 'CS101', name: 'Programming in C', credits: 4, type: 'Theory' },
          { code: 'EE101', name: 'Basic Electrical Engineering', credits: 3, type: 'Theory' },
          { code: 'CS191', name: 'C Programming Lab', credits: 2, type: 'Practical' },
          { code: 'PH191', name: 'Physics Lab', credits: 1, type: 'Practical' },
          { code: 'CH191', name: 'Chemistry Lab', credits: 1, type: 'Practical' }
        ]
      },
      {
        semester: 2,
        subjects: [
          { code: 'MA102', name: 'Engineering Mathematics-II', credits: 4, type: 'Theory' },
          { code: 'ME101', name: 'Engineering Mechanics', credits: 4, type: 'Theory' },
          { code: 'CS102', name: 'Data Structures & Algorithms', credits: 4, type: 'Theory' },
          { code: 'EC101', name: 'Digital Electronics', credits: 4, type: 'Theory' },
          { code: 'HS101', name: 'English Communication', credits: 3, type: 'Theory' },
          { code: 'CS192', name: 'Data Structures Lab', credits: 2, type: 'Practical' },
          { code: 'EC191', name: 'Digital Electronics Lab', credits: 1, type: 'Practical' },
          { code: 'HS191', name: 'Language Lab', credits: 1, type: 'Practical' }
        ]
      },
      {
        semester: 3,
        subjects: [
          { code: 'MA201', name: 'Discrete Mathematics', credits: 4, type: 'Theory' },
          { code: 'CS201', name: 'Object Oriented Programming', credits: 4, type: 'Theory' },
          { code: 'CS202', name: 'Computer Organization', credits: 4, type: 'Theory' },
          { code: 'CS203', name: 'Database Management Systems', credits: 4, type: 'Theory' },
          { code: 'EC201', name: 'Analog Electronics', credits: 3, type: 'Theory' },
          { code: 'CS291', name: 'OOP Lab', credits: 2, type: 'Practical' },
          { code: 'CS292', name: 'DBMS Lab', credits: 2, type: 'Practical' }
        ]
      },
      {
        semester: 4,
        subjects: [
          { code: 'CS301', name: 'Operating Systems', credits: 4, type: 'Theory' },
          { code: 'CS302', name: 'Computer Networks', credits: 4, type: 'Theory' },
          { code: 'CS303', name: 'Software Engineering', credits: 4, type: 'Theory' },
          { code: 'CS304', name: 'Theory of Computation', credits: 4, type: 'Theory' },
          { code: 'HS201', name: 'Economics for Engineers', credits: 3, type: 'Theory' },
          { code: 'CS391', name: 'OS Lab', credits: 2, type: 'Practical' },
          { code: 'CS392', name: 'Networks Lab', credits: 2, type: 'Practical' }
        ]
      }
    ],
    electiveGroups: [
      {
        name: 'AI/ML Electives',
        subjects: [
          'Machine Learning',
          'Artificial Intelligence',
          'Deep Learning',
          'Natural Language Processing',
          'Computer Vision'
        ]
      },
      {
        name: 'Systems Electives',
        subjects: [
          'Distributed Systems',
          'Cloud Computing',
          'Cybersecurity',
          'Parallel Computing',
          'Embedded Systems'
        ]
      }
    ]
  },
  it: {
    name: 'Information Technology',
    totalCredits: 160,
    focus: 'Software Development, Web Technologies, Database Systems'
  },
  ece: {
    name: 'Electronics & Communication Engineering',
    totalCredits: 160,
    focus: 'VLSI Design, Signal Processing, Communication Systems'
  },
  me: {
    name: 'Mechanical Engineering',
    totalCredits: 160,
    focus: 'Thermal Engineering, Manufacturing, CAD/CAM'
  },
  aiml: {
    name: 'Artificial Intelligence & Machine Learning',
    totalCredits: 160,
    focus: 'Deep Learning, Data Science, Neural Networks'
  }
};

// Examination System
export const examinationSystem = {
  gradingSystem: {
    scale: '10-point CGPA',
    grades: [
      { grade: 'O', marks: '90-100', points: 10 },
      { grade: 'A+', marks: '80-89', points: 9 },
      { grade: 'A', marks: '70-79', points: 8 },
      { grade: 'B+', marks: '60-69', points: 7 },
      { grade: 'B', marks: '50-59', points: 6 },
      { grade: 'C', marks: '40-49', points: 5 },
      { grade: 'F', marks: '0-39', points: 0 }
    ]
  },
  assessmentPattern: {
    internalAssessment: 30,
    semesterExam: 70,
    passingMarks: 40,
    minimumAttendance: '75%'
  },
  examTypes: [
    'Mid-Semester Examination',
    'End-Semester Examination', 
    'Internal Assessment',
    'Practical Examination',
    'Project Evaluation'
  ]
};