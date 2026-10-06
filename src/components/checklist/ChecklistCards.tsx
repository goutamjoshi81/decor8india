import React from 'react';
import {
  SpaceFloorPlanSketch,
  LivingRoomSketch,
  DiningCrockerySketch,
  MasterBedroomSketch,
  KidsStudySketch,
  KitchenBlueprintSketch,
  WardrobeBlueprintSketch,
  WashroomBlueprintSketch,
  FalseCeilingSketch,
  SpecialFeaturesSketch,
} from './ChecklistSketches';

interface ChecklistCardProps {
  formData: Record<string, any>;
  onFormChange: (field: string, value: any) => void;
  isPrintView?: boolean;
}

// Reusable Page Header matching Decor8 Official Document Design
const PageHeader: React.FC<{ categoryTitle: string; pageNum: number; totalPages?: number }> = ({
  categoryTitle,
  pageNum,
  totalPages = 10,
}) => (
  <div className="flex items-center justify-between border-b-2 border-[#D4AF37] pb-3 mb-4">
    <div className="flex items-center space-x-3">
      <div className="flex flex-col">
        <div className="flex items-center space-x-2">
          <span className="text-xl sm:text-2xl font-serif font-black tracking-wider text-white">
            DECOR8 <span className="text-[#D4AF37]">INDIA</span>
          </span>
          <span className="px-2 py-0.5 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] text-[10px] font-mono font-bold uppercase tracking-wider">
            Affordable Luxury
          </span>
        </div>
        <h2 className="text-sm sm:text-base font-bold uppercase tracking-widest text-[#E5E3DF] mt-0.5">
          {categoryTitle}
        </h2>
      </div>
    </div>
    <div className="text-right">
      <div className="inline-block px-3 py-1 bg-[#1E222D] border border-[#D4AF37]/40 rounded-md text-[11px] font-mono font-bold text-[#D4AF37]">
        PAGE {pageNum} OF {totalPages}
      </div>
    </div>
  </div>
);

// Reusable Page Footer
const PageFooter: React.FC = () => (
  <div className="mt-4 pt-2.5 border-t border-white/10 flex flex-wrap items-center justify-between text-[10px] font-mono text-neutral-400">
    <div className="flex items-center space-x-4">
      <span className="text-[#D4AF37] font-semibold flex items-center space-x-1">
        <span>📞</span>
        <span>+91 88800 88880</span>
      </span>
      <span className="flex items-center space-x-1">
        <span>🌐</span>
        <span>www.decor8india.com</span>
      </span>
    </div>
    <div className="text-[#D4AF37] tracking-widest uppercase font-serif text-[9px] font-bold">
      DESIGNING SPACES, ELEVATING LIVES.
    </div>
  </div>
);

// Reusable Form Section Wrapper
const SectionBox: React.FC<{
  number: number | string;
  title: string;
  children: React.ReactNode;
  className?: string;
}> = ({ number, title, children, className = '' }) => (
  <div className={`bg-[#12141A] border border-white/10 rounded-lg overflow-hidden flex flex-col ${className}`}>
    <div className="bg-[#191D26] px-3 py-1.5 border-b border-[#D4AF37]/30 flex items-center space-x-2">
      <span className="w-5 h-5 rounded bg-[#D4AF37] text-black font-extrabold flex items-center justify-center text-xs font-mono shrink-0">
        {number}
      </span>
      <h3 className="text-xs font-bold uppercase tracking-wider text-[#E5E3DF] truncate">
        {title}
      </h3>
    </div>
    <div className="p-3 text-xs space-y-2.5 flex-1">{children}</div>
  </div>
);

