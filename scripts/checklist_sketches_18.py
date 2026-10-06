"""
Vector SVG 2D Architectural Production Drawings for all 18 Sections (WHITE THEME & ALIGNED)
Key features:
- WHITE THEME: Clean white/light architectural drafting canvas (#FFFFFF / #F8FAFC)
- Sharp, high-contrast dark architectural linework (#0F172A / #1E293B) for crisp printing
- Rich Gold / Amber dimension callouts (#B8860B / #997A15)
- PERFECT ALIGNMENTS: Fixed all overlapping texts, especially DWG 13-SAN (Basin/Mirror/Faucet) and DWG 06-KIT
- STRICT REQUIREMENT: All dimension and measurement fields are explicitly BLANK for manual site entry
"""

def get_blueprint_defs():
    return '''
    <defs>
      <!-- CAD Grid Pattern on Light Background -->
      <pattern id="cad-grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" stroke-width="0.6" />
      </pattern>
      <pattern id="cad-grid-major" width="100" height="100" patternUnits="userSpaceOnUse">
        <rect width="100" height="100" fill="url(#cad-grid)" />
        <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#CBD5E1" stroke-width="0.9" />
      </pattern>

      <!-- Diagonal Wall Hatch for Civil/Architectural Sections -->
      <pattern id="wall-hatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="8" stroke="#94A3B8" stroke-width="1.2" />
      </pattern>

      <!-- Dimension Markers -->
      <marker id="cad-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#B8860B" />
      </marker>
      <marker id="cad-tick" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto">
        <line x1="2" y1="8" x2="8" y2="2" stroke="#B8860B" stroke-width="1.8" />
      </marker>
    </defs>
    '''

def svg_wrap(inner_svg, dwg_no, dwg_title, scale="1:25 N.T.S.", projection="2D ORTHOGRAPHIC ELEVATION"):
    return f'''
    <div class="sketch-wrapper">
      <div class="sketch-header-bar">
        <div class="sketch-title-left">
          <span class="dwg-tag">{dwg_no}</span>
          <span class="dwg-title">{dwg_title}</span>
        </div>
        <div class="sketch-meta-right">
          <span>SCALE: {scale}</span>
          <span class="meta-sep">•</span>
          <span>{projection}</span>
          <span class="meta-sep">•</span>
          <span class="text-gold font-bold">ALL DIMS BLANK FOR SITE ENTRY</span>
        </div>
      </div>
      <div class="sketch-canvas">
        <svg viewBox="0 0 800 380" class="cad-svg" xmlns="http://www.w3.org/2000/svg">
          {get_blueprint_defs()}
          <rect width="800" height="380" fill="#FFFFFF" />
          <rect width="800" height="380" fill="url(#cad-grid-major)" />
          {inner_svg}
        </svg>
      </div>
    </div>
    '''

# 01. PROJECT & SPACE MASTER BLUEPRINT
def get_sketch_01():
    inner = '''
    <!-- Outer Walls (200mm thick) with Wall Hatch -->
    <rect x="50" y="40" width="700" height="290" fill="url(#wall-hatch)" stroke="#0F172A" stroke-width="3" />
    <rect x="58" y="48" width="684" height="274" fill="#FFFFFF" stroke="#64748B" stroke-width="1" />

    <!-- Foyer / Main Entrance (Bottom Left) -->
    <rect x="58" y="210" width="130" height="112" fill="#F8FAFC" stroke="#334155" stroke-width="1.5" />
    <text x="75" y="255" fill="#B8860B" font-family="'Inter', sans-serif" font-size="11" font-weight="bold">01. FOYER</text>
    <text x="75" y="272" fill="#475569" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="600">Shoe Rack + Console</text>
    <!-- Main Door Swing -->
    <path d="M 58 270 A 50 50 0 0 1 108 320" stroke="#B8860B" stroke-width="1.5" stroke-dasharray="3,3" fill="none" />
    <line x1="58" y1="320" x2="108" y2="320" stroke="#B8860B" stroke-width="2" />
    <text x="65" y="308" fill="#B8860B" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">MAIN DOOR: [ ____ mm ]</text>

    <!-- Living Room -->
    <rect x="188" y="150" width="278" height="172" fill="#F8FAFC" stroke="#334155" stroke-width="1.5" />
    <text x="260" y="215" fill="#0F172A" font-family="'Inter', sans-serif" font-size="12" font-weight="bold">02. LIVING ROOM</text>
    <text x="245" y="235" fill="#475569" font-family="'Plus Jakarta Sans', sans-serif" font-size="9.5" font-weight="600">Sofa Seating + TV Wall Console</text>
    <!-- Balcony attached to Living -->
    <rect x="466" y="240" width="85" height="82" fill="#F1F5F9" stroke="#475569" stroke-width="1.5" stroke-dasharray="4,2" />
    <text x="475" y="280" fill="#B8860B" font-size="8.5" font-weight="bold" font-family="'Inter', sans-serif">BALCONY</text>

    <!-- Dining Area -->
    <rect x="188" y="48" width="198" height="102" fill="#F8FAFC" stroke="#334155" stroke-width="1.5" />
    <text x="230" y="95" fill="#0F172A" font-family="'Inter', sans-serif" font-size="11.5" font-weight="bold">03. DINING AREA</text>
    <text x="215" y="113" fill="#475569" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="600">6-Seater Table + Crockery Unit</text>

    <!-- Kitchen & Utility -->
    <rect x="58" y="48" width="130" height="162" fill="#F8FAFC" stroke="#334155" stroke-width="1.5" />
    <text x="80" y="115" fill="#0F172A" font-family="'Inter', sans-serif" font-size="11.5" font-weight="bold">04. KITCHEN</text>
    <text x="75" y="133" fill="#475569" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="600">L-Shape / Parallel</text>
    <rect x="58" y="48" width="130" height="35" fill="#F1F5F9" stroke="#475569" stroke-width="1" />
    <text x="85" y="70" fill="#B8860B" font-size="8.5" font-weight="bold" font-family="'Inter', sans-serif">UTILITY / WASH</text>

    <!-- Master Bedroom & Toilet (Properly nested labels) -->
    <rect x="466" y="48" width="276" height="192" fill="#F8FAFC" stroke="#334155" stroke-width="1.5" />
    <text x="480" y="115" fill="#0F172A" font-family="'Inter', sans-serif" font-size="11.5" font-weight="bold">05. MASTER BEDROOM</text>
    <text x="480" y="133" fill="#475569" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="600">King Bed + 4-Door Wardrobe</text>
    <!-- Master Bath -->
    <rect x="634" y="48" width="108" height="105" fill="#F0F9FF" stroke="#0284C7" stroke-width="1" />
    <text x="642" y="105" fill="#0284C7" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">MASTER TOILET</text>

    <!-- Bedroom 2 (Kids / Guest) -->
    <rect x="551" y="240" width="191" height="82" fill="#F8FAFC" stroke="#334155" stroke-width="1.5" />
    <text x="580" y="278" fill="#0F172A" font-family="'Inter', sans-serif" font-size="11" font-weight="bold">06. BEDROOM 2</text>
    <text x="575" y="295" fill="#475569" font-family="'Plus Jakarta Sans', sans-serif" font-size="8.5" font-weight="600">Study Desk + Bed Platform</text>

    <!-- Outer Dimension Strings (BLANK MEASUREMENTS) -->
    <!-- Top Overall Width -->
    <line x1="50" y1="22" x2="750" y2="22" stroke="#B8860B" stroke-width="1.2" marker-start="url(#cad-arrow)" marker-end="url(#cad-arrow)" />
    <line x1="50" y1="16" x2="50" y2="38" stroke="#B8860B" stroke-width="0.8" />
    <line x1="750" y1="16" x2="750" y2="38" stroke="#B8860B" stroke-width="0.8" />
    <rect x="290" y="10" width="220" height="22" rx="3" fill="#FFFFFF" stroke="#B8860B" stroke-width="1.2" />
    <text x="300" y="25" fill="#B8860B" font-family="'Inter', sans-serif" font-size="10" font-weight="bold">OVERALL WIDTH: [ ______ mm ]</text>

    <!-- Left Overall Depth -->
    <line x1="24" y1="40" x2="24" y2="330" stroke="#B8860B" stroke-width="1.2" marker-start="url(#cad-arrow)" marker-end="url(#cad-arrow)" />
    <line x1="18" y1="40" x2="40" y2="40" stroke="#B8860B" stroke-width="0.8" />
    <line x1="18" y1="330" x2="40" y2="330" stroke="#B8860B" stroke-width="0.8" />
    <g transform="translate(18, 195) rotate(-90)">
      <rect x="-95" y="-12" width="190" height="22" rx="3" fill="#FFFFFF" stroke="#B8860B" stroke-width="1.2" />
      <text x="-85" y="3" fill="#B8860B" font-family="'Inter', sans-serif" font-size="10" font-weight="bold">OVERALL DEPTH: [ ______ mm ]</text>
    </g>

    <!-- Bottom Room Sub-dimensions (BLANK) -->
    <rect x="65" y="342" width="125" height="22" rx="2" fill="#FFFFFF" stroke="#64748B" stroke-width="1" />
    <text x="70" y="357" fill="#0F172A" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">FOYER: W: ____ x D: ____</text>

    <rect x="220" y="342" width="175" height="22" rx="2" fill="#FFFFFF" stroke="#64748B" stroke-width="1" />
    <text x="225" y="357" fill="#0F172A" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">LIVING: W: ____ x D: ____</text>

    <rect x="500" y="342" width="205" height="22" rx="2" fill="#FFFFFF" stroke="#64748B" stroke-width="1" />
    <text x="505" y="357" fill="#0F172A" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">MASTER BED: W: ____ x D: ____</text>

    <!-- North Arrow -->
    <g transform="translate(735, 75)">
      <circle cx="0" cy="0" r="16" fill="#FFFFFF" stroke="#B8860B" stroke-width="1.5" />
      <path d="M 0 -12 L 5 4 L 0 1 L -5 4 Z" fill="#B8860B" />
      <text x="-4" y="-15" fill="#B8860B" font-size="9.5" font-weight="bold" font-family="'Inter', sans-serif">N</text>
    </g>
    '''
    return svg_wrap(inner, "DWG 01-PLN", "2D ARCHITECTURAL FLOOR PLAN & OVERALL SPACE LAYOUT", "1:50", "PLAN VIEW")

