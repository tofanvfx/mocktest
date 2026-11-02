import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import QuestionArea from './components/QuestionArea';
import QuestionPalette from './components/QuestionPalette';
import SubmitConfirmModal from './components/SubmitConfirmModal';
import ResultAnalytics from './components/ResultAnalytics';
import PreExamScreen from './components/PreExamScreen';
import AdminDashboard from './components/AdminDashboard';
import { EXAM_PRESETS, MOCK_QUESTIONS } from './data/mockExams';

export default function App() {
  const [appState, setAppState] = useState('PRE_EXAM'); // 'PRE_EXAM' | 'EXAM' | 'RESULT' | 'DASHBOARD'
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Candidate Profile
  const [candidate, setCandidate] = useState({
    name: 'Rahul Sharma',
    rollNumber: '2201094821',
    photo: null,
  });

  // Current Exam configuration
  const [selectedExam, setSelectedExam] = useState(EXAM_PRESETS[0]);
  const [questions, setQuestions] = useState(MOCK_QUESTIONS);

  // Exam Progress State
  const [activeSectionId, setActiveSectionId] = useState('reasoning');
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const [answers, setAnswers] = useState({}); // { [qId]: 'A' | 'B' | 'C' | 'D' }
  const [questionStates, setQuestionStates] = useState({}); // { [qId]: 'not_visited' | 'not_answered' | 'answered' | 'marked_review' | 'answered_marked_review' }

  // Settings
  const [language, setLanguage] = useState('en');
  const [fontSize, setFontSize] = useState('normal');

  // Timers
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(3600);
  const [timeTakenSeconds, setTimeTakenSeconds] = useState(0);
  const timerRef = useRef(null);

  // Start Exam Handler
  const handleStartExam = (exam = selectedExam) => {
    setSelectedExam(exam);
    if (!questions || questions.length === 0) {
      alert("No questions available in this test. Please add questions from the Dashboard first.");
      setAppState('DASHBOARD');
      return;
    }

    const initialDuration = (exam.durationMinutes || 60) * 60;
    setTimeLeftSeconds(initialDuration);
    setTimeTakenSeconds(0);

    // Initial question states: question 1 is 'not_answered' because candidate is viewing it, all others 'not_visited'
    const initialStates = {};
    questions.forEach((q, idx) => {
      initialStates[q.id] = idx === 0 ? 'not_answered' : 'not_visited';
    });
    setQuestionStates(initialStates);
    setAnswers({});

    // Set first active section
    const firstSec = exam.sections?.length > 0 ? exam.sections[0].id : questions[0].sectionId;
    setActiveSectionId(firstSec);
    setCurrentQuestionId(questions[0].id);
    setAppState('EXAM');
  };

  // Timer Effect
  useEffect(() => {
    if (appState === 'EXAM') {
      timerRef.current = setInterval(() => {
        setTimeLeftSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
        setTimeTakenSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [appState]);

  // Auto-submit when time expires
  const handleAutoSubmit = () => {
    setShowSubmitModal(false);
    setAppState('RESULT');
  };

  // Confirm Manual Submit
  const handleConfirmSubmit = () => {
    setShowSubmitModal(false);
    setAppState('RESULT');
  };

  // Select Option on Current Question
  const handleSelectOption = (optionKey) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionId]: optionKey,
    }));
  };

  // Clear Response
  const handleClearResponse = () => {
    setAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQuestionId];
      return copy;
    });

    setQuestionStates((prev) => ({
      ...prev,
      [currentQuestionId]: 'not_answered',
    }));
  };

  // Save & Next (Locks response, turns GREEN)
  const handleSaveAndNext = () => {
    const hasAnswer = answers[currentQuestionId] !== undefined;

    setQuestionStates((prev) => ({
      ...prev,
      [currentQuestionId]: hasAnswer ? 'answered' : 'not_answered',
    }));

    navigateToNextQuestion();
  };

  // Mark for Review & Next (Turns PURPLE or PURPLE+GREEN DOT)
  const handleMarkForReviewAndNext = () => {
    const hasAnswer = answers[currentQuestionId] !== undefined;

    setQuestionStates((prev) => ({
      ...prev,
      [currentQuestionId]: hasAnswer ? 'answered_marked_review' : 'marked_review',
    }));

    navigateToNextQuestion();
  };

  // Navigate to Next Question in Current Section or Next Section
  const navigateToNextQuestion = () => {
    const currentIndex = questions.findIndex((q) => q.id === currentQuestionId);
    if (currentIndex < questions.length - 1) {
      const nextQ = questions[currentIndex + 1];
      setCurrentQuestionId(nextQ.id);
      setActiveSectionId(nextQ.sectionId);

      // If next question was unvisited, mark it not_answered as candidate has opened it
      setQuestionStates((prev) => {
        if (!prev[nextQ.id] || prev[nextQ.id] === 'not_visited') {
          return { ...prev, [nextQ.id]: 'not_answered' };
        }
        return prev;
      });
    }
  };

  // Jump directly to a question via palette
  const handleSelectQuestion = (qId) => {
    setCurrentQuestionId(qId);
    const targetQ = questions.find((q) => q.id === qId);
    if (targetQ) {
      setActiveSectionId(targetQ.sectionId);
    }

    // If it was not visited, visiting it makes it not_answered
    setQuestionStates((prev) => {
      if (!prev[qId] || prev[qId] === 'not_visited') {
        return { ...prev, [qId]: 'not_answered' };
      }
      return prev;
    });
  };

  // Switch Active Section via Tab
  const handleSelectSection = (secId) => {
    setActiveSectionId(secId);
    const firstQ = questions.find((q) => q.sectionId === secId);
    if (firstQ) {
      handleSelectQuestion(firstQ.id);
    }
  };

  const currentQuestion = questions.find((q) => q.id === currentQuestionId) || questions[0];

  // =================== RENDER SCREENS ===================

  // 1. DASHBOARD: For uploading PDFs, pasting text, adding manual questions
  if (appState === 'DASHBOARD') {
    return (
      <AdminDashboard
        questions={questions}
        onUpdateQuestions={setQuestions}
        examConfig={selectedExam}
        onUpdateExamConfig={setSelectedExam}
        onLaunchExam={() => handleStartExam(selectedExam)}
        onBackToPortal={() => setAppState('PRE_EXAM')}
      />
    );
  }

  // 2. PRE_EXAM: Candidate instruction page
  if (appState === 'PRE_EXAM') {
    return (
      <PreExamScreen
        onStartExam={handleStartExam}
        candidate={candidate}
        onUpdateCandidate={setCandidate}
        onOpenDashboard={() => setAppState('DASHBOARD')}
        questionCount={questions.length}
      />
    );
  }

  // 3. RESULT: Post-exam scorecard and solutions review
  if (appState === 'RESULT') {
    return (
      <ResultAnalytics
        exam={selectedExam}
        candidate={candidate}
        questions={questions}
        questionStates={questionStates}
        answers={answers}
        timeTakenSeconds={timeTakenSeconds}
        onRetakeExam={() => handleStartExam(selectedExam)}
        onChangeExam={() => setAppState('PRE_EXAM')}
      />
    );
  }

  // 4. EXAM: Full CBT examination screen
  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden font-sans">
      {/* Top TCS iON Header */}
      <Header
        exam={selectedExam}
        timeLeftSeconds={timeLeftSeconds}
        currentLanguage={language}
        onLanguageChange={setLanguage}
        candidate={candidate}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        onOpenDashboard={() => setAppState('DASHBOARD')}
      />

      {/* Main Examination View: Question Area + Question Palette */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left/Center: Question Area */}
        <QuestionArea
          exam={selectedExam}
          sections={selectedExam.sections}
          activeSectionId={activeSectionId}
          onSelectSection={handleSelectSection}
          currentQuestion={currentQuestion}
          currentAnswer={answers[currentQuestionId]}
          onSelectOption={handleSelectOption}
          onSaveAndNext={handleSaveAndNext}
          onMarkForReviewAndNext={handleMarkForReviewAndNext}
          onClearResponse={handleClearResponse}
          language={language}
          fontSize={fontSize}
        />

        {/* Right: Question Palette */}
        <QuestionPalette
          candidate={candidate}
          sections={selectedExam.sections}
          activeSectionId={activeSectionId}
          onSelectSection={handleSelectSection}
          questions={questions}
          questionStates={questionStates}
          currentQuestionId={currentQuestionId}
          onSelectQuestion={handleSelectQuestion}
          onSubmitClick={() => setShowSubmitModal(true)}
        />
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <SubmitConfirmModal
          exam={selectedExam}
          sections={selectedExam.sections}
          questions={questions}
          questionStates={questionStates}
          onConfirmSubmit={handleConfirmSubmit}
          onCancel={() => setShowSubmitModal(false)}
        />
      )}
    </div>
  );
}
