import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  User, 
  BookOpen, 
  Trophy, 
  CreditCard, 
  Bell, 
  Download,
  Calendar,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Star,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { fetchStudentResults } from '../../api/resultApi';
import { fetchCourses } from '../../api/courseApi';
import { fetchNotices } from '../../api/noticeApi';

const mockNotifications = [
  {
    id: '1',
    title: 'Assignment Due: Data Structures',
    message: 'Your assignment for Data Structures is due tomorrow. Please submit before 11:59 PM.',
    date: '2025-01-20',
    type: 'assignment',
    isNew: true
  },
  {
    id: '2',
    title: 'Fee Payment Reminder',
    message: 'Semester fee payment is due by January 25th. Avoid late fees by paying early.',
    date: '2025-01-18',
    type: 'fee',
    isNew: false
  },
  {
    id: '3',
    title: 'Exam Schedule Released',
    message: 'End semester examination schedule has been published. Check the academic section.',
    date: '2025-01-15',
    type: 'exam',
    isNew: false
  }
];

const mockCourseDetails = [
  {
    id: '1',
    name: 'Data Structures and Algorithms',
    code: 'CS301',
    instructor: 'Dr. Priya Sharma',
    credits: 4,
    attendance: 85,
    assignments: { completed: 8, total: 10 },
    nextClass: '2025-01-21 10:00 AM'
  },
  {
    id: '2',
    name: 'Database Management Systems',
    code: 'CS302',
    instructor: 'Prof. Rajesh Kumar',
    credits: 3,
    attendance: 92,
    assignments: { completed: 6, total: 8 },
    nextClass: '2025-01-21 2:00 PM'
  },
  {
    id: '3',
    name: 'Software Engineering',
    code: 'CS303',
    instructor: 'Dr. Anita Verma',
    credits: 3,
    attendance: 78,
    assignments: { completed: 5, total: 7 },
    nextClass: '2025-01-22 9:00 AM'
  }
];

