
import { Users, Megaphone, FolderKanban, Shield, BarChart2, Briefcase, FileText, Bot, BookOpen, Scale, FileSignature, HardHat, Plane, Cpu, PiggyBank, CreditCard, Landmark, CalendarClock, MessageCircleQuestion, Bell, Utensils, Star, Video, Presentation, Image as ImageIcon, Code, Music, AlertTriangle, CheckCircle, CalendarDays, MessageSquare as MessageSquareIcon, Music2, Home, User, Cog, Lightbulb, Handshake, Award, FileBarChart } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  duration: string;
  dataAiHint?: string;
  hasDetailPage?: boolean;
}

export interface Activity {
  id: string;
  title: string;
  date: string; // This can be a generic date if the specific schedule is in the description
  location: string;
  imageUrl: string;
  description: string;
  dataAiHint?: string;
  isRecommended?: boolean; // Added for recommended activities
}

export interface DepartmentRequest {
  title: string;
  link?: string; // Optional link for specific requests
  type: 'request' | 'info'; // Differentiate between requests and informational items
  icon?: React.ElementType; // Lucide icon for the specific request
}


export interface Department {
  id: string;
  name: string;
  description: string;
  requests?: DepartmentRequest[];
  icon?: React.ElementType; // Lucide icon
  imageUrl?: string;
  dataAiHint?: string;
  directLink?: string; 
  category: 'Capital Humano' | 'Comercial' | 'Legal' | 'Seguridad' | 'Proyectos' | 'Otros' | 'Actuarial';
}

export interface DocumentResource {
  id: string;
  title: string;
  category: 'Visuales' | 'Herramientas' | 'Presentaciones' | 'Manuales' | 'Documentos' | 'Videos' | 'Destacados' | 'Música';
  area: 'Comercial' | 'Suscripción' | 'Legal' | 'Mercadeo' | 'Capital Humano' | 'Procesos' | 'Actuarial' | 'General' | 'Finanzas' | 'Tecnologia';
  businessLine?: 'Automóvil' | 'Personas' | 'Patrimoniales' | 'Salud';
  description: string;
  imageUrl: string;
  dataAiHint: string;
  isFeatured: boolean;
  linkUrl?: string; // For playlists
}


export interface DressCodeItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  dataAiHint?: string;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: 'Tecnología' | 'Capital Humano' | 'Finanzas' | 'Procesos' | 'Comercial' | 'Suscripción' | 'Operaciones' | 'Actuarial' | 'Líderes';
  imageUrl: string;
  dataAiHint: string;
}

export interface PlaylistItem {
  id: string;
  title: string;
  description: string;
  albumArtUrl: string;
  linkUrl: string;
  dataAiHint: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Soporte' | 'Otros';
}

export interface NotificationItem {
  id: string;
  type: 'message' | 'event' | 'task' | 'alert' | 'update';
  title: string;
  description: string;
  time: string;
  icon: LucideIcon;
  iconColor: string;
}

export interface CustomerFeedback {
  id: string;
  name: string;
  avatar: string; // Initials
  comment: string;
  nps: number; // 1-10 score
}

// Data for Executive-Specific Views
export interface MenuItem {
  id: string;
  day: string;
  name: string;
  description: string;
  imageUrl: string;
  price: string;
  type: 'Clásico' | 'Dieta' | 'Ejecutivo';
  dataAiHint?: string;
}


export const specialRequestAreas = [
    { id: 'Finanzas', name: 'Finanzas', email: 'gcia_nacional_finanzas_ve@banescoseguros.com' },
    { id: 'Capital Humano', name: 'Capital Humano', email: 'capital_humano_ve@banescoseguros.com' },
    { id: 'Mercadeo', name: 'Mercadeo', email: 'comunicaciones@banescoseguros.com' },
    { id: 'Procesos', name: 'Procesos', email: 'procesos@banescoseguros.com' },
    { id: 'Actuarial', name: 'Actuarial', email: 'gerencia_actuarial_ve@banescoseguros.com' },
    { id: 'Legal', name: 'Legal', email: 'bsv_consultoria_juridica@banescoseguros.com' },
];

export const mockCourses: Course[] = [
  {
    id: "google-sites",
    title: "Google Sites",
    description: "Aprende a crear un Site y los trucos para pasar de Nivel Básico a Avanzado en pocas horas.",
    imageUrl: "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxwcmVzZW50YXRpb258ZW58MHx8fHwxNzU0MzM2OTA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "web design",
    category: "Google Workspace",
    duration: "Auto-gestionado",
    hasDetailPage: false,
  },
  {
    id: "google-sheets",
    title: "Sheets",
    description: "Aprender a aprovechar Sheets para optimizar tu tiempo y aprender lo más avanzado del aplicativo en pocas horas.",
    imageUrl: "https://images.unsplash.com/photo-1658203897339-0b8c64a42fba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxleGNlbHxlbnwwfHx8fDE3NTQzMzc0NTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "spreadsheet data",
    category: "Google Workspace",
    duration: "Auto-gestionado",
    hasDetailPage: false,
  },
  {
    id: "google-slides",
    title: "Google Slides",
    description: "Crea presentaciones innovadoras, rápido y con tips para alcanzar los objetivos en el menor tiempo posible.",
    imageUrl: "https://images.unsplash.com/photo-1658203897406-9ef9e2af686c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxN3x8ZXhjZWx8ZW58MHx8fHwxNzU0MzM3NDUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "presentation slides",
    category: "Google Workspace",
    duration: "Auto-gestionado",
    hasDetailPage: false,
  },
  {
    id: "google-forms",
    title: "Google Forms",
    description: "Aprovecha los formularios para levantar información y lograr enlaces con otros aplicativos.",
    imageUrl: "https://images.unsplash.com/photo-1516383274235-5f42d6c6426d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxM3x8c3VydmV5fGVufDB8fHx8MTc1NDMzODkyNHww&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "survey form",
    category: "Google Workspace",
    duration: "Auto-gestionado",
    hasDetailPage: false,
  },
  {
    id: "pensamiento-estrategico",
    title: "Pensamiento Estratégico",
    description: "Asigna prioridades en el destino de los recursos, donde mejora el desempeño de la organización, así permitiendo a la empresa enfrentarse a los principales problemas de la organización, al cambio en el entorno y ver las oportunidades y detectar las amenazas.",
    imageUrl: "https://images.unsplash.com/photo-1730804518415-75297e8d2a41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8cHV6emxlfGVufDB8fHx8fDE3NTQzMzk2ODl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "strategy plan",
    category: "Desarrollo",
    duration: "Auto-gestionado",
    hasDetailPage: true,
  },
  {
    id: "balanced-scorecard",
    title: "Balanced Scorecard",
    description: "Es herramienta de planeación estratégica que permite a la empresa crear y controlar sus propios indicadores de gestión relacionados dentro de cuatro perspectiva: Financiera, Procesos Internos, Cliente y Formación y Crecimiento",
    imageUrl: "https://images.unsplash.com/photo-1556155092-8707de31f9c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxtZXRyaWNzfGVufDB8fHx8fDE3NTQzNDAzMjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "balance chart",
    category: "Desarrollo",
    duration: "Auto-gestionado",
    hasDetailPage: true,
  },
  {
    id: "como-hacer-feedback",
    title: "¿Cómo hacer Feedback?",
    description: "Es importante tomar en consideración este proceso comunicativo, ya que es toda respuesta o reacción que el receptor envía al emisor de un mensaje. Si las partes no se entienden el mensaje no es claro; Aquí te dejamos algunas recomendaciones.",
    imageUrl: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjb211bmljYXRpb258ZW58MHx8fHwxNzU0MzQxNjIzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "feedback conversation",
    category: "Desarrollo",
    duration: "Auto-gestionado",
    hasDetailPage: true,
  },
  {
    id: "presentaciones-efectivas",
    title: "Presentaciones Efectivas",
    description: "En este curso obtendrás las habilidades para el diseño de presentaciones corporativas que permitirán alinear la comunicación dentro de la organización adaptándola a las necesidades de la audiencia a la que se dirija.",
    imageUrl: "https://images.unsplash.com/photo-1541872705-1f73c6400ec9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxM3x8c3BlZWNofGVufDB8fHx8MTc1NDM0MjE4M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "conference presentation",
    category: "Desarrollo",
    duration: "Auto-gestionado",
    hasDetailPage: true,
  },
  {
    id: "plan-de-desarrollo",
    title: "Plan de Desarrollo",
    description: "Aquí podrás  obtener algunos tips para el desarrollo de tu eficiencia, agilidad y el balance entre el trabajo y las exigencias del puesto.",
    imageUrl: "https://images.unsplash.com/photo-1730382624709-81e52dd294d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxwcm9ncmVzc3xlbnwwfHx8fDE3NTQzNDMyNDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "growth plan",
    category: "Desarrollo",
    duration: "Auto-gestionado",
    hasDetailPage: true,
  },
  {
    id: "jerarquizacion-de-portafolio",
    title: "Jerarquización de Portafolio",
    description: "Las Direcciones Corporativas de Finanzas y Estrategia te invitan a formar parte de esta formación virtual que pretende profundizar en la metodología para la jerarquización de iniciativas, con énfasis en la aplicación de la herramienta “Matriz Costo Beneficio”.",
    imageUrl: "https://images.unsplash.com/photo-1562240020-ce31ccb0fa7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxET0NVTUVOVFN8ZW58MHx8fHwxNzU0NDEwNjg0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "portfolio management",
    category: "Desarrollo",
    duration: "Auto-gestionado",
    hasDetailPage: true,
  },
  {
    id: "gestion-de-proveedores",
    title: "Gestión de Proveedores",
    description: "Aquí podrás  obtener información de herramientas y mejores prácticas para ser efectivos en la búsqueda, selección, evaluación y gestión de proveedores, mediante la planificación asociada a la negociación, que finalmente servirá como retroalimentación constante para el desarrollo tanto de la organización como de los proveedores.",
    imageUrl: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxERUxJVkVSWXxlbnwwfHx8fDE3NTc3MDMxMzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "supplier management",
    category: "Desarrollo",
    duration: "Auto-gestionado",
    hasDetailPage: true,
  },
  {
    id: "reuniones-efectivas",
    title: "Reuniones Efectivas",
    description: "Aquí podrás  obtener tips de como tener una reunión efectiva, donde es importante considerar que una gran parte de la eficacia y productividad del equipo de trabajo se obtiene a partir de la efectividad con que se desarrollan estas reuniones.",
    imageUrl: "https://images.unsplash.com/photo-1553877522-43269d4ea984?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxyZXVuaSVDMyVCM258ZW58MHx8fHwxNzU0NDIwMzY0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "effective meeting",
    category: "Desarrollo",
    duration: "Auto-gestionado",
    hasDetailPage: true,
  },
  {
    id: "gestion-comercial",
    title: "Gestión Comercial",
    description: "Aquí podrás  obtener información de cuáles son nuestros productos, cómo manejar el Site de Sistemática, entre otros.",
    imageUrl: "https://images.unsplash.com/photo-1634117622592-114e3024ff27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxncmFmaWNvfGVufDB8fHx8fDE3NTQ0MjEzMDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "sales management",
    category: "Desarrollo",
    duration: "Auto-gestionado",
    hasDetailPage: true,
  },
  {
    id: "otras-opciones-desarrollo",
    title: "Otras opciones para tu desarrollo",
    description: "Aquí podrás encontrar el link de otras páginas que te ayudarán a tu crecimiento profesional.",
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxlLWxlYXJuaW5nfGVufDB8fHx8fDE3NTQ0MTM4OTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "e-learning development",
    category: "Desarrollo",
    duration: "Auto-gestionado",
    hasDetailPage: true,
  },
];


