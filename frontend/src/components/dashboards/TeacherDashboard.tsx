import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  User, 
  BookOpen, 
  Users, 
  FileText, 
  Upload,
  Bell,
  Calendar,
  Mail,
  GraduationCap,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { fetchCourses } from '../../api/courseApi';
import { fetchStudents } from '../../api/studentApi';
import { fetchNotices } from '../../api/noticeApi';

const mockClasses = [
  {
    id: '1',
    name: 'Data Structures and Algorithms',
    code: 'CS301',
    semester: '6th',
    students: 45,
    schedule: 'Mon, Wed, Fri - 10:00 AM'
  },
  {
    id: '2', 
    name: 'Database Management Systems',
    code: 'CS302',
    semester: '6th',
    students: 42,
    schedule: 'Tue, Thu - 2:00 PM'
  },
  {
    id: '3',
    name: 'Software Engineering',
    code: 'CS303',
    semester: '6th', 
    students: 38,
    schedule: 'Mon, Wed - 11:00 AM'
  }
];

const mockStudents = [
  { id: '1', name: 'Rahul Kumar', enrollmentNo: '20201234', marks: 85, grade: 'A' },
  { id: '2', name: 'Priya Sharma', enrollmentNo: '20201235', marks: 92, grade: 'A+' },
  { id: '3', name: 'Amit Singh', enrollmentNo: '20201236', marks: 78, grade: 'B+' },
  { id: '4', name: 'Neha Gupta', enrollmentNo: '20201237', marks: 89, grade: 'A' },
  { id: '5', name: 'Rajesh Patel', enrollmentNo: '20201238', marks: 76, grade: 'B+' }
];

