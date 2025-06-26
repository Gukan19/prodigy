
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user' | 'guest';
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateUserRole: (userId: string, role: 'admin' | 'user' | 'guest') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@fortress.com',
    name: 'System Administrator',
    role: 'admin',
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    email: 'user@fortress.com', 
    name: 'Regular User',
    role: 'user',
    createdAt: '2024-01-02'
  }
];

// Mock password storage (in real app, passwords would be hashed on backend)
const mockPasswords: Record<string, string> = {
  'admin@fortress.com': 'admin123',
  'user@fortress.com': 'user123'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('fortress_user');
    const savedToken = localStorage.getItem('fortress_token');
    
    if (savedUser && savedToken) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
        console.log('Session restored for user:', parsedUser.email);
      } catch (error) {
        console.error('Failed to restore session:', error);
        localStorage.removeItem('fortress_user');
        localStorage.removeItem('fortress_token');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('Attempting login for:', email);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check credentials
      if (mockPasswords[email] === password) {
        const foundUser = mockUsers.find(u => u.email === email);
        if (foundUser) {
          setUser(foundUser);
          setIsAuthenticated(true);
          
          // Store session
          localStorage.setItem('fortress_user', JSON.stringify(foundUser));
          localStorage.setItem('fortress_token', 'mock_jwt_token_' + Date.now());
          
          console.log('Login successful for:', foundUser.name);
          return true;
        }
      }
      
      console.log('Login failed: Invalid credentials');
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      console.log('Attempting registration for:', email);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      if (mockUsers.find(u => u.email === email)) {
        console.log('Registration failed: User already exists');
        return false;
      }
      
      // Create new user
      const newUser: User = {
        id: (mockUsers.length + 1).toString(),
        email,
        name,
        role: 'user',
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      mockUsers.push(newUser);
      mockPasswords[email] = password;
      
      setUser(newUser);
      setIsAuthenticated(true);
      
      // Store session
      localStorage.setItem('fortress_user', JSON.stringify(newUser));
      localStorage.setItem('fortress_token', 'mock_jwt_token_' + Date.now());
      
      console.log('Registration successful for:', newUser.name);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    console.log('Logging out user:', user?.email);
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('fortress_user');
    localStorage.removeItem('fortress_token');
  };

  const updateUserRole = (userId: string, role: 'admin' | 'user' | 'guest') => {
    if (user?.role !== 'admin') {
      console.log('Access denied: Only admins can update user roles');
      return;
    }
    
    const userIndex = mockUsers.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      mockUsers[userIndex].role = role;
      console.log(`Updated user ${userId} role to ${role}`);
      
      // Update current user if it's their own role being changed
      if (user.id === userId) {
        const updatedUser = { ...user, role };
        setUser(updatedUser);
        localStorage.setItem('fortress_user', JSON.stringify(updatedUser));
      }
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      register,
      logout,
      updateUserRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
