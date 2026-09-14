import React, { useState, useRef } from 'react';
import WovenCloth from '@/components/ui/woven-cloth';
import {
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Lock,
  Layers,
  Search,
  BookOpen,
  FlaskConical,
  Award,
  CheckCircle2,
  HelpCircle,
  Building2,
  Compass,
  FileCheck,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Info,
  Scale,
  Zap,
  Globe2,
  BarChart3,
  Lightbulb,
  Languages,
} from 'lucide-react';
import { OriginButton } from '@/components/ui/origin-button';
import { CinematicThemeToggler } from '@/components/ui/cinematic-theme-toggler';

interface WovenLandingProps {
  onEnterApp?: (userEmail?: string, targetTab?: string) => void;
  onGetStarted: (targetTab?: string) => void;
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const WovenLanding: React.FC<WovenLandingProps> = ({
  onEnterApp,
  onGetStarted,
  language,
  setLanguage,
  isDark,
  onToggleTheme,
}) => {
  const isHi = language === 'hi';

  // Section Refs for smooth scrolling on top nav tap
  const howItWorksRef = useRef<HTMLElement>(null);
  const capabilitiesRef = useRef<HTMLElement>(null);
  const standardsEcosystemRef = useRef<HTMLElement>(null);
  const problemStatementRef = useRef<HTMLElement>(null);
  const authSectionRef = useRef<HTMLElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navLinks = [
    {
      id: 'how-it-works',
      label: isHi ? 'कार्यप्रणाली' : 'How It Works',
      ref: howItWorksRef,
    },
    {
      id: 'capabilities',
      label: isHi ? 'क्षमताएं' : 'Capabilities',
      ref: capabilitiesRef,
    },
    {
      id: 'standards-ecosystem',
      label: isHi ? 'मानक तंत्र' : 'Standards Ecosystem',
      ref: standardsEcosystemRef,
    },
    {
      id: 'about-ps',
      label: isHi ? 'समस्या विवरण' : 'Problem Statement 26107',
      ref: problemStatementRef,
    },
  ];

  return (
    <div className={`fixed inset-0 z-50 overflow-x-hidden overflow-y-auto ${isDark ? 'bg-[#040814] text-slate-100' : 'bg-[#f8fafc] text-slate-900'} font-sans selection:bg-blue-600 selection:text-white transition-colors duration-300`}>
      
      {/* ========================================================================= */}
      {/* 1. TOP STICKY NAVIGATION BAR                                              */}
      {/* ========================================================================= */}
      <header className={`sticky top-0 z-40 w-full border-b backdrop-blur-xl transition-colors duration-300 ${
        isDark 
          ? 'border-indigo-500/20 bg-[#060d1f]/95 text-white shadow-lg shadow-black/30' 
          : 'border-slate-200/90 bg-white/95 text-slate-900 shadow-sm'
      }`}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-3">
            
            {/* Logo & National Standards Monogram */}
            <div 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 shrink-0 cursor-pointer group"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-amber-600 p-[1px] shadow-md shadow-blue-950/60 group-hover:scale-105 transition-transform">
                <div className={`w-full h-full rounded-[11px] flex items-center justify-center font-serif font-black text-sm sm:text-base ${
                  isDark ? 'bg-[#070e24] text-amber-400' : 'bg-slate-50 text-indigo-900'
                }`}>
                  IS
                </div>
              </div>
              <div className="leading-tight">
                <div className="flex items-center gap-2">
                  <h1 className={`font-bold text-sm sm:text-base tracking-tight flex items-center gap-1.5 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    ManakSetu <span className="text-amber-500 font-serif font-normal text-xs sm:text-sm">(मानकसेतु)</span>
                  </h1>
                  <span className="bg-amber-400/10 text-amber-500 dark:text-amber-300 text-[10px] font-mono px-2 py-0.5 rounded border border-amber-400/25 hidden md:inline font-semibold">
                    PS 26107
                  </span>
                </div>
                <p className={`text-[10px] sm:text-[11px] font-mono tracking-wider truncate ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  Bureau of Indian Standards • National AI Gateway
                </p>
              </div>
            </div>

            {/* Middle Nav Links: Smooth scroll triggers to below-cloth sections */}
            <nav className={`hidden lg:flex items-center gap-1 p-1 rounded-xl border ${
              isDark 
                ? 'bg-slate-900/70 border-indigo-500/15' 
                : 'bg-slate-100/90 border-slate-200'
            }`}>
              {navLinks.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.ref)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1 cursor-pointer ${
                    isDark
                      ? 'text-slate-300 hover:text-white hover:bg-slate-800/90'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white shadow-xs'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-amber-400" />
                </button>
              ))}
            </nav>

            {/* Right Quick Actions */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              
              {/* Language Switcher */}
              <OriginButton
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className={`h-7 sm:h-8 px-2.5 sm:px-3 rounded-lg text-xs border transition font-medium flex items-center gap-1.5 cursor-pointer ${
                  isDark
                    ? 'bg-slate-800/90 hover:bg-slate-700 text-amber-400 border-slate-700/80'
                    : 'bg-slate-100 hover:bg-slate-200 text-indigo-700 border-slate-300'
                }`}
                title="Toggle English / Hindi language"
              >
                <Languages className="w-3.5 h-3.5" />
                <span>{isHi ? 'English' : 'हिन्दी'}</span>
              </OriginButton>

              {/* Cinematic Theme Toggler */}
              <CinematicThemeToggler
                isDark={isDark}
                onToggle={onToggleTheme}
              />

              {/* Get Started Button */}
              <button
                onClick={() => onGetStarted('home')}
                className="h-7 sm:h-8 px-3 sm:px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-400 text-white font-semibold text-xs transition-all shadow-md shadow-blue-900/40 border border-blue-400/30 flex items-center gap-1.5 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{isHi ? 'शुरू करें' : 'Get Started'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. DEDICATED FULL CLOTH STAGE (100% VISIBLE, NO OVERLAPPING CONTENT)      */}
      {/* ========================================================================= */}
      <section className={`relative w-full h-[82vh] sm:h-[86vh] min-h-[560px] max-h-[920px] overflow-hidden flex flex-col justify-between ${
        isDark ? 'bg-[#050914]' : 'bg-gradient-to-b from-white via-slate-50 to-[#f8fafc]'
      }`}>
        
        {/* The 3D Simulation Cloth Canvas - completely unobstructed */}
        <div className="absolute inset-0 z-0">
          <WovenCloth 
            mode={isDark ? "dark" : "light"} 
            className="w-full h-full object-cover" 
          />
        </div>

        {/* Soft edge fade so cloth blends seamlessly into the sections below */}
        <div className={`absolute inset-x-0 bottom-0 h-32 pointer-events-none z-10 ${
          isDark 
            ? 'bg-gradient-to-t from-[#040814] via-[#040814]/70 to-transparent' 
            : 'bg-gradient-to-t from-[#f8fafc] via-[#f8fafc]/80 to-transparent'
        }`} />

        {/* Top telemetry indicator */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pt-4 flex items-center justify-between pointer-events-none">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-md border text-[11px] font-mono shadow-sm ${
            isDark 
              ? 'bg-slate-900/70 border-indigo-500/20 text-slate-300' 
              : 'bg-white/85 border-slate-300 text-slate-800'
          }`}>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Interactive 3D Bureau of Indian Standards Silk Simulation</span>
          </div>
          <div className={`hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-md border text-[11px] font-mono ${
            isDark 
              ? 'bg-slate-900/70 border-indigo-500/20 text-amber-300' 
              : 'bg-white/85 border-slate-300 text-indigo-700 font-semibold'
          }`}>
            <span>{isHi ? 'विवरण और सुविधाओं के लिए नीचे स्क्रॉल करें ↓' : 'Scroll down for detailed documentation & portal access ↓'}</span>
          </div>
        </div>

        {/* Bottom Centered Scroll Down Cue */}
        <div className="relative z-20 w-full pb-6 flex flex-col items-center justify-center gap-1.5 pointer-events-auto">
          <button
            onClick={() => scrollToSection(howItWorksRef)}
            className={`group flex flex-col items-center gap-1 transition-colors cursor-pointer ${
              isDark ? 'text-slate-400 hover:text-amber-300' : 'text-slate-600 hover:text-indigo-600'
            }`}
          >
            <span className="text-[11px] font-mono uppercase tracking-widest">
              {isHi ? 'विवरण देखने के लिए नीचे स्क्रॉल करें' : 'Explore Platform Architecture'}
            </span>
            <div className={`w-7 h-7 rounded-full border flex items-center justify-center transition shadow-md ${
              isDark 
                ? 'bg-slate-900/80 border-slate-700/80 group-hover:border-amber-400/50 group-hover:bg-slate-800' 
                : 'bg-white border-slate-300 group-hover:border-indigo-400 group-hover:bg-slate-50'
            }`}>
              <ChevronDown className="w-4 h-4 text-amber-500 group-hover:translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* HIGHLIGHTED CENTERPIECE: GET STARTED SECTION (BELOW CLOTH, ABOVE DATA)     */}
      {/* ========================================================================= */}
      <section className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center flex flex-col items-center justify-center">
        {/* Soft Radial Ambient Glow */}
        <div 
          className="absolute inset-0 pointer-events-none -z-10 blur-3xl opacity-40 dark:opacity-25"
          style={{
            background: isDark
              ? 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.5) 0%, rgba(245, 158, 11, 0.18) 45%, transparent 70%)'
              : 'radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.22) 0%, rgba(245, 158, 11, 0.12) 45%, transparent 70%)'
          }}
        />

        {/* Highlighted Container Card */}
        <div className={`w-full rounded-3xl p-6 sm:p-10 border transition-all duration-300 shadow-2xl relative overflow-hidden backdrop-blur-xl ${
          isDark 
            ? 'bg-gradient-to-b from-[#0a142c]/95 via-[#060e22]/98 to-[#040816] border-indigo-500/35 shadow-blue-950/60' 
            : 'bg-gradient-to-b from-white via-slate-50/95 to-blue-50/50 border-blue-200/90 shadow-slate-200/90'
        }`}>
          {/* Top Golden Filigree Accent Bar */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-90" />

          <div className="max-w-2xl mx-auto space-y-5">
            {/* Pill Badge */}
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border shadow-sm ${
              isDark 
                ? 'bg-amber-400/10 text-amber-300 border-amber-400/30' 
                : 'bg-amber-50 text-amber-700 border-amber-300/80'
            }`}>
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
              <span>{isHi ? 'भारतीय मानक ब्यूरो • एआई पावर्ड गेटवे' : 'Bureau of Indian Standards • AI Gateway'}</span>
            </div>

            {/* Headline */}
            <h2 className={`text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              {isHi
                ? 'मानकसेतु के साथ अपनी यात्रा अभी शुरू करें'
                : 'Start Your Journey with ManakSetu'}
            </h2>

            {/* Subtitle */}
            <p className={`text-sm sm:text-base leading-relaxed max-w-xl mx-auto ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {isHi
                ? '22,000+ भारतीय मानक, अनिवार्य QCO राजपत्र आदेश, SIT परीक्षण उपकरण सूची और 50% एमएसएमई शुल्क छूट की तत्काल जानकारी।'
                : 'Access 22,000+ Indian Standards, Gazette QCO Orders, in-house laboratory SIT testing equipment, and automated MSME fee calculators.'}
            </p>

            {/* THE PRIMARY HIGHLIGHTED GET STARTED BUTTON */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onGetStarted('home')}
                className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base sm:text-lg transition-all duration-200 shadow-xl shadow-blue-600/35 hover:shadow-blue-600/50 hover:scale-[1.03] active:scale-[0.98] border border-blue-400/40 flex items-center justify-center gap-3 cursor-pointer group"
              >
                <span>{isHi ? 'शुरू करें (गेट स्टार्टेड)' : 'Get Started Now'}</span>
                <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </div>
              </button>

              <button
                onClick={() => scrollToSection(howItWorksRef)}
                className={`w-full sm:w-auto px-6 py-3.5 sm:py-4 rounded-2xl text-sm font-semibold transition border flex items-center justify-center gap-2 cursor-pointer ${
                  isDark
                    ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border-slate-700'
                    : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-xs'
                }`}
              >
                <Compass className="w-4 h-4 text-blue-500" />
                <span>{isHi ? 'कार्यप्रणाली देखें' : 'How It Works'}</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Trust feature chips */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg ${
                isDark ? 'bg-slate-800/60 text-slate-300' : 'bg-slate-100 text-slate-700'
              }`}>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                {isHi ? 'तत्काल पहुंच' : 'Instant Direct Access'}
              </span>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg ${
                isDark ? 'bg-slate-800/60 text-slate-300' : 'bg-slate-100 text-slate-700'
              }`}>
                <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                {isHi ? '22,000+ प्रामाणिक मानक' : '22,000+ BIS Standards'}
              </span>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg ${
                isDark ? 'bg-slate-800/60 text-slate-300' : 'bg-slate-100 text-slate-700'
              }`}>
                <Award className="w-3.5 h-3.5 text-amber-500" />
                {isHi ? '50% एमएसएमई छूट' : '50% MSME Fee Rebate'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SECTION BELOW CLOTH: HOW IT WORKS (कार्यप्रणाली)                        */}
      {/* ========================================================================= */}
      <section 
        ref={howItWorksRef}
        id="how-it-works" 
        className={`relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t ${
          isDark ? 'border-indigo-500/20' : 'border-slate-200'
        }`}
      >
        <div className="space-y-4 max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-600 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
            <span>Architecture & Workflow</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            {isHi ? 'मानकसेतु कैसे कार्य करता है?' : 'How ManakSetu AI Assistant Works'}
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            {isHi
              ? 'भारतीय मानक ब्यूरो (BIS) के जटिल नियमों, गुणवत्ता नियंत्रण आदेशों (QCO) और प्रयोगशाला प्रक्रियाओं को सरल बनाने हेतु डिज़ाइन की गई 4-चरणीय बुद्धिमान प्रणाली।'
              : 'An end-to-end intelligent pipeline that bridges citizens, MSMEs, industries, and certifying officers directly with authentic Bureau of Indian Standards regulatory frameworks.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              step: '01',
              title: isHi ? 'प्राकृतिक भाषा में प्रश्न' : 'Natural Language Query',
              desc: isHi
                ? 'अपने उत्पाद, उद्योग या IS कोड को अपनी भाषा में लिखें या बोलें (उदा. "IS 14543 पानी का प्लांट", "खिलौने QCO नियम")।'
                : 'Ask regulatory questions in conversational English or Hindi via typed prompt or integrated voice mic.',
              icon: Search,
            },
            {
              step: '02',
              title: isHi ? 'मानक एवं QCO मिलान' : 'Standards & QCO Mapping',
              desc: isHi
                ? '22,000+ सक्रिय भारतीय मानकों एवं DPIIT/MeitY राजपत्र आदेशों में से अनिवार्य स्थिति की तत्काल पहचान।'
                : 'Instantly cross-references the gazette database to confirm if mandatory Quality Control Order (QCO) applies.',
              icon: BookOpen,
            },
            {
              step: '03',
              title: isHi ? 'योजना वर्गीकरण एवं SIT' : 'Scheme & SIT Matrix',
              desc: isHi
                ? 'योजना-I (ISI मार्क) बनाम CRS का स्पष्ट विभाजन, कारखाने हेतु इन-हाउस परीक्षण उपकरण सूची एवं तकनीकी क्लॉज।'
                : 'Generates in-house lab test equipment requirements (Scheme of Inspection & Testing) and product scope.',
              icon: Layers,
            },
            {
              step: '04',
              title: isHi ? 'शुल्क व लैब सहायता' : '50% Concession & Labs',
              desc: isHi
                ? 'एमएसएमई/स्टार्टअप्स हेतु 50% मार्किंग शुल्क छूट की गणना तथा नज़दीकी NABL-मान्यता प्राप्त प्रयोगशालाएं।'
                : 'Calculates exact Manakonline fees with MSME rebates and pinpoints accredited testing laboratories nationwide.',
              icon: Award,
            },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <div 
                key={card.step}
                className={`relative rounded-2xl p-6 border shadow-lg space-y-3 flex flex-col justify-between transition ${
                  isDark 
                    ? 'bg-gradient-to-b from-[#091126] to-[#060b1a] border-indigo-500/20 hover:border-indigo-400/40 text-white' 
                    : 'bg-white border-slate-200 hover:border-blue-400/40 text-slate-900 shadow-slate-100'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`font-mono font-black text-xs px-2 py-0.5 rounded border ${
                      isDark 
                        ? 'bg-slate-800/80 text-amber-400 border-slate-700' 
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      STEP {card.step}
                    </span>
                    <Icon className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                  </div>
                  <h3 className={`font-bold text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>{card.title}</h3>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{card.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SECTION BELOW CLOTH: CAPABILITIES (तकनीकी क्षमताएं)                    */}
      {/* ========================================================================= */}
      <section 
        ref={capabilitiesRef}
        id="capabilities" 
        className={`relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t ${
          isDark ? 'border-indigo-500/20' : 'border-slate-200'
        }`}
      >
        <div className="space-y-4 max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-600 dark:text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
            <span>Platform Capabilities</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            {isHi ? 'अत्याधुनिक मॉड्यूल एवं क्षमताएं' : 'Key Core Capabilities'}
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            {isHi
              ? 'उद्योगों, प्रयोगशालाओं, नियामकों और उपभोक्ताओं के लिए एकीकृत समाधान।'
              : 'Six comprehensive engines integrated under a single intuitive interface.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              id: 'chat',
              title: isHi ? 'एआई सहायक (ManakSetu AI)' : 'AI Regulatory Assistant',
              tag: 'Gemini 3.8 Flash',
              desc: isHi
                ? 'भारतीय मानकों, अनिवार्य QCO आदेशों, योजना-I (ISI), आवश्यक परीक्षण उपकरणों और मानकॉन्लाइन आवेदन चरणों पर 24x7 मार्गदर्शन।'
                : 'Interactive multi-turn AI consultant grounded in the Bureau of Indian Standards Act 2016 and Gazette QCOs.',
              icon: Sparkles,
              tab: 'chat',
            },
            {
              id: 'standards',
              title: isHi ? 'मानक एवं QCO अन्वेषक' : 'Standards & QCO Explorer',
              tag: '22,000+ Database',
              desc: isHi
                ? 'विस्तृत IS कोड, अनिवार्य गुणवत्ता नियंत्रण आदेश (QCO) अधिसूचनाएं, परीक्षण पैरामीटर और उत्पादन क्लॉज खोजें।'
                : 'Browse verified standards, mandatory enforcement dates, testing parameters, and factory SIT requirements.',
              icon: BookOpen,
              tab: 'standards',
            },
            {
              id: 'analyzer',
              title: isHi ? 'स्पेसिफिकेशन विश्लेषक' : 'Product Spec Analyzer',
              tag: 'Automated Mapping',
              desc: isHi
                ? 'अपने उत्पाद विनिर्देशों की तुलना सीधे भारतीय मानक आवश्यकताओं के साथ करें और अनुपालन अंतर रिपोर्ट प्राप्त करें।'
                : 'Match technical product specifications against IS benchmarks and generate immediate gap analysis.',
              icon: Building2,
              tab: 'analyzer',
            },
            {
              id: 'calculator',
              title: isHi ? 'लाइसेंस एवं शुल्क कैलकुलेटर' : 'License Fee & Rebate Calculator',
              tag: '50% MSME Concession',
              desc: isHi
                ? 'आवेदन शुल्क, वार्षिक लाइसेंस शुल्क, मार्किंग शुल्क तथा सूक्ष्म/लघु उद्यमों हेतु 50% छूट की सटीक गणना।'
                : 'Transparent computation of application fees, annual license charges, and automatic 50% MSME rebates.',
              icon: Award,
              tab: 'calculator',
            },
            {
              id: 'labs',
              title: isHi ? 'प्रयोगशाला खोजक (Lab Finder)' : 'Accredited Lab Finder',
              tag: 'NABL & BIS Empaneled',
              desc: isHi
                ? 'अपने उत्पाद के विशिष्ट परीक्षण हेतु देश भर में बीआईएस-पैनलबद्ध और NABL-मान्यता प्राप्त परीक्षण प्रयोगशालाएं खोजें।'
                : 'Find certified in-house and third-party commercial testing laboratories accredited for your product IS code.',
              icon: FlaskConical,
              tab: 'labs',
            },
            {
              id: 'verify',
              title: isHi ? 'बीआईएस केयर सत्यापन (BIS Care)' : 'Consumer License Verification',
              tag: 'Anti-Counterfeit',
              desc: isHi
                ? 'उत्पाद ISI लाइसेंस (CM/L नंबर) और सोने के आभूषणों के 6-अंकीय HUID हॉलमार्क की प्रामाणिकता जांचें।'
                : 'Instant real-time verification of ISI CM/L license numbers and gold hallmark 6-digit alphanumeric HUID codes.',
              icon: CheckCircle2,
              tab: 'verify',
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => onGetStarted(item.tab)}
                className={`p-6 rounded-2xl border transition cursor-pointer flex flex-col justify-between space-y-4 group shadow-md ${
                  isDark 
                    ? 'bg-[#081024] border-indigo-500/20 hover:border-blue-400/50 hover:bg-[#0c1630]' 
                    : 'bg-white border-slate-200 hover:border-blue-400/50 hover:bg-blue-50/30'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-400/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border flex items-center gap-1 ${
                      isDark 
                        ? 'bg-slate-900 text-amber-300 border-slate-700' 
                        : 'bg-slate-100 text-indigo-700 border-slate-200'
                    }`}>
                      <Lock className="w-2.5 h-2.5 opacity-70" />
                      {item.tag}
                    </span>
                  </div>
                  <h3 className={`font-bold text-base transition ${
                    isDark 
                      ? 'text-white group-hover:text-amber-300' 
                      : 'text-slate-900 group-hover:text-blue-700'
                  }`}>
                    {item.title}
                  </h3>
                  <p className={`text-xs leading-relaxed ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {item.desc}
                  </p>
                </div>
                <div className={`pt-3 border-t text-xs font-semibold flex items-center justify-between ${
                  isDark ? 'border-slate-800 text-blue-400 group-hover:text-amber-300' : 'border-slate-100 text-blue-600 group-hover:text-indigo-700'
                }`}>
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 opacity-80" />
                    <span>{isHi ? 'प्रवेश हेतु साइन इन करें' : 'Sign In to Access'}</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SECTION BELOW CLOTH: STANDARDS ECOSYSTEM (मानक तंत्र)                 */}
      {/* ========================================================================= */}
      <section 
        ref={standardsEcosystemRef}
        id="standards-ecosystem" 
        className={`relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t ${
          isDark ? 'border-indigo-500/20' : 'border-slate-200'
        }`}
      >
        <div className="space-y-4 max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-600 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
            <span>Standards & Gazette Coverage</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            {isHi ? '22,000+ भारतीय मानक एवं अनिवार्य QCO राजपत्र' : 'National Standards & QCO Ecosystem'}
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            {isHi
              ? 'उद्योग एवं आंतरिक व्यापार संवर्धन विभाग (DPIIT), इलेक्ट्रॉनिक्स एवं सूचना प्रौद्योगिकी मंत्रालय (MeitY) के अनिवार्य गुणवत्ता नियंत्रण आदेशों का संपूर्ण कवरेज।'
              : 'Grounded in all Gazette Quality Control Orders (QCOs) notified under the BIS Act, 2016.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              code: 'IS 14543:2024',
              title: 'Packaged Drinking Water',
              scheme: 'Scheme-I (ISI Mark)',
              status: 'Mandatory QCO',
              tests: 'Microbiological, heavy metals, packaging tests',
            },
            {
              code: 'IS 1786:2008',
              title: 'High Strength Deformed Steel Bars (TMT)',
              scheme: 'Scheme-I (ISI Mark)',
              status: 'Mandatory QCO',
              tests: 'Tensile yield, bend test, chemical composition',
            },
            {
              code: 'IS 9873 (Part 1):2019',
              title: 'Safety of Toys - Physical Properties',
              scheme: 'Scheme-I (ISI Mark)',
              status: 'Mandatory QCO',
              tests: 'Sharp edges, small parts, choking hazards',
            },
            {
              code: 'IS 16046 (Part 2):2018',
              title: 'Lithium Secondary Cells & Batteries',
              scheme: 'CRS (Scheme-II)',
              status: 'MeitY Compulsory',
              tests: 'Thermal abuse, overcharge, external short-circuit',
            },
          ].map((std) => (
            <div 
              key={std.code}
              onClick={() => onGetStarted('standards')}
              className={`p-4 rounded-xl border transition cursor-pointer space-y-2 group shadow-sm ${
                isDark 
                  ? 'bg-[#091124] border-indigo-500/20 hover:border-amber-400/50 hover:bg-[#0c1630]' 
                  : 'bg-white border-slate-200 hover:border-blue-400/50 hover:bg-blue-50/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-amber-500 dark:text-amber-400">{std.code}</span>
                <span className="bg-rose-500/15 text-rose-600 dark:text-rose-300 text-[10px] font-bold px-1.5 py-0.5 rounded border border-rose-500/25">
                  {std.status}
                </span>
              </div>
              <h4 className={`font-semibold text-xs sm:text-sm transition line-clamp-1 ${
                isDark ? 'text-white group-hover:text-blue-300' : 'text-slate-900 group-hover:text-blue-700'
              }`}>
                {std.title}
              </h4>
              <p className={`text-[11px] line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {std.tests}
              </p>
              <div className={`pt-2 border-t text-[10px] flex items-center justify-between ${
                isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
              }`}>
                <span className="flex items-center gap-1">
                  <Lock className="w-3 h-3 text-amber-500" />
                  <span>{std.scheme}</span>
                </span>
                <span className="font-semibold text-blue-600 dark:text-blue-400 group-hover:text-amber-400 flex items-center gap-0.5">
                  <span>{isHi ? 'अनलॉक करें' : 'Sign In to View'}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. SECTION BELOW CLOTH: PROBLEM STATEMENT 26107                          */}
      {/* ========================================================================= */}
      <section 
        ref={problemStatementRef}
        id="about-ps" 
        className={`relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t ${
          isDark ? 'border-indigo-500/20' : 'border-slate-200'
        }`}
      >
        <div className={`rounded-3xl p-8 sm:p-12 border shadow-2xl relative overflow-hidden ${
          isDark 
            ? 'bg-gradient-to-br from-[#0b1632] via-[#071024] to-[#040816] border-indigo-500/30' 
            : 'bg-gradient-to-br from-blue-50/90 via-indigo-50/50 to-white border-blue-200 shadow-slate-200'
        }`}>
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 text-amber-600 dark:text-amber-300 border border-amber-400/25 text-xs font-semibold">
              <Award className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              <span>Smart India Hackathon • Problem Statement 26107</span>
            </div>
            <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              {isHi
                ? 'भारतीय मानक ब्यूरो हेतु एकीकृत एआई समाधान'
                : 'AI-Powered Intelligent Assistant for Indian Standards & BIS Services'}
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {isHi
                ? 'इस परियोजना का उद्देश्य भारतीय मानक ब्यूरो (BIS) के 22,000+ मानकों, राजपत्र QCO अधिसूचनाओं और मानकॉन्लाइन पोर्टल प्रक्रियाओं को एक सहज, संवादात्मक और बहुभाषी मंच के माध्यम से उद्योगों, एमएसएमई, स्टार्टअप्स और आम नागरिकों तक सुलभ बनाना है।'
                : 'Developed to empower industries and consumers by eliminating regulatory ambiguity. With Gemini 3.8 Flash intelligence, users query complex standards, generate SIT factory test lists, calculate exact fee concessions, and verify genuine BIS hallmarks instantly.'}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onGetStarted('home')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm transition shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <span>{isHi ? 'गेट स्टार्टेड (साइन इन)' : 'Get Started (Sign In)'}</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>
              <button
                onClick={() => onGetStarted('chat')}
                className={`px-6 py-3 rounded-xl font-semibold text-sm transition border flex items-center gap-2 cursor-pointer ${
                  isDark 
                    ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border-slate-700' 
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 shadow-sm'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{isHi ? 'एआई सहायक अनलॉक करें' : 'Unlock AI Assistant'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. DEDICATED GET STARTED SECTION                                          */}
      {/* ========================================================================= */}
      <section 
        ref={authSectionRef}
        id="get-started" 
        className={`relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t ${
          isDark ? 'border-indigo-500/20' : 'border-slate-200'
        }`}
      >
        <div className={`max-w-xl mx-auto p-6 sm:p-10 rounded-3xl border shadow-2xl space-y-6 text-center ${
          isDark 
            ? 'bg-gradient-to-b from-[#0c1630] to-[#070e20] border-indigo-500/35' 
            : 'bg-white border-slate-200 shadow-slate-200'
        }`}>
          
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-amber-600 p-[1px] mx-auto shadow-md">
            <div className={`w-full h-full rounded-[15px] flex items-center justify-center font-serif font-black text-lg ${
              isDark ? 'bg-[#070e24] text-amber-400' : 'bg-slate-50 text-indigo-900'
            }`}>
              IS
            </div>
          </div>

          <div className="space-y-1.5">
            <h3 className={`text-xl sm:text-2xl font-bold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              {isHi ? 'मानकसेतु शुरू करें' : 'Get Started with ManakSetu'}
            </h3>
            <p className={`text-xs sm:text-sm max-w-sm mx-auto ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              {isHi
                ? 'अपने Google खाते से एक क्लिक में शुरू करें और सभी 22,000+ मानकों व एआई सुविधाओं तक पहुँच प्राप्त करें।'
                : 'Get started instantly using your Google account to access all 22,000+ standards, QCO orders & AI features.'}
            </p>
          </div>

          {/* Secure Sign In & Registration Gateway Button */}
          <button
            onClick={() => onGetStarted('home')}
            className={`w-full h-12 px-5 rounded-xl font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-3 cursor-pointer group border ${
              isDark
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white border-blue-400/40 shadow-blue-950/50'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white border-blue-400/40 shadow-blue-200/60'
            }`}
          >
            <Lock className="w-4 h-4 text-amber-300" />
            <span>
              {isHi ? 'प्रमाणीकरण हेतु साइन इन / रजिस्टर करें' : 'Sign In / Register to Access Portal'}
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Privacy & Authentication Guarantee Notice */}
          <div className={`pt-3 border-t flex items-center justify-center gap-2 text-xs font-medium ${
            isDark ? 'border-slate-800/80 text-slate-400' : 'border-slate-200 text-slate-600'
          }`}>
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>
              {isHi
                ? 'सुरक्षित राष्ट्रीय मानक गेटवे: गोपनीयता एवं बीआईएस मानकॉन्लाइन अनुपालन सुरक्षित'
                : 'Secure National Standards Gateway: Privacy & BIS Compliance Protected'}
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. FOOTER                                                                 */}
      {/* ========================================================================= */}
      <footer className={`w-full border-t py-8 px-4 sm:px-6 lg:px-8 text-center text-xs font-mono space-y-2 transition-colors duration-300 ${
        isDark 
          ? 'bg-[#030612] border-indigo-500/20 text-slate-500' 
          : 'bg-slate-100 border-slate-200 text-slate-600'
      }`}>
        <p>
          © {new Date().getFullYear()} ManakSetu (मानकसेतु) • Smart India Hackathon Problem Statement 26107
        </p>
        <p className={`text-[11px] ${isDark ? 'text-slate-600' : 'text-slate-500'}`}>
          Bureau of Indian Standards Act 2016 • Ministry of Consumer Affairs, Food & Public Distribution • Gazette of India
        </p>
      </footer>
    </div>
  );
};

export default WovenLanding;
