import React from 'react';

/**
 * SideFlankDecorations
 * Subtle, high-end decorative background elements that fill the empty left and right
 * margins outside the central 1280px (max-w-7xl) website content container.
 * 
 * Features:
 * - 100% non-intrusive (pointer-events-none, z-0 background layer)
 * - Automatically hidden on screens <= 1340px, gracefully scaling on wider monitors
 * - Matches BIS quality, standards, and technical ecosystem aesthetic:
 *   Subtle ISO geometric grids, golden hallmark motifs, neural nodes, and guilloche security waves
 * - Extremely gentle, subtle opacities so the center UI remains dominant
 */
export const SideFlankDecorations: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* Soft Ambient Atmospheric Glows in Flanks */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-600/[0.04] blur-3xl" />
      <div className="absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-amber-500/[0.03] blur-3xl" />
      <div className="absolute top-2/3 -left-40 w-96 h-96 rounded-full bg-indigo-600/[0.03] blur-3xl" />

      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-amber-500/[0.04] blur-3xl" />
      <div className="absolute top-1/3 -right-32 w-80 h-80 rounded-full bg-blue-600/[0.03] blur-3xl" />
      <div className="absolute top-2/3 -right-40 w-96 h-96 rounded-full bg-orange-500/[0.025] blur-3xl" />

      {/* ========================================================================= */}
      {/* LEFT FLANK: Technical Blueprint, ISO Geometry & Verification Watermarks */}
      {/* Visible only on screens wider than the 1280px main content container    */}
      {/* ========================================================================= */}
      <div
        className="hidden min-[1340px]:flex absolute left-0 top-0 bottom-0 flex-col justify-between py-24 pl-3 pr-2"
        style={{ width: 'calc((100vw - 1280px) / 2)' }}
      >
        {/* Top-Left: Standards Measurement / Geometry Blueprint Motif */}
        <div className="relative opacity-75 hover:opacity-95 transition-opacity duration-700">
          <svg
            className="w-full max-w-[200px] h-auto text-slate-500"
            viewBox="0 0 200 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Coordinate Grid Lines */}
            <g stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.45">
              <line x1="10" y1="20" x2="190" y2="20" />
              <line x1="10" y1="60" x2="190" y2="60" />
              <line x1="10" y1="100" x2="190" y2="100" />
              <line x1="10" y1="140" x2="190" y2="140" />
              <line x1="10" y1="180" x2="190" y2="180" />
              <line x1="10" y1="220" x2="190" y2="220" />

              <line x1="20" y1="10" x2="20" y2="230" />
              <line x1="60" y1="10" x2="60" y2="230" />
              <line x1="100" y1="10" x2="100" y2="230" />
              <line x1="140" y1="10" x2="140" y2="230" />
              <line x1="180" y1="10" x2="180" y2="230" />
            </g>

            {/* Geometric Concentric Calibration Rings (Golden / Blue) */}
            <circle cx="80" cy="100" r="55" stroke="#d97706" strokeWidth="0.85" opacity="0.45" />
            <circle cx="80" cy="100" r="40" stroke="#2563eb" strokeWidth="0.65" strokeDasharray="4 2" opacity="0.5" />
            <circle cx="80" cy="100" r="22" stroke="#d97706" strokeWidth="0.85" opacity="0.4" />
            <circle cx="80" cy="100" r="4" fill="#2563eb" opacity="0.6" />

            {/* Hexagonal Quality Mark Vector */}
            <polygon
              points="80,50 120,73 120,127 80,150 40,127 40,73"
              stroke="#0f172a"
              strokeWidth="0.75"
              opacity="0.4"
            />

            {/* Technical Calibration Marks & Crosshairs */}
            <path d="M70 100 H90 M80 90 V110" stroke="#d97706" strokeWidth="1.2" opacity="0.65" />
            <path d="M20 20 L25 20 M20 20 L20 25" stroke="#0f172a" strokeWidth="1.2" opacity="0.55" />
            <path d="M180 20 L175 20 M180 20 L180 25" stroke="#0f172a" strokeWidth="1.2" opacity="0.55" />
          </svg>

          {/* Micro Tech Tag */}
          <div className="mt-2 flex items-center gap-1.5 font-mono text-[10px] text-slate-600 font-semibold uppercase tracking-[0.25em]">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600/70" />
            <span>CALIBRATION GRID • REF IS/ISO</span>
          </div>
        </div>

        {/* Center-Left: Vertical Guilloche Security Ribbon & Micro Telemetry */}
        <div className="my-auto py-8 flex items-center gap-4">
          {/* Vertical Technical Ruler Line with Ticks */}
          <div className="h-64 w-px bg-gradient-to-b from-transparent via-slate-400/60 to-transparent relative flex flex-col justify-between items-center">
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} className="w-2.5 h-px bg-slate-500/70" />
            ))}
          </div>

          {/* Vertical Architectural Typographic Strand */}
          <div
            className="font-mono text-[9.5px] font-semibold text-slate-600 uppercase tracking-[0.35em] whitespace-nowrap"
            style={{ writingMode: 'vertical-lr', textOrientation: 'mixed' }}
          >
            BUREAU OF INDIAN STANDARDS • NATIONAL QUALITY FRAMEWORK • PS 26107
          </div>
        </div>

        {/* Bottom-Left: Subtle AI Neural Node Network */}
        <div className="opacity-70">
          <svg
            className="w-full max-w-[180px] h-auto text-blue-600"
            viewBox="0 0 180 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Interconnected Network Lines */}
            <g stroke="currentColor" strokeWidth="0.6" opacity="0.45">
              <line x1="20" y1="30" x2="70" y2="70" />
              <line x1="70" y1="70" x2="130" y2="40" />
              <line x1="70" y1="70" x2="100" y2="110" />
              <line x1="20" y1="30" x2="40" y2="100" />
              <line x1="40" y1="100" x2="100" y2="110" />
              <line x1="130" y1="40" x2="160" y2="90" />
              <line x1="100" y1="110" x2="160" y2="90" />
            </g>
            {/* Node Points */}
            <circle cx="20" cy="30" r="2.5" fill="#2563eb" opacity="0.65" />
            <circle cx="70" cy="70" r="3.5" fill="#d97706" opacity="0.75" />
            <circle cx="130" cy="40" r="2.5" fill="#2563eb" opacity="0.65" />
            <circle cx="40" cy="100" r="2.5" fill="#2563eb" opacity="0.55" />
            <circle cx="100" cy="110" r="3" fill="#d97706" opacity="0.7" />
            <circle cx="160" cy="90" r="2.5" fill="#2563eb" opacity="0.55" />
          </svg>
          <div className="font-mono text-[9px] font-semibold text-slate-600 uppercase tracking-[0.2em] mt-1">
            MANAKONLINE INTEGRITY CLUSTER
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* RIGHT FLANK: Hallmark Guilloche, Certification Nodes & Technical Motifs */}
      {/* Visible only on screens wider than the 1280px main content container    */}
      {/* ========================================================================= */}
      <div
        className="hidden min-[1340px]:flex absolute right-0 top-0 bottom-0 flex-col justify-between py-24 pr-3 pl-2 items-end text-right"
        style={{ width: 'calc((100vw - 1280px) / 2)' }}
      >
        {/* Top-Right: Guilloche Security Waves & Hallmark Geometry */}
        <div className="relative opacity-60 hover:opacity-80 transition-opacity duration-700 flex flex-col items-end">
          <svg
            className="w-full max-w-[200px] h-auto text-amber-500"
            viewBox="0 0 200 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Subtle Security Wave Curves */}
            <path
              d="M10 30 C 60 70, 140 -10, 190 30 S 140 110, 10 70 S 140 150, 190 110 S 140 190, 10 150 S 140 230, 190 190"
              stroke="#f59e0b"
              strokeWidth="0.5"
              fill="none"
              opacity="0.25"
            />
            <path
              d="M15 35 C 65 75, 145 -5, 195 35 S 145 115, 15 75 S 145 155, 195 115 S 145 195, 15 155 S 145 235, 195 195"
              stroke="#3b82f6"
              strokeWidth="0.4"
              strokeDasharray="2 2"
              fill="none"
              opacity="0.25"
            />

            {/* Hallmark Diamond Emblem */}
            <g transform="translate(110, 70)">
              <polygon
                points="30,0 60,30 30,60 0,30"
                stroke="#f59e0b"
                strokeWidth="0.75"
                opacity="0.4"
                fill="none"
              />
              <polygon
                points="30,10 50,30 30,50 10,30"
                stroke="#3b82f6"
                strokeWidth="0.5"
                opacity="0.3"
                fill="none"
              />
              <circle cx="30" cy="30" r="3" fill="#f59e0b" opacity="0.6" />
            </g>

            {/* Corner Precision Aligners */}
            <path d="M190 10 L180 10 M190 10 L190 20" stroke="#0f172a" strokeWidth="1" opacity="0.55" />
            <circle cx="150" cy="180" r="1.5" fill="#d97706" opacity="0.65" />
            <circle cx="170" cy="180" r="1.5" fill="#d97706" opacity="0.65" />
          </svg>

          {/* Micro Tech Tag */}
          <div className="mt-2 flex items-center justify-end gap-1.5 font-mono text-[10px] text-slate-600 font-semibold uppercase tracking-[0.25em]">
            <span>MANDATORY QCO MATRIX</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600/70" />
          </div>
        </div>

        {/* Center-Right: Vertical Certification Telemetry Strand */}
        <div className="my-auto py-8 flex items-center gap-4 flex-row-reverse">
          {/* Vertical Technical Ruler Line with Ticks */}
          <div className="h-64 w-px bg-gradient-to-b from-transparent via-amber-500/50 to-transparent relative flex flex-col justify-between items-center">
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} className="w-2.5 h-px bg-amber-600/60" />
            ))}
          </div>

          {/* Vertical Architectural Typographic Strand */}
          <div
            className="font-mono text-[9.5px] font-semibold text-slate-600 uppercase tracking-[0.35em] whitespace-nowrap"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            STANDARDS • AUDIT CONFORMANCE • LAB VERIFICATION • ZERO DEFECT
          </div>
        </div>

        {/* Bottom-Right: Technical Quality Seal Rings */}
        <div className="opacity-70 flex flex-col items-end">
          <svg
            className="w-full max-w-[170px] h-auto text-slate-600"
            viewBox="0 0 170 130"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Concentric Calibration Circles */}
            <circle cx="95" cy="65" r="45" stroke="#0f172a" strokeWidth="0.7" strokeDasharray="3 3" opacity="0.45" />
            <circle cx="95" cy="65" r="32" stroke="#d97706" strokeWidth="0.85" opacity="0.5" />
            <circle cx="95" cy="65" r="18" stroke="#2563eb" strokeWidth="0.65" opacity="0.5" />
            <circle cx="95" cy="65" r="3" fill="#d97706" opacity="0.75" />

            {/* Quadrant Ticks */}
            <line x1="95" y1="15" x2="95" y2="25" stroke="#d97706" strokeWidth="1.2" opacity="0.65" />
            <line x1="95" y1="105" x2="95" y2="115" stroke="#d97706" strokeWidth="1.2" opacity="0.65" />
            <line x1="45" y1="65" x2="55" y2="65" stroke="#d97706" strokeWidth="1.2" opacity="0.65" />
            <line x1="135" y1="65" x2="145" y2="65" stroke="#d97706" strokeWidth="1.2" opacity="0.65" />
          </svg>
          <div className="font-mono text-[9px] font-semibold text-slate-600 uppercase tracking-[0.2em] mt-1">
            SECURE CONFORMANCE TOKEN
          </div>
        </div>
      </div>
    </div>
  );
};
