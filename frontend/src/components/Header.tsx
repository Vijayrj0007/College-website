import React, { useState } from 'react';
import { Menu, X, User, LogOut, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { useApp } from '../context/AppContext';
import { MegaMenu } from './MegaMenu';
import { motion, AnimatePresence } from 'motion/react';

export const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.header 
      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-blue-200/50 dark:border-gray-700/50 sticky top-0 z-50"
      style={{ overflow: 'visible' }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 max-w-none" style={{ overflow: 'visible' }}>
        <div className="flex items-center justify-between py-4 w-full" style={{ overflow: 'visible' }}>
          {/* Logo and University Name */}
          <motion.div 
            className="flex items-center space-x-2 sm:space-x-4 cursor-pointer flex-shrink-0"
            onClick={() => window.location.hash = 'home'}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div 
              className="w-12 h-12 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden"
              whileHover={{ rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <span className="text-white font-bold text-xl relative z-10">U</span>
              <motion.div
                className="absolute top-1 right-1"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="h-3 w-3 text-yellow-300" />
              </motion.div>
            </motion.div>
            <div className="min-w-0 flex-1">
              <motion.h1 
                className="text-sm sm:text-lg md:text-xl font-bold bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-800 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent truncate"
                whileHover={{ scale: 1.02 }}
              >
                University College Of Engineering
              </motion.h1>
              <motion.p 
                className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 font-medium truncate"
                initial={{ opacity: 0.7 }}
                whileHover={{ opacity: 1 }}
              >
                And Technology (VBU HAZARIBAG)
              </motion.p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block relative" style={{ overflow: 'visible' }}>
            <MegaMenu />
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            {isAuthenticated ? (
              <motion.div 
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                  className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/30 px-3 py-2 rounded-full border border-blue-200 dark:border-blue-700"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="p-1 bg-blue-600 rounded-full"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <User className="h-3 w-3 text-white" />
                  </motion.div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user?.name}
                  </span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={logout}
                    className="flex items-center space-x-1 border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
                    aria-label="Logout"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </Button>
                </motion.div>
              </motion.div>
            ) : (
              <div className="flex items-center space-x-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/20"
                    onClick={() => window.location.hash = 'register'}
                  >
                    <span>Register</span>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => window.location.hash = 'login'}
                  >
                    <span>Login</span>
                    <motion.div
                      animate={{ x: [0, 2, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="ml-1"
                    >
                      →
                    </motion.div>
                  </Button>
                </motion.div>
              </div>
            )}

            {/* Mobile Menu Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.nav 
                className="space-y-1 py-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1 }}
              >
                {[
                  { href: "#home", label: "Home" },
                  { href: "#about", label: "About" },
                  { href: "#departments", label: "Departments" },
                  { href: "#academics", label: "Academics" },
                  { href: "#fees", label: "Fee Structure" },
                  { href: "#notices", label: "Notices" },
                  { href: "#alumni", label: "Alumni Network" },
                  { href: "#contact", label: "Contact" },
                  { href: "#register", label: "Register", special: true },
                  { href: "#login", label: "Login", special: true }
                ].map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className={`block py-3 px-4 ${item.special ? 'text-blue-600 font-semibold bg-blue-50 dark:bg-blue-900/20' : 'text-gray-700 dark:text-gray-300'} hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 font-medium`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 4 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </motion.a>
                ))}
                
                <motion.div 
                  className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 px-4 font-semibold">Dashboards:</p>
                  {[
                    { href: "#student-dashboard", label: "Student Dashboard" },
                    { href: "#teacher-dashboard", label: "Teacher Dashboard" }
                  ].map((item, index) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      className="flex items-center justify-between py-2 px-4 text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      whileHover={{ x: 4 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span>{item.label}</span>
                      <span className="text-blue-600 font-bold">→</span>
                    </motion.a>
                  ))}
                </motion.div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};