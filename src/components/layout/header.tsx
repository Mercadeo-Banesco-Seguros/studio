
"use client";

import Link from "next/link";
import { Home, CalendarDays, HeartHandshake, FileText, BookOpen, Menu, Search, Bell, Clock, Target, User, Archive, LogOut, GraduationCap } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import React, { useEffect, useState, useRef } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useEvents, type CalendarEvent } from "@/contexts/events-context"; 
import { mockNotifications as initialMockNotifications, type NotificationItem } from "@/lib/placeholder-data";
import { format, isToday, intervalToDuration, isPast } from "date-fns"; 
import { es } from "date-fns/locale"; 
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navItemsDesktop = [
  { name: "General", href: "/dashboard", icon: Home, activePaths: ["/dashboard"] },
  { name: "Nosotros", href: "/dashboard/mapa-clientes", icon: Target, activePaths: ["/dashboard/mapa-clientes", "/dashboard/objetivos", "/dashboard/objetivos-smart"] },
  { name: "Calendario", href: "/dashboard/calendario", icon: CalendarDays, activePaths: ["/dashboard/calendario"] },
  { name: "Bienestar", href: "/dashboard/bienestar", icon: HeartHandshake, activePaths: ["/dashboard/bienestar", "/dashboard/actividades"] },
  { name: "Actívate", href: "/dashboard/cursos", icon: GraduationCap, activePaths: ["/dashboard/cursos"] },
  { name: "Requerimientos", href: "/dashboard/requerimientos", icon: FileText, activePaths: ["/dashboard/requerimientos"] },
  { name: "Biblioteca", href: "/dashboard/biblioteca", icon: BookOpen, activePaths: ["/dashboard/biblioteca"] },
];

