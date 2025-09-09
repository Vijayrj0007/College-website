import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import { requestPasswordReset, verifyPasswordReset, resendOtp } from '../api/authApi';

export const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState<'email' | 'otp' | 'newPassword'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [devOtp, setDevOtp] = useState('');

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const resp = await requestPasswordReset(email);
      if (resp?.devOtp) setDevOtp(resp.devOtp);
      setSuccess('OTP sent to your email. Please check and enter it below.');
      setStep('otp');
      setResendTimer(60);
      const interval = setInterval(() => {
        setResendTimer((t) => {
          if (t <= 1) { clearInterval(interval); return 0; }
          return t - 1;
        });
      }, 1000);
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Failed to send reset OTP. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Just move to next step - we'll verify with new password
      setStep('newPassword');
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Invalid OTP. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      await verifyPasswordReset(email, otp, newPassword);
      setSuccess('Password reset successfully! You can now log in with your new password.');
      setTimeout(() => {
        window.location.hash = 'login';
      }, 2000);
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Failed to reset password. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setIsLoading(true);
      const resp = await resendOtp(email, 'reset');
      if (resp?.devOtp) setDevOtp(resp.devOtp);
      setResendTimer(60);
      const interval = setInterval(() => {
        setResendTimer((t) => {
          if (t <= 1) { clearInterval(interval); return 0; }
          return t - 1;
        });
      }, 1000);
      setSuccess('OTP resent to your email');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900" id="forgot-password">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {step === 'email' && 'Reset Password'}
              {step === 'otp' && 'Verify OTP'}
              {step === 'newPassword' && 'Set New Password'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {step === 'email' && 'Enter your email to receive a reset code'}
              {step === 'otp' && 'Enter the OTP sent to your email'}
              {step === 'newPassword' && 'Enter your new password'}
            </p>
          </div>

          <Card className="bg-white dark:bg-gray-800 shadow-xl">
            <CardContent className="p-6">
              {step === 'email' && (
                <form onSubmit={handleRequestReset} className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="mt-1 bg-white dark:bg-gray-700"
                    />
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

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Sending OTP...' : 'Send Reset Code'}
                  </Button>

                  <div className="text-center">
                    <Button
                      variant="link"
                      className="text-blue-600 hover:text-blue-500 text-sm"
                      onClick={() => window.location.hash = 'login'}
                    >
                      <ArrowLeft className="h-4 w-4 mr-1" />
                      Back to Login
                    </Button>
                  </div>
                </form>
              )}

              {step === 'otp' && (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div>
                    <Label htmlFor="otp" className="text-gray-700 dark:text-gray-300">
                      OTP Code
                    </Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      className="mt-1 bg-white dark:bg-gray-700"
                    />
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

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Verifying...' : 'Verify OTP'}
                  </Button>

                  <div className="flex items-center justify-between">
                    <Button
                      type="button"
                      variant="link"
                      className="text-blue-600 hover:text-blue-500 text-sm"
                      onClick={() => setStep('email')}
                    >
                      <ArrowLeft className="h-4 w-4 mr-1" />
                      Back
                    </Button>
                    <Button
                      type="button"
                      variant="link"
                      className="text-blue-600 hover:text-blue-500 text-sm"
                      disabled={resendTimer > 0 || isLoading}
                      onClick={handleResendOtp}
                    >
                      Resend OTP {resendTimer > 0 ? `(${resendTimer}s)` : ''}
                    </Button>
                  </div>
                </form>
              )}

              {step === 'newPassword' && (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div>
                    <Label htmlFor="newPassword" className="text-gray-700 dark:text-gray-300">
                      New Password
                    </Label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      className="mt-1 bg-white dark:bg-gray-700"
                    />
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300">
                      Confirm Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="mt-1 bg-white dark:bg-gray-700"
                    />
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

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Resetting...' : 'Reset Password'}
                  </Button>

                  <div className="text-center">
                    <Button
                      type="button"
                      variant="link"
                      className="text-blue-600 hover:text-blue-500 text-sm"
                      onClick={() => setStep('otp')}
                    >
                      <ArrowLeft className="h-4 w-4 mr-1" />
                      Back
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
