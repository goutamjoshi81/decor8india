import os
import sys
import base64
import time
import shutil
from playwright.sync_api import sync_playwright
import fitz  # PyMuPDF

from checklist_sketches_18 import get_sketch_for_section
from checklist_forms_18 import get_form_for_section, get_section_meta

workspace_dir = r"c:\Users\gouta\Desktop\decor8india"
logo_path = os.path.join(workspace_dir, "public", "logo.png")

logo_b64 = ""
if os.path.exists(logo_path):
    with open(logo_path, "rb") as f:
        logo_b64 = base64.b64encode(f.read()).decode("utf-8")

TOTAL_SECTIONS = 18
CONTACT_PHONE = "+91 93805 23743"

def generate_html():
    css = '''
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Inter:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&display=swap');

    :root {
      --gold-primary: #B8860B;
      --gold-light: #FEFCE8;
      --gold-dark: #997A15;
      --text-main: #0F172A;
      --text-muted: #475569;
      --border-color: #CBD5E1;
      --border-dark: #94A3B8;
      --card-bg: #FFFFFF;
      --card-head: #F8FAFC;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    body {
      background: #F1F5F9;
      color: var(--text-main);
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 10px;
      line-height: 1.35;
      -webkit-font-smoothing: antialiased;
    }

    /* Screen toolbar */
    .screen-toolbar {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(12px);
      border-bottom: 2px solid var(--gold-primary);
      padding: 10px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    }
    .screen-toolbar h1 {
      font-family: 'Cinzel', serif;
      font-size: 15px;
      color: #0F172A;
      letter-spacing: 1px;
    }
    .screen-toolbar h1 span { color: var(--gold-primary); }
    .btn-print {
      background: linear-gradient(135deg, #B8860B, #D4AF37);
      color: #FFFFFF;
      font-weight: 700;
      font-size: 12px;
      border: none;
      padding: 8px 20px;
      border-radius: 5px;
      cursor: pointer;
      font-family: 'Inter', sans-serif;
      box-shadow: 0 2px 8px rgba(184, 134, 11, 0.35);
      transition: transform 0.15s ease;
    }
    .btn-print:hover {
      transform: translateY(-1px);
    }

    /* Document wrapper */
    .checklist-document {
      width: 210mm;
      margin: 20px auto;
    }

    /* Strict A4 page definition: 210mm x 297mm */
    @page {
      size: A4 portrait;
      margin: 0;
    }

    .page-sheet {
      width: 210mm;
      height: 297mm;
      max-height: 297mm;
      page-break-after: always;
      break-after: page;
      page-break-inside: avoid;
      background: #FFFFFF;
      border: 1px solid var(--border-color);
      padding: 6mm 10mm 5mm 10mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      overflow: hidden;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
      margin-bottom: 25px;
    }

    @media print {
      body { background: #FFFFFF !important; }
      .screen-toolbar { display: none !important; }
      .checklist-document { margin: 0 !important; width: 210mm !important; }
      .page-sheet {
        border: none !important;
        box-shadow: none !important;
        margin: 0 !important;
        height: 297mm !important;
        max-height: 297mm !important;
      }
    }

    /* Header Block */
    .page-header {
      border-bottom: 2px solid var(--gold-primary);
      padding-bottom: 5px;
      margin-bottom: 6px;
    }
    .header-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .brand-col {
      display: flex;
      align-items: center;
      gap: 9px;
    }
    .brand-logo-img {
      width: 32px;
      height: 32px;
      object-fit: contain;
    }
    .brand-title-wrap {
      display: flex;
      flex-direction: column;
    }
    .brand-main {
      font-family: 'Cinzel', serif;
      font-size: 17px;
      font-weight: 900;
      color: #0F172A;
      letter-spacing: 1.5px;
      line-height: 1;
    }
    .brand-main span {
      color: var(--gold-primary);
    }
    .brand-sub {
      font-size: 7.5px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #64748B;
      font-weight: 600;
      margin-top: 2px;
    }

    .title-col {
      text-align: center;
      flex: 1;
    }
    .section-badge-pill {
      display: inline-block;
      background: var(--gold-light);
      border: 1px solid var(--gold-primary);
      color: var(--gold-dark);
      padding: 1.5px 8px;
      border-radius: 3px;
      font-size: 8px;
      font-weight: 700;
      letter-spacing: 0.6px;
    }
    .section-main-heading {
      font-size: 11.5px;
      font-weight: 800;
      color: #0F172A;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      margin-top: 2px;
    }

    .page-col {
      text-align: right;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
    .page-num-box {
      background: #F8FAFC;
      border: 1.2px solid var(--border-color);
      color: #0F172A;
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.5px;
    }
    .doc-ref-text {
      font-size: 7px;
      color: #64748B;
      margin-top: 2px;
      font-weight: 600;
    }

    /* Client & Project Metadata Bar */
    .meta-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 3px;
      padding: 3px 8px;
      margin-top: 4px;
      font-size: 8px;
      color: #475569;
    }
    .meta-item { display: flex; align-items: center; gap: 4px; }
    .meta-item strong { color: #0F172A; font-weight: 700; }
    .meta-line {
      display: inline-block;
      width: 65px;
      border-bottom: 1.2px dotted #94A3B8;
      height: 10px;
    }

    /* 60% 2D Sketch Container (WHITE THEME & CRISP LINEWORK) */
    .sketch-wrapper {
      background: #FFFFFF;
      border: 1.5px solid var(--border-dark);
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 6px;
      flex-shrink: 0;
    }
    .sketch-header-bar {
      background: #F8FAFC;
      padding: 3.5px 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--border-color);
    }
    .dwg-tag {
      background: var(--gold-primary);
      color: #FFFFFF;
      font-weight: 800;
      font-size: 8px;
      padding: 1.5px 6px;
      border-radius: 2px;
      margin-right: 6px;
      letter-spacing: 0.5px;
    }
    .dwg-title {
      font-size: 8.5px;
      font-weight: 700;
      color: #0F172A;
      letter-spacing: 0.4px;
    }
    .sketch-meta-right {
      font-size: 7.5px;
      color: #64748B;
      display: flex;
      align-items: center;
      gap: 5px;
      font-weight: 600;
    }
    .meta-sep { color: var(--gold-primary); }
    .sketch-canvas {
      width: 100%;
      height: 133mm;
      background: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .cad-svg {
      width: 100%;
      height: 100%;
      display: block;
    }
    .cad-svg text {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
    }

    /* 40% Checklist Form Area (PERFECT 2-COLUMN GRID ALIGNED) */
    .checklist-form-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      margin-bottom: 5px;
    }
    .cards-row {
      display: flex;
      gap: 8px;
      height: 100%;
    }
    .chk-card {
      background: #FFFFFF;
      border: 1.5px solid var(--border-color);
      border-radius: 4px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
    }
    .card-head {
      background: #F8FAFC;
      padding: 3.5px 8px;
      border-bottom: 1.2px solid #E2E8F0;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .card-num {
      width: 16px;
      height: 16px;
      border-radius: 2.5px;
      background: var(--gold-primary);
      color: #FFFFFF;
      font-size: 8.5px;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .card-title {
      font-size: 9px;
      font-weight: 800;
      color: #0F172A;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .card-body {
      padding: 6px 10px;
      display: flex;
      flex-direction: column;
      gap: 3px;
      flex: 1;
    }

    /* DISCIPLINED 2-COLUMN GRID ALIGNMENT */
    .chk-grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 12px;
      row-gap: 3.5px;
      align-items: center;
    }
    .field-lbl {
      font-size: 8px;
      font-weight: 800;
      color: #475569;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 1.5px;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .field-lbl::before {
      content: "";
      display: inline-block;
      width: 3px;
      height: 7px;
      background: var(--gold-primary);
      border-radius: 1px;
    }
    .field-lbl-inline {
      color: #1E293B;
      font-weight: 700;
      white-space: nowrap;
      font-size: 9.5px;
    }

    .chk-item {
      display: flex;
      align-items: center;
      gap: 5px;
      cursor: pointer;
      user-select: none;
      padding: 1px 0;
    }
    .chk-box {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 13px;
      height: 13px;
      min-width: 13px;
      min-height: 13px;
      border: 1.5px solid #1E293B;
      border-radius: 2px;
      background: #FFFFFF;
      font-size: 10px;
      font-weight: 800;
      color: var(--gold-primary);
      line-height: 1;
      box-sizing: border-box;
      flex-shrink: 0;
      transition: all 0.15s ease;
    }
    .chk-box.checked {
      background: #0F172A;
      border-color: #0F172A;
      color: #FFFFFF;
    }
    .chk-lbl {
      font-size: 9.5px;
      font-weight: 500;
      color: #0F172A;
      line-height: 1.25;
      letter-spacing: -0.01em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .field-line {
      display: flex;
      align-items: baseline;
      gap: 5px;
      font-size: 9.5px;
      margin: 1.5px 0;
    }
    .underline-fill {
      flex: 1;
      border-bottom: 1.2px solid #CBD5E1;
      color: #0F172A;
      font-size: 9.5px;
      font-weight: 500;
      min-height: 13px;
      display: inline-block;
      padding-left: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .field-grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .remarks-line .remarks-lbl {
      color: var(--gold-primary) !important;
      font-weight: 800;
      font-size: 8.5px;
      letter-spacing: 0.5px;
    }
    .remarks-line .underline-fill {
      border-bottom: 1.2px solid #CBD5E1;
    }

    /* Footer Block */
    .page-footer {
      border-top: 1.5px solid var(--gold-primary);
      padding-top: 4px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 7.5px;
      color: var(--text-muted);
      flex-shrink: 0;
    }
    .footer-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .footer-contact-item {
      display: flex;
      align-items: center;
      gap: 4px;
      white-space: nowrap;
    }
    .footer-contact-item strong {
      color: #0F172A;
      font-weight: 700;
      white-space: nowrap;
    }
    .footer-center-tagline {
      font-family: 'Cinzel', serif;
      color: var(--gold-primary);
      font-weight: 800;
      letter-spacing: 1px;
      font-size: 8px;
    }
    .footer-right-sign {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .sign-box {
      display: flex;
      align-items: baseline;
      gap: 3px;
    }
    .sign-box span {
      font-weight: 700;
      color: #0F172A;
    }
    .sign-line {
      display: inline-block;
      width: 45px;
      border-bottom: 1px solid #475569;
      height: 9px;
    }
    '''

    pages_html = []
    for s_num in range(1, TOTAL_SECTIONS + 1):
        main_title, sub_title = get_section_meta(s_num)
        sketch_html = get_sketch_for_section(s_num)
        form_html = get_form_for_section(s_num)

        page_str = f'''
        <div class="page-sheet" id="section-page-{s_num}">
          <!-- Header -->
          <div class="page-header">
            <div class="header-top">
              <div class="brand-col">
                <img src="data:image/png;base64,{logo_b64}" alt="Decor8 Logo" class="brand-logo-img" />
                <div class="brand-title-wrap">
                  <div class="brand-main">DECOR8 <span>INDIA</span></div>
                  <div class="brand-sub">Affordable Luxury • Turnkey Interior Studio</div>
                </div>
              </div>
              <div class="title-col">
                <div class="section-badge-pill">SECTION {s_num:02d} OF {TOTAL_SECTIONS:02d}</div>
                <div class="section-main-heading">{main_title}</div>
              </div>
              <div class="page-col">
                <div class="page-num-box">PAGE {s_num:02d} / {TOTAL_SECTIONS:02d}</div>
                <div class="doc-ref-text">DOC: D8-CHK-2026-v4.5</div>
              </div>
            </div>

            <!-- Client & Project Metadata Bar -->
            <div class="meta-bar">
              <div class="meta-item"><span>PROJECT:</span> <span class="meta-line"></span></div>
              <div class="meta-item"><span>CLIENT:</span> <span class="meta-line"></span></div>
              <div class="meta-item"><span>SITE LOCATION:</span> <span class="meta-line"></span></div>
              <div class="meta-item"><span>DATE:</span> <span class="meta-line"></span></div>
              <div class="meta-item"><span>STATUS:</span> <strong>SITE VERIFICATION</strong></div>
            </div>
          </div>

          <!-- 60% 2D Sketch -->
          {sketch_html}

          <!-- 40% Checklist Form -->
          <div class="checklist-form-area">
            {form_html}
          </div>

          <!-- Footer -->
          <div class="page-footer">
            <div class="footer-left">
              <div class="footer-contact-item">
                <span>📞</span> <strong>{CONTACT_PHONE}</strong>
              </div>
              <div class="footer-contact-item">
                <span>🌐</span> <strong>www.decor8india.com</strong>
              </div>
              <div class="footer-contact-item">
                <span>📍</span> <span>Bangalore • Sirsi • Karnataka</span>
              </div>
            </div>
            <div class="footer-center-tagline">
              DESIGNING SPACES, ELEVATING LIVES.
            </div>
            <div class="footer-right-sign">
              <div class="sign-box"><span>SITE ENG:</span> <span class="sign-line"></span></div>
              <div class="sign-box"><span>DESIGNER:</span> <span class="sign-line"></span></div>
              <div class="sign-box"><span>CLIENT:</span> <span class="sign-line"></span></div>
            </div>
          </div>
        </div>
        '''
        pages_html.append(page_str)

    all_pages = "\n".join(pages_html)

    full_html = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>DECOR8 INDIA - Interior Studio Checklist (18 Sections)</title>
  <style>
    {css}
  </style>
