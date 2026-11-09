import React, { useState } from 'react';
import { Play, Copy, Check, Info, RotateCcw, AlertTriangle, ArrowRight } from 'lucide-react';
import { executeSql, SqlQueryResult } from '../sql/engine';

interface SqlCardProps {
  id?: string;
  title?: string;
  initialSql: string;
  expected?: {
    columns: string[];
    rows: any[][];
  };
  explain?: string;
  slideNumber?: number;
  dataset?: "library" | "uni3" | "joins" | "programs" | "triggers" | "txn_lab";
  compact?: boolean;
  onOpenInPlayground?: (sql: string) => void;
}

export const SqlCard: React.FC<SqlCardProps> = ({
  title,
  initialSql,
  expected,
  explain,
  slideNumber,
  dataset = "library",
  compact = false,
  onOpenInPlayground
}) => {
  const [sql, setSql] = useState(initialSql);
  const [result, setResult] = useState<SqlQueryResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<'output' | 'expected' | 'explain'>('output');
  const [copied, setCopied] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleRun = async () => {
    setIsRunning(true);
    try {
      const res = await executeSql(sql, dataset);
      setResult(res);
      setActiveTab('output');
    } catch (err: any) {
      setResult({
        columns: [],
        rows: [],
        rowCount: 0,
        executionTimeMs: 0,
        error: { message: err?.message || 'Error executing SQL' }
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setSql(initialSql);
    setResult(null);
  };

  const isMatchesExpected = () => {
    if (!result || !expected || result.error) return false;
    if (result.rows.length !== expected.rows.length) return false;
    // Compare stringified representations
    const resRows = result.rows.map(r => r.join('|'));
    const expRows = expected.rows.map(r => r.join('|'));
    return resRows.every((r, idx) => r === expRows[idx]);
  };

  return (
    <div className={`custom-card overflow-hidden my-4 transition-all ${compact ? 'text-sm' : ''}`}>
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-surface-2 border-b border-border gap-2">
        <div className="flex items-center gap-2">
          {slideNumber && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary">
              Slide {slideNumber}
            </span>
          )}
          <h4 className="font-semibold text-text text-sm">
            {title || "SQL Query"}
          </h4>
          <span className="text-xs text-text-muted hidden sm:inline">
            (Runs on: <span className="font-mono">{dataset}</span>)
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {explain && (
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className={`p-1.5 rounded-md text-xs font-medium flex items-center gap-1 transition ${
                showExplanation ? 'bg-primary/15 text-primary' : 'text-text-muted hover:bg-surface'
              }`}
              title="Explain logical query execution"
            >
              <Info className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Explain</span>
            </button>
          )}

          <button
            onClick={handleReset}
            className="p-1.5 rounded-md text-text-muted hover:bg-surface transition"
            title="Reset SQL to initial"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleCopy}
            className="p-1.5 rounded-md text-text-muted hover:bg-surface transition"
            title="Copy SQL"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          {onOpenInPlayground && (
            <button
              onClick={() => onOpenInPlayground(sql)}
              className="text-xs px-2 py-1 rounded bg-surface hover:bg-border text-text font-medium flex items-center gap-1 transition"
            >
              Playground <ArrowRight className="w-3 h-3" />
            </button>
          )}

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold text-xs transition shadow-sm cursor-pointer disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 fill-current ${isRunning ? 'animate-spin' : ''}`} />
            {isRunning ? 'Running...' : 'Run (Ctrl+↵)'}
          </button>
        </div>
      </div>

      {/* Code Editor Area */}
      <div className="p-3 bg-code-bg">
        <textarea
          value={sql}
          onChange={(e) => setSql(e.target.value)}
          onKeyDown={(e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
              e.preventDefault();
              handleRun();
            }
          }}
          rows={Math.max(2, sql.split('\n').length)}
          className="w-full bg-transparent text-code-text font-mono text-sm resize-none focus:outline-none border-none p-1"
          spellCheck={false}
        />
      </div>

      {/* Logical explanation preview */}
      {showExplanation && explain && (
        <div className="px-4 py-2.5 bg-primary/5 border-t border-border text-xs text-text flex items-start gap-2">
          <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-primary">Query Logic: </span>
            {explain}
          </div>
        </div>
      )}

      {/* Results / Expected Tabs if query was run or expected exists */}
      {(result || expected) && (
        <div className="border-t border-border">
          <div className="flex items-center justify-between px-3 py-1.5 bg-surface-2 border-b border-border text-xs">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('output')}
                className={`px-2.5 py-1 rounded font-medium transition ${
                  activeTab === 'output' ? 'bg-surface text-primary shadow-xs' : 'text-text-muted hover:text-text'
                }`}
              >
                Your Output {result?.commandTag ? `(${result.commandTag})` : ''}
              </button>

              {expected && (
                <button
                  onClick={() => setActiveTab('expected')}
                  className={`px-2.5 py-1 rounded font-medium flex items-center gap-1 transition ${
                    activeTab === 'expected' ? 'bg-surface text-primary shadow-xs' : 'text-text-muted hover:text-text'
                  }`}
                >
                  Expected (from slide)
                  {isMatchesExpected() && (
                    <span className="text-[10px] text-success font-semibold flex items-center gap-0.5">
                      <Check className="w-3 h-3" /> Matches!
                    </span>
                  )}
                </button>
              )}
            </div>

            {result && !result.error && (
              <span className="text-text-muted text-[11px] font-mono">
                {result.rowCount} row{result.rowCount !== 1 ? 's' : ''} in {result.executionTimeMs}ms
              </span>
            )}
          </div>

          {/* Result view */}
          <div className="p-3 bg-surface max-h-60 overflow-auto">
            {activeTab === 'output' && (
              <>
                {!result && (
                  <p className="text-xs text-text-muted italic py-2 text-center">
                    Click "Run" to execute this SQL statement on the live in-browser PostgreSQL engine.
                  </p>
                )}

                {result?.error && (
                  <div className="p-3 rounded-lg bg-danger/10 border border-danger/20 text-danger text-xs space-y-1">
                    <div className="flex items-center gap-1.5 font-semibold">
                      <AlertTriangle className="w-4 h-4" />
                      PostgreSQL Error {result.error.code ? `(SQLSTATE ${result.error.code})` : ''}
                    </div>
                    <div className="font-mono text-xs">{result.error.message}</div>
                    {result.error.hint && (
                      <div className="mt-1 pt-1 border-t border-danger/20 text-text text-[11px]">
                        <strong>Hint:</strong> {result.error.hint}
                      </div>
                    )}
                  </div>
                )}

                {result && !result.error && (
                  result.columns.length === 0 ? (
                    <div className="text-xs font-mono text-success py-1">
                      Query executed successfully: {result.commandTag}
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left font-mono text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-border bg-surface-2/60 text-text-muted">
                            {result.columns.map((col, idx) => (
                              <th key={idx} className="p-2 font-semibold whitespace-nowrap">
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {result.rows.length === 0 ? (
                            <tr>
                              <td colSpan={result.columns.length} className="p-3 text-center text-text-muted italic">
                                0 rows returned
                              </td>
                            </tr>
                          ) : (
                            result.rows.map((row, rIdx) => (
                              <tr key={rIdx} className="border-b border-border/50 hover:bg-surface-2/40 transition">
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx} className="p-2 whitespace-nowrap">
                                    {cell === null ? (
                                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-500 font-medium">
                                        NULL
                                      </span>
                                    ) : (
                                      String(cell)
                                    )}
                                  </td>
                                ))}
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  )
                )}
              </>
            )}

            {activeTab === 'expected' && expected && (
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-border bg-surface-2/60 text-text-muted">
                      {expected.columns.map((col, idx) => (
                        <th key={idx} className="p-2 font-semibold whitespace-nowrap">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {expected.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="border-b border-border/50 bg-emerald-500/5">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="p-2 whitespace-nowrap">
                            {cell === null ? (
                              <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-500">
                                NULL
                              </span>
                            ) : (
                              String(cell)
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
