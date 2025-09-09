import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { 
  Award, 
  Users, 
  BookOpen, 
  Globe,
  Target,
  Eye,
  Heart
} from 'lucide-react';

export const About: React.FC = () => {
  const achievements = [
    {
      icon: <Award className="h-6 w-6" />,
      title: 'VBU Affiliated',
      description: 'Affiliated with Vinoba Bhave University',
      color: 'bg-gold-100 text-gold-800'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Growing Alumni Network',
      description: 'Successful graduates in leading companies',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: 'Quality Education',
      description: 'B.Tech programs in 4 major disciplines',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: 'Industry Connections',
      description: 'TCS, Infosys, Wipro, Cognizant recruiters',
      color: 'bg-green-100 text-green-800'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 relative overflow-hidden" id="about">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-blue-100/30 to-indigo-100/30 rounded-full blur-3xl"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-48 h-48 bg-gradient-to-br from-purple-100/30 to-pink-100/30 rounded-full blur-3xl"
          animate={{ rotate: -360, scale: [1.2, 1, 1.2] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
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
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">🎓 About Our Institution</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            About UCET
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            University College Of Engineering And Technology (VBU HAZARIBAG) - 
            A premier institution dedicated to excellence in technical education and research, 
            shaping the future leaders of tomorrow.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-20 w-full">
          {/* History & Mission */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 h-full hover:shadow-2xl transition-all duration-500 hover:border-blue-200/50 dark:hover:border-blue-500/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50/20 dark:to-blue-900/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="p-8 relative">
                  <div className="flex items-center space-x-4 mb-8">
                    <motion.div 
                      className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Target className="h-7 w-7 text-white" />
                    </motion.div>
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 dark:from-white dark:to-blue-200 bg-clip-text text-transparent">Our Mission</h3>
                  </div>
                  <motion.p 
                    className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-lg"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    To provide world-class technical education that combines theoretical knowledge with 
                    practical skills, fostering innovation and developing ethical engineers who contribute 
                    to society's progress and sustainable development.
                  </motion.p>
                  <motion.p 
                    className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    Part of Vinoba Bhave University, UCET has been nurturing engineering talent in 
                    Jharkhand, providing quality technical education with modern facilities and experienced 
                    faculty while maintaining strong industry connections and placement opportunities.
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Vision & Values */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="bg-gradient-to-br from-blue-50/70 to-indigo-50/70 dark:from-blue-900/30 dark:to-indigo-900/30 backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50 h-full hover:shadow-2xl transition-all duration-500 hover:border-blue-300/60 dark:hover:border-blue-400/60 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-100/30 dark:to-blue-800/30 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="p-8 relative">
                  <div className="flex items-center space-x-4 mb-8">
                    <motion.div 
                      className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Eye className="h-7 w-7 text-white" />
                    </motion.div>
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-indigo-800 dark:from-white dark:to-indigo-200 bg-clip-text text-transparent">Our Vision</h3>
                  </div>
                  <motion.p 
                    className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 text-lg"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    To be recognized as a leading institution of technical education that nurtures 
                    innovative minds, promotes research excellence, and creates leaders who shape 
                    the future of technology and engineering.
                  </motion.p>
                  
                  <motion.div 
                    className="flex items-center space-x-4 mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <motion.div 
                      className="w-10 h-10 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl flex items-center justify-center shadow-md"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Heart className="h-5 w-5 text-white" />
                    </motion.div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">Core Values</h4>
                  </motion.div>
                  <motion.ul 
                    className="space-y-3 text-gray-600 dark:text-gray-300"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    {[
                      "Excellence in education and research",
                      "Integrity and ethical conduct", 
                      "Innovation and creativity",
                      "Social responsibility and sustainability",
                      "Inclusivity and diversity"
                    ].map((value, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                        <span>{value}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Achievements Grid */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h3 
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Our Achievements
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 w-full">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
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
                <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 text-center hover:shadow-2xl transition-all duration-500 hover:border-blue-200/50 dark:hover:border-blue-500/50 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50/20 dark:to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-8 relative">
                    <motion.div 
                      className="w-20 h-20 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="text-white text-2xl">
                        {achievement.icon}
                      </div>
                    </motion.div>
                    <motion.h4 
                      className="text-lg font-bold text-gray-900 dark:text-white mb-3"
                      whileHover={{ scale: 1.05 }}
                    >
                      {achievement.title}
                    </motion.h4>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {achievement.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Key Facts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white relative overflow-hidden">
            {/* Animated background pattern */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full"
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -bottom-20 -left-20 w-32 h-32 bg-white/10 rounded-full"
                animate={{ rotate: -360, scale: [1.2, 1, 1.2] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            </div>
            
            <CardContent className="p-12 relative">
              <motion.h3 
                className="text-3xl md:text-4xl font-bold text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                UCET by Numbers
              </motion.h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  { number: "210", label: "Annual Intake", icon: "👨‍🎓" },
                  { number: "20+", label: "Faculty Members", icon: "👨‍🏫" },
                  { number: "5", label: "Departments", icon: "🏛️" },
                  { number: "40-56%", label: "Placement Rate", icon: "🎯" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <motion.div 
                      className="text-4xl md:text-5xl font-bold mb-3"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {stat.number}
                    </motion.div>
                    <div className="text-blue-200 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Accreditation & Recognition */}
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h3 
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Accreditation & Recognition
          </motion.h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                badge: "NAAC A+",
                badgeClass: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
                title: "National Assessment and Accreditation Council",
                description: "Awarded A+ grade for excellence in education and infrastructure",
                icon: "🏆"
              },
              {
                badge: "AICTE Approved", 
                badgeClass: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
                title: "All India Council for Technical Education",
                description: "All programs approved by AICTE with NBA accreditation",
                icon: "✅"
              },
              {
                badge: "University Affiliated",
                badgeClass: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300", 
                title: "Vinoba Bhave University",
                description: "Affiliated with VBU Hazaribagh for all academic programs",
                icon: "🎓"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
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
                <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 hover:border-blue-200/50 dark:hover:border-blue-500/50 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50/20 dark:to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-8 text-center relative">
                    <div className="text-3xl mb-4">{item.icon}</div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Badge className={`${item.badgeClass} mb-6 px-4 py-2 text-sm font-semibold`}>
                        {item.badge}
                      </Badge>
                    </motion.div>
                    <motion.h4 
                      className="text-lg font-bold text-gray-900 dark:text-white mb-4"
                      whileHover={{ scale: 1.02 }}
                    >
                      {item.title}
                    </motion.h4>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};