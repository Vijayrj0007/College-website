import React, { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import { UtilityBar } from './components/UtilityBar';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { QuickLinks } from './components/QuickLinks';
import { Notices } from './components/Notices';
import { ChatBot } from './components/ChatBot';
import { AlumniNetwork } from './components/AlumniNetwork';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { ForgotPassword } from './components/ForgotPassword';
import { About } from './components/About';
import { Departments } from './components/Departments';
import { Footer } from './components/Footer';
import { StudentDashboard } from './components/dashboards/StudentDashboard';
import { TeacherDashboard } from './components/dashboards/TeacherDashboard';
import { AdminDashboard } from './components/dashboards/AdminDashboard';
import { AlumniDashboard } from './components/dashboards/AlumniDashboard';
import { Contact } from './components/Contact';
import { FeeStructure } from './components/FeeStructure';
import { Academics } from './components/Academics';
import { Button } from './components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';
import { motion } from 'motion/react';

function AppContent() {
  const [currentView, setCurrentView] = useState('home');

  useEffect(() => {
    // Handle hash-based routing
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'home';
      setCurrentView(hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initialize on mount

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderContent = () => {
    switch (currentView) {
      case 'login':
        return <Login />;
      case 'register':
        return <Register />;
      case 'forgot-password':
        return <ForgotPassword />;
      case 'about':
        return <About />;
      case 'departments':
        return <Departments />;
      case 'notices':
        return <Notices />;
      case 'alumni':
        return <AlumniNetwork />;
      case 'contact':
        return <Contact />;
      case 'fees':
        return <FeeStructure />;
      case 'academics':
        return <Academics />;
      case 'student-dashboard':
        return <StudentDashboard />;
      case 'teacher-dashboard':
        return <TeacherDashboard />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'alumni-dashboard':
        return <AlumniDashboard />;
      case 'home':
      default:
        return (
          <>
            <HeroBanner />
            <main id="main-content">
              <QuickLinks />
              <Notices />
              <About />
              <Departments />
              <AlumniNetwork />
              <Contact />
            </main>
          </>
        );
    }
  };

  const showFullLayout = !['student-dashboard', 'teacher-dashboard', 'alumni-dashboard', 'admin-dashboard'].includes(currentView);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {showFullLayout && <UtilityBar />}
      {showFullLayout && <Header />}
      <div className="w-full">
        {renderContent()}
      </div>
      {showFullLayout && <Footer />}
      <ChatBot />
    </div>
  );
}

export default function App() {
  return (
    <div className="w-full overflow-x-hidden">
      <AppProvider>
        <AppContent />
      </AppProvider>
    </div>
  );
}