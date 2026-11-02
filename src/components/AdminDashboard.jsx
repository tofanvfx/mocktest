import React, { useState, useRef } from 'react';
import {
  Upload, FileText, PlusCircle, Trash2, Edit3, CheckCircle,
  Play, Download, UploadCloud, AlertCircle, Sparkles, Eye,
  HelpCircle, RefreshCw, Layers, Check, X
} from 'lucide-react';
import { extractTextFromPdf, parseQuestionsFromRawText } from '../utils/pdfParser';

export default function AdminDashboard({
  questions,
  onUpdateQuestions,
  examConfig,
  onUpdateExamConfig,
  onLaunchExam,
  onBackToPortal
}) {
  const [activeTab, setActiveTab] = useState('pdf_upload'); // 'pdf_upload' | 'text_paste' | 'manual_add'
  const [selectedSection, setSelectedSection] = useState('reasoning');
  const [isProcessingPdf, setIsProcessingPdf] = useState(false);
  const [pdfStatusMessage, setPdfStatusMessage] = useState('');
  const [rawPastedText, setRawPastedText] = useState('');
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSection, setFilterSection] = useState('ALL');

  // Manual Add Form State
  const [manualForm, setManualForm] = useState({
    sectionId: 'reasoning',
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: 'A',
    explanation: ''
  });

  const fileInputRef = useRef(null);

  // Sample PDF text snippet helper
  const handleInsertSampleText = () => {
    const sample = `1. In a certain code language, if 'COMPUTER' is written as 'RFUVQNPC', how will 'MEDICINE' be written in that code?
(A) EOJDJEFM
(B) EOJDEJFM
(C) MFEJDJOE
(D) MFEDJJOE
Answer: A
Explanation: The first and last letters are reversed and each middle letter is shifted by +1 in reverse order.

2. Which Indian state has the longest coastline in mainland India?
A) Tamil Nadu
B) Maharashtra
C) Gujarat
D) Andhra Pradesh
Ans: C
Explanation: Gujarat has the longest mainland coastline of approximately 1,600 km.

3. The compound interest on ₹10,000 for 2 years at 10% per annum, compounded annually is:
(A) ₹2,000
(B) ₹2,100
(C) ₹2,200
(D) ₹2,050
Correct: B
Sol: Amount = 10000 * (1 + 10/100)^2 = 10000 * 1.21 = ₹12,100. CI = ₹12,100 - ₹10,000 = ₹2,100.

4. Select the most appropriate ANTONYM of the given word: 'CANDID'
(A) Frank
(B) Honest
(C) Devious
(D) Outspoken
Answer: C
Explanation: Candid means truthful and straightforward. Devious means deceitful and underhanded.`;

    setRawPastedText(sample);
  };

  // PDF File Upload Handler
  const handlePdfFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessingPdf(true);
      setPdfStatusMessage(`Extracting text from "${file.name}"...`);

      const extractedText = await extractTextFromPdf(file);
      setPdfStatusMessage(`Successfully extracted text (${extractedText.length} characters). Parsing questions...`);

      const parsed = parseQuestionsFromRawText(extractedText, selectedSection);

      if (parsed.length === 0) {
        alert("No clearly structured questions detected in the PDF. Please check if the PDF contains selectable text or try pasting text directly in the 'Paste Text' tab.");
        setPdfStatusMessage("Extraction completed, but 0 questions matched the pattern. Try pasting text.");
        return;
      }

      // Append with incremental IDs
      const nextId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1;
      const renumbered = parsed.map((q, idx) => ({
        ...q,
        id: nextId + idx,
        sectionId: selectedSection
      }));

      onUpdateQuestions([...questions, ...renumbered]);
      setPdfStatusMessage(`🎉 Successfully added ${renumbered.length} questions from "${file.name}"!`);

      // Reset file input
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      console.error(err);
      alert(`PDF Extraction failed: ${err.message}`);
      setPdfStatusMessage(`Error: ${err.message}`);
    } finally {
      setIsProcessingPdf(false);
    }
  };

  // Parse Pasted Text
  const handleParsePastedText = () => {
    if (!rawPastedText.trim()) {
      alert("Please paste question text first.");
      return;
    }

    const parsed = parseQuestionsFromRawText(rawPastedText, selectedSection);
    if (parsed.length === 0) {
      alert("Could not detect any questions. Ensure questions are numbered (e.g., 1., Q1.) with options (A, B, C, D).");
      return;
    }

    const nextId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1;
    const renumbered = parsed.map((q, idx) => ({
      ...q,
      id: nextId + idx,
      sectionId: selectedSection
    }));

    onUpdateQuestions([...questions, ...renumbered]);
    setRawPastedText('');
    alert(`Successfully added ${renumbered.length} questions to your Question Bank!`);
  };

  // Manual Add Form Submit
  const handleAddManualQuestion = (e) => {
    e.preventDefault();
    if (!manualForm.question.trim()) {
      alert("Please enter the question statement.");
      return;
    }

    const nextId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1;

    const newQ = {
      id: nextId,
      sectionId: manualForm.sectionId,
      correctAnswer: manualForm.correctAnswer,
      en: {
        question: manualForm.question,
        options: [
          { key: 'A', text: manualForm.optionA || 'Option A' },
          { key: 'B', text: manualForm.optionB || 'Option B' },
          { key: 'C', text: manualForm.optionC || 'Option C' },
          { key: 'D', text: manualForm.optionD || 'Option D' },
        ],
        explanation: manualForm.explanation || 'No detailed explanation provided.'
      },
      hi: {
        question: manualForm.question,
        options: [
          { key: 'A', text: manualForm.optionA || 'Option A' },
          { key: 'B', text: manualForm.optionB || 'Option B' },
          { key: 'C', text: manualForm.optionC || 'Option C' },
          { key: 'D', text: manualForm.optionD || 'Option D' },
        ],
        explanation: manualForm.explanation || 'कोई विस्तृत व्याख्या उपलब्ध नहीं है।'
      }
    };

    onUpdateQuestions([...questions, newQ]);

    // Reset form
    setManualForm({
      sectionId: manualForm.sectionId,
      question: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: 'A',
      explanation: ''
    });

    alert("Question added successfully!");
  };

  // Change correct answer directly from pill
  const handleQuickAnswerChange = (qId, newAns) => {
    onUpdateQuestions(
      questions.map(q => q.id === qId ? { ...q, correctAnswer: newAns } : q)
    );
  };

  // Delete question
  const handleDeleteQuestion = (qId) => {
    if (confirm(`Are you sure you want to delete Question ${qId}?`)) {
      onUpdateQuestions(questions.filter(q => q.id !== qId));
    }
  };

  // Clear all questions
  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear all questions in the question bank?")) {
      onUpdateQuestions([]);
    }
  };

  // Export questions to JSON file
  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      exam: examConfig,
      questions
    }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${examConfig.name.replace(/\s+/g, '_')}_questions.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Filtered questions
  const filteredQuestions = questions.filter(q => {
    const matchesSection = filterSection === 'ALL' || q.sectionId === filterSection;
    const textEn = q.en?.question?.toLowerCase() || '';
    const matchesSearch = textEn.includes(searchQuery.toLowerCase()) || String(q.id).includes(searchQuery);
    return matchesSection && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans select-none">
      {/* Top Navbar */}
      <header className="bg-[#1e3c72] text-white px-6 py-3 shadow-md flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-400 text-blue-900 font-bold flex items-center justify-center text-base shadow">
            ⚙️
          </div>
          <div>
            <h1 className="text-base md:text-lg font-bold tracking-wide">
              Exam Creator & Question Bank Dashboard
            </h1>
            <p className="text-xs text-blue-200">
              Upload PDF question papers, parse options, configure test settings & simulate CBT
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onBackToPortal}
            className="px-3.5 py-1.5 rounded text-xs font-semibold bg-blue-900/80 hover:bg-blue-900 text-blue-100 border border-blue-400/30 transition-all"
          >
            Candidate View
          </button>

          <button
            onClick={onLaunchExam}
            disabled={questions.length === 0}
            className={`flex items-center gap-1.5 px-4 py-2 rounded text-xs font-bold shadow-md transition-all ${
              questions.length > 0
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white active:scale-95'
                : 'bg-gray-400 text-gray-200 cursor-not-allowed'
            }`}
          >
            <Play className="w-4 h-4 fill-white" />
            <span>LAUNCH CBT EXAM ({questions.length} Qs)</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto w-full p-4 md:p-6 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input Modes (Upload / Paste / Form) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Test Setup Card */}
          <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-4">
            <h2 className="text-xs font-bold text-gray-600 uppercase mb-3 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-blue-700" />
              Mock Test Configuration
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Test Name:</label>
                <input
                  type="text"
                  value={examConfig.name}
                  onChange={(e) => onUpdateExamConfig({ ...examConfig, name: e.target.value })}
                  className="w-full border border-gray-300 rounded px-2.5 py-1.5 font-medium text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Duration (Min):</label>
                  <input
                    type="number"
                    value={examConfig.durationMinutes}
                    onChange={(e) => onUpdateExamConfig({ ...examConfig, durationMinutes: Number(e.target.value) })}
                    className="w-full border border-gray-300 rounded px-2.5 py-1.5 font-medium text-gray-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Marks/Correct:</label>
                  <input
                    type="number"
                    step="0.5"
                    value={examConfig.marksPerCorrect}
                    onChange={(e) => onUpdateExamConfig({ ...examConfig, marksPerCorrect: Number(e.target.value) })}
                    className="w-full border border-gray-300 rounded px-2.5 py-1.5 font-medium text-gray-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Negative Marks:</label>
                  <input
                    type="number"
                    step="0.25"
                    value={examConfig.negativeMark}
                    onChange={(e) => onUpdateExamConfig({ ...examConfig, negativeMark: Number(e.target.value) })}
                    className="w-full border border-gray-300 rounded px-2.5 py-1.5 font-medium text-gray-900"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Input Method Selector Tabs */}
          <div className="bg-white rounded-lg border border-gray-300 shadow-sm flex flex-col flex-1 overflow-hidden">
            <div className="bg-slate-100 border-b border-gray-300 flex">
              <button
                onClick={() => setActiveTab('pdf_upload')}
                className={`flex-1 py-2.5 px-3 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                  activeTab === 'pdf_upload'
                    ? 'bg-white text-blue-800 border-blue-700 shadow-xs'
                    : 'text-gray-600 hover:text-gray-900 border-transparent hover:bg-slate-200/50'
                }`}
              >
                <UploadCloud className="w-4 h-4" />
                <span>Upload PDF</span>
              </button>

              <button
                onClick={() => setActiveTab('text_paste')}
                className={`flex-1 py-2.5 px-3 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                  activeTab === 'text_paste'
                    ? 'bg-white text-blue-800 border-blue-700 shadow-xs'
                    : 'text-gray-600 hover:text-gray-900 border-transparent hover:bg-slate-200/50'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Paste PDF Text</span>
              </button>

              <button
                onClick={() => setActiveTab('manual_add')}
                className={`flex-1 py-2.5 px-3 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                  activeTab === 'manual_add'
                    ? 'bg-white text-blue-800 border-blue-700 shadow-xs'
                    : 'text-gray-600 hover:text-gray-900 border-transparent hover:bg-slate-200/50'
                }`}
              >
                <PlusCircle className="w-4 h-4" />
                <span>Manual Form</span>
              </button>
            </div>

            {/* Tab Body */}
            <div className="p-4 flex-1 flex flex-col">
              {/* Common Section Selector */}
              <div className="mb-3">
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Assign to Subject / Section:
                </label>
                <select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-300 rounded px-2.5 py-1.5 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {examConfig.sections.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.hindiName})
                    </option>
                  ))}
                </select>
              </div>

              {/* TAB 1: PDF UPLOAD */}
              {activeTab === 'pdf_upload' && (
                <div className="flex-1 flex flex-col justify-between space-y-4">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-blue-300 hover:border-blue-500 rounded-lg p-6 bg-blue-50/40 hover:bg-blue-50/80 transition-all cursor-pointer flex flex-col items-center justify-center text-center group"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf"
                      onChange={handlePdfFileUpload}
                      className="hidden"
                    />

                    <div className="w-12 h-12 rounded-full bg-blue-100 group-hover:bg-blue-200 flex items-center justify-center text-blue-700 mb-2 transition-colors">
                      <Upload className="w-6 h-6" />
                    </div>

                    <h3 className="text-xs font-bold text-gray-800">
                      Click to Browse or Drag & Drop PDF
                    </h3>
                    <p className="text-[11px] text-gray-500 mt-1 max-w-xs">
                      Supports question papers with numbering (1., Q1.) and options (A, B, C, D).
                    </p>
                  </div>

                  {isProcessingPdf && (
                    <div className="p-3 bg-amber-50 border border-amber-300 rounded text-xs text-amber-900 flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin text-amber-700 shrink-0" />
                      <span>{pdfStatusMessage}</span>
                    </div>
                  )}

                  {pdfStatusMessage && !isProcessingPdf && (
                    <div className="p-3 bg-emerald-50 border border-emerald-300 rounded text-xs text-emerald-900">
                      {pdfStatusMessage}
                    </div>
                  )}

                  <div className="p-3 bg-slate-50 rounded border border-gray-200 text-[11px] text-gray-600 space-y-1">
                    <div className="font-bold text-gray-700 flex items-center gap-1">
                      💡 Recommended PDF Format:
                    </div>
                    <div>• Standard format: Question statement followed by (A), (B), (C), (D) options.</div>
                    <div>• Includes Answer key: "Ans: B" or "Answer: (C)" (optional, defaults to A).</div>
                    <div>• Explanation: "Exp: ..." or "Solution: ..." will be saved into the solution key.</div>
                  </div>
                </div>
              )}

              {/* TAB 2: TEXT PASTE */}
              {activeTab === 'text_paste' && (
                <div className="flex-1 flex flex-col space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-gray-700">
                      Paste Raw Questions Text:
                    </span>
                    <button
                      onClick={handleInsertSampleText}
                      className="text-[11px] text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1 underline"
                    >
                      <Sparkles className="w-3 h-3" />
                      Insert Sample Format
                    </button>
                  </div>

                  <textarea
                    rows={12}
                    value={rawPastedText}
                    onChange={(e) => setRawPastedText(e.target.value)}
                    placeholder={`1. What is the capital of India?\n(A) Mumbai\n(B) New Delhi\n(C) Kolkata\n(D) Chennai\nAnswer: B\nExplanation: New Delhi is the capital of India.`}
                    className="w-full flex-1 border border-gray-300 rounded p-2.5 text-xs font-mono text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />

                  <button
                    onClick={handleParsePastedText}
                    className="w-full bg-[#1e88e5] hover:bg-[#1565c0] text-white font-bold py-2 px-4 rounded text-xs shadow-sm transition-all flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>SMART PARSE & ADD QUESTIONS</span>
                  </button>
                </div>
              )}

              {/* TAB 3: MANUAL FORM */}
              {activeTab === 'manual_add' && (
                <form onSubmit={handleAddManualQuestion} className="flex-1 overflow-y-auto space-y-3 text-xs">
                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">Question Statement:</label>
                    <textarea
                      rows={3}
                      value={manualForm.question}
                      onChange={(e) => setManualForm({ ...manualForm, question: e.target.value })}
                      placeholder="Type question text here..."
                      className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="font-semibold text-gray-700 block mb-0.5">Option A:</label>
                      <input
                        type="text"
                        value={manualForm.optionA}
                        onChange={(e) => setManualForm({ ...manualForm, optionA: e.target.value })}
                        placeholder="Option A"
                        className="w-full border border-gray-300 rounded p-1.5"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-gray-700 block mb-0.5">Option B:</label>
                      <input
                        type="text"
                        value={manualForm.optionB}
                        onChange={(e) => setManualForm({ ...manualForm, optionB: e.target.value })}
                        placeholder="Option B"
                        className="w-full border border-gray-300 rounded p-1.5"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-gray-700 block mb-0.5">Option C:</label>
                      <input
                        type="text"
                        value={manualForm.optionC}
                        onChange={(e) => setManualForm({ ...manualForm, optionC: e.target.value })}
                        placeholder="Option C"
                        className="w-full border border-gray-300 rounded p-1.5"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-gray-700 block mb-0.5">Option D:</label>
                      <input
                        type="text"
                        value={manualForm.optionD}
                        onChange={(e) => setManualForm({ ...manualForm, optionD: e.target.value })}
                        placeholder="Option D"
                        className="w-full border border-gray-300 rounded p-1.5"
                      />
                    </div>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded border border-gray-200 flex items-center justify-between">
                    <span className="font-bold text-gray-700">Correct Option:</span>
                    <div className="flex gap-2">
                      {['A', 'B', 'C', 'D'].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setManualForm({ ...manualForm, correctAnswer: opt })}
                          className={`w-7 h-7 rounded font-bold text-xs flex items-center justify-center transition-all ${
                            manualForm.correctAnswer === opt
                              ? 'bg-emerald-600 text-white shadow'
                              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">Explanation (Optional):</label>
                    <textarea
                      rows={2}
                      value={manualForm.explanation}
                      onChange={(e) => setManualForm({ ...manualForm, explanation: e.target.value })}
                      placeholder="Step-by-step solution..."
                      className="w-full border border-gray-300 rounded p-2"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded text-xs shadow-sm transition-all"
                  >
                    + ADD QUESTION TO BANK
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Question Bank & Management */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="bg-white rounded-lg border border-gray-300 shadow-sm flex flex-col flex-1 overflow-hidden">
            {/* Bank Header */}
            <div className="bg-slate-100 border-b border-gray-300 p-3.5 flex flex-wrap justify-between items-center gap-3">
              <div>
                <h2 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                  <span>Question Bank</span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full font-mono font-bold">
                    {questions.length} Questions
                  </span>
                </h2>
              </div>

              {/* Search & Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportJson}
                  disabled={questions.length === 0}
                  className="px-2.5 py-1 text-xs font-semibold bg-white border border-gray-300 hover:bg-gray-50 rounded flex items-center gap-1 text-gray-700 shadow-xs"
                  title="Export questions to JSON"
                >
                  <Download className="w-3.5 h-3.5 text-gray-500" />
                  <span>Export</span>
                </button>

                <button
                  onClick={handleClearAll}
                  disabled={questions.length === 0}
                  className="px-2.5 py-1 text-xs font-semibold bg-rose-50 border border-rose-200 hover:bg-rose-100 rounded flex items-center gap-1 text-rose-700 shadow-xs"
                  title="Delete all questions"
                >
                  <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                  <span>Clear All</span>
                </button>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="p-3 bg-slate-50 border-b border-gray-200 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 flex-1 max-w-sm">
                <input
                  type="text"
                  placeholder="Search question text or Q.No..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded px-2.5 py-1 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-1">
                <span className="text-gray-500 font-medium">Filter:</span>
                <select
                  value={filterSection}
                  onChange={(e) => setFilterSection(e.target.value)}
                  className="bg-white border border-gray-300 rounded px-2 py-1 text-xs font-semibold text-gray-800"
                >
                  <option value="ALL">All Sections ({questions.length})</option>
                  {examConfig.sections.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({questions.filter(q => q.sectionId === s.id).length})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Question List View */}
            <div className="p-4 flex-1 overflow-y-auto space-y-3 max-h-[640px]">
              {filteredQuestions.length === 0 ? (
                <div className="text-center py-12 text-gray-400 text-xs">
                  <HelpCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <div>No questions in the bank matching your filter.</div>
                  <div className="mt-1 text-gray-500">
                    Upload a PDF or paste question text on the left to add questions!
                  </div>
                </div>
              ) : (
                filteredQuestions.map((q) => {
                  const qData = q.en || q.hi;
                  const secName = examConfig.sections.find(s => s.id === q.sectionId)?.name || q.sectionId;

                  return (
                    <div
                      key={q.id}
                      className="border border-gray-200 hover:border-gray-300 rounded-lg p-3.5 bg-white shadow-xs space-y-2 text-xs"
                    >
                      {/* Top Bar */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded text-xs font-mono">
                            Q.{q.id}
                          </span>
                          <span className="text-[11px] font-semibold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                            {secName}
                          </span>
                        </div>

                        {/* Quick Answer Selector + Delete */}
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <span className="text-[11px] text-gray-500 font-medium">Ans:</span>
                            <div className="flex gap-1">
                              {['A', 'B', 'C', 'D'].map((opt) => (
                                <button
                                  key={opt}
                                  onClick={() => handleQuickAnswerChange(q.id, opt)}
                                  className={`w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center transition-all ${
                                    q.correctAnswer === opt
                                      ? 'bg-emerald-600 text-white shadow-xs'
                                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                  }`}
                                  title={`Set Option ${opt} as correct`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </div>

                          <button
                            onClick={() => handleDeleteQuestion(q.id)}
                            className="text-gray-400 hover:text-rose-600 p-1"
                            title="Delete question"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Question Text */}
                      <p className="font-medium text-gray-800 whitespace-pre-line leading-relaxed">
                        {qData.question}
                      </p>

                      {/* Options Grid */}
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        {qData.options.map((opt) => {
                          const isCorrect = opt.key === q.correctAnswer;
                          return (
                            <div
                              key={opt.key}
                              className={`p-1.5 rounded border flex items-center justify-between ${
                                isCorrect
                                  ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold'
                                  : 'bg-slate-50 border-gray-200 text-gray-700'
                              }`}
                            >
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold">{opt.key}.</span>
                                <span className="truncate max-w-[200px]">{opt.text}</span>
                              </div>
                              {isCorrect && (
                                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Explanation if available */}
                      {qData.explanation && (
                        <div className="text-[11px] text-gray-500 bg-gray-50 p-1.5 rounded border border-gray-200 truncate">
                          <strong className="text-gray-700">Exp:</strong> {qData.explanation}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
