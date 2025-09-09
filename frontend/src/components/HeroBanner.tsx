import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { ArrowRight, BookOpen, Phone, Star, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';
import campusImage from '../assets/campusImage.png';


// Particle animation component
const FloatingParticle: React.FC<{ delay: number; duration: number; x: number; y: number }> = ({ delay, duration, x, y }) => (
  <motion.div
    className="absolute w-2 h-2 bg-white/20 rounded-full"
    style={{ left: `${x}%`, top: `${y}%` }}
    animate={{
      y: [0, -20, 0],
      opacity: [0.3, 0.8, 0.3],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

export const HeroBanner: React.FC = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    // Generate random particles
    const particleArray = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2,
    }));
    setParticles(particleArray);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/20 to-pink-500/30"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(59,130,246,0.3), rgba(147,51,234,0.2), rgba(236,72,153,0.3))",
              "linear-gradient(135deg, rgba(236,72,153,0.3), rgba(59,130,246,0.2), rgba(147,51,234,0.3))",
              "linear-gradient(225deg, rgba(147,51,234,0.3), rgba(236,72,153,0.2), rgba(59,130,246,0.3))",
              "linear-gradient(315deg, rgba(59,130,246,0.3), rgba(147,51,234,0.2), rgba(236,72,153,0.3))",
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Background Image with Enhanced Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <ImageWithFallback
          src={campusImage}
          alt="UCET VBU campus building"
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/40 to-blue-900/80"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <FloatingParticle
            key={particle.id}
            delay={particle.delay}
            duration={particle.duration}
            x={particle.x}
            y={particle.y}
          />
        ))}
      </div>

      {/* Geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 border border-white/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-40 right-20 w-16 h-16 border border-purple-300/30 rounded-lg"
          animate={{ rotate: -360, scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-12 h-12 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full"
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20 md:py-32 flex items-center min-h-screen max-w-none">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Star className="h-4 w-4 text-yellow-300" />
              <span className="text-sm font-medium text-white/90">Ranked Among Top Engineering Colleges</span>
              <Sparkles className="h-4 w-4 text-blue-300" />
            </motion.div>
            
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              University College Of
              <motion.span 
                className="block text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent mt-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                Engineering & Technology
              </motion.span>
            </motion.h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-blue-100 mb-4 font-medium"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              VBU HAZARIBAG
            </motion.p>
            
            <motion.p 
              className="text-lg md:text-xl text-blue-200/90 mb-10 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              Where learning meets innovation. Empowering students with cutting-edge education, 
              research opportunities, and industry connections for a brighter future.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-white to-blue-50 text-blue-900 hover:from-blue-50 hover:to-white shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-4 text-lg font-semibold flex items-center space-x-3 border border-white/20"
                  onClick={() => document.getElementById('academics')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <BookOpen className="h-6 w-6" />
                  <span>Explore Academics</span>
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-semibold flex items-center space-x-3 px-8 py-4 text-lg transition-all duration-300 hover:border-white/50"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Phone className="h-6 w-6" />
                  <span>Contact Us</span>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mt-20 max-w-5xl mx-auto w-full"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          {[
            { number: "10+", label: "Years of Excellence", icon: "🎓" },
            { number: "2000+", label: "Students", icon: "👥" },
            { number: "30+", label: "Faculty Members", icon: "👨‍🏫" },
            { number: "4+", label: "Departments", icon: "🏛️" }
          ].map((stat, index) => (
            <motion.div 
              key={stat.label}
              className="text-center group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 + index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-xl sm:text-2xl mb-2">{stat.icon}</div>
                <motion.div 
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-2"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-xs sm:text-sm text-blue-200/90 font-medium">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Glassmorphism overlay for enhanced depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

      {/* Skip to Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-blue-900 px-4 py-2 rounded-md font-semibold z-50 shadow-lg"
      >
        Skip to main content
      </a>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center text-white/60">
          <span className="text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};