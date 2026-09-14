import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Building2,
  Award,
  Search,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  ShieldAlert,
  ShieldCheck,
  FileCheck,
  Scale,
  FlaskConical,
  Smartphone,
  HelpCircle,
  TrendingUp,
  Clock,
  Coins,
  FileText,
  BadgeCheck,
} from 'lucide-react';
import { INDIAN_STANDARDS_DATABASE } from '../data/bisStandardsData';
import { IndianStandard } from '../types';
import { OriginButton } from '@/components/ui/origin-button';

interface HomeDashboardProps {
  language: 'en' | 'hi';
  onNavigateTab: (tab: string) => void;
  onSelectStandard: (standard: IndianStandard) => void;
  onAskAI: (prompt: string) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  language,
  onNavigateTab,
  onSelectStandard,
  onAskAI,
}) => {
  const isHi = language === 'hi';
  const [searchQuery, setSearchQuery] = useState('');

  // Primary service modules (the core box containers)
  const serviceModules = [
    {
      id: 'chat',
      title: isHi ? 'एआई सहायक (ManakSetu AI)' : 'AI-Powered Intelligent Assistant',
      subtitle: isHi ? '24x7 बुद्धिमान परामर्श' : 'Interactive Regulatory & Technical Consultant',
      badge: isHi ? 'मूल समाधान' : 'Gemini 3.8 Flash',
      badgeColor: 'bg-blue-100 text-blue-700 border-blue-200',
      description: isHi
        ? 'भारतीय मानकों, QCO आदेशों, योजना-I (ISI), CRS, आवश्यक परीक्षण उपकरणों और मानकॉन्लाइन आवेदन चरणों पर तुरंत मार्गदर्शन प्राप्त करें।'
        : 'Ask natural language queries to instantly identify applicable Indian Standards, QCO gazette mandates, required factory test equipment, and Manakonline workflows.',
      icon: Sparkles,
      iconBg: 'bg-blue-600 text-white',
      cardBorder: 'hover:border-blue-500 hover:shadow-blue-500/10',
      features: isHi
        ? ['IS कोड खोज एवं स्कोप', 'QCO अनिवार्यता स्थिति', 'इन-हाउस लैब उपकरण', 'योजना-I बनाम CRS']
        : ['IS Code & Scope Lookup', 'Mandatory QCO Gazette Status', 'In-House Test Equipment List', 'Scheme I vs CRS Guidance'],
      actionText: isHi ? 'एआई सहायक प्रारंभ करें' : 'Launch AI Assistant',
    },
    {
      id: 'standards',
      title: isHi ? 'मानक एवं QCO निर्देशिका' : 'Standards & Mandatory QCO Directory',
      subtitle: isHi ? '22,000+ भारतीय मानक' : 'Comprehensive Standards Repository',
      badge: isHi ? 'गजट अनिवार्य' : 'QCO Gazette Enforced',
      badgeColor: 'bg-rose-100 text-rose-700 border-rose-200',
      description: isHi
        ? 'DPIIT, MeitY एवं उपभोक्ता मामलों के मंत्रालय द्वारा अधिसूचित अनिवार्य गुणवत्ता नियंत्रण आदेशों (QCO) और भारतीय मानकों को खोजें व फिल्टर करें।'
        : 'Explore official Indian Standards with real-time QCO gazette status, HS codes, key test parameters, penalties under Section 29, and product categories.',
      icon: BookOpen,
      iconBg: 'bg-indigo-600 text-white',
      cardBorder: 'hover:border-indigo-500 hover:shadow-indigo-500/10',
      features: isHi
        ? ['खिलौने (IS 9873)', 'पेयजल (IS 14543)', 'TMT स्टील (IS 1786)', 'बैटरी (IS 16046)']
        : ['Toys (IS 9873)', 'Drinking Water (IS 14543)', 'TMT Steel (IS 1786)', 'Lithium Cells (IS 16046)'],
      actionText: isHi ? 'मानक एवं QCO देखें' : 'Explore Standards & QCOs',
    },
    {
      id: 'analyzer',
      title: isHi ? 'उत्पाद स्पेसिफिकेशन विश्लेषक' : 'Product Specification Analyzer',
      subtitle: isHi ? 'तकनीकी मिलान एवं अनुपालन' : 'AI-Driven Gap & Tolerance Analysis',
      badge: isHi ? 'अनुपालन जाँच' : 'Gap Analysis',
      badgeColor: 'bg-purple-100 text-purple-700 border-purple-200',
      description: isHi
        ? 'अपने उत्पाद के पैरामीटर या परीक्षण रिपोर्ट दर्ज करें; एआई तुरंत बताएगा कि कौन-से भारतीय मानक लागू होते हैं और क्या परीक्षण सहनशीलता पूरी हो रही है।'
        : 'Paste or upload technical parameters to verify compliance tolerances against Indian Standards, Scheme of Inspection & Testing (SIT), and sampling plans.',
      icon: Building2,
      iconBg: 'bg-purple-600 text-white',
      cardBorder: 'hover:border-purple-500 hover:shadow-purple-500/10',
      features: isHi
        ? ['सहनशीलता (Tolerance) सत्यापन', 'कच्चा माल अनुपालन', 'SIT परीक्षण योजना', 'निरीक्षण चेकलिस्ट']
        : ['Tolerance Limits Verification', 'Raw Material Compliance', 'SIT Testing Schedule', 'Factory Audit Checklist'],
      actionText: isHi ? 'स्पेसिफिकेशन विश्लेषक खोलें' : 'Analyze Specifications',
    },
    {
      id: 'calculator',
      title: isHi ? 'लाइसेंस एवं शुल्क गणक' : 'License Fee & Concession Calculator',
      subtitle: isHi ? 'MSME 50% रियायत' : 'Cost Estimator & Concession Rules',
      badge: isHi ? '50% MSME छूट' : '50% MSME Rebate',
      badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      description: isHi
        ? 'उद्यम पंजीकृत सूक्ष्म एवं लघु उद्योगों तथा महिला उद्यमियों के लिए 50% तक अंकन शुल्क (Marking Fee) रियायत एवं अनुमानित लागत की गणना करें।'
        : 'Accurately estimate application fees, annual minimum marking fee, factory audit charges, and 50% marking fee concessions for Micro & Small enterprises.',
      icon: Award,
      iconBg: 'bg-emerald-600 text-white',
      cardBorder: 'hover:border-emerald-500 hover:shadow-emerald-500/10',
      features: isHi
        ? ['सूक्ष्म उद्योग 50% छूट', 'लघु उद्योग 20% छूट', 'महिला उद्यमी विशेष छूट', 'नमूना परीक्षण शुल्क']
        : ['50% Rebate for Micro Units', '20% Rebate for Small Units', 'Special Start-up Incentives', 'Sample Testing Estimates'],
      actionText: isHi ? 'शुल्क की गणना करें' : 'Calculate License Fees',
    },
    {
      id: 'labs',
      title: isHi ? 'मान्यता प्राप्त प्रयोगशालाएं' : 'Recognized Test Lab Finder',
      subtitle: isHi ? 'NABL एवं BIS मान्यता' : 'Conformity Assessment Labs',
      badge: isHi ? 'अखिल भारतीय नेटवर्क' : 'Pan-India Labs',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      description: isHi
        ? 'राज्य, शहर एवं उत्पाद श्रेणी अनुसार बीआईएस और NABL से मान्यता प्राप्त परीक्षण प्रयोगशालाओं को खोजें, उनके संपर्क विवरण व क्षमताएं देखें।'
        : 'Find accredited laboratories across Indian states with specific testing capabilities, sample submission protocols, turnaround times, and official contacts.',
      icon: Search,
      iconBg: 'bg-amber-600 text-white',
      cardBorder: 'hover:border-amber-500 hover:shadow-amber-500/10',
      features: isHi
        ? ['स्थान आधारित खोज', 'परीक्षण क्षमता विवरण', 'प्रयोगशाला संपर्क जानकारी', 'टर्नअराउंड समय']
        : ['State & City Filtering', 'Test Capability Matrix', 'Official Lab Contacts', 'Estimated Turnaround Times'],
      actionText: isHi ? 'प्रयोगशाला खोजें' : 'Find Testing Labs',
    },
    {
      id: 'verify',
      title: isHi ? 'बीआईएस केयर सत्यापन केंद्र' : 'BIS Care & Authenticity Verify',
      subtitle: isHi ? 'जाली उत्पाद रोकथाम' : 'CML, HUID & CRS Verification',
      badge: isHi ? 'उपभोक्ता संरक्षण' : 'Anti-Counterfeit',
      badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
      description: isHi
        ? 'उत्पाद पर अंकित 7 या 8 अंकों का CML लाइसेंस नंबर, 6 अंकों का सोने के आभूषणों का HUID, अथवा CRS पंजीकरण नंबर सत्यापित करें।'
        : 'Verify the authenticity of ISI Marked products via 7/8-digit CML license numbers, 6-character gold jewellery HUID, and IT/Electronics CRS registration.',
      icon: CheckCircle2,
      iconBg: 'bg-cyan-600 text-white',
      cardBorder: 'hover:border-cyan-500 hover:shadow-cyan-500/10',
      features: isHi
        ? ['CML लाइसेंस सत्यापन', 'स्वर्ण आभूषण HUID जाँच', 'CRS पंजीकरण सत्यापन', 'फर्जी ISI मार्क शिकायत']
        : ['CML License Number Check', 'Gold Hallmarking HUID Check', 'CRS Registration Lookup', 'Counterfeit Reporting'],
      actionText: isHi ? 'सत्यापन शुरू करें' : 'Verify Authenticity',
    },
  ];

  // Official External BIS Portals Box Containers
  const officialPortals = [
    {
      name: 'Manakonline (e-BIS Portal)',
      hindiName: 'मानकऑनलाइन (ई-बीआईएस पोर्टल)',
      url: 'https://www.manakonline.in',
      desc: isHi
        ? 'उत्पाद प्रमाणन (ISI मार्क), FMCS एवं हॉलमार्किंग के लिए आधिकारिक ऑनलाइन आवेदन पोर्टल।'
        : 'Official digital gateway for Scheme I (ISI Mark), Foreign Manufacturers (FMCS), and Hallmarking registration.',
      tag: 'Core Portal',
    },
    {
      name: 'CRS Portal (crsbis.in)',
      hindiName: 'सीआरएस पोर्टल (इलेक्ट्रॉनिक्स एवं आईटी)',
      url: 'https://www.crsbis.in',
      desc: isHi
        ? 'इलेक्ट्रॉनिक्स, मोबाइल फोन, लैपटॉप एवं सौर पीवी मॉड्यूल हेतु अनिवार्य पंजीकरण योजना (Scheme II)।'
        : 'Compulsory Registration Scheme for Electronics, IT Equipment, Solar PV modules, and secondary batteries.',
      tag: 'Electronics / IT',
    },
    {
      name: 'Know Your Standards (KYS)',
      hindiName: 'अपने मानकों को जानें (KYS)',
      url: 'https://www.services.bis.gov.in',
      desc: isHi
        ? 'सभी भारतीय मानकों को ऑनलाइन पढ़ने और डाउनलोड करने की आधिकारिक नागरिक एवं उद्योग सेवा।'
        : 'Free citizen and enterprise access to read, explore, and download complete Indian Standards.',
      tag: 'Free IS Access',
    },
    {
      name: 'BIS Care Mobile App',
      hindiName: 'बीआईएस केयर मोबाइल ऐप',
      url: 'https://bis.gov.in',
      desc: isHi
        ? 'एंड्रॉइड एवं आईओएस पर उपलब्ध ऐप — चलते-फिरते HUID व ISI मार्क स्कैन करें और शिकायत दर्ज करें।'
        : 'Android & iOS app empowering consumers to scan HUID hallmark codes, verify licenses, and lodge complaints.',
      tag: 'Mobile App',
    },
  ];

  // Featured / Frequently Queried Standards
  const featuredStandards = INDIAN_STANDARDS_DATABASE.slice(0, 6);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    onAskAI(`Tell me about Indian Standards, QCO status, and BIS certification process for: ${searchQuery}`);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white p-6 sm:p-8 lg:p-10 shadow-lg border border-slate-800">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Problem Statement 26107 • National Standards Ecosystem</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
            {isHi ? (
              <>
                भारतीय मानक एवं बीआईएस सेवाओं हेतु{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-orange-400">
                  एआई-संचालित बुद्धिमान सहायक
                </span>
              </>
            ) : (
              <>
                AI-Powered Intelligent Gateway for{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-orange-400">
                  Indian Standards & BIS Services
                </span>
              </>
            )}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            {isHi
              ? 'उद्योगों, एमएसएमई, स्टार्टअप्स, विद्यार्थियों एवं उपभोक्ताओं के लिए एक ही स्थान पर भारतीय मानक (IS Codes), अनिवार्य QCO आदेश, लाइसेंस शुल्क, परीक्षण प्रयोगशालाएं एवं बीआईएस केयर सत्यापन।'
              : 'Empowering industries, MSMEs, startups, students, and citizens to rapidly identify applicable Indian Standards, mandatory Quality Control Orders (QCO), license fees with 50% rebates, and accredited testing laboratories.'}
          </p>

          {/* Direct Search Bar */}
          <form onSubmit={handleSearchSubmit} className="pt-2">
            <div className="relative flex items-center max-w-2xl">
              <Search className="absolute left-4 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isHi
                    ? 'उत्पाद, IS कोड, या प्रश्न लिखें (उदा. "खिलौने", "IS 14543", "TMT स्टील")...'
                    : 'Search standard, product, or question (e.g. "Packaged Water", "IS 9873", "TMT Steel")...'
                }
                className="w-full bg-slate-800/90 text-white placeholder:text-slate-400 text-sm pl-11 pr-28 py-3.5 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition"
              />
              <OriginButton
                type="submit"
                className="absolute right-1 top-1 bottom-1 h-auto px-4 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold text-xs rounded-lg shadow-sm border-0"
              >
                {isHi ? 'पूछें' : 'Search / Ask'}
              </OriginButton>
            </div>
          </form>

          {/* Quick Stats Metrics */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3">
              <div className="text-amber-400 font-black text-lg sm:text-xl">22,000+</div>
              <div className="text-slate-400 text-[11px]">{isHi ? 'सक्रिय भारतीय मानक' : 'Active Indian Standards'}</div>
            </div>
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3">
              <div className="text-amber-400 font-black text-lg sm:text-xl">700+</div>
              <div className="text-slate-400 text-[11px]">{isHi ? 'अनिवार्य QCO उत्पाद' : 'Mandatory QCO Products'}</div>
            </div>
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3">
              <div className="text-emerald-400 font-black text-lg sm:text-xl">50% Off</div>
              <div className="text-slate-400 text-[11px]">{isHi ? 'सूक्ष्म उद्यम रियायत' : 'Micro Enterprise Rebate'}</div>
            </div>
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3">
              <div className="text-blue-400 font-black text-lg sm:text-xl">100%</div>
              <div className="text-slate-400 text-[11px]">{isHi ? 'डिजिटल मानकऑनलाइन' : 'Digital via Manakonline'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Services Section - The "Box Container" Grid Requested by the User */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <BadgeCheck className="w-5 h-5 text-blue-600" />
              {isHi ? 'बीआईएस सेवा एवं उपकरण बॉक्स कंटेनर' : 'BIS Services & Interactive Tools Directory'}
            </h2>
            <p className="text-xs text-slate-500">
              {isHi
                ? 'सभी प्रमुख समाधान एवं सेवाएं नीचे दिए गए बॉक्स कंटेनर में उपलब्ध हैं'
                : 'All primary intelligent modules and services accessible directly from these box containers'}
            </p>
          </div>
          <span className="text-xs text-slate-600 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full font-medium self-start sm:self-auto">
            {serviceModules.length} {isHi ? 'सेवाएं उपलब्ध' : 'Services Ready'}
          </span>
        </div>

        {/* The 6 Key Box Containers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {serviceModules.map((module) => {
            const Icon = module.icon;
            return (
              <div
                key={module.id}
                onClick={() => onNavigateTab(module.id)}
                className={`group bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer ${module.cardBorder}`}
              >
                <div className="space-y-3.5">
                  {/* Card Top: Icon & Badge */}
                  <div className="flex items-start justify-between gap-2">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-xs transition group-hover:scale-105 ${module.iconBg}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${module.badgeColor}`}>
                      {module.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition flex items-center justify-between">
                      <span>{module.title}</span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition shrink-0" />
                    </h3>
                    <p className="text-[11px] font-medium text-slate-500 mt-0.5">{module.subtitle}</p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {module.description}
                  </p>

                  {/* Key Features Chips */}
                  <div className="pt-1 flex flex-wrap gap-1.5">
                    {module.features.map((feat, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200 font-medium"
                      >
                        • {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Bottom: Action Button */}
                <div className="pt-4 mt-4 border-t border-slate-100">
                  <OriginButton
                    type="button"
                    className="w-full h-10 px-3 rounded-xl bg-slate-50 group-hover:bg-blue-600 text-slate-700 group-hover:text-white font-semibold text-xs transition flex items-center justify-center gap-1.5 border border-slate-200 group-hover:border-blue-600"
                  >
                    <span>{module.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition group-hover:translate-x-0.5" />
                  </OriginButton>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Indian Standards Box Container */}
      <section className="bg-white dark:bg-[#0f1729] rounded-2xl p-6 border border-slate-200 dark:border-indigo-500/20 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-indigo-500/15 pb-3">
          <div>
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-600" />
              {isHi ? 'अक्सर पूछे जाने वाले उच्च प्राथमिकता मानक (High-Impact Standards)' : 'Frequently Inquired High-Impact Indian Standards'}
            </h3>
            <p className="text-xs text-slate-500">
              {isHi ? 'अनिवार्य QCO एवं उद्योग अनुपालन हेतु प्रमुख उत्पाद' : 'Direct access to standards under mandatory Quality Control Orders'}
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('standards')}
            className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 self-start sm:self-auto"
          >
            <span>{isHi ? 'सभी मानक देखें' : 'View All 22,000+'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {featuredStandards.map((std) => (
            <div
              key={std.id}
              onClick={() => onSelectStandard(std)}
              className="p-3.5 rounded-xl border border-slate-200 dark:border-indigo-500/20 hover:border-blue-400 dark:hover:border-indigo-400/50 bg-slate-50/70 dark:bg-[#152035] hover:bg-blue-50/30 dark:hover:bg-indigo-500/10 transition cursor-pointer flex flex-col justify-between space-y-2 group"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="font-mono font-bold text-xs text-blue-900 group-hover:text-blue-600 transition">
                    {std.code}
                  </span>
                  {std.isMandatoryQCO && (
                    <span className="bg-rose-100 text-rose-700 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                      QCO Enforced
                    </span>
                  )}
                </div>
                <h4 className="font-semibold text-xs text-slate-800 line-clamp-1">
                  {isHi && std.hindiTitle ? std.hindiTitle : std.title}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {std.scope}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-indigo-500/15 text-[10px] text-slate-500">
                <span className="bg-slate-200/80 dark:bg-indigo-500/15 px-1.5 py-0.5 rounded text-slate-700 dark:text-indigo-300 font-medium">
                  {std.scheme}
                </span>
                <span className="text-blue-600 font-semibold group-hover:underline flex items-center gap-0.5">
                  {isHi ? 'विवरण' : 'Details'} →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Official External BIS Portals & Helpline Box Container */}
      <section className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-amber-400" />
              {isHi ? 'आधिकारिक बीआईएस पोर्टल एवं संसाधन लिंक' : 'Official Bureau of Indian Standards (BIS) Portals'}
            </h3>
            <p className="text-xs text-slate-400">
              {isHi
                ? 'भारत सरकार के आधिकारिक पोर्टल जहां आवेदन व पंजीकरण जमा होते हैं'
                : 'Direct digital links to statutory portals for filing applications, checking gazettes, and downloading standards'}
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-amber-400 bg-slate-800 px-3 py-1 rounded-full self-start sm:self-auto border border-slate-700">
            <Smartphone className="w-3.5 h-3.5" />
            <span>National Helpline: 1915</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {officialPortals.map((portal, idx) => (
            <a
              key={idx}
              href={portal.url}
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-400/50 transition group flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-semibold bg-amber-400/10 px-2 py-0.5 rounded">
                    {portal.tag}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400 transition" />
                </div>
                <h4 className="font-bold text-sm text-white group-hover:text-amber-300 transition">
                  {isHi ? portal.hindiName : portal.name}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {portal.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-700/50 text-[11px] font-medium text-amber-400 flex items-center gap-1">
                <span>{isHi ? 'पोर्टल खोलें' : 'Access Portal'}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" />
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};