export const mockActivities: Activity[] = [
  {
    id: "A001",
    title: "Yoga",
    date: "2025-07-01",
    location: "Triadas - Ciudad Banesco",
    imageUrl: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHx5b2dhfGVufDB8fHx8MTc1MDk0NDg2M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "yoga fitness",
    description: "¡Conecta tu cuerpo y mente!\nAcompáñanos en la clase de yoga, conformada por una serie de ejercicios físicos y de respiración diseñados para disminuir el estrés y las dolencias corporales, con el propósito de mejorar la salud, tanto física como mental.\nPara asistir a las clases solo necesitas:\n- Un mat o esterilla de yoga.\n- Ropa deportiva y cómoda, preferiblemente licras o monos largos y camisas cómodas.\n- Una botella de agua para tu hidratación.\n\nDónde y cuándo son las clases:\nLunes y miércoles, 5:00 P.M."
  },
  {
    id: "A002",
    title: "Ejercicios funcionales",
    date: "2025-07-01",
    location: "Terraza - Ciudad Banesco",
    imageUrl: "https://images.unsplash.com/photo-1591291621164-2c6367723315?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxleGNlcmNpc2V8ZW58MHx8fHwxNzUwOTQ0OTE1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "functional training",
    description: "¡Mejora tu rendimiento físico y cuida tu salud!\n\nTe invitamos a participar en la actividad de entrenamiento funcional y en circuito, la cual ayuda a mejorar las capacidades físicas como  fuerza, resistencia, velocidad, coordinación y flexibilidad. Se puede realizar con o sin implementos.\nPara asistir a las clases solo necesitas:\n- Ropa deportiva y cómoda, preferiblemente licras o monos largos y camisas cómodas.\n- Una botella de agua para tu hidratación.\n\nDónde y cuándo son las clases:\nLunes y miércoles, 5:00 P.M.",
    isRecommended: true,
  },
  {
    id: "A003",
    title: "Clases de cuatro",
    date: "2025-07-01",
    location: "Triadas - Ciudad Banesco",
    imageUrl: "https://images.unsplash.com/photo-1707699164633-0e584b2da329?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxVS0VMRUxFfGVufDB8fHx8MTc1ODU2NDUxNHww&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "music lessons",
    description: "Si tienes talento para tocar un instrumento musical o quieres aprender, es tú momento.\nÚnete al grupo, no necesitas experiencia previa para formar parte de la actividad.\nPara asistir a las clases solo necesitas:\n- Una botella de agua para tu hidratación.\n\nDónde y cuándo son las clases:\nLunes o jueves, 5:00 P.M."
  },
  {
    id: "A004",
    title: "Clases de bailoterapia",
    date: "2025-07-01",
    location: "Terraza - Ciudad Banesco",
    imageUrl: "https://images.unsplash.com/photo-1495791185843-c73f2269f669?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxNHx8ZGFuY2V8ZW58MHx8fHwxNzUwOTQ1MTc0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "dance therapy",
    description: "Sorpréndete con la variedad de estilos y ritmos en nuestra clase de bailoterapia y disfruta de los múltiples beneficios de esta técnica:\n- Fortalece el corazón y la circulación de la sangre.\n- Reduce el estrés, la ansiedad y la tristeza.\n- Combate los dolores musculares.\nPara asistir a las clases solo necesitas:\n- Ropa deportiva y cómoda, preferiblemente licras o monos largos y camisas cómodas.\n- Una botella de agua para tu hidratación.\nDónde y cuándo son las clases:\nJueves, 5:00 P.M."
  },
  {
    id: "A005",
    title: "Cross combat",
    date: "2025-07-01",
    location: "Terraza - Ciudad Banesco",
    imageUrl: "https://images.unsplash.com/photo-1590556409324-aa1d726e5c3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyMHx8Qk9YSU5HfGVufDB8fHx8MTc1MDk1NDMyOXww&ixlibrb-4.1.0&q=80&w=1080",
    dataAiHint: "combat fitness",
    description: "Te invitamos a esta emocionante actividad física musicalizada, donde de forma equilibrada y en conjunto se estimulan capacidades, como la aérobica o cardiovascular, la resistencia muscular, flexibilidad y otra habilidades y destrezas de ejercicios tomados del Boxeo, las Artes marciales y la Danza aeróbica o gimnasia aeróbica.\n\nDónde y cuándo son las clases:\nMartes, 5:00 P.M."
  },
  {
    id: "A006",
    title: "Teatro",
    date: "2025-07-01",
    location: "Tríadas - Ciudad Banesco",
    imageUrl: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxBQ1RPUnxlbnwwfHx8fDE3NTA5NTkwODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "theater workshop",
    description: "Te invitamos a esta maravillosa actividad, en la que desarrollarás competencias para romper el hielo, desenvolverte en diversos contextos con tranquilidad, mejorarás la dicción y oratoria para comunicarte asertivamente.  A partir del 12 de marzo.\n\nDónde y cuándo son las clases:\nMartes y Jueves, 5:00 P.M."
  },
];

