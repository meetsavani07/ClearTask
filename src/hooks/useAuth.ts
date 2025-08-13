import { useCallback, useEffect, useState } from "react";

interface User {
  id: number;
  email: string;
  name: string;
  password: string;
}
interface UserData {
  id: number;
  email: string;
  name: string;
  password: string;
}

// Mock users database
const mockUsers: UserData[] = [
  {
    id: 1,
    email: "user1@gmail.com",
    name: "Meet",
    password: "user",
  },
  {
    id: 2,
    email: "user2@gmail.com",
    name: "User Two",
    password: "user",
  },
];

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Error parsing stored user:", error);
          localStorage.removeItem("user");
        }
      }
      setIsLoading(false);
    };
    initAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const user = mockUsers.find(
        (u) => u.email === email && u.password === password
      );
      if(user) {
        const UserData: User ={
          id: user.id,
          email: user.email,
          password: user.password,
          name: user.name
        };
        setUser(UserData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(UserData));
        return true;
      }
    } catch (error) {
      console.log('login error',error);
      
      return false;
    }
  }, []);

  const signup = useCallback(async (email: string, password: string, name: string) => {
    try {
      const existingUser = mockUsers.find((u) => u.email === password);
      if (existingUser) {
        return { success: false, message: 'email already exists' };
      }
      const newUser: UserData = {
        id: mockUsers.length + 1,
        email,
        password,
        name, 
      }
      mockUsers.push(newUser);
      return { success: true, message: 'Please check your email for verification' };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, message: 'An error occurred during signup' };
    }
  }, []);

  // Logout Login
  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/';
  }, []);

  // 
  const Delete = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('ClearTask-tasks');
    window.location.href = '/';
  }, []);
  
  return { isAuthenticated, user, login , signup, isLoading, logout, Delete };
};
