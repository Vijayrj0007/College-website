import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ChevronRight, Users, BookOpen, Award } from 'lucide-react';
import { mockDepartments, mockPublications } from '../data/mockData';

export const Departments: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900" id="departments">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Academic Departments
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Our diverse departments offer comprehensive programs designed to prepare students 
            for successful careers in engineering and technology
          </p>
        </div>

        {/* Departments Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {mockDepartments.map((department, index) => (
            <Card 
              key={index} 
              className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => alert(`Opening ${department.name} department page...`)}
            >
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3">{department.icon}</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                    {department.name}
                  </h3>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  {department.description}
                </p>

                {/* Department Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                    <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                      {index === 0 ? '60' : index === 1 ? '60' : index === 2 ? '45' : index === 3 ? '45' : '30'}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Seats</div>
                  </div>
                  <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
                    <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                      {index === 0 ? '8' : index === 1 ? '6' : index === 2 ? '4' : index === 3 ? '5' : '6'}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Faculty</div>
                  </div>
                  <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                    <div className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                      4 Years
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Duration</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-1">
                    <Badge variant="secondary" className="text-xs">B.Tech</Badge>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Publications Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Academic Publications
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {mockPublications.map((publication, index) => (
              <Card key={index} className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    <span>{publication.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                    {publication.description}
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => alert(`Downloading ${publication.title}...`)}
                  >
                    Download PDF
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Research Excellence */}
        <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">Academic & Research Excellence</h3>
              <p className="text-purple-100 max-w-2xl mx-auto">
                Our faculty and students are actively engaged in research and academic pursuits, 
                with publications and projects spanning multiple engineering disciplines
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <Award className="h-8 w-8 mx-auto mb-2 text-purple-200" />
                <div className="text-2xl font-bold mb-1">20+</div>
                <div className="text-sm text-purple-200">Research Projects</div>
              </div>
              <div>
                <BookOpen className="h-8 w-8 mx-auto mb-2 text-purple-200" />
                <div className="text-2xl font-bold mb-1">56+</div>
                <div className="text-sm text-purple-200">Publications</div>
              </div>
              <div>
                <Users className="h-8 w-8 mx-auto mb-2 text-purple-200" />
                <div className="text-2xl font-bold mb-1">30+</div>
                <div className="text-sm text-purple-200">Faculty Members</div>
              </div>
              <div>
                <Award className="h-8 w-8 mx-auto mb-2 text-purple-200" />
                <div className="text-2xl font-bold mb-1">40-56%</div>
                <div className="text-sm text-purple-200">Placement Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Department-wise Programs */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Programs Offered
          </h3>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Undergraduate Programs */}
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-blue-600 dark:text-blue-400">
                  Undergraduate Programs (B.Tech)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    'Computer Science & Engineering (CSE)',
                    'Information Technology (IT)', 
                    'Electronics & Communication Engineering (ECE)',
                    'Mechanical Engineering (ME)',
                    'Artificial Intelligence & Machine Learning (AI/ML)'
                  ].map((program, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="font-medium text-gray-900 dark:text-white">{program}</span>
                      <Badge variant="outline">4 Years</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Admission Information */}
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-green-600 dark:text-green-400">
                  Admission Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">B.Tech Admission</h4>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Total Intake: ~240 seats</li>
                      <li>• Admission via JEE Main / JCECEB</li>
                      <li>• Eligibility: 10+2 with PCM (50% General, 40% reserved)</li>
                      <li>• Annual Fees: ₹65,000 - ₹75,000</li>
                      <li>• Total Course Fees: ~₹2 Lakhs (4 years)</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Lateral Entry</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Available for diploma holders in relevant disciplines</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => document.querySelector('#admissions')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Admission Process
          </Button>
        </div>
      </div>
    </section>
  );
};