export const mockDepartments: Department[] = [
  {
    id: "capital-humano",
    name: "Capital Humano",
    description: "Pensando en tu comodidad y bienestar, hemos creado este portal para que realices tus gestiones de forma simple, directa y accesible.",
    category: "Capital Humano",
    icon: Users,
    requests: [
      { title: "Solicitud de Prestaciones Sociales", type: 'request', icon: PiggyBank },
      { title: "Solicitud de Carta de Trabajo", type: 'request', icon: FileText },
      { title: "Solicitud de Carnet y Tarjeta Todoticket", type: 'request', icon: CreditCard },
      { title: "Solicitud de IVSS y FAOV", type: 'request', icon: Landmark },
      { title: "Solicitud de Vacaciones y Permisos", type: 'request', icon: Plane },
      { title: "Inquietudes o Sugerencias", type: 'request', icon: MessageCircleQuestion },
      { title: "Actividades de Clima e Integración", type: 'info', icon: Bell },
      { title: "Postúlate", type: 'request', icon: Briefcase },
      { title: "Encuesta de Satisfacción", type: 'request', icon: Users },
      { title: "Horario del Comedor", type: 'info', icon: Utensils },
    ]
  },
  {
    id: "vacaciones",
    name: "Gestión de Vacaciones",
    description: "Planifica y solicita tus días libres y consulta tu saldo disponible.",
    category: "Capital Humano",
    icon: Plane,
    directLink: "/dashboard/vacaciones"
  },
  {
    id: "mercadeo",
    name: "Mercadeo",
    description: "Canaliza comunicados masivos, SMS, mailings y gestiona redes sociales.",
    category: "Comercial",
    icon: Megaphone,
  },
  {
    id: "pmo",
    name: "Gestión de Proyectos",
    description: "Gestiona y prioriza los proyectos tecnológicos de la organización.",
    category: "Proyectos",
    icon: FolderKanban,
  },
  {
    id: "seguridad-informacion",
    name: "Seguridad de la Información",
    description: "Portal de peticiones y gestión de la seguridad de la información.",
    category: "Seguridad",
    icon: Shield,
  },
   {
    id: "ti",
    name: "Tecnología de la Información",
    description: "Soporte técnico, gestión de equipos y software.",
    category: "Seguridad",
    icon: Cpu,
  },
  {
    id: "control",
    name: "Control",
    description: "Procesos de control y auditoría interna.",
    category: "Seguridad",
    icon: BarChart2,
  },
  {
    id: "procura",
    name: "Procura",
    description: "Gestión de compras y proveedores.",
    category: "Legal",
    icon: Briefcase,
  },
  {
    id: "inteligencia-comercial",
    name: "Inteligencia Comercial",
    description: "Análisis de datos y estrategias para el desarrollo comercial.",
    category: "Comercial",
    icon: FileText,
  },
  {
    id: "biblioteca-digital",
    name: "Biblioteca Digital",
    description: "Acceso a documentos y recursos digitales de la empresa.",
    directLink: "/dashboard/biblioteca",
    category: "Otros",
    icon: BookOpen,
  },
  {
    id: "consultoria-juridica",
    name: "Consultoría Jurídica",
    description: "Asesoramiento y gestión de asuntos legales.",
    category: "Legal",
    icon: Scale,
  },
  {
    id: "sistematica-comercial",
    name: "Sistemática Comercial",
    description: "Recursos y herramientas para el equipo comercial.",
    category: "Comercial",
    icon: HardHat,
  },
  {
    id: "suscripcion",
    name: "Suscripción",
    description: "Procesos de suscripción y emisión de pólizas.",
    directLink: "/dashboard/suscripcion",
    category: "Otros",
    icon: FileSignature,
  },
  {
    id: "robotizacion",
    name: "Robotización",
    description: "Información y estado de los proyectos de automatización (RPA).",
    category: "Proyectos",
    icon: Bot,
  },
  {
    id: "actuarial",
    name: "Actuarial",
    description: "Modelado, análisis de riesgos y fijación de tarifas.",
    category: "Actuarial",
    icon: FileBarChart,
  },
];

export const mockDocuments: DocumentResource[] = [
  { 
    id: "doc1", 
    title: "Comprendiendo la Brecha de Entrega Móvil", 
    category: "Manuales", 
    area: "Procesos",
    businessLine: "Salud",
    description: "Un análisis profundo de los desafíos en la entrega de servicios móviles y cómo superarlos.", 
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxicmlkZ2V8ZW58MHx8fHwxNzUzMzA2NzM1fDA&ixlib=rb-4.1.0&q=80&w=1080", 
    dataAiHint: "bridge landscape",
    isFeatured: true,
  },
  { 
    id: "doc2", 
    title: "Nuestro Código de Ética", 
    category: "Documentos", 
    area: "Legal",
    description: "Principios y valores que guían nuestro comportamiento y toma de decisiones.", 
    imageUrl: "https://images.unsplash.com/photo-1446776811953-b23d5795b4e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxlYXJ0aCUyMGZyb20lMjBzcGFjZXxlbnwwfHx8fDE3NTMzMDY4MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "earth from space",
    isFeatured: true,
  },
  { 
    id: "doc3", 
    title: "Guiones de Atención al Cliente", 
    category: "Manuales", 
    area: "Comercial",
    businessLine: "Personas",
    description: "Guía para ofrecer un servicio de excelencia y estandarizado a nuestros clientes.",
    imageUrl: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxtZWV0aW5nfGVufDB8fHx8MTc1MzMwNjg3M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "team meeting",
    isFeatured: true
  },
  { 
    id: "doc4", 
    title: "Manual de Marca", 
    category: "Visuales", 
    area: "Mercadeo",
    businessLine: "Patrimoniales",
    description: "Directrices para el uso correcto de nuestra identidad visual y verbal.",
    imageUrl: "https://images.unsplash.com/photo-1598289431512-b970a521d892?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxncmFwZXN8ZW58MHx8fHwxNzUzMzA2OTI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "grapes fruit",
    isFeatured: false,
  },
  { 
    id: "doc5", 
    title: "Guía de Inspección Digital de Autos", 
    category: "Documentos", 
    area: "Suscripción",
    businessLine: "Automóvil",
    description: "Procedimiento para realizar inspecciones de vehículos de forma remota y eficiente.",
    imageUrl: "https://images.unsplash.com/photo-1532384749327-1453d1225585?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHhydW5uaW5nfGVufDB8fHx8MTc1MzMwNzAwN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "woman running",
    isFeatured: false,
  },
  { 
    id: "doc6", 
    title: "Procesos de Suscripción", 
    category: "Manuales", 
    area: "Suscripción",
    businessLine: "Personas",
    description: "Documentación detallada sobre los flujos y políticas de suscripción de pólizas.",
    imageUrl: "https://images.unsplash.com/photo-1575478422368-2793b2e35b7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxoZWxpY29wdGVyfGVufDB8fHx8MTc1MzMwNzA2M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "helicopter sky",
    isFeatured: false,
  },
  { 
    id: "doc7", 
    title: "Hemeroteca de Cumplimiento", 
    category: "Documentos", 
    area: "Legal",
    description: "Archivo de noticias y documentos relevantes para el cumplimiento normativo.",
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjb2Rpbmd8ZW58MHx8fHwxNzUzMzA3MTIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "coding programming",
    isFeatured: false,
  },
  {
    id: "doc8",
    title: "Guía de Inducción para Nuevos Empleados",
    category: "Documentos",
    area: "Capital Humano",
    description: "Todo lo que necesitas saber para empezar con buen pie en nuestra organización.",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxvbmJvYXJkaW5nfGVufDB8fHx8fDE3NTMzMDczNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "onboarding meeting",
    isFeatured: false,
  },
  {
    id: "doc9",
    title: "Presentación Corporativa Q1 2025",
    category: "Presentaciones",
    area: "General",
    description: "Resumen de los resultados y objetivos del primer trimestre del año.",
    imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwcmVzZW50YXRpb258ZW58MHx8fHwxNzUzMzA3NDEzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "business presentation",
    isFeatured: false,
  },
  {
    id: "doc10",
    title: "Plan de Cuentas Contable",
    category: "Documentos",
    area: "Finanzas",
    description: "Estructura detallada de las cuentas contables de la empresa.",
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04421cd6c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxhY2NvdW50aW5nfGVufDB8fHx8fDE3NTMzMDc1MDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "accounting calculator",
    isFeatured: true,
  },
  // Playlists as DocumentResources
  { 
    id: "P001", 
    title: "Clásicos en Inglés", 
    category: "Música", 
    area: "Mercadeo",
    description: "Los éxitos que marcaron una época.",
    imageUrl: "https://images.unsplash.com/photo-1519677584237-752f8853252e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxkaXNjfGVufDB8fHx8MTc1MjYwNzA5MXww&ixlib=rb-4.1.0&q=80&w=1080", 
    linkUrl: "#", 
    dataAiHint: "classic rock",
    isFeatured: false,
  },
  { 
    id: "P002", 
    title: "Rock Suave", 
    category: "Música", 
    area: "Mercadeo",
    description: "La selección perfecta para concentrarse.",
    imageUrl: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxndWl0YXJ8ZW58MHx8fHwxNzUyNjA3MjEwfDA&ixlib=rb-4.1.0&q=80&w=1080", 
    linkUrl: "#", 
    dataAiHint: "soft rock",
    isFeatured: false,
  },
  { 
    id: "P003", 
    title: "Salsa y Merengue", 
    category: "Música", 
    area: "Mercadeo",
    description: "Ritmos latinos para subir el ánimo.",
    imageUrl: "https://images.unsplash.com/photo-1570299437488-d430e1e677c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjdWJhfGVufDB8fHx8MTc1MjYwNzI5Mnww&ixlib=rb-4.1.0&q=80&w=1080", 
    linkUrl: "#", 
    dataAiHint: "latin dance",
    isFeatured: false,
  },
  { 
    id: "P004", 
    title: "Solo Éxitos Pop", 
    category: "Música", 
    area: "Mercadeo",
    description: "Las canciones más populares del momento.",
    imageUrl: "https://images.unsplash.com/photo-1729338043193-3a8464eb20c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxOHx8Y29tZXR8ZW58MHx8fHwxNzUyNjAwMDI4fDA&ixlib=rb-4.1.0&q=80&w=1080", 
    linkUrl: "#", 
    dataAiHint: "pop music",
    isFeatured: false,
  },
];



