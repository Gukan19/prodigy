
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, User, LogOut, Settings } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.03\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Web Access Fortress</h1>
              <p className="text-slate-300">Secure Dashboard</p>
            </div>
          </div>
          
          <Button 
            onClick={handleLogout}
            variant="outline" 
            className="border-slate-600 text-slate-200 hover:bg-slate-700"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-800/90 border-slate-700 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-400" />
                User Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-slate-300">
                  <span className="font-medium">Name:</span> {user?.name}
                </p>
                <p className="text-slate-300">
                  <span className="font-medium">Email:</span> {user?.email}
                </p>
                <p className="text-slate-300 flex items-center">
                  <span className="font-medium mr-2">Role:</span>
                  <Badge 
                    variant={user?.role === 'admin' ? 'destructive' : user?.role === 'user' ? 'default' : 'secondary'}
                    className="capitalize"
                  >
                    {user?.role}
                  </Badge>
                </p>
                <p className="text-slate-300">
                  <span className="font-medium">Member since:</span> {user?.createdAt}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/90 border-slate-700 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center">
                <Settings className="w-5 h-5 mr-2 text-green-400" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full border-slate-600 text-slate-200 hover:bg-slate-700"
                >
                  Update Profile
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-slate-600 text-slate-200 hover:bg-slate-700"
                >
                  Change Password
                </Button>
                {user?.role === 'admin' && (
                  <Button 
                    variant="outline" 
                    className="w-full border-slate-600 text-slate-200 hover:bg-slate-700"
                  >
                    Admin Panel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/90 border-slate-700 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-white">System Status</CardTitle>
              <CardDescription className="text-slate-400">
                All systems operational
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Authentication</span>
                  <Badge variant="default" className="bg-green-600">Online</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Database</span>
                  <Badge variant="default" className="bg-green-600">Online</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Security</span>
                  <Badge variant="default" className="bg-green-600">Secure</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-slate-800/90 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Welcome to Your Dashboard</CardTitle>
            <CardDescription className="text-slate-400">
              You have successfully logged into the secure portal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300">
              This is a protected area that only authenticated users can access. 
              Your session is secure and your data is protected with industry-standard security measures.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
