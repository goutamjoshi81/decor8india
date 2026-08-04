import type { Project, ServiceItem, Article, Testimonial, BookingRequest, User, TeamMember } from '../types';

export const INITIAL_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Mr. Satish Bhat',
    role: 'Founder & CEO',
    experience: '10+ Years Experience',
    image: '/satish_bhat.png',
    bio: 'Visionary founder driving Decor8India\'s architectural perfection, strategic growth, and client trust.'
  },
  {
    id: 'team-2',
    name: 'Mr. Ar Darshan Bhat',
    role: 'Principal Architect',
    experience: '7+ Years @ Aaroha Studios',
    image: '/darshan_bhat.png',
    bio: 'Principal architect specializing in spatial planning, luxury villa design, and bespoke architectural concepts.'
  },
  {
    id: 'team-3',
    name: 'Mr. Er Chandan Bhat',
    role: 'Structural Engineer',
    experience: '8+ Years Experience',
    image: '/chandan_bhat.png',
    bio: 'Lead structural engineer overseeing RCC framing, seismic load calculations, and turnkey civil execution.'
  }
];

export const INITIAL_SERVICES: ServiceItem[] = [
  // Residential
  {
    id: 'res-1bhk',
    title: '1 BHK Interior Package',
    type: 'Residential',
    description: 'Smart, spatial optimization for compact luxury living with custom modular furniture & ambient lighting.',
    features: ['Modular Kitchen with Tandem Drawers', 'Master Bedroom Wardrobe with Loft', 'Designer TV Unit & Foyer', 'Ceiling & Ambient Concealed Lighting', 'Complete Soft Furnishing Consultation'],
    estimatedDuration: '30 - 45 Days',
    startingPrice: 380000,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Home',
    isActive: true
  },
  {
    id: 'res-2bhk',
    title: '2 BHK Premium Interior',
    type: 'Residential',
    description: 'Elegantly curated 2BHK design featuring bespoke woodwork, false ceiling highlights, and premium finishes.',
    features: ['Acrylic Finished Modular Kitchen', '2 Full Wardrobe Units with Dresser', 'Panelled Living Room Wall & Bar Unit', 'Designer Bathroom Vanities', '3D Photorealistic Visualizations'],
    estimatedDuration: '45 - 60 Days',
    startingPrice: 650000,
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Building',
    isActive: true
  },
  {
    id: 'res-3bhk',
    title: '3 BHK Royal Residency',
    type: 'Residential',
    description: 'Comprehensive luxury makeover with fine Italian marble accents, veneer panelling, and automated smart controls.',
    features: ['Island Modular Kitchen with Quartz Countertop', 'Walk-in Closets in Master Suite', 'Custom Dining Set & Crockery Unit', 'False Ceiling with Smart RGBW Lighting', 'Balcony Garden & Deck Flooring'],
    estimatedDuration: '60 - 75 Days',
    startingPrice: 1150000,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Crown',
    isActive: true
  },
  {
    id: 'res-villa',
    title: '4 BHK / Grand Villa Interior',
    type: 'Residential',
    description: 'Ultra-luxurious bespoke villa interiors tailored to architectural perfection with custom imported marble & artworks.',
    features: ['Double-Height Living Room Statement Wall', 'Home Theater & Acoustics Setup', 'Gourmet Chef Kitchen & Pantry', 'Private Elevator Surround Panelling', 'Dedicated Turnkey Interior Execution'],
    estimatedDuration: '90 - 120 Days',
    startingPrice: 2450000,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Castle',
    isActive: true
  },
  {
    id: 'res-custom',
    title: 'Custom Residential Architecture',
    type: 'Residential',
    description: 'Bespoke design-to-build residential architecture and customized interior design for discerning homeowners.',
    features: ['100% Customized Material Palettes', 'Architectural Spatial Planning', 'Custom Handcrafted Furniture Pieces', 'Art Curation & Landscaping', 'Dedicated Senior Project Architect'],
    estimatedDuration: 'Custom Timeline',
    startingPrice: 1800000,
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Compass',
    isActive: true
  },
  // Commercial
  {
    id: 'com-office',
    title: 'Modern Corporate Office',
    type: 'Commercial',
    description: 'Ergonomic, high-productivity office environments with acoustically isolated cabins and collaborative workspaces.',
    features: ['Ergonomic Workstations & Executive Cabins', 'Conference Room Audio-Visual Integration', 'Reception Lounge Statement Feature', 'Acoustic Baffle Ceiling System', 'Biophilic Design Integration'],
    estimatedDuration: '40 - 60 Days',
    startingPrice: 1200000,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Briefcase',
    isActive: true
  },
  {
    id: 'com-retail',
    title: 'Boutique Retail Store',
    type: 'Commercial',
    description: 'High-converting retail interiors crafted to elevate brand identity and optimize customer walk-in experience.',
    features: ['Custom Product Display Units & Shelving', 'High-CRI Architectural Accent Lighting', 'Trial Room Suites & Cash Counter', 'Window Display Framing & Signage', 'Security & Smart POS Integration'],
    estimatedDuration: '30 - 45 Days',
    startingPrice: 850000,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    iconName: 'ShoppingBag',
    isActive: true
  },
  {
    id: 'com-restaurant',
    title: 'Restaurant & Fine Dining Café',
    type: 'Commercial',
    description: 'Atmospheric dining venue designs blending mood lighting, acoustic control, and seamless kitchen-to-table workflow.',
    features: ['Custom Booth Seating & Bar Counter', 'Commercial HVAC & Kitchen Layout Plan', 'Ambient Mood Lighting Control', 'Acoustic Wall Treatment', 'Outdoor Deck & Pergola Setup'],
    estimatedDuration: '60 - 90 Days',
    startingPrice: 1800000,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Utensils',
    isActive: true
  },
  {
    id: 'com-hotel',
    title: 'Hotel & Luxury Hospitality',
    type: 'Commercial',
    description: 'World-class hospitality interior design for boutique hotels, resorts, and premium guest suites.',
    features: ['Suite Room Furniture & Layout Package', 'Grand Lobby & Concierge Counter', 'All-Day Dining Restaurant Planning', 'Spa & Wellness Interior Details', 'Turnkey FF&E Supply & Fitout'],
    estimatedDuration: '90 - 150 Days',
    startingPrice: 3500000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Hotel',
    isActive: true
  },
  {
    id: 'com-clinic',
    title: 'Clinic & Healthcare Interior',
    type: 'Commercial',
    description: 'Clean, soothing, and anti-microbial medical spaces designed for patient comfort and doctor efficiency.',
    features: ['Hygienic Seamless Flooring & Surfaces', 'Consultation Desk & Medical Equipment Units', 'Comfortable Waiting Lounge', 'Acoustic Soundproofing Cabins', 'NABH Compliant Layout Standards'],
    estimatedDuration: '30 - 50 Days',
    startingPrice: 750000,
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Stethoscope',
    isActive: true
  },
  {
    id: 'com-showroom',
    title: 'Luxury Experience Showroom',
    type: 'Commercial',
    description: 'Immersive experiential spaces designed to highlight high-end products, automobile, or jewellery collections.',
    features: ['Interactive Customer Lounge & VIP Area', 'Spotlight Track Lighting & Ceiling Vaults', 'Digital Display Wall Panelling', 'High-Security Display Cabinets', 'Architectural Entrance Canopy'],
    estimatedDuration: '45 - 75 Days',
    startingPrice: 2100000,
    image: 'https://images.unsplash.com/photo-1582037928769-181f2644ecb7?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Sparkles',
    isActive: true
  },
  // Construction
  {
    id: 'con-villa',
    title: 'Turnkey Villa & Bungalow Construction',
    type: 'Construction',
    description: 'Ground-up civil engineering, RCC framing, brickwork, slab casting, and architectural elevation for luxury villas.',
    features: ['Structural RCC Framing & Deep Foundation', 'Tata Tiscon TMT Steel & Ultratech Cement', '3D Architectural Elevation & Glass Facade', 'Complete Plumbing & Anti-Termite Treatment', 'Soil Testing & Turnkey Civil Handover'],
    estimatedDuration: '120 - 180 Days',
    startingPrice: 3500000,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    iconName: 'HardHat',
    isActive: true
  },
  {
    id: 'con-commercial',
    title: 'Commercial Structure & Fitout Construction',
    type: 'Construction',
    description: 'Heavy-duty commercial civil construction, structural steel framing, glass curtain walls, and basement slab execution.',
    features: ['Structural Steel & RCC Hybrid Framing', 'Glass Curtain Wall & ACP Facade Cladding', 'Basement Parking & Drainage Engineering', 'Fire Safety & Elevator Shaft Execution', 'Municipal Approval & NOC Assistance'],
    estimatedDuration: '150 - 240 Days',
    startingPrice: 5500000,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Building',
    isActive: true
  },
  {
    id: 'con-addition',
    title: 'Structural Alteration & Floor Extension',
    type: 'Construction',
    description: 'Vertical floor additions, terrace deck construction, structural beam reinforcement, and civil layout modifications.',
    features: ['Structural Audit & Beam Reinforcement', 'Additional Floor RCC Slab Casting', 'Terrace Pergola & Waterproofing Deck', 'Exterior Weatherproof Paint & Cladding', 'Dedicated Civil Site Engineer'],
    estimatedDuration: '60 - 90 Days',
    startingPrice: 1800000,
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Hammer',
    isActive: true
  }
];

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

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'The Imperial Penthouse at Worli',
    clientName: 'Rajesh & Sunita Singhania',
    designerName: 'Aarav Mehta (Principal Architect)',
    category: 'Residential',
    style: 'Luxury',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80'
    ],
    beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    location: 'Worli, South Mumbai',
    area: '4,800 Sq. Ft.',
    budget: '₹ 1.85 Cr',
    completionTime: '90 Days',
    status: 'Completed',
    progressPercentage: 100,
    currentStage: 'Handover Completed',
    expectedCompletion: '2026-03-15',
    description: 'A 4BHK duplex penthouse featuring imported Statuario marble, custom brass-inlaid fluted wooden panelling, and automated Lutron lighting system.',
    clientTestimonial: {
      quote: 'Decor8India turned our bare apartment into a museum-worthy sanctuary. The attention to detail in brass work and marble joinery was impeccable.',
      rating: 5,
      clientName: 'Rajesh Singhania',
      designation: 'Managing Director, Zenith Corp'
    },
    milestones: [
      { id: 'm1', stage: 'Design Discussion', progressPercentage: 100, status: 'Completed', targetDate: '2025-12-05', completedDate: '2025-12-05' },
      { id: 'm2', stage: 'Site Measurement', progressPercentage: 100, status: 'Completed', targetDate: '2025-12-10', completedDate: '2025-12-10' },
      { id: 'm3', stage: '3D Design', progressPercentage: 100, status: 'Completed', targetDate: '2025-12-25', completedDate: '2025-12-24' },
      { id: 'm4', stage: 'Material Selection', progressPercentage: 100, status: 'Completed', targetDate: '2026-01-05', completedDate: '2026-01-04' },
      { id: 'm5', stage: 'Civil Work', progressPercentage: 100, status: 'Completed', targetDate: '2026-01-25', completedDate: '2026-01-25' },
      { id: 'm6', stage: 'Carpentry', progressPercentage: 100, status: 'Completed', targetDate: '2026-02-15', completedDate: '2026-02-14' },
      { id: 'm7', stage: 'Painting', progressPercentage: 100, status: 'Completed', targetDate: '2026-02-25', completedDate: '2026-02-24' },
      { id: 'm8', stage: 'Electrical', progressPercentage: 100, status: 'Completed', targetDate: '2026-03-02', completedDate: '2026-03-01' },
      { id: 'm9', stage: 'Furniture Installation', progressPercentage: 100, status: 'Completed', targetDate: '2026-03-10', completedDate: '2026-03-09' },
      { id: 'm10', stage: 'Final Inspection', progressPercentage: 100, status: 'Completed', targetDate: '2026-03-15', completedDate: '2026-03-15' }
    ],
    workUpdates: [
      {
        id: 'u1',
        projectId: 'proj-1',
        date: '2026-03-14',
        title: 'Final Handover & Deep Cleaning Completed',
        description: 'All brass fixtures polished, smart lighting calibrated, and custom velvet sofa installed in the double-height lounge.',
        mediaUrls: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
        mediaType: 'image',
        stage: 'Final Inspection'
      }
    ],
    documents: [
      { id: 'd1', projectId: 'proj-1', title: 'Signed Design Agreement.pdf', category: 'Agreement', fileUrl: '#', fileSize: '2.4 MB', uploadDate: '2025-12-01' },
      { id: 'd2', projectId: 'proj-1', title: 'Final Tax Invoice #D8I-2026-089.pdf', category: 'Invoice', fileUrl: '#', fileSize: '1.1 MB', uploadDate: '2026-03-15' }
    ],
    payments: [
      { id: 'p1', projectId: 'proj-1', title: 'Token Booking Amount (10%)', amount: 1850000, paidAmount: 1850000, dueDate: '2025-12-01', status: 'Paid', paidDate: '2025-12-01' },
      { id: 'p2', projectId: 'proj-1', title: 'Civil & Material Clearance (40%)', amount: 7400000, paidAmount: 7400000, dueDate: '2026-01-10', status: 'Paid', paidDate: '2026-01-08' },
      { id: 'p3', projectId: 'proj-1', title: 'Carpentry & Finishing Stage (40%)', amount: 7400000, paidAmount: 7400000, dueDate: '2026-02-20', status: 'Paid', paidDate: '2026-02-18' },
      { id: 'p4', projectId: 'proj-1', title: 'Handover Final Balance (10%)', amount: 1850000, paidAmount: 1850000, dueDate: '2026-03-15', status: 'Paid', paidDate: '2026-03-15' }
    ],
    messages: []
  },
  {
    id: 'proj-2',
    title: 'Zenith Tech Park Executive Headquarters',
    clientName: 'Vikram Kapoor',
    designerName: 'Priya Sharma (Senior Commercial Interior Lead)',
    category: 'Commercial',
    style: 'Modern',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80'
    ],
    beforeImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    location: 'Cyber City, Gurugram',
    area: '12,500 Sq. Ft.',
    budget: '₹ 2.40 Cr',
    completionTime: '60 Days',
    status: 'Completed',
    progressPercentage: 100,
    currentStage: 'Handover Completed',
    expectedCompletion: '2026-05-10',
    description: 'An eco-friendly biophilic corporate office with acoustic wooden baffle ceilings, smart access control glass cabins, and custom ergonomic break-out zones.',
    clientTestimonial: {
      quote: 'Delivered 5 days ahead of schedule! Our team love the biophilic lounge and acoustic conference rooms.',
      rating: 5,
      clientName: 'Vikram Kapoor',
      designation: 'CEO, Zenith Innovations'
    },
    milestones: [],
    workUpdates: [],
    documents: [],
    payments: [],
    messages: []
  },
  {
    id: 'proj-3',
    title: 'Villa Serenity at Jubilee Hills',
    clientId: 'client-user-1',
    clientName: 'Ananya & Rohan Reddy',
    designerName: 'Aarav Mehta (Principal Architect)',
    category: 'Residential',
    style: 'Minimal',
    coverImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753086-35f13ebc67df?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'Jubilee Hills, Hyderabad',
    area: '6,200 Sq. Ft.',
    budget: '₹ 2.10 Cr',
    completionTime: '90 Days',
    status: 'Ongoing',
    progressPercentage: 68,
    currentStage: 'Carpentry',
    expectedCompletion: '2026-09-30',
    description: 'A minimalist architectural villa featuring monolithic micro-topping floors, teak wood accents, floating staircase panelling, and a glass-enclosed interior courtyard.',
    milestones: [
      { id: 'm1', stage: 'Design Discussion', progressPercentage: 100, status: 'Completed', targetDate: '2026-05-10', completedDate: '2026-05-10' },
      { id: 'm2', stage: 'Site Measurement', progressPercentage: 100, status: 'Completed', targetDate: '2026-05-18', completedDate: '2026-05-18' },
      { id: 'm3', stage: '3D Design', progressPercentage: 100, status: 'Completed', targetDate: '2026-06-05', completedDate: '2026-06-04' },
      { id: 'm4', stage: 'Material Selection', progressPercentage: 100, status: 'Completed', targetDate: '2026-06-15', completedDate: '2026-06-15' },
      { id: 'm5', stage: 'Civil Work', progressPercentage: 100, status: 'Completed', targetDate: '2026-07-05', completedDate: '2026-07-04' },
      { id: 'm6', stage: 'Carpentry', progressPercentage: 65, status: 'In Progress', targetDate: '2026-08-10' },
      { id: 'm7', stage: 'Painting', progressPercentage: 0, status: 'Pending', targetDate: '2026-08-25' },
      { id: 'm8', stage: 'Electrical', progressPercentage: 0, status: 'Pending', targetDate: '2026-09-05' },
      { id: 'm9', stage: 'Furniture Installation', progressPercentage: 0, status: 'Pending', targetDate: '2026-09-20' },
      { id: 'm10', stage: 'Final Inspection', progressPercentage: 0, status: 'Pending', targetDate: '2026-09-30' }
    ],
    workUpdates: [
      {
        id: 'wu1',
        projectId: 'proj-3',
        date: '2026-07-28',
        title: 'Master Bedroom Teak Wardrobe & Veneer Panelling Underway',
        description: 'Veneer pressed boards delivered and frame installation in master bedroom unit completed. Hardware fitting starting tomorrow.',
        mediaUrls: ['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80'],
        mediaType: 'image',
        stage: 'Carpentry'
      },
      {
        id: 'wu2',
        projectId: 'proj-3',
        date: '2026-07-15',
        title: 'Civil & Micro-topping Base Prep Complete',
        description: 'Living area floor levelling finished and anti-damp treatment applied across all wet areas.',
        mediaUrls: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
        mediaType: 'image',
        stage: 'Civil Work'
      }
    ],
    documents: [
      { id: 'doc1', projectId: 'proj-3', title: 'Project Master Contract & Terms.pdf', category: 'Agreement', fileUrl: '#', fileSize: '3.1 MB', uploadDate: '2026-05-12' },
      { id: 'doc2', projectId: 'proj-3', title: 'Approved 3D Floor Layout & Elevations.pdf', category: '3D Design', fileUrl: '#', fileSize: '14.5 MB', uploadDate: '2026-06-06' },
      { id: 'doc3', projectId: 'proj-3', title: 'Milestone Stage 2 Tax Invoice #D8I-2026-142.pdf', category: 'Invoice', fileUrl: '#', fileSize: '1.2 MB', uploadDate: '2026-07-06' }
    ],
    payments: [
      { id: 'pay1', projectId: 'proj-3', title: 'Booking Deposit (10%)', amount: 2100000, paidAmount: 2100000, dueDate: '2026-05-12', status: 'Paid', paidDate: '2026-05-12' },
      { id: 'pay2', projectId: 'proj-3', title: 'Civil & Material Stage (40%)', amount: 8400000, paidAmount: 8400000, dueDate: '2026-07-06', status: 'Paid', paidDate: '2026-07-05' },
      { id: 'pay3', projectId: 'proj-3', title: 'Carpentry & Panelling Stage (35%)', amount: 7350000, paidAmount: 0, dueDate: '2026-08-15', status: 'Pending' },
      { id: 'pay4', projectId: 'proj-3', title: 'Handover Final Settlement (15%)', amount: 3150000, paidAmount: 0, dueDate: '2026-09-30', status: 'Pending' }
    ],
    messages: [
      {
        id: 'msg1',
        projectId: 'proj-3',
        senderId: 'admin-1',
        senderName: 'Aarav Mehta (Lead Architect)',
        senderRole: 'ADMIN',
        text: 'Hello Ananya & Rohan! The teak veneer selection for your living room media wall is arrived on site today. Please check the photos in Work Updates.',
        timestamp: '2026-07-28 11:30 AM'
      },
      {
        id: 'msg2',
        projectId: 'proj-3',
        senderId: 'client-user-1',
        senderName: 'Ananya Reddy',
        senderRole: 'CLIENT',
        text: 'Thanks Aarav! The grain texture looks fantastic. Could you make sure the accent warm LED strip behind the panel is dimmable?',
        timestamp: '2026-07-28 02:15 PM'
      },
      {
        id: 'msg3',
        projectId: 'proj-3',
        senderId: 'admin-1',
        senderName: 'Aarav Mehta (Lead Architect)',
        senderRole: 'ADMIN',
        text: 'Absolutely! We are using Lutron 24V COB dimmable strips with wireless smart controller integration as discussed.',
        timestamp: '2026-07-28 03:00 PM'
      }
    ]
  },
  {
    id: 'proj-4',
    title: 'Aura Fine Dining & Rooftop Bar',
    clientName: 'Sidharth Malhotra & Partners',
    designerName: 'Karan Shah (Hospitality Specialist)',
    category: 'Commercial',
    style: 'Luxury',
    coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'UB City, Bengaluru',
    area: '8,500 Sq. Ft.',
    budget: '₹ 3.20 Cr',
    completionTime: '120 Days',
    status: 'Ongoing',
    progressPercentage: 45,
    currentStage: 'Civil Work',
    expectedCompletion: '2026-11-15',
    description: 'An extravagant rooftop restaurant blending onyx backlit bar fronts, velvet booth seating, and weather-proof teak pergola roofing.',
    milestones: [],
    workUpdates: [],
    documents: [],
    payments: [],
    messages: []
  }
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: '10 Luxury Interior Trends Dominating High-End Homes in 2026',
    slug: 'luxury-interior-trends-2026',
    excerpt: 'From Statuario backlit onyx statement walls to biophilic courtyards and warm tactile minimalism — explore what is defining high-net-worth residences this year.',
    content: `
      <h2>The Shift Toward Warm Tactile Luxury</h2>
      <p>The era of stark cold minimalism is officially behind us. In 2026, discerning homeowners are favoring organic warmth, tactile micro-cement textures, deep walnut finishes, and hand-patinated brass accents.</p>
      
      <h2>1. Backlit Onyx & Statement Natural Stones</h2>
      <p>Natural quartzite and translucent onyx are taking center stage as backlit feature walls in living rooms, master bedroom headboards, and executive bar counters.</p>
      
      <h2>2. Integrated Smart Automation</h2>
      <p>Lutron and Control4 smart ecosystems are now seamlessly embedded into architectural panelling with hidden motion sensors and circadian lighting schedules.</p>
      
      <h2>3. Curved Architecture & Fluted Woodwork</h2>
      <p>Sweeping curved sofas, rounded drywall archways, and vertical fluted teak wall cladding create a feeling of soft fluidity and grand elegance.</p>
    `,
    category: 'Tips',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    authorName: 'Aarav Mehta',
    publishedAt: '2026-07-20',
    readTime: '6 min read',
    featured: true,
    status: 'Published'
  },
  {
    id: 'art-2',
    title: 'How to Choose the Perfect Lighting Hierarchy for Your Living Room',
    slug: 'living-room-lighting-guide',
    excerpt: 'Mastering the 3 layers of illumination: Ambient, Task, and Accent lighting to create a warm, hotel-like atmosphere in your home.',
    content: `
      <h2>The Science of Ambient vs Accent Lighting</h2>
      <p>Lighting is the soul of luxury interior design. Without proper color temperature (CCT) and beam angles, even the most expensive Italian marble will look flat.</p>
      <p>Always maintain a warm 2700K to 3000K warm white palette in residential living spaces.</p>
    `,
    category: 'Lighting',
    coverImage: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80',
    authorName: 'Priya Sharma',
    publishedAt: '2026-07-15',
    readTime: '4 min read',
    featured: false,
    status: 'Published'
  },
  {
    id: 'art-3',
    title: 'Biophilic Office Interiors: Boosting Productivity by 25%',
    slug: 'biophilic-office-design-trends',
    excerpt: 'How integrating indoor vertical gardens, natural daylighting, and non-toxic materials elevates employee well-being and workspace focus.',
    content: `
      <h2>Connecting Workplace Design with Nature</h2>
      <p>Modern corporate offices are abandoning sterile white cubicles in favor of moss walls, indoor water features, and acoustic wooden baffles that reduce stress.</p>
    `,
    category: 'Office Trends',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    authorName: 'Karan Shah',
    publishedAt: '2026-07-02',
    readTime: '5 min read',
    featured: false,
    status: 'Published'
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    clientName: 'Rajesh & Sunita Singhania',
    location: 'Worli, Mumbai',
    projectType: '4BHK Duplex Penthouse',
    rating: 5,
    comment: 'Decor8India turned our bare apartment into a museum-worthy sanctuary. Their 3D render precision matched 100% with the real handover execution. Worth every rupee.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 't-2',
    clientName: 'Vikram Kapoor',
    location: 'Gurugram',
    projectType: '12,500 Sq. Ft. Corporate Office',
    rating: 5,
    comment: 'Working with Priya and the commercial fitout team was seamless. Delivered early, zero budget overruns, and the acoustic cabins are top quality.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 't-3',
    clientName: 'Dr. Meera Nambiar',
    location: 'Kochi, Kerala',
    projectType: 'Super Speciality Dental Clinic',
    rating: 5,
    comment: 'The hygienic seamless floors, calming aesthetic, and smart patient lounge design have won rave reviews from all our patients!',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'
  }
];

