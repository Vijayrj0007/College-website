import React from 'react';
import { Button } from './ui/button';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Youtube, 
  Linkedin,
  ExternalLink
} from 'lucide-react';

export const Footer: React.FC = () => {
  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Academic Calendar', href: '#calendar' },
    { name: 'Admissions', href: '#admissions' },
    { name: 'Examinations', href: '#examinations' },
    { name: 'Placement Cell', href: '#placements' },
    { name: 'Research', href: '#research' }
  ];

  const importantLinks = [
    { name: 'Student Portal', href: '#student-portal', external: true },
    { name: 'Faculty Portal', href: '#faculty-portal', external: true },
    { name: 'Alumni Network', href: '#alumni' },
    { name: 'Library Portal', href: '#library-portal', external: true },
    { name: 'NAAC', href: '#naac' },
    { name: 'Anti-Ragging', href: '#anti-ragging' }
  ];

  const departments = [
    'Computer Science & Engineering',
    'Electrical & Electronics Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Physics',
    'Chemistry'
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* College Information */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">U</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">UCET</h3>
                <p className="text-gray-400 text-sm">VBU Hazaribag</p>
              </div>
            </div>
            
            <p className="text-gray-400 mb-6 leading-relaxed">
              University College Of Engineering And Technology, affiliated with 
              Vinoba Bhave University, Hazaribag. Committed to excellence in 
              technical education since 2009.
            </p>

            {/* Contact Information */}
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />
                <div className="text-sm text-gray-400">
                  <p>University College of Engineering & Technology</p>
                  <p>Vinoba Bhave University Campus</p>
                  <p>Hazaribag, Jharkhand - 825301</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-blue-400" />
                <a 
                  href="tel:+916546123456" 
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  +91-6546-123456
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-blue-400" />
                <a 
                  href="mailto:info@ucet.edu" 
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  info@ucet.edu
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Important Links</h4>
            <ul className="space-y-3">
              {importantLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center space-x-1"
                    target={link.external ? '_blank' : '_self'}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                  >
                    <span>{link.name}</span>
                    {link.external && <ExternalLink className="h-3 w-3" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Departments & Social Media */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Departments</h4>
            <ul className="space-y-2 mb-8">
              {departments.slice(0, 4).map((dept) => (
                <li key={dept}>
                  <a 
                    href="#departments"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {dept}
                  </a>
                </li>
              ))}
              <li>
                <a 
                  href="#departments"
                  className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
                >
                  View All Departments →
                </a>
              </li>
            </ul>

            {/* Social Media */}
            <div>
              <h5 className="font-semibold mb-4">Follow Us</h5>
              <div className="flex space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 hover:bg-gray-800"
                  onClick={() => alert('Opening Facebook page...')}
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 hover:bg-gray-800"
                  onClick={() => alert('Opening Twitter page...')}
                  aria-label="Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 hover:bg-gray-800"
                  onClick={() => alert('Opening LinkedIn page...')}
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 hover:bg-gray-800"
                  onClick={() => alert('Opening YouTube channel...')}
                  aria-label="YouTube"
                >
                  <Youtube className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
              <p>
                © 2025 University College Of Engineering And Technology. All rights reserved.
              </p>
              <div className="flex space-x-4">
                <a href="#privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#terms" className="hover:text-white transition-colors">
                  Terms of Use
                </a>
                <a href="#grievance" className="hover:text-white transition-colors">
                  Grievance Redressal
                </a>
              </div>
            </div>

            <div className="text-sm text-gray-400">
              <p>Powered by UCET IT Department</p>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact Strip */}
      <div className="bg-red-700">
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-1 md:space-y-0 md:space-x-6 text-sm">
            <span className="font-medium">Emergency Contacts:</span>
            <span>Security: +91-6546-123457</span>
            <span>Medical: +91-6546-123458</span>
            <span>Anti-Ragging Helpline: 1800-XXX-XXXX</span>
          </div>
        </div>
      </div>
    </footer>
  );
};