# 02. SPACE DETAILS & CIVIL LAYOUT
def get_sketch_02():
    inner = '''
    <!-- Structural Grid Columns (C1 to C8) -->
    <rect x="80" y="60" width="24" height="24" fill="#B8860B" stroke="#0F172A" stroke-width="1.5" />
    <text x="85" y="76" fill="#FFFFFF" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">C1</text>

    <rect x="380" y="60" width="24" height="24" fill="#B8860B" stroke="#0F172A" stroke-width="1.5" />
    <text x="385" y="76" fill="#FFFFFF" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">C2</text>

    <rect x="680" y="60" width="24" height="24" fill="#B8860B" stroke="#0F172A" stroke-width="1.5" />
    <text x="685" y="76" fill="#FFFFFF" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">C3</text>

    <rect x="80" y="195" width="24" height="24" fill="#B8860B" stroke="#0F172A" stroke-width="1.5" />
    <text x="85" y="211" fill="#FFFFFF" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">C4</text>

    <rect x="380" y="195" width="24" height="24" fill="#B8860B" stroke="#0F172A" stroke-width="1.5" />
    <text x="385" y="211" fill="#FFFFFF" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">C5</text>

    <rect x="680" y="195" width="24" height="24" fill="#B8860B" stroke="#0F172A" stroke-width="1.5" />
    <text x="685" y="211" fill="#FFFFFF" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">C6</text>

    <rect x="80" y="315" width="24" height="24" fill="#B8860B" stroke="#0F172A" stroke-width="1.5" />
    <text x="85" y="331" fill="#FFFFFF" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">C7</text>

    <rect x="680" y="315" width="24" height="24" fill="#B8860B" stroke="#0F172A" stroke-width="1.5" />
    <text x="685" y="331" fill="#FFFFFF" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">C8</text>

    <!-- Structural Grid Lines -->
    <line x1="92" y1="40" x2="92" y2="345" stroke="#94A3B8" stroke-width="1" stroke-dasharray="6,4" />
    <line x1="392" y1="40" x2="392" y2="235" stroke="#94A3B8" stroke-width="1" stroke-dasharray="6,4" />
    <line x1="692" y1="40" x2="692" y2="345" stroke="#94A3B8" stroke-width="1" stroke-dasharray="6,4" />

    <line x1="60" y1="72" x2="720" y2="72" stroke="#94A3B8" stroke-width="1" stroke-dasharray="6,4" />
    <line x1="60" y1="207" x2="720" y2="207" stroke="#94A3B8" stroke-width="1" stroke-dasharray="6,4" />
    <line x1="60" y1="327" x2="720" y2="327" stroke="#94A3B8" stroke-width="1" stroke-dasharray="6,4" />

    <!-- Wall Demolition Zone -->
    <rect x="215" y="85" width="150" height="110" fill="#FEF2F2" stroke="#DC2626" stroke-width="1.8" stroke-dasharray="4,3" />
    <text x="225" y="125" fill="#DC2626" font-size="10" font-weight="bold" font-family="'Inter', sans-serif">WALL MODIFICATION</text>
    <text x="225" y="145" fill="#991B1B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">[ PROPOSED DEMOLITION ]</text>
    <text x="235" y="165" fill="#B8860B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">SPAN: [ _____ mm ]</text>

    <!-- Core Cutting & Plumbing Sleeve Zone -->
    <circle cx="530" cy="140" r="16" fill="#F0F9FF" stroke="#0284C7" stroke-width="2" stroke-dasharray="2,2" />
    <circle cx="530" cy="140" r="4" fill="#0284C7" />
    <text x="470" y="172" fill="#0284C7" font-size="9.5" font-weight="bold" font-family="'Inter', sans-serif">CORE CUT DIA: [ ____ mm ]</text>

    <!-- Civil Ceiling & Floor Level Callouts (ALL BLANK) -->
    <rect x="130" y="95" width="200" height="28" rx="3" fill="#FFFFFF" stroke="#B8860B" stroke-width="1.2" />
    <text x="140" y="113" fill="#B8860B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">CLEAR CEILING HT: [ ______ ft ]</text>

    <rect x="440" y="235" width="210" height="28" rx="3" fill="#FFFFFF" stroke="#B8860B" stroke-width="1.2" />
    <text x="450" y="253" fill="#B8860B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">BEAM DROP DEPTH: [ ______ mm ]</text>

    <rect x="130" y="255" width="200" height="28" rx="3" fill="#FFFFFF" stroke="#334155" stroke-width="1.2" />
    <text x="140" y="273" fill="#0F172A" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">FFL LEVEL REF: [ ± ______ mm ]</text>

    <!-- Dimension Span C1 to C2 -->
    <line x1="92" y1="46" x2="392" y2="46" stroke="#B8860B" stroke-width="1.2" marker-start="url(#cad-tick)" marker-end="url(#cad-tick)" />
    <text x="210" y="42" fill="#B8860B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">SPAN: [ ______ mm ]</text>

    <!-- Dimension Span C2 to C3 -->
    <line x1="392" y1="46" x2="692" y2="46" stroke="#B8860B" stroke-width="1.2" marker-start="url(#cad-tick)" marker-end="url(#cad-tick)" />
    <text x="510" y="42" fill="#B8860B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">SPAN: [ ______ mm ]</text>
    '''
    return svg_wrap(inner, "DWG 02-CIV", "CIVIL LAYOUT, COLUMN GRID & STRUCTURAL MODIFICATION PLAN", "1:50", "STRUCTURAL PLAN")

# 03. DESIGN PREFERENCES & MATERIAL PALETTE MATRIX
def get_sketch_03():
    inner = '''
    <!-- Material Palette Matrix Layout -->
    <!-- 1. Wood Veneer Fluted Slat Cross Section -->
    <g transform="translate(60, 40)">
      <rect x="0" y="0" width="310" height="140" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5" rx="4" />
      <text x="15" y="25" fill="#B8860B" font-family="'Inter', sans-serif" font-size="11" font-weight="bold">A. ACOUSTIC FLUTED PANEL DETAIL</text>
      <!-- Slats profile -->
      <path d="M 20 110 L 20 70 L 35 70 L 35 110 L 50 110 L 50 70 L 65 70 L 65 110 L 80 110 L 80 70 L 95 70 L 95 110 L 110 110 L 110 70 L 125 70 L 125 110 L 140 110 L 140 70 L 155 70 L 155 110" fill="#FEFCE8" stroke="#B8860B" stroke-width="1.8" />
      <line x1="15" y1="110" x2="295" y2="110" stroke="#0F172A" stroke-width="2" />
      <text x="20" y="130" fill="#64748B" font-size="8.5" font-family="'Inter', sans-serif">12mm MDF Substrate + 0.8mm Natural Veneer</text>
      <text x="175" y="75" fill="#B8860B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">SLAT WIDTH: [ ____ mm ]</text>
      <text x="175" y="95" fill="#B8860B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">SLAT DEPTH: [ ____ mm ]</text>
    </g>

    <!-- 2. Countertop Stone Edge Profile -->
    <g transform="translate(420, 40)">
      <rect x="0" y="0" width="320" height="140" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5" rx="4" />
      <text x="15" y="25" fill="#B8860B" font-family="'Inter', sans-serif" font-size="11" font-weight="bold">B. STONE COUNTERTOP EDGE PROFILE</text>
      <!-- Bullnose profile -->
      <path d="M 30 65 L 120 65 Q 140 65 140 85 Q 140 105 120 105 L 30 105 Z" fill="#F1F5F9" stroke="#0F172A" stroke-width="2" />
      <text x="155" y="75" fill="#B8860B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">THICKNESS: [ ____ mm ]</text>
      <text x="155" y="95" fill="#B8860B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">CHAMFER RADIUS: [ ____ mm ]</text>
      <text x="155" y="115" fill="#64748B" font-size="8.5" font-family="'Inter', sans-serif">Quartz / Italian Marble / Granite</text>
    </g>

    <!-- 3. Metallic PVD Inlay Profile -->
    <g transform="translate(60, 200)">
      <rect x="0" y="0" width="310" height="140" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5" rx="4" />
      <text x="15" y="25" fill="#B8860B" font-family="'Inter', sans-serif" font-size="11" font-weight="bold">C. BRASS PVD T-PROFILE TRIM</text>
      <!-- T-profile -->
      <path d="M 40 70 L 100 70 L 100 76 L 73 76 L 73 115 L 67 115 L 67 76 L 40 76 Z" fill="#B8860B" stroke="#0F172A" stroke-width="1" />
      <text x="120" y="78" fill="#B8860B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">FLANGE: [ ____ mm ]</text>
      <text x="120" y="98" fill="#B8860B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">INSERT STEM: [ ____ mm ]</text>
      <text x="120" y="118" fill="#64748B" font-size="8.5" font-family="'Inter', sans-serif">Rose Gold / Brushed Brass / Matt Black</text>
    </g>

    <!-- 4. Glass Shutter Aluminium Profile -->
    <g transform="translate(420, 200)">
      <rect x="0" y="0" width="320" height="140" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5" rx="4" />
      <text x="15" y="25" fill="#B8860B" font-family="'Inter', sans-serif" font-size="11" font-weight="bold">D. SLIMLINE GLASS FRAME PROFILE</text>
      <!-- Slim profile frame with glass -->
      <rect x="35" y="60" width="30" height="60" fill="#F0F9FF" stroke="#0284C7" stroke-width="1.8" />
      <line x1="50" y1="45" x2="50" y2="135" stroke="#0284C7" stroke-width="3" />
      <text x="95" y="75" fill="#B8860B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">FRAME WIDTH: [ ____ mm ]</text>
      <text x="95" y="95" fill="#B8860B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">GLASS THICKNESS: [ ____ mm ]</text>
      <text x="95" y="115" fill="#64748B" font-size="8.5" font-family="'Inter', sans-serif">Fluted / Tinted Grey / Toughened</text>
    </g>
    '''
    return svg_wrap(inner, "DWG 03-MAT", "ARCHITECTURAL MATERIAL PALETTE & JOINERY PROFILES", "1:2", "TECHNICAL DETAIL SECTIONS")

