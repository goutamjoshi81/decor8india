import os
import base64

def generate_luxury_html_quotation():
    # Load base64 images so the HTML is completely self-contained and renders anywhere!
    renders = {
        'kitchen': 'quatation_renders/kitchen.jpg',
        'living_tv': 'quatation_renders/living_tv.jpg',
        'living_sofa': 'quatation_renders/living_sofa.jpg',
        'dining': 'quatation_renders/dining.jpg',
        'mbr_wardrobe': 'quatation_renders/mbr_wardrobe.jpg',
        'mbr_bed': 'quatation_renders/mbr_bed.jpg',
        'bed2_wardrobe': 'quatation_renders/bed2_wardrobe.jpg',
        'bed3_wardrobe': 'quatation_renders/bed3_wardrobe.jpg',
    }

    b64_imgs = {}
    for key, p in renders.items():
        if os.path.exists(p):
            with open(p, 'rb') as f:
                b64_imgs[key] = "data:image/jpeg;base64," + base64.b64encode(f.read()).decode('utf-8')
        else:
            b64_imgs[key] = ""

    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DECOR8 INDIA — Luxury Interior Quotation (Mr. Govinda - D1304)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {{
      --gold-primary: #C5A059;
      --gold-dark: #8C7355;
      --gold-deep: #70583A;
      --gold-light: #F5EEDB;
      --gold-subtle: #FAF5EB;
      --gold-border: #D4AF37;
      --text-dark: #1A1A1A;
      --text-muted: #555555;
      --text-light: #888888;
      --bg-cream: #FAF8F5;
      --bg-white: #FFFFFF;
      --success: #1B6A3B;
    }}

    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }}

    body {{
      font-family: 'Montserrat', sans-serif;
      background-color: var(--bg-cream);
      color: var(--text-dark);
      line-height: 1.5;
      padding-bottom: 80px;
    }}

    /* Top Sticky Action Bar */
    .top-bar {{
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(17, 19, 23, 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(212, 175, 55, 0.3);
      padding: 12px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #fff;
    }}

    .top-bar-title {{
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 1.3rem;
      letter-spacing: 1px;
      color: #F5E6AD;
      font-weight: 700;
    }}

    .top-bar-actions {{
      display: flex;
      gap: 12px;
      align-items: center;
    }}

    .btn {{
      padding: 8px 18px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      cursor: pointer;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
      border: none;
    }}

    .btn-gold {{
      background: linear-gradient(135deg, #D4AF37 0%, #AA8022 100%);
      color: #000;
      box-shadow: 0 4px 12px rgba(212, 175, 55, 0.25);
    }}
    .btn-gold:hover {{
      opacity: 0.92;
      transform: translateY(-1px);
    }}

    .btn-outline {{
      background: transparent;
      color: #fff;
      border: 1px solid rgba(255, 255, 255, 0.3);
    }}
    .btn-outline:hover {{
      background: rgba(255, 255, 255, 0.1);
    }}

    /* Main Container */
    .container {{
      max-width: 1020px;
      margin: 30px auto;
      background: #FFFFFF;
      box-shadow: 0 10px 40px rgba(0,0,0,0.06);
      border: 1px solid var(--gold-light);
      border-radius: 4px;
      overflow: hidden;
    }}

    /* Proposal Header */
    .proposal-header {{
      padding: 36px 44px 28px;
      border-bottom: 2px solid var(--gold-primary);
      position: relative;
    }}

    .brand-row {{
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 24px;
    }}

    .brand-logo-text {{
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 2.2rem;
      font-weight: 700;
      letter-spacing: 2px;
      color: var(--text-dark);
      line-height: 1.1;
    }}

    .brand-logo-text span {{
      color: var(--gold-primary);
    }}

    .brand-address {{
      font-size: 12px;
      color: var(--text-muted);
      margin-top: 6px;
      line-height: 1.6;
    }}

    .brand-right {{
      text-align: right;
    }}

    .brand-rt-title {{
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 1.8rem;
      font-weight: 700;
      color: var(--gold-dark);
    }}

    .brand-rt-tagline {{
      font-size: 11px;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-top: 4px;
    }}

    .metadata-card {{
      background: var(--gold-subtle);
      border: 1px solid var(--gold-light);
      border-radius: 6px;
      padding: 18px 24px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      font-size: 12.5px;
    }}

    .meta-group label {{
      display: block;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--gold-dark);
      font-weight: 700;
      margin-bottom: 2px;
    }}

    .meta-group span {{
      font-weight: 600;
      color: var(--text-dark);
    }}

    /* Section Page Layout */
    .section-block {{
      padding: 40px 44px;
      border-bottom: 1px solid #ECE7DE;
      page-break-inside: avoid;
    }}

    .sec-badge {{
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: var(--gold-dark);
      margin-bottom: 4px;
    }}

    .sec-header-row {{
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 1px solid var(--gold-primary);
      padding-bottom: 8px;
      margin-bottom: 20px;
    }}

    .sec-title {{
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 1.85rem;
      font-weight: 700;
      color: var(--text-dark);
    }}

    .sec-subtitle {{
      font-size: 12px;
      color: var(--text-muted);
      margin-top: 2px;
    }}

    .sec-total-amount {{
      font-family: 'Montserrat', sans-serif;
      font-size: 1.6rem;
      font-weight: 700;
      color: var(--text-dark);
      letter-spacing: -0.5px;
    }}

    /* Visual Specs Showcase */
    .visual-specs-grid {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 24px;
      align-items: center;
    }}

    .render-img-box {{
      border-radius: 6px;
      overflow: hidden;
      box-shadow: 0 4px 14px rgba(0,0,0,0.06);
      border: 1px solid #EAE5DC;
      background: #FAFAFA;
      text-align: center;
    }}

    .render-img-box img {{
      width: 100%;
      height: auto;
      display: block;
      object-fit: cover;
      max-height: 280px;
    }}

    .specs-list-box {{
      padding: 8px 12px;
    }}

    .specs-list-title {{
      font-size: 12.5px;
      font-weight: 700;
      color: var(--text-dark);
      margin-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }}

    .specs-list {{
      list-style: none;
    }}

    .specs-list li {{
      font-size: 12px;
      color: #333;
      padding: 4px 0;
      display: flex;
      align-items: flex-start;
      gap: 8px;
      line-height: 1.5;
    }}

    .specs-list li::before {{
      content: "—";
      color: var(--gold-dark);
      font-weight: 700;
    }}

    /* Quotation Tables */
    .quotation-table {{
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
      margin-top: 14px;
    }}

    .quotation-table th {{
      background-color: var(--gold-dark);
      color: #FFFFFF;
      text-align: left;
      padding: 10px 14px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-size: 11px;
    }}

    .quotation-table th.text-right {{
      text-align: right;
    }}

    .quotation-table th.text-center {{
      text-align: center;
    }}

    .quotation-table td {{
      padding: 10px 14px;
      border-bottom: 1px solid var(--border-row, #EFE7D8);
      color: var(--text-dark);
      vertical-align: middle;
    }}

    .quotation-table tr:nth-child(even) td {{
      background-color: var(--gold-subtle);
    }}

    .quotation-table td.text-right {{
      text-align: right;
      font-variant-numeric: tabular-nums;
    }}

    .quotation-table td.text-center {{
      text-align: center;
    }}

    .quotation-table td.bold {{
      font-weight: 600;
    }}

    .subtotal-bar {{
      background: var(--gold-light);
      border-top: 1px solid var(--gold-primary);
      border-bottom: 1px solid var(--gold-primary);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      margin-top: 8px;
      font-size: 13px;
      font-weight: 700;
    }}

    .subtotal-bar span.amount {{
      font-size: 14px;
      color: var(--text-dark);
    }}

    .included-box {{
      background: var(--gold-subtle);
      border-left: 3px solid var(--success);
      padding: 10px 16px;
      margin: 12px 0 16px;
      font-size: 12px;
      color: #2E4B33;
      border-radius: 0 4px 4px 0;
    }}

    .included-item {{
      padding: 3px 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }}

    .included-item strong {{
      color: var(--success);
      font-weight: 700;
    }}

    /* Grand Summary Page */
    .grand-summary-block {{
      padding: 44px;
      background: #FFFFFF;
    }}

    .grand-total-banner {{
      background: var(--gold-dark);
      color: #FFFFFF;
      padding: 16px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 16px;
      border-radius: 4px;
    }}

    .grand-total-banner .lbl {{
      font-size: 16px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
    }}

    .grand-total-banner .val {{
      font-size: 22px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }}

    .tax-box {{
      margin-top: 14px;
      border: 1px solid var(--gold-light);
      border-radius: 4px;
      overflow: hidden;
      font-size: 12.5px;
    }}

    .tax-row {{
      display: flex;
      justify-content: space-between;
      padding: 8px 16px;
      border-bottom: 1px solid #ECE7DE;
      background: var(--gold-subtle);
    }}

    .tax-row.final {{
      background: #EBD6A7;
      font-weight: 700;
      font-size: 14px;
      border-bottom: none;
    }}

    /* Payment & Bank Cards */
    .two-col-grid {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-top: 28px;
    }}

    .info-card {{
      border: 1px solid var(--gold-light);
      border-radius: 6px;
      padding: 18px 20px;
      background: #FFFFFF;
    }}

    .info-card-title {{
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-dark);
      border-bottom: 1px solid var(--gold-primary);
      padding-bottom: 6px;
      margin-bottom: 12px;
    }}

    /* Terms */
    .terms-list {{
      list-style: decimal inside;
      font-size: 11px;
      color: #444;
      line-height: 1.6;
    }}

    .terms-list li {{
      margin-bottom: 8px;
      padding-left: 4px;
    }}

    /* Signature Area */
    .signature-grid {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      margin-top: 40px;
      padding-top: 24px;
      border-top: 1px solid #ECE7DE;
      text-align: center;
      font-size: 12px;
    }}

    .sign-box {{
      padding: 20px;
      border: 1px dashed var(--gold-border);
      border-radius: 6px;
      background: var(--gold-subtle);
    }}

    .sign-box .sign-name {{
      font-weight: 700;
      margin-top: 36px;
      color: var(--text-dark);
    }}

    .sign-box .sign-role {{
      font-size: 11px;
      color: var(--gold-dark);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }}

    /* Print Styles */
    @media print {{
      body {{
        background: #FFFFFF;
        padding: 0;
      }}
      .top-bar {{
        display: none !important;
      }}
      .container {{
        box-shadow: none;
        border: none;
        margin: 0;
        max-width: 100%;
      }}
      .section-block {{
        page-break-after: always;
        padding: 24px 20px;
      }}
      .grand-summary-block {{
        page-break-before: always;
        padding: 24px 20px;
      }}
    }}
  </style>
