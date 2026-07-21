
"use client";

import Link from "next/link";
import { Home, CalendarDays, Library, Menu, Search, Bell, Clock, LogOut, GraduationCap, Video, HeartHandshake, TrendingUp, Mail, AlertTriangle, ChevronRight, Cake, CreditCard, X } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import React, { useEffect, useState, useRef } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useEvents } from "@/contexts/events-context"; 
import { mockNotifications as initialMockNotifications, type NotificationItem } from "@/lib/placeholder-data";
import { format } from "date-fns"; 
import { es } from "date-fns/locale"; 
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { Avatar, AvatarFallback } from "@/avatar";

const navItemsDesktop = [
  { name: "Home", href: "/dashboard", icon: Home, activePaths: ["/dashboard"] },
  { name: "Nosotros", href: "/dashboard/mapa-clientes", icon: TrendingUp, activePaths: ["/dashboard/mapa-clientes", "/dashboard/objetivos", "/dashboard/objetivos-smart"] },
  { name: "Calendario", href: "/dashboard/calendario", icon: CalendarDays, activePaths: ["/dashboard/calendario"] },
  { name: "Bienestar", href: "/dashboard/bienestar", icon: HeartHandshake, activePaths: ["/dashboard/bienestar", "/dashboard/actividades"] },
  { name: "Actívate", href: "/dashboard/cursos", icon: GraduationCap, activePaths: ["/dashboard/cursos", "/dashboard/cursos/google-workspace", "/dashboard/cursos/google-sheets", "/dashboard/cursos/google-slides", "/dashboard/cursos/google-sites"] },
  { name: "Multimedia", href: "/dashboard/biblioteca-digital", icon: Video, activePaths: ["/dashboard/biblioteca-digital"] },
  { name: "Requerimientos", href: "/dashboard/requerimientos", icon: Mail, activePaths: ["/dashboard/requerimientos"] },
  { name: "Biblioteca", href: "/dashboard/biblioteca", icon: Library, activePaths: ["/dashboard/biblioteca"] },
];

