import React from 'react';
import { User, ChevronRight } from 'lucide-react';

export default function QuestionPalette({
  candidate,
  sections,
  activeSectionId,
  onSelectSection,
  questions,
  questionStates, // { [qId]: 'not_visited' | 'not_answered' | 'answered' | 'marked_review' | 'answered_marked_review' }
  currentQuestionId,
  onSelectQuestion,
  onSubmitClick
}) {
  // Compute counts for the legend
  const counts = {
    answered: 0,
    not_answered: 0,
    not_visited: 0,
    marked_review: 0,
    answered_marked_review: 0,
  };

  questions.forEach((q) => {
    const state = questionStates[q.id] || 'not_visited';
    if (counts[state] !== undefined) {
      counts[state]++;
    } else {
      counts.not_visited++;
    }
  });

  // Filter questions for active section
  const sectionQuestions = questions.filter((q) => q.sectionId === activeSectionId);

  const getButtonClass = (qId) => {
    const state = questionStates[qId] || 'not_visited';
    const isCurrent = qId === currentQuestionId;
    let base = 'palette-btn ';

    if (state === 'answered') base += 'palette-answered';
    else if (state === 'not_answered') base += 'palette-not-answered';
    else if (state === 'marked_review') base += 'palette-review';
    else if (state === 'answered_marked_review') base += 'palette-answered-review';
    else base += 'palette-not-visited';

    if (isCurrent) {
      base += ' palette-current ring-2 ring-blue-600 shadow-md';
    }

    return base;
  };

  return (
    <aside className="w-full lg:w-80 bg-white border-l border-gray-300 flex flex-col justify-between h-full select-none">
      <div className="p-3.5 space-y-3 overflow-y-auto">
        {/* Candidate Profile Box */}
        <div className="flex items-center gap-3 p-2.5 bg-slate-50 border border-slate-200 rounded-md">
          <div className="w-12 h-12 rounded bg-white border border-gray-300 overflow-hidden flex items-center justify-center shadow-xs">
            {candidate.photo ? (
              <img src={candidate.photo} alt={candidate.name} className="w-full h-full object-cover" />
            ) : (
              <User className="w-7 h-7 text-gray-500" />
            )}
          </div>
          <div className="text-xs">
            <div className="font-bold text-gray-900 leading-tight">{candidate.name}</div>
            <div className="text-gray-500 font-mono text-[11px] mt-0.5">Roll: {candidate.rollNumber}</div>
            <div className="text-emerald-700 font-semibold text-[11px] flex items-center gap-1 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Exam Connected
            </div>
          </div>
        </div>

        {/* Legend Symbols Grid */}
        <div className="border border-gray-200 rounded-md p-2 bg-slate-50/70 text-xs">
          <div className="grid grid-cols-2 gap-x-2 gap-y-2 text-[11px] font-medium text-gray-700">
            <div className="flex items-center gap-2">
              <div className="palette-btn palette-answered w-6 h-6 text-[10px]">
                {counts.answered}
              </div>
              <span className="leading-tight">Answered</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="palette-btn palette-not-answered w-6 h-6 text-[10px]">
                {counts.not_answered}
              </div>
              <span className="leading-tight">Not Answered</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="palette-btn palette-not-visited w-6 h-6 text-[10px]">
                {counts.not_visited}
              </div>
              <span className="leading-tight">Not Visited</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="palette-btn palette-review w-6 h-6 text-[10px]">
                {counts.marked_review}
              </div>
              <span className="leading-tight">Marked for Review</span>
            </div>

            <div className="flex items-center gap-2 col-span-2 pt-1 border-t border-gray-200">
              <div className="palette-btn palette-answered-review w-6 h-6 text-[10px]">
                {counts.answered_marked_review}
              </div>
              <span className="leading-tight text-[11px] text-gray-600">
                Ans & Marked for Review <em>(Evaluated)</em>
              </span>
            </div>
          </div>
        </div>

        {/* Active Section Label */}
        <div className="bg-[#1e3c72] text-white px-3 py-1.5 rounded text-xs font-bold flex justify-between items-center shadow-xs">
          <span>SECTION: {sections.find(s => s.id === activeSectionId)?.name}</span>
          <span className="bg-blue-900 px-1.5 py-0.5 rounded text-[10px] font-mono">
            {sectionQuestions.length} Qs
          </span>
        </div>

        {/* Question Palette Number Grid */}
        <div>
          <div className="text-[11px] font-bold text-gray-600 uppercase mb-2">
            Choose a Question:
          </div>
          <div className="grid grid-cols-5 gap-2 max-h-56 lg:max-h-64 overflow-y-auto p-1 bg-gray-50 border border-gray-200 rounded">
            {sectionQuestions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => onSelectQuestion(q.id)}
                className={getButtonClass(q.id)}
                title={`Question ${q.id}`}
              >
                {String(q.id).padStart(2, '0')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Submit Exam Bar */}
      <div className="p-3 bg-slate-100 border-t border-gray-300">
        <button
          onClick={onSubmitClick}
          className="w-full bg-[#1e88e5] hover:bg-[#1565c0] text-white font-bold py-2.5 px-4 rounded shadow-sm text-sm tracking-wide transition-all active:scale-[0.98] flex items-center justify-center gap-1.5"
        >
          <span>SUBMIT EXAM</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
