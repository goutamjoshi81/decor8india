"""
Structured Checklist Content for all 18 Sections (Inter Typography, Disciplined 2-Column Grid Alignment)
Directly mapped from WhatsApp Reference Images 1, 2, 3, and 4.
All items aligned using strict 2-column CSS grids (.chk-grid-2) for architectural precision.
"""

def chk(text, checked=False):
    cls = "chk-box checked" if checked else "chk-box"
    mark = "✓" if checked else ""
    return f'<label class="chk-item"><span class="{cls}">{mark}</span><span class="chk-lbl">{text}</span></label>'

def underline_field(label, width="100%", placeholder=""):
    return f'''
    <div class="field-line" style="width: {width};">
      <span class="field-lbl-inline">{label}:</span>
      <span class="underline-fill">{placeholder}</span>
    </div>
    '''

def card_wrap(num_str, title, content_html, flex="1"):
    return f'''
    <div class="chk-card" style="flex: {flex};">
      <div class="card-head">
        <span class="card-num">{num_str}</span>
        <span class="card-title">{title}</span>
      </div>
      <div class="card-body">
        {content_html}
        <div class="field-line remarks-line" style="margin-top:auto; padding-top:2px;">
          <span class="remarks-lbl">REMARKS:</span>
          <span class="underline-fill"></span>
        </div>
      </div>
    </div>
    '''

# 01. PROJECT & CLIENT DETAILS
def get_form_01():
    c1 = f'''
      {underline_field("Project Name", placeholder="")}
      {underline_field("Client Name", placeholder="")}
      {underline_field("Studio Helpline", placeholder="+91 93805 23743")}
      {underline_field("Client Contact", placeholder="")}
      {underline_field("Site Location / Unit", placeholder="")}
    '''
    c2 = f'''
      <div class="field-lbl">PROPERTY TYPE:</div>
      <div class="chk-grid-2">
        {chk("Apartment")}
        {chk("Villa / Row House")}
        {chk("Independent House")}
        {chk("Commercial / Office")}
      </div>
      <div style="margin-top:4px;">
        {underline_field("Expected Handover Date", placeholder="DD / MM / YYYY")}
        {underline_field("Design Theme Preference", placeholder="Modern / Contemporary / Japandi")}
        {underline_field("Key Project Milestones", placeholder="Civil → Modular → Painting → Handover")}
      </div>
    '''
    return f'<div class="cards-row">{card_wrap("01", "CLIENT IDENTIFICATION", c1)} {card_wrap("02", "PROJECT SPECIFICATIONS", c2)}</div>'

# 02. SPACE DETAILS & CIVIL LAYOUT
def get_form_02():
    c1 = f'''
      <div class="field-grid-2">
        {underline_field("Total Built-up Area", placeholder="_______ sq.ft.")}
        {underline_field("Carpet Area", placeholder="_______ sq.ft.")}
      </div>
      <div class="field-lbl" style="margin-top:4px;">UNIT CONFIGURATION:</div>
      <div class="chk-grid-2">
        {chk("1 BHK / 2 BHK")}
        {chk("3 BHK / 4 BHK")}
        {chk("Duplex / Penthouse")}
        {chk("Studio / Custom")}
      </div>
      <div class="field-grid-2" style="margin-top:4px;">
        {underline_field("No. of Floors", placeholder="_______")}
        {underline_field("Clear Ceiling Height", placeholder="_______ ft.")}
      </div>
    '''
    c2 = f'''
      <div class="field-lbl">PROPOSED CIVIL / STRUCTURAL WORK:</div>
      <div class="chk-grid-2">
        {chk("Wall Demolition")}
        {chk("New Drywall Partition")}
        {chk("Plumbing Core Cut")}
        {chk("Door Frame Shift")}
      </div>
      <div style="margin-top:4px;">
        {underline_field("Civil Details / Scope", placeholder="Wall removal / Balcony merge / Plumbing")}
        {underline_field("Structural Check", placeholder="Approved / Verified by Consultant")}
      </div>
    '''
    return f'<div class="cards-row">{card_wrap("01", "DIMENSIONS & CONFIGURATION", c1)} {card_wrap("02", "CIVIL & STRUCTURAL WORK", c2)}</div>'

