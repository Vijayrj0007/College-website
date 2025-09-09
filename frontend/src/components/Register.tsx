import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { requestRegisterOtp, verifyRegisterOtp, resendOtp } from '../api/authApi';

export const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [otp, setOtp] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const [devOtp, setDevOtp] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      if (step === 'form') {
        const resp = await requestRegisterOtp(formData);
        if (resp?.devOtp) setDevOtp(resp.devOtp);
        setSuccess('OTP sent to your email. Please enter it to complete registration.');
        setStep('otp');
        setResendTimer(60);
        const interval = setInterval(() => {
          setResendTimer((t) => {
            if (t <= 1) { clearInterval(interval); return 0; }
            return t - 1;
          });
        }, 1000);
      } else {
        await verifyRegisterOtp({ ...formData, otp });
        setSuccess('Registration successful. You can now log in.');
        setTimeout(() => {
          window.location.hash = 'login';
        }, 1200);
      }
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Registration failed. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900" id="register">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Create an account</h2>
            <p className="text-gray-600 dark:text-gray-400">Join the portal to access services</p>
          </div>

          <Card className="bg-white dark:bg-gray-800 shadow-xl">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Full Name</Label>
                  <Input id="name" name="name" type="text" placeholder="John Doe" value={formData.name} onChange={handleInputChange} required className="mt-1 bg-white dark:bg-gray-700" />
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email Address</Label>
                  <Input id="email" name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleInputChange} required className="mt-1 bg-white dark:bg-gray-700" />
                </div>

                <div>
                  <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
                  <Input id="password" name="password" type="password" placeholder="Create a strong password" value={formData.password} onChange={handleInputChange} required className="mt-1 bg-white dark:bg-gray-700" />
                </div>
                {step === 'otp' && (
                  <div>
                    <Label htmlFor="otp" className="text-gray-700 dark:text-gray-300">Email OTP</Label>
                    <Input id="otp" name="otp" type="text" placeholder="Enter the 6-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required className="mt-1 bg-white dark:bg-gray-700" />
                  </div>
                )}

                <div>
                  <Label htmlFor="role" className="text-gray-700 dark:text-gray-300">Role</Label>
                  <select id="role" name="role" value={formData.role} onChange={handleInputChange} className="mt-1 w-full border rounded-md px-3 py-2 bg-white dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600">
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="alumni">Alumni</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert>
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertDescription>{success}</AlertDescription>
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
                          const resp2 = await resendOtp(formData.email, 'register');
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

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                  {isLoading ? (step === 'form' ? 'Sending OTP...' : 'Verifying...') : (step === 'form' ? 'Send OTP' : 'Verify & Create Account')}
                </Button>

                <div className="text-center">
                  <Button variant="link" className="text-blue-600 hover:text-blue-500 text-sm" onClick={() => (window.location.hash = 'login')}>
                    Already have an account? Sign in
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Register;


