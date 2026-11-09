export interface CheatsheetCard {
  id: string;
  category: "ddl" | "dml" | "dql" | "aggregates" | "subqueries" | "joins" | "programs" | "transactions" | "errors";
  title: string;
  whenToUse: string;
  week: number;
  dataset: "library" | "uni3" | "joins" | "programs" | "triggers" | "txn_lab";
  cluster: "foundations" | "relational" | "sql" | "storage" | "transactions" | "modern";
  syntax: string;
  exampleSql: string;
  expectedDescription: string;
  watchOut?: string;
}

export const cheatsheetCategories = [
  { id: "ddl", label: "DDL", color: "var(--c-relational)", desc: "Table, schema, constraint & column definition" },
  { id: "dml", label: "DML", color: "var(--c-foundations)", desc: "Insert, update & delete operations" },
  { id: "dql", label: "Querying (DQL)", color: "var(--c-sql)", desc: "Select, where, order by, limit & pattern matching" },
  { id: "aggregates", label: "Aggregates & Grouping", color: "var(--c-sql)", desc: "SUM, AVG, COUNT, GROUP BY & HAVING" },
  { id: "subqueries", label: "Subqueries", color: "var(--c-sql)", desc: "Scalar, IN, EXISTS, ANY, ALL & Correlated" },
  { id: "joins", label: "Joins & Set Ops", color: "var(--c-sql)", desc: "Inner, Outer, Self, Cross joins & UNION/EXCEPT" },
  { id: "programs", label: "Database Programs", color: "var(--c-modern)", desc: "Procedures, functions, triggers & views" },
  { id: "transactions", label: "Transactions", color: "var(--c-txn)", desc: "ACID, BEGIN, COMMIT, ROLLBACK & SAVEPOINTS" },
  { id: "errors", label: "Common Errors", color: "var(--danger)", desc: "PostgreSQL SQLSTATE codes and quick fixes" },
];

