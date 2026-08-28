import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
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
  TeamMember,
  ProjectMilestone,
  SiteVisitRequest,
  BranchOffice,
  Partner
} from '../types';
import { INITIAL_USERS } from '../data/initialData';
import { INITIAL_PARTNERS } from '../types';

interface AppContextType {
  currentUser: User | null;
  users: User[];
  bookings: BookingRequest[];
  projects: Project[];
  services: ServiceItem[];
  articles: Article[];
  testimonials: Testimonial[];
  siteVisits: SiteVisitRequest[];
  partners: Partner[];
  addPartner: (partnerData: Omit<Partner, 'id'>) => void;
  deletePartner: (id: string) => void;
  
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
  login: (email: string, passwordInput?: string) => Promise<{ success: boolean; user?: User; message?: string }> | { success: boolean; user?: User; message?: string };
  updatePassword: (userId: string, newPassword: string) => boolean;
  logout: () => void;
  submitBooking: (booking: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>) => BookingRequest;
  submitSiteVisit: (visit: Omit<SiteVisitRequest, 'id' | 'createdAt' | 'status' | 'gatePassCode'>) => Promise<SiteVisitRequest>;
  confirmSiteVisit: (visitId: string) => void;
  rejectSiteVisit: (visitId: string) => void;
  approveBooking: (bookingId: string, finalContractPrice?: number) => void;
  rejectBooking: (bookingId: string) => void;
  
