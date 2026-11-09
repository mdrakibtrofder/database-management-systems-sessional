import React, { useState } from 'react';
import {
  FileText,
  Download,
  Eye,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { course } from '../data/course';

interface NotesPageProps {
  onSelectWeek: (weekId: number) => void;
}

export const NotesPage: React.FC<NotesPageProps> = ({ onSelectWeek }) => {
  // Handouts and notes collection
  const documents = [
    {
      id: "w1",
      week: 1,
      type: "Slide Deck (PPTX & PDF)",
      pages: "19 slides",
      size: "4.8 MB",
      title: "PostgreSQL & SQL Basics",
      desc: "Server → Database → Schema → Table hierarchy, psql shortcuts, SELECT, DISTINCT, WHERE, ORDER BY, LIMIT, and the three safe write rules.",
      chips: ["Week 1", "psql", "SELECT", "WHERE", "ORDER BY"],
      pdf: "/assets/slides/pdf/week-01-postgresql-sql-basics.pdf",
      pptx: "/assets/slides/pptx/Week_1_PostgreSQL_SQL_Basics.pptx"
    },
    {
      id: "w2",
      week: 2,
      type: "Slide Deck (PPTX & PDF)",
      pages: "18 slides",
      size: "4.5 MB",
      title: "DDL: Tables, Constraints & Schemas",
      desc: "CREATE TABLE with constraints, ALTER TABLE (ADD, DROP, RENAME, TYPE USING), TRUNCATE vs DELETE vs DROP, and PostgreSQL schemas.",
      chips: ["Week 2", "CREATE TABLE", "ALTER TABLE", "search_path", "Constraints"],
      pdf: "/assets/slides/pdf/week-02-ddl-tables-schemas-databases.pdf",
      pptx: "/assets/slides/pptx/Week_2_DDL_Tables_Schemas_Databases.pptx"
    },
    {
      id: "w3",
      week: 3,
      type: "Slide Deck (PPTX & PDF)",
      pages: "14 slides",
      size: "3.9 MB",
      title: "Aggregation, Grouping & Subqueries",
      desc: "COUNT(*) vs COUNT(col), SUM, AVG with COALESCE, GROUP BY, HAVING, Scalar subqueries, NOT IN NULL trap, and NOT EXISTS.",
      chips: ["Week 3", "COUNT", "GROUP BY", "HAVING", "Subqueries"],
      pdf: "/assets/slides/pdf/week-03-aggregation-grouping-subqueries.pdf",
      pptx: "/assets/slides/pptx/Week_3_Aggregation_Grouping_Subqueries.pptx"
    },
    {
      id: "w4",
      week: 4,
      type: "Slide Deck (PPTX & PDF)",
      pages: "7 slides",
      size: "0.3 MB",
      title: "SQL Joins and Set Operations",
      desc: "Inner, left, right, full outer, cross and self joins. Spotting unmatched rows with LEFT JOIN ... IS NULL. UNION, INTERSECT, and EXCEPT.",
      chips: ["Week 4", "INNER JOIN", "LEFT JOIN", "FULL JOIN", "UNION"],
      pdf: "/assets/slides/pdf/week-04-sql-joins-and-set-operations.pdf",
      pptx: "/assets/slides/pptx/Week_4_SQL_Joins_and_Set_Operations.pptx"
    },
    {
      id: "w7-note",
      week: 7,
      type: "PDF Document",
      pages: "9 pages",
      size: "150 KB",
      title: "Transactions Lab: COMMIT, ROLLBACK & SAVEPOINT Handout",
      desc: "Theoretical & hands-on foundation of transaction control. Autocommit traps, atomicity violation recovery (23514 & 25P02), isolation t1–t8 walkthrough, and savepoint stacks.",
      chips: ["Week 7", "ACID Properties", "SAVEPOINT", "ROLLBACK", "25P02"],
      pdf: "/assets/handouts/week-07-transactions-lab-handout.pdf",
      isHandout: true
    },
    {
      id: "w7-prob",
      week: 7,
      type: "PDF Document",
      pages: "1 page",
      size: "3 KB",
      title: "Transactions Practice Handout (Inventory Restocking with Savepoints)",
      desc: "Scenario-based exam preparation handout. Part A contains problem statements for single savepoint (commit 60); Part B provides multi-savepoint rewind problem (commit 65).",
      chips: ["Week 7", "Part A (60)", "Part B (65)", "Restocking", "Problem Statement"],
      pdf: "/assets/handouts/week-07-savepoint-problem-statement.pdf",
      isHandout: true
    },
    {
      id: "w7-prev",
      week: 14,
      type: "PDF Document",
      pages: "18 pages",
      size: "1.2 MB",
      title: "Previous Years' Lab Test & Final Exam Question Papers",
      desc: "Collection of lab test question patterns from previous semesters at BAUST, highlighting recurring query patterns, savepoint scenarios, and weight distributions.",
      chips: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 7", "Question Bank", "Marks Distribution"],
      pdf: "/assets/handouts/week-07-transactions-lab-handout.pdf",
      isScannedNote: true
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div>
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
          RESOURCE REPOSITORY
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-text mt-1">
          Lecture Notes, Slides &amp; Handouts
        </h1>
        <p className="text-xs sm:text-sm text-text-muted mt-1 max-w-2xl">
          All official slide decks, handouts, and laboratory exercises for CSE 2206 DBMS Sessional.
        </p>
      </div>

      {/* 3-Column Grid Matching Screenshot_2026-11-09_at_9.34.09_AM_a299876c.png */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="p-6 rounded-[24px] bg-surface border border-border shadow-xs hover:border-primary/50 transition flex flex-col justify-between"
          >
            <div>
              {/* Type and Page/Size header */}
              <div className="flex items-center justify-between text-xs text-text-muted mb-3 font-medium">
                <span className="flex items-center gap-1.5 text-primary font-bold">
                  <FileText className="w-4 h-4" /> {doc.type}
                </span>
                <span className="font-mono text-[11px]">{doc.pages} · {doc.size}</span>
              </div>

              {/* Title */}
              <h3 className="font-extrabold text-base sm:text-lg text-text mb-2.5 leading-snug">
                {doc.title}
              </h3>

              {/* Yellow callout badge if scanned note */}
              {doc.isScannedNote && (
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-800 dark:text-amber-300 mb-3 leading-relaxed">
                  Scanned note · light compressed version shown · download full quality
                </div>
              )}

              {/* Description */}
              <p className="text-xs text-text-muted leading-relaxed mb-4">
                {doc.desc}
              </p>

              {/* Topic chips matching screenshot a299876c */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {doc.chips.map((chip, cIdx) => {
                  const isWeekChip = chip.startsWith("Week ");
                  return (
                    <span
                      key={cIdx}
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-md transition ${
                        isWeekChip
                          ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/40"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                      }`}
                    >
                      {chip}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions Row matching screenshot */}
            <div className="pt-4 border-t border-border flex items-center justify-between text-xs font-semibold">
              <button
                onClick={() => onSelectWeek(doc.week)}
                className="text-primary hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" /> View in Browser
              </button>

              <a
                href={doc.pdf}
                download
                className="text-text-muted hover:text-text flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
