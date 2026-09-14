import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Wrench,
  Compass,
  ArrowRight,
  Calculator,
  MessageSquare,
  Copy,
  Check,
  RotateCcw,
  ShieldCheck,
  Clock,
  Layers,
  HelpCircle,
  TrendingDown,
  Building,
  Factory,
  Gauge,
  IndianRupee,
  Warehouse,
  AlertOctagon,
  FileCheck,
  CheckSquare,
  Square,
  Info,
  Timer,
  Cpu,
} from 'lucide-react';
import { SpecAnalysisResult, IndianStandard, PracticalFeasibility } from '../types';
import { INDIAN_STANDARDS_DATABASE } from '../data/bisStandardsData';
import { OriginButton } from '@/components/ui/origin-button';

interface SpecAnalyzerProps {
  language: 'en' | 'hi';
  onConsultAI: (prompt: string) => void;
  onNavigateToCalculator?: () => void;
  onSelectStandard?: (standard: IndianStandard) => void;
}

interface QuickPickProduct {
  icon: string;
  nameEn: string;
  nameHi: string;
  code: string;
  sector: string;
  description: string;
}

const QUICK_PICK_PRODUCTS: QuickPickProduct[] = [
  {
    icon: '💧',
    nameEn: 'Packaged Drinking Water',
    nameHi: 'पैकेज्ड पेयजल',
    code: 'IS 14543',
    sector: 'Food & Agriculture',
    description: 'Packaged drinking water treated with RO, filtration, UV, and ozone disinfection, filled in 500ml/1L PET bottles.',
  },
  {
    icon: '🪖',
    nameEn: 'Two-Wheeler Helmet',
    nameHi: 'हेलमेट (दोपहिया)',
    code: 'IS 4151',
    sector: 'Automotive & EV',
    description: 'Protective crash helmet for motorcycle and scooter riders with chin strap, visor, and EPS impact absorption liner.',
  },
  {
    icon: '🔋',
    nameEn: 'Power Bank / Lithium Battery',
    nameHi: 'पावर बैंक / लीथियम बैटरी',
    code: 'IS 16046',
    sector: 'Electronics & IT Goods',
    description: 'Rechargeable 10,000 mAh Lithium-ion power bank with USB Type-C input/output and internal protection circuit.',
  },
  {
    icon: '🧸',
    nameEn: 'Children Toys',
    nameHi: 'बच्चों के खिलौने',
    code: 'IS 9873',
    sector: 'Consumer Products & Toys',
    description: 'Plastic and plush educational toys for children aged under 14 years, non-electric and battery operated.',
  },
  {
    icon: '👞',
    nameEn: 'Leather & Safety Shoes',
    nameHi: 'जूते और फुटवियर',
    code: 'IS 15844',
    sector: 'Textiles & Leather Products',
    description: 'Industrial safety footwear and everyday leather shoes with anti-slip rubber outsole and steel toe cap.',
  },
  {
    icon: '💡',
    nameEn: 'LED Bulbs & Lamps',
    nameHi: 'एलईडी बल्ब और लैंप',
    code: 'IS 16102',
    sector: 'Electronics & IT Goods',
    description: 'Self-ballasted 9W to 15W LED bulbs for general indoor home and commercial lighting services with B22 base.',
  },
  {
    icon: '🏗️',
    nameEn: 'TMT Steel Rebars',
    nameHi: 'टीएमटी सरिया (स्टील)',
    code: 'IS 1786',
    sector: 'Metallurgy & Steel',
    description: 'High-strength thermo-mechanically treated deformed steel bars (Grade Fe 500D) for RCC concrete building construction.',
  },
  {
    icon: '🧱',
    nameEn: 'Portland Cement (PPC/OPC)',
    nameHi: 'पोर्टलैंड सीमेंट',
    code: 'IS 1489',
    sector: 'Civil Engineering & Construction',
    description: 'Portland Pozzolana Cement (fly-ash based) and 43/53 grade Ordinary Portland Cement for construction works.',
  },
];