export const mockCalendarEvents = [
  // Enero 2025
  { id: "feriado-ene-01", date: new Date(2025, 0, 1), title: "Año Nuevo", description: "Feriado nacional.", color: "bg-red-500", isUserEvent: false },
  { id: "pago-ene-03", date: new Date(2025, 0, 3), title: "Beneficio Transporte", description: "Pago de beneficio de transporte.", color: "bg-teal-500", isUserEvent: false },
  { id: "feriado-bancario-ene-06", date: new Date(2025, 0, 6), title: "Feriado Bancario", description: "Día no laborable para el sector bancario.", color: "bg-slate-700", isUserEvent: false },
  { id: "pago-ene-10", date: new Date(2025, 0, 10), title: "Pago 1° Quincena", description: "Pago de la primera quincena.", color: "bg-emerald-500", isUserEvent: false },
  { id: "feriado-bancario-ene-13", date: new Date(2025, 0, 13), title: "Feriado Bancario", description: "Día no laborable para el sector bancario.", color: "bg-slate-700", isUserEvent: false },
  { id: "pago-ene-24", date: new Date(2025, 0, 24), title: "Complemento Alimentación", description: "Pago de complemento de alimentación.", color: "bg-lime-500", isUserEvent: false },
  { id: "pago-ene-28-quincena", date: new Date(2025, 0, 28), title: "Pago 2° Quincena", description: "Pago de la segunda quincena.", color: "bg-emerald-500", isUserEvent: false },
  { id: "pago-ene-28-alimentacion", date: new Date(2025, 0, 28), title: "Beneficio Alimentación", description: "Pago de beneficio de alimentación.", color: "bg-green-600", isUserEvent: false },

  // Febrero 2025
  { id: "pago-feb-05", date: new Date(2025, 1, 5), title: "Beneficio Transporte", description: "Pago de beneficio de transporte.", color: "bg-teal-500", isUserEvent: false },
  { id: "pago-feb-07", date: new Date(2025, 1, 7), title: "Beneficios Sociales", description: "Pago de beneficios sociales.", color: "bg-cyan-500", isUserEvent: false },
  { id: "pago-feb-11", date: new Date(2025, 1, 11), title: "Asignación Especial", description: "Pago de asignación especial.", color: "bg-sky-500", isUserEvent: false },
  { id: "pago-feb-12", date: new Date(2025, 1, 12), title: "Pago 1° Quincena", description: "Pago de la primera quincena.", color: "bg-emerald-500", isUserEvent: false },
  { id: "pago-feb-14", date: new Date(2025, 1, 14), title: "Beneficios Sociales", description: "Pago de beneficios sociales.", color: "bg-cyan-500", isUserEvent: false },
  { id: "pago-feb-21-sociales", date: new Date(2025, 1, 21), title: "Beneficios Sociales", description: "Pago de beneficios sociales.", color: "bg-cyan-500", isUserEvent: false },
  { id: "pago-feb-21-alimentacion", date: new Date(2025, 1, 21), title: "Complemento Alimentación", description: "Pago de complemento de alimentación.", color: "bg-lime-500", isUserEvent: false },
  { id: "pago-feb-26-quincena", date: new Date(2025, 1, 26), title: "Pago 2° Quincena", description: "Pago de la segunda quincena.", color: "bg-emerald-500", isUserEvent: false },
  { id: "pago-feb-26-alimentacion", date: new Date(2025, 1, 26), title: "Beneficio Alimentación", description: "Pago de beneficio de alimentación.", color: "bg-green-600", isUserEvent: false },

  // Marzo 2025
  { id: "feriado-mar-03", date: new Date(2025, 2, 3), title: "Carnavales", description: "Feriado nacional.", color: "bg-red-500", isUserEvent: false },
  { id: "feriado-mar-04", date: new Date(2025, 2, 4), title: "Carnavales", description: "Feriado nacional.", color: "bg-red-500", isUserEvent: false },
  { id: "pago-mar-05", date: new Date(2025, 2, 5), title: "Beneficio Transporte", description: "Pago de beneficio de transporte.", color: "bg-teal-500", isUserEvent: false },
  { id: "pago-mar-07", date: new Date(2025, 2, 7), title: "Beneficios Sociales", description: "Pago de beneficios sociales.", color: "bg-cyan-500", isUserEvent: false },
  { id: "pago-mar-11", date: new Date(2025, 2, 11), title: "Asignación Especial", description: "Pago de asignación especial.", color: "bg-sky-500", isUserEvent: false },
  { id: "pago-mar-12", date: new Date(2025, 2, 12), title: "Pago 1° Quincena", description: "Pago de la primera quincena.", color: "bg-emerald-500", isUserEvent: false },
  { id: "pago-mar-14", date: new Date(2025, 2, 14), title: "Beneficios Sociales", description: "Pago de beneficios sociales.", color: "bg-cyan-500", isUserEvent: false },
  { id: "feriado-bancario-mar-19", date: new Date(2025, 2, 19), title: "Feriado Bancario", description: "Día no laborable para el sector bancario.", color: "bg-slate-700", isUserEvent: false },
  { id: "pago-mar-21-sociales", date: new Date(2025, 2, 21), title: "Beneficios Sociales", description: "Pago de beneficios sociales.", color: "bg-cyan-500", isUserEvent: false },
  { id: "pago-mar-21-alimentacion", date: new Date(2025, 2, 21), title: "Complemento Alimentación", description: "Pago de complemento de alimentación.", color: "bg-lime-500", isUserEvent: false },
  { id: "pago-mar-26-quincena", date: new Date(2025, 2, 26), title: "Pago 2° Quincena", description: "Pago de la segunda quincena.", color: "bg-emerald-500", isUserEvent: false },
  { id: "pago-mar-26-alimentacion", date: new Date(2025, 2, 26), title: "Beneficio Alimentación", description: "Pago de beneficio de alimentación.", color: "bg-green-600", isUserEvent: false },

  // Abril 2025
  { id: "pago-abr-04-transporte", date: new Date(2025, 3, 4), title: "Beneficio Transporte", description: "Pago de beneficio de transporte.", color: "bg-teal-500", isUserEvent: false },
  { id: "pago-abr-04-sociales", date: new Date(2025, 3, 4), title: "Beneficios Sociales", description: "Pago de beneficios sociales.", color: "bg-cyan-500", isUserEvent: false },
  { id: "pago-abr-10", date: new Date(2025, 3, 10), title: "Pago 1° Quincena", description: "Pago de la primera quincena.", color: "bg-emerald-500", isUserEvent: false },
  { id: "pago-abr-11-especial", date: new Date(2025, 3, 11), title: "Asignación Especial", description: "Pago de asignación especial.", color: "bg-sky-500", isUserEvent: false },
  { id: "pago-abr-11-sociales", date: new Date(2025, 3, 11), title: "Beneficios Sociales", description: "Pago de beneficios sociales.", color: "bg-cyan-500", isUserEvent: false },
  { id: "pago-abr-16", date: new Date(2025, 3, 16), title: "Complemento Alimentación", description: "Pago de complemento de alimentación.", color: "bg-lime-500", isUserEvent: false },
  { id: "feriado-abr-17", date: new Date(2025, 3, 17), title: "Jueves Santo", description: "Feriado nacional.", color: "bg-red-500", isUserEvent: false },
  { id: "feriado-abr-18", date: new Date(2025, 3, 18), title: "Viernes Santo", description: "Feriado nacional.", color: "bg-red-500", isUserEvent: false },
  { id: "pago-abr-18", date: new Date(2025, 3, 18), title: "Beneficios Sociales", description: "Pago de beneficios sociales.", color: "bg-cyan-500", isUserEvent: false },
  { id: "pago-abr-24-quincena", date: new Date(2025, 3, 24), title: "Pago 2° Quincena", description: "Pago de la segunda quincena.", color: "bg-emerald-500", isUserEvent: false },
  { id: "pago-abr-24-alimentacion", date: new Date(2025, 3, 24), title: "Beneficio Alimentación", description: "Pago de beneficio de alimentación.", color: "bg-green-600", isUserEvent: false },

  // Mayo 2025
  { id: "feriado-may-01", date: new Date(2025, 4, 1), title: "Día del Trabajador", description: "Feriado nacional.", color: "bg-red-500", isUserEvent: false },
  { id: "pago-may-02-transporte", date: new Date(2025, 4, 2), title: "Beneficio Transporte", description: "Pago de beneficio de transporte.", color: "bg-teal-500", isUserEvent: false },
  { id: "pago-may-02-sociales", date: new Date(2025, 4, 2), title: "Beneficios Sociales", description: "Pago de beneficios sociales.", color: "bg-cyan-500", isUserEvent: false },
  { id: "pago-may-09-especial", date: new Date(2025, 4, 9), title: "Asignación Especial", description: "Pago de asignación especial.", color: "bg-sky-500", isUserEvent: false },
  { id: "pago-may-09-sociales", date: new Date(2025, 4, 9), title: "Beneficios Sociales", description: "Pago de beneficios sociales.", color: "bg-cyan-500", isUserEvent: false },
  { id: "pago-may-13", date: new Date(2025, 4, 13), title: "Pago 1° Quincena", description: "Pago de la primera quincena.", color: "bg-emerald-500", isUserEvent: false },
  { id: "pago-may-16-alimentacion", date: new Date(2025, 4, 16), title: "Complemento Alimentación", description: "Pago de complemento de alimentación.", color: "bg-lime-500", isUserEvent: false },
  { id: "pago-may-16-sociales", date: new Date(2025, 4, 16), title: "Beneficios Sociales", description: "Pago de beneficios sociales.", color: "bg-cyan-500", isUserEvent: false },
  { id: "pago-may-28-quincena", date: new Date(2025, 4, 28), title: "Pago 2° Quincena", description: "Pago de la segunda quincena.", color: "bg-emerald-500", isUserEvent: false },
  { id: "pago-may-28-alimentacion", date: new Date(2025, 4, 28), title: "Beneficio Alimentación", description: "Pago de beneficio de alimentación.", color: "bg-green-600", isUserEvent: false },

  // Junio 2025
  { id: "feriado-bancario-jun-02", date: new Date(2025, 5, 2), title: "Feriado Bancario", description: "Día no laborable para el sector bancario.", color: "bg-slate-700", isUserEvent: false },
  { id: "pago-jun-05", date: new Date(2025, 5, 5), title: "Beneficio Transporte", description: "Pago de beneficio de transporte.", color: "bg-teal-500", isUserEvent: false },
  { id: "pago-jun-06", date: new Date(2025, 5, 6), title: "Beneficios Sociales", description: "Pago de beneficios sociales.", color: "bg-cyan-500", isUserEvent: false },
  { id: "pago-jun-11-quincena", date: new Date(2025, 5, 11), title: "Pago 1° Quincena", description: "Pago de la primera quincena.", color: "bg-emerald-500", isUserEvent: false },
  { id: "pago-jun-11-especial", date: new Date(2025, 5, 11), title: "Asignación Especial", description: "Pago de asignación especial.", color: "bg-sky-500", isUserEvent: false },
  { id: "pago-jun-13", date: new Date(2025, 5, 13), title: "Beneficios Sociales", description: "Pago de beneficios sociales.", color: "bg-cyan-500", isUserEvent: false },
  { id: "feriado-bancario-jun-16", date: new Date(2025, 5, 16), title: "Feriado Bancario", description: "Día no laborable para el sector bancario.", color: "bg-slate-700", isUserEvent: false },
  { id: "pago-jun-20-alimentacion", date: new Date(2025, 5, 20), title: "Complemento Alimentación", description: "Pago de complemento de alimentación.", color: "bg-lime-500", isUserEvent: false },
  { id: "pago-jun-20-sociales", date: new Date(2025, 5, 20), title: "Beneficios Sociales", description: "Pago de beneficios sociales.", color: "bg-cyan-500", isUserEvent: false },
  { id: "feriado-bancario-jun-23", date: new Date(2025, 5, 23), title: "Feriado Bancario", description: "Día no laborable para el sector bancario.", color: "bg-slate-700", isUserEvent: false },
  { id: "feriado-jun-24", date: new Date(2025, 5, 24), title: "Batalla de Carabobo", description: "Feriado nacional.", color: "bg-red-500", isUserEvent: false },
  { id: "pago-jun-26-quincena", date: new Date(2025, 5, 26), title: "Pago 2° Quincena", description: "Pago de la segunda quincena.", color: "bg-emerald-500", isUserEvent: false },
  { id: "pago-jun-26-alimentacion", date: new Date(2025, 5, 26), title: "Beneficio Alimentación", description: "Pago de beneficio de alimentación.", color: "bg-green-600", isUserEvent: false },

  // Julio 2025
  { id: "pago-jul-03", date: new Date(2025, 6, 3), title: "Pago Utilidades", description: "Pago de utilidades.", color: "bg-yellow-500", isUserEvent: false },
  { id: "pago-jul-04-transporte", date: new Date(2025, 6, 4), title: "Beneficio Transporte", description: "Pago de beneficio de transporte.", color: "bg-teal-500", isUserEvent: false },
  { id: "pago-jul-04-sociales", date: new Date(2025, 6, 4), title: "Beneficios Sociales", description: "Pago de beneficios sociales.", color: "bg-cyan-500", isUserEvent: false },
  { id: "feriado-jul-05", date: new Date(2025, 6, 5), title: "Día de la Independencia", description: "Feriado nacional.", color: "bg-red-500", isUserEvent: false },
  { id: "pago-jul-10", date: new Date(2025, 6, 10), title: "Pago 1° Quincena", description: "Pago de la primera quincena.", color: "bg-emerald-500", isUserEvent: false },
  { id: "pago-jul-11-especial", date: new Date(2025, 6, 11), title: "Asignación Especial", description: "Pago de asignación especial.", color: "bg-sky-500", isUserEvent: false },
  { id: "pago-jul-11-sociales", date: new Date(2025, 6, 11), title: "Beneficios Sociales", description: "Pago de beneficios sociales.", color: "bg-cyan-500", isUserEvent: false },
  { id: "pago-jul-18-alimentacion", date: new Date(2025, 6, 18), title: "Complemento Alimentación", description: "Pago de complemento de alimentación.", color: "bg-lime-500", isUserEvent: false },
  { id: "pago-jul-18-sociales", date: new Date(2025, 6, 18), title: "Beneficios Sociales", description: "Pago de beneficios sociales.", color: "bg-cyan-500", isUserEvent: false },
  { id: "feriado-jul-24", date: new Date(2025, 6, 24), title: "Natalicio del Libertador", description: "Feriado nacional.", color: "bg-red-500", isUserEvent: false },
  { id: "pago-jul-29-quincena", date: new Date(2025, 6, 29), title: "Pago 2° Quincena", description: "Pago de la segunda quincena.", color: "bg-emerald-500", isUserEvent: false },
  { id: "pago-jul-29-alimentacion", date: new Date(2025, 6, 29), title: "Beneficio Alimentación", description: "Pago de beneficio de alimentación.", color: "bg-green-600", isUserEvent: false },

  // Agosto 2025
  { id: "pago-ago-01", date: new Date(2025, 7, 1), title: "Beneficios Sociales", description: "Pago de beneficios sociales.", color: "bg-cyan-500", isUserEvent: false },
  { id: "pago-ago-05", date: new Date(2025, 7, 5), title: "Beneficio Transporte", description: "Pago de beneficio de transporte.", color: "bg-teal-500", isUserEvent: false },
  { id: "pago-ago-08", date: new Date(2025, 7, 8), title: "Beneficios Sociales", description: "Pago de beneficios sociales.", color: "bg-cyan-500", isUserEvent: false },
  { id: "pago-ago-11", date: new Date(2025, 7, 11), title: "Asignación Especial", description: "Pago de asignación especial.", color: "bg-sky-500", isUserEvent: false },
  { id: "pago-ago-13", date: new Date(2025, 7, 13), title: "Pago 1° Quincena", description: "Pago de la primera quincena.", color: "bg-emerald-500", isUserEvent: false },
  { id: "pago-ago-15", date: new Date(2025, 7, 15), title: "Beneficios Sociales", description: "Pago de beneficios sociales.", color: "bg-cyan-500", isUserEvent: false },
  { id: "feriado-bancario-ago-18", date: new Date(2025, 7, 18), title: "Feriado Bancario", description: "Día no laborable para el sector bancario.", color: "bg-slate-700", isUserEvent: false },
  { id: "pago-ago-22", date: new Date(2025, 7, 22), title: "Complemento Alimentación", description: "Pago de complemento de alimentación.", color: "bg-lime-500", isUserEvent: false },
  { id: "pago-ago-27-quincena", date: new Date(2025, 7, 27), title: "Pago 2° Quincena", description: "Pago de la segunda quincena.", color: "bg-emerald-500", isUserEvent: false },
  { id: "pago-ago-27-alimentacion", date: new Date(2025, 7, 27), title: "Beneficio Alimentación", description: "Pago de beneficio de alimentación.", color: "bg-green-600", isUserEvent: false },

  // Septiembre 2025
  { id: "pago-sep-05-transporte", date: new Date(2025, 8, 5), title: "Beneficio Transporte", description: "Pago de beneficio de transporte.", color: "bg-teal-500", isUserEvent: false },
  { id: "pago-sep-05-sociales", date: new Date(2025, 8, 5), title: "Beneficios Sociales", description: "Pago de beneficios sociales.", color: "bg-cyan-500", isUserEvent: false },
  { id: "pago-sep-10", date: new Date(2025, 8, 10), title: "Pago 1° Quincena", description: "Pago de la primera quincena.", color: "bg-emerald-500", isUserEvent: false },
  { id: "pago-sep-11", date: new Date(2025, 8, 11), title: "Asignación Especial", description: "Pago de asignación especial.", color: "bg-sky-500", isUserEvent: false },
  { id: "pago-sep-12", date: new Date(2025, 8, 12), title: "Beneficios Sociales", description: "Pago de beneficios sociales.", color: "bg-cyan-500", isUserEvent: false },
  { id: "feriado-bancario-sep-15", date: new Date(2025, 8, 15), title: "Feriado Bancario", description: "Día no laborable para el sector bancario.", color: "bg-slate-700", isUserEvent: false },
  { id: "pago-sep-19-alimentacion", date: new Date(2025, 8, 19), title: "Complemento Alimentación", description: "Pago de complemento de alimentación.", color: "bg-lime-500", isUserEvent: false },
  { id: "pago-sep-19-sociales", date: new Date(2025, 8, 19), title: "Beneficios Sociales", description: "Pago de beneficios sociales.", color: "bg-cyan-500", isUserEvent: false },
  { id: "pago-sep-25-quincena", date: new Date(2025, 8, 25), title: "Pago 2° Quincena", description: "Pago de la segunda quincena.", color: "bg-emerald-500", isUserEvent: false },
  { id: "pago-sep-25-alimentacion", date: new Date(2025, 8, 25), title: "Beneficio Alimentación", description: "Pago de beneficio de alimentación.", color: "bg-green-600", isUserEvent: false },
  
  // Octubre 2025
  { id: "pago-oct-03-transporte", date: new Date(2025, 9, 3), title: "Beneficio Transporte", description: "Pago de beneficio de transporte.", color: "bg-teal-500", isUserEvent: false },
  { id: "pago-oct-03-sociales", date: new Date(2025, 9, 3), title: "Beneficios Sociales", description: "Pago de beneficios sociales.", color: "bg-cyan-500", isUserEvent: false },
  { id: "pago-oct-10-especial", date: new Date(2025, 9, 10), title: "Asignación Especial", description: "Pago de asignación especial.", color: "bg-sky-500", isUserEvent: false },
  { id: "pago-oct-10-sociales", date: new Date(2025, 9, 10), title: "Beneficios Sociales", description: "Pago de beneficios sociales.", color: "bg-cyan-500", isUserEvent: false },
  { id: "pago-oct-13", date: new Date(2025, 9, 13), title: "Pago 1° Quincena", description: "Pago de la primera quincena.", color: "bg-emerald-500", isUserEvent: false },
  { id: "pago-oct-17-alimentacion", date: new Date(2025, 9, 17), title: "Complemento Alimentación", description: "Pago de complemento de alimentación.", color: "bg-lime-500", isUserEvent: false },
  { id: "pago-oct-17-sociales", date: new Date(2025, 9, 17), title: "Beneficios Sociales", description: "Pago de beneficios sociales.", color: "bg-cyan-500", isUserEvent: false },
  { id: "pago-oct-28-quincena", date: new Date(2025, 9, 28), title: "Pago 2° Quincena", description: "Pago de la segunda quincena.", color: "bg-emerald-500", isUserEvent: false },
  { id: "pago-oct-28-alimentacion", date: new Date(2025, 9, 28), title: "Beneficio Alimentación", description: "Pago de beneficio de alimentación.", color: "bg-green-600", isUserEvent: false },

  // Noviembre 2025
  { id: "pago-nov-05-transporte", date: new Date(2025, 10, 5), title: "Beneficio Transporte", description: "Pago de beneficio de transporte.", color: "bg-teal-500", isUserEvent: false },
  { id: "pago-nov-05-utilidades", date: new Date(2025, 10, 5), title: "Pago Utilidades", description: "Pago de utilidades.", color: "bg-yellow-500", isUserEvent: false },
  { id: "pago-nov-07", date: new Date(2025, 10, 7), title: "Beneficios Sociales", description: "Pago de beneficios sociales.", color: "bg-cyan-500", isUserEvent: false },
  { id: "pago-nov-11", date: new Date(2025, 10, 11), title: "Asignación Especial", description: "Pago de asignación especial.", color: "bg-sky-500", isUserEvent: false },
  { id: "pago-nov-12", date: new Date(2025, 10, 12), title: "Pago 1° Quincena", description: "Pago de la primera quincena.", color: "bg-emerald-500", isUserEvent: false },
  { id: "pago-nov-14", date: new Date(2025, 10, 14), title: "Beneficios Sociales", description: "Pago de beneficios sociales.", color: "bg-cyan-500", isUserEvent: false },
  { id: "pago-nov-21-alimentacion", date: new Date(2025, 10, 21), title: "Complemento Alimentación", description: "Pago de complemento de alimentación.", color: "bg-lime-500", isUserEvent: false },
  { id: "pago-nov-21-sociales", date: new Date(2025, 10, 21), title: "Beneficios Sociales", description: "Pago de beneficios sociales.", color: "bg-cyan-500", isUserEvent: false },
  { id: "feriado-bancario-nov-24", date: new Date(2025, 10, 24), title: "Feriado Bancario", description: "Día no laborable para el sector bancario.", color: "bg-slate-700", isUserEvent: false },
  { id: "pago-nov-26-quincena", date: new Date(2025, 10, 26), title: "Pago 2° Quincena", description: "Pago de la segunda quincena.", color: "bg-emerald-500", isUserEvent: false },
  { id: "pago-nov-26-alimentacion", date: new Date(2025, 10, 26), title: "Beneficio Alimentación", description: "Pago de beneficio de alimentación.", color: "bg-green-600", isUserEvent: false },

  // Diciembre 2025
  { id: "pago-dic-05-transporte", date: new Date(2025, 11, 5), title: "Beneficio Transporte", description: "Pago de beneficio de transporte.", color: "bg-teal-500", isUserEvent: false },
  { id: "pago-dic-05-sociales", date: new Date(2025, 11, 5), title: "Beneficios Sociales", description: "Pago de beneficios sociales.", color: "bg-cyan-500", isUserEvent: false },
  { id: "feriado-bancario-dic-08", date: new Date(2025, 11, 8), title: "Feriado Bancario", description: "Día no laborable para el sector bancario.", color: "bg-slate-700", isUserEvent: false },
  { id: "pago-dic-10", date: new Date(2025, 11, 10), title: "Asignación Especial", description: "Pago de asignación especial.", color: "bg-sky-500", isUserEvent: false },
  { id: "pago-dic-11", date: new Date(2025, 11, 11), title: "Pago 1° Quincena", description: "Pago de la primera quincena.", color: "bg-emerald-500", isUserEvent: false },
  { id: "pago-dic-12", date: new Date(2025, 11, 12), title: "Beneficios Sociales", description: "Pago de beneficios sociales.", color: "bg-cyan-500", isUserEvent: false },
  { id: "pago-dic-18", date: new Date(2025, 11, 18), title: "Complemento Alimentación", description: "Pago de complemento de alimentación.", color: "bg-lime-500", isUserEvent: false },
  { id: "pago-dic-19-quincena", date: new Date(2025, 11, 19), title: "Pago 2° Quincena", description: "Pago de la segunda quincena.", color: "bg-emerald-500", isUserEvent: false },
  { id: "pago-dic-19-alimentacion", date: new Date(2025, 11, 19), title: "Beneficio Alimentación", description: "Pago de beneficio de alimentación.", color: "bg-green-600", isUserEvent: false },
  { id: "pago-dic-19-sociales", date: new Date(2025, 11, 19), title: "Beneficios Sociales", description: "Pago de beneficios sociales.", color: "bg-cyan-500", isUserEvent: false },
  { id: "feriado-dic-24", date: new Date(2025, 11, 24), title: "Nochebuena", description: "Feriado nacional.", color: "bg-red-500", isUserEvent: false },
  { id: "feriado-dic-25", date: new Date(2025, 11, 25), title: "Navidad", description: "Feriado nacional.", color: "bg-red-500", isUserEvent: false },
  { id: "feriado-dic-31", date: new Date(2025, 11, 31), title: "Fin de Año", description: "Feriado nacional.", color: "bg-red-500", isUserEvent: false },
];

