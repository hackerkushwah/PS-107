import React from "react";
import AuthSwitch from "./ui/auth-switch";
import { OriginButton } from "./ui/origin-button";
import { CinematicThemeToggler } from "./ui/cinematic-theme-toggler";
import { Languages, ArrowLeft } from "lucide-react";

export interface AuthPageProps {
  onSuccess: (email: string) => void;
  onBackToLanding: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  language: "en" | "hi";
  setLanguage: (lang: "en" | "hi") => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  onSuccess,
  onBackToLanding,
  isDark,
  onToggleTheme,
  language,
  setLanguage,
}) => {
  const isHi = language === "hi";

  return (
    <div
      className={`fixed inset-0 z-50 overflow-x-hidden overflow-y-auto ${
        isDark ? "bg-[#040814] text-slate-100" : "bg-[#f8fafc] text-slate-900"
      } font-sans transition-colors duration-300 flex flex-col justify-between`}
    >
      {/* Top Header */}
      <header
        className={`sticky top-0 z-40 w-full border-b backdrop-blur-xl transition-colors duration-300 ${
          isDark
            ? "border-indigo-500/20 bg-[#060d1f]/95 text-white shadow-lg shadow-black/30"
            : "border-slate-200/90 bg-white/95 text-slate-900 shadow-sm"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-3">
            {/* Logo */}
            <div
              onClick={onBackToLanding}
              className="flex items-center gap-3 shrink-0 cursor-pointer group"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-amber-600 p-[1px] shadow-md group-hover:scale-105 transition-transform">
                <div
                  className={`w-full h-full rounded-[11px] flex items-center justify-center font-serif font-black text-sm sm:text-base ${
                    isDark ? "bg-[#070e24] text-amber-400" : "bg-slate-50 text-indigo-900"
                  }`}
                >
                  IS
                </div>
              </div>
              <div className="leading-tight">
                <div className="flex items-center gap-2">
                  <h1
                    className={`font-bold text-sm sm:text-base tracking-tight flex items-center gap-1.5 ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    ManakSetu{" "}
                    <span className="text-amber-500 font-serif font-normal text-xs sm:text-sm">
                      (मानकसेतु)
                    </span>
                  </h1>
                  <span className="bg-amber-400/10 text-amber-500 dark:text-amber-300 text-[10px] font-mono px-2 py-0.5 rounded border border-amber-400/25 hidden md:inline font-semibold">
                    PS 26107
                  </span>
                </div>
                <p
                  className={`text-[10px] sm:text-[11px] font-mono tracking-wider truncate ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Bureau of Indian Standards • Authentication Gateway
                </p>
              </div>
            </div>

            {/* Actions: Back button, Language, Theme */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={onBackToLanding}
                className={`h-7 sm:h-8 px-2.5 sm:px-3 rounded-lg text-xs font-medium border transition flex items-center gap-1.5 cursor-pointer ${
                  isDark
                    ? "bg-slate-800/90 hover:bg-slate-700 text-slate-300 border-slate-700"
                    : "bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-xs"
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  {isHi ? "लैंडिंग पेज पर लौटें" : "Back to Landing"}
                </span>
              </button>

              {/* Language Switcher */}
              <OriginButton
                onClick={() => setLanguage(language === "en" ? "hi" : "en")}
                className={`h-7 sm:h-8 px-2.5 sm:px-3 rounded-lg text-xs border transition font-medium flex items-center gap-1.5 cursor-pointer ${
                  isDark
                    ? "bg-slate-800/90 hover:bg-slate-700 text-amber-400 border-slate-700/80"
                    : "bg-slate-100 hover:bg-slate-200 text-indigo-700 border-slate-300"
                }`}
                title="Toggle English / Hindi language"
              >
                <Languages className="w-3.5 h-3.5" />
                <span>{isHi ? "English" : "हिन्दी"}</span>
              </OriginButton>

              {/* Theme Toggler */}
              <CinematicThemeToggler isDark={isDark} onToggle={onToggleTheme} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Center Stage */}
      <main className="relative flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden">
        {/* Ambient Radial Lights */}
        <div
          className="absolute inset-0 pointer-events-none -z-10 blur-3xl opacity-30 dark:opacity-25"
          style={{
            background: isDark
              ? "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.45) 0%, rgba(245, 158, 11, 0.15) 50%, transparent 75%)"
              : "radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.22) 0%, rgba(245, 158, 11, 0.1) 50%, transparent 75%)",
          }}
        />

        <AuthSwitch
          onSuccess={onSuccess}
          onGuestAccess={() => onSuccess("citizen.guest@standards.nic.in")}
          onBackToLanding={onBackToLanding}
          isDark={isDark}
          language={language}
        />
      </main>

      {/* Footer */}
      <footer
        className={`w-full border-t py-4 px-4 sm:px-6 lg:px-8 text-center text-xs font-mono transition-colors duration-300 ${
          isDark
            ? "bg-[#030612] border-indigo-500/20 text-slate-500"
            : "bg-slate-100 border-slate-200 text-slate-600"
        }`}
      >
        <p>
          © {new Date().getFullYear()} ManakSetu (मानकसेतु) • Smart India Hackathon Problem Statement 26107
        </p>
      </footer>
    </div>
  );
};

export default AuthPage;
