import type { Project, ServiceItem, Article, Testimonial, BookingRequest, User, TeamMember } from '../types';

export const INITIAL_TEAM_MEMBERS: TeamMember[] = [];
export const INITIAL_SERVICES: ServiceItem[] = [];

export interface MaterialStandardDetail {
  id: 'Eco' | 'Urban' | 'Luxe';
  title: string;
  subtitle: string;
  tagline: string;
  badge: string;
  plywoodGrade: string;
  hardwareBrand: string;
  laminateFinish: string;
  countertop: string;
  paint: string;
  electrical: string;
  sanitary: string;
  features: string[];
}

export const STANDARD_PRICING: Record<'Residential' | 'Commercial' | 'Construction', Record<'Eco' | 'Urban' | 'Luxe', number>> = {
  Residential: {
    Eco: 1250,
    Urban: 1450,
    Luxe: 1950
  },
  Commercial: {
    Eco: 900,
    Urban: 1100,
    Luxe: 1350
  },
  Construction: {
    Eco: 1650,
    Urban: 1950,
    Luxe: 2450
  }
};

export const MATERIAL_STANDARDS: MaterialStandardDetail[] = [
  {
    id: 'Eco',
    title: 'Eco Standard',
    subtitle: 'Sustainable & Budget-Friendly Excellence',
    tagline: 'High quality, eco-conscious materials for smart living',
    badge: '🌿 Eco Standard',
    plywoodGrade: 'ISI 303 Commercial Plywood & Greenply Eco',
    hardwareBrand: 'Hettich Essential / Hafele Basic Soft-Close',
    laminateFinish: '1mm Matte Anti-Fingerprint Laminate',
    countertop: 'Polished Jet Black Granite',
    paint: 'Asian Paints Tractor Emulsion / Royale Health Shield',
    electrical: 'Havells / Anchor Roma Concealed Wiring & LED',
    sanitary: 'Cera / Hindware Premium Sanitary Ware',
    features: [
      'BWR Grade Waterproof Plywood in Kitchen',
      'Soft-Close Hinges & Tandem Drawer Slides',
      '1mm High-Pressure Decorative Laminates',
      'Concealed Energy-Efficient LED Lighting',
      '1 Year On-Site Maintenance Guarantee'
    ]
  },
  {
    id: 'Urban',
    title: 'Urban Standard',
    subtitle: 'Modern Lifestyle & Premium Finishes',
    tagline: 'Bespoke contemporary woodwork & acrylic elegance',
    badge: '🏙️ Urban Standard',
    plywoodGrade: 'Century Plywood / Greenply Marine Grade IS 710',
    hardwareBrand: 'Blum Austria / Hafele Premium Soft-Close',
    laminateFinish: 'High-Gloss Acrylic & Natural Veneer Accents',
    countertop: 'Engineered Quartz / Kalinga Stone',
    paint: 'Asian Paints Royale Luxury Emulsion + Velvet Touch',
    electrical: 'Schneider / Legrand Smart Touch Modular Switches',
    sanitary: 'Kohler / Grohe German Brassware',
    features: [
      'IS 710 Marine Grade Waterproof Plywood Throughout',
      'Blum Motion Soft-Close Tandem Boxes',
      'High-Gloss Acrylic Kitchen & Veneer Living Panels',
      'Designer False Ceiling with RGBW Smart Ambient Lights',
      '3 Years Comprehensive On-Site Warranty'
    ]
  },
  {
    id: 'Luxe',
    title: 'Luxe Standard',
    subtitle: 'Ultra-Royal Architectural Perfection',
    tagline: 'Imported Statuario marble, motorized Blum Servo-Drive & Lutron automation',
    badge: '✨ Luxe Standard',
    plywoodGrade: 'Imported Birch Plywood & Termite-Proof Hardwood',
    hardwareBrand: 'Blum Servo-Drive Motorized / Salice Italy',
    laminateFinish: 'Imported Italian Veneer with Real Brass Inlay',
    countertop: 'Imported Italian Statuario / Onyx Marble',
    paint: 'PU Polish / Deco Metallic Lacquer & Texture',
    electrical: 'Lutron Smart Home Automation & VRV Aircon',
    sanitary: 'Hansgrohe / Gessi Italy Designer Gold Fixtures',
    features: [
      'Imported Italian Statuario Marble Flooring & Wall Cladding',
      'Blum Servo-Drive Touch-to-Open Motorized Cabinets',
      'Natural Exotic Wood Veneer with Brass Line Inlays',
      'Full Lutron Smart Home Automation & Concealed VRV Aircon',
      '5 Years Concierge Warranty & Annual Maintenance'
    ]
  }
];