export const mockExecutiveCalendarEvents = [
    { id: "exec-pago-jun-11", date: "2025-06-11", title: "Pago Quincena", description: "Pago de la primera quincena para gerentes.", color: "bg-emerald-500" },
    { id: "exec-bono-jul-15", date: "2025-07-15", title: "Bono Gerencial", description: "Pago de bono por desempeño para la gerencia.", color: "bg-primary" },
    { id: "exec-reunion-jul-15", date: "2025-07-15", title: "Reunión de Directorio", description: "Reunión mensual del directorio.", color: "bg-rose-500", time: "09:00" },
    { id: "exec-pago-jul-29", date: "2025-07-29", title: "Pago Quincena", description: "Pago de la segunda quincena para gerentes.", color: "bg-emerald-500" },
    { id: "exec-resultados-ago-05", date: "2025-08-05", title: "Presentación Resultados Q3", description: "Presentación de resultados del tercer trimestre.", color: "bg-sky-500", time: "14:00" },
];

export const mockExecutiveMenuItems: MenuItem[] = [
    { 
        id: "EM001", day: "Lunes", name: "Lomo Saltado Peruano", 
        description: "Trozos de lomo fino salteados con cebolla, tomate, ají amarillo, servido con papas fritas y arroz.", 
        imageUrl: "https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(2).png?raw=true", 
        price: "$13", type: "Ejecutivo", dataAiHint: "peruvian steak" 
    },
    { 
        id: "EM002", day: "Martes", name: "Risotto de Champiñones y Trufa", 
        description: "Cremoso risotto Arborio con variedad de champiñones frescos y un toque de aceite de trufa.", 
        imageUrl: "https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(3).png?raw=true", 
        price: "$13", type: "Ejecutivo", dataAiHint: "mushroom risotto" 
    },
    { 
        id: "EM003", day: "Miércoles", name: "Paella de Mariscos Individual", 
        description: "Arroz bomba cocinado en caldo de pescado con camarones, calamares, mejillones y almejas.", 
        imageUrl: "https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(4).png?raw=true", 
        price: "$13", type: "Ejecutivo", dataAiHint: "seafood paella" 
    },
    { 
        id: "EM004", day: "Jueves", name: "Entrecot a la Parrilla con Chimichurri", 
        description: "Corte de entrecot jugoso a la parrilla, acompañado de salsa chimichurri y guarnición de papas rústicas.", 
        imageUrl: "https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(1).png?raw=true", 
        price: "$13", type: "Ejecutivo", dataAiHint: "grilled steak" 
    },
    { 
        id: "EM005", day: "Viernes", name: "Canelones de Ricota y Espinaca", 
        description: "Canelones rellenos de suave ricota y espinacas frescas, bañados en salsa bechamel y gratinados.", 
        imageUrl: "https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(5).png?raw=true", 
        price: "$13", type: "Ejecutivo", dataAiHint: "cannelloni pasta" 
    },
];


