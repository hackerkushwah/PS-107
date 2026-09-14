import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { HomeDashboard } from './components/HomeDashboard';
import { ChatAssistant } from './components/ChatAssistant';
import { StandardsExplorer } from './components/StandardsExplorer';
import { SpecAnalyzer } from './components/SpecAnalyzer';
import { LicenseCalculator } from './components/LicenseCalculator';
import { LabFinder } from './components/LabFinder';
import { ConsumerVerify } from './components/ConsumerVerify';
import { StandardDetailModal } from './components/StandardDetailModal';
import { QuickSearchModal } from './components/QuickSearchModal';
import { IndianStandard } from './types';
import { ShieldAlert, ExternalLink } from 'lucide-react';
import { SideFlankDecorations } from './components/SideFlankDecorations';
import { applyTheme } from '@/components/ui/cinematic-theme-toggler';
import { WovenLanding } from './components/WovenLanding';
import { AuthPage } from './components/AuthPage';

// Initialise theme on first load (before first paint)
const storedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialDark = storedTheme !== null ? storedTheme === 'dark' : prefersDark;
applyTheme(initialDark);

export type AppView = 'landing' | 'auth' | 'portal';

const getInitialView = (): AppView => {
  if (typeof window !== 'undefined') {
    // Check sessionStorage so within the active browser session state is kept,
    // but closing the browser tab/window or restarting opens fresh at 'landing'.
    const sessionView = sessionStorage.getItem('manak_current_view') as AppView | null;
    if (sessionView === 'landing' || sessionView === 'auth' || sessionView === 'portal') {
      return sessionView;
    }
  }

  // Always default to landing on a fresh start
  return 'landing';
};