export const cheatsheets: CheatsheetCard[] = [
  // 1. DDL
  {
    id: "ddl-create-table",
    category: "ddl",
    title: "CREATE TABLE with Constraints",
    whenToUse: "Create a new table with primary key, not null checks and defaults",
    week: 2,
    dataset: "library",
    cluster: "relational",
    syntax: "CREATE TABLE [IF NOT EXISTS] tablename (col datatype [CONSTRAINT], ...);",
    exampleSql: "CREATE TABLE IF NOT EXISTS Member (\n  MemberID INT PRIMARY KEY,\n  Name VARCHAR(50) NOT NULL,\n  JoinDate DATE DEFAULT CURRENT_DATE\n);\nSELECT * FROM Member;",
    expectedDescription: "Creates the Member table with MemberID as primary key and a default join date."
  },
  {
    id: "ddl-alter-add-col",
    category: "ddl",
    title: "ALTER TABLE ADD COLUMN",
    whenToUse: "Add a new field to an existing table without dropping data",
    week: 2,
    dataset: "library",
    cluster: "relational",
    syntax: "ALTER TABLE tablename ADD COLUMN colname datatype [DEFAULT val];",
    exampleSql: "ALTER TABLE Library ADD COLUMN Edition INT DEFAULT 1;\nSELECT BookTitle, Edition FROM Library LIMIT 3;",
    expectedDescription: "Adds the Edition column filled with default 1 for existing rows."
  },
  {
    id: "ddl-alter-type-using",
    category: "ddl",
    title: "ALTER COLUMN TYPE with USING",
    whenToUse: "Cast column type explicitly when PostgreSQL cannot do so automatically",
    week: 2,
    dataset: "library",
    cluster: "relational",
    syntax: "ALTER TABLE tablename ALTER COLUMN colname TYPE new_type USING colname::new_type;",
    exampleSql: "ALTER TABLE Library ALTER COLUMN AvailableCopies TYPE BIGINT USING AvailableCopies::BIGINT;\n\\d library",
    expectedDescription: "Converts AvailableCopies to BIGINT using explicit casting."
  },
  {
    id: "ddl-truncate-vs-drop",
    category: "ddl",
    title: "TRUNCATE vs DROP vs DELETE",
    whenToUse: "Understand structural vs data removal",
    week: 2,
    dataset: "library",
    cluster: "relational",
    syntax: "TRUNCATE table; -- empties rows fast, keeps structure\nDROP TABLE table; -- removes table completely",
    exampleSql: "SELECT COUNT(*) FROM Library;",
    expectedDescription: "DELETE keeps structure & can filter; TRUNCATE wipes all rows at once; DROP removes table & schema entry."
  },

  // 2. DML
  {
    id: "dml-insert-multi",
    category: "dml",
    title: "Multi-Row INSERT",
    whenToUse: "Insert several rows into a table in a single atomic statement",
    week: 1,
    dataset: "library",
    cluster: "foundations",
    syntax: "INSERT INTO tablename (cols) VALUES (row1), (row2);",
    exampleSql: "INSERT INTO Library (BookID, BookTitle, Author, AvailableCopies)\nVALUES (6, 'Design Patterns', 'GoF', 4),\n       (7, 'Refactoring', 'Martin Fowler', 3);\nSELECT * FROM Library WHERE BookID >= 6;",
    expectedDescription: "Inserts two new books and returns `INSERT 0 2`."
  },
  {
    id: "dml-safe-update",
    category: "dml",
    title: "UPDATE with WHERE",
    whenToUse: "Modify existing records selectively without overwriting the whole table",
    week: 1,
    dataset: "library",
    cluster: "foundations",
    syntax: "UPDATE tablename SET col = val WHERE condition;",
    exampleSql: "UPDATE Library SET AvailableCopies = AvailableCopies - 1\nWHERE Author = 'Silberschatz';\nSELECT BookTitle, Author, AvailableCopies FROM Library WHERE Author = 'Silberschatz';",
    expectedDescription: "Decrements available copies by 1 for both Silberschatz books (UPDATE 2)."
  },
  {
    id: "dml-safe-delete",
    category: "dml",
    title: "Safe DELETE with WHERE",
    whenToUse: "Delete specific rows. Habit: Preview with SELECT first!",
    week: 1,
    dataset: "library",
    cluster: "foundations",
    syntax: "DELETE FROM tablename WHERE condition;",
    exampleSql: "DELETE FROM Library WHERE AvailableCopies < 4;\nSELECT * FROM Library;",
    expectedDescription: "Removes Introduction to Algorithms (AvailableCopies = 3). Returns `DELETE 1`."
  },

  // 3. DQL
  {
    id: "dql-select-distinct",
    category: "dql",
    title: "SELECT DISTINCT & Aliasing (AS)",
    whenToUse: "Eliminate duplicates and rename columns in the query output",
    week: 1,
    dataset: "library",
    cluster: "sql",
    syntax: "SELECT DISTINCT col1 AS alias1 FROM tablename;",
    exampleSql: "SELECT DISTINCT Author AS WriterName FROM Library ORDER BY WriterName;",
    expectedDescription: "Returns 4 unique authors (Silberschatz appears once)."
  },
  {
    id: "dql-order-limit-offset",
    category: "dql",
    title: "Pagination: ORDER BY, LIMIT & OFFSET",
    whenToUse: "Fetch top-N or implement page-by-page data viewing",
    week: 1,
    dataset: "library",
    cluster: "sql",
    syntax: "SELECT cols FROM table ORDER BY col [ASC|DESC] LIMIT count OFFSET skip;",
    exampleSql: "SELECT BookTitle, AvailableCopies FROM Library\nORDER BY AvailableCopies DESC\nLIMIT 2 OFFSET 1;",
    expectedDescription: "Skips highest (Clean Code, 7) and returns next 2 (Database System Concepts 6, Computer Networks 5)."
  },
  {
    id: "dql-like-patterns",
    category: "dql",
    title: "Pattern Matching: LIKE & ILIKE",
    whenToUse: "Filter strings by wildcard (% = zero or more chars, _ = exactly one char)",
    week: 1,
    dataset: "library",
    cluster: "sql",
    syntax: "WHERE col LIKE 'pattern' -- ILIKE is case-insensitive in PostgreSQL",
    exampleSql: "SELECT BookTitle FROM Library WHERE BookTitle LIKE 'C%';",
    expectedDescription: "Matches titles starting with 'C': Computer Networks and Clean Code."
  },

  // 4. Aggregates & Grouping
  {
    id: "agg-count-null",
    category: "aggregates",
    title: "COUNT(*) vs COUNT(col) with NULL",
    whenToUse: "Counting rows vs counting actual non-NULL recorded values",
    week: 3,
    dataset: "uni3",
    cluster: "sql",
    syntax: "SELECT COUNT(*), COUNT(col), COUNT(DISTINCT col) FROM table;",
    exampleSql: "SELECT COUNT(*) AS AllRows, COUNT(Marks) AS ScoredRows, COUNT(DISTINCT StuID) AS Students\nFROM ENROLLMENT;",
    expectedDescription: "AllRows = 8, ScoredRows = 7 (one mark is NULL), Students = 5."
  },
  {
    id: "agg-group-having",
    category: "aggregates",
    title: "GROUP BY with HAVING",
    whenToUse: "Compute aggregates per group, then filter the resulting groups",
    week: 3,
    dataset: "uni3",
    cluster: "sql",
    syntax: "SELECT group_col, AGG(val) FROM table GROUP BY group_col HAVING AGG(val) > x;",
    exampleSql: "SELECT CourseID, ROUND(AVG(Marks), 2) AS AvgMarks\nFROM ENROLLMENT\nWHERE Marks IS NOT NULL\nGROUP BY CourseID\nHAVING AVG(Marks) > 75;",
    expectedDescription: "Filters groups where average is above 75 (CSE-4105: 88, CSE-3101: 76)."
  },

  // 5. Subqueries
  {
    id: "subq-scalar",
    category: "subqueries",
    title: "Scalar Subquery",
    whenToUse: "Compare each row against a single computed value from another query",
    week: 3,
    dataset: "uni3",
    cluster: "sql",
    syntax: "SELECT cols FROM table WHERE col > (SELECT AVG(col) FROM table);",
    exampleSql: "SELECT StuID, CourseID, Marks FROM ENROLLMENT\nWHERE Marks > (SELECT AVG(Marks) FROM ENROLLMENT);",
    expectedDescription: "Shows enrollment records where Marks > overall average (76.57)."
  },
  {
    id: "subq-exists",
    category: "subqueries",
    title: "EXISTS & NOT EXISTS",
    whenToUse: "Test for presence of matching rows in a correlated subquery efficiently",
    week: 3,
    dataset: "uni3",
    cluster: "sql",
    syntax: "SELECT cols FROM table outer WHERE NOT EXISTS (SELECT 1 FROM inner WHERE inner.key = outer.key);",
    exampleSql: "SELECT StuID, StuName FROM STUDENT s\nWHERE NOT EXISTS (SELECT 1 FROM ENROLLMENT e WHERE e.StuID = s.StuID);",
    expectedDescription: "Finds students with no enrollment records (S106 Nabila)."
  },

  // 6. Joins & Set Ops
  {
    id: "join-left-unmatched",
    category: "joins",
    title: "LEFT JOIN to Find Unmatched Rows",
    whenToUse: "Keep all primary records and detect those missing in the child table",
    week: 4,
    dataset: "joins",
    cluster: "sql",
    syntax: "SELECT a.* FROM A a LEFT JOIN B b ON a.id = b.a_id WHERE b.id IS NULL;",
    exampleSql: "SELECT s.student_id, s.name, s.major\nFROM Students s\nLEFT JOIN Enrollments e ON s.student_id = e.student_id\nWHERE e.enrollment_id IS NULL;",
    expectedDescription: "Finds Nabila (student_id = 6) who is not enrolled in any course."
  },
  {
    id: "join-union-vs-all",
    category: "joins",
    title: "UNION vs UNION ALL",
    whenToUse: "Combine results of two union-compatible queries (distinct vs keep all)",
    week: 4,
    dataset: "joins",
    cluster: "sql",
    syntax: "SELECT name FROM Students\nUNION\nSELECT name FROM Faculty;",
    exampleSql: "SELECT name FROM Students\nUNION\nSELECT name FROM Faculty\nORDER BY name;",
    expectedDescription: "Combines unique student and faculty names. 'Rakib' appears once because UNION removes duplicates."
  },

  // 7. Database Programs
  {
    id: "prog-view-vs-matview",
    category: "programs",
    title: "Views & Materialized Views",
    whenToUse: "Store query logic (View) vs store physical query result snapshot (Materialized View)",
    week: 5,
    dataset: "programs",
    cluster: "modern",
    syntax: "CREATE VIEW v_name AS SELECT ...;\nCREATE MATERIALIZED VIEW mv_name AS SELECT ...;\nREFRESH MATERIALIZED VIEW mv_name;",
    exampleSql: "CREATE OR REPLACE VIEW CSE_Honors AS\nSELECT id, name, cgpa FROM Student WHERE dept = 'CSE' AND cgpa >= 3.5;\nSELECT * FROM CSE_Honors;",
    expectedDescription: "Creates a view of top CSE students that evaluates freshly on every SELECT."
  },

  // 8. Transactions
  {
    id: "txn-savepoint-rollback",
    category: "transactions",
    title: "SAVEPOINT & Partial ROLLBACK",
    whenToUse: "Undo part of a batch of operations without aborting the entire transaction",
    week: 7,
    dataset: "txn_lab",
    cluster: "transactions",
    syntax: "BEGIN;\n... SAVEPOINT s1; ...\nROLLBACK TO SAVEPOINT s1;\nCOMMIT;",
    exampleSql: "SET search_path TO txn_lab;\nBEGIN;\nUPDATE product SET stock = stock + 10 WHERE product_id = 5;\nSAVEPOINT s1;\nUPDATE product SET stock = stock + 10 WHERE product_id = 5;\nROLLBACK TO SAVEPOINT s1;\nCOMMIT;\nSELECT product_id, name, stock FROM product WHERE product_id = 5;",
    expectedDescription: "Keyboard starts at 50, gets +10 (60), second +10 is rolled back to s1, committed stock is 60 (Week 7 Part A)."
  },
  {
    id: "txn-autocommit-check",
    category: "transactions",
    title: "Atomicity with CHECK Violations",
    whenToUse: "Observe how constraint errors abort a transaction and roll back previous statements",
    week: 7,
    dataset: "txn_lab",
    cluster: "transactions",
    syntax: "BEGIN;\nUPDATE ...;\nUPDATE ... fails CHECK;\nCOMMIT; -- turns into ROLLBACK",
    exampleSql: "SET search_path TO txn_lab;\nBEGIN;\nUPDATE account SET balance = balance + 1500 WHERE acc_no = 'E-505';\nUPDATE account SET balance = balance - 1500 WHERE acc_no = 'D-404';\nCOMMIT;\nSELECT * FROM account WHERE acc_no IN ('D-404', 'E-505');",
    expectedDescription: "Second statement fails CHECK (balance >= 0) with SQLSTATE 23514. Sumi's balance remains 3000 and Nila 500."
  },

  // 9. Common Errors
  {
    id: "err-25p02",
    category: "errors",
    title: "SQLSTATE 25P02: Current transaction is aborted",
    whenToUse: "When any query inside BEGIN fails, all subsequent queries are rejected until ROLLBACK",
    week: 7,
    dataset: "txn_lab",
    cluster: "transactions",
    syntax: "Fix: Issue ROLLBACK; before running subsequent statements.",
    exampleSql: "ROLLBACK;",
    expectedDescription: "Closes the aborted transaction and resets connection state to clean autocommit."
  },
  {
    id: "err-42803",
    category: "errors",
    title: "SQLSTATE 42803: Column must appear in GROUP BY",
    whenToUse: "Selecting a non-aggregated column that is not part of GROUP BY",
    week: 3,
    dataset: "uni3",
    cluster: "sql",
    syntax: "Fix: Add column to GROUP BY clause or wrap in an aggregate function like MAX() or MIN().",
    exampleSql: "SELECT CourseID, COUNT(*) AS Total FROM ENROLLMENT GROUP BY CourseID;",
    expectedDescription: "Correctly groups by CourseID without invalid non-grouped projections."
  }
];