# 04. LIVING ROOM SELECTION
def get_sketch_04():
    inner = '''
    <line x1="50" y1="330" x2="750" y2="330" stroke="#0F172A" stroke-width="3" />
    <text x="60" y="348" fill="#64748B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">FINISHED FLOOR LEVEL (FFL 0.00)</text>

    <!-- Main Feature Wall Background (Paneling) -->
    <rect x="100" y="50" width="600" height="280" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5" />

    <!-- Acoustic Wooden Slat Paneling (Left Section) -->
    <g>
      <rect x="100" y="50" width="180" height="280" fill="#FEFCE8" stroke="#B8860B" stroke-width="1.2" />
      <line x1="120" y1="50" x2="120" y2="330" stroke="#B8860B" stroke-width="1" stroke-opacity="0.5" />
      <line x1="140" y1="50" x2="140" y2="330" stroke="#B8860B" stroke-width="1" stroke-opacity="0.5" />
      <line x1="160" y1="50" x2="160" y2="330" stroke="#B8860B" stroke-width="1" stroke-opacity="0.5" />
      <line x1="180" y1="50" x2="180" y2="330" stroke="#B8860B" stroke-width="1" stroke-opacity="0.5" />
      <line x1="200" y1="50" x2="200" y2="330" stroke="#B8860B" stroke-width="1" stroke-opacity="0.5" />
      <line x1="220" y1="50" x2="220" y2="330" stroke="#B8860B" stroke-width="1" stroke-opacity="0.5" />
      <line x1="240" y1="50" x2="240" y2="330" stroke="#B8860B" stroke-width="1" stroke-opacity="0.5" />
      <line x1="260" y1="50" x2="260" y2="330" stroke="#B8860B" stroke-width="1" stroke-opacity="0.5" />
      <text x="115" y="75" fill="#997A15" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">SLAT ACCENT PANEL</text>
    </g>

    <!-- TV Backer Marble / PU Panel (Center) -->
    <rect x="300" y="60" width="380" height="190" fill="#FFFFFF" stroke="#B8860B" stroke-width="1.5" />
    <text x="430" y="85" fill="#0F172A" font-size="9.5" font-weight="bold" font-family="'Inter', sans-serif">MARBLE / PU SLAB BACKDROP</text>

    <!-- TV Screen Outline (Fits 65"-75") -->
    <rect x="360" y="95" width="260" height="140" rx="3" fill="#F1F5F9" stroke="#334155" stroke-width="2" />
    <text x="450" y="165" fill="#0F172A" font-size="11" font-weight="bold" font-family="'Inter', sans-serif">LED TV NICHE</text>
    <text x="405" y="185" fill="#B8860B" font-size="9.5" font-weight="bold" font-family="'Inter', sans-serif">SIZE: [ ___" ] • W: [ ____ ] x H: [ ____ ]</text>

    <!-- Floating TV Credenza / Console Unit -->
    <rect x="250" y="270" width="450" height="40" fill="#F8FAFC" stroke="#B8860B" stroke-width="2" />
    <line x1="400" y1="270" x2="400" y2="310" stroke="#B8860B" stroke-width="1.2" />
    <line x1="550" y1="270" x2="550" y2="310" stroke="#B8860B" stroke-width="1.2" />
    <text x="360" y="295" fill="#0F172A" font-size="9.5" font-weight="bold" font-family="'Inter', sans-serif">FLOATING CONSOLE (3 DRAWERS)</text>

    <!-- LED Cove Glow Indicator -->
    <line x1="298" y1="58" x2="682" y2="58" stroke="#CA8A04" stroke-width="2" stroke-dasharray="3,3" />
    <line x1="298" y1="252" x2="682" y2="252" stroke="#CA8A04" stroke-width="2" stroke-dasharray="3,3" />

    <!-- Dimension Callouts (ALL BLANK & ZERO COLLISION) -->
    <!-- Console Length (Above console top edge at y=260) -->
    <line x1="250" y1="262" x2="700" y2="262" stroke="#B8860B" stroke-width="1.2" marker-start="url(#cad-tick)" marker-end="url(#cad-tick)" />
    <rect x="420" y="252" width="160" height="19" rx="3" fill="#FFFFFF" stroke="#B8860B" stroke-width="1" />
    <text x="500" y="265" text-anchor="middle" fill="#B8860B" font-size="8.5" font-weight="bold" font-family="'Inter', sans-serif">CONSOLE W: [ ______ mm ]</text>

    <!-- Console Clearance from FFL -->
    <line x1="85" y1="330" x2="85" y2="270" stroke="#B8860B" stroke-width="1.2" marker-start="url(#cad-arrow)" marker-end="url(#cad-arrow)" />
    <text x="92" y="304" fill="#B8860B" font-size="8.5" font-weight="bold" font-family="'Inter', sans-serif">CLEARANCE: [ ____ mm ]</text>

    <!-- Overall Wall Height (Rotated outside right wall boundary) -->
    <line x1="725" y1="50" x2="725" y2="330" stroke="#B8860B" stroke-width="1.2" marker-start="url(#cad-arrow)" marker-end="url(#cad-arrow)" />
    <g transform="translate(745, 190) rotate(90)">
      <text x="-70" y="0" fill="#B8860B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">OVERALL HT: [ ______ mm ]</text>
    </g>
    '''
    return svg_wrap(inner, "DWG 04-ELV", "LIVING ROOM TV UNIT & FEATURE WALL ELEVATION", "1:25", "2D FRONT ELEVATION")

# 05. DINING AREA & CROCKERY UNIT
def get_sketch_05():
    inner = '''
    <line x1="50" y1="330" x2="750" y2="330" stroke="#0F172A" stroke-width="3" />
    <text x="60" y="348" fill="#64748B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">FFL 0.00</text>

    <!-- Crockery Unit Wall Elevation -->
    <!-- Base Cabinet -->
    <rect x="80" y="240" width="340" height="70" fill="#F8FAFC" stroke="#B8860B" stroke-width="2" />
    <line x1="193" y1="240" x2="193" y2="310" stroke="#64748B" stroke-width="1.2" />
    <line x1="306" y1="240" x2="306" y2="310" stroke="#64748B" stroke-width="1.2" />
    <text x="140" y="280" fill="#0F172A" font-size="9.5" font-weight="bold" font-family="'Inter', sans-serif">BASE STORAGE / BUFFET COUNTER</text>

    <!-- Quartz Counter Ledge -->
    <rect x="75" y="234" width="350" height="8" fill="#E2E8F0" stroke="#0F172A" stroke-width="1" />

    <!-- Tinted Mirror / Fluted Backsplash -->
    <rect x="80" y="130" width="340" height="104" fill="#FEFCE8" stroke="#CBD5E1" stroke-width="1" />
    <text x="170" y="185" fill="#997A15" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">BRONZE TINT MIRROR BACKDROP</text>

    <!-- Upper Crockery Overhead Display -->
    <rect x="80" y="40" width="340" height="90" fill="#F0F9FF" stroke="#B8860B" stroke-width="2" />
    <line x1="193" y1="40" x2="193" y2="130" stroke="#0284C7" stroke-width="1.2" stroke-dasharray="4,2" />
    <line x1="306" y1="40" x2="306" y2="130" stroke="#0284C7" stroke-width="1.2" stroke-dasharray="4,2" />
    <text x="130" y="70" fill="#0284C7" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">GLASS SHUTTER CABINET (WARM LED)</text>
    <text x="170" y="115" fill="#B8860B" font-size="8.5" font-weight="bold" font-family="'Inter', sans-serif">WINE STEMWARE RACK</text>

    <!-- Dining Table & Chairs Elevation -->
    <g transform="translate(450, 0)">
      <rect x="20" y="220" width="240" height="14" rx="2" fill="#F8FAFC" stroke="#B8860B" stroke-width="2" />
      <text x="60" y="232" fill="#B8860B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">6-SEATER DINING TOP</text>
      <!-- Table Legs -->
      <rect x="40" y="234" width="14" height="96" fill="#334155" />
      <rect x="226" y="234" width="14" height="96" fill="#334155" />

      <!-- Chairs Outline -->
      <path d="M 0 250 L 15 250 L 15 330 M 5 250 L 5 190 Q 5 180 15 180 L 15 250" stroke="#64748B" stroke-width="1.8" fill="none" />
      <path d="M 265 250 L 280 250 L 280 330 M 275 250 L 275 190 Q 275 180 265 180 L 265 250" stroke="#64748B" stroke-width="1.8" fill="none" />

      <!-- Hanging Pendant Light -->
      <line x1="140" y1="30" x2="140" y2="130" stroke="#B8860B" stroke-width="1.2" />
      <circle cx="140" cy="140" r="14" fill="#FEF08A" stroke="#B8860B" stroke-width="1.8" />
      <text x="75" y="90" fill="#B8860B" font-size="8.5" font-weight="bold" font-family="'Inter', sans-serif">PENDANT DROP: [ ____ mm ]</text>
    </g>

    <!-- Dimension Callouts (ALL BLANK) -->
    <text x="85" y="325" fill="#B8860B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">CROCKERY W: [ ______ mm ]</text>
    <text x="495" y="325" fill="#B8860B" font-size="8.5" font-weight="bold" font-family="'Inter', sans-serif">TABLE L: [ ______ mm ] • HT: [ ______ mm ]</text>
    '''
    return svg_wrap(inner, "DWG 05-ELV", "DINING TABLE & CROCKERY UNIT 2D ELEVATION", "1:25", "2D ELEVATION")

# 06. MODULAR KITCHEN (LAYOUT & CARCASS) - FIXED HORIZONTAL LABELS
def get_sketch_06():
    inner = '''
    <line x1="60" y1="330" x2="750" y2="330" stroke="#0F172A" stroke-width="3" />

    <!-- 1. Base Cabinets -->
    <rect x="110" y="210" width="610" height="105" fill="#F8FAFC" stroke="#B8860B" stroke-width="2" />
    <line x1="200" y1="210" x2="200" y2="315" stroke="#64748B" stroke-width="1.2" />
    <line x1="310" y1="210" x2="310" y2="315" stroke="#64748B" stroke-width="1.2" />
    <line x1="440" y1="210" x2="440" y2="315" stroke="#64748B" stroke-width="1.2" />
    <line x1="570" y1="210" x2="570" y2="315" stroke="#64748B" stroke-width="1.2" />
    <line x1="640" y1="210" x2="640" y2="315" stroke="#64748B" stroke-width="1.2" />
    <!-- Skirting (100mm) -->
    <rect x="110" y="315" width="610" height="15" fill="#E2E8F0" stroke="#475569" stroke-width="1" />
    <text x="120" y="326" fill="#475569" font-size="8.5" font-weight="bold" font-family="'Inter', sans-serif">SKIRTING: [ ____ mm ]</text>

    <!-- Quartz Countertop -->
    <rect x="105" y="200" width="620" height="10" fill="#E2E8F0" stroke="#0F172A" stroke-width="1.5" />

    <!-- 2. Backsplash / Dado Tile Zone -->
    <rect x="110" y="110" width="610" height="90" fill="#FEFCE8" stroke="#CBD5E1" stroke-width="1" />
    <text x="350" y="155" fill="#475569" font-size="10" font-weight="bold" font-family="'Inter', sans-serif">DADO / BACKSPLASH ZONE</text>

    <!-- 3. Wall Cabinets -->
    <rect x="110" y="50" width="610" height="60" fill="#F8FAFC" stroke="#B8860B" stroke-width="2" />
    <line x1="230" y1="50" x2="230" y2="110" stroke="#64748B" stroke-width="1.2" />
    <line x1="360" y1="50" x2="360" y2="110" stroke="#64748B" stroke-width="1.2" />
    <line x1="490" y1="50" x2="490" y2="110" stroke="#64748B" stroke-width="1.2" />
    <line x1="620" y1="50" x2="620" y2="110" stroke="#64748B" stroke-width="1.2" />
    <text x="350" y="85" fill="#0F172A" font-size="10" font-weight="bold" font-family="'Inter', sans-serif">OVERHEAD CABINETS</text>

    <!-- 4. Loft Cabinets -->
    <rect x="110" y="15" width="610" height="35" fill="#F1F5F9" stroke="#475569" stroke-width="1.5" />
    <text x="370" y="38" fill="#B8860B" font-size="9.5" font-weight="bold" font-family="'Inter', sans-serif">LOFT STORAGE</text>

    <!-- Clean Left-side Horizontal Dimension Callouts (No overlap) -->
    <line x1="95" y1="330" x2="95" y2="200" stroke="#B8860B" stroke-width="1.2" marker-start="url(#cad-arrow)" marker-end="url(#cad-arrow)" />
    <line x1="95" y1="200" x2="95" y2="110" stroke="#B8860B" stroke-width="1.2" marker-start="url(#cad-arrow)" marker-end="url(#cad-arrow)" />
    <line x1="95" y1="110" x2="95" y2="50" stroke="#B8860B" stroke-width="1.2" marker-start="url(#cad-arrow)" marker-end="url(#cad-arrow)" />

    <text x="10" y="270" fill="#B8860B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">BASE HT:</text>
    <text x="10" y="284" fill="#B8860B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">[ ____ mm ]</text>

    <text x="10" y="155" fill="#B8860B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">DADO HT:</text>
    <text x="10" y="169" fill="#B8860B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">[ ____ mm ]</text>

    <text x="10" y="80" fill="#B8860B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">WALL CAB:</text>
    <text x="10" y="94" fill="#B8860B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">[ ____ mm ]</text>

    <!-- Right Side Callout -->
    <text x="735" y="150" fill="#B8860B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif" transform="rotate(90 735,150)">OVERALL RUN: [ ______ mm ]</text>
    '''
    return svg_wrap(inner, "DWG 06-KIT", "MODULAR KITCHEN CARCASS & ERGONOMIC ELEVATION", "1:25", "2D WALL ELEVATION")