</head>
<body>

  <!-- Top Sticky Navigation Bar -->
  <div class="top-bar">
    <div class="top-bar-title">DECOR8 INDIA • LUXURY INTERIORS</div>
    <div class="top-bar-actions">
      <button class="btn btn-gold" onclick="window.print()">
        🖨️ Print / Save as PDF
      </button>
      <a class="btn btn-outline" href="/DECOR8_INDIA_QUOTATION_MR_GOVINDA_D1304.xlsx" download>
        📥 Download Excel (.xlsx)
      </a>
    </div>
  </div>

  <div class="container">

    <!-- Proposal Header -->
    <header class="proposal-header">
      <div class="brand-row">
        <div>
          <div class="brand-logo-text">DECOR8 <span>INDIA</span></div>
          <div class="brand-address">
            #14, Sy NO 36/1 Vasanth Vallabhnagar, Vasanthapura<br>
            Uttarahalli Hobli, Bengaluru - 560061<br>
            📞 +91 88841 31414 , +91 93805 23743 • <strong>GSTIN: 29CHPPB0944C2ZD</strong>
          </div>
        </div>
        <div class="brand-right">
          <div class="brand-rt-title">DECOR8 INDIA</div>
          <div class="brand-rt-tagline">Affordable Luxury Turnkey Interiors</div>
          <div style="font-size: 11px; color: var(--gold-dark); font-weight: 600; margin-top: 4px;">www.decor8india.com</div>
        </div>
      </div>

      <!-- Metadata Card -->
      <div class="metadata-card">
        <div class="meta-group">
          <label>Quotation For</label>
          <span>MR. GOVINDA</span>
        </div>
        <div class="meta-group">
          <label>Project / Flat</label>
          <span>Kolte Patil D1304, Bengaluru</span>
        </div>
        <div class="meta-group">
          <label>Quotation Number</label>
          <span>D8202607102</span>
        </div>
        <div class="meta-group">
          <label>Date of Issue</label>
          <span>06-AUG-2026</span>
        </div>
        <div class="meta-group">
          <label>Company Representative</label>
          <span>Mr. Satish Bhat (CEO)</span>
        </div>
        <div class="meta-group">
          <label>Quotation Status</label>
          <span style="color: var(--success); font-weight: 700;">Official Luxury Proposal</span>
        </div>
      </div>
    </header>

    <!-- ==================== SECTION 01: MODULAR KITCHEN ==================== -->
    <section class="section-block">
      <div class="sec-badge">Section 01 of 17</div>
      <div class="sec-header-row">
        <div>
          <h2 class="sec-title">Modular Kitchen</h2>
          <div class="sec-subtitle">AICA High Gloss Acrylic • CenturyPly • Hettich</div>
        </div>
        <div class="sec-total-amount">₹4,99,200</div>
      </div>

      <div class="visual-specs-grid">
        <div class="render-img-box">
          <img src="{b64_imgs['kitchen']}" alt="Modular Kitchen 3D Render">
        </div>
        <div class="specs-list-box">
          <div class="specs-list-title">Kitchen Finish (Reference Image)</div>
          <ul class="specs-list">
            <li>AICA High Gloss Acrylic Shutters</li>
            <li>CenturyPly 710 BWP — Base Units</li>
            <li>CenturyPly 310 MR — Wall & Loft</li>
            <li>Hettich Soft-Close Hinges & Tandem Channels</li>
            <li>LED Under-Cabinet Lighting</li>
            <li>Factory Manufactured • CNC Cut</li>
          </ul>
        </div>
      </div>

      <table class="quotation-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Specification & Materials</th>
            <th class="text-right">Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="bold">Base Units</td>
            <td>72 Sq.ft × ₹2,300/Sq.ft — CenturyPly 710 BWP, Acrylic Finish</td>
            <td class="text-right bold">₹1,65,600</td>
          </tr>
          <tr>
            <td class="bold">Wall Units</td>
            <td>48 Sq.ft × ₹2,150/Sq.ft — CenturyPly 310 MR, Acrylic Finish</td>
            <td class="text-right bold">₹1,03,200</td>
          </tr>
          <tr>
            <td class="bold">Loft</td>
            <td>48 Sq.ft × ₹1,450/Sq.ft — CenturyPly 310 MR, Laminate</td>
            <td class="text-right bold">₹69,600</td>
          </tr>
          <tr>
            <td class="bold">Kitchen Accessories</td>
            <td>Hettich Cutlery + Pots & Pan + Baskets + Oil Pull-Out + Wicker</td>
            <td class="text-right bold">₹42,000</td>
          </tr>
          <tr>
            <td class="bold">Quartz Countertop</td>
            <td>54 Sq.ft × ₹2,200/Sq.ft — KalingaStone Premium Quartz</td>
            <td class="text-right bold">₹1,18,800</td>
          </tr>
        </tbody>
      </table>

      <div class="subtotal-bar">
        <span>Kitchen Units Sub-Total</span>
        <span class="amount">₹4,99,200</span>
      </div>

      <!-- Sink & Plumbing Sub-table -->
      <h3 style="font-size: 13.5px; font-weight: 700; margin-top: 24px; color: var(--text-dark);">Kitchen Sink & Plumbing</h3>
      <table class="quotation-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th class="text-right">Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Carysil Premium Quartz Sink</td><td class="text-center">1 No.</td><td class="text-right bold">₹18,500</td></tr>
          <tr><td>Jaquar Pull-Out Mixer</td><td class="text-center">1 No.</td><td class="text-right bold">₹12,500</td></tr>
          <tr><td>Waste Coupling + Bottle Trap</td><td class="text-center">1+1 Nos.</td><td class="text-right bold">₹3,500</td></tr>
          <tr><td>Angle Valves + Flexible Hoses</td><td class="text-center">2+2 Nos.</td><td class="text-right bold">₹2,900</td></tr>
          <tr><td>CPVC/UPVC Pipe Materials</td><td class="text-center">L.S.</td><td class="text-right bold">₹3,500</td></tr>
          <tr><td>Plumbing Consumables</td><td class="text-center">L.S.</td><td class="text-right bold">₹2,500</td></tr>
          <tr><td>Kitchen Plumbing Labour</td><td class="text-center">L.S.</td><td class="text-right bold">₹5,000</td></tr>
        </tbody>
      </table>

      <div class="subtotal-bar">
        <span>Sink & Plumbing Sub-Total</span>
        <span class="amount">₹48,400</span>
      </div>
    </section>

    <!-- ==================== SECTION 02: LIVING ROOM ==================== -->
    <section class="section-block">
      <div class="sec-badge">Section 02 of 17</div>
      <div class="sec-header-row">
        <div>
          <h2 class="sec-title">Living Room</h2>
          <div class="sec-subtitle">TV Unit • Back Panelling • Feature Wall • Decorative Rafters • Sofa</div>
        </div>
        <div class="sec-total-amount">₹3,77,550</div>
      </div>

      <div class="visual-specs-grid">
        <div class="render-img-box">
          <img src="{b64_imgs['living_tv']}" alt="TV Wall Render">
        </div>
        <div class="render-img-box">
          <img src="{b64_imgs['living_sofa']}" alt="Sofa Render">
        </div>
      </div>

      <div class="visual-specs-grid" style="align-items: start;">
        <div class="specs-list-box">
          <div class="specs-list-title">TV Wall Reference</div>
          <ul class="specs-list">
            <li>Marble Finish Feature Wall — Vitrified Tile</li>
            <li>Decorative Wooden Rafters flanking wall</li>
            <li>Floating TV Base Unit with LED cove</li>
            <li>Back Panelling — CenturyPly 710 BWP</li>
            <li>Factory Manufactured & CNC Cut</li>
          </ul>
        </div>
        <div class="specs-list-box">
          <div class="specs-list-title">Sofa Reference</div>
          <ul class="specs-list">
            <li>5 Seater — Solid Wood Frame</li>
            <li>High Resilience (HR) Foam</li>
            <li>Premium Fabric Upholstery</li>
            <li>Colour: As per design selection</li>
          </ul>
        </div>
      </div>

      <table class="quotation-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Specification</th>
            <th class="text-right">Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="bold">TV Unit Base Storage</td><td>16 Sq.ft × ₹1,850 — CenturyPly 710 BWP</td><td class="text-right bold">₹29,600</td></tr>
          <tr><td class="bold">TV Back Panelling</td><td>56 Sq.ft × ₹1,850 — CenturyPly 710 BWP</td><td class="text-right bold">₹1,03,600</td></tr>
          <tr><td class="bold">Marble Finish Feature Wall</td><td>45 Sq.ft × ₹1,870 — Vitrified Marble Tile</td><td class="text-right bold">₹84,150</td></tr>
          <tr><td class="bold">Decorative Rafters</td><td>54 Sq.ft × ₹1,300 — Engineered Wood</td><td class="text-right bold">₹70,200</td></tr>
          <tr><td class="bold">Premium Sofa</td><td>5 Seater — Solid Wood Frame, HR Foam, Premium Fabric</td><td class="text-right bold">₹90,000</td></tr>
        </tbody>
      </table>

      <div class="subtotal-bar">
        <span>Living Room Sub-Total</span>
        <span class="amount">₹3,77,550</span>
      </div>
    </section>

    <!-- ==================== SECTION 03: DINING AREA ==================== -->
    <section class="section-block">
      <div class="sec-badge">Section 03 of 17</div>
      <div class="sec-header-row">
        <div>
          <h2 class="sec-title">Dining Area</h2>
          <div class="sec-subtitle">6-Seater Marble Dining Table</div>
        </div>
        <div class="sec-total-amount">₹1,42,700</div>
      </div>

      <div class="visual-specs-grid">
        <div class="render-img-box">
          <img src="{b64_imgs['dining']}" alt="Dining Area Render">
        </div>
        <div class="specs-list-box">
          <div class="specs-list-title">Dining Table Reference</div>
          <ul class="specs-list">
            <li>6-Seater Marble-Top Dining Table</li>
            <li>Fluted Column Pedestal Base</li>
            <li>Gold Accent Edge Detail</li>
            <li>6 Upholstered Dining Chairs included</li>
            <li>Premium Fabric — Cream Tone</li>
          </ul>
        </div>
      </div>

      <table class="quotation-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Specification</th>
            <th class="text-right">Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="bold">Dining Table Set</td>
            <td>6-Seater Marble-Top Dining Table with Pedestal Base + 6 Upholstered Chairs</td>
            <td class="text-right bold">₹1,42,700</td>
          </tr>
        </tbody>
      </table>

      <div class="subtotal-bar">
        <span>Dining Area Sub-Total</span>
        <span class="amount">₹1,42,700</span>
      </div>
    </section>

    <!-- ==================== SECTION 04: MASTER BEDROOM ==================== -->
    <section class="section-block">
      <div class="sec-badge">Section 04 of 17</div>
      <div class="sec-header-row">
        <div>
          <h2 class="sec-title">Master Bedroom</h2>
          <div class="sec-subtitle">Lacquered Glass Wardrobe • Queen Bed with Hydraulic Storage • Side Tables</div>
        </div>
        <div class="sec-total-amount">₹3,81,600</div>
      </div>

      <div class="visual-specs-grid">
        <div class="render-img-box">
          <img src="{b64_imgs['mbr_wardrobe']}" alt="Master Bedroom Wardrobe Render">
        </div>
        <div class="render-img-box">
          <img src="{b64_imgs['mbr_bed']}" alt="Master Bedroom Bed Render">
        </div>
      </div>

      <div class="visual-specs-grid" style="align-items: start;">
        <div class="specs-list-box">
          <div class="specs-list-title">Master Bedroom Wardrobe</div>
          <ul class="specs-list">
            <li>Premium Lacquered Glass Sliding Shutters</li>
            <li>CenturyPly 310 MR — 19 mm Carcass, 9 mm Back</li>
            <li>Hettich Premium Sliding Hardware & Soft-Close</li>
            <li>4 Soft-Close Drawers • 2 Hanging Sections</li>
            <li>8 Adjustable Shelves • Loft Included</li>
            <li>CNC Machine Manufactured</li>
          </ul>
        </div>
        <div class="specs-list-box">
          <div class="specs-list-title">Bed Reference</div>
          <ul class="specs-list">
            <li>Queen Size Bed — Hydraulic Storage</li>
            <li>Premium Upholstered Headboard</li>
            <li>Two Bedside Tables with storage</li>
            <li>Soft-Close Hardware throughout</li>
            <li>Dressing Area with backlit round mirror</li>
          </ul>
        </div>
      </div>

      <table class="quotation-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Specification</th>
            <th class="text-right">Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="bold">Wardrobe with Loft</td><td>108 Sq.ft × ₹2,350 — Lacquered Glass Sliding</td><td class="text-right bold">₹2,53,800</td></tr>
          <tr><td class="bold">Queen Size Bed</td><td>Hydraulic Storage + Upholstered Headboard + 2 Side Tables</td><td class="text-right bold">₹1,27,800</td></tr>
        </tbody>
      </table>

      <div class="subtotal-bar">
        <span>Master Bedroom Sub-Total</span>
        <span class="amount">₹3,81,600</span>
      </div>
    </section>

    <!-- ==================== SECTION 05: BEDROOM 02 ==================== -->
    <section class="section-block">
      <div class="sec-badge">Section 05 of 17</div>
      <div class="sec-header-row">
        <div>
          <h2 class="sec-title">Bedroom 02</h2>
          <div class="sec-subtitle">Acrylic Sliding Wardrobe • Loft • King Bed with Hydraulic Storage</div>
        </div>
        <div class="sec-total-amount">₹3,13,988</div>
      </div>

      <div class="visual-specs-grid">
        <div class="render-img-box">
          <img src="{b64_imgs['bed2_wardrobe']}" alt="Bedroom 02 Wardrobe Render">
        </div>
        <div class="specs-list-box">
          <div class="specs-list-title">Bedroom 02 Wardrobe Reference</div>
          <ul class="specs-list">
            <li>High Gloss Acrylic Sliding Shutters</li>
            <li>CenturyPly 310 MR — 19 mm Carcass, 9 mm Back Panel</li>
            <li>Hettich Sliding Hardware</li>
            <li>3 Soft-Close Drawers</li>
            <li>Hanging Section • 6 Adjustable Shelves</li>
          </ul>
        </div>
      </div>

      <table class="quotation-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Specification</th>
            <th class="text-right">Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="bold">Wardrobe</td><td>77 Sq.ft × ₹2,100 — Acrylic Sliding Shutters</td><td class="text-right bold">₹1,61,700</td></tr>
          <tr><td class="bold">Loft</td><td>22 Sq.ft × ₹1,450 — CenturyPly 310 MR, Laminate</td><td class="text-right bold">₹31,900</td></tr>
          <tr><td class="bold">King Size Bed</td><td>Hydraulic Storage • Premium Headboard • Factory Finished</td><td class="text-right bold">₹1,20,388</td></tr>
        </tbody>
      </table>

      <div class="subtotal-bar">
        <span>Bedroom 02 Sub-Total</span>
        <span class="amount">₹3,13,988</span>
      </div>
    </section>

    <!-- ==================== SECTION 06: BEDROOM 03 ==================== -->
    <section class="section-block">
      <div class="sec-badge">Section 06 of 17</div>
      <div class="sec-header-row">
        <div>
          <h2 class="sec-title">Bedroom 03</h2>
          <div class="sec-subtitle">Acrylic Sliding Wardrobe • Loft • King Bed with Hydraulic Storage</div>
        </div>
        <div class="sec-total-amount">₹3,13,900</div>
      </div>

      <div class="visual-specs-grid">
        <div class="render-img-box">
          <img src="{b64_imgs['bed3_wardrobe']}" alt="Bedroom 03 Wardrobe Render">
        </div>
        <div class="specs-list-box">
          <div class="specs-list-title">Bedroom 03 Wardrobe Reference</div>
          <ul class="specs-list">
            <li>High Gloss Acrylic Sliding Shutters</li>
            <li>CenturyPly 310 MR — 19 mm Carcass</li>
            <li>Hettich Sliding Hardware</li>
            <li>3 Soft-Close Drawers</li>
            <li>Hanging Section • 6 Adjustable Shelves</li>
            <li>Factory Manufactured • CNC Cut</li>
          </ul>
        </div>
      </div>

      <table class="quotation-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Specification</th>
            <th class="text-right">Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="bold">Wardrobe</td><td>77 Sq.ft × ₹2,100 — Acrylic Sliding Shutters</td><td class="text-right bold">₹1,61,700</td></tr>
          <tr><td class="bold">Loft</td><td>22 Sq.ft × ₹1,450 — CenturyPly 310 MR, Laminate</td><td class="text-right bold">₹31,900</td></tr>
          <tr><td class="bold">King Size Bed</td><td>Hydraulic Storage • Premium Headboard • Factory Finished</td><td class="text-right bold">₹1,20,300</td></tr>
        </tbody>
      </table>

      <div class="subtotal-bar">
        <span>Bedroom 03 Sub-Total</span>
        <span class="amount">₹3,13,900</span>
      </div>
    </section>

    <!-- ==================== SECTIONS 07, 08, 09 ==================== -->
    <section class="section-block">
      <!-- Section 07 -->
      <div class="sec-badge">Section 07 of 17</div>
      <div class="sec-header-row">
        <div>
          <h2 class="sec-title">Maid Room</h2>
          <div class="sec-subtitle">Single Bed with Hydraulic Storage</div>
        </div>
        <div class="sec-total-amount">₹30,525</div>
      </div>
      <table class="quotation-table">
        <thead><tr><th>Item</th><th>Specification</th><th class="text-right">Amount (₹)</th></tr></thead>
        <tbody>
          <tr><td class="bold">Single Bed</td><td>CenturyPly 310 MR • Hydraulic Storage • Laminate Finish</td><td class="text-right bold">₹30,525</td></tr>
        </tbody>
      </table>
      <div class="subtotal-bar">
        <span>Maid Room Sub-Total</span>
        <span class="amount">₹30,525</span>
      </div>

      <!-- Section 08 -->
      <div style="margin-top: 36px;">
        <div class="sec-badge">Section 08 of 17</div>
        <div class="sec-header-row">
          <div>
            <h2 class="sec-title">Bathroom Vanity Units</h2>
            <div class="sec-subtitle">Countertops, Mirrors & Sanitary Mixers for 3 Bathrooms</div>
          </div>
          <div class="sec-total-amount">₹66,700</div>
        </div>

        <table class="quotation-table">
          <thead><tr><th>Item</th><th>Specification</th><th class="text-right">Amount (₹)</th></tr></thead>
          <tbody>
            <tr><td class="bold">Vanity Carcass</td><td>29 Sq.ft × ₹2,300 — CenturyPly 710 BWP 19mm Marine Grade</td><td class="text-right bold">₹66,700</td></tr>
          </tbody>
        </table>

        <div class="included-box">
          <div class="included-item">✓ <strong>INCLUDED</strong> KalingaStone Quartz Top — Premium Quartz Countertop — 3 Bathrooms</div>
          <div class="included-item">✓ <strong>INCLUDED</strong> Premium Mirror — 3 Nos — Framed/Backlit per design</div>
          <div class="included-item">✓ <strong>INCLUDED</strong> Jaquar Basin Mixer — 3 Nos — Premium Collection</div>
          <div class="included-item">✓ <strong>INCLUDED</strong> Plumbing Fittings — Bottle Trap, Waste Coupling, Angle Valve, Hoses — 3 sets</div>
        </div>

        <div class="subtotal-bar">
          <span>Bathroom Vanity Sub-Total</span>
          <span class="amount">₹66,700</span>
        </div>
      </div>

      <!-- Section 09 -->
      <div style="margin-top: 36px;">
        <div class="sec-badge">Section 09 of 17</div>
        <div class="sec-header-row">
          <div>
            <h2 class="sec-title">Utility Storage</h2>
            <div class="sec-subtitle">Base + Wall + Loft Storage Unit</div>
          </div>
          <div class="sec-total-amount">₹48,750</div>
        </div>

        <table class="quotation-table">
          <thead><tr><th>Item</th><th>Specification</th><th class="text-right">Amount (₹)</th></tr></thead>
          <tbody>
            <tr><td class="bold">Utility Storage Unit</td><td>25 Sq.ft × ₹1,950 — Base + Wall + Loft • CenturyPly 710 BWP • Laminate</td><td class="text-right bold">₹48,750</td></tr>
          </tbody>
        </table>

        <div class="subtotal-bar">
          <span>Utility Storage Sub-Total</span>
          <span class="amount">₹48,750</span>
        </div>
      </div>
    </section>

    <!-- ==================== SECTIONS 10 & 11: CEILING & ELECTRICAL ==================== -->
    <section class="section-block">
      <!-- Section 10 -->
      <div class="sec-badge">Section 10 of 17</div>
      <div class="sec-header-row">
        <div>
          <h2 class="sec-title">False Ceiling</h2>
          <div class="sec-subtitle">Gypsum, PVC & Grid Ceiling Systems</div>
        </div>
        <div class="sec-total-amount">₹2,60,200</div>
      </div>

      <table class="quotation-table">
        <thead><tr><th>Item</th><th>Specification</th><th class="text-right">Amount (₹)</th></tr></thead>
        <tbody>
          <tr><td class="bold">Gypsum False Ceiling — All Areas</td><td>Saint-Gobain Gyproc 12mm • GI Channel • Cove + Profile + LED Provision</td><td class="text-right bold">₹2,19,700</td></tr>
          <tr><td class="bold">PVC Ceiling — Utility Area</td><td>Waterproof PVC Panel System with perimeter finish</td><td class="text-right bold">₹20,000</td></tr>
          <tr><td class="bold">Grid Ceiling — Service Area</td><td>Armstrong / Gyproc Grid System with moisture resistance</td><td class="text-right bold">₹20,500</td></tr>
        </tbody>
      </table>

      <div class="subtotal-bar">
        <span>False Ceiling Sub-Total</span>
        <span class="amount">₹2,60,200</span>
      </div>

      <!-- Section 11 -->
      <div style="margin-top: 36px;">
        <div class="sec-badge">Section 11 of 17</div>
        <div class="sec-header-row">
          <div>
            <h2 class="sec-title">Electrical & Lighting</h2>
            <div class="sec-subtitle">Havells LED Fixtures, Profile Lights & Chandelier</div>
          </div>
          <div class="sec-total-amount">₹1,29,920</div>
        </div>

        <table class="quotation-table">
          <thead><tr><th>Item</th><th>Specification / Qty</th><th class="text-right">Amount (₹)</th></tr></thead>
          <tbody>
            <tr><td class="bold">Electrical Labour</td><td>Complete wiring, conduits, modular switches & testing</td><td class="text-right bold">₹15,000</td></tr>
            <tr><td class="bold">Havells 12W LED Panel Lights</td><td>26 Nos × ₹650 — Warm white ceiling panel lights</td><td class="text-right bold">₹16,900</td></tr>
            <tr><td class="bold">Havells COB Spot Lights</td><td>12 Nos × ₹950 — Focused architectural spotlights</td><td class="text-right bold">₹11,400</td></tr>
            <tr><td class="bold">Havells LED Strip Lights (5m Roll)</td><td>8 Rolls × ₹1,365 — 3000K warm cove accent strip</td><td class="text-right bold">₹10,920</td></tr>
            <tr><td class="bold">Havells LED Drivers</td><td>8 Nos × ₹650 — Dedicated constant voltage drivers</td><td class="text-right bold">₹5,200</td></tr>
            <tr><td class="bold">Decorative Pendant Light</td><td>1 No. × ₹6,500 — Dining / Foyer designer accent</td><td class="text-right bold">₹6,500</td></tr>
            <tr><td class="bold">Living Room Chandelier</td><td>1 No. × ₹18,000 — Luxury living room centerpiece</td><td class="text-right bold">₹18,000</td></tr>
            <tr><td class="bold">Aluminium Profile Lights</td><td>40 Rft × ₹650/Rft — Recessed slim profile with diffuser</td><td class="text-right bold">₹26,000</td></tr>
            <tr><td class="bold">FRLS Wires & Modular Switches</td><td>Polycab/Finolex FRLS, Anchor/Schneider modular plates</td><td class="text-right bold">₹20,000</td></tr>
          </tbody>
        </table>

        <div class="subtotal-bar">
          <span>Electrical & Lighting Sub-Total</span>
          <span class="amount">₹1,29,920</span>
        </div>
      </div>
    </section>

    <!-- ==================== SECTIONS 12, 13, 14: SERVICES ==================== -->
    <section class="section-block">
      <!-- Section 12 -->
      <div class="sec-badge">Section 12 of 17</div>
      <div class="sec-header-row">
        <div>
          <h2 class="sec-title">Plumbing</h2>
          <div class="sec-subtitle">Plumbing Labour & Sanitary Commissioning</div>
        </div>
        <div class="sec-total-amount">₹12,000</div>
      </div>
      <table class="quotation-table">
        <thead><tr><th>Item</th><th>Specification</th><th class="text-right">Amount (₹)</th></tr></thead>
        <tbody>
          <tr><td class="bold">Plumbing Labour</td><td>Kitchen Sink + 3 Basin Mixers + Connections + Testing</td><td class="text-right bold">₹12,000</td></tr>
        </tbody>
      </table>
      <div class="subtotal-bar">
        <span>Plumbing Sub-Total</span>
        <span class="amount">₹12,000</span>
      </div>

      <!-- Section 13 -->
      <div style="margin-top: 36px;">
        <div class="sec-badge">Section 13 of 17</div>
        <div class="sec-header-row">
          <div>
            <h2 class="sec-title">Painting</h2>
            <div class="sec-subtitle">Asian Paints Royale Luxury Emulsion</div>
          </div>
          <div class="sec-total-amount">₹1,61,700</div>
        </div>
        <table class="quotation-table">
          <thead><tr><th>Item</th><th>Specification</th><th class="text-right">Amount (₹)</th></tr></thead>
          <tbody>
            <tr><td class="bold">Interior Painting</td><td>3,850 Sq.ft × ₹42 — 2 coats Wall Putty + 1 Primer + 2 coats Royale Luxury</td><td class="text-right bold">₹1,61,700</td></tr>
          </tbody>
        </table>
        <div class="subtotal-bar">
          <span>Painting Sub-Total</span>
          <span class="amount">₹1,61,700</span>
        </div>
      </div>

      <!-- Section 14 -->
      <div style="margin-top: 36px;">
        <div class="sec-badge">Section 14 of 17</div>
        <div class="sec-header-row">
          <div>
            <h2 class="sec-title">Deep Cleaning</h2>
            <div class="sec-subtitle">Post-Installation Professional House Cleaning</div>
          </div>
          <div class="sec-total-amount">₹15,000</div>
        </div>
        <table class="quotation-table">
          <thead><tr><th>Item</th><th>Specification</th><th class="text-right">Amount (₹)</th></tr></thead>
          <tbody>
            <tr><td class="bold">Deep Cleaning</td><td>Post-installation professional deep clean, vacuuming & sanitization</td><td class="text-right bold">₹15,000</td></tr>
          </tbody>
        </table>
        <div class="subtotal-bar">
          <span>Deep Cleaning Sub-Total</span>
          <span class="amount">₹15,000</span>
        </div>
      </div>
    </section>

    <!-- ==================== SECTIONS 15, 16, 17: DESIGN & MANAGEMENT ==================== -->
    <section class="section-block">
      <!-- Section 15 -->
      <div class="sec-badge">Section 15 of 17</div>
      <div class="sec-header-row">
        <div>
          <h2 class="sec-title">Design Fees</h2>
          <div class="sec-subtitle">Architectural & 3D Interior Design Package</div>
        </div>
        <div class="sec-total-amount">₹66,000</div>
      </div>
      <table class="quotation-table">
        <thead><tr><th>Item</th><th>Specification</th><th class="text-right">Amount (₹)</th></tr></thead>
        <tbody>
          <tr><td class="bold">Design Fees</td><td>1,200 Sq.ft × ₹55/Sq.ft — Full architectural & 3D design service</td><td class="text-right bold">₹66,000</td></tr>
        </tbody>
      </table>
      <div class="specs-list-box" style="margin-top: 12px; background: var(--gold-subtle); border-radius: 4px;">
        <div class="specs-list-title">Includes:</div>
        <ul class="specs-list">
          <li>2D Layout Planning</li>
          <li>3D Design Visualization</li>
          <li>Working Drawings</li>
          <li>Electrical & Plumbing Drawings</li>
          <li>False Ceiling Drawings</li>
          <li>Walkthrough Video</li>
        </ul>
      </div>
      <div class="subtotal-bar">
        <span>Design Fees Sub-Total</span>
        <span class="amount">₹66,000</span>
      </div>

      <!-- Section 16 -->
      <div style="margin-top: 36px;">
        <div class="sec-badge">Section 16 of 17</div>
        <div class="sec-header-row">
          <div>
            <h2 class="sec-title">Loading & Unloading</h2>
            <div class="sec-subtitle">Site Logistics & Material Transport</div>
          </div>
          <div class="sec-total-amount">₹12,000</div>
        </div>
        <table class="quotation-table">
          <thead><tr><th>Item</th><th>Specification</th><th class="text-right">Amount (₹)</th></tr></thead>
          <tbody>
            <tr><td class="bold">Loading & Unloading</td><td>Site logistics — material handling, transport coordination, vertical shifting</td><td class="text-right bold">₹12,000</td></tr>
          </tbody>
        </table>
        <div class="subtotal-bar">
          <span>Loading & Unloading Sub-Total</span>
          <span class="amount">₹12,000</span>
        </div>
      </div>

      <!-- Section 17 -->
      <div style="margin-top: 36px;">
        <div class="sec-badge">Section 17 of 17</div>
        <div class="sec-header-row">
          <div>
            <h2 class="sec-title">Project Management</h2>
            <div class="sec-subtitle">Site Supervision & Execution Oversight</div>
          </div>
          <div class="sec-total-amount">₹42,000</div>
        </div>
        <table class="quotation-table">
          <thead><tr><th>Item</th><th>Specification</th><th class="text-right">Amount (₹)</th></tr></thead>
          <tbody>
            <tr><td class="bold">Project Management</td><td>Site supervision & execution oversight, full project tenure</td><td class="text-right bold">₹42,000</td></tr>
          </tbody>
        </table>
        <div class="specs-list-box" style="margin-top: 12px; background: var(--gold-subtle); border-radius: 4px;">
          <div class="specs-list-title">Includes:</div>
          <ul class="specs-list">
            <li>Site Supervision & Vendor Coordination</li>
            <li>Material Inspection & Quality Control</li>
            <li>Execution Management & Timeline Tracking</li>
            <li>Final Snag Rectification & Project Handover</li>
          </ul>
        </div>
        <div class="subtotal-bar">
          <span>Project Management Sub-Total</span>
          <span class="amount">₹42,000</span>
        </div>
      </div>
    </section>

    <!-- ==================== GRAND SUMMARY (MATCHING IMAGE 12) ==================== -->
    <section class="grand-summary-block">
      <h2 style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 2.2rem; font-weight: 700; color: var(--text-dark);">
        Grand Summary
      </h2>
      <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 20px;">
        Complete cost breakdown across all 17 sections
      </p>

      <table class="quotation-table">
        <thead>
          <tr>
            <th style="width: 50px;" class="text-center">#</th>
            <th>Section</th>
            <th class="text-right">Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="text-center bold">01</td><td class="bold">Modular Kitchen (Units)</td><td class="text-right bold">₹4,99,200</td></tr>
          <tr><td class="text-center"></td><td>Kitchen Sink & Plumbing Materials</td><td class="text-right bold">₹48,400</td></tr>
          <tr><td class="text-center bold">02</td><td class="bold">Living Room</td><td class="text-right bold">₹3,77,550</td></tr>
          <tr><td class="text-center bold">03</td><td class="bold">Dining Area</td><td class="text-right bold">₹1,42,700</td></tr>
          <tr><td class="text-center bold">04</td><td class="bold">Master Bedroom</td><td class="text-right bold">₹3,81,600</td></tr>
          <tr><td class="text-center bold">05</td><td class="bold">Bedroom 02</td><td class="text-right bold">₹3,13,988</td></tr>
          <tr><td class="text-center bold">06</td><td class="bold">Bedroom 03</td><td class="text-right bold">₹3,13,900</td></tr>
          <tr><td class="text-center bold">07</td><td class="bold">Maid Room</td><td class="text-right bold">₹30,525</td></tr>
          <tr><td class="text-center bold">08</td><td class="bold">Bathroom Vanity Units</td><td class="text-right bold">₹66,700</td></tr>
          <tr><td class="text-center bold">09</td><td class="bold">Utility Storage</td><td class="text-right bold">₹48,750</td></tr>
          <tr><td class="text-center bold">10</td><td class="bold">False Ceiling</td><td class="text-right bold">₹2,60,200</td></tr>
          <tr><td class="text-center bold">11</td><td class="bold">Electrical & Lighting</td><td class="text-right bold">₹1,29,920</td></tr>
          <tr><td class="text-center bold">12</td><td class="bold">Plumbing Labour</td><td class="text-right bold">₹12,000</td></tr>
          <tr><td class="text-center bold">13</td><td class="bold">Painting</td><td class="text-right bold">₹1,61,700</td></tr>
          <tr><td class="text-center bold">14</td><td class="bold">Deep Cleaning</td><td class="text-right bold">₹15,000</td></tr>
          <tr><td class="text-center bold">15</td><td class="bold">Design Fees</td><td class="text-right bold">₹66,000</td></tr>
          <tr><td class="text-center bold">16</td><td class="bold">Loading & Unloading</td><td class="text-right bold">₹12,000</td></tr>
          <tr><td class="text-center bold">17</td><td class="bold">Project Management</td><td class="text-right bold">₹42,000</td></tr>
        </tbody>
      </table>

      <!-- Grand Total Banner -->
      <div class="grand-total-banner">
        <span class="lbl">GRAND TOTAL</span>
        <span class="val">₹29,22,133</span>
      </div>

      <div style="font-size: 11px; color: var(--text-muted); font-style: italic; margin-top: 8px;">
        * Computed total: ₹29,22,133. GST @18% extra. Final billing per site measurement.
      </div>

      <!-- Tax Box -->
      <div class="tax-box">
        <div class="tax-row"><span>Base Value (Excl. GST):</span><strong>₹29,22,133</strong></div>
        <div class="tax-row"><span>CGST @ 9%:</span><strong>₹2,62,992</strong></div>
        <div class="tax-row"><span>SGST @ 9%:</span><strong>₹2,62,992</strong></div>
        <div class="tax-row final"><span>Total Project Cost (Incl. 18% GST):</span><strong>₹34,48,117</strong></div>
      </div>

      <!-- Payment Schedule & Bank Information Grid -->
      <div class="two-col-grid">
        <div class="info-card">
          <div class="info-card-title">Payment Milestones</div>
          <table style="width: 100%; font-size: 11.5px; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #ECE7DE; padding: 6px 0;">
              <td style="padding: 8px 0;"><strong>1. Order Confirmation</strong><br><span style="color: var(--text-muted); font-size: 10.5px;">At project confirmation</span></td>
              <td style="text-align: center; font-weight: 700;">15%</td>
              <td style="text-align: right; font-weight: 700; color: var(--gold-dark);">₹5,17,218</td>
            </tr>
            <tr style="border-bottom: 1px solid #ECE7DE;">
              <td style="padding: 8px 0;"><strong>2. Production Execution</strong><br><span style="color: var(--text-muted); font-size: 10.5px;">At start of factory production</span></td>
              <td style="text-align: center; font-weight: 700;">50%</td>
              <td style="text-align: right; font-weight: 700; color: var(--gold-dark);">₹17,24,058</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>3. Site Installation</strong><br><span style="color: var(--text-muted); font-size: 10.5px;">Prior to site dispatch & fitting</span></td>
              <td style="text-align: center; font-weight: 700;">35%</td>
              <td style="text-align: right; font-weight: 700; color: var(--gold-dark);">₹12,06,841</td>
            </tr>
          </table>
        </div>

        <div class="info-card">
          <div class="info-card-title">Bank Transfer Information</div>
          <div style="font-size: 12px; line-height: 1.8;">
            <div><strong>Bank Name:</strong> IDFC FIRST BANK</div>
            <div><strong>Branch:</strong> BTM Layout, Bengaluru</div>
            <div><strong>Account Name:</strong> DECOR8 INDIA</div>
            <div><strong>Account Number:</strong> 10075641203</div>
            <div><strong>Account Type:</strong> Current Account</div>
            <div><strong>IFSC Code:</strong> IDFB0080182</div>
          </div>
        </div>
      </div>

      <!-- Terms & Conditions -->
      <div class="info-card" style="margin-top: 24px;">
        <div class="info-card-title">* Terms & Conditions</div>
        <ol class="terms-list">
          <li>Price is valid for 30 days only after the 1st estimation is offered. Possibility of price revision may happen due to vendor supplier reasons.</li>
          <li>DECOR8 will cover warranty period up to 15 years for any wood work related products on manufacturing defects (Plywood bendness not included). DECOR8 will not cover warranty for intentional wear and tear or damages from the customer side. All other products from different vendors like Hettich, KAFF, EBCO, Havells etc will be covered by respective vendors as per their norms and DECOR8 will support for the same.</li>
          <li>Payment terms as per payment slab should be followed from the time of booking by the client for the smooth functioning of work and output. After any revised quote due to addition of products/changes, if price adds up, client needs to pay the difference amount as on the slab installment during that phase. For any reductions on amount due to changes, the amount will be adjusted in the final billing stage.</li>
          <li>Designs will not start until complete booking amount is credited to the company followed by the payment slabs for production & installation as per progress.</li>
          <li>Any delay in terms of payment as per above payment schedule then there might be a delay in the execution for which DECOR8 won't be responsible.</li>
          <li>Price may be revised if there is any hike in raw materials announced officially by the supplier if the project is still in designing stage and is yet to enter production stage. No revision of price for projects which are under production.</li>
          <li>Once an order is confirmed and customer wants to cancel the order, NO amount will be refunded.</li>
          <li>No hidden charges for 3D designs (only 03 corrections/revisions allowed).</li>
          <li>Any corrections beyond 03 times, INR 3,000 per each rendering will be charged to the client.</li>
          <li>Once the designs are approved and execution has started, no changes will be accepted in terms of structure or design modifications.</li>
        </ol>
      </div>

      <!-- Signatures -->
      <div class="signature-grid">
        <div class="sign-box">
          <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted);">Issued By</div>
          <div class="sign-name">Satish Bhat</div>
          <div class="sign-role">CEO, DECOR8 INDIA</div>
        </div>
        <div class="sign-box">
          <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted);">Accepted & Confirmed By</div>
          <div class="sign-name">MR. GOVINDA</div>
          <div class="sign-role">Client — Kolte Patil D1304</div>
        </div>
      </div>

      <!-- Footer Note -->
      <div style="text-align: center; margin-top: 32px; font-size: 11px; color: var(--gold-dark); font-weight: 600; letter-spacing: 1px;">
        DECOR8 INDIA • ARCHITECTURAL INTERIORS & LUXURY TURNKEY FITOUTS • WWW.DECOR8INDIA.COM
      </div>
    </section>

  </div>

</body>
</html>"""

    # Write HTML file to public/ and root
    paths = [
        "c:/Users/gouta/Desktop/decor8india/public/DECOR8_INDIA_LUXURY_QUOTATION_MR_GOVINDA_D1304.html",
        "c:/Users/gouta/Desktop/decor8india/DECOR8_INDIA_LUXURY_QUOTATION_MR_GOVINDA_D1304.html"
    ]
    for p in paths:
        with open(p, "w", encoding="utf-8") as f:
            f.write(html_content)
        print(f"Generated standalone luxury HTML quotation: {p}")

if __name__ == "__main__":
    generate_luxury_html_quotation()
