import os
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

def create_white_and_gold_workbook(output_filename="Decor8India_Quotation_Luxury_Gold.xlsx"):
    wb = openpyxl.Workbook()
    wb.remove(wb.active)

    # Colors
    GOLD_PRIMARY   = "FFD4AF37"   # Metallic Luxury Gold (Headers, Grand Total)
    GOLD_DEEP      = "FFB8860B"   # Deep Gold (Title, Brand text)
    GOLD_TBL_HDR   = "FFF5E8C2"   # Champagne Gold (Table Headers)
    GOLD_SUBTOTAL  = "FFEEDEA6"   # Soft Gold (Subtotals, Summary)
    GOLD_ZEBRA     = "FFFAF5E8"   # Subtle Warm Gold Tint (Alternating Rows)
    GOLD_META_LBL  = "FFF2E3BC"   # Gold Tint for Metadata & Bank Labels
    WHITE          = "FFFFFFFF"   # Pure White
    TEXT_DARK      = "FF1A1A1A"   # Crisp Jet Black
    TEXT_MUTED     = "FF555555"   # Subtitle & Note Text
    BORDER_GOLD    = "FFC9A232"   # Refined Gold Border

    thin_gold = Side(border_style="thin", color=BORDER_GOLD)
    medium_gold = Side(border_style="medium", color=BORDER_GOLD)
    double_gold = Side(border_style="double", color=BORDER_GOLD)

    cell_border = Border(left=thin_gold, right=thin_gold, top=thin_gold, bottom=thin_gold)
    subtotal_border = Border(left=thin_gold, right=thin_gold, top=thin_gold, bottom=medium_gold)
    grand_total_border = Border(left=medium_gold, right=medium_gold, top=medium_gold, bottom=double_gold)

    # Fonts
    font_quotation_title = Font(name="Segoe UI", size=16, bold=True, color=GOLD_DEEP)
    font_company_name    = Font(name="Segoe UI", size=15, bold=True, color=TEXT_DARK)
    font_company_sub     = Font(name="Segoe UI", size=9, bold=False, color=TEXT_MUTED)
    font_gstin           = Font(name="Segoe UI", size=9.5, bold=True, color=TEXT_DARK)
    font_brand_rt        = Font(name="Georgia", size=16, bold=True, color=GOLD_DEEP)
    font_tagline_rt      = Font(name="Segoe UI", size=8.5, italic=True, color=TEXT_MUTED)

    font_banner          = Font(name="Segoe UI", size=10, bold=True, color=TEXT_DARK)
    font_sec_hdr         = Font(name="Segoe UI", size=10, bold=True, color=TEXT_DARK)
    font_tbl_hdr         = Font(name="Segoe UI", size=9.5, bold=True, color=TEXT_DARK)
    
    font_cell            = Font(name="Segoe UI", size=9, bold=False, color=TEXT_DARK)
    font_cell_bold       = Font(name="Segoe UI", size=9, bold=True, color=TEXT_DARK)
    font_cell_amount     = Font(name="Segoe UI", size=9.5, bold=True, color=TEXT_DARK)
    font_subtotal        = Font(name="Segoe UI", size=9.5, bold=True, color=TEXT_DARK)
    font_grand_total     = Font(name="Segoe UI", size=11, bold=True, color=TEXT_DARK)
    
    font_terms_hdr       = Font(name="Segoe UI", size=9.5, bold=True, color=TEXT_DARK)
    font_terms_text      = Font(name="Segoe UI", size=8.5, bold=False, color="FF222222")
    font_footer          = Font(name="Segoe UI", size=9.5, bold=True, color=TEXT_DARK)

    # Fills
    fill_gold_hdr    = PatternFill(start_color=GOLD_PRIMARY, end_color=GOLD_PRIMARY, fill_type="solid")
    fill_tbl_hdr     = PatternFill(start_color=GOLD_TBL_HDR, end_color=GOLD_TBL_HDR, fill_type="solid")
    fill_subtotal    = PatternFill(start_color=GOLD_SUBTOTAL, end_color=GOLD_SUBTOTAL, fill_type="solid")
    fill_grand_total = PatternFill(start_color=GOLD_PRIMARY, end_color=GOLD_PRIMARY, fill_type="solid")
    fill_zebra_light = PatternFill(start_color=GOLD_ZEBRA, end_color=GOLD_ZEBRA, fill_type="solid")
    fill_white       = PatternFill(start_color=WHITE, end_color=WHITE, fill_type="solid")
    fill_meta_lbl    = PatternFill(start_color=GOLD_META_LBL, end_color=GOLD_META_LBL, fill_type="solid")

    # Alignments
    align_center    = Alignment(horizontal="center", vertical="center", wrap_text=True)
    align_left      = Alignment(horizontal="left", vertical="center", indent=1, wrap_text=True)
    align_right     = Alignment(horizontal="right", vertical="center", indent=1, wrap_text=True)
    align_left_top  = Alignment(horizontal="left", vertical="top", indent=1, wrap_text=True)

    def style_and_merge(ws, start_col, start_row, end_col, end_row, value=None, font=None, fill=None, border=cell_border, alignment=None, num_format=None):
        for r_idx in range(start_row, end_row + 1):
            for c_idx in range(start_col, end_col + 1):
                cell = ws.cell(row=r_idx, column=c_idx)
                if font is not None: cell.font = font
                if fill is not None: cell.fill = fill
                if border is not None: cell.border = border
                if alignment is not None: cell.alignment = alignment
                if num_format is not None: cell.number_format = num_format
        
        top_left = ws.cell(row=start_row, column=start_col)
        if value is not None:
            top_left.value = value
            
        if start_col != end_col or start_row != end_row:
            ws.merge_cells(start_row=start_row, start_column=start_col, end_row=end_row, end_column=end_col)

    def build_sheet(sheet_title, is_template=False):
        ws = wb.create_sheet(title=sheet_title)
        ws.views.sheetView[0].showGridLines = True

        column_widths = {
            'A': 8,     # Sl No
            'B': 22,    # Item Name / Particulars
            'C': 34,    # Sub Item Name / Item Details
            'D': 14,    # Total SQFT
            'E': 16,    # Rate / Unit Price
            'F': 18,    # Amount (₹)
            'G': 32     # Remarks
        }
        for col, width in column_widths.items():
            ws.column_dimensions[col].width = width

        r = 1

        # 1. Top Header Title
        ws.row_dimensions[r].height = 28
        style_and_merge(ws, 1, r, 7, r, value="QUOTATION", font=font_quotation_title, fill=fill_white, border=cell_border, alignment=align_center)
        r += 1

        # 2. Company Info (Rows 2 to 6)
        ws.row_dimensions[r].height = 20
        ws.row_dimensions[r+1].height = 16
        ws.row_dimensions[r+2].height = 16
        ws.row_dimensions[r+3].height = 16
        ws.row_dimensions[r+4].height = 18

        ws[f"A{r}"] = "DECOR8 INDIA"
        ws[f"A{r}"].font = font_company_name
        ws[f"A{r}"].alignment = align_left

        ws[f"A{r+1}"] = "#14, Sy NO 36/1 Vasanth Vallabhnagar, Vasanthapura"
        ws[f"A{r+1}"].font = font_company_sub
        ws[f"A{r+1}"].alignment = align_left

        ws[f"A{r+2}"] = "Uttarahalli Hobli ,Bengaluru - 560061"
        ws[f"A{r+2}"].font = font_company_sub
        ws[f"A{r+2}"].alignment = align_left

        ws[f"A{r+3}"] = "8884131414 ,9380523743"
        ws[f"A{r+3}"].font = font_company_sub
        ws[f"A{r+3}"].alignment = align_left

        ws[f"A{r+4}"] = "GSTIN: 29CHPPB0944C2ZD"
        ws[f"A{r+4}"].font = font_gstin
        ws[f"A{r+4}"].alignment = align_left

        # Right: Brand Identity Block
        style_and_merge(ws, 5, r, 7, r+1, value="DECOR8 INDIA", font=font_brand_rt, alignment=Alignment(horizontal="right", vertical="center"), border=None)
        style_and_merge(ws, 5, r+2, 7, r+3, value="Affordable Luxury Interiors\nwww.decor8india.com", font=font_tagline_rt, alignment=Alignment(horizontal="right", vertical="center", wrap_text=True), border=None)

        r += 5

        # Gold Divider Line
        ws.row_dimensions[r].height = 4
        style_and_merge(ws, 1, r, 7, r, fill=fill_gold_hdr, border=None)
        r += 1

        # 3. Client & Quotation Metadata
        ws.row_dimensions[r].height = 24
        lbl_q_for = "QUOTATION For - [CLIENT NAME - PROJECT / UNIT]" if is_template else "QUOTATION For - MR.GOVINDA- Kolte Patil D1304"
        style_and_merge(ws, 1, r, 4, r, value=lbl_q_for, font=font_banner, fill=fill_gold_hdr, border=cell_border, alignment=align_left)
        style_and_merge(ws, 5, r, 7, r, value="Company Representative: Mr.Satish", font=font_banner, fill=fill_gold_hdr, border=cell_border, alignment=align_left)
        r += 1

        meta_rows = [
            ("Quotation No:", "D8-2026-XXXX" if is_template else "D8202607102", "Quotation Date:", "DD-MMM-YYYY" if is_template else "06-AUG-2026"),
            ("Contact No:", "+91 XXXXXXXXXX" if is_template else "+91 ******93754", "Address:", "Bengaluru"),
            ("Email ID :", "client@email.com" if is_template else "-", "", "")
        ]

        for lbl1, val1, lbl2, val2 in meta_rows:
            ws.row_dimensions[r].height = 20
            # Left Label & Value
            style_and_merge(ws, 1, r, 1, r, value=lbl1, font=font_cell_bold, fill=fill_meta_lbl, border=cell_border, alignment=align_left)
            style_and_merge(ws, 2, r, 4, r, value=val1, font=font_cell, fill=fill_white, border=cell_border, alignment=align_left)

            # Right Label & Value
            style_and_merge(ws, 5, r, 5, r, value=lbl2, font=font_cell_bold, fill=fill_meta_lbl if lbl2 else fill_white, border=cell_border, alignment=align_left)
            style_and_merge(ws, 6, r, 7, r, value=val2, font=font_cell, fill=fill_white, border=cell_border, alignment=align_left)
            r += 1

        # Spacing
        ws.row_dimensions[r].height = 6
        r += 1

        # 4. Section A: Wood work & Modular Finish CENTURY PLY
        ws.row_dimensions[r].height = 24
        style_and_merge(ws, 1, r, 7, r, value="Section A: Wood work & Modular Finish CENTURY PLY", font=font_sec_hdr, fill=fill_gold_hdr, border=cell_border, alignment=align_left)
        r += 1

        # Section A Headers
        ws.row_dimensions[r].height = 22
        headers_a = ["Sl\nNo", "Item Name", "Sub Item Name", "Total\nSQFT", "Rate", "Amount", "Remarks"]
        for c_idx, h_text in enumerate(headers_a, start=1):
            style_and_merge(ws, c_idx, r, c_idx, r, value=h_text, font=font_tbl_hdr, fill=fill_tbl_hdr, border=cell_border, alignment=align_center if c_idx in [1, 4, 5, 6] else align_left)
        r += 1

        sec_a_start_row = r

        if is_template:
            items_a = [
                (1, "", "", "", "", ""),
                ("", "", "", "", "", ""),
                ("", "", "", "", "", ""),
                (2, "", "", "", "", ""),
                ("", "", "", "", "", ""),
            ]
        else:
            items_a = [
                (1, "Utility storage", "Profile shutters", 26, 1100, "For tv unit and kitchen"),
                ("", "", "Loft", 38, 950, "Frame with shutters"),
                ("", "", "Tall Unit", 18, 1550, "-"),
                ("", "", "Wicker Basket", "-", 12000, "2 Baskets"),
                (2, "KBR", "Swing Wardrobe", 60, 1550, "Century MR Ply carcase & Laminate Finish"),
                ("", "", "Loft", 36, 950, "Frame with shutters"),
            ]

        for sl, item, subitem, sqft, rate, rem in items_a:
            ws.row_dimensions[r].height = 20
            ws[f"A{r}"] = sl
            ws[f"B{r}"] = item
            ws[f"C{r}"] = subitem
            ws[f"D{r}"] = sqft
            ws[f"E{r}"] = rate
            if isinstance(sqft, (int, float)):
                ws[f"F{r}"] = f"=D{r}*E{r}"
            elif is_template:
                ws[f"F{r}"] = f"=IF(AND(ISNUMBER(D{r}),ISNUMBER(E{r})),D{r}*E{r},\"\")"
            else:
                ws[f"F{r}"] = rate
            ws[f"G{r}"] = rem
            r += 1

        sec_a_end_row = r - 1

        for row_idx in range(sec_a_start_row, sec_a_end_row + 1):
            ws[f"A{row_idx}"].alignment = align_center
            ws[f"B{row_idx}"].alignment = align_center
            ws[f"C{row_idx}"].alignment = align_left
            ws[f"D{row_idx}"].alignment = align_center
            ws[f"E{row_idx}"].alignment = align_right
            ws[f"F{row_idx}"].alignment = align_right
            ws[f"G{row_idx}"].alignment = align_left

            ws[f"A{row_idx}"].font = font_cell
            ws[f"B{row_idx}"].font = font_cell_bold
            ws[f"C{row_idx}"].font = font_cell
            ws[f"D{row_idx}"].font = font_cell
            ws[f"E{row_idx}"].font = font_cell
            ws[f"F{row_idx}"].font = font_cell_amount
            ws[f"G{row_idx}"].font = font_cell

            is_even = (row_idx % 2 == 0)
            for col_idx in range(1, 8):
                col_letter = get_column_letter(col_idx)
                ws[f"{col_letter}{row_idx}"].border = cell_border
                ws[f"{col_letter}{row_idx}"].fill = fill_zebra_light if is_even else fill_white

            if isinstance(ws[f"D{row_idx}"].value, (int, float)):
                ws[f"D{row_idx}"].number_format = "#,##0"
            if isinstance(ws[f"E{row_idx}"].value, (int, float)):
                ws[f"E{row_idx}"].number_format = "₹ #,##0.00"
            ws[f"F{row_idx}"].number_format = "₹ #,##0.00"

        if not is_template:
            ws.merge_cells(f"A{sec_a_start_row}:A{sec_a_start_row+3}")
            ws.merge_cells(f"B{sec_a_start_row}:B{sec_a_start_row+3}")
            ws.merge_cells(f"A{sec_a_start_row+4}:A{sec_a_start_row+5}")
            ws.merge_cells(f"B{sec_a_start_row+4}:B{sec_a_start_row+5}")

        # Subtotal Row 1
        ws.row_dimensions[r].height = 22
        style_and_merge(ws, 1, r, 5, r, value="Sub Total excluding GST", font=font_subtotal, fill=fill_subtotal, border=subtotal_border, alignment=align_right)
        style_and_merge(ws, 6, r, 6, r, value=f"=SUM(F{sec_a_start_row}:F{sec_a_end_row})", font=font_subtotal, fill=fill_subtotal, border=subtotal_border, alignment=align_right, num_format="₹ #,##0.00")
        style_and_merge(ws, 7, r, 7, r, fill=fill_subtotal, border=subtotal_border)
        subtotal_a1_row = r
        r += 1

        # Subtotal Row 2 (Final A)
        ws.row_dimensions[r].height = 22
        style_and_merge(ws, 1, r, 5, r, value="Sub Total excluding GST (A)", font=font_subtotal, fill=fill_subtotal, border=subtotal_border, alignment=align_right)
        style_and_merge(ws, 6, r, 6, r, value=f"=F{subtotal_a1_row}", font=font_subtotal, fill=fill_subtotal, border=subtotal_border, alignment=align_right, num_format="₹ #,##0.00")
        style_and_merge(ws, 7, r, 7, r, fill=fill_subtotal, border=subtotal_border)
        subtotal_a_row = r
        r += 1

        # Spacing
        ws.row_dimensions[r].height = 6
        r += 1

        # 5. Section B: Appliances & Accessories
        ws.row_dimensions[r].height = 24
        style_and_merge(ws, 1, r, 7, r, value="Section B: Appliances & Accessories", font=font_sec_hdr, fill=fill_gold_hdr, border=cell_border, alignment=align_left)
        r += 1

        ws.row_dimensions[r].height = 22
        style_and_merge(ws, 1, r, 1, r, value="Sl\nNo", font=font_tbl_hdr, fill=fill_tbl_hdr, border=cell_border, alignment=align_center)
        style_and_merge(ws, 2, r, 2, r, value="Particulars", font=font_tbl_hdr, fill=fill_tbl_hdr, border=cell_border, alignment=align_left)
        style_and_merge(ws, 3, r, 4, r, value="Item Details", font=font_tbl_hdr, fill=fill_tbl_hdr, border=cell_border, alignment=align_left)
        style_and_merge(ws, 5, r, 5, r, value="Price", font=font_tbl_hdr, fill=fill_tbl_hdr, border=cell_border, alignment=align_center)
        style_and_merge(ws, 6, r, 6, r, value="Amount", font=font_tbl_hdr, fill=fill_tbl_hdr, border=cell_border, alignment=align_center)
        style_and_merge(ws, 7, r, 7, r, value="Remarks", font=font_tbl_hdr, fill=fill_tbl_hdr, border=cell_border, alignment=align_left)
        r += 1

        sec_b_start_row = r

        kitchen_items = [
            ("Hob and Chimney (Elica /Kutchina)", "-", "-", "-"),
            ("Sink", "-", "-", "-"),
            ("Inbuilt Oven and Microwave", "-", "-", "As per model selection price may vary"),
            ("Copper pipe for Gas Cylinder connection", "-", "-", "-"),
            ("1x cutlery with tandem drawer", "-", "-", "-"),
            ("1x plain ss basket drawer", "-", "-", "-"),
            ("Rolling shutter", "-", "-", "-"),
            ("1x thali basket , Magic corner , Wicker basket", "-", "-", "-")
        ]

        kitchen_start = r
        for idx, (item_det, price, amt, rem) in enumerate(kitchen_items):
            ws.row_dimensions[r].height = 20
            ws[f"A{r}"] = 1 if idx == 0 else ""
            ws[f"B{r}"] = "Kitchen\nHardware(including soft\nhinges )" if idx == 0 else ""
            ws.merge_cells(f"C{r}:D{r}")
            ws[f"C{r}"] = item_det if not is_template else ""
            ws[f"E{r}"] = price if not is_template else ""
            ws[f"F{r}"] = amt if not is_template else ""
            ws[f"G{r}"] = rem if not is_template else ""
            r += 1
        kitchen_end = r - 1

        ws.merge_cells(f"A{kitchen_start}:A{kitchen_end}")
        ws.merge_cells(f"B{kitchen_start}:B{kitchen_end}")

        wardrobe_row = r
        ws.row_dimensions[r].height = 22
        ws[f"A{r}"] = 2
        ws[f"B{r}"] = "Wardrobes"
        ws.merge_cells(f"C{r}:D{r}")
        ws[f"C{r}"] = "Hardware-" if not is_template else ""
        ws[f"E{r}"] = 23500 if not is_template else ""
        ws[f"F{r}"] = 23500 if not is_template else ""
        ws[f"G{r}"] = "handles, hinges and required hardwares added" if not is_template else ""
        r += 1

        sec_b_end_row = r - 1

        for row_idx in range(sec_b_start_row, sec_b_end_row + 1):
            ws[f"A{row_idx}"].alignment = align_center
            ws[f"B{row_idx}"].alignment = align_center
            ws[f"C{row_idx}"].alignment = align_left
            ws[f"E{row_idx}"].alignment = align_center if ws[f"E{row_idx}"].value == "-" else align_right
            ws[f"F{row_idx}"].alignment = align_center if ws[f"F{row_idx}"].value == "-" else align_right
            ws[f"G{row_idx}"].alignment = align_left

            for c in range(1, 8):
                c_l = get_column_letter(c)
                ws[f"{c_l}{row_idx}"].font = font_cell
                ws[f"{c_l}{row_idx}"].border = cell_border
                ws[f"{c_l}{row_idx}"].fill = fill_zebra_light if row_idx % 2 == 0 else fill_white

            if isinstance(ws[f"E{row_idx}"].value, (int, float)):
                ws[f"E{row_idx}"].number_format = "₹ #,##0.00"
                ws[f"E{row_idx}"].font = font_cell_bold
            if isinstance(ws[f"F{row_idx}"].value, (int, float)):
                ws[f"F{row_idx}"].number_format = "₹ #,##0.00"
                ws[f"F{row_idx}"].font = font_cell_amount

        # Sub Total Section B
        ws.row_dimensions[r].height = 22
        style_and_merge(ws, 1, r, 5, r, value="Sub Total excluding GST (B)", font=font_subtotal, fill=fill_subtotal, border=subtotal_border, alignment=align_right)
        style_and_merge(ws, 6, r, 6, r, value=f"=SUM(F{wardrobe_row}:F{wardrobe_row})", font=font_subtotal, fill=fill_subtotal, border=subtotal_border, alignment=align_right, num_format="₹ #,##0.00")
        style_and_merge(ws, 7, r, 7, r, fill=fill_subtotal, border=subtotal_border)
        subtotal_b_row = r
        r += 1

        # Spacing
        ws.row_dimensions[r].height = 6
        r += 1

        # 6. Section C: Miscellaneous & Loose Furniture
        ws.row_dimensions[r].height = 24
        style_and_merge(ws, 1, r, 7, r, value="Section C: Miscellaneous & Loose Furniture", font=font_sec_hdr, fill=fill_gold_hdr, border=cell_border, alignment=align_left)
        r += 1

        ws.row_dimensions[r].height = 22
        style_and_merge(ws, 1, r, 1, r, value="Sl\nNo", font=font_tbl_hdr, fill=fill_tbl_hdr, border=cell_border, alignment=align_center)
        style_and_merge(ws, 2, r, 4, r, value="Particulars", font=font_tbl_hdr, fill=fill_tbl_hdr, border=cell_border, alignment=align_left)
        style_and_merge(ws, 5, r, 5, r, value="Price", font=font_tbl_hdr, fill=fill_tbl_hdr, border=cell_border, alignment=align_center)
        style_and_merge(ws, 6, r, 6, r, value="Amount", font=font_tbl_hdr, fill=fill_tbl_hdr, border=cell_border, alignment=align_center)
        style_and_merge(ws, 7, r, 7, r, value="Remarks", font=font_tbl_hdr, fill=fill_tbl_hdr, border=cell_border, alignment=align_left)
        r += 1

        misc_items = [
            ("King size bed Hydrolic with Headboard and side table", "-", "-", "-"),
            ("Queen size bed Hydrolic with Headboard and side table with cushion covering", "-", "-", "-"),
            ("Wallpapers", "-", "-", "-"),
            ("Painting (Royal Aspira ) 1 coat primer 2coat Asian paint Aspira", "-", "-", "-"),
            ("Quartz/Granite stone including cutting and installation", "-", "-", "-"),
            ("Electrical work ( including pop wiring switches etc )", "-", "-", "-")
        ]

        sec_c_start_row = r
        for idx, (particulars, price, amt, rem) in enumerate(misc_items, start=1):
            ws.row_dimensions[r].height = 20
            ws[f"A{r}"] = idx
            ws.merge_cells(f"B{r}:D{r}")
            ws[f"B{r}"] = particulars if not is_template else ""
            ws[f"E{r}"] = price if not is_template else ""
            ws[f"F{r}"] = 0 if not is_template else ""
            ws[f"G{r}"] = rem if not is_template else ""
            r += 1
        sec_c_end_row = r - 1

        for row_idx in range(sec_c_start_row, sec_c_end_row + 1):
            ws[f"A{row_idx}"].alignment = align_center
            ws[f"B{row_idx}"].alignment = align_left
            ws[f"E{row_idx}"].alignment = align_center
            ws[f"F{row_idx}"].alignment = align_right
            ws[f"G{row_idx}"].alignment = align_left

            for c in range(1, 8):
                c_l = get_column_letter(c)
                ws[f"{c_l}{row_idx}"].font = font_cell
                ws[f"{c_l}{row_idx}"].border = cell_border
                ws[f"{c_l}{row_idx}"].fill = fill_zebra_light if row_idx % 2 == 0 else fill_white

            ws[f"F{row_idx}"].number_format = "₹ #,##0.00; - ; \"-\""

        # Sub Total Section C
        ws.row_dimensions[r].height = 22
        style_and_merge(ws, 1, r, 5, r, value="Sub Total excluding GST (C)", font=font_subtotal, fill=fill_subtotal, border=subtotal_border, alignment=align_right)
        style_and_merge(ws, 6, r, 6, r, value=f"=SUM(F{sec_c_start_row}:F{sec_c_end_row})", font=font_subtotal, fill=fill_subtotal, border=subtotal_border, alignment=align_right, num_format="₹ #,##0.00")
        style_and_merge(ws, 7, r, 7, r, fill=fill_subtotal, border=subtotal_border)
        subtotal_c_row = r
        r += 1

        # Spacing
        ws.row_dimensions[r].height = 6
        r += 1

        # 7. Total Project Cost Summary
        ws.row_dimensions[r].height = 24
        style_and_merge(ws, 1, r, 5, r, value="Total Project Cost (A+B+C) excluding GST", font=font_subtotal, fill=fill_subtotal, border=cell_border, alignment=align_right)
        style_and_merge(ws, 6, r, 6, r, value=f"=F{subtotal_a_row}+F{subtotal_b_row}+F{subtotal_c_row}", font=Font(name="Segoe UI", size=10, bold=True, color=TEXT_DARK), fill=fill_subtotal, border=cell_border, alignment=align_right, num_format="₹ #,##0.00")
        style_and_merge(ws, 7, r, 7, r, fill=fill_subtotal, border=cell_border)
        total_excl_gst_row = r
        r += 1

        # CGST 9%
        ws.row_dimensions[r].height = 20
        style_and_merge(ws, 1, r, 5, r, value="CGST@ 9%", font=font_cell_bold, fill=fill_white, border=cell_border, alignment=align_right)
        style_and_merge(ws, 6, r, 6, r, value=f"=ROUND(F{total_excl_gst_row}*0.09, 0)", font=font_cell_bold, fill=fill_white, border=cell_border, alignment=align_right, num_format="₹ #,##0.00")
        style_and_merge(ws, 7, r, 7, r, fill=fill_white, border=cell_border)
        cgst_row = r
        r += 1

        # SGST 9%
        ws.row_dimensions[r].height = 20
        style_and_merge(ws, 1, r, 5, r, value="SGST@ 9%", font=font_cell_bold, fill=fill_white, border=cell_border, alignment=align_right)
        style_and_merge(ws, 6, r, 6, r, value=f"=ROUND(F{total_excl_gst_row}*0.09, 0)", font=font_cell_bold, fill=fill_white, border=cell_border, alignment=align_right, num_format="₹ #,##0.00")
        style_and_merge(ws, 7, r, 7, r, fill=fill_white, border=cell_border)
        sgst_row = r
        r += 1

        # Total Project Cost including GST
        ws.row_dimensions[r].height = 26
        style_and_merge(ws, 1, r, 5, r, value="Total Project Cost (A+B+C) including GST", font=font_grand_total, fill=fill_grand_total, border=grand_total_border, alignment=align_right)
        style_and_merge(ws, 6, r, 6, r, value=f"=F{total_excl_gst_row}+F{cgst_row}+F{sgst_row}", font=Font(name="Segoe UI", size=12, bold=True, color=TEXT_DARK), fill=fill_grand_total, border=grand_total_border, alignment=align_right, num_format="₹ #,##0.00")
        style_and_merge(ws, 7, r, 7, r, fill=fill_grand_total, border=grand_total_border)
        grand_total_row = r
        r += 1

        # Spacing
        ws.row_dimensions[r].height = 6
        r += 1

        # 8. Payment Schedule
        ws.row_dimensions[r].height = 24
        style_and_merge(ws, 1, r, 7, r, value="Payment Schedule", font=font_sec_hdr, fill=fill_gold_hdr, border=cell_border, alignment=align_left)
        r += 1

        ws.row_dimensions[r].height = 22
        style_and_merge(ws, 1, r, 1, r, value="Sl\nNo", font=font_tbl_hdr, fill=fill_tbl_hdr, border=cell_border, alignment=align_center)
        style_and_merge(ws, 2, r, 4, r, value="Payment Timelines", font=font_tbl_hdr, fill=fill_tbl_hdr, border=cell_border, alignment=align_left)
        style_and_merge(ws, 5, r, 5, r, value="Percentage", font=font_tbl_hdr, fill=fill_tbl_hdr, border=cell_border, alignment=align_center)
        style_and_merge(ws, 6, r, 7, r, value="Amount", font=font_tbl_hdr, fill=fill_tbl_hdr, border=cell_border, alignment=align_center)
        r += 1

        payment_milestones = [
            ("At the time of project/order confirmation", 0.15),
            ("At the time of starting the production/execution at factory", 0.50),
            ("After completion of production/execution at the factory or before send to the site for the installation", 0.35)
        ]

        for idx, (timeline, pct) in enumerate(payment_milestones, start=1):
            ws.row_dimensions[r].height = 24
            style_and_merge(ws, 1, r, 1, r, value=idx, font=font_cell, fill=fill_zebra_light if idx % 2 == 0 else fill_white, border=cell_border, alignment=align_center)
            style_and_merge(ws, 2, r, 4, r, value=timeline, font=font_cell, fill=fill_zebra_light if idx % 2 == 0 else fill_white, border=cell_border, alignment=align_left)
            style_and_merge(ws, 5, r, 5, r, value=pct, font=font_cell_bold, fill=fill_zebra_light if idx % 2 == 0 else fill_white, border=cell_border, alignment=align_center, num_format="0%")
            style_and_merge(ws, 6, r, 7, r, value=f"=ROUND(F{grand_total_row}*E{r}, 0)", font=font_cell_amount, fill=fill_zebra_light if idx % 2 == 0 else fill_white, border=cell_border, alignment=align_right, num_format="₹ #,##0.00")
            r += 1

        # Spacing
        ws.row_dimensions[r].height = 6
        r += 1

        # 9. Company Account Information
        ws.row_dimensions[r].height = 24
        style_and_merge(ws, 1, r, 7, r, value="Company Account information", font=font_sec_hdr, fill=fill_gold_hdr, border=cell_border, alignment=align_left)
        r += 1

        ws.row_dimensions[r].height = 18
        style_and_merge(ws, 1, r, 7, r, value="Please issue A/c Payee cheque in the name of \"DECOR8 INDIA\"", font=Font(name="Segoe UI", size=9, bold=True, color=TEXT_DARK), fill=fill_zebra_light, border=cell_border, alignment=align_center)
        r += 1

        ws.row_dimensions[r].height = 18
        style_and_merge(ws, 1, r, 7, r, value="You can also make online transactions for the below mentioned account details:", font=Font(name="Segoe UI", size=8.5, italic=True, color=TEXT_MUTED), fill=fill_zebra_light, border=cell_border, alignment=align_center)
        r += 1

        bank_details = [
            ("Bank Name:", "IDFC FIRST BANK"),
            ("Branch Name:", "BTM Layout"),
            ("A/C Name:", "DECOR8 INDIA"),
            ("A/C Number:", "10075641203"),
            ("A/C Type:", "Current"),
            ("IFSC Code:", "IDFB0080182")
        ]

        for lbl, val in bank_details:
            ws.row_dimensions[r].height = 20
            style_and_merge(ws, 1, r, 2, r, value=lbl, font=font_cell_bold, fill=fill_meta_lbl, border=cell_border, alignment=align_left)
            style_and_merge(ws, 3, r, 5, r, value=val, font=font_cell_bold if "DECOR8" in val or "IDFC" in val else font_cell, fill=fill_white, border=cell_border, alignment=align_left)
            style_and_merge(ws, 6, r, 7, r, fill=fill_white, border=cell_border)
            r += 1

        # Spacing
        ws.row_dimensions[r].height = 6
        r += 1

        # 10. Terms & Conditions
        ws.row_dimensions[r].height = 24
        style_and_merge(ws, 1, r, 7, r, value="* Terms & Conditions", font=font_terms_hdr, fill=fill_gold_hdr, border=cell_border, alignment=align_center)
        r += 1

        terms_list = [
            "Price is valid for 30 days only after the 1st estimation is offered. Possibility of price revision may happen due to vendor supplier reasons.",
            "DECOR8 will cover warranty period upto 15 years for any wood work related products on manufacturing defects (Plywood bendness not included). DECOR8 will not cover warranty for any intentional wear and tear or damages from the customer side. All other products from different vendors like Hettich, KAFF, EBCO, Havells etc will be covered by respective vendors /company as per their company norms and DECOR8 will support for the same.",
            "Payment terms as per payment slab should be followed from the time of booking by the client for the smooth functioning of work and output. After any revised quote due to any addition of products/changes, if price adds up, client needs to pay the difference amount as on the slab installment during that phase. This is due to the production related requirement for procuring materials, etc. For any reductions on amount due changes, the amount will be adjusted in the final billing stage.",
            "Designs will not start until complete booking amount is credited to the company followed by the payment slabs for production & installation after progress.",
            "Any delay in terms of payment as per above payment schedule then there might be a delay in the execution for which DECOR8 wont be responsible.",
            "Price may be revised if there is any hike in the raw material announce officially by the supplier if the project is still in designing stage and is yet to enter production stage. No revision of price for projects which are under production.",
            "Once an order is confirmed and customer wants to cancel the order then NO amount will be refunded.",
            "No hidden charges for 3D designs (only 03 corrections allowed)",
            "Any corrections beyond 03 times, INR 3000 per each rendering will be charged to the client.",
            "Once the designs are approved and execution has started, no changes will be accepted in terms of structure or designs."
        ]

        for idx, term in enumerate(terms_list, start=1):
            line_count = (len(term) // 110) + 1
            ws.row_dimensions[r].height = max(20, line_count * 16)
            style_and_merge(ws, 1, r, 7, r, value=f"* {term}", font=font_terms_text, fill=fill_white if idx % 2 != 0 else fill_zebra_light, border=cell_border, alignment=align_left_top)
            r += 1

        # Spacing
        ws.row_dimensions[r].height = 6
        r += 1

        # 11. Footer Banner
        ws.row_dimensions[r].height = 24
        style_and_merge(ws, 1, r, 7, r, value="www.decor8india.com", font=font_footer, fill=fill_gold_hdr, border=cell_border, alignment=align_center)
        r += 1

    build_sheet("Decor8 Luxury White & Gold", is_template=False)
    build_sheet("Master White & Gold Template", is_template=True)

    try:
        wb.save(output_filename)
        print(f"Successfully saved White & Gold workbook: {output_filename}")
    except PermissionError:
        alt = output_filename.replace(".xlsx", "_White_Gold.xlsx")
        wb.save(alt)
        print(f"Locked file. Saved to alternate: {alt}")

    pub_path = os.path.join("public", os.path.basename(output_filename))
    try:
        wb.save(pub_path)
        print(f"Saved public copy: {pub_path}")
    except Exception as e:
        print("Public save error:", e)

if __name__ == "__main__":
    create_white_and_gold_workbook("Decor8India_Quotation_Luxury_Gold.xlsx")
    create_white_and_gold_workbook("DECOR8_INDIA_QUOTATION_WHITE_AND_GOLD.xlsx")
