export interface GlossaryTerm {
  term: string;
  category: "DDL" | "DML & DQL" | "Aggregates" | "Joins" | "Programs" | "Transactions" | "General";
  def: string;
  sql: string;
  week: number;
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: "ACID",
    category: "Transactions",
    def: "The four key guarantees of a relational transaction: Atomicity, Consistency, Isolation, and Durability.",
    sql: "BEGIN;\n-- All operations execute atomically\nCOMMIT;",
    week: 7
  },
  {
    term: "ALTER TABLE",
    category: "DDL",
    def: "Modifies the structure of an existing table (add, drop, rename columns, modify types or add constraints).",
    sql: "ALTER TABLE Library ADD COLUMN Edition INT DEFAULT 1;",
    week: 2
  },
  {
    term: "Anti Join",
    category: "Joins",
    def: "A query that returns only rows from the left table that have NO match in the right table (e.g. using NOT EXISTS or LEFT JOIN ... WHERE right.id IS NULL).",
    sql: "SELECT s.* FROM Students s LEFT JOIN Enrollments e ON s.student_id = e.student_id WHERE e.enrollment_id IS NULL;",
    week: 4
  },
  {
    term: "Atomicity",
    category: "Transactions",
    def: "ACID property ensuring that all operations within a transaction either succeed completely or are completely undone upon failure.",
    sql: "BEGIN;\nUPDATE account SET balance = balance - 100;\nROLLBACK; -- Discards change",
    week: 7
  },
  {
    term: "Autocommit",
    category: "Transactions",
    def: "PostgreSQL's default execution mode where each individual statement is permanently written as its own committed transaction immediately.",
    sql: "UPDATE Library SET AvailableCopies = 0; -- Cannot be rolled back in autocommit!",
    week: 1
  },
  {
    term: "CHECK Constraint",
    category: "DDL",
    def: "An integrity rule specifying a Boolean condition that every value in a column or row must satisfy.",
    sql: "balance NUMERIC(12,2) CHECK (balance >= 0)",
    week: 7
  },
  {
    term: "COALESCE",
    category: "Aggregates",
    def: "Returns the first non-null argument among its inputs. Frequently used to convert NULL to 0 in math and averages.",
    sql: "SELECT AVG(COALESCE(Marks, 0)) FROM ENROLLMENT;",
    week: 3
  },
  {
    term: "Correlated Subquery",
    category: "DML & DQL",
    def: "A subquery that references columns from the outer query, evaluating once for every row processed by the outer query.",
    sql: "SELECT * FROM STUDENT s WHERE NOT EXISTS (SELECT 1 FROM ENROLLMENT e WHERE e.StuID = s.StuID);",
    week: 3
  },
  {
    term: "CROSS JOIN",
    category: "Joins",
    def: "Returns the Cartesian product of two tables (every row of table A paired with every row of table B).",
    sql: "SELECT * FROM Students CROSS JOIN Courses;",
    week: 4
  },
  {
    term: "DISTINCT",
    category: "DML & DQL",
    def: "Eliminates duplicate rows from the query results.",
    sql: "SELECT DISTINCT Author FROM Library;",
    week: 1
  },
  {
    term: "FULL OUTER JOIN",
    category: "Joins",
    def: "Combines the results of both LEFT and RIGHT joins, keeping all matching rows plus unmatched rows from both tables padded with NULL.",
    sql: "SELECT * FROM Students FULL OUTER JOIN Enrollments USING (student_id);",
    week: 4
  },
  {
    term: "GROUP BY",
    category: "Aggregates",
    def: "Groups rows that have the same values into summary rows, typically used with aggregate functions like COUNT, MAX, MIN, SUM, AVG.",
    sql: "SELECT CourseID, AVG(Marks) FROM ENROLLMENT GROUP BY CourseID;",
    week: 3
  },
  {
    term: "HAVING",
    category: "Aggregates",
    def: "Specifies a search condition for a group or an aggregate, filtering after GROUP BY has taken place.",
    sql: "SELECT CourseID, AVG(Marks) FROM ENROLLMENT GROUP BY CourseID HAVING AVG(Marks) > 75;",
    week: 3
  },
  {
    term: "Materialized View",
    category: "Programs",
    def: "A view that physically stores the result of the query on disk. Requires manual REFRESH to update when underlying tables change.",
    sql: "CREATE MATERIALIZED VIEW Dept_Avg AS SELECT dept, AVG(cgpa) FROM Student GROUP BY dept;\nREFRESH MATERIALIZED VIEW Dept_Avg;",
    week: 5
  },
  {
    term: "pg_dump",
    category: "Programs",
    def: "PostgreSQL CLI utility for backing up a database into a SQL script or custom archive without blocking concurrent readers.",
    sql: "pg_dump -h localhost -U postgres -Fc -f backup.dump libraryDB",
    week: 6
  },
  {
    term: "PRIMARY KEY",
    category: "DDL",
    def: "A constraint that uniquely identifies each record in a table. Enforces both UNIQUE and NOT NULL, and creates a B-tree index.",
    sql: "BookID INT PRIMARY KEY",
    week: 1
  },
  {
    term: "RELEASE SAVEPOINT",
    category: "Transactions",
    def: "Destroys a savepoint name without rolling back the work done after it. Keeps changes intact while freeing savepoint resources.",
    sql: "RELEASE SAVEPOINT s1;",
    week: 7
  },
  {
    term: "ROLLBACK TO SAVEPOINT",
    category: "Transactions",
    def: "Undoes all transactions and database modifications executed after the named savepoint was created, keeping the overall transaction open.",
    sql: "ROLLBACK TO SAVEPOINT s1;",
    week: 7
  },
  {
    term: "search_path",
    category: "DDL",
    def: "PostgreSQL configuration parameter specifying which schemas to search in order for an unqualified table or object name.",
    sql: "SET search_path TO txn_lab, public;",
    week: 2
  },
  {
    term: "SQLSTATE 25P02",
    category: "Transactions",
    def: "PostgreSQL error indicating 'current transaction is aborted, commands ignored until end of transaction block'. Requires ROLLBACK.",
    sql: "ROLLBACK;",
    week: 7
  },
  {
    term: "TRUNCATE",
    category: "DDL",
    def: "Quickly removes all rows from a table without scanning, retaining table structure and column definitions.",
    sql: "TRUNCATE TABLE Library;",
    week: 2
  },
  {
    term: "UNION vs UNION ALL",
    category: "Joins",
    def: "UNION combines result sets and discards duplicates. UNION ALL retains all rows including duplicates and executes significantly faster.",
    sql: "SELECT name FROM Students UNION ALL SELECT name FROM Faculty;",
    week: 4
  }
];
