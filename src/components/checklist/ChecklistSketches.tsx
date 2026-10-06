import React from 'react';

interface SketchProps {
  dimensions?: Record<string, string>;
  onDimensionChange?: (key: string, value: string) => void;
  isPrintMode?: boolean;
}

// Helper for Dimension Callout Box
const DimensionInput: React.FC<{
  label: string;
  name: string;
  defaultValue?: string;
  unit?: string;
  value?: string;
  onChange?: (val: string) => void;
  className?: string;
}> = ({ label, name, defaultValue = '', unit = 'mm', value, onChange, className = '' }) => {
  return (
    <div className={`inline-flex items-center bg-[#14161B]/95 border border-[#D4AF37]/50 rounded px-1.5 py-0.5 shadow-sm text-[10px] font-mono ${className}`}>
      <span className="text-[#D4AF37] font-bold mr-1">{label}:</span>
      <input
        type="text"
        name={name}
        value={value !== undefined ? value : defaultValue}
        placeholder="____"
        onChange={(e) => onChange && onChange(e.target.value)}
        className="w-14 bg-transparent text-white border-b border-white/30 focus:border-[#D4AF37] focus:outline-none text-center font-semibold text-[10px] px-0.5"
      />
      <span className="text-neutral-400 text-[8px] ml-0.5">{unit}</span>
    </div>
  );
};

