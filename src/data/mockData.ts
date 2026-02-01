export interface Email {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  summary: string;
  timestamp: Date;
  isRead: boolean;
  isCarryover: boolean;
  needsAttention: boolean;
  canWait: boolean;
  relatedMeetingId?: string;
  category: 'work' | 'personal' | 'newsletter' | 'notification';
}

export interface Meeting {
  id: string;
  title: string;
  time: Date;
  endTime: Date;
  purpose: string;
  relatedEmailIds: string[];
  attendees: string[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  endDate: Date;
  type: 'meeting' | 'reminder' | 'deadline';
  color?: string;
}

// Shared emails - for a college student running a startup
export const emails: Email[] = [
  {
    id: 'email-1',
    sender: 'Prof. Williams',
    senderEmail: 'j.williams@university.edu',
    subject: 'Capstone Project Deadline Extension Request',
    summary: 'Regarding your request - I can give you until Friday, but need the draft by Wednesday for review.',
    timestamp: new Date(2026, 1, 1, 6, 30),
    isRead: false,
    isCarryover: true,
    needsAttention: false,
    canWait: false,
    relatedMeetingId: 'meeting-1',
    category: 'work',
  },
  {
    id: 'email-2',
    sender: 'Ravi Mehta',
    senderEmail: 'ravi@techventures.vc',
    subject: 'Follow-up: Seed Round Discussion',
    summary: 'Impressed by your demo yesterday. Our partners want to schedule a deeper dive into your traction metrics.',
    timestamp: new Date(2026, 1, 1, 5, 15),
    isRead: false,
    isCarryover: true,
    needsAttention: false,
    canWait: false,
    relatedMeetingId: 'meeting-2',
    category: 'work',
  },
  {
    id: 'email-3',
    sender: 'Ananya (Co-founder)',
    senderEmail: 'ananya@ourstartup.io',
    subject: 'Beta user feedback compiled',
    summary: 'Put together all the feedback from our 50 beta users. Top request is mobile app - should we prioritize?',
    timestamp: new Date(2026, 1, 1, 8, 45),
    isRead: false,
    isCarryover: false,
    needsAttention: true,
    canWait: false,
    category: 'work',
  },
  {
    id: 'email-4',
    sender: 'University Housing',
    senderEmail: 'housing@university.edu',
    subject: 'Room assignment confirmed for Spring',
    summary: 'Your room assignment for Spring semester has been confirmed. Check the portal for details.',
    timestamp: new Date(2026, 1, 1, 9, 0),
    isRead: true,
    isCarryover: false,
    needsAttention: false,
    canWait: true,
    category: 'notification',
  },
  {
    id: 'email-5',
    sender: 'Indie Hackers Weekly',
    senderEmail: 'newsletter@indiehackers.com',
    subject: 'How a solo founder hit $10K MRR while in college',
    summary: 'This week: inspiring stories from student founders building in public.',
    timestamp: new Date(2026, 1, 1, 7, 0),
    isRead: true,
    isCarryover: false,
    needsAttention: false,
    canWait: true,
    category: 'newsletter',
  },
  {
    id: 'email-6',
    sender: 'AWS Activate',
    senderEmail: 'activate@aws.amazon.com',
    subject: 'Your $5,000 credits are expiring soon',
    summary: 'Reminder: Your startup credits expire in 30 days. Apply for an extension or use them before March 1.',
    timestamp: new Date(2026, 1, 1, 10, 30),
    isRead: false,
    isCarryover: false,
    needsAttention: true,
    canWait: false,
    relatedMeetingId: 'meeting-3',
    category: 'work',
  },
  {
    id: 'email-7',
    sender: 'Campus Events',
    senderEmail: 'events@university.edu',
    subject: 'Startup Pitch Competition - Registration Open',
    summary: 'Annual entrepreneurship pitch competition. $10K prize pool. Registration closes Feb 15.',
    timestamp: new Date(2026, 1, 1, 6, 0),
    isRead: true,
    isCarryover: false,
    needsAttention: false,
    canWait: true,
    category: 'notification',
  },
];

// Shared meetings - college + startup life
export const meetings: Meeting[] = [
  {
    id: 'meeting-1',
    title: 'Office Hours - Prof. Williams',
    time: new Date(2026, 1, 1, 10, 0),
    endTime: new Date(2026, 1, 1, 10, 30),
    purpose: 'Discuss capstone project scope and get feedback on MVP approach.',
    relatedEmailIds: ['email-1'],
    attendees: ['Prof. Williams', 'You'],
  },
  {
    id: 'meeting-2',
    title: 'VC Call - TechVentures',
    time: new Date(2026, 1, 1, 14, 0),
    endTime: new Date(2026, 1, 1, 15, 0),
    purpose: 'Deep dive into metrics, user growth, and funding ask for seed round.',
    relatedEmailIds: ['email-2'],
    attendees: ['Ravi Mehta', 'Partner Team', 'Ananya', 'You'],
  },
  {
    id: 'meeting-3',
    title: 'Co-founder Sync',
    time: new Date(2026, 1, 1, 17, 0),
    endTime: new Date(2026, 1, 1, 17, 45),
    purpose: 'Review beta feedback, plan sprint priorities, discuss AWS credits.',
    relatedEmailIds: ['email-6', 'email-3'],
    attendees: ['Ananya', 'You'],
  },
];

// Calendar events for the full month
export const calendarEvents: CalendarEvent[] = [
  ...meetings.map(m => ({
    id: m.id,
    title: m.title,
    date: m.time,
    endDate: m.endTime,
    type: 'meeting' as const,
  })),
  {
    id: 'event-1',
    title: 'Capstone Draft Due',
    date: new Date(2026, 1, 5, 17, 0),
    endDate: new Date(2026, 1, 5, 17, 0),
    type: 'deadline',
  },
  {
    id: 'event-2',
    title: 'CS 401 Lecture',
    date: new Date(2026, 1, 3, 9, 0),
    endDate: new Date(2026, 1, 3, 10, 30),
    type: 'meeting',
  },
  {
    id: 'event-3',
    title: 'Pitch Competition Deadline',
    date: new Date(2026, 1, 15, 23, 59),
    endDate: new Date(2026, 1, 15, 23, 59),
    type: 'deadline',
  },
  {
    id: 'event-4',
    title: 'Midterm - Data Structures',
    date: new Date(2026, 1, 10, 14, 0),
    endDate: new Date(2026, 1, 10, 16, 0),
    type: 'deadline',
  },
  {
    id: 'event-5',
    title: 'Product Launch Prep',
    date: new Date(2026, 1, 20, 10, 0),
    endDate: new Date(2026, 1, 20, 12, 0),
    type: 'meeting',
  },
];

export const getCarryoverEmails = () => emails.filter(e => e.isCarryover);
export const getNeedsAttentionEmails = () => emails.filter(e => e.needsAttention);
export const getCanWaitEmails = () => emails.filter(e => e.canWait);
export const getTodaysMeetings = () => meetings;
export const getRelatedEmails = (meetingId: string) => 
  emails.filter(e => e.relatedMeetingId === meetingId);
export const getEmailById = (id: string) => emails.find(e => e.id === id);
export const getMeetingById = (id: string) => meetings.find(m => m.id === id);
