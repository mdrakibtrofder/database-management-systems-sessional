import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Lock,
  ChevronRight,
  Filter,
  Layers,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { course, WeekData } from '../data/course';

interface RoadmapPageProps {
  onSelectWeek: (weekId: number) => void;
}

export const RoadmapPage: React.FC<RoadmapPageProps> = ({ onSelectWeek }) => {
  const [filterCluster, setFilterCluster] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const clusters = [
    { id: "all", label: "All Topics" },
    { id: "foundations", label: "Foundations", color: "var(--c-foundations)" },
    { id: "relational", label: "Relational", color: "var(--c-relational)" },
    { id: "sql", label: "SQL", color: "var(--c-sql)" },
    { id: "storage", label: "Storage", color: "var(--c-storage)" },
    { id: "transactions", label: "Transactions", color: "var(--c-txn)" },
    { id: "modern", label: "Modern", color: "var(--c-modern)" },
    { id: "revision", label: "Revision", color: "var(--c-revision)" }
  ];

  const filteredWeeks = course.weeks.filter(w => {
    if (filterCluster !== "all" && w.cluster !== filterCluster) return false;
    if (filterStatus === "published" && w.status !== "published") return false;
    if (filterStatus === "upcoming" && w.status !== "upcoming") return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Semester Curriculum
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text mt-1">
            Weekly Roadmap &amp; Progress
          </h1>
          <p className="text-xs sm:text-sm text-text-muted mt-1 leading-relaxed">
            Metro-line curriculum from PostgreSQL foundations to advanced transactions, triggers, and full-stack project viva.
          </p>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="custom-card p-4 space-y-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-text-muted mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Cluster:
          </span>
          {clusters.map(cl => (
            <button
              key={cl.id}
              onClick={() => setFilterCluster(cl.id)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                filterCluster === cl.id
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-surface-2 text-text hover:bg-border'
              }`}
            >
              {cl.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 pt-1 border-t border-border">
          <span className="text-xs text-text-muted">Status:</span>
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-2.5 py-0.5 rounded text-xs font-medium ${filterStatus === "all" ? "bg-surface text-primary border border-border" : "text-text-muted"}`}
          >
            All
          </button>
          <button
            onClick={() => setFilterStatus("published")}
            className={`px-2.5 py-0.5 rounded text-xs font-medium ${filterStatus === "published" ? "bg-surface text-primary border border-border" : "text-text-muted"}`}
          >
            Published Only (W1–7)
          </button>
          <button
            onClick={() => setFilterStatus("upcoming")}
            className={`px-2.5 py-0.5 rounded text-xs font-medium ${filterStatus === "upcoming" ? "bg-surface text-primary border border-border" : "text-text-muted"}`}
          >
            Upcoming (W8–14)
          </button>
        </div>
      </div>

      {/* Metro Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWeeks.map((week) => {
          const isPublished = week.status === "published";
          const isMarkedDone = (() => {
            try {
              return localStorage.getItem(`cse2206-week-${week.id}-done`) === 'true';
            } catch (e) {
              return false;
            }
          })();

          return (
            <div
              key={week.id}
              onClick={() => onSelectWeek(week.id)}
              className={`custom-card p-5 flex flex-col justify-between cursor-pointer transition-all hover:-translate-y-0.5 ${
                !isPublished ? 'opacity-70 bg-surface/60' : 'hover:border-primary/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-primary px-2 py-0.5 rounded bg-primary/10">
                    {week.label}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {isMarkedDone && (
                      <span className="text-success text-xs font-bold flex items-center gap-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Done
                      </span>
                    )}
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isPublished ? 'bg-success/10 text-success' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                    }`}>
                      {isPublished ? 'Published' : 'Coming Soon'}
                    </span>
                  </div>
                </div>

                <h3 className="font-bold text-base text-text leading-tight mb-2">
                  {week.title}
                </h3>
                <p className="text-xs text-text-muted line-clamp-2 leading-relaxed mb-4">
                  {week.summary}
                </p>

                {/* Topics snippet */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {week.topics.slice(0, 3).map((top, tIdx) => (
                    <span key={tIdx} className="text-[10px] px-2 py-0.5 rounded bg-surface-2 text-text-muted border border-border">
                      {top}
                    </span>
                  ))}
                  {week.topics.length > 3 && (
                    <span className="text-[10px] text-text-muted self-center">
                      +{week.topics.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                <span className="text-text-muted font-mono">
                  {isPublished ? `${week.snippets.length} queries · ${week.decks[0]?.slides || 0} slides` : 'Locked'}
                </span>
                <span className="font-semibold text-primary flex items-center gap-1">
                  {isPublished ? 'Open Week' : 'View Outline'} <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
