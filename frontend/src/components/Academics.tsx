import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { 
  BookOpen, 
  Download, 
  Calendar, 
  Award, 
  FileText,
  Clock,
  GraduationCap,
  Users,
  Star,
  CheckCircle
} from 'lucide-react';
import { curriculumData, academicCalendar, examinationSystem, academicPrograms } from '../data/mockData';

export const Academics: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('cse');

  const departments = [
    { id: 'cse', name: 'Computer Science & Engineering', icon: '💻' },
    { id: 'it', name: 'Information Technology', icon: '🌐' },
    { id: 'ece', name: 'Electronics & Communication', icon: '📡' },
    { id: 'me', name: 'Mechanical Engineering', icon: '⚙️' },
    { id: 'aiml', name: 'AI & Machine Learning', icon: '🤖' }
  ];

  const currentDept = curriculumData[selectedDepartment as keyof typeof curriculumData];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900" id="academics">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Academic Programs & Curriculum
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Comprehensive academic programs designed to meet industry standards and prepare students for successful careers
          </p>
        </div>

        <Tabs defaultValue="programs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="academic-calendar">Calendar</TabsTrigger>
            <TabsTrigger value="examination">Examinations</TabsTrigger>
            <TabsTrigger value="syllabi">Syllabi</TabsTrigger>
          </TabsList>

          {/* Programs Overview Tab */}
          <TabsContent value="programs" className="space-y-6">
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                  <span>B.Tech Programs Offered</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {academicPrograms.btech.departments.map((dept, index) => (
                    <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="text-2xl">{departments.find(d => dept.name.includes(d.name.split(' ')[0]))?.icon || '🎓'}</div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{dept.name}</h3>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Intake:</span>
                          <span className="font-medium">{dept.intake}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Annual Fees:</span>
                          <span className="font-medium text-green-600">{dept.fees}</span>
                        </div>
                        <div className="pt-2">
                          <Badge variant="outline" className="text-xs">4 Years</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Program Features */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-blue-50 dark:bg-blue-900/20">
                <CardContent className="p-6 text-center">
                  <Award className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                  <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">AICTE Approved</h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400">All programs are approved by AICTE and affiliated to VBU</p>
                </CardContent>
              </Card>
              <Card className="bg-green-50 dark:bg-green-900/20">
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 mx-auto mb-3 text-green-600" />
                  <h3 className="font-semibold text-green-700 dark:text-green-300 mb-2">Industry Connect</h3>
                  <p className="text-sm text-green-600 dark:text-green-400">Strong industry partnerships and placement support</p>
                </CardContent>
              </Card>
              <Card className="bg-purple-50 dark:bg-purple-900/20">
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-8 w-8 mx-auto mb-3 text-purple-600" />
                  <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Modern Curriculum</h3>
                  <p className="text-sm text-purple-600 dark:text-purple-400">Updated curriculum with latest technology trends</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Curriculum Tab */}
          <TabsContent value="curriculum" className="space-y-6">
            {/* Department Selection */}
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {departments.map((dept) => (
                <Button
                  key={dept.id}
                  variant={selectedDepartment === dept.id ? 'default' : 'outline'}
                  onClick={() => setSelectedDepartment(dept.id)}
                  className="flex items-center space-x-2"
                >
                  <span>{dept.icon}</span>
                  <span>{dept.name}</span>
                </Button>
              ))}
            </div>

            {/* Curriculum Details */}
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <span>{currentDept?.name} - Curriculum Structure</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {currentDept?.semesters ? (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{currentDept.totalCredits}</div>
                        <div className="text-sm text-blue-600">Total Credits</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">8</div>
                        <div className="text-sm text-green-600">Semesters</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">4</div>
                        <div className="text-sm text-purple-600">Years</div>
                      </div>
                    </div>

                    <Accordion type="multiple" className="space-y-2">
                      {currentDept.semesters.map((semester, index) => (
                        <AccordionItem key={index} value={`semester-${semester.semester}`}>
                          <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center space-x-3">
                              <Badge variant="outline">Semester {semester.semester}</Badge>
                              <span className="font-medium">
                                {semester.subjects.length} Subjects ({semester.subjects.reduce((acc, sub) => acc + sub.credits, 0)} Credits)
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="grid md:grid-cols-2 gap-4">
                              {semester.subjects.map((subject, subIndex) => (
                                <div key={subIndex} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                                  <div className="flex justify-between items-start mb-2">
                                    <div>
                                      <h4 className="font-medium text-gray-900 dark:text-white">{subject.name}</h4>
                                      <p className="text-sm text-gray-600 dark:text-gray-400">{subject.code}</p>
                                    </div>
                                    <div className="text-right">
                                      <Badge variant={subject.type === 'Theory' ? 'default' : 'secondary'} className="text-xs">
                                        {subject.type}
                                      </Badge>
                                      <div className="text-sm font-medium mt-1">{subject.credits} Credits</div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>

                    {/* Electives */}
                    {currentDept.electiveGroups && (
                      <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-4">Elective Courses</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {currentDept.electiveGroups.map((group, index) => (
                            <Card key={index} className="bg-gray-50 dark:bg-gray-700">
                              <CardHeader className="pb-3">
                                <CardTitle className="text-base">{group.name}</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-2">
                                  {group.subjects.map((subject, subIndex) => (
                                    <div key={subIndex} className="flex items-center space-x-2">
                                      <CheckCircle className="h-4 w-4 text-green-500" />
                                      <span className="text-sm">{subject}</span>
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{currentDept?.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Total Credits: {currentDept?.totalCredits}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      Focus Areas: {currentDept?.focus}
                    </p>
                    <Button variant="outline" className="mt-4">
                      <Download className="h-4 w-4 mr-2" />
                      Download Detailed Curriculum
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Academic Calendar Tab */}
          <TabsContent value="academic-calendar" className="space-y-6">
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span>Academic Calendar {academicCalendar.currentSession}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Odd Semester */}
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-4">
                      {academicCalendar.semesters.odd.name}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Start Date:</span>
                        <span className="font-medium">{academicCalendar.semesters.odd.startDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">End Date:</span>
                        <span className="font-medium">{academicCalendar.semesters.odd.endDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Exam Period:</span>
                        <span className="font-medium">
                          {academicCalendar.semesters.odd.examStartDate} - {academicCalendar.semesters.odd.examEndDate}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Result Date:</span>
                        <span className="font-medium">{academicCalendar.semesters.odd.resultDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Even Semester */}
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <h3 className="font-semibold text-green-600 dark:text-green-400 mb-4">
                      {academicCalendar.semesters.even.name}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Start Date:</span>
                        <span className="font-medium">{academicCalendar.semesters.even.startDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">End Date:</span>
                        <span className="font-medium">{academicCalendar.semesters.even.endDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Exam Period:</span>
                        <span className="font-medium">
                          {academicCalendar.semesters.even.examStartDate} - {academicCalendar.semesters.even.examEndDate}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Result Date:</span>
                        <span className="font-medium">{academicCalendar.semesters.even.resultDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Holidays */}
                <div className="mt-6">
                  <h3 className="font-semibold mb-4">Academic Holidays</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {academicCalendar.holidays.map((holiday, index) => (
                      <div key={index} className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <div className="font-medium text-yellow-700 dark:text-yellow-300">{holiday.name}</div>
                        <div className="text-sm text-yellow-600 dark:text-yellow-400">{holiday.date}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Examination Tab */}
          <TabsContent value="examination" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Grading System */}
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-600" />
                    <span>Grading System</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-4">
                      <div className="font-bold text-blue-600">{examinationSystem.gradingSystem.scale}</div>
                    </div>
                    {examinationSystem.gradingSystem.grades.map((grade, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                        <div className="flex items-center space-x-3">
                          <Badge variant={grade.grade === 'F' ? 'destructive' : 'default'}>
                            {grade.grade}
                          </Badge>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{grade.marks}%</span>
                        </div>
                        <span className="font-medium">{grade.points} Points</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Assessment Pattern */}
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-green-600" />
                    <span>Assessment Pattern</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {examinationSystem.assessmentPattern.internalAssessment}%
                        </div>
                        <div className="text-sm text-blue-600">Internal Assessment</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {examinationSystem.assessmentPattern.semesterExam}%
                        </div>
                        <div className="text-sm text-green-600">Semester Exam</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Passing Marks:</span>
                        <span className="font-medium">{examinationSystem.assessmentPattern.passingMarks}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Minimum Attendance:</span>
                        <span className="font-medium">{examinationSystem.assessmentPattern.minimumAttendance}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Exam Types */}
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-purple-600" />
                  <span>Types of Examinations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {examinationSystem.examTypes.map((examType, index) => (
                    <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg text-center">
                      <CheckCircle className="h-6 w-6 mx-auto mb-2 text-green-500" />
                      <div className="font-medium text-gray-900 dark:text-white">{examType}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Syllabi Tab */}
          <TabsContent value="syllabi" className="space-y-6">
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Download className="h-5 w-5 text-blue-600" />
                  <span>Download Syllabi & Course Materials</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {departments.map((dept) => (
                    <div key={dept.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="text-2xl">{dept.icon}</div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{dept.name}</h3>
                      </div>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <FileText className="h-4 w-4 mr-2" />
                          Complete Syllabus
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Course Structure
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Download className="h-4 w-4 mr-2" />
                          Lab Manuals
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="space-y-4">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 mr-4"
              onClick={() => window.open('#', '_blank')}
            >
              <Download className="h-5 w-5 mr-2" />
              Download Academic Handbook
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Contact Academic Office
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};