# 03. DESIGN PREFERENCES & MATERIAL PALETTE
def get_form_03():
    c1 = f'''
      <div class="field-lbl">PRIMARY INTERIOR DESIGN THEME:</div>
      <div class="chk-grid-2">
        {chk("Modern Minimal")}
        {chk("Contemporary")}
        {chk("Japandi / Wabi-Sabi")}
        {chk("Neo-Classical")}
      </div>
      <div class="field-lbl" style="margin-top:4px;">COLOR PALETTE DIRECTION:</div>
      <div class="chk-grid-2">
        {chk("Warm Neutrals & Beige")}
        {chk("Moody Dark Slate")}
        {chk("Earthy Sage & Ochre")}
        {chk("Monochrome Tone")}
      </div>
    '''
    c2 = f'''
      <div class="field-lbl">KEY JOINERY & SURFACE FINISHES:</div>
      <div class="chk-grid-2">
        {chk("Natural Teak/Walnut Veneer")}
        {chk("High-Gloss Acrylic")}
        {chk("Matte PU Paint Finish")}
        {chk("Fluted Acoustic Slats")}
      </div>
      <div style="margin-top:4px;">
        {underline_field("Inspiration Link", placeholder="Pinterest / Drive / Portfolio Link")}
        {underline_field("Moodboard Sign-off", placeholder="DD / MM / YYYY")}
      </div>
    '''
    return f'<div class="cards-row">{card_wrap("01", "THEME & COLOR PALETTE", c1)} {card_wrap("02", "MATERIAL FINISH SELECTIONS", c2)}</div>'

# 04. LIVING ROOM SELECTION
def get_form_04():
    c1 = f'''
      <div class="field-lbl">TV CONSOLE UNIT STYLE:</div>
      <div class="chk-grid-2">
        {chk("Floating Wall Credenza")}
        {chk("Floor Standing Console")}
        {chk("Full Paneling Feature Wall")}
        {chk("Built-in LED TV Niche")}
      </div>
      <div class="field-lbl" style="margin-top:4px;">SOFA & SEATING LAYOUT:</div>
      <div class="chk-grid-2">
        {chk("L-Shaped Sectional")}
        {chk("3 + 2 + 1 Seater Set")}
        {chk("Recliner Lounger Unit")}
        {chk("Accent Armchairs (Pair)")}
      </div>
      <div class="field-lbl" style="margin-top:4px;">CEILING TREATMENT:</div>
      <div class="chk-grid-2">
        {chk("Perimeter Cove Light")}
        {chk("Center Floating Island")}
      </div>
    '''
    c2 = f'''
      <div class="field-lbl">FEATURE WALL & BACKDROP PANELING:</div>
      <div class="chk-grid-2">
        {chk("Acoustic Fluted Slats")}
        {chk("Bookmatched Marble Slab")}
        {chk("Designer Themed Wallpaper")}
        {chk("PU Textured Paint Finish")}
      </div>
      <div class="field-lbl" style="margin-top:4px;">ARCHITECTURAL LIGHTING:</div>
      <div class="chk-grid-2">
        {chk("Warm 3000K Cove Strip")}
        {chk("Anti-Glare COB Spots")}
        {chk("Magnetic Track Light Rail")}
        {chk("Chandelier Center Drop")}
      </div>
      <div style="margin-top:4px;">
        {underline_field("Window Treatments", placeholder="Motorized 100% Blackout Drapes + Sheer Curtains")}
      </div>
    '''
    return f'<div class="cards-row">{card_wrap("01", "FURNITURE & CEILING", c1)} {card_wrap("02", "WALL FINISHES & LIGHTING", c2)}</div>'

# 05. DINING AREA & CROCKERY UNIT
def get_form_05():
    c1 = f'''
      <div class="field-lbl">DINING TABLE SEATING:</div>
      <div class="chk-grid-2">
        {chk("4-Seater Compact")}
        {chk("6-Seater Standard")}
        {chk("8-Seater Extended")}
        {chk("Extendable Mechanism")}
      </div>
      <div class="field-lbl" style="margin-top:4px;">TABLETOP SLAB MATERIAL:</div>
      <div class="chk-grid-2">
        {chk("Italian Onyx / Marble")}
        {chk("Sintered Stone / Quartz")}
        {chk("Solid Teak Wood Top")}
        {chk("Tinted Toughened Glass")}
      </div>
      <div class="field-lbl" style="margin-top:4px;">CROCKERY UNIT STYLE:</div>
      <div class="chk-grid-2">
        {chk("Full-Height with Loft")}
        {chk("Floating Buffet Ledge")}
      </div>
    '''
    c2 = f'''
      <div class="field-lbl">CROCKERY CABINET SPECIFICATIONS:</div>
      <div class="chk-grid-2">
        {chk("Slim Aluminium Profile")}
        {chk("Fluted Tinted Glass")}
        {chk("Warm LED Strip Shelves")}
        {chk("Wine Stemware Rack")}
      </div>
      <div class="field-lbl" style="margin-top:4px;">NICHE BACKDROP TREATMENT:</div>
      <div class="chk-grid-2">
        {chk("Tinted Bronze Mirror")}
        {chk("Fluted Wooden Slats")}
      </div>
      <div style="margin-top:4px;">
        {underline_field("Pendant Drop Clearance", placeholder="750 - 850 mm above dining tabletop")}
        {underline_field("Bar Counter Integration", placeholder="Compact Service Counter + Wine Rack (Yes / No)")}
      </div>
    '''
    return f'<div class="cards-row">{card_wrap("01", "DINING TABLE & SEATING", c1)} {card_wrap("02", "CROCKERY UNIT & AMBIENCE", c2)}</div>'

