import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
 
import SEO from '@/components/SEO';
import { useAuth } from '@/features/auth/contexts/auth-context';
import { useNavigate } from '@tanstack/react-router';
import {   Lock, Mail, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { authService } from '../data/api';

export const Login: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit } = useForm({
    defaultValues: { email: '', password: '' },
  });

  const mutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      login(data);
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || 'Invalid email or password.');
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: '/admin' });
    }
  }, [isAuthenticated, navigate]);

  const isSubmitting = mutation.isPending || (mutation.isSuccess && !isAuthenticated);

  return (
    <>
      <SEO
        title="Admin Login"
        description="Sign in to the Park Sonoscan Clinic admin dashboard to manage contact messages, job posts, and more."
        canonicalUrl="/login"
        noindex
      />
      <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 p-6">
      <h1 className="sr-only">Admin Login</h1>
      <Card className="w-full max-w-md shadow-xl rounded-3xl border border-slate-100">
        <CardHeader className="text-center pb-2">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20">
            <Lock className="text-white" size={32} />
          </div>
          <CardTitle className="text-3xl font-bold">Admin Login</CardTitle>
          <CardDescription>Sign in to manage your clinic dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6 rounded-2xl">
              <AlertCircle size={18} />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-6">
            <div className="space-y-2">
              <Label>Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <Input
                  {...register('email', { required: true })}
                  type="email"
                  placeholder="admin@parkclinic.com"
                  className="pl-12 py-6 rounded-2xl"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <Input
                  {...register('password', { required: true })}
                  type="password"
                  placeholder="••••••••"
                  className="pl-12 py-6 rounded-2xl"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-6 rounded-2xl font-bold text-lg shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
    </>
  );
};
