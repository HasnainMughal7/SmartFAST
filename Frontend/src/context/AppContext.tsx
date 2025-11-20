import { createContext, useContext, useState,useEffect } from 'react';
import type { ReactNode } from 'react';
import { MOCK_ALERTS, MOCK_USERS } from '../data/mockData';
import type { User, Alert, AppContextType } from '../types';
import axios from "axios";
import {host} from "../utils/utils.ts";
// import { Navigate } from 'react-router-dom';

const AppContext = createContext<AppContextType | undefined>(undefined);



const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const GetUser = async()=>{
    const user = (await axios.get(`${host}/api/auth/profile/get`)).data;
    if(user) {
      setUser(user);
    }else {
      setUser(null);
    }
  }

  useEffect(()=>{
    if(!user) {
      GetUser();
    }
  },[])
  
  const [alerts, setAlerts] = useState<Alert[]>(MOCK_ALERTS);

  const Login = async(username: string, password: string) => {
    const {data} = await (axios.post(`${host}/api/auth/login`, {username,password}));
    if(data) {
      setUser(data);
    }
    else {
      setUser(null);
    }

  };

  const Logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const addAlert = (newAlertData: Omit<Alert, 'id' | 'status' | 'timestamp'>) => {
    const newAlert: Alert = {
      id: Date.now(),
      status: 'pending',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ...newAlertData,
    };
    setAlerts(prev => [newAlert, ...prev]);
  };

  const updateAlertStatus = (id: number, status: Alert['status']) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  return (
    <AppContext.Provider value={{ user, alerts, Login, Logout, addAlert, updateAlertStatus }}>
      {children}
    </AppContext.Provider>
  );
};

const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
export { AppProvider, useApp };