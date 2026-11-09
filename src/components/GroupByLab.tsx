import React, { useState } from 'react';
import { Database, Filter, Layers, Check, X, ArrowDown } from 'lucide-react';

export const GroupByLab: React.FC = () => {
  const [minAvg, setMinAvg] = useState<number>(75);

  const initialRows = [
    { stu: 'S101', course: 'CSE-3101', marks: 82 },
    { stu: 'S102', course: 'CSE-3101', marks: 91 },
    { stu: 'S104', course: 'CSE-3101', marks: 55 },
    { stu: 'S101', course: 'CSE-3103', marks: 75 },
    { stu: 'S104', course: 'CSE-3103', marks: null },
    { stu: 'S102', course: 'CSE-4105', marks: 88 },
    { stu: 'S103', course: 'EEE-2101', marks: 68 },
    { stu: 'S105', course: 'EEE-2101', marks: 77 }
  ];

  const groups = [
    {
      course: 'CSE-4105',
      name: 'AI',
      marks: [88],
      avg: 88.00,
      count: 1
    },
    {
      course: 'CSE-3101',
      name: 'DBMS',
      marks: [82, 91, 55],
      avg: 76.00,
      count: 3
    },
    {
      course: 'CSE-3103',
      name: 'OOP',
      marks: [75, null],
      avg: 75.00,
      count: 2
    },
    {
      course: 'EEE-2101',
      name: 'Circuits',
      marks: [68, 77],
      avg: 72.50,
      count: 2
    }
  ];

  return (
    <div className="custom-card p-5 my-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-c-sql">Lab #9 · Interactive Visualizer</span>
          <h3 className="text-lg font-bold text-text">GROUP BY & HAVING Animator</h3>
          <p className="text-xs text-text-muted mt-0.5">Bucket partitioning & Group-level condition filtering</p>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs font-medium text-text-muted flex items-center gap-2">
            <span>HAVING AVG(Marks) &gt;</span>
            <input
              type="range"
              min="70"
              max="85"
              step="1"
              value={minAvg}
              onChange={(e) => setMinAvg(Number(e.target.value))}
              className="accent-primary cursor-pointer w-24"
            />
            <span className="font-mono font-bold text-text w-8">{minAvg}</span>
          </label>
        </div>
      </div>

      {/* SQL query header */}
      <div className="p-3 bg-code-bg rounded-xl font-mono text-xs text-code-text mb-4 border border-border">
        SELECT CourseID, ROUND(AVG(Marks), 2) AS AvgMarks<br />
        FROM ENROLLMENT<br />
        WHERE Marks IS NOT NULL<br />
        GROUP BY CourseID<br />
        <span className="text-primary font-bold">HAVING AVG(Marks) &gt; {minAvg};</span>
      </div>

      {/* Group Buckets Visual */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 my-4">
        {groups.map((g) => {
          const passesHaving = g.avg > minAvg;

          return (
            <div
              key={g.course}
              className={`p-3.5 rounded-xl border transition-all ${
                passesHaving
                  ? 'border-success/40 bg-surface shadow-xs'
                  : 'border-border/60 bg-surface-2/40 opacity-40 grayscale'
              }`}
            >
              <div className="flex items-center justify-between border-b border-border/60 pb-2 mb-2">
                <div>
                  <h4 className="font-mono font-bold text-sm text-text">{g.course}</h4>
                  <div className="text-[11px] text-text-muted">{g.name}</div>
                </div>
                {passesHaving ? (
                  <span className="text-success text-[10px] font-bold px-1.5 py-0.5 rounded bg-success/10 flex items-center gap-0.5">
                    <Check className="w-3 h-3" /> Passes
                  </span>
                ) : (
                  <span className="text-danger text-[10px] font-bold px-1.5 py-0.5 rounded bg-danger/10 flex items-center gap-0.5">
                    <X className="w-3 h-3" /> Fails
                  </span>
                )}
              </div>

              {/* Bucket marks */}
              <div className="space-y-1 mb-3">
                <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Bucket Marks:</span>
                <div className="flex flex-wrap gap-1">
                  {g.marks.map((m, idx) => (
                    <span
                      key={idx}
                      className={`font-mono text-xs px-2 py-0.5 rounded ${
                        m === null
                          ? 'bg-slate-200 dark:bg-slate-700 text-slate-500 line-through'
                          : 'bg-surface-2 text-text border border-border'
                      }`}
                    >
                      {m !== null ? m : 'NULL'}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-border/60 flex items-center justify-between text-xs">
                <span className="text-text-muted">Calculated AVG:</span>
                <span className="font-mono font-bold text-sm text-primary">{g.avg.toFixed(2)}</span>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-text-muted italic">
        * Note: CSE-3103 includes a NULL mark which is ignored during AVG calculation. Slide check: CSE-4105 (88.00) &amp; CSE-3101 (76.00) pass when threshold is 75.
      </p>
    </div>
  );
};