// 1. PAGE 1: PROJECT & SPACE MASTER SPECS
export const Page1ProjectMaster: React.FC<ChecklistCardProps> = ({ formData, onFormChange }) => {
  return (
    <div className="checklist-page bg-[#0B0C0E] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col justify-between">
      <div>
        <PageHeader categoryTitle="PROJECT & SPACE MASTER SPECIFICATIONS" pageNum={1} />
        
        {/* 2D Floor Plan Blueprint */}
        <div className="mb-4">
          <SpaceFloorPlanSketch
            dimensions={formData.dimensions_p1 || {}}
            onDimensionChange={(key, val) =>
              onFormChange('dimensions_p1', { ...(formData.dimensions_p1 || {}), [key]: val })
            }
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Section 1: Project & Client Details */}
          <SectionBox number={1} title="PROJECT & CLIENT DETAILS">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-neutral-400 block text-[10px]">Project Name:</label>
                <input
                  type="text"
                  value={formData.projectName || ''}
                  onChange={(e) => onFormChange('projectName', e.target.value)}
                  placeholder="e.g. Prestige Willow Villa"
                  className="w-full bg-[#181B24] border border-neutral-700 rounded px-2 py-1 text-white text-xs"
                />
              </div>
              <div>
                <label className="text-neutral-400 block text-[10px]">Client Name:</label>
                <input
                  type="text"
                  value={formData.clientName || ''}
                  onChange={(e) => onFormChange('clientName', e.target.value)}
                  placeholder="e.g. Mr. Rajesh Sharma"
                  className="w-full bg-[#181B24] border border-neutral-700 rounded px-2 py-1 text-white text-xs"
                />
              </div>
              <div>
                <label className="text-neutral-400 block text-[10px]">Contact Number:</label>
                <input
                  type="text"
                  value={formData.contactNumber || ''}
                  onChange={(e) => onFormChange('contactNumber', e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-[#181B24] border border-neutral-700 rounded px-2 py-1 text-white text-xs"
                />
              </div>
              <div>
                <label className="text-neutral-400 block text-[10px]">Email ID:</label>
                <input
                  type="email"
                  value={formData.emailId || ''}
                  onChange={(e) => onFormChange('emailId', e.target.value)}
                  placeholder="client@email.com"
                  className="w-full bg-[#181B24] border border-neutral-700 rounded px-2 py-1 text-white text-xs"
                />
              </div>
              <div className="col-span-2">
                <label className="text-neutral-400 block text-[10px]">Site Address:</label>
                <input
                  type="text"
                  value={formData.siteAddress || ''}
                  onChange={(e) => onFormChange('siteAddress', e.target.value)}
                  placeholder="Tower A, Flat 804, Bengaluru"
                  className="w-full bg-[#181B24] border border-neutral-700 rounded px-2 py-1 text-white text-xs"
                />
              </div>
              <div className="col-span-2 flex flex-wrap gap-2 pt-1 text-[11px]">
                {['Apartment', 'Villa', 'Independent House', 'Office / Retail', 'Other'].map((t) => (
                  <label key={t} className="flex items-center space-x-1 cursor-pointer">
                    <input
                      type="radio"
                      name="propertyType"
                      checked={formData.propertyType === t}
                      onChange={() => onFormChange('propertyType', t)}
                      className="accent-[#D4AF37]"
                    />
                    <span>{t}</span>
                  </label>
                ))}
              </div>
            </div>
          </SectionBox>

          {/* Section 2: Space & Scope Details */}
          <SectionBox number={2} title="SPACE & SCOPE DETAILS">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-neutral-400 block text-[10px]">Total Built-up Area:</label>
                <input
                  type="text"
                  value={formData.builtUpArea || ''}
                  onChange={(e) => onFormChange('builtUpArea', e.target.value)}
                  placeholder="e.g. 1850 sq.ft."
                  className="w-full bg-[#181B24] border border-neutral-700 rounded px-2 py-1 text-white text-xs"
                />
              </div>
              <div>
                <label className="text-neutral-400 block text-[10px]">Carpet Area:</label>
                <input
                  type="text"
                  value={formData.carpetArea || ''}
                  onChange={(e) => onFormChange('carpetArea', e.target.value)}
                  placeholder="e.g. 1420 sq.ft."
                  className="w-full bg-[#181B24] border border-neutral-700 rounded px-2 py-1 text-white text-xs"
                />
              </div>
              <div className="col-span-2">
                <label className="text-neutral-400 block text-[10px]">Unit Configuration:</label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {['1 BHK', '2 BHK', '3 BHK', '4 BHK', 'Villa / Duplex'].map((u) => (
                    <label key={u} className="flex items-center space-x-1 cursor-pointer">
                      <input
                        type="radio"
                        name="unitType"
                        checked={formData.unitType === u}
                        onChange={() => onFormChange('unitType', u)}
                        className="accent-[#D4AF37]"
                      />
                      <span>{u}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-neutral-400 block text-[10px]">Ceiling Height:</label>
                <input
                  type="text"
                  value={formData.ceilingHeight || ''}
                  onChange={(e) => onFormChange('ceilingHeight', e.target.value)}
                  placeholder="e.g. 10 ft. 2 in."
                  className="w-full bg-[#181B24] border border-neutral-700 rounded px-2 py-1 text-white text-xs"
                />
              </div>
              <div>
                <label className="text-neutral-400 block text-[10px]">Target Possession:</label>
                <input
                  type="text"
                  value={formData.possessionDate || ''}
                  onChange={(e) => onFormChange('possessionDate', e.target.value)}
                  placeholder="e.g. Nov 2026"
                  className="w-full bg-[#181B24] border border-neutral-700 rounded px-2 py-1 text-white text-xs"
                />
              </div>
              <div className="col-span-2">
                <label className="text-neutral-400 block text-[10px]">Structural / Civil Changes Required:</label>
                <div className="flex items-center space-x-4 pt-1">
                  <label className="flex items-center space-x-1">
                    <input
                      type="radio"
                      name="civilChanges"
                      checked={formData.civilChanges === 'Yes'}
                      onChange={() => onFormChange('civilChanges', 'Yes')}
                      className="accent-[#D4AF37]"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center space-x-1">
                    <input
                      type="radio"
                      name="civilChanges"
                      checked={formData.civilChanges === 'No'}
                      onChange={() => onFormChange('civilChanges', 'No')}
                      className="accent-[#D4AF37]"
                    />
                    <span>No</span>
                  </label>
                  <input
                    type="text"
                    placeholder="If yes, describe wall removal/shift..."
                    value={formData.civilChangesDetails || ''}
                    onChange={(e) => onFormChange('civilChangesDetails', e.target.value)}
                    className="flex-1 bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs"
                  />
                </div>
              </div>
            </div>
          </SectionBox>
        </div>

        {/* Section 3 & 4: Design Theme & Budget/Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <SectionBox number={3} title="DESIGN THEME & COLOR PALETTE">
            <div className="space-y-2">
              <label className="text-neutral-400 block text-[10px]">Preferred Style / Theme:</label>
              <div className="grid grid-cols-4 gap-1.5">
                {['Modern', 'Contemporary', 'Minimal', 'Classic', 'Luxury', 'Scandinavian', 'Industrial', 'Boho'].map((theme) => (
                  <label key={theme} className="flex items-center space-x-1 cursor-pointer">
                    <input
                      type="radio"
                      name="designTheme"
                      checked={formData.designTheme === theme}
                      onChange={() => onFormChange('designTheme', theme)}
                      className="accent-[#D4AF37]"
                    />
                    <span className="text-[11px]">{theme}</span>
                  </label>
                ))}
              </div>
              <div className="pt-1">
                <label className="text-neutral-400 block text-[10px]">Preferred Color Palette:</label>
                <div className="flex flex-wrap gap-3 pt-0.5">
                  {['Light & Airy', 'Warm Neutral', 'Moody & Dark', 'Jewel / Bold Tone', 'Wood & Gold'].map((pal) => (
                    <label key={pal} className="flex items-center space-x-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={Boolean(formData.colorPalette?.[pal])}
                        onChange={(e) =>
                          onFormChange('colorPalette', {
                            ...(formData.colorPalette || {}),
                            [pal]: e.target.checked,
                          })
                        }
                        className="accent-[#D4AF37]"
                      />
                      <span>{pal}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </SectionBox>

          <SectionBox number={4} title="BUDGET & TIMELINE TARGETS">
            <div className="space-y-2">
              <div>
                <label className="text-neutral-400 block text-[10px]">Estimated Budget Range (₹ INR):</label>
                <input
                  type="text"
                  value={formData.budgetRange || ''}
                  onChange={(e) => onFormChange('budgetRange', e.target.value)}
                  placeholder="e.g. ₹18 Lakhs - ₹25 Lakhs"
                  className="w-full bg-[#181B24] border border-neutral-700 rounded px-2 py-1 text-white text-xs"
                />
              </div>
              <div>
                <label className="text-neutral-400 block text-[10px]">Expected Completion Deadline:</label>
                <input
                  type="text"
                  value={formData.timelineGoal || ''}
                  onChange={(e) => onFormChange('timelineGoal', e.target.value)}
                  placeholder="e.g. 60 to 75 Days turnkey execution"
                  className="w-full bg-[#181B24] border border-neutral-700 rounded px-2 py-1 text-white text-xs"
                />
              </div>
              <div>
                <label className="text-neutral-400 block text-[10px]">Budget / Material Flexibility:</label>
                <div className="flex items-center space-x-4 pt-1">
                  {['Strict Cap', 'Flexible for Premium Upgrades', 'Value-Engineered'].map((flx) => (
                    <label key={flx} className="flex items-center space-x-1 cursor-pointer">
                      <input
                        type="radio"
                        name="budgetFlexibility"
                        checked={formData.budgetFlexibility === flx}
                        onChange={() => onFormChange('budgetFlexibility', flx)}
                        className="accent-[#D4AF37]"
                      />
                      <span className="text-[10px]">{flx}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </SectionBox>
        </div>
      </div>
      <PageFooter />
    </div>
  );
};

// 2. PAGE 2: LIVING ROOM SELECTION CHECKLIST
export const Page2LivingRoom: React.FC<ChecklistCardProps> = ({ formData, onFormChange }) => {
  return (
    <div className="checklist-page bg-[#0B0C0E] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col justify-between">
      <div>
        <PageHeader categoryTitle="LIVING ROOM SELECTION CHECKLIST" pageNum={2} />

        <div className="mb-4">
          <LivingRoomSketch
            dimensions={formData.dimensions_p2 || {}}
            onDimensionChange={(key, val) =>
              onFormChange('dimensions_p2', { ...(formData.dimensions_p2 || {}), [key]: val })
            }
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* TV Unit & Entertainment Wall */}
          <SectionBox number={1} title="TV UNIT & MEDIA WALL SPECIFICATIONS">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>TV Unit Required:</span>
                <div className="flex space-x-3">
                  <label className="flex items-center space-x-1"><input type="radio" name="tvRequired" checked={formData.tvRequired === 'Yes'} onChange={() => onFormChange('tvRequired', 'Yes')} className="accent-[#D4AF37]" /><span>Yes</span></label>
                  <label className="flex items-center space-x-1"><input type="radio" name="tvRequired" checked={formData.tvRequired === 'No'} onChange={() => onFormChange('tvRequired', 'No')} className="accent-[#D4AF37]" /><span>No</span></label>
                </div>
              </div>
              <div>
                <label className="text-neutral-400 block text-[10px]">TV Screen Size:</label>
                <div className="flex space-x-2 pt-0.5">
                  {['55"', '65"', '75"', '85"', 'Projector Screen'].map((sz) => (
                    <label key={sz} className="flex items-center space-x-1">
                      <input type="radio" name="tvSize" checked={formData.tvSize === sz} onChange={() => onFormChange('tvSize', sz)} className="accent-[#D4AF37]" />
                      <span>{sz}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-neutral-400 block text-[10px]">Back Panel Style:</label>
                <div className="grid grid-cols-2 gap-1 pt-0.5">
                  {['Italian Marble / Quartz Slab', 'Acoustic Fluted Louvers', 'Veneer with Brass Profile', 'PU Gloss / Matte Finish', 'Fabric / Leatherette Tuft', 'Stone Veneer Sheet'].map((p) => (
                    <label key={p} className="flex items-center space-x-1 text-[11px]">
                      <input type="checkbox" checked={Boolean(formData.tvBackPanel?.[p])} onChange={(e) => onFormChange('tvBackPanel', { ...(formData.tvBackPanel || {}), [p]: e.target.checked })} className="accent-[#D4AF37]" />
                      <span>{p}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-neutral-400 block text-[10px]">Console Base Type:</label>
                <div className="flex space-x-3 pt-0.5">
                  {['Wall-Hung Floating', 'Floor Standing Ledge', 'Full Height Storage'].map((cb) => (
                    <label key={cb} className="flex items-center space-x-1">
                      <input type="radio" name="tvConsoleType" checked={formData.tvConsoleType === cb} onChange={() => onFormChange('tvConsoleType', cb)} className="accent-[#D4AF37]" />
                      <span>{cb}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </SectionBox>

          {/* Seating & Sofa Details */}
          <SectionBox number={2} title="SOFA & SEATING CONFIGURATION">
            <div className="space-y-2">
              <div>
                <label className="text-neutral-400 block text-[10px]">Sofa Unit Layout:</label>
                <div className="flex flex-wrap gap-2 pt-0.5">
                  {['L-Shape Sectional', '3 + 2 Seater', '3 + 1 + 1 Seater', 'Chesterfield', 'Curved Modern'].map((s) => (
                    <label key={s} className="flex items-center space-x-1">
                      <input type="radio" name="sofaLayout" checked={formData.sofaLayout === s} onChange={() => onFormChange('sofaLayout', s)} className="accent-[#D4AF37]" />
                      <span>{s}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-neutral-400 block text-[10px]">Upholstery Material:</label>
                <div className="flex space-x-3 pt-0.5">
                  {['High-End Fabric', 'Genuine Italian Leather', 'Leatherette', 'Velvet'].map((u) => (
                    <label key={u} className="flex items-center space-x-1">
                      <input type="radio" name="sofaMaterial" checked={formData.sofaMaterial === u} onChange={() => onFormChange('sofaMaterial', u)} className="accent-[#D4AF37]" />
                      <span>{u}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <label className="text-neutral-400 block text-[10px]">Accent Armchairs (Qty):</label>
                  <input type="text" placeholder="e.g. 2 Swivel Chairs" value={formData.accentChairs || ''} onChange={(e) => onFormChange('accentChairs', e.target.value)} className="w-full bg-[#181B24] border border-neutral-700 rounded px-2 py-1 text-white text-xs" />
                </div>
                <div>
                  <label className="text-neutral-400 block text-[10px]">Center / Coffee Table:</label>
                  <input type="text" placeholder="e.g. Nesting Marble Top" value={formData.coffeeTable || ''} onChange={(e) => onFormChange('coffeeTable', e.target.value)} className="w-full bg-[#181B24] border border-neutral-700 rounded px-2 py-1 text-white text-xs" />
                </div>
              </div>
            </div>
          </SectionBox>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <SectionBox number={3} title="WALL FINISHES & ACCENTS">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span>Accent Wall Wallpaper:</span>
                <input type="text" placeholder="Texture / Metallic / Canvas" value={formData.livingWallpaper || ''} onChange={(e) => onFormChange('livingWallpaper', e.target.value)} className="w-48 bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
              </div>
              <div className="flex items-center justify-between">
                <span>Wall Moulding / Trims:</span>
                <div className="flex space-x-2">
                  {['French Wainscoting', 'Brass Grooves', 'None'].map((m) => (
                    <label key={m} className="flex items-center space-x-1"><input type="radio" name="wallMoulding" checked={formData.wallMoulding === m} onChange={() => onFormChange('wallMoulding', m)} className="accent-[#D4AF37]" /><span className="text-[11px]">{m}</span></label>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Foyer Shoe Console:</span>
                <input type="text" placeholder="Shoe cabinet with cushioned seating" value={formData.shoeConsole || ''} onChange={(e) => onFormChange('shoeConsole', e.target.value)} className="w-48 bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
              </div>
            </div>
          </SectionBox>

          <SectionBox number={4} title="LIGHTING & WINDOW COVERINGS">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span>Lighting CCT:</span>
                <div className="flex space-x-2">
                  {['Warm (3000K)', 'Neutral (4000K)', 'Tunable Smart'].map((l) => (
                    <label key={l} className="flex items-center space-x-1"><input type="radio" name="livingLightCct" checked={formData.livingLightCct === l} onChange={() => onFormChange('livingLightCct', l)} className="accent-[#D4AF37]" /><span className="text-[11px]">{l}</span></label>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Chandelier / Fan:</span>
                <input type="text" placeholder="e.g. Crystal Ring Chandelier + BLDC Fan" value={formData.livingChandelier || ''} onChange={(e) => onFormChange('livingChandelier', e.target.value)} className="w-48 bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
              </div>
              <div className="flex items-center justify-between">
                <span>Curtains / Sheers:</span>
                <div className="flex space-x-2">
                  {['Motorized Ripple Sheers', 'Manual Double Track', 'Roman Blinds'].map((c) => (
                    <label key={c} className="flex items-center space-x-1"><input type="radio" name="livingCurtains" checked={formData.livingCurtains === c} onChange={() => onFormChange('livingCurtains', c)} className="accent-[#D4AF37]" /><span className="text-[11px]">{c}</span></label>
                  ))}
                </div>
              </div>
            </div>
          </SectionBox>
        </div>
      </div>
      <PageFooter />
    </div>
  );
};

// 3. PAGE 3: DINING AREA & CROCKERY CHECKLIST
export const Page3DiningArea: React.FC<ChecklistCardProps> = ({ formData, onFormChange }) => {
  return (
    <div className="checklist-page bg-[#0B0C0E] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col justify-between">
      <div>
        <PageHeader categoryTitle="DINING AREA & CROCKERY SELECTION CHECKLIST" pageNum={3} />

        <div className="mb-4">
          <DiningCrockerySketch
            dimensions={formData.dimensions_p3 || {}}
            onDimensionChange={(key, val) =>
              onFormChange('dimensions_p3', { ...(formData.dimensions_p3 || {}), [key]: val })
            }
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Crockery Unit & Buffet Console */}
          <SectionBox number={1} title="CROCKERY UNIT & BUFFET CONSOLE">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Crockery Unit Required:</span>
                <div className="flex space-x-3">
                  <label className="flex items-center space-x-1"><input type="radio" name="crockeryReq" checked={formData.crockeryReq === 'Yes'} onChange={() => onFormChange('crockeryReq', 'Yes')} className="accent-[#D4AF37]" /><span>Yes</span></label>
                  <label className="flex items-center space-x-1"><input type="radio" name="crockeryReq" checked={formData.crockeryReq === 'No'} onChange={() => onFormChange('crockeryReq', 'No')} className="accent-[#D4AF37]" /><span>No</span></label>
                </div>
              </div>
              <div>
                <label className="text-neutral-400 block text-[10px]">Display Shutter Type:</label>
                <div className="flex flex-wrap gap-2 pt-0.5">
                  {['Fluted Glass in Slim Alu Profile', 'Tinted Bronze Glass', 'Clear Toughened Glass', 'Solid PU Finish'].map((st) => (
                    <label key={st} className="flex items-center space-x-1">
                      <input type="radio" name="crockeryShutter" checked={formData.crockeryShutter === st} onChange={() => onFormChange('crockeryShutter', st)} className="accent-[#D4AF37]" />
                      <span>{st}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-neutral-400 block text-[10px]">Buffet Countertop Material:</label>
                <div className="flex space-x-2 pt-0.5">
                  {['Quartz 15mm', 'Nano White', 'Italian Marble', 'Full-Body Porcelain'].map((bt) => (
                    <label key={bt} className="flex items-center space-x-1">
                      <input type="radio" name="buffetTop" checked={formData.buffetTop === bt} onChange={() => onFormChange('buffetTop', bt)} className="accent-[#D4AF37]" />
                      <span>{bt}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <label className="flex items-center space-x-1.5"><input type="checkbox" checked={Boolean(formData.wineRackReq)} onChange={(e) => onFormChange('wineRackReq', e.target.checked)} className="accent-[#D4AF37]" /><span>Wine Bottle Rack Niche</span></label>
                <label className="flex items-center space-x-1.5"><input type="checkbox" checked={Boolean(formData.warmLedShelves)} onChange={(e) => onFormChange('warmLedShelves', e.target.checked)} className="accent-[#D4AF37]" /><span>Internal Warm LED Strips</span></label>
              </div>
            </div>
          </SectionBox>

          {/* Dining Table & Seating */}
          <SectionBox number={2} title="DINING TABLE & CHAIR SPECIFICATIONS">
            <div className="space-y-2">
              <div>
                <label className="text-neutral-400 block text-[10px]">Seating Capacity:</label>
                <div className="flex space-x-3 pt-0.5">
                  {['4 Seater', '6 Seater', '8 Seater', 'Extendable 6-8 Seater'].map((sc) => (
                    <label key={sc} className="flex items-center space-x-1">
                      <input type="radio" name="diningSeating" checked={formData.diningSeating === sc} onChange={() => onFormChange('diningSeating', sc)} className="accent-[#D4AF37]" />
                      <span>{sc}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-neutral-400 block text-[10px]">Table Top Material:</label>
                <div className="flex flex-wrap gap-2 pt-0.5">
                  {['Onyx Marble', 'Sintered Stone Quartz', 'Solid Teak Wood', 'Toughened Black Glass'].map((tt) => (
                    <label key={tt} className="flex items-center space-x-1">
                      <input type="radio" name="diningTableTop" checked={formData.diningTableTop === tt} onChange={() => onFormChange('diningTableTop', tt)} className="accent-[#D4AF37]" />
                      <span>{tt}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-neutral-400 block text-[10px]">Chair Upholstery & Base:</label>
                <div className="flex space-x-3 pt-0.5">
                  {['Fabric with Brass Legs', 'Leatherette with Wood Base', 'Ergonomic Curved Velvet'].map((ch) => (
                    <label key={ch} className="flex items-center space-x-1">
                      <input type="radio" name="diningChairType" checked={formData.diningChairType === ch} onChange={() => onFormChange('diningChairType', ch)} className="accent-[#D4AF37]" />
                      <span>{ch}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-neutral-400 block text-[10px]">Dining Bench Option:</label>
                <div className="flex space-x-3 pt-0.5">
                  {['Cushioned Dining Bench (1 Side)', 'All Individual Chairs'].map((db) => (
                    <label key={db} className="flex items-center space-x-1">
                      <input type="radio" name="diningBench" checked={formData.diningBench === db} onChange={() => onFormChange('diningBench', db)} className="accent-[#D4AF37]" />
                      <span>{db}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </SectionBox>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <SectionBox number={3} title="HANDWASH NOOK & VANITY">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span>Dining Handwash Nook:</span>
                <div className="flex space-x-2">
                  <label className="flex items-center space-x-1"><input type="radio" name="handwashNook" checked={formData.handwashNook === 'Yes'} onChange={() => onFormChange('handwashNook', 'Yes')} className="accent-[#D4AF37]" /><span>Yes</span></label>
                  <label className="flex items-center space-x-1"><input type="radio" name="handwashNook" checked={formData.handwashNook === 'No'} onChange={() => onFormChange('handwashNook', 'No')} className="accent-[#D4AF37]" /><span>No</span></label>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Basin Style:</span>
                <input type="text" placeholder="Designer Tabletop Ceramic / Stone Basin" value={formData.diningBasin || ''} onChange={(e) => onFormChange('diningBasin', e.target.value)} className="w-48 bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
              </div>
              <div className="flex items-center justify-between">
                <span>Backlit Mirror Shape:</span>
                <input type="text" placeholder="Pill / Asymmetric Organic / Round LED" value={formData.diningMirror || ''} onChange={(e) => onFormChange('diningMirror', e.target.value)} className="w-48 bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
              </div>
            </div>
          </SectionBox>

          <SectionBox number={4} title="PENDANT LIGHT & CEILING ACCENT">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span>Dining Pendant Light:</span>
                <input type="text" placeholder="Linear Brass Chandelier / 3-Drop Pendant" value={formData.diningPendant || ''} onChange={(e) => onFormChange('diningPendant', e.target.value)} className="w-48 bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
              </div>
              <div className="flex items-center justify-between">
                <span>False Ceiling Feature:</span>
                <input type="text" placeholder="Wooden Rafters / Gold Inlay Cove" value={formData.diningCeiling || ''} onChange={(e) => onFormChange('diningCeiling', e.target.value)} className="w-48 bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
              </div>
              <div className="flex items-center justify-between">
                <span>Wall Paneling / Mirror Wall:</span>
                <input type="text" placeholder="Beveled Tinted Mirror Paneling" value={formData.diningWallMirror || ''} onChange={(e) => onFormChange('diningWallMirror', e.target.value)} className="w-48 bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
              </div>
            </div>
          </SectionBox>
        </div>
      </div>
      <PageFooter />
    </div>
  );
};

// 4. PAGE 4: MASTER BEDROOM CHECKLIST
export const Page4MasterBedroom: React.FC<ChecklistCardProps> = ({ formData, onFormChange }) => {
  return (
    <div className="checklist-page bg-[#0B0C0E] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col justify-between">
      <div>
        <PageHeader categoryTitle="MASTER BEDROOM SELECTION CHECKLIST" pageNum={4} />

        <div className="mb-4">
          <MasterBedroomSketch
            dimensions={formData.dimensions_p4 || {}}
            onDimensionChange={(key, val) =>
              onFormChange('dimensions_p4', { ...(formData.dimensions_p4 || {}), [key]: val })
            }
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Bed & Headboard Paneling */}
          <SectionBox number={1} title="MASTER BED & HEADBOARD SPECIFICATIONS">
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-neutral-400 block text-[10px]">Bed Size:</label>
                  <div className="flex space-x-2 pt-0.5">
                    {['King (72x78")', 'Queen (60x78")', 'Super King'].map((bs) => (
                      <label key={bs} className="flex items-center space-x-1">
                        <input type="radio" name="masterBedSize" checked={formData.masterBedSize === bs} onChange={() => onFormChange('masterBedSize', bs)} className="accent-[#D4AF37]" />
                        <span>{bs}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-neutral-400 block text-[10px]">Storage Mechanism:</label>
                  <div className="flex space-x-2 pt-0.5">
                    {['Hydraulic Lift-Up', 'Pull-out Drawers', 'Box Storage', 'No Storage'].map((sm) => (
                      <label key={sm} className="flex items-center space-x-1">
                        <input type="radio" name="masterBedStorage" checked={formData.masterBedStorage === sm} onChange={() => onFormChange('masterBedStorage', sm)} className="accent-[#D4AF37]" />
                        <span>{sm}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <label className="text-neutral-400 block text-[10px]">Headboard Design:</label>
                <div className="flex flex-wrap gap-2 pt-0.5">
                  {['Full Height Acoustic Slats + Velvet', 'Vertical Channel Tufting', 'Curved Wingback Headboard', 'Veneer with Warm LED Inlay'].map((hb) => (
                    <label key={hb} className="flex items-center space-x-1">
                      <input type="radio" name="masterHeadboard" checked={formData.masterHeadboard === hb} onChange={() => onFormChange('masterHeadboard', hb)} className="accent-[#D4AF37]" />
                      <span>{hb}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <label className="text-neutral-400 block text-[10px]">Nightstands / Side Tables:</label>
                  <div className="flex space-x-2 pt-0.5">
                    {['Floating Drawer', 'Floor Standing 2-Drawer'].map((ns) => (
                      <label key={ns} className="flex items-center space-x-1">
                        <input type="radio" name="masterNightstand" checked={formData.masterNightstand === ns} onChange={() => onFormChange('masterNightstand', ns)} className="accent-[#D4AF37]" />
                        <span>{ns}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-neutral-400 block text-[10px]">Bedside Charging & Switches:</label>
                  <input type="text" placeholder="2-Way Bedside Switches + Type-C USB" value={formData.masterBedsideSwitches || ''} onChange={(e) => onFormChange('masterBedsideSwitches', e.target.value)} className="w-full bg-[#181B24] border border-neutral-700 rounded px-2 py-1 text-white text-xs" />
                </div>
              </div>
            </div>
          </SectionBox>

          {/* Dressing Unit & Vanity */}
          <SectionBox number={2} title="DRESSING UNIT & VANITY DETAILS">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Dressing Unit Required:</span>
                <div className="flex space-x-3">
                  <label className="flex items-center space-x-1"><input type="radio" name="masterDressingReq" checked={formData.masterDressingReq === 'Yes'} onChange={() => onFormChange('masterDressingReq', 'Yes')} className="accent-[#D4AF37]" /><span>Yes</span></label>
                  <label className="flex items-center space-x-1"><input type="radio" name="masterDressingReq" checked={formData.masterDressingReq === 'No'} onChange={() => onFormChange('masterDressingReq', 'No')} className="accent-[#D4AF37]" /><span>No</span></label>
                </div>
              </div>
              <div>
                <label className="text-neutral-400 block text-[10px]">Mirror Specification:</label>
                <div className="flex flex-wrap gap-2 pt-0.5">
                  {['Full Height Frameless LED Backlit', 'Capsule / Arch Shape Mirror', 'Concealed Mirror Storage Behind', 'Wardrobe Integrated Shutter Mirror'].map((ms) => (
                    <label key={ms} className="flex items-center space-x-1">
                      <input type="radio" name="masterMirrorSpec" checked={formData.masterMirrorSpec === ms} onChange={() => onFormChange('masterMirrorSpec', ms)} className="accent-[#D4AF37]" />
                      <span>{ms}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-neutral-400 block text-[10px]">Cosmetics & Jewellery Storage:</label>
                <div className="flex space-x-3 pt-0.5">
                  {['Organized Felt-Lined Drawers', 'Tall Side Storage Niche', 'Lockable Drawer'].map((cs) => (
                    <label key={cs} className="flex items-center space-x-1">
                      <input type="checkbox" checked={Boolean(formData.masterDressingStorage?.[cs])} onChange={(e) => onFormChange('masterDressingStorage', { ...(formData.masterDressingStorage || {}), [cs]: e.target.checked })} className="accent-[#D4AF37]" />
                      <span>{cs}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-neutral-400 block text-[10px]">Seating Stool / Pouf:</label>
                <input type="text" placeholder="e.g. Cylindrical Velvet Storage Pouf" value={formData.masterDressingStool || ''} onChange={(e) => onFormChange('masterDressingStool', e.target.value)} className="w-full bg-[#181B24] border border-neutral-700 rounded px-2 py-1 text-white text-xs" />
              </div>
            </div>
          </SectionBox>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <SectionBox number={3} title="TV UNIT / STUDY IN BEDROOM">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span>Bedroom TV Unit:</span>
                <input type="text" placeholder="Slim Minimal Floating Ledge (43-55 Inch)" value={formData.masterTvUnit || ''} onChange={(e) => onFormChange('masterTvUnit', e.target.value)} className="w-48 bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
              </div>
              <div className="flex items-center justify-between">
                <span>Compact Workstation:</span>
                <input type="text" placeholder="Wall-mounted floating laptop desk" value={formData.masterLaptopDesk || ''} onChange={(e) => onFormChange('masterLaptopDesk', e.target.value)} className="w-48 bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
              </div>
            </div>
          </SectionBox>

          <SectionBox number={4} title="LIGHTING & WINDOW TREATMENTS">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span>Reading Spotlights:</span>
                <input type="text" placeholder="Flexible Gooseneck / Sleek Wall Sconces" value={formData.masterReadingLights || ''} onChange={(e) => onFormChange('masterReadingLights', e.target.value)} className="w-48 bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
              </div>
              <div className="flex items-center justify-between">
                <span>Blackout Curtains:</span>
                <input type="text" placeholder="100% Blackout Drapes + Sheer Curtains" value={formData.masterCurtains || ''} onChange={(e) => onFormChange('masterCurtains', e.target.value)} className="w-48 bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
              </div>
            </div>
          </SectionBox>
        </div>
      </div>
      <PageFooter />
    </div>
  );
};

// 5. PAGE 5: KIDS / GUEST BEDROOM & STUDY CHECKLIST
export const Page5KidsStudy: React.FC<ChecklistCardProps> = ({ formData, onFormChange }) => {
  return (
    <div className="checklist-page bg-[#0B0C0E] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col justify-between">
      <div>
        <PageHeader categoryTitle="KIDS / GUEST BEDROOM & STUDY SELECTION CHECKLIST" pageNum={5} />

        <div className="mb-4">
          <KidsStudySketch
            dimensions={formData.dimensions_p5 || {}}
            onDimensionChange={(key, val) =>
              onFormChange('dimensions_p5', { ...(formData.dimensions_p5 || {}), [key]: val })
            }
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Study & Workstation Unit */}
          <SectionBox number={1} title="STUDY WORKSTATION & OVERHEAD STORAGE">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Study Table Required:</span>
                <div className="flex space-x-3">
                  <label className="flex items-center space-x-1"><input type="radio" name="studyReq" checked={formData.studyReq === 'Yes'} onChange={() => onFormChange('studyReq', 'Yes')} className="accent-[#D4AF37]" /><span>Yes</span></label>
                  <label className="flex items-center space-x-1"><input type="radio" name="studyReq" checked={formData.studyReq === 'No'} onChange={() => onFormChange('studyReq', 'No')} className="accent-[#D4AF37]" /><span>No</span></label>
                </div>
              </div>
              <div>
                <label className="text-neutral-400 block text-[10px]">Desk Style & Configuration:</label>
                <div className="flex flex-wrap gap-2 pt-0.5">
                  {['Ergonomic Straight Desk', 'L-Shaped Corner Workstation', 'Dual Seater Twin Desk', 'Floating Wall Desk'].map((dst) => (
                    <label key={dst} className="flex items-center space-x-1">
                      <input type="radio" name="deskStyle" checked={formData.deskStyle === dst} onChange={() => onFormChange('deskStyle', dst)} className="accent-[#D4AF37]" />
                      <span>{dst}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-neutral-400 block text-[10px]">Overhead Storage & Bookshelf:</label>
                <div className="flex flex-wrap gap-2 pt-0.5">
                  {['Open Cubbies + Closed Shutters', 'Full Glass Bookshelf', 'Hexagon Geometric Shelves', 'Minimalist Slat Shelves'].map((oh) => (
                    <label key={oh} className="flex items-center space-x-1">
                      <input type="radio" name="overheadBookshelf" checked={formData.overheadBookshelf === oh} onChange={() => onFormChange('overheadBookshelf', oh)} className="accent-[#D4AF37]" />
                      <span>{oh}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <label className="flex items-center space-x-1.5"><input type="checkbox" checked={Boolean(formData.magneticPinboard)} onChange={(e) => onFormChange('magneticPinboard', e.target.checked)} className="accent-[#D4AF37]" /><span>Magnetic Pinboard / Softboard</span></label>
                <label className="flex items-center space-x-1.5"><input type="checkbox" checked={Boolean(formData.underDeskCable)} onChange={(e) => onFormChange('underDeskCable', e.target.checked)} className="accent-[#D4AF37]" /><span>Cable Wire Grommets</span></label>
              </div>
            </div>
          </SectionBox>

          {/* Kids / Guest Bed Configuration */}
          <SectionBox number={2} title="BED CONFIGURATION & THEME">
            <div className="space-y-2">
              <div>
                <label className="text-neutral-400 block text-[10px]">Bed Type:</label>
                <div className="flex flex-wrap gap-2 pt-0.5">
                  {['Single Bed with Trundle Pull-out', 'Queen Bed with Hydraulic Storage', 'Bunk Bed with Ladder', 'Daybed / Sofa-cum-Bed'].map((bt) => (
                    <label key={bt} className="flex items-center space-x-1">
                      <input type="radio" name="kidsBedType" checked={formData.kidsBedType === bt} onChange={() => onFormChange('kidsBedType', bt)} className="accent-[#D4AF37]" />
                      <span>{bt}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-neutral-400 block text-[10px]">Room Character / Theme:</label>
                <div className="flex flex-wrap gap-2 pt-0.5">
                  {['Space & Astronomy', 'Nordic Pastel & Wood', 'Sports & Modern Urban', 'Floral & Dreamy', 'Minimalist Guest Suite'].map((th) => (
                    <label key={th} className="flex items-center space-x-1">
                      <input type="radio" name="kidsTheme" checked={formData.kidsTheme === th} onChange={() => onFormChange('kidsTheme', th)} className="accent-[#D4AF37]" />
                      <span>{th}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-neutral-400 block text-[10px]">Wall Graphic / Wallpaper:</label>
                <input type="text" placeholder="Custom illustrated mural or textured vinyl" value={formData.kidsWallpaper || ''} onChange={(e) => onFormChange('kidsWallpaper', e.target.value)} className="w-full bg-[#181B24] border border-neutral-700 rounded px-2 py-1 text-white text-xs" />
              </div>
            </div>
          </SectionBox>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <SectionBox number={3} title="ELECTRICAL & GADGET PROVISIONS">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span>Computer / Monitor Points:</span>
                <input type="text" placeholder="3x Power Sockets + LAN Port" value={formData.studyPowerPoints || ''} onChange={(e) => onFormChange('studyPowerPoints', e.target.value)} className="w-48 bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
              </div>
              <div className="flex items-center justify-between">
                <span>Under-Shelf Task Light:</span>
                <input type="text" placeholder="Warm White 4000K Diffused LED" value={formData.studyTaskLight || ''} onChange={(e) => onFormChange('studyTaskLight', e.target.value)} className="w-48 bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
              </div>
            </div>
          </SectionBox>

          <SectionBox number={4} title="ADDITIONAL PREFERENCES & NOTES">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span>Wardrobe Style in Room:</span>
                <input type="text" placeholder="Hinged 2-Door with external drawers" value={formData.kidsWardrobeNotes || ''} onChange={(e) => onFormChange('kidsWardrobeNotes', e.target.value)} className="w-48 bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
              </div>
              <div className="flex items-center justify-between">
                <span>Special Requirement:</span>
                <input type="text" placeholder="Chalkboard wall / toy chest" value={formData.kidsSpecialReq || ''} onChange={(e) => onFormChange('kidsSpecialReq', e.target.value)} className="w-48 bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
              </div>
            </div>
          </SectionBox>
        </div>
      </div>
      <PageFooter />
    </div>
  );
};

// 6. PAGE 6: MODULAR KITCHEN SELECTION CHECKLIST (Direct from Image 2 & 4)
export const Page6ModularKitchen: React.FC<ChecklistCardProps> = ({ formData, onFormChange }) => {
  return (
    <div className="checklist-page bg-[#0B0C0E] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col justify-between">
      <div>
        <PageHeader categoryTitle="MODULAR KITCHEN SELECTION CHECKLIST" pageNum={6} />

        <div className="mb-4">
          <KitchenBlueprintSketch
            dimensions={formData.dimensions_p6 || {}}
            onDimensionChange={(key, val) =>
              onFormChange('dimensions_p6', { ...(formData.dimensions_p6 || {}), [key]: val })
            }
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 1. Kitchen Type & Layout */}
          <SectionBox number={1} title="KITCHEN TYPE & LAYOUT">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-neutral-400 text-[10px]">Kitchen Type:</span>
                <div className="flex space-x-3">
                  {['Modular', 'Semi-Modular', 'Custom Built'].map((kt) => (
                    <label key={kt} className="flex items-center space-x-1">
                      <input type="radio" name="kitchenType" checked={formData.kitchenType === kt} onChange={() => onFormChange('kitchenType', kt)} className="accent-[#D4AF37]" />
                      <span>{kt}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-neutral-400 block text-[10px]">Layout Configuration:</label>
                <div className="grid grid-cols-3 gap-1 pt-0.5">
                  {['Straight', 'L-Shaped', 'U-Shaped', 'Parallel', 'Island', 'G-Shaped'].map((lo) => (
                    <label key={lo} className="flex items-center space-x-1">
                      <input type="radio" name="kitchenLayout" checked={formData.kitchenLayout === lo} onChange={() => onFormChange('kitchenLayout', lo)} className="accent-[#D4AF37]" />
                      <span>{lo}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-neutral-400 text-[10px]">Kitchen Location:</span>
                <div className="flex space-x-3">
                  {['Open', 'Closed', 'Semi-Open'].map((loc) => (
                    <label key={loc} className="flex items-center space-x-1">
                      <input type="radio" name="kitchenLocation" checked={formData.kitchenLocation === loc} onChange={() => onFormChange('kitchenLocation', loc)} className="accent-[#D4AF37]" />
                      <span>{loc}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </SectionBox>

          {/* 2. Material & Finish */}
          <SectionBox number={2} title="MATERIAL & FINISH SPECIFICATIONS">
            <div className="space-y-2">
              <div>
                <label className="text-neutral-400 block text-[10px]">Carcass Material:</label>
                <div className="flex flex-wrap gap-2 pt-0.5">
                  {['BWP Marine Plywood 710', 'BWR Plywood 303', 'HDHMR / MDF', 'Particle Board'].map((cm) => (
                    <label key={cm} className="flex items-center space-x-1">
                      <input type="radio" name="kitchenCarcass" checked={formData.kitchenCarcass === cm} onChange={() => onFormChange('kitchenCarcass', cm)} className="accent-[#D4AF37]" />
                      <span>{cm}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-neutral-400 block text-[10px]">Shutter Finish:</label>
                <div className="grid grid-cols-3 gap-1 pt-0.5">
                  {['Acrylic Anti-Scratch', 'High Gloss Laminate', 'PU Paint / Matte', 'Glass in Alu Profile', 'Veneer PU Coated', 'Ceramic Finish'].map((sf) => (
                    <label key={sf} className="flex items-center space-x-1 text-[11px]">
                      <input type="radio" name="kitchenShutter" checked={formData.kitchenShutter === sf} onChange={() => onFormChange('kitchenShutter', sf)} className="accent-[#D4AF37]" />
                      <span>{sf}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-neutral-400 block text-[10px]">Countertop Material:</label>
                <div className="flex flex-wrap gap-2 pt-0.5">
                  {['Granite (Jet Black)', 'Quartz Sintered Stone', 'Nano White', 'Corian Solid Surface', 'Compact Laminate'].map((ct) => (
                    <label key={ct} className="flex items-center space-x-1">
                      <input type="radio" name="kitchenCountertop" checked={formData.kitchenCountertop === ct} onChange={() => onFormChange('kitchenCountertop', ct)} className="accent-[#D4AF37]" />
                      <span>{ct}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-0.5">
                <div>
                  <label className="text-neutral-400 block text-[10px]">Backsplash:</label>
                  <input type="text" placeholder="Full Quartz / Subway Tiles" value={formData.kitchenBacksplash || ''} onChange={(e) => onFormChange('kitchenBacksplash', e.target.value)} className="w-full bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
                </div>
                <div>
                  <label className="text-neutral-400 block text-[10px]">Edge Profile:</label>
                  <input type="text" placeholder="Straight / Bevel / Bullnose" value={formData.kitchenEdgeProfile || ''} onChange={(e) => onFormChange('kitchenEdgeProfile', e.target.value)} className="w-full bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
                </div>
              </div>
            </div>
          </SectionBox>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* 3. Storage & Accessories */}
          <SectionBox number={3} title="STORAGE & ACCESSORIES (BLUM / HETTICH)">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span>Drawer System:</span>
                <div className="flex space-x-2">
                  {['Tandem Box Soft-Close', 'InnoTech Metal', 'Standard Channels'].map((ds) => (
                    <label key={ds} className="flex items-center space-x-1"><input type="radio" name="kitchenDrawers" checked={formData.kitchenDrawers === ds} onChange={() => onFormChange('kitchenDrawers', ds)} className="accent-[#D4AF37]" /><span className="text-[11px]">{ds}</span></label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-neutral-400 block text-[10px]">Corner Solutions:</label>
                <div className="flex space-x-2 pt-0.5">
                  {['Carousel Lazy Susan', 'Magic Corner', 'LeMans Corner Pull-out', 'Blind Corner Shelves'].map((cs) => (
                    <label key={cs} className="flex items-center space-x-1">
                      <input type="radio" name="kitchenCorner" checked={formData.kitchenCorner === cs} onChange={() => onFormChange('kitchenCorner', cs)} className="accent-[#D4AF37]" />
                      <span>{cs}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1 pt-1">
                {['Cutlery Organiser', 'Bottle Pull-out', 'Thali Basket', 'Spice Pull-out', 'Waste Bin Niche', 'Pantry Tall Unit'].map((acc) => (
                  <label key={acc} className="flex items-center space-x-1 text-[11px]">
                    <input type="checkbox" checked={Boolean(formData.kitchenAccessories?.[acc])} onChange={(e) => onFormChange('kitchenAccessories', { ...(formData.kitchenAccessories || {}), [acc]: e.target.checked })} className="accent-[#D4AF37]" />
                    <span>{acc}</span>
                  </label>
                ))}
              </div>
            </div>
          </SectionBox>

          {/* 4. Hardware, Appliances & Plumbing */}
          <SectionBox number={4} title="HARDWARE, FIXTURES & APPLIANCES">
            <div className="space-y-1.5">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-neutral-400 block text-[10px]">Handle Profile:</label>
                  <input type="text" placeholder="Gola Profile (Handleless) / J-Pull" value={formData.kitchenHandle || ''} onChange={(e) => onFormChange('kitchenHandle', e.target.value)} className="w-full bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
                </div>
                <div>
                  <label className="text-neutral-400 block text-[10px]">Sink & Faucet:</label>
                  <input type="text" placeholder="Single / Double Bowl Quartz Sink + Pullout Tap" value={formData.kitchenSink || ''} onChange={(e) => onFormChange('kitchenSink', e.target.value)} className="w-full bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-neutral-400 block text-[10px]">Hob & Chimney:</label>
                  <input type="text" placeholder="3/4 Burner Glass Hob + 90cm 1500m3 Chimney" value={formData.kitchenHobChimney || ''} onChange={(e) => onFormChange('kitchenHobChimney', e.target.value)} className="w-full bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
                </div>
                <div>
                  <label className="text-neutral-400 block text-[10px]">Built-in Appliances:</label>
                  <input type="text" placeholder="Built-in Microwave / Oven / Dishwasher" value={formData.kitchenAppliances || ''} onChange={(e) => onFormChange('kitchenAppliances', e.target.value)} className="w-full bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span>Loft Cabinets to Ceiling:</span>
                <div className="flex space-x-3">
                  <label className="flex items-center space-x-1"><input type="radio" name="kitchenLoftReq" checked={formData.kitchenLoftReq === 'Yes'} onChange={() => onFormChange('kitchenLoftReq', 'Yes')} className="accent-[#D4AF37]" /><span>Yes</span></label>
                  <label className="flex items-center space-x-1"><input type="radio" name="kitchenLoftReq" checked={formData.kitchenLoftReq === 'No'} onChange={() => onFormChange('kitchenLoftReq', 'No')} className="accent-[#D4AF37]" /><span>No</span></label>
                </div>
              </div>
            </div>
          </SectionBox>
        </div>
      </div>
      <PageFooter />
    </div>
  );
};

// 7. PAGE 7: WARDROBE SELECTION CHECKLIST (Direct from Image 2)
export const Page7Wardrobe: React.FC<ChecklistCardProps> = ({ formData, onFormChange }) => {
  return (
    <div className="checklist-page bg-[#0B0C0E] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col justify-between">
      <div>
        <PageHeader categoryTitle="WARDROBE SELECTION CHECKLIST" pageNum={7} />

        <div className="mb-4">
          <WardrobeBlueprintSketch
            dimensions={formData.dimensions_p7 || {}}
            onDimensionChange={(key, val) =>
              onFormChange('dimensions_p7', { ...(formData.dimensions_p7 || {}), [key]: val })
            }
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 1. Wardrobe Type & Style */}
          <SectionBox number={1} title="WARDROBE TYPE & STYLE">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-neutral-400 text-[10px]">Wardrobe Type:</span>
                <div className="flex space-x-3">
                  {['Hinged Door', 'Sliding Door', 'Walk-in Closet', 'Open System'].map((wt) => (
                    <label key={wt} className="flex items-center space-x-1">
                      <input type="radio" name="wardrobeType" checked={formData.wardrobeType === wt} onChange={() => onFormChange('wardrobeType', wt)} className="accent-[#D4AF37]" />
                      <span>{wt}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-neutral-400 block text-[10px]">Style & Aesthetics:</label>
                <div className="flex flex-wrap gap-2 pt-0.5">
                  {['Modern Luxury', 'Classic Moulded', 'Contemporary Glass', 'Minimalist Flat', 'Scandinavian'].map((ws) => (
                    <label key={ws} className="flex items-center space-x-1">
                      <input type="radio" name="wardrobeStyle" checked={formData.wardrobeStyle === ws} onChange={() => onFormChange('wardrobeStyle', ws)} className="accent-[#D4AF37]" />
                      <span>{ws}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-neutral-400 block text-[10px]">Door Configuration:</label>
                <div className="flex space-x-3 pt-0.5">
                  {['2 Door', '3 Door', '4 Door', 'L-Shaped Corner', 'Walk-in U-Shape'].map((dc) => (
                    <label key={dc} className="flex items-center space-x-1">
                      <input type="radio" name="wardrobeConfig" checked={formData.wardrobeConfig === dc} onChange={() => onFormChange('wardrobeConfig', dc)} className="accent-[#D4AF37]" />
                      <span>{dc}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </SectionBox>

          {/* 2. Material & Finish */}
          <SectionBox number={2} title="MATERIAL & FINISH SPECIFICATIONS">
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-neutral-400 block text-[10px]">Carcass Material:</label>
                  <div className="space-y-1 pt-0.5">
                    {['Commercial Plywood MR', 'Marine Plywood BWP', 'HDHMR Action TESA'].map((cm) => (
                      <label key={cm} className="flex items-center space-x-1 text-[11px]">
                        <input type="radio" name="wardrobeCarcass" checked={formData.wardrobeCarcass === cm} onChange={() => onFormChange('wardrobeCarcass', cm)} className="accent-[#D4AF37]" />
                        <span>{cm}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-neutral-400 block text-[10px]">Shutter Finish:</label>
                  <div className="space-y-1 pt-0.5">
                    {['Laminate (High Gloss/Matte)', 'Acrylic High Gloss', 'Tinted Fluted Glass', 'PU Paint Finish', 'Natural Veneer'].map((sf) => (
                      <label key={sf} className="flex items-center space-x-1 text-[11px]">
                        <input type="radio" name="wardrobeShutter" checked={formData.wardrobeShutter === sf} onChange={() => onFormChange('wardrobeShutter', sf)} className="accent-[#D4AF37]" />
                        <span>{sf}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <label className="text-neutral-400 block text-[10px]">Edge Banding:</label>
                  <input type="text" placeholder="2mm PVC / Zero Joint Laser Edge" value={formData.wardrobeEdgeBand || ''} onChange={(e) => onFormChange('wardrobeEdgeBand', e.target.value)} className="w-full bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
                </div>
                <div>
                  <label className="text-neutral-400 block text-[10px]">Hardware Finish:</label>
                  <input type="text" placeholder="Rose Gold / Brushed Brass / Matt Black" value={formData.wardrobeHwFinish || ''} onChange={(e) => onFormChange('wardrobeHwFinish', e.target.value)} className="w-full bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
                </div>
              </div>
            </div>
          </SectionBox>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* 3. Internal Configuration */}
          <SectionBox number={3} title="INTERNAL CONFIGURATION & ACCESSORIES">
            <div className="space-y-1.5">
              <div>
                <label className="text-neutral-400 block text-[10px]">Hanging Sections:</label>
                <div className="flex space-x-3 pt-0.5">
                  {['Long Coat Hanging', 'Double Shirt Hanging', 'Combination'].map((hs) => (
                    <label key={hs} className="flex items-center space-x-1">
                      <input type="radio" name="wardrobeHanging" checked={formData.wardrobeHanging === hs} onChange={() => onFormChange('wardrobeHanging', hs)} className="accent-[#D4AF37]" />
                      <span>{hs}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-neutral-400 block text-[10px]">Internal Drawers & Locks:</label>
                <div className="flex space-x-3 pt-0.5">
                  {['2 Drawers with Lock', '3 Drawers (1 with Lock)', '4 Drawers + Jewellery Tray'].map((id) => (
                    <label key={id} className="flex items-center space-x-1">
                      <input type="radio" name="wardrobeDrawers" checked={formData.wardrobeDrawers === id} onChange={() => onFormChange('wardrobeDrawers', id)} className="accent-[#D4AF37]" />
                      <span>{id}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1 pt-1">
                {['Trouser Pull-out', 'Tie & Belt Rack', 'Shoe Pull-out Tray', 'Jewellery Felt Organiser', 'Pull-out Hamper', 'Digital Safe Locker Niche'].map((wa) => (
                  <label key={wa} className="flex items-center space-x-1 text-[11px]">
                    <input type="checkbox" checked={Boolean(formData.wardrobeAccessories?.[wa])} onChange={(e) => onFormChange('wardrobeAccessories', { ...(formData.wardrobeAccessories || {}), [wa]: e.target.checked })} className="accent-[#D4AF37]" />
                    <span>{wa}</span>
                  </label>
                ))}
              </div>
            </div>
          </SectionBox>

          {/* 4. Doors, Lighting & Additional Preferences */}
          <SectionBox number={4} title="DOORS, LIGHTING & PREFERENCES">
            <div className="space-y-1.5">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-neutral-400 block text-[10px]">Handle Style:</label>
                  <input type="text" placeholder="Full Length Profile / Concealed Gola" value={formData.wardrobeHandle || ''} onChange={(e) => onFormChange('wardrobeHandle', e.target.value)} className="w-full bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
                </div>
                <div>
                  <label className="text-neutral-400 block text-[10px]">Hinges & Channels:</label>
                  <input type="text" placeholder="Hettich Sensys Soft-Close 110°" value={formData.wardrobeHinges || ''} onChange={(e) => onFormChange('wardrobeHinges', e.target.value)} className="w-full bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center space-x-1.5"><input type="checkbox" checked={Boolean(formData.wardrobeSensorLed)} onChange={(e) => onFormChange('wardrobeSensorLed', e.target.checked)} className="accent-[#D4AF37]" /><span>PIR Motion Sensor LED Rods</span></label>
                <label className="flex items-center space-x-1.5"><input type="checkbox" checked={Boolean(formData.wardrobeFullHeight)} onChange={(e) => onFormChange('wardrobeFullHeight', e.target.checked)} className="accent-[#D4AF37]" /><span>Full Height to Ceiling with Loft</span></label>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span>Back Panel Finish:</span>
                <input type="text" placeholder="Matching Laminate / Fabric Lining / PU" value={formData.wardrobeBackPanel || ''} onChange={(e) => onFormChange('wardrobeBackPanel', e.target.value)} className="w-48 bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
              </div>
            </div>
          </SectionBox>
        </div>
      </div>
      <PageFooter />
    </div>
  );
};

// 8. PAGE 8: WASHROOM & VANITY CHECKLIST (Direct from Images 1 & 3)
export const Page8Washroom: React.FC<ChecklistCardProps> = ({ formData, onFormChange }) => {
  return (
    <div className="checklist-page bg-[#0B0C0E] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col justify-between">
      <div>
        <PageHeader categoryTitle="WASHROOM & VANITY SELECTION CHECKLIST" pageNum={8} />

        <div className="mb-4">
          <WashroomBlueprintSketch
            dimensions={formData.dimensions_p8 || {}}
            onDimensionChange={(key, val) =>
              onFormChange('dimensions_p8', { ...(formData.dimensions_p8 || {}), [key]: val })
            }
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 11. Sanitaryware & Basin Details */}
          <SectionBox number={11} title="SANITARYWARE & BASIN DETAILS">
            <div className="space-y-1.5">
              <div>
                <label className="text-neutral-400 block text-[10px]">Basin Type:</label>
                <div className="grid grid-cols-3 gap-1 pt-0.5">
                  {['Over-counter', 'Under-counter', 'Table-top', 'Integrated', 'Wall-mounted', 'Pedestal'].map((bt) => (
                    <label key={bt} className="flex items-center space-x-1 text-[11px]">
                      <input type="radio" name="basinType" checked={formData.basinType === bt} onChange={() => onFormChange('basinType', bt)} className="accent-[#D4AF37]" />
                      <span>{bt}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-neutral-400 block text-[10px]">Basin Brand:</label>
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {['Kohler', 'Jaquar', 'Grohe', 'Hindware', 'Cera', 'Toto'].map((bb) => (
                      <label key={bb} className="flex items-center space-x-1 text-[10px]">
                        <input type="radio" name="basinBrand" checked={formData.basinBrand === bb} onChange={() => onFormChange('basinBrand', bb)} className="accent-[#D4AF37]" />
                        <span>{bb}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-neutral-400 block text-[10px]">Countertop Material:</label>
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {['Granite', 'Quartz', 'Marble', 'Engineered Stone'].map((ct) => (
                      <label key={ct} className="flex items-center space-x-1 text-[10px]">
                        <input type="radio" name="washroomCounter" checked={formData.washroomCounter === ct} onChange={() => onFormChange('washroomCounter', ct)} className="accent-[#D4AF37]" />
                        <span>{ct}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-0.5">
                <span>Under-Basin Vanity Cabinet:</span>
                <input type="text" placeholder="Waterproof HDHMR with soft-close drawers" value={formData.washroomCabinet || ''} onChange={(e) => onFormChange('washroomCabinet', e.target.value)} className="w-48 bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
              </div>
            </div>
          </SectionBox>

          {/* 12. Shower & Bathing Area Details */}
          <SectionBox number={12} title="SHOWER & BATHING AREA DETAILS">
            <div className="space-y-1.5">
              <div>
                <label className="text-neutral-400 block text-[10px]">Shower Type:</label>
                <div className="grid grid-cols-3 gap-1 pt-0.5">
                  {['Ceiling Rain Shower', 'Wall-mounted Shower', 'Shower Panel', 'Body Jets', 'Hand Shower Mixer', 'Thermostatic Diverter'].map((st) => (
                    <label key={st} className="flex items-center space-x-1 text-[11px]">
                      <input type="radio" name="showerType" checked={formData.showerType === st} onChange={() => onFormChange('showerType', st)} className="accent-[#D4AF37]" />
                      <span>{st}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-neutral-400 block text-[10px]">Shower Brand:</label>
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {['Kohler', 'Grohe', 'Jaquar', 'Hansgrohe', 'Hindware'].map((sb) => (
                      <label key={sb} className="flex items-center space-x-1 text-[10px]">
                        <input type="radio" name="showerBrand" checked={formData.showerBrand === sb} onChange={() => onFormChange('showerBrand', sb)} className="accent-[#D4AF37]" />
                        <span>{sb}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-neutral-400 block text-[10px]">Mixer / Diverter:</label>
                  <div className="flex space-x-2 pt-0.5">
                    {['Concealed 3-Inlet', 'Exposed Bar', 'Thermostat'].map((mt) => (
                      <label key={mt} className="flex items-center space-x-1 text-[10px]">
                        <input type="radio" name="mixerType" checked={formData.mixerType === mt} onChange={() => onFormChange('mixerType', mt)} className="accent-[#D4AF37]" />
                        <span>{mt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-0.5">
                <span>Glass Partition:</span>
                <input type="text" placeholder="10mm Toughened Glass Sliding / Fixed" value={formData.glassPartition || ''} onChange={(e) => onFormChange('glassPartition', e.target.value)} className="w-48 bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
              </div>
            </div>
          </SectionBox>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* 13 & 14: WC & Fittings Accessories */}
          <SectionBox number={13} title="WC (TOILET) & CP FITTINGS ACCESSORIES">
            <div className="space-y-1.5">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-neutral-400 block text-[10px]">WC Type:</label>
                  <div className="space-y-0.5 pt-0.5">
                    {['Wall-hung Rimless', 'Floor-mounted', 'Smart Bidet WC'].map((wt) => (
                      <label key={wt} className="flex items-center space-x-1 text-[10px]">
                        <input type="radio" name="wcType" checked={formData.wcType === wt} onChange={() => onFormChange('wcType', wt)} className="accent-[#D4AF37]" />
                        <span>{wt}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-neutral-400 block text-[10px]">Flush Tank:</label>
                  <div className="space-y-0.5 pt-0.5">
                    {['Concealed Cistern (Geberit/Grohe)', 'Exposed Ceramic Tank'].map((ft) => (
                      <label key={ft} className="flex items-center space-x-1 text-[10px]">
                        <input type="radio" name="flushTank" checked={formData.flushTank === ft} onChange={() => onFormChange('flushTank', ft)} className="accent-[#D4AF37]" />
                        <span>{ft}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <label className="text-neutral-400 block text-[10px]">Accessories Included:</label>
                <div className="grid grid-cols-3 gap-1 pt-0.5">
                  {['Towel Rod (24")', 'Robe Hooks (x2)', 'Soap Dispenser', 'Toilet Paper Holder', 'Corner Glass Shelf', 'Health Faucet Gun'].map((fa) => (
                    <label key={fa} className="flex items-center space-x-1 text-[10px]">
                      <input type="checkbox" checked={Boolean(formData.washroomAccessories?.[fa])} onChange={(e) => onFormChange('washroomAccessories', { ...(formData.washroomAccessories || {}), [fa]: e.target.checked })} className="accent-[#D4AF37]" />
                      <span>{fa}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </SectionBox>

          {/* 15, 16, 17: Plumbing, Geyser & Ventilation */}
          <SectionBox number={15} title="PLUMBING, ELECTRICAL & VENTILATION">
            <div className="space-y-1.5">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-neutral-400 block text-[10px]">Plumbing Pipe Material:</label>
                  <input type="text" placeholder="Astral / Supreme CPVC SDR-11" value={formData.plumbingPipe || ''} onChange={(e) => onFormChange('plumbingPipe', e.target.value)} className="w-full bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
                </div>
                <div>
                  <label className="text-neutral-400 block text-[10px]">Geyser Provision:</label>
                  <input type="text" placeholder="15L / 25L Instant/Storage (AO Smith/Havells)" value={formData.geyserSpec || ''} onChange={(e) => onFormChange('geyserSpec', e.target.value)} className="w-full bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-neutral-400 block text-[10px]">Ventilation & Exhaust:</label>
                  <input type="text" placeholder="Louvered Window + 150mm High-RPM Exhaust" value={formData.washroomVentilation || ''} onChange={(e) => onFormChange('washroomVentilation', e.target.value)} className="w-full bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
                </div>
                <div>
                  <label className="text-neutral-400 block text-[10px]">False Ceiling in Bath:</label>
                  <input type="text" placeholder="Moisture Resistant Gypsum / Grid" value={formData.washroomCeiling || ''} onChange={(e) => onFormChange('washroomCeiling', e.target.value)} className="w-full bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
                </div>
              </div>
            </div>
          </SectionBox>
        </div>
      </div>
      <PageFooter />
    </div>
  );
};

// 9. PAGE 9: FALSE CEILING, ELECTRICAL & LIGHTING
export const Page9FalseCeiling: React.FC<ChecklistCardProps> = ({ formData, onFormChange }) => {
  return (
    <div className="checklist-page bg-[#0B0C0E] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col justify-between">
      <div>
        <PageHeader categoryTitle="FALSE CEILING, ELECTRICAL & LIGHTING CHECKLIST" pageNum={9} />

        <div className="mb-4">
          <FalseCeilingSketch
            dimensions={formData.dimensions_p9 || {}}
            onDimensionChange={(key, val) =>
              onFormChange('dimensions_p9', { ...(formData.dimensions_p9 || {}), [key]: val })
            }
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* False Ceiling Scope & Materials */}
          <SectionBox number={1} title="FALSE CEILING SCOPE & MATERIAL SPECIFICATIONS">
            <div className="space-y-2">
              <div>
                <label className="text-neutral-400 block text-[10px]">False Ceiling Scope Areas:</label>
                <div className="grid grid-cols-3 gap-1 pt-0.5">
                  {['Entire Home', 'Living & Dining', 'Master Bedroom', 'Bedrooms 2 & 3', 'Kitchen', 'Washrooms'].map((ar) => (
                    <label key={ar} className="flex items-center space-x-1 text-[11px]">
                      <input type="checkbox" checked={Boolean(formData.ceilingScope?.[ar])} onChange={(e) => onFormChange('ceilingScope', { ...(formData.ceilingScope || {}), [ar]: e.target.checked })} className="accent-[#D4AF37]" />
                      <span>{ar}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-neutral-400 block text-[10px]">Preferred Board Material:</label>
                <div className="flex space-x-3 pt-0.5">
                  {['Saint-Gobain Gyproc (12.5mm)', 'POP Punched Board', 'Moisture Resistant Green Board', 'Wooden Rafter Inlay'].map((bm) => (
                    <label key={bm} className="flex items-center space-x-1">
                      <input type="radio" name="ceilingBoard" checked={formData.ceilingBoard === bm} onChange={() => onFormChange('ceilingBoard', bm)} className="accent-[#D4AF37]" />
                      <span>{bm}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span>Perimeter Cove Lighting:</span>
                <div className="flex space-x-3">
                  {['Warm 3000K Strip', 'Dual CCT 3000K/4000K', 'RGBW Smart Strip', 'No Cove'].map((cl) => (
                    <label key={cl} className="flex items-center space-x-1 text-[10px]">
                      <input type="radio" name="coveType" checked={formData.coveType === cl} onChange={() => onFormChange('coveType', cl)} className="accent-[#D4AF37]" />
                      <span>{cl}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </SectionBox>

          {/* Lighting Fixture Types & Quantity */}
          <SectionBox number={2} title="LIGHTING FIXTURES & SPECIFICATIONS">
            <div className="space-y-2">
              <div>
                <label className="text-neutral-400 block text-[10px]">Recessed Downlights / Spotlights:</label>
                <div className="flex space-x-3 pt-0.5">
                  {['Deep Anti-Glare COB (7W)', 'Slim Panel LED (12W)', 'Trimless Recessed'].map((dl) => (
                    <label key={dl} className="flex items-center space-x-1">
                      <input type="radio" name="downlightType" checked={formData.downlightType === dl} onChange={() => onFormChange('downlightType', dl)} className="accent-[#D4AF37]" />
                      <span>{dl}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-neutral-400 block text-[10px]">Architectural Lighting Accents:</label>
                <div className="grid grid-cols-2 gap-1 pt-0.5">
                  {['Magnetic Track Linear Lights', 'Curved Profile Diffusers', 'Wall Washer Sconces', 'Step / Footlights'].map((al) => (
                    <label key={al} className="flex items-center space-x-1 text-[11px]">
                      <input type="checkbox" checked={Boolean(formData.archLighting?.[al])} onChange={(e) => onFormChange('archLighting', { ...(formData.archLighting || {}), [al]: e.target.checked })} className="accent-[#D4AF37]" />
                      <span>{al}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <label className="text-neutral-400 block text-[10px]">Lighting Brand Preference:</label>
                  <input type="text" placeholder="Philips / Lumilux / Havells / Wipro" value={formData.lightBrand || ''} onChange={(e) => onFormChange('lightBrand', e.target.value)} className="w-full bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
                </div>
                <div>
                  <label className="text-neutral-400 block text-[10px]">Chandeliers & Hanging Points:</label>
                  <input type="text" placeholder="Living & Dining Center Hook" value={formData.chandelierPoints || ''} onChange={(e) => onFormChange('chandelierPoints', e.target.value)} className="w-full bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
                </div>
              </div>
            </div>
          </SectionBox>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* Electrical Wiring & Switches */}
          <SectionBox number={3} title="ELECTRICAL WIRING & SWITCHBOARDS">
            <div className="space-y-1.5">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-neutral-400 block text-[10px]">Wiring Brand & Grade:</label>
                  <input type="text" placeholder="Polycab / Finolex FRLS / Havells" value={formData.wiringBrand || ''} onChange={(e) => onFormChange('wiringBrand', e.target.value)} className="w-full bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
                </div>
                <div>
                  <label className="text-neutral-400 block text-[10px]">Switch & Socket Series:</label>
                  <input type="text" placeholder="Legrand Arteor / Schneider AvatarOn / Crabtree" value={formData.switchSeries || ''} onChange={(e) => onFormChange('switchSeries', e.target.value)} className="w-full bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span>Switch Plate Finish:</span>
                <input type="text" placeholder="Matt Black Glass / Brushed Champagne Gold / White Glass" value={formData.switchFinish || ''} onChange={(e) => onFormChange('switchFinish', e.target.value)} className="w-48 bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
              </div>
            </div>
          </SectionBox>

          {/* Smart Home Automation */}
          <SectionBox number={4} title="SMART HOME AUTOMATION & APPLIANCE CONTROL">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span>Smart Automation Level:</span>
                <div className="flex space-x-2">
                  {['Full Home (Touch + Voice + App)', 'Living & Dining Only', 'Lighting Only', 'None'].map((sa) => (
                    <label key={sa} className="flex items-center space-x-1 text-[10px]"><input type="radio" name="smartHomeLevel" checked={formData.smartHomeLevel === sa} onChange={() => onFormChange('smartHomeLevel', sa)} className="accent-[#D4AF37]" /><span>{sa}</span></label>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <label className="flex items-center space-x-1.5"><input type="checkbox" checked={Boolean(formData.smartCurtains)} onChange={(e) => onFormChange('smartCurtains', e.target.checked)} className="accent-[#D4AF37]" /><span>Motorized Smart Curtain Tracks</span></label>
                <label className="flex items-center space-x-1.5"><input type="checkbox" checked={Boolean(formData.smartDoorLock)} onChange={(e) => onFormChange('smartDoorLock', e.target.checked)} className="accent-[#D4AF37]" /><span>Smart Video Doorbell & Digital Lock</span></label>
              </div>
            </div>
          </SectionBox>
        </div>
      </div>
      <PageFooter />
    </div>
  );
};

// 10. PAGE 10: DOORS, WINDOWS, RAILINGS & SPECIAL CUSTOM UNITS
export const Page10SpecialFeatures: React.FC<ChecklistCardProps> = ({ formData, onFormChange }) => {
  return (
    <div className="checklist-page bg-[#0B0C0E] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col justify-between">
      <div>
        <PageHeader categoryTitle="DOORS, WINDOWS, RAILINGS & SPECIAL UNITS" pageNum={10} />

        <div className="mb-4">
          <SpecialFeaturesSketch
            dimensions={formData.dimensions_p10 || {}}
            onDimensionChange={(key, val) =>
              onFormChange('dimensions_p10', { ...(formData.dimensions_p10 || {}), [key]: val })
            }
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Main Door & Internal Doors */}
          <SectionBox number={1} title="DOORS, FRAMES & SMART HARDWARE">
            <div className="space-y-2">
              <div>
                <label className="text-neutral-400 block text-[10px]">Main Entrance Door:</label>
                <div className="flex flex-wrap gap-2 pt-0.5">
                  {['Teak Wood Veneer with Brass Inlay', 'Safety Double Door with CNC Jali', 'High-Gloss PU Finish', 'Digital Smart Door'].map((md) => (
                    <label key={md} className="flex items-center space-x-1">
                      <input type="radio" name="mainDoorType" checked={formData.mainDoorType === md} onChange={() => onFormChange('mainDoorType', md)} className="accent-[#D4AF37]" />
                      <span>{md}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-neutral-400 block text-[10px]">Internal Bedroom / Bathroom Doors:</label>
                <div className="flex space-x-3 pt-0.5">
                  {['Flush Doors with Laminate Finish', 'Veneer Coated with Architrave', 'Moulded PU Doors'].map((id) => (
                    <label key={id} className="flex items-center space-x-1">
                      <input type="radio" name="internalDoorType" checked={formData.internalDoorType === id} onChange={() => onFormChange('internalDoorType', id)} className="accent-[#D4AF37]" />
                      <span>{id}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <label className="text-neutral-400 block text-[10px]">Digital Lock Brand:</label>
                  <input type="text" placeholder="Yale / Godrej / Samsung / Philips" value={formData.digitalLockBrand || ''} onChange={(e) => onFormChange('digitalLockBrand', e.target.value)} className="w-full bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
                </div>
                <div>
                  <label className="text-neutral-400 block text-[10px]">Door Handles & Mortise:</label>
                  <input type="text" placeholder="Stainless Steel 304 / Matt Black" value={formData.doorHandles || ''} onChange={(e) => onFormChange('doorHandles', e.target.value)} className="w-full bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
                </div>
              </div>
            </div>
          </SectionBox>

          {/* Windows & Balcony Railings */}
          <SectionBox number={2} title="WINDOWS, BALCONIES & RAILINGS">
            <div className="space-y-2">
              <div>
                <label className="text-neutral-400 block text-[10px]">Window System:</label>
                <div className="flex space-x-3 pt-0.5">
                  {['uPVC Sliding with Mesh (Fenesta/Kommerling)', 'Aluminium Slim Profile', 'Wooden Frame Windows'].map((ws) => (
                    <label key={ws} className="flex items-center space-x-1">
                      <input type="radio" name="windowSystem" checked={formData.windowSystem === ws} onChange={() => onFormChange('windowSystem', ws)} className="accent-[#D4AF37]" />
                      <span>{ws}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-neutral-400 block text-[10px]">Balcony / Staircase Railing:</label>
                <div className="flex space-x-3 pt-0.5">
                  {['Toughened Glass with SS Spigots', 'SS 304 Pipe Railing', 'MS Designer CNC Laser Cut'].map((br) => (
                    <label key={br} className="flex items-center space-x-1">
                      <input type="radio" name="balconyRailing" checked={formData.balconyRailing === br} onChange={() => onFormChange('balconyRailing', br)} className="accent-[#D4AF37]" />
                      <span>{br}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <label className="text-neutral-400 block text-[10px]">Balcony Flooring / Decking:</label>
                  <input type="text" placeholder="Wood Composite Deck Tiles / Anti-Skid Ceramic" value={formData.balconyFlooring || ''} onChange={(e) => onFormChange('balconyFlooring', e.target.value)} className="w-full bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
                </div>
                <div>
                  <label className="text-neutral-400 block text-[10px]">Balcony Vertical Garden:</label>
                  <input type="text" placeholder="Artificial Green Wall + Ambient Planters" value={formData.balconyGreenWall || ''} onChange={(e) => onFormChange('balconyGreenWall', e.target.value)} className="w-full bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
                </div>
              </div>
            </div>
          </SectionBox>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* Pooja Mandir & Spiritual Unit */}
          <SectionBox number={3} title="POOJA MANDIR & DEVOTIONAL UNIT">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span>Pooja Unit Required:</span>
                <div className="flex space-x-3">
                  <label className="flex items-center space-x-1"><input type="radio" name="poojaReq" checked={formData.poojaReq === 'Yes'} onChange={() => onFormChange('poojaReq', 'Yes')} className="accent-[#D4AF37]" /><span>Yes</span></label>
                  <label className="flex items-center space-x-1"><input type="radio" name="poojaReq" checked={formData.poojaReq === 'No'} onChange={() => onFormChange('poojaReq', 'No')} className="accent-[#D4AF37]" /><span>No</span></label>
                </div>
              </div>
              <div>
                <label className="text-neutral-400 block text-[10px]">Mandir Back Panel & Jali:</label>
                <input type="text" placeholder="Backlit Onyx / CNC Om & Gayatri Mantra / Corian" value={formData.poojaBackdrop || ''} onChange={(e) => onFormChange('poojaBackdrop', e.target.value)} className="w-full bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
              </div>
              <div className="flex items-center justify-between pt-0.5">
                <span>Mandir Platform Material:</span>
                <input type="text" placeholder="White Marble / Quartz Top with Brass Inlay" value={formData.poojaPlatform || ''} onChange={(e) => onFormChange('poojaPlatform', e.target.value)} className="w-48 bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
              </div>
            </div>
          </SectionBox>

          {/* Bar Counter & Entertainment Lounge */}
          <SectionBox number={4} title="BAR COUNTER & HOME THEATRE (OPTIONAL)">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span>Bar Counter / Wine Chiller Unit:</span>
                <div className="flex space-x-3">
                  <label className="flex items-center space-x-1"><input type="radio" name="barReq" checked={formData.barReq === 'Yes'} onChange={() => onFormChange('barReq', 'Yes')} className="accent-[#D4AF37]" /><span>Yes</span></label>
                  <label className="flex items-center space-x-1"><input type="radio" name="barReq" checked={formData.barReq === 'No'} onChange={() => onFormChange('barReq', 'No')} className="accent-[#D4AF37]" /><span>No</span></label>
                </div>
              </div>
              <div>
                <label className="text-neutral-400 block text-[10px]">Bar Unit Design:</label>
                <input type="text" placeholder="Floating Glass Shelves + Marble Countertop + Wine Fridge Niche" value={formData.barDesign || ''} onChange={(e) => onFormChange('barDesign', e.target.value)} className="w-full bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
              </div>
              <div className="flex items-center justify-between pt-0.5">
                <span>Dedicated Home Theatre Room:</span>
                <input type="text" placeholder="Acoustic Fabric Paneling + Recliner Setup" value={formData.homeTheatreNotes || ''} onChange={(e) => onFormChange('homeTheatreNotes', e.target.value)} className="w-48 bg-[#181B24] border border-neutral-700 rounded px-2 py-0.5 text-white text-xs" />
              </div>
            </div>
          </SectionBox>
        </div>
      </div>
      <PageFooter />
    </div>
  );
};
