import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Database,
  GraduationCap,
  Calendar,
  Layers,
  Terminal,
  Award,
  ChevronRight
} from 'lucide-react';
import { course } from '../data/course';

interface HomePageProps {
  onNavigate: (route: string) => void;
  onSelectWeek: (weekId: number) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectWeek }) => {
  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section matching Screenshot_2026-11-09_at_9.33.59_AM_40b77d75.png */}
      <section className="relative overflow-hidden pt-10 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Large soft rounded container card */}
          <div className="p-8 sm:p-12 lg:p-14 rounded-[28px] bg-surface-2/40 border border-border/80 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column Text Content */}
              <div className="lg:col-span-7 space-y-6">
                {/* Micro Meta Tag */}
                <div className="text-xs font-semibold tracking-wide text-text-muted flex items-center gap-2">
                  <span className="text-primary font-bold">{course.code}</span>
                  <span>·</span>
                  <span>Summer 2026</span>
                  <span>·</span>
                  <span>Level-2, Term-II</span>
                  <span>·</span>
                  <span>1.50 Credits</span>
                </div>

                {/* Big Two-Line Headline */}
                <h1 className="text-4xl sm:text-6xl font-black text-text tracking-tight leading-[1.12]">
                  Master Database <br />
                  Management Systems, <br />
                  <span className="text-primary">Week by Week.</span>
                </h1>

                {/* Subtitle description */}
                <p className="text-base sm:text-lg text-text-muted max-w-xl leading-relaxed">
                  Official study portal for BAUST CSE students. Explore 14 structured weekly modules, 7 slide decks, hands-on SQL datasets, and 18 interactive concept visualizers.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <button
                    onClick={() => onNavigate('weeks')}
                    className="px-6 py-3.5 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-sm transition shadow-sm cursor-pointer flex items-center gap-2"
                  >
                    Explore Weekly Roadmap <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onNavigate('playground')}
                    className="px-6 py-3.5 rounded-2xl bg-surface hover:bg-surface-2 border border-border text-text font-bold text-sm transition cursor-pointer flex items-center gap-2.5"
                  >
                    <Database className="w-4 h-4 text-primary" />
                    Open SQL Playground
                  </button>
                </div>

                {/* Instructor Footer Badge */}
                <div className="pt-4 flex items-center gap-2 text-xs text-text-muted">
                  <GraduationCap className="w-4 h-4 text-primary shrink-0" />
                  <span>
                    Instructor: <strong className="text-text font-semibold">Md. Rakib Trofder</strong>, Lecturer, Department of CSE, BAUST
                  </span>
                </div>
              </div>

              {/* Right Column Interactive Visual Card (Matching the Reference Screenshot) */}
              <div className="lg:col-span-5">
                <div className="p-6 sm:p-7 rounded-[26px] bg-white dark:bg-gray-900 border border-indigo-100 dark:border-indigo-950/60 shadow-lg shadow-indigo-500/5 space-y-6">
                  {/* Relational Tuples preview */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold mb-2">
                      <span className="text-slate-800 dark:text-slate-200">1. Relational Tuples</span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-mono font-bold">Student Table</span>
                    </div>

                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mb-3">
                      <div className="bg-indigo-600 h-full rounded-full w-2/3" />
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-slate-700 dark:text-slate-300">
                      <div>ID 101</div>
                      <div className="font-semibold text-slate-900 dark:text-white">Rahim</div>
                      <div>3.85</div>
                    </div>
                  </div>

                  {/* B+ Tree Indexing indicator */}
                  <div className="text-center space-y-3.5 pt-2">
                    <div className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 flex items-center justify-center gap-1.5">
                      <span>↓</span>
                      <span>B+ Tree Indexing O(log n)</span>
                      <span>↓</span>
                    </div>

                    {/* Root Node: Deep Royal Indigo from Screenshot */}
                    <div className="inline-block px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-mono text-xs font-bold shadow-md shadow-indigo-600/20">
                      [ 30 | 60 ]
                    </div>

                    {/* Leaf Nodes: Crisp Green-cyan border tags */}
                    <div className="flex items-center justify-center gap-2 pt-1 font-mono text-xs">
                      <span className="px-3.5 py-1.5 rounded-xl border border-emerald-500 bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 font-bold shadow-xs">
                        [ 10, 20 ]
                      </span>
                      <span className="px-3.5 py-1.5 rounded-xl border border-emerald-500 bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 font-bold shadow-xs">
                        [ 30, 40 ]
                      </span>
                      <span className="px-3.5 py-1.5 rounded-xl border border-emerald-500 bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 font-bold shadow-xs">
                        [ 60, 70 ]
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Days Roadmap Strip (Matching Screenshot_2026-11-09_at_9.34.21_AM_1f144e29.png top row) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            onClick={() => onSelectWeek(1)}
            className="p-5 rounded-[20px] bg-surface border border-border hover:border-primary/50 transition cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-xs font-mono text-primary font-bold mb-2">
              <span>Target Day 1–3</span>
              <ArrowRight className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-text leading-tight">
              Week 1: PostgreSQL &amp; SQL Basics (SELECT, WHERE, LIMIT)
            </h4>
          </div>

          <div
            onClick={() => onSelectWeek(3)}
            className="p-5 rounded-[20px] bg-surface border border-border hover:border-primary/50 transition cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-xs font-mono text-primary font-bold mb-2">
              <span>Target Day 4–6</span>
              <ArrowRight className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-text leading-tight">
              Week 3: Advanced SQL: Aggregations, Grouping &amp; Subqueries
            </h4>
          </div>

          <div
            onClick={() => onSelectWeek(7)}
            className="p-5 rounded-[20px] bg-surface border border-border hover:border-primary/50 transition cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-xs font-mono text-primary font-bold mb-2">
              <span>Target Day 7–9</span>
              <ArrowRight className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-text leading-tight">
              Week 7: Transactions Lab: COMMIT, ROLLBACK &amp; Savepoints
            </h4>
          </div>
        </div>
      </section>

      {/* Quick Navigation Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-text">Essential Sessional Study Portals</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => onNavigate('notes')}
            className="custom-card p-5 hover:border-primary/50 cursor-pointer transition flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Lab Decks</span>
              <h3 className="font-bold text-base text-text mt-1">Slides &amp; Handouts</h3>
              <p className="text-xs text-text-muted mt-1 leading-relaxed">
                7 lab slide decks and 2 transaction handouts ready for in-browser viewing and download.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-primary">
              <span>View Notes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div
            onClick={() => onNavigate('labtest')}
            className="custom-card p-5 hover:border-primary/50 cursor-pointer transition flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-c-txn">Exam Prep</span>
              <h3 className="font-bold text-base text-text mt-1">Lab Test Prep Matrix</h3>
              <p className="text-xs text-text-muted mt-1 leading-relaxed">
                Statistical topic weighting, question matrix, and hands-on Savepoint restocking problems.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-primary">
              <span>Open Prep Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div
            onClick={() => onNavigate('mcq')}
            className="custom-card p-5 hover:border-primary/50 cursor-pointer transition flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-c-sql">Self-Test</span>
              <h3 className="font-bold text-base text-text mt-1">70-Question MCQ Practice</h3>
              <p className="text-xs text-text-muted mt-1 leading-relaxed">
                Complete SQL Review covering DDL, DML, Aggregations, Joins, and Transactions.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-primary">
              <span>Practice Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div
            onClick={() => onNavigate('glossary')}
            className="custom-card p-5 hover:border-primary/50 cursor-pointer transition flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-c-storage">A–Z Index</span>
              <h3 className="font-bold text-base text-text mt-1">Database Glossary</h3>
              <p className="text-xs text-text-muted mt-1 leading-relaxed">
                60+ DBMS definitions, relational algebra, and PostgreSQL SQLSTATE codes with week links.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-primary">
              <span>Open Glossary</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