export const TeacherDashboard: React.FC = () => {
  const { user } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [courses, setCourses] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [coursesData, studentsData, noticesData] = await Promise.all([
        fetchCourses(),
        fetchStudents(),
        fetchNotices()
      ]);
      setCourses(coursesData);
      setStudents(studentsData);
      setNotices(noticesData);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };
  const [selectedClass, setSelectedClass] = useState(mockClasses[0]);
  const [noticeText, setNoticeText] = useState('');
  const [noticeTitle, setNoticeTitle] = useState('');

  const handlePublishNotice = () => {
    if (noticeTitle && noticeText) {
      alert(`Notice published: ${noticeTitle}\n${noticeText}`);
      setNoticeTitle('');
      setNoticeText('');
    }
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
            Faculty Dashboard
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
            <TabsTrigger value="classes">My Classes</TabsTrigger>
            <TabsTrigger value="results">Upload Results</TabsTrigger>
            <TabsTrigger value="notices">Notices</TabsTrigger>
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
                    <span>Faculty Profile</span>
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
                      Faculty ID: FAC{Math.floor(Math.random() * 1000).toString().padStart(3, '0')}
                    </p>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Department:</span>
                      <span className="font-medium">{user?.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Experience:</span>
                      <span className="font-medium">{Math.floor(Math.random() * 15) + 5} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Classes:</span>
                      <span className="font-medium">{mockClasses.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Students:</span>
                      <span className="font-medium">{mockClasses.reduce((sum, cls) => sum + cls.students, 0)}</span>
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
                        <p className="text-sm text-gray-600 dark:text-gray-400">Active Classes</p>
                        <p className="text-2xl font-bold text-blue-600">{mockClasses.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                        <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Students</p>
                        <p className="text-2xl font-bold text-green-600">
                          {mockClasses.reduce((sum, cls) => sum + cls.students, 0)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
                        <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Assignments</p>
                        <p className="text-2xl font-bold text-purple-600">12</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-700">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-lg">
                        <Calendar className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">This Week</p>
                        <p className="text-2xl font-bold text-orange-600">8 Classes</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Today's Schedule */}
            <Card className="mt-6 bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Today's Schedule</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Data Structures and Algorithms</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">CS301 • Room 201</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-blue-600">10:00 AM - 11:00 AM</p>
                      <Badge variant="outline">45 Students</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Software Engineering</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">CS303 • Room 305</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">11:00 AM - 12:00 PM</p>
                      <Badge variant="outline">38 Students</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Classes Tab */}
          <TabsContent value="classes">
            <div className="grid gap-6">
              {mockClasses.map((classItem) => (
                <Card key={classItem.id} className="bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div>
                        <span>{classItem.name}</span>
                        <p className="text-sm font-normal text-gray-600 dark:text-gray-400 mt-1">
                          {classItem.code} • {classItem.semester} Semester • {classItem.students} Students
                        </p>
                      </div>
                      <Badge variant="outline">{classItem.schedule}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-3">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedClass(classItem);
                          setActiveTab('results');
                        }}
                      >
                        View Students
                      </Button>
                      <Button variant="outline" size="sm">
                        Upload Materials
                      </Button>
                      <Button variant="outline" size="sm">
                        Create Assignment
                      </Button>
                      <Button variant="outline" size="sm">
                        Send Message
                      </Button>
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
                    <Upload className="h-5 w-5" />
                    <span>Upload Results - {selectedClass.name}</span>
                  </div>
                  <div className="flex space-x-2">
                    <select 
                      className="px-3 py-1 border rounded-md text-sm bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                      onChange={(e) => setSelectedClass(mockClasses.find(c => c.id === e.target.value) || mockClasses[0])}
                    >
                      {mockClasses.map(cls => (
                        <option key={cls.id} value={cls.id}>{cls.name}</option>
                      ))}
                    </select>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Student Name</th>
                        <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Enrollment No.</th>
                        <th className="text-center py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Marks</th>
                        <th className="text-center py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Grade</th>
                        <th className="text-center py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockStudents.map((student) => (
                        <tr key={student.id} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-3 font-medium text-gray-900 dark:text-white">
                            {student.name}
                          </td>
                          <td className="py-3 text-gray-600 dark:text-gray-400">
                            {student.enrollmentNo}
                          </td>
                          <td className="py-3 text-center">
                            <Input 
                              type="number" 
                              defaultValue={student.marks}
                              className="w-20 text-center"
                              min="0"
                              max="100"
                            />
                          </td>
                          <td className="py-3 text-center">
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              {student.grade}
                            </Badge>
                          </td>
                          <td className="py-3 text-center">
                            <Button variant="outline" size="sm">
                              Update
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <Button variant="outline">Save Draft</Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Publish Results
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notices Tab */}
          <TabsContent value="notices">
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Create Notice for Students</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Notice Title
                    </label>
                    <Input 
                      placeholder="Enter notice title..."
                      value={noticeTitle}
                      onChange={(e) => setNoticeTitle(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Select Class
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700">
                      <option value="all">All Classes</option>
                      {mockClasses.map(cls => (
                        <option key={cls.id} value={cls.id}>{cls.name} ({cls.code})</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Notice Content
                    </label>
                    <Textarea 
                      placeholder="Enter notice content..."
                      value={noticeText}
                      onChange={(e) => setNoticeText(e.target.value)}
                      rows={6}
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <Button variant="outline">Save Draft</Button>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={handlePublishNotice}
                    >
                      Publish Notice
                    </Button>
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
                  <span>Faculty Profile</span>
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
                      <p className="text-gray-600 dark:text-gray-400">{user?.department} Department</p>
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
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Employee ID</label>
                        <p className="mt-1 text-gray-900 dark:text-white">FAC{Math.floor(Math.random() * 1000).toString().padStart(3, '0')}</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                        <p className="mt-1 text-gray-900 dark:text-white flex items-center">
                          <Mail className="h-4 w-4 mr-2" />
                          {user?.email}
                        </p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Department</label>
                        <p className="mt-1 text-gray-900 dark:text-white flex items-center">
                          <GraduationCap className="h-4 w-4 mr-2" />
                          {user?.department}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Experience</label>
                          <p className="mt-1 text-gray-900 dark:text-white">{Math.floor(Math.random() * 15) + 5} years</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Qualification</label>
                          <p className="mt-1 text-gray-900 dark:text-white">Ph.D.</p>
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