import React, { useState } from 'react';
import {
  BookOpen,
  Download,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Database,
  Layers,
  Sparkles,
  ArrowRight,
  FileText
} from 'lucide-react';
import { course, WeekData } from '../data/course';
import { SlideViewer } from './SlideViewer';
import { SqlCard } from './SqlCard';
import { PredictOutputCard } from './PredictOutputCard';
import { FlashcardsSection } from './FlashcardsSection';
import { ClauseOrderLab } from './ClauseOrderLab';
import { SavepointTimelineLab } from './SavepointTimelineLab';
import { JoinVisualizerLab } from './JoinVisualizerLab';
import { GroupByLab } from './GroupByLab';
import { DdlMorpherLab } from './DdlMorpherLab';

interface WeekDetailPageProps {
  weekId: number;
  onSelectWeek: (id: number) => void;
  onOpenInPlayground?: (sql: string) => void;
  notesViewMode?: boolean;
}

export const WeekDetailPage: React.FC<WeekDetailPageProps> = ({
  weekId,
  onSelectWeek,
  onOpenInPlayground,
  notesViewMode
}) => {
  const currentWeek = course.weeks.find(w => w.id === weekId) || course.weeks[0];
  const [activeHandoutTab, setActiveHandoutTab] = useState<number>(0);
  const [isDone, setIsDone] = useState<boolean>(() => {
    try {
      return localStorage.getItem(`cse2206-week-${weekId}-done`) === 'true';
    } catch (e) {
      return false;
    }
  });

  const toggleDone = () => {
    const next = !isDone;
    setIsDone(next);
    try {
      localStorage.setItem(`cse2206-week-${weekId}-done`, String(next));
    } catch (e) {}
  };

  const handleDownloadAnswersSql = () => {
    const studentId = "STUDENT_ID";
    const header = `-- =====================================================================\n-- CSE 2206 DBMS Sessional Lab Submission\n-- ${currentWeek.label}: ${currentWeek.title}\n-- Student ID: ${studentId}\n-- =====================================================================\n\n`;
    const tasksBody = currentWeek.labTasks.map(t => `-- Task ${t.n}: ${t.text}\n-- Write your SQL query below:\n\n`).join('\n');
    const blob = new Blob([header + tasksBody], { type: 'text/sql' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${studentId}_Lab_${currentWeek.label.replace(/\s+/g, '_')}.sql`;
    a.click();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header breadcrumb & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-bold text-primary px-2.5 py-0.5 rounded-full bg-primary/10">
              {currentWeek.label}
            </span>
            <span className="text-xs text-text-muted">· Cluster: {currentWeek.cluster}</span>
            <span className="text-xs text-text-muted">· Runs on: <span className="font-mono font-semibold text-text">{currentWeek.dataset}</span></span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text">
            {currentWeek.title}
          </h1>
          <p className="text-xs sm:text-sm text-text-muted mt-1 leading-relaxed max-w-3xl">
            {currentWeek.summary}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelectWeek(Math.max(1, weekId - 1))}
            disabled={weekId <= 1}
            className="p-2 rounded-xl border border-border disabled:opacity-30 hover:bg-surface-2 transition text-text"
            title="Previous Week"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={toggleDone}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition ${
              isDone
                ? 'border-success bg-success/10 text-success'
                : 'border-border bg-surface text-text hover:bg-surface-2'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" /> {isDone ? "Completed" : "Mark as Done"}
          </button>

          <button
            onClick={() => onSelectWeek(Math.min(14, weekId + 1))}
            disabled={weekId >= 14}
            className="p-2 rounded-xl border border-border disabled:opacity-30 hover:bg-surface-2 transition text-text"
            title="Next Week"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Week Topics Tag strip */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {currentWeek.topics.map((t, idx) => (
          <span
            key={idx}
            className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-surface border border-border text-text-muted"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Slide Decks and Handouts Viewer */}
      {currentWeek.decks.length > 0 && (
        <div className="mb-8">
          <SlideViewer
            week={currentWeek.id}
            title={`${currentWeek.label}: ${currentWeek.decks[0].title}`}
            onRunSlideSql={() => {
              if (currentWeek.snippets[0] && onOpenInPlayground) {
                onOpenInPlayground(currentWeek.snippets[0].sql);
              }
            }}
          />
        </div>
      )}

      {/* Week 7 Handouts Tabs if present */}
      {currentWeek.handouts.length > 0 && (
        <div className="custom-card p-5 mb-8">
          <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
            <h3 className="font-bold text-sm text-text flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" /> Attached Lab Handouts &amp; Problem Statements
            </h3>
            <div className="flex gap-2">
              {currentWeek.handouts.map((h, hIdx) => (
                <button
                  key={hIdx}
                  onClick={() => setActiveHandoutTab(hIdx)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                    activeHandoutTab === hIdx
                      ? 'bg-primary text-white'
                      : 'bg-surface-2 text-text hover:bg-border'
                  }`}
                >
                  {h.title.split(' ')[0]} ({h.size})
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs text-text-muted flex items-center justify-between">
            <span>{currentWeek.handouts[activeHandoutTab].title}</span>
            <a
              href={currentWeek.handouts[activeHandoutTab].pdf}
              download
              className="font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" /> Download PDF Handout
            </a>
          </div>
        </div>
      )}

      {/* Embedded Interactive Lab Visualizer for this week */}
      {weekId === 1 && <ClauseOrderLab />}
      {weekId === 2 && <DdlMorpherLab />}
      {weekId === 3 && <GroupByLab />}
      {weekId === 4 && <JoinVisualizerLab />}
      {weekId === 7 && <SavepointTimelineLab />}

      {/* Runnable Examples extracted directly from the slide deck */}
      {currentWeek.snippets.length > 0 && (
        <div className="my-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Slide Code Blocks</span>
              <h3 className="text-lg font-bold text-text">Runnable SQL Examples</h3>
              <p className="text-xs text-text-muted">
                Run each query live in the browser. Expected slide output is compared automatically.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {currentWeek.snippets.map((snip) => (
              <SqlCard
                key={snip.id}
                title={snip.title}
                initialSql={snip.sql}
                slideNumber={snip.slide}
                expected={snip.expected}
                explain={snip.explain}
                dataset={currentWeek.dataset}
                onOpenInPlayground={onOpenInPlayground}
              />
            ))}
          </div>
        </div>
      )}

      {/* Predict the Output Quiz Cards */}
      {currentWeek.predict.length > 0 && (
        <div className="my-8">
          <h3 className="text-base font-bold text-text mb-2">
            Predict the Output Before Running
          </h3>
          <p className="text-xs text-text-muted mb-4">
            Strengthen mental execution of queries before inspecting actual output.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentWeek.predict.map((pred, pIdx) => (
              <PredictOutputCard
                key={pIdx}
                sql={pred.sql}
                choices={pred.choices}
                answer={pred.answer}
                explain={pred.explain}
              />
            ))}
          </div>
        </div>
      )}

      {/* Key Takeaways & Callouts */}
      {currentWeek.keyTakeaways.length > 0 && (
        <div className="custom-card p-6 my-8">
          <h3 className="text-base font-bold text-text mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" /> Key Takeaways &amp; Important Rules
          </h3>
          <ul className="space-y-2 text-xs text-text-muted leading-relaxed">
            {currentWeek.keyTakeaways.map((takeaway, tIdx) => (
              <li key={tIdx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Lab Tasks & .sql Submission Generator */}
      {currentWeek.labTasks.length > 0 && (
        <div className="custom-card p-6 my-8">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border mb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Lab Assignment</span>
              <h3 className="text-base font-bold text-text mt-0.5">
                Week Tasks Slide ({currentWeek.labTasks.length} Problems)
              </h3>
            </div>

            <button
              onClick={handleDownloadAnswersSql}
              className="px-3.5 py-1.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 flex items-center gap-1.5 transition cursor-pointer"
            >
              <Download className="w-4 h-4" /> Download Submission .sql
            </button>
          </div>

          <div className="space-y-3">
            {currentWeek.labTasks.map((task) => (
              <div key={task.n} className="p-3.5 rounded-xl bg-surface-2 border border-border flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-surface border border-border flex items-center justify-center font-bold text-xs font-mono text-primary shrink-0">
                  {task.n}
                </span>
                <div className="text-xs text-text leading-relaxed mt-0.5">
                  {task.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Concept Flashcards */}
      {currentWeek.flashcards.length > 0 && (
        <FlashcardsSection cards={currentWeek.flashcards} />
      )}
    </div>
  );
};
