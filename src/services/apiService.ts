// Decor8 India - Live Backend API Integration Service
// Points to your live backend on GoDaddy / production domain

const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'https://decor8india.vercel.app/api' // Fallback for local testing
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

  // Save Booking Endpoint
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
  }
};
