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
    id: 5,
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
    id: 6,
    section: "DDL",
    weeks: [2],
    dataset: "Library",
    q: "Which statement renames the column Author to AuthorName?",
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
    id: 7,
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
    explain: "A primary key is UNIQUE + NOT NULL."
  },
  {
    id: 8,
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
    id: 9,
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
    id: 10,
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
    id: 11,
    section: "DDL",
    weeks: [2],
    dataset: null,
    q: "Which constraint stops a column from ever storing NULL?",
    sql: null,
    options: [
      "UNIQUE",
      "DEFAULT",
      "NOT NULL",
      "CHECK"
    ],
    answer: 2,
    explain: "NOT NULL rejects any INSERT or UPDATE that leaves the column without a value."
  },
  {
    id: 12,
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
    explain: "A foreign key enforces referential integrity: each value must match an existing key in the parent table."
  },
  {
    id: 13,
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
    id: 14,
    section: "DDL",
    weeks: [2],
    dataset: null,
    q: "How does a UNIQUE column differ from a PRIMARY KEY column?",
    sql: null,
    options: [
      "UNIQUE allows NULL values; PRIMARY KEY does not",
      "UNIQUE allows duplicates; PRIMARY KEY does not",
      "A table can have only one UNIQUE constraint",
      "There is no difference"
    ],
    answer: 0,
    explain: "PRIMARY KEY = UNIQUE + NOT NULL. A UNIQUE column can hold NULLs, and a table can have many UNIQUE constraints."
  },
  {
    id: 15,
    section: "DDL",
    weeks: [2],
    dataset: null,
    q: "Which SQL command is used to modify an existing table structure?",
    sql: null,
    options: [
      "MODIFY TABLE",
      "UPDATE TABLE",
      "ALTER TABLE",
      "CHANGE TABLE"
    ],
    answer: 2,
    explain: "ALTER TABLE is the standard DDL command for changing table structure such as adding or dropping columns."
  },

  // Section 2: Data Manipulation & Querying (DML & DQL)
  {
    id: 16,
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
    id: 17,
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
    id: 18,
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
    id: 19,
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
    explain: "One VALUES keyword followed by comma-separated row lists."
  },
  {
    id: 20,
    section: "DML & DQL",
    weeks: [1],
    dataset: "Library",
    q: "What happens when you insert a row whose PRIMARY KEY value already exists in the table?",
    sql: null,
    options: [
      "A duplicate-key error; the row is rejected",
      "The old row is replaced",
      "A second row with the same ID is added",
      "The ID is set to NULL"
    ],
    answer: 0,
    explain: "A primary key must be unique, so a duplicate value is rejected with an error."
  },
  {
    id: 21,
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
    id: 22,
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
    id: 23,
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
    id: 24,
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
    explain: "Preview what would disappear, then swap SELECT * for DELETE."
  },
  {
    id: 25,
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
  {
    id: 26,
    section: "DML & DQL",
    weeks: [1],
    dataset: null,
    q: "Which SQL command is used to retrieve data from a table?",
    sql: null,
    options: ["FETCH", "GET", "SELECT", "RETRIEVE"],
    answer: 2,
    explain: "SELECT is the standard SQL command for querying data from one or more tables."
  },
  {
    id: 27,
    section: "DML & DQL",
    weeks: [1],
    dataset: null,
    q: "Which SQL command removes specific rows from a table?",
    sql: null,
    options: ["DROP", "TRUNCATE", "REMOVE", "DELETE"],
    answer: 3,
    explain: "DELETE removes specific rows based on a WHERE condition, or all rows if no condition is given."
  },
  {
    id: 28,
    section: "DML & DQL",
    weeks: [1],
    dataset: null,
    q: "SELECT, INSERT, UPDATE, and DELETE belong to which category of SQL?",
    sql: null,
    options: ["DDL", "DCL", "TCL", "DML"],
    answer: 3,
    explain: "These commands manipulate data inside tables, so they are Data Manipulation Language (DML)."
  },

  // Section 3: Aggregation & Relational Joins
  {
    id: 29,
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
    id: 30,
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
    id: 31,
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
    id: 32,
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
    id: 33,
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
    id: 34,
    section: "Aggregation & Joins",
    weeks: [3],
    dataset: null,
    q: "Which aggregate function counts only non-NULL values in a column?",
    sql: null,
    options: ["COUNT(*)", "COUNT(column_name)", "SUM(column_name)", "AVG(column_name)"],
    answer: 1,
    explain: "COUNT(*) counts all rows including those with NULL; COUNT(column_name) counts only rows where that column is not NULL."
  },
  {
    id: 35,
    section: "Aggregation & Joins",
    weeks: [3],
    dataset: null,
    q: "Which query finds the second highest salary from an Employee table?",
    sql: "SELECT MAX(salary) FROM Employee\nWHERE salary < (SELECT MAX(salary) FROM Employee);",
    options: [
      "It returns NULL always",
      "It finds the second highest salary",
      "It finds the lowest salary",
      "It raises a syntax error"
    ],
    answer: 1,
    explain: "The subquery finds the maximum salary. The outer MAX finds the highest salary below that, which is the second highest."
  },
  {
    id: 36,
    section: "Aggregation & Joins",
    weeks: [3],
    dataset: null,
    q: "Which query also returns the second highest salary?",
    sql: "SELECT salary FROM Employee\nORDER BY salary DESC\nLIMIT 1 OFFSET 1;",
    options: [
      "It returns the highest salary",
      "It returns the lowest salary",
      "It returns the second highest salary",
      "It returns NULL"
    ],
    answer: 2,
    explain: "ORDER BY DESC puts the highest first; OFFSET 1 skips that top row; LIMIT 1 takes the next one."
  },
  {
    id: 37,
    section: "Aggregation & Joins",
    weeks: [3],
    dataset: null,
    q: "What does COUNT(*) return when no rows match the WHERE condition?",
    sql: null,
    options: ["NULL", "0", "An error", "1"],
    answer: 1,
    explain: "COUNT(*) always returns a number. If no rows match, it returns 0, never NULL."
  },
  {
    id: 38,
    section: "Aggregation & Joins",
    weeks: [3],
    dataset: null,
    q: "What does AVG(salary) return if some salary values are NULL?",
    sql: null,
    options: [
      "0",
      "NULL",
      "The average of non-NULL salaries only",
      "An error"
    ],
    answer: 2,
    explain: "Aggregate functions like AVG, SUM, and MIN/MAX ignore NULL values in their calculation."
  },
  {
    id: 39,
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
    id: 40,
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
    id: 41,
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
    id: 42,
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
    id: 43,
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
    explain: "For example, joining an Employee table to itself to find pairs who share the same department."
  },
  {
    id: 44,
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
    explain: "It is a left join and a right join combined — every row from both sides appears."
  },
  {
    id: 45,
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
    id: 46,
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
  {
    id: 47,
    section: "Aggregation & Joins",
    weeks: [4],
    dataset: null,
    q: "A CROSS JOIN produces:",
    sql: null,
    options: [
      "Only rows where both tables have matching keys",
      "Every possible combination of rows from both tables",
      "Only unmatched rows from both tables",
      "The same result as an INNER JOIN"
    ],
    answer: 1,
    explain: "A CROSS JOIN is a Cartesian product. If Table A has 3 rows and Table B has 4 rows, the result has 12 rows."
  },

  // Section 4: Stored Programs, Views & Triggers (Weeks 5–6)
  {
    id: 48,
    section: "Programs, Views & Triggers",
    weeks: [5],
    dataset: "programs",
    q: "How is a stored procedure such as AddStudent run?",
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
    id: 49,
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
    explain: "Because a function returns exactly one value, it can be used anywhere an expression is allowed."
  },
  {
    id: 50,
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
    id: 51,
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
    explain: "A view has no stored data, so it always reflects the current base table."
  },
  {
    id: 52,
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
    id: 53,
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
    id: 54,
    section: "Programs, Views & Triggers",
    weeks: [5, 6],
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
    explain: "Trigger functions are declared RETURNS TRIGGER and are then attached with CREATE TRIGGER."
  },
  {
    id: 55,
    section: "Programs, Views & Triggers",
    weeks: [5, 6],
    dataset: null,
    q: "How do you call a trigger?",
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
    id: 56,
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
    id: 57,
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
    id: 58,
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
    id: 59,
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
    id: 60,
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

  // Section 5: Database Transactions
  {
    id: 61,
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
    id: 62,
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
    id: 63,
    section: "Transactions",
    weeks: [7],
    dataset: null,
    q: "Which ACID property guarantees that committed changes survive a crash or power cut?",
    sql: null,
    options: ["Durability", "Isolation", "Atomicity", "Consistency"],
    answer: 0,
    explain: "Once COMMIT succeeds, the change is permanent."
  },
  {
    id: 64,
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
    id: 65,
    section: "Transactions",
    weeks: [7],
    dataset: null,
    q: "Without BEGIN, SQL runs in autocommit mode. This means:",
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
    id: 66,
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
    id: 67,
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
    id: 68,
    section: "Transactions",
    weeks: [7],
    dataset: null,
    q: "Which statement starts an explicit transaction block?",
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
    id: 69,
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
    explain: "ROLLBACK TO SAVEPOINT clears the aborted state and undoes only what came after s1."
  },
  {
    id: 70,
    section: "Transactions",
    weeks: [7],
    dataset: null,
    q: "What is the effect of COMMIT in a transaction?",
    sql: null,
    options: [
      "It undoes all changes made in the transaction",
      "It saves all changes made in the transaction permanently",
      "It pauses the transaction",
      "It has no effect until ROLLBACK is called"
    ],
    answer: 1,
    explain: "COMMIT makes all changes in the transaction permanent and visible to other sessions."
  },
  {
    id: 71,
    section: "Transactions",
    weeks: [7],
    dataset: null,
    q: "What is the effect of ROLLBACK in a transaction?",
    sql: null,
    options: [
      "It saves all changes made so far",
      "It undoes all changes made in the current transaction",
      "It creates a savepoint",
      "It ends only the last statement"
    ],
    answer: 1,
    explain: "ROLLBACK discards every change made since BEGIN, leaving the database as it was before the transaction started."
  },
  {
    id: 72,
    section: "Transactions",
    weeks: [7],
    dataset: null,
    q: "What is a SAVEPOINT used for?",
    sql: null,
    options: [
      "To commit part of a transaction",
      "To mark a point inside a transaction so you can roll back to it without losing earlier work",
      "To start a new transaction inside an existing one",
      "To back up the entire database"
    ],
    answer: 1,
    explain: "SAVEPOINTs let you undo a portion of a transaction while keeping earlier changes in the same transaction."
  },
  {
    id: 73,
    section: "Transactions",
    weeks: [7],
    dataset: null,
    q: "A bank transfer deducts $100 from Account A and adds $100 to Account B. If the deduction succeeds but the addition fails, what should happen?",
    sql: null,
    options: [
      "Keep the deduction only",
      "Keep the addition only",
      "Roll back the entire transaction so neither change takes effect",
      "Commit the deduction and try the addition again later"
    ],
    answer: 2,
    explain: "Atomicity requires that both operations succeed or both are rolled back, preventing money from disappearing."
  },

  // Extra DDL questions
  {
    id: 74,
    section: "DDL",
    weeks: [2],
    dataset: null,
    q: "Which of the following is NOT a DDL command?",
    sql: null,
    options: ["CREATE", "ALTER", "UPDATE", "DROP"],
    answer: 2,
    explain: "UPDATE modifies data inside a table, so it is a DML command. CREATE, ALTER, and DROP all change database structure."
  },
  {
    id: 75,
    section: "DDL",
    weeks: [2],
    dataset: null,
    q: "What does the CHECK constraint do?",
    sql: null,
    options: [
      "Ensures a column value is unique",
      "Prevents NULL values",
      "Enforces a condition that every row must satisfy",
      "Links two tables together"
    ],
    answer: 2,
    explain: "CHECK (age >= 18) for example rejects any INSERT or UPDATE that would leave the age below 18."
  },

  // Extra DML questions
  {
    id: 76,
    section: "DML & DQL",
    weeks: [1],
    dataset: null,
    q: "Which keyword removes duplicate rows from a SELECT result?",
    sql: null,
    options: ["UNIQUE", "DISTINCT", "DIFFERENT", "FILTER"],
    answer: 1,
    explain: "SELECT DISTINCT col FROM table returns only unique values for that column."
  },
  {
    id: 77,
    section: "DML & DQL",
    weeks: [1],
    dataset: null,
    q: "Which operator checks if a value falls within a range (inclusive)?",
    sql: null,
    options: ["IN", "LIKE", "BETWEEN", "EXISTS"],
    answer: 2,
    explain: "WHERE salary BETWEEN 3000 AND 5000 is equivalent to WHERE salary >= 3000 AND salary <= 5000."
  },

  // Extra Aggregation & Joins question
  {
    id: 78,
    section: "Aggregation & Joins",
    weeks: [3],
    dataset: null,
    q: "Which aggregate function returns the total sum of a numeric column?",
    sql: null,
    options: ["COUNT", "MAX", "AVG", "SUM"],
    answer: 3,
    explain: "SUM(salary) adds up every non-NULL salary value in the group."
  },

  // Extra Transactions questions
  {
    id: 79,
    section: "Transactions",
    weeks: [7],
    dataset: null,
    q: "Which of the following correctly lists all four ACID properties?",
    sql: null,
    options: [
      "Atomicity, Consistency, Isolation, Durability",
      "Accuracy, Concurrency, Integrity, Distribution",
      "Atomicity, Concurrency, Isolation, Durability",
      "Accuracy, Consistency, Integrity, Durability"
    ],
    answer: 0,
    explain: "ACID stands for Atomicity, Consistency, Isolation, and Durability — the four properties that guarantee reliable transactions."
  },
  {
    id: 80,
    section: "Transactions",
    weeks: [7],
    dataset: null,
    q: "What happens if you close the connection without calling COMMIT or ROLLBACK?",
    sql: null,
    options: [
      "Changes are committed automatically",
      "Changes are saved as a draft",
      "The transaction is rolled back and all changes are lost",
      "The database locks until COMMIT is called"
    ],
    answer: 2,
    explain: "An open transaction with no explicit COMMIT is rolled back when the session ends, ensuring no partial changes persist."
  }
];
