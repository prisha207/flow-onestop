import { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon, Clock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useAppContext } from '@/context/AppContext';

interface ScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  emailSubject?: string;
}

const timeSlots = Array.from({ length: 24 }, (_, h) =>
  [0, 30].map((m) => {
    const hour = h.toString().padStart(2, '0');
    const min = m.toString().padStart(2, '0');
    return `${hour}:${min}`;
  })
).flat();

const ScheduleDialog = ({ open, onOpenChange, emailSubject }: ScheduleDialogProps) => {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>();
  const { addScheduledEvent } = useAppContext();

  const handleSchedule = () => {
    if (!date || !time) {
      toast.error('Please select both date and time');
      return;
    }
    const [hours, minutes] = time.split(':').map(Number);
    const eventDate = new Date(date);
    eventDate.setHours(hours, minutes, 0, 0);
    const endDate = new Date(eventDate);
    endDate.setMinutes(endDate.getMinutes() + 30);

    addScheduledEvent({
      id: `scheduled-${Date.now()}`,
      title: emailSubject || 'Scheduled Email',
      date: eventDate,
      endDate,
      type: 'reminder',
    });

    toast.success(`Scheduled for ${format(date, 'MMM d, yyyy')} at ${time}`);
    setDate(undefined);
    setTime(undefined);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Schedule Email</DialogTitle>
          <DialogDescription>
            {emailSubject ? `Schedule "${emailSubject}"` : 'Pick a date and time to schedule this email.'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className={cn('p-3 pointer-events-auto')}
                  disabled={(d) => d < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Time</label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger className="w-full">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Pick a time" />
                </div>
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSchedule}>Schedule</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleDialog;