# 07. KITCHEN STORAGE & ACCESSORIES
def get_sketch_07():
    inner = '''
    <!-- Cabinetry Storage Internal Breakdown -->
    <!-- 1. 3-Tier Drawer Stack -->
    <g transform="translate(60, 40)">
      <rect x="0" y="0" width="210" height="290" fill="#FFFFFF" stroke="#B8860B" stroke-width="2" />
      <text x="15" y="25" fill="#B8860B" font-size="10" font-weight="bold" font-family="'Inter', sans-serif">1. DRAWER STACK</text>
      <!-- Drawer 1: Cutlery -->
      <rect x="10" y="35" width="190" height="50" fill="#F8FAFC" stroke="#64748B" stroke-width="1.2" />
      <text x="25" y="60" fill="#0F172A" font-size="8.5" font-weight="bold" font-family="'Inter', sans-serif">CUTLERY TRAY ORGANIZER</text>
      <text x="25" y="75" fill="#B8860B" font-size="8.5" font-weight="bold" font-family="'Inter', sans-serif">HT: [ ____ mm ]</text>

      <!-- Drawer 2: Cup & Saucer -->
      <rect x="10" y="95" width="190" height="75" fill="#F8FAFC" stroke="#64748B" stroke-width="1.2" />
      <text x="25" y="130" fill="#0F172A" font-size="8.5" font-weight="bold" font-family="'Inter', sans-serif">CUP & SAUCER TANDEM</text>
      <text x="25" y="148" fill="#B8860B" font-size="8.5" font-weight="bold" font-family="'Inter', sans-serif">HT: [ ____ mm ]</text>

      <!-- Drawer 3: Deep Pot & Thali -->
      <rect x="10" y="180" width="190" height="95" fill="#F8FAFC" stroke="#64748B" stroke-width="1.2" />
      <text x="25" y="225" fill="#0F172A" font-size="8.5" font-weight="bold" font-family="'Inter', sans-serif">THALI / POT TANDEM</text>
      <text x="25" y="245" fill="#B8860B" font-size="8.5" font-weight="bold" font-family="'Inter', sans-serif">HT: [ ____ mm ]</text>
    </g>

    <!-- 2. Corner Solution -->
    <g transform="translate(290, 40)">
      <rect x="0" y="0" width="220" height="290" fill="#FFFFFF" stroke="#B8860B" stroke-width="2" />
      <text x="15" y="25" fill="#B8860B" font-size="10" font-weight="bold" font-family="'Inter', sans-serif">2. CORNER SOLUTION</text>
      <path d="M 30 70 Q 180 50 180 140 Q 180 200 90 200 Q 30 190 30 70 Z" fill="#F0F9FF" stroke="#0284C7" stroke-width="1.8" />
      <text x="45" y="125" fill="#0284C7" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">MAGIC CORNER /</text>
      <text x="45" y="145" fill="#0284C7" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">LeMANS SWING TRAY</text>
      <text x="25" y="240" fill="#B8860B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">SHUTTER W: [ ____ mm ]</text>
      <text x="25" y="260" fill="#64748B" font-size="8.5" font-weight="600" font-family="'Inter', sans-serif">Soft-close Hydraulic Blind Corner</text>
    </g>

    <!-- 3. Tall Pantry Unit -->
    <g transform="translate(530, 40)">
      <rect x="0" y="0" width="210" height="290" fill="#FFFFFF" stroke="#B8860B" stroke-width="2" />
      <text x="15" y="25" fill="#B8860B" font-size="10" font-weight="bold" font-family="'Inter', sans-serif">3. TALL PANTRY UNIT</text>
      <line x1="20" y1="65" x2="190" y2="65" stroke="#64748B" stroke-width="1.5" />
      <line x1="20" y1="105" x2="190" y2="105" stroke="#64748B" stroke-width="1.5" />
      <line x1="20" y1="145" x2="190" y2="145" stroke="#64748B" stroke-width="1.5" />
      <line x1="20" y1="185" x2="190" y2="185" stroke="#64748B" stroke-width="1.5" />
      <line x1="20" y1="225" x2="190" y2="225" stroke="#64748B" stroke-width="1.5" />
      <text x="25" y="130" fill="#0F172A" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">6-TIER WIRE / SOLID BASKET</text>
      <text x="25" y="260" fill="#B8860B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">WIDTH: [ ____ mm ]</text>
      <text x="25" y="278" fill="#B8860B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">HEIGHT: [ ______ mm ]</text>
    </g>
    '''
    return svg_wrap(inner, "DWG 07-ACC", "KITCHEN STORAGE HARDWARE & ACCESSORIES DETAIL", "1:15", "INTERNAL SECTION ELEVATION")

# 08. KITCHEN APPLIANCES & FIXTURES
def get_sketch_08():
    inner = '''
    <line x1="50" y1="330" x2="750" y2="330" stroke="#0F172A" stroke-width="3" />

    <!-- 1. Hob & Chimney Centerline -->
    <g transform="translate(100, 40)">
      <line x1="120" y1="0" x2="120" y2="290" stroke="#94A3B8" stroke-width="1" stroke-dasharray="4,4" />
      <text x="75" y="15" fill="#B8860B" font-size="8.5" font-weight="bold" font-family="'Inter', sans-serif">C/L HOB & CHIMNEY</text>

      <!-- Chimney Hood -->
      <path d="M 60 40 L 180 40 L 210 100 L 30 100 Z" fill="#F1F5F9" stroke="#B8860B" stroke-width="2" />
      <rect x="95" y="20" width="50" height="20" fill="#E2E8F0" stroke="#334155" />
      <text x="75" y="80" fill="#0F172A" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">CHIMNEY HOOD</text>

      <!-- Gas Hob / Induction -->
      <rect x="40" y="160" width="160" height="15" fill="#FEF2F2" stroke="#DC2626" stroke-width="1.8" />
      <circle cx="70" cy="167" r="5" fill="#DC2626" />
      <circle cx="105" cy="167" r="5" fill="#DC2626" />
      <circle cx="140" cy="167" r="5" fill="#DC2626" />
      <circle cx="170" cy="167" r="4" fill="#DC2626" />
      <text x="65" y="195" fill="#DC2626" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">BUILT-IN HOB CUTOUT</text>
      <text x="45" y="215" fill="#B8860B" font-size="8.5" font-weight="bold" font-family="'Inter', sans-serif">CUTOUT: [ ___ x ___ mm ]</text>
      <line x1="220" y1="100" x2="220" y2="160" stroke="#B8860B" stroke-width="1.2" marker-start="url(#cad-arrow)" marker-end="url(#cad-arrow)" />
      <text x="225" y="135" fill="#B8860B" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">CLEARANCE: [ ____ mm ]</text>
    </g>

    <!-- 2. Sink & Swivel Faucet -->
    <g transform="translate(380, 140)">
      <rect x="0" y="60" width="140" height="40" fill="#F0F9FF" stroke="#0284C7" stroke-width="2" />
      <text x="15" y="85" fill="#0284C7" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">UNDERMOUNT SINK</text>
      <path d="M 70 60 L 70 20 Q 70 0 90 0 L 105 15" fill="none" stroke="#B8860B" stroke-width="2.5" />
      <text x="15" y="125" fill="#B8860B" font-size="8.5" font-weight="bold" font-family="'Inter', sans-serif">BOWL: [ ___ x ___ mm ]</text>
      <text x="15" y="145" fill="#64748B" font-size="8" font-family="'Inter', sans-serif">RO Water Purifier Below</text>
    </g>

    <!-- 3. Built-in Oven & Microwave Tall Unit -->
    <g transform="translate(560, 40)">
      <rect x="0" y="0" width="160" height="290" fill="#FFFFFF" stroke="#334155" stroke-width="1.8" />
      <text x="15" y="25" fill="#B8860B" font-size="9.5" font-weight="bold" font-family="'Inter', sans-serif">APPLIANCE TALL UNIT</text>
      <rect x="15" y="45" width="130" height="65" fill="#F8FAFC" stroke="#B8860B" stroke-width="1.5" />
      <text x="35" y="82" fill="#0F172A" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">MICROWAVE NICHE</text>
      <rect x="15" y="120" width="130" height="85" fill="#F8FAFC" stroke="#B8860B" stroke-width="1.5" />
      <text x="45" y="165" fill="#0F172A" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">BUILT-IN OVEN</text>
      <text x="15" y="240" fill="#B8860B" font-size="8.5" font-weight="bold" font-family="'Inter', sans-serif">CAVITY W: [ ____ mm ]</text>
      <text x="15" y="260" fill="#B8860B" font-size="8.5" font-weight="bold" font-family="'Inter', sans-serif">CAVITY H: [ ____ mm ]</text>
    </g>
    '''
    return svg_wrap(inner, "DWG 08-APP", "KITCHEN BUILT-IN APPLIANCES & FIXTURE INTEGRATION", "1:20", "2D ELEVATION")

# 09. MASTER BEDROOM SELECTION
def get_sketch_09():
    inner = '''
    <line x1="50" y1="330" x2="750" y2="330" stroke="#0F172A" stroke-width="3" />

    <!-- Feature Wall Backdrop -->
    <rect x="80" y="40" width="640" height="290" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.2" />

    <!-- Upholstered Headboard Wall Paneling -->
    <rect x="180" y="60" width="440" height="170" fill="#FEFCE8" stroke="#B8860B" stroke-width="1.8" />
    <line x1="290" y1="60" x2="290" y2="230" stroke="#B8860B" stroke-width="1" stroke-dasharray="3,3" />
    <line x1="400" y1="60" x2="400" y2="230" stroke="#B8860B" stroke-width="1" stroke-dasharray="3,3" />
    <line x1="510" y1="60" x2="510" y2="230" stroke="#B8860B" stroke-width="1" stroke-dasharray="3,3" />
    <text x="295" y="90" fill="#0F172A" font-size="10" font-weight="bold" font-family="'Inter', sans-serif">UPHOLSTERED FABRIC / FLUTED HEADBOARD</text>

    <!-- King Bed Base & Mattress with Hydraulic Lift Storage -->
    <rect x="220" y="210" width="360" height="110" rx="3" fill="#FFFFFF" stroke="#B8860B" stroke-width="2.2" />
    <text x="320" y="250" fill="#B8860B" font-size="11" font-weight="bold" font-family="'Inter', sans-serif">KING BED PLATFORM</text>
    <text x="285" y="270" fill="#475569" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">[ HYDRAULIC GAS LIFT STORAGE ]</text>
    <line x1="220" y1="230" x2="580" y2="230" stroke="#334155" stroke-width="1.5" />

    <!-- Floating Bedside Tables (Left & Right) -->
    <rect x="90" y="240" width="110" height="40" fill="#FFFFFF" stroke="#B8860B" stroke-width="1.5" />
    <text x="100" y="265" fill="#0F172A" font-size="8.5" font-weight="bold" font-family="'Inter', sans-serif">NIGHTSTAND L</text>
    <circle cx="145" cy="140" r="10" fill="#FEF08A" stroke="#B8860B" stroke-width="1.5" />
    <text x="105" y="115" fill="#B8860B" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">READING LIGHT</text>

    <rect x="600" y="240" width="110" height="40" fill="#FFFFFF" stroke="#B8860B" stroke-width="1.5" />
    <text x="610" y="265" fill="#0F172A" font-size="8.5" font-weight="bold" font-family="'Inter', sans-serif">NIGHTSTAND R</text>
    <circle cx="655" cy="140" r="10" fill="#FEF08A" stroke="#B8860B" stroke-width="1.5" />
    <text x="615" y="115" fill="#B8860B" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">READING LIGHT</text>

    <!-- Dimension Annotations (ALL BLANK) -->
    <text x="270" y="315" fill="#B8860B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">BED WIDTH: [ ______ mm ] • HT: [ ______ mm ]</text>
    <text x="90" y="300" fill="#B8860B" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">SIDE W: [ ____ mm ]</text>
    <text x="600" y="300" fill="#B8860B" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">SIDE W: [ ____ mm ]</text>
    '''
    return svg_wrap(inner, "DWG 09-BED", "MASTER BEDROOM BED WALL & NIGHTSTAND ELEVATION", "1:25", "2D ELEVATION")