const UserProfileButton = () => {
    const { userEmail, logout } = useAuth();
    const userInitials = userEmail ? userEmail.substring(0, 2).toUpperCase() : 'U';

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full group focus-visible:ring-0 focus-visible:ring-offset-0 transition-transform hover:scale-110 hover:bg-transparent">
                    <Avatar className="h-9 w-9 transition-transform group-hover:scale-110 group-data-[state=open]:scale-110">
                        <AvatarFallback className="bg-primary text-primary-foreground">{userInitials}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-xs font-medium leading-none text-muted-foreground">Mi Cuenta</p>
                        <p className="text-xs leading-none text-foreground truncate">
                            {userEmail}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-xs">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar sesión</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};


export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isSearchPopoverOpen, setIsSearchPopoverOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialMockNotifications);
  const { allEvents } = useEvents();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  
  const navRef = useRef<HTMLDivElement>(null);
  
  const navItemsMobile = [
    ...navItemsDesktop,
    { name: "Recordatorios", href: "#", icon: Bell, isReminders: true, activePaths: [] }, 
    { name: "Buscar", href: "#", icon: Search, isSearch: true, activePaths: [] }, 
  ];
  
  useEffect(() => {
    const today = new Date();
    const todayStr = format(today, 'yyyy-MM-dd');

    const todaysEvents = allEvents.filter(event => format(event.date, 'yyyy-MM-dd') === todayStr);

    const eventNotifications: NotificationItem[] = todaysEvents.map(event => ({
      id: `event-${event.id}`,
      type: 'event',
      title: event.title,
      description: event.description,
      time: event.time ? format(new Date(`1970-01-01T${event.time}`), 'p', { locale: es }) : 'Todo el día',
      icon: CalendarDays,
      iconColor: 'bg-rose-100 text-rose-500'
    }));

    const combinedNotifications = [...initialMockNotifications];
    eventNotifications.forEach(en => {
      if (!combinedNotifications.some(cn => cn.id === en.id)) {
        combinedNotifications.push(en);
      }
    });
    
    setNotifications(combinedNotifications);
  }, [allEvents]);

  const handleSearch = () => {
    if (pathname === '/dashboard') {
      const normalizedSearchTerm = searchTerm.toLowerCase().trim();
      const element = document.getElementById(normalizedSearchTerm);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsSearchPopoverOpen(false);
        setSearchTerm('');
      } else {
        toast({
            title: "No se encontró la sección",
            description: `No se pudo encontrar una sección llamada "${searchTerm}" en esta página.`,
            variant: "destructive"
        })
      }
    } else {
        toast({
            title: "Búsqueda no disponible",
            description: "La búsqueda por sección solo está disponible en la página principal.",
        })
    }
  };

  const checkIsActive = (item: { href: string, activePaths: string[] }) => {
    if (item.href === '/dashboard' && pathname === '/dashboard') {
        return true;
    }
    return item.href !== '/dashboard' && item.activePaths.some(p => pathname.startsWith(p));
  };

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };
  
  const handleArchiveAll = () => {
    setNotifications([]);
  };

  return (
    <header className="sticky top-0 z-50 w-full flex h-24 items-center justify-center px-4">
      <div className="flex items-center justify-center rounded-full bg-card p-2 px-4 shadow-lg border gap-2">
        <Link href="/dashboard" className="flex items-center justify-center">
          <Image
            src="https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/BANESCO%20LOGO%20A%20COLOR.png?raw=true"
            alt="Banesco Seguros Logo"
            width={40}
            height={5}
          />
        </Link>
        <nav className="flex items-center justify-center gap-1" ref={navRef}>
            {navItemsDesktop.map((item) => {
              const isActive = checkIsActive(item);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  data-active={isActive}
                  className={cn(
                    "relative flex items-center justify-center z-10 transition-all duration-300 rounded-full h-10",
                    isActive 
                      ? "bg-primary text-primary-foreground px-6" 
                      : "w-10 text-muted-foreground",
                    !isActive && "hover:text-foreground"
                  )}
                >
                  <div className="flex items-center justify-center gap-2">
                    <item.icon className={cn("h-5 w-5 flex-shrink-0 transition-all duration-300")} />
                    <span className={cn(
                        "text-[11px] font-light whitespace-nowrap transition-all duration-300",
                        isActive ? "w-auto opacity-100 ml-2" : "w-0 opacity-0 ml-0"
                    )}>
                      {item.name}
                    </span>
                  </div>
                </Link>
              );
            })}
        </nav>
        <div className="flex items-center gap-1">
            <Popover open={isSearchPopoverOpen} onOpenChange={setIsSearchPopoverOpen}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 transition-transform hover:scale-110 hover:bg-transparent">
                  <Search className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Búsqueda Rápida</h4>
                    <p className="text-sm text-muted-foreground">
                      Busca secciones en la página principal (ej. "cursos", "faq").
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input 
                      placeholder="Escribe aquí..." 
                      className="flex-1"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <Button onClick={handleSearch}>Buscar</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 relative transition-transform hover:scale-110 hover:bg-transparent">
                  <Bell className="h-5 w-5" />
                  {notifications.length > 0 && (
                    <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-96 p-0">
                <div className="flex items-center justify-between p-4 border-b">
                    <h4 className="font-semibold">Notificaciones</h4>
                    <Button variant="ghost" size="sm" onClick={handleArchiveAll} disabled={notifications.length === 0}>
                        <Archive className="mr-2 h-4 w-4"/> Archivar todo
                    </Button>
                </div>
                <ScrollArea className="h-96">
                   {notifications.length > 0 ? (
                        <div className="p-2">
                        {notifications.map((notification) => {
                            const Icon = notification.icon;
                            return (
                                <div key={notification.id} className="flex items-start p-3 rounded-lg hover:bg-muted">
                                <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full", notification.iconColor)}>
                                    <Icon className="h-4 w-4" />
                                </div>
                                <div className="ml-4 flex-1">
                                    <p className="text-sm font-medium">{notification.title}</p>
                                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                                    <p className="text-xs text-muted-foreground mt-1 flex items-center"><Clock className="mr-1.5 h-3 w-3"/>{notification.time}</p>
                                </div>
                                </div>
                            )
                        })}
                        </div>
                   ) : (
                        <div className="text-center text-sm text-muted-foreground py-16">
                            No tienes notificaciones nuevas.
                        </div>
                   )}
                </ScrollArea>
              </PopoverContent>
            </Popover>
            
            <UserProfileButton />
        </div>
      </div>

      {/* Mobile Header */}
      <div className="flex md:hidden w-full items-center justify-between">
        <Link href="/dashboard" className="flex items-center space-x-2 flex-shrink-0">
          <Image
            src="https://spcdn.shortpixel.ai/spio/ret_img,q_cdnize,to_auto,s_webp:avif/banescointernacional.com/wp-content/uploads/2024/11/Isotipo.png"
            alt="Banesco Seguros Logo"
            width={32}
            height={32}
            className="h-8 w-auto"
            priority
          />
        </Link>
        <div className="flex items-center gap-2">
          <UserProfileButton />
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-8">
                {navItemsMobile.map((item) => {
                   const isActive = checkIsActive(item);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center space-x-2 p-2 rounded-md",
                        isActive && item.href !== "#"
                          ? "bg-accent text-accent-foreground font-semibold"
                          : "hover:bg-accent hover:text-accent-foreground text-foreground"
                      )}
                      onClick={handleMobileLinkClick}
                    >
                      <item.icon className={cn(
                        "h-5 w-5",
                        isActive && item.href !== "#"
                          ? "text-accent-foreground"
                          : "text-muted-foreground"
                       )} />
                      <span>{item.name}</span>
                      {item.icon === Bell && notifications.length > 0 && (
                         <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                           {notifications.length}
                         </span>
                      )}
                    </Link>
                  );
                  })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}







    

    

    