export default function App() {
  const [activeTab, setActiveTab] = useState<string>(() => {
    return localStorage.getItem('manak_active_tab') || 'home';
  });
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [selectedStandard, setSelectedStandard] = useState<IndianStandard | null>(null);
  const [isQuickSearchOpen, setIsQuickSearchOpen] = useState(false);
  const [chatInitialPrompt, setChatInitialPrompt] = useState<string | undefined>(undefined);
  const [isDark, setIsDark] = useState<boolean>(initialDark);
  
  // Navigation Flow: Landing -> Animated Auth -> Portal Workspace
  // Persist current view across refreshes: landing stays landing, auth stays auth, portal stays portal
  const [userEmail, setUserEmail] = useState<string | null>(() => localStorage.getItem('manak_user'));
  const [currentView, setCurrentView] = useState<AppView>(getInitialView);

  const showLanding = currentView === 'landing';
  const showAuth = currentView === 'auth';

  // Persist active tab across refreshes
  useEffect(() => {
    localStorage.setItem('manak_active_tab', activeTab);
  }, [activeTab]);

  // Sync current view to sessionStorage and update URL hash for seamless browser history
  useEffect(() => {
    sessionStorage.setItem('manak_current_view', currentView);
    localStorage.removeItem('manak_current_view'); // clear obsolete localStorage persistence

    if (currentView === 'landing') {
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    } else if (currentView === 'auth') {
      if (window.location.hash !== '#auth') {
        window.history.replaceState(null, '', '#auth');
      }
    } else if (currentView === 'portal') {
      if (window.location.hash !== '#portal') {
        window.history.replaceState(null, '', '#portal');
      }
    }
  }, [currentView]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#auth' || hash === '#signin' || hash === '#signup') {
        setCurrentView('auth');
      } else if (hash === '#portal' || hash === '#app' || hash === '#home') {
        setCurrentView('portal');
      } else if (hash === '#landing' || hash === '') {
        setCurrentView('landing');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Keep <html> class in sync whenever isDark changes
  useEffect(() => {
    applyTheme(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark((d) => !d);

  // Flow handlers
  const handleGetStarted = (targetTab?: string) => {
    if (targetTab) {
      setActiveTab(targetTab);
    }
    setCurrentView('auth');
  };

  const handleAuthSuccess = (email: string) => {
    setUserEmail(email);
    localStorage.setItem('manak_user', email);
    setCurrentView('portal');
  };

  const handleEnterApp = (email?: string, targetTab?: string) => {
    if (targetTab) {
      setActiveTab(targetTab);
    }
    // Privacy & Security: Require authentication before entering portal
    if (!email && !userEmail) {
      setCurrentView('auth');
      return;
    }
    if (email) {
      setUserEmail(email);
      localStorage.setItem('manak_user', email);
    }
    setCurrentView('portal');
  };

  const handleSignOut = () => {
    setUserEmail(null);
    localStorage.removeItem('manak_user');
    setCurrentView('landing');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
  };

  const lastConsultRef = useRef<{ prompt: string; time: number }>({ prompt: '', time: 0 });

  const handleConsultAI = (promptOrCode: string) => {
    const now = Date.now();
    if (
      lastConsultRef.current.prompt === promptOrCode &&
      now - lastConsultRef.current.time < 1200
    ) {
      setActiveTab('chat');
      return;
    }
    lastConsultRef.current = { prompt: promptOrCode, time: now };

    const formattedPrompt = promptOrCode.startsWith('Give me') || promptOrCode.startsWith('How') || promptOrCode.startsWith('Tell me')
      ? promptOrCode
      : `Provide comprehensive BIS guidance for ${promptOrCode}: applicable Quality Control Orders (QCO), certification scheme, key test parameters, in-house laboratory equipment, and Manakonline licensing steps.`;

    setChatInitialPrompt(formattedPrompt);
    setActiveTab('chat');
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-50 dark:bg-[#060d1a] text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white relative transition-colors duration-300">
      {/* 1. Landing Page View (Completely isolated) */}
      {currentView === 'landing' && (
        <WovenLanding
          onEnterApp={handleEnterApp}
          onGetStarted={handleGetStarted}
          language={language}
          setLanguage={setLanguage}
          isDark={isDark}
          onToggleTheme={toggleTheme}
        />
      )}

      {/* 2. Authentication Page View (Completely isolated) */}
      {currentView === 'auth' && (
        <AuthPage
          onSuccess={handleAuthSuccess}
          onBackToLanding={handleBackToLanding}
          isDark={isDark}
          onToggleTheme={toggleTheme}
          language={language}
          setLanguage={setLanguage}
        />
      )}

      {/* 3. Main Portal UI (Completely isolated from Landing and Auth) */}
      {currentView === 'portal' && (
        <>
          {/* Decorative Subtle Background Visuals Filling the Empty Left & Right Margins */}
          <SideFlankDecorations />

          {/* Global Navigation Header */}
          <div className="relative z-10">
            <Header
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              language={language}
              setLanguage={setLanguage}
              onOpenQuickSearch={() => setIsQuickSearchOpen(true)}
              isDark={isDark}
              onToggleTheme={toggleTheme}
              userEmail={userEmail}
              onOpenLanding={() => setCurrentView('auth')}
              onGoToLanding={handleBackToLanding}
              onSignOut={handleSignOut}
            />
          </div>

          {/* Live QCO Alert & Announcement Ribbon */}
          <div className="relative z-10 bg-amber-50/90 dark:bg-amber-950/30 border-b border-amber-200/80 dark:border-amber-800/40 px-3 sm:px-6 lg:px-8 py-1.5 text-xs text-amber-950 dark:text-amber-200 transition-colors duration-300">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 overflow-hidden">
              <div className="flex items-center gap-2 font-medium shrink-0">
                <span className="bg-amber-200 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shrink-0">
                  <ShieldAlert className="w-3 h-3 text-amber-800" />
                  Latest QCOs
                </span>
                <span className="hidden sm:inline text-[11px] text-slate-700 dark:text-slate-300">Bureau of Indian Standards Quality Orders</span>
              </div>

              <div className="truncate text-slate-700 dark:text-slate-400 text-[11px]">
                <span>
                  <strong>DPIIT / MeitY Gazette Orders:</strong> Mandatory QCO enforced for Toys (IS 9873), Footwear (IS 15298), Batteries (IS 16046), and Steel (IS 1786). Micro enterprises eligible for 50% marking fee concession.
                </span>
              </div>

              <button
                onClick={() => setActiveTab('standards')}
                className="text-blue-700 hover:text-blue-900 font-semibold text-[11px] shrink-0 hover:underline hidden md:inline"
              >
                Browse QCOs →
              </button>
            </div>
          </div>

      {/* Main Workspace Area */}
      <main className={`relative z-10 flex-1 max-w-7xl w-full mx-auto ${activeTab === 'chat' ? 'p-2 sm:p-3 lg:p-4' : 'p-3 sm:p-5 lg:p-6'}`}>
        {activeTab === 'home' && (
          <HomeDashboard
            language={language}
            onNavigateTab={(tab) => setActiveTab(tab)}
            onSelectStandard={(std) => setSelectedStandard(std)}
            onAskAI={(prompt) => handleConsultAI(prompt)}
          />
        )}

        {activeTab === 'chat' && (
          <ChatAssistant
            language={language}
            onSelectStandard={(std) => setSelectedStandard(std)}
            initialPrompt={chatInitialPrompt}
            onClearInitialPrompt={() => setChatInitialPrompt(undefined)}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'standards' && (
          <StandardsExplorer
            language={language}
            onSelectStandard={(std) => setSelectedStandard(std)}
            onAskAIAboutStandard={(code) => handleConsultAI(code)}
          />
        )}

        {activeTab === 'analyzer' && (
          <SpecAnalyzer
            language={language}
            onConsultAI={(prompt) => handleConsultAI(prompt)}
            onNavigateToCalculator={() => setActiveTab('calculator')}
            onSelectStandard={(std) => setSelectedStandard(std)}
          />
        )}

        {activeTab === 'calculator' && (
          <LicenseCalculator
            language={language}
            onConsultAI={(prompt) => handleConsultAI(prompt)}
          />
        )}

        {activeTab === 'labs' && (
          <LabFinder
            language={language}
            onConsultAI={(query) => handleConsultAI(query)}
          />
        )}

        {activeTab === 'verify' && (
          <ConsumerVerify
            language={language}
            onConsultAI={(query) => handleConsultAI(query)}
          />
        )}
      </main>

      {/* Standard Detail Modal */}
      <StandardDetailModal
        standard={selectedStandard}
        onClose={() => setSelectedStandard(null)}
        language={language}
        onConsultAI={(code) => handleConsultAI(code)}
      />

      {/* Quick Search Keyboard Modal */}
      <QuickSearchModal
        isOpen={isQuickSearchOpen}
        onClose={() => setIsQuickSearchOpen(false)}
        onSelectStandard={(std) => setSelectedStandard(std)}
        onAskAI={(code) => handleConsultAI(code)}
      />

      {/* Official Government / BIS Portal Footer */}
      <footer className="relative z-10 bg-slate-900 text-slate-400 border-t border-slate-800 text-xs py-8 mt-12 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Column 1 */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <span className="font-serif text-amber-400">IS</span>
                <span>ManakSetu (मानकसेतु)</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                National AI Assistant addressing Problem Statement 26107: Intelligent Assistant for Indian Standards and BIS Services for Industries, MSMEs, and Consumers.
              </p>
              <div className="pt-1 text-[11px] text-amber-400 font-mono">
                Ministry of Consumer Affairs, Food & Public Distribution
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-2">
              <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Official BIS Portals</h4>
              <ul className="space-y-1.5 text-[11px]">
                <li>
                  <a href="https://www.manakonline.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition flex items-center gap-1">
                    Manakonline (e-BIS Portal) <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a href="https://www.crsbis.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition flex items-center gap-1">
                    CRS Portal (Electronics/IT) <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a href="https://www.services.bis.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition flex items-center gap-1">
                    Know Your Standards (KYS) <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a href="https://bis.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition flex items-center gap-1">
                    Bureau of Indian Standards Official <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div className="space-y-2">
              <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Citizen & Industry Services</h4>
              <ul className="space-y-1.5 text-[11px]">
                <li className="cursor-pointer hover:text-white" onClick={() => setActiveTab('verify')}>
                  Verify CML License Number
                </li>
                <li className="cursor-pointer hover:text-white" onClick={() => setActiveTab('verify')}>
                  Verify Gold Jewellery HUID
                </li>
                <li className="cursor-pointer hover:text-white" onClick={() => setActiveTab('calculator')}>
                  50% MSME Marking Fee Concession
                </li>
                <li className="cursor-pointer hover:text-white" onClick={() => setActiveTab('labs')}>
                  Empaneled NABL Test Labs
                </li>
              </ul>
            </div>

            {/* Column 4 */}
            <div className="space-y-2">
              <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Consumer Assistance</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Download the official <strong>BIS Care Mobile App</strong> from Google Play Store or Apple App Store to scan HUID codes or report counterfeit ISI marks.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-[11px] text-slate-300">
                <span className="font-semibold text-white">National Consumer Helpline:</span> 1915 or 1800-11-4000
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
            <p>© {new Date().getFullYear()} ManakSetu • AI-powered Assistant for Bureau of Indian Standards (Problem Statement 26107)</p>
            <p className="text-slate-400">Grounded in the Bureau of Indian Standards Act, 2016 and Quality Control Orders</p>
          </div>
        </div>
      </footer>
        </>
      )}
    </div>
  );
}
