import React, { createContext, useContext, useState, useEffect } from 'react';
import type { 
  User, 
  BookingRequest, 
  Project, 
  ServiceItem, 
  Article, 
  Testimonial,
  ProjectStage,
  WorkUpdate,
  DocumentItem,
  PaymentItem,
  MessageItem,
  TeamMember
} from '../types';
import { 
  INITIAL_SERVICES, 
  INITIAL_PROJECTS, 
  INITIAL_ARTICLES, 
  INITIAL_TESTIMONIALS, 
  INITIAL_BOOKINGS, 
  INITIAL_USERS,
  INITIAL_TEAM_MEMBERS
} from '../data/initialData';

interface AppContextType {
  currentUser: User | null;
  users: User[];
  bookings: BookingRequest[];
  projects: Project[];
  services: ServiceItem[];
  articles: Article[];
  testimonials: Testimonial[];
  
  // Modals & UI state
  isBookingOpen: boolean;
  setIsBookingOpen: (open: boolean) => void;
  selectedServiceForBooking: ServiceItem | null;
  setSelectedServiceForBooking: (service: ServiceItem | null) => void;
  
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  authMode: 'login' | 'register';
  setAuthMode: (mode: 'login' | 'register') => void;

  isEstimatorOpen: boolean;
  setIsEstimatorOpen: (open: boolean) => void;
  isSiteVisitOpen: boolean;
  setIsSiteVisitOpen: (open: boolean) => void;
  selectedProjectForSiteVisit: string | null;
  setSelectedProjectForSiteVisit: (projTitle: string | null) => void;

  // Actions
  login: (email: string, role?: 'ADMIN' | 'CLIENT') => boolean;
  logout: () => void;
  submitBooking: (booking: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>) => BookingRequest;
  approveBooking: (bookingId: string) => void;
  rejectBooking: (bookingId: string) => void;
  
  // Project Actions
  updateProjectProgress: (projectId: string, stage: ProjectStage, percentage: number) => void;
  addWorkUpdate: (projectId: string, update: Omit<WorkUpdate, 'id' | 'projectId'>) => void;
  addDocument: (projectId: string, doc: Omit<DocumentItem, 'id' | 'projectId'>) => void;
  addPayment: (projectId: string, pay: Omit<PaymentItem, 'id' | 'projectId'>) => void;
  updatePaymentStatus: (projectId: string, paymentId: string, status: 'Paid' | 'Pending' | 'Overdue', paidAmount?: number) => void;
  sendMessage: (projectId: string, text: string) => void;
  
  // CMS Actions
  addProject: (proj: Omit<Project, 'id'>) => void;
  updateProject: (id: string, proj: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  addArticle: (art: Omit<Article, 'id'>) => void;
  updateArticle: (id: string, art: Partial<Article>) => void;
  deleteArticle: (id: string) => void;

  teamMembers: TeamMember[];
  addTeamMember: (member: Omit<TeamMember, 'id'>) => void;
  updateTeamMember: (id: string, updated: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;

  addService: (service: Omit<ServiceItem, 'id'>) => void;
  updateService: (id: string, service: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;
  updateServicePrice: (serviceId: string, newPrice: number) => void;
  toggleServiceStatus: (serviceId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('decor8_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error('Failed to parse currentUser from localStorage', e);
      return null;
    }
  });

  const [users, setUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem('decor8_users');
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    } catch (e) {
      console.error('Failed to parse users from localStorage', e);
      return INITIAL_USERS;
    }
  });

  const [bookings, setBookings] = useState<BookingRequest[]>(() => {
    try {
      const saved = localStorage.getItem('decor8_bookings');
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch (e) {
      console.error('Failed to parse bookings from localStorage', e);
      return INITIAL_BOOKINGS;
    }
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('decor8_projects');
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch (e) {
      console.error('Failed to parse projects from localStorage', e);
      return INITIAL_PROJECTS;
    }
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const saved = localStorage.getItem('decor8_services');
      return saved ? JSON.parse(saved) : INITIAL_SERVICES;
    } catch (e) {
      console.error('Failed to parse services from localStorage', e);
      return INITIAL_SERVICES;
    }
  });

