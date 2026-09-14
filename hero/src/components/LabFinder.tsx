import React, { useState, useMemo } from 'react';
import {
  Microscope,
  Search,
  MapPin,
  Mail,
  Phone,
  Building,
  CheckCircle,
  ExternalLink,
  Shield,
  FileCheck,
} from 'lucide-react';
import { RECOGNIZED_LABS_SAMPLE } from '../data/bisStandardsData';
import { RecognizedLab } from '../types';

interface LabFinderProps {
  language: 'en' | 'hi';
  onConsultAI: (query: string) => void;
}

export const LabFinder: React.FC<LabFinderProps> = ({ language, onConsultAI }) => {
  const isHi = language === 'hi';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedState, setSelectedState] = useState<string>('All');

  const states = useMemo(() => {
    const set = new Set<string>();
    RECOGNIZED_LABS_SAMPLE.forEach((l) => set.add(l.state));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredLabs = useMemo(() => {
    return RECOGNIZED_LABS_SAMPLE.filter((lab) => {
      const matchesSearch =
        lab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lab.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lab.coveredStandards.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesType = selectedType === 'All' || lab.type === selectedType;
      const matchesState = selectedState === 'All' || lab.state === selectedState;

      return matchesSearch && matchesType && matchesState;
    });
  }, [searchQuery, selectedType, selectedState]);

  return (
    <div className="w-full space-y-6">
      {/* Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-purple-600 text-xs font-bold uppercase tracking-wider">
          <Microscope className="w-4 h-4" />
          <span>Laboratory Recognition Scheme (LRS)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          {isHi ? 'मान्यता प्राप्त प्रयोगशालाएं एवं परीक्षण केंद्र' : 'BIS Recognized Laboratories & Testing Network'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          {isHi
            ? 'भारतीय मानक ब्यूरो (BIS) की केंद्रीय, क्षेत्रीय एवं NABL मान्यता प्राप्त प्रयोगशालाओं की सूची खोजें जहां उत्पाद के प्रारंभिक परीक्षण एवं निगरानी नमूने भेजे जाते हैं।'
            : 'Explore BIS Central, Regional, and empaneled NABL testing facilities across India for type approval, pre-licensing testing, and surveillance sample evaluation.'}
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isHi ? 'मानक कोड या शहर खोजें...' : 'Search by IS code (e.g. IS 14543), city or lab...'}
            className="w-full bg-slate-50 border border-slate-200 focus:border-purple-600 focus:bg-white rounded-xl pl-10 pr-3 py-2 text-xs text-slate-900 outline-none transition"
          />
        </div>

        <div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 focus:border-purple-600 focus:bg-white rounded-xl px-3 py-2 text-xs text-slate-800 outline-none transition"
          >
            <option value="All">All Laboratory Types</option>
            <option value="BIS Laboratory">BIS Central & Regional Labs</option>
            <option value="Government Recognized">Government Recognized Testing Houses</option>
            <option value="NABL Accredited Private">NABL Accredited Private Labs</option>
          </select>
        </div>

        <div>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 focus:border-purple-600 focus:bg-white rounded-xl px-3 py-2 text-xs text-slate-800 outline-none transition"
          >
            <option value="All">All States / Regions</option>
            {states
              .filter((s) => s !== 'All')
              .map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Lab Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredLabs.map((lab) => (
          <div
            key={lab.id}
            className="bg-white rounded-2xl border border-slate-200 hover:border-purple-300 p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                  {lab.type}
                </span>
                <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {lab.city}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-sm">{lab.name}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{lab.address}</p>
              </div>

              {/* Scopes */}
              <div>
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <FileCheck className="w-3 h-3 text-purple-600" />
                  Recognized Standards Testing:
                </p>
                <div className="flex flex-wrap gap-1">
                  {lab.coveredStandards.map((std, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono font-medium px-2 py-0.5 bg-slate-100 text-slate-800 rounded border border-slate-200"
                    >
                      {std}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <a href={`mailto:${lab.contactEmail}`} className="text-blue-600 hover:underline truncate">
                  {lab.contactEmail}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="font-mono">{lab.phone}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Protocol Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 space-y-3">
        <h3 className="font-bold text-base text-amber-400 flex items-center gap-2">
          <Shield className="w-4 h-4" />
          <span>Official Sample Submission & Testing Protocol (BIS Scheme I & II)</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
            <p className="font-bold text-white mb-1">1. Sample Drawing</p>
            <p>For Scheme I (ISI), the BIS Technical Officer draws random samples on-site and seals them with official lead tags.</p>
          </div>
          <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
            <p className="font-bold text-white mb-1">2. Direct CRS Submission</p>
            <p>For Scheme II (CRS), manufacturers directly submit sealed test models to any recognized lab on this portal.</p>
          </div>
          <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
            <p className="font-bold text-white mb-1">3. Validity of Reports</p>
            <p>Test reports issued by BIS empaneled laboratories are valid for 90 days for initial licensing applications.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
