import React, { useState } from 'react';
import {
  FileText,
  Clock,
  AlertTriangle,
  Play,
  RotateCcw,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  Filter
} from 'lucide-react';
import { SqlCard } from './SqlCard';

interface LabTestPrepPageProps {
  onOpenInPlayground?: (sql: string) => void;
}

export const LabTestPrepPage: React.FC<LabTestPrepPageProps> = ({ onOpenInPlayground }) => {
  const [activeCoFilter, setActiveCoFilter] = useState<string>("ALL");
  const [selectedSet, setSelectedSet] = useState<'library' | 'aggregation' | 'joins' | 'transactions'>('transactions');

  // Statistical distribution breakdown matching Screenshot_2026-11-09_at_9.34.21_AM_1f144e29.png
  const topicWeights = [
    {
      topic: "Transactions, Concurrency & Savepoints (W7)",
      co: "CO3",
      pct: 32,
      color: "bg-indigo-600"
    },
    {
      topic: "Data Definition Language (DDL) & Schemas (W2)",
      co: "CO1",
      pct: 24,
      color: "bg-indigo-600"
    },
    {
      topic: "Aggregations, Grouping & Subqueries (W3)",
      co: "CO3",
      pct: 18,
      color: "bg-indigo-600"
    },
    {
      topic: "Relational Joins & Set Operations (W4)",
      co: "CO3",
      pct: 16,
      color: "bg-indigo-600"
    },
    {
      topic: "PostgreSQL Triggers & Stored Procedures (W5, W6)",
      co: "CO1",
      pct: 10,
      color: "bg-indigo-600"
    }
  ];

  // Question-to-Week Mapping Matrix matching screenshot
  const questionMatrix = [
    {
      term: "Lab Mid / Final",
      qNo: "Q1",
      topic: "Table creation with primary key, not null and default constraints",
      co: "CO1",
      marks: "10 Marks",
      module: "Week 2: DDL & Constraints"
    },
    {
      term: "Lab Mid / Final",
      qNo: "Q2",
      topic: "Filtering, case-sensitivity, and multi-column ORDER BY with LIMIT",
      co: "CO1",
      marks: "10 Marks",
      module: "Week 1: SQL Basics"
    },
    {
      term: "Lab Mid / Final",
      qNo: "Q3",
      topic: "GROUP BY with HAVING filter & NULL-safe aggregation with COALESCE",
      co: "CO3",
      marks: "15 Marks",
      module: "Week 3: Aggregation"
    },
    {
      term: "Lab Mid / Final",
      qNo: "Q4",
      topic: "Detecting unmatched rows via LEFT JOIN ... IS NULL",
      co: "CO3",
      marks: "15 Marks",
      module: "Week 4: Joins"
    },
    {
      term: "Lab Mid / Final",
      qNo: "Q5",
      topic: "Inventory restocking with single and multiple SAVEPOINTS & rollback recovery",
      co: "CO3",
      marks: "25 Marks",
      module: "Week 7: Transactions"
    }
  ];

  const filteredMatrix = questionMatrix.filter(row => {
    if (activeCoFilter === "ALL") return true;
    return row.co === activeCoFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Target Day Road Strip matching Screenshot_2026-11-09_at_9.34.21_AM_1f144e29.png top */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-[20px] bg-surface border border-border flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono text-primary font-bold mb-2">
            <span>Target Day 7–8</span>
            <ArrowRight className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-sm text-text leading-tight">
            Week 4: Relational Joins &amp; Set Operations
          </h4>
        </div>

        <div className="p-5 rounded-[20px] bg-surface border border-border flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono text-primary font-bold mb-2">
            <span>Target Day 9–10</span>
            <ArrowRight className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-sm text-text leading-tight">
            Week 5: Stored Procedures, Functions &amp; Triggers
          </h4>
        </div>

        <div className="p-5 rounded-[20px] bg-surface border border-border flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono text-primary font-bold mb-2">
            <span>Target Day 11–12</span>
            <ArrowRight className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-sm text-text leading-tight">
            Week 7: Advanced Transactions: Savepoints &amp; Rollback
          </h4>
        </div>
      </div>

      {/* Exam Topic Weight Distribution Card matching Screenshot_2026-11-09_at_9.34.21_AM_1f144e29.png */}
      <div className="p-6 sm:p-8 rounded-[28px] bg-surface border border-border shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-text">
              Exam Topic Weight Distribution (Historical Exam Analysis)
            </h2>
            <p className="text-xs sm:text-sm text-text-muted mt-1">
              Statistical breakdown of question marks distribution across previous semesters
            </p>
          </div>
          <span className="font-mono text-xs font-bold text-primary">
            100% Total
          </span>
        </div>

        {/* Progress bars list */}
        <div className="space-y-5 pt-2">
          {topicWeights.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-text">
                  {item.topic} <span className="text-text-muted font-normal">· {item.co}</span>
                </span>
                <span className="font-mono font-bold text-primary">
                  {item.pct}%
                </span>
              </div>
              <div className="w-full bg-surface-2 h-2 rounded-full overflow-hidden">
                <div
                  className={`${item.color} h-full rounded-full transition-all duration-700`}
                  style={{ width: `${item.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Question-to-Week Mapping Matrix matching Screenshot_2026-11-09_at_9.34.21_AM_1f144e29.png bottom */}
      <div className="p-6 sm:p-8 rounded-[28px] bg-surface border border-border shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-text">
              Question-to-Week Mapping Matrix
            </h3>
            <p className="text-xs text-text-muted mt-0.5">
              Direct mapping of term final question patterns to corresponding syllabus weeks
            </p>
          </div>

          {/* CO filter buttons */}
          <div className="flex items-center gap-1.5 bg-surface-2/70 p-1 rounded-xl border border-border">
            {["ALL", "CO1", "CO2", "CO3", "CO4"].map((co) => (
              <button
                key={co}
                onClick={() => setActiveCoFilter(co)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  activeCoFilter === co
                    ? "bg-surface text-primary shadow-xs font-bold"
                    : "text-text-muted hover:text-text"
                }`}
              >
                {co}
              </button>
            ))}
          </div>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border text-text-muted font-mono uppercase text-[11px]">
                <th className="py-2.5 px-3">Exam Term</th>
                <th className="py-2.5 px-3">Q#</th>
                <th className="py-2.5 px-3">Specific Topic</th>
                <th className="py-2.5 px-3">CO</th>
                <th className="py-2.5 px-3">Marks</th>
                <th className="py-2.5 px-3">Study Module</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredMatrix.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-surface-2/40 transition">
                  <td className="py-3 px-3 text-text-muted font-medium">{row.term}</td>
                  <td className="py-3 px-3 font-mono font-bold text-primary">{row.qNo}</td>
                  <td className="py-3 px-3 font-semibold text-text max-w-md">{row.topic}</td>
                  <td className="py-3 px-3 font-mono font-bold text-text">{row.co}</td>
                  <td className="py-3 px-3 font-mono text-text-muted">{row.marks}</td>
                  <td className="py-3 px-3 text-primary font-semibold">{row.module}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hands-on Interactive Practice Problems (Week 7 Restocking Part A & B) */}
      <div className="custom-card p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-bold text-text">
          Interactive Lab Test Simulator: Inventory Restocking with Savepoints
        </h3>
        <p className="text-xs text-text-muted">
          Execute Part A (single savepoint, commit stock 60) and Part B (multi-savepoint rewind, commit stock 65) directly in your browser.
        </p>

        <SqlCard
          title="Part A: Single Savepoint Restocking"
          dataset="txn_lab"
          slideNumber={11}
          initialSql={`SET search_path TO txn_lab;\nBEGIN;\nUPDATE product SET stock = stock + 10 WHERE product_id = 5;\nSAVEPOINT s1;\nUPDATE product SET stock = stock + 10 WHERE product_id = 5;\nROLLBACK TO SAVEPOINT s1;\nCOMMIT;\nSELECT product_id, name, stock FROM product WHERE product_id = 5;`}
          expected={{
            columns: ["product_id", "name", "stock"],
            rows: [[5, "Keyboard", 60]]
          }}
          explain="Keyboard starts at 50, +10 (60), second +10 rolled back to s1, committed stock is 60."
          onOpenInPlayground={onOpenInPlayground}
        />

        <SqlCard
          title="Part B: Multi-Savepoint Rewind"
          dataset="txn_lab"
          slideNumber={12}
          initialSql={`SET search_path TO txn_lab;\nBEGIN;\nUPDATE product SET stock = stock + 5  WHERE product_id = 5;  SAVEPOINT s1;\nUPDATE product SET stock = stock + 15 WHERE product_id = 5;  SAVEPOINT s2;\nUPDATE product SET stock = stock - 8  WHERE product_id = 5;  SAVEPOINT s3;\nUPDATE product SET stock = stock + 20 WHERE product_id = 5;\nROLLBACK TO SAVEPOINT s3;\nROLLBACK TO SAVEPOINT s2;\nROLLBACK TO SAVEPOINT s1;\nCOMMIT;\nSELECT product_id, name, stock FROM product WHERE product_id = 5;`}
          expected={{
            columns: ["product_id", "name", "stock"],
            rows: [[5, "Keyboard", 65]]
          }}
          explain="Progressive rollbacks across s3, s2, and s1, ending in committed stock 65."
          onOpenInPlayground={onOpenInPlayground}
        />
      </div>
    </div>
  );
};