export const SpecAnalyzer: React.FC<SpecAnalyzerProps> = ({
  language,
  onConsultAI,
  onNavigateToCalculator,
  onSelectStandard,
}) => {
  const isHi = language === 'hi';

  const [description, setDescription] = useState('');
  const [sector, setSector] = useState('General Industry');
  const [enterpriseScale, setEnterpriseScale] = useState<'Micro' | 'Small' | 'Medium' | 'Large'>('Micro');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<SpecAnalysisResult | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [activeMainTab, setActiveMainTab] = useState<'production' | 'standards' | 'pitfalls'>('production');
  const [activeReqTab, setActiveReqTab] = useState<'machinery' | 'tests' | 'factory'>('machinery');

  // Interactive Factory Readiness Self-Check
  const [readinessChecks, setReadinessChecks] = useState({
    premises: false,
    capex: false,
    rawMaterial: false,
    testLogs: false,
  });

  const toggleReadinessCheck = (key: keyof typeof readinessChecks) => {
    setReadinessChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const checkedCount = Object.values(readinessChecks).filter(Boolean).length;
  const readinessPercentage = (checkedCount / 4) * 100;

  const handleQuickPick = (item: QuickPickProduct) => {
    setDescription(item.description);
    setSector(item.sector);
    executeAnalysis(item.description, item.sector, enterpriseScale);
  };

  const executeAnalysis = async (
    desc: string,
    sec: string,
    scale: 'Micro' | 'Small' | 'Medium' | 'Large'
  ) => {
    if (!desc.trim()) return;

    setIsAnalyzing(true);
    setResult(null);

    try {
      const res = await fetch('/api/analyze-spec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productDescription: desc,
          sector: sec,
          enterpriseScale: scale,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Specification analysis failed');
      }

      setResult(data);
    } catch {
      // Graceful fallback to client standard database match
      const lower = desc.toLowerCase();
      const matched = INDIAN_STANDARDS_DATABASE.find(
        (s) =>
          lower.includes(s.title.toLowerCase()) ||
          lower.includes(s.code.toLowerCase()) ||
          s.title.toLowerCase().split(' ').some((word) => word.length > 3 && lower.includes(word))
      );

      const isWater = lower.includes('water') || lower.includes('beverage');
      const isHelmet = lower.includes('helmet') || lower.includes('two wheeler');
      const isBattery = lower.includes('battery') || lower.includes('lithium') || lower.includes('power bank');
      const isHeavy = lower.includes('steel') || lower.includes('rebar') || lower.includes('cement');

      const fallbackFeasibility: PracticalFeasibility = isHeavy
        ? {
            isProducibleInRealLife: false,
            feasibilityScore: 42,
            verdictLabel: 'Capital Intensive / High Capex',
            verdictSummary:
              'High barrier for small entrepreneurs. Requires heavy industrial rolling mills, continuous casting, and high-voltage power substations. Typically viable only for large industrial setups (₹5 Cr+ Capex).',
            estimatedInitialCapex: '₹3 Crores - ₹25+ Crores',
            minimumSpaceRequired: '2 - 10 Acres heavy industrial land',
            estimatedSetupTimeline: '6 - 18 Months',
            rawMaterialAvailability: 'Easily Available Domestically',
            rawMaterialsSummary: 'Prime steel billets or sponge iron with certified chemistry.',
            productionStages: [
              { stageNumber: 1, title: 'Billet Reheating', description: 'Reheating billets to 1150°C in furnace', criticalQualityPoint: 'Uniform heat soaking' },
              { stageNumber: 2, title: 'Rolling & Thermex Quenching', description: 'High-speed reduction stands with water cooling nozzles', criticalQualityPoint: 'Martensite rim thickness control' },
              { stageNumber: 3, title: 'In-House Testing & Marking', description: 'Universal tensile testing and spectrometer chemistry verification', criticalQualityPoint: 'Maintaining C, S, P limits' },
            ],
            essentialFactoryMachinery: [
              { machineName: 'Continuous Rolling Mill Line', purpose: 'Reduces and shapes bars', approxCost: '₹2 - ₹15 Crores' },
              { machineName: 'Universal Tensile Testing Machine (UTM)', purpose: 'Tests yield and tensile strength', approxCost: '₹8 - ₹18 Lakhs' },
            ],
            commonAuditPitfalls: ['Exceeding phosphorus/sulphur chemical limits', 'Uncalibrated spectrometer'],
          }
        : isWater
        ? {
            isProducibleInRealLife: true,
            feasibilityScore: 92,
            verdictLabel: 'Highly Feasible for MSME',
            verdictSummary:
              'Extremely viable for Indian MSMEs. Raw borewell water and food-grade PET preforms are widely available in every district. The primary requirement is an enclosed, positive-pressure cleanroom and an on-site microbiological laboratory.',
            estimatedInitialCapex: '₹8 Lakhs - ₹18 Lakhs',
            minimumSpaceRequired: '1,500 - 2,500 sq.ft covered hygienic floor',
            estimatedSetupTimeline: '45 - 75 Days from equipment setup to BIS license',
            rawMaterialAvailability: 'Easily Available Domestically',
            rawMaterialsSummary: 'Borewell water, Food-grade virgin PET preforms (IS 12252), caps, labels, cartons.',
            productionStages: [
              { stageNumber: 1, title: 'Multi-Stage Purification', description: 'Sand filter, carbon filter, RO membranes, and ozone contact tank', criticalQualityPoint: 'Residual ozone maintained at 0.2 - 0.5 mg/L' },
              { stageNumber: 2, title: 'Bottle Blowing & UV Rinse', description: 'PET preforms blown into bottles with zero human touch', criticalQualityPoint: 'Dust-free enclosed air conveyor' },
              { stageNumber: 3, title: 'Cleanroom Filling & Capping', description: 'Automated Rinser-Filler-Capper monoblock in positive-pressure room', criticalQualityPoint: 'Class 10,000 cleanroom air quality' },
              { stageNumber: 4, title: 'ISI Marking & 48-Hr Incubation', description: 'Laser batch coding and 48-hour quarantine for microbial testing', criticalQualityPoint: 'Zero coliform colonies in test cultures' },
            ],
            essentialFactoryMachinery: [
              { machineName: 'Commercial RO & Ozonator Plant (3000 LPH)', purpose: 'Deep water purification', approxCost: '₹3.5 - ₹6 Lakhs' },
              { machineName: 'Automated Triblock RFC Bottling Machine', purpose: 'Automated hygienic filling and capping', approxCost: '₹4.5 - ₹8 Lakhs' },
              { machineName: 'Semi-Automatic PET Blow Molder', purpose: 'Blows preforms into bottles', approxCost: '₹2.0 - ₹3.5 Lakhs' },
              { machineName: 'In-House Testing Lab (Autoclave, Incubator)', purpose: 'Mandatory daily microbiological testing', approxCost: '₹1.5 - ₹2.5 Lakhs' },
            ],
            commonAuditPitfalls: [
              'Unsealed filling room allowing outside dust and microbes to enter',
              'Absence of a certified Chemist/Microbiologist on factory staff',
              'Using non-food-grade PET preforms without supplier certificate',
            ],
          }
        : {
            isProducibleInRealLife: true,
            feasibilityScore: 85,
            verdictLabel: 'Highly Feasible for MSME',
            verdictSummary:
              'Commercially producible in India. Standard domestic components and semi-automatic assembly allow MSMEs to establish compliant production in standard industrial estates.',
            estimatedInitialCapex: '₹5 Lakhs - ₹15 Lakhs',
            minimumSpaceRequired: '1,200 - 2,500 sq.ft industrial premises',
            estimatedSetupTimeline: '45 - 90 Days',
            rawMaterialAvailability: 'Easily Available Domestically',
            rawMaterialsSummary: 'Domestic component supply chains; always obtain supplier Mill Test Certificates (MTC).',
            productionStages: [
              { stageNumber: 1, title: 'Raw Material QC', description: 'Inward verification of raw materials and supplier test certificates', criticalQualityPoint: 'Material grade conformity' },
              { stageNumber: 2, title: 'Fabrication / Assembly', description: 'Core fabrication, wiring, or molding on workstation line', criticalQualityPoint: 'Dimensional tolerances' },
              { stageNumber: 3, title: 'In-House Routine Testing', description: 'Testing critical safety parameters as per BIS SIT manual', criticalQualityPoint: 'Logging all values in inspection register' },
              { stageNumber: 4, title: 'ISI/CRS Marking & Packaging', description: 'Permanent labeling with standard mark and license number', criticalQualityPoint: 'Strict compliance with BIS mark layout' },
            ],
            essentialFactoryMachinery: [
              { machineName: 'Primary Manufacturing / Assembly Workstations', purpose: 'Product fabrication and assembly', approxCost: '₹3 - ₹7 Lakhs' },
              { machineName: 'Calibrated In-House Test Benches', purpose: 'Measures safety, performance, and endurance', approxCost: '₹1.5 - ₹3 Lakhs' },
            ],
            commonAuditPitfalls: [
              'Missing NABL calibration certificates on gauges and meters',
              'Lack of an appointed, qualified quality technician',
              'Failing to maintain daily inspection test registers',
            ],
          };

      if (matched) {
        setResult({
          productName: matched.title,
          suggestedStandards: [
            {
              code: matched.code,
              title: matched.title,
              confidence: 'High',
              scheme: matched.scheme,
              isMandatoryQCO: matched.isMandatoryQCO,
              reason: 'Direct match found in Bureau of Indian Standards database.',
            },
          ],
          qcoStatus: {
            isMandatory: matched.isMandatoryQCO,
            ministryNotice: matched.qcoDetails?.orderTitle || 'Government Quality Control Order',
            deadline: matched.qcoDetails?.effectiveDate || 'Strictly Enforced under Section 16 BIS Act',
            exemptions: scale === 'Micro' ? 'Eligible for 50% minimum marking fee rebate' : 'Standard compliance required',
          },
          keyTestsRequired: matched.keyTestParameters.slice(0, 4),
          factoryInspectionChecklist: matched.requiredFactoryEquipment.slice(0, 4),
          manakOnlineProcedure: [
            'Step 1: Register on Manakonline (manakonline.in)',
            'Step 2: Submit Form-V with test equipment list & factory layout',
            'Step 3: Factory inspection & sample drawing by BIS auditor',
            'Step 4: Grant of BIS License with unique CM/L number',
          ],
          msmeGuidance: `${scale} enterprise qualifies for 50% concession on minimum marking fees with valid Udyam Registration.`,
          practicalFeasibility: fallbackFeasibility,
        });
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopySummary = () => {
    if (!result) return;
    const std = result.suggestedStandards[0];
    const pf = result.practicalFeasibility;

    const text = `📋 BIS Compliance & Production Feasibility Report for ${result.productName}
--------------------------------------------------
• Applicable Standard: ${std?.code || 'N/A'} - ${std?.title || ''}
• Legal Status: ${result.qcoStatus.isMandatory ? 'MANDATORY by Law (Under Section 16 BIS Act)' : 'Voluntary Scheme'}
• Scheme: ${std?.scheme || 'Scheme I (ISI Mark)'}

🏭 REAL-LIFE PRODUCTION FEASIBILITY:
• Producible in Real Life: ${pf?.isProducibleInRealLife ? 'YES (Commercially Viable)' : 'HIGH CAPITAL BARRIER'}
• Feasibility Score: ${pf?.feasibilityScore || 85} / 100 (${pf?.verdictLabel || 'Feasible'})
• Estimated Initial Capex: ${pf?.estimatedInitialCapex || '₹5L - ₹15L'}
• Factory Space Required: ${pf?.minimumSpaceRequired || '1,500 sq.ft'}
• Setup Timeline: ${pf?.estimatedSetupTimeline || '60-90 Days'}
• Raw Material Sourcing: ${pf?.rawMaterialAvailability || 'Available Domestically'}

💡 REALITY CHECK:
${pf?.verdictSummary || ''}

⚠️ TOP AUDIT PITFALLS TO AVOID:
${(pf?.commonAuditPitfalls || []).map((p) => '• ' + p).join('\n')}

💰 MSME BENEFIT: ${result.msmeGuidance}
🔗 Official Application Portal: https://manakonline.in
--------------------------------------------------
Generated via ManakSetu BIS Compliance Advisor`;

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  return (
    <div className="w-full space-y-6">
      {/* Friendly, Practical Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-800">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 border border-blue-400/30 px-3 py-1 rounded-full text-xs font-semibold">
            <Factory className="w-3.5 h-3.5 text-amber-300" />
            <span>{isHi ? 'व्यावहारिक उत्पादन एवं मानक विश्लेषक' : 'Real-Life Production & BIS Standards Advisor'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {isHi ? 'क्या यह उत्पाद वास्तव में बनाया जा सकता है? जानिए नियम व लागत' : 'Can You Realistically Make This Product in India? Find Out'}
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            {isHi
              ? 'सिर्फ कागजी मानक नहीं, बल्कि जमीनी हकीकत जानें: क्या यह उत्पाद एक छोटा उद्यमी बना सकता है? कितनी मशीनरी व पूंजी लगेगी, कच्चा माल कहाँ मिलेगा, और फैक्ट्री ऑडिट में लोग कहाँ फेल होते हैं।'
              : 'Beyond standard numbers, get real manufacturing reality: Is it producible in real life? What machinery and capital are needed, where to source raw materials, and why first-time producers fail audits.'}
          </p>

          {/* Key Benefit Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-300">
            <span className="inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-lg">
              <Gauge className="w-3.5 h-3.5 text-emerald-400" />
              {isHi ? 'वास्तविक उत्पादन व्यवहार्यता स्कोर' : 'Real-Life Producibility Score'}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-lg">
              <IndianRupee className="w-3.5 h-3.5 text-amber-300" />
              {isHi ? 'अनुमानित मशीनरी व Capex बजट' : 'Estimated Machinery Capex'}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-lg">
              <AlertOctagon className="w-3.5 h-3.5 text-rose-300" />
              {isHi ? 'ऑडिट में फेल होने के कारण' : 'Common Audit Pitfalls'}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-lg">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              {isHi ? 'अनिवार्य QCO कानून' : 'Mandatory QCO Check'}
            </span>
          </div>
        </div>
      </div>

      {/* Input & Quick Pick Card */}
      <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-xs space-y-6">
        {/* Step 1: Quick Pick Common Products */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">1</span>
              <span>{isHi ? 'लोकप्रिय उत्पाद चुनें (त्वरित जांच):' : 'Click a Popular Product to Test Practical Feasibility:'}</span>
            </h3>
            <span className="text-xs text-slate-400 hidden sm:inline">
              {isHi ? 'एक क्लिक में तुरंत उत्पादन रिपोर्ट देखें' : 'Click any product for instant practical report'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {QUICK_PICK_PRODUCTS.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleQuickPick(item)}
                className="group p-3 rounded-xl border border-slate-200 hover:border-blue-400 bg-slate-50/70 hover:bg-blue-50/50 transition text-left flex items-center gap-3 cursor-pointer shadow-2xs"
              >
                <span className="text-2xl shrink-0 group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-xs text-slate-900 group-hover:text-blue-700 truncate">
                    {isHi ? item.nameHi : item.nameEn}
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono">{item.code}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Custom Product / Spec Input */}
        <div className="space-y-3 border-t border-slate-100 pt-5">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">2</span>
              <span>{isHi ? 'या अपने उत्पाद का नाम / विवरण लिखें:' : 'Or Enter Your Custom Product / Idea / Technical Specs:'}</span>
            </h3>
            {description && (
              <button
                type="button"
                onClick={() => setDescription('')}
                className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{isHi ? 'साफ़ करें' : 'Clear'}</span>
              </button>
            )}
          </div>

          <div className="relative">
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={
                isHi
                  ? 'उदा: दोपहिया हेलमेट, पैकेज्ड मिनरल वाटर, इलेक्ट्रिक वायर, मोबाइल चार्जर, या उत्पाद का तकनीकी विवरण लिखें...'
                  : 'e.g. Motorcycle helmet, packaged mineral water, electric wire, mobile charger, or paste technical specifications...'
              }
              className="w-full bg-slate-50 focus:bg-white border border-slate-300 focus:border-blue-600 rounded-xl p-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600/10 leading-relaxed"
            />
          </div>
        </div>

        {/* Step 3: Enterprise Scale & Sector Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 pt-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-blue-600" />
              <span>{isHi ? 'उद्यम का पैमाना (छूट व Capex स्तर)' : 'Enterprise Scale (Investment & Fee Concession)'}</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['Micro', 'Small', 'Medium', 'Large'] as const).map((scale) => (
                <button
                  key={scale}
                  type="button"
                  onClick={() => setEnterpriseScale(scale)}
                  className={`py-2 text-xs font-semibold rounded-xl border transition ${
                    enterpriseScale === scale
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {scale}
                </button>
              ))}
            </div>
            {/* Friendly MSME Tip */}
            <div className="mt-2 text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center gap-2 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>
                {enterpriseScale === 'Micro'
                  ? isHi
                    ? '💡 सूक्ष्म उद्यमों (Micro) को उद्यम प्रमाण पत्र के साथ बीआईएस फीस पर 50% छूट मिलती है।'
                    : '💡 Micro enterprises receive a 50% discount on BIS marking fees with an Udyam certificate!'
                  : enterpriseScale === 'Small'
                  ? isHi
                    ? '💡 लघु उद्यमों (Small) को बीआईएस फीस पर 20% छूट मिलती है।'
                    : '💡 Small enterprises receive a 20% discount on BIS marking fees.'
                  : isHi
                  ? 'मानक बीआईएस शुल्क संरचना लागू होगी।'
                  : 'Standard corporate fee structure applies.'}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>{isHi ? 'उद्योग क्षेत्र (वैकल्पिक)' : 'Industry Sector (Optional)'}</span>
            </label>
            <select
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-800 outline-none transition"
            >
              <option value="General Industry">{isHi ? 'सामान्य उद्योग / उपभोक्ता उत्पाद' : 'General Industry / Consumer Goods'}</option>
              <option value="Food & Agriculture">{isHi ? 'खाद्य, पेय एवं पेयजल' : 'Food, Beverages & Drinking Water'}</option>
              <option value="Civil Engineering & Construction">{isHi ? 'निर्माण सामग्री (सीमेंट, स्टील)' : 'Civil & Building Materials (Cement, Steel)'}</option>
              <option value="Electronics & IT Goods">{isHi ? 'इलेक्ट्रॉनिक्स, आईटी व बैटरी (CRS)' : 'Electronics, IT & Batteries (CRS)'}</option>
              <option value="Automotive & EV">{isHi ? 'ऑटोमोटिव, हेलमेट एवं ईवी' : 'Automotive, Helmets & EV Charging'}</option>
              <option value="Renewable Energy & Solar">{isHi ? 'सोलर पैनल व इन्वर्टर' : 'Solar Panels & Inverters'}</option>
              <option value="Textiles & Leather Products">{isHi ? 'जूते, वस्त्र व सुरक्षा उपकरण' : 'Footwear, Textiles & Safety Gear'}</option>
              <option value="Hallmarking & Jewellery">{isHi ? 'सोना व आभूषण हॉलमार्किंग' : 'Gold & Jewellery Hallmarking'}</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400 text-center sm:text-left">
            {isHi
              ? 'वास्तविक फैक्ट्री उत्पादन चरणों, मशीनरी, और कानूनी मानकों का विस्तृत विश्लेषण प्राप्त करें'
              : 'Evaluates real factory feasibility, estimated Capex, supply chain, and BIS QCO legality'}
          </p>

          <OriginButton
            type="button"
            onClick={() => executeAnalysis(description, sector, enterpriseScale)}
            disabled={!description.trim() || isAnalyzing}
            loading={isAnalyzing}
            className="w-full sm:w-auto h-12 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm shadow-blue-600/20 transition cursor-pointer border-0"
          >
            {isAnalyzing ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
                <span>{isHi ? 'उत्पादन व मानकों की जांच हो रही है...' : 'Evaluating Production & Standards...'}</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>{isHi ? 'व्यावहारिक विश्लेषण करें' : 'Evaluate Feasibility & Standards'}</span>
              </>
            )}
          </OriginButton>
        </div>
      </div>

      {/* Loading Skeleton */}
      {isAnalyzing && (
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs text-center space-y-4 animate-pulse">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <Factory className="w-6 h-6 animate-spin text-blue-600" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-slate-900 text-base">
              {isHi ? 'वास्तविक उत्पादन संभावना और बीआईएस मानकों का विश्लेषण हो रहा है...' : 'Evaluating Real-World Manufacturability & BIS Compliance...'}
            </h4>
            <p className="text-xs text-slate-500">
              {isHi
                ? 'कच्चे माल की आपूर्ति, फैक्ट्री मशीनरी, Capex बजट और कानूनी बाध्यता की जांच की जा रही है...'
                : 'Assessing machine requirements, minimum Capex, Indian supply chains, and audit failure points...'}
            </p>
          </div>
        </div>
      )}

      {/* RESULT SECTION */}
      {result && (
        <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Top Result Banner with Actions */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                {isHi ? 'व्यावहारिक विश्लेषण रिपोर्ट' : 'Practical Assessment for'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{result.productName}</h3>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={handleCopySummary}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                title="Copy summary"
              >
                {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSummary ? (isHi ? 'कॉपी हो गया!' : 'Copied!') : (isHi ? 'पूरी रिपोर्ट कॉपी करें' : 'Copy Full Report')}</span>
              </button>

              {onNavigateToCalculator && (
                <button
                  type="button"
                  onClick={onNavigateToCalculator}
                  className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Calculator className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isHi ? 'लाइसेंस लागत निकालें' : 'Calculate Cost'}</span>
                </button>
              )}

              <button
                type="button"
                onClick={() =>
                  onConsultAI(
                    `Give me a detailed factory setup blueprint and step-by-step manufacturing guide to produce ${result.productName} conforming to ${result.suggestedStandards[0]?.code || 'BIS standards'}`
                  )
                }
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{isHi ? 'फैक्ट्री गाइड पूछें' : 'Ask Factory Blueprint'}</span>
              </button>
            </div>
          </div>

          {/* MAIN SECTION 1: Real-Life Manufacturability & Producibility Card (THE CORE ANSWER) */}
          {result.practicalFeasibility && (
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-6">
              {/* Producibility Verdict Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        result.practicalFeasibility.isProducibleInRealLife
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {result.practicalFeasibility.isProducibleInRealLife ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>{isHi ? '✅ वास्तविक जीवन में उत्पादन संभव (Producible)' : '✅ 100% Producible in Real Life'}</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-4 h-4 text-amber-600" />
                          <span>{isHi ? '⚠️ भारी उद्योग / उच्च पूंजी की आवश्यकता' : '⚠️ Heavy Industry / High Capex Barrier'}</span>
                        </>
                      )}
                    </span>

                    <span className="text-xs font-semibold text-slate-500">
                      {result.practicalFeasibility.verdictLabel}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    {isHi ? 'जमीनी हकीकत: क्या यह उत्पाद बनाना व्यावहारिक है?' : 'Reality Check: Can You Actually Produce This?'}
                  </h3>

                  <p className="text-sm text-slate-700 leading-relaxed max-w-4xl">
                    {result.practicalFeasibility.verdictSummary}
                  </p>
                </div>

                {/* Feasibility Gauge */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center min-w-[180px] shrink-0">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    {isHi ? 'व्यवहार्यता स्कोर' : 'Feasibility Score'}
                  </span>
                  <div className="flex items-baseline justify-center gap-1 my-1">
                    <span
                      className={`text-3xl font-extrabold ${
                        result.practicalFeasibility.feasibilityScore >= 80
                          ? 'text-emerald-600'
                          : result.practicalFeasibility.feasibilityScore >= 60
                          ? 'text-amber-600'
                          : 'text-rose-600'
                      }`}
                    >
                      {result.practicalFeasibility.feasibilityScore}
                    </span>
                    <span className="text-sm text-slate-400 font-bold">/100</span>
                  </div>

                  {/* Visual Bar */}
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-2">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        result.practicalFeasibility.feasibilityScore >= 80
                          ? 'bg-emerald-500'
                          : result.practicalFeasibility.feasibilityScore >= 60
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${result.practicalFeasibility.feasibilityScore}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block font-medium">
                    {result.practicalFeasibility.feasibilityScore >= 80
                      ? isHi ? 'छोटे व्यवसाय के लिए उत्तम' : 'High MSME Viability'
                      : isHi ? 'मध्यम निवेश अपेक्षित' : 'Moderate Setup Required'}
                  </span>
                </div>
              </div>

              {/* 4 Essential Production Parameters Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-4 space-y-1.5">
                  <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1.5">
                    <IndianRupee className="w-3.5 h-3.5 text-blue-600" />
                    <span>{isHi ? 'अनुमानित न्यूनतम Capex' : 'Estimated Capex'}</span>
                  </span>
                  <p className="text-sm font-bold text-slate-900">{result.practicalFeasibility.estimatedInitialCapex}</p>
                  <p className="text-[11px] text-slate-500">
                    {isHi ? 'मशीनरी + इन-हाउस टेस्टिंग लैब' : 'Machinery + In-House Lab'}
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-4 space-y-1.5">
                  <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1.5">
                    <Warehouse className="w-3.5 h-3.5 text-blue-600" />
                    <span>{isHi ? 'फैक्ट्री फ्लोर स्पेस' : 'Factory Space'}</span>
                  </span>
                  <p className="text-sm font-bold text-slate-900">{result.practicalFeasibility.minimumSpaceRequired}</p>
                  <p className="text-[11px] text-slate-500">
                    {isHi ? 'स्वच्छ शेड व 3-फेज बिजली' : 'Covered shed with 3-phase power'}
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-4 space-y-1.5">
                  <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1.5">
                    <Timer className="w-3.5 h-3.5 text-blue-600" />
                    <span>{isHi ? 'तैयारी से प्रथम बैच' : 'Setup Timeline'}</span>
                  </span>
                  <p className="text-sm font-bold text-slate-900">{result.practicalFeasibility.estimatedSetupTimeline}</p>
                  <p className="text-[11px] text-slate-500">
                    {isHi ? 'मशीन स्थापना व लाइसेंस तक' : 'From setup to commercial license'}
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-4 space-y-1.5">
                  <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-blue-600" />
                    <span>{isHi ? 'कच्चा माल उपलब्धता' : 'Raw Materials'}</span>
                  </span>
                  <p className="text-sm font-bold text-slate-900">{result.practicalFeasibility.rawMaterialAvailability}</p>
                  <p className="text-[11px] text-slate-500">
                    {isHi ? 'सप्लायर टेस्ट सर्टिफिकेट (MTC) अनिवार्य' : 'Mill Test Certificate mandatory'}
                  </p>
                </div>
              </div>

              {/* Raw Material Sourcing Note */}
              <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-3.5 text-xs text-blue-900 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <strong className="font-semibold">{isHi ? 'कच्चा माल आपूर्ति स्रोत:' : 'Raw Material Sourcing:'} </strong>
                  <span>{result.practicalFeasibility.rawMaterialsSummary}</span>
                </div>
              </div>

              {/* Interactive Factory Readiness Self-Checker */}
              <div className="bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <CheckSquare className="w-4 h-4 text-blue-600" />
                      <span>{isHi ? 'त्वरित स्व-मूल्यांकन: क्या आप उत्पादन के लिए तैयार हैं?' : 'Instant Factory Readiness Self-Check:'}</span>
                    </h4>
                    <p className="text-xs text-slate-500">
                      {isHi ? 'अपनी वर्तमान स्थिति टिक करें और अपनी तैयारी की जांच करें' : 'Check off your current state to see your launch readiness'}
                    </p>
                  </div>

                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-800 shrink-0 self-start sm:self-auto">
                    {checkedCount} / 4 {isHi ? 'तैयारियां पूरी' : 'Ready'} ({readinessPercentage}%)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={() => toggleReadinessCheck('premises')}
                    className={`p-3 rounded-xl border text-left flex items-start gap-3 transition cursor-pointer ${
                      readinessChecks.premises
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    {readinessChecks.premises ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                    )}
                    <span className="text-xs leading-snug">
                      {isHi
                        ? 'मेरे पास औद्योगिक/व्यावसायिक शेड या जगह उपलब्ध या किराए पर लेने योग्य है'
                        : 'I have access to commercial/industrial premises or rentable shed'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleReadinessCheck('capex')}
                    className={`p-3 rounded-xl border text-left flex items-start gap-3 transition cursor-pointer ${
                      readinessChecks.capex
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    {readinessChecks.capex ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                    )}
                    <span className="text-xs leading-snug">
                      {isHi
                        ? `मैं मशीनरी हेतु अनुमानित ${result.practicalFeasibility.estimatedInitialCapex} की पूंजी निवेश कर सकता हूँ`
                        : `I can budget the estimated ${result.practicalFeasibility.estimatedInitialCapex} for machinery & setup`}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleReadinessCheck('rawMaterial')}
                    className={`p-3 rounded-xl border text-left flex items-start gap-3 transition cursor-pointer ${
                      readinessChecks.rawMaterial
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    {readinessChecks.rawMaterial ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                    )}
                    <span className="text-xs leading-snug">
                      {isHi
                        ? 'मैं अधिकृत सप्लायर से टेस्ट सर्टिफिकेट (MTC) के साथ कच्चा माल खरीद सकता हूँ'
                        : 'I can source certified raw materials with supplier Mill Test Certificates'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleReadinessCheck('testLogs')}
                    className={`p-3 rounded-xl border text-left flex items-start gap-3 transition cursor-pointer ${
                      readinessChecks.testLogs
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    {readinessChecks.testLogs ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                    )}
                    <span className="text-xs leading-snug">
                      {isHi
                        ? 'मैं इन-हाउस लैब ऑपरेटर रख सकता हूँ और दैनिक टेस्ट रजिस्टर मेंटेन कर सकता हूँ'
                        : 'I can maintain daily in-house SIT testing registers and calibrated tools'}
                    </span>
                  </button>
                </div>

                {checkedCount === 4 ? (
                  <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>
                      {isHi
                        ? '🎉 बधाई! आप तुरंत मैनकोनलाइन (manakonline.in) पर आवेदन करने के लिए तैयार हैं।'
                        : '🎉 Excellent! You have the core foundation to apply on manakonline.in immediately.'}
                    </span>
                  </div>
                ) : (
                  <div className="p-2.5 bg-slate-100 text-slate-600 rounded-xl text-xs flex items-center gap-2">
                    <Info className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>
                      {isHi
                        ? 'सुझाव: आवेदन से पहले सभी 4 बिंदुओं को पूरा करें ताकि बीआईएस अधिकारी पहली बार में लाइसेंस स्वीकृत कर दें।'
                        : 'Tip: Completing all 4 points ensures your BIS factory audit passes on the first attempt without rejection.'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* MAIN SECTION 2: Step-by-Step Practical Manufacturing Pipeline */}
          {result.practicalFeasibility?.productionStages && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Factory className="w-4 h-4 text-blue-600" />
                    <span>{isHi ? 'फैक्ट्री में कैसे बनता है? 4 उत्पादन चरण' : 'How It Is Produced on the Factory Floor: 4 Stages'}</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {isHi
                      ? 'कच्चा माल आने से लेकर आईएसआई मार्किंग और डिस्पैच तक की वास्तविक प्रक्रिया'
                      : 'From raw material inward to in-line assembly and indelible standard marking'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
                {result.practicalFeasibility.productionStages.map((stage) => (
                  <div
                    key={stage.stageNumber}
                    className="bg-slate-50/90 border border-slate-200 rounded-xl p-4 flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                          {stage.stageNumber}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">
                          Stage {stage.stageNumber}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{stage.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{stage.description}</p>
                    </div>

                    {/* Critical Quality Checkpoint */}
                    <div className="bg-amber-50 border border-amber-200/80 rounded-lg p-2.5 text-[11px] text-amber-950 space-y-1">
                      <span className="font-bold text-amber-900 flex items-center gap-1">
                        <AlertOctagon className="w-3 h-3 text-amber-700" />
                        <span>{isHi ? 'अहम गुणवत्ता बिंदु:' : 'Critical QC Point:'}</span>
                      </span>
                      <p className="leading-snug text-amber-900/90">{stage.criticalQualityPoint}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MAIN SECTION 3: Machinery & In-House Lab Equipment */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-blue-600" />
                  <span>{isHi ? 'आवश्यक मशीनरी एवं इन-हाउस टेस्टिंग लैब' : 'Required Factory Machinery & In-House Testing Lab'}</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isHi
                    ? 'उत्पादन मशीनों और बीआईएस परीक्षण उपकरणों की सूची'
                    : 'Breakdown of production floor machines vs required NABL/BIS test benches'}
                </p>
              </div>

              {/* Tab Selector */}
              <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveReqTab('machinery')}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    activeReqTab === 'machinery'
                      ? 'bg-white text-blue-700 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isHi ? 'उत्पादन मशीनें' : 'Production Machines'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveReqTab('tests')}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    activeReqTab === 'tests'
                      ? 'bg-white text-blue-700 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isHi ? 'अनिवार्य टेस्ट' : 'Mandatory Tests'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveReqTab('factory')}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    activeReqTab === 'factory'
                      ? 'bg-white text-blue-700 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isHi ? 'इन-हाउस लैब टूल्स' : 'In-House Lab Tools'}
                </button>
              </div>
            </div>

            {/* Tab 1: Machinery */}
            {activeReqTab === 'machinery' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
                {(result.practicalFeasibility?.essentialFactoryMachinery || []).map((m, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs sm:text-sm">{m.machineName}</span>
                      {m.approxCost && (
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                          {m.approxCost}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{m.purpose}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 2: Tests */}
            {activeReqTab === 'tests' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {result.keyTestsRequired.map((test, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-medium">{test}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: Lab Checklist */}
            {activeReqTab === 'factory' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {result.factoryInspectionChecklist.map((item, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-800"
                  >
                    <Wrench className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-medium">{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* MAIN SECTION 4: Why First-Time Manufacturers Fail BIS Audits (THE PITFALL WATCH) */}
          {result.practicalFeasibility?.commonAuditPitfalls && (
            <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="text-base font-bold text-rose-950 flex items-center gap-2">
                    <AlertOctagon className="w-4 h-4 text-rose-600" />
                    <span>{isHi ? 'ऑडिट में फेल होने के 4 मुख्य कारण (इनसे बचें!)' : 'Top 4 Reasons First-Time Manufacturers Fail BIS Audits'}</span>
                  </h3>
                  <p className="text-xs text-rose-700">
                    {isHi
                      ? 'अधिकांश छोटे कारखानों के आवेदन इन गलतियों की वजह से खारिज या लंबित होते हैं'
                      : 'Common procedural and floor mistakes that trigger audit delays or sample rejections'}
                  </p>
                </div>
                <span className="text-xs font-bold text-rose-700 bg-white border border-rose-200 px-3 py-1 rounded-full hidden sm:inline">
                  {isHi ? 'सतर्कता गाइड' : 'Avoid Rejection'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {result.practicalFeasibility.commonAuditPitfalls.map((pitfall, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white border border-rose-200/80 flex items-start gap-3 text-xs text-rose-950 shadow-2xs"
                  >
                    <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      ✕
                    </span>
                    <span className="leading-relaxed font-medium">{pitfall}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MAIN SECTION 5: Applicable Standard & Legal Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Card 1: Applicable Indian Standard */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    {isHi ? 'लागू भारतीय मानक' : 'Applicable Indian Standard'}
                  </span>
                  <span className="bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {result.suggestedStandards[0]?.confidence || 'High'} Match
                  </span>
                </div>

                {result.suggestedStandards.map((std, idx) => {
                  const dbMatch = INDIAN_STANDARDS_DATABASE.find(
                    (item) =>
                      item.code.includes(std.code) || std.code.includes(item.code.split(':')[0])
                  );

                  return (
                    <div key={idx} className="bg-slate-50/90 rounded-xl p-4 border border-slate-200 space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-lg font-bold font-mono text-blue-950">{std.code}</span>
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-blue-100 text-blue-800">
                          {std.scheme}
                        </span>
                      </div>

                      <h4 className="font-semibold text-slate-900 text-sm leading-snug">{std.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{std.reason}</p>

                      {/* Scheme Explainer */}
                      <div className="pt-2 border-t border-slate-200 text-xs text-slate-700 flex items-center justify-between">
                        <span className="text-slate-500">
                          {std.scheme.includes('CRS')
                            ? '📋 Self-Declaration: Only lab test report needed (No factory audit)'
                            : '🏭 Scheme I: Requires in-house factory testing + audit'}
                        </span>
                        {dbMatch && onSelectStandard && (
                          <button
                            type="button"
                            onClick={() => onSelectStandard(dbMatch)}
                            className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 ml-2 shrink-0 cursor-pointer"
                          >
                            <span>{isHi ? 'पूर्ण विवरण' : 'Full Details'}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                <span>
                  {isHi
                    ? 'अन्य वेरिएंट्स के लिए एआई सहायक से विशिष्ट प्रश्न पूछें'
                    : 'For custom dimensions or grades, consult with AI or Manakonline portal'}
                </span>
              </div>
            </div>

            {/* Card 2: Legal QCO Assessment (Traffic Light) */}
            <div
              className={`rounded-2xl p-6 border shadow-xs space-y-4 flex flex-col justify-between ${
                result.qcoStatus.isMandatory
                  ? 'bg-rose-50/70 border-rose-200 text-rose-950'
                  : 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                      result.qcoStatus.isMandatory ? 'text-rose-700' : 'text-emerald-700'
                    }`}
                  >
                    <AlertTriangle className="w-4 h-4" />
                    {isHi ? 'कानूनी बाध्यता स्थिति' : 'Legal Compliance Status'}
                  </span>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      result.qcoStatus.isMandatory
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'bg-emerald-600 text-white shadow-xs'
                    }`}
                  >
                    {result.qcoStatus.isMandatory
                      ? isHi
                        ? '🔴 अनिवार्य (MANDATORY)'
                        : '🔴 STRICTLY MANDATORY'
                      : isHi
                      ? '🟢 स्वैच्छिक (VOLUNTARY)'
                      : '🟢 VOLUNTARY SCHEME'}
                  </span>
                </div>

                <div className="bg-white/90 rounded-xl p-4 border border-rose-100 space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">
                    {result.qcoStatus.isMandatory
                      ? isHi
                        ? 'बिना बीआईएस लाइसेंस के निर्माण या बिक्री गैरकानूनी है'
                        : 'Illegal to manufacture, import, store, or sell without BIS mark'
                      : isHi
                      ? 'लाइसेंस अनिवार्य नहीं है, लेकिन सरकारी टेंडरों में वरीयता मिलती है'
                      : 'Certification is voluntary; recommended for Government GeM tenders'}
                  </h4>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    {result.qcoStatus.isMandatory
                      ? isHi
                        ? 'बीआईएस अधिनियम, 2016 की धारा 16 और 29 के तहत बिना वैध आईएसआई/सीआरएस मार्क के सामान बेचना या आयात करना दंडनीय है। ऐसा करने पर जब्ती व जुर्माना लगाया जा सकता है।'
                        : 'Under Section 16 & 29 of the Bureau of Indian Standards Act 2016, non-compliant goods are subject to seizure, severe fines, and prohibition from domestic marketing.'
                      : isHi
                      ? 'आप अपनी विश्वसनीयता बढ़ाने और निर्यात बाजारों में विश्वास हासिल करने के लिए प्रमाणन प्राप्त कर सकते हैं।'
                      : 'You can choose to get certified to win consumer trust, qualify for PSU tenders, and gain priority access to e-commerce marketplaces.'}
                  </p>
                </div>

                {/* Order Details */}
                <div className="bg-white/80 rounded-xl p-3.5 border border-slate-200 text-xs space-y-1">
                  <p className="font-semibold text-slate-800">{result.qcoStatus.ministryNotice}</p>
                  <p className="text-slate-500 font-mono text-[11px]">{result.qcoStatus.deadline}</p>
                  {result.qcoStatus.exemptions && (
                    <p className="text-emerald-700 font-medium text-[11px] pt-1">
                      ✓ {result.qcoStatus.exemptions}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-2 text-xs text-slate-600 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>{isHi ? 'केंद्र सरकार के गुणवत्ता नियंत्रण आदेशों पर आधारित' : 'Enforced under Gazette Quality Control Order'}</span>
              </div>
            </div>
          </div>

          {/* MAIN SECTION 6: Action Roadmap & MSME Concession */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Compass className="w-4 h-4 text-indigo-600" />
                <span>{isHi ? 'लाइसेंस प्राप्ति की 4-चरणीय प्रक्रिया' : '4-Step Action Plan to Get Certified'}</span>
              </h3>
              <span className="text-xs text-slate-400 hidden sm:inline">
                Portal: <strong className="text-blue-700">manakonline.in</strong>
              </span>
            </div>

            {/* 4 Steps Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {result.manakOnlineProcedure.map((step, sIdx) => (
                <div key={sIdx} className="bg-slate-50 border border-slate-200/90 rounded-xl p-4 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                      {sIdx + 1}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">Step {sIdx + 1}</span>
                  </div>
                  <p className="text-xs text-slate-800 font-medium leading-relaxed pt-1">{step}</p>
                </div>
              ))}
            </div>

            {/* MSME Concession Highlight Card */}
            <div className="bg-emerald-50/90 border border-emerald-200 rounded-xl p-4 text-emerald-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <TrendingDown className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-emerald-900">
                    {isHi ? 'एमएसएमई शुल्क रियायत मार्गदर्शन' : `MSME Concession Guidance (${enterpriseScale} Unit)`}
                  </h4>
                  <p className="text-xs text-emerald-800 mt-0.5 leading-relaxed">
                    {result.msmeGuidance}
                  </p>
                </div>
              </div>

              {onNavigateToCalculator && (
                <button
                  type="button"
                  onClick={onNavigateToCalculator}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shrink-0 shadow-2xs transition cursor-pointer"
                >
                  {isHi ? 'सटीक लागत देखें' : 'View Full Fee Breakdown'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
