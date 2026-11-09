import React, { useState } from 'react';
import {
  Play,
  RotateCcw,
  Copy,
  Download,
  Terminal,
  Database,
  Table as TableIcon,
  Columns,
  AlertTriangle,
  Check,
  Share2
} from 'lucide-react';
import { executeSql, SqlQueryResult, resetCurrentDataset } from '../sql/engine';
import { course } from '../data/course';

export const PlaygroundPage: React.FC = () => {
  const [selectedDataset, setSelectedDataset] = useState<"library" | "uni3" | "joins" | "programs" | "triggers" | "txn_lab">("library");
  const [sql, setSql] = useState<string>("SELECT BookTitle, Author, AvailableCopies\nFROM Library\nORDER BY AvailableCopies DESC\nLIMIT 3;");
  const [result, setResult] = useState<SqlQueryResult | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);
  const [txnStatus, setTxnStatus] = useState<"Autocommit" | "In Transaction" | "Aborted (25P02)">("Autocommit");

  const handleRun = async () => {
    setIsRunning(true);
    try {
      const res = await executeSql(sql, selectedDataset);
      setResult(res);

      const upper = sql.toUpperCase();
      if (res.error?.code === '25P02' || res.error?.message.includes('25P02')) {
        setTxnStatus("Aborted (25P02)");
      } else if (upper.includes('BEGIN') && !upper.includes('COMMIT') && !upper.includes('ROLLBACK')) {
        setTxnStatus("In Transaction");
      } else if (upper.includes('COMMIT') || upper.includes('ROLLBACK')) {
        setTxnStatus("Autocommit");
      }
    } catch (e: any) {
      setResult({
        columns: [],
        rows: [],
        rowCount: 0,
        executionTimeMs: 0,
        error: { message: e?.message || "Execution error" }
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleResetDataset = async () => {
    await resetCurrentDataset(selectedDataset);
    alert(`Dataset '${selectedDataset}' has been reset to its pristine initial seed!`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCsv = () => {
    if (!result || !result.columns.length) return;
    const header = result.columns.join(',');
    const rows = result.rows.map(r => r.map(c => `"${c ?? ''}"`).join(',')).join('\n');
    const blob = new Blob([header + '\n' + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `query_result_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Top Header bar with status pill */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-text">SQL Playground</h1>
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
              txnStatus === 'Autocommit'
                ? 'bg-slate-100 dark:bg-slate-800 text-text-muted'
                : txnStatus === 'In Transaction'
                ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
            }`}>
              Status: {txnStatus}
            </span>
          </div>
          <p className="text-xs text-text-muted mt-0.5">
            Real in-browser PostgreSQL 16 engine powered by WebAssembly. Execute arbitrary DDL, DML, TCL, queries, and psql meta-commands (\dt, \d table, \dn).
          </p>
        </div>

        {/* Dataset Switcher and Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 bg-surface-2 px-3 py-1.5 rounded-xl border border-border">
            <Database className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-text-muted">Dataset:</span>
            <select
              value={selectedDataset}
              onChange={(e) => {
                setSelectedDataset(e.target.value as any);
                setResult(null);
              }}
              className="bg-transparent text-xs font-semibold text-text focus:outline-none cursor-pointer"
            >
              <option value="library">Library (W1–2)</option>
              <option value="uni3">Student · Course · Enrollment (W3)</option>
              <option value="joins">Joins & Faculty (W4)</option>
              <option value="programs">Programs & Orders (W5)</option>
              <option value="triggers">Employee Audit (W6)</option>
              <option value="txn_lab">Transactions & Inventory (W7)</option>
            </select>
          </div>

          <button
            onClick={handleResetDataset}
            className="px-3 py-1.5 rounded-xl border border-border hover:bg-surface-2 text-xs font-medium text-text flex items-center gap-1.5 transition"
            title="Reset database to initial pristine seed"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Seed
          </button>
        </div>
      </div>

      {/* Main IDE workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Schema Explorer Sidebar */}
        <div className="custom-card p-4 lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <span className="text-xs font-bold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
              <TableIcon className="w-3.5 h-3.5 text-primary" /> Active Tables
            </span>
            <span className="text-[10px] text-text-muted font-mono">{selectedDataset}</span>
          </div>

          <div className="space-y-2 text-xs">
            {selectedDataset === 'library' && (
              <div className="space-y-1">
                <div
                  onClick={() => setSql("SELECT * FROM Library;")}
                  className="font-mono font-bold text-primary cursor-pointer hover:underline flex items-center gap-1"
                >
                  <TableIcon className="w-3 h-3" /> Library
                </div>
                <div className="pl-4 text-[11px] text-text-muted font-mono space-y-0.5">
                  <div>🔑 BookID (INT)</div>
                  <div>BookTitle (VARCHAR)</div>
                  <div>Author (VARCHAR)</div>
                  <div>AvailableCopies (INT)</div>
                </div>
              </div>
            )}

            {selectedDataset === 'uni3' && (
              <div className="space-y-3 font-mono">
                <div>
                  <div
                    onClick={() => setSql("SELECT * FROM STUDENT;")}
                    className="font-bold text-primary cursor-pointer hover:underline"
                  >
                    STUDENT
                  </div>
                  <div className="pl-3 text-[11px] text-text-muted">StuID, StuName, Dept</div>
                </div>
                <div>
                  <div
                    onClick={() => setSql("SELECT * FROM COURSE;")}
                    className="font-bold text-primary cursor-pointer hover:underline"
                  >
                    COURSE
                  </div>
                  <div className="pl-3 text-[11px] text-text-muted">CourseID, Title, Dept, Credit</div>
                </div>
                <div>
                  <div
                    onClick={() => setSql("SELECT * FROM ENROLLMENT;")}
                    className="font-bold text-primary cursor-pointer hover:underline"
                  >
                    ENROLLMENT
                  </div>
                  <div className="pl-3 text-[11px] text-text-muted">StuID, CourseID, Marks</div>
                </div>
              </div>
            )}

            {selectedDataset === 'txn_lab' && (
              <div className="space-y-3 font-mono">
                <div>
                  <div
                    onClick={() => setSql("SET search_path TO txn_lab;\nSELECT * FROM account;")}
                    className="font-bold text-primary cursor-pointer hover:underline"
                  >
                    account
                  </div>
                  <div className="pl-3 text-[11px] text-text-muted">acc_no, holder, balance</div>
                </div>
                <div>
                  <div
                    onClick={() => setSql("SET search_path TO txn_lab;\nSELECT * FROM product;")}
                    className="font-bold text-primary cursor-pointer hover:underline"
                  >
                    product
                  </div>
                  <div className="pl-3 text-[11px] text-text-muted">product_id, name, stock</div>
                </div>
              </div>
            )}

            {selectedDataset === 'joins' && (
              <div className="space-y-2 font-mono text-xs">
                <div onClick={() => setSql("SELECT * FROM Students;")} className="text-primary cursor-pointer hover:underline">Students</div>
                <div onClick={() => setSql("SELECT * FROM Courses;")} className="text-primary cursor-pointer hover:underline">Courses</div>
                <div onClick={() => setSql("SELECT * FROM Enrollments;")} className="text-primary cursor-pointer hover:underline">Enrollments</div>
                <div onClick={() => setSql("SELECT * FROM Faculty;")} className="text-primary cursor-pointer hover:underline">Faculty</div>
              </div>
            )}

            {selectedDataset === 'triggers' && (
              <div className="space-y-2 font-mono text-xs">
                <div onClick={() => setSql("SELECT * FROM employee;")} className="text-primary cursor-pointer hover:underline">employee</div>
                <div onClick={() => setSql("SELECT * FROM salary_audit;")} className="text-primary cursor-pointer hover:underline">salary_audit</div>
              </div>
            )}

            {selectedDataset === 'programs' && (
              <div className="space-y-2 font-mono text-xs">
                <div onClick={() => setSql("SELECT * FROM Student;")} className="text-primary cursor-pointer hover:underline">Student</div>
                <div onClick={() => setSql("SELECT * FROM Result;")} className="text-primary cursor-pointer hover:underline">Result</div>
                <div onClick={() => setSql("SELECT * FROM Employee;")} className="text-primary cursor-pointer hover:underline">Employee</div>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-border">
            <span className="text-[11px] font-bold uppercase text-text-muted">psql Quick Commands</span>
            <div className="mt-2 flex flex-wrap gap-1 font-mono text-xs">
              <button
                onClick={() => setSql("\\dt")}
                className="px-2 py-1 rounded bg-surface-2 hover:bg-border text-text transition"
              >
                \dt
              </button>
              <button
                onClick={() => setSql(`\\d ${selectedDataset === 'txn_lab' ? 'product' : 'library'}`)}
                className="px-2 py-1 rounded bg-surface-2 hover:bg-border text-text transition"
              >
                \d table
              </button>
              <button
                onClick={() => setSql("\\dn")}
                className="px-2 py-1 rounded bg-surface-2 hover:bg-border text-text transition"
              >
                \dn
              </button>
            </div>
          </div>
        </div>

        {/* Center/Right: Code Editor & Result Pane */}
        <div className="lg:col-span-3 space-y-4">
          <div className="custom-card overflow-hidden">
            {/* Editor Toolbar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-surface-2 border-b border-border">
              <span className="font-semibold text-xs text-text flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-primary" /> SQL Query Editor
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSql("")}
                  className="text-xs text-text-muted hover:text-text px-2 py-1 transition"
                >
                  Clear
                </button>
                <button
                  onClick={handleCopy}
                  className="text-xs text-text-muted hover:text-text p-1 transition"
                  title="Copy SQL"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={handleRun}
                  disabled={isRunning}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold text-xs transition cursor-pointer disabled:opacity-50"
                >
                  <Play className={`w-3.5 h-3.5 fill-current ${isRunning ? 'animate-spin' : ''}`} />
                  {isRunning ? 'Running...' : 'Run Query (Ctrl+Enter)'}
                </button>
              </div>
            </div>

            {/* Code Input */}
            <div className="p-4 bg-code-bg">
              <textarea
                value={sql}
                onChange={(e) => setSql(e.target.value)}
                onKeyDown={(e) => {
                  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                    e.preventDefault();
                    handleRun();
                  }
                }}
                rows={8}
                className="w-full bg-transparent font-mono text-sm text-code-text resize-none focus:outline-none"
                placeholder="Write any PostgreSQL query or command here..."
                spellCheck={false}
              />
            </div>

            {/* Editor Footer Status */}
            <div className="px-4 py-2 bg-surface-2/60 border-t border-border flex items-center justify-between text-[11px] text-text-muted">
              <span>Press <kbd className="px-1 py-0.5 rounded bg-surface border border-border">Ctrl</kbd> + <kbd className="px-1 py-0.5 rounded bg-surface border border-border">Enter</kbd> to run</span>
              <span>{sql.split('\n').length} lines · {sql.length} chars</span>
            </div>
          </div>

          {/* Results Display */}
          <div className="custom-card overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 bg-surface-2 border-b border-border">
              <span className="font-semibold text-xs text-text">
                Query Results {result?.commandTag ? `(${result.commandTag})` : ''}
              </span>

              {result && !result.error && result.rows.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-text-muted">
                    {result.rowCount} rows · {result.executionTimeMs}ms
                  </span>
                  <button
                    onClick={handleDownloadCsv}
                    className="text-xs px-2 py-1 rounded bg-surface hover:bg-border text-text font-medium flex items-center gap-1 transition"
                  >
                    <Download className="w-3 h-3" /> Export CSV
                  </button>
                </div>
              )}
            </div>

            <div className="p-4 max-h-96 overflow-auto bg-surface">
              {!result && (
                <div className="py-12 text-center text-text-muted text-xs italic">
                  Run a query to inspect live PostgreSQL output.
                </div>
              )}

              {result?.error && (
                <div className="p-4 rounded-xl bg-danger/10 border border-danger/20 text-danger text-xs space-y-1.5 font-mono">
                  <div className="font-bold flex items-center gap-2 font-sans">
                    <AlertTriangle className="w-4 h-4" />
                    Execution Failed {result.error.code ? `(SQLSTATE ${result.error.code})` : ''}
                  </div>
                  <div>{result.error.message}</div>
                  {result.error.hint && (
                    <div className="mt-2 pt-2 border-t border-danger/20 text-text font-sans text-xs">
                      <strong>Friendly Hint:</strong> {result.error.hint}
                    </div>
                  )}
                </div>
              )}

              {result && !result.error && (
                result.columns.length === 0 ? (
                  <div className="py-4 text-xs font-mono text-success">
                    Command completed successfully: {result.commandTag}
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
                            <td colSpan={result.columns.length} className="p-4 text-center text-text-muted italic">
                              0 rows returned.
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