const UserProfileButton = () => {
    const { userEmail, logout } = useAuth();
    const userInitials = userEmail ? userEmail.substring(0, 2).toUpperCase() : 'U';

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full group focus-visible:ring-0 focus-visible:ring-offset-0 transition-transform hover:scale-110 hover:bg-transparent">
                    <Avatar className="h-7 w-7 border border-white/10">
                        <AvatarFallback className="bg-transparent text-white text-[10px] font-light">{userInitials}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mt-2 bg-[#003c71] text-white border-white/10" align="end" forceMount>
                <DropdownMenuLabel className="font-light">
                    <div className="flex flex-col space-y-1">
                        <p className="text-[10px] font-light leading-none text-white/60 uppercase">Mi Cuenta</p>
                        <p className="text-xs leading-none truncate mt-1">
                            {userEmail}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem onClick={logout} className="text-xs focus:bg-white/10 focus:text-white cursor-pointer font-light">
                    <LogOut className="mr-2 h-4 w-4" strokeWidth={1.5} />
                    <span>Cerrar sesión</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const { allEvents } = useEvents();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    const today = new Date();
    const todayStr = format(today, 'yyyy-MM-dd');
    const todaysEvents = allEvents.filter(event => format(event.date, 'yyyy-MM-dd') === todayStr);

    const eventNotifications: NotificationItem[] = todaysEvents.map(event => ({
      id: `event-${event.id}`,
      type: event.category === 'birthday' ? 'update' : 'event',
      title: event.title,
      description: event.description,
      time: event.time ? format(new Date(`1970-01-01T${event.time}`), 'p', { locale: es }) : 'Hoy',
      icon: event.category === 'birthday' ? Cake : CalendarDays,
      iconColor: event.category === 'birthday' ? 'bg-pink-50 text-pink-400' : 'bg-slate-50 text-slate-400',
      href: '/dashboard/calendario'
    }));

    const combinedNotifications = [...eventNotifications, ...initialMockNotifications];
    setNotifications(combinedNotifications);
  }, [allEvents]);

  const handleSearch = () => {
    if (pathname === '/dashboard') {
      const normalizedSearchTerm = searchTerm.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const sectionMap: { [key: string]: string } = {
        'acerca de': 'about-us', 'nosotros': 'about-us', 'mision': 'about-us', 'oferta': 'about-us',
        'vestimenta': 'dress-code', 'viste seguro': 'dress-code', 'vacaciones': 'vacaciones',
        'requerimientos': 'requerimientos', 'cursos': 'cursos', 'menu': 'menu', 'poliza': 'poliza',
        'ejecutivo': 'espacio-ejecutivo', 'actividades': 'actividades', 'conectados': 'conectados',
        'playlist': 'playlist', 'faq': 'faq'
      };
      
      let elementId = Object.keys(sectionMap).find(key => normalizedSearchTerm.includes(key));
      if (elementId) {
        const element = document.getElementById(sectionMap[elementId]);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setIsSearchActive(false);
            setSearchTerm('');
            return;
        }
      }
      toast({ title: "No encontrado", description: `No se encontró la sección "${searchTerm}"`, variant: "destructive" });
    } else {
        toast({ title: "Búsqueda limitada", description: "La búsqueda solo funciona en el Dashboard principal." });
    }
  };

  const toggleSearch = () => {
    if (isSearchActive) {
      setIsSearchActive(false);
      setSearchTerm('');
    } else {
      setIsSearchActive(true);
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  };

  const checkIsActive = (item: { name: string, href: string, activePaths: string[] }) => {
    if (item.name === "Nosotros" || item.name === "Actívate") {
      return item.activePaths.some(p => pathname.startsWith(p));
    }
    return pathname === item.href;
  };

  return (
    <header className="sticky top-0 z-50 w-full flex h-20 items-center justify-center px-4">
      <div className={cn(
        "flex items-center justify-center rounded-full bg-[#003c71] px-3 py-1.5 shadow-2xl border border-white/5 gap-2 md:gap-4 transition-all duration-500",
        isSearchActive ? "w-full max-w-2xl" : "w-auto"
      )}>
        
        {/* Logo Icon */}
        <Link href="/dashboard" className={cn("flex items-center justify-center ml-2 mr-1", isSearchActive && "hidden md:flex")}>
          <div className="relative w-5 h-5">
            <Image
              src="https://spcdn.shortpixel.ai/spio/ret_img,q_cdnize,to_auto,s_webp:avif/banescointernacional.com/wp-content/uploads/2024/11/Isotipo.png"
              alt="Banesco Isotipo"
              layout="fill"
              objectFit="contain"
              className="brightness-0 invert"
            />
          </div>
        </Link>

        {/* Search Mode or Main Navigation */}
        {isSearchActive ? (
          <div className="flex-1 flex items-center animate-in fade-in slide-in-from-left-4 duration-500">
            <Input 
              ref={searchInputRef}
              placeholder="Buscar sección o palabra..." 
              className="flex-1 bg-white/5 border-none text-white text-[11px] font-light h-9 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-white/30"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
        ) : (
          <nav className="flex items-center justify-center gap-1 animate-in fade-in duration-500">
              {navItemsDesktop.map((item) => {
                const isActive = checkIsActive(item);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "relative flex items-center justify-center transition-all duration-300 rounded-full h-9",
                      isActive 
                        ? "bg-white/10 text-white px-4" 
                        : "w-9 text-white/50 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <div className="flex items-center justify-center">
                      <Icon className="h-4 w-4 flex-shrink-0" strokeWidth={1.5} />
                      {isActive && (
                        <span className="text-[11px] font-light whitespace-nowrap ml-2 animate-in fade-in slide-in-from-left-2 duration-300">
                          {item.name}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
          </nav>
        )}

        {/* Separator */}
        <div className={cn("h-6 w-[1px] bg-white/10 mx-1 hidden md:block", isSearchActive && "bg-white/20")}></div>

        {/* Utilities */}
        <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSearch}
              className={cn(
                "rounded-full h-8 w-8 transition-all",
                isSearchActive ? "text-white bg-white/10" : "text-white/50 hover:text-white hover:bg-white/10"
              )}
            >
              {isSearchActive ? <X className="h-4 w-4" strokeWidth={1.5} /> : <Search className="h-4 w-4" strokeWidth={1.5} />}
            </Button>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 relative text-white/50 hover:text-white hover:bg-white/10 transition-all">
                  <Bell className="h-4 w-4" strokeWidth={1.5} />
                  {notifications.length > 0 && (
                    <span className="absolute top-2 right-2 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[340px] p-5 bg-white border-0 shadow-2xl rounded-[24px] text-foreground mt-6" sideOffset={8}>
                <div className="flex items-center justify-between mb-0.5">
                    <h4 className="text-[11px] font-bold text-slate-800 tracking-tight">Notificaciones</h4>
                    <Link href="/dashboard/calendario" className="text-[10px] text-slate-400 flex items-center gap-0.5 hover:text-slate-600 transition-colors font-light">
                      ver todas <ChevronRight className="h-2.5 w-2.5" />
                    </Link>
                </div>
                <p className="text-[10px] text-slate-400 mb-5 font-light">Actividad y actualizaciones</p>

                {/* Construction Alert */}
                <div className="bg-[#f3f6ff] border border-[#e5ebff] rounded-xl p-3 flex gap-2.5 items-center mb-6">
                    <div className="bg-white rounded-full p-1 text-blue-600 shadow-sm flex-shrink-0">
                        <AlertTriangle className="h-3 w-3" />
                    </div>
                    <p className="text-[9px] text-blue-600 font-normal leading-tight">
                        Este módulo de notificaciones se encuentra en construcción.
                    </p>
                </div>

                <ScrollArea className="h-72 -mx-1 px-1">
                   {notifications.length > 0 ? (
                        <div className="space-y-5 pb-2">
                        {notifications.map((notification) => {
                            const Icon = notification.icon;
                            return (
                                <Link key={notification.id} href={notification.href || '#'} className="group flex items-start gap-3.5 cursor-pointer">
                                    <div className={cn("flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center transition-colors shadow-sm", notification.iconColor)}>
                                        <Icon className="h-4 w-4" strokeWidth={1.5} />
                                    </div>
                                    <div className="flex-grow pt-0.5">
                                        <div className="flex items-center justify-between mb-0.5">
                                            <p className="text-[10px] font-bold text-slate-800 leading-none">{notification.title}</p>
                                            <span className="text-[9px] text-slate-300 font-medium uppercase">
                                                {notification.time}
                                            </span>
                                        </div>
                                        <p className="text-[10px] text-slate-400 leading-snug line-clamp-2 pr-2">{notification.description}</p>
                                    </div>
                                    <div className="pt-2">
                                        <ChevronRight className="h-3 w-3 text-slate-200 group-hover:text-slate-400 transition-colors" />
                                    </div>
                                </Link>
                            )
                        })}
                        </div>
                   ) : (
                        <div className="text-center text-[10px] font-light text-slate-400 py-10 italic">
                            No hay novedades por ahora
                        </div>
                   )}
                </ScrollArea>
              </PopoverContent>
            </Popover>
            
            <UserProfileButton />
        </div>

        {/* Mobile Menu Trigger */}
        {!isSearchActive && (
          <div className="md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-white/50 hover:text-white">
                    <Menu className="h-5 w-5" strokeWidth={1.5} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-[#003c71] border-white/10 text-white w-72">
                  <div className="flex flex-col gap-4 mt-8">
                    {navItemsDesktop.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors font-light text-sm"
                      >
                        <item.icon className="h-5 w-5" strokeWidth={1.5} />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
          </div>
        )}
      </div>
    </header>
  );
}
