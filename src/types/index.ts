export type UserRole = 'ADMIN' | 'CLIENT' | 'GUEST';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  phone?: string;
  isApproved: boolean;
  mustChangePassword?: boolean;
  avatar?: string;
  projectId?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  experience: string;
  image: string;
  bio: string;
}

export type BookingStatus = 'Pending Approval' | 'Approved' | 'In Progress' | 'Completed' | 'Rejected';

export type MaterialHardwareStandard = 'Eco' | 'Urban' | 'Luxe';

export interface BookingRequest {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceType: 'Residential' | 'Commercial' | 'Construction' | 'Site Visit';
  packageName: string;
  propertyType?: string;
  bhkSize?: string;
  carpetArea?: number;
  budgetRange?: string;
  preferredDate: string;
  floorPlanUrl?: string;
  requirements: string;
  status: BookingStatus;
  createdAt: string;
  estimatedCost?: number;
  isEmiRequested?: boolean;
}

export type SiteVisitStatus = 'Scheduled' | 'Confirmed' | 'Approved' | 'Rejected' | 'Gate Pass Sent' | 'Visited' | 'Converted' | 'Cancelled';

export interface SiteVisitRequest {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  projectTitle: string;
  preferredDate: string;
  timeSlot: string;
  notes?: string;
  isEmiRequested?: boolean;
  gatePassCode?: string;
  assignedManager?: string;
  status: SiteVisitStatus;
  createdAt: string;
}

export type ProjectStage = 
  | 'Design Discussion'
  | 'Site Measurement'
  | '3D Design'
  | 'Material Selection'
  | 'Civil Work'
  | 'Carpentry'
  | 'Painting'
  | 'Electrical'
  | 'Furniture Installation'
  | 'Final Inspection'
  | 'Handover Completed';

export interface ProjectMilestone {
  id: string;
  stage: ProjectStage;
  progressPercentage: number;
  status: 'Pending' | 'In Progress' | 'Completed';
  targetDate: string;
  completedDate?: string;
  notes?: string;
}

export interface WorkUpdate {
  id: string;
  projectId: string;
  date: string;
  title: string;
  description: string;
  mediaUrls: string[];
  mediaType: 'image' | 'video' | 'mixed';
  stage: ProjectStage;
}

export interface DocumentItem {
  id: string;
  projectId: string;
  title: string;
  category: 'Agreement' | 'Invoice' | 'Quotation' | 'Floor Plan' | '3D Design' | 'Warranty';
  fileUrl: string;
  fileSize: string;
  uploadDate: string;
}

export interface PaymentItem {
  id: string;
  projectId: string;
  title: string;
  amount: number;
  paidAmount: number;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  invoiceUrl?: string;
  paidDate?: string;
}

export interface MessageItem {
  id: string;
  projectId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  text: string;
  attachments?: string[];
  timestamp: string;
}

export interface Project {
  id: string;
  title: string;
  clientId?: string;
  clientEmail?: string;
  clientName: string;
  designerName: string;
  designerAvatar?: string;
  category: 'Residential' | 'Commercial' | 'Construction';
  style: 'Luxury' | 'Modern' | 'Minimal' | 'Traditional';
  coverImage: string;
  galleryImages?: string[];
  beforeImage?: string;
  afterImage?: string;
  location: string;
  area: string;
  budget: string;
  completionTime: string;
  status: 'Ongoing' | 'Completed';
  showOnLandingPage?: boolean;
  progressPercentage: number;
  currentStage: ProjectStage;
  expectedCompletion: string;
  description: string;
  clientTestimonial?: {
    quote: string;
    rating: number;
    clientName: string;
    designation?: string;
  };
  milestones: ProjectMilestone[];
  workUpdates: WorkUpdate[];
  documents: DocumentItem[];
  payments: PaymentItem[];
  messages: MessageItem[];
}

export interface ServiceItem {
  id: string;
  title: string;
  type: 'Residential' | 'Commercial' | 'Construction';
  description: string;
  features: string[];
  estimatedDuration: string;
  startingPrice: number;
  image: string;
  iconName: string;
  isActive: boolean;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'Tips' | 'Decoration' | 'Office Trends' | 'Architecture' | 'Color Guides' | 'Furniture' | 'Lighting' | 'Smart Home';
  coverImage: string;
  authorName: string;
  publishedAt: string;
  readTime: string;
  featured: boolean;
  status: 'Published' | 'Scheduled' | 'Draft';
  isPublished?: boolean;
}

export interface Testimonial {
  id: string;
  clientName: string;
  location: string;
  projectType: string;
  rating: number;
  comment: string;
  avatar: string;
  videoUrl?: string;
}

export interface BranchOffice {
  id: string;
  city: string;
  title: string;
  address: string;
  phone: string;
  email: string;
  workingHours: string;
  mapUrl?: string;
  imageUrl?: string;
  isHeadquarter?: boolean;
  createdAt?: string;
}

export const INITIAL_BRANCH_OFFICES: BranchOffice[] = [
  {
    id: 'branch-1',
    city: 'Bengaluru',
    title: 'Decor8 India - Corporate HQ & Experience Studio',
    address: '#14, Sy No 36/1, Vasanth Vallabnagar, Vasanthpura, Uttrahalli Hobli, Bengaluru 560061',
    phone: '+91 93805 23743',
    email: 'support@decor8india.com',
    workingHours: 'Mon - Sat: 10:00 AM - 7:30 PM (Sun by Appointment)',
    mapUrl: 'https://share.google/3GNXUSyRz9GzGN8D9',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    isHeadquarter: true
  },
  {
    id: 'branch-2',
    city: 'Hyderabad',
    title: 'Decor8 India - Jubilee Hills Experience Studio',
    address: 'Plot No. 450, Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033',
    phone: '+91 98765 43210',
    email: 'hyderabad@decor8india.com',
    workingHours: 'Mon - Sat: 9:30 AM - 7:30 PM',
    mapUrl: 'https://maps.google.com/?q=Jubilee+Hills+Hyderabad',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    isHeadquarter: false
  },
  {
    id: 'branch-3',
    city: 'Mumbai',
    title: 'Decor8 India - South Mumbai Architectural Design Hub',
    address: 'Suite 802, Maker Chambers V, Nariman Point, Mumbai, Maharashtra 400021',
    phone: '+91 98200 11223',
    email: 'mumbai@decor8india.com',
    workingHours: 'Mon - Sat: 10:00 AM - 7:00 PM',
    mapUrl: 'https://maps.google.com/?q=Nariman+Point+Mumbai',
    imageUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
    isHeadquarter: false
  }
];

