import React from 'react';
import { Home, Sparkles, BookOpen, Search, Languages, Building2, CheckCircle2, Award } from 'lucide-react';
import { OriginButton } from '@/components/ui/origin-button';
import { CinematicThemeToggler } from '@/components/ui/cinematic-theme-toggler';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  onOpenQuickSearch: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  userEmail?: string | null;
  onOpenLanding?: () => void;
  onGoToLanding?: () => void;
  onSignOut?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  onOpenQuickSearch,
  isDark,
  onToggleTheme,
  userEmail,
  onOpenLanding,
  onGoToLanding,
  onSignOut,
}) => {
  const isHi = language === 'hi';

  const navItems = [
    { id: 'home', label: isHi ? 'होम' : 'Home', icon: Home },
    { id: 'chat', label: isHi ? 'एआई सहायक' : 'AI Assistant', icon: Sparkles },
    { id: 'standards', label: isHi ? 'मानक एवं QCO' : 'Standards & QCO', icon: BookOpen },
    { id: 'analyzer', label: isHi ? 'स्पेसिफिकेशन विश्लेषक' : 'Spec Analyzer', icon: Building2 },
    { id: 'calculator', label: isHi ? 'लाइसेंस एवं शुल्क' : 'License & Fees', icon: Award },
    { id: 'labs', label: isHi ? 'प्रयोगशालाएं' : 'Lab Finder', icon: Search },
    { id: 'verify', label: isHi ? 'बीआईएस केयर सत्यापन' : 'BIS Care Verify', icon: CheckCircle2 },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-md">
      {/* Top Gov/BIS Ribbon - Minimized height while preserving all content */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-orange-600 text-slate-950 text-[10px] sm:text-[11px] py-0.5 px-3 sm:px-6 lg:px-8 font-semibold leading-normal">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <span className="bg-slate-950 text-amber-300 text-[9px] px-1.5 py-0.2 rounded font-mono uppercase tracking-wider shrink-0">
              Problem Statement 26107
            </span>
            <span className="hidden sm:inline truncate">Bureau of Indian Standards (BIS) & Indian Standards Intelligent Ecosystem</span>
          </div>
          <div className="flex items-center gap-3 text-[10px] sm:text-[11px] font-medium shrink-0">
            <span className="hidden md:inline">Govt. of India Quality Mission</span>
            <span className="text-slate-950/90 font-mono text-[10px]">Manakonline • CRS • BIS Care</span>
          </div>
        </div>
      </div>

      {/* Main Bar - Reduced height to minimize upper bar size */}
      <div className="w-full px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-11 sm:h-12">
          {/* Logo & Branding */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <OriginButton
              onClick={() => setActiveTab('home')}
              className="w-7 h-7 sm:w-8 sm:h-8 px-0 py-0 min-w-0 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-xs border border-blue-400/30 hover:opacity-90 transition shrink-0"
              title="Go to Home"
            >
              <span className="font-serif font-black text-amber-400 text-xs sm:text-sm tracking-tight">IS</span>
            </OriginButton>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('home')}
                className="text-left flex items-center gap-1.5 group"
              >
                <h1 className="font-bold text-sm sm:text-base tracking-tight text-white group-hover:text-amber-300 transition flex items-center gap-1">
                  ManakSetu <span className="text-amber-400 font-serif font-normal text-xs sm:text-sm">(मानकसेतु)</span>
                </h1>
              </button>
              <span className="bg-blue-500/20 text-blue-300 text-[10px] font-medium px-1.5 py-0.2 rounded border border-blue-500/30 hidden sm:inline">
                AI BIS Assistant
              </span>
              <span className="text-slate-500 hidden lg:inline text-xs">•</span>
              <p className="text-[11px] text-slate-400 hidden lg:block truncate">
                {isHi ? 'भारतीय मानक एवं बीआईएस सेवाओं हेतु बुद्धिमान मंच' : 'Intelligent Assistant for Indian Standards, QCOs & BIS Services'}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <OriginButton
              onClick={onOpenQuickSearch}
              className="h-7 px-3 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs border border-slate-700/80 transition flex items-center gap-2"
              title="Search standard by IS code, product, or keyword"
            >
              <Search className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">{isHi ? 'मानक खोजें...' : 'Quick IS Search...'}</span>
              <kbd className="hidden lg:inline bg-slate-900 text-slate-400 px-1 py-0.2 rounded text-[9px] border border-slate-700 font-mono">
                ⌘K
              </kbd>
            </OriginButton>

            {/* Language Switcher */}
            <OriginButton
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="h-7 px-3 rounded-md bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs border border-slate-700/80 transition font-medium flex items-center gap-1.5"
              title="Toggle English / Hindi language"
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{isHi ? 'EN' : 'हिन्दी'}</span>
            </OriginButton>

            {/* Cinematic Theme Toggler */}
            <CinematicThemeToggler
              isDark={isDark}
              onToggle={onToggleTheme}
            />

            {/* Return to Landing Page Button */}
            {onGoToLanding && (
              <OriginButton
                onClick={onGoToLanding}
                className="h-7 px-2.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs border border-slate-700/80 transition flex items-center gap-1.5"
                title={isHi ? 'मुख्य लैंडिंग पृष्ठ' : 'Go to Landing Page'}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline font-medium">{isHi ? 'लैंडिंग' : 'Landing'}</span>
              </OriginButton>
            )}

            {/* User Account / Landing Page Toggle */}
            {userEmail ? (
              <OriginButton
                onClick={onSignOut}
                className="h-7 px-2.5 rounded-md bg-slate-800 hover:bg-rose-950/60 text-slate-300 hover:text-rose-300 text-xs border border-slate-700/80 transition flex items-center gap-1.5"
                title={`Signed in as ${userEmail}. Click to sign out`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="hidden sm:inline font-mono text-[11px] truncate max-w-[110px]">{userEmail.split('@')[0]}</span>
                <span className="text-[10px] text-slate-400 sm:text-slate-500 hover:text-rose-400 ml-0.5">✕</span>
              </OriginButton>
            ) : (
              <OriginButton
                onClick={onOpenLanding}
                className="h-7 px-3 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-xs border border-blue-400/40 shadow-xs transition flex items-center gap-1.5"
                title="Open Landing / Sign in"
              >
                <span>{isHi ? 'साइन इन' : 'Sign In'}</span>
              </OriginButton>
            )}
          </div>
        </div>

        {/* Navigation Tabs - Sleek, compact height with Home button placed first */}
        <nav className="w-full flex items-center justify-between gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-1 border-t border-slate-800/80">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <OriginButton
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex-1 min-w-fit h-8 px-3.5 sm:px-4 rounded-lg text-xs sm:text-[13px] font-medium whitespace-nowrap transition flex items-center justify-center gap-1.5 border-0 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs font-semibold dark:bg-blue-600 dark:text-white'
                    : 'bg-transparent text-slate-300 hover:text-white hover:bg-slate-800/80 dark:bg-transparent dark:text-slate-300'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </OriginButton>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
