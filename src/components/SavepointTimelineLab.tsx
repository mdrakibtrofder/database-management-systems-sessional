import React, { useState } from 'react';
import { Play, RotateCcw, ShieldCheck, Bookmark, ArrowRight, CornerDownLeft } from 'lucide-react';

export const SavepointTimelineLab: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<'partA' | 'partB'>('partA');
  const [currentStep, setCurrentStep] = useState(0);

  const scenarioA = [
    { cmd: "BEGIN;", stock: 50, note: "Start transaction. Initial stock of Keyboard = 50.", active: true },
    { cmd: "UPDATE product SET stock = stock + 10 WHERE product_id = 5;", stock: 60, note: "Stock becomes 50 + 10 = 60.", active: true },
    { cmd: "SAVEPOINT s1;", stock: 60, note: "Bookmark s1 created at stock 60.", isSavepoint: true, active: true },
    { cmd: "UPDATE product SET stock = stock + 10 WHERE product_id = 5;", stock: 70, note: "Stock becomes 60 + 10 = 70.", active: true },
    { cmd: "ROLLBACK TO SAVEPOINT s1;", stock: 60, note: "Rewind! Erases the second +10. Stock reverts to 60. s1 remains active.", isRollback: true, active: true },
    { cmd: "COMMIT;", stock: 60, note: "Transaction committed successfully! Final persistent stock = 60.", isCommit: true, active: true }
  ];

  const scenarioB = [
    { cmd: "BEGIN;", stock: 60, note: "Start transaction. Starting from stock = 60.", active: true },
    { cmd: "UPDATE product SET stock = stock + 5; SAVEPOINT s1;", stock: 65, note: "60 + 5 = 65. Set SAVEPOINT s1.", isSavepoint: true, active: true },
    { cmd: "UPDATE product SET stock = stock + 15; SAVEPOINT s2;", stock: 80, note: "65 + 15 = 80. Set SAVEPOINT s2.", isSavepoint: true, active: true },
    { cmd: "UPDATE product SET stock = stock - 8; SAVEPOINT s3;", stock: 72, note: "80 - 8 = 72. Set SAVEPOINT s3.", isSavepoint: true, active: true },
    { cmd: "UPDATE product SET stock = stock + 20;", stock: 92, note: "72 + 20 = 92 (mistake order).", active: true },
    { cmd: "ROLLBACK TO SAVEPOINT s3;", stock: 72, note: "Undo +20! Stock restored to 72 at s3.", isRollback: true, active: true },
    { cmd: "ROLLBACK TO SAVEPOINT s2;", stock: 80, note: "Undo -8! Stock restored to 80 at s2.", isRollback: true, active: true },
    { cmd: "ROLLBACK TO SAVEPOINT s1;", stock: 65, note: "Undo +15! Stock restored to 65 at s1.", isRollback: true, active: true },
    { cmd: "COMMIT;", stock: 65, note: "Commit final state! Persistent stock = 65.", isCommit: true, active: true }
  ];

  const steps = activeScenario === 'partA' ? scenarioA : scenarioB;

  return (
    <div className="custom-card p-5 my-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-c-txn">Lab #17 · Interactive Visualizer</span>
          <h3 className="text-lg font-bold text-text">Transaction & Savepoint Timeline</h3>
          <p className="text-xs text-text-muted mt-0.5">Week 7 Lab: Restocking Keyboard with Single & Multiple Savepoints</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-border p-0.5 bg-surface-2 text-xs">
            <button
              onClick={() => { setActiveScenario('partA'); setCurrentStep(0); }}
              className={`px-3 py-1 rounded-md font-semibold transition ${
                activeScenario === 'partA' ? 'bg-primary text-white' : 'text-text-muted'
              }`}
            >
              Part A (Single s1 → 60)
            </button>
            <button
              onClick={() => { setActiveScenario('partB'); setCurrentStep(0); }}
              className={`px-3 py-1 rounded-md font-semibold transition ${
                activeScenario === 'partB' ? 'bg-primary text-white' : 'text-text-muted'
              }`}
            >
              Part B (Multiple s1, s2, s3 → 65)
            </button>
          </div>

          <button
            onClick={() => setCurrentStep(0)}
            className="p-1.5 rounded text-text-muted hover:bg-surface-2 transition"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Timeline Visual Cards */}
      <div className="space-y-2 my-4">
        {steps.map((st, idx) => {
          const isReached = idx <= currentStep;
          const isCurrent = idx === currentStep;

          return (
            <div
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 cursor-pointer transition ${
                isCurrent
                  ? 'border-primary ring-2 ring-primary/20 bg-primary/5'
                  : isReached
                  ? 'border-border bg-surface'
                  : 'border-border/40 bg-surface-2/40 opacity-40'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  isReached ? 'bg-primary text-white' : 'bg-surface-2 text-text-muted'
                }`}>
                  {idx + 1}
                </span>
                <div>
                  <div className="font-mono text-xs font-bold text-text flex items-center gap-2">
                    {st.cmd}
                    {st.isSavepoint && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-sans flex items-center gap-1">
                        <Bookmark className="w-3 h-3" /> Flag
                      </span>
                    )}
                    {st.isRollback && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-sans flex items-center gap-1">
                        <CornerDownLeft className="w-3 h-3" /> Rewind
                      </span>
                    )}
                    {st.isCommit && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-sans flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> Sealed
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-text-muted mt-0.5">{st.note}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:self-center shrink-0">
                <span className="text-[11px] text-text-muted">Stock:</span>
                <span className="font-mono font-bold text-sm px-2.5 py-1 rounded bg-surface border border-border text-primary">
                  {isReached ? st.stock : '—'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Control Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border mt-4">
        <span className="text-xs text-text-muted">
          Step {currentStep + 1} of {steps.length}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
            disabled={currentStep === 0}
            className="px-3 py-1.5 text-xs rounded border border-border disabled:opacity-40 hover:bg-surface-2 transition"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentStep((s) => Math.min(steps.length - 1, s + 1))}
            disabled={currentStep === steps.length - 1}
            className="px-4 py-1.5 text-xs rounded bg-primary text-white font-semibold disabled:opacity-40 hover:bg-primary/90 transition"
          >
            Next Command
          </button>
        </div>
      </div>
    </div>
  );
};
