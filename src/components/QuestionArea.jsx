import React from 'react';
import { Bookmark, RotateCcw, ArrowRight, Check } from 'lucide-react';

export default function QuestionArea({
  exam,
  sections,
  activeSectionId,
  onSelectSection,
  currentQuestion,
  currentAnswer, // string key: 'A', 'B', 'C', 'D' or null
  onSelectOption,
  onSaveAndNext,
  onMarkForReviewAndNext,
  onClearResponse,
  language,
  fontSize
}) {
  if (!currentQuestion) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 text-gray-500">
        No question selected.
      </div>
    );
  }

  const qData = currentQuestion[language] || currentQuestion.en;

  const fontClass =
    fontSize === 'large'
      ? 'text-lg leading-relaxed'
      : fontSize === 'small'
      ? 'text-sm leading-normal'
      : 'text-base leading-relaxed';

  return (
    <div className="flex-1 flex flex-col justify-between bg-white overflow-y-auto select-none">
      {/* Section Tabs Bar */}
      <div className="bg-slate-200 border-b border-gray-300 px-4 flex gap-1 overflow-x-auto">
        {sections.map((sec) => {
          const isActive = sec.id === activeSectionId;
          return (
            <button
              key={sec.id}
              onClick={() => onSelectSection(sec.id)}
              className={`py-2 px-3 text-xs md:text-sm font-semibold whitespace-nowrap transition-colors border-t-2 ${
                isActive
                  ? 'bg-white text-blue-900 border-blue-700 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900 border-transparent hover:bg-slate-300/60'
              }`}
            >
              {language === 'hi' && sec.hindiName ? sec.hindiName : sec.name}
            </button>
          );
        })}
      </div>

      {/* Question Info Bar */}
      <div className="px-5 py-2.5 bg-blue-50/60 border-b border-gray-200 flex flex-wrap justify-between items-center text-xs text-gray-700">
        <div className="font-bold text-gray-900 text-sm">
          Question No. {currentQuestion.id}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 font-medium">
            <span>Marks:</span>
            <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              +{exam.marksPerCorrect.toFixed(2)}
            </span>
            <span className="text-rose-700 font-bold bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
              -{exam.negativeMark.toFixed(2)}
            </span>
          </div>

          <div className="hidden sm:block text-gray-400">|</div>

          <div className="text-gray-500 font-medium hidden sm:block">
            Type: Multiple Choice Question (MCQ)
          </div>
        </div>
      </div>

      {/* Question Statement & Options */}
      <div className="p-5 md:p-6 flex-1 overflow-y-auto">
        {/* Question Text */}
        <div className={`font-medium text-gray-900 whitespace-pre-line mb-6 ${fontClass}`}>
          {qData.question}
        </div>

        {/* Options List */}
        <div className="space-y-3 max-w-3xl">
          {qData.options.map((opt) => {
            const isSelected = currentAnswer === opt.key;
            return (
              <label
                key={opt.key}
                onClick={() => onSelectOption(opt.key)}
                className={`flex items-start gap-3.5 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/80 shadow-xs'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {/* Radio Circle */}
                <div
                  className={`w-5 h-5 mt-0.5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? 'border-blue-600 bg-blue-600'
                      : 'border-gray-400 bg-white'
                  }`}
                >
                  {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>

                <div className="flex-1 flex items-start gap-2">
                  <span className="font-bold text-gray-700 text-sm">{opt.key}.</span>
                  <span className={`text-gray-800 ${fontClass}`}>{opt.text}</span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Bottom Action Footer (Official TCS iON Controls) */}
      <div className="bg-slate-100 border-t border-gray-300 px-4 py-3 flex flex-wrap justify-between items-center gap-3">
        {/* Left Side: Mark for Review & Clear Response */}
        <div className="flex items-center gap-2">
          <button
            onClick={onMarkForReviewAndNext}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded text-xs md:text-sm font-semibold bg-purple-50 text-purple-800 border border-purple-300 hover:bg-purple-100 transition-colors shadow-xs active:scale-95"
            title="Mark this question to review later and proceed"
          >
            <Bookmark className="w-4 h-4 text-purple-700" />
            <span>Mark for Review & Next</span>
          </button>

          <button
            onClick={onClearResponse}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded text-xs md:text-sm font-semibold bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors shadow-xs active:scale-95"
            title="Deselect chosen option"
          >
            <RotateCcw className="w-3.5 h-3.5 text-gray-500" />
            <span>Clear Response</span>
          </button>
        </div>

        {/* Right Side: Save & Next */}
        <div>
          <button
            onClick={onSaveAndNext}
            className="flex items-center gap-2 px-6 py-2 rounded text-xs md:text-sm font-bold bg-[#1e88e5] hover:bg-[#1565c0] text-white transition-all shadow-md active:scale-95"
          >
            <span>Save & Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