# 06. MODULAR KITCHEN (LAYOUT & CARCASS)
def get_form_06():
    c1 = f'''
      <div class="field-lbl">KITCHEN LAYOUT TYPE:</div>
      <div class="chk-grid-2">
        {chk("Straight Run")}
        {chk("L-Shaped Layout")}
        {chk("U-Shaped Layout")}
        {chk("Parallel / Galley")}
      </div>
      <div class="field-lbl" style="margin-top:4px;">KITCHEN ENCLOSURE:</div>
      <div class="chk-grid-2">
        {chk("Open Concept Kitchen")}
        {chk("Closed Partition")}
        {chk("Glass Sliding Partition")}
        {chk("Breakfast Counter")}
      </div>
      <div class="field-lbl" style="margin-top:4px;">CARCASS CORE MATERIAL:</div>
      <div class="chk-grid-2">
        {chk("BWP Marine Plywood (IS:710)")}
        {chk("BWR Grade Plywood")}
      </div>
    '''
    c2 = f'''
      <div class="field-lbl">SHUTTER SURFACE FINISH:</div>
      <div class="chk-grid-2">
        {chk("Anti-Fingerprint Acrylic")}
        {chk("Matte PU Paint Finish")}
        {chk("1mm Merino Laminate")}
        {chk("Ceramic / Slim Glass")}
      </div>
      <div class="field-lbl" style="margin-top:4px;">COUNTERTOP STONE SELECTION:</div>
      <div class="chk-grid-2">
        {chk("Composite Quartz (15-20mm)")}
        {chk("Black Granite")}
        {chk("Nano White Top")}
        {chk("Full-Body Vitrified")}
      </div>
      <div style="margin-top:4px;">
        {underline_field("Backsplash Dado Material", placeholder="Vitrified Slab / Lacquered Glass / Subway Tiles")}
      </div>
    '''
    return f'<div class="cards-row">{card_wrap("01", "LAYOUT & CARCASS CORE", c1)} {card_wrap("02", "SHUTTER & COUNTER FINISH", c2)}</div>'

# 07. KITCHEN STORAGE & ACCESSORIES - STRICT 2-COLUMN GRID ALIGNED!
def get_form_07():
    c1 = f'''
      <div class="field-lbl">DRAWER HARDWARE SYSTEMS:</div>
      <div class="chk-grid-2">
        {chk("Blum Tandembox / Antaro")}
        {chk("Hettich InnoTech Atira")}
        {chk("Hafele Matrix Box")}
        {chk("Soft-Close Telescopic")}
      </div>
      <div class="field-lbl" style="margin-top:4px;">DRAWER ORGANIZERS:</div>
      <div class="chk-grid-2">
        {chk("Cutlery Tray Organizer")}
        {chk("Cup & Saucer Basket")}
        {chk("Thali & Pot Organizer")}
        {chk("Plate Stacker Unit")}
      </div>
      <div class="field-lbl" style="margin-top:4px;">BLIND CORNER UNITS:</div>
      <div class="chk-grid-2">
        {chk("LeMans II Swing Trays")}
        {chk("Magic Corner S-Carousel")}
        {chk("Lazy Susan Carousel")}
        {chk("Corner Shelf Ledges")}
      </div>
    '''
    c2 = f'''
      <div class="field-lbl">PULL-OUT UNITS & ACCESSORIES:</div>
      <div class="chk-grid-2">
        {chk("150/200mm Spice Pull-out")}
        {chk("Under-sink Detergent Rack")}
        {chk("Double Waste Bin Pull-out")}
        {chk("Tall Pantry (6 Baskets)")}
        {chk("Wicker Vegetable Baskets")}
        {chk("Appliance Roller Shutter")}
      </div>
      <div style="margin-top:6px;">
        {underline_field("Hardware Load Rating", placeholder="Blum / Hettich 30-50 kg Dynamic Load Tested")}
        {underline_field("Warranty Terms", placeholder="10 Years Carcass + Lifetime Soft-Close Runners")}
      </div>
    '''
    return f'<div class="cards-row">{card_wrap("01", "DRAWER STACKS & CORNER UNITS", c1)} {card_wrap("02", "PULL-OUTS & PANTRY STORAGE", c2)}</div>'

