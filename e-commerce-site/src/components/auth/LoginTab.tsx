
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import PasswordInput from './PasswordInput';

interface LoginTabProps {
  loginData: {
    email: string;
    password: string;
  };
  setLoginData: (data: { email: string; password: string }) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

const LoginTab: React.FC<LoginTabProps> = ({
  loginData,
  setLoginData,
  showPassword,
  setShowPassword,
  isLoading,
  onSubmit
}) => {
  return (
    <div className="space-y-4">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="login-email" className="text-slate-200">Email</Label>
          <Input
            id="login-email"
            type="email"
            value={loginData.email}
            onChange={(e) => setLoginData({...loginData, email: e.target.value})}
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            placeholder="Enter your email"
            required
          />
        </div>
        
        <PasswordInput
          id="login-password"
          label="Password"
          value={loginData.password}
          onChange={(password) => setLoginData({...loginData, password})}
          placeholder="Enter your password"
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
          required
        />
        
        <Button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700" 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Signing In...
            </>
          ) : (
            'Sign In'
          )}
        </Button>
      </form>
      
      <div className="text-sm text-slate-400 text-center mt-4">
        <p>Demo Credentials:</p>
        <p className="text-blue-300">admin@fortress.com / admin123</p>
        <p className="text-green-300">user@fortress.com / user123</p>
      </div>
    </div>
  );
};

export default LoginTab;
