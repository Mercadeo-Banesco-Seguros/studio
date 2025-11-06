
"use client";

import Link from "next/link";
import { Home, CalendarDays, HeartHandshake, FileText, BookOpen, Menu, Search, Bell, Clock, Target, User, Archive, LogOut, GraduationCap } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import React, { useEffect, useState } from "react";
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
                <Button variant="ghost" className="relative h-10 w-10 rounded-full group focus-visible:ring-0 focus-visible:ring-offset-0">
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

  const activeItemIndex = navItemsDesktop.findIndex(checkIsActive);
  const activeItem = navItemsDesktop[activeItemIndex];


  return (
    <header className="sticky top-0 z-50 w-full flex h-24 items-center justify-center px-4">
      <div className="flex items-center gap-4">
        <nav className="hidden md:flex items-center justify-center">
          <div 
              className="relative flex items-center gap-1 rounded-full bg-card p-2 shadow-lg border"
          >
            {navItemsDesktop.map((item, index) => {
              const isActive = checkIsActive(item);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative flex items-center justify-center z-10 transition-colors duration-300 rounded-full",
                    isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                    isActive ? "h-10 px-6" : "h-10 w-10"
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <span className={cn(
                      "text-sm font-medium whitespace-nowrap transition-all duration-300",
                      isActive ? "ml-2 opacity-100" : "opacity-0 w-0 ml-0"
                  )}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
            
            {activeItem && (
               <div
                className="absolute top-2 h-10 rounded-full bg-primary transition-all duration-500 ease-in-out"
                style={{
                  left: `${activeItemIndex * 44 + 8}px`, // 44px = w-10 (40px) + gap-1 (4px)
                  width: activeItem.name === 'Requerimientos' ? '150px' : '130px', 
                }}
              />
            )}

          </div>
        </nav>
        <div className="hidden md:block">
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
