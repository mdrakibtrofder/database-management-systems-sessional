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
  BookOpen,
  Eye,
  EyeOff,
  Search,
  ListChecks
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { mcqs, MCQ } from '../data/mcq';

const SECTIONS: string[] = ['All', ...Array.from(new Set(mcqs.map(q => q.section)))];
const TOTAL = mcqs.length;

interface McqPageProps {
  onOpenInPlayground?: (sql: string) => void;
}

export const McqPage: React.FC<McqPageProps> = ({ onOpenInPlayground }) => {
  // Setup state
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [mode, setMode] = useState<'practice' | 'exam' | 'overview'>('overview');
  const [selectedSection, setSelectedSection] = useState<string>('All');
  const [questionCount, setQuestionCount] = useState<number>(TOTAL);
  const [isShuffled, setIsShuffled] = useState<boolean>(false);

  // Active quiz session state
  const [activeQuestions, setActiveQuestions] = useState<MCQ[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [revealedInPractice, setRevealedInPractice] = useState<Record<number, boolean>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [filterReview, setFilterReview] = useState<'all' | 'wrong'>('all');

  // Quick Overview state
  // Answers are expanded by default; this tracks the ones the student has hidden
  const [overviewHidden, setOverviewHidden] = useState<Record<number, boolean>>({});
  const [overviewSection, setOverviewSection] = useState<string>('All');
  const [overviewSearch, setOverviewSearch] = useState<string>('');

  const startQuiz = () => {
    let pool = [...mcqs];
    if (selectedSection !== 'All') {
      pool = pool.filter(q => q.section === selectedSection);
    }
    if (isShuffled) {
      // Fisher–Yates shuffle (unbiased, unlike sort with a random comparator)
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
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

  // ---------- Mode switcher (always shown at the top outside an active session) ----------
  const MODE_CARDS: { id: 'overview' | 'practice' | 'exam'; title: string; desc: string; icon: React.ReactNode }[] = [
    {
      id: 'overview',
      title: 'Quick Overview (Read All)',
      desc: 'Every question with its options and answers, all expanded. Hide or reveal answers per question or all at once.',
      icon: <ListChecks className="w-4 h-4" />
    },
    {
      id: 'practice',
      title: 'Practice Mode (Instant Feedback)',
      desc: 'One question at a time. The correct answer and explanation appear as soon as you pick an option.',
      icon: <BookOpen className="w-4 h-4" />
    },
    {
      id: 'exam',
      title: 'Exam Mode (Submit at End)',
      desc: 'Answer everything, flag doubtful items, then submit to see your score and section breakdown.',
      icon: <Clock className="w-4 h-4" />
    }
  ];

  const modeSwitcher = (
    <div className="custom-card p-5 sm:p-6 mb-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-c-sql/10 text-c-sql">
          Complete SQL Review · {TOTAL} Questions
        </span>
      </div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-text">SQL MCQ Practice &amp; Exam Review</h1>
      <p className="text-sm text-text-muted mt-1.5 leading-relaxed">
        DDL, DML &amp; querying, aggregation &amp; joins, stored programs, views &amp; triggers, and transactions.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
        {MODE_CARDS.map(card => {
          const active = mode === card.id;
          return (
            <button
              key={card.id}
              onClick={() => setMode(card.id)}
              className={`p-4 rounded-xl border text-left cursor-pointer transition ${
                active
                  ? 'border-primary ring-2 ring-primary/20 bg-primary/5'
                  : 'border-border bg-surface hover:bg-surface-2'
              }`}
            >
              <div className={`font-bold text-sm flex items-center justify-between gap-2 ${active ? 'text-primary' : 'text-text'}`}>
                <span className="flex items-center gap-2">{card.icon} {card.title}</span>
                {active && <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />}
              </div>
              <p className="text-xs text-text-muted mt-1 leading-relaxed">{card.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );

  // ---------- Quick Overview (default view) ----------
  if (mode === 'overview') {
    const term = overviewSearch.trim().toLowerCase();
    const shown = mcqs.filter(q =>
      (overviewSection === 'All' || q.section === overviewSection) &&
      (!term ||
        q.q.toLowerCase().includes(term) ||
        (q.sql || '').toLowerCase().includes(term) ||
        q.explain.toLowerCase().includes(term) ||
        q.options.some(o => o.toLowerCase().includes(term)))
    );
    const isOpenQ = (id: number) => !overviewHidden[id];
    const revealedCount = shown.filter(q => isOpenQ(q.id)).length;
    const allShown = shown.length > 0 && revealedCount === shown.length;

    const setAll = (open: boolean) => {
      setOverviewHidden(prev => {
        const next = { ...prev };
        shown.forEach(q => { next[q.id] = !open; });
        return next;
      });
    };

    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        {modeSwitcher}

        <div className="custom-card p-4 sm:p-5 mb-4">
          <label className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2 block">Filter by section</label>
          <div className="flex flex-wrap gap-2">
            {SECTIONS.map(sec => (
              <button
                key={sec}
                onClick={() => setOverviewSection(sec)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  overviewSection === sec ? 'bg-primary text-white' : 'bg-surface-2 hover:bg-border text-text'
                }`}
              >
                {sec} ({sec === 'All' ? TOTAL : mcqs.filter(q => q.section === sec).length})
              </button>
            ))}
          </div>
        </div>

        {/* Sticky toolbar */}
        <div className="sticky top-16 z-30 mb-4">
          <div className="custom-card px-4 py-3 flex flex-wrap items-center gap-3 shadow-md">
            <div className="relative flex-1 min-w-[180px]">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                value={overviewSearch}
                onChange={(e) => setOverviewSearch(e.target.value)}
                placeholder="Search questions, SQL, options or explanations…"
                className="w-full pl-8 pr-3 py-2 rounded-lg bg-surface-2 border border-border text-xs text-text focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <span className="text-xs text-text-muted whitespace-nowrap">
              {revealedCount}/{shown.length} answers shown
            </span>
            <button
              onClick={() => setAll(!allShown)}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                allShown ? 'bg-surface-2 text-text hover:bg-border' : 'bg-primary text-white hover:bg-primary/90'
              }`}
            >
              {allShown ? <><EyeOff className="w-3.5 h-3.5" /> Hide all answers</> : <><Eye className="w-3.5 h-3.5" /> Show all answers</>}
            </button>
          </div>
        </div>

        {shown.length === 0 && (
          <div className="custom-card p-8 text-center text-sm text-text-muted">No questions match your search.</div>
        )}

        <div className="space-y-4">
          {shown.map((q) => {
            const isOpen = isOpenQ(q.id);
            return (
              <div key={q.id} id={`ov-q-${q.id}`} className="custom-card p-5">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md font-bold bg-primary/10 text-primary">Q{q.id}</span>
                    <span className="font-semibold text-text-muted">{q.section}</span>
                    <span className="text-text-muted hidden sm:inline">· Week {q.weeks.join(', ')}</span>
                  </div>
                  <button
                    onClick={() => setOverviewHidden(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                      isOpen ? 'bg-success/10 text-success hover:bg-success/20' : 'bg-surface-2 text-text hover:bg-border'
                    }`}
                  >
                    {isOpen ? <><EyeOff className="w-3.5 h-3.5" /> Hide answer</> : <><Eye className="w-3.5 h-3.5" /> Show answer</>}
                  </button>
                </div>

                <p className="font-semibold text-text text-sm mb-3 leading-snug">{q.q}</p>

                {q.sql && (
                  <pre className="p-3 rounded-lg bg-code-bg font-mono text-xs text-code-text mb-3 border border-border overflow-x-auto whitespace-pre-wrap">{q.sql}</pre>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {q.options.map((opt, oIdx) => {
                    const correct = isOpen && oIdx === q.answer;
                    return (
                      <div
                        key={oIdx}
                        className={`p-2.5 rounded-lg border flex items-start gap-2 transition ${
                          correct
                            ? 'border-success bg-success/10 text-success font-bold'
                            : isOpen
                              ? 'border-border/60 bg-surface text-text opacity-60'
                              : 'border-border bg-surface text-text'
                        }`}
                      >
                        <span className="font-bold">{String.fromCharCode(65 + oIdx)})</span>
                        <span className="flex-1">{opt}</span>
                        {correct && <CheckCircle2 className="w-4 h-4 shrink-0" />}
                      </div>
                    );
                  })}
                </div>

                {isOpen && (
                  <div className="mt-3 p-3 rounded-lg bg-surface-2 text-xs text-text-muted leading-relaxed">
                    <strong className="text-success">Answer: {String.fromCharCode(65 + q.answer)}</strong>
                    <span className="mx-1.5">·</span>
                    {q.explain}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ---------- Practice / Exam setup ----------
  if (!hasStarted) {
    const poolSize = selectedSection === 'All' ? TOTAL : mcqs.filter(q => q.section === selectedSection).length;
    const countOptions = Array.from(new Set([10, 20, 40, 60].filter(n => n < poolSize).concat(poolSize)));
    const effectiveCount = Math.min(questionCount, poolSize);

    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        {modeSwitcher}

        <div className="custom-card p-5 sm:p-6 space-y-6">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2 block">
              1. Select Syllabus Section
            </label>
            <div className="flex flex-wrap gap-2">
              {SECTIONS.map((sec) => (
                <button
                  key={sec}
                  onClick={() => setSelectedSection(sec)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    selectedSection === sec
                      ? 'bg-primary text-white shadow-xs'
                      : 'bg-surface-2 hover:bg-border text-text'
                  }`}
                >
                  {sec} ({sec === 'All' ? TOTAL : mcqs.filter(q => q.section === sec).length})
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2 block">
              2. Number of Questions
            </label>
            <div className="flex flex-wrap gap-2">
              {countOptions.map((num) => (
                <button
                  key={num}
                  onClick={() => setQuestionCount(num)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    effectiveCount === num
                      ? 'bg-primary text-white'
                      : 'bg-surface-2 hover:bg-border text-text'
                  }`}
                >
                  {num === poolSize ? `${num} (All in section)` : `${num} Questions`}
                </button>
              ))}
            </div>
          </div>

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

          <button
            onClick={startQuiz}
            className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-sm transition shadow-sm cursor-pointer flex items-center justify-center gap-2"
          >
            Start {mode === 'exam' ? 'Exam' : 'Practice'} Session · {effectiveCount} Questions <ArrowRight className="w-4 h-4" />
          </button>
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
                  <div className="p-2.5 rounded-lg bg-code-bg font-mono text-xs text-code-text mb-3 border border-border whitespace-pre-wrap overflow-x-auto">
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
          <button
            onClick={() => {
              if (Object.keys(userAnswers).length === 0 || confirm('Leave this session? Your answers will be lost.')) {
                setHasStarted(false);
              }
            }}
            className="px-2.5 py-1 rounded-md border border-border text-xs font-semibold text-text hover:bg-surface-2 transition flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Exit
          </button>
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
          <div className="p-3.5 rounded-xl bg-code-bg font-mono text-xs sm:text-sm text-code-text mb-6 border border-border overflow-x-auto whitespace-pre-wrap">
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
