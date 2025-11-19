
type UserRole = 'admin' | 'teacher' | 'maintainer';

interface Alert {
  id: number;
  teacher: string;
  category: 'Urgent' | 'Moderate';
  location: string;
  comment: string;
  status: 'pending' | 'in-progress' | 'completed';
  timestamp: string;
}

interface AppContextType {
  user: User | null;
  alerts: Alert[];
  // users: User[];
  Login: (email: string, password: string) => void;
  Logout: () => void;
  addAlert: (alert: Omit<Alert, 'id' | 'status' | 'timestamp'>) => void;
  updateAlertStatus: (id: number, status: Alert['status']) => void;
  // addUser: (user: Omit<User, 'id'>) => void;
  // deleteUser: (id: number) => void;
}


type User = {
  _id?: string,
  username:string,
  password:string,
  email: string,
  role: UserRole
}

export type { User, Alert, AppContextType, UserRole }