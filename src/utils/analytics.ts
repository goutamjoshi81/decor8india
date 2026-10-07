// Google Analytics 4 (GA4) Tracking & Performance Analytics Engine for Decor8 India

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

import { apiService } from '../services/apiService';

export interface AnalyticsEventRecord {
  id: string;
  eventName: string;
  timestamp: string;
  params: Record<string, any>;
}

const LOCAL_EVENTS_KEY = 'decor8_recent_analytics_events';
let isGA4Initialized = typeof window !== 'undefined' && typeof (window as any).gtag === 'function';
let activeMeasurementId: string | null = 'G-E7KJ76JHFP';
let lastTrackedPath: string = typeof window !== 'undefined' ? window.location.pathname + window.location.search : '';

export const getSessionId = (): string => {
  if (typeof window === 'undefined') return 'server_session';
  let sid = sessionStorage.getItem('decor8_analytics_sid');
  if (!sid) {
    sid = 'sid_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 8);
    try {
      sessionStorage.setItem('decor8_analytics_sid', sid);
    } catch {}
  }
  return sid;
};

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

  if (isGA4Initialized && activeMeasurementId === cleanId && typeof window.gtag === 'function') {
    return true;
  }

  activeMeasurementId = cleanId;

  // Avoid duplicate script tag injection
  if (!document.getElementById('ga4-tag-manager-script') && !document.querySelector(`script[src*="${cleanId}"]`)) {
    const script = document.createElement('script');
    script.id = 'ga4-tag-manager-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${cleanId}`;
    document.head.appendChild(script);
  }

  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
  }

  window.gtag('js', new Date());
  window.gtag('config', cleanId, {
    page_path: window.location.pathname + window.location.search,
    page_title: document.title || 'Decor8 India',
  });

  isGA4Initialized = true;
  console.log(`[GA4] Google Analytics 4 connected with Stream ID: ${cleanId}`);
  return true;
};

/**
 * Track Page Views in Single Page Application (SPA) on Route Change
 */
export const trackPageView = (path: string, pageTitle?: string) => {
  if (path === lastTrackedPath) return; // Deduplicate rapid repeated calls
  lastTrackedPath = path;

  const title = pageTitle || document.title || 'Decor8 India';
  
  if (window.gtag && (isGA4Initialized || activeMeasurementId)) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title,
      page_location: window.location.href,
    });
  }

  recordLocalAnalyticsEvent('page_view', { path, title });

  try {
    apiService.recordHit({
      path,
      title,
      referrer: typeof document !== 'undefined' ? document.referrer : '',
      eventType: 'page_view',
      sessionId: getSessionId()
    });
  } catch {}
};

/**
 * Track Custom Business Conversion Events
 */
export const trackEvent = (eventName: string, params: Record<string, any> = {}) => {
  if (window.gtag) {
    window.gtag('event', eventName, params);
  }

  recordLocalAnalyticsEvent(eventName, params);

  try {
    apiService.recordHit({
      path: typeof window !== 'undefined' ? window.location.pathname : '/',
      title: typeof document !== 'undefined' ? document.title : '',
      referrer: typeof document !== 'undefined' ? document.referrer : '',
      eventType: eventName,
      sessionId: getSessionId()
    });
  } catch {}
};

export const getActiveMeasurementId = (): string | null => activeMeasurementId;
export const isGATrackingActive = (): boolean => isGA4Initialized;
