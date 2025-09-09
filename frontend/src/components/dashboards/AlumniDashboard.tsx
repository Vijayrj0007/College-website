import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { 
  Users, 
  GraduationCap, 
  Calendar, 
  MapPin, 
  Mail, 
  Phone, 
  Building2,
  Plus,
  Edit,
  Trash2,
  Search,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { fetchAlumni, addAlumni, updateAlumni, deleteAlumni } from '../../api/alumniApi';
import { fetchEvents } from '../../api/eventApi';
import { fetchNotices } from '../../api/noticeApi';

interface Alumni {
  _id: string;
  name: string;
  email: string;
  graduationYear: number;
  degree: string;
  department: string;
  currentCompany?: string;
  currentPosition?: string;
  location?: string;
  phone?: string;
  linkedin?: string;
  achievements?: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  type: string;
}

interface Notice {
  _id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
}

export const AlumniDashboard: React.FC = () => {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAlumni, setEditingAlumni] = useState<Alumni | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    graduationYear: new Date().getFullYear(),
    degree: '',
    department: '',
    currentCompany: '',
    currentPosition: '',
    location: '',
    phone: '',
    linkedin: '',
    achievements: [] as string[],
    isActive: true
  });

  const [achievementInput, setAchievementInput] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [alumniData, eventsData, noticesData] = await Promise.all([
        fetchAlumni(),
        fetchEvents(),
        fetchNotices()
      ]);
      setAlumni(alumniData);
      setEvents(Array.isArray(eventsData) ? eventsData : (eventsData?.items || []));
      setNotices(Array.isArray(noticesData) ? noticesData : (noticesData?.items || []));
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingAlumni) {
        await updateAlumni(editingAlumni._id, formData);
        setSuccess('Alumni updated successfully!');
      } else {
        await addAlumni(formData);
        setSuccess('Alumni added successfully!');
      }
      setShowAddForm(false);
      setEditingAlumni(null);
      resetForm();
      fetchData();
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to save alumni');
    }
  };

  const handleEdit = (alumni: Alumni) => {
    setEditingAlumni(alumni);
    setFormData({
      name: alumni.name,
      email: alumni.email,
      graduationYear: alumni.graduationYear,
      degree: alumni.degree,
      department: alumni.department,
      currentCompany: alumni.currentCompany || '',
      currentPosition: alumni.currentPosition || '',
      location: alumni.location || '',
      phone: alumni.phone || '',
      linkedin: alumni.linkedin || '',
      achievements: alumni.achievements || [],
      isActive: alumni.isActive
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this alumni?')) {
      try {
        await deleteAlumni(id);
        setSuccess('Alumni deleted successfully!');
        fetchData();
      } catch (err: any) {
        setError(err?.response?.data?.message || 'Failed to delete alumni');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      graduationYear: new Date().getFullYear(),
      degree: '',
      department: '',
      currentCompany: '',
      currentPosition: '',
      location: '',
      phone: '',
      linkedin: '',
      achievements: [],
      isActive: true
    });
    setAchievementInput('');
  };

  const addAchievement = () => {
    if (achievementInput.trim()) {
      setFormData(prev => ({
        ...prev,
        achievements: [...prev.achievements, achievementInput.trim()]
      }));
      setAchievementInput('');
    }
  };

  const removeAchievement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }));
  };

  const filteredAlumni = alumni.filter(alumni =>
    alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alumni.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alumni.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alumni.degree.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Alumni Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your alumni profile and stay connected with your alma mater
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6">
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Alumni</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{alumni.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Building2 className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Alumni</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {alumni.filter(a => a.isActive).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Upcoming Events</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {events.filter(e => new Date(e.date) > new Date()).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <GraduationCap className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Departments</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {new Set(alumni.map(a => a.department)).size}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">My Profile</TabsTrigger>
            <TabsTrigger value="network">Alumni Network</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="notices">Notices</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Profile Management</CardTitle>
                  <Button onClick={() => setShowAddForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Update Profile
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {showAddForm && (
                  <form onSubmit={handleSubmit} className="space-y-4 mb-6 p-4 border rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="graduationYear">Graduation Year</Label>
                        <Input
                          id="graduationYear"
                          type="number"
                          value={formData.graduationYear}
                          onChange={(e) => setFormData(prev => ({ ...prev, graduationYear: parseInt(e.target.value) }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="degree">Degree</Label>
                        <Input
                          id="degree"
                          value={formData.degree}
                          onChange={(e) => setFormData(prev => ({ ...prev, degree: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="department">Department</Label>
                        <Input
                          id="department"
                          value={formData.department}
                          onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="currentCompany">Current Company</Label>
                        <Input
                          id="currentCompany"
                          value={formData.currentCompany}
                          onChange={(e) => setFormData(prev => ({ ...prev, currentCompany: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="currentPosition">Current Position</Label>
                        <Input
                          id="currentPosition"
                          value={formData.currentPosition}
                          onChange={(e) => setFormData(prev => ({ ...prev, currentPosition: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="linkedin">LinkedIn Profile</Label>
                        <Input
                          id="linkedin"
                          value={formData.linkedin}
                          onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Achievements</Label>
                      <div className="flex gap-2 mb-2">
                        <Input
                          value={achievementInput}
                          onChange={(e) => setAchievementInput(e.target.value)}
                          placeholder="Add an achievement"
                        />
                        <Button type="button" onClick={addAchievement}>
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.achievements.map((achievement, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-1">
                            {achievement}
                            <button
                              type="button"
                              onClick={() => removeAchievement(index)}
                              className="ml-1 text-red-500 hover:text-red-700"
                            >
                              ×
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit">
                        {editingAlumni ? 'Update Profile' : 'Create Profile'}
                      </Button>
                      <Button type="button" variant="outline" onClick={() => {
                        setShowAddForm(false);
                        setEditingAlumni(null);
                        resetForm();
                      }}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                )}

                {/* Current Profile Display */}
                {alumni.length > 0 && (
                  <div className="space-y-4">
                    {alumni.map((alumni) => (
                      <Card key={alumni._id}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <h3 className="text-xl font-semibold">{alumni.name}</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center">
                                  <Mail className="h-4 w-4 mr-2 text-gray-500" />
                                  {alumni.email}
                                </div>
                                {alumni.phone && (
                                  <div className="flex items-center">
                                    <Phone className="h-4 w-4 mr-2 text-gray-500" />
                                    {alumni.phone}
                                  </div>
                                )}
                                <div className="flex items-center">
                                  <GraduationCap className="h-4 w-4 mr-2 text-gray-500" />
                                  {alumni.degree} ({alumni.graduationYear})
                                </div>
                                <div className="flex items-center">
                                  <Building2 className="h-4 w-4 mr-2 text-gray-500" />
                                  {alumni.department}
                                </div>
                                {alumni.currentCompany && (
                                  <div className="flex items-center">
                                    <Building2 className="h-4 w-4 mr-2 text-gray-500" />
                                    {alumni.currentPosition} at {alumni.currentCompany}
                                  </div>
                                )}
                                {alumni.location && (
                                  <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                                    {alumni.location}
                                  </div>
                                )}
                              </div>
                              {alumni.achievements && alumni.achievements.length > 0 && (
                                <div className="mt-4">
                                  <h4 className="font-medium mb-2">Achievements:</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {alumni.achievements.map((achievement, index) => (
                                      <Badge key={index} variant="secondary">
                                        {achievement}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => handleEdit(alumni)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleDelete(alumni._id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="network" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Alumni Network</CardTitle>
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search alumni..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-64"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredAlumni.map((alumni) => (
                    <Card key={alumni._id}>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <h3 className="font-semibold">{alumni.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {alumni.degree} ({alumni.graduationYear})
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {alumni.department}
                          </p>
                          {alumni.currentCompany && (
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {alumni.currentPosition} at {alumni.currentCompany}
                            </p>
                          )}
                          {alumni.location && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {alumni.location}
                            </p>
                          )}
                          <div className="flex items-center gap-2">
                            <Badge variant={alumni.isActive ? "default" : "secondary"}>
                              {alumni.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events.filter(e => new Date(e.date) > new Date()).map((event) => (
                    <Card key={event._id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{event.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {event.description}
                            </p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {new Date(event.date).toLocaleDateString()}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {event.location}
                              </div>
                            </div>
                          </div>
                          <Badge variant="outline">{event.type}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notices" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Latest Notices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notices.slice(0, 10).map((notice) => (
                    <Card key={notice._id}>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <h3 className="font-semibold">{notice.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {notice.content}
                          </p>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline">{notice.category}</Badge>
                            <span className="text-xs text-gray-500">
                              {new Date(notice.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AlumniDashboard;

