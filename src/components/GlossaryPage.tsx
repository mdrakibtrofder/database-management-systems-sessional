import React, { useState } from 'react';
import { Search, ExternalLink, BookOpen, ArrowRight } from 'lucide-react';
import { glossaryTerms } from '../data/glossary';

interface GlossaryPageProps {
  onSelectWeek?: (weekId: number) => void;
  onOpenInPlayground?: (sql: string) => void;
}

export const GlossaryPage: React.FC<GlossaryPageProps> = ({ onSelectWeek, onOpenInPlayground }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("All");

  const domains = [
    "All",
    "Transactions",
    "SQL",
    "Foundations",
    "Recovery",
    "Relational Theory",
    "Storage & Indexing",
    "Normalization",
    "Data Modeling"
  ];

  const filtered = glossaryTerms.filter(t => {
    if (selectedDomain !== "All") {
      if (selectedDomain === "Transactions" && t.category !== "Transactions") return false;
      if (selectedDomain === "SQL" && (t.category !== "DML & DQL" && t.category !== "Aggregates" && t.category !== "Joins")) return false;
      if (selectedDomain === "Foundations" && t.category !== "DDL" && t.category !== "General") return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        t.term.toLowerCase().includes(q) ||
        t.def.toLowerCase().includes(q) ||
        t.sql.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header section matching Screenshot_2026-11-09_at_9.34.29_AM_75a2d73e.png */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
            QUICK REFERENCE
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-text tracking-tight">
            A–Z Database Systems Glossary
          </h1>
          <p className="text-sm sm:text-base text-text-muted max-w-2xl leading-relaxed">
            60+ essential DBMS terms, relational algebra notation, normal forms, transaction ACID states, and storage definitions with direct links into corresponding study modules.
          </p>
        </div>

        {/* Search input with matching style */}
        <div className="w-full md:w-80 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 60+ terms or concepts..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-surface border border-border text-xs sm:text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-xs"
            />
          </div>
        </div>
      </div>

      {/* Domain Chip Filter Bar matching Screenshot 75a2d73e */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-1">Domain:</span>
        {domains.map((dom) => (
          <button
            key={dom}
            onClick={() => setSelectedDomain(dom)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
              selectedDomain === dom
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            {dom === "All" ? `All (${glossaryTerms.length})` : dom}
          </button>
        ))}
      </div>

      {/* Glossary Cards Grid matching screenshot style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((t, idx) => (
          <div
            key={idx}
            className="p-6 rounded-[24px] bg-surface border border-border shadow-xs hover:border-primary/50 transition flex flex-col justify-between"
          >
            <div>
              {/* Category & Week tags */}
              <div className="flex items-center justify-between text-xs font-semibold mb-2">
                <span className="text-primary font-bold">
                  {t.category}
                </span>
                <span className="text-text-muted font-mono text-[11px]">
                  Week {t.week}
                </span>
              </div>

              {/* Term Title */}
              <h3 className="font-extrabold text-lg text-text mb-2.5 leading-snug">
                {t.term}
              </h3>

              {/* Definition */}
              <p className="text-xs text-text-muted leading-relaxed mb-4">
                {t.def}
              </p>

              {/* Syntax or Code preview */}
              {t.sql && (
                <div className="p-3 rounded-xl bg-surface-2/70 font-mono text-xs text-text border border-border/80 mb-4 overflow-x-auto">
                  <pre className="whitespace-pre-wrap">{t.sql}</pre>
                </div>
              )}
            </div>

            {/* Bottom link */}
            <div className="pt-2 border-t border-border/60">
              {onSelectWeek ? (
                <button
                  onClick={() => onSelectWeek(t.week)}
                  className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Study in Week {t.week} <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