export const mockDressCodeItems: DressCodeItem[] = [
  {
    id: "DC001",
    title: "Formal de Negocios",
    description: "Traje completo (saco y pantalón o falda), camisa de vestir, corbata (opcional para mujeres). Zapatos de vestir.",
    imageUrl: "https://images.unsplash.com/photo-1491336477066-31156b5e4f35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxUcmFqZXxlbnwwfHx8fDE3NTgyMTgxNDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "business formal"
  },
  {
    id: "DC002",
    title: "Casual de Negocios",
    description: "Pantalones de vestir o chinos, camisa o blusa, blazer o suéter opcional. Zapatos cerrados.",
    imageUrl: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxM3x8U0hJUlR8ZW58MHx8fHwxNzU4MjIzMTkwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "business casual"
  },
  {
    id: "DC003",
    title: "Smart Casual",
    description: "Vaqueros oscuros (sin roturas), camisa o polo, blusa elegante. Chaqueta deportiva o cárdigan. Zapatos limpios y cuidados.",
    imageUrl: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxKRUFOU3xlbnwwfHx8fDE3NTgyMjQ4NzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "smart casual"
  },
  {
    id: "DC004",
    title: "Viernes Casual",
    description: "Vestimenta más relajada, pero manteniendo profesionalismo. Vaqueros permitidos (limpios), camisetas tipo polo o blusas casuales.",
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxUU0hJUlR8ZW58MHx8fHwxNzU4MjI0NzMzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "casual friday"
  },
];

