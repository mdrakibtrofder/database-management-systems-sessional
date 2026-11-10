// Lecture slide decks served from /public/slides.
// Each deck has: the original .pptx, a PDF export (public/slides/pdf) and one JPG per slide
// (public/slides/images/week-N/slide-01.jpg …) for the in-browser viewer.

export interface SlideDeck {
  week: number;
  title: string;
  summary: string;
  topics: string[];
  file: string;      // base file name without extension (as in public/slides)
  slides: number;
  pptxSize: string;
  pdfSize: string;
}

export const slideDecks: SlideDeck[] = [
  {
    week: 1,
    title: "PostgreSQL & SQL Basics",
    summary: "Server → Database → Schema → Table, psql shortcuts, SELECT, DISTINCT, WHERE, ORDER BY, LIMIT and safe writes.",
    topics: ["psql", "SELECT", "WHERE", "ORDER BY", "LIMIT"],
    file: "Week_1_PostgreSQL_SQL_Basics",
    slides: 19,
    pptxSize: "4.8 MB",
    pdfSize: "0.9 MB"
  },
  {
    week: 2,
    title: "DDL: Tables, Schemas & Databases",
    summary: "CREATE TABLE with constraints, ALTER TABLE, TRUNCATE vs DELETE vs DROP, schemas and search_path.",
    topics: ["CREATE TABLE", "ALTER TABLE", "Constraints", "Schemas"],
    file: "Week_2_DDL_Tables_Schemas_Databases",
    slides: 18,
    pptxSize: "4.5 MB",
    pdfSize: "0.8 MB"
  },
  {
    week: 3,
    title: "Aggregation, Grouping & Subqueries",
    summary: "COUNT, SUM, AVG with COALESCE, GROUP BY, HAVING, scalar subqueries, the NOT IN NULL trap and NOT EXISTS.",
    topics: ["COUNT", "GROUP BY", "HAVING", "Subqueries"],
    file: "Week_3_Aggregation_Grouping_Subqueries",
    slides: 14,
    pptxSize: "3.9 MB",
    pdfSize: "1.0 MB"
  },
  {
    week: 4,
    title: "SQL Joins & Set Operations",
    summary: "Inner, left, right, full, cross and self joins; finding unmatched rows; UNION, INTERSECT and EXCEPT.",
    topics: ["INNER JOIN", "LEFT JOIN", "FULL JOIN", "UNION"],
    file: "Week_4_SQL_Joins_and_Set_Operations",
    slides: 7,
    pptxSize: "0.3 MB",
    pdfSize: "0.2 MB"
  },
  {
    week: 5,
    title: "Procedures, Functions, Triggers, Views & Materialized Views",
    summary: "Reusable server-side logic: stored procedures with CALL, functions, triggers, views and materialized views.",
    topics: ["Procedures", "Functions", "Triggers", "Views", "Materialized Views"],
    file: "Week_5_Stored Procedures, Functions, Triggers, Views & Materialized Views",
    slides: 9,
    pptxSize: "2.0 MB",
    pdfSize: "0.4 MB"
  },
  {
    week: 6,
    title: "PostgreSQL Triggers, Backup & Restore",
    summary: "Trigger events, timing and level, NEW / OLD / TG_OP, managing triggers, pg_dump, pg_dumpall and pg_restore.",
    topics: ["Triggers", "NEW / OLD", "pg_dump", "pg_restore"],
    file: "Week_6_PostgreSQL Triggers, Backup & Restore",
    slides: 6,
    pptxSize: "0.4 MB",
    pdfSize: "0.2 MB"
  },
  {
    week: 7,
    title: "Transactions, Rollback & Savepoints",
    summary: "ACID, autocommit, BEGIN / COMMIT / ROLLBACK, aborted transactions (25P02) and savepoint stacks.",
    topics: ["ACID", "COMMIT", "ROLLBACK", "SAVEPOINT"],
    file: "Week_7_Transactions_Rollback_Savepoints",
    slides: 12,
    pptxSize: "1.8 MB",
    pdfSize: "0.5 MB"
  }
];

const base = () => (import.meta as any).env?.BASE_URL ?? '/';

export const deckPptxUrl = (d: SlideDeck) => `${base()}slides/${encodeURIComponent(d.file)}.pptx`;
export const deckPdfUrl = (d: SlideDeck) => `${base()}slides/pdf/${encodeURIComponent(d.file)}.pdf`;
export const deckImageUrl = (d: SlideDeck, n: number) =>
  `${base()}slides/images/week-${d.week}/slide-${String(n).padStart(2, '0')}.jpg`;

export const getDeckByWeek = (week: number) => slideDecks.find(d => d.week === week);
