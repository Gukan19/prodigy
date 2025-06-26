
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import PasswordInput from './PasswordInput';
import PasswordValidation, { validatePassword } from './PasswordValidation';

interface RegisterTabProps {
  registerData: {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
  };
  setRegisterData: (data: { email: string; password: string; confirmPassword: string; name: string }) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

const RegisterTab: React.FC<RegisterTabProps> = ({
  registerData,
  setRegisterData,
  showPassword,
  setShowPassword,
  isLoading,
  onSubmit
}) => {
  const passwordValidation = validatePassword(registerData.password);

  return (
    <div className="space-y-4">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="register-name" className="text-slate-200">Full Name</Label>
          <Input
            id="register-name"
            type="text"
            value={registerData.name}
            onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            placeholder="Enter your full name"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="register-email" className="text-slate-200">Email</Label>
          <Input
            id="register-email"
            type="email"
            value={registerData.email}
            onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            placeholder="Enter your email"
            required
          />
        </div>
        
        <div className="space-y-2">
          <PasswordInput
            id="register-password"
            label="Password"
            value={registerData.password}
            onChange={(password) => setRegisterData({...registerData, password})}
            placeholder="Create a strong password"
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            required
          />
          
          <PasswordValidation 
            password={registerData.password} 
            isVisible={true} 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirm-password" className="text-slate-200">Confirm Password</Label>
          <Input
            id="confirm-password"
            type="password"
            value={registerData.confirmPassword}
            onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            placeholder="Confirm your password"
            required
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-green-600 hover:bg-green-700" 
          disabled={isLoading || !passwordValidation.isValid}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Creating Account...
            </>
          ) : (
            'Create Account'
          )}
        </Button>
      </form>
    </div>
  );
};

export default RegisterTab;
