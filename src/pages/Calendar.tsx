import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import PageLayout from '@/components/layout/PageLayout';
import { calendarEvents, CalendarEvent, emails } from '@/data/mockData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2026, 1, 1));

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Pad beginning of month
  const startDayOfWeek = monthStart.getDay();
  const paddingDays = Array(startDayOfWeek).fill(null);

  const getEventsForDay = (date: Date): CalendarEvent[] => {
    return calendarEvents.filter(event => isSameDay(event.date, date));
  };

  const selectedEvents = selectedDate ? getEventsForDay(selectedDate) : [];
  // Only show emails that are related to the selected day's events
  const selectedEmails = selectedDate 
    ? emails.filter(e => 
        selectedEvents.some(event => e.relatedMeetingId === event.id)
      )
    : [];

  const goToPrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const goToNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const getEventColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-primary';
      case 'deadline': return 'bg-destructive';
      case 'reminder': return 'bg-accent';
      default: return 'bg-primary';
    }
  };

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Calendar</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={goToPrevMonth}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-muted-foreground" />
            </button>
            <span className="text-lg font-medium text-foreground min-w-[160px] text-center">
              {format(currentDate, 'MMMM yyyy')}
            </span>
            <button
              onClick={goToNextMonth}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Calendar Grid */}
          <div className="col-span-2 bg-card border border-border rounded-2xl p-6">
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1">
              {paddingDays.map((_, index) => (
                <div key={`pad-${index}`} className="h-10" />
              ))}
              {days.map((day) => {
                const dayEvents = getEventsForDay(day);
                const isSelected = selectedDate && isSameDay(day, selectedDate);
                const isToday = isSameDay(day, new Date(2026, 1, 1));

                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => setSelectedDate(day)}
                    className={`h-10 w-full flex items-center justify-center rounded-lg transition-all relative ${
                      isSelected
                        ? 'bg-primary text-primary-foreground'
                        : isToday
                        ? 'bg-secondary text-foreground'
                        : isSameMonth(day, currentDate)
                        ? 'hover:bg-secondary text-foreground'
                        : 'text-muted-foreground'
                    }`}
                  >
                    <span className="text-sm font-medium">{format(day, 'd')}</span>
                    {dayEvents.length > 0 && (
                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                        {dayEvents.slice(0, 3).map((event) => (
                          <div
                            key={event.id}
                            className={`w-1.5 h-1.5 rounded-full ${
                              isSelected ? 'bg-primary-foreground' : getEventColor(event.type)
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Day Details */}
          <div className="col-span-1 space-y-4">
            <div className="bg-card border border-border rounded-2xl p-4">
              <h3 className="font-semibold text-foreground mb-3">
                {selectedDate ? format(selectedDate, 'EEEE, MMMM d') : 'Select a date'}
              </h3>
              
              {selectedEvents.length > 0 ? (
                <div className="space-y-3">
                  {selectedEvents.map(event => (
                    <div
                      key={event.id}
                      className="p-3 rounded-xl bg-secondary border border-border"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`w-2 h-2 rounded-full ${getEventColor(event.type)}`} />
                        <span className="text-xs text-muted-foreground uppercase">
                          {event.type}
                        </span>
                      </div>
                      <p className="font-medium text-foreground">{event.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(event.date, 'h:mm a')}
                        {event.endDate && event.endDate.getTime() !== event.date.getTime() && (
                          <> - {format(event.endDate, 'h:mm a')}</>
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No events</p>
              )}
            </div>

            {selectedEmails.length > 0 && (
              <div className="bg-card border border-border rounded-2xl p-4">
                <h3 className="font-semibold text-foreground mb-3">Related Emails</h3>
                <div className="space-y-2">
                  {selectedEmails.map(email => (
                    <div
                      key={email.id}
                      className="p-2 rounded-lg bg-secondary border border-border"
                    >
                      <p className="text-sm font-medium text-foreground truncate">
                        {email.subject}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {email.sender}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Calendar;