export interface ConstructionStandardDetail {
  id: 'Eco' | 'Urban' | 'Luxe';
  title: string;
  subtitle: string;
  tagline: string;
  badge: string;
  steelGrade: string;
  cementBrand: string;
  bricksBlocks: string;
  concreteMix: string;
  waterproofing: string;
  plumbingPiping: string;
  flooringExterior: string;
  sanitaryElectrical: string;
  features: string[];
}

export const CONSTRUCTION_STANDARDS: ConstructionStandardDetail[] = [
  {
    id: 'Eco',
    title: 'Eco Construction Standard',
    subtitle: 'High Strength Civil Engineering & Durable Structure',
    tagline: 'Grade 53 cement, Tata Tiscon steel & M20 RCC structural design',
    badge: '🌿 Eco Construction',
    steelGrade: 'Tata Tiscon Fe-500D TMT Rebars',
    cementBrand: 'UltraTech / ACC Grade 53 OPC Cement',
    bricksBlocks: 'High-Density AAC Blocks / Red Clay Bricks (Class 1)',
    concreteMix: 'M20 Grade RCC Ready-Mix Concrete for Beams & Slabs',
    waterproofing: 'Dr. Fixit Polymer Waterproofing (5-Year Warranty)',
    plumbingPiping: 'Supreme / Astral Heavy CPVC & PVC Piping',
    flooringExterior: 'Vitrified Tiles (4x2 ft) & Asian Paints Apex Exterior',
    sanitaryElectrical: 'Cera Sanitaryware & Havells Concealed Copper Wiring',
    features: [
      'Engineered RCC Column & Beam Frame Design',
      'Anti-Termite Chemical Treatment Soil Foundation',
      'Dr. Fixit Terrace & Toilet Waterproofing',
      'Quality Approved Bricks & Grade 53 Cement',
      '5 Years Structural Warranty'
    ]
  },
  {
    id: 'Urban',
    title: 'Urban Construction Standard',
    subtitle: 'Premium High-Tension Structural Excellence',
    tagline: 'Fe-550D TMT steel, M25/M30 concrete, Fosroc waterproofing & vitrified slabs',
    badge: '🏙️ Urban Construction',
    steelGrade: 'Tata Tiscon / JSW Neo-Steel Fe-550D High-Tension',
    cementBrand: 'UltraTech Super / Ambuja Weatherproof Grade 53',
    bricksBlocks: 'Wire-Cut Solid Red Clay Bricks (9-inch Outer Wall)',
    concreteMix: 'M25 / M30 Grade Engineered Concrete with Vibrators',
    waterproofing: 'Fosroc / Sika Polymer & Crystalline Waterproofing (10-Year Warranty)',
    plumbingPiping: 'Astral / Ashirvad Noise-Dampening Heavy CPVC Pipes',
    flooringExterior: 'Large-Format Italian Finish Vitrified Tiles (6x4 ft) & Apex Ultima',
    sanitaryElectrical: 'Kohler / Grohe Fittings & Schneider Smart Modular Switches',
    features: [
      'Heavy RCC Footing with Seismic Load Calculation',
      '10-Year Written Structural & Waterproofing Warranty',
      'Wire-Cut Brick Masonry with Thermal Insulation',
      'Fosroc Dual-Layer Terrace & Basement Waterproofing',
      'Architectural Facade Elevation Engineering'
    ]
  },
  {
    id: 'Luxe',
    title: 'Luxe Construction Standard',
    subtitle: 'Ultra-Royal Architectural Civil Engineering',
    tagline: 'Imported Statuario marble, JSW Fe-550D steel, Geberit plumbing & curtain glass facade',
    badge: '✨ Luxe Construction',
    steelGrade: 'JSW Neo-Steel Fe-550D & Structural Steel Framing',
    cementBrand: 'UltraTech Super Premium / Lafarge Master Grade',
    bricksBlocks: 'Insulated Cavity Wall System / Aerated Thermo-Blocks',
    concreteMix: 'M35 / M40 High-Performance Self-Compacting RCC',
    waterproofing: 'Membrane Waterproofing with 15-Year Warranty',
    plumbingPiping: 'Geberit Switzerland Acoustic Underground & In-Wall Piping',
    flooringExterior: 'Natural Imported Italian Statuario Marble & ACP / Glass Facade',
    sanitaryElectrical: 'Hansgrohe Gold Fixtures & Lutron Smart Home Automation Wiring',
    features: [
      'M35/M40 Self-Compacting High-Rise Grade Concrete',
      'Imported Italian Statuario Marble Flooring & Wall Cladding',
      '15-Year Comprehensive Structural & Waterproofing Guarantee',
      'Geberit In-Wall Concealed Cisterns & Acoustic Drainage',
      'Custom Glass Curtain Wall Facade & Steel Framing'
    ]
  }
];