# 10. BEDROOM 2 (KIDS / GUEST / STUDY)
def get_sketch_10():
    inner = '''
    <line x1="50" y1="330" x2="750" y2="330" stroke="#0F172A" stroke-width="3" />

    <!-- Bed Platform Left Side -->
    <rect x="80" y="220" width="280" height="100" fill="#FFFFFF" stroke="#B8860B" stroke-width="2" />
    <text x="160" y="260" fill="#0F172A" font-size="10" font-weight="bold" font-family="'Inter', sans-serif">QUEEN / SINGLE BED</text>
    <text x="150" y="280" fill="#64748B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">Storage Drawers Below</text>
    <text x="110" y="305" fill="#B8860B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">BED W: [ ______ mm ] x L: [ ______ mm ]</text>

    <!-- Integrated Study Desk Right Side -->
    <rect x="400" y="235" width="310" height="15" fill="#E2E8F0" stroke="#B8860B" stroke-width="2" />
    <text x="490" y="247" fill="#B8860B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">STUDY DESKTOP</text>
    <rect x="410" y="250" width="12" height="80" fill="#64748B" />
    <rect x="630" y="250" width="80" height="80" fill="#F8FAFC" stroke="#64748B" stroke-width="1.2" />
    <text x="635" y="295" fill="#475569" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">DRAWER PEDESTAL</text>

    <rect x="400" y="125" width="310" height="100" fill="#F0F9FF" stroke="#0284C7" stroke-width="1.5" />
    <text x="465" y="175" fill="#0284C7" font-size="9.5" font-weight="bold" font-family="'Inter', sans-serif">MAGNETIC PIN-UP SOFT BOARD</text>

    <rect x="400" y="35" width="310" height="80" fill="#FFFFFF" stroke="#B8860B" stroke-width="1.8" />
    <line x1="500" y1="35" x2="500" y2="115" stroke="#64748B" stroke-width="1.2" />
    <line x1="600" y1="35" x2="600" y2="115" stroke="#64748B" stroke-width="1.2" />
    <text x="450" y="65" fill="#0F172A" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">OVERHEAD BOOKSHELF + CLOSED UNITS</text>
    <text x="480" y="90" fill="#B8860B" font-size="8.5" font-weight="bold" font-family="'Inter', sans-serif">LED TASK LIGHT PROFILE BELOW</text>

    <!-- Desk Width & Depth Callout -->
    <line x1="400" y1="218" x2="710" y2="218" stroke="#B8860B" stroke-width="1.2" marker-start="url(#cad-arrow)" marker-end="url(#cad-arrow)" />
    <rect x="445" y="208" width="220" height="20" rx="3" fill="#FFFFFF" stroke="#B8860B" stroke-width="1" />
    <text x="555" y="222" text-anchor="middle" fill="#B8860B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">DESK: [ ______ mm ] x [ ____ mm ]</text>

    <!-- Desk Height from FFL (Cleanly placed to the left of study desk) -->
    <line x1="388" y1="330" x2="388" y2="235" stroke="#B8860B" stroke-width="1.2" marker-start="url(#cad-arrow)" marker-end="url(#cad-arrow)" />
    <text x="378" y="280" text-anchor="end" fill="#B8860B" font-size="8.5" font-weight="bold" font-family="'Inter', sans-serif">DESK HT: [ ____ mm ]</text>
    <text x="378" y="294" text-anchor="end" fill="#64748B" font-size="7.5" font-family="'Inter', sans-serif">(Std. 750mm)</text>
    '''
    return svg_wrap(inner, "DWG 10-KID", "BEDROOM 2 INTEGRATED STUDY DESK & BED ELEVATION", "1:25", "2D ELEVATION")

# 11. WARDROBE (INTERNAL CONFIGURATION)
def get_sketch_11():
    inner = '''
    <line x1="50" y1="340" x2="750" y2="340" stroke="#0F172A" stroke-width="3" />

    <!-- Outer Carcass Box -->
    <rect x="70" y="30" width="660" height="300" fill="#FFFFFF" stroke="#B8860B" stroke-width="2.5" />

    <!-- Top Loft Section -->
    <rect x="70" y="30" width="660" height="50" fill="#F8FAFC" stroke="#64748B" stroke-width="1.5" />
    <text x="310" y="60" fill="#B8860B" font-size="10" font-weight="bold" font-family="'Inter', sans-serif">TOP LOFT STORAGE (H: [ ____ mm ])</text>

    <!-- 4 Internal Compartments -->
    <!-- Compartment A: Long Coat Hanging -->
    <g transform="translate(70, 80)">
      <rect x="0" y="0" width="165" height="250" fill="#FFFFFF" stroke="#64748B" stroke-width="1.2" />
      <text x="12" y="25" fill="#B8860B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">BAY A: LONG HANGING</text>
      <line x1="15" y1="50" x2="150" y2="50" stroke="#0F172A" stroke-width="2.5" />
      <circle cx="15" cy="50" r="4" fill="#B8860B" />
      <circle cx="150" cy="50" r="4" fill="#B8860B" />
      <text x="35" y="70" fill="#64748B" font-size="8" font-family="'Inter', sans-serif">OVAL HANGER ROD</text>
      <line x1="0" y1="210" x2="165" y2="210" stroke="#64748B" stroke-width="1.2" />
      <text x="25" y="235" fill="#64748B" font-size="8" font-family="'Inter', sans-serif">LUGGAGE BASE</text>
      <text x="15" y="195" fill="#B8860B" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">CLEAR HT: [ ____ mm ]</text>
    </g>

    <!-- Compartment B: Double Hanging -->
    <g transform="translate(235, 80)">
      <rect x="0" y="0" width="165" height="250" fill="#FFFFFF" stroke="#64748B" stroke-width="1.2" />
      <text x="12" y="25" fill="#B8860B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">BAY B: DOUBLE HANG</text>
      <line x1="15" y1="45" x2="150" y2="45" stroke="#0F172A" stroke-width="2.5" />
      <text x="35" y="65" fill="#64748B" font-size="8" font-family="'Inter', sans-serif">SHIRT HANGER ROD</text>
      <line x1="0" y1="125" x2="165" y2="125" stroke="#B8860B" stroke-width="1.5" />
      <line x1="15" y1="165" x2="150" y2="165" stroke="#0F172A" stroke-width="2.5" />
      <text x="25" y="185" fill="#64748B" font-size="8" font-family="'Inter', sans-serif">TROUSER PULL-OUT</text>
      <text x="15" y="110" fill="#B8860B" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">TOP HT: [ ____ mm ]</text>
      <text x="15" y="230" fill="#B8860B" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">BTM HT: [ ____ mm ]</text>
    </g>

    <!-- Compartment C: Stacked Shelves -->
    <g transform="translate(400, 80)">
      <rect x="0" y="0" width="165" height="250" fill="#FFFFFF" stroke="#64748B" stroke-width="1.2" />
      <text x="12" y="25" fill="#B8860B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">BAY C: SHELF STACK</text>
      <line x1="0" y1="60" x2="165" y2="60" stroke="#64748B" stroke-width="1.2" />
      <line x1="0" y1="120" x2="165" y2="120" stroke="#64748B" stroke-width="1.2" />
      <line x1="0" y1="180" x2="165" y2="180" stroke="#64748B" stroke-width="1.2" />
      <text x="25" y="95" fill="#0F172A" font-size="8.5" font-weight="bold" font-family="'Inter', sans-serif">4 EQUAL TIERS</text>
      <text x="12" y="225" fill="#B8860B" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">TIER SPACING: [ ____ mm ]</text>
    </g>

    <!-- Compartment D: Internal Lockable Drawers & Safe -->
    <g transform="translate(565, 80)">
      <rect x="0" y="0" width="165" height="250" fill="#FFFFFF" stroke="#64748B" stroke-width="1.2" />
      <text x="12" y="25" fill="#B8860B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">BAY D: DRAWERS/LOCK</text>
      <rect x="15" y="40" width="135" height="40" fill="#FEFCE8" stroke="#B8860B" stroke-width="1.2" />
      <text x="25" y="65" fill="#B8860B" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">LOCKER / SAFE NICHE</text>
      <rect x="15" y="90" width="135" height="35" fill="#F8FAFC" stroke="#64748B" stroke-width="1" />
      <text x="22" y="112" fill="#0F172A" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">DRAWER 1 (JEWELLERY)</text>
      <rect x="15" y="130" width="135" height="35" fill="#F8FAFC" stroke="#64748B" stroke-width="1" />
      <text x="22" y="152" fill="#0F172A" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">DRAWER 2 (WITH LOCK)</text>
      <rect x="15" y="170" width="135" height="35" fill="#F8FAFC" stroke="#64748B" stroke-width="1" />
      <text x="22" y="192" fill="#0F172A" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">DRAWER 3 (ACCESSORY)</text>
      <text x="12" y="235" fill="#B8860B" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">DRAWER HT: [ ____ mm ]</text>
    </g>
    '''
    return svg_wrap(inner, "DWG 11-WAR", "WARDROBE INTERNAL CARCASS & SHELF CONFIGURATION", "1:25", "INTERNAL SECTIONAL ELEVATION")

