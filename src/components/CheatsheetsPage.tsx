import React, { useState } from 'react';
import { Search, Printer, Star, Play, Copy, ArrowRight, ExternalLink } from 'lucide-react';
import { cheatsheets, cheatsheetCategories, CheatsheetCard } from '../data/cheatsheets';
import { executeSql, SqlQueryResult } from '../sql/engine';

interface CheatsheetsPageProps {
  onOpenInPlayground?: (sql: string) => void;
}

export const CheatsheetsPage: React.FC<CheatsheetsPageProps> = ({ onOpenInPlayground }) => {
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [starred, setStarred] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('cse2206-starred-cheats');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [activeResults, setActiveResults] = useState<Record<string, SqlQueryResult>>({});
  const [runningId, setRunningId] = useState<string | null>(null);

  const toggleStar = (id: string) => {
    setStarred(prev => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('cse2206-starred-cheats', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handleRunExample = async (card: CheatsheetCard) => {
    setRunningId(card.id);
    try {
      const res = await executeSql(card.exampleSql, card.dataset);
      setActiveResults(prev => ({ ...prev, [card.id]: res }));
    } catch (e: any) {
      setActiveResults(prev => ({
        ...prev,
        [card.id]: {
          columns: [],
          rows: [],
          rowCount: 0,
          executionTimeMs: 0,
          error: { message: e?.message || "Execution error" }
        }
      }));
    } finally {
      setRunningId(null);
    }
  };

  const filteredCards = cheatsheets.filter(card => {
    if (selectedCat !== "all" && card.category !== selectedCat) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        card.title.toLowerCase().includes(q) ||
        card.whenToUse.toLowerCase().includes(q) ||
        card.syntax.toLowerCase().includes(q) ||
        card.exampleSql.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-c-sql">
            Lab &amp; Exam Quick Reference
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text mt-1">
            SQL Cheat Sheets
          </h1>
          <p className="text-xs sm:text-sm text-text-muted mt-1">
            Ready-to-run queries across DDL, DML, Aggregates, Joins, Programs, Transactions &amp; Common Errors.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 rounded-lg border border-border hover:bg-surface-2 text-xs font-semibold text-text flex items-center gap-1.5 transition"
            title="Print clean A4 reference sheet"
          >
            <Printer className="w-3.5 h-3.5" /> Print Sheets
          </button>
        </div>
      </div>

      {/* Search and Category Filter Rail */}
      <div className="custom-card p-4 mb-6 space-y-3">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-text-muted absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search syntax, keyword, having, savepoint, between, using..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-surface-2 border border-border text-xs sm:text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Category chip selector */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <button
            onClick={() => setSelectedCat("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              selectedCat === "all" ? "bg-primary text-white" : "bg-surface-2 text-text hover:bg-border"
            }`}
          >
            All Categories ({cheatsheets.length})
          </button>
          {cheatsheetCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedCat === cat.id ? "bg-primary text-white" : "bg-surface-2 text-text hover:bg-border"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Cheat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCards.map((card) => {
          const isStarred = starred[card.id];
          const queryResult = activeResults[card.id];
          const isRunning = runningId === card.id;

          return (
            <div key={card.id} className="custom-card p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                      Week {card.week} · {card.category.toUpperCase()}
                    </span>
                    <h3 className="font-bold text-base text-text leading-tight mt-0.5">
                      {card.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => toggleStar(card.id)}
                    className="p-1 rounded text-text-muted hover:text-amber-500 transition"
                    title={isStarred ? "Unstar" : "Star favorite"}
                  >
                    <Star className={`w-4 h-4 ${isStarred ? "fill-amber-500 text-amber-500" : ""}`} />
                  </button>
                </div>

                <p className="text-xs text-text-muted mb-3">
                  {card.whenToUse}
                </p>

                {/* Syntax */}
                <div className="p-2.5 rounded-lg bg-surface-2 font-mono text-[11px] text-text border border-border mb-3">
                  <div className="text-[10px] font-bold text-text-muted uppercase mb-0.5">Syntax:</div>
                  <div className="whitespace-pre-wrap">{card.syntax}</div>
                </div>

                {/* Example Query */}
                <div className="p-3 rounded-xl bg-code-bg font-mono text-xs text-code-text border border-border mb-3 overflow-x-auto">
                  <div className="text-[10px] font-bold text-text-muted uppercase mb-1">Executable Example:</div>
                  <pre className="whitespace-pre-wrap">{card.exampleSql}</pre>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-border text-xs">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleRunExample(card)}
                      disabled={isRunning}
                      className="px-3 py-1.5 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold flex items-center gap-1 transition cursor-pointer disabled:opacity-50"
                    >
                      <Play className={`w-3 h-3 fill-current ${isRunning ? "animate-spin" : ""}`} />
                      {isRunning ? "Running..." : "▶ Run"}
                    </button>

                    {onOpenInPlayground && (
                      <button
                        onClick={() => onOpenInPlayground(card.exampleSql)}
                        className="px-2.5 py-1.5 rounded-lg bg-surface hover:bg-surface-2 border border-border text-text font-medium flex items-center gap-1 transition"
                      >
                        Playground <ExternalLink className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  <span className="text-[11px] text-text-muted font-mono">
                    Dataset: {card.dataset}
                  </span>
                </div>

                {/* Inline Result Table if run */}
                {queryResult && (
                  <div className="mt-3 p-3 rounded-xl bg-surface-2 border border-border text-xs overflow-x-auto">
                    {queryResult.error ? (
                      <div className="text-danger font-mono">{queryResult.error.message}</div>
                    ) : queryResult.rows.length === 0 ? (
                      <div className="text-text-muted italic">Command completed successfully ({queryResult.commandTag}).</div>
                    ) : (
                      <table className="w-full text-left font-mono text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-border text-text-muted">
                            {queryResult.columns.map((c, i) => (
                              <th key={i} className="p-1 font-semibold">{c}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {queryResult.rows.slice(0, 4).map((r, rIdx) => (
                            <tr key={rIdx} className="border-b border-border/40">
                              {r.map((cell, cIdx) => (
                                <td key={cIdx} className="p-1 whitespace-nowrap">
                                  {cell === null ? "NULL" : String(cell)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
