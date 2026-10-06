// Google Analytics 4 (GA4) Tracking & Performance Analytics Engine for Decor8 India

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

export interface AnalyticsEventRecord {
  id: string;
  eventName: string;
  timestamp: string;
  params: Record<string, any>;
}

const LOCAL_EVENTS_KEY = 'decor8_recent_analytics_events';
let isGA4Initialized = false;
let activeMeasurementId: string | null = null;

// Helper: Record event locally for Admin Dashboard Live Stream
export const recordLocalAnalyticsEvent = (eventName: string, params: Record<string, any> = {}) => {
  try {
    const raw = localStorage.getItem(LOCAL_EVENTS_KEY);
    const events: AnalyticsEventRecord[] = raw ? JSON.parse(raw) : [];
    
    const newRecord: AnalyticsEventRecord = {
      id: `ev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      eventName,
      timestamp: new Date().toISOString(),
      params: {
        path: window.location.pathname,
        ...params,
      }
    };

    // Keep the most recent 100 events
    events.unshift(newRecord);
    if (events.length > 100) events.pop();

    localStorage.setItem(LOCAL_EVENTS_KEY, JSON.stringify(events));

    // Dispatch custom event for real-time admin dashboard update
    window.dispatchEvent(new CustomEvent('decor8_analytics_event', { detail: newRecord }));
  } catch (err) {
    // Ignore storage quota errors
  }
};

export const getLocalAnalyticsEvents = (): AnalyticsEventRecord[] => {
  try {
    const raw = localStorage.getItem(LOCAL_EVENTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

/**
 * Initialize Google Analytics 4 with the given Measurement ID (e.g., 'G-XXXXXXXXXX')
 */
export const initGA4 = (measurementId: string): boolean => {
  if (!measurementId || typeof window === 'undefined') return false;

  const cleanId = measurementId.trim().toUpperCase();
  if (!cleanId.startsWith('G-')) {
    console.warn('[GA4] Warning: Measurement ID must start with "G-". Received:', cleanId);
    return false;
  }

  activeMeasurementId = cleanId;

  // Avoid duplicate script tag injection
  if (!document.getElementById('ga4-tag-manager-script')) {
    const script = document.createElement('script');
    script.id = 'ga4-tag-manager-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${cleanId}`;
    document.head.appendChild(script);
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', cleanId, {
    send_page_view: false, // Page views sent manually via React Router
    cookie_flags: 'SameSite=None;Secure',
  });

  isGA4Initialized = true;
  console.log(`[GA4] Google Analytics 4 connected with Stream ID: ${cleanId}`);
  return true;
};

/**
 * Track Page Views in Single Page Application (SPA) on Route Change
 */
export const trackPageView = (path: string, pageTitle?: string) => {
  const title = pageTitle || document.title || 'Decor8 India';
  
  if (isGA4Initialized && window.gtag && activeMeasurementId) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title,
      page_location: window.location.href,
    });
  }

  recordLocalAnalyticsEvent('page_view', { path, title });
};

/**
 * Track Custom Business Conversion Events
 */
export const trackEvent = (eventName: string, params: Record<string, any> = {}) => {
  if (isGA4Initialized && window.gtag) {
    window.gtag('event', eventName, params);
  }

  recordLocalAnalyticsEvent(eventName, params);
};

export const getActiveMeasurementId = (): string | null => activeMeasurementId;
export const isGATrackingActive = (): boolean => isGA4Initialized;