# 12. WARDROBE (DOORS, HARDWARE & ACCESSORIES)
def get_sketch_12():
    inner = '''
    <line x1="50" y1="340" x2="750" y2="340" stroke="#0F172A" stroke-width="3" />

    <rect x="80" y="30" width="640" height="300" fill="#FFFFFF" stroke="#B8860B" stroke-width="2.5" />

    <!-- 4 Shutters (160mm each) -->
    <!-- Door 1 -->
    <rect x="80" y="30" width="160" height="300" fill="#F8FAFC" stroke="#64748B" stroke-width="1.5" />
    <rect x="225" y="100" width="6" height="120" rx="2" fill="#B8860B" />
    <text x="95" y="60" fill="#0F172A" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">SHUTTER 01 (PU)</text>

    <!-- Door 2 (Fluted Glass) -->
    <rect x="240" y="30" width="160" height="300" fill="#F0F9FF" stroke="#0284C7" stroke-width="1.8" />
    <line x1="260" y1="30" x2="260" y2="330" stroke="#0284C7" stroke-width="0.8" stroke-dasharray="4,2" />
    <line x1="280" y1="30" x2="280" y2="330" stroke="#0284C7" stroke-width="0.8" stroke-dasharray="4,2" />
    <line x1="300" y1="30" x2="300" y2="330" stroke="#0284C7" stroke-width="0.8" stroke-dasharray="4,2" />
    <line x1="320" y1="30" x2="320" y2="330" stroke="#0284C7" stroke-width="0.8" stroke-dasharray="4,2" />
    <line x1="340" y1="30" x2="340" y2="330" stroke="#0284C7" stroke-width="0.8" stroke-dasharray="4,2" />
    <line x1="360" y1="30" x2="360" y2="330" stroke="#0284C7" stroke-width="0.8" stroke-dasharray="4,2" />
    <rect x="245" y="100" width="6" height="120" rx="2" fill="#B8860B" />
    <text x="255" y="60" fill="#0284C7" font-size="8.5" font-weight="bold" font-family="'Inter', sans-serif">FLUTED GLASS</text>

    <!-- Door 3 (Sensor LED) -->
    <rect x="400" y="30" width="160" height="300" fill="#FEFCE8" stroke="#CA8A04" stroke-width="1.8" />
    <line x1="410" y1="35" x2="410" y2="325" stroke="#CA8A04" stroke-width="2" stroke-dasharray="3,3" />
    <rect x="545" y="100" width="6" height="120" rx="2" fill="#B8860B" />
    <text x="420" y="60" fill="#CA8A04" font-size="8.5" font-weight="bold" font-family="'Inter', sans-serif">SENSOR LED STRIP</text>

    <!-- Door 4 (Full Height Mirror) -->
    <rect x="560" y="30" width="160" height="300" fill="#F1F5F9" stroke="#64748B" stroke-width="1.5" />
    <rect x="565" y="100" width="6" height="120" rx="2" fill="#B8860B" />
    <text x="585" y="60" fill="#0F172A" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">BRONZE MIRROR</text>

    <!-- Dimension Strings (ALL BLANK) -->
    <line x1="80" y1="18" x2="720" y2="18" stroke="#B8860B" stroke-width="1.2" marker-start="url(#cad-arrow)" marker-end="url(#cad-arrow)" />
    <text x="320" y="14" fill="#B8860B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">OVERALL W: [ ______ mm ]</text>

    <text x="85" y="290" fill="#B8860B" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">SHUTTER W: [ ____ mm ]</text>
    <text x="245" y="290" fill="#B8860B" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">HANDLE L: [ ______ mm ]</text>
    <text x="410" y="290" fill="#B8860B" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">SOFT-CLOSE: [ YES / NO ]</text>
    <text x="565" y="290" fill="#B8860B" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">SKIRTING: [ ____ mm ]</text>
    '''
    return svg_wrap(inner, "DWG 12-HRD", "WARDROBE SHUTTERS, PROFILE HANDLES & HARDWARE DETAIL", "1:25", "EXTERIOR ELEVATION")

# 13. BATHROOMS / WASHROOM (SANITARYWARE & BASIN) - 100% COLLISION-FREE CAD ELEVATION
def get_sketch_13():
    inner = '''
    <!-- Finished Floor Line (FFL 0.00) -->
    <line x1="50" y1="345" x2="750" y2="345" stroke="#0F172A" stroke-width="3" />
    <text x="60" y="362" fill="#64748B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">FFL ± 0.00</text>

    <!-- 1. Backlit LED Pill/Capsule Mirror (Elevated: y=18 to y=118, zero overlap with faucet/basin!) -->
    <g transform="translate(305, 18)">
      <rect x="0" y="0" width="190" height="98" rx="49" fill="#FEFCE8" stroke="#B8860B" stroke-width="2" stroke-dasharray="4,2" />
      <text x="95" y="44" fill="#997A15" font-size="10" font-weight="bold" font-family="'Inter', sans-serif" text-anchor="middle">BACKLIT LED MIRROR</text>
      <text x="95" y="65" fill="#0F172A" font-size="9" font-weight="bold" font-family="'Inter', sans-serif" text-anchor="middle">SIZE: [ ___ x ___ mm ]</text>
    </g>

    <!-- 2. Tall Body Deck-Mounted Faucet (Behind basin center at x=400, y=124 to y=190) -->
    <path d="M 400 190 L 400 128 Q 400 114 416 114 L 424 120" fill="none" stroke="#B8860B" stroke-width="3.5" stroke-linecap="round" />
    <circle cx="424" cy="120" r="3" fill="#B8860B" />

    <!-- 3. Ceramic Table-Top Vessel Basin (Resting cleanly on top of counter at y=190) -->
    <!-- Basin Profile: y=152 to 190 -->
    <path d="M 330 190 L 470 190 C 495 190 515 170 515 156 L 285 156 C 285 170 305 190 330 190 Z" fill="#FFFFFF" stroke="#0F172A" stroke-width="2.2" />
    <ellipse cx="400" cy="156" rx="115" ry="12" fill="#F8FAFC" stroke="#0F172A" stroke-width="2" />
    <ellipse cx="400" cy="156" rx="90" ry="7" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1" />

    <!-- Basin Dimension Leader Callout (Cleanly positioned on upper-left, NO collision with basin) -->
    <line x1="285" y1="156" x2="220" y2="135" stroke="#B8860B" stroke-width="1.2" />
    <line x1="220" y1="135" x2="100" y2="135" stroke="#B8860B" stroke-width="1.2" />
    <text x="100" y="128" fill="#B8860B" font-size="9.5" font-weight="bold" font-family="'Inter', sans-serif">CERAMIC VESSEL BASIN</text>
    <text x="100" y="147" fill="#0F172A" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">SIZE: [ ___ x ___ mm ]</text>

    <!-- 4. Quartz Countertop Slab (y=190 to 206) -->
    <rect x="170" y="190" width="460" height="16" rx="2" fill="#E2E8F0" stroke="#0F172A" stroke-width="2" />
    <!-- Top Thickness Callout (Right) -->
    <line x1="630" y1="198" x2="660" y2="198" stroke="#B8860B" stroke-width="1.2" />
    <text x="665" y="202" fill="#B8860B" font-size="8.5" font-weight="bold" font-family="'Inter', sans-serif">TOP THK: [ ___ mm ]</text>

    <!-- 5. 2-Drawer Floating Vanity Cabinet (y=206 to 282) -->
    <rect x="180" y="206" width="440" height="76" fill="#F8FAFC" stroke="#B8860B" stroke-width="2" />
    <line x1="400" y1="206" x2="400" y2="282" stroke="#B8860B" stroke-width="1.5" />
    <!-- Gola Profile / Finger Pull Channel -->
    <rect x="180" y="206" width="440" height="7" fill="#E2E8F0" stroke="#CBD5E1" stroke-width="0.8" />

    <!-- Drawer 1 (Left Bay) -->
    <text x="290" y="246" text-anchor="middle" fill="#0F172A" font-size="9.5" font-weight="bold" font-family="'Inter', sans-serif">DRAWER 01 (LEFT)</text>
    <text x="290" y="264" text-anchor="middle" fill="#64748B" font-size="8" font-family="'Inter', sans-serif">Soft-Close Tandem</text>

    <!-- Drawer 2 (Right Bay) -->
    <text x="510" y="246" text-anchor="middle" fill="#0F172A" font-size="9.5" font-weight="bold" font-family="'Inter', sans-serif">DRAWER 02 (RIGHT)</text>
    <text x="510" y="264" text-anchor="middle" fill="#64748B" font-size="8" font-family="'Inter', sans-serif">U-Cutout for Bottle Trap</text>

    <!-- 6. Concealed Bottle Trap & Plumbing Centerline (y=282 to 345) -->
    <path d="M 400 282 L 400 305 L 435 305 L 435 322 L 400 322 L 400 345" fill="none" stroke="#0284C7" stroke-width="2.5" stroke-dasharray="4,2" />
    <line x1="435" y1="314" x2="475" y2="314" stroke="#0284C7" stroke-width="1" />
    <text x="480" y="318" fill="#0284C7" font-size="8.5" font-weight="bold" font-family="'Inter', sans-serif">BOTTLE TRAP C/L</text>

    <!-- 7. Dimension Callouts (ALL STRICTLY BLANK) -->
    <!-- Total Vanity Width String (Below Vanity) -->
    <line x1="180" y1="294" x2="620" y2="294" stroke="#B8860B" stroke-width="1.2" marker-start="url(#cad-tick)" marker-end="url(#cad-tick)" />
    <rect x="295" y="284" width="210" height="20" rx="3" fill="#FFFFFF" stroke="#B8860B" stroke-width="1" />
    <text x="400" y="298" text-anchor="middle" fill="#B8860B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">VANITY TOTAL W: [ ______ mm ]</text>

    <!-- Countertop Height from FFL (Left Side) -->
    <line x1="150" y1="345" x2="150" y2="190" stroke="#B8860B" stroke-width="1.2" marker-start="url(#cad-arrow)" marker-end="url(#cad-arrow)" />
    <text x="140" y="262" text-anchor="end" fill="#B8860B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">COUNTER HT: [ ____ mm ]</text>
    <text x="140" y="278" text-anchor="end" fill="#64748B" font-size="8" font-family="'Inter', sans-serif">(Std. 825-850mm from FFL)</text>

    <!-- Floor Clearance from FFL (Right Side) -->
    <line x1="645" y1="345" x2="645" y2="282" stroke="#B8860B" stroke-width="1.2" marker-start="url(#cad-arrow)" marker-end="url(#cad-arrow)" />
    <text x="655" y="310" fill="#B8860B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">CLEARANCE: [ ____ mm ]</text>
    <text x="655" y="326" fill="#64748B" font-size="8" font-family="'Inter', sans-serif">(Std. 250-300mm Min.)</text>
    '''
    return svg_wrap(inner, "DWG 13-SAN", "WASHROOM VANITY COUNTER & BASIN DETAIL ELEVATION", "1:20", "2D ELEVATION")