# 08. KITCHEN APPLIANCES & FIXTURES
def get_form_08():
    c1 = f'''
      <div class="field-lbl">KITCHEN SINK & FAUCET:</div>
      <div class="chk-grid-2">
        {chk("Quartz Composite Sink")}
        {chk("SS 304 Undermount Sink")}
        {chk("Single Bowl with Drainer")}
        {chk("Double Bowl Sink")}
        {chk("Pull-out Swivel Spray Tap")}
        {chk("RO Integrated Faucet")}
      </div>
      <div class="field-lbl" style="margin-top:4px;">COOKING HOB & CHIMNEY:</div>
      <div class="chk-grid-2">
        {chk("3-Burner Gas Glass Hob")}
        {chk("4-Burner Built-in Hob")}
        {chk("Induction Cooktop")}
        {chk("Filterless Autoclean Hood")}
      </div>
    '''
    c2 = f'''
      <div class="field-lbl">BUILT-IN TALL APPLIANCES:</div>
      <div class="chk-grid-2">
        {chk("Built-in Microwave (25L)")}
        {chk("Built-in Oven (60L)")}
        {chk("Dishwasher (12-14 Place)")}
        {chk("Built-in Refrigerator")}
      </div>
      <div class="field-lbl" style="margin-top:4px;">UTILITY PROVISIONS:</div>
      <div class="chk-grid-2">
        {chk("RO Water Purifier Inlet")}
        {chk("Dedicated 15L Geyser")}
      </div>
      <div style="margin-top:4px;">
        {underline_field("Dedicated 16A Outlets", placeholder="Chimney, Microwave, Oven, Refrigerator, RO, Dishwasher")}
      </div>
    '''
    return f'<div class="cards-row">{card_wrap("01", "SINK, HOB & CHIMNEY FIXTURES", c1)} {card_wrap("02", "BUILT-IN APPLIANCES & UTILITIES", c2)}</div>'

# 09. MASTER BEDROOM SELECTION
def get_form_09():
    c1 = f'''
      <div class="field-lbl">BED PLATFORM CONFIGURATION:</div>
      <div class="chk-grid-2">
        {chk("King Size (72\" x 78\")")}
        {chk("Queen Size (60\" x 78\")")}
        {chk("Hydraulic Gas Lift Storage")}
        {chk("Side Pull-out Drawers")}
      </div>
      <div class="field-lbl" style="margin-top:4px;">HEADBOARD WALL DESIGN:</div>
      <div class="chk-grid-2">
        {chk("Fluted Wooden Paneling")}
        {chk("Upholstered Velvet Fabric")}
        {chk("Matte PU Paint Finish")}
        {chk("Integrated LED Backlight")}
      </div>
    '''
    c2 = f'''
      <div class="field-lbl">BEDSIDE, DRESSER & LIGHTING:</div>
      <div class="chk-grid-2">
        {chk("Dual Floating Nightstands")}
        {chk("Floor Pedestal (2 Drawers)")}
        {chk("Full-Length Dressing Mirror")}
        {chk("Floating Vanity with LED")}
        {chk("Bedside 2-Way Switches")}
        {chk("Directional Reading Spots")}
      </div>
      <div style="margin-top:4px;">
        {underline_field("Master Window Treatments", placeholder="100% Blackout Motorized Curtains + Sheer Day Curtains")}
      </div>
    '''
    return f'<div class="cards-row">{card_wrap("01", "BED & HEADBOARD SPECIFICATIONS", c1)} {card_wrap("02", "SIDE TABLES, DRESSER & LIGHTING", c2)}</div>'

