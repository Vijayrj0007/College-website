import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  Users, 
  Quote, 
  Calendar, 
  Search, 
  MapPin, 
  Briefcase, 
  ChevronLeft, 
  ChevronRight,
  Star,
  ExternalLink
} from 'lucide-react';
import { mockAlumniTestimonials } from '../data/mockData';

const alumniDirectory = [
  {
    id: '1',
    name: 'Anisha Kumari',
    graduationYear: '2018',
    degree: 'B.Tech Computer Science',
    currentPosition: 'Assistant Professor',
    company: 'KIIT University, Bhubaneswar',
    location: 'Bhubaneswar',
    expertise: ['Quantum Computing', 'Cloud Computing', 'Deep Learning'],
    publications: 31,
    citations: 260,
    notableWorks: ['Quantum neural networks', 'Quantum cloud computing', 'Serverless computing patents']
  },
  {
    id: '2',
    name: 'Prabhat Kumar Singh',
    graduationYear: '2017',
    degree: 'B.Tech Electronics',
    currentPosition: 'Researcher',
    company: 'University of Lucknow',
    location: 'Lucknow',
    expertise: ['Nanomaterials', 'Materials Synthesis', 'Characterization'],
    publications: 12,
    citations: 131,
    department: 'Department of Physics'
  },
  {
    id: '3',
    name: 'Riti Kumari',
    graduationYear: '2019',
    degree: 'B.Tech Computer Science',
    currentPosition: 'Software Developer',
    company: 'UCET VBU Graduate',
    location: 'Jharkhand',
    expertise: ['Operating Systems', 'Database Management', 'Placement Preparation'],
    projects: ['OS notes repository', 'DBMS and SQL notes', 'Placement resources'],
    socialMedia: 'GitHub and X (Twitter)'
  },
  {
    id: '4',
    name: 'Sweta Sharma',
    graduationYear: '2020',
    degree: 'B.Tech Information Technology',
    currentPosition: 'PhD Student',
    company: 'South Asian University',
    location: 'New Delhi',
    expertise: ['Artificial Intelligence', 'Machine Learning', 'Research'],
    conferences: ['31st Australasian Joint Conference on AI (2018)']
  },
  {
    id: '5',
    name: 'Saurabh Kumar Deepak',
    graduationYear: '2016',
    degree: 'B.Tech Mechanical',
    currentPosition: 'Business Executive',
    company: 'IIFL Group',
    location: 'Mumbai',
    expertise: ['Business Management', 'Finance', 'Strategic Planning'],
    previousRole: 'Former Business Head at IIFL Finance'
  }
];

const upcomingEvents = [
  {
    id: '1',
    title: 'Annual Alumni Meet 2025',
    date: '2025-03-15',
    location: 'UCET Campus',
    description: 'Join us for our annual alumni gathering with networking sessions and cultural programs.',
    registrationOpen: true
  },
  {
    id: '2',
    title: 'Industry Connect Webinar',
    date: '2025-02-20',
    location: 'Online',
    description: 'Career guidance session for current students by successful alumni.',
    registrationOpen: true
  },
  {
    id: '3',
    title: 'Alumni Cricket Tournament',
    date: '2025-04-10',
    location: 'Sports Complex',
    description: 'Sports event to reconnect with batchmates and juniors.',
    registrationOpen: false
  }
];