export const mockEmployees: Employee[] = [
  { id: 'E001', name: 'Carlos Rodríguez', role: 'Desarrollador Senior', department: 'Tecnología', imageUrl: 'https://placehold.co/400x500.png', dataAiHint: 'person portrait' },
  { id: 'E002', name: 'Ana Martínez', role: 'Analista de Sistemas', department: 'Tecnología', imageUrl: 'https://placehold.co/400x500.png', dataAiHint: 'woman portrait' },
  { id: 'E003', name: 'Luis Pérez', role: 'Soporte Técnico', department: 'Tecnología', imageUrl: 'https://placehold.co/400x500.png', dataAiHint: 'man portrait' },
  { id: 'E004', name: 'Sofía Gómez', role: 'Gerente de RRHH', department: 'Capital Humano', imageUrl: 'https://placehold.co/400x500.png', dataAiHint: 'woman portrait' },
  { id: 'E005', name: 'Javier Hernández', role: 'Reclutador', department: 'Capital Humano', imageUrl: 'https://placehold.co/400x500.png', dataAiHint: 'person portrait' },
  { id: 'E006', name: 'Elena Torres', role: 'Contadora Principal', department: 'Finanzas', imageUrl: 'https://placehold.co/400x500.png', dataAiHint: 'woman portrait' },
  { id: 'E007', name: 'David Ramírez', role: 'Analista Financiero', department: 'Finanzas', imageUrl: 'https://placehold.co/400x500.png', dataAiHint: 'man portrait' },
  { id: 'E008', name: 'Laura Díaz', role: 'Jefe de Operaciones', department: 'Procesos', imageUrl: 'https://placehold.co/400x500.png', dataAiHint: 'person portrait' },
  { id: 'E009', name: 'Miguel Vargas', role: 'Especialista en Marketing', department: 'Comercial', imageUrl: 'https://placehold.co/400x500.png', dataAiHint: 'man portrait' },
];

