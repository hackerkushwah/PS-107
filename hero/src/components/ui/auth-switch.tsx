import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Mail,
  Lock,
  User,
  Building2,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";

export interface AuthSwitchProps {
  onSuccess?: (email: string) => void;
  onGuestAccess?: () => void;
  onBackToLanding?: () => void;
  isDark?: boolean;
  language?: "en" | "hi";
  className?: string;
}

export const AuthSwitch: React.FC<AuthSwitchProps> = ({
  onSuccess,
  onGuestAccess,
  onBackToLanding,
  isDark = true,
  language = "en",
  className,
}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [role, setRole] = useState("industry");
  const [isLoading, setIsLoading] = useState(false);

  const isHi = language === "hi";

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccess?.(email || "user@standards.nic.in");
    }, 600);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccess?.(email || `${name.toLowerCase().replace(/\s+/g, "") || "user"}@standards.nic.in`);
    }, 700);
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccess?.("google.user@standards.nic.in");
    }, 600);
  };

  return (
    <div
      className={cn(
        "relative w-full max-w-[920px] min-h-[580px] rounded-3xl overflow-hidden transition-all duration-500 shadow-2xl border",
        isDark
          ? "bg-[#071026]/95 border-indigo-500/30 shadow-black/60 text-slate-100"
          : "bg-white border-slate-200/90 shadow-slate-300/70 text-slate-900",
        className
      )}
    >
      {/* Top Mobile Mode Switcher (Visible on small screens) */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-inherit">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-amber-500 p-[1px]">
            <div className="w-full h-full rounded-[7px] bg-[#070e24] flex items-center justify-center font-serif font-black text-amber-400 text-xs">
              IS
            </div>
          </div>
          <span className="font-bold text-sm">ManakSetu</span>
        </div>
        <div className="flex bg-slate-200 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => setIsSignUp(false)}
            className={cn(
              "px-3 py-1 rounded-lg transition-all",
              !isSignUp
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400"
            )}
          >
            {isHi ? "साइन इन" : "Sign In"}
          </button>
          <button
            type="button"
            onClick={() => setIsSignUp(true)}
            className={cn(
              "px-3 py-1 rounded-lg transition-all",
              isSignUp
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400"
            )}
          >
            {isHi ? "रजिस्टर" : "Sign Up"}
          </button>
        </div>
      </div>

      <div className="relative w-full h-full min-h-[540px] flex flex-col md:flex-row">
        
        {/* ========================================================================= */}
        {/* 1. SIGN IN FORM PANEL (Left on desktop)                                   */}
        {/* ========================================================================= */}
        <div
          className={cn(
            "w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-between transition-all duration-700 ease-in-out z-10",
            isSignUp
              ? "md:opacity-0 md:pointer-events-none md:translate-x-[-20px] hidden md:flex"
              : "opacity-100 pointer-events-auto translate-x-0 flex"
          )}
        >
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Smart India Hackathon • PS 26107</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {isHi ? "मानकसेतु में लॉगिन करें" : "Sign In to ManakSetu"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {isHi
                  ? "22,000+ भारतीय मानक एवं एआई अनुपालन पोर्टल तक पहुंचें"
                  : "Access 22,000+ BIS standards & AI regulatory intelligence"}
              </p>
            </div>

            {/* Quick Google Sign In */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className={cn(
                "w-full h-11 px-4 rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-2.5 border transition shadow-sm cursor-pointer",
                isDark
                  ? "bg-slate-900/80 hover:bg-slate-800 border-slate-700/80 text-white"
                  : "bg-white hover:bg-slate-50 border-slate-300 text-slate-800"
              )}
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{isHi ? "Google खाते से साइन इन करें" : "Sign in with Google"}</span>
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-300 dark:border-slate-800 w-full" />
              <span className="bg-transparent px-3 text-[11px] uppercase tracking-wider text-slate-400 font-mono">
                {isHi ? "या ईमेल से" : "or email"}
              </span>
              <div className="border-t border-slate-300 dark:border-slate-800 w-full" />
            </div>

            {/* Form */}
            <form onSubmit={handleSignInSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {isHi ? "ईमेल अथवा मानकॉन्लाइन आईडी" : "Email or Manakonline ID"}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="industry@company.com"
                    className={cn(
                      "w-full h-11 pl-10 pr-4 rounded-xl text-xs sm:text-sm border transition focus:outline-none focus:ring-2 focus:ring-blue-500",
                      isDark
                        ? "bg-slate-900/90 border-slate-700/80 text-white placeholder:text-slate-500"
                        : "bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400"
                    )}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {isHi ? "पासवर्ड" : "Password"}
                  </label>
                  <button
                    type="button"
                    onClick={() => alert("Please use Google Sign-in or Guest Access for quick hackathon review.")}
                    className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    {isHi ? "पासवर्ड भूल गए?" : "Forgot password?"}
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={cn(
                      "w-full h-11 pl-10 pr-10 rounded-xl text-xs sm:text-sm border transition focus:outline-none focus:ring-2 focus:ring-blue-500",
                      isDark
                        ? "bg-slate-900/90 border-slate-700/80 text-white placeholder:text-slate-500"
                        : "bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 hover:scale-[1.01] active:scale-[0.99]"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{isHi ? "पोर्टल में प्रवेश करें" : "Sign In to Portal"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer Guest & Back link */}
          <div className="pt-6 mt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
            {onBackToLanding && (
              <button
                type="button"
                onClick={onBackToLanding}
                className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{isHi ? "लैंडिंग पेज पर लौटें" : "Back to Landing"}</span>
              </button>
            )}
            <button
              type="button"
              onClick={onGuestAccess}
              className="text-amber-600 dark:text-amber-400 font-semibold hover:underline cursor-pointer ml-auto"
            >
              {isHi ? "बिना लॉगिन अतिथि प्रवेश →" : "Continue as Guest →"}
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. SIGN UP FORM PANEL (Right on desktop)                                  */}
        {/* ========================================================================= */}
        <div
          className={cn(
            "w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-between transition-all duration-700 ease-in-out z-10",
            !isSignUp
              ? "md:opacity-0 md:pointer-events-none md:translate-x-[20px] hidden md:flex"
              : "opacity-100 pointer-events-auto translate-x-0 flex"
          )}
        >
          <div className="space-y-5">
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isHi ? "नया उद्यम पंजीकरण" : "New Enterprise Registration"}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {isHi ? "खाता बनाएं" : "Create an Account"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {isHi
                  ? "एमएसएमई, उद्योग अथवा प्रयोगशाला के रूप में जुड़ें"
                  : "Join as MSME, Industry, or Testing Laboratory"}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSignUpSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {isHi ? "पूरा नाम" : "Full Name"}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Rajesh Sharma"
                      className={cn(
                        "w-full h-10 pl-9 pr-3 rounded-xl text-xs border transition focus:outline-none focus:ring-2 focus:ring-blue-500",
                        isDark
                          ? "bg-slate-900/90 border-slate-700/80 text-white placeholder:text-slate-500"
                          : "bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400"
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {isHi ? "संगठन / कंपनी" : "Firm / Enterprise"}
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      placeholder="Apex Tech Pvt Ltd"
                      className={cn(
                        "w-full h-10 pl-9 pr-3 rounded-xl text-xs border transition focus:outline-none focus:ring-2 focus:ring-blue-500",
                        isDark
                          ? "bg-slate-900/90 border-slate-700/80 text-white placeholder:text-slate-500"
                          : "bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400"
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {isHi ? "व्यावसायिक ईमेल" : "Work Email"}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="officer@company.in"
                    className={cn(
                      "w-full h-10 pl-9 pr-3 rounded-xl text-xs border transition focus:outline-none focus:ring-2 focus:ring-blue-500",
                      isDark
                        ? "bg-slate-900/90 border-slate-700/80 text-white placeholder:text-slate-500"
                        : "bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400"
                    )}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {isHi ? "प्राथमिक श्रेणी / भूमिका" : "Enterprise Category / Role"}
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className={cn(
                    "w-full h-10 px-3 rounded-xl text-xs border transition focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer",
                    isDark
                      ? "bg-slate-900 border-slate-700/80 text-white"
                      : "bg-slate-50 border-slate-300 text-slate-900"
                  )}
                >
                  <option value="industry">{isHi ? "उद्योग / निर्माता (Scheme-I ISI)" : "Manufacturer / Industry (Scheme-I ISI)"}</option>
                  <option value="msme">{isHi ? "सूक्ष्म एवं लघु उद्यम (MSME 50% छूट)" : "MSME Startup (50% Marking Fee Rebate)"}</option>
                  <option value="lab">{isHi ? "NABL / BIS मान्यता प्राप्त लैब" : "NABL / BIS Accredited Testing Laboratory"}</option>
                  <option value="consumer">{isHi ? "उपभोक्ता / नागरिक (BIS Care)" : "Consumer / Citizen (BIS Care Verification)"}</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {isHi ? "पासवर्ड बनाएं" : "Create Password"}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 8 characters"
                    className={cn(
                      "w-full h-10 pl-9 pr-10 rounded-xl text-xs border transition focus:outline-none focus:ring-2 focus:ring-blue-500",
                      isDark
                        ? "bg-slate-900/90 border-slate-700/80 text-white placeholder:text-slate-500"
                        : "bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm transition shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 hover:scale-[1.01] active:scale-[0.99]"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{isHi ? "पंजीकरण करें एवं शुरू करें" : "Register & Start Exploring"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-center text-slate-400">
            <span>{isHi ? "पंजीकरण द्वारा आप BIS अधिनियम 2016 दिशानिर्देशों से सहमत होते हैं।" : "By registering, you comply with BIS Act 2016 terms."}</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. ANIMATED SLIDING OVERLAY PANEL (Desktop)                               */}
        {/* ========================================================================= */}
        <div
          className={cn(
            "hidden md:flex absolute top-0 bottom-0 w-1/2 transition-all duration-700 ease-in-out z-20 flex-col justify-between p-10 text-white overflow-hidden shadow-2xl",
            isSignUp
              ? "left-0 bg-gradient-to-br from-emerald-700 via-teal-700 to-indigo-900"
              : "left-1/2 bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900",
            !isDark && !isSignUp && "from-blue-600 via-indigo-600 to-blue-800",
            !isDark && isSignUp && "from-emerald-600 via-teal-600 to-blue-800"
          )}
        >
          {/* Subtle Ambient Watermark & Ring Visual */}
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/5 blur-2xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-white/5 blur-2xl pointer-events-none" />
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center font-serif font-black text-amber-300 text-sm">
                IS
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-tight text-white leading-none">
                  ManakSetu
                </h3>
                <p className="text-[10px] text-white/70 font-mono tracking-wider">
                  Bureau of Indian Standards
                </p>
              </div>
            </div>

            <div className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-amber-300">
              PS 26107
            </div>
          </div>

          {/* Center Dynamic Content */}
          <div className="relative z-10 space-y-4 my-auto py-6">
            {!isSignUp ? (
              <>
                <h3 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
                  {isHi ? "मानकसेतु में नए हैं?" : "New to ManakSetu?"}
                </h3>
                <p className="text-sm text-blue-100/90 leading-relaxed max-w-sm">
                  {isHi
                    ? "अपने उद्योग या एमएसएमई हेतु खाता बनाएं और 22,000+ मानकों, लैब उपकरणों और राजपत्र QCO अधिसूचनाओं का लाभ उठाएं।"
                    : "Register your enterprise to unlock personalized Scheme-I test equipment lists, 50% MSME fee concessions, and instant lab finding."}
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setIsSignUp(true)}
                    className="px-6 py-3 rounded-xl bg-white/15 hover:bg-white/25 active:scale-95 text-white font-semibold text-xs sm:text-sm transition-all border border-white/30 backdrop-blur-md flex items-center gap-2 cursor-pointer shadow-lg group"
                  >
                    <span>{isHi ? "नया खाता बनाएं" : "Create an Account"}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
                  {isHi ? "पहले से खाता है?" : "Already Registered?"}
                </h3>
                <p className="text-sm text-teal-100/90 leading-relaxed max-w-sm">
                  {isHi
                    ? "अपने क्रेडेंशियल्स अथवा Google खाते से लॉगिन करें और अपने प्रमाणीकरण वर्कस्पेस में प्रवेश करें।"
                    : "Sign in with your verified credentials or Google account to continue where you left off in your compliance workspace."}
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setIsSignUp(false)}
                    className="px-6 py-3 rounded-xl bg-white/15 hover:bg-white/25 active:scale-95 text-white font-semibold text-xs sm:text-sm transition-all border border-white/30 backdrop-blur-md flex items-center gap-2 cursor-pointer shadow-lg group"
                  >
                    <span>{isHi ? "लॉगिन पृष्ठ पर जाएं" : "Sign In to Account"}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Bottom Trust Line */}
          <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between text-[11px] text-white/70">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              BIS Act 2016 Compliant
            </span>
            <span>22,000+ Standards</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthSwitch;
