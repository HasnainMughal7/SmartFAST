import type { User, Alert } from '../types/index';

// --- Existing Users (IDs string main kar diye hain taake comparison easy ho) ---
const MOCK_USERS: User[] = [
  { _id: '691df58bf72af3eac8be6b16', username: 'Hasnain', password:'admin', role: 'admin', email: 'h@gmail.com' },
  { _id: '2', username: 'Furqan', password:'admin', role: 'admin', email: 'f@gmail.com' },
  { _id: '3', username: 'Admin User', password:'admin', role: 'admin', email: 'admin@fast.edu' },
  { _id: '4', username: 'Sir Jahaz', password:'password', role: 'teacher', email: 'ahmed@fast.edu' },
  { _id: '5', username: 'Shapatar Ali', password:'password', role: 'maintainer', email: 'ali@staff.com' },
];

const MOCK_ALERTS: Alert[] = [
  { id: 101, teacher: 'Sir Ahmed', category: 'Urgent', location: 'Block A, Room 302', comment: 'AC sparking heavily', status: 'pending', timestamp: '10:30 AM' },
  { id: 102, teacher: 'Ms. Sarah', category: 'Moderate', location: 'Library, Floor 2', comment: 'Light flickering', status: 'in-progress', timestamp: '09:15 AM' },
  { id: 103, teacher: 'Dr. Bilal', category: 'Urgent', location: 'CS Lab 4', comment: 'Projector malfunction', status: 'completed', timestamp: 'Yesterday' },
];

const POWER_DATA = [
  { time: '08:00', usage: 120 },
  { time: '10:00', usage: 350 },
  { time: '12:00', usage: 480 },
  { time: '14:00', usage: 450 },
  { time: '16:00', usage: 300 },
  { time: '18:00', usage: 150 },
];

// --- NEW: Mock Chat Messages ---
// userID ab MOCK_USERS ki id se match kar rha hai
const MOCK_MESSAGES = [
  { 
    id: 101,
    userID: '5', // Shapatar Ali (Maintainer)
    username: 'Shapatar Ali', 
    role: 'maintainer', 
    content: 'Sir, I have fixed the AC issue in Block A. Should I proceed to the Library?', 
    createdAt: '10:45 AM' 
  },
  { 
    id: 102,
    userID: '1', // Hasnain (Admin)
    username: 'Hasnain',
    role: 'admin',
    content: 'Yes, please fix it ASAP.',
    createdAt: '10:50 AM'
  },
  {
    id: 103,
    userID: '5', // Shapatar Ali
    username: 'Shapatar Ali',
    role: 'maintainer',
    content: 'Sure thing! Will update you once done.',
    createdAt: '10:55 AM'
  },
  {
    id: 104,
    userID: '3', // Admin User
    username: 'Admin User',
    role: 'admin',
    content: 'Great work team.',
    createdAt: '11:00 AM'
  },
  {
    id: 105,
    userID: '1', // Hasnain (Admin)
    username: 'Hasnain',
    role: 'admin',
    content: 'Keep me posted on the progress.',
    createdAt: '11:05 AM'
  }
];

export { MOCK_USERS, MOCK_ALERTS, POWER_DATA, MOCK_MESSAGES };