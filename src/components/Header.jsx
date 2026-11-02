import React from 'react';
import { Clock, Globe, User, AlertCircle, ZoomIn, ZoomOut } from 'lucide-react';

export default function Header({
  exam,
  timeLeftSeconds,
  currentLanguage,
  onLanguageChange,
  candidate,
  fontSize,
  onFontSizeChange,
  onOpenDashboard
}) {
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) {
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const isLowTime = timeLeftSeconds <= 300; // < 5 mins

  return (
    <header className="bg-white border-b-2 border-blue-800 shadow-sm sticky top-0 z-30 select-none">
      {/* Top Banner */}
      <div className="bg-[#1e3c72] text-white px-4 py-2 flex flex-wrap justify-between items-center text-xs md:text-sm">
        <div className="flex items-center space-x-2 font-medium">
          <div className="w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center text-blue-900 font-bold text-xs shadow-inner">
            🏛️
          </div>
          <span className="tracking-wide uppercase font-semibold text-amber-200">
            {exam.org}
          </span>
          <span className="hidden sm:inline text-blue-300">|</span>
          <span className="font-medium hidden sm:inline">{exam.name}</span>
        </div>

        {/* System Name / Lab node + Admin Dashboard Switch */}
        <div className="flex items-center space-x-3">
          {onOpenDashboard && (
            <button
              onClick={onOpenDashboard}
              className="bg-amber-400 hover:bg-amber-300 text-blue-950 font-bold px-2 py-0.5 rounded text-xs transition-colors shadow-xs"
            >
              ⚙️ Manage / Upload Qs
            </button>
          )}
          <span className="bg-blue-900/80 px-2.5 py-0.5 rounded border border-blue-400/30 text-blue-100 font-mono text-xs">
            System ID: <strong className="text-white">C042-LAB3</strong>
          </span>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="px-4 py-2.5 flex flex-wrap justify-between items-center gap-3">
        {/* Left: Exam title for small screens + font controls */}
        <div className="flex items-center gap-4">
          <div>
            <h1 className="font-bold text-gray-800 text-sm md:text-base leading-tight">
              {exam.name}
            </h1>
            <p className="text-xs text-gray-500 font-medium">
              Computer Based Examination (CBT) • Maximum Marks: {exam.totalQuestions * exam.marksPerCorrect}
            </p>
          </div>

          {/* Font Resizing (Official TCS iON feature) */}
          <div className="hidden lg:flex items-center border border-gray-300 rounded px-1.5 py-0.5 bg-gray-50 text-xs text-gray-700">
            <span className="mr-1 font-semibold text-gray-500">Text:</span>
            <button
              onClick={() => onFontSizeChange('small')}
              className={`px-1.5 py-0.5 rounded ${fontSize === 'small' ? 'bg-blue-600 text-white font-bold' : 'hover:bg-gray-200'}`}
              title="Small Text"
            >
              A-
            </button>
            <button
              onClick={() => onFontSizeChange('normal')}
              className={`px-1.5 py-0.5 rounded ${fontSize === 'normal' ? 'bg-blue-600 text-white font-bold' : 'hover:bg-gray-200'}`}
              title="Default Text"
            >
              A
            </button>
            <button
              onClick={() => onFontSizeChange('large')}
              className={`px-1.5 py-0.5 rounded ${fontSize === 'large' ? 'bg-blue-600 text-white font-bold' : 'hover:bg-gray-200'}`}
              title="Large Text"
            >
              A+
            </button>
          </div>
        </div>

        {/* Right: Language Selector + Timer + Candidate Identity */}
        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <div className="flex items-center gap-1.5 text-xs bg-slate-100 border border-slate-300 rounded px-2.5 py-1">
            <Globe className="w-3.5 h-3.5 text-slate-600" />
            <label htmlFor="lang-select" className="text-gray-700 font-medium">
              View In:
            </label>
            <select
              id="lang-select"
              value={currentLanguage}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="bg-transparent font-semibold text-blue-700 outline-none cursor-pointer"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी (Hindi)</option>
            </select>
          </div>

          {/* Countdown Timer */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md border font-mono font-bold text-sm md:text-base transition-colors ${
              isLowTime
                ? 'bg-red-50 border-red-500 text-red-600 animate-pulse'
                : 'bg-amber-50 border-amber-400 text-amber-900'
            }`}
          >
            <Clock className={`w-4 h-4 ${isLowTime ? 'text-red-600' : 'text-amber-700'}`} />
            <span className="text-xs uppercase font-sans font-medium text-gray-600">Time Left:</span>
            <span>{formatTime(timeLeftSeconds)}</span>
          </div>

          {/* Candidate Profile Info */}
          <div className="hidden md:flex items-center gap-2 pl-3 border-l border-gray-300">
            <div className="w-9 h-9 rounded-full bg-slate-200 border-2 border-blue-600 overflow-hidden flex items-center justify-center">
              {candidate.photo ? (
                <img src={candidate.photo} alt={candidate.name} className="w-full h-full object-cover" />
              ) : (
                <User className="w-5 h-5 text-gray-500" />
              )}
            </div>
            <div className="text-left text-xs leading-tight">
              <div className="font-bold text-gray-800">{candidate.name}</div>
              <div className="text-gray-500 font-mono">Roll: {candidate.rollNumber}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
