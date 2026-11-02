import React, { useState } from 'react';
import { EXAM_PRESETS } from '../data/mockExams';
import { CheckCircle2, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';

export default function PreExamScreen({ onStartExam, candidate, onUpdateCandidate, onOpenDashboard, questionCount }) {
  const [selectedExamId, setSelectedExamId] = useState(EXAM_PRESETS[0].id);
  const [hasAgreed, setHasAgreed] = useState(false);
  const [instructionLang, setInstructionLang] = useState('en');

  const selectedExam = EXAM_PRESETS.find(e => e.id === selectedExamId) || EXAM_PRESETS[0];

  const handleStart = () => {
    if (!hasAgreed) return;
    onStartExam(selectedExam);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
      {/* Top Bar */}
      <div className="bg-[#1e3c72] text-white px-6 py-3 shadow-md flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-amber-400 text-blue-900 font-bold flex items-center justify-center text-base shadow">
            🏛️
          </div>
          <div>
            <h1 className="text-base md:text-lg font-bold tracking-wide uppercase">
              Staff Selection Commission & Govt. Exam CBT Portal
            </h1>
            <p className="text-xs text-blue-200">
              Official Computer Based Test (CBT) Mock Simulator
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenDashboard}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold bg-amber-400 hover:bg-amber-300 text-blue-950 shadow transition-all active:scale-95"
          >
            <span>📄 Upload PDF Questions ({questionCount})</span>
          </button>
          <span className="hidden sm:inline bg-blue-900/80 px-2.5 py-1 rounded border border-blue-400/30 text-amber-300 font-mono text-xs">
            System ID: C042-LAB3
          </span>
        </div>
      </div>

      {/* Main Instructions & Candidate Card */}
      <main className="max-w-6xl mx-auto w-full p-4 md:p-6 flex-1 flex flex-col gap-6">
        {/* Candidate & Test Selection Bar */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
              Select Examination Pattern:
            </label>
            <select
              value={selectedExamId}
              onChange={(e) => setSelectedExamId(e.target.value)}
              className="w-full bg-blue-50 border border-blue-300 rounded px-3 py-2 text-sm font-semibold text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {EXAM_PRESETS.map((ex) => (
                <option key={ex.id} value={ex.id}>
                  {ex.name} ({ex.durationMinutes} Mins • {ex.totalQuestions} Qs)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
              Candidate Name:
            </label>
            <input
              type="text"
              value={candidate.name}
              onChange={(e) => onUpdateCandidate({ ...candidate, name: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Candidate Name"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
              Roll Number / Registration No.:
            </label>
            <input
              type="text"
              value={candidate.rollNumber}
              onChange={(e) => onUpdateCandidate({ ...candidate, rollNumber: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Roll Number"
            />
          </div>
        </div>

        {/* Instructions Container */}
        <div className="bg-white rounded-lg border border-gray-300 shadow-sm flex flex-col flex-1 overflow-hidden">
          {/* Header */}
          <div className="bg-slate-100 border-b border-gray-300 px-6 py-3 flex justify-between items-center">
            <h2 className="font-bold text-gray-800 text-sm md:text-base flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-700" />
              General Instructions / सामान्य अनुदेश
            </h2>

            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-gray-600">Language:</span>
              <button
                onClick={() => setInstructionLang('en')}
                className={`px-2 py-1 rounded font-medium ${
                  instructionLang === 'en' ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setInstructionLang('hi')}
                className={`px-2 py-1 rounded font-medium ${
                  instructionLang === 'hi' ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                हिन्दी
              </button>
            </div>
          </div>

          {/* Instructions Body */}
          <div className="p-6 overflow-y-auto max-h-[500px] text-sm text-gray-800 space-y-5 leading-relaxed">
            {instructionLang === 'en' ? (
              <>
                <div className="bg-blue-50 border-l-4 border-blue-600 p-3 rounded text-xs text-blue-900 font-medium">
                  <strong>Please read the instructions carefully before starting the test:</strong>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-2">1. General Instructions:</h3>
                  <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
                    <li>Total duration of examination is <strong>{selectedExam.durationMinutes} minutes</strong>.</li>
                    <li>The clock will be set at the server. The countdown timer in the top right corner of the screen will display the remaining time available for you to complete the examination. When the timer reaches zero, the examination will end by itself.</li>
                    <li>You will be awarded <strong>+{selectedExam.marksPerCorrect} marks</strong> for each correct answer.</li>
                    <li>There will be a negative marking of <strong>-{selectedExam.negativeMark} marks</strong> for each wrong answer.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-2">2. Official Question Palette Symbols & Color Coding:</h3>
                  <p className="text-xs text-gray-600 mb-3">
                    The Question Palette displayed on the right side of screen will show the status of each question using one of the following 5 symbols:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-3 p-2 rounded border bg-slate-50">
                      <div className="palette-btn palette-not-visited">01</div>
                      <span>You have <strong>not visited</strong> the question yet.</span>
                    </div>

                    <div className="flex items-center gap-3 p-2 rounded border bg-slate-50">
                      <div className="palette-btn palette-not-answered">02</div>
                      <span>You have <strong>not answered</strong> the question.</span>
                    </div>

                    <div className="flex items-center gap-3 p-2 rounded border bg-slate-50">
                      <div className="palette-btn palette-answered">03</div>
                      <span>You have <strong>answered</strong> the question.</span>
                    </div>

                    <div className="flex items-center gap-3 p-2 rounded border bg-slate-50">
                      <div className="palette-btn palette-review">04</div>
                      <span>You have NOT answered the question, but have <strong>marked the question for review</strong>.</span>
                    </div>

                    <div className="flex items-center gap-3 p-2 rounded border bg-slate-50 md:col-span-2">
                      <div className="palette-btn palette-answered-review">05</div>
                      <span>
                        The question(s) <strong>"Answered and Marked for Review"</strong> will be <strong>considered for evaluation</strong>.
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-2">3. Navigating to a Question:</h3>
                  <p className="text-gray-700 text-xs">
                    To answer a question, click on the question number in the Question Palette at the right of your screen, or use the <strong>Save & Next</strong> button at the bottom.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="bg-blue-50 border-l-4 border-blue-600 p-3 rounded text-xs text-blue-900 font-medium">
                  <strong>कृपया परीक्षा शुरू करने से पहले निम्नलिखित निर्देशों को ध्यान से पढ़ें:</strong>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-2">1. सामान्य निर्देश:</h3>
                  <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
                    <li>परीक्षा की कुल अवधि <strong>{selectedExam.durationMinutes} मिनट</strong> है।</li>
                    <li>स्क्रीन के ऊपरी दाएं कोने में उल्टी गिनती घड़ी (Countdown Timer) आपके लिए शेष समय प्रदर्शित करेगी। जब समय शून्य हो जाएगा, तो परीक्षा स्वतः समाप्त हो जाएगी।</li>
                    <li>प्रत्येक सही उत्तर के लिए <strong>+{selectedExam.marksPerCorrect} अंक</strong> दिए जाएंगे।</li>
                    <li>प्रत्येक गलत उत्तर के लिए <strong>-{selectedExam.negativeMark} अंक</strong> काटे जाएंगे।</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-2">2. प्रश्न पैलेट के रंग और प्रतीक:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-3 p-2 rounded border bg-slate-50">
                      <div className="palette-btn palette-not-visited">01</div>
                      <span>आप अभी तक इस प्रश्न पर नहीं गए हैं।</span>
                    </div>

                    <div className="flex items-center gap-3 p-2 rounded border bg-slate-50">
                      <div className="palette-btn palette-not-answered">02</div>
                      <span>आपने इस प्रश्न का उत्तर नहीं दिया है।</span>
                    </div>

                    <div className="flex items-center gap-3 p-2 rounded border bg-slate-50">
                      <div className="palette-btn palette-answered">03</div>
                      <span>आप इस प्रश्न का उत्तर दे चुके हैं।</span>
                    </div>

                    <div className="flex items-center gap-3 p-2 rounded border bg-slate-50">
                      <div className="palette-btn palette-review">04</div>
                      <span>आपने प्रश्न का उत्तर नहीं दिया है, पर इसे पुनर्विचार के लिए चिह्नित किया है।</span>
                    </div>

                    <div className="flex items-center gap-3 p-2 rounded border bg-slate-50 md:col-span-2">
                      <div className="palette-btn palette-answered-review">05</div>
                      <span>
                        जिस प्रश्न का <strong>उत्तर दिया गया है और पुनर्विचार के लिए चिह्नित किया गया है</strong>, उस प्रश्न का <strong>मूल्यांकन किया जाएगा</strong>।
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Declaration Checkbox */}
            <div className="pt-4 border-t border-gray-200">
              <label className="flex items-start gap-3 cursor-pointer p-3 bg-amber-50 rounded border border-amber-200">
                <input
                  type="checkbox"
                  checked={hasAgreed}
                  onChange={(e) => setHasAgreed(e.target.checked)}
                  className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-xs text-gray-800 leading-normal">
                  <strong>Declaration:</strong> I have read and understood all the instructions. All computer hardware allotted to me are in proper working condition. I agree that in case of not adhering to instructions, I will be debarred from this examination.
                </span>
              </label>
            </div>
          </div>

          {/* Action Button */}
          <div className="bg-slate-50 border-t border-gray-300 p-4 flex justify-between items-center">
            <span className="text-xs text-gray-500 italic">
              {!hasAgreed ? 'Please check the declaration box to proceed' : 'Ready to start the test'}
            </span>
            <button
              onClick={handleStart}
              disabled={!hasAgreed}
              className={`px-8 py-2.5 rounded font-bold text-sm tracking-wide shadow-md transition-all ${
                hasAgreed
                  ? 'bg-blue-700 hover:bg-blue-800 text-white cursor-pointer active:scale-95'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              I AM READY TO BEGIN &gt;
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-gray-400 py-2.5 text-center text-xs">
        © 2026 Government Exam Computer Based Test (CBT) Simulator • High Fidelity TCS iON Engine
      </footer>
    </div>
  );
}
