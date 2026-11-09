import { DATASET_SEEDS } from '../data/datasets';

export interface SqlQueryResult {
  columns: string[];
  rows: any[][];
  commandTag?: string;
  rowCount: number;
  executionTimeMs: number;
  error?: {
    message: string;
    code?: string;
    hint?: string;
    position?: number;
  };
}

let pgliteInstance: any = null;
let currentDatasetLoaded: string | null = null;
let isInitializing = false;
let initPromise: Promise<any> | null = null;

// Error hints mapped to PostgreSQL SQLSTATE codes
export const SQLSTATE_HINTS: Record<string, string> = {
  "42P01": "Relation does not exist: check table spelling, schema or search_path.",
  "42703": "Column does not exist: unquoted column names fold to lowercase in PostgreSQL.",
  "42601": "Syntax error: check for missing commas, unmatched quotes, or stray semicolons.",
  "42803": "Grouping error: non-aggregated columns in SELECT must appear in the GROUP BY clause.",
  "23505": "Duplicate key violation: a record with this PRIMARY KEY or UNIQUE value already exists.",
  "23502": "NOT NULL violation: a required field cannot receive a NULL value without a DEFAULT.",
  "23514": "CHECK constraint violation: new value does not satisfy the column's condition (e.g. balance >= 0).",
  "22P02": "Invalid input syntax: trying to insert non-numeric string into an integer/numeric column.",
  "22001": "Value too long for character type: string exceeds the VARCHAR(N) limit.",
  "25P02": "Current transaction is aborted: an error happened earlier in this BEGIN block. Run ROLLBACK; before executing new statements.",
  "3B001": "Savepoint does not exist: the savepoint name was either released or was never established in this transaction.",
  "2BP01": "Cannot drop object because dependent objects exist. Use CASCADE carefully if intended."
};

export async function getPgEngine(initialDataset: keyof typeof DATASET_SEEDS = "library"): Promise<any> {
  if (pgliteInstance) {
    if (currentDatasetLoaded !== initialDataset) {
      await loadDataset(initialDataset);
    }
    return pgliteInstance;
  }

  if (isInitializing && initPromise) {
    return initPromise;
  }

  isInitializing = true;
  initPromise = (async () => {
    try {
      const { PGlite } = await import('@electric-sql/pglite');
      pgliteInstance = new PGlite();
      await pgliteInstance.waitReady;
      await loadDataset(initialDataset);
      isInitializing = false;
      return pgliteInstance;
    } catch (err) {
      isInitializing = false;
      console.error("Failed to load PGlite WebAssembly instance:", err);
      throw err;
    }
  })();

  return initPromise;
}

export async function loadDataset(datasetKey: keyof typeof DATASET_SEEDS) {
  if (!pgliteInstance) return;
  const seed = DATASET_SEEDS[datasetKey];
  if (seed) {
    try {
      await pgliteInstance.exec(seed);
      currentDatasetLoaded = String(datasetKey);
    } catch (e) {
      console.warn("Dataset load error:", e);
    }
  }
}

export async function resetCurrentDataset(datasetKey: keyof typeof DATASET_SEEDS) {
  if (!pgliteInstance) {
    await getPgEngine(datasetKey);
    return;
  }
  await loadDataset(datasetKey);
}

export async function executeSql(sql: string, datasetKey: keyof typeof DATASET_SEEDS = "library"): Promise<SqlQueryResult> {
  const startTime = performance.now();
  const trimmed = sql.trim();

  // Special handle psql meta-commands
  if (trimmed.startsWith('\\')) {
    return handlePsqlMetaCommand(trimmed, datasetKey);
  }

  try {
    const engine = await getPgEngine(datasetKey);
    // Execute query
    const res = await engine.query(trimmed);
    const executionTimeMs = Math.round((performance.now() - startTime) * 10) / 10;

    const fields = res?.fields?.map((f: any) => f.name) || (res?.rows?.[0] ? Object.keys(res.rows[0]) : []);
    const rows = (res?.rows || []).map((rowObj: any) => {
      if (Array.isArray(rowObj)) return rowObj;
      return fields.map((col: string) => rowObj[col]);
    });

    let commandTag = "SELECT " + rows.length;
    const upper = trimmed.toUpperCase();
    if (upper.startsWith("INSERT")) commandTag = `INSERT 0 ${res?.affectedRows ?? rows.length}`;
    else if (upper.startsWith("UPDATE")) commandTag = `UPDATE ${res?.affectedRows ?? rows.length}`;
    else if (upper.startsWith("DELETE")) commandTag = `DELETE ${res?.affectedRows ?? rows.length}`;
    else if (upper.startsWith("CREATE")) commandTag = "CREATE TABLE";
    else if (upper.startsWith("ALTER")) commandTag = "ALTER TABLE";
    else if (upper.startsWith("DROP")) commandTag = "DROP TABLE";
    else if (upper.startsWith("BEGIN")) commandTag = "BEGIN";
    else if (upper.startsWith("COMMIT")) commandTag = "COMMIT";
    else if (upper.startsWith("ROLLBACK")) commandTag = "ROLLBACK";

    return {
      columns: fields,
      rows: rows,
      commandTag,
      rowCount: rows.length,
      executionTimeMs
    };
  } catch (err: any) {
    const executionTimeMs = Math.round((performance.now() - startTime) * 10) / 10;
    const code = err.code || (err.message.includes("25P02") ? "25P02" : undefined);
    const hint = (code && SQLSTATE_HINTS[code]) || err.hint;

    return {
      columns: [],
      rows: [],
      rowCount: 0,
      executionTimeMs,
      error: {
        message: err.message || "Execution error",
        code: code,
        hint: hint,
        position: err.position
      }
    };
  }
}

async function handlePsqlMetaCommand(cmd: string, datasetKey: keyof typeof DATASET_SEEDS): Promise<SqlQueryResult> {
  const parts = cmd.split(/\s+/);
  const root = parts[0];
  const arg = parts[1];

  let query = "";
  if (root === '\\dt') {
    query = `SELECT table_schema, table_name, table_type FROM information_schema.tables WHERE table_schema NOT IN ('pg_catalog', 'information_schema') ORDER BY table_name;`;
  } else if (root === '\\dn') {
    query = `SELECT schema_name FROM information_schema.schemata;`;
  } else if (root === '\\l') {
    query = `SELECT datname AS "Database Name", pg_encoding_to_char(encoding) AS "Encoding" FROM pg_database;`;
  } else if (root === '\\d') {
    if (!arg) {
      query = `SELECT table_name, table_type FROM information_schema.tables WHERE table_schema = 'public';`;
    } else {
      const cleanTable = arg.replace(/['";]/g, '').toLowerCase();
      query = `SELECT column_name AS "Column", data_type AS "Type", is_nullable AS "Nullable", column_default AS "Default" FROM information_schema.columns WHERE lower(table_name) = '${cleanTable}';`;
    }
  } else {
    return {
      columns: ["Output"],
      rows: [[`psql meta-command ${root} acknowledged.`]],
      rowCount: 1,
      commandTag: "PSQL",
      executionTimeMs: 1
    };
  }

  return executeSql(query, datasetKey);
}
