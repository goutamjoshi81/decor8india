// Decor8 India - Live Backend API Integration Service
// Points to your live backend on GoDaddy / production domain

const API_BASE_URL = window.location.hostname === 'localhost'
  ? 'https://decor8india.com/api' // Fallback for local testing against live GoDaddy backend
  : `${window.location.origin}/api`;

export interface UserPayload {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'ADMIN' | 'CLIENT';
}

export const apiService = {
  // Login Endpoint
  async login(email: string, password: string): Promise<{ success: boolean; user?: UserPayload; message?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/login.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.warn('Backend API login error, falling back to local session:', error);
      return { success: false, message: 'Server connection error.' };
    }
  },

  // Registration Endpoint
  async register(name: string, email: string, password: string, phone?: string): Promise<{ success: boolean; user?: UserPayload; message?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/register.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone })
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.warn('Backend API register error:', error);
      return { success: false, message: 'Server connection error.' };
    }
  },

  // Save Booking Endpoint (Saves to 'bookings' table)
  async saveBooking(bookingData: any): Promise<{ success: boolean; bookingId?: string; message?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/save_booking.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.warn('Backend API saveBooking error:', error);
      return { success: false, message: 'Server connection error.' };
    }
  },

  // Save Site Visit Endpoint (Saves to dedicated 'site_visits' table)
  async saveSiteVisit(visitData: any): Promise<{ success: boolean; visitId?: string; gatePassCode?: string; message?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/save_site_visit.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(visitData)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.warn('Backend API saveSiteVisit error:', error);
      return { success: false, message: 'Server connection error.' };
    }
  },

  // Fetch Site Visits Endpoint (Loads live MySQL site_visits in Admin panel)
  async getSiteVisits(): Promise<{ success: boolean; siteVisits?: any[]; message?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/get_site_visits.php`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.warn('Backend API getSiteVisits error:', error);
      return { success: false, message: 'Server connection error.' };
    }
  },

  // Approve Booking Endpoint (Transfers client to 'users' table)
  async approveBooking(bookingId: string): Promise<{ success: boolean; user?: any; message?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/approve_booking.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId })
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.warn('Backend API approveBooking error:', error);
      return { success: false, message: 'Server connection error.' };
    }
  },

  // Fetch All Bookings Endpoint (Loads live MySQL bookings in Admin panel)
  async getBookings(): Promise<{ success: boolean; bookings?: any[]; message?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/get_bookings.php`);
      const data = await response.json();
      if (data.success && Array.isArray(data.bookings)) {
        data.bookings = data.bookings.map((b: any) => ({
          ...b,
          clientName: b.clientName || b.client_name || 'Client',
          clientEmail: b.clientEmail || b.client_email || 'No email',
          clientPhone: b.clientPhone || b.client_phone || 'No phone',
          serviceType: b.serviceType || b.service_type || 'Residential',
          packageName: b.packageName || b.package_name || 'Consultation Request',
          preferredDate: b.preferredDate || b.preferred_date || '',
          floorPlanUrl: b.floorPlanUrl || b.floor_plan_url || undefined,
          estimatedCost: parseFloat(b.estimatedCost || b.estimated_cost || 0),
          isEmiRequested: Boolean(b.isEmiRequested || b.is_emi_requested),
          createdAt: b.createdAt || b.created_at || new Date().toISOString()
        }));
      }
      return data;
    } catch (error) {
      console.warn('Backend API getBookings error:', error);
      return { success: false, message: 'Server connection error.' };
    }
  },

  // Change Password Endpoint (Updates password_hash in 'users' table)
  async changePassword(userId: string, email: string, newPassword: string): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/change_password.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, email, newPassword })
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.warn('Backend API changePassword error:', error);
      return { success: false, message: 'Server connection error.' };
    }
  },

  // Direct Server File & Photo Upload Endpoint (Saves to GoDaddy /uploads/ directory)
  async uploadFile(file: File): Promise<{ success: boolean; fileUrl?: string; fileName?: string; message?: string }> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${API_BASE_URL}/upload_file.php`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.warn('Backend API uploadFile error:', error);
      return { success: false, message: 'Server connection error during upload.' };
    }
  },

  // Get Projects & Site Updates from GoDaddy MySQL
  async getProjects(clientEmail?: string): Promise<{ success: boolean; projects?: any[]; message?: string }> {
    try {
      const url = clientEmail
        ? `${API_BASE_URL}/get_projects.php?clientEmail=${encodeURIComponent(clientEmail)}`
        : `${API_BASE_URL}/get_projects.php`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.warn('Backend API getProjects error:', error);
      return { success: false, message: 'Server connection error.' };
    }
  },

  // Save Project Progress, Work Updates & Documents to GoDaddy MySQL
  async saveProjectUpdate(payload: any): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/save_project_update.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.warn('Backend API saveProjectUpdate error:', error);
      return { success: false, message: 'Server connection error.' };
    }
  },

  // Generic CMS Data Save (portfolio, services, articles, team, etc.)
  async saveCmsData(key: string, value: any): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/save_cms_data.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value })
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.warn(`Backend API saveCmsData(${key}) error:`, error);
      return { success: false, message: 'Server connection error.' };
    }
  },

  // Generic CMS Data Fetch (portfolio, services, articles, team, etc.)
  async getCmsData(key?: string): Promise<{ success: boolean; data?: any; value?: any; message?: string }> {
    try {
      const url = key
        ? `${API_BASE_URL}/get_cms_data.php?key=${encodeURIComponent(key)}`
        : `${API_BASE_URL}/get_cms_data.php`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.warn(`Backend API getCmsData(${key}) error:`, error);
      return { success: false, message: 'Server connection error.' };
    }
  },

  // Fetch Live Instagram Feed Endpoint
  async getInstagramFeed(): Promise<{ success: boolean; username?: string; followers?: string; posts_count?: string; posts?: any[] }> {
    try {
      const response = await fetch(`${API_BASE_URL}/get_instagram_feed.php`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.warn('Backend API getInstagramFeed error:', error);
      return { success: false };
    }
  }
};
