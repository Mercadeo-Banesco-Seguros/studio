
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from '@/components/ui/button';
import { format, isToday, parseISO, differenceInMinutes, formatDistanceStrict, isPast, intervalToDuration, setMonth as setMonthDateFns, getMonth, addMonths, subDays, addDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from "@/lib/utils";
import { PlusCircle, Trash2, Check, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Pencil, Info, ArrowRight, X, Cake, Users, Award, Star, Briefcase, User as UserIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useEvents, type CalendarEvent } from '@/contexts/events-context'; 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import type { LucideIcon } from 'lucide-react';


const monthsOfYear = Array.from({ length: 12 }, (_, i) => ({
  value: i,
  label: format(new Date(2025, i, 1), 'MMMM', { locale: es }),
}));

// Define colors for categories to be used as capsules in day cells
const EVENT_ITEM_STYLES = {
  PAGO: { bg: 'bg-accent', text: 'text-accent-foreground', label: 'Pago', icon: Check, cardBg: 'bg-blue-50 border-blue-200', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
  ESPECIAL: { bg: 'bg-purple-200', text: 'text-purple-800', label: 'Especial', icon: Star, cardBg: 'bg-purple-50 border-purple-200', iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
  REUNION: { bg: 'bg-rose-200', text: 'text-rose-800', label: 'Reunión', icon: Users, cardBg: 'bg-rose-50 border-rose-200', iconBg: 'bg-rose-100', iconColor: 'text-rose-600' },
  TRABAJO: { bg: 'bg-sky-200', text: 'text-sky-800', label: 'Trabajo', icon: Briefcase, cardBg: 'bg-sky-50 border-sky-200', iconBg: 'bg-sky-100', iconColor: 'text-sky-600' },
  PERSONAL: { bg: 'bg-teal-200', text: 'text-teal-800', label: 'Personal', icon: UserIcon, cardBg: 'bg-teal-50 border-teal-200', iconBg: 'bg-teal-100', iconColor: 'text-teal-600' },
  BIRTHDAY: { bg: 'bg-pink-200', text: 'text-pink-800', label: 'Cumpleaños', icon: Cake, cardBg: 'bg-pink-50 border-pink-200', iconBg: 'bg-pink-100', iconColor: 'text-pink-600' },
  DEFAULT: { bg: 'bg-slate-200', text: 'text-slate-700', label: '', icon: Info, cardBg: 'bg-slate-50 border-slate-200', iconBg: 'bg-slate-100', iconColor: 'text-slate-600' }
};

// Specific styles for certain event titles
const SPECIFIC_EVENT_STYLES: { [title: string]: { bg: string; text: string; label: string } } = {
  "Beneficio de Transporte": { bg: 'bg-[#543db8]', text: 'text-white', label: '' },
  "Beneficios Sociales": { bg: 'bg-[#59D1FF]', text: 'text-white', label: '' },
  "Asignación Especial": { bg: 'bg-[#1a61ab]', text: 'text-white', label: '' },
  "Pago Quincena": { bg: 'bg-accent', text: 'text-accent-foreground', label: '' },
  "Complemento Alimentación": { bg: 'bg-[#8265E6]', text: 'text-white', label: '' },
  "Beneficio Alimentación": { bg: 'bg-[#8265E6]', text: 'text-white', label: '' },
  "Feriado Bancario": { bg: 'bg-slate-700', text: 'text-white', label: '' },
};

// Keywords for categorization - keep these specific to avoid miscategorization
const PAGO_KEYWORDS = ['pago', 'beneficio', 'asignación', 'quincena', 'transporte', 'alimentación', 'sociales', 'utilidades'];
const ESPECIAL_KEYWORDS = ['día de', 'feriado', 'conmemorativo', 'aniversario', 'independencia', 'mujer', 'trabajador', 'resistencia', 'navidad', 'noche buena', 'festivo', 'resultados anuales', 'carnavales', 'santo', 'batalla', 'natalicio', 'año nuevo', 'fin de año'];
const REUNION_KEYWORDS = ['reunión', 'reunion', 'comité', 'comite', 'presentación', 'presentacion', 'cierre', 'trimestral', 'planificación', 'planning', 'sprint', 'review', 'taller', 'charla', 'workshop', 'q1', 'q2', 'q3', 'q4'];


function getEventRenderProps(event: CalendarEvent): { bg: string; text: string; label: string, icon: LucideIcon, cardBg: string, iconBg: string, iconColor: string } {
  const title = event.title.toLowerCase();
  
  // Highest priority: Specific titles for Alimentación
  if (title.includes('alimentación')) {
    const specificStyle = SPECIFIC_EVENT_STYLES[event.title] || { bg: 'bg-[#8265E6]', text: 'text-white', label: '' };
    return { ...EVENT_ITEM_STYLES.PAGO, ...specificStyle };
  }

  const description = event.description.toLowerCase();
  const fullText = `${title} ${description}`;
  
  if (event.category === 'birthday') {
    return EVENT_ITEM_STYLES.BIRTHDAY;
  }

  if (PAGO_KEYWORDS.some(kw => fullText.includes(kw))) {
    return EVENT_ITEM_STYLES.PAGO;
  }
  if (ESPECIAL_KEYWORDS.some(kw => fullText.includes(kw))) {
    return EVENT_ITEM_STYLES.ESPECIAL;
  }
  if (REUNION_KEYWORDS.some(kw => fullText.includes(kw))) {
    return EVENT_ITEM_STYLES.REUNION;
  }

  if (event.isUserEvent && event.category) {
    if (event.category === 'trabajo') return EVENT_ITEM_STYLES.TRABAJO;
    if (event.category === 'personal') return EVENT_ITEM_STYLES.PERSONAL;
  }
  
  // For day cell view, check specific titles for special colors
  if (SPECIFIC_EVENT_STYLES[event.title]) {
     return { ...EVENT_ITEM_STYLES.DEFAULT, ...SPECIFIC_EVENT_STYLES[event.title] };
  }
  
  return EVENT_ITEM_STYLES.DEFAULT;
}


export default function CalendarioPage() {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>();
  const [month, setMonth] = useState<Date>(new Date());
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  
  const { allEvents } = useEvents(); 
  
  const [remindedEventIds, setRemindedEventIds] = useState<Set<string>>(new Set());
  
  const { toast } = useToast();

  const getInitialCountdownString = (eventDate: Date, eventTime?: string): string => {
    if (!eventTime) return '';
    const now = new Date();
    const [hours, minutes] = eventTime.split(':').map(Number);
    const eventDateTime = new Date(eventDate);
    eventDateTime.setHours(hours, minutes, 0, 0);

    if (isPast(eventDateTime)) return ' (Comenzó)';
    
    const duration = intervalToDuration({ start: now, end: eventDateTime });
    const parts = [];
    if (duration.days && duration.days > 0) parts.push(`${duration.days}d`);
    if (duration.hours && duration.hours > 0) parts.push(`${duration.hours}h`);
    if (duration.minutes && duration.minutes > 0) parts.push(`${duration.minutes}m`);
    if (parts.length === 0 && duration.seconds && duration.seconds > 0) parts.push(`${duration.seconds}s`);
    
    return parts.length > 0 ? ` (en ${parts.join(' ')})` : ' (Ahora)';
  };

  useEffect(() => {
    const todayStr = format(new Date(), 'yyyy-MM-dd');
    const todaysEvents = allEvents.filter(event => format(event.date, 'yyyy-MM-dd') === todayStr);
    const newTodaysEvents = todaysEvents.filter(event => !remindedEventIds.has(`today-${event.id}`));

    if (newTodaysEvents.length > 0) {
      newTodaysEvents.forEach(event => {
        const countdown = getInitialCountdownString(event.date, event.time);
        toast({
          title: `Recordatorio Hoy: ${event.title}`,
          description: `${event.description || 'Evento programado.'}${event.time ? ` Hora: ${format(new Date(`1970-01-01T${event.time}`), 'p', { locale: es })}` : ''}${countdown}`,
          duration: 7000,
        });
        setRemindedEventIds(prev => new Set(prev).add(`today-${event.id}`));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allEvents, toast]); 

  useEffect(() => {
    const checkUpcomingEvents = () => {
      const now = new Date();
      allEvents.forEach(event => {
        if (event.time && !remindedEventIds.has(`upcoming-${event.id}`)) {
          const eventDateStr = format(event.date, 'yyyy-MM-dd');
          const todayStr = format(now, 'yyyy-MM-dd');

          if (eventDateStr === todayStr) { 
            const [hours, minutes] = event.time.split(':').map(Number);
            const eventDateTime = new Date(event.date); 
            eventDateTime.setHours(hours, minutes, 0, 0); 

            const diffMins = differenceInMinutes(eventDateTime, now);

            if (diffMins > 0 && diffMins <= 60) { 
              const countdown = formatDistanceStrict(eventDateTime, now, { addSuffix: true, locale: es, unit: 'minute' });
              toast({
                title: `Recordatorio Próximo: ${event.title}`,
                description: `El evento comienza ${countdown}.`,
                duration: 10000,
              });
              setRemindedEventIds(prev => new Set(prev).add(`upcoming-${event.id}`));
            }
          }
        }
      });
    };

    checkUpcomingEvents(); 
    const intervalId = setInterval(checkUpcomingEvents, 60000); 

    return () => clearInterval(intervalId); 
  }, [allEvents, remindedEventIds, toast]); 

  const eventsForSelectedDay = useMemo(() => {
    if (!selectedDay) return [];
    return allEvents
      .filter(event => format(event.date, 'yyyy-MM-dd') === format(selectedDay, 'yyyy-MM-dd'))
      .sort((a,b) => {
          if (a.time && b.time) return a.time.localeCompare(b.time);
          if (a.time) return -1;
          if (b.time) return 1;
          return 0;
      });
  }, [selectedDay, allEvents]);


  const handleDayClick = (day: Date) => {
    setSelectedDay(day);
    const eventsOnDay = allEvents.filter(event => format(event.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'));
    if (eventsOnDay.length > 0) {
      setIsDetailModalOpen(true);
    }
  };


  const renderDayEventsContent = (dayCellDate: Date): React.ReactNode => {
    const eventsOnDay = allEvents
      .filter(event => format(event.date, 'yyyy-MM-dd') === format(dayCellDate, 'yyyy-MM-dd'))
      .sort((a,b) => {
          if (a.time && b.time) return a.time.localeCompare(b.time);
          if (a.time) return -1;
          if (b.time) return 1;
          return 0;
      });
  
    const isSelected = selectedDay && format(selectedDay, 'yyyy-MM-dd') === format(dayCellDate, 'yyyy-MM-dd');

    return (
      <div className="flex flex-col h-full w-full">
        <div className="flex items-start justify-between">
          <div className={cn(
              "text-2xl font-bold flex items-center gap-1",
              format(dayCellDate, 'yyyy-MM') !== format(month, 'yyyy-MM') && "text-muted-foreground/30",
              isSelected && "text-primary-foreground"
            )}>
            {format(dayCellDate, "dd")}
            {isToday(dayCellDate) && !isSelected && <Badge variant="secondary" className="text-xs">HOY</Badge>}
            {isSelected && <Check className="h-4 w-4 text-primary-foreground" />}
          </div>
        </div>
        <div className="flex-grow space-y-1 text-xs leading-tight mt-2 overflow-y-auto">
          {eventsOnDay.map(event => {
            if (event.isUserEvent) {
                return (
                    <p key={event.id} className={cn("truncate", isSelected && "text-primary-foreground/90")} title={event.title}>
                        {event.title}
                    </p>
                )
            }
            const renderProps = getEventRenderProps(event);
            return (
                 <div 
                    key={event.id} 
                    className={cn(
                        "px-1.5 py-0.5 rounded-sm text-[10px] leading-tight cursor-pointer flex items-center gap-1",
                        renderProps.bg,
                        renderProps.text,
                    )}
                    >
                    {event.category === 'birthday' && <Cake className="h-3 w-3 flex-shrink-0" />}
                    <p className={cn("font-medium truncate", renderProps.text)}>{event.title}</p>
                </div>
            )
          })}
        </div>
      </div>
    );
  };
  
  return (
    <div className="container mx-auto px-4 flex flex-col min-h-[calc(100vh-10rem)]">
        <div className="flex flex-col items-center w-full flex-grow">
            <div className="w-full flex flex-col flex-grow"> 
                <div className="flex justify-between items-center mb-8 px-1">
                    <h2 className="text-2xl font-bold text-foreground capitalize">
                        {format(month, "MMMM yyyy", { locale: es })}
                    </h2>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 text-muted-foreground transition-transform hover:scale-110 active:scale-95 hover:bg-transparent"
                            onClick={() => setMonth(addMonths(month, -1))}
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <div className="flex items-center justify-center h-12 w-24 rounded-2xl bg-foreground text-background shadow-lg">
                            <span className="font-bold text-lg capitalize">
                                {format(month, 'MMM', { locale: es })}
                            </span>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 text-muted-foreground transition-transform hover:scale-110 active:scale-95 hover:bg-transparent"
                            onClick={() => setMonth(addMonths(month, 1))}
                        >
                            <ChevronRight className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
                <Calendar
                  mode="single"
                  selected={selectedDay}
                  onSelect={setSelectedDay}
                  month={month}
                  onMonthChange={setMonth}
                  onDayClick={handleDayClick}
                  className="w-full flex-grow"
                  locale={es}
                  renderDayContent={renderDayEventsContent}
                />
            </div>
        </div>

        <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-foreground capitalize">
                        {selectedDay ? format(selectedDay, "eeee, d 'de' MMMM", { locale: es }) : 'Eventos'}
                    </DialogTitle>
                </DialogHeader>
                <div className="mt-4 max-h-[60vh] overflow-y-auto pr-2 space-y-3">
                    {eventsForSelectedDay.length > 0 ? (
                        eventsForSelectedDay.map(event => {
                             const renderProps = getEventRenderProps(event);
                             const Icon = renderProps.icon;
                             return(
                                <div key={event.id} className={cn("flex items-start gap-4 p-4 rounded-lg border", renderProps.cardBg)}>
                                    <div className={cn("flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center", renderProps.iconBg)}>
                                        <Icon className={cn("h-4 w-4", renderProps.iconColor)} />
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-semibold text-sm text-foreground">{event.title}</p>
                                        <p className="text-xs text-muted-foreground">{event.description}</p>
                                        {event.time && (
                                            <p className="text-xs text-primary font-medium flex items-center gap-1 mt-1">
                                                <Clock className="h-3 w-3"/>
                                                {format(new Date(`1970-01-01T${event.time}`), 'p', { locale: es })}
                                            </p>
                                        )}
                                    </div>
                                </div>
                             )
                        })
                    ) : (
                        <p className="text-muted-foreground text-center py-8">No hay eventos para este día.</p>
                    )}
                </div>
                 <DialogFooter className="mt-6">
                    <Button variant="outline" onClick={() => setIsDetailModalOpen(false)}>Cerrar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  );
}
