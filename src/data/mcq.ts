export interface MCQ {
  id: number;
  section: "DDL" | "DML & DQL" | "Aggregation & Joins" | "Transactions";
  weeks: number[];
  dataset: "Library" | "uni3" | "joins" | "txn_lab" | null;
  q: string;
  sql: string | null;
  options: [string, string, string, string];
  answer: number; // 0 = A, 1 = B, 2 = C, 3 = D
  explain: string;
}

export const mcqs: MCQ[] = [
  // Section 1: Data Definition Language (DDL) · Q1–Q15
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
    q: "After ALTER TABLE Library ADD COLUMN Edition INT; on the 5-row table, what does Edition hold in the existing rows?",
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

  // Section 2: Data Manipulation & Querying (DML & DQL) · Q16–Q35
  {
    id: 16,
    section: "DML & DQL",
    weeks: [1],
    dataset: "Library",
    q: "How many rows does SELECT DISTINCT Author FROM Library; return?",
    sql: "SELECT DISTINCT Author FROM Library;",
    options: ["5", "4", "3", "2"],
    answer: 1,
    explain: "Silberschatz appears twice but is listed once."
  },
  {
    id: 17,
    section: "DML & DQL",
    weeks: [1],
    dataset: "Library",
    q: "How many rows does SELECT * FROM Library WHERE AvailableCopies > 4; return?",
    sql: "SELECT * FROM Library WHERE AvailableCopies > 4;",
    options: ["4", "2", "5", "3"],
    answer: 3,
    explain: "Clean Code (7), Database System Concepts (6) and Computer Networks (5)."
  },
  {
    id: 18,
    section: "DML & DQL",
    weeks: [1],
    dataset: "Library",
    q: "How many rows does SELECT BookTitle FROM Library WHERE BookTitle LIKE 'C%'; return?",
    sql: "SELECT BookTitle FROM Library WHERE BookTitle LIKE 'C%';",
    options: ["2", "1", "3", "0"],
    answer: 0,
    explain: "'C%' means 'starts with C': Computer Networks and Clean Code."
  },
  {
    id: 19,
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
    id: 20,
    section: "DML & DQL",
    weeks: [1],
    dataset: "Library",
    q: "How many rows does SELECT * FROM Library WHERE AvailableCopies BETWEEN 4 AND 6; return?",
    sql: "SELECT * FROM Library WHERE AvailableCopies BETWEEN 4 AND 6;",
    options: ["1", "2", "3", "4"],
    answer: 2,
    explain: "BETWEEN includes both ends: 6, 5 and 4 copies."
  },
  {
    id: 21,
    section: "DML & DQL",
    weeks: [1],
    dataset: "Library",
    q: "How many rows does this return?",
    sql: "SELECT * FROM Library\nWHERE Author = 'Silberschatz' AND AvailableCopies > 5;",
    options: ["0", "1", "2", "3"],
    answer: 1,
    explain: "Both conditions must be true: only Database System Concepts (6 copies)."
  },
  {
    id: 22,
    section: "DML & DQL",
    weeks: [1],
    dataset: "Library",
    q: "How many rows does this return?",
    sql: "SELECT * FROM Library\nWHERE Category = 'Database' OR Publisher = 'Pearson';",
    options: ["1", "3", "2", "4"],
    answer: 2,
    explain: "Either condition is enough: Database System Concepts (Database) and Computer Networks (Pearson)."
  },
  {
    id: 23,
    section: "DML & DQL",
    weeks: [1],
    dataset: "Library",
    q: "Which book does SELECT BookTitle FROM Library ORDER BY AvailableCopies DESC LIMIT 1; return?",
    sql: "SELECT BookTitle FROM Library ORDER BY AvailableCopies DESC LIMIT 1;",
    options: [
      "Introduction to Algorithms",
      "Clean Code",
      "Database System Concepts",
      "Computer Networks"
    ],
    answer: 1,
    explain: "Sorted from most to fewest copies, Clean Code (7) comes first."
  },
  {
    id: 24,
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
    id: 25,
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
    id: 26,
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
    id: 27,
    section: "DML & DQL",
    weeks: [1],
    dataset: "Library",
    q: "What reply does PostgreSQL give for this statement?",
    sql: "UPDATE Library SET AvailableCopies = AvailableCopies - 1\nWHERE Author = 'Silberschatz';",
    options: ["UPDATE 1", "UPDATE 5", "UPDATE 0", "UPDATE 2"],
    answer: 3,
    explain: "Two books are by Silberschatz, so two rows change."
  },
  {
    id: 28,
    section: "DML & DQL",
    weeks: [1],
    dataset: "Library",
    q: "What does UPDATE Library SET AvailableCopies = 0; do?",
    sql: "UPDATE Library SET AvailableCopies = 0;",
    options: [
      "Raises an error because WHERE is missing",
      "Updates only the first row",
      "Updates all 5 rows",
      "Asks for confirmation first"
    ],
    answer: 2,
    explain: "Without WHERE, every row is changed. Preview with SELECT first, or wrap it in BEGIN … ROLLBACK."
  },
  {
    id: 29,
    section: "DML & DQL",
    weeks: [1],
    dataset: "Library",
    q: "Which row does DELETE FROM Library WHERE AvailableCopies < 4; remove?",
    sql: "DELETE FROM Library WHERE AvailableCopies < 4;",
    options: [
      "Introduction to Algorithms",
      "Operating System Concepts",
      "Both Introduction to Algorithms and Operating System Concepts",
      "No rows"
    ],
    answer: 0,
    explain: "Only Introduction to Algorithms has fewer than 4 copies (3). Operating System Concepts has exactly 4. The reply is DELETE 1."
  },
  {
    id: 30,
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
    id: 31,
    section: "DML & DQL",
    weeks: [1],
    dataset: "Library",
    q: "What happens when you insert a new row with BookID = 1 into Library?",
    sql: null,
    options: [
      "A duplicate-key error; the row is rejected",
      "The old row is replaced",
      "A second row with BookID = 1 is added",
      "BookID is set to NULL"
    ],
    answer: 0,
    explain: "BookID is the primary key, so a duplicate value violates its uniqueness (SQLSTATE 23505)."
  },
  {
    id: 32,
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
    id: 33,
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
    id: 34,
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
    id: 35,
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

  // Section 3: Aggregation & Relational Joins · Q36–Q55
  {
    id: 36,
    section: "Aggregation & Joins",
    weeks: [3],
    dataset: "uni3",
    q: "What does SELECT COUNT(Marks) FROM ENROLLMENT; return?",
    sql: "SELECT COUNT(Marks) FROM ENROLLMENT;",
    options: ["8", "6", "7", "5"],
    answer: 2,
    explain: "COUNT(column) counts non-NULL values only; COUNT(*) would return 8."
  },
  {
    id: 37,
    section: "Aggregation & Joins",
    weeks: [3],
    dataset: "uni3",
    q: "AVG(Marks) returns 76.57, but AVG(COALESCE(Marks, 0)) returns 67.00. Why?",
    sql: null,
    options: [
      "AVG always rounds up",
      "AVG ignores NULL, so it divides 536 by 7, while COALESCE turns the NULL into 0 and divides by 8",
      "NULL is treated as 100 by AVG",
      "COALESCE causes a rounding error"
    ],
    answer: 1,
    explain: "Aggregates skip NULL. Replace it with COALESCE only if 'missing' should really count as zero."
  },
  {
    id: 38,
    section: "Aggregation & Joins",
    weeks: [3],
    dataset: "uni3",
    q: "What does SELECT COUNT(DISTINCT StuID) FROM ENROLLMENT; return?",
    sql: "SELECT COUNT(DISTINCT StuID) FROM ENROLLMENT;",
    options: ["6", "8", "4", "5"],
    answer: 3,
    explain: "S101–S105 are enrolled; S106 has no enrolment rows."
  },
  {
    id: 39,
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
    id: 40,
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
    id: 41,
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
    id: 42,
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
    id: 43,
    section: "Aggregation & Joins",
    weeks: [3],
    dataset: "uni3",
    q: "How many rows does this return?",
    sql: "SELECT CourseID, ROUND(AVG(Marks), 2) AS AvgMarks\nFROM ENROLLMENT\nWHERE Marks IS NOT NULL\nGROUP BY CourseID\nHAVING AVG(Marks) > 75;",
    options: ["1", "2", "3", "4"],
    answer: 1,
    explain: "Course averages are CSE-4105 88, CSE-3101 76, CSE-3103 75 and EEE-2101 72.5. Only 88 and 76 are greater than 75."
  },
  {
    id: 44,
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
    id: 45,
    section: "Aggregation & Joins",
    weeks: [3],
    dataset: "uni3",
    q: "What does SELECT SUM(Marks) FROM ENROLLMENT; return?",
    sql: "SELECT SUM(Marks) FROM ENROLLMENT;",
    options: ["NULL, because one mark is NULL", "613", "0", "536"],
    answer: 3,
    explain: "SUM ignores the NULL row: 82 + 75 + 91 + 88 + 68 + 55 + 77 = 536."
  },
  {
    id: 46,
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
    id: 47,
    section: "Aggregation & Joins",
    weeks: [4],
    dataset: "joins",
    q: "In Students s LEFT JOIN Enrollments e ON s.student_id = e.student_id, how does Nabila (no enrolments) appear?",
    sql: null,
    options: [
      "She does not appear",
      "She appears twice",
      "Once, with NULL in all the Enrollments columns",
      "The query fails"
    ],
    answer: 2,
    explain: "A left join keeps every left-table row and pads the missing right side with NULL."
  },
  {
    id: 48,
    section: "Aggregation & Joins",
    weeks: [4],
    dataset: "joins",
    q: "How many rows does SELECT s.name, c.course_name FROM Students s CROSS JOIN Courses c; return?",
    sql: "SELECT s.name, c.course_name FROM Students s CROSS JOIN Courses c;",
    options: ["11", "30", "6", "5"],
    answer: 1,
    explain: "A cross join pairs every student with every course: 6 × 5 = 30."
  },
  {
    id: 49,
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
    explain: "A left join plus an IS NULL check on the right side isolates rows that had nothing to match (here: Nabila)."
  },
  {
    id: 50,
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
    id: 51,
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
    id: 52,
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
    id: 53,
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
    id: 54,
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
    id: 55,
    section: "Aggregation & Joins",
    weeks: [4],
    dataset: "joins",
    q: "How many rows does this return?",
    sql: "SELECT s.name, e.course_id\nFROM Students s\nLEFT JOIN Enrollments e ON s.student_id = e.student_id;",
    options: ["6", "8", "9", "14"],
    answer: 2,
    explain: "The 8 enrolment rows match 5 students, and Nabila is added once with NULL: 8 + 1 = 9."
  },

  // Section 4: Database Transactions · Q56–Q70
  {
    id: 56,
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
    id: 57,
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
    id: 58,
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
    id: 59,
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
    id: 60,
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
    id: 61,
    section: "Transactions",
    weeks: [7],
    dataset: "txn_lab",
    q: "What are the balances after this script?",
    sql: "BEGIN;\nUPDATE account SET balance = balance + 500000;\nROLLBACK;",
    options: [
      "Every balance is 500000 higher",
      "The original balances (A-101 1000 … E-505 3000)",
      "All balances are 0",
      "Only the first account changed"
    ],
    answer: 1,
    explain: "ROLLBACK throws away every change made since BEGIN."
  },
  {
    id: 62,
    section: "Transactions",
    weeks: [7],
    dataset: "txn_lab",
    q: "In autocommit mode, a clerk transfers 500 Tk from A-101 to B-202 but types 'B-2O2' (letter O) in the second statement. What is SUM(balance) afterwards?",
    sql: "UPDATE account SET balance = balance - 500 WHERE acc_no = 'A-101';\nUPDATE account SET balance = balance + 500 WHERE acc_no = 'B-2O2';",
    options: ["8000", "8500", "7500", "7000"],
    answer: 2,
    explain: "The first update is saved; the second updates 0 rows with no error, so 500 Tk 'vanishes'."
  },
  {
    id: 63,
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
    id: 64,
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
    id: 65,
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
    id: 66,
    section: "Transactions",
    weeks: [7],
    dataset: "txn_lab",
    q: "The Keyboard (product 5) starts with stock 50. What is the final stock?",
    sql: "BEGIN;\nUPDATE product SET stock = stock + 10 WHERE product_id = 5;\nSAVEPOINT s1;\nUPDATE product SET stock = stock + 10 WHERE product_id = 5;\nROLLBACK TO SAVEPOINT s1;\nCOMMIT;",
    options: ["50", "70", "60", "80"],
    answer: 2,
    explain: "Only the second batch is undone: 50 + 10 = 60 (Week 7 Lab, Part A)."
  },
  {
    id: 67,
    section: "Transactions",
    weeks: [7],
    dataset: "txn_lab",
    q: "Stock starts at 60. What is the stock right after ROLLBACK TO SAVEPOINT s3?",
    sql: "BEGIN;\nUPDATE product SET stock = stock + 5  WHERE product_id = 5;  SAVEPOINT s1;\nUPDATE product SET stock = stock + 15 WHERE product_id = 5;  SAVEPOINT s2;\nUPDATE product SET stock = stock - 8  WHERE product_id = 5;  SAVEPOINT s3;\nUPDATE product SET stock = stock + 20 WHERE product_id = 5;\nROLLBACK TO SAVEPOINT s3;",
    options: ["92", "80", "65", "72"],
    answer: 3,
    explain: "60 + 5 + 15 − 8 = 72. Only the wrong +20 is undone (Week 7 Lab, Part B)."
  },
  {
    id: 68,
    section: "Transactions",
    weeks: [7],
    dataset: "txn_lab",
    q: "Nila (D-404) has 500. What is saved after this script?",
    sql: "BEGIN;\nUPDATE account SET balance = balance + 1500 WHERE acc_no = 'E-505';\nUPDATE account SET balance = balance - 1500 WHERE acc_no = 'D-404';\nCOMMIT;",
    options: [
      "Nothing; PostgreSQL turns the COMMIT of a failed transaction into a ROLLBACK",
      "Only Sumi's +1500",
      "Both updates",
      "Nila's balance becomes −1000"
    ],
    answer: 0,
    explain: "The transfer is all-or-nothing, so Sumi's credit is undone too (atomicity). The negative balance triggers CHECK (balance >= 0) violation."
  },
  {
    id: 69,
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
    id: 70,
    section: "Transactions",
    weeks: [7],
    dataset: "txn_lab",
    q: "Tab 1 runs BEGIN; UPDATE account SET balance = balance + 1000 WHERE acc_no = 'C-303'; and has not committed. Tab 2 then runs SELECT balance FROM account WHERE acc_no = 'C-303';. What does Tab 2 see?",
    sql: null,
    options: [
      "2500",
      "1500",
      "1000",
      "Tab 2 waits until Tab 1 finishes"
    ],
    answer: 1,
    explain: "Uncommitted changes are invisible to other sessions (isolation), and a plain SELECT in PostgreSQL does not wait for the writer."
  }
];