export const INITIAL_BOOKINGS: BookingRequest[] = [
  {
    id: 'bk-1001',
    clientName: 'Ananya & Rohan Reddy',
    clientEmail: 'ananya.reddy@example.com',
    clientPhone: '+91 98765 43210',
    serviceType: 'Residential',
    packageName: '4 BHK / Grand Villa Interior',
    propertyType: 'Villa',
    bhkSize: '4 BHK',
    carpetArea: 6200,
    budgetRange: '₹ 2.0 Cr +',
    preferredDate: '2026-05-10',
    requirements: 'Monolithic minimalist villa interior with indoor courtyard, teak panelling and home automation.',
    status: 'Approved',
    createdAt: '2026-05-01',
    estimatedCost: 21000000
  },
  {
    id: 'bk-1002',
    clientName: 'Kabir & Smita Verma',
    clientEmail: 'kabir.verma@example.com',
    clientPhone: '+91 98200 11223',
    serviceType: 'Residential',
    packageName: '3 BHK Royal Residency',
    propertyType: 'Apartment',
    bhkSize: '3 BHK',
    carpetArea: 1850,
    budgetRange: '₹ 15 - 25 Lakhs',
    preferredDate: '2026-08-15',
    requirements: 'Modern Italian marble floor living room with acrylic modular kitchen and walk-in wardrobe.',
    status: 'Pending Approval',
    createdAt: '2026-07-29',
    estimatedCost: 1450000
  }
];

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
