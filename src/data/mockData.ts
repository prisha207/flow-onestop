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

// Shared emails - used across Focus Day View and Mailbox
export const emails: Email[] = [
  {
    id: 'email-1',
    sender: 'Sarah Chen',
    senderEmail: 'sarah.chen@company.com',
    subject: 'Q4 Revenue Report - Action Required',
    summary: 'Need your approval on the final numbers before the board meeting tomorrow.',
    timestamp: new Date(2025, 1, 1, 6, 30),
    isRead: false,
    isCarryover: true,
    needsAttention: false,
    canWait: false,
    relatedMeetingId: 'meeting-1',
    category: 'work',
  },
  {
    id: 'email-2',
    sender: 'Michael Torres',
    senderEmail: 'michael.t@client.io',
    subject: 'Contract Renewal Discussion',
    summary: 'Following up on our call. The client is ready to proceed with the new terms.',
    timestamp: new Date(2025, 1, 1, 5, 15),
    isRead: false,
    isCarryover: true,
    needsAttention: false,
    canWait: false,
    relatedMeetingId: 'meeting-2',
    category: 'work',
  },
  {
    id: 'email-3',
    sender: 'Design Team',
    senderEmail: 'design@company.com',
    subject: 'New mockups ready for review',
    summary: 'The updated homepage designs are attached. Please review before end of day.',
    timestamp: new Date(2025, 1, 1, 8, 45),
    isRead: false,
    isCarryover: false,
    needsAttention: true,
    canWait: false,
    category: 'work',
  },
  {
    id: 'email-4',
    sender: 'HR Department',
    senderEmail: 'hr@company.com',
    subject: 'Time off request approved',
    summary: 'Your time off request for March 15-18 has been approved.',
    timestamp: new Date(2025, 1, 1, 9, 0),
    isRead: true,
    isCarryover: false,
    needsAttention: false,
    canWait: true,
    category: 'notification',
  },
  {
    id: 'email-5',
    sender: 'Tech Weekly',
    senderEmail: 'newsletter@techweekly.com',
    subject: 'This week in AI: New breakthroughs',
    summary: 'The latest developments in artificial intelligence and machine learning.',
    timestamp: new Date(2025, 1, 1, 7, 0),
    isRead: true,
    isCarryover: false,
    needsAttention: false,
    canWait: true,
    category: 'newsletter',
  },
  {
    id: 'email-6',
    sender: 'Alex Kim',
    senderEmail: 'alex.kim@partner.co',
    subject: 'Partnership proposal draft',
    summary: 'Attached is the initial draft for our partnership agreement. Let me know your thoughts.',
    timestamp: new Date(2025, 1, 1, 10, 30),
    isRead: false,
    isCarryover: false,
    needsAttention: true,
    canWait: false,
    relatedMeetingId: 'meeting-3',
    category: 'work',
  },
  {
    id: 'email-7',
    sender: 'System Notifications',
    senderEmail: 'noreply@company.com',
    subject: 'Weekly analytics report',
    summary: 'Your weekly dashboard analytics are ready to view.',
    timestamp: new Date(2025, 1, 1, 6, 0),
    isRead: true,
    isCarryover: false,
    needsAttention: false,
    canWait: true,
    category: 'notification',
  },
];

// Shared meetings - used across Calendar and Focus Day View
export const meetings: Meeting[] = [
  {
    id: 'meeting-1',
    title: 'Board Meeting Prep',
    time: new Date(2025, 1, 1, 10, 0),
    endTime: new Date(2025, 1, 1, 11, 0),
    purpose: 'Review Q4 numbers and finalize presentation slides.',
    relatedEmailIds: ['email-1'],
    attendees: ['Sarah Chen', 'CFO', 'You'],
  },
  {
    id: 'meeting-2',
    title: 'Client Call - Renewal',
    time: new Date(2025, 1, 1, 14, 0),
    endTime: new Date(2025, 1, 1, 14, 30),
    purpose: 'Discuss contract terms and timeline for renewal.',
    relatedEmailIds: ['email-2'],
    attendees: ['Michael Torres', 'Account Manager', 'You'],
  },
  {
    id: 'meeting-3',
    title: 'Partnership Sync',
    time: new Date(2025, 1, 1, 16, 0),
    endTime: new Date(2025, 1, 1, 16, 45),
    purpose: 'Review partnership proposal and next steps.',
    relatedEmailIds: ['email-6'],
    attendees: ['Alex Kim', 'You'],
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
    title: 'Project Deadline',
    date: new Date(2025, 1, 5, 17, 0),
    endDate: new Date(2025, 1, 5, 17, 0),
    type: 'deadline',
  },
  {
    id: 'event-2',
    title: 'Team Standup',
    date: new Date(2025, 1, 3, 9, 0),
    endDate: new Date(2025, 1, 3, 9, 30),
    type: 'meeting',
  },
  {
    id: 'event-3',
    title: 'Quarterly Review',
    date: new Date(2025, 1, 10, 14, 0),
    endDate: new Date(2025, 1, 10, 16, 0),
    type: 'meeting',
  },
  {
    id: 'event-4',
    title: 'Submit Report',
    date: new Date(2025, 1, 15, 12, 0),
    endDate: new Date(2025, 1, 15, 12, 0),
    type: 'reminder',
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
