import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription } from '../ui/alert';
import { AlertCircle } from 'lucide-react';
import { fetchStudents, addStudent, updateStudent, deleteStudent } from '../../api/studentApi';
import { fetchFaculty, addFaculty, updateFaculty, deleteFaculty } from '../../api/facultyApi';
import { fetchNotices, addNotice, updateNotice, deleteNotice } from '../../api/noticeApi';
import { fetchDepartments, addDepartment, updateDepartment, deleteDepartment } from '../../api/deptApi';
import { fetchCourses, addCourse, updateCourse, deleteCourse } from '../../api/courseApi';
import { fetchResults, addResult, updateResult, deleteResult, fetchStudentResults } from '../../api/resultApi';

export const AdminDashboard: React.FC = () => {
  const { user } = useApp();
  const [error, setError] = useState('');

  // Students
  const [students, setStudents] = useState<any[]>([]);
  const [studentForm, setStudentForm] = useState({ name: '', email: '', rollNo: '', semester: 1 });
  const [studentQuery, setStudentQuery] = useState({ page: 1, limit: 10, search: '' });

  // Faculty
  const [faculty, setFaculty] = useState<any[]>([]);
  const [facultyForm, setFacultyForm] = useState({ name: '', email: '' });

  // Notices
  const [notices, setNotices] = useState<any[]>([]);
  const [noticeForm, setNoticeForm] = useState({ title: '', content: '' });
  const [noticeQuery, setNoticeQuery] = useState({ page: 1, limit: 5, search: '' });

  // Departments
  const [departments, setDepartments] = useState<any[]>([]);
  const [deptForm, setDeptForm] = useState({ name: '', code: '', description: '' });
  const [deptQuery, setDeptQuery] = useState({ page: 1, limit: 10, search: '' });

  // Courses
  const [courses, setCourses] = useState<any[]>([]);
  const [courseForm, setCourseForm] = useState({ code: '', title: '', credits: 3 });
  const [courseQuery, setCourseQuery] = useState({ page: 1, limit: 10, search: '' });

  // Results
  const [results, setResults] = useState<any[]>([]);
  const [resultForm, setResultForm] = useState({ studentUserId: '', courseId: '', semester: 1, marks: 0, grade: 'A', examType: 'final', academicYear: '2024' });
  const [resultQuery, setResultQuery] = useState({ page: 1, limit: 10, search: '' });

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    if (!isAdmin) return;
    (async () => {
      try {
        const [s, f, n, d, c, r] = await Promise.all([
          fetchStudents({ page: studentQuery.page, limit: studentQuery.limit, search: studentQuery.search }),
          fetchFaculty(),
          fetchNotices({ page: noticeQuery.page, limit: noticeQuery.limit, search: noticeQuery.search }),
          fetchDepartments({ page: deptQuery.page, limit: deptQuery.limit, search: deptQuery.search }),
          fetchCourses({ page: courseQuery.page, limit: courseQuery.limit, search: courseQuery.search }),
          fetchResults({ page: resultQuery.page, limit: resultQuery.limit, search: resultQuery.search }),
        ]);
        setStudents(s.items || s);
        setFaculty(f);
        setNotices(n.items || n);
        setDepartments(d.items || d);
        setCourses(c.items || c);
        setResults(r.items || r);
      } catch (e: any) {
        setError(e?.response?.data?.message || 'Failed to load admin data');
      }
    })();
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertDescription>Not authorized. Admins only.</AlertDescription></Alert>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Admin Management</h2>
        {error && (
          <div className="mb-4">
            <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertDescription>{error}</AlertDescription></Alert>
          </div>
        )}
        <Card>
          <CardContent className="p-0">
            <Tabs defaultValue="students">
              <TabsList className="grid grid-cols-6">
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="faculty">Faculty</TabsTrigger>
                <TabsTrigger value="notices">Notices</TabsTrigger>
                <TabsTrigger value="departments">Departments</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="results">Results</TabsTrigger>
              </TabsList>

              <TabsContent value="students" className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Input placeholder="Search students" value={studentQuery.search} onChange={(e)=>setStudentQuery({...studentQuery,search:e.target.value})} />
                  <Button onClick={async()=>{
                    const s=await fetchStudents({ ...studentQuery, page:1 });
                    setStudents(s.items||[]);
                  }}>Search</Button>
                </div>
                <div className="grid md:grid-cols-4 gap-3">
                  <div>
                    <Label>Name</Label>
                    <Input value={studentForm.name} onChange={(e)=>setStudentForm({...studentForm,name:e.target.value})} placeholder="Student Name" />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input value={studentForm.email} onChange={(e)=>setStudentForm({...studentForm,email:e.target.value})} placeholder="email@example.com" />
                  </div>
                  <div>
                    <Label>Roll No</Label>
                    <Input value={studentForm.rollNo} onChange={(e)=>setStudentForm({...studentForm,rollNo:e.target.value})} placeholder="ROLL123" />
                  </div>
                  <div>
                    <Label>Semester</Label>
                    <Input type="number" value={studentForm.semester} onChange={(e)=>setStudentForm({...studentForm,semester:Number(e.target.value)})} placeholder="1" />
                  </div>
                </div>
                <Button onClick={async ()=>{
                  try{
                    const created=await addStudent({ ...studentForm });
                    setStudents([created,...students]);
                    setStudentForm({ name:'',email:'',rollNo:'',semester:1 });
                  }catch(e:any){setError(e?.response?.data?.message||'Failed to add student');}
                }}>Add Student</Button>
                <div className="mt-4 space-y-2">
                  {students.map((s)=> (
                    <div key={s._id} className="flex items-center justify-between border rounded p-2">
                      <div>
                        <div className="font-medium">{s?.userId?.name || s.name}</div>
                        <div className="text-sm text-gray-500">{s?.userId?.email || s.email} · {s.rollNo}</div>
                      </div>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm" onClick={async()=>{
                          try{ const updated=await updateStudent(s._id,{ rollNo: s.rollNo });
                            setStudents(students.map(x=>x._id===s._id?updated:x)); }catch(e:any){ setError('Update failed'); }
                        }}>Save</Button>
                        <Button variant="destructive" size="sm" onClick={async()=>{
                          try{ await deleteStudent(s._id); setStudents(students.filter(x=>x._id!==s._id)); }catch(e:any){ setError('Delete failed'); }
                        }}>Delete</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="faculty" className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <Label>Name</Label>
                    <Input value={facultyForm.name} onChange={(e)=>setFacultyForm({...facultyForm,name:e.target.value})} placeholder="Faculty Name" />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input value={facultyForm.email} onChange={(e)=>setFacultyForm({...facultyForm,email:e.target.value})} placeholder="email@example.com" />
                  </div>
                </div>
                <Button onClick={async()=>{
                  try{ const created=await addFaculty({ ...facultyForm }); setFaculty([created,...faculty]); setFacultyForm({name:'',email:''});}
                  catch(e:any){ setError(e?.response?.data?.message || 'Failed to add faculty'); }
                }}>Add Faculty</Button>
                <div className="mt-4 space-y-2">
                  {faculty.map((f)=> (
                    <div key={f._id} className="border rounded p-2">
                      <div className="grid md:grid-cols-2 gap-2">
                        <Input value={f.name} onChange={(e)=>setFaculty(faculty.map(x=>x._id===f._id?{...x,name:e.target.value}:x))} />
                        <Input value={f.email} onChange={(e)=>setFaculty(faculty.map(x=>x._id===f._id?{...x,email:e.target.value}:x))} />
                      </div>
                      <div className="mt-2 flex gap-2">
                        <Button size="sm" variant="outline" onClick={async()=>{
                          try{ const updated=await updateFaculty(f._id,{ name:f.name, email:f.email }); setFaculty(faculty.map(x=>x._id===f._id?updated:x)); }
                          catch(e:any){ setError('Update failed'); }
                        }}>Save</Button>
                        <Button size="sm" variant="destructive" onClick={async()=>{
                          try{ await deleteFaculty(f._id); setFaculty(faculty.filter(x=>x._id!==f._id)); }
                          catch(e:any){ setError('Delete failed'); }
                        }}>Delete</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="notices" className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Input placeholder="Search notices" value={noticeQuery.search} onChange={(e)=>setNoticeQuery({...noticeQuery,search:e.target.value})} />
                  <Button onClick={async()=>{
                    const n=await fetchNotices({ ...noticeQuery, page:1 });
                    setNotices(n.items||[]);
                  }}>Search</Button>
                </div>
                <div className="grid gap-3">
                  <div>
                    <Label>Title</Label>
                    <Input value={noticeForm.title} onChange={(e)=>setNoticeForm({...noticeForm,title:e.target.value})} placeholder="Notice title" />
                  </div>
                  <div>
                    <Label>Content</Label>
                    <Input value={noticeForm.content} onChange={(e)=>setNoticeForm({...noticeForm,content:e.target.value})} placeholder="Notice content" />
                  </div>
                </div>
                <Button onClick={async()=>{
                  try{ const created=await addNotice({ ...noticeForm }); setNotices([created,...notices]); setNoticeForm({title:'',content:''}); }
                  catch(e:any){ setError(e?.response?.data?.message || 'Failed to add notice'); }
                }}>Publish Notice</Button>
                <div className="mt-4 space-y-2">
                  {notices.map((n)=> (
                    <div key={n._id} className="border rounded p-2">
                      <div className="font-medium">
                        <Input value={n.title} onChange={(e)=>setNotices(notices.map(x=>x._id===n._id?{...x,title:e.target.value}:x))} />
                      </div>
                      <div className="text-sm text-gray-600">
                        <Input value={n.content} onChange={(e)=>setNotices(notices.map(x=>x._id===n._id?{...x,content:e.target.value}:x))} />
                      </div>
                      <div className="mt-2 flex gap-2">
                        <Button size="sm" variant="outline" onClick={async()=>{
                          try{ const updated=await updateNotice(n._id,{ title:n.title, content:n.content }); setNotices(notices.map(x=>x._id===n._id?updated:x)); }
                          catch(e:any){ setError('Update failed'); }
                        }}>Save</Button>
                        <Button size="sm" variant="destructive" onClick={async()=>{
                          try{ await deleteNotice(n._id); setNotices(notices.filter(x=>x._id!==n._id)); }
                          catch(e:any){ setError('Delete failed'); }
                        }}>Delete</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="departments" className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Input placeholder="Search departments" value={deptQuery.search} onChange={(e)=>setDeptQuery({...deptQuery,search:e.target.value})} />
                  <Button onClick={async()=>{ const d=await fetchDepartments({ ...deptQuery, page:1 }); setDepartments(d.items||[]); }}>Search</Button>
                </div>
                <div className="grid md:grid-cols-3 gap-3">
                  <div>
                    <Label>Name</Label>
                    <Input value={deptForm.name} onChange={(e)=>setDeptForm({...deptForm,name:e.target.value})} />
                  </div>
                  <div>
                    <Label>Code</Label>
                    <Input value={deptForm.code} onChange={(e)=>setDeptForm({...deptForm,code:e.target.value})} />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Input value={deptForm.description} onChange={(e)=>setDeptForm({...deptForm,description:e.target.value})} />
                  </div>
                </div>
                <Button onClick={async()=>{
                  try{ const created=await addDepartment({ ...deptForm }); setDepartments([created,...departments]); setDeptForm({name:'',code:'',description:''}); }
                  catch(e:any){ setError('Failed to add department'); }
                }}>Add Department</Button>
                <div className="mt-4 space-y-2">
                  {departments.map((d)=> (
                    <div key={d._id} className="border rounded p-2">
                      <div className="grid md:grid-cols-3 gap-2">
                        <Input value={d.name} onChange={(e)=>setDepartments(departments.map(x=>x._id===d._id?{...x,name:e.target.value}:x))} />
                        <Input value={d.code} onChange={(e)=>setDepartments(departments.map(x=>x._id===d._id?{...x,code:e.target.value}:x))} />
                        <Input value={d.description||''} onChange={(e)=>setDepartments(departments.map(x=>x._id===d._id?{...x,description:e.target.value}:x))} />
                      </div>
                      <div className="mt-2 flex gap-2">
                        <Button size="sm" variant="outline" onClick={async()=>{
                          try{ const updated=await updateDepartment(d._id,{ name:d.name, code:d.code, description:d.description }); setDepartments(departments.map(x=>x._id===d._id?updated:x)); }
                          catch(e:any){ setError('Update failed'); }
                        }}>Save</Button>
                        <Button size="sm" variant="destructive" onClick={async()=>{
                          try{ await deleteDepartment(d._id); setDepartments(departments.filter(x=>x._id!==d._id)); }
                          catch(e:any){ setError('Delete failed'); }
                        }}>Delete</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="courses" className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Input placeholder="Search courses" value={courseQuery.search} onChange={(e)=>setCourseQuery({...courseQuery,search:e.target.value})} />
                  <Button onClick={async()=>{ const c=await fetchCourses({ ...courseQuery, page:1 }); setCourses(c.items||[]); }}>Search</Button>
                </div>
                <div className="grid md:grid-cols-3 gap-3">
                  <div>
                    <Label>Code</Label>
                    <Input value={courseForm.code} onChange={(e)=>setCourseForm({...courseForm,code:e.target.value})} />
                  </div>
                  <div>
                    <Label>Title</Label>
                    <Input value={courseForm.title} onChange={(e)=>setCourseForm({...courseForm,title:e.target.value})} />
                  </div>
                  <div>
                    <Label>Credits</Label>
                    <Input type="number" value={courseForm.credits} onChange={(e)=>setCourseForm({...courseForm,credits:Number(e.target.value)})} />
                  </div>
                </div>
                <Button onClick={async()=>{
                  try{ const created=await addCourse({ ...courseForm }); setCourses([created,...courses]); setCourseForm({code:'',title:'',credits:3}); }
                  catch(e:any){ setError('Failed to add course'); }
                }}>Add Course</Button>
                <div className="mt-4 space-y-2">
                  {courses.map((c)=> (
                    <div key={c._id} className="border rounded p-2">
                      <div className="grid md:grid-cols-3 gap-2">
                        <Input value={c.code} onChange={(e)=>setCourses(courses.map(x=>x._id===c._id?{...x,code:e.target.value}:x))} />
                        <Input value={c.title} onChange={(e)=>setCourses(courses.map(x=>x._id===c._id?{...x,title:e.target.value}:x))} />
                        <Input type="number" value={c.credits} onChange={(e)=>setCourses(courses.map(x=>x._id===c._id?{...x,credits:Number(e.target.value)}:x))} />
                      </div>
                      <div className="mt-2 flex gap-2">
                        <Button size="sm" variant="outline" onClick={async()=>{
                          try{ const updated=await updateCourse(c._id,{ code:c.code, title:c.title, credits:c.credits }); setCourses(courses.map(x=>x._id===c._id?updated:x)); }
                          catch(e:any){ setError('Update failed'); }
                        }}>Save</Button>
                        <Button size="sm" variant="destructive" onClick={async()=>{
                          try{ await deleteCourse(c._id); setCourses(courses.filter(x=>x._id!==c._id)); }
                          catch(e:any){ setError('Delete failed'); }
                        }}>Delete</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="results" className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Input placeholder="Search results" value={resultQuery.search} onChange={(e)=>setResultQuery({...resultQuery,search:e.target.value})} />
                  <Button onClick={async()=>{ const r=await fetchResults({ ...resultQuery, page:1 }); setResults(r.items||[]); }}>Search</Button>
                </div>
                <div className="grid md:grid-cols-4 gap-3">
                  <div>
                    <Label>Student Email</Label>
                    <Input value={resultForm.studentUserId} onChange={(e)=>setResultForm({...resultForm,studentUserId:e.target.value})} placeholder="student@example.com" />
                  </div>
                  <div>
                    <Label>Course Code</Label>
                    <Input value={resultForm.courseId} onChange={(e)=>setResultForm({...resultForm,courseId:e.target.value})} placeholder="CS101" />
                  </div>
                  <div>
                    <Label>Marks</Label>
                    <Input type="number" value={resultForm.marks} onChange={(e)=>setResultForm({...resultForm,marks:Number(e.target.value)})} placeholder="85" />
                  </div>
                  <div>
                    <Label>Grade</Label>
                    <select value={resultForm.grade} onChange={(e)=>setResultForm({...resultForm,grade:e.target.value})} className="w-full border rounded px-3 py-2">
                      <option value="A+">A+</option>
                      <option value="A">A</option>
                      <option value="B+">B+</option>
                      <option value="B">B</option>
                      <option value="C+">C+</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="F">F</option>
                    </select>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-3">
                  <div>
                    <Label>Semester</Label>
                    <Input type="number" value={resultForm.semester} onChange={(e)=>setResultForm({...resultForm,semester:Number(e.target.value)})} placeholder="1" />
                  </div>
                  <div>
                    <Label>Exam Type</Label>
                    <select value={resultForm.examType} onChange={(e)=>setResultForm({...resultForm,examType:e.target.value})} className="w-full border rounded px-3 py-2">
                      <option value="final">Final</option>
                      <option value="midterm">Midterm</option>
                      <option value="assignment">Assignment</option>
                      <option value="quiz">Quiz</option>
                    </select>
                  </div>
                  <div>
                    <Label>Academic Year</Label>
                    <Input value={resultForm.academicYear} onChange={(e)=>setResultForm({...resultForm,academicYear:e.target.value})} placeholder="2024" />
                  </div>
                </div>
                <Button onClick={async()=>{
                  try{ const created=await addResult({ ...resultForm }); setResults([created,...results]); setResultForm({studentUserId:'',courseId:'',semester:1,marks:0,grade:'A',examType:'final',academicYear:'2024'}); }
                  catch(e:any){ setError('Failed to add result'); }
                }}>Add Result</Button>
                <div className="mt-4 space-y-2">
                  {results.map((r)=> (
                    <div key={r._id} className="border rounded p-2">
                      <div className="grid md:grid-cols-4 gap-2">
                        <div>
                          <Label>Student</Label>
                          <div className="text-sm">{r?.studentUserId?.name || 'N/A'}</div>
                        </div>
                        <div>
                          <Label>Course</Label>
                          <div className="text-sm">{r?.courseId?.code || 'N/A'}</div>
                        </div>
                        <div>
                          <Label>Marks</Label>
                          <Input type="number" value={r.marks} onChange={(e)=>setResults(results.map(x=>x._id===r._id?{...x,marks:Number(e.target.value)}:x))} />
                        </div>
                        <div>
                          <Label>Grade</Label>
                          <select value={r.grade} onChange={(e)=>setResults(results.map(x=>x._id===r._id?{...x,grade:e.target.value}:x))} className="w-full border rounded px-2 py-1">
                            <option value="A+">A+</option>
                            <option value="A">A</option>
                            <option value="B+">B+</option>
                            <option value="B">B</option>
                            <option value="C+">C+</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                            <option value="F">F</option>
                          </select>
                        </div>
                      </div>
                      <div className="mt-2 flex gap-2">
                        <Button size="sm" variant="outline" onClick={async()=>{
                          try{ const updated=await updateResult(r._id,{ marks:r.marks, grade:r.grade }); setResults(results.map(x=>x._id===r._id?updated:x)); }
                          catch(e:any){ setError('Update failed'); }
                        }}>Save</Button>
                        <Button size="sm" variant="destructive" onClick={async()=>{
                          try{ await deleteResult(r._id); setResults(results.filter(x=>x._id!==r._id)); }
                          catch(e:any){ setError('Delete failed'); }
                        }}>Delete</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AdminDashboard;


