import React from 'react';
import { X, ShieldAlert, CheckCircle, ExternalLink, Building, DollarSign, Wrench, Microscope, BookOpen, AlertTriangle } from 'lucide-react';
import { IndianStandard } from '../types';
import { RECOGNIZED_LABS_SAMPLE } from '../data/bisStandardsData';
import { OriginButton } from '@/components/ui/origin-button';

interface StandardDetailModalProps {
  standard: IndianStandard | null;
  onClose: () => void;
  language: 'en' | 'hi';
  onConsultAI?: (standardCode: string) => void;
}

export const StandardDetailModal: React.FC<StandardDetailModalProps> = ({
  standard,
  onClose,
  language,
  onConsultAI,
}) => {
  if (!standard) return null;
  const isHi = language === 'hi';

  const relevantLabs = RECOGNIZED_LABS_SAMPLE.filter((lab) =>
    lab.coveredStandards.some((cs) => standard.code.includes(cs) || cs.includes(standard.code.split(':')[0]))
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 relative">
          <OriginButton
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white w-8 h-8 p-0 rounded-lg bg-transparent hover:bg-slate-800 transition border-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </OriginButton>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="bg-amber-400 text-slate-950 text-xs font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
              {standard.scheme}
            </span>
            <span className="bg-slate-800 text-blue-300 text-xs px-2.5 py-0.5 rounded border border-slate-700">
              {standard.category}
            </span>
            {standard.isMandatoryQCO && (
              <span className="bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs px-2.5 py-0.5 rounded flex items-center gap-1 font-semibold">
                <ShieldAlert className="w-3.5 h-3.5" />
                {isHi ? 'अनिवार्य QCO आदेश' : 'Mandatory QCO'}
              </span>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-baseline gap-2">
            <span>{standard.code}</span>
          </h2>
          <p className="text-slate-200 text-sm sm:text-base mt-1 font-medium leading-snug">
            {isHi && standard.hindiTitle ? standard.hindiTitle : standard.title}
          </p>

          {standard.internationalEquivalent && (
            <div className="mt-2 text-xs text-amber-300/90 flex items-center gap-1.5 font-mono">
              <span className="text-slate-400">Harmonized With:</span> {standard.internationalEquivalent}
            </div>
          )}
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 text-sm">
          {/* QCO Alert Box */}
          {standard.isMandatoryQCO && standard.qcoDetails && (
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-rose-900">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-semibold text-rose-950 text-sm flex items-center gap-2">
                    <span>Quality Control Order (QCO) Notification</span>
                    <span className="bg-rose-200 text-rose-800 text-[11px] px-2 py-0.2 rounded font-mono">
                      {standard.qcoDetails.gazetteNo}
                    </span>
                  </div>
                  <p className="text-xs text-rose-800 leading-relaxed">
                    <strong>Governing Ministry:</strong> {standard.qcoDetails.ministry}
                  </p>
                  <p className="text-xs text-rose-800 leading-relaxed">
                    <strong>Status:</strong> {standard.qcoDetails.effectiveDate}
                  </p>
                  {standard.qcoDetails.msmeExemptionNotes && (
                    <p className="text-xs text-rose-700 bg-rose-100/60 p-2 rounded mt-1">
                      <strong>MSME Context:</strong> {standard.qcoDetails.msmeExemptionNotes}
                    </p>
                  )}
                  <p className="text-[11px] text-rose-600 font-mono mt-1">
                    ⚖️ {standard.qcoDetails.penaltySection}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Scope */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-600" />
              Scope & Specification
            </h4>
            <p className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-slate-800 leading-relaxed">
              {standard.scope}
            </p>
          </div>

          {/* Key Test Parameters */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
              <Microscope className="w-4 h-4 text-purple-600" />
              Mandatory Test Clauses & Parameters
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {standard.keyTestParameters.map((test, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-xs">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-slate-800">{test}</span>
                </div>
              ))}
            </div>
          </div>

          {/* In-House Testing Equipment Required */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
              <Wrench className="w-4 h-4 text-amber-600" />
              Required In-House Factory Quality Equipment (SIT)
            </h4>
            <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-3.5 space-y-1.5">
              <p className="text-xs text-amber-900 font-medium mb-1">
                To qualify for BIS factory audit, the applicant must possess calibrated instruments for:
              </p>
              <ul className="list-disc list-inside text-xs text-amber-950 space-y-1">
                {standard.requiredFactoryEquipment.map((eq, i) => (
                  <li key={i}>{eq}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Fees & Concessions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs mb-1">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                Sample Testing Fee Estimate
              </div>
              <p className="text-base font-bold text-slate-900 font-mono">
                {standard.sampleTestingFeeEstimate}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Payable directly to BIS or NABL recognized testing laboratory
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs mb-1">
                <Building className="w-4 h-4 text-blue-600" />
                Marking Fee Guideline
              </div>
              <p className="text-xs font-semibold text-slate-900">
                {standard.markingFeeGuideline}
              </p>
              <p className="text-[11px] text-emerald-700 font-medium mt-1">
                ✓ 50% concession applies for Micro Enterprises with Udyam!
              </p>
            </div>
          </div>

          {/* Recognized Labs */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Building className="w-4 h-4 text-blue-600" />
                Recognized Labs for Sample Testing ({standard.recognizedLabsCount} Total in India)
              </span>
            </h4>
            <div className="space-y-2">
              {relevantLabs.length > 0 ? (
                relevantLabs.slice(0, 3).map((lab) => (
                  <div key={lab.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50/80 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-slate-900">{lab.name}</p>
                      <p className="text-slate-500">{lab.city}, {lab.state} • <span className="text-blue-700 font-medium">{lab.type}</span></p>
                    </div>
                    <span className="font-mono text-[11px] text-slate-600 bg-white px-2 py-1 rounded border border-slate-200">
                      {lab.phone}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 italic">
                  Multiple BIS Central/Regional and NABL accredited commercial laboratories are empaneled across India.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-mono">HS: {standard.hsCodes.join(', ')}</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://www.manakonline.in"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-medium flex items-center gap-1.5 transition"
            >
              <span>Manakonline Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {onConsultAI && (
              <OriginButton
                onClick={() => {
                  onConsultAI(standard.code);
                  onClose();
                }}
                className="h-9 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm shadow-blue-600/30 transition border-0"
              >
                <span>Ask AI About This Standard</span>
              </OriginButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
