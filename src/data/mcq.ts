export interface MCQ {
  id: number;
  section: "DDL" | "DML & DQL" | "Aggregation & Joins" | "Programs, Views & Triggers" | "Transactions";
  weeks: number[];
  dataset: "Library" | "uni3" | "joins" | "programs" | "triggers" | "txn_lab" | null;
  q: string;
  sql: string | null;
  options: [string, string, string, string];
  answer: number; // 0 = A, 1 = B, 2 = C, 3 = D
  explain: string;
}

export const mcqs: MCQ[] = [
  // Section 1: Data Definition Language (DDL)
  {
    id: 1,
    section: "DDL",
    weeks: [1, 2],
    dataset: null,
    q: "CREATE TABLE belongs to which category of SQL commands?",
    sql: null,
    options: ["DML", "DDL", "TCL", "DCL"],
    answer: 1,
    explain: "CREATE, ALTER and DROP define or change the structure of database objects, so they are Data Definition Language."
  },
  {
    id: 2,
    section: "DDL",
    weeks: [2],
    dataset: "Library",
    q: "Which statement adds a new column Edition of type INT to the Library table?",
    sql: null,
    options: [
      "UPDATE Library ADD Edition INT;",
      "INSERT COLUMN Edition INT INTO Library;",
      "ALTER TABLE Library ADD COLUMN Edition INT;",
      "MODIFY TABLE Library ADD Edition INT;"
    ],
    answer: 2,
    explain: "New columns are added with ALTER TABLE … ADD COLUMN."
  },
  {
    id: 3,
    section: "DDL",
    weeks: [2],
    dataset: "Library",
    q: "After ALTER TABLE Library ADD COLUMN Edition INT; (no DEFAULT), what does Edition hold in the rows that already exist?",
    sql: null,
    options: ["NULL", "0", "An empty string", "The statement fails"],
    answer: 0,
    explain: "Without a DEFAULT, a new column is filled with NULL in every existing row."
  },
  {
    id: 4,
    section: "DDL",
    weeks: [2],
    dataset: "Library",
    q: "What happens when you run ALTER TABLE Library ADD COLUMN Price NUMERIC(8,2) NOT NULL; (no DEFAULT) on a table that already has rows?",
    sql: null,
    options: [
      "It succeeds and fills Price with 0",
      "It succeeds and fills Price with NULL",
      "It fails, because the existing rows would have no value for a NOT NULL column",
      "It adds the column only for future rows"
    ],
    answer: 2,
    explain: "Give a DEFAULT, or add the column as nullable, fill it with UPDATE, then SET NOT NULL."
  },
  {
    id: 5,
    section: "DDL",
    weeks: [2],
    dataset: "Library",
    q: "Which statement removes both the rows and the structure of the Library table?",
    sql: null,
    options: [
      "DELETE FROM Library;",
      "TRUNCATE Library;",
      "ALTER TABLE Library DROP ALL;",
      "DROP TABLE Library;"
    ],
    answer: 3,
    explain: "DELETE and TRUNCATE remove rows but keep the table; DROP TABLE removes the table itself."
  },
  {
    id: 6,
    section: "DDL",
    weeks: [2],
    dataset: "Library",
    q: "Which statement about TRUNCATE Library; is true?",
    sql: null,
    options: [
      "It can be filtered with a WHERE clause",
      "It removes all rows at once but keeps the table structure",
      "It removes the table structure as well",
      "It removes only rows that contain NULL"
    ],
    answer: 1,
    explain: "TRUNCATE empties the whole table quickly; no WHERE is allowed, and the table remains."
  },
  {
    id: 7,
    section: "DDL",
    weeks: [2],
    dataset: "Library",
    q: "In PostgreSQL, which statement renames the column Author to AuthorName?",
    sql: null,
    options: [
      "ALTER TABLE Library RENAME COLUMN Author TO AuthorName;",
      "UPDATE Library SET Author = AuthorName;",
      "ALTER TABLE Library CHANGE Author AuthorName;",
      "RENAME Library.Author AuthorName;"
    ],
    answer: 0,
    explain: "RENAME COLUMN … TO … changes only the name; data, type and constraints stay the same."
  },
  {
    id: 8,
    section: "DDL",
    weeks: [2],
    dataset: "Library",
    q: "AvailableCopies was changed to VARCHAR(10). To change it back to INT, which clause must be added to ALTER TABLE Library ALTER COLUMN AvailableCopies TYPE INT?",
    sql: null,
    options: [
      "DEFAULT 0",
      "USING AvailableCopies::INT",
      "CASCADE",
      "NOT NULL"
    ],
    answer: 1,
    explain: "Text-to-number is not an automatic conversion, so PostgreSQL needs USING to know how to convert each value."
  },
  {
    id: 9,
    section: "DDL",
    weeks: [2],
    dataset: null,
    q: "A PRIMARY KEY column guarantees that its values are:",
    sql: null,
    options: [
      "Unique, but may be NULL",
      "Not NULL, but may repeat",
      "Unique and never NULL",
      "Sorted in ascending order"
    ],
    answer: 2,
    explain: "A primary key is UNIQUE + NOT NULL (and PostgreSQL builds an index on it)."
  },
  {
    id: 10,
    section: "DDL",
    weeks: [2],
    dataset: null,
    q: "How many PRIMARY KEY constraints can one table have?",
    sql: null,
    options: [
      "Exactly one (it may span several columns)",
      "Two",
      "One per column",
      "Unlimited"
    ],
    answer: 0,
    explain: "A table has only one primary key, though that key can be composite, e.g. PRIMARY KEY (BookID, Publisher)."
  },
  {
    id: 11,
    section: "DDL",
    weeks: [2],
    dataset: null,
    q: "AvailableCopies INT DEFAULT 0 means:",
    sql: null,
    options: [
      "An INSERT that omits the column is rejected",
      "When an INSERT does not mention the column, 0 is stored",
      "All existing values are set to 0 and locked",
      "The column can never hold any value other than 0"
    ],
    answer: 1,
    explain: "DEFAULT quietly supplies a value; NOT NULL is what rejects a missing value."
  },
  {
    id: 12,
    section: "DDL",
    weeks: [1, 2],
    dataset: null,
    q: "In PostgreSQL, the unquoted table names Library and library are:",
    sql: null,
    options: [
      "Two different tables",
      "Both folded to upper case",
      "The same table, because unquoted names are folded to lower case",
      "Rejected, because mixed case is not allowed"
    ],
    answer: 2,
    explain: "Unquoted identifiers are folded to lower case; only names in double quotes keep their case."
  },
  {
    id: 13,
    section: "DDL",
    weeks: [2],
    dataset: null,
    q: "What does CREATE TABLE IF NOT EXISTS Library (…); do when Library already exists?",
    sql: null,
    options: [
      "Raises an error",
      "Drops the old table and creates a new one",
      "Adds any missing columns",
      "Skips the statement with a notice instead of an error"
    ],
    answer: 3,
    explain: "IF NOT EXISTS makes scripts safe to re-run."
  },
  {
    id: 14,
    section: "DDL",
    weeks: [2],
    dataset: null,
    q: "When does DROP SCHEMA academics; (without CASCADE) fail?",
    sql: null,
    options: [
      "When the schema is empty",
      "When the schema still contains tables or other objects",
      "Whenever you are connected to the database",
      "Never"
    ],
    answer: 1,
    explain: "A non-empty schema can only be dropped with CASCADE, which also drops everything inside it."
  },
  {
    id: 15,
    section: "DDL",
    weeks: [2],
    dataset: null,
    q: "Which of these cannot run inside a BEGIN … COMMIT block in PostgreSQL?",
    sql: null,
    options: [
      "ALTER TABLE",
      "DROP TABLE",
      "CREATE SCHEMA",
      "CREATE DATABASE"
    ],
    answer: 3,
    explain: "CREATE DATABASE and DROP DATABASE cannot run inside a transaction. Most other DDL in PostgreSQL is transactional and can be rolled back."
  },

  {
    id: 16,
    section: "DDL",
    weeks: [2],
    dataset: null,
    q: "Which constraint stops a column from ever storing NULL?",
    sql: null,
    options: [
      "UNIQUE",
      "DEFAULT",
      "NOT NULL",
      "CHECK (col <> '')"
    ],
    answer: 2,
    explain: "NOT NULL rejects any INSERT or UPDATE that leaves the column without a value. UNIQUE and CHECK both let NULL through."
  },
  {
    id: 17,
    section: "DDL",
    weeks: [2],
    dataset: null,
    q: "Enrollments.student_id is declared REFERENCES Students(student_id). What does this FOREIGN KEY guarantee?",
    sql: null,
    options: [
      "student_id is unique in Enrollments",
      "Every non-NULL student_id in Enrollments exists in Students",
      "Students rows are deleted automatically when an enrollment is deleted",
      "student_id cannot be NULL"
    ],
    answer: 1,
    explain: "A foreign key enforces referential integrity: each value must match an existing key in the parent table (NULL is allowed unless NOT NULL is also declared)."
  },
  {
    id: 18,
    section: "DDL",
    weeks: [2],
    dataset: "Library",
    q: "Which statement removes the column Edition from the Library table?",
    sql: null,
    options: [
      "DELETE Edition FROM Library;",
      "ALTER TABLE Library DROP COLUMN Edition;",
      "DROP COLUMN Library.Edition;",
      "UPDATE Library SET Edition = NULL;"
    ],
    answer: 1,
    explain: "Structure changes use ALTER TABLE. UPDATE … SET Edition = NULL only empties the values; the column is still there."
  },
  {
    id: 19,
    section: "DDL",
    weeks: [2],
    dataset: null,
    q: "How does a UNIQUE column differ from a PRIMARY KEY column in PostgreSQL?",
    sql: null,
    options: [
      "UNIQUE allows NULL values; PRIMARY KEY does not",
      "UNIQUE allows duplicates; PRIMARY KEY does not",
      "A table can have only one UNIQUE constraint",
      "There is no difference"
    ],
    answer: 0,
    explain: "PRIMARY KEY = UNIQUE + NOT NULL, and only one per table. A UNIQUE column can hold NULLs, and a table can have many UNIQUE constraints."
  },
  {
    id: 20,
    section: "DDL",
    weeks: [2,  7],
    dataset: "txn_lab",
    q: "What does SET search_path TO txn_lab; do?",
    sql: null,
    options: [
      "Creates a schema called txn_lab",
      "Drops every schema except txn_lab",
      "Makes unqualified table names such as account resolve to txn_lab.account",
      "Copies all tables into txn_lab"
    ],
    answer: 2,
    explain: "search_path is the list of schemas PostgreSQL searches for unqualified names. After this, account means txn_lab.account."
  },

  // Section 2: Data Manipulation & Querying (DML & DQL)
  {
    id: 21,
    section: "DML & DQL",
    weeks: [1],
    dataset: null,
    q: "In a LIKE pattern, '_o%' matches values whose:",
    sql: null,
    options: [
      "First character is o",
      "Second character is o",
      "Last character is o",
      "Only character is o"
    ],
    answer: 1,
    explain: "_ matches exactly one character and % matches any number of characters (including none)."
  },
  {
    id: 22,
    section: "DML & DQL",
    weeks: [1],
    dataset: null,
    q: "What does LIMIT 3 OFFSET 3 do?",
    sql: null,
    options: [
      "Returns the first three rows",
      "Returns the last three rows",
      "Returns rows 3 to 5",
      "Skips the first three rows and returns up to the next three"
    ],
    answer: 3,
    explain: "OFFSET skips rows and LIMIT caps the count, which is how 'page two' is fetched."
  },
  {
    id: 23,
    section: "DML & DQL",
    weeks: [1],
    dataset: "Library",
    q: "SELECT * FROM Library LIMIT 3; (no ORDER BY) returns:",
    sql: "SELECT * FROM Library LIMIT 3;",
    options: [
      "The first three rows inserted, guaranteed",
      "The three rows with the smallest BookID, guaranteed",
      "Some three rows, with no guarantee which ones",
      "An error, because LIMIT requires ORDER BY"
    ],
    answer: 2,
    explain: "Without ORDER BY the server may return rows in any order. Use ORDER BY … LIMIT for a reliable Top-N."
  },
  {
    id: 24,
    section: "DML & DQL",
    weeks: [1],
    dataset: null,
    q: "In which order does PostgreSQL execute the clauses of SELECT … FROM … WHERE … ORDER BY … LIMIT …?",
    sql: null,
    options: [
      "SELECT → FROM → WHERE → ORDER BY → LIMIT",
      "FROM → WHERE → SELECT → ORDER BY → LIMIT",
      "FROM → SELECT → WHERE → LIMIT → ORDER BY",
      "WHERE → FROM → SELECT → LIMIT → ORDER BY"
    ],
    answer: 1,
    explain: "You write SELECT first, but the server starts from the table, filters, picks columns, sorts, and finally cuts."
  },
  {
    id: 25,
    section: "DML & DQL",
    weeks: [1],
    dataset: "Library",
    q: "What does UPDATE Library SET AvailableCopies = 0; do?",
    sql: "UPDATE Library SET AvailableCopies = 0;",
    options: [
      "Raises an error because WHERE is missing",
      "Updates only the first row",
      "Updates every row in the table",
      "Asks for confirmation first"
    ],
    answer: 2,
    explain: "Without WHERE, every row is changed. Preview with SELECT first, or wrap it in BEGIN … ROLLBACK."
  },
  {
    id: 26,
    section: "DML & DQL",
    weeks: [1],
    dataset: "Library",
    q: "Which statement inserts several rows at once?",
    sql: null,
    options: [
      "INSERT INTO Library VALUES (7, …), (8, …);",
      "INSERT MANY INTO Library (7, …), (8, …);",
      "INSERT INTO Library ROWS (7, …), (8, …);",
      "INSERT INTO Library VALUES (7, …) VALUES (8, …);"
    ],
    answer: 0,
    explain: "One VALUES keyword followed by comma-separated row lists. PostgreSQL replies INSERT 0 2."
  },
  {
    id: 27,
    section: "DML & DQL",
    weeks: [1],
    dataset: "Library",
    q: "What happens when you insert a row whose PRIMARY KEY value already exists in the table?",
    sql: null,
    options: [
      "A duplicate-key error; the row is rejected",
      "The old row is replaced",
      "A second row with BookID = 1 is added",
      "BookID is set to NULL"
    ],
    answer: 0,
    explain: "A primary key must be unique, so a duplicate value is rejected with a unique-violation error (SQLSTATE 23505)."
  },
  {
    id: 28,
    section: "DML & DQL",
    weeks: [1],
    dataset: null,
    q: "In SQL, a text value such as Pearson is written as:",
    sql: null,
    options: ["\"Pearson\"", "'Pearson'", "`Pearson`", "Pearson (no quotes)"],
    answer: 1,
    explain: "String literals use single quotes. Double quotes are for identifiers (names of tables and columns)."
  },
  {
    id: 29,
    section: "DML & DQL",
    weeks: [1, 3],
    dataset: null,
    q: "Which condition correctly finds rows where Publisher has no value?",
    sql: null,
    options: [
      "WHERE Publisher = NULL",
      "WHERE Publisher = 'NULL'",
      "WHERE Publisher == NULL",
      "WHERE Publisher IS NULL"
    ],
    answer: 3,
    explain: "Any comparison with NULL using = is unknown (never true), so SQL uses IS NULL / IS NOT NULL."
  },
  {
    id: 30,
    section: "DML & DQL",
    weeks: [1],
    dataset: "Library",
    q: "What does SELECT BookTitle AS Title FROM Library; do?",
    sql: "SELECT BookTitle AS Title FROM Library;",
    options: [
      "Renames the column in the table permanently",
      "Shows the column under the heading Title in this result only",
      "Creates a view named Title",
      "Raises an error"
    ],
    answer: 1,
    explain: "AS creates a column alias for the output; the table is unchanged."
  },
  {
    id: 31,
    section: "DML & DQL",
    weeks: [1],
    dataset: null,
    q: "Which habit is the safest before running a DELETE … WHERE …?",
    sql: null,
    options: [
      "Run the same WHERE as a SELECT first and check the rows",
      "Drop the table and recreate it",
      "Remove the primary key",
      "Use TRUNCATE instead"
    ],
    answer: 0,
    explain: "Preview what would disappear, then swap SELECT * for DELETE (and use a transaction if unsure)."
  },

  {
    id: 32,
    section: "DML & DQL",
    weeks: [1],
    dataset: "Library",
    q: "Which clause sorts books by Author A→Z, and books by the same author by AvailableCopies from most to fewest?",
    sql: null,
    options: [
      "ORDER BY Author, AvailableCopies",
      "ORDER BY Author DESC, AvailableCopies ASC",
      "ORDER BY Author ASC, AvailableCopies DESC",
      "ORDER BY AvailableCopies DESC, Author ASC"
    ],
    answer: 2,
    explain: "Each sort key takes its own direction. The second key only breaks ties in the first."
  },

  // Section 3: Aggregation & Relational Joins
  {
    id: 33,
    section: "Aggregation & Joins",
    weeks: [3],
    dataset: null,
    q: "Which aggregate function also works on a text column such as Title?",
    sql: null,
    options: ["SUM", "AVG", "MAX", "None of them"],
    answer: 2,
    explain: "MIN and MAX work on text and dates (alphabetical order); SUM and AVG need numbers."
  },
  {
    id: 34,
    section: "Aggregation & Joins",
    weeks: [3],
    dataset: "uni3",
    q: "What happens with this query?",
    sql: "SELECT CourseID, StuID, COUNT(*)\nFROM ENROLLMENT\nGROUP BY CourseID;",
    options: [
      "It works and shows every student",
      "Error: StuID must appear in GROUP BY or be used in an aggregate",
      "It shows the first StuID of each group",
      "It shows StuID as NULL"
    ],
    answer: 1,
    explain: "Every column in the SELECT list must be either grouped or aggregated."
  },
  {
    id: 35,
    section: "Aggregation & Joins",
    weeks: [3],
    dataset: null,
    q: "Which clause filters groups using an aggregate value?",
    sql: null,
    options: ["WHERE", "ORDER BY", "GROUP BY", "HAVING"],
    answer: 3,
    explain: "WHERE filters rows before grouping; HAVING filters groups after aggregation."
  },
  {
    id: 36,
    section: "Aggregation & Joins",
    weeks: [3],
    dataset: null,
    q: "Which of these conditions causes an error?",
    sql: null,
    options: [
      "WHERE AVG(Marks) > 75",
      "HAVING AVG(Marks) > 75",
      "WHERE Marks > 75",
      "HAVING COUNT(*) > 1"
    ],
    answer: 0,
    explain: "Aggregates are not allowed in WHERE, because WHERE runs before any group exists."
  },
  {
    id: 37,
    section: "Aggregation & Joins",
    weeks: [3],
    dataset: null,
    q: "What is the logical execution order of a grouped query?",
    sql: null,
    options: [
      "FROM → GROUP BY → WHERE → HAVING → SELECT → ORDER BY",
      "SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY",
      "FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY",
      "FROM → WHERE → HAVING → GROUP BY → ORDER BY → SELECT"
    ],
    answer: 2,
    explain: "Rows are filtered, then grouped, then groups are filtered, then columns are produced and sorted."
  },
  {
    id: 38,
    section: "Aggregation & Joins",
    weeks: [4],
    dataset: null,
    q: "An INNER JOIN returns:",
    sql: null,
    options: [
      "All rows from the left table",
      "Only the rows that have a match in both tables",
      "All rows from both tables",
      "Every combination of rows (Cartesian product)"
    ],
    answer: 1,
    explain: "Rows without a match on the other side are dropped."
  },
  {
    id: 39,
    section: "Aggregation & Joins",
    weeks: [4],
    dataset: "joins",
    q: "In Students s LEFT JOIN Enrollments e ON s.student_id = e.student_id, how does a student with no enrolments appear?",
    sql: null,
    options: [
      "The student does not appear",
      "The student appears twice",
      "Once, with NULL in all the Enrollments columns",
      "The query fails"
    ],
    answer: 2,
    explain: "A left join keeps every left-table row and pads the missing right side with NULL."
  },
  {
    id: 40,
    section: "Aggregation & Joins",
    weeks: [4],
    dataset: "joins",
    q: "Which query finds students who are not enrolled in any course?",
    sql: null,
    options: [
      "… FROM Students s LEFT JOIN Enrollments e ON s.student_id = e.student_id WHERE e.enrollment_id IS NULL;",
      "… FROM Students s INNER JOIN Enrollments e ON s.student_id = e.student_id;",
      "… FROM Students s CROSS JOIN Enrollments e;",
      "… FROM Students s RIGHT JOIN Enrollments e ON s.student_id = e.student_id WHERE s.student_id IS NOT NULL;"
    ],
    answer: 0,
    explain: "A left join plus an IS NULL check on the right side isolates rows that had nothing to match."
  },
  {
    id: 41,
    section: "Aggregation & Joins",
    weeks: [4],
    dataset: null,
    q: "A NATURAL JOIN matches rows on:",
    sql: null,
    options: [
      "The primary keys only",
      "The first column of each table",
      "The columns listed in ON",
      "All columns that have the same name in both tables"
    ],
    answer: 3,
    explain: "That is why a natural join can surprise you if two tables share an unrelated column name."
  },
  {
    id: 42,
    section: "Aggregation & Joins",
    weeks: [4],
    dataset: "joins",
    q: "A self join is:",
    sql: null,
    options: [
      "A join without any condition",
      "A join that only uses primary keys",
      "A table joined with itself, using two aliases",
      "A join between two tables that have the same columns"
    ],
    answer: 2,
    explain: "For example, Students a JOIN Students b ON a.major = b.major WHERE a.student_id < b.student_id lists pairs of students sharing a major."
  },
  {
    id: 43,
    section: "Aggregation & Joins",
    weeks: [4],
    dataset: null,
    q: "A FULL OUTER JOIN returns:",
    sql: null,
    options: [
      "All matched rows, plus the unmatched rows from both tables padded with NULL",
      "Only the unmatched rows",
      "Only rows from the left table",
      "The Cartesian product"
    ],
    answer: 0,
    explain: "It is a left join and a right join combined. MySQL lacks it, so it is simulated with LEFT JOIN … UNION … RIGHT JOIN."
  },
  {
    id: 44,
    section: "Aggregation & Joins",
    weeks: [4],
    dataset: null,
    q: "What is the difference between UNION and UNION ALL?",
    sql: null,
    options: [
      "UNION keeps duplicates; UNION ALL removes them",
      "UNION needs the same table; UNION ALL does not",
      "UNION removes duplicate rows; UNION ALL keeps them",
      "There is no difference"
    ],
    answer: 2,
    explain: "Both need union-compatible SELECTs (same number of columns, compatible types)."
  },
  {
    id: 45,
    section: "Aggregation & Joins",
    weeks: [4],
    dataset: null,
    q: "A RIGHT JOIN always keeps:",
    sql: null,
    options: [
      "Only matching rows",
      "Every row from the left table",
      "Rows that match neither table",
      "Every row from the right table"
    ],
    answer: 3,
    explain: "Missing left-side columns are padded with NULL."
  },


  // Section 4: Stored Programs, Views & Triggers (Weeks 5–6)
  {
    id: 46,
    section: "Programs, Views & Triggers",
    weeks: [5],
    dataset: "programs",
    q: "How is a stored procedure such as AddStudent run in PostgreSQL?",
    sql: null,
    options: [
      "SELECT AddStudent('Rafi','CSE');",
      "CALL AddStudent('Rafi','CSE');",
      "EXECUTE AddStudent('Rafi','CSE');",
      "RUN PROCEDURE AddStudent('Rafi','CSE');"
    ],
    answer: 1,
    explain: "Procedures are invoked with CALL. They do not return a value into an expression, so they cannot sit inside a SELECT."
  },
  {
    id: 47,
    section: "Programs, Views & Triggers",
    weeks: [5],
    dataset: null,
    q: "What is the key difference between a function and a procedure?",
    sql: null,
    options: [
      "A function must return a value and can be used inside SELECT or WHERE; a procedure is run with CALL",
      "A procedure must return a value; a function cannot",
      "Only functions can contain INSERT statements",
      "Only procedures can take parameters"
    ],
    answer: 0,
    explain: "Because a function returns exactly one value, it can be used anywhere an expression is allowed. A procedure is a standalone action."
  },
  {
    id: 48,
    section: "Programs, Views & Triggers",
    weeks: [5],
    dataset: "programs",
    q: "In CREATE PROCEDURE GetStudentCount(INOUT total INT), what does INOUT allow?",
    sql: null,
    options: [
      "total can only be read, never changed",
      "total is passed in and its new value is handed back to the caller",
      "total becomes a column in Student",
      "The procedure runs twice"
    ],
    answer: 1,
    explain: "An INOUT parameter carries a value in and returns the modified value out, which is how a procedure passes a result back."
  },
  {
    id: 49,
    section: "Programs, Views & Triggers",
    weeks: [5],
    dataset: "programs",
    q: "Inside PL/pgSQL, what does SELECT COUNT(*) INTO total FROM Student; do?",
    sql: null,
    options: [
      "Creates a new table named total",
      "Inserts the count into a table named total",
      "Stores the count in the variable total",
      "Prints the count and discards it"
    ],
    answer: 2,
    explain: "SELECT … INTO variable assigns the query result to a PL/pgSQL variable (it is not CREATE TABLE AS here)."
  },
  {
    id: 50,
    section: "Programs, Views & Triggers",
    weeks: [5],
    dataset: null,
    q: "In CREATE FUNCTION … AS $$ … $$ LANGUAGE plpgsql;, what is the role of $$?",
    sql: null,
    options: [
      "It marks a parameter",
      "It quotes the function body as a string, so single quotes inside need no escaping",
      "It means the function returns money",
      "It ends the transaction"
    ],
    answer: 1,
    explain: "$$ is dollar quoting. The body is passed to PostgreSQL as one string literal, which keeps 'A+' and similar literals simple."
  },
  {
    id: 51,
    section: "Programs, Views & Triggers",
    weeks: [5],
    dataset: null,
    q: "What does a regular (non-materialized) view store?",
    sql: null,
    options: [
      "A full copy of the result rows",
      "Only its defining SELECT query; data is read from the base tables each time",
      "An index on the base table",
      "A backup of the base tables"
    ],
    answer: 1,
    explain: "A view is a virtual table. Every query on it re-runs the stored SELECT against the live base tables."
  },
  {
    id: 52,
    section: "Programs, Views & Triggers",
    weeks: [5],
    dataset: "programs",
    q: "After CREATE VIEW CSE_Students …, a new CSE student is inserted into Student. When does the view show the new student?",
    sql: null,
    options: [
      "Immediately, on the next SELECT from the view",
      "Only after REFRESH VIEW CSE_Students",
      "Only after the view is dropped and recreated",
      "Never"
    ],
    answer: 0,
    explain: "A view has no stored data, so it always reflects the current base table. Only materialized views need REFRESH."
  },
  {
    id: 53,
    section: "Programs, Views & Triggers",
    weeks: [5],
    dataset: "programs",
    q: "Dept_Avg_CGPA is a MATERIALIZED VIEW. A student's cgpa is then updated. What does SELECT * FROM Dept_Avg_CGPA; show?",
    sql: null,
    options: [
      "The new average, automatically",
      "The old average, until REFRESH MATERIALIZED VIEW Dept_Avg_CGPA; is run",
      "An error saying the view is stale",
      "An empty result"
    ],
    answer: 1,
    explain: "A materialized view stores a snapshot. It stays stale until you refresh it."
  },
  {
    id: 54,
    section: "Programs, Views & Triggers",
    weeks: [5],
    dataset: null,
    q: "Which workload suits a materialized view best?",
    sql: null,
    options: [
      "Showing a bank balance that must always be exact",
      "An expensive aggregate on a dashboard that can be a few minutes old",
      "A table that receives thousands of inserts per second and must show them instantly",
      "Hiding a column from some users"
    ],
    answer: 1,
    explain: "Materialized views trade freshness for speed, which suits heavy aggregates that can tolerate a scheduled refresh."
  },
  {
    id: 55,
    section: "Programs, Views & Triggers",
    weeks: [5,  6],
    dataset: null,
    q: "A PostgreSQL trigger function must be declared with which return type?",
    sql: null,
    options: [
      "RETURNS VOID",
      "RETURNS TRIGGER",
      "RETURNS TABLE",
      "RETURNS RECORD"
    ],
    answer: 1,
    explain: "Trigger functions are declared RETURNS TRIGGER and are then attached with CREATE TRIGGER … EXECUTE FUNCTION."
  },
  {
    id: 56,
    section: "Programs, Views & Triggers",
    weeks: [5,  6],
    dataset: null,
    q: "How do you call a trigger in PostgreSQL?",
    sql: null,
    options: [
      "CALL trigger_name();",
      "SELECT trigger_name();",
      "You don't: it fires automatically on INSERT, UPDATE, DELETE or TRUNCATE",
      "EXECUTE TRIGGER trigger_name;"
    ],
    answer: 2,
    explain: "A trigger is bound to a table event. The event itself fires it; no one calls it explicitly."
  },
  {
    id: 57,
    section: "Programs, Views & Triggers",
    weeks: [6],
    dataset: null,
    q: "In a row-level trigger on INSERT, which record is available?",
    sql: null,
    options: [
      "Only OLD",
      "Only NEW",
      "Both NEW and OLD",
      "Neither"
    ],
    answer: 1,
    explain: "NEW is the row being inserted. There is no previous row, so OLD is not available."
  },
  {
    id: 58,
    section: "Programs, Views & Triggers",
    weeks: [6],
    dataset: null,
    q: "In a row-level trigger on DELETE, which record is available?",
    sql: null,
    options: [
      "Only OLD",
      "Only NEW",
      "Both NEW and OLD",
      "Neither"
    ],
    answer: 0,
    explain: "OLD is the row being deleted. Nothing replaces it, so NEW is not available."
  },
  {
    id: 59,
    section: "Programs, Views & Triggers",
    weeks: [6],
    dataset: null,
    q: "In a BEFORE INSERT … FOR EACH ROW trigger, what does RETURN NULL; do?",
    sql: null,
    options: [
      "Inserts the row with all columns NULL",
      "Skips inserting this row, silently",
      "Rolls back the whole transaction",
      "Has no effect"
    ],
    answer: 1,
    explain: "In a BEFORE row trigger, returning NULL cancels the operation for that row. RETURN NEW lets it continue."
  },
  {
    id: 60,
    section: "Programs, Views & Triggers",
    weeks: [6],
    dataset: null,
    q: "Which trigger timing is the usual choice for writing audit-log rows?",
    sql: null,
    options: [
      "BEFORE, because it can change NEW",
      "AFTER, because it sees the final result of the change",
      "INSTEAD OF, on the base table",
      "FOR EACH STATEMENT only"
    ],
    answer: 1,
    explain: "AFTER triggers run once the change has happened, so the logged values match what was actually stored."
  },
  {
    id: 61,
    section: "Programs, Views & Triggers",
    weeks: [6],
    dataset: null,
    q: "INSTEAD OF triggers are attached to:",
    sql: null,
    options: [
      "Views",
      "Sequences",
      "Indexes",
      "Schemas"
    ],
    answer: 0,
    explain: "INSTEAD OF triggers let you define what an INSERT, UPDATE or DELETE on a view should do to the underlying tables."
  },
  {
    id: 62,
    section: "Programs, Views & Triggers",
    weeks: [6],
    dataset: null,
    q: "Inside a trigger function, what does TG_OP hold?",
    sql: null,
    options: [
      "The table name",
      "The operation that fired the trigger, such as 'INSERT', 'UPDATE' or 'DELETE'",
      "The number of affected rows",
      "The trigger's timing"
    ],
    answer: 1,
    explain: "TG_OP lets one function handle several events, e.g. IF TG_OP = 'DELETE' THEN …"
  },
  {
    id: 63,
    section: "Programs, Views & Triggers",
    weeks: [6],
    dataset: "triggers",
    q: "How do you pause trg_salary_audit temporarily without deleting it?",
    sql: null,
    options: [
      "DROP TRIGGER trg_salary_audit ON employee;",
      "ALTER TABLE employee DISABLE TRIGGER trg_salary_audit;",
      "ALTER TRIGGER trg_salary_audit STOP;",
      "DELETE FROM pg_trigger WHERE tgname = 'trg_salary_audit';"
    ],
    answer: 1,
    explain: "DISABLE TRIGGER pauses it; ENABLE TRIGGER turns it back on. DROP TRIGGER removes it for good."
  },
  {
    id: 64,
    section: "Programs, Views & Triggers",
    weeks: [6],
    dataset: null,
    q: "What does pg_dump do?",
    sql: null,
    options: [
      "Deletes a database",
      "Exports (backs up) one database while it stays online",
      "Restores a .dump file",
      "Backs up the whole server including roles"
    ],
    answer: 1,
    explain: "pg_dump writes a consistent backup of one database without taking it offline. pg_dumpall covers all databases plus roles."
  },
  {
    id: 65,
    section: "Programs, Views & Triggers",
    weeks: [6],
    dataset: null,
    q: "What does pg_dump -U postgres -Fc -d mydb -f mydb.dump produce?",
    sql: null,
    options: [
      "A plain, readable SQL script",
      "A compressed custom-format archive",
      "A directory of files, one per table",
      "A CSV export of every table"
    ],
    answer: 1,
    explain: "-Fc selects the custom format, which is compressed and must be restored with pg_restore."
  },
  {
    id: 66,
    section: "Programs, Views & Triggers",
    weeks: [6],
    dataset: null,
    q: "Which tool restores a custom-format backup such as mydb.dump?",
    sql: null,
    options: [
      "psql -f mydb.dump",
      "pg_restore -d mydb_new mydb.dump",
      "pg_dump --restore mydb.dump",
      "createdb mydb.dump"
    ],
    answer: 1,
    explain: "Custom and directory formats need pg_restore. A plain .sql script is run with psql -f instead."
  },
  {
    id: 67,
    section: "Programs, Views & Triggers",
    weeks: [6],
    dataset: null,
    q: "Which command backs up all databases together with roles and other global objects?",
    sql: null,
    options: [
      "pg_dump -Fd",
      "pg_dumpall",
      "pg_restore --all",
      "psql --backup"
    ],
    answer: 1,
    explain: "pg_dump works on one database; pg_dumpall includes every database plus the cluster-wide roles."
  },
  {
    id: 68,
    section: "Programs, Views & Triggers",
    weeks: [6],
    dataset: null,
    q: "A plain-SQL backup mydb.sql is restored into a new database with:",
    sql: null,
    options: [
      "pg_restore -d mydb_new mydb.sql",
      "createdb mydb_new, then psql -d mydb_new -f mydb.sql",
      "pg_dump -d mydb_new -f mydb.sql",
      "ALTER DATABASE mydb_new RESTORE 'mydb.sql';"
    ],
    answer: 1,
    explain: "A plain dump is just SQL, so it is replayed with psql into an existing (newly created) database."
  },

  // Section 5: Database Transactions
  {
    id: 69,
    section: "Transactions",
    weeks: [7],
    dataset: null,
    q: "In ACID, what does A stand for?",
    sql: null,
    options: ["Accuracy", "Atomicity", "Availability", "Authorization"],
    answer: 1,
    explain: "Atomicity: all statements of a transaction succeed together or none of them take effect."
  },
  {
    id: 70,
    section: "Transactions",
    weeks: [7],
    dataset: null,
    q: "Which ACID property means that changes made inside an unfinished transaction are not visible to other sessions?",
    sql: null,
    options: ["Durability", "Atomicity", "Consistency", "Isolation"],
    answer: 3,
    explain: "Isolation keeps concurrent transactions from seeing each other's uncommitted work."
  },
  {
    id: 71,
    section: "Transactions",
    weeks: [7],
    dataset: null,
    q: "Which ACID property guarantees that committed changes survive a crash or power cut?",
    sql: null,
    options: ["Durability", "Isolation", "Atomicity", "Consistency"],
    answer: 0,
    explain: "Once COMMIT succeeds, the change is permanent (PostgreSQL uses its write-ahead log for this)."
  },
  {
    id: 72,
    section: "Transactions",
    weeks: [7],
    dataset: null,
    q: "Which ACID property means a transaction takes the database from one valid state to another, without breaking any constraint?",
    sql: null,
    options: ["Atomicity", "Isolation", "Consistency", "Durability"],
    answer: 2,
    explain: "For example, a CHECK (balance >= 0) constraint can never be left violated after a commit."
  },
  {
    id: 73,
    section: "Transactions",
    weeks: [7],
    dataset: null,
    q: "Without BEGIN, PostgreSQL runs in autocommit mode. This means:",
    sql: null,
    options: [
      "Every statement is saved permanently as soon as it finishes",
      "Nothing is saved until you type COMMIT",
      "Statements are queued and run together later",
      "Only DDL statements are saved"
    ],
    answer: 0,
    explain: "That is why a mistake such as an UPDATE without WHERE cannot be undone in autocommit mode."
  },
  {
    id: 74,
    section: "Transactions",
    weeks: [7],
    dataset: null,
    q: "What does ROLLBACK TO SAVEPOINT s1; do?",
    sql: null,
    options: [
      "Ends the transaction and undoes everything",
      "Commits everything before s1",
      "Deletes the savepoint and keeps all changes",
      "Undoes only the work done after s1; the transaction stays open"
    ],
    answer: 3,
    explain: "The savepoint is kept, so you can roll back to it again."
  },
  {
    id: 75,
    section: "Transactions",
    weeks: [7],
    dataset: null,
    q: "What does RELEASE SAVEPOINT s1; do?",
    sql: null,
    options: [
      "Removes the bookmark s1 but keeps the changes; nothing is committed yet",
      "Undoes the changes made after s1",
      "Commits the transaction",
      "Rolls back the whole transaction"
    ],
    answer: 0,
    explain: "The transaction is still open and can still be rolled back as a whole."
  },
  {
    id: 76,
    section: "Transactions",
    weeks: [7],
    dataset: "txn_lab",
    q: "What happens here?",
    sql: "BEGIN;\nUPDATE product SET stock = stock + 10 WHERE product_id = 5;\nSAVEPOINT s1;\nUPDATE product SET stock = stock + 10 WHERE product_id = 5;\nRELEASE SAVEPOINT s1;\nROLLBACK TO SAVEPOINT s1;",
    options: [
      "The second update is undone",
      "Error: savepoint \"s1\" does not exist (SQLSTATE 3B001)",
      "Both updates are undone",
      "The transaction is committed"
    ],
    answer: 1,
    explain: "After RELEASE, the bookmark is gone, so you cannot roll back to it."
  },
  {
    id: 77,
    section: "Transactions",
    weeks: [7],
    dataset: null,
    q: "Inside a transaction, a statement fails with an error. What happens to the next statement you run before ending the transaction?",
    sql: null,
    options: [
      "It runs normally",
      "It is committed automatically",
      "It is refused: 'current transaction is aborted' (SQLSTATE 25P02)",
      "The database restarts"
    ],
    answer: 2,
    explain: "Every further statement is refused until you end the transaction with ROLLBACK (or COMMIT, which then acts as a rollback)."
  },
  {
    id: 78,
    section: "Transactions",
    weeks: [7],
    dataset: null,
    q: "Which statement starts an explicit transaction block in PostgreSQL?",
    sql: null,
    options: [
      "COMMIT",
      "BEGIN",
      "SAVEPOINT",
      "OPEN"
    ],
    answer: 1,
    explain: "BEGIN (or START TRANSACTION) opens the block. Everything until COMMIT or ROLLBACK is one unit."
  },
  {
    id: 79,
    section: "Transactions",
    weeks: [7],
    dataset: "txn_lab",
    q: "Inside a transaction you set SAVEPOINT s1, and the next statement fails. How can you keep the work done before s1 and carry on?",
    sql: null,
    options: [
      "Run COMMIT straight away",
      "Run ROLLBACK TO SAVEPOINT s1; then continue",
      "Run RELEASE SAVEPOINT s1;",
      "Nothing works; the whole transaction is lost"
    ],
    answer: 1,
    explain: "ROLLBACK TO SAVEPOINT clears the aborted state and undoes only what came after s1. COMMIT at that point would roll everything back."
  }
];