// 1. FLOOR PLAN & SPACE BLUEPRINT
export const SpaceFloorPlanSketch: React.FC<SketchProps> = ({ dimensions = {}, onDimensionChange }) => {
  return (
    <div className="relative w-full bg-[#0D0F14] border border-[#D4AF37]/40 rounded-xl p-3 text-neutral-200 overflow-hidden shadow-lg">
      <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
          <span className="text-xs font-bold font-mono tracking-wider text-[#D4AF37] uppercase">2D Architectural Space Layout & Dimensions</span>
        </div>
        <span className="text-[10px] font-mono text-neutral-400">Scale: 1:50 | Floor Plan Blueprint</span>
      </div>

      <div className="relative w-full aspect-[16/9] max-h-[220px] flex items-center justify-center bg-[#090A0D] rounded-lg border border-dashed border-neutral-700/60 p-2">
        {/* SVG Drawing */}
        <svg viewBox="0 0 600 320" className="w-full h-full text-neutral-300 stroke-current" fill="none">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#222733" strokeWidth="0.5" />
            </pattern>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#D4AF37" />
            </marker>
          </defs>
          <rect width="600" height="320" fill="url(#grid)" />

          {/* Outer Boundary Walls */}
          <rect x="50" y="30" width="500" height="250" stroke="#E5E3DF" strokeWidth="3" strokeDasharray="none" />
          
          {/* Foyer / Entry */}
          <rect x="50" y="190" width="100" height="90" stroke="#8E929C" strokeWidth="1.5" />
          <text x="65" y="240" fill="#D4AF37" fontSize="10" fontFamily="sans-serif" fontWeight="bold">FOYER / ENTRY</text>
          {/* Main Door Swing */}
          <path d="M 50 250 A 40 40 0 0 1 90 280" stroke="#D4AF37" strokeWidth="1.2" strokeDasharray="3,2" />
          <line x1="50" y1="280" x2="90" y2="280" stroke="#D4AF37" strokeWidth="2" />

          {/* Living Area */}
          <rect x="150" y="140" width="230" height="140" stroke="#8E929C" strokeWidth="1.5" />
          <text x="210" y="205" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="sans-serif">LIVING ROOM</text>
          <text x="215" y="225" fill="#A8A29E" fontSize="9" fontFamily="sans-serif">Sofa + TV Unit Wall</text>

          {/* Dining Area */}
          <rect x="150" y="30" width="160" height="110" stroke="#8E929C" strokeWidth="1.5" />
          <text x="180" y="85" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="sans-serif">DINING AREA</text>
          <text x="185" y="100" fill="#A8A29E" fontSize="8" fontFamily="sans-serif">6-Seater Table + Crockery</text>

          {/* Kitchen */}
          <rect x="50" y="30" width="100" height="160" stroke="#8E929C" strokeWidth="1.5" />
          <text x="68" y="105" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="sans-serif">KITCHEN</text>
          <text x="60" y="125" fill="#A8A29E" fontSize="8" fontFamily="sans-serif">L-Shape / Parallel</text>

          {/* Master Bedroom */}
          <rect x="380" y="140" width="170" height="140" stroke="#8E929C" strokeWidth="1.5" />
          <text x="405" y="205" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="sans-serif">MASTER BEDROOM</text>
          <text x="420" y="225" fill="#A8A29E" fontSize="8" fontFamily="sans-serif">King Bed + Wardrobe</text>

          {/* Bedroom 2 / Guest */}
          <rect x="380" y="30" width="170" height="110" stroke="#8E929C" strokeWidth="1.5" />
          <text x="415" y="85" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="sans-serif">BEDROOM 2</text>
          <text x="425" y="100" fill="#A8A29E" fontSize="8" fontFamily="sans-serif">Study + Wardrobe</text>

          {/* Master Washroom */}
          <rect x="310" y="30" width="70" height="110" stroke="#8E929C" strokeWidth="1.5" />
          <text x="320" y="85" fill="#A8A29E" fontSize="9" fontFamily="sans-serif">TOILET</text>

          {/* Dimension Lines (Exterior) */}
          {/* Top Overall Width */}
          <line x1="50" y1="15" x2="550" y2="15" stroke="#D4AF37" strokeWidth="1" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
          {/* Left Overall Height */}
          <line x1="25" y1="30" x2="25" y2="280" stroke="#D4AF37" strokeWidth="1" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
          {/* Ceiling Height Marker */}
          <circle cx="530" cy="50" r="14" fill="#1A1C23" stroke="#D4AF37" strokeWidth="1" />
          <text x="522" y="53" fill="#D4AF37" fontSize="8" fontFamily="sans-serif" fontWeight="bold">CH</text>
        </svg>

        {/* Dynamic Interactive Callouts Overlay */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2">
          <DimensionInput
            label="Total Length (L)"
            name="total_length"
            defaultValue={dimensions.total_length || '12500'}
            onChange={(v) => onDimensionChange && onDimensionChange('total_length', v)}
            unit="mm / ft"
          />
        </div>

        <div className="absolute left-1 top-1/2 -translate-y-1/2 rotate-[-90deg] origin-center">
          <DimensionInput
            label="Total Width (W)"
            name="total_width"
            defaultValue={dimensions.total_width || '8500'}
            onChange={(v) => onDimensionChange && onDimensionChange('total_width', v)}
            unit="mm / ft"
          />
        </div>

        <div className="absolute top-2 right-2">
          <DimensionInput
            label="Ceiling Height (CH)"
            name="ceiling_height"
            defaultValue={dimensions.ceiling_height || '10.5'}
            onChange={(v) => onDimensionChange && onDimensionChange('ceiling_height', v)}
            unit="ft"
          />
        </div>

        <div className="absolute bottom-2 right-2">
          <DimensionInput
            label="Carpet Area"
            name="carpet_area"
            defaultValue={dimensions.carpet_area || '1450'}
            onChange={(v) => onDimensionChange && onDimensionChange('carpet_area', v)}
            unit="sq.ft."
          />
        </div>
      </div>
    </div>
  );
};

// 2. LIVING ROOM TV UNIT & FEATURE WALL ELEVATION
export const LivingRoomSketch: React.FC<SketchProps> = ({ dimensions = {}, onDimensionChange }) => {
  return (
    <div className="relative w-full bg-[#0D0F14] border border-[#D4AF37]/40 rounded-xl p-3 text-neutral-200 overflow-hidden shadow-lg">
      <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
          <span className="text-xs font-bold font-mono tracking-wider text-[#D4AF37] uppercase">2D Elevation: Living Room TV Unit & Accent Paneling</span>
        </div>
        <span className="text-[10px] font-mono text-neutral-400">Front Elevation | Architectural Blueprint</span>
      </div>

      <div className="relative w-full aspect-[16/8] max-h-[220px] flex items-center justify-center bg-[#090A0D] rounded-lg border border-dashed border-neutral-700/60 p-2">
        <svg viewBox="0 0 600 280" className="w-full h-full text-neutral-300 stroke-current" fill="none">
          <defs>
            <marker id="arrow-gold" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#D4AF37" />
            </marker>
          </defs>

          {/* Wall Boundary */}
          <rect x="40" y="30" width="520" height="220" stroke="#525866" strokeWidth="2" strokeDasharray="4,2" />
          
          {/* Fluted Louver Panel (Left Side) */}
          <rect x="40" y="30" width="120" height="220" fill="#171A21" stroke="#8E929C" strokeWidth="1.5" />
          {/* Louver lines */}
          <line x1="60" y1="30" x2="60" y2="250" stroke="#3A3F4D" strokeWidth="1" />
          <line x1="80" y1="30" x2="80" y2="250" stroke="#3A3F4D" strokeWidth="1" />
          <line x1="100" y1="30" x2="100" y2="250" stroke="#3A3F4D" strokeWidth="1" />
          <line x1="120" y1="30" x2="120" y2="250" stroke="#3A3F4D" strokeWidth="1" />
          <line x1="140" y1="30" x2="140" y2="250" stroke="#3A3F4D" strokeWidth="1" />
          <text x="50" y="145" fill="#D4AF37" fontSize="9" fontWeight="bold" fontFamily="sans-serif">ACOUSTIC / FLUTED</text>

          {/* Marble / PU Backer Sheet */}
          <rect x="160" y="45" width="280" height="160" fill="#1C1E26" stroke="#D4AF37" strokeWidth="1.5" />
          <text x="230" y="65" fill="#E5E3DF" fontSize="10" fontFamily="sans-serif">MARBLE / PU BACK PANEL</text>
          
          {/* TV Display (65 inch) */}
          <rect x="210" y="80" width="180" height="100" rx="3" fill="#090A0D" stroke="#FFFFFF" strokeWidth="2" />
          <text x="270" y="135" fill="#D4AF37" fontSize="12" fontWeight="bold" fontFamily="sans-serif">65" TV</text>

          {/* Floating TV Console / Drawer Unit */}
          <rect x="130" y="215" width="340" height="35" rx="2" fill="#242833" stroke="#D4AF37" strokeWidth="2" />
          {/* Drawers / Compartments */}
          <line x1="240" y1="215" x2="240" y2="250" stroke="#525866" strokeWidth="1.5" />
          <line x1="360" y1="215" x2="360" y2="250" stroke="#525866" strokeWidth="1.5" />
          <text x="230" y="238" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif">FLOATING CONSOLE UNIT</text>

          {/* Backlit LED Glow Strip */}
          <rect x="157" y="42" width="286" height="166" stroke="#FFE899" strokeWidth="1" strokeDasharray="3,3" opacity="0.8" />

          {/* Open Display Shelves (Right Side) */}
          <rect x="455" y="60" width="105" height="145" fill="#171A21" stroke="#8E929C" strokeWidth="1.5" />
          <line x1="455" y1="105" x2="560" y2="105" stroke="#D4AF37" strokeWidth="1" />
          <line x1="455" y1="155" x2="560" y2="155" stroke="#D4AF37" strokeWidth="1" />
          <text x="470" y="90" fill="#A8A29E" fontSize="8" fontFamily="sans-serif">Glass Shelves</text>
          <text x="475" y="140" fill="#A8A29E" fontSize="8" fontFamily="sans-serif">LED Artifacts</text>

          {/* Dimension Extension Lines */}
          <line x1="40" y1="15" x2="560" y2="15" stroke="#D4AF37" strokeWidth="1" markerStart="url(#arrow-gold)" markerEnd="url(#arrow-gold)" />
          <line x1="20" y1="30" x2="20" y2="250" stroke="#D4AF37" strokeWidth="1" markerStart="url(#arrow-gold)" markerEnd="url(#arrow-gold)" />
        </svg>

        {/* Dimension Boxes */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2">
          <DimensionInput
            label="Total Wall Width (W)"
            name="tv_wall_width"
            defaultValue={dimensions.tv_wall_width || '4200'}
            onChange={(v) => onDimensionChange && onDimensionChange('tv_wall_width', v)}
          />
        </div>

        <div className="absolute left-1 top-1/2 -translate-y-1/2 rotate-[-90deg] origin-center">
          <DimensionInput
            label="Wall Height (H)"
            name="tv_wall_height"
            defaultValue={dimensions.tv_wall_height || '2900'}
            onChange={(v) => onDimensionChange && onDimensionChange('tv_wall_height', v)}
          />
        </div>

        <div className="absolute bottom-2 left-4">
          <DimensionInput
            label="Console Depth (D)"
            name="tv_console_depth"
            defaultValue={dimensions.tv_console_depth || '380'}
            onChange={(v) => onDimensionChange && onDimensionChange('tv_console_depth', v)}
          />
        </div>

        <div className="absolute bottom-2 right-4">
          <DimensionInput
            label="Console FFL Height"
            name="tv_console_ffl"
            defaultValue={dimensions.tv_console_ffl || '300'}
            onChange={(v) => onDimensionChange && onDimensionChange('tv_console_ffl', v)}
          />
        </div>
      </div>
    </div>
  );
};

// 3. DINING AREA & CROCKERY UNIT ELEVATION
export const DiningCrockerySketch: React.FC<SketchProps> = ({ dimensions = {}, onDimensionChange }) => {
  return (
    <div className="relative w-full bg-[#0D0F14] border border-[#D4AF37]/40 rounded-xl p-3 text-neutral-200 overflow-hidden shadow-lg">
      <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
          <span className="text-xs font-bold font-mono tracking-wider text-[#D4AF37] uppercase">2D Elevation: Crockery Unit & Dining Counter</span>
        </div>
        <span className="text-[10px] font-mono text-neutral-400">Front Elevation | Architectural Blueprint</span>
      </div>

      <div className="relative w-full aspect-[16/8] max-h-[220px] flex items-center justify-center bg-[#090A0D] rounded-lg border border-dashed border-neutral-700/60 p-2">
        <svg viewBox="0 0 600 280" className="w-full h-full text-neutral-300 stroke-current" fill="none">
          <defs>
            <marker id="arrow-gold-3" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#D4AF37" />
            </marker>
          </defs>

          {/* Wall Boundary */}
          <rect x="50" y="30" width="500" height="220" stroke="#525866" strokeWidth="2" strokeDasharray="4,2" />

          {/* Crockery Unit - Full Height Left Side */}
          <rect x="70" y="30" width="220" height="220" fill="#171A21" stroke="#D4AF37" strokeWidth="2" />
          
          {/* Top Loft Section */}
          <rect x="70" y="30" width="220" height="40" fill="#202430" stroke="#8E929C" strokeWidth="1" />
          <line x1="180" y1="30" x2="180" y2="70" stroke="#8E929C" strokeWidth="1" />
          <text x="145" y="55" fill="#A8A29E" fontSize="9" fontFamily="sans-serif">TOP LOFT</text>

          {/* Upper Glass Display Shutter with Warm LED */}
          <rect x="70" y="70" width="220" height="95" fill="#111319" stroke="#D4AF37" strokeWidth="1.5" />
          <line x1="180" y1="70" x2="180" y2="165" stroke="#D4AF37" strokeWidth="1.5" />
          {/* Glass Shelves */}
          <line x1="70" y1="100" x2="290" y2="100" stroke="#525866" strokeWidth="1" strokeDasharray="2,2" />
          <line x1="70" y1="130" x2="290" y2="130" stroke="#525866" strokeWidth="1" strokeDasharray="2,2" />
          <text x="110" y="120" fill="#FFE899" fontSize="10" fontWeight="bold" fontFamily="sans-serif">FLUTED GLASS + WINE RACK</text>

          {/* Mid Counter / Buffet Niche (Countertop) */}
          <rect x="70" y="165" width="220" height="20" fill="#D4AF37" opacity="0.3" stroke="#D4AF37" strokeWidth="1.5" />
          <text x="120" y="179" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif">QUARTZ BUFFET LEDGE</text>

          {/* Base Drawers / Storage */}
          <rect x="70" y="185" width="220" height="65" fill="#1E222B" stroke="#8E929C" strokeWidth="1.5" />
          <line x1="180" y1="185" x2="180" y2="250" stroke="#8E929C" strokeWidth="1" />
          <line x1="70" y1="217" x2="290" y2="217" stroke="#8E929C" strokeWidth="1" />
          <text x="130" y="235" fill="#A8A29E" fontSize="8" fontFamily="sans-serif">BASE DRAWERS & SHUTTERS</text>

          {/* Dining Table Elevation (Right Side) */}
          <rect x="330" y="170" width="200" height="15" rx="2" fill="#2E3340" stroke="#D4AF37" strokeWidth="2" />
          {/* Table Legs */}
          <line x1="350" y1="185" x2="350" y2="250" stroke="#D4AF37" strokeWidth="3" />
          <line x1="510" y1="185" x2="510" y2="250" stroke="#D4AF37" strokeWidth="3" />
          {/* Dining Chairs */}
          <rect x="360" y="135" width="40" height="115" rx="4" stroke="#8E929C" strokeWidth="1.5" />
          <rect x="440" y="135" width="40" height="115" rx="4" stroke="#8E929C" strokeWidth="1.5" />
          <text x="390" y="220" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">DINING TABLE</text>

          {/* Pendant Light Hanging */}
          <line x1="430" y1="30" x2="430" y2="100" stroke="#D4AF37" strokeWidth="1.5" />
          <circle cx="430" cy="110" r="12" fill="#D4AF37" stroke="#FFE899" strokeWidth="2" />
          <text x="415" y="95" fill="#D4AF37" fontSize="8" fontFamily="sans-serif">PENDANT</text>

          {/* Dimension Lines */}
          <line x1="70" y1="18" x2="290" y2="18" stroke="#D4AF37" strokeWidth="1" markerStart="url(#arrow-gold-3)" markerEnd="url(#arrow-gold-3)" />
        </svg>

        {/* Dimension Inputs */}
        <div className="absolute top-1 left-24">
          <DimensionInput
            label="Crockery Unit Width (W)"
            name="crockery_width"
            defaultValue={dimensions.crockery_width || '1800'}
            onChange={(v) => onDimensionChange && onDimensionChange('crockery_width', v)}
          />
        </div>

        <div className="absolute top-1 right-24">
          <DimensionInput
            label="Dining Table Length"
            name="dining_table_len"
            defaultValue={dimensions.dining_table_len || '1650'}
            onChange={(v) => onDimensionChange && onDimensionChange('dining_table_len', v)}
          />
        </div>

        <div className="absolute bottom-2 left-4">
          <DimensionInput
            label="Buffet Counter H"
            name="buffet_height"
            defaultValue={dimensions.buffet_height || '850'}
            onChange={(v) => onDimensionChange && onDimensionChange('buffet_height', v)}
          />
        </div>

        <div className="absolute bottom-2 right-4">
          <DimensionInput
            label="Crockery Depth (D)"
            name="crockery_depth"
            defaultValue={dimensions.crockery_depth || '400'}
            onChange={(v) => onDimensionChange && onDimensionChange('crockery_depth', v)}
          />
        </div>
      </div>
    </div>
  );
};

// 4. MASTER BEDROOM BED BACK & DRESSING ELEVATION
export const MasterBedroomSketch: React.FC<SketchProps> = ({ dimensions = {}, onDimensionChange }) => {
  return (
    <div className="relative w-full bg-[#0D0F14] border border-[#D4AF37]/40 rounded-xl p-3 text-neutral-200 overflow-hidden shadow-lg">
      <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
          <span className="text-xs font-bold font-mono tracking-wider text-[#D4AF37] uppercase">2D Elevation: Master Bed Feature Wall & Dressing</span>
        </div>
        <span className="text-[10px] font-mono text-neutral-400">Headboard & Bed Elevation Blueprint</span>
      </div>

      <div className="relative w-full aspect-[16/8] max-h-[220px] flex items-center justify-center bg-[#090A0D] rounded-lg border border-dashed border-neutral-700/60 p-2">
        <svg viewBox="0 0 600 280" className="w-full h-full text-neutral-300 stroke-current" fill="none">
          <defs>
            <marker id="arrow-gold-4" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#D4AF37" />
            </marker>
          </defs>

          {/* Wall Boundary */}
          <rect x="40" y="30" width="520" height="220" stroke="#525866" strokeWidth="2" strokeDasharray="4,2" />

          {/* Acoustic / Veneer Paneling Back Wall */}
          <rect x="40" y="30" width="380" height="220" fill="#14171F" stroke="#8E929C" strokeWidth="1.5" />
          {/* Paneling Groove Lines with Brass Profiles */}
          <line x1="120" y1="30" x2="120" y2="250" stroke="#D4AF37" strokeWidth="1" />
          <line x1="200" y1="30" x2="200" y2="250" stroke="#D4AF37" strokeWidth="1" />
          <line x1="280" y1="30" x2="280" y2="250" stroke="#D4AF37" strokeWidth="1" />
          <line x1="360" y1="30" x2="360" y2="250" stroke="#D4AF37" strokeWidth="1" />

          {/* Upholstered / Cushioned Headboard */}
          <rect x="110" y="110" width="240" height="85" rx="6" fill="#252A36" stroke="#D4AF37" strokeWidth="2" />
          <text x="165" y="155" fill="#FFE899" fontSize="10" fontWeight="bold" fontFamily="sans-serif">TUFTED HEADBOARD</text>

          {/* King Size Bed Frame */}
          <rect x="120" y="195" width="220" height="55" rx="3" fill="#1D212A" stroke="#FFFFFF" strokeWidth="2" />
          <text x="175" y="225" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="sans-serif">KING SIZE BED</text>
          <text x="160" y="240" fill="#A8A29E" fontSize="8" fontFamily="sans-serif">(Hydraulic / Drawer Storage)</text>

          {/* Side Table Left */}
          <rect x="50" y="180" width="55" height="70" fill="#202430" stroke="#D4AF37" strokeWidth="1.5" />
          <line x1="50" y1="215" x2="105" y2="215" stroke="#525866" strokeWidth="1" />
          <text x="55" y="200" fill="#A8A29E" fontSize="8" fontFamily="sans-serif">SIDE TABLE</text>

          {/* Side Table Right */}
          <rect x="350" y="180" width="55" height="70" fill="#202430" stroke="#D4AF37" strokeWidth="1.5" />
          <line x1="350" y1="215" x2="405" y2="215" stroke="#525866" strokeWidth="1" />
          <text x="355" y="200" fill="#A8A29E" fontSize="8" fontFamily="sans-serif">SIDE TABLE</text>

          {/* Full Length Dressing Unit (Right Side) */}
          <rect x="435" y="45" width="115" height="205" fill="#171A22" stroke="#D4AF37" strokeWidth="2" />
          {/* LED Backlit Mirror */}
          <rect x="445" y="55" width="95" height="130" rx="4" fill="#0A0D12" stroke="#FFE899" strokeWidth="2" strokeDasharray="3,3" />
          <text x="455" y="125" fill="#FFE899" fontSize="9" fontWeight="bold" fontFamily="sans-serif">LED MIRROR</text>
          {/* Vanity Drawer */}
          <rect x="440" y="190" width="105" height="40" fill="#252A36" stroke="#8E929C" strokeWidth="1.5" />
          <text x="455" y="215" fill="#FFFFFF" fontSize="8" fontFamily="sans-serif">DRAWER / POUF</text>
        </svg>

        {/* Dimension Inputs */}
        <div className="absolute top-1 left-24">
          <DimensionInput
            label="Bed Width (W)"
            name="bed_width"
            defaultValue={dimensions.bed_width || '1800'}
            onChange={(v) => onDimensionChange && onDimensionChange('bed_width', v)}
          />
        </div>

        <div className="absolute top-1 right-12">
          <DimensionInput
            label="Dressing Width (W)"
            name="dressing_width"
            defaultValue={dimensions.dressing_width || '900'}
            onChange={(v) => onDimensionChange && onDimensionChange('dressing_width', v)}
          />
        </div>

        <div className="absolute bottom-2 left-4">
          <DimensionInput
            label="Headboard H"
            name="headboard_height"
            defaultValue={dimensions.headboard_height || '1200'}
            onChange={(v) => onDimensionChange && onDimensionChange('headboard_height', v)}
          />
        </div>

        <div className="absolute bottom-2 right-4">
          <DimensionInput
            label="Side Table W"
            name="side_table_w"
            defaultValue={dimensions.side_table_w || '450'}
            onChange={(v) => onDimensionChange && onDimensionChange('side_table_w', v)}
          />
        </div>
      </div>
    </div>
  );
};

// 5. KIDS / GUEST BEDROOM STUDY & STORAGE ELEVATION
export const KidsStudySketch: React.FC<SketchProps> = ({ dimensions = {}, onDimensionChange }) => {
  return (
    <div className="relative w-full bg-[#0D0F14] border border-[#D4AF37]/40 rounded-xl p-3 text-neutral-200 overflow-hidden shadow-lg">
      <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
          <span className="text-xs font-bold font-mono tracking-wider text-[#D4AF37] uppercase">2D Elevation: Study Desk & Overhead Bookshelf</span>
        </div>
        <span className="text-[10px] font-mono text-neutral-400">Study & Workstation Blueprint</span>
      </div>

      <div className="relative w-full aspect-[16/8] max-h-[220px] flex items-center justify-center bg-[#090A0D] rounded-lg border border-dashed border-neutral-700/60 p-2">
        <svg viewBox="0 0 600 280" className="w-full h-full text-neutral-300 stroke-current" fill="none">
          {/* Wall Boundary */}
          <rect x="50" y="30" width="500" height="220" stroke="#525866" strokeWidth="2" strokeDasharray="4,2" />

          {/* Study Unit Left & Center */}
          {/* Overhead Bookshelf & Storage */}
          <rect x="70" y="45" width="280" height="85" fill="#1C202B" stroke="#D4AF37" strokeWidth="2" />
          <line x1="160" y1="45" x2="160" y2="130" stroke="#8E929C" strokeWidth="1.5" />
          <line x1="250" y1="45" x2="250" y2="130" stroke="#8E929C" strokeWidth="1.5" />
          <line x1="70" y1="85" x2="160" y2="85" stroke="#525866" strokeWidth="1" />
          <text x="85" y="70" fill="#A8A29E" fontSize="8" fontFamily="sans-serif">OPEN CUBBY</text>
          <text x="175" y="90" fill="#FFE899" fontSize="9" fontWeight="bold" fontFamily="sans-serif">SHUTTER STORAGE</text>
          <text x="265" y="90" fill="#A8A29E" fontSize="8" fontFamily="sans-serif">BOOKSHELF</text>

          {/* Pinboard / Softboard Niche */}
          <rect x="70" y="130" width="280" height="45" fill="#12141B" stroke="#8E929C" strokeWidth="1" strokeDasharray="2,2" />
          <text x="160" y="155" fill="#D4AF37" fontSize="9" fontWeight="bold" fontFamily="sans-serif">MAGNETIC PINBOARD / LED</text>

          {/* Study Table Top */}
          <rect x="70" y="175" width="280" height="15" fill="#2C3240" stroke="#D4AF37" strokeWidth="2" />
          {/* Study Table Drawers & Leg */}
          <rect x="70" y="190" width="80" height="60" fill="#1E232E" stroke="#8E929C" strokeWidth="1.5" />
          <line x1="70" y1="220" x2="150" y2="220" stroke="#525866" strokeWidth="1" />
          <text x="80" y="210" fill="#A8A29E" fontSize="8" fontFamily="sans-serif">DRAWER 1</text>
          <text x="80" y="240" fill="#A8A29E" fontSize="8" fontFamily="sans-serif">DRAWER 2</text>
          {/* Open Leg Space for Chair */}
          <line x1="340" y1="190" x2="340" y2="250" stroke="#D4AF37" strokeWidth="3" />
          <text x="180" y="225" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">STUDY WORKSTATION</text>

          {/* Kids / Guest Bed (Right Side) */}
          <rect x="375" y="150" width="165" height="100" fill="#171A22" stroke="#8E929C" strokeWidth="2" />
          <rect x="375" y="120" width="165" height="30" fill="#252A36" stroke="#D4AF37" strokeWidth="1.5" />
          <text x="420" y="140" fill="#FFE899" fontSize="9" fontWeight="bold" fontFamily="sans-serif">BED HEADBOARD</text>
          <text x="420" y="205" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">BED / STORAGE</text>
        </svg>

        {/* Dimension Inputs */}
        <div className="absolute top-1 left-24">
          <DimensionInput
            label="Study Desk Width (W)"
            name="study_desk_width"
            defaultValue={dimensions.study_desk_width || '1400'}
            onChange={(v) => onDimensionChange && onDimensionChange('study_desk_width', v)}
          />
        </div>

        <div className="absolute top-1 right-20">
          <DimensionInput
            label="Bed Size"
            name="kids_bed_size"
            defaultValue={dimensions.kids_bed_size || 'Single / Queen'}
            unit=""
            onChange={(v) => onDimensionChange && onDimensionChange('kids_bed_size', v)}
          />
        </div>

        <div className="absolute bottom-2 left-4">
          <DimensionInput
            label="Desk Height (H)"
            name="study_desk_height"
            defaultValue={dimensions.study_desk_height || '750'}
            onChange={(v) => onDimensionChange && onDimensionChange('study_desk_height', v)}
          />
        </div>

        <div className="absolute bottom-2 right-4">
          <DimensionInput
            label="Desk Depth (D)"
            name="study_desk_depth"
            defaultValue={dimensions.study_desk_depth || '600'}
            onChange={(v) => onDimensionChange && onDimensionChange('study_desk_depth', v)}
          />
        </div>
      </div>
    </div>
  );
};

// 6. MODULAR KITCHEN 2D ARCHITECTURAL SECTION & ELEVATION
export const KitchenBlueprintSketch: React.FC<SketchProps> = ({ dimensions = {}, onDimensionChange }) => {
  return (
    <div className="relative w-full bg-[#0D0F14] border border-[#D4AF37]/40 rounded-xl p-3 text-neutral-200 overflow-hidden shadow-lg">
      <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
          <span className="text-xs font-bold font-mono tracking-wider text-[#D4AF37] uppercase">2D Section & Elevation: Modular Kitchen Layout</span>
        </div>
        <span className="text-[10px] font-mono text-neutral-400">Architectural Detail Blueprint</span>
      </div>

      <div className="relative w-full aspect-[16/8] max-h-[220px] flex items-center justify-center bg-[#090A0D] rounded-lg border border-dashed border-neutral-700/60 p-2">
        <svg viewBox="0 0 600 280" className="w-full h-full text-neutral-300 stroke-current" fill="none">
          <defs>
            <marker id="arrow-gold-6" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#D4AF37" />
            </marker>
          </defs>

          {/* Kitchen Wall Elevation (Left 380px) */}
          {/* Top Loft Cabinets */}
          <rect x="50" y="30" width="340" height="35" fill="#1C202B" stroke="#D4AF37" strokeWidth="1.5" />
          <line x1="135" y1="30" x2="135" y2="65" stroke="#8E929C" strokeWidth="1" />
          <line x1="220" y1="30" x2="220" y2="65" stroke="#8E929C" strokeWidth="1" />
          <line x1="305" y1="30" x2="305" y2="65" stroke="#8E929C" strokeWidth="1" />
          <text x="160" y="52" fill="#D4AF37" fontSize="9" fontWeight="bold" fontFamily="sans-serif">TOP LOFT STORAGE</text>

          {/* Wall / Overhead Cabinets */}
          <rect x="50" y="65" width="340" height="55" fill="#242833" stroke="#8E929C" strokeWidth="1.5" />
          <line x1="135" y1="65" x2="135" y2="120" stroke="#8E929C" strokeWidth="1" />
          <line x1="305" y1="65" x2="305" y2="120" stroke="#8E929C" strokeWidth="1" />
          {/* Chimney in Center */}
          <rect x="180" y="65" width="80" height="50" fill="#12141A" stroke="#FFFFFF" strokeWidth="1.5" />
          <path d="M 195 90 L 245 90 L 255 115 L 185 115 Z" fill="#333742" stroke="#D4AF37" strokeWidth="1" />
          <text x="195" y="80" fill="#FFFFFF" fontSize="8" fontWeight="bold" fontFamily="sans-serif">CHIMNEY</text>
          <text x="70" y="95" fill="#A8A29E" fontSize="8" fontFamily="sans-serif">WALL CABINET</text>
          <text x="315" y="95" fill="#A8A29E" fontSize="8" fontFamily="sans-serif">WALL CABINET</text>

          {/* Dado / Backsplash Area */}
          <rect x="50" y="120" width="340" height="50" fill="#141720" stroke="#525866" strokeWidth="1" strokeDasharray="3,3" />
          <text x="70" y="148" fill="#D4AF37" fontSize="9" fontWeight="bold" fontFamily="sans-serif">DADO TILES / QUARTZ BACKSPLASH</text>
          {/* 3-Burner Hob on Counter */}
          <rect x="190" y="165" width="60" height="6" fill="#D4AF37" rx="1" />

          {/* Granite / Quartz Countertop */}
          <rect x="45" y="170" width="350" height="12" fill="#D4AF37" stroke="#FFFFFF" strokeWidth="1" />
          <text x="310" y="179" fill="#000000" fontSize="7" fontWeight="bold" fontFamily="sans-serif">QUARTZ TOP</text>

          {/* Base Cabinets (Tandem Drawers & Shutters) */}
          <rect x="50" y="182" width="340" height="68" fill="#1E232E" stroke="#D4AF37" strokeWidth="2" />
          {/* Cutlery / Tandem Drawers */}
          <rect x="50" y="182" width="110" height="22" stroke="#8E929C" strokeWidth="1" />
          <rect x="50" y="204" width="110" height="22" stroke="#8E929C" strokeWidth="1" />
          <rect x="50" y="226" width="110" height="24" stroke="#8E929C" strokeWidth="1" />
          <text x="60" y="196" fill="#A8A29E" fontSize="7" fontFamily="sans-serif">CUTLERY TRAY</text>
          <text x="60" y="218" fill="#A8A29E" fontSize="7" fontFamily="sans-serif">CUP & SAUCER</text>
          <text x="60" y="242" fill="#A8A29E" fontSize="7" fontFamily="sans-serif">THALI / TANDEM</text>
          {/* Sink & Under Sink Unit */}
          <rect x="270" y="182" width="120" height="68" stroke="#8E929C" strokeWidth="1" />
          <text x="290" y="220" fill="#A8A29E" fontSize="8" fontFamily="sans-serif">SINK / RO CABINET</text>
          {/* Skirting */}
          <rect x="50" y="250" width="340" height="8" fill="#000000" stroke="#8E929C" strokeWidth="1" />

          {/* Right: 2D Cross Section */}
          <g transform="translate(430, 25)">
            <rect width="130" height="235" fill="#0F1117" stroke="#8E929C" strokeWidth="1" />
            <text x="20" y="18" fill="#D4AF37" fontSize="9" fontWeight="bold" fontFamily="sans-serif">CROSS SECTION</text>
            
            {/* Loft Section */}
            <rect x="15" y="25" width="55" height="30" fill="#1C202B" stroke="#D4AF37" strokeWidth="1" />
            <text x="75" y="42" fill="#A8A29E" fontSize="7" fontFamily="sans-serif">Loft: 350-600mm</text>

            {/* Wall Cabinet Section */}
            <rect x="15" y="55" width="45" height="45" fill="#242833" stroke="#8E929C" strokeWidth="1" />
            <text x="65" y="80" fill="#A8A29E" fontSize="7" fontFamily="sans-serif">Wall D: 350mm</text>

            {/* Dado Clearance */}
            <line x1="15" y1="100" x2="15" y2="140" stroke="#D4AF37" strokeWidth="2" strokeDasharray="2,2" />
            <text x="25" y="125" fill="#FFE899" fontSize="8" fontFamily="sans-serif">Dado: 600mm</text>

            {/* Counter + Base Section */}
            <rect x="15" y="140" width="85" height="85" fill="#1E232E" stroke="#D4AF37" strokeWidth="1.5" />
            <text x="20" y="185" fill="#FFFFFF" fontSize="8" fontWeight="bold" fontFamily="sans-serif">Base D: 600mm</text>
            <text x="20" y="200" fill="#D4AF37" fontSize="7" fontFamily="sans-serif">Height: 860mm</text>
          </g>
        </svg>

        {/* Dimension Inputs */}
        <div className="absolute top-1 left-24">
          <DimensionInput
            label="Total Kitchen Length"
            name="kitchen_length"
            defaultValue={dimensions.kitchen_length || '3600'}
            onChange={(v) => onDimensionChange && onDimensionChange('kitchen_length', v)}
          />
        </div>

        <div className="absolute bottom-2 left-4">
          <DimensionInput
            label="Countertop Height"
            name="counter_height"
            defaultValue={dimensions.counter_height || '860'}
            onChange={(v) => onDimensionChange && onDimensionChange('counter_height', v)}
          />
        </div>

        <div className="absolute bottom-2 left-52">
          <DimensionInput
            label="Dado Height"
            name="dado_height"
            defaultValue={dimensions.dado_height || '600'}
            onChange={(v) => onDimensionChange && onDimensionChange('dado_height', v)}
          />
        </div>

        <div className="absolute bottom-2 right-4">
          <DimensionInput
            label="Counter Depth"
            name="counter_depth"
            defaultValue={dimensions.counter_depth || '600'}
            onChange={(v) => onDimensionChange && onDimensionChange('counter_depth', v)}
          />
        </div>
      </div>
    </div>
  );
};

// 7. WARDROBE INTERNAL SECTION 2D CAD BLUEPRINT
export const WardrobeBlueprintSketch: React.FC<SketchProps> = ({ dimensions = {}, onDimensionChange }) => {
  return (
    <div className="relative w-full bg-[#0D0F14] border border-[#D4AF37]/40 rounded-xl p-3 text-neutral-200 overflow-hidden shadow-lg">
      <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
          <span className="text-xs font-bold font-mono tracking-wider text-[#D4AF37] uppercase">2D Internal Section: Wardrobe Layout & Storage Blueprint</span>
        </div>
        <span className="text-[10px] font-mono text-neutral-400">Sectional CAD Elevation</span>
      </div>

      <div className="relative w-full aspect-[16/8] max-h-[220px] flex items-center justify-center bg-[#090A0D] rounded-lg border border-dashed border-neutral-700/60 p-2">
        <svg viewBox="0 0 600 280" className="w-full h-full text-neutral-300 stroke-current" fill="none">
          <defs>
            <marker id="arrow-gold-7" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#D4AF37" />
            </marker>
          </defs>

          {/* Outer Wardrobe Carcass */}
          <rect x="50" y="30" width="500" height="225" fill="#141720" stroke="#D4AF37" strokeWidth="2.5" />

          {/* Top Loft Section (Full Width) */}
          <rect x="50" y="30" width="500" height="40" fill="#1F232E" stroke="#8E929C" strokeWidth="1.5" />
          <line x1="216" y1="30" x2="216" y2="70" stroke="#8E929C" strokeWidth="1.5" />
          <line x1="383" y1="30" x2="383" y2="70" stroke="#8E929C" strokeWidth="1.5" />
          <text x="110" y="55" fill="#D4AF37" fontSize="9" fontWeight="bold" fontFamily="sans-serif">LOFT 1</text>
          <text x="280" y="55" fill="#D4AF37" fontSize="9" fontWeight="bold" fontFamily="sans-serif">LOFT 2</text>
          <text x="440" y="55" fill="#D4AF37" fontSize="9" fontWeight="bold" fontFamily="sans-serif">LOFT 3</text>

          {/* Section 1 (Left): Long Hanging Coat/Dress + Shoe Rack */}
          <line x1="216" y1="70" x2="216" y2="255" stroke="#D4AF37" strokeWidth="2" />
          {/* Top Shelf in Sec 1 */}
          <line x1="50" y1="95" x2="216" y2="95" stroke="#8E929C" strokeWidth="1.5" />
          <text x="105" y="87" fill="#A8A29E" fontSize="8" fontFamily="sans-serif">SHELF</text>
          {/* Hanging Rod with LED */}
          <line x1="60" y1="108" x2="206" y2="108" stroke="#FFE899" strokeWidth="2" />
          <circle cx="65" cy="108" r="3" fill="#D4AF37" />
          <circle cx="201" cy="108" r="3" fill="#D4AF37" />
          <text x="80" y="160" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif">LONG HANGING</text>
          <text x="95" y="175" fill="#A8A29E" fontSize="8" fontFamily="sans-serif">(Coats / Sarees)</text>
          {/* Shoe Rack / Bottom Shelf */}
          <line x1="50" y1="215" x2="216" y2="215" stroke="#8E929C" strokeWidth="1.5" />
          <text x="95" y="240" fill="#D4AF37" fontSize="8" fontFamily="sans-serif">SHOE TRAY / SHELF</text>

          {/* Section 2 (Middle): Folded Shelves + Lock Drawers + Jewellery Tray */}
          <line x1="383" y1="70" x2="383" y2="255" stroke="#D4AF37" strokeWidth="2" />
          <line x1="216" y1="105" x2="383" y2="105" stroke="#8E929C" strokeWidth="1.5" />
          <line x1="216" y1="140" x2="383" y2="140" stroke="#8E929C" strokeWidth="1.5" />
          <text x="270" y="92" fill="#A8A29E" fontSize="8" fontFamily="sans-serif">FOLDED STACK 1</text>
          <text x="270" y="127" fill="#A8A29E" fontSize="8" fontFamily="sans-serif">FOLDED STACK 2</text>
          {/* 3 Internal Drawers */}
          <rect x="216" y="140" width="167" height="28" fill="#252A36" stroke="#D4AF37" strokeWidth="1" />
          <text x="250" y="158" fill="#FFE899" fontSize="8" fontWeight="bold" fontFamily="sans-serif">JEWELLERY TRAY</text>
          <rect x="216" y="168" width="167" height="28" fill="#1F232E" stroke="#8E929C" strokeWidth="1" />
          <text x="260" y="186" fill="#FFFFFF" fontSize="8" fontFamily="sans-serif">DRAWER (WITH LOCK)</text>
          <rect x="216" y="196" width="167" height="28" fill="#1F232E" stroke="#8E929C" strokeWidth="1" />
          <text x="260" y="214" fill="#FFFFFF" fontSize="8" fontFamily="sans-serif">DEEP DRAWER</text>
          {/* Bottom Space */}
          <text x="270" y="243" fill="#A8A29E" fontSize="8" fontFamily="sans-serif">SAFE / LOCKER</text>

          {/* Section 3 (Right): Double Hanging (Shirts / Trousers) */}
          {/* Hanging Rod Upper */}
          <line x1="393" y1="88" x2="540" y2="88" stroke="#FFE899" strokeWidth="2" />
          <text x="425" y="125" fill="#FFFFFF" fontSize="8" fontWeight="bold" fontFamily="sans-serif">SHIRTS HANGING</text>
          {/* Mid Divider Shelf */}
          <line x1="383" y1="150" x2="550" y2="150" stroke="#8E929C" strokeWidth="1.5" />
          {/* Trouser Pullout / Lower Rod */}
          <line x1="393" y1="168" x2="540" y2="168" stroke="#FFE899" strokeWidth="2" />
          <text x="420" y="205" fill="#FFFFFF" fontSize="8" fontWeight="bold" fontFamily="sans-serif">TROUSER PULL-OUT</text>
          {/* Bottom Shelf */}
          <line x1="383" y1="220" x2="550" y2="220" stroke="#8E929C" strokeWidth="1.5" />
          <text x="445" y="242" fill="#D4AF37" fontSize="8" fontFamily="sans-serif">ACCESSORIES</text>

          {/* Dimension Lines */}
          <line x1="50" y1="16" x2="550" y2="16" stroke="#D4AF37" strokeWidth="1" markerStart="url(#arrow-gold-7)" markerEnd="url(#arrow-gold-7)" />
        </svg>

        {/* Dimension Inputs */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2">
          <DimensionInput
            label="Total Wardrobe Width (W)"
            name="wardrobe_width"
            defaultValue={dimensions.wardrobe_width || '2400'}
            onChange={(v) => onDimensionChange && onDimensionChange('wardrobe_width', v)}
          />
        </div>

        <div className="absolute bottom-2 left-4">
          <DimensionInput
            label="Total Height (H)"
            name="wardrobe_height"
            defaultValue={dimensions.wardrobe_height || '2700'}
            onChange={(v) => onDimensionChange && onDimensionChange('wardrobe_height', v)}
          />
        </div>

        <div className="absolute bottom-2 left-52">
          <DimensionInput
            label="Loft Height"
            name="wardrobe_loft_h"
            defaultValue={dimensions.wardrobe_loft_h || '600'}
            onChange={(v) => onDimensionChange && onDimensionChange('wardrobe_loft_h', v)}
          />
        </div>

        <div className="absolute bottom-2 right-4">
          <DimensionInput
            label="Wardrobe Depth (D)"
            name="wardrobe_depth"
            defaultValue={dimensions.wardrobe_depth || '600'}
            onChange={(v) => onDimensionChange && onDimensionChange('wardrobe_depth', v)}
          />
        </div>
      </div>
    </div>
  );
};

// 8. WASHROOM & VANITY ARCHITECTURAL PLAN & ELEVATION
export const WashroomBlueprintSketch: React.FC<SketchProps> = ({ dimensions = {}, onDimensionChange }) => {
  return (
    <div className="relative w-full bg-[#0D0F14] border border-[#D4AF37]/40 rounded-xl p-3 text-neutral-200 overflow-hidden shadow-lg">
      <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
          <span className="text-xs font-bold font-mono tracking-wider text-[#D4AF37] uppercase">2D Elevation & Plan: Washroom Vanity, WC & Shower Zone</span>
        </div>
        <span className="text-[10px] font-mono text-neutral-400">Sanitary & Plumbing Detail Blueprint</span>
      </div>

      <div className="relative w-full aspect-[16/8] max-h-[220px] flex items-center justify-center bg-[#090A0D] rounded-lg border border-dashed border-neutral-700/60 p-2">
        <svg viewBox="0 0 600 280" className="w-full h-full text-neutral-300 stroke-current" fill="none">
          {/* Wall Boundary */}
          <rect x="40" y="30" width="520" height="225" stroke="#525866" strokeWidth="2" strokeDasharray="4,2" />

          {/* ZONE 1 (Left): Vanity Counter & LED Mirror */}
          {/* LED Backlit Mirror */}
          <circle cx="120" cy="95" r="40" fill="#0E121A" stroke="#FFE899" strokeWidth="2" strokeDasharray="3,3" />
          <text x="95" y="98" fill="#FFE899" fontSize="8" fontWeight="bold" fontFamily="sans-serif">LED MIRROR</text>
          {/* Table-top / Under-counter Basin */}
          <rect x="85" y="145" width="70" height="20" rx="4" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="1.5" />
          <text x="105" y="158" fill="#000000" fontSize="7" fontWeight="bold" fontFamily="sans-serif">BASIN</text>
          {/* Granite / Quartz Vanity Top */}
          <rect x="50" y="165" width="140" height="12" fill="#D4AF37" stroke="#FFFFFF" strokeWidth="1" />
          {/* Floating Vanity Cabinet Below */}
          <rect x="55" y="177" width="130" height="40" fill="#202533" stroke="#8E929C" strokeWidth="1.5" />
          <line x1="120" y1="177" x2="120" y2="217" stroke="#8E929C" strokeWidth="1" />
          <text x="68" y="200" fill="#FFFFFF" fontSize="8" fontFamily="sans-serif">VANITY DRAWERS</text>
          <text x="75" y="240" fill="#A8A29E" fontSize="8" fontFamily="sans-serif">DRY ZONE</text>

          {/* ZONE 2 (Middle): Wall-Hung WC & Concealed Cistern */}
          <line x1="210" y1="30" x2="210" y2="255" stroke="#525866" strokeWidth="1" strokeDasharray="2,2" />
          {/* Concealed Cistern Flush Plate */}
          <rect x="260" y="125" width="30" height="20" rx="2" fill="#D4AF37" stroke="#FFFFFF" strokeWidth="1" />
          <circle cx="270" cy="135" r="3" fill="#000000" />
          <circle cx="280" cy="135" r="4" fill="#000000" />
          {/* Wall-Hung WC Commode */}
          <path d="M 250 170 C 250 160 300 160 300 170 L 295 210 C 295 220 255 220 255 210 Z" fill="#FFFFFF" stroke="#8E929C" strokeWidth="2" />
          <text x="260" y="195" fill="#000000" fontSize="8" fontWeight="bold" fontFamily="sans-serif">WALL WC</text>
          {/* Health Faucet Point */}
          <circle cx="315" cy="180" r="4" fill="#D4AF37" />
          <text x="245" y="240" fill="#A8A29E" fontSize="8" fontFamily="sans-serif">WC ZONE (Centerline)</text>

          {/* ZONE 3 (Right): Glass Partition & Shower Wet Zone */}
          {/* Toughened Glass Partition */}
          <line x1="360" y1="45" x2="360" y2="255" stroke="#7AE5F5" strokeWidth="3" opacity="0.8" />
          <text x="365" y="60" fill="#7AE5F5" fontSize="8" fontFamily="sans-serif">GLASS PARTITION</text>
          {/* Overhead Rain Shower */}
          <line x1="460" y1="30" x2="460" y2="60" stroke="#D4AF37" strokeWidth="2" />
          <rect x="440" y="60" width="40" height="6" rx="2" fill="#D4AF37" />
          {/* Water spray lines */}
          <line x1="445" y1="68" x2="440" y2="100" stroke="#7AE5F5" strokeWidth="1" strokeDasharray="2,2" />
          <line x1="460" y1="68" x2="460" y2="100" stroke="#7AE5F5" strokeWidth="1" strokeDasharray="2,2" />
          <line x1="475" y1="68" x2="480" y2="100" stroke="#7AE5F5" strokeWidth="1" strokeDasharray="2,2" />
          {/* Diverter / Thermostat Mixer */}
          <circle cx="460" cy="155" r="10" fill="#252A36" stroke="#D4AF37" strokeWidth="1.5" />
          <text x="445" y="180" fill="#FFE899" fontSize="8" fontFamily="sans-serif">DIVERTER</text>
          {/* Floor Drainer / Channel */}
          <rect x="490" y="245" width="40" height="6" fill="#525866" />
          <text x="440" y="240" fill="#7AE5F5" fontSize="8" fontFamily="sans-serif">WET SHOWER ZONE</text>
        </svg>

        {/* Dimension Inputs */}
        <div className="absolute top-1 left-16">
          <DimensionInput
            label="Vanity Width (W)"
            name="vanity_width"
            defaultValue={dimensions.vanity_width || '900'}
            onChange={(v) => onDimensionChange && onDimensionChange('vanity_width', v)}
          />
        </div>

        <div className="absolute top-1 right-20">
          <DimensionInput
            label="Shower Area (W x L)"
            name="shower_area_dim"
            defaultValue={dimensions.shower_area_dim || '3.5 x 4 ft'}
            unit=""
            onChange={(v) => onDimensionChange && onDimensionChange('shower_area_dim', v)}
          />
        </div>

        <div className="absolute bottom-2 left-4">
          <DimensionInput
            label="Countertop FFL"
            name="vanity_ffl_height"
            defaultValue={dimensions.vanity_ffl_height || '850'}
            onChange={(v) => onDimensionChange && onDimensionChange('vanity_ffl_height', v)}
          />
        </div>

        <div className="absolute bottom-2 left-52">
          <DimensionInput
            label="WC Wall Center"
            name="wc_centerline"
            defaultValue={dimensions.wc_centerline || '450'}
            onChange={(v) => onDimensionChange && onDimensionChange('wc_centerline', v)}
          />
        </div>

        <div className="absolute bottom-2 right-4">
          <DimensionInput
            label="Diverter FFL"
            name="diverter_ffl_height"
            defaultValue={dimensions.diverter_ffl_height || '1050'}
            onChange={(v) => onDimensionChange && onDimensionChange('diverter_ffl_height', v)}
          />
        </div>
      </div>
    </div>
  );
};

// 9. FALSE CEILING & LIGHTING BLUEPRINT
export const FalseCeilingSketch: React.FC<SketchProps> = ({ dimensions = {}, onDimensionChange }) => {
  return (
    <div className="relative w-full bg-[#0D0F14] border border-[#D4AF37]/40 rounded-xl p-3 text-neutral-200 overflow-hidden shadow-lg">
      <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
          <span className="text-xs font-bold font-mono tracking-wider text-[#D4AF37] uppercase">2D Section & Plan: False Ceiling Cove & Lighting Grid</span>
        </div>
        <span className="text-[10px] font-mono text-neutral-400">Ceiling Section Detail Blueprint</span>
      </div>

      <div className="relative w-full aspect-[16/8] max-h-[220px] flex items-center justify-center bg-[#090A0D] rounded-lg border border-dashed border-neutral-700/60 p-2">
        <svg viewBox="0 0 600 280" className="w-full h-full text-neutral-300 stroke-current" fill="none">
          {/* Main Slab (Top Concrete Ceiling) */}
          <rect x="50" y="30" width="500" height="15" fill="#3B3F4A" stroke="#8E929C" strokeWidth="1.5" />
          <text x="60" y="42" fill="#E5E3DF" fontSize="9" fontWeight="bold" fontFamily="sans-serif">ORIGINAL RCC CEILING SLAB</text>

          {/* Gypsum False Ceiling Suspension Drops */}
          <line x1="120" y1="45" x2="120" y2="105" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="2,2" />
          <line x1="480" y1="45" x2="480" y2="105" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="2,2" />

          {/* Perimeter Gypsum Drop Ceiling with Cove Pocket */}
          {/* Left Cove Box */}
          <path d="M 50 105 L 180 105 L 180 90 L 165 90" fill="#1C202B" stroke="#D4AF37" strokeWidth="2" />
          {/* Cove LED Strip (Yellow Glow) */}
          <circle cx="170" cy="95" r="4" fill="#FFE899" />
          <text x="60" y="125" fill="#D4AF37" fontSize="8" fontWeight="bold" fontFamily="sans-serif">PERIMETER COVE (3000K WARM LED)</text>

          {/* Right Cove Box */}
          <path d="M 550 105 L 420 105 L 420 90 L 435 90" fill="#1C202B" stroke="#D4AF37" strokeWidth="2" />
          {/* Cove LED Strip */}
          <circle cx="430" cy="95" r="4" fill="#FFE899" />

          {/* Recessed COB Spotlight in Gypsum */}
          <rect x="95" y="103" width="20" height="5" fill="#FFFFFF" />
          <rect x="485" y="103" width="20" height="5" fill="#FFFFFF" />
          <text x="80" y="140" fill="#A8A29E" fontSize="7" fontFamily="sans-serif">COB SPOT 7W</text>
          <text x="470" y="140" fill="#A8A29E" fontSize="7" fontFamily="sans-serif">COB SPOT 7W</text>

          {/* Center Main Island / Fan Point / Magnetic Track */}
          <rect x="230" y="80" width="140" height="10" fill="#252A36" stroke="#D4AF37" strokeWidth="1.5" />
          <circle cx="300" cy="85" r="8" fill="#111319" stroke="#FFE899" strokeWidth="2" />
          <text x="260" y="115" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif">FAN / CHANDELIER</text>

          {/* Magnetic Linear Track Light */}
          <rect x="220" y="145" width="160" height="8" fill="#000000" stroke="#FFE899" strokeWidth="1" />
          <text x="240" y="170" fill="#FFE899" fontSize="8" fontFamily="sans-serif">MAGNETIC TRACK LIGHTING</text>
        </svg>

        {/* Dimension Inputs */}
        <div className="absolute top-1 left-24">
          <DimensionInput
            label="Ceiling Drop Height"
            name="ceiling_drop_height"
            defaultValue={dimensions.ceiling_drop_height || '150'}
            onChange={(v) => onDimensionChange && onDimensionChange('ceiling_drop_height', v)}
          />
        </div>

        <div className="absolute top-1 right-24">
          <DimensionInput
            label="Cove Pocket Depth"
            name="cove_pocket_depth"
            defaultValue={dimensions.cove_pocket_depth || '75'}
            onChange={(v) => onDimensionChange && onDimensionChange('cove_pocket_depth', v)}
          />
        </div>

        <div className="absolute bottom-2 left-4">
          <DimensionInput
            label="Perimeter Margin"
            name="perimeter_margin"
            defaultValue={dimensions.perimeter_margin || '450'}
            onChange={(v) => onDimensionChange && onDimensionChange('perimeter_margin', v)}
          />
        </div>

        <div className="absolute bottom-2 right-4">
          <DimensionInput
            label="Spotlight Pitch"
            name="spotlight_pitch"
            defaultValue={dimensions.spotlight_pitch || '900'}
            onChange={(v) => onDimensionChange && onDimensionChange('spotlight_pitch', v)}
          />
        </div>
      </div>
    </div>
  );
};

// 10. DOORS, WINDOWS & SPECIAL FEATURES (POOJA / BAR) SKETCH
export const SpecialFeaturesSketch: React.FC<SketchProps> = ({ dimensions = {}, onDimensionChange }) => {
  return (
    <div className="relative w-full bg-[#0D0F14] border border-[#D4AF37]/40 rounded-xl p-3 text-neutral-200 overflow-hidden shadow-lg">
      <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
          <span className="text-xs font-bold font-mono tracking-wider text-[#D4AF37] uppercase">2D Elevation: Main Door & Pooja Mandir Unit</span>
        </div>
        <span className="text-[10px] font-mono text-neutral-400">Custom Joinery Blueprint</span>
      </div>

      <div className="relative w-full aspect-[16/8] max-h-[220px] flex items-center justify-center bg-[#090A0D] rounded-lg border border-dashed border-neutral-700/60 p-2">
        <svg viewBox="0 0 600 280" className="w-full h-full text-neutral-300 stroke-current" fill="none">
          {/* Main Door Section (Left) */}
          <rect x="60" y="35" width="180" height="220" fill="#1B1E27" stroke="#D4AF37" strokeWidth="2" />
          <rect x="70" y="45" width="160" height="200" fill="#242834" stroke="#8E929C" strokeWidth="1.5" />
          {/* CNC Jali / Brass Inlay Grooves */}
          <line x1="150" y1="45" x2="150" y2="245" stroke="#D4AF37" strokeWidth="1.5" />
          <circle cx="150" cy="120" r="16" stroke="#D4AF37" strokeWidth="1" strokeDasharray="2,2" />
          {/* Long Designer Brass Handle */}
          <rect x="80" y="110" width="8" height="50" rx="3" fill="#D4AF37" />
          {/* Digital Smart Lock */}
          <rect x="80" y="85" width="12" height="20" rx="2" fill="#000000" stroke="#FFE899" strokeWidth="1" />
          <text x="85" y="235" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif">MAIN ENTRANCE DOOR</text>

          {/* Pooja Mandir / Custom Unit (Right) */}
          <rect x="320" y="35" width="220" height="220" fill="#151821" stroke="#D4AF37" strokeWidth="2" />
          {/* Gopuram / Arch Top */}
          <path d="M 330 75 Q 430 40 530 75 Z" fill="#2A2F3D" stroke="#D4AF37" strokeWidth="1.5" />
          <text x="390" y="65" fill="#FFE899" fontSize="9" fontWeight="bold" fontFamily="sans-serif">POOJA MANDIR</text>
          {/* Backlit CNC Om / Floral Panel */}
          <rect x="340" y="85" width="180" height="95" fill="#1C202B" stroke="#FFE899" strokeWidth="1.5" strokeDasharray="3,3" />
          <circle cx="430" cy="130" r="22" stroke="#D4AF37" strokeWidth="1.5" />
          <text x="424" y="136" fill="#D4AF37" fontSize="16" fontWeight="bold" fontFamily="sans-serif">ॐ</text>
          {/* Mandir Platform / Granite Base */}
          <rect x="330" y="180" width="200" height="15" fill="#D4AF37" stroke="#FFFFFF" strokeWidth="1" />
          {/* Storage Drawers Below for Pooja Items */}
          <rect x="330" y="195" width="200" height="50" fill="#242834" stroke="#8E929C" strokeWidth="1.5" />
          <line x1="430" y1="195" x2="430" y2="245" stroke="#8E929C" strokeWidth="1" />
          <text x="350" y="225" fill="#A8A29E" fontSize="8" fontFamily="sans-serif">POOJA SAMAGRI DRAWERS</text>
        </svg>

        {/* Dimension Inputs */}
        <div className="absolute top-1 left-20">
          <DimensionInput
            label="Main Door (W x H)"
            name="main_door_dim"
            defaultValue={dimensions.main_door_dim || '1050 x 2400'}
            onChange={(v) => onDimensionChange && onDimensionChange('main_door_dim', v)}
          />
        </div>

        <div className="absolute top-1 right-20">
          <DimensionInput
            label="Pooja Mandir (W x H)"
            name="pooja_mandir_dim"
            defaultValue={dimensions.pooja_mandir_dim || '1200 x 2100'}
            onChange={(v) => onDimensionChange && onDimensionChange('pooja_mandir_dim', v)}
          />
        </div>

        <div className="absolute bottom-2 left-4">
          <DimensionInput
            label="Door Frame Thickness"
            name="door_frame_thk"
            defaultValue={dimensions.door_frame_thk || '125'}
            onChange={(v) => onDimensionChange && onDimensionChange('door_frame_thk', v)}
          />
        </div>

        <div className="absolute bottom-2 right-4">
          <DimensionInput
            label="Mandir Platform FFL"
            name="mandir_platform_ffl"
            defaultValue={dimensions.mandir_platform_ffl || '450'}
            onChange={(v) => onDimensionChange && onDimensionChange('mandir_platform_ffl', v)}
          />
        </div>
      </div>
    </div>
  );
};
