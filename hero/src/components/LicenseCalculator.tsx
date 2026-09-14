import React, { useState, useEffect } from 'react';
import {
  Calculator,
  Search,
  Sparkles,
  CheckCircle2,
  Clock,
  TrendingDown,
  FileText,
  ShieldCheck,
  ExternalLink,
  Copy,
  Check,
  Building2,
  Lightbulb,
  AlertCircle,
  ArrowRight,
  Layers,
  XCircle,
  AlertTriangle,
} from 'lucide-react';
import { LicensingCostBreakdown } from '../types';
import { OriginButton } from '@/components/ui/origin-button';

interface LicenseCalculatorProps {
  language: 'en' | 'hi';
  onConsultAI: (query: string) => void;
}

const POPULAR_PRODUCTS = [
  { label: 'Packaged Drinking Water', query: 'Packaged Drinking Water', isCode: 'IS 14543' },
  { label: 'Two-Wheeler Helmet', query: 'Two-Wheeler Crash Helmet', isCode: 'IS 4151' },
  { label: 'LED Bulb', query: 'Self-Ballasted LED Bulb', isCode: 'IS 16102' },
  { label: 'Electric Wire / Cable', query: 'PVC Insulated Electric Cable', isCode: 'IS 694' },
  { label: 'Children Toys', query: 'Children Toys', isCode: 'IS 9873' },
  { label: 'Power Bank / Battery', query: 'Rechargeable Power Bank (CRS)', isCode: 'IS 16046' },
  { label: 'Safety Footwear', query: 'Leather Safety Footwear', isCode: 'IS 15844' },
  { label: 'Gold Jewellery', query: 'Gold Jewellery Hallmarking', isCode: 'IS 1417' },
];