# 10. BEDROOM 2 (KIDS / GUEST / STUDY)
def get_form_10():
    c1 = f'''
      <div class="field-lbl">ROOM PURPOSE & BED SELECTION:</div>
      <div class="chk-grid-2">
        {chk("Kids Bedroom")}
        {chk("Guest Bedroom")}
        {chk("Parents / Senior Room")}
        {chk("Home Office / Study")}
        {chk("Queen Size Bed")}
        {chk("Single Bed with Trundle")}
      </div>
      <div class="field-lbl" style="margin-top:4px;">STUDY DESK STYLE:</div>
      <div class="chk-grid-2">
        {chk("Wall-Mounted Ledge")}
        {chk("Pedestal Desk with Drawers")}
      </div>
    '''
    c2 = f'''
      <div class="field-lbl">OVERHEAD BOOKSHELF & WALL ACCENT:</div>
      <div class="chk-grid-2">
        {chk("Open Bookshelf Compartments")}
        {chk("Closed Shutter Cabinets")}
        {chk("Magnetic Soft Pin-up Board")}
        {chk("Under-shelf Task LED Strip")}
        {chk("Designer Themed Wallpaper")}
        {chk("Accent Color Wall Paint")}
      </div>
      <div style="margin-top:4px;">
        {underline_field("Desk Dimensions", placeholder="L: [ _______ mm ]  x  D: [ _______ mm ]")}
        {underline_field("Cable Management", placeholder="Desk Grommet Hole + 4-Plug Power Sockets")}
      </div>
    '''
    return f'<div class="cards-row">{card_wrap("01", "ROOM USE, BED & STUDY DESK", c1)} {card_wrap("02", "BOOKSHELF & ELECTRICAL SPECIFICATIONS", c2)}</div>'

# 11. WARDROBE (INTERNAL CONFIGURATION)
def get_form_11():
    c1 = f'''
      <div class="field-lbl">WARDROBE CARCASS & LAYOUT:</div>
      <div class="chk-grid-2">
        {chk("Straight 3-Door")}
        {chk("Straight 4-Door")}
        {chk("L-Shaped Corner")}
        {chk("Walk-in Closet Suite")}
      </div>
      <div class="field-lbl" style="margin-top:4px;">CARCASS CORE & LOFT:</div>
      <div class="chk-grid-2">
        {chk("18mm BWP Marine Plywood")}
        {chk("18mm HDHMR Board")}
        {chk("Full-Height Seamless to Ceiling")}
        {chk("Independent Loft Shutters")}
      </div>
    '''
    c2 = f'''
      <div class="field-lbl">INTERNAL SECTION ALLOCATION:</div>
      <div class="chk-grid-2">
        {chk("Bay A: Long Coat Hanging Rod")}
        {chk("Bay B: Double Shirt Hanging Rods")}
        {chk("Bay C: 4-Tier Folded Shelves")}
        {chk("Bay D: 3 Internal Drawers")}
      </div>
      <div style="margin-top:4px;">
        {underline_field("Internal Locker / Safe Niche", placeholder="Reinforced Compartment with Digital Number Lock")}
        {underline_field("Internal Shutter Finish", placeholder="0.8mm Off-White Liner / Fabric Texture Laminate")}
      </div>
    '''
    return f'<div class="cards-row">{card_wrap("01", "CARCASS SPECIFICATIONS & LOFT", c1)} {card_wrap("02", "INTERNAL HANGING & DRAWER BAYS", c2)}</div>'

# 12. WARDROBE (DOORS, HARDWARE & ACCESSORIES)
def get_form_12():
    c1 = f'''
      <div class="field-lbl">SHUTTER DOOR MECHANISM:</div>
      <div class="chk-grid-2">
        {chk("Hinged Openable Doors")}
        {chk("Sliding Doors (Top-Hung)")}
      </div>
      <div class="field-lbl" style="margin-top:4px;">EXTERIOR SHUTTER FINISH:</div>
      <div class="chk-grid-2">
        {chk("Matte PU Paint Finish")}
        {chk("High-Gloss Acrylic")}
        {chk("1mm Textured Laminate")}
        {chk("Tinted Bronze Mirror")}
        {chk("Fluted Glass in Alu Frame")}
        {chk("Natural Wood Veneer")}
      </div>
    '''
    c2 = f'''
      <div class="field-lbl">HARDWARE & ACCESSORIES:</div>
      <div class="chk-grid-2">
        {chk("Full-Height Gola Profile Handle")}
        {chk("Knurled Brass Handles")}
        {chk("Push-to-Open Latches")}
        {chk("Trouser Hanger Rack")}
        {chk("Tie & Belt Pull-out")}
        {chk("Automatic Sensor LED Strip")}
      </div>
      <div style="margin-top:4px;">
        {underline_field("Hardware Finish Tone", placeholder="Brushed Brass Gold / Matt Black / Satin Nickel")}
        {underline_field("Soft-Close Hinges Brand", placeholder="Blum Clip-Top BLUMOTION / Hettich Sensys (110°)")}
      </div>
    '''
    return f'<div class="cards-row">{card_wrap("01", "SHUTTER MECHANISM & FINISH", c1)} {card_wrap("02", "HANDLES & PULL-OUT ACCESSORIES", c2)}</div>'