export const AlumniNetwork: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === mockAlumniTestimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === 0 ? mockAlumniTestimonials.length - 1 : prev - 1
    );
  };

  const filteredAlumni = alumniDirectory.filter(alumni => {
    const matchesSearch = alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alumni.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alumni.currentPosition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = selectedYear === '' || alumni.graduationYear === selectedYear;
    return matchesSearch && matchesYear;
  });

  const graduationYears = ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800" id="alumni">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Alumni Network
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Connect with our successful graduates and be part of our thriving alumni community
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Join Network Section */}
          <div className="lg:col-span-1">
            <Card className="bg-blue-600 text-white border-0 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-6 w-6" />
                  <span>Join Our Network</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-blue-100">
                  Connect with our growing alumni network of successful professionals and expand your career opportunities.
                </p>
                <Button 
                  className="bg-white text-blue-600 hover:bg-blue-50 w-full font-semibold"
                  onClick={() => alert('Opening alumni registration... (This would redirect to registration form)')}
                >
                  Join Alumni Network
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-white dark:bg-gray-900">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">1000+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Alumni</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">40-56%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Placement Rate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">50+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Companies</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">391</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Citations</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Testimonials Carousel */}
          <div className="lg:col-span-2">
            <Card className="bg-white dark:bg-gray-900 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Quote className="h-6 w-6 text-blue-600" />
                    <span>Alumni Testimonials</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={prevTestimonial}
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={nextTestimonial}
                      aria-label="Next testimonial"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative min-h-[200px]">
                  <blockquote className="text-lg italic text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    "{mockAlumniTestimonials[currentTestimonial].quote}"
                  </blockquote>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        {mockAlumniTestimonials[currentTestimonial].name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {mockAlumniTestimonials[currentTestimonial].name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Class of {mockAlumniTestimonials[currentTestimonial].graduationYear} • {mockAlumniTestimonials[currentTestimonial].currentPosition}
                      </div>
                    </div>
                  </div>
                  <div className="flex mt-4 space-x-1">
                    {mockAlumniTestimonials.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentTestimonial 
                            ? 'bg-blue-600' 
                            : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                        onClick={() => setCurrentTestimonial(index)}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Alumni Directory */}
        <div className="mt-12">
          <Card className="bg-white dark:bg-gray-900">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="h-6 w-6" />
                <span>Alumni Directory</span>
              </CardTitle>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search by name, company, or position..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-white dark:bg-gray-800"
                  />
                </div>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="">All Years</option>
                  {graduationYears.map(year => (
                    <option key={year} value={year}>Class of {year}</option>
                  ))}
                </select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAlumni.map((alumni) => (
                  <Card key={alumni.id} className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                          <span className="font-semibold text-blue-600 dark:text-blue-400">
                            {alumni.name.charAt(0)}
                          </span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {alumni.graduationYear}
                        </Badge>
                      </div>
                      
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {alumni.name}
                      </h3>
                      
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <Briefcase className="h-3 w-3 mr-1" />
                        <span>{alumni.currentPosition}</span>
                      </div>
                      
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {alumni.company}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{alumni.location}</span>
                      </div>
                      
                      {/* Publications and Citations */}
                      {(alumni.publications || alumni.citations) && (
                        <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
                          {alumni.publications && (
                            <span>📄 {alumni.publications} Publications</span>
                          )}
                          {alumni.citations && (
                            <span>📊 {alumni.citations} Citations</span>
                          )}
                        </div>
                      )}
                      
                      {/* Research Focus/Specialization */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {alumni.expertise.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {alumni.expertise.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{alumni.expertise.length - 3} more
                          </Badge>
                        )}
                      </div>
                      
                      {/* Additional Info */}
                      {(alumni.notableWorks || alumni.projects || alumni.conferences || alumni.previousRole) && (
                        <div className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                          {alumni.notableWorks && (
                            <div className="mb-1">
                              <strong>Notable:</strong> {alumni.notableWorks[0]}
                            </div>
                          )}
                          {alumni.projects && (
                            <div className="mb-1">
                              <strong>Projects:</strong> {alumni.projects[0]}
                            </div>
                          )}
                          {alumni.conferences && (
                            <div className="mb-1">
                              <strong>Presented at:</strong> {alumni.conferences[0]}
                            </div>
                          )}
                          {alumni.previousRole && (
                            <div className="mb-1">
                              <strong>Previous:</strong> {alumni.previousRole}
                            </div>
                          )}
                        </div>
                      )}
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => alert(`Connecting with ${alumni.name}... (This would open messaging interface)`)}
                      >
                        Connect
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredAlumni.length === 0 && (
                <div className="text-center py-8">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                    No alumni found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Try adjusting your search criteria or filters.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events */}
        <div className="mt-12">
          <Card className="bg-white dark:bg-gray-900">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-6 w-6" />
                <span>Upcoming Alumni Events</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <Card key={event.id} className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {event.title}
                        </h3>
                        {event.registrationOpen && (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            Registration Open
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {event.location}
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                        {event.description}
                      </p>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        disabled={!event.registrationOpen}
                        onClick={() => alert(`Registering for ${event.title}... (This would open registration form)`)}
                      >
                        {event.registrationOpen ? 'Register Now' : 'Registration Closed'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};