export const StudentDashboard: React.FC = () => {
  const { user } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [results, setResults] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [resultsData, coursesData, noticesData] = await Promise.all([
        fetchStudentResults(user?.email || ''),
        fetchCourses(),
        fetchNotices()
      ]);
      setResults(resultsData);
      setCourses(coursesData);
      setNotices(noticesData);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const calculateGPA = () => {
    if (results.length === 0) return '0.00';
    const totalGradePoints = results.reduce((sum, result) => {
      const gradePoints = { 'A+': 10, 'A': 9, 'B+': 8, 'B': 7, 'C+': 6, 'C': 5 };
      return sum + (gradePoints[result.grade as keyof typeof gradePoints] || 0);
    }, 0);
    return (totalGradePoints / results.length).toFixed(2);
  };

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return 'text-green-600';
    if (attendance >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGradeColor = (grade: string) => {
    const colors = {
      'A+': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'A': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'B+': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'B': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'C+': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'C': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
    };
    return colors[grade as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Student Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back, {user?.name}!
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="fees">Fees</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Profile Summary */}
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Profile Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {user?.name?.charAt(0)}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {user?.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {user?.enrollmentNumber}
                    </p>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Course:</span>
                      <span className="font-medium">{user?.course}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Year:</span>
                      <span className="font-medium">{user?.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Semester:</span>
                      <span className="font-medium">{user?.semester}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">CGPA:</span>
                      <span className="font-semibold text-blue-600">{calculateGPA()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="lg:col-span-2 grid md:grid-cols-2 gap-4">
                <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                        <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Enrolled Courses</p>
                        <p className="text-2xl font-bold text-blue-600">{mockCourseDetails.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                        <Trophy className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Current CGPA</p>
                        <p className="text-2xl font-bold text-green-600">{calculateGPA()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-lg">
                        <Calendar className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Attendance</p>
                        <p className="text-2xl font-bold text-yellow-600">85%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
                        <Bell className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Notifications</p>
                        <p className="text-2xl font-bold text-purple-600">{notices.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Notifications */}
            <Card className="mt-6 bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Recent Notifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notices.slice(0, 5).map((notice) => (
                    <div key={notice._id} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="w-2 h-2 rounded-full mt-2 bg-blue-500" />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">{notice.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{notice.content}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">{new Date(notice.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses">
            <div className="grid gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div>
                        <span>{course.name}</span>
                        <p className="text-sm font-normal text-gray-600 dark:text-gray-400 mt-1">
                          {course.code} • {course.instructor} • {course.credits} Credits
                        </p>
                      </div>
                      <Badge variant="outline">{course.credits} Credits</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Attendance</p>
                        <div className="flex items-center space-x-2">
                          <Progress value={course.attendance} className="flex-1" />
                          <span className={`text-sm font-medium ${getAttendanceColor(course.attendance)}`}>
                            {course.attendance}%
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Assignments</p>
                        <div className="flex items-center space-x-2">
                          <Progress 
                            value={(course.assignments.completed / course.assignments.total) * 100} 
                            className="flex-1" 
                          />
                          <span className="text-sm font-medium">
                            {course.assignments.completed}/{course.assignments.total}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Next Class</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{course.nextClass}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex space-x-2">
                      <Button variant="outline" size="sm">View Materials</Button>
                      <Button variant="outline" size="sm">Submit Assignment</Button>
                      <Button variant="outline" size="sm">Contact Instructor</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Results Tab */}
          <TabsContent value="results">
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Trophy className="h-5 w-5" />
                    <span>Academic Results</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download Transcript
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download Admit Card
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="grid md:grid-cols-3 gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Current Semester</p>
                      <p className="text-xl font-bold text-blue-600">Semester {user?.semester}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">SGPA</p>
                      <p className="text-xl font-bold text-green-600">{calculateGPA()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">CGPA</p>
                      <p className="text-xl font-bold text-purple-600">{calculateGPA()}</p>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Course</th>
                        <th className="text-center py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Marks</th>
                        <th className="text-center py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Grade</th>
                        <th className="text-center py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Semester</th>
                        <th className="text-center py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Year</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((result) => (
                        <tr key={result.id} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-3 font-medium text-gray-900 dark:text-white">
                            {result.courseName}
                          </td>
                          <td className="py-3 text-center font-medium text-gray-900 dark:text-white">
                            {result.marks}
                          </td>
                          <td className="py-3 text-center">
                            <Badge className={getGradeColor(result.grade)}>
                              {result.grade}
                            </Badge>
                          </td>
                          <td className="py-3 text-center text-gray-600 dark:text-gray-400">
                            {result.semester}
                          </td>
                          <td className="py-3 text-center text-gray-600 dark:text-gray-400">
                            {result.year}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Fees Tab */}
          <TabsContent value="fees">
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Fee Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Current Semester Fee</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">Tuition Fee</span>
                        <span className="font-medium">₹45,000</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">Lab Fee</span>
                        <span className="font-medium">₹5,000</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">Library Fee</span>
                        <span className="font-medium">₹2,000</span>
                      </div>
                      <div className="flex justify-between py-2 font-semibold text-lg">
                        <span>Total</span>
                        <span>₹52,000</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 space-y-3">
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        Pay Now
                      </Button>
                      <Button variant="outline" className="w-full">
                        Download Fee Structure
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Payment History</h3>
                    <div className="space-y-3">
                      {[
                        { semester: 'Semester 5', amount: '₹52,000', status: 'Paid', date: '2024-07-15' },
                        { semester: 'Semester 4', amount: '₹52,000', status: 'Paid', date: '2024-01-15' },
                        { semester: 'Semester 3', amount: '₹50,000', status: 'Paid', date: '2023-07-15' }
                      ].map((payment, index) => (
                        <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{payment.semester}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{payment.date}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-gray-900 dark:text-white">{payment.amount}</p>
                              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                {payment.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Personal Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="text-center mb-6">
                      <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                          {user?.name?.charAt(0)}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{user?.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{user?.course}</p>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      Upload Profile Picture
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="grid gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                        <p className="mt-1 text-gray-900 dark:text-white">{user?.name}</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Enrollment Number</label>
                        <p className="mt-1 text-gray-900 dark:text-white">{user?.enrollmentNumber}</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                        <p className="mt-1 text-gray-900 dark:text-white flex items-center">
                          <Mail className="h-4 w-4 mr-2" />
                          {user?.email}
                        </p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Course</label>
                        <p className="mt-1 text-gray-900 dark:text-white flex items-center">
                          <GraduationCap className="h-4 w-4 mr-2" />
                          {user?.course}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Year</label>
                          <p className="mt-1 text-gray-900 dark:text-white">{user?.year}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Semester</label>
                          <p className="mt-1 text-gray-900 dark:text-white">{user?.semester}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <Button variant="outline">Edit Profile</Button>
                      <Button variant="outline">Change Password</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};