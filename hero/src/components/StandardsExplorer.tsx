import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ShieldAlert,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  Building,
  Microscope,
  Award,
  ArrowUpDown,
  FileSpreadsheet,
} from 'lucide-react';
import { IndianStandard } from '../types';
import { INDIAN_STANDARDS_DATABASE } from '../data/bisStandardsData';
import { OriginButton } from '@/components/ui/origin-button';

interface StandardsExplorerProps {
  language: 'en' | 'hi';
  onSelectStandard: (standard: IndianStandard) => void;
  onAskAIAboutStandard: (standardCode: string) => void;
}

export const StandardsExplorer: React.FC<StandardsExplorerProps> = ({
  language,
  onSelectStandard,
  onAskAIAboutStandard,
}) => {
  const isHi = language === 'hi';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedScheme, setSelectedScheme] = useState<string>('All');
  const [onlyMandatoryQCO, setOnlyMandatoryQCO] = useState(false);
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const categories = useMemo(() => {
    const set = new Set<string>();
    INDIAN_STANDARDS_DATABASE.forEach((item) => set.add(item.category));
    return ['All', ...Array.from(set)];
  }, []);

  const schemes = useMemo(() => {
    const set = new Set<string>();
    INDIAN_STANDARDS_DATABASE.forEach((item) => set.add(item.scheme));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredStandards = useMemo(() => {
    return INDIAN_STANDARDS_DATABASE.filter((item) => {
      const matchesSearch =
        item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.hindiTitle && item.hindiTitle.includes(searchQuery)) ||
        item.hsCodes.some((hs) => hs.includes(searchQuery)) ||
        (item.internationalEquivalent &&
          item.internationalEquivalent.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesScheme = selectedScheme === 'All' || item.scheme === selectedScheme;
      const matchesQCO = !onlyMandatoryQCO || item.isMandatoryQCO;
      const matchesSector =
        selectedSector === 'All' || (item.applicableTo as string[]).includes(selectedSector);

      return matchesSearch && matchesCategory && matchesScheme && matchesQCO && matchesSector;
    });
  }, [searchQuery, selectedCategory, selectedScheme, onlyMandatoryQCO, selectedSector]);

  return (
    <div className="w-full space-y-6">
      {/* Top Banner & Search Controls */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {isHi ? 'भारतीय मानक एवं QCO रजिस्ट्री' : 'Indian Standards (IS) & Mandatory QCO Directory'}
              </h2>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {filteredStandards.length} Standards
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {isHi
                ? 'अनिवार्य गुणवत्ता नियंत्रण आदेश (QCO), परीक्षण खंड एवं योजना-वार मानक विवरण खोजें'
                : 'Search verified standards, Quality Control Orders, testing parameters, and factory SIT requirements.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <OriginButton
              onClick={() => setOnlyMandatoryQCO(!onlyMandatoryQCO)}
              className={`h-9 px-3 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition border ${
                onlyMandatoryQCO
                  ? 'bg-rose-50 text-rose-700 border-rose-300 shadow-xs'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
              <span>{isHi ? 'केवल अनिवार्य QCO' : 'Mandatory QCO Only'}</span>
            </OriginButton>

            <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg transition ${
                  viewMode === 'grid' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg transition ${
                  viewMode === 'table' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Table
              </button>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {/* Text Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isHi ? 'मानक कोड या उत्पाद नाम खोजें...' : 'Search IS code, product, or HS code...'}
              className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 outline-none transition"
            />
          </div>

          {/* Sector / Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white rounded-xl px-3 py-2 text-xs text-slate-800 outline-none transition"
            >
              <option value="All">All Categories ({categories.length - 1})</option>
              {categories
                .filter((c) => c !== 'All')
                .map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
            </select>
          </div>

          {/* Scheme Filter */}
          <div>
            <select
              value={selectedScheme}
              onChange={(e) => setSelectedScheme(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white rounded-xl px-3 py-2 text-xs text-slate-800 outline-none transition"
            >
              <option value="All">All BIS Schemes ({schemes.length - 1})</option>
              {schemes
                .filter((s) => s !== 'All')
                .map((sch) => (
                  <option key={sch} value={sch}>
                    {sch}
                  </option>
                ))}
            </select>
          </div>

          {/* Sector applicability */}
          <div>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white rounded-xl px-3 py-2 text-xs text-slate-800 outline-none transition"
            >
              <option value="All">All Sectors (MSME / Importer / Consumer)</option>
              <option value="MSME">MSME Focus</option>
              <option value="Large Industry">Large Industry</option>
              <option value="Importer">Importer / FMCS</option>
              <option value="Consumer">Consumer Verification</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredStandards.map((std) => (
            <div
              key={std.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-md transition flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-5 space-y-3">
                {/* Header tags */}
                <div className="flex items-center justify-between gap-2">
                  <span className="bg-slate-100 text-slate-700 text-[11px] font-semibold px-2.5 py-0.5 rounded-md border border-slate-200 font-mono">
                    {std.scheme}
                  </span>

                  {std.isMandatoryQCO ? (
                    <span className="bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3 text-rose-600" />
                      Mandatory QCO
                    </span>
                  ) : (
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      Voluntary / CoC
                    </span>
                  )}
                </div>

                {/* Code & Title */}
                <div>
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition flex items-center justify-between">
                    <span>{std.code}</span>
                  </h3>
                  <p className="text-xs font-semibold text-slate-700 mt-1 line-clamp-2 leading-relaxed">
                    {isHi && std.hindiTitle ? std.hindiTitle : std.title}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5 font-medium">{std.category}</p>
                </div>

                {/* Scope excerpt */}
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  {std.scope}
                </p>

                {/* Key specs highlight */}
                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Recognized Labs:</span>
                    <span className="font-bold text-slate-800">{std.recognizedLabsCount} Labs in India</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Sample Testing:</span>
                    <span className="font-semibold text-slate-800 font-mono">{std.sampleTestingFeeEstimate}</span>
                  </div>
                  {std.internationalEquivalent && (
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>Equivalence:</span>
                      <span className="text-blue-700 font-mono text-[10px] truncate max-w-[150px]">
                        {std.internationalEquivalent}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                <OriginButton
                  onClick={() => onSelectStandard(std)}
                  className="h-8 px-3 rounded-lg bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200 transition flex items-center gap-1"
                >
                  <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                  <span>Full Clauses & SIT</span>
                </OriginButton>

                <OriginButton
                  onClick={() => onAskAIAboutStandard(std.code)}
                  className="h-8 px-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition border-0"
                >
                  Ask AI
                </OriginButton>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-900 border-b border-slate-200 uppercase font-semibold text-[11px]">
                <tr>
                  <th className="p-4">Standard Code</th>
                  <th className="p-4">Title & Sector</th>
                  <th className="p-4">Scheme</th>
                  <th className="p-4">QCO Status</th>
                  <th className="p-4">Testing Fee Estimate</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStandards.map((std) => (
                  <tr key={std.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-4 font-bold text-blue-900 font-mono whitespace-nowrap">{std.code}</td>
                    <td className="p-4 max-w-sm">
                      <p className="font-semibold text-slate-800">{isHi && std.hindiTitle ? std.hindiTitle : std.title}</p>
                      <p className="text-[11px] text-slate-400">{std.category}</p>
                    </td>
                    <td className="p-4 whitespace-nowrap">{std.scheme}</td>
                    <td className="p-4 whitespace-nowrap">
                      {std.isMandatoryQCO ? (
                        <span className="bg-rose-50 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-rose-200 flex items-center gap-1 w-fit">
                          <ShieldAlert className="w-3 h-3 text-rose-600" />
                          Mandatory
                        </span>
                      ) : (
                        <span className="bg-slate-100 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded-full">
                          Voluntary
                        </span>
                      )}
                    </td>
                    <td className="p-4 font-mono whitespace-nowrap text-slate-700">{std.sampleTestingFeeEstimate}</td>
                    <td className="p-4 text-right whitespace-nowrap space-x-2">
                      <button
                        onClick={() => onSelectStandard(std)}
                        className="px-2.5 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-50 rounded border border-blue-200 transition"
                      >
                        Inspect
                      </button>
                      <button
                        onClick={() => onAskAIAboutStandard(std.code)}
                        className="px-2.5 py-1 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded transition"
                      >
                        Ask AI
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
