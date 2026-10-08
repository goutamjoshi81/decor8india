import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Printer,
  Download,
  RotateCcw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Layers,
} from 'lucide-react';
import {
  Page1ProjectMaster,
  Page2LivingRoom,
  Page3DiningArea,
  Page4MasterBedroom,
  Page5KidsStudy,
  Page6ModularKitchen,
  Page7Wardrobe,
  Page8Washroom,
  Page9FalseCeiling,
  Page10SpecialFeatures,
} from '../components/checklist/ChecklistCards';

const CATEGORIES = [
  { id: 1, title: 'Master Space Specs', short: 'Space Specs', icon: '📐' },
  { id: 2, title: 'Living Room', short: 'Living Room', icon: '🛋️' },
  { id: 3, title: 'Dining & Crockery', short: 'Dining', icon: '🍽️' },
  { id: 4, title: 'Master Bedroom', short: 'Master Bed', icon: '🛏️' },
  { id: 5, title: 'Kids & Study Suite', short: 'Kids / Study', icon: '📚' },
  { id: 6, title: 'Modular Kitchen', short: 'Kitchen', icon: '🍳' },
  { id: 7, title: 'Wardrobe Selection', short: 'Wardrobes', icon: '🚪' },
  { id: 8, title: 'Washroom & Vanity', short: 'Washroom', icon: '🚿' },
  { id: 9, title: 'False Ceiling & Lighting', short: 'Ceiling & Light', icon: '💡' },
  { id: 10, title: 'Doors & Special Features', short: 'Doors & Specials', icon: '🏛️' },
];

const SAMPLE_DATA: Record<string, any> = {
  projectName: 'Prestige Willow Luxury Villa',
  clientName: 'Mr. Arvind & Sangeeta Nambiar',
  contactNumber: '+91 98800 88880',
  emailId: 'arvind.nambiar@prestige.com',
  siteAddress: 'Villa 42, Prestige Glenwood, Whitefield, Bengaluru',
  propertyType: 'Villa',
  builtUpArea: '3250 sq.ft.',
  carpetArea: '2650 sq.ft.',
  unitType: '4 BHK',
  ceilingHeight: '10 ft. 6 in.',
  possessionDate: 'Ready for Fitout',
  civilChanges: 'Yes',
  civilChangesDetails: 'Demolish dry kitchen wall to create open island kitchen layout',
  designTheme: 'Luxury',
  colorPalette: { 'Warm Neutral': true, 'Wood & Gold': true, 'Moody & Dark': false },
  budgetRange: '₹35 Lakhs - ₹45 Lakhs',
  timelineGoal: '60 Days Turnkey Handover',
  budgetFlexibility: 'Flexible for Premium Upgrades',
  
  // Living
  tvRequired: 'Yes',
  tvSize: '75"',
  tvBackPanel: { 'Italian Marble / Quartz Slab': true, 'Acoustic Fluted Louvers': true },
  tvConsoleType: 'Wall-Hung Floating',
  sofaLayout: 'L-Shape Sectional',
  sofaMaterial: 'Genuine Italian Leather',
  accentChairs: '2 Velvet Swivel Chairs in Emerald Green',
  coffeeTable: 'Nesting Statuario Marble + Brass Ring',
  livingLightCct: 'Tunable Smart',
  livingCurtains: 'Motorized Ripple Sheers',
  
  // Kitchen
  kitchenType: 'Modular',
  kitchenLayout: 'Island',
  kitchenLocation: 'Open',
  kitchenCarcass: 'BWP Marine Plywood 710',
  kitchenShutter: 'Acrylic Anti-Scratch',
  kitchenCountertop: 'Quartz Sintered Stone',
  kitchenBacksplash: 'Full-height Quartz Seamless',
  kitchenDrawers: 'Tandem Box Soft-Close',
  kitchenCorner: 'Magic Corner',
  kitchenAccessories: { 'Cutlery Organiser': true, 'Bottle Pull-out': true, 'Thali Basket': true, 'Pantry Tall Unit': true },
  kitchenHandle: 'Gola Profile (Handleless)',
  kitchenSink: 'Double Bowl Quartz Undermount + Pullout Brass Tap',
  kitchenHobChimney: 'Hafele 4-Burner Glass Hob + 90cm Filterless Chimney',
  kitchenLoftReq: 'Yes',

  // Wardrobe
  wardrobeType: 'Sliding Door',
  wardrobeStyle: 'Contemporary Glass',
  wardrobeConfig: '4 Door',
  wardrobeCarcass: 'HDHMR Action TESA',
  wardrobeShutter: 'Tinted Fluted Glass',
  wardrobeHanging: 'Combination',
  wardrobeDrawers: '3 Drawers (1 with Lock)',
  wardrobeAccessories: { 'Trouser Pull-out': true, 'Tie & Belt Rack': true, 'Jewellery Felt Organiser': true, 'Digital Safe Locker Niche': true },
  wardrobeSensorLed: true,
  wardrobeFullHeight: true,

  // Washroom
  basinType: 'Table-top',
  basinBrand: 'Kohler',
  washroomCounter: 'Quartz',
  washroomCabinet: 'HDHMR Waterproof with Soft-close',
  showerType: 'Ceiling Rain Shower',
  showerBrand: 'Grohe',
  mixerType: 'Concealed 3-Inlet',
  glassPartition: '10mm Toughened Glass Sliding Fluted Partition',
  wcType: 'Wall-hung Rimless',
  flushTank: 'Concealed Cistern (Geberit/Grohe)',
  washroomAccessories: { 'Towel Rod (24")': true, 'Robe Hooks (x2)': true, 'Health Faucet Gun': true },
  plumbingPipe: 'Astral CPVC SDR-11',
  geyserSpec: 'AO Smith 25L Digital Storage',

  // False ceiling
  ceilingScope: { 'Entire Home': true, 'Living & Dining': true, 'Master Bedroom': true },
  ceilingBoard: 'Saint-Gobain Gyproc (12.5mm)',
  coveType: 'Dual CCT 3000K/4000K',
  downlightType: 'Deep Anti-Glare COB (7W)',
  archLighting: { 'Magnetic Track Linear Lights': true, 'Wall Washer Sconces': true },
  lightBrand: 'Philips Smart Wi-Fi / Lumilux',
  smartHomeLevel: 'Full Home (Touch + Voice + App)',
  smartCurtains: true,
  smartDoorLock: true,

  // Doors & Special
  mainDoorType: 'Teak Wood Veneer with Brass Inlay',
  internalDoorType: 'Veneer Coated with Architrave',
  digitalLockBrand: 'Yale Biometric Digital Smart Lock',
  windowSystem: 'uPVC Sliding with Mesh (Fenesta/Kommerling)',
  balconyRailing: 'Toughened Glass with SS Spigots',
  poojaReq: 'Yes',
  poojaBackdrop: 'Backlit Onyx Marble with CNC Brass Om',
  barReq: 'Yes',
  barDesign: 'Lacquered Glass Shelves + Marble Counter with Wine Chiller',
};