</head>
<body>
  <div class="screen-toolbar">
    <h1>DECOR8 <span>INDIA</span> — 18-SECTION INTERIOR STUDIO CHECKLIST (WHITE THEME • 1 SECTION = 1 PAGE)</h1>
    <button class="btn-print" onclick="window.print()">🖨️ Print All 18 Pages (A4 PDF)</button>
  </div>
  <div class="checklist-document">
    {all_pages}
  </div>

  <script>
    // Interactive checkbox toggle on HTML preview
    document.addEventListener('DOMContentLoaded', () => {{
      document.querySelectorAll('.chk-item').forEach(item => {{
        item.addEventListener('click', (e) => {{
          e.preventDefault();
          const box = item.querySelector('.chk-box');
          if (!box) return;
          const isChecked = box.classList.toggle('checked');
          box.textContent = isChecked ? '✓' : '';
        }});
      }});
    }});
  </script>
</body>
</html>'''
    return full_html

def main():
    print("Generating 18-Section Checklist HTML in Inter Font & Grid Alignment...")
    html_content = generate_html()
    
    html_output_path = os.path.join(workspace_dir, "public", "decor8_interior_selection_checklist.html")
    with open(html_output_path, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"Saved HTML to: {html_output_path}")

    # Also save a copy to root
    root_html = os.path.join(workspace_dir, "decor8_interior_selection_checklist_18_pages.html")
    with open(root_html, "w", encoding="utf-8") as f:
        f.write(html_content)

    pdf_output_path = os.path.join(workspace_dir, "DECOR8_INDIA_INTERIOR_STUDIO_CHECKLIST_18_PAGES.pdf")
    public_pdf_path = os.path.join(workspace_dir, "public", "DECOR8_INDIA_INTERIOR_STUDIO_CHECKLIST_18_PAGES.pdf")

    print("Launching Playwright to render White Theme PDF...")
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.set_viewport_size({"width": 1280, "height": 1800})
        
        # Navigate to file URI
        file_uri = f"file:///{html_output_path.replace(os.sep, '/')}"
        print(f"Loading {file_uri}...")
        page.goto(file_uri, wait_until="networkidle")
        time.sleep(2) # Ensure Inter font settles

        print(f"Rendering A4 PDF to {pdf_output_path}...")
        page.pdf(
            path=pdf_output_path,
            format="A4",
            print_background=True,
            prefer_css_page_size=True,
            margin={"top": "0mm", "bottom": "0mm", "left": "0mm", "right": "0mm"}
        )
        browser.close()

    # Copy to public and dist folder
    if os.path.exists(pdf_output_path):
        shutil.copy2(pdf_output_path, public_pdf_path)
        print(f"Copied PDF to: {public_pdf_path}")
        dist_dir = os.path.join(workspace_dir, "dist")
        if os.path.exists(dist_dir):
            dist_pdf_path = os.path.join(dist_dir, "DECOR8_INDIA_INTERIOR_STUDIO_CHECKLIST_18_PAGES.pdf")
            shutil.copy2(pdf_output_path, dist_pdf_path)
            print(f"Copied PDF to: {dist_pdf_path}")

    # PyMuPDF Verification
    print("Verifying PDF with PyMuPDF...")
    doc = fitz.open(pdf_output_path)
    page_count = len(doc)
    print(f"SUCCESS: Generated PDF has exactly {page_count} pages.")
    
    # Render preview PNGs for verification
    preview_indices = [1, 4, 6, 7, 10, 11, 13, 14, 18]
    for idx in preview_indices:
        if idx <= page_count:
            p = doc[idx - 1]
            pix = p.get_pixmap(dpi=150)
            preview_name = f"page_{idx:02d}_preview.png"
            preview_path = os.path.join(workspace_dir, "checklist 2d", preview_name)
            pix.save(preview_path)
            print(f"    Saved preview image: {preview_path}")

    doc.close()
    if page_count != TOTAL_SECTIONS:
        print(f"WARNING: Expected {TOTAL_SECTIONS} pages, got {page_count} pages!")
        sys.exit(1)
    print("PDF Generation & Verification Finished Successfully with STRICT 18 PAGES!")

if __name__ == "__main__":
    main()