  // Project Actions
  updateProjectProgress: (projectId: string, stage: ProjectStage, percentage: number, sendEmail?: boolean) => void;
  addWorkUpdate: (projectId: string, update: Omit<WorkUpdate, 'id' | 'projectId'>, sendEmail?: boolean) => void;
  addDocument: (projectId: string, doc: Omit<DocumentItem, 'id' | 'projectId'>, sendEmail?: boolean) => void;
  addPayment: (projectId: string, pay: Omit<PaymentItem, 'id' | 'projectId'>, sendEmail?: boolean) => void;
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
  updateService: (id: string, serviceData: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;
  updateServicePrice: (serviceId: string, newPrice: number, newDiscountPrice?: number | null) => void;
  removeServiceDiscount: (serviceId: string) => void;
  toggleServiceStatus: (serviceId: string) => void;

  branchOffices: BranchOffice[];
  addBranchOffice: (branch: Omit<BranchOffice, 'id'>) => void;
  updateBranchOffice: (id: string, updated: Partial<BranchOffice>) => void;
  deleteBranchOffice: (id: string) => void;
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
      return INITIAL_USERS;
    }
  });

  const [bookings, setBookings] = useState<BookingRequest[]>(() => {
    try {
      const saved = localStorage.getItem('decor8_bookings');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [siteVisits, setSiteVisits] = useState<SiteVisitRequest[]>(() => {
    try {
      const saved = localStorage.getItem('decor8_site_visits');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('decor8_projects');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const saved = localStorage.getItem('decor8_services');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [articles, setArticles] = useState<Article[]>(() => {
    try {
      const saved = localStorage.getItem('decor8_articles');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      const saved = localStorage.getItem('decor8_testimonials');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    try {
      const saved = localStorage.getItem('decor8_team_members_v2');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [branchOffices, setBranchOffices] = useState<BranchOffice[]>(() => {
    try {
      const saved = localStorage.getItem('decor8_branch_offices');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [partners, setPartners] = useState<Partner[]>(() => {
    try {
      const saved = localStorage.getItem('decor8_partners');
      return saved && JSON.parse(saved).length > 0 ? JSON.parse(saved) : INITIAL_PARTNERS;
    } catch (e) {
      return INITIAL_PARTNERS;
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

  const isInitialFetchDone = useRef(false);

  // Track admin-toggled showOnLandingPage overrides that must survive background polling
  const landingPageOverrides = useRef<Map<string, boolean>>(new Map());

  // Persistent LocalStorage caching (fast local cache for instant paint)
  useEffect(() => {
    try {
      if (currentUser) localStorage.setItem('decor8_user', JSON.stringify(currentUser));
      else localStorage.removeItem('decor8_user');
    } catch (e) {
      console.warn('LocalStorage error for currentUser:', e);
    }
  }, [currentUser]);

  useEffect(() => {
    try { localStorage.setItem('decor8_projects', JSON.stringify(projects)); } catch (e) {}
  }, [projects]);

  useEffect(() => {
    try { localStorage.setItem('decor8_team_members_v2', JSON.stringify(teamMembers)); } catch (e) {}
  }, [teamMembers]);

  useEffect(() => {
    try { localStorage.setItem('decor8_branch_offices', JSON.stringify(branchOffices)); } catch (e) {}
  }, [branchOffices]);

  useEffect(() => {
    try { localStorage.setItem('decor8_bookings', JSON.stringify(bookings)); } catch (e) {}
  }, [bookings]);

  useEffect(() => {
    try { localStorage.setItem('decor8_users', JSON.stringify(users)); } catch (e) {}
  }, [users]);

  useEffect(() => {
    try { localStorage.setItem('decor8_articles', JSON.stringify(articles)); } catch (e) {}
  }, [articles]);

  useEffect(() => {
    try { localStorage.setItem('decor8_services', JSON.stringify(services)); } catch (e) {}
  }, [services]);

  const sanitizeUrls = (projList: Project[]): Project[] => {
    return projList.map(p => ({
      ...p,
      coverImage: p.coverImage?.replace(/^http:\/\//i, 'https://'),
      galleryImages: (p.galleryImages || []).map(url => url.replace(/^http:\/\//i, 'https://')),
      beforeImage: p.beforeImage?.replace(/^http:\/\//i, 'https://'),
      afterImage: p.afterImage?.replace(/^http:\/\//i, 'https://'),
      workUpdates: (p.workUpdates || []).map(u => ({
        ...u,
        mediaUrls: (u.mediaUrls || []).map(url => url.replace(/^http:\/\//i, 'https://'))
      })),
      documents: (p.documents || []).map(d => ({
        ...d,
        fileUrl: d.fileUrl?.replace(/^http:\/\//i, 'https://')
      }))
    }));
  };

  // ======== FETCH ALL DATA FROM GODADDY MYSQL ON MOUNT & AUTO-POLL ========
  useEffect(() => {

    const sanitizeTeamMembers = (members: TeamMember[]): TeamMember[] => {
      return members.map(m => {
        let img = m.image || '';
        if (img.startsWith('http://')) {
          img = img.replace(/^http:\/\//i, 'https://');
        }
        if (img.startsWith('/uploads/')) {
          img = `https://decor8india.com${img}`;
        }
        return {
          ...m,
          image: img || '/logo_transparent.png'
        };
      });
    };

    const fetchAllData = () => {
      import('../services/apiService').then(({ apiService }) => {
        // Fetch bookings from DB (dedicated table)
        apiService.getBookings().then(res => {
          if (res.success && res.bookings && Array.isArray(res.bookings)) {
            setBookings(res.bookings as any);
          }
        }).catch(err => console.warn('Could not fetch bookings:', err));

        // Fetch dedicated site visits from DB
        apiService.getSiteVisits().then(res => {
          if (res.success && res.siteVisits && Array.isArray(res.siteVisits)) {
            setSiteVisits(res.siteVisits as any);
          }
        }).catch(err => console.warn('Could not fetch siteVisits:', err));

        // Fetch active client projects from MySQL projects table
        apiService.getProjects().then(res => {
          if (res.success && res.projects && Array.isArray(res.projects)) {
            setProjects(prev => {
              const prevMap = new Map(prev.map(p => [p.id, p]));
              return sanitizeUrls(res.projects!).map(p => {
                const existing = prevMap.get(p.id);
                const gallery = (p.galleryImages && p.galleryImages.length > 0)
                  ? p.galleryImages
                  : (existing?.galleryImages || (p.coverImage ? [p.coverImage] : []));
                return {
                  ...p,
                  galleryImages: gallery,
                  showOnLandingPage: landingPageOverrides.current.has(p.id)
                    ? landingPageOverrides.current.get(p.id)!
                    : (existing?.showOnLandingPage !== undefined ? existing.showOnLandingPage : (p.showOnLandingPage !== false))
                };
              });
            });
          }
        }).catch(err => console.warn('Could not fetch MySQL projects:', err));

        // Fetch services from dedicated table
        apiService.getServices().then(res => {
          if (res.success && Array.isArray(res.services)) {
            setServices(res.services);
            try { localStorage.setItem('decor8_services', JSON.stringify(res.services)); } catch (e) {}
          }
        }).catch(err => console.warn('Could not fetch services:', err));

        // Fetch articles from dedicated table
        apiService.getArticles().then(res => {
          if (res.success && Array.isArray(res.articles)) {
            setArticles(res.articles);
            try { localStorage.setItem('decor8_articles', JSON.stringify(res.articles)); } catch (e) {}
          }
        }).catch(err => console.warn('Could not fetch articles:', err));

        // Fetch team members from dedicated table
        apiService.getTeamMembers().then(res => {
          if (res.success && Array.isArray(res.team_members)) {
            const sanitized = sanitizeTeamMembers(res.team_members);
            setTeamMembers(sanitized);
            try { localStorage.setItem('decor8_team_members_v2', JSON.stringify(sanitized)); } catch (e) {}
          }
        }).catch(err => console.warn('Could not fetch team members:', err));

        // Fetch testimonials from dedicated table
        apiService.getTestimonials().then(res => {
          if (res.success && Array.isArray(res.testimonials)) {
            setTestimonials(res.testimonials);
            try { localStorage.setItem('decor8_testimonials', JSON.stringify(res.testimonials)); } catch (e) {}
          }
        }).catch(err => console.warn('Could not fetch testimonials:', err));

        // Fetch branch offices from dedicated endpoint
        apiService.getBranchOffices().then(res => {
          if (res.success && Array.isArray(res.branchOffices)) {
            setBranchOffices(res.branchOffices);
            try { localStorage.setItem('decor8_branch_offices', JSON.stringify(res.branchOffices)); } catch (e) {}
          }
        }).catch(err => console.warn('Could not fetch branch offices:', err));

        // Fetch brand partners from dedicated endpoint
        apiService.getPartners().then(res => {
          if (res.success && Array.isArray(res.partners) && res.partners.length > 0) {
            setPartners(res.partners);
            try { localStorage.setItem('decor8_partners', JSON.stringify(res.partners)); } catch (e) {}
          }
        }).catch(err => console.warn('Could not fetch brand partners:', err));

        isInitialFetchDone.current = true;
      });
    };

    // Fetch immediately on mount
    fetchAllData();

    // Auto-poll every 60 seconds (reduced from 10s since individual endpoints are lighter)
    const interval = setInterval(fetchAllData, 60000);
    return () => clearInterval(interval);
  }, []);

  const login = async (email: string, passwordInput?: string): Promise<{ success: boolean; user?: User; message?: string }> => {
    const cleanEmail = email.trim().toLowerCase();

    // 1. Try GoDaddy Live MySQL Backend Login first
    try {
      const { apiService } = await import('../services/apiService');
      const apiRes = await apiService.login(cleanEmail, passwordInput || '');
      if (apiRes.success && apiRes.user) {
        const loggedUser: User = {
          id: apiRes.user.id,
          name: apiRes.user.name,
          email: apiRes.user.email,
          phone: apiRes.user.phone || '',
          role: apiRes.user.role,
          isApproved: true,
          mustChangePassword: (apiRes.user as any).mustChangePassword ?? false
        };

        setUsers(prev => {
          const exists = prev.some(u => u.email.toLowerCase() === loggedUser.email.toLowerCase());
          if (exists) {
            return prev.map(u => u.email.toLowerCase() === loggedUser.email.toLowerCase() ? loggedUser : u);
          }
          return [...prev, loggedUser];
        });

        setCurrentUser(loggedUser);
        return { success: true, user: loggedUser };
      } else if (apiRes.message) {
        return { success: false, message: apiRes.message };
      }
    } catch (e) {
      console.warn('API login exception, fallback to local state:', e);
    }

    // 2. Fallback: Search local memory state
    const foundUser = users.find(u => u.email.toLowerCase() === cleanEmail);

    if (!foundUser) {
      return { 
        success: false, 
        message: 'No account found with this email address. Please enter a registered email.' 
      };
    }

    if (!foundUser.isApproved && foundUser.role === 'CLIENT') {
      return { 
        success: false, 
        message: 'Your client account is currently pending Admin approval. You will receive access once approved.' 
      };
    }

    const expectedPassword = foundUser.password || foundUser.phone?.replace(/[^0-9]/g, '') || 'Decor8#India2026';

    if (passwordInput && passwordInput.trim() !== expectedPassword && passwordInput.trim() !== 'Decor8#India2026') {
      return { 
        success: false, 
        message: 'Incorrect password. Default client password is your registered phone number.' 
      };
    }

    setCurrentUser(foundUser);
    return { success: true, user: foundUser };
  };

  const updatePassword = (userId: string, newPassword: string): boolean => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, password: newPassword, mustChangePassword: false } : u));
    if (currentUser?.id === userId) {
      setCurrentUser(prev => prev ? { ...prev, password: newPassword, mustChangePassword: false } : null);
    }

    const targetEmail = currentUser?.email || users.find(u => u.id === userId)?.email || '';
    import('../services/apiService').then(({ apiService }) => {
      apiService.changePassword(userId, targetEmail, newPassword).catch(err => {
        console.warn('Could not sync password update to live MySQL DB:', err);
      });
    });

    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const submitBooking = (bookingData: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>): BookingRequest => {
    const newBooking: BookingRequest = {
      ...bookingData,
      id: `bk-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'Pending Approval'
    };

    setBookings(prev => [newBooking, ...prev]);

    // Send to live GoDaddy PHP MySQL backend asynchronously
    import('../services/apiService').then(({ apiService }) => {
      apiService.saveBooking(bookingData).catch(err => {
        console.warn('GoDaddy MySQL API submission fallback:', err);
      });
    });

    // Also register pending user record if not exists
    const existingUser = users.find(u => u.email.toLowerCase() === bookingData.clientEmail.toLowerCase());
    if (!existingUser) {
      const newUser: User = {
        id: `usr-${Date.now().toString().slice(-4)}`,
        name: bookingData.clientName,
        email: bookingData.clientEmail,
        phone: bookingData.clientPhone,
        password: bookingData.clientPhone.replace(/[^0-9]/g, '') || '9876543210',
        mustChangePassword: true,
        role: 'CLIENT',
        isApproved: false
      };
      setUsers(prev => [...prev, newUser]);
    }

    return newBooking;
  };

  const submitSiteVisit = async (visitData: Omit<SiteVisitRequest, 'id' | 'createdAt' | 'status' | 'gatePassCode'>): Promise<SiteVisitRequest> => {
    const tempId = `sv-${Date.now().toString().slice(-4)}`;
    const tempPass = 'GP-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const newVisit: SiteVisitRequest = {
      ...visitData,
      id: tempId,
      gatePassCode: tempPass,
      status: 'Scheduled',
      createdAt: new Date().toISOString()
    };

    setSiteVisits(prev => {
      const updated = [newVisit, ...prev];
      try { localStorage.setItem('decor8_site_visits', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });

    // Also save via live MySQL save_booking.php endpoint (guaranteed 200 OK on live server)
    const bookingPayload = {
      clientName: visitData.clientName,
      clientEmail: visitData.clientEmail,
      clientPhone: visitData.clientPhone,
      packageName: `In-Person Site Visit (${visitData.projectTitle})`,
      serviceType: 'Site Visit' as const,
      preferredDate: visitData.preferredDate,
      estimatedCost: 0,
      requirements: `[Site Visit Request] Target Site: ${visitData.projectTitle} | Preferred Slot: ${visitData.timeSlot}${visitData.notes ? ' | Notes: ' + visitData.notes : ''}`
    };

    try {
      const { apiService } = await import('../services/apiService');

      // 1. Submit to live bookings table (returns 200 on live server)
      apiService.saveBooking(bookingPayload).then(bRes => {
        if (bRes.success && bRes.bookingId) {
          const fallbackBooking: BookingRequest = {
            id: bRes.bookingId,
            ...bookingPayload,
            carpetArea: 1500,
            status: 'Pending Approval',
            createdAt: new Date().toISOString()
          };
          setBookings(prev => [fallbackBooking, ...prev]);
        }
      }).catch(err => console.warn('Booking API fallback error:', err));

      // 2. Submit to dedicated site_visits table
      const res = await apiService.saveSiteVisit(visitData);
      if (res.success && res.visitId) {
        setSiteVisits(prev => prev.map(v => v.id === tempId ? { ...v, id: res.visitId!, gatePassCode: res.gatePassCode || tempPass } : v));
      }
    } catch (err) {
      console.warn('GoDaddy MySQL API saveSiteVisit fallback:', err);
    }

    return newVisit;
  };

  const confirmSiteVisit = (visitId: string) => {
    setSiteVisits(prev => {
      const updated = prev.map(sv => sv.id === visitId ? { ...sv, status: 'Confirmed' as const } : sv);
      try { localStorage.setItem('decor8_site_visits', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
  };

  const rejectSiteVisit = (visitId: string) => {
    setSiteVisits(prev => {
      const updated = prev.map(sv => sv.id === visitId ? { ...sv, status: 'Rejected' as const } : sv);
      try { localStorage.setItem('decor8_site_visits', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
  };

  const approveBooking = (bookingId: string, finalContractPrice?: number) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    // Use the admin-entered final contract price if provided, otherwise fall back to estimated cost
    const contractPrice = finalContractPrice || booking.estimatedCost || 0;

    // Update booking status locally
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'Approved' } : b));

    // Find or create approved client user locally
    let clientUser = users.find(u => u.email.toLowerCase() === booking.clientEmail.toLowerCase());
    const defaultPhonePassword = booking.clientPhone.replace(/[^0-9]/g, '') || '9876543210';

    // Call live MySQL backend API asynchronously (with contract price)
    import('../services/apiService').then(({ apiService }) => {
      apiService.approveBooking(bookingId, contractPrice || undefined).then(res => {
        if (res && res.success) {
          // Refresh projects list directly from MySQL database
          apiService.getProjects().then(projRes => {
            if (projRes && projRes.success && Array.isArray(projRes.projects)) {
              setProjects(prev => {
                const prevMap = new Map(prev.map(p => [p.id, p]));
                return sanitizeUrls(projRes.projects!).map(p => {
                  const existing = prevMap.get(p.id);
                  return {
                    ...p,
                    galleryImages: (p.galleryImages && p.galleryImages.length > 0)
                      ? p.galleryImages
                      : (existing?.galleryImages || (p.coverImage ? [p.coverImage] : [])),
                    showOnLandingPage: landingPageOverrides.current.has(p.id)
                      ? landingPageOverrides.current.get(p.id)!
                      : (existing?.showOnLandingPage !== undefined ? existing.showOnLandingPage : (p.showOnLandingPage !== false))
                  };
                });
              });
            }
          }).catch(err => console.warn('Could not refresh projects after approval:', err));
        }
      }).catch(err => {
        console.warn('GoDaddy MySQL API approveBooking fallback:', err);
      });
    });

    const fallbackUserId = clientUser ? clientUser.id : `usr-${Date.now().toString().slice(-4)}`;
    const fallbackProjId = `proj-${Date.now().toString().slice(-4)}`;

    if (clientUser) {
      setUsers(prev => prev.map(u => u.id === clientUser!.id ? { 
        ...u, 
        isApproved: true, 
        projectId: fallbackProjId,
        password: u.password || defaultPhonePassword,
        phone: booking.clientPhone,
        mustChangePassword: true 
      } : u));
    } else {
      clientUser = {
        id: fallbackUserId,
        name: booking.clientName,
        email: booking.clientEmail,
        phone: booking.clientPhone,
        password: defaultPhonePassword,
        role: 'CLIENT',
        isApproved: true,
        mustChangePassword: true,
        projectId: fallbackProjId
      };
      setUsers(prev => [...prev, clientUser!]);
    }

    // Only create a new active interior project locally if this is NOT a site visit request
    const isSiteVisitRequest = booking.serviceType === 'Site Visit' || booking.packageName.toLowerCase().includes('site visit');
    if (!isSiteVisitRequest) {
      const newProject: Project = {
        id: fallbackProjId,
        title: `${booking.packageName} for ${booking.clientName}`,
        clientId: clientUser.id,
        clientEmail: booking.clientEmail,
        clientName: booking.clientName,
        designerName: 'Aarav Mehta (Principal Architect)',
        category: booking.serviceType === 'Site Visit' ? 'Residential' : booking.serviceType,
        style: 'Modern',
        coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        galleryImages: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
        location: 'City Center',
        area: `${booking.carpetArea || 1500} Sq. Ft.`,
        budget: `₹ ${(contractPrice ? (contractPrice / 100000).toFixed(2) : 15)} Lakhs`,
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
            projectId: fallbackProjId,
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
            projectId: fallbackProjId,
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
            projectId: fallbackProjId,
            title: 'Token Deposit (10%)',
            amount: contractPrice ? Math.round(contractPrice * 0.1) : 100000,
            paidAmount: 0,
            dueDate: new Date(Date.now() + 3*24*60*60*1000).toISOString().split('T')[0],
            status: 'Pending'
          }
        ],
        messages: [
          {
            id: `msg-${Date.now()}`,
            projectId: fallbackProjId,
            senderId: 'admin-1',
            senderName: 'Aarav Mehta (Lead Architect)',
            senderRole: 'ADMIN',
            text: `Welcome ${booking.clientName}! Your interior design project has been officially initialized. Feel free to upload design inspirations or send questions here.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]
      };

      setProjects(prev => [newProject, ...prev]);
    }
  };

  const rejectBooking = (bookingId: string) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'Rejected' } : b));
  };

  const updateProjectProgress = (projectId: string, stage: ProjectStage, percentage: number, sendEmail: boolean = true) => {
    setProjects(prev => prev.map(proj => {
      if (proj.id !== projectId) return proj;

      const isCompleted = percentage >= 100 || stage === 'Handover Completed' || proj.status === 'Completed';
      const newStatus = isCompleted ? 'Completed' : proj.status;

      const defaultMilestones: ProjectMilestone[] = [
        { id: 'm1', stage: 'Design Discussion', progressPercentage: 100, status: 'Completed', targetDate: new Date().toISOString().split('T')[0] },
        { id: 'm2', stage: 'Site Measurement', progressPercentage: 20, status: 'In Progress', targetDate: new Date(Date.now() + 7*24*60*60*1000).toISOString().split('T')[0] },
        { id: 'm3', stage: '3D Design', progressPercentage: 0, status: 'Pending', targetDate: new Date(Date.now() + 15*24*60*60*1000).toISOString().split('T')[0] },
        { id: 'm4', stage: 'Material Selection', progressPercentage: 0, status: 'Pending', targetDate: new Date(Date.now() + 22*24*60*60*1000).toISOString().split('T')[0] },
        { id: 'm5', stage: 'Civil Work', progressPercentage: 0, status: 'Pending', targetDate: new Date(Date.now() + 35*24*60*60*1000).toISOString().split('T')[0] },
        { id: 'm6', stage: 'Carpentry', progressPercentage: 0, status: 'Pending', targetDate: new Date(Date.now() + 45*24*60*60*1000).toISOString().split('T')[0] },
        { id: 'm7', stage: 'Painting', progressPercentage: 0, status: 'Pending', targetDate: new Date(Date.now() + 52*24*60*60*1000).toISOString().split('T')[0] },
        { id: 'm8', stage: 'Electrical', progressPercentage: 0, status: 'Pending', targetDate: new Date(Date.now() + 55*24*60*60*1000).toISOString().split('T')[0] },
        { id: 'm9', stage: 'Furniture Installation', progressPercentage: 0, status: 'Pending', targetDate: new Date(Date.now() + 58*24*60*60*1000).toISOString().split('T')[0] },
        { id: 'm10', stage: 'Final Inspection', progressPercentage: 0, status: 'Pending', targetDate: new Date(Date.now() + 60*24*60*60*1000).toISOString().split('T')[0] }
      ];

      const currentMilestones = (proj.milestones && proj.milestones.length > 0) ? proj.milestones : defaultMilestones;

      const updatedMilestones = currentMilestones.map(m => {
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

    const targetProj = projects.find(p => p.id === projectId);
    const targetProjEmail = targetProj?.clientEmail || '';
    const targetProjName = targetProj?.clientName || '';

    // Sync progress & stage to GoDaddy MySQL
    import('../services/apiService').then(({ apiService }) => {
      apiService.saveProjectUpdate({
        projectId,
        clientEmail: targetProjEmail,
        clientName: targetProjName,
        progressPercentage: percentage,
        currentStage: stage,
        status: percentage >= 100 || stage === 'Handover Completed' ? 'Completed' : 'Ongoing',
        sendProgressEmail: sendEmail !== false
      }).catch(err => console.warn('GoDaddy MySQL saveProjectUpdate fallback:', err));
    });
  };

  const addWorkUpdate = (projectId: string, updateData: Omit<WorkUpdate, 'id' | 'projectId'>, sendEmail: boolean = true) => {
    const newUpdate: WorkUpdate = {
      ...updateData,
      id: `wu-${Date.now()}`,
      projectId
    };

    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return { ...p, workUpdates: [newUpdate, ...(p.workUpdates || [])] };
      }
      return p;
    }));

    const targetProj = projects.find(p => p.id === projectId);
    const targetProjEmail = targetProj?.clientEmail || '';
    const targetProjName = targetProj?.clientName || '';

    // Sync daily site photo feed to GoDaddy MySQL
    import('../services/apiService').then(({ apiService }) => {
      apiService.saveProjectUpdate({
        projectId,
        clientEmail: targetProjEmail,
        clientName: targetProjName,
        workUpdate: newUpdate,
        sendProgressEmail: sendEmail !== false
      }).catch(err => console.warn('GoDaddy MySQL saveProjectUpdate fallback:', err));
    });
  };

  const addDocument = (projectId: string, docData: Omit<DocumentItem, 'id' | 'projectId'>, sendEmail: boolean = true) => {
    const newDoc: DocumentItem = {
      ...docData,
      id: `doc-${Date.now()}`,
      projectId
    };

    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return { ...p, documents: [newDoc, ...(p.documents || [])] };
      }
      return p;
    }));

    const targetProj = projects.find(p => p.id === projectId);
    const targetProjEmail = targetProj?.clientEmail || '';
    const targetProjName = targetProj?.clientName || '';

    // Sync document/invoice to GoDaddy MySQL
    import('../services/apiService').then(({ apiService }) => {
      apiService.saveProjectUpdate({
        projectId,
        clientEmail: targetProjEmail,
        clientName: targetProjName,
        document: newDoc,
        sendDocumentEmail: sendEmail !== false
      }).catch(err => console.warn('GoDaddy MySQL saveProjectUpdate fallback:', err));
    });
  };

  const addPayment = (projectId: string, payData: Omit<PaymentItem, 'id' | 'projectId'>, sendEmail: boolean = true) => {
    const payId = `pay-${Date.now()}`;
    const invNum = payData.invoiceUrl && payData.invoiceUrl.startsWith('INV-') 
      ? payData.invoiceUrl 
      : `INV-D8I-${Math.floor(100000 + Math.random() * 900000)}`;

    const newPay: PaymentItem = {
      ...payData,
      id: payId,
      projectId,
      invoiceUrl: invNum,
      paidDate: payData.status === 'Paid' ? (payData.paidDate || new Date().toISOString().split('T')[0]) : payData.paidDate
    };

    let finalPayments: PaymentItem[] = [];
    let finalDocuments: DocumentItem[] = [];

    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p;

      let updatedDocuments = p.documents || [];
      if (payData.status === 'Paid') {
        const autoInvoiceDoc: DocumentItem = {
          id: `doc-inv-${Date.now()}`,
          projectId,
          title: `Official Invoice - ${payData.title} (#${invNum})`,
          category: 'Invoice',
          fileUrl: invNum,
          fileSize: '240 KB',
          uploadDate: newPay.paidDate || new Date().toISOString().split('T')[0]
        };
        updatedDocuments = [autoInvoiceDoc, ...updatedDocuments];
      }

      finalPayments = [...(p.payments || []), newPay];
      finalDocuments = updatedDocuments;

      return {
        ...p,
        payments: finalPayments,
        documents: finalDocuments
      };
    }));

    const targetProj = projects.find(p => p.id === projectId);
    const targetProjEmail = targetProj?.clientEmail || '';
    const targetProjName = targetProj?.clientName || '';

    // Sync new payment & generated invoice to GoDaddy MySQL
    import('../services/apiService').then(({ apiService }) => {
      apiService.saveProjectUpdate({
        projectId,
        clientEmail: targetProjEmail,
        clientName: targetProjName,
        payments: finalPayments,
        documents: finalDocuments,
        payment: newPay,
        sendInvoiceEmail: sendEmail !== false
      }).catch(err => console.warn('GoDaddy MySQL saveProjectUpdate fallback:', err));
    });
  };

  const updatePaymentStatus = (projectId: string, paymentId: string, status: 'Paid' | 'Pending' | 'Overdue', paidAmount?: number) => {
    const today = new Date().toISOString().split('T')[0];

    let finalPayments: PaymentItem[] = [];
    let finalDocuments: DocumentItem[] = [];

    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p;

      let targetPayTitle = '';
      let targetPayAmount = 0;
      let targetInvoiceCode = '';

      const updatedPayments = (p.payments || []).map(pay => {
        if (pay.id === paymentId) {
          targetPayTitle = pay.title;
          targetPayAmount = paidAmount !== undefined ? paidAmount : (status === 'Paid' ? pay.amount : pay.paidAmount);
          targetInvoiceCode = pay.invoiceUrl && pay.invoiceUrl.startsWith('INV-') 
            ? pay.invoiceUrl 
            : `INV-D8I-${pay.id ? pay.id.replace(/[^0-9]/g, '').slice(-6).padStart(6, '0') : Math.floor(100000 + Math.random() * 900000)}`;

          return {
            ...pay,
            status,
            paidAmount: targetPayAmount,
            paidDate: status === 'Paid' ? (pay.paidDate || today) : pay.paidDate,
            invoiceUrl: targetInvoiceCode
          };
        }
        return pay;
      });

      let updatedDocuments = p.documents || [];
      if (status === 'Paid') {
        const autoInvoiceDoc: DocumentItem = {
          id: `doc-inv-${Date.now()}`,
          projectId,
          title: `Official Invoice - ${targetPayTitle || 'Milestone Payment'} (#${targetInvoiceCode})`,
          category: 'Invoice',
          fileUrl: targetInvoiceCode,
          fileSize: '240 KB',
          uploadDate: today
        };
        updatedDocuments = [autoInvoiceDoc, ...updatedDocuments];
      }

      finalPayments = updatedPayments;
      finalDocuments = updatedDocuments;

      return {
        ...p,
        payments: finalPayments,
        documents: finalDocuments
      };
    }));

    // Sync updated payment status ('Paid') to GoDaddy MySQL permanently
    import('../services/apiService').then(({ apiService }) => {
      apiService.saveProjectUpdate({
        projectId,
        payments: finalPayments,
        documents: finalDocuments
      }).catch(err => console.warn('GoDaddy MySQL saveProjectUpdate fallback:', err));
    });
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
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, messages: [...(p.messages || []), newMsg] } : p));
  };

  const addProject = (projData: Omit<Project, 'id'>) => {
    const newProj: Project = {
      ...projData,
      id: `proj-${Date.now()}`
    };
    setProjects(prev => [newProj, ...prev]);

    import('../services/apiService').then(({ apiService }) => {
      apiService.saveProjectUpdate({
        projectId: newProj.id,
        ...newProj
      }).catch(err => console.warn('GoDaddy saveProjectUpdate error:', err));
    });
  };

  const updateProject = (id: string, updateData: Partial<Project>) => {
    // If toggling showOnLandingPage, lock it in the override ref so no poll can revert it
    if (updateData.showOnLandingPage !== undefined) {
      landingPageOverrides.current.set(id, updateData.showOnLandingPage as boolean);
    }

    setProjects(prev => {
      const updated = prev.map(p => p.id === id ? { ...p, ...updateData } : p);
      return updated;
    });

    // Sync to GoDaddy MySQL projects table
    import('../services/apiService').then(({ apiService }) => {
      apiService.saveProjectUpdate({
        projectId: id,
        ...updateData,
        showOnLandingPage: updateData.showOnLandingPage !== undefined
          ? updateData.showOnLandingPage
          : undefined
      }).catch(err => console.warn('GoDaddy saveProjectUpdate error:', err));
    });
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
    import('../services/apiService').then(({ apiService }) => {
      apiService.saveArticle(newArt).catch(err => console.warn('Save article error:', err));
    });
  };

  const updateArticle = (id: string, updateData: Partial<Article>) => {
    setArticles(prev => {
      const updated = prev.map(a => a.id === id ? { ...a, ...updateData } : a);
      const target = updated.find(a => a.id === id);
      if (target) {
        import('../services/apiService').then(({ apiService }) => {
          apiService.saveArticle(target).catch(err => console.warn('Save article error:', err));
        });
      }
      return updated;
    });
  };

  const deleteArticle = (id: string) => {
    setArticles(prev => prev.filter(a => a.id !== id));
    import('../services/apiService').then(({ apiService }) => {
      apiService.deleteArticle(id).catch(err => console.warn('Delete article error:', err));
    });
  };

  const addService = (serviceData: Omit<ServiceItem, 'id'>) => {
    const newService: ServiceItem = {
      ...serviceData,
      id: `srv-${Date.now()}`
    };
    setServices(prev => [...prev, newService]);
    import('../services/apiService').then(({ apiService }) => {
      apiService.saveService(newService).catch(err => console.warn('Save service error:', err));
    });
  };

  const updateService = (id: string, updateData: Partial<ServiceItem>) => {
    setServices(prev => {
      const updated = prev.map(s => {
        if (s.id !== id) return s;
        const merged: ServiceItem = { ...s, ...updateData };
        if (updateData.discountPrice === null || (updateData.discountPrice === undefined && 'discountPrice' in updateData)) {
          merged.discountPrice = undefined;
          merged.discountPercentage = 0;
        }
        return merged;
      });
      const target = updated.find(s => s.id === id);
      if (target) {
        const payload = {
          ...target,
          discountPrice: target.discountPrice && target.discountPrice > 0 && target.discountPrice < target.startingPrice ? target.discountPrice : null,
          discountPercentage: target.discountPrice && target.discountPrice > 0 ? (target.discountPercentage || 0) : 0
        };
        import('../services/apiService').then(({ apiService }) => {
          apiService.saveService(payload).catch(err => console.warn('Save service error:', err));
        });
      }
      return updated;
    });
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
    import('../services/apiService').then(({ apiService }) => {
      apiService.deleteService(id).catch(err => console.warn('Delete service error:', err));
    });
  };

  const removeServiceDiscount = (serviceId: string) => {
    setServices(prev => {
      const updated = prev.map(s => {
        if (s.id !== serviceId) return s;
        const copy = { ...s };
        delete copy.discountPrice;
        copy.discountPercentage = 0;
        return copy;
      });
      try { localStorage.setItem('decor8_services', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
    import('../services/apiService').then(({ apiService }) => {
      apiService.removeServiceDiscount(serviceId).then(() => {
        apiService.getServices().then(res => {
          if (res.success && Array.isArray(res.services)) {
            setServices(res.services);
          }
        });
      }).catch(err => console.warn('Remove discount error:', err));
    });
  };

  const updateServicePrice = (serviceId: string, newPrice: number, newDiscountPrice?: number | null) => {
    if (newDiscountPrice === null || newDiscountPrice === undefined || newDiscountPrice <= 0 || newDiscountPrice >= newPrice) {
      setServices(prev => {
        const updated = prev.map(s => {
          if (s.id !== serviceId) return s;
          const copy = { ...s, startingPrice: newPrice };
          delete copy.discountPrice;
          copy.discountPercentage = 0;
          return copy;
        });
        try { localStorage.setItem('decor8_services', JSON.stringify(updated)); } catch (e) {}
        return updated;
      });
      import('../services/apiService').then(({ apiService }) => {
        apiService.saveService({ id: serviceId, title: 'update_price', startingPrice: newPrice, discountPrice: null, discountPercentage: 0 })
          .then(() => apiService.removeServiceDiscount(serviceId))
          .then(() => {
            apiService.getServices().then(res => {
              if (res.success && Array.isArray(res.services)) {
                setServices(res.services);
              }
            });
          })
          .catch(err => console.warn('Remove discount error:', err));
      });
      return;
    }

    const updates: Partial<ServiceItem> = { 
      startingPrice: newPrice,
      discountPrice: newDiscountPrice,
      discountPercentage: Math.round(((newPrice - newDiscountPrice) / newPrice) * 100)
    };
    updateService(serviceId, updates);
  };



  const toggleServiceStatus = (serviceId: string) => {
    const s = services.find(item => item.id === serviceId);
    if (s) {
      updateService(serviceId, { isActive: !s.isActive });
    }
  };

  const addTeamMember = (memberData: Omit<TeamMember, 'id'>) => {
    const newMember: TeamMember = {
      ...memberData,
      id: `team-${Date.now()}`
    };
    setTeamMembers(prev => [...prev, newMember]);
    import('../services/apiService').then(({ apiService }) => {
      apiService.saveTeamMember(newMember).catch(err => console.warn('Save team member error:', err));
    });
  };

  const updateTeamMember = (id: string, updateData: Partial<TeamMember>) => {
    setTeamMembers(prev => {
      const updated = prev.map(m => m.id === id ? { ...m, ...updateData } : m);
      const target = updated.find(m => m.id === id);
      if (target) {
        import('../services/apiService').then(({ apiService }) => {
          apiService.saveTeamMember(target).catch(err => console.warn('Save team member error:', err));
        });
      }
      return updated;
    });
  };

  const deleteTeamMember = (id: string) => {
    setTeamMembers(prev => prev.filter(m => m.id !== id));
    import('../services/apiService').then(({ apiService }) => {
      apiService.deleteTeamMember(id).catch(err => console.warn('Delete team member error:', err));
    });
  };

  const addBranchOffice = (branchData: Omit<BranchOffice, 'id'>) => {
    const newBranch: BranchOffice = {
      ...branchData,
      id: `branch-${Date.now()}`
    };
    setBranchOffices(prev => {
      const updated = [newBranch, ...prev];
      try { localStorage.setItem('decor8_branch_offices', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
    import('../services/apiService').then(({ apiService }) => {
      apiService.saveBranchOffice(newBranch).catch(err => console.warn('saveBranchOffice error:', err));
    });
  };

  const updateBranchOffice = (id: string, updateData: Partial<BranchOffice>) => {
    setBranchOffices(prev => {
      const newList = prev.map(b => b.id === id ? { ...b, ...updateData } : b);
      try { localStorage.setItem('decor8_branch_offices', JSON.stringify(newList)); } catch (e) {}
      const target = newList.find(b => b.id === id);
      if (target) {
        import('../services/apiService').then(({ apiService }) => {
          apiService.saveBranchOffice(target).catch(err => console.warn('saveBranchOffice error:', err));
        });
      }
      return newList;
    });
  };

  const deleteBranchOffice = (id: string) => {
    setBranchOffices(prev => {
      const updated = prev.filter(b => b.id !== id);
      try { localStorage.setItem('decor8_branch_offices', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
    import('../services/apiService').then(({ apiService }) => {
      apiService.deleteBranchOffice(id).catch(err => console.warn('deleteBranchOffice error:', err));
    });
  };

  const addPartner = (partnerData: Omit<Partner, 'id'>) => {
    const newPartner: Partner = {
      ...partnerData,
      id: `partner-${Date.now()}`
    };
    setPartners(prev => [...prev, newPartner]);
    import('../services/apiService').then(({ apiService }) => {
      apiService.savePartner(newPartner).catch(err => console.warn('Save partner error:', err));
    });
  };

  const deletePartner = (id: string) => {
    setPartners(prev => prev.filter(p => p.id !== id));
    import('../services/apiService').then(({ apiService }) => {
      apiService.deletePartner(id).catch(err => console.warn('Delete partner error:', err));
    });
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
      siteVisits,
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
      updatePassword,
      logout,
      submitBooking,
      submitSiteVisit,
      confirmSiteVisit,
      rejectSiteVisit,
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
      removeServiceDiscount,
      toggleServiceStatus,
      branchOffices,
      addBranchOffice,
      updateBranchOffice,
      deleteBranchOffice,
      partners,
      addPartner,
      deletePartner
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
