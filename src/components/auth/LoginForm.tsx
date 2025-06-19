
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield } from 'lucide-react';
import LoginTab from './LoginTab';
import RegisterTab from './RegisterTab';
import { validatePassword } from './PasswordValidation';

const LoginForm = () => {
  const { login, register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  // Register form state
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const success = await login(loginData.email, loginData.password);
      if (!success) {
        setError('Invalid email or password. Try admin@fortress.com / admin123');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    const passwordValidation = validatePassword(registerData.password);
    if (!passwordValidation.isValid) {
      setError('Password does not meet security requirements');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await register(registerData.email, registerData.password, registerData.name);
      if (!success) {
        setError('Registration failed. User may already exist.');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const backgroundPattern = "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 opacity-20"
        style={{ backgroundImage: `url("${backgroundPattern}")` }}
      ></div>
      
      <Card className="w-full max-w-md bg-slate-800/90 border-slate-700 backdrop-blur-sm relative z-10">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">Web Access Fortress</CardTitle>
          <CardDescription className="text-slate-300">
            Secure authentication portal
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="login" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 bg-slate-700">
              <TabsTrigger value="login" className="data-[state=active]:bg-blue-600">
                Sign In
              </TabsTrigger>
              <TabsTrigger value="register" className="data-[state=active]:bg-blue-600">
                Sign Up
              </TabsTrigger>
            </TabsList>
            
            {error && (
              <Alert className="border-red-500 bg-red-500/10">
                <AlertDescription className="text-red-300">
                  {error}
                </AlertDescription>
              </Alert>
            )}
            
            <TabsContent value="login">
              <LoginTab
                loginData={loginData}
                setLoginData={setLoginData}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                isLoading={isLoading}
                onSubmit={handleLogin}
              />
            </TabsContent>
            
            <TabsContent value="register">
              <RegisterTab
                registerData={registerData}
                setRegisterData={setRegisterData}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                isLoading={isLoading}
                onSubmit={handleRegister}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