# 14. BATHROOMS / WASHROOM (SHOWER, WC & FITTINGS)
def get_sketch_14():
    inner = '''
    <line x1="50" y1="340" x2="750" y2="340" stroke="#0F172A" stroke-width="3" />

    <!-- Dry Zone (WC Area) Left Side -->
    <g transform="translate(80, 40)">
      <rect x="0" y="0" width="280" height="290" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5" />
      <text x="90" y="25" fill="#0F172A" font-size="10" font-weight="bold" font-family="'Inter', sans-serif">DRY ZONE: WC AREA</text>

      <!-- Concealed Cistern Cavity -->
      <rect x="30" y="50" width="100" height="150" fill="#F8FAFC" stroke="#64748B" stroke-width="1.5" />
      <rect x="65" y="80" width="30" height="20" rx="2" fill="#B8860B" />
      <text x="40" y="115" fill="#B8860B" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">FLUSH PLATE</text>

      <!-- Wall Hung WC Pot -->
      <path d="M 130 150 Q 230 150 230 190 Q 230 220 180 235 L 130 235 Z" fill="#FFFFFF" stroke="#0F172A" stroke-width="2" />
      <text x="145" y="195" fill="#0F172A" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">WALL-HUNG WC</text>

      <text x="140" y="135" fill="#0284C7" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">HEALTH FAUCET</text>
      <text x="25" y="235" fill="#B8860B" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">CENTERLINE: [ ____ mm ]</text>
      <text x="25" y="255" fill="#B8860B" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">SEAT HT FROM FFL: [ ____ mm ]</text>
    </g>

    <!-- Glass Shower Partition -->
    <line x1="390" y1="40" x2="390" y2="330" stroke="#0284C7" stroke-width="4" stroke-linecap="round" />
    <text x="390" y="25" fill="#0284C7" font-size="8.5" font-weight="bold" font-family="'Inter', sans-serif" text-anchor="middle">10mm GLASS PARTITION: [ ___ x ___ mm ]</text>

    <!-- Wet Zone (Shower & Diverter) Right Side -->
    <g transform="translate(420, 40)">
      <rect x="0" y="0" width="300" height="290" fill="#F0F9FF" stroke="#0284C7" stroke-width="1.5" />
      <text x="90" y="25" fill="#0284C7" font-size="10" font-weight="bold" font-family="'Inter', sans-serif">WET ZONE: SHOWER AREA</text>

      <!-- Overhead Rain Shower Arm (Elevated: zero overlap) -->
      <path d="M 240 55 L 160 55 L 160 72" fill="none" stroke="#B8860B" stroke-width="3" />
      <ellipse cx="160" cy="74" rx="25" ry="6" fill="#B8860B" />
      <text x="160" y="44" text-anchor="middle" fill="#B8860B" font-size="8.5" font-weight="bold" font-family="'Inter', sans-serif">RAIN SHOWER: [ ____ mm ]</text>

      <!-- Concealed Diverter (Clean leader line to the left) -->
      <circle cx="230" cy="180" r="14" fill="#FFFFFF" stroke="#B8860B" stroke-width="2" />
      <line x1="214" y1="180" x2="175" y2="180" stroke="#B8860B" stroke-width="1" />
      <text x="170" y="184" text-anchor="end" fill="#B8860B" font-size="8.5" font-weight="bold" font-family="'Inter', sans-serif">DIVERTER: [ ____ mm ]</text>

      <!-- Recessed Shower Niche -->
      <rect x="30" y="100" width="80" height="60" fill="#FEFCE8" stroke="#CA8A04" stroke-width="1.5" />
      <text x="35" y="130" fill="#CA8A04" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">LED NICHE</text>
      <text x="35" y="145" fill="#B8860B" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">[ ___ x ___ mm ]</text>

      <!-- Floor Drain Channel -->
      <rect x="180" y="280" width="90" height="10" fill="#E2E8F0" stroke="#0F172A" stroke-width="1" />
      <text x="180" y="275" fill="#0F172A" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">SLOPE TO DRAIN (1:50)</text>

      <text x="25" y="235" fill="#B8860B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">SHOWER AREA: [ ___ (W) x ___ (L) ft ]</text>
    </g>
    '''
    return svg_wrap(inner, "DWG 14-SHW", "WASHROOM WET / DRY ZONING & SHOWER SECTION", "1:25", "SECTIONAL ELEVATION")

# 15. PLUMBING & ELECTRICAL INFRASTRUCTURE
def get_sketch_15():
    inner = '''
    <g transform="translate(60, 40)">
      <rect x="0" y="0" width="320" height="290" fill="#FFFFFF" stroke="#0284C7" stroke-width="1.8" rx="4" />
      <text x="15" y="25" fill="#0284C7" font-size="10.5" font-weight="bold" font-family="'Inter', sans-serif">A. PLUMBING RISER & GEYSER DETAIL</text>

      <rect x="30" y="50" width="110" height="90" fill="#F8FAFC" stroke="#B8860B" stroke-width="1.8" />
      <text x="40" y="90" fill="#0F172A" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">STORAGE GEYSER</text>
      <text x="40" y="110" fill="#B8860B" font-size="8.5" font-weight="bold" font-family="'Inter', sans-serif">CAPACITY: [ ___ Ltr ]</text>

      <!-- Hot & Cold Piping Lines -->
      <line x1="60" y1="140" x2="60" y2="250" stroke="#DC2626" stroke-width="3" />
      <line x1="100" y1="140" x2="100" y2="250" stroke="#0284C7" stroke-width="3" />
      <text x="15" y="200" fill="#DC2626" font-size="8" font-weight="bold" font-family="'Inter', sans-serif" transform="rotate(-90 15,200)">HOT WATER (CPVC)</text>
      <text x="115" y="200" fill="#0284C7" font-size="8" font-weight="bold" font-family="'Inter', sans-serif" transform="rotate(-90 115,200)">COLD WATER (uPVC)</text>

      <line x1="60" y1="230" x2="100" y2="230" stroke="#B8860B" stroke-width="1.2" marker-start="url(#cad-tick)" marker-end="url(#cad-tick)" />
      <text x="15" y="265" fill="#B8860B" font-size="8.5" font-weight="bold" font-family="'Inter', sans-serif">HOT-COLD C/C: [ ____ mm (Std 150mm) ]</text>
      <text x="15" y="280" fill="#64748B" font-size="8" font-family="'Inter', sans-serif">PIPE BRAND: Astral / Supreme / Ashirvad</text>
    </g>

    <!-- Electrical Distribution & Conduit Layout -->
    <g transform="translate(420, 40)">
      <rect x="0" y="0" width="320" height="290" fill="#FFFFFF" stroke="#B8860B" stroke-width="1.8" rx="4" />
      <text x="15" y="25" fill="#B8860B" font-size="10.5" font-weight="bold" font-family="'Inter', sans-serif">B. ELECTRICAL CONDUIT & DB LAYOUT</text>

      <rect x="30" y="50" width="120" height="70" fill="#F8FAFC" stroke="#0F172A" stroke-width="1.5" />
      <text x="45" y="85" fill="#0F172A" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">MAIN DB BOX</text>
      <text x="35" y="105" fill="#B8860B" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">RCCB + MCB CHANNELS</text>

      <rect x="180" y="50" width="110" height="70" fill="#FEFCE8" stroke="#B8860B" stroke-width="1.2" />
      <text x="190" y="85" fill="#B8860B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">INVERTER BACKUP</text>
      <text x="190" y="105" fill="#64748B" font-size="8" font-family="'Inter', sans-serif">Dedicated Circuit</text>

      <line x1="30" y1="160" x2="290" y2="160" stroke="#64748B" stroke-width="1" stroke-dasharray="2,2" />
      <text x="30" y="150" fill="#0F172A" font-size="8.5" font-weight="bold" font-family="'Inter', sans-serif">SWITCHBOARD HT: [ ____ mm from FFL ]</text>
      <text x="30" y="185" fill="#B8860B" font-size="8.5" font-weight="bold" font-family="'Inter', sans-serif">GEYSER 25A POINT: [ ____ mm from FFL ]</text>
      <text x="30" y="210" fill="#B8860B" font-size="8.5" font-weight="bold" font-family="'Inter', sans-serif">AC 16A POINT HT: [ ____ mm from FFL ]</text>
      <text x="30" y="235" fill="#B8860B" font-size="8.5" font-weight="bold" font-family="'Inter', sans-serif">WIRE SPEC: FR / FRLS [ Polycab / Havells ]</text>
      <text x="30" y="260" fill="#64748B" font-size="8" font-family="'Inter', sans-serif">Waterproof IP44 Sockets in Wet Zones</text>
    </g>
    '''
    return svg_wrap(inner, "DWG 15-MEP", "PLUMBING RISER & ELECTRICAL INFRASTRUCTURE SCHEMATIC", "1:20", "MEP SCHEMATIC")

# 16. FALSE CEILING & ARCHITECTURAL LIGHTING
def get_sketch_16():
    inner = '''
    <rect x="60" y="30" width="680" height="230" fill="#FFFFFF" stroke="#B8860B" stroke-width="2" />

    <!-- Perimeter Gypsum Drop -->
    <rect x="90" y="60" width="620" height="170" fill="#FEFCE8" stroke="#CA8A04" stroke-width="1.8" stroke-dasharray="4,2" />
    <text x="300" y="80" fill="#CA8A04" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">PERIMETER COVE LIGHT RECESS</text>

    <!-- Center Ceiling Island Drop -->
    <rect x="180" y="100" width="440" height="90" fill="#F8FAFC" stroke="#B8860B" stroke-width="1.5" />
    <text x="330" y="135" fill="#0F172A" font-size="10" font-weight="bold" font-family="'Inter', sans-serif">CENTER CEILING ISLAND</text>
    <circle cx="400" cy="150" r="10" fill="#FEF08A" stroke="#B8860B" stroke-width="1.8" />
    <text x="415" y="154" fill="#B8860B" font-size="8.5" font-weight="bold" font-family="'Inter', sans-serif">CHANDELIER HOOK</text>

    <!-- COB Spotlights Grid -->
    <circle cx="120" cy="85" r="5" fill="#CA8A04" stroke="#0F172A" stroke-width="1" />
    <circle cx="280" cy="85" r="5" fill="#CA8A04" stroke="#0F172A" stroke-width="1" />
    <circle cx="520" cy="85" r="5" fill="#CA8A04" stroke="#0F172A" stroke-width="1" />
    <circle cx="680" cy="85" r="5" fill="#CA8A04" stroke="#0F172A" stroke-width="1" />
    <circle cx="120" cy="205" r="5" fill="#CA8A04" stroke="#0F172A" stroke-width="1" />
    <circle cx="280" cy="205" r="5" fill="#CA8A04" stroke="#0F172A" stroke-width="1" />
    <circle cx="520" cy="205" r="5" fill="#CA8A04" stroke="#0F172A" stroke-width="1" />
    <circle cx="680" cy="205" r="5" fill="#CA8A04" stroke="#0F172A" stroke-width="1" />
    <text x="135" y="90" fill="#0F172A" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">7W COB SPOT</text>

    <!-- Magnetic Track Rail Line -->
    <line x1="200" y1="170" x2="350" y2="170" stroke="#0F172A" stroke-width="4" />
    <line x1="200" y1="170" x2="350" y2="170" stroke="#B8860B" stroke-width="1.5" />
    <text x="210" y="165" fill="#B8860B" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">MAGNETIC TRACK RAIL</text>

    <!-- Cove Cross Section Detail -->
    <g transform="translate(60, 275)">
      <rect x="0" y="0" width="680" height="60" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.2" />
      <text x="15" y="20" fill="#B8860B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">TYPICAL COVE SECTION DETAIL:</text>
      <path d="M 230 45 L 300 45 L 300 25 L 380 25 L 380 15 L 420 15" fill="none" stroke="#0F172A" stroke-width="2.5" />
      <circle cx="360" cy="20" r="3" fill="#CA8A04" />
      <text x="430" y="30" fill="#CA8A04" font-size="8.5" font-weight="bold" font-family="'Inter', sans-serif">LED STRIP (3000K)</text>
      <text x="15" y="45" fill="#B8860B" font-size="8.5" font-weight="bold" font-family="'Inter', sans-serif">COVE DROP: [ ____ mm ] • COVE POCKET LIP: [ ____ mm ] • CLEAR HT: [ ______ ft ]</text>
    </g>
    '''
    return svg_wrap(inner, "DWG 16-RCP", "REFLECTED CEILING PLAN (RCP) & COVE LIGHTING SECTION", "1:30", "REFLECTED CEILING PLAN")

