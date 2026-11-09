import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  Clock,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Flag,
  ArrowRight,
  ArrowLeft,
  Award,
  Sparkles,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { mcqs, MCQ } from '../data/mcq';

interface McqPageProps {
  onOpenInPlayground?: (sql: string) => void;
}

export const McqPage: React.FC<McqPageProps> = ({ onOpenInPlayground }) => {
  // Setup state
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [mode, setMode] = useState<'practice' | 'exam'>('practice');
  const [selectedSection, setSelectedSection] = useState<string>('All');
  const [questionCount, setQuestionCount] = useState<number>(70);
  const [isShuffled, setIsShuffled] = useState<boolean>(false);

  // Active quiz session state
  const [activeQuestions, setActiveQuestions] = useState<MCQ[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [revealedInPractice, setRevealedInPractice] = useState<Record<number, boolean>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [filterReview, setFilterReview] = useState<'all' | 'wrong'>('all');

  const startQuiz = () => {
    let pool = [...mcqs];
    if (selectedSection !== 'All') {
      pool = pool.filter(q => q.section === selectedSection);
    }
    if (isShuffled) {
      pool.sort(() => Math.random() - 0.5);
    }
    const finalSet = pool.slice(0, Math.min(questionCount, pool.length));
    setActiveQuestions(finalSet);
    setCurrentIndex(0);
    setUserAnswers({});
    setRevealedInPractice({});
    setFlagged({});
    setIsSubmitted(false);
    setHasStarted(true);
  };

  const currentQ = activeQuestions[currentIndex];

  const handleSelectOption = (optIndex: number) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [currentQ.id]: optIndex }));

    if (mode === 'practice') {
      setRevealedInPractice(prev => ({ ...prev, [currentQ.id]: true }));
      if (optIndex === currentQ.answer) {
        try {
          confetti({ particleCount: 20, spread: 50, origin: { y: 0.8 } });
        } catch (e) {}
      }
    }
  };

  const toggleFlag = (id: number) => {
    setFlagged(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmitExam = () => {
    const unanswered = activeQuestions.filter(q => userAnswers[q.id] === undefined).length;
    if (unanswered > 0) {
      if (!confirm(`You have ${unanswered} unanswered question(s). Submit exam anyway?`)) {
        return;
      }
    }
    setIsSubmitted(true);
    try {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    } catch (e) {}
  };

  // Calculate scores
  const scoreStats = useMemo(() => {
    if (!activeQuestions.length) return { score: 0, total: 0, pct: 0, sectionBreakdown: {} };
    let score = 0;
    const sectionBreakdown: Record<string, { correct: number; total: number }> = {};

    activeQuestions.forEach(q => {
      if (!sectionBreakdown[q.section]) {
        sectionBreakdown[q.section] = { correct: 0, total: 0 };
      }
      sectionBreakdown[q.section].total++;

      if (userAnswers[q.id] === q.answer) {
        score++;
        sectionBreakdown[q.section].correct++;
      }
    });

    return {
      score,
      total: activeQuestions.length,
      pct: Math.round((score / activeQuestions.length) * 100),
      sectionBreakdown
    };
  }, [activeQuestions, userAnswers]);

  if (!hasStarted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="custom-card p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-c-sql/10 text-c-sql">
              Complete SQL Review · 70 Questions
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-text">
            SQL MCQ Practice &amp; Exam Review
          </h1>
          <p className="text-sm text-text-muted mt-2 leading-relaxed">
            Test and consolidate your knowledge across all 4 key course areas: Data Definition Language (DDL), DML &amp; Querying, Aggregation &amp; Joins, and Database Transactions.
          </p>

          <div className="mt-8 space-y-6">
            {/* Mode selection */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2 block">
                1. Select Study Mode
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setMode('practice')}
                  className={`p-4 rounded-xl border cursor-pointer transition ${
                    mode === 'practice'
                      ? 'border-primary ring-2 ring-primary/20 bg-primary/5'
                      : 'border-border bg-surface hover:bg-surface-2'
                  }`}
                >
                  <div className="font-bold text-sm text-text flex items-center justify-between">
                    Practice Mode (Instant Feedback)
                    {mode === 'practice' && <CheckCircle2 className="w-4 h-4 text-primary" />}
                  </div>
                  <p className="text-xs text-text-muted mt-1">
                    Shows correct answers and explanations immediately as you pick each option. Perfect for learning.
                  </p>
                </div>

                <div
                  onClick={() => setMode('exam')}
                  className={`p-4 rounded-xl border cursor-pointer transition ${
                    mode === 'exam'
                      ? 'border-primary ring-2 ring-primary/20 bg-primary/5'
                      : 'border-border bg-surface hover:bg-surface-2'
                  }`}
                >
                  <div className="font-bold text-sm text-text flex items-center justify-between">
                    Exam Mode (Submit at End)
                    {mode === 'exam' && <CheckCircle2 className="w-4 h-4 text-primary" />}
                  </div>
                  <p className="text-xs text-text-muted mt-1">
                    Simulates a timed lab test. Answer everything, review flagged items, and see your comprehensive score breakdown upon submission.
                  </p>
                </div>
              </div>
            </div>

            {/* Section filter */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2 block">
                2. Select Syllabus Section
              </label>
              <div className="flex flex-wrap gap-2">
                {['All', 'DDL', 'DML & DQL', 'Aggregation & Joins', 'Transactions'].map((sec) => (
                  <button
                    key={sec}
                    onClick={() => setSelectedSection(sec)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      selectedSection === sec
                        ? 'bg-primary text-white shadow-xs'
                        : 'bg-surface-2 hover:bg-border text-text'
                    }`}
                  >
                    {sec} {sec === 'All' ? '(70)' : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Number of questions */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2 block">
                3. Number of Questions
              </label>
              <div className="flex flex-wrap gap-2">
                {[10, 20, 35, 70].map((num) => (
                  <button
                    key={num}
                    onClick={() => setQuestionCount(num)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                      questionCount === num
                        ? 'bg-primary text-white'
                        : 'bg-surface-2 hover:bg-border text-text'
                    }`}
                  >
                    {num === 70 ? '70 (All Questions)' : `${num} Questions`}
                  </button>
                ))}
              </div>
            </div>

            {/* Shuffling toggle */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="shuffle"
                checked={isShuffled}
                onChange={(e) => setIsShuffled(e.target.checked)}
                className="w-4 h-4 rounded text-primary focus:ring-primary cursor-pointer"
              />
              <label htmlFor="shuffle" className="text-xs font-medium text-text cursor-pointer">
                Shuffle question order
              </label>
            </div>

            {/* Launch button */}
            <button
              onClick={startQuiz}
              className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-sm transition shadow-sm cursor-pointer flex items-center justify-center gap-2"
            >
              Start {mode === 'exam' ? 'Exam' : 'Practice'} Session <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Submitted Review Screen (Exam Mode)
  if (isSubmitted) {
    const wrongQuestions = activeQuestions.filter(q => userAnswers[q.id] !== q.answer);
    const displayedQuestions = filterReview === 'wrong' ? wrongQuestions : activeQuestions;

    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="custom-card p-6 sm:p-8 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Exam Completed</span>
              <h2 className="text-2xl font-black text-text mt-1">Review &amp; Results</h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-3xl font-black text-primary">{scoreStats.pct}%</div>
                <div className="text-xs text-text-muted">{scoreStats.score} / {scoreStats.total} Correct</div>
              </div>
              <button
                onClick={() => setHasStarted(false)}
                className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition"
              >
                New Session
              </button>
            </div>
          </div>

          {/* Section Breakdown Bars */}
          <div className="mt-6 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted">Section Breakdown</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(scoreStats.sectionBreakdown).map(([sec, stats]: any) => {
                const pct = Math.round((stats.correct / stats.total) * 100);
                return (
                  <div key={sec} className="p-3 rounded-xl bg-surface-2 border border-border">
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>{sec}</span>
                      <span>{stats.correct}/{stats.total} ({pct}%)</span>
                    </div>
                    <div className="w-full bg-border h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-primary h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Filter review list */}
          <div className="flex items-center gap-2 mt-6">
            <button
              onClick={() => setFilterReview('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                filterReview === 'all' ? 'bg-primary text-white' : 'bg-surface-2 text-text'
              }`}
            >
              All Questions ({activeQuestions.length})
            </button>
            <button
              onClick={() => setFilterReview('wrong')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                filterReview === 'wrong' ? 'bg-danger text-white' : 'bg-surface-2 text-text'
              }`}
            >
              Mistakes Only ({wrongQuestions.length})
            </button>
          </div>
        </div>

        {/* List of reviewed questions */}
        <div className="space-y-4">
          {displayedQuestions.map((q, idx) => {
            const userChoice = userAnswers[q.id];
            const isCorrect = userChoice === q.answer;

            return (
              <div key={q.id} className="custom-card p-5">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-text-muted">
                    Q{idx + 1} · {q.section}
                  </span>
                  {isCorrect ? (
                    <span className="text-success font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Correct
                    </span>
                  ) : (
                    <span className="text-danger font-bold flex items-center gap-1">
                      <XCircle className="w-4 h-4" /> Incorrect
                    </span>
                  )}
                </div>

                <p className="font-semibold text-text text-sm mb-3">{q.q}</p>

                {q.sql && (
                  <div className="p-2.5 rounded-lg bg-code-bg font-mono text-xs text-code-text mb-3 border border-border">
                    {q.sql}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {q.options.map((opt, oIdx) => {
                    let optStyle = "border-border bg-surface text-text";
                    if (oIdx === q.answer) {
                      optStyle = "border-success bg-success/10 text-success font-bold";
                    } else if (oIdx === userChoice && !isCorrect) {
                      optStyle = "border-danger bg-danger/10 text-danger";
                    } else {
                      optStyle = "border-border/60 bg-surface opacity-50";
                    }

                    return (
                      <div key={oIdx} className={`p-2.5 rounded-lg border ${optStyle}`}>
                        <span className="font-bold mr-1.5">{String.fromCharCode(65 + oIdx)})</span>
                        {opt}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-3 p-3 rounded-lg bg-surface-2 text-xs text-text-muted leading-relaxed">
                  <strong className="text-text">Explanation:</strong> {q.explain}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Active Quiz View (Single Question Card)
  const isAnswered = userAnswers[currentQ.id] !== undefined;
  const isRevealed = mode === 'practice' ? revealedInPractice[currentQ.id] : isSubmitted;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Quiz Top bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-primary/10 text-primary">
            {currentQ.section}
          </span>
          <span className="text-xs text-text-muted font-medium">
            Question {currentIndex + 1} of {activeQuestions.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleFlag(currentQ.id)}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
              flagged[currentQ.id] ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' : 'text-text-muted hover:bg-surface-2'
            }`}
          >
            <Flag className="w-3.5 h-3.5" /> Flag
          </button>

          {mode === 'exam' && (
            <button
              onClick={handleSubmitExam}
              className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition"
            >
              Submit Exam
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-border h-1.5 rounded-full overflow-hidden mb-6">
        <div
          className="bg-primary h-full rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / activeQuestions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="custom-card p-6 sm:p-8">
        <h3 className="text-base sm:text-lg font-bold text-text mb-4 leading-snug">
          {currentQ.q}
        </h3>

        {/* SQL snippet if present */}
        {currentQ.sql && (
          <div className="p-3.5 rounded-xl bg-code-bg font-mono text-xs sm:text-sm text-code-text mb-6 border border-border overflow-x-auto">
            {currentQ.sql}
          </div>
        )}

        {/* 4 Options */}
        <div className="space-y-3">
          {currentQ.options.map((opt, oIdx) => {
            const isChosen = userAnswers[currentQ.id] === oIdx;
            const isCorrect = oIdx === currentQ.answer;

            let cardClass = "border-border bg-surface hover:bg-surface-2 text-text";
            if (isRevealed) {
              if (isCorrect) {
                cardClass = "border-success bg-success/10 text-success font-bold";
              } else if (isChosen && !isCorrect) {
                cardClass = "border-danger bg-danger/10 text-danger";
              } else {
                cardClass = "border-border/60 bg-surface opacity-50";
              }
            } else if (isChosen) {
              cardClass = "border-primary bg-primary/10 text-primary font-semibold ring-2 ring-primary/20";
            }

            return (
              <button
                key={oIdx}
                onClick={() => handleSelectOption(oIdx)}
                className={`w-full p-4 rounded-xl border text-left text-sm transition flex items-center justify-between cursor-pointer ${cardClass}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold shrink-0">
                    {String.fromCharCode(65 + oIdx)}
                  </span>
                  <span>{opt}</span>
                </div>

                {isRevealed && isCorrect && <CheckCircle2 className="w-5 h-5 text-success shrink-0" />}
                {isRevealed && isChosen && !isCorrect && <XCircle className="w-5 h-5 text-danger shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Explanation Card */}
        {isRevealed && (
          <div className="mt-6 p-4 rounded-xl bg-surface-2 border border-border text-xs text-text leading-relaxed">
            <span className="font-bold text-primary block mb-1">Explanation:</span>
            {currentQ.explain}
          </div>
        )}

        {/* Navigation bottom bar */}
        <div className="flex items-center justify-between mt-8 pt-4 border-t border-border">
          <button
            onClick={() => setCurrentIndex((idx) => Math.max(0, idx - 1))}
            disabled={currentIndex === 0}
            className="px-4 py-2 rounded-lg border border-border text-xs font-semibold text-text disabled:opacity-30 hover:bg-surface-2 transition flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" /> Previous
          </button>

          <span className="text-xs text-text-muted">
            {Object.keys(userAnswers).length} of {activeQuestions.length} answered
          </span>

          <button
            onClick={() => setCurrentIndex((idx) => Math.min(activeQuestions.length - 1, idx + 1))}
            disabled={currentIndex === activeQuestions.length - 1}
            className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold disabled:opacity-30 hover:bg-primary/90 transition flex items-center gap-1.5"
          >
            Next <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
