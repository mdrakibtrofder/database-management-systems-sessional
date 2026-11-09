import React, { useState } from 'react';
import { Layers, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

export const JoinVisualizerLab: React.FC = () => {
  const [joinType, setJoinType] = useState<'INNER' | 'LEFT' | 'RIGHT' | 'FULL' | 'CROSS'>('INNER');

  const students = [
    { id: 1, name: "Rakib", enrolled: true },
    { id: 2, name: "Sadia", enrolled: true },
    { id: 3, name: "Tanvir", enrolled: true },
    { id: 4, name: "Mim", enrolled: true },
    { id: 5, name: "Arif", enrolled: true },
    { id: 6, name: "Nabila", enrolled: false } // No enrollments
  ];

  const courses = [
    { id: 101, name: "Database Systems", enrolled: true },
    { id: 102, name: "Algorithms", enrolled: true },
    { id: 103, name: "Circuits", enrolled: true },
    { id: 104, name: "Thermodynamics", enrolled: true },
    { id: 105, name: "Machine Learning", enrolled: false } // No enrollments
  ];

  const joinDescriptions: Record<string, { title: string; count: string; formula: string; explanation: string }> = {
    INNER: {
      title: "INNER JOIN (⋈)",
      count: "8 rows returned",
      formula: "Students ⋈ Enrollments",
      explanation: "Keeps only rows with valid matches on both sides. Drops unenrolled student Nabila and course Machine Learning."
    },
    LEFT: {
      title: "LEFT OUTER JOIN (⟕)",
      count: "9 rows returned",
      formula: "Students ⟕ Enrollments",
      explanation: "Keeps all 6 students! Nabila has no matching course so her course columns are filled with NULL (8 matches + 1 NULL = 9 rows)."
    },
    RIGHT: {
      title: "RIGHT OUTER JOIN (⟖)",
      count: "9 rows returned",
      formula: "Students ⟖ Courses",
      explanation: "Keeps all courses! Machine Learning has no enrolled students so student columns are filled with NULL."
    },
    FULL: {
      title: "FULL OUTER JOIN (⟗)",
      count: "10 rows returned",
      formula: "Students ⟗ Courses (Outer)",
      explanation: "Combines LEFT and RIGHT joins! Both Nabila (missing course) and Machine Learning (missing student) are kept and padded with NULL."
    },
    CROSS: {
      title: "CROSS JOIN (×)",
      count: "30 rows returned",
      formula: "6 Students × 5 Courses = 30",
      explanation: "Computes the Cartesian product: every student paired with every course."
    }
  };

  return (
    <div className="custom-card p-5 my-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-c-sql">Lab #11 · Interactive Visualizer</span>
          <h3 className="text-lg font-bold text-text">Relational Join Visualizer</h3>
          <p className="text-xs text-text-muted mt-0.5">Venn Diagram, Matched Tuples & NULL-Padded Outer Rows</p>
        </div>

        {/* Join selector pills */}
        <div className="flex flex-wrap rounded-lg border border-border p-0.5 bg-surface-2 text-xs">
          {(['INNER', 'LEFT', 'RIGHT', 'FULL', 'CROSS'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setJoinType(t)}
              className={`px-3 py-1.5 rounded-md font-semibold transition ${
                joinType === t ? 'bg-primary text-white shadow-xs' : 'text-text-muted hover:text-text'
              }`}
            >
              {t} JOIN
            </button>
          ))}
        </div>
      </div>

      {/* Visual Canvas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        {/* Left Side: Students Table representation */}
        <div className="p-4 rounded-xl border border-border bg-surface-2">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-xs text-text flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500" /> Left Table: Students (6 rows)
            </span>
            <span className="text-[11px] text-text-muted">student_id (PK)</span>
          </div>

          <div className="space-y-1.5">
            {students.map((st) => (
              <div
                key={st.id}
                className={`p-2 rounded-lg text-xs font-mono flex items-center justify-between border ${
                  !st.enrolled && (joinType === 'LEFT' || joinType === 'FULL')
                    ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/40'
                    : !st.enrolled && joinType === 'INNER'
                    ? 'border-border bg-surface opacity-40 line-through'
                    : 'border-border bg-surface'
                }`}
              >
                <span>{st.id} · {st.name}</span>
                {st.enrolled ? (
                  <span className="text-success text-[10px] flex items-center gap-0.5 font-sans">
                    <CheckCircle2 className="w-3 h-3" /> Has Course
                  </span>
                ) : (
                  <span className="text-amber-600 dark:text-amber-400 text-[10px] flex items-center gap-0.5 font-sans font-bold">
                    No Enrolment (NULL)
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Courses Table representation */}
        <div className="p-4 rounded-xl border border-border bg-surface-2">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-xs text-text flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500" /> Right Table: Courses (5 rows)
            </span>
            <span className="text-[11px] text-text-muted">course_id (PK)</span>
          </div>

          <div className="space-y-1.5">
            {courses.map((c) => (
              <div
                key={c.id}
                className={`p-2 rounded-lg text-xs font-mono flex items-center justify-between border ${
                  !c.enrolled && (joinType === 'RIGHT' || joinType === 'FULL')
                    ? 'border-purple-400 bg-purple-50 dark:bg-purple-950/40'
                    : !c.enrolled && joinType === 'INNER'
                    ? 'border-border bg-surface opacity-40 line-through'
                    : 'border-border bg-surface'
                }`}
              >
                <span>{c.id} · {c.name}</span>
                {c.enrolled ? (
                  <span className="text-success text-[10px] flex items-center gap-0.5 font-sans">
                    <CheckCircle2 className="w-3 h-3" /> Has Student
                  </span>
                ) : (
                  <span className="text-purple-600 dark:text-purple-400 text-[10px] flex items-center gap-0.5 font-sans font-bold">
                    No Student (NULL)
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Explanation Banner */}
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
          <h4 className="font-bold text-sm text-primary">
            {joinDescriptions[joinType].title}
          </h4>
          <span className="font-mono font-bold px-2 py-0.5 rounded bg-surface border border-primary/20 text-text">
            {joinDescriptions[joinType].count}
          </span>
        </div>
        <p className="text-text-muted leading-relaxed">
          {joinDescriptions[joinType].explanation}
        </p>
      </div>
    </div>
  );
};
