import React, { useState } from 'react';
import { Columns, ArrowRight, ShieldAlert, Sparkles, Check } from 'lucide-react';

export const DdlMorpherLab: React.FC = () => {
  const [columns, setColumns] = useState<Array<{ name: string; type: string; nullable: boolean; isPk: boolean; defaultVal?: string }>>([
    { name: "BookID", type: "INT", nullable: false, isPk: true },
    { name: "BookTitle", type: "VARCHAR(120)", nullable: false, isPk: false },
    { name: "Author", type: "VARCHAR(100)", nullable: true, isPk: false },
    { name: "AvailableCopies", type: "INT", nullable: true, isPk: false, defaultVal: "0" }
  ]);

  const [activeAction, setActiveAction] = useState<string>("init");
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  const handleAddEdition = () => {
    setErrorNotice(null);
    setActiveAction("ADD COLUMN Edition INT DEFAULT 1");
    if (!columns.some(c => c.name === "Edition")) {
      setColumns([...columns, { name: "Edition", type: "INT", nullable: true, isPk: false, defaultVal: "1" }]);
    }
  };

  const handleDropPublisher = () => {
    setErrorNotice(null);
    setActiveAction("DROP COLUMN IF EXISTS Publisher");
    setColumns(columns.filter(c => c.name !== "Publisher"));
  };

  const handleTypeChange = () => {
    setErrorNotice(null);
    setActiveAction("ALTER COLUMN AvailableCopies TYPE BIGINT USING AvailableCopies::BIGINT");
    setColumns(columns.map(c => c.name === "AvailableCopies" ? { ...c, type: "BIGINT" } : c));
  };

  const handleFailDemo = () => {
    setActiveAction("ALTER TABLE Library ADD COLUMN Price NUMERIC(8,2) NOT NULL;");
    setErrorNotice("ERROR (23502): column 'price' of relation 'library' contains null values! Cannot add a NOT NULL column without a DEFAULT value on non-empty tables.");
  };

  const handleReset = () => {
    setErrorNotice(null);
    setActiveAction("Reset to original schema");
    setColumns([
      { name: "BookID", type: "INT", nullable: false, isPk: true },
      { name: "BookTitle", type: "VARCHAR(120)", nullable: false, isPk: false },
      { name: "Author", type: "VARCHAR(100)", nullable: true, isPk: false },
      { name: "AvailableCopies", type: "INT", nullable: true, isPk: false, defaultVal: "0" }
    ]);
  };

  return (
    <div className="custom-card p-5 my-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-c-relational">Lab #5 · Interactive Visualizer</span>
          <h3 className="text-lg font-bold text-text">DDL Table Morpher</h3>
          <p className="text-xs text-text-muted mt-0.5">Live Schema Alteration, Column Transitions & PostgreSQL Constraint Rules</p>
        </div>

        <button
          onClick={handleReset}
          className="px-3 py-1 text-xs rounded border border-border hover:bg-surface-2 transition text-text-muted"
        >
          Reset Table
        </button>
      </div>

      {/* DDL Action Buttons */}
      <div className="flex flex-wrap gap-2 my-3">
        <button
          onClick={handleAddEdition}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-surface border border-border hover:border-primary hover:text-primary transition"
        >
          + ADD COLUMN Edition INT DEFAULT 1
        </button>
        <button
          onClick={handleTypeChange}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-surface border border-border hover:border-primary hover:text-primary transition"
        >
          ⇄ ALTER TYPE (INT → BIGINT USING)
        </button>
        <button
          onClick={handleFailDemo}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-danger/10 text-danger border border-danger/20 hover:bg-danger/20 transition flex items-center gap-1"
        >
          <ShieldAlert className="w-3.5 h-3.5" /> Fail Demo: ADD NOT NULL without DEFAULT
        </button>
      </div>

      {/* Error Card if triggered */}
      {errorNotice && (
        <div className="p-3 my-3 rounded-xl bg-danger/10 border border-danger/20 text-danger text-xs font-mono">
          {errorNotice}
        </div>
      )}

      {/* Table Card Schema representation */}
      <div className="border border-border rounded-xl overflow-hidden my-4 bg-surface shadow-xs">
        <div className="px-4 py-2 bg-surface-2 border-b border-border flex items-center justify-between">
          <span className="font-mono text-xs font-bold text-text flex items-center gap-2">
            <Columns className="w-4 h-4 text-primary" /> public.Library
          </span>
          <span className="text-[11px] font-mono text-text-muted">
            {columns.length} columns defined
          </span>
        </div>

        <div className="divide-y divide-border/60">
          {columns.map((col, idx) => (
            <div key={idx} className="p-3 flex items-center justify-between text-xs font-mono hover:bg-surface-2/40 transition">
              <div className="flex items-center gap-2">
                {col.isPk && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-sans font-bold">
                    🔑 PK
                  </span>
                )}
                <span className="font-semibold text-text">{col.name}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-bold text-[11px]">
                  {col.type}
                </span>
                <span className="text-[11px] text-text-muted">
                  {col.nullable ? "NULLABLE" : "NOT NULL"}
                </span>
                {col.defaultVal && (
                  <span className="text-[11px] text-text-muted">
                    DEFAULT {col.defaultVal}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-xs text-text-muted font-mono bg-surface-2 p-2.5 rounded-lg border border-border">
        Last Executed DDL: <span className="text-primary font-bold">{activeAction}</span>
      </div>
    </div>
  );
};
