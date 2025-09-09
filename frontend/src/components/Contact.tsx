import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Send,
  MessageSquare
} from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for your message! We'll get back to you soon.\n\nSubject: ${formData.subject}`);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const departments = [
    { name: 'Director Office', phone: '+91-9430121110', email: 'directorucet@vbu.ac.in' },
    { name: 'Admission Office', phone: '+91-9430121110', email: 'directorucet@vbu.ac.in' },
    { name: 'CSE Department', phone: '+91-8340392633', email: 'ar2@vbu.ac.in' },
    { name: 'Physics Department', phone: '+91-9431387617', email: 'kprasadhzb@yahoo.com' },
    { name: 'Library', phone: '+91-9430121110', email: 'library@vbu.ac.in' },
    { name: 'Placement Cell', phone: '+91-9430121110', email: 'placements@vbu.ac.in' }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-800" id="contact">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Contact Us
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get in touch with us for any queries, admissions, or support. We're here to help!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700 mb-6">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-6">Get in Touch</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      <p className="font-medium">Address</p>
                      <p>University College of Engineering & Technology</p>
                      <p>Sindoor Campus, Vinoba Bhave University</p>
                      <p>Hazaribagh, Jharkhand – 825301</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      <p className="font-medium">Main Office</p>
                      <a href="tel:+919430121110" className="hover:text-blue-600">
                        +91-9430121110
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      <p className="font-medium">Email</p>
                      <a href="mailto:directorucet@vbu.ac.in" className="hover:text-blue-600">
                        directorucet@vbu.ac.in
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-1" />
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      <p className="font-medium">Office Hours</p>
                      <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                      <p>Saturday: 9:00 AM - 2:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="bg-white dark:bg-gray-900">
              <CardHeader>
                <CardTitle className="text-lg">Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => document.querySelector('#admissions')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Admission Queries
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => alert('Opening technical support...')}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Technical Support
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => document.querySelector('#alumni')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Alumni Services
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white dark:bg-gray-900">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Send className="h-5 w-5" />
                  <span>Send us a Message</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <Input
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject *
                    </label>
                    <Input
                      name="subject"
                      placeholder="What is this regarding?"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message *
                    </label>
                    <Textarea
                      name="message"
                      placeholder="Please describe your query in detail..."
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Department Contacts */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Department Contacts
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map((dept, index) => (
              <Card key={index} className="bg-white dark:bg-gray-900">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">{dept.name}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-3 w-3 text-blue-600" />
                      <a href={`tel:${dept.phone}`} className="text-gray-600 dark:text-gray-400 hover:text-blue-600">
                        {dept.phone}
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-3 w-3 text-blue-600" />
                      <a href={`mailto:${dept.email}`} className="text-gray-600 dark:text-gray-400 hover:text-blue-600">
                        {dept.email}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};