# 13. BATHROOMS / WASHROOM (SANITARYWARE & BASIN)
def get_form_13():
    c1 = f'''
      <div class="field-lbl">WASHBASIN CONFIGURATION:</div>
      <div class="chk-grid-2">
        {chk("Table-Top Vessel Basin")}
        {chk("Under-Counter Basin")}
        {chk("Integrated Counter Basin")}
        {chk("Wall-Hung Basin")}
      </div>
      <div class="field-lbl" style="margin-top:4px;">BASIN BRAND SELECTION:</div>
      <div class="chk-grid-2">
        {chk("Kohler")}
        {chk("Grohe")}
        {chk("Jaquar Artize")}
        {chk("Toto")}
      </div>
      <div style="margin-top:4px;">
        {underline_field("Basin Dimensions", placeholder="[ _____ x _____ mm ]  (Oval / Rect)")}
        {underline_field("Countertop Stone", placeholder="Quartz / Italian Marble / Granite")}
      </div>
    '''
    c2 = f'''
      <div class="field-lbl">VANITY CABINET & MIRROR:</div>
      <div class="chk-grid-2">
        {chk("Wall-Mounted Floating Vanity")}
        {chk("2 Soft-Close Drawers")}
        {chk("Open Shutter Ledge Below")}
        {chk("Backlit Touch LED Mirror")}
        {chk("Storage Mirror Medicine Box")}
        {chk("Anti-Fog Demister Pad")}
      </div>
      <div style="margin-top:4px;">
        {underline_field("Countertop Height", placeholder="800 - 850 mm from FFL (Std. 32-34\")")}
        {underline_field("Faucet Specification", placeholder="Tall Body Pillar Cock / Concealed Mixer")}
      </div>
    '''
    return f'<div class="cards-row">{card_wrap("01", "SANITARYWARE & BASIN DETAILS", c1)} {card_wrap("02", "VANITY CABINET & MIRROR", c2)}</div>'

# 14. BATHROOMS / WASHROOM (SHOWER, WC & FITTINGS)
def get_form_14():
    c1 = f'''
      <div class="field-lbl">WATER CLOSET & CISTERN:</div>
      <div class="chk-grid-2">
        {chk("Rimless Wall-Hung WC")}
        {chk("Floor-Mounted EWC")}
        {chk("Smart Electronic Bidet WC")}
        {chk("Concealed Cistern (Geberit)")}
        {chk("Concealed Cistern (Grohe)")}
        {chk("Concealed Cistern (Jaquar)")}
      </div>
      <div class="field-lbl" style="margin-top:4px;">SHOWER SYSTEM:</div>
      <div class="chk-grid-2">
        {chk("Concealed 3-Inlet Diverter")}
        {chk("Overhead Rain Shower")}
      </div>
    '''
    c2 = f'''
      <div class="field-lbl">GLASS ENCLOSURE & ACCESSORIES:</div>
      <div class="chk-grid-2">
        {chk("10mm Toughened Glass Screen")}
        {chk("Shower Niche with LED")}
        {chk("Towel Rod (24\")")}
        {chk("Robe Hooks (Twin)")}
        {chk("Toilet Paper Holder")}
        {chk("Brass Health Faucet")}
      </div>
      <div style="margin-top:4px;">
        {underline_field("Fittings Brand & Series", placeholder="Grohe / Kohler / Jaquar Artize")}
        {underline_field("Hardware Finish Tone", placeholder="Brushed Chrome / PVD Gold / Matt Black")}
      </div>
    '''
    return f'<div class="cards-row">{card_wrap("01", "WC & SHOWER SYSTEM", c1)} {card_wrap("02", "GLASS ENCLOSURE & ACCESSORIES", c2)}</div>'

# 15. PLUMBING & ELECTRICAL INFRASTRUCTURE
def get_form_15():
    c1 = f'''
      <div class="field-lbl">PLUMBING & DRAINAGE:</div>
      <div class="chk-grid-2">
        {chk("Astral CPVC / Supreme")}
        {chk("Ashirvad FlowGuard")}
        {chk("uPVC SWR Drainage Pipes")}
        {chk("Linear Trench Drain")}
        {chk("Normal Gravity Flow")}
        {chk("Pressure Booster Pump")}
      </div>
      <div style="margin-top:4px;">
        {underline_field("Hot & Cold Center-to-Center", placeholder="Strict 150 mm Center Distance (Std)")}
      </div>
    '''
    c2 = f'''
      <div class="field-lbl">ELECTRICAL WIRING & SWITCHES:</div>
      <div class="chk-grid-2">
        {chk("Finolex FRLS Wiring")}
        {chk("Polycab Fire-Resistant")}
        {chk("Schneider Zencelo Switches")}
        {chk("Legrand Arteor Switches")}
      </div>
      <div style="margin-top:4px;">
        {underline_field("Geyser Point (25A)", placeholder="84\" from FFL (Inside False Ceiling / Loft)")}
        {underline_field("Waterproof Sockets", placeholder="Shaver Socket + Hairdryer (Dry Vanity)")}
      </div>
    '''
    return f'<div class="cards-row">{card_wrap("01", "PLUMBING & PIPING SPECIFICATIONS", c1)} {card_wrap("02", "ELECTRICAL WIRING & POWER POINTS", c2)}</div>'