# 17. DOORS, WINDOWS & RAILINGS
def get_sketch_17():
    inner = '''
    <line x1="50" y1="340" x2="750" y2="340" stroke="#0F172A" stroke-width="3" />

    <!-- 1. Main Entrance Door with Digital Lock & Architrave -->
    <g transform="translate(60, 40)">
      <rect x="0" y="0" width="190" height="290" fill="#FFFFFF" stroke="#B8860B" stroke-width="2.2" />
      <text x="15" y="25" fill="#B8860B" font-size="9.5" font-weight="bold" font-family="'Inter', sans-serif">1. MAIN ENTRANCE DOOR</text>
      <rect x="15" y="35" width="160" height="255" fill="#F8FAFC" stroke="#64748B" stroke-width="1.5" />
      <line x1="15" y1="120" x2="175" y2="120" stroke="#B8860B" stroke-width="1" />
      <line x1="15" y1="200" x2="175" y2="200" stroke="#B8860B" stroke-width="1" />
      <rect x="145" y="140" width="12" height="35" rx="2" fill="#0F172A" stroke="#B8860B" stroke-width="1" />
      <text x="25" y="160" fill="#B8860B" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">DIGITAL SMART LOCK</text>
      <text x="18" y="270" fill="#B8860B" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">SIZE: [ ___ (W) x ___ (H) ]</text>
    </g>

    <!-- 2. uPVC / Aluminium 3-Track Sliding Window -->
    <g transform="translate(285, 40)">
      <rect x="0" y="0" width="230" height="290" fill="#FFFFFF" stroke="#0284C7" stroke-width="2" />
      <text x="15" y="25" fill="#0284C7" font-size="9.5" font-weight="bold" font-family="'Inter', sans-serif">2. 3-TRACK SLIDING WINDOW</text>
      <rect x="15" y="45" width="60" height="180" fill="#F0F9FF" stroke="#0284C7" stroke-width="1.5" />
      <rect x="85" y="45" width="60" height="180" fill="#F0F9FF" stroke="#0284C7" stroke-width="1.5" />
      <rect x="155" y="45" width="60" height="180" fill="#F8FAFC" stroke="#64748B" stroke-width="1.5" stroke-dasharray="2,2" />
      <text x="160" y="140" fill="#64748B" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">MESH</text>
      <text x="25" y="250" fill="#B8860B" font-size="8.5" font-weight="bold" font-family="'Inter', sans-serif">WINDOW SIZE: [ ___ x ___ mm ]</text>
      <text x="25" y="270" fill="#64748B" font-size="8" font-family="'Inter', sans-serif">Aluminium / uPVC (Toughened Glass)</text>
    </g>

    <!-- 3. Balcony Frameless Glass Railing -->
    <g transform="translate(545, 40)">
      <rect x="0" y="0" width="195" height="290" fill="#FFFFFF" stroke="#B8860B" stroke-width="2" />
      <text x="15" y="25" fill="#B8860B" font-size="9.5" font-weight="bold" font-family="'Inter', sans-serif">3. BALCONY GLASS RAILING</text>
      <rect x="15" y="70" width="165" height="10" fill="#E2E8F0" stroke="#0F172A" stroke-width="1" />
      <text x="25" y="65" fill="#B8860B" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">SS 304 SLOTTED RAIL</text>
      <rect x="25" y="80" width="145" height="160" fill="rgba(2, 132, 199, 0.08)" stroke="#0284C7" stroke-width="1.8" />
      <text x="35" y="160" fill="#0284C7" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">12mm TOUGHENED GLASS</text>
      <rect x="20" y="240" width="155" height="20" fill="#F1F5F9" stroke="#64748B" stroke-width="1.2" />
      <text x="25" y="253" fill="#0F172A" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">ALUMINIUM BASE SHOE</text>
      <text x="18" y="278" fill="#B8860B" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">RAILING HT: [ ____ mm (Std 1050) ]</text>
    </g>
    '''
    return svg_wrap(inner, "DWG 17-OPN", "DOORS, WINDOWS & BALCONY RAILING ARCHITECTURAL DETAIL", "1:20", "2D ELEVATION")

# 18. SPECIAL FEATURES, BUDGET & STUDIO SIGN-OFF
def get_sketch_18():
    inner = '''
    <!-- 1. CNC Cut Corian / Teak Mandir Unit -->
    <g transform="translate(60, 30)">
      <rect x="0" y="0" width="200" height="180" fill="#FFFFFF" stroke="#B8860B" stroke-width="1.8" rx="3" />
      <text x="15" y="22" fill="#B8860B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">A. POOJA / MANDIR UNIT</text>
      <path d="M 40 70 Q 100 40 160 70 L 160 140 L 40 140 Z" fill="#FEFCE8" stroke="#B8860B" stroke-width="1.5" />
      <circle cx="100" cy="95" r="18" fill="none" stroke="#B8860B" stroke-width="1.2" stroke-dasharray="2,2" />
      <text x="65" y="160" fill="#0F172A" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">CNC BACKLIT JALI</text>
      <text x="15" y="172" fill="#B8860B" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">SIZE: [ ___ x ___ x ___ mm ]</text>
    </g>

    <!-- 2. Compact Bar & Wine Counter -->
    <g transform="translate(290, 30)">
      <rect x="0" y="0" width="210" height="180" fill="#FFFFFF" stroke="#B8860B" stroke-width="1.8" rx="3" />
      <text x="15" y="22" fill="#B8860B" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">B. HOME BAR COUNTER</text>
      <rect x="20" y="40" width="170" height="45" fill="#F0F9FF" stroke="#0284C7" stroke-width="1.2" />
      <text x="40" y="65" fill="#0284C7" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">WINE STEMWARE RACK</text>
      <rect x="20" y="95" width="170" height="50" fill="#F8FAFC" stroke="#B8860B" stroke-width="1.2" />
      <text x="40" y="125" fill="#0F172A" font-size="8.5" font-weight="bold" font-family="'Inter', sans-serif">QUARTZ SERVICE LEDGE</text>
      <text x="18" y="170" fill="#B8860B" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">BAR W: [ ____ mm ] • HT: [ ____ mm ]</text>
    </g>

    <!-- 3. Smart Home Automation Topology -->
    <g transform="translate(530, 30)">
      <rect x="0" y="0" width="210" height="180" fill="#FFFFFF" stroke="#0284C7" stroke-width="1.8" rx="3" />
      <text x="15" y="22" fill="#0284C7" font-size="9" font-weight="bold" font-family="'Inter', sans-serif">C. SMART HOME AUTOMATION</text>
      <rect x="40" y="45" width="130" height="35" rx="3" fill="#F0F9FF" stroke="#0284C7" stroke-width="1.2" />
      <text x="50" y="67" fill="#0284C7" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">CENTRAL IOT GATEWAY</text>
      <text x="20" y="105" fill="#B8860B" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">• Smart Curtain Motors (W: ____)</text>
      <text x="20" y="125" fill="#B8860B" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">• 4-Scene Mood Lighting</text>
      <text x="20" y="145" fill="#B8860B" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">• Digital Biometric Door Lock</text>
      <text x="20" y="165" fill="#64748B" font-size="8" font-family="'Inter', sans-serif">PROTOCOL: Zigbee / Matter</text>
    </g>

    <!-- 4. OFFICIAL ARCHITECTURAL TITLE BLOCK & SIGN-OFF TABLE (Bottom) -->
    <g transform="translate(60, 230)">
      <rect x="0" y="0" width="680" height="110" fill="#F8FAFC" stroke="#B8860B" stroke-width="2" rx="3" />
      <line x1="220" y1="0" x2="220" y2="110" stroke="#B8860B" stroke-width="1.2" />
      <line x1="450" y1="0" x2="450" y2="110" stroke="#B8860B" stroke-width="1.2" />
      <line x1="0" y1="30" x2="680" y2="30" stroke="#B8860B" stroke-width="1.2" />

      <!-- Col 1: Interior Studio Sign-off -->
      <text x="20" y="20" fill="#B8860B" font-size="9.5" font-weight="bold" font-family="'Inter', sans-serif">INTERIOR DESIGNER SIGN-OFF</text>
      <text x="20" y="55" fill="#475569" font-size="8.5" font-weight="600" font-family="'Inter', sans-serif">Lead Architect / Designer:</text>
      <line x1="20" y1="90" x2="200" y2="90" stroke="#0F172A" stroke-width="1" stroke-dasharray="2,2" />
      <text x="20" y="102" fill="#B8860B" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">SIGNATURE & DATE</text>

      <!-- Col 2: Site Project Engineer -->
      <text x="240" y="20" fill="#B8860B" font-size="9.5" font-weight="bold" font-family="'Inter', sans-serif">SITE PROJECT ENGINEER</text>
      <text x="240" y="55" fill="#475569" font-size="8.5" font-weight="600" font-family="'Inter', sans-serif">Site Verification & Civil Check:</text>
      <line x1="240" y1="90" x2="430" y2="90" stroke="#0F172A" stroke-width="1" stroke-dasharray="2,2" />
      <text x="240" y="102" fill="#B8860B" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">SIGNATURE & DATE</text>

      <!-- Col 3: Client Acceptance & Sign-off -->
      <text x="470" y="20" fill="#B8860B" font-size="9.5" font-weight="bold" font-family="'Inter', sans-serif">CLIENT APPROVAL & SIGN-OFF</text>
      <text x="470" y="55" fill="#475569" font-size="8.5" font-weight="600" font-family="'Inter', sans-serif">Final Specification Acceptance:</text>
      <line x1="470" y1="90" x2="660" y2="90" stroke="#0F172A" stroke-width="1" stroke-dasharray="2,2" />
      <text x="470" y="102" fill="#B8860B" font-size="8" font-weight="bold" font-family="'Inter', sans-serif">CLIENT SIGNATURE & DATE</text>
    </g>
    '''
    return svg_wrap(inner, "DWG 18-APV", "SPECIAL FEATURES ELEVATION & OFFICIAL APPROVAL TITLE BLOCK", "1:20", "APPROVAL SHEET")

SKETCH_REGISTRY = {
    1: get_sketch_01,
    2: get_sketch_02,
    3: get_sketch_03,
    4: get_sketch_04,
    5: get_sketch_05,
    6: get_sketch_06,
    7: get_sketch_07,
    8: get_sketch_08,
    9: get_sketch_09,
    10: get_sketch_10,
    11: get_sketch_11,
    12: get_sketch_12,
    13: get_sketch_13,
    14: get_sketch_14,
    15: get_sketch_15,
    16: get_sketch_16,
    17: get_sketch_17,
    18: get_sketch_18
}

def get_sketch_for_section(section_num):
    return SKETCH_REGISTRY.get(section_num, get_sketch_01)()
