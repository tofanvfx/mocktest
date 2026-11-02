import React, { useState } from 'react';
import { Award, CheckCircle, XCircle, MinusCircle, RefreshCw, BookOpen, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';

export default function ResultAnalytics({
  exam,
  candidate,
  questions,
  questionStates,
  answers, // { [qId]: 'A' | 'B' | 'C' | 'D' }
  timeTakenSeconds,
  onRetakeExam,
  onChangeExam
}) {
  const [filterType, setFilterType] = useState('ALL'); // 'ALL', 'CORRECT', 'INCORRECT', 'SKIPPED'
  const [language, setLanguage] = useState('en');
  const [expandedSolutions, setExpandedSolutions] = useState({});

  // Evaluate candidate responses
  let correctCount = 0;
  let incorrectCount = 0;
  let skippedCount = 0;

  const evaluatedQuestions = questions.map((q) => {
    const state = questionStates[q.id] || 'not_visited';
    const candidateAnswer = answers[q.id] || null;

    // Evaluated only if:
    // 1) state === 'answered'
    // 2) state === 'answered_marked_review'
    const isConsidered = state === 'answered' || state === 'answered_marked_review';

    let result = 'SKIPPED';
    let marksScored = 0;

    if (isConsidered && candidateAnswer) {
      if (candidateAnswer === q.correctAnswer) {
        result = 'CORRECT';
        marksScored = exam.marksPerCorrect;
        correctCount++;
      } else {
        result = 'INCORRECT';
        marksScored = -exam.negativeMark;
        incorrectCount++;
      }
    } else {
      skippedCount++;
    }

    return {
      ...q,
      candidateAnswer,
      result,
      marksScored,
      state
    };
  });

  const totalScore = (correctCount * exam.marksPerCorrect) - (incorrectCount * exam.negativeMark);
  const maxPossibleMarks = questions.length * exam.marksPerCorrect;
  const attemptedCount = correctCount + incorrectCount;
  const accuracy = attemptedCount > 0 ? ((correctCount / attemptedCount) * 100).toFixed(1) : '0.0';
  const percentage = maxPossibleMarks > 0 ? ((totalScore / maxPossibleMarks) * 100).toFixed(1) : '0.0';

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  // Filtered list for detailed review
  const filteredQuestions = evaluatedQuestions.filter((q) => {
    if (filterType === 'CORRECT') return q.result === 'CORRECT';
    if (filterType === 'INCORRECT') return q.result === 'INCORRECT';
    if (filterType === 'SKIPPED') return q.result === 'SKIPPED';
    return true;
  });

  const toggleSolution = (id) => {
    setExpandedSolutions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Header */}
      <header className="bg-[#1e3c72] text-white px-6 py-3.5 shadow-md flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-400 text-blue-900 font-bold flex items-center justify-center text-base shadow">
            🏛️
          </div>
          <div>
            <h1 className="font-bold text-base md:text-lg leading-tight">
              Test Performance & Solution Analytics
            </h1>
            <p className="text-xs text-blue-200">
              {exam.name} • Candidate: {candidate.name} ({candidate.rollNumber})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onRetakeExam}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retake Test</span>
          </button>
          <button
            onClick={onChangeExam}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold bg-slate-700 hover:bg-slate-600 text-white shadow transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Change Exam</span>
          </button>
        </div>
      </header>

      {/* Main Analysis Container */}
      <main className="max-w-6xl mx-auto w-full p-4 md:p-6 flex-1 space-y-6">
        {/* Score Highlights Card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
            <div className="text-xs text-blue-800 font-semibold uppercase">Total Score</div>
            <div className="text-2xl font-black text-blue-900 mt-1">
              {totalScore.toFixed(2)}
              <span className="text-xs font-normal text-blue-600"> / {maxPossibleMarks}</span>
            </div>
          </div>

          <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
            <div className="text-xs text-emerald-800 font-semibold uppercase">Accuracy</div>
            <div className="text-2xl font-black text-emerald-700 mt-1">{accuracy}%</div>
          </div>

          <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
            <div className="text-xs text-purple-800 font-semibold uppercase">Attempt Rate</div>
            <div className="text-2xl font-black text-purple-900 mt-1">
              {attemptedCount}
              <span className="text-xs font-normal text-purple-600"> / {questions.length}</span>
            </div>
          </div>

          <div className="p-3 bg-green-50 rounded-lg border border-green-100">
            <div className="text-xs text-green-800 font-semibold uppercase">Correct (✓)</div>
            <div className="text-2xl font-black text-green-700 mt-1">{correctCount}</div>
          </div>

          <div className="p-3 bg-rose-50 rounded-lg border border-rose-100">
            <div className="text-xs text-rose-800 font-semibold uppercase">Incorrect (✗)</div>
            <div className="text-2xl font-black text-rose-700 mt-1">{incorrectCount}</div>
          </div>

          <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
            <div className="text-xs text-amber-800 font-semibold uppercase">Time Taken</div>
            <div className="text-2xl font-black text-amber-900 mt-1">{formatTime(timeTakenSeconds)}</div>
          </div>
        </div>

        {/* Sectional Performance Breakdown */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
          <h2 className="font-bold text-gray-800 text-sm md:text-base mb-3 flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-700" />
            Section-Wise Performance Breakdown
          </h2>

          <div className="overflow-x-auto border border-gray-200 rounded">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 font-bold text-gray-700 border-b border-gray-200 uppercase text-[11px]">
                  <th className="py-2.5 px-3">Section</th>
                  <th className="py-2.5 px-2 text-center">Total</th>
                  <th className="py-2.5 px-2 text-center text-emerald-700">Correct</th>
                  <th className="py-2.5 px-2 text-center text-rose-700">Incorrect</th>
                  <th className="py-2.5 px-2 text-center text-gray-600">Skipped</th>
                  <th className="py-2.5 px-2 text-center text-blue-800">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 font-medium">
                {exam.sections.map((sec) => {
                  const secQs = evaluatedQuestions.filter((q) => q.sectionId === sec.id);
                  const c = secQs.filter((q) => q.result === 'CORRECT').length;
                  const w = secQs.filter((q) => q.result === 'INCORRECT').length;
                  const s = secQs.filter((q) => q.result === 'SKIPPED').length;
                  const secScore = (c * exam.marksPerCorrect) - (w * exam.negativeMark);

                  return (
                    <tr key={sec.id} className="hover:bg-slate-50">
                      <td className="py-2 px-3 font-semibold text-gray-900">{sec.name}</td>
                      <td className="py-2 px-2 text-center">{secQs.length}</td>
                      <td className="py-2 px-2 text-center text-emerald-600 font-bold">{c}</td>
                      <td className="py-2 px-2 text-center text-rose-600 font-bold">{w}</td>
                      <td className="py-2 px-2 text-center text-gray-500">{s}</td>
                      <td className="py-2 px-2 text-center font-bold text-blue-900">
                        {secScore.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Solutions & Question-wise review */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 space-y-4">
          <div className="flex flex-wrap justify-between items-center gap-3 border-b border-gray-200 pb-3">
            <h2 className="font-bold text-gray-800 text-sm md:text-base flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-700" />
              Detailed Solutions & Answers Key
            </h2>

            {/* Filter buttons & language switch */}
            <div className="flex items-center gap-3">
              {/* Language switcher */}
              <div className="flex items-center gap-1 text-xs border rounded p-1 bg-slate-50">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-2 py-0.5 rounded ${language === 'en' ? 'bg-blue-600 text-white font-bold' : 'text-gray-700'}`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('hi')}
                  className={`px-2 py-0.5 rounded ${language === 'hi' ? 'bg-blue-600 text-white font-bold' : 'text-gray-700'}`}
                >
                  हिन्दी
                </button>
              </div>

              {/* Status Filters */}
              <div className="flex items-center gap-1 text-xs">
                <button
                  onClick={() => setFilterType('ALL')}
                  className={`px-2.5 py-1 rounded font-medium ${
                    filterType === 'ALL' ? 'bg-blue-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All ({evaluatedQuestions.length})
                </button>
                <button
                  onClick={() => setFilterType('CORRECT')}
                  className={`px-2.5 py-1 rounded font-medium ${
                    filterType === 'CORRECT' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                  }`}
                >
                  Correct ({correctCount})
                </button>
                <button
                  onClick={() => setFilterType('INCORRECT')}
                  className={`px-2.5 py-1 rounded font-medium ${
                    filterType === 'INCORRECT' ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
                  }`}
                >
                  Incorrect ({incorrectCount})
                </button>
                <button
                  onClick={() => setFilterType('SKIPPED')}
                  className={`px-2.5 py-1 rounded font-medium ${
                    filterType === 'SKIPPED' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Skipped ({skippedCount})
                </button>
              </div>
            </div>
          </div>

          {/* Question List */}
          <div className="space-y-4">
            {filteredQuestions.map((q) => {
              const qData = q[language] || q.en;
              const isExpanded = expandedSolutions[q.id] !== false; // default open

              return (
                <div
                  key={q.id}
                  className={`border rounded-lg p-4 transition-all ${
                    q.result === 'CORRECT'
                      ? 'border-emerald-300 bg-emerald-50/20'
                      : q.result === 'INCORRECT'
                      ? 'border-rose-300 bg-rose-50/20'
                      : 'border-gray-200 bg-slate-50/30'
                  }`}
                >
                  {/* Top Bar for Question */}
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 text-sm">
                        Q.{q.id}
                      </span>
                      <span className="text-xs text-gray-500 uppercase font-medium bg-gray-100 px-2 py-0.5 rounded">
                        {exam.sections.find((s) => s.id === q.sectionId)?.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {q.result === 'CORRECT' && (
                        <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Correct (+{exam.marksPerCorrect})
                        </span>
                      )}
                      {q.result === 'INCORRECT' && (
                        <span className="flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full">
                          <XCircle className="w-3.5 h-3.5" />
                          Incorrect (-{exam.negativeMark})
                        </span>
                      )}
                      {q.result === 'SKIPPED' && (
                        <span className="flex items-center gap-1 text-xs font-bold text-gray-600 bg-gray-200 px-2.5 py-0.5 rounded-full">
                          <MinusCircle className="w-3.5 h-3.5" />
                          Not Attempted (0.0)
                        </span>
                      )}

                      <button
                        onClick={() => toggleSolution(q.id)}
                        className="text-gray-500 hover:text-gray-800 p-1"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Question Text */}
                  <p className="text-sm font-medium text-gray-900 mb-3 whitespace-pre-line leading-relaxed">
                    {qData.question}
                  </p>

                  {/* Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs mb-3">
                    {qData.options.map((opt) => {
                      const isCorrect = opt.key === q.correctAnswer;
                      const isChosen = opt.key === q.candidateAnswer;

                      let style = 'bg-white border-gray-200 text-gray-700';

                      if (isCorrect) {
                        style = 'bg-emerald-100/80 border-emerald-500 text-emerald-950 font-bold ring-1 ring-emerald-500';
                      } else if (isChosen && !isCorrect) {
                        style = 'bg-rose-100/80 border-rose-500 text-rose-950 font-bold ring-1 ring-rose-500';
                      }

                      return (
                        <div
                          key={opt.key}
                          className={`p-2.5 rounded border flex items-center justify-between ${style}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-bold">{opt.key}.</span>
                            <span>{opt.text}</span>
                          </div>
                          {isCorrect && (
                            <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-200 px-1.5 py-0.5 rounded">
                              Correct Answer
                            </span>
                          )}
                          {isChosen && !isCorrect && (
                            <span className="text-[10px] uppercase font-bold text-rose-700 bg-rose-200 px-1.5 py-0.5 rounded">
                              Your Answer
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Step-by-Step Explanation Accordion */}
                  {isExpanded && (
                    <div className="mt-3 p-3 bg-blue-50/70 border border-blue-200 rounded text-xs text-blue-950 space-y-1">
                      <div className="font-bold text-blue-900 flex items-center gap-1">
                        💡 Explanation / समाधान:
                      </div>
                      <p className="whitespace-pre-line leading-relaxed text-gray-800">
                        {qData.explanation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
