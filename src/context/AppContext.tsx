import { createContext, useContext, useState, ReactNode } from 'react';
import { CalendarEvent } from '@/data/mockData';

export interface Draft {
  id: string;
  to: string;
  toEmail: string;
  subject: string;
  body: string;
  savedAt: Date;
}

interface AppContextType {
  scheduledEvents: CalendarEvent[];
  addScheduledEvent: (event: CalendarEvent) => void;
  drafts: Draft[];
  addDraft: (draft: Draft) => void;
  removeDraft: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [scheduledEvents, setScheduledEvents] = useState<CalendarEvent[]>([]);
  const [drafts, setDrafts] = useState<Draft[]>([]);

  const addScheduledEvent = (event: CalendarEvent) => {
    setScheduledEvents(prev => [...prev, event]);
  };

  const addDraft = (draft: Draft) => {
    setDrafts(prev => [...prev.filter(d => d.id !== draft.id), draft]);
  };

  const removeDraft = (id: string) => {
    setDrafts(prev => prev.filter(d => d.id !== id));
  };

  return (
    <AppContext.Provider value={{ scheduledEvents, addScheduledEvent, drafts, addDraft, removeDraft }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
