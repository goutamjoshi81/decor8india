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
  galleryImages: string[];
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