  const [articles, setArticles] = useState<Article[]>(() => {
    try {
      const saved = localStorage.getItem('decor8_articles');
      return saved ? JSON.parse(saved) : INITIAL_ARTICLES;
    } catch (e) {
      console.error('Failed to parse articles from localStorage', e);
      return INITIAL_ARTICLES;
    }
  });

  const [testimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    try {
      const saved = localStorage.getItem('decor8_team_members');
      return saved ? JSON.parse(saved) : INITIAL_TEAM_MEMBERS;
    } catch (e) {
      console.error('Failed to parse teamMembers from localStorage', e);
      return INITIAL_TEAM_MEMBERS;
    }
  });

  // Modal States
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<ServiceItem | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);
  const [isSiteVisitOpen, setIsSiteVisitOpen] = useState(false);
  const [selectedProjectForSiteVisit, setSelectedProjectForSiteVisit] = useState<string | null>(null);

  // Sync to local storage with try-catch guards to prevent QuotaExceededError crashes
  useEffect(() => {
    try {
      if (currentUser) localStorage.setItem('decor8_user', JSON.stringify(currentUser));
      else localStorage.removeItem('decor8_user');
    } catch (e) {
      console.warn('LocalStorage quota exceeded for currentUser:', e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem('decor8_projects', JSON.stringify(projects));
    } catch (e) {
      console.warn('LocalStorage quota exceeded for projects:', e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem('decor8_team_members', JSON.stringify(teamMembers));
    } catch (e) {
      console.warn('LocalStorage quota exceeded for teamMembers:', e);
    }
  }, [teamMembers]);

  useEffect(() => {
    try {
      localStorage.setItem('decor8_bookings', JSON.stringify(bookings));
    } catch (e) {
      console.warn('LocalStorage quota exceeded for bookings:', e);
    }
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem('decor8_users', JSON.stringify(users));
    } catch (e) {
      console.warn('LocalStorage quota exceeded for users:', e);
    }
  }, [users]);

  useEffect(() => {
    try {
      localStorage.setItem('decor8_articles', JSON.stringify(articles));
    } catch (e) {
      console.warn('LocalStorage quota exceeded for articles:', e);
    }
  }, [articles]);

  useEffect(() => {
    try {
      localStorage.setItem('decor8_services', JSON.stringify(services));
    } catch (e) {
      console.warn('LocalStorage quota exceeded for services:', e);
    }
  }, [services]);

  const login = (email: string, roleHint?: 'ADMIN' | 'CLIENT'): boolean => {
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (foundUser) {
      if (!foundUser.isApproved && foundUser.role === 'CLIENT') {
        alert('Your client account is pending Admin approval. You will receive an email once approved.');
        return false;
      }
      setCurrentUser(foundUser);
      return true;
    }
    
    // Quick demo login shortcuts
    if (email === 'admin@decor8india.com' || roleHint === 'ADMIN') {
      const admin = users.find(u => u.role === 'ADMIN') || INITIAL_USERS[0];
      setCurrentUser(admin);
      return true;
    }

    if (email === 'ananya.reddy@example.com' || roleHint === 'CLIENT') {
      const client = users.find(u => u.role === 'CLIENT') || INITIAL_USERS[1];
      setCurrentUser(client);
      return true;
    }

    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const submitBooking = (bookingData: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>): BookingRequest => {
    const newBooking: BookingRequest = {
      ...bookingData,
      id: `bk-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'Pending Approval'
    };

    setBookings(prev => [newBooking, ...prev]);

    // Also register pending user record if not exists
    const existingUser = users.find(u => u.email.toLowerCase() === bookingData.clientEmail.toLowerCase());
    if (!existingUser) {
      const newUser: User = {
        id: `usr-${Date.now().toString().slice(-4)}`,
        name: bookingData.clientName,
        email: bookingData.clientEmail,
        phone: bookingData.clientPhone,
        role: 'CLIENT',
        isApproved: false
      };
      setUsers(prev => [...prev, newUser]);
    }

    return newBooking;
  };

  const approveBooking = (bookingId: string) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    // Update booking status
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'Approved' } : b));

    // Find or create approved client user
    let clientUser = users.find(u => u.email.toLowerCase() === booking.clientEmail.toLowerCase());
    const newProjId = `proj-${Date.now().toString().slice(-4)}`;

    if (clientUser) {
      setUsers(prev => prev.map(u => u.id === clientUser!.id ? { ...u, isApproved: true, projectId: newProjId } : u));
    } else {
      clientUser = {
        id: `usr-${Date.now().toString().slice(-4)}`,
        name: booking.clientName,
        email: booking.clientEmail,
        phone: booking.clientPhone,
        role: 'CLIENT',
        isApproved: true,
        projectId: newProjId
      };
      setUsers(prev => [...prev, clientUser!]);
    }

    // Create new active project for this client
    const newProject: Project = {
      id: newProjId,
      title: `${booking.packageName} for ${booking.clientName}`,
      clientId: clientUser.id,
      clientName: booking.clientName,
      designerName: 'Aarav Mehta (Principal Architect)',
      category: booking.serviceType,
      style: 'Modern',
      coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      galleryImages: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
      location: 'City Center',
      area: `${booking.carpetArea || 1500} Sq. Ft.`,
      budget: `₹ ${(booking.estimatedCost ? (booking.estimatedCost / 100000).toFixed(2) : 15)} Lakhs`,
      completionTime: '60 Days',
      status: 'Ongoing',
      progressPercentage: 10,
      currentStage: 'Design Discussion',
      expectedCompletion: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      description: booking.requirements || 'Approved luxury interior transformation.',
      milestones: [
        { id: 'm1', stage: 'Design Discussion', progressPercentage: 100, status: 'Completed', targetDate: new Date().toISOString().split('T')[0], completedDate: new Date().toISOString().split('T')[0] },
        { id: 'm2', stage: 'Site Measurement', progressPercentage: 20, status: 'In Progress', targetDate: new Date(Date.now() + 7*24*60*60*1000).toISOString().split('T')[0] },
        { id: 'm3', stage: '3D Design', progressPercentage: 0, status: 'Pending', targetDate: new Date(Date.now() + 15*24*60*60*1000).toISOString().split('T')[0] },
        { id: 'm4', stage: 'Material Selection', progressPercentage: 0, status: 'Pending', targetDate: new Date(Date.now() + 22*24*60*60*1000).toISOString().split('T')[0] },
        { id: 'm5', stage: 'Civil Work', progressPercentage: 0, status: 'Pending', targetDate: new Date(Date.now() + 35*24*60*60*1000).toISOString().split('T')[0] },
        { id: 'm6', stage: 'Carpentry', progressPercentage: 0, status: 'Pending', targetDate: new Date(Date.now() + 45*24*60*60*1000).toISOString().split('T')[0] },
        { id: 'm7', stage: 'Painting', progressPercentage: 0, status: 'Pending', targetDate: new Date(Date.now() + 52*24*60*60*1000).toISOString().split('T')[0] },
        { id: 'm8', stage: 'Electrical', progressPercentage: 0, status: 'Pending', targetDate: new Date(Date.now() + 55*24*60*60*1000).toISOString().split('T')[0] },
        { id: 'm9', stage: 'Furniture Installation', progressPercentage: 0, status: 'Pending', targetDate: new Date(Date.now() + 58*24*60*60*1000).toISOString().split('T')[0] },
        { id: 'm10', stage: 'Final Inspection', progressPercentage: 0, status: 'Pending', targetDate: new Date(Date.now() + 60*24*60*60*1000).toISOString().split('T')[0] }
      ],
      workUpdates: [
        {
          id: `wu-${Date.now()}`,
          projectId: newProjId,
          date: new Date().toISOString().split('T')[0],
          title: 'Booking Approved & Design Phase Initiated',
          description: 'Client account activated. Site measurement team scheduled for preliminary survey.',
          mediaUrls: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
          mediaType: 'image',
          stage: 'Design Discussion'
        }
      ],
      documents: [
        {
          id: `doc-${Date.now()}`,
          projectId: newProjId,
          title: `Project Proposal & Service Estimate.pdf`,
          category: 'Quotation',
          fileUrl: '#',
          fileSize: '1.8 MB',
          uploadDate: new Date().toISOString().split('T')[0]
        }
      ],
      payments: [
        {
          id: `pay-${Date.now()}`,
          projectId: newProjId,
          title: 'Token Deposit (10%)',
          amount: booking.estimatedCost ? Math.round(booking.estimatedCost * 0.1) : 100000,
          paidAmount: 0,
          dueDate: new Date(Date.now() + 3*24*60*60*1000).toISOString().split('T')[0],
          status: 'Pending'
        }
      ],
      messages: [
        {
          id: `msg-${Date.now()}`,
          projectId: newProjId,
          senderId: 'admin-1',
          senderName: 'Aarav Mehta (Lead Architect)',
          senderRole: 'ADMIN',
          text: `Welcome ${booking.clientName}! Your interior design project has been officially initialized. Feel free to upload design inspirations or send questions here.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };

    setProjects(prev => [newProject, ...prev]);
  };

  const rejectBooking = (bookingId: string) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'Rejected' } : b));
  };

  const updateProjectProgress = (projectId: string, stage: ProjectStage, percentage: number) => {
    setProjects(prev => prev.map(proj => {
      if (proj.id !== projectId) return proj;

      const isCompleted = percentage >= 100 && stage === 'Handover Completed';
      const newStatus = isCompleted ? 'Completed' : proj.status;

      // Update milestone list
      const updatedMilestones = proj.milestones.map(m => {
        if (m.stage === stage) {
          return {
            ...m,
            progressPercentage: percentage,
            status: percentage >= 100 ? ('Completed' as const) : ('In Progress' as const),
            completedDate: percentage >= 100 ? new Date().toISOString().split('T')[0] : undefined
          };
        }
        return m;
      });

      return {
        ...proj,
        progressPercentage: percentage,
        currentStage: stage,
        status: newStatus,
        milestones: updatedMilestones
      };
    }));
  };

  const addWorkUpdate = (projectId: string, updateData: Omit<WorkUpdate, 'id' | 'projectId'>) => {
    const newUpdate: WorkUpdate = {
      ...updateData,
      id: `wu-${Date.now()}`,
      projectId
    };
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, workUpdates: [newUpdate, ...p.workUpdates] } : p));
  };

  const addDocument = (projectId: string, docData: Omit<DocumentItem, 'id' | 'projectId'>) => {
    const newDoc: DocumentItem = {
      ...docData,
      id: `doc-${Date.now()}`,
      projectId
    };
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, documents: [newDoc, ...p.documents] } : p));
  };

  const addPayment = (projectId: string, payData: Omit<PaymentItem, 'id' | 'projectId'>) => {
    const invNum = `INV-D8I-${Math.floor(100000 + Math.random() * 900000)}`;
    const autoInvoiceUrl = `https://decor8india.com/invoices/${invNum}.pdf`;

    const newPay: PaymentItem = {
      ...payData,
      id: `pay-${Date.now()}`,
      projectId,
      invoiceUrl: payData.status === 'Paid' ? autoInvoiceUrl : payData.invoiceUrl,
      paidDate: payData.status === 'Paid' ? (payData.paidDate || new Date().toISOString().split('T')[0]) : payData.paidDate
    };

    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p;

      let updatedDocuments = p.documents;
      if (payData.status === 'Paid') {
        const autoInvoiceDoc: DocumentItem = {
          id: `doc-inv-${Date.now()}`,
          projectId,
          title: `Official Invoice - ${payData.title} (#${invNum})`,
          category: 'Invoice',
          fileUrl: autoInvoiceUrl,
          fileSize: '240 KB',
          uploadDate: newPay.paidDate || new Date().toISOString().split('T')[0]
        };
        updatedDocuments = [autoInvoiceDoc, ...p.documents];
      }

      return {
        ...p,
        payments: [...p.payments, newPay],
        documents: updatedDocuments
      };
    }));
  };

  const updatePaymentStatus = (projectId: string, paymentId: string, status: 'Paid' | 'Pending' | 'Overdue', paidAmount?: number) => {
    const invNum = `INV-D8I-${Math.floor(100000 + Math.random() * 900000)}`;
    const autoInvoiceUrl = `https://decor8india.com/invoices/${invNum}.pdf`;
    const today = new Date().toISOString().split('T')[0];

    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p;

      let targetPayTitle = '';
      let targetPayAmount = 0;

      const updatedPayments = p.payments.map(pay => {
        if (pay.id === paymentId) {
          targetPayTitle = pay.title;
          targetPayAmount = paidAmount !== undefined ? paidAmount : (status === 'Paid' ? pay.amount : pay.paidAmount);
          return {
            ...pay,
            status,
            paidAmount: targetPayAmount,
            paidDate: status === 'Paid' ? (pay.paidDate || today) : pay.paidDate,
            invoiceUrl: status === 'Paid' ? (pay.invoiceUrl || autoInvoiceUrl) : pay.invoiceUrl
          };
        }
        return pay;
      });

      let updatedDocuments = p.documents;
      if (status === 'Paid') {
        const autoInvoiceDoc: DocumentItem = {
          id: `doc-inv-${Date.now()}`,
          projectId,
          title: `Official Invoice - ${targetPayTitle || 'Milestone Payment'} (#${invNum})`,
          category: 'Invoice',
          fileUrl: autoInvoiceUrl,
          fileSize: '240 KB',
          uploadDate: today
        };
        updatedDocuments = [autoInvoiceDoc, ...p.documents];
      }

      return {
        ...p,
        payments: updatedPayments,
        documents: updatedDocuments
      };
    }));
  };

  const sendMessage = (projectId: string, text: string) => {
    if (!currentUser) return;
    const newMsg: MessageItem = {
      id: `msg-${Date.now()}`,
      projectId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentUser.role,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, messages: [...p.messages, newMsg] } : p));
  };

  const addProject = (projData: Omit<Project, 'id'>) => {
    const newProj: Project = {
      ...projData,
      id: `proj-${Date.now()}`
    };
    setProjects(prev => [newProj, ...prev]);
  };

  const updateProject = (id: string, updateData: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updateData } : p));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const addArticle = (artData: Omit<Article, 'id'>) => {
    const newArt: Article = {
      ...artData,
      id: `art-${Date.now()}`
    };
    setArticles(prev => [newArt, ...prev]);
  };

  const updateArticle = (id: string, updateData: Partial<Article>) => {
    setArticles(prev => prev.map(a => a.id === id ? { ...a, ...updateData } : a));
  };

  const deleteArticle = (id: string) => {
    setArticles(prev => prev.filter(a => a.id !== id));
  };

  const addService = (serviceData: Omit<ServiceItem, 'id'>) => {
    const newService: ServiceItem = {
      ...serviceData,
      id: `srv-${Date.now()}`
    };
    setServices(prev => [...prev, newService]);
  };

  const updateService = (id: string, updateData: Partial<ServiceItem>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...updateData } : s));
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const updateServicePrice = (serviceId: string, newPrice: number) => {
    setServices(prev => prev.map(s => s.id === serviceId ? { ...s, startingPrice: newPrice } : s));
  };

  const toggleServiceStatus = (serviceId: string) => {
    setServices(prev => prev.map(s => s.id === serviceId ? { ...s, isActive: !s.isActive } : s));
  };

  const addTeamMember = (memberData: Omit<TeamMember, 'id'>) => {
    const newMember: TeamMember = {
      ...memberData,
      id: `team-${Date.now()}`
    };
    setTeamMembers(prev => [...prev, newMember]);
  };

  const updateTeamMember = (id: string, updateData: Partial<TeamMember>) => {
    setTeamMembers(prev => prev.map(m => m.id === id ? { ...m, ...updateData } : m));
  };

  const deleteTeamMember = (id: string) => {
    setTeamMembers(prev => prev.filter(m => m.id !== id));
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      users,
      bookings,
      projects,
      services,
      articles,
      testimonials,
      teamMembers,
      isBookingOpen,
      setIsBookingOpen,
      selectedServiceForBooking,
      setSelectedServiceForBooking,
      isAuthOpen,
      setIsAuthOpen,
      authMode,
      setAuthMode,
      isEstimatorOpen,
      setIsEstimatorOpen,
      isSiteVisitOpen,
      setIsSiteVisitOpen,
      selectedProjectForSiteVisit,
      setSelectedProjectForSiteVisit,
      login,
      logout,
      submitBooking,
      approveBooking,
      rejectBooking,
      updateProjectProgress,
      addWorkUpdate,
      addDocument,
      addPayment,
      updatePaymentStatus,
      sendMessage,
      addProject,
      updateProject,
      deleteProject,
      addArticle,
      updateArticle,
      deleteArticle,
      addTeamMember,
      updateTeamMember,
      deleteTeamMember,
      addService,
      updateService,
      deleteService,
      updateServicePrice,
      toggleServiceStatus
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