# 16. FALSE CEILING & ARCHITECTURAL LIGHTING
def get_form_16():
    c1 = f'''
      <div class="field-lbl">CEILING COVERAGE & MATERIAL:</div>
      <div class="chk-grid-2">
        {chk("Entire Home Ceiling Drop")}
        {chk("Living & Dining Only")}
        {chk("Bedrooms Only")}
        {chk("Moisture Board in Baths")}
        {chk("Saint-Gobain Gyproc 12.5mm")}
        {chk("POP Plaster Ceiling")}
      </div>
      <div class="field-lbl" style="margin-top:4px;">COVE LIGHTING SYSTEM:</div>
      <div class="chk-grid-2">
        {chk("Perimeter Cove Strip")}
        {chk("Curtain Pelmet Cove")}
      </div>
    '''
    c2 = f'''
      <div class="field-lbl">LIGHTING FIXTURE SELECTION:</div>
      <div class="chk-grid-2">
        {chk("Recessed Anti-Glare COB Spots")}
        {chk("Magnetic Track Lights")}
        {chk("Surface Cylinder Spots")}
        {chk("Chandelier Center Point")}
        {chk("Warm White Strip (3000K)")}
        {chk("Neutral Day Strip (4000K)")}
      </div>
      <div style="margin-top:4px;">
        {underline_field("Ceiling Paint Specification", placeholder="Asian Paints Royale / Matte White")}
        {underline_field("Ventilation / Exhaust Cutouts", placeholder="Washroom Exhaust & Chimney Duct")}
      </div>
    '''
    return f'<div class="cards-row">{card_wrap("01", "CEILING MATERIAL & COVE ARCHITECTURE", c1)} {card_wrap("02", "FIXTURE SELECTION & VENTILATION", c2)}</div>'

# 17. DOORS, WINDOWS & RAILINGS
def get_form_17():
    c1 = f'''
      <div class="field-lbl">MAIN & INTERNAL DOORS:</div>
      <div class="chk-grid-2">
        {chk("Solid Teak Wood Door")}
        {chk("Teak Veneer Skin Door")}
        {chk("CNC Metal Grill Safety Door")}
        {chk("Yale Biometric Smart Lock")}
        {chk("Solid Core Flush (32mm)")}
        {chk("Veneer with Architrave")}
      </div>
    '''
    c2 = f'''
      <div class="field-lbl">WINDOWS & BALCONY RAILINGS:</div>
      <div class="chk-grid-2">
        {chk("uPVC 3-Track Sliding Window")}
        {chk("Aluminium Slim Profile")}
        {chk("Toughened Double Glazing")}
        {chk("12mm Glass Balcony Railing")}
        {chk("SS 304 Spigots & Handrail")}
        {chk("Laser Cut MS Grill Railing")}
      </div>
      <div style="margin-top:4px;">
        {underline_field("Door Hardware & Hinges", placeholder="SS 304 Ball Bearing Hinges + Stops")}
        {underline_field("Hardware Finish Tone", placeholder="Brushed SS / Antique Brass / Black")}
      </div>
    '''
    return f'<div class="cards-row">{card_wrap("01", "MAIN & INTERNAL DOORS", c1)} {card_wrap("02", "WINDOWS & BALCONY RAILINGS", c2)}</div>'