export const LicenseCalculator: React.FC<LicenseCalculatorProps> = ({ language, onConsultAI }) => {
  const isHi = language === 'hi';

  // Empty by default - No prefilled text!
  const [productInput, setProductInput] = useState<string>('');
  const [enterpriseType, setEnterpriseType] = useState<'micro' | 'small' | 'medium' | 'large'>('micro');
  const [isStartup, setIsStartup] = useState<boolean>(false);
  const [isWomanOrSCST, setIsWomanOrSCST] = useState<boolean>(false);
  const [costData, setCostData] = useState<LicensingCostBreakdown | null>(null);
  const [isExamining, setIsExamining] = useState<boolean>(false);
  const [copiedQuote, setCopiedQuote] = useState<boolean>(false);

  const examineAndCalculate = async (queryToUse?: string) => {
    const q = (queryToUse !== undefined ? queryToUse : productInput).trim();
    if (!q) return;

    setIsExamining(true);
    try {
      const res = await fetch('/api/license-calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productQuery: q,
          enterpriseType,
          isStartup,
          isWomanOrSCST,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setCostData(data);
      }
    } catch (err) {
      console.error('Failed to calculate license cost:', err);
    } finally {
      setIsExamining(false);
    }
  };

  // Recalculate when enterprise settings change (only if already examined a certifiable product)
  useEffect(() => {
    if (costData && costData.isCertifiable && productInput.trim()) {
      examineAndCalculate(productInput);
    }
  }, [enterpriseType, isStartup, isWomanOrSCST]);

  const handleSelectPopular = (query: string) => {
    setProductInput(query);
    examineAndCalculate(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      examineAndCalculate();
    }
  };

  const copyQuotation = () => {
    if (!costData || !costData.isCertifiable) return;
    const text = `=== OFFICIAL BIS LICENSING SUMMARY & COST ESTIMATE ===
Product: ${costData.productName}
Standard: ${costData.standardCode}
Scheme: ${costData.scheme}
Legal Status: ${costData.isMandatoryQCO ? `Mandatory under ${costData.qcoName || 'QCO'}` : 'Voluntary Standard'}
Enterprise Category: ${enterpriseType.toUpperCase()} (${costData.concessionPercentage}% Statutory Concession)

REAL-WORLD STATUTORY FEE BREAKDOWN:
1. Application Fee: ₹${costData.applicationFee.toLocaleString()}
2. Factory Audit / Inspection: ₹${costData.inspectionFee.toLocaleString()}
3. Independent Lab Sample Testing: ₹${costData.labTestingFeeEstimate.toLocaleString()}
4. Minimum Marking Fee (Govt Royalty): ₹${costData.markingFeeBase.toLocaleString()} (Base)
   - MSME Concession: -₹${costData.concessionAmount.toLocaleString()} (${costData.concessionPercentage}% discount)
5. Annual License Maintenance: ₹${costData.annualLicenseFee.toLocaleString()}
--------------------------------------------------
Subtotal (Govt + Lab): ₹${costData.netEstimatedCost.toLocaleString()}
GST (18%): ₹${costData.gstAmount.toLocaleString()}
TOTAL YEAR 1 COST: ₹${costData.totalWithGst.toLocaleString()}
(Your Savings vs Large Industry: ₹${costData.msmeSavings.toLocaleString()})
--------------------------------------------------
Estimated Timeline: ${costData.timelineWeeks}
Official Portal: https://manakonline.in`;

    navigator.clipboard.writeText(text);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 2500);
  };

  return (
    <div className="w-full space-y-6">
      {/* Friendly Search Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-4 h-4" />
            <span>Smart License Examiner & Fee Calculator</span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            Authentic BIS Standards • Zero Fabricated Data
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          {isHi ? 'अपने उत्पाद का बीआईएस लाइसेंस एवं वास्तविक खर्च जानें' : 'Examine Any Product & Calculate BIS Licensing Cost'}
        </h2>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
          {isHi
            ? 'उत्पाद का नाम लिखें। हमारा एआई जांच करेगा कि क्या उत्पाद बीआईएस के अंतर्गत प्रमाणित होता है, लागू मानक (IS कोड) की पहचान करेगा और वास्तविक सरकारी खर्च बताएगा।'
            : 'Type any product you want to manufacture. Our system examines whether it is covered under Bureau of Indian Standards (BIS), identifies the exact Indian Standard, and calculates official statutory fees.'}
        </p>

        {/* Product Search & Input Box */}
        <div className="pt-2">
          <div className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={productInput}
                onChange={(e) => setProductInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type any product (e.g. LED Bulb, Helmet, Water, Toys, Electric Iron, Cement, Plywood...)"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-11 pr-4 py-3 text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition placeholder:font-normal placeholder:text-slate-400"
              />
              {productInput && (
                <button
                  type="button"
                  onClick={() => {
                    setProductInput('');
                    setCostData(null);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs px-1.5 py-0.5 rounded bg-slate-200/60"
                >
                  Clear
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => examineAndCalculate()}
              disabled={isExamining || !productInput.trim()}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition shrink-0 cursor-pointer"
            >
              {isExamining ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
                  <span>Examining...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Examine & Calculate</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Product Suggestions */}
          <div className="mt-3 flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-slate-500 font-medium mr-1">Popular Examples:</span>
            {POPULAR_PRODUCTS.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleSelectPopular(item.query)}
                className={`text-xs px-2.5 py-1 rounded-lg border transition cursor-pointer ${
                  productInput.toLowerCase().includes(item.label.toLowerCase())
                    ? 'bg-blue-50 border-blue-400 text-blue-900 font-bold'
                    : 'bg-slate-100/70 border-slate-200 text-slate-700 hover:bg-slate-200/80'
                }`}
              >
                <span>{item.label}</span>
                <span className="ml-1 text-[10px] text-slate-400 font-mono">({item.isCode})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Enterprise Scale Selector */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Your Enterprise Scale (for Government Concessions)</span>
            </span>
            <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Micro / Startups get 50% statutory rebate
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => setEnterpriseType('micro')}
              className={`p-3 rounded-xl border text-left transition flex items-center justify-between cursor-pointer ${
                enterpriseType === 'micro'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div>
                <div className="font-bold text-xs sm:text-sm">Micro Enterprise</div>
                <div className={`text-xs ${enterpriseType === 'micro' ? 'text-blue-100' : 'text-slate-500'}`}>
                  Turnover &lt; ₹5 Crore (Udyam)
                </div>
              </div>
              <span
                className={`text-xs font-black px-2 py-1 rounded ${
                  enterpriseType === 'micro' ? 'bg-amber-300 text-slate-950 font-bold' : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                50% OFF
              </span>
            </button>

            <button
              type="button"
              onClick={() => setEnterpriseType('small')}
              className={`p-3 rounded-xl border text-left transition flex items-center justify-between cursor-pointer ${
                enterpriseType === 'small'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div>
                <div className="font-bold text-xs sm:text-sm">Small Enterprise</div>
                <div className={`text-xs ${enterpriseType === 'small' ? 'text-blue-100' : 'text-slate-500'}`}>
                  Turnover &lt; ₹50 Crore (Udyam)
                </div>
              </div>
              <span
                className={`text-xs font-black px-2 py-1 rounded ${
                  enterpriseType === 'small' ? 'bg-amber-300 text-slate-950 font-bold' : 'bg-blue-100 text-blue-800'
                }`}
              >
                20% OFF
              </span>
            </button>

            <button
              type="button"
              onClick={() => setEnterpriseType('medium')}
              className={`p-3 rounded-xl border text-left transition flex items-center justify-between cursor-pointer ${
                enterpriseType === 'medium' || enterpriseType === 'large'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div>
                <div className="font-bold text-xs sm:text-sm">Medium / Large</div>
                <div className={`text-xs ${enterpriseType === 'medium' || enterpriseType === 'large' ? 'text-blue-100' : 'text-slate-500'}`}>
                  Turnover &gt; ₹50 Crore
                </div>
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded ${
                  enterpriseType === 'medium' || enterpriseType === 'large' ? 'bg-blue-800 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                Standard
              </span>
            </button>
          </div>

          <div className="mt-2.5 flex items-center gap-4 text-xs text-slate-600">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={isStartup}
                onChange={(e) => setIsStartup(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <span>DPIIT Recognized Startup (50% Concession)</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={isWomanOrSCST}
                onChange={(e) => setIsWomanOrSCST(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <span>Woman / SC-ST Entrepreneur</span>
            </label>
          </div>
        </div>
      </div>

      {/* Loading state indicator */}
      {isExamining && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center space-y-2">
          <Sparkles className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
          <p className="text-sm font-bold text-blue-950">Examining official Bureau of Indian Standards regulations...</p>
          <p className="text-xs text-blue-700">Checking whether this product has an active published Indian Standard (IS Code), mandatory QCO status, or if it is regulated by other authorities.</p>
        </div>
      )}

      {/* Empty State when no product searched yet */}
      {!costData && !isExamining && (
        <div className="bg-slate-50/70 border border-dashed border-slate-300 rounded-2xl p-8 sm:p-10 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Ready to Examine Your Product & Calculate Real Fees
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Enter the commercial product you plan to manufacture in the search bar above, or click one of the popular example chips to see authentic Indian Standards, official licensing steps, and government fees.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => handleSelectPopular('Packaged Drinking Water')}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-blue-300 text-xs font-semibold text-slate-700 shadow-2xs transition"
            >
              Try "Packaged Drinking Water"
            </button>
            <button
              type="button"
              onClick={() => handleSelectPopular('Two-Wheeler Crash Helmet')}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-blue-300 text-xs font-semibold text-slate-700 shadow-2xs transition"
            >
              Try "Two-Wheeler Helmet"
            </button>
            <button
              type="button"
              onClick={() => handleSelectPopular('Self-Ballasted LED Bulb')}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-blue-300 text-xs font-semibold text-slate-700 shadow-2xs transition"
            >
              Try "LED Bulb"
            </button>
          </div>
        </div>
      )}

      {/* NON-CERTIFIABLE / OUTSIDE BIS PURVIEW ALERT (e.g. nuclear bomb, weapons, drugs, non-standard items) */}
      {costData && costData.isCertifiable === false && !isExamining && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-rose-200 shadow-xs space-y-5">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
              <XCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider bg-rose-100 text-rose-800 px-2.5 py-0.5 rounded">
                  Not Covered Under BIS Commercial Licensing
                </span>
                <span className="text-xs text-slate-400 font-mono">Real-Time Verification</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                "{costData.productName || productInput}" cannot be certified under BIS
              </h3>
            </div>
          </div>

          {/* Genuine Explanation Box */}
          <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-4 sm:p-5 space-y-3">
            <div className="text-xs text-rose-950 leading-relaxed font-medium">
              {costData.nonCertifiableReason}
            </div>

            {costData.regulatoryAuthority && (
              <div className="pt-2 border-t border-rose-200/80 flex items-center gap-2 text-xs">
                <span className="text-slate-500 font-semibold">Governing Authority / Ministry:</span>
                <span className="font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-rose-200">
                  {costData.regulatoryAuthority}
                </span>
              </div>
            )}
          </div>

          {/* Truthfulness Guarantee */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>No Fake Fees Generated:</strong> Because this item is outside the jurisdiction of commercial Bureau of Indian Standards (BIS) certification, zero synthetic fees, application forms, or fake ISI marks are presented.
            </div>
          </div>

          {/* Suggested Authentic Products */}
          {costData.suggestedValidProducts && costData.suggestedValidProducts.length > 0 && (
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Looking for certifiable commercial products? Try these:
              </h4>
              <div className="flex flex-wrap gap-2">
                {costData.suggestedValidProducts.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleSelectPopular(item.split('(')[0].trim())}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-50 text-blue-900 border border-blue-200 hover:bg-blue-100 transition cursor-pointer"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* VALID CERTIFIABLE PRODUCT RESULTS */}
      {costData && costData.isCertifiable !== false && !isExamining && (
        <div className="space-y-6">
          {/* Product Identification Banner */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold bg-amber-400 text-slate-950 px-2.5 py-1 rounded">
                  {costData.standardCode}
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-800 text-slate-200 border border-slate-700">
                  {costData.scheme}
                </span>
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded ${
                    costData.isMandatoryQCO
                      ? 'bg-rose-950 text-rose-300 border border-rose-800'
                      : 'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}
                >
                  {costData.isMandatoryQCO ? 'Compulsory Under Government QCO' : 'Voluntary Indian Standard'}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{costData.productName}</h3>
              <p className="text-xs text-slate-400">
                Official Reference: <span className="text-slate-200">{costData.officialReference}</span>
              </p>
            </div>

            <div className="shrink-0 flex items-center sm:flex-col items-start sm:items-end gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
              <span className="text-xs text-slate-400">Government Portal:</span>
              <a
                href={costData.scheme.includes('CRS') ? 'https://www.crsbis.in' : 'https://www.manakonline.in'}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-amber-300 hover:text-amber-200 hover:underline bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700"
              >
                <span>{costData.scheme.includes('CRS') ? 'crsbis.in' : 'manakonline.in'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Licensing Process: 4 Clear, Visual Steps */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-600" />
                  <span>The 4-Step Licensing Process</span>
                </h3>
                <p className="text-xs text-slate-500">
                  How your factory moves from application to obtaining the official ISI / BIS license mark.
                </p>
              </div>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Estimated Time: {costData.timelineWeeks}</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {(costData.processSteps || []).map((step, idx) => (
                <div
                  key={step.stepNumber || idx + 1}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                        {step.stepNumber || idx + 1}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-200/80 px-2 py-0.5 rounded">
                        {step.where}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">{step.title}</h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing & Fee Breakdown */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
            {/* Top Total Box */}
            <div className="bg-gradient-to-br from-slate-50 to-blue-50/40 rounded-xl p-5 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Estimated Total Outlay (Year 1)
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900 font-mono tracking-tight">
                    ₹{costData.totalWithGst.toLocaleString()}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">(Includes 18% GST)</span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Covers application filing, factory audit, independent lab sample testing, and first year ISI marking fee.
                </p>
              </div>

              {costData.msmeSavings > 0 ? (
                <div className="bg-emerald-100/80 border border-emerald-300 rounded-xl p-3.5 text-left sm:text-right shrink-0">
                  <div className="text-xs font-bold text-emerald-900 flex items-center sm:justify-end gap-1.5">
                    <TrendingDown className="w-4 h-4 text-emerald-700" />
                    <span>You Save ₹{costData.msmeSavings.toLocaleString()}</span>
                  </div>
                  <p className="text-[11px] text-emerald-800 mt-0.5">
                    with {costData.concessionPercentage}% Udyam MSME statutory discount
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    (Standard large industry pays ₹{costData.standardLargeIndustryTotal.toLocaleString()})
                  </p>
                </div>
              ) : (
                <div className="text-xs text-slate-500 text-left sm:text-right">
                  <span>Standard Corporate Gazette Rates Applied</span>
                </div>
              )}
            </div>

            {/* Clear Itemized Table */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>Statutory Fee Breakdown (Item-by-Item)</span>
              </h4>

              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden text-xs">
                {/* 1. Application Fee */}
                <div className="flex items-center justify-between p-3 bg-white hover:bg-slate-50 transition">
                  <div>
                    <span className="font-bold text-slate-900 block">1. Application Processing Fee</span>
                    <span className="text-[11px] text-slate-500">Official non-refundable portal fee paid on Manakonline</span>
                  </div>
                  <span className="font-bold text-slate-900 font-mono text-sm">
                    ₹{costData.applicationFee.toLocaleString()}
                  </span>
                </div>

                {/* 2. Inspection Fee */}
                {costData.inspectionFee > 0 ? (
                  <div className="flex items-center justify-between p-3 bg-white hover:bg-slate-50 transition">
                    <div>
                      <span className="font-bold text-slate-900 block">2. Factory Audit / Inspection Charges</span>
                      <span className="text-[11px] text-slate-500">
                        Official Gazette rate of ₹7,000 per auditor-day for visiting officer
                      </span>
                    </div>
                    <span className="font-bold text-slate-900 font-mono text-sm">
                      ₹{costData.inspectionFee.toLocaleString()}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-white hover:bg-slate-50 transition">
                    <div>
                      <span className="font-bold text-slate-900 block">2. Factory Audit</span>
                      <span className="text-[11px] text-emerald-700 font-semibold">
                        ₹0 (Zero Factory Audit required for CRS / Hallmarking schemes)
                      </span>
                    </div>
                    <span className="font-bold text-emerald-700 font-mono text-sm">₹0</span>
                  </div>
                )}

                {/* 3. Lab Testing */}
                {costData.labTestingFeeEstimate > 0 && (
                  <div className="flex items-center justify-between p-3 bg-white hover:bg-slate-50 transition">
                    <div>
                      <span className="font-bold text-slate-900 block">3. Independent Lab Sample Testing</span>
                      <span className="text-[11px] text-slate-500">
                        Paid directly to BIS / NABL accredited lab for full parameter verification
                      </span>
                    </div>
                    <span className="font-bold text-slate-900 font-mono text-sm">
                      ₹{costData.labTestingFeeEstimate.toLocaleString()}
                    </span>
                  </div>
                )}

                {/* 4. Minimum Marking Fee */}
                {costData.markingFeeBase > 0 && (
                  <div className="p-3 bg-white hover:bg-slate-50 transition space-y-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-900 flex items-center gap-2">
                          <span>4. Minimum Marking Fee (Govt Royalty)</span>
                          {costData.concessionPercentage > 0 && (
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                              {costData.concessionPercentage}% MSME Rebate
                            </span>
                          )}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Annual advance royalty paid to BIS to print the ISI mark on your product
                        </span>
                      </div>
                      <span className="font-bold text-slate-900 font-mono text-sm">
                        ₹{Math.round(costData.markingFeeBase * (1 - costData.concessionPercentage / 100)).toLocaleString()}
                      </span>
                    </div>
                    {costData.concessionPercentage > 0 && (
                      <div className="text-[11px] text-emerald-700 flex items-center justify-between bg-emerald-50 px-2 py-1 rounded">
                        <span>Original Base Rate: ₹{costData.markingFeeBase.toLocaleString()}</span>
                        <span className="font-mono font-bold">
                          - ₹{Math.round((costData.markingFeeBase * costData.concessionPercentage) / 100).toLocaleString()} Discount
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* 5. Annual License Maintenance */}
                {costData.annualLicenseFee > 0 && (
                  <div className="flex items-center justify-between p-3 bg-white hover:bg-slate-50 transition">
                    <div>
                      <span className="font-bold text-slate-900 block">5. Annual License Fee</span>
                      <span className="text-[11px] text-slate-500">Statutory annual license fee</span>
                    </div>
                    <span className="font-bold text-slate-900 font-mono text-sm">
                      ₹{Math.round(costData.annualLicenseFee * (1 - costData.concessionPercentage / 100)).toLocaleString()}
                    </span>
                  </div>
                )}

                {/* GST */}
                <div className="flex items-center justify-between p-3 bg-slate-50 font-medium">
                  <span className="text-slate-700 font-semibold">Applicable GST (18%)</span>
                  <span className="font-bold text-slate-900 font-mono text-sm">
                    ₹{costData.gstAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* When Do You Pay? */}
            <div className="pt-3 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  <span>When Do You Pay? (Staggered Payment Schedule)</span>
                </h4>
                <span className="text-xs text-slate-500 font-medium">You don't pay all at once!</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {costData.paymentStages.map((stage) => (
                  <div
                    key={stage.stageNumber}
                    className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                        Stage {stage.stageNumber}: {stage.whenToPay}
                      </span>
                      <span className="text-xs font-black font-mono text-slate-900">
                        ₹{stage.amountWithGst.toLocaleString()}
                      </span>
                    </div>
                    <div className="font-bold text-xs text-slate-900">{stage.stageName}</div>
                    <p className="text-[11px] text-slate-600 leading-snug">{stage.description}</p>
                    <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-200">
                      Paid to: <strong className="text-slate-700">{stage.payableTo}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions: Copy & Consult AI */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <OriginButton
                type="button"
                onClick={copyQuotation}
                className="h-10 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-2 transition cursor-pointer"
              >
                {copiedQuote ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-600" />
                    <span>Copy Quotation for Bank / Mudra Loan</span>
                  </>
                )}
              </OriginButton>

              <OriginButton
                type="button"
                onClick={() =>
                  onConsultAI(
                    `Give me a complete, easy-to-understand guide for getting BIS certification for "${costData.productName}" (${costData.standardCode}). What exact in-house testing equipment and documents do I need for my factory?`
                  )
                }
                className="h-10 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs flex items-center gap-2 transition cursor-pointer border-0"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Ask AI for In-House Lab & Document Checklist</span>
              </OriginButton>
            </div>
          </div>

          {/* DEDICATED SECTION: HOW TO REDUCE YOUR LICENSING FEES */}
          <div className="bg-gradient-to-br from-emerald-50/90 to-teal-50/60 rounded-2xl p-6 sm:p-7 border border-emerald-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Lightbulb className="w-5 h-5 text-amber-200" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-emerald-950">
                  How to Reduce Your BIS Licensing Fees & Total Costs
                </h3>
                <p className="text-xs text-emerald-800">
                  5 proven, government-recognized strategies to save money and prevent delays.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {(costData.feeReductionTips || []).map((tip, idx) => (
                <div
                  key={idx}
                  className="bg-white/95 rounded-xl p-4 border border-emerald-200/80 shadow-2xs space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                        {tip.badge}
                      </span>
                      <span className="text-xs font-bold text-emerald-700 font-mono">{tip.savings}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900">{tip.title}</h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{tip.explanation}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Middlemen Alert */}
            <div className="mt-3 p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-950 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong>Save ₹40,000 to ₹1.5 Lakh by Skipping Private Agents:</strong> The BIS portal (
                <a
                  href="https://manakonline.in"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold underline text-amber-900"
                >
                  manakonline.in
                </a>
                ) is completely digital and user-friendly. Your plant engineer or manager can upload test lists and drawings directly without paying heavy commissions to third-party consultants.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
