import React, { useState } from 'react';
import { Play, RotateCcw, ArrowRight } from 'lucide-react';

export const ClauseOrderLab: React.FC = () => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = [
    {
      clause: "FROM Library",
      execOrder: 1,
      color: "bg-indigo-500",
      desc: "Step 1: Load all 5 rows and all columns from the Library table on disk into memory buffer.",
      tableState: "5 rows × 6 columns loaded in buffer"
    },
    {
      clause: "WHERE AvailableCopies > 3",
      execOrder: 2,
      color: "bg-blue-500",
      desc: "Step 2: Filter row by row. Discards 'Introduction to Algorithms' (copies = 3). 4 rows survive.",
      tableState: "4 rows survive filter (copies > 3)"
    },
    {
      clause: "SELECT BookTitle, AvailableCopies",
      execOrder: 3,
      color: "bg-purple-500",
      desc: "Step 3: Column projection! Discards BookID, Author, Category, Publisher. Only 2 columns remain.",
      tableState: "4 rows × 2 requested columns"
    },
    {
      clause: "ORDER BY AvailableCopies DESC",
      execOrder: 4,
      color: "bg-amber-500",
      desc: "Step 4: Sort surviving rows descending by AvailableCopies: Clean Code (7), Database (6), Computer Networks (5), OS (4).",
      tableState: "4 rows sorted 7 → 6 → 5 → 4"
    },
    {
      clause: "LIMIT 2",
      execOrder: 5,
      color: "bg-emerald-500",
      desc: "Step 5: Cut top 2 rows: Clean Code (7) and Database System Concepts (6). Final result delivered to client!",
      tableState: "2 rows delivered: Clean Code & Database System Concepts"
    }
  ];

  return (
    <div className="custom-card p-5 my-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-c-sql">Lab #2 · Interactive Visualizer</span>
          <h3 className="text-lg font-bold text-text">SQL Clause Execution Order Animator</h3>
          <p className="text-xs text-text-muted mt-0.5">Written Order vs Real PostgreSQL Execution Order</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="px-3 py-1 text-xs rounded border border-border disabled:opacity-30 hover:bg-surface-2 transition"
          >
            Prev
          </button>
          <button
            onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
            disabled={step === steps.length - 1}
            className="px-3 py-1 text-xs rounded bg-primary text-white font-semibold disabled:opacity-30 hover:bg-primary/90 transition"
          >
            Next Step
          </button>
          <button
            onClick={() => setStep(0)}
            className="p-1.5 rounded text-text-muted hover:bg-surface-2 transition"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Query Bar */}
      <div className="p-3 bg-surface-2 rounded-xl border border-border font-mono text-xs mb-4 flex flex-wrap gap-2 items-center">
        <span className="text-text-muted font-bold">Query:</span>
        <span className="px-2 py-1 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
          SELECT BookTitle, AvailableCopies
        </span>
        <span className="px-2 py-1 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
          FROM Library
        </span>
        <span className="px-2 py-1 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
          WHERE AvailableCopies &gt; 3
        </span>
        <span className="px-2 py-1 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
          ORDER BY AvailableCopies DESC
        </span>
        <span className="px-2 py-1 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
          LIMIT 2;
        </span>
      </div>

      {/* Pipeline Stepper */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 my-4">
        {steps.map((st, i) => (
          <div
            key={i}
            onClick={() => setStep(i)}
            className={`p-3 rounded-xl border cursor-pointer transition text-center ${
              step === i
                ? 'border-primary ring-2 ring-primary/20 bg-primary/5'
                : i < step
                ? 'border-success/40 bg-success/5'
                : 'border-border bg-surface opacity-60'
            }`}
          >
            <div className="text-[10px] font-bold text-text-muted mb-1">
              Order #{st.execOrder}
            </div>
            <div className="font-mono text-xs font-semibold text-text">
              {st.clause.split(' ')[0]}
            </div>
            <div className="text-[10px] text-text-muted truncate mt-1">
              {st.clause.split(' ').slice(1).join(' ')}
            </div>
          </div>
        ))}
      </div>

      {/* Current Step Explanation Box */}
      <div className="p-4 rounded-xl bg-surface-2 border border-border mt-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
          <h4 className="font-semibold text-sm text-text">
            Executing: <span className="font-mono text-primary">{steps[step].clause}</span>
          </h4>
        </div>
        <p className="text-xs text-text-muted mt-1 leading-relaxed">
          {steps[step].desc}
        </p>

        <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs">
          <span className="text-text-muted font-medium">Pipeline Status:</span>
          <span className="font-mono font-semibold text-text px-2.5 py-1 rounded bg-surface border border-border">
            {steps[step].tableState}
          </span>
        </div>
      </div>
    </div>
  );
};