# 18. SPECIAL FEATURES, BUDGET & STUDIO SIGN-OFF
def get_form_18():
    c1 = f'''
      <div class="field-lbl">BESPOKE FEATURE UNITS:</div>
      <div class="chk-grid-2">
        {chk("Pooja / Mandir Unit (CNC Backlit)")}
        {chk("Home Bar Counter Unit")}
        {chk("Balcony Sit-Out Deck")}
        {chk("Home Theater Acoustic Paneling")}
      </div>
      <div class="field-lbl" style="margin-top:4px;">SMART HOME AUTOMATION:</div>
      <div class="chk-grid-2">
        {chk("Smart Curtain Motors")}
        {chk("App/Voice Mood Lighting")}
        {chk("Digital Motion Sensors")}
        {chk("Central Smart Gateway")}
      </div>
    '''
    c2 = f'''
      <div class="field-lbl">BUDGET & SCOPE AGREEMENT:</div>
      <div class="chk-grid-2">
        {chk("Strict Fixed Budget")}
        {chk("Up to 10% Scope Flexibility")}
        {chk("Phase-wise Execution")}
        {chk("Turnkey Studio Sign-off")}
      </div>
      <div style="margin-top:4px;">
        {underline_field("Estimated Project Budget", placeholder="Rs. [ ___________________________ ]")}
        {underline_field("Target Handover Date", placeholder="DD / MM / YYYY (_______ Days)")}
        {underline_field("Special Studio Directives", placeholder="Strict QA Inspection & Material Sign-off")}
      </div>
    '''
    return f'<div class="cards-row">{card_wrap("01", "BESPOKE UNITS & AUTOMATION", c1)} {card_wrap("02", "PROJECT BUDGET & FINAL CLIENT APPROVAL", c2)}</div>'

FORM_REGISTRY = {
    1: get_form_01,
    2: get_form_02,
    3: get_form_03,
    4: get_form_04,
    5: get_form_05,
    6: get_form_06,
    7: get_form_07,
    8: get_form_08,
    9: get_form_09,
    10: get_form_10,
    11: get_form_11,
    12: get_form_12,
    13: get_form_13,
    14: get_form_14,
    15: get_form_15,
    16: get_form_16,
    17: get_form_17,
    18: get_form_18
}

SECTION_NAMES = {
    1: ("01 — PROJECT & SPACE MASTER SPECIFICATIONS", "01. ARCHITECTURAL SPACE LAYOUT"),
    2: ("02 — SPACE DETAILS & CIVIL LAYOUT", "02. STRUCTURAL GRID & CARPET AREA"),
    3: ("03 — DESIGN PREFERENCES & MATERIAL PALETTE", "03. MOODBOARD & JOINERY PROFILES"),
    4: ("04 — LIVING ROOM SELECTION CHECKLIST", "04. LIVING ROOM & TV UNIT WALL"),
    5: ("05 — DINING AREA & CROCKERY UNIT CHECKLIST", "05. DINING SPACE & GLASS DISPLAY"),
    6: ("06 — MODULAR KITCHEN (LAYOUT & CARCASS)", "06. WORK TRIANGLE & COUNTER ELEVATION"),
    7: ("07 — KITCHEN STORAGE & ACCESSORIES", "07. INTERNAL CABINETRY & PULL-OUTS"),
    8: ("08 — KITCHEN APPLIANCES & FIXTURES", "08. BUILT-IN APPLIANCES & UTILITIES"),
    9: ("09 — MASTER BEDROOM SELECTION CHECKLIST", "09. KING BED & HEADBOARD WALL"),
    10: ("10 — BEDROOM 2 (KIDS / GUEST / STUDY)", "10. INTEGRATED STUDY & BED UNIT"),
    11: ("11 — WARDROBE (TYPE, CARCASS & INTERNAL CONFIG)", "11. 4-DOOR INTERNAL ELEVATION"),
    12: ("12 — WARDROBE (DOORS, HARDWARE & ACCESSORIES)", "12. SHUTTER FINISHES & PROFILES"),
    13: ("13 — BATHROOMS / WASHROOM (SANITARYWARE & BASIN)", "13. FLOATING VANITY & BASIN DETAIL"),
    14: ("14 — BATHROOMS / WASHROOM (SHOWER, WC & FITTINGS)", "14. WET/DRY ZONING & GLASS SCREEN"),
    15: ("15 — PLUMBING & ELECTRICAL INFRASTRUCTURE", "15. MEP RISER & CIRCUIT CONDUITS"),
    16: ("16 — FALSE CEILING & ARCHITECTURAL LIGHTING", "16. REFLECTED CEILING PLAN (RCP)"),
    17: ("17 — DOORS, WINDOWS & RAILINGS CHECKLIST", "17. MAIN DOOR, WINDOWS & RAILINGS"),
    18: ("18 — SPECIAL FEATURES, BUDGET & STUDIO SIGN-OFF", "18. BESPOKE UNITS & APPROVAL TITLE BLOCK")
}

def get_form_for_section(section_num):
    return FORM_REGISTRY.get(section_num, get_form_01)()

def get_section_meta(section_num):
    return SECTION_NAMES.get(section_num, ("SECTION", "DETAILS"))
