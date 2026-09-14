import React, { useState, useEffect } from 'react';
import { Search, X, ShieldAlert, ArrowRight, BookOpen } from 'lucide-react';
import { IndianStandard } from '../types';
import { INDIAN_STANDARDS_DATABASE } from '../data/bisStandardsData';
import { OriginButton } from '@/components/ui/origin-button';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStandard: (standard: IndianStandard) => void;
  onAskAI: (standardCode: string) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectStandard,
  onAskAI,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const matches = INDIAN_STANDARDS_DATABASE.filter((std) => {
    const q = query.toLowerCase();
    return (
      std.code.toLowerCase().includes(q) ||
      std.title.toLowerCase().includes(q) ||
      (std.hindiTitle && std.hindiTitle.toLowerCase().includes(q)) ||
      std.category.toLowerCase().includes(q) ||
      std.scheme.toLowerCase().includes(q)
    );
  }).slice(0, 7);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-start justify-center pt-20 p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden">
        {/* Search Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type standard code (e.g. IS 14543, IS 1786), product (Cement, Toys, Battery), or QCO..."
            className="w-full text-sm text-slate-900 placeholder:text-slate-400 outline-none"
          />
          <OriginButton
            onClick={onClose}
            className="w-8 h-8 p-0 rounded-lg text-slate-400 hover:text-slate-600 bg-transparent hover:bg-slate-100 transition border-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </OriginButton>
        </div>

        {/* Results List */}
        <div className="p-3 max-h-96 overflow-y-auto divide-y divide-slate-100 space-y-1">
          {matches.length > 0 ? (
            matches.map((std) => (
              <div
                key={std.id}
                className="p-3 rounded-xl hover:bg-slate-50 transition flex items-center justify-between gap-3 cursor-pointer group"
                onClick={() => {
                  onSelectStandard(std);
                  onClose();
                }}
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-blue-900 text-xs">{std.code}</span>
                    <span className="text-[10px] font-medium px-2 py-0.2 rounded-full bg-slate-100 text-slate-700">
                      {std.scheme}
                    </span>
                    {std.isMandatoryQCO && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800">
                        QCO Mandatory
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-slate-800 group-hover:text-blue-600 transition">
                    {std.title}
                  </p>
                  <p className="text-[11px] text-slate-400">{std.category}</p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <OriginButton
                    onClick={(e) => {
                      e.stopPropagation();
                      onAskAI(std.code);
                      onClose();
                    }}
                    className="h-6 px-2.5 rounded bg-blue-50 text-blue-700 text-[11px] font-semibold hover:bg-blue-100 transition border-0"
                  >
                    Ask AI
                  </OriginButton>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition" />
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-slate-400 text-xs">
              No matching standards found for &quot;{query}&quot;. Try searching for &quot;Water&quot;, &quot;Cement&quot;, &quot;Steel&quot;, or &quot;Toys&quot;.
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Navigate with mouse or keyboard</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