export const INITIAL_PROJECTS: Project[] = [];

export const INITIAL_ARTICLES: Article[] = [];

export const INITIAL_TESTIMONIALS: Testimonial[] = [];

export const INITIAL_BOOKINGS: BookingRequest[] = [];

export const INITIAL_USERS: User[] = [
  {
    id: 'admin-1',
    name: 'Mr. Satish Bhat (CEO & Admin)',
    email: 'satish@decor8india.com',
    password: 'Decor8#India2026',
    role: 'ADMIN',
    phone: '+91 98765 43210',
    isApproved: true,
    avatar: '/satish_bhat.png'
  },
  {
    id: 'client-user-1',
    name: 'Ananya Reddy',
    email: 'ananya.reddy@example.com',
    password: '9876543210',
    role: 'CLIENT',
    phone: '9876543210',
    isApproved: true,
    mustChangePassword: true,
    projectId: 'proj-3',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80'
  }
];

export const FAQS = [
  {
    question: 'How long does an interior design project usually take?',
    answer: 'Timeline depends on scale: 1BHK to 3BHK residences take 30 to 75 days. Luxury villas and corporate commercial spaces range from 60 to 120 days. We provide a detailed day-by-day milestone timeline before project commencement.'
  },
  {
    question: 'What is included in Decor8India turnkey interior execution?',
    answer: 'Our turnkey service covers everything from initial 3D visualization, site measurement, civil alterations, ceiling work, electrical & plumbing, custom modular woodwork, painting, furniture installation, soft furnishings, and final deep cleaning.'
  },
  {
    question: 'How is project payment structured?',
    answer: 'Payment is broken down transparently into milestone stages: 10% token deposit upon design approval, 40% prior to civil work & procurement, 40% at carpentry fitout completion, and the remaining 10% after final inspection handover.'
  },
  {
    question: 'Can I track my project progress online?',
    answer: 'Yes! Once your booking is approved by our admin, you receive secure access to your Client Portal. There you can monitor live milestone completion percentages, view daily site photos/videos, download invoices, and chat directly with your assigned architect.'
  },
  {
    question: 'Do you provide post-handover warranty?',
    answer: 'Yes, we provide up to 10 Years warranty on all custom modular woodwork and 1 Year free complimentary maintenance service for all hardware fittings.'
  }
];
