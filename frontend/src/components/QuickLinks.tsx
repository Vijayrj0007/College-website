import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  FileText, 
  BookOpen, 
  Users, 
  ExternalLink,
  CreditCard,
  Trophy,
  ArrowRight,
  Phone
} from 'lucide-react';

interface QuickLink {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  external?: boolean;
  color: string;
}

const quickLinks: QuickLink[] = [
  {
    title: 'Student Login',
    description: 'Access your student portal and dashboard',
    icon: <GraduationCap className="h-6 w-6" />,
    href: '#login',
    color: 'bg-blue-600'
  },
  {
    title: 'Academics',
    description: 'View curriculum, syllabus, and academic calendar',
    icon: <BookOpen className="h-6 w-6" />,
    href: '#academics',
    color: 'bg-green-500'
  },
  {
    title: 'Fee Structure',
    description: 'Check fees, payment schedule, and scholarships',
    icon: <CreditCard className="h-6 w-6" />,
    href: '#fees',
    color: 'bg-purple-500'
  },
  {
    title: 'Student Dashboard',
    description: 'View grades, attendance, and academic progress',
    icon: <Users className="h-6 w-6" />,
    href: '#student-dashboard',
    color: 'bg-indigo-500'
  },
  {
    title: 'Departments',
    description: 'Explore our engineering and technology programs',
    icon: <Trophy className="h-6 w-6" />,
    href: '#departments',
    color: 'bg-orange-500'
  },
  {
    title: 'Alumni Network',
    description: 'Connect with graduates and networking opportunities',
    icon: <Users className="h-6 w-6" />,
    href: '#alumni',
    color: 'bg-red-500'
  },
  {
    title: 'Latest Notices',
    description: 'Stay updated with important announcements',
    icon: <FileText className="h-6 w-6" />,
    href: '#notices',
    color: 'bg-yellow-500'
  },
  {
    title: 'Contact Us',
    description: 'Get in touch with administration and support',
    icon: <Phone className="h-6 w-6" />,
    href: '#contact',
    color: 'bg-teal-500'
  }
];

export const QuickLinks: React.FC = () => {
  const handleLinkClick = (link: QuickLink, e: React.MouseEvent) => {
    e.preventDefault();
    
    if (link.external) {
      // Mock external link behavior
      alert(`Opening ${link.title}... (This would open in a new tab in a real application)`);
    } else {
      // Internal navigation using hash routing
      window.location.hash = link.href;
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20 relative overflow-hidden" id="quick-links">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-200/30 to-pink-200/30 rounded-full blur-3xl"
          animate={{ rotate: -360, scale: [1.2, 1, 1.2] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container mx-auto px-4 relative max-w-none">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/50 dark:bg-blue-900/30 backdrop-blur-sm rounded-full border border-blue-200/50 dark:border-blue-700/50 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">🚀 Quick Access Portal</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Quick Access Hub
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Access frequently used services and resources with just a click. Your gateway to seamless digital experiences.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto w-full">
          {quickLinks.map((link, index) => (
            <motion.div
              key={link.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.1, 
                duration: 0.6,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <Card 
                className="cursor-pointer group bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 hover:border-blue-200/50 dark:hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 overflow-hidden relative"
                onClick={(e) => handleLinkClick(link, e)}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50/20 dark:to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <CardContent className="p-4 sm:p-6 md:p-8 relative">
                  <div className="flex items-start space-x-3 sm:space-x-4 md:space-x-6">
                    <motion.div 
                      className={`${link.color} p-4 rounded-2xl text-white shadow-lg group-hover:shadow-xl relative overflow-hidden`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {/* Icon background glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative z-10">{link.icon}</div>
                    </motion.div>
                    
                    <div className="flex-1">
                      <motion.h3 
                        className="font-bold text-lg text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 flex items-center"
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {link.title}
                        {link.external && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            whileHover={{ scale: 1.2 }}
                          >
                            <ExternalLink className="inline h-4 w-4 ml-2 opacity-60" />
                          </motion.div>
                        )}
                      </motion.h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                        {link.description}
                      </p>
                    </div>
                  </div>

                  {/* Hover effect indicator */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => document.querySelector('#notices')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-600 dark:text-blue-400 dark:hover:bg-blue-900/20 px-8 py-4 text-lg font-semibold backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span>View All Services</span>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="ml-2"
              >
                <ArrowRight className="h-5 w-5" />
              </motion.div>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};