export const teamDepartments = [
  { id: "todos", name: "Todos" },
  { id: "lideres", name: "Líderes" },
  { id: "comercial", name: "Comercial" },
  { id: "suscripcion", name: "Suscripción" },
  { id: "operaciones", name: "Operaciones" },
  { id: "actuarial", name: "Actuarial" },
  { id: "capital-humano", name: "Capital Humano" },
  { id: "procesos", name: "Procesos" },
  { id: "tecnologia", name: "Tecnología" },
  { id: "finanzas", name: "Finanzas" },
];

export const faqData: FaqItem[] = [
  {
    id: "faq1",
    question: "¿Cómo puedo consultar la cobertura de mi póliza HCM?",
    answer: "Puedes consultar todos los detalles de tu póliza, incluyendo coberturas, red de clínicas y estatus de reembolsos, accediendo a la sección 'Póliza HCM' desde el menú de Accesos Rápidos en esta misma página.",
    category: "General",
  },
  {
    id: "faq2",
    question: "¿Cuál es el procedimiento para solicitar vacaciones?",
    answer: "Para solicitar tus días libres, dirígete a 'Gestión de Vacaciones' en los Accesos Rápidos. Allí podrás ver tu saldo de días disponibles, seleccionar las fechas deseadas y enviar la solicitud para su aprobación.",
    category: "General",
  },
  {
    id: "faq3",
    question: "¿A quién debo contactar para soporte técnico?",
    answer: "Si tienes algún inconveniente técnico con tu equipo o con alguna de las plataformas, puedes generar un ticket de soporte dirigiéndote al 'Portal de Requerimientos' y seleccionando el departamento de 'Tecnología de Información'.",
    category: "Soporte",
  },
  {
    id: "faq4",
    question: "¿Dónde puedo ver el menú del comedor de esta semana?",
    answer: "El menú semanal del comedor está disponible en la página principal del portal, justo debajo de los Accesos Rápidos. Puedes navegar entre las opciones de Menú General, Dieta y Ejecutivo usando las pestañas.",
    category: "General",
  },
  {
    id: "faq5",
    question: "¿Cómo me inscribo en un curso o actividad de bienestar?",
    answer: "Tanto los cursos como las actividades de bienestar se encuentran en la sección 'Bienestar' accesible desde el menú de navegación principal. Dentro de cada sección, podrás ver los detalles y encontrar los botones para inscribirte o confirmar tu asistencia.",
    category: "Otros",
  }
];

export const mockPlaylist: PlaylistItem[] = [
  { 
    id: "P001", 
    title: "Clásicos en Inglés", 
    description: "Los éxitos que marcaron una época.",
    albumArtUrl: "https://images.unsplash.com/photo-1519677584237-752f8853252e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxkaXNjfGVufDB8fHx8MTc1MjYwNzA5MXww&ixlib=rb-4.1.0&q=80&w=1080", 
    linkUrl: "#", 
    dataAiHint: "classic rock" 
  },
  { 
    id: "P002", 
    title: "Rock Suave", 
    description: "La selección perfecta para concentrarse.",
    albumArtUrl: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxndWl0YXJ8ZW58MHx8fHwxNzUyNjA3MjEwfDA&ixlib=rb-4.1.0&q=80&w=1080", 
    linkUrl: "#", 
    dataAiHint: "soft rock" 
  },
  { 
    id: "P003", 
    title: "Salsa y Merengue", 
    description: "Ritmos latinos para subir el ánimo.",
    albumArtUrl: "https://images.unsplash.com/photo-1570299437488-d430e1e677c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjdWJhfGVufDB8fHx8MTc1MjYwNzI5Mnww&ixlib=rb-4.1.0&q=80&w=1080", 
    linkUrl: "#", 
    dataAiHint: "latin dance" 
  },
  { 
    id: "P004", 
    title: "Solo Éxitos Pop", 
    description: "Las canciones más populares del momento.",
    albumArtUrl: "https://images.unsplash.com/photo-1729338043193-3a8464eb20c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxOHx8Y29tZXR8ZW58MHx8fHwxNzUyNjAwMDI4fDA&ixlib=rb-4.1.0&q=80&w=1080", 
    linkUrl: "#", 
    dataAiHint: "pop music"
  },
];
    
    
export const mockNotifications: NotificationItem[] = [
  {
    id: 'update-music',
    type: 'update',
    title: '¡Nueva Música en la Biblioteca!',
    description: 'Hemos añadido nuevas playlists para que disfrutes mientras trabajas.',
    time: 'Reciente',
    icon: Music2,
    iconColor: 'bg-purple-100 text-purple-500'
  }
];

export const npsData = {
  score: 62,
  responses: 1254,
};

export const mockCustomerFeedback: CustomerFeedback[] = [
  { id: 'cf1', name: 'María Gonzalez', avatar: 'MG', comment: 'El proceso de reclamo fue sorprendentemente rápido y el personal muy atento. Me sentí apoyada en un momento difícil.', nps: 10 },
  { id: 'cf2', name: 'José Pérez', avatar: 'JP', comment: 'La aplicación móvil es muy fácil de usar. Pude gestionar mi póliza y reportar un siniestro sin complicaciones.', nps: 9 },
  { id: 'cf3', name: 'Ana Sofía Rivas', avatar: 'AR', comment: 'Me gustaría que tuvieran más opciones de cobertura para viajes internacionales.', nps: 7 },
];
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

  
