interface ChecklistPageProps {
  isEmbedded?: boolean;
}

export const ChecklistPage: React.FC<ChecklistPageProps> = ({ isEmbedded = false }) => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [viewAllPages, setViewAllPages] = useState<boolean>(false);
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    const saved = localStorage.getItem('decor8_checklist_data');
    return saved ? JSON.parse(saved) : SAMPLE_DATA;
  });

  useEffect(() => {
    localStorage.setItem('decor8_checklist_data', JSON.stringify(formData));
  }, [formData]);

  const handleFormChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleReset = () => {
    if (window.confirm('Reset all checklist fields to blank?')) {
      setFormData({});
      localStorage.removeItem('decor8_checklist_data');
    }
  };

  const handleFillSample = () => {
    setFormData(SAMPLE_DATA);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `Decor8_Checklist_${formData.clientName || 'Project'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className={`w-full text-[#E5E3DF] ${isEmbedded ? 'p-0' : 'min-h-screen bg-[#07080A] pt-24 pb-16 px-3 sm:px-6 lg:px-8'}`}>
      {/* Print Specific Styles */}
      <style>{`
        @media print {
          body {
            background-color: #FFFFFF !important;
            color: #000000 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          nav, header, footer, .no-print, .action-bar {
            display: none !important;
          }
          .min-h-screen {
            padding: 0 !important;
            margin: 0 !important;
          }
          .checklist-page {
            page-break-after: always !important;
            page-break-inside: avoid !important;
            break-after: page !important;
            margin: 0 !important;
            padding: 12mm 10mm !important;
            box-shadow: none !important;
            border: 1px solid #D4AF37 !important;
            background: #0B0C0E !important;
            color: #E5E3DF !important;
            min-height: 98vh !important;
          }
        }
      `}</style>

      {/* Top Header & Breadcrumb */}
      <div className="max-w-7xl mx-auto mb-6 no-print">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            {!isEmbedded ? (
              <div className="flex items-center space-x-2 text-xs text-neutral-400 font-mono mb-1">
                <Link to="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
                <span>/</span>
                <span className="text-[#D4AF37]">Interior Selection Checklist</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-xs text-[#D4AF37] font-mono mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>ADMIN ARCHITECTURAL SPECIFICATION DESK</span>
              </div>
            )}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-serif font-black tracking-wide text-white flex flex-wrap items-center gap-2">
              <span>DECOR8 INDIA INTERIOR SELECTION CHECKLIST</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] text-xs font-mono font-bold">
                10 Categories
              </span>
            </h1>
            <p className="text-xs text-neutral-400 mt-1 max-w-3xl">
              Official architectural specification and selection guide with interactive 2D dimension sketches for client signoffs, material vetting, and site drafting.
            </p>
          </div>

          {/* Action Buttons Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setViewAllPages(!viewAllPages)}
              className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all flex items-center space-x-1.5 cursor-pointer ${
                viewAllPages
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                  : 'bg-[#181B24] border-white/20 text-neutral-300 hover:border-[#D4AF37]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{viewAllPages ? 'Viewing All 10 Pages' : 'View All 10 Pages'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black font-extrabold text-xs shadow-lg shadow-[#D4AF37]/20 hover:scale-105 transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print to PDF (A4)</span>
            </button>

            <a
              href="/decor8_interior_selection_checklist.html"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 rounded-lg bg-[#1F2430] border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#282F40] text-xs font-bold flex items-center space-x-1.5 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Standalone HTML</span>
            </a>

            <button
              onClick={handleFillSample}
              className="px-3 py-2 rounded-lg bg-[#181B24] border border-white/20 text-neutral-300 hover:text-white text-xs font-medium flex items-center space-x-1.5 transition-all cursor-pointer"
              title="Fill with sample luxury villa specs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Fill Sample</span>
            </button>

            <button
              onClick={handleExportJSON}
              className="px-3 py-2 rounded-lg bg-[#181B24] border border-white/20 text-neutral-300 hover:text-white text-xs font-medium flex items-center space-x-1.5 transition-all cursor-pointer"
              title="Save project specifications as JSON"
            >
              <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Export</span>
            </button>

            <button
              onClick={handleReset}
              className="p-2 rounded-lg bg-[#181B24] border border-white/20 text-neutral-400 hover:text-red-400 transition-all cursor-pointer"
              title="Clear all fields"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Category Navigation Bar (when not viewing all pages) */}
        {!viewAllPages && (
          <div className="mt-4 flex items-center space-x-1 sm:space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#D4AF37]">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 shrink-0 cursor-pointer ${
                  activeTab === cat.id
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#B38F24] text-black shadow-lg shadow-[#D4AF37]/25'
                    : 'bg-[#12141A] border border-white/10 text-neutral-400 hover:text-white hover:border-[#D4AF37]/50'
                }`}
              >
                <span>{cat.icon}</span>
                <span className="font-mono text-[10px] opacity-70">#{cat.id}</span>
                <span>{cat.short}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto">
        {viewAllPages ? (
          /* View All 10 Pages sequentially with page breaks */
          <div className="space-y-8">
            <Page1ProjectMaster formData={formData} onFormChange={handleFormChange} />
            <Page2LivingRoom formData={formData} onFormChange={handleFormChange} />
            <Page3DiningArea formData={formData} onFormChange={handleFormChange} />
            <Page4MasterBedroom formData={formData} onFormChange={handleFormChange} />
            <Page5KidsStudy formData={formData} onFormChange={handleFormChange} />
            <Page6ModularKitchen formData={formData} onFormChange={handleFormChange} />
            <Page7Wardrobe formData={formData} onFormChange={handleFormChange} />
            <Page8Washroom formData={formData} onFormChange={handleFormChange} />
            <Page9FalseCeiling formData={formData} onFormChange={handleFormChange} />
            <Page10SpecialFeatures formData={formData} onFormChange={handleFormChange} />
          </div>
        ) : (
          /* Single Page View */
          <div>
            {activeTab === 1 && <Page1ProjectMaster formData={formData} onFormChange={handleFormChange} />}
            {activeTab === 2 && <Page2LivingRoom formData={formData} onFormChange={handleFormChange} />}
            {activeTab === 3 && <Page3DiningArea formData={formData} onFormChange={handleFormChange} />}
            {activeTab === 4 && <Page4MasterBedroom formData={formData} onFormChange={handleFormChange} />}
            {activeTab === 5 && <Page5KidsStudy formData={formData} onFormChange={handleFormChange} />}
            {activeTab === 6 && <Page6ModularKitchen formData={formData} onFormChange={handleFormChange} />}
            {activeTab === 7 && <Page7Wardrobe formData={formData} onFormChange={handleFormChange} />}
            {activeTab === 8 && <Page8Washroom formData={formData} onFormChange={handleFormChange} />}
            {activeTab === 9 && <Page9FalseCeiling formData={formData} onFormChange={handleFormChange} />}
            {activeTab === 10 && <Page10SpecialFeatures formData={formData} onFormChange={handleFormChange} />}

            {/* Pagination Controls */}
            <div className="flex items-center justify-between mt-6 no-print">
              <button
                disabled={activeTab === 1}
                onClick={() => setActiveTab((p) => Math.max(1, p - 1))}
                className="px-4 py-2 rounded-xl bg-[#141720] border border-white/10 text-xs font-bold text-neutral-300 hover:border-[#D4AF37] disabled:opacity-30 disabled:cursor-not-allowed flex items-center space-x-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Category</span>
              </button>

              <span className="text-xs font-mono text-[#D4AF37] font-bold">
                PAGE {activeTab} OF 10: {CATEGORIES[activeTab - 1].title.toUpperCase()}
              </span>

              <button
                disabled={activeTab === 10}
                onClick={() => setActiveTab((p) => Math.min(10, p + 1))}
                className="px-4 py-2 rounded-xl bg-[#141720] border border-white/10 text-xs font-bold text-neutral-300 hover:border-[#D4AF37] disabled:opacity-30 disabled:cursor-not-allowed flex items-center space-x-1 cursor-pointer"
              >
                <span>Next Category</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChecklistPage;
