import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Eye, EyeOff, User, GraduationCap, Users, Shield, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockUsers } from '../data/mockData';
import { requestLoginOtp, verifyLoginOtp, requestPasswordReset, verifyPasswordReset, resendOtp } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
  const { login } = useApp();
  const [activeTab, setActiveTab] = useState<'student' | 'teacher' | 'alumni' | 'admin'>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'password' | 'otp'>('password');
  const [otp, setOtp] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const [devOtp, setDevOtp] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(''); // Clear error when user starts typing
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (step === 'password') {
        const resp = await requestLoginOtp(formData.email, formData.password);
        if (resp?.devOtp) setDevOtp(resp.devOtp);
        setStep('otp');
        setResendTimer(60);
        const interval = setInterval(() => {
          setResendTimer((t) => {
            if (t <= 1) { clearInterval(interval); return 0; }
            return t - 1;
          });
        }, 1000);
      } else {
        const user = await verifyLoginOtp(formData.email, otp);
        if (user && user.role === activeTab) {
          login(user);
          window.location.hash = `${activeTab}-dashboard`;
        } else if (user) {
          login(user);
          window.location.hash = `${user.role}-dashboard`;
        } else {
          setError('Invalid OTP');
        }
      }
    } catch (err: any) {
      const message = err?.response?.data?.message || (step === 'password' ? 'Login failed. Please check your credentials.' : 'OTP verification failed.');
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (role: 'student' | 'teacher' | 'alumni' | 'admin') => {
    const demoUser = mockUsers.find(user => user.role === role);
    if (demoUser) {
      login(demoUser);
      window.location.hash = `${role}-dashboard`;
    }
  };

  const tabConfig = {
    student: {
      icon: <GraduationCap className="h-5 w-5" />,
      title: 'Student Login',
      description: 'Access your student dashboard, courses, and results',
      placeholder: 'Enter your student email'
    },
    teacher: {
      icon: <User className="h-5 w-5" />,
      title: 'Faculty Login',
      description: 'Manage courses, upload results, and communicate with students',
      placeholder: 'Enter your faculty email'
    },
    alumni: {
      icon: <Users className="h-5 w-5" />,
      title: 'Alumni Login',
      description: 'Connect with fellow alumni and access networking opportunities',
      placeholder: 'Enter your alumni email'
    },
    admin: {
      icon: <Shield className="h-5 w-5" />,
      title: 'Admin Login',
      description: 'Administrative access to college management systems',
      placeholder: 'Enter your admin email'
    }
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900" id="login">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Login to Portal
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Choose your role to access the appropriate dashboard
            </p>
          </div>

          <Card className="bg-white dark:bg-gray-800 shadow-xl">
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
                <TabsList className="grid w-full grid-cols-4 rounded-b-none">
                  <TabsTrigger value="student" className="flex flex-col items-center p-3">
                    <GraduationCap className="h-4 w-4 mb-1" />
                    <span className="text-xs">Student</span>
                  </TabsTrigger>
                  <TabsTrigger value="teacher" className="flex flex-col items-center p-3">
                    <User className="h-4 w-4 mb-1" />
                    <span className="text-xs">Faculty</span>
                  </TabsTrigger>
                  <TabsTrigger value="alumni" className="flex flex-col items-center p-3">
                    <Users className="h-4 w-4 mb-1" />
                    <span className="text-xs">Alumni</span>
                  </TabsTrigger>
                  <TabsTrigger value="admin" className="flex flex-col items-center p-3">
                    <Shield className="h-4 w-4 mb-1" />
                    <span className="text-xs">Admin</span>
                  </TabsTrigger>
                </TabsList>

                {Object.entries(tabConfig).map(([role, config]) => (
                  <TabsContent key={role} value={role} className="p-6 m-0">
                    <div className="text-center mb-6">
                      <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-3">
                        {config.icon}
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {config.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {config.description}
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder={config.placeholder}
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="mt-1 bg-white dark:bg-gray-700"
                        />
                      </div>

                      <div>
                        <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
                          Password
                        </Label>
                        <div className="relative mt-1">
                          <Input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            className="pr-10 bg-white dark:bg-gray-700"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-500" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-500" />
                            )}
                          </Button>
                        </div>
                      </div>

                      {step === 'otp' && (
                        <div>
                          <Label htmlFor="otp" className="text-gray-700 dark:text-gray-300">Email OTP</Label>
                          <Input
                            id="otp"
                            name="otp"
                            type="text"
                            placeholder="Enter the 6-digit OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            className="bg-white dark:bg-gray-700"
                          />
                        </div>
                      )}

                      {error && (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}

                      {devOtp && step === 'otp' && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Dev OTP: <span className="font-mono">{devOtp}</span>
                        </div>
                      )}

                      {step === 'otp' && (
                        <div className="flex items-center justify-between">
                          <Button
                            type="button"
                            variant="link"
                            disabled={resendTimer > 0 || isLoading}
                            onClick={async () => {
                              try {
                                setIsLoading(true);
                                const resp2 = await resendOtp(formData.email, 'login');
                                if (resp2?.devOtp) setDevOtp(resp2.devOtp);
                                setResendTimer(60);
                                const interval2 = setInterval(() => {
                                  setResendTimer((t) => {
                                    if (t <= 1) { clearInterval(interval2); return 0; }
                                    return t - 1;
                                  });
                                }, 1000);
                              } catch (e: any) {
                                setError(e?.response?.data?.message || 'Unable to resend OTP');
                              } finally {
                                setIsLoading(false);
                              }
                            }}
                          >
                            Resend OTP {resendTimer > 0 ? `(${resendTimer}s)` : ''}
                          </Button>
                        </div>
                      )}

                      <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        disabled={isLoading}
                      >
                        {isLoading ? (step === 'password' ? 'Sending OTP...' : 'Verifying...') : (step === 'password' ? 'Send OTP' : 'Verify & Sign In')}
                      </Button>

                      <div className="text-center">
                        <Button
                          variant="link"
                          className="text-blue-600 hover:text-blue-500 text-sm"
                          onClick={() => window.location.hash = 'forgot-password'}
                        >
                          Forgot your password?
                        </Button>
                      </div>
                    </form>

                    {/* Demo Login Button */}
                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => handleDemoLogin(role as any)}
                      >
                        Demo Login as {config.title.replace(' Login', '')}
                      </Button>
                      <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
                        Click for instant access with sample data
                      </p>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              For technical support, contact IT Help Desk at{' '}
              <a href="tel:+916546123456" className="text-blue-600 hover:underline">
                +91-6546-123456
              </a>
            </p>
            <div className="mt-2">
              <Button
                variant="link"
                className="text-blue-600 hover:text-blue-500 text-sm"
                onClick={() => (window.location.hash = 'register')}
              >
                New user? Create an account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};