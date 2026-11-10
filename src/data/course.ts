export interface CourseSnippet {
  id: string;
  slide: number;
  title: string;
  sql: string;
  expected?: {
    columns: string[];
    rows: any[][];
  };
  explain: string;
}

export interface WeekData {
  id: number;
  label: string;
  title: string;
  status: "published" | "upcoming";
  co: string[];
  cluster: "foundations" | "relational" | "sql" | "storage" | "transactions" | "modern" | "revision";
  dataset: "library" | "uni3" | "joins" | "programs" | "triggers" | "txn_lab";
  summary: string;
  topics: string[];
  decks: {
    title: string;
    pdf: string;
    pptx: string;
    slides: number;
    size: string;
  }[];
  handouts: {
    title: string;
    pdf: string;
    size: string;
  }[];
  snippets: CourseSnippet[];
  labs: string[];
  labTasks: {
    n: number;
    text: string;
    checkSql?: string;
  }[];
  keyTakeaways: string[];
  predict: {
    sql: string;
    choices: string[];
    answer: number;
    explain: string;
  }[];
  flashcards: {
    front: string;
    back: string;
  }[];
}

export const course = {
  code: "CSE 2206",
  title: "Database Management Systems Sessional",
  semester: "Summer 2026",
  theoryPartner: { code: "CSE 2205", url: "" },
  instructors: [
    {
      name: "Md. Rakib Trofder",
      role: "Lecturer, Dept. of CSE",
      email: "trofder@baust.edu.bd",
      room: "303 (C)",
      hours: ["Sun 10:50 AM – 1:20 PM", "Thu 10:50 AM – 1:20 PM"]
    },
    {
      name: "Saad Ahmed",
      role: "Lecturer, Dept. of CSE",
      email: "saad@baust.edu.bd",
      room: "Faculty Room 3",
      hours: ["Mon 11:00 AM – 1:00 PM", "Wed 2:00 PM – 4:00 PM"]
    }
  ],
  dbms: { name: "PostgreSQL", version: "16", clients: ["psql", "DBeaver"] },
  assessment: [
    { method: "Attendance", pct: 5, color: "#6366F1" },
    { method: "Lab Performance", pct: 15, color: "#8B5CF6" },
    { method: "Lab Report", pct: 15, color: "#3B82F6" },
    { method: "Quiz", pct: 10, color: "#14B8A6" },
    { method: "Lab Test (1 + 2)", pct: 25, color: "#F59E0B" },
    { method: "Project", pct: 20, color: "#F43F5E" },
    { method: "Viva", pct: 10, color: "#64748B" }
  ],
  outcomes: [
    {
      co: "CO1",
      statement: "Apply SQL data definition, manipulation and control commands with appropriate integrity constraints to create, maintain and query relational databases using modern DBMS tools.",
      po: "PO5",
      bloom: "C3, P3"
    },
    {
      co: "CO2",
      statement: "Design ER models and normalized relational schemas for real-world problems and implement them in a relational DBMS.",
      po: "PO3",
      bloom: "C5, C6, P4"
    },
    {
      co: "CO3",
      statement: "Construct complex queries and database programs using joins, subqueries, views, PL/SQL, stored procedures, functions, triggers and transaction control.",
      po: "PO2",
      bloom: "C3, C4, P4"
    },
    {
      co: "CO4",
      statement: "Develop a database-driven application as a team and present it through report, demonstration and viva.",
      po: "PO8",
      bloom: "A3, P3"
    }
  ],
  datasets: [
    { id: "library", title: "Library", file: "data/datasets/library.sql", weeks: [1, 2] },
    { id: "uni3", title: "Student · Course · Enrollment", file: "data/datasets/uni3.sql", weeks: [3] },
    { id: "joins", title: "University Joins Schema", file: "data/datasets/joins.sql", weeks: [4] },
    { id: "programs", title: "Programs & Procedures Schema", file: "data/datasets/programs.sql", weeks: [5] },
    { id: "triggers", title: "Employee Salary Audit", file: "data/datasets/triggers.sql", weeks: [6] },
    { id: "txn_lab", title: "Transactions Lab (Accounts & Inventory)", file: "data/datasets/txn_lab.sql", weeks: [7] }
  ],
  weeks: [
    // Week 1
    {
      id: 1,
      label: "Week 1",
      title: "PostgreSQL & SQL Basics",
      status: "published",
      co: ["CO1"],
      cluster: "foundations",
      dataset: "library",
      summary: "Understand the hierarchy from Server to Columns, learn psql shortcuts, query the Library database with SELECT, WHERE, ORDER BY, LIMIT, and practice safe INSERT, UPDATE and DELETE.",
      topics: [
        "Server → Database → Schema → Table → Column hierarchy",
        "psql connection & shortcuts (\\l, \\c, \\dn, \\dt, \\d)",
        "SELECT *, DISTINCT, Column aliasing (AS)",
        "WHERE filters with comparison operators",
        "ORDER BY ASC/DESC & LIMIT/OFFSET",
        "Clause execution order: Written vs Executed",
        "INSERT, UPDATE with WHERE, DELETE with WHERE",
        "Three safe habits for write queries"
      ],
      decks: [
        {
          title: "PostgreSQL & SQL Basics",
          pdf: "/slides/pdf/Week_1_PostgreSQL_SQL_Basics.pdf",
          pptx: "/slides/Week_1_PostgreSQL_SQL_Basics.pptx",
          slides: 19,
          size: "4.8 MB"
        }
      ],
      handouts: [],
      snippets: [
        {
          id: "w1-select-all",
          slide: 7,
          title: "Select all rows and columns",
          sql: "SELECT * FROM Library;",
          expected: {
            columns: ["bookid", "booktitle", "author", "category", "publisher", "availablecopies"],
            rows: [
              [1, "Database System Concepts", "Silberschatz", "Database", "McGraw Hill", 6],
              [2, "Computer Networks", "Andrew Tanenbaum", "Networking", "Pearson", 5],
              [3, "Operating System Concepts", "Silberschatz", "Operating System", "Wiley", 4],
              [4, "Introduction to Algorithms", "Cormen", "Algorithms", "MIT Press", 3],
              [5, "Clean Code", "Robert C. Martin", "Programming", "Prentice Hall", 7]
            ]
          },
          explain: "Retrieves every column and all 5 rows currently stored in the Library table."
        },
        {
          id: "w1-distinct-author",
          slide: 8,
          title: "Unique Authors",
          sql: "SELECT DISTINCT Author FROM Library;",
          expected: {
            columns: ["author"],
            rows: [["Andrew Tanenbaum"], ["Cormen"], ["Robert C. Martin"], ["Silberschatz"]]
          },
          explain: "DISTINCT collapses duplicates. Silberschatz authored two books, returning 4 unique rows."
        },
        {
          id: "w1-where-filter",
          slide: 9,
          title: "Filtering with WHERE",
          sql: "SELECT BookTitle, AvailableCopies FROM Library WHERE AvailableCopies > 4;",
          expected: {
            columns: ["booktitle", "availablecopies"],
            rows: [
              ["Database System Concepts", 6],
              ["Computer Networks", 5],
              ["Clean Code", 7]
            ]
          },
          explain: "WHERE tests each row before passing it to SELECT. Returns 3 books with > 4 copies."
        },
        {
          id: "w1-top-n",
          slide: 11,
          title: "Top-2 Available Books with ORDER BY & LIMIT",
          sql: "SELECT BookTitle, AvailableCopies FROM Library\nWHERE AvailableCopies > 3\nORDER BY AvailableCopies DESC\nLIMIT 2;",
          expected: {
            columns: ["booktitle", "availablecopies"],
            rows: [
              ["Clean Code", 7],
              ["Database System Concepts", 6]
            ]
          },
          explain: "Filters rows > 3, sorts in descending order of copies, and takes top 2."
        },
        {
          id: "w1-update-silber",
          slide: 15,
          title: "UPDATE with WHERE filter",
          sql: "UPDATE Library SET AvailableCopies = AvailableCopies - 1\nWHERE Author = 'Silberschatz';\nSELECT BookTitle, AvailableCopies FROM Library WHERE Author = 'Silberschatz';",
          expected: {
            columns: ["booktitle", "availablecopies"],
            rows: [
              ["Database System Concepts", 5],
              ["Operating System Concepts", 3]
            ]
          },
          explain: "Safely decrements copies for Silberschatz's two books. Command tag: UPDATE 2."
        }
      ],
      labs: ["where-lens", "clause-order", "safe-write"],
      labTasks: [
        { n: 1, text: "Display all book titles and their categories from the Library table." },
        { n: 2, text: "Find all books published by 'Pearson' or 'Wiley'." },
        { n: 3, text: "List all books with available copies between 4 and 6, sorted from lowest to highest copies." },
        { n: 4, text: "Insert a new book: BookID 6, 'Design Patterns', Author 'GoF', Category 'Software', Publisher 'Addison-Wesley', Copies 5." },
        { n: 5, text: "Update the AvailableCopies of 'Clean Code' to 10." },
        { n: 6, text: "Delete all books that have AvailableCopies equal to 0." },
        { n: 7, text: "Display the 3 books with the fewest available copies." },
        { n: 8, text: "Find all unique publishers who have books in the 'Database' or 'Programming' categories." }
      ],
      keyTakeaways: [
        "Unquoted identifiers fold to lowercase in PostgreSQL (Library is stored as library).",
        "String literals must use single quotes ('Pearson'). Double quotes are for object names.",
        "Clauses are written SELECT ... FROM ... WHERE, but executed FROM → WHERE → SELECT → ORDER BY → LIMIT.",
        "Always preview an UPDATE or DELETE with a SELECT using the exact same WHERE clause first."
      ],
      predict: [
        {
          sql: "SELECT BookTitle FROM Library WHERE AvailableCopies < 4;",
          choices: ["Clean Code", "Operating System Concepts", "Introduction to Algorithms", "Computer Networks"],
          answer: 2,
          explain: "Only Introduction to Algorithms has 3 copies (< 4). Operating System Concepts has 4."
        },
        {
          sql: "SELECT COUNT(*) FROM Library WHERE Author = 'silberschatz';",
          choices: ["2", "1", "0", "5"],
          answer: 2,
          explain: "Text comparisons in SQL are case-sensitive. The author is stored with capital 'Silberschatz'."
        }
      ],
      flashcards: [
        { front: "\\dt in psql", back: "Lists all tables in the current connected database and schema." },
        { front: "ORDER BY default direction", back: "Ascending (ASC). To sort largest first, specify DESC." },
        { front: "LIMIT vs OFFSET", back: "LIMIT controls how many rows to return; OFFSET controls how many initial rows to skip." }
      ]
    },

    // Week 2
    {
      id: 2,
      label: "Week 2",
      title: "DDL: Tables, Constraints, Schemas & Databases",
      status: "published",
      co: ["CO1"],
      cluster: "relational",
      dataset: "library",
      summary: "Master Data Definition Language: CREATE TABLE with constraints, ALTER TABLE operations, type conversion with USING, TRUNCATE vs DELETE vs DROP, and PostgreSQL schemas.",
      topics: [
        "DDL vs DML fundamentals",
        "CREATE TABLE IF NOT EXISTS with PRIMARY KEY, NOT NULL, DEFAULT",
        "Reading catalog: \\d tablename & information_schema.columns",
        "ALTER TABLE: ADD, DROP, RENAME column & RENAME TO",
        "ALTER COLUMN TYPE with USING cast expressions",
        "ADD CONSTRAINT PRIMARY KEY & NOT NULL toggling",
        "DELETE vs TRUNCATE vs DROP comparisons",
        "PostgreSQL Schemas: search_path, CREATE/DROP SCHEMA CASCADE"
      ],
      decks: [
        {
          title: "DDL: Tables, Schemas & Databases",
          pdf: "/slides/pdf/Week_2_DDL_Tables_Schemas_Databases.pdf",
          pptx: "/slides/Week_2_DDL_Tables_Schemas_Databases.pptx",
          slides: 18,
          size: "4.5 MB"
        }
      ],
      handouts: [],
      snippets: [
        {
          id: "w2-add-column",
          slide: 6,
          title: "ALTER TABLE: Add Edition Column",
          sql: "ALTER TABLE Library ADD COLUMN Edition INT DEFAULT 1;\nSELECT BookID, BookTitle, Edition FROM Library LIMIT 3;",
          expected: {
            columns: ["bookid", "booktitle", "edition"],
            rows: [
              [1, "Database System Concepts", 1],
              [2, "Computer Networks", 1],
              [3, "Operating System Concepts", 1]
            ]
          },
          explain: "Adds the Edition column and populates existing rows with the DEFAULT 1."
        },
        {
          id: "w2-alter-type-using",
          slide: 8,
          title: "Type conversion with USING",
          sql: "ALTER TABLE Library ALTER COLUMN AvailableCopies TYPE VARCHAR(20) USING AvailableCopies::VARCHAR;\n\\d library",
          explain: "Converts integer column to text using explicit cast USING."
        }
      ],
      labs: ["ddl-morpher", "delete-truncate-drop", "schema-explorer"],
      labTasks: [
        { n: 1, text: "Create table Student(Roll INT PRIMARY KEY, Name VARCHAR(50) NOT NULL, Dept VARCHAR(10) DEFAULT 'CSE')." },
        { n: 2, text: "Add a column Email VARCHAR(100) to Student." },
        { n: 3, text: "Rename the column Dept to Department in Student." },
        { n: 4, text: "Modify Roll to BIGINT using USING Roll::BIGINT." },
        { n: 5, text: "Add a NOT NULL constraint on Department after verifying no nulls exist." },
        { n: 6, text: "Create schema academics, then move the Student table into academics." },
        { n: 7, text: "Demonstrate that search_path determines which schema is checked first." },
        { n: 8, text: "Drop the academics schema with CASCADE." }
      ],
      keyTakeaways: [
        "In PostgreSQL, DDL is transactional! You can test ALTER TABLE inside BEGIN ... ROLLBACK.",
        "Adding a NOT NULL column without DEFAULT fails on non-empty tables.",
        "TRUNCATE resets table data instantly and cannot take a WHERE clause.",
        "DROP SCHEMA without CASCADE fails if objects are still inside the schema."
      ],
      predict: [
        {
          sql: "TRUNCATE Library;\nSELECT COUNT(*) FROM Library;",
          choices: ["5", "0", "Error: relation does not exist", "NULL"],
          answer: 1,
          explain: "TRUNCATE empties all rows, returning 0, but leaves the table structure intact."
        }
      ],
      flashcards: [
        { front: "search_path", back: "An ordered list of schemas PostgreSQL searches to find unqualified table names." },
        { front: "USING in ALTER COLUMN", back: "Specifies an expression to convert existing data from the old type to the new type." }
      ]
    },

    // Week 3
    {
      id: 3,
      label: "Week 3",
      title: "Aggregation, Grouping & Subqueries",
      status: "published",
      co: ["CO1", "CO3"],
      cluster: "sql",
      dataset: "uni3",
      summary: "Summarize data with aggregate functions, group rows and filter groups with HAVING, and nest subqueries (Scalar, IN/NOT IN, ANY/ALL, EXISTS and Correlated).",
      topics: [
        "COUNT(*) vs COUNT(col) vs COUNT(DISTINCT col)",
        "SUM, AVG, ROUND, COALESCE handling with NULL",
        "MIN and MAX on numeric and text columns",
        "GROUP BY single and multiple columns",
        "HAVING vs WHERE: differences in logical execution",
        "Scalar subqueries in WHERE and SELECT",
        "IN and NOT IN (the NULL trap)",
        "ANY and ALL comparison predicates",
        "EXISTS and NOT EXISTS correlated subqueries"
      ],
      decks: [
        {
          title: "Aggregation, Grouping & Subqueries",
          pdf: "/slides/pdf/Week_3_Aggregation_Grouping_Subqueries.pdf",
          pptx: "/slides/Week_3_Aggregation_Grouping_Subqueries.pptx",
          slides: 14,
          size: "3.9 MB"
        }
      ],
      handouts: [],
      snippets: [
        {
          id: "w3-count-null",
          slide: 3,
          title: "COUNT three ways on ENROLLMENT",
          sql: "SELECT COUNT(*) AS AllRows, COUNT(Marks) AS ScoredRows, COUNT(DISTINCT StuID) AS EnrolledStudents\nFROM ENROLLMENT;",
          expected: {
            columns: ["allrows", "scoredrows", "enrolledstudents"],
            rows: [[8, 7, 5]]
          },
          explain: "COUNT(*) counts all 8 rows; COUNT(Marks) ignores the NULL mark (7); COUNT(DISTINCT StuID) counts unique students (5)."
        },
        {
          id: "w3-avg-coalesce",
          slide: 4,
          title: "AVG vs AVG with COALESCE",
          sql: "SELECT ROUND(AVG(Marks), 2) AS RawAvg, ROUND(AVG(COALESCE(Marks, 0)), 2) AS ZeroAvg\nFROM ENROLLMENT;",
          expected: {
            columns: ["rawavg", "zeroavg"],
            rows: [[76.57, 67.00]]
          },
          explain: "Raw average divides 536 by 7 rows (76.57). COALESCE treats NULL as 0 and divides 536 by 8 rows (67.00)."
        },
        {
          id: "w3-group-course",
          slide: 6,
          title: "Course-wise Average Marks with GROUP BY",
          sql: "SELECT CourseID, ROUND(AVG(Marks), 2) AS AvgMarks\nFROM ENROLLMENT\nWHERE Marks IS NOT NULL\nGROUP BY CourseID\nORDER BY AvgMarks DESC;",
          expected: {
            columns: ["courseid", "avgmarks"],
            rows: [
              ["CSE-4105", 88.00],
              ["CSE-3101", 76.00],
              ["CSE-3103", 75.00],
              ["EEE-2101", 72.50]
            ]
          },
          explain: "Computes average marks for each course and sorts from highest to lowest."
        },
        {
          id: "w3-not-exists",
          slide: 12,
          title: "Find Unenrolled Students with NOT EXISTS",
          sql: "SELECT StuID, StuName FROM STUDENT s\nWHERE NOT EXISTS (\n  SELECT 1 FROM ENROLLMENT e WHERE e.StuID = s.StuID\n);",
          expected: {
            columns: ["stuid", "stuname"],
            rows: [["S106", "Nabila"]]
          },
          explain: "For each student, checks if an enrollment record exists. S106 Nabila has no courses."
        }
      ],
      labs: ["aggregate-lens", "groupby-having", "subquery-explorer"],
      labTasks: [
        { n: 1, text: "Count how many courses each department offers in the COURSE table." },
        { n: 2, text: "Calculate total credits offered by the CSE department." },
        { n: 3, text: "Find the maximum and minimum mark in the ENROLLMENT table." },
        { n: 4, text: "List each student's StuID and their average mark, including only students with an average above 75." },
        { n: 5, text: "Find students whose marks are higher than the overall average mark of all enrollments." },
        { n: 6, text: "Find all courses that have more than 2 enrolled students." },
        { n: 7, text: "Using NOT IN, find the names of students who have not enrolled in any course." },
        { n: 8, text: "Find the courses taken by students from the CSE department." }
      ],
      keyTakeaways: [
        "Aggregate functions always ignore NULL values, except for COUNT(*).",
        "HAVING filters grouped buckets after aggregation, while WHERE filters individual rows before grouping.",
        "NOT IN with a subquery containing NULL will return zero rows (the famous NULL trap).",
        "Correlated subqueries execute once for each row evaluated by the outer query."
      ],
      predict: [
        {
          sql: "SELECT AVG(Marks) FROM ENROLLMENT WHERE StuID = 'S104';",
          choices: ["55.00", "27.50", "NULL", "Error"],
          answer: 0,
          explain: "S104 has marks 55 and NULL. Aggregates ignore NULL, so the average is 55 / 1 = 55.00."
        }
      ],
      flashcards: [
        { front: "Scalar Subquery", back: "A subquery that returns exactly one row and one column, usable anywhere a single value is expected." },
        { front: "COALESCE(val, replacement)", back: "Returns the first non-null argument. Essential when NULL should count as zero in aggregations." }
      ]
    },

    // Week 4
    {
      id: 4,
      label: "Week 4",
      title: "SQL Joins and Set Operations",
      status: "published",
      co: ["CO1", "CO3"],
      cluster: "sql",
      dataset: "joins",
      summary: "Connect multiple tables with Inner, Left, Right, Full, Cross and Self joins. Combine query results using UNION, UNION ALL, INTERSECT and EXCEPT.",
      topics: [
        "Inner joins: Theta, Equi and Natural joins",
        "Outer joins: LEFT, RIGHT and FULL OUTER JOIN",
        "CROSS JOIN (Cartesian product) and row multiplication",
        "Self Join: pairing records from the same table",
        "Finding unmatched rows with LEFT JOIN ... WHERE right.key IS NULL",
        "UNION vs UNION ALL (distinct vs all rows)",
        "INTERSECT and EXCEPT set operations",
        "Semi join and Anti join using EXISTS / NOT EXISTS"
      ],
      decks: [
        {
          title: "SQL Joins and Set Operations",
          pdf: "/slides/pdf/Week_4_SQL_Joins_and_Set_Operations.pdf",
          pptx: "/slides/Week_4_SQL_Joins_and_Set_Operations.pptx",
          slides: 7,
          size: "0.3 MB"
        }
      ],
      handouts: [],
      snippets: [
        {
          id: "w4-left-join",
          slide: 3,
          title: "Students LEFT JOIN Enrollments",
          sql: "SELECT s.name, e.course_id\nFROM Students s\nLEFT JOIN Enrollments e ON s.student_id = e.student_id\nORDER BY s.student_id, e.course_id;",
          expected: {
            columns: ["name", "course_id"],
            rows: [
              ["Rakib", 101],
              ["Rakib", 102],
              ["Sadia", 101],
              ["Sadia", 102],
              ["Tanvir", 103],
              ["Mim", 102],
              ["Mim", 104],
              ["Arif", 103],
              ["Nabila", null]
            ]
          },
          explain: "Retains all 6 students. 5 enrolled students produce 8 matches; Nabila has no matches and appears once with NULL (9 rows total)."
        },
        {
          id: "w4-unmatched",
          slide: 4,
          title: "Spot Unmatched Students with IS NULL",
          sql: "SELECT s.student_id, s.name, s.major\nFROM Students s\nLEFT JOIN Enrollments e ON s.student_id = e.student_id\nWHERE e.enrollment_id IS NULL;",
          expected: {
            columns: ["student_id", "name", "major"],
            rows: [[6, "Nabila", "ME"]]
          },
          explain: "A LEFT JOIN with WHERE right.PK IS NULL cleanly isolates parent rows with no child records."
        },
        {
          id: "w4-cross-join",
          slide: 5,
          title: "CROSS JOIN: All Student-Course Combinations",
          sql: "SELECT s.name, c.course_name\nFROM Students s\nCROSS JOIN Courses c;",
          explain: "Produces 6 students × 5 courses = 30 rows representing every possible combination."
        }
      ],
      labs: ["join-visualizer", "set-operations"],
      labTasks: [
        { n: 1, text: "Join Students, Enrollments, and Courses to show Student Name, Course Name, and Grade." },
        { n: 2, text: "Find all courses that currently have zero enrolled students using a LEFT JOIN." },
        { n: 3, text: "List pairs of students who share the same major using a self join (avoid comparing a student to themselves)." },
        { n: 4, text: "Combine the list of student names and faculty names into a single list with no duplicates using UNION." },
        { n: 5, text: "Find any names that are shared by both a student and a faculty member using INTERSECT." }
      ],
      keyTakeaways: [
        "INNER JOIN returns only rows that satisfy the join condition on both sides.",
        "LEFT JOIN keeps every row from the left table and pads unmatched right-side columns with NULL.",
        "FULL OUTER JOIN combines LEFT and RIGHT outer joins.",
        "UNION removes duplicate rows; UNION ALL preserves duplicates and is faster."
      ],
      predict: [
        {
          sql: "SELECT COUNT(*) FROM Students CROSS JOIN Courses;",
          choices: ["11", "30", "6", "5"],
          answer: 1,
          explain: "6 students × 5 courses = 30 total rows in the Cartesian product."
        }
      ],
      flashcards: [
        { front: "Anti Join", back: "Returns rows from the first table that have NO matching rows in the second table." },
        { front: "Natural Join Risk", back: "Automatically joins on all columns with identical names, which may cause unexpected empty results if unintended columns share a name." }
      ]
    },

    // Week 5
    {
      id: 5,
      label: "Week 5",
      title: "Procedures, Functions, Triggers & Views",
      status: "published",
      co: ["CO3"],
      cluster: "modern",
      dataset: "programs",
      summary: "Write database programs in PL/pgSQL: stored procedures with CALL and INOUT parameters, user-defined functions used in SELECT, triggers, and standard vs materialized views.",
      topics: [
        "Stored Procedures with CREATE PROCEDURE and CALL",
        "INOUT parameters in procedures",
        "User-defined Functions with RETURNS used in SELECT",
        "Triggers: BEFORE INSERT timestamping & AFTER UPDATE audit logs",
        "Views (dynamic query windows)",
        "Materialized Views with REFRESH and staleness demonstration",
        "Views vs Materialized Views performance comparison"
      ],
      decks: [
        {
          title: "Stored Procedures, Functions, Triggers & Views",
          pdf: "/slides/pdf/Week_5_Stored Procedures, Functions, Triggers, Views & Materialized Views.pdf",
          pptx: "/slides/Week_5_Stored Procedures, Functions, Triggers, Views & Materialized Views.pptx",
          slides: 9,
          size: "2.0 MB"
        }
      ],
      handouts: [],
      snippets: [
        {
          id: "w5-view-demo",
          slide: 6,
          title: "Create and query a View",
          sql: "CREATE OR REPLACE VIEW CSE_Honors AS\nSELECT id, name, cgpa FROM Student WHERE dept = 'CSE' AND cgpa >= 3.5;\nSELECT * FROM CSE_Honors;",
          expected: {
            columns: ["id", "name", "cgpa"],
            rows: [
              [1, "Rafi", 3.85],
              [4, "Fariha", 3.92]
            ]
          },
          explain: "Defines a dynamic view that automatically computes and reflects the latest student data on every query."
        }
      ],
      labs: ["proc-func-trigger", "view-vs-matview"],
      labTasks: [
        { n: 1, text: "Write a PL/pgSQL procedure AddStudent(p_name, p_dept, p_cgpa) that inserts a new student." },
        { n: 2, text: "Write a function GetGrade(marks INT) RETURNS VARCHAR(2) that converts marks to letter grades (>=80 A+, >=75 A, >=70 A-, etc)." },
        { n: 3, text: "Create a view Student_Transcript showing Student Name, Course, Marks, and their Letter Grade using the function." },
        { n: 4, text: "Create a materialized view Dept_Stats that calculates the average CGPA per department and test REFRESH." }
      ],
      keyTakeaways: [
        "Functions return a value and can be embedded in SELECT statements; procedures are invoked with CALL.",
        "Triggers execute automatically in response to database events (INSERT, UPDATE, DELETE).",
        "Standard views re-run their underlying query every time they are selected.",
        "Materialized views store physical query results for blazing speed, but require REFRESH to update stale data."
      ],
      predict: [
        {
          sql: "CREATE VIEW V AS SELECT 1 AS num;\n-- If data changes in base table, does standard view reflect it?\nSELECT 'Yes';",
          choices: ["Yes, immediately", "No, needs REFRESH", "Only after restart", "Never"],
          answer: 0,
          explain: "Standard views do not store physical rows; they execute the stored query dynamically on every access."
        }
      ],
      flashcards: [
        { front: "Materialized View", back: "A view that stores the result physically on disk. Requires REFRESH to synchronize with base table modifications." },
        { front: "INOUT Parameter", back: "A parameter that passes a value into a procedure and returns a modified value back to the caller." }
      ]
    },

    // Week 6
    {
      id: 6,
      label: "Week 6",
      title: "PostgreSQL Triggers, Backup & Restore",
      status: "published",
      co: ["CO1", "CO3"],
      cluster: "storage",
      dataset: "triggers",
      summary: "Deep dive into row-level triggers with NEW, OLD and TG_OP. Learn pg_dump backup formats (plain SQL, custom -Fc, directory) and restore strategies.",
      topics: [
        "Trigger architecture: Event, Timing (BEFORE/AFTER), Level (ROW/STATEMENT)",
        "Special trigger variables: NEW, OLD, TG_OP",
        "RETURN NULL in BEFORE triggers to cancel operations",
        "Listing triggers in pg_trigger catalog & DISABLE/ENABLE TRIGGER",
        "Backup with pg_dump: Plain SQL, Custom (-Fc), Directory (-Fd -j 4)",
        "Cluster backup with pg_dumpall",
        "Restoring with psql -f and pg_restore (--clean --if-exists)"
      ],
      decks: [
        {
          title: "Triggers, Backup & Restore",
          pdf: "/slides/pdf/Week_6_PostgreSQL Triggers, Backup & Restore.pdf",
          pptx: "/slides/Week_6_PostgreSQL Triggers, Backup & Restore.pptx",
          slides: 6,
          size: "0.4 MB"
        }
      ],
      handouts: [],
      snippets: [
        {
          id: "w6-audit-trigger",
          slide: 3,
          title: "Trigger Function with NEW and OLD",
          sql: `CREATE OR REPLACE FUNCTION audit_salary_change()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.salary <> OLD.salary THEN
    INSERT INTO salary_audit(emp_id, old_salary, new_salary, op)
    VALUES (OLD.id, OLD.salary, NEW.salary, TG_OP);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_salary_audit
AFTER UPDATE OF salary ON employee
FOR EACH ROW
EXECUTE FUNCTION audit_salary_change();

UPDATE employee SET salary = salary + 5000 WHERE id = 1;
SELECT * FROM salary_audit;`,
          expected: {
            columns: ["emp_id", "old_salary", "new_salary", "op", "changed_at"],
            rows: [[1, 40000, 45000, "UPDATE", ""]]
          },
          explain: "The AFTER UPDATE trigger captures the old salary (40,000) and new salary (45,000) into salary_audit."
        }
      ],
      labs: ["trigger-inspector", "backup-builder"],
      labTasks: [
        { n: 1, text: "Create an AFTER DELETE trigger on employee that logs the deleted employee ID to salary_audit with op = 'DELETE'." },
        { n: 2, text: "Create a BEFORE INSERT trigger that prevents adding any employee with a salary less than 20,000 (raise exception or return NULL)." },
        { n: 3, text: "Write the exact pg_dump command to backup the library database in custom format (-Fc) to /backups/lib.dump." },
        { n: 4, text: "Write the pg_restore command to restore /backups/lib.dump with --clean --if-exists." }
      ],
      keyTakeaways: [
        "In INSERT triggers, OLD is null. In DELETE triggers, NEW is null. In UPDATE, both exist.",
        "pg_dump creates a consistent snapshot without blocking read operations.",
        "Custom format (-Fc) is compressed and allows selecting specific tables to restore.",
        "pg_dump and pg_restore are command-line utilities, not SQL statements run inside psql."
      ],
      predict: [
        {
          sql: "SELECT TG_OP; -- In an INSERT trigger, what does TG_OP hold?",
          choices: ["'INSERT'", "'NEW'", "'ADD'", "'CREATE'"],
          answer: 0,
          explain: "TG_OP is a string containing the event: 'INSERT', 'UPDATE', 'DELETE', or 'TRUNCATE'."
        }
      ],
      flashcards: [
        { front: "pg_dump -Fc", back: "Creates a compressed, custom-format archive file suitable for pg_restore." },
        { front: "RETURN NULL in BEFORE trigger", back: "Silently skips the operation for the current row without throwing an error." }
      ]
    },

    // Week 7
    {
      id: 7,
      label: "Week 7",
      title: "Transactions, Rollback & Savepoints",
      status: "published",
      co: ["CO3"],
      cluster: "transactions",
      dataset: "txn_lab",
      summary: "Understand ACID properties, why autocommit is dangerous, how to isolate transactions, and how to execute partial rollbacks using SAVEPOINT and RELEASE SAVEPOINT.",
      topics: [
        "The Autocommit trap: unhedged UPDATEs and partial transfers",
        "Transaction control commands: BEGIN, COMMIT, ROLLBACK",
        "Atomicity & automatic rollback upon CHECK constraint failure (23514 & 25P02)",
        "Isolation: concurrent session view across DBeaver tabs",
        "SAVEPOINT: setting bookmarks inside a transaction",
        "ROLLBACK TO SAVEPOINT: partial rewind",
        "RELEASE SAVEPOINT: freeing savepoints (and error 3B001)",
        "Savepoint inventory restocking lab: Part A (60) & Part B (65)"
      ],
      decks: [
        {
          title: "Transactions, Rollback & Savepoints",
          pdf: "/slides/pdf/Week_7_Transactions_Rollback_Savepoints.pdf",
          pptx: "/slides/Week_7_Transactions_Rollback_Savepoints.pptx",
          slides: 12,
          size: "1.8 MB"
        }
      ],
      handouts: [
        {
          title: "Transactions Lab Handout (COMMIT, ROLLBACK & SAVEPOINT)",
          pdf: "/assets/handouts/week-07-transactions-lab-handout.pdf",
          size: "150 KB"
        },
        {
          title: "Savepoint Inventory Problem Statement (Parts A & B)",
          pdf: "/assets/handouts/week-07-savepoint-problem-statement.pdf",
          size: "3 KB"
        }
      ],
      snippets: [
        {
          id: "w7-part-a",
          slide: 11,
          title: "Lab Task Part A: Single Savepoint",
          sql: `SET search_path TO txn_lab;
BEGIN;
UPDATE product SET stock = stock + 10 WHERE product_id = 5; -- +10 = 60
SAVEPOINT s1;
UPDATE product SET stock = stock + 10 WHERE product_id = 5; -- +10 = 70
ROLLBACK TO SAVEPOINT s1; -- roll back to 60
COMMIT;
SELECT product_id, name, stock FROM product WHERE product_id = 5;`,
          expected: {
            columns: ["product_id", "name", "stock"],
            rows: [[5, "Keyboard", 60]]
          },
          explain: "Stock starts at 50, increases to 60, then to 70. Rolling back to s1 undoes the second update, committing final stock 60."
        },
        {
          id: "w7-part-b",
          slide: 12,
          title: "Lab Task Part B: Multiple Savepoints",
          sql: `SET search_path TO txn_lab;
-- Starting from stock 60
BEGIN;
UPDATE product SET stock = stock + 5  WHERE product_id = 5;  SAVEPOINT s1; -- 65
UPDATE product SET stock = stock + 15 WHERE product_id = 5;  SAVEPOINT s2; -- 80
UPDATE product SET stock = stock - 8  WHERE product_id = 5;  SAVEPOINT s3; -- 72
UPDATE product SET stock = stock + 20 WHERE product_id = 5;               -- 92
ROLLBACK TO SAVEPOINT s3; -- back to 72
ROLLBACK TO SAVEPOINT s2; -- back to 80
ROLLBACK TO SAVEPOINT s1; -- back to 65
COMMIT;
SELECT product_id, name, stock FROM product WHERE product_id = 5;`,
          expected: {
            columns: ["product_id", "name", "stock"],
            rows: [[5, "Keyboard", 65]]
          },
          explain: "Tests multiple savepoint rewinds: 60 → 65 (s1) → 80 (s2) → 72 (s3) → 92 → rewinds to s3 (72) → s2 (80) → s1 (65), committing 65."
        }
      ],
      labs: ["savepoint-timeline", "autocommit-atomicity-isolation"],
      labTasks: [
        { n: 1, text: "Execute the autocommit transfer mistake (with 'B-2O2') and verify the 500 Tk loss." },
        { n: 2, text: "Wrap the transfer in BEGIN ... COMMIT and verify safe rollback if an error occurs." },
        { n: 3, text: "Complete Inventory Restocking with Savepoint Part A (commit stock 60)." },
        { n: 4, text: "Complete Inventory Restocking with Savepoint Part B (commit stock 65)." }
      ],
      keyTakeaways: [
        "In autocommit mode, every statement is permanently written immediately upon execution.",
        "A transaction guarantees Atomicity: all updates succeed or none take effect.",
        "If a constraint error occurs inside BEGIN, subsequent statements are refused with SQLSTATE 25P02 until ROLLBACK.",
        "SAVEPOINT creates an internal milestone you can rewind to without abandoning the entire transaction."
      ],
      predict: [
        {
          sql: "BEGIN;\nUPDATE account SET balance = 0;\nROLLBACK;\nSELECT SUM(balance) FROM account;",
          choices: ["0", "8000", "500", "Error"],
          answer: 1,
          explain: "ROLLBACK completely discards all modifications made inside BEGIN, restoring initial sum 8000.00."
        }
      ],
      flashcards: [
        { front: "SQLSTATE 25P02", back: "Transaction is aborted. Indicates a previous query in the transaction failed. Must execute ROLLBACK." },
        { front: "RELEASE SAVEPOINT", back: "Destroys a savepoint bookmark while retaining the changes. Subsequent rollback to this name fails with 3B001." }
      ]
    },

    // Upcoming Weeks (8–14)
    {
      id: 8,
      label: "Week 8",
      title: "ER Modeling & Schema Design",
      status: "upcoming",
      co: ["CO2"],
      cluster: "relational",
      dataset: "library",
      summary: "Translate real-world enterprise requirements into Entity-Relationship (ER) diagrams, mapping entities, relationships, cardinalities and constraints into clean relational tables.",
      topics: ["Entities, attributes and relationships", "Cardinalities and participation", "ER to Relational mapping", "Primary & Foreign key synthesis"],
      decks: [],
      handouts: [],
      snippets: [],
      labs: [],
      labTasks: [],
      keyTakeaways: [],
      predict: [],
      flashcards: []
    },
    {
      id: 9,
      label: "Week 9",
      title: "Normalization in Practice",
      status: "upcoming",
      co: ["CO2"],
      cluster: "relational",
      dataset: "library",
      summary: "Eliminate update, insertion and deletion anomalies by analyzing Functional Dependencies and decomposing schemas into 1NF, 2NF, 3NF and BCNF.",
      topics: ["Functional Dependencies (FDs)", "Insertion, Update, Deletion Anomalies", "1NF, 2NF, 3NF decomposition", "Boyce-Codd Normal Form (BCNF)"],
      decks: [],
      handouts: [],
      snippets: [],
      labs: [],
      labTasks: [],
      keyTakeaways: [],
      predict: [],
      flashcards: []
    },
    {
      id: 10,
      label: "Week 10",
      title: "Indexes, Sequences & DCL",
      status: "upcoming",
      co: ["CO1", "CO3"],
      cluster: "storage",
      dataset: "library",
      summary: "Accelerate query performance with B-Tree indexes, manage auto-incrementing serial values with sequences, and manage database security with GRANT and REVOKE.",
      topics: ["B-Tree, Hash, and GIN indexes", "CREATE INDEX & EXPLAIN ANALYZE", "Sequences & SERIAL", "DCL: GRANT, REVOKE, User roles"],
      decks: [],
      handouts: [],
      snippets: [],
      labs: [],
      labTasks: [],
      keyTakeaways: [],
      predict: [],
      flashcards: []
    },
    {
      id: 11,
      label: "Week 11",
      title: "Procedural SQL: Blocks, Loops & Cursors",
      status: "upcoming",
      co: ["CO3"],
      cluster: "modern",
      dataset: "programs",
      summary: "Write rich PL/pgSQL algorithms using conditional branching (IF/ELSE, CASE), iteration loops, explicit cursors for row-by-row processing, and custom EXCEPTION handling.",
      topics: ["Anonymous DO $$ blocks", "Variable declarations & scoping", "WHILE, FOR IN loops", "Explicit cursors & FETCH", "EXCEPTION handling blocks"],
      decks: [],
      handouts: [],
      snippets: [],
      labs: [],
      labTasks: [],
      keyTakeaways: [],
      predict: [],
      flashcards: []
    },
    {
      id: 12,
      label: "Week 12",
      title: "Integrity Constraints in Depth",
      status: "upcoming",
      co: ["CO1", "CO2"],
      cluster: "relational",
      dataset: "library",
      summary: "Harden database schemas with referential actions (ON DELETE CASCADE, SET NULL), multi-column UNIQUE keys, complex CHECK constraints, and deferred constraint evaluation.",
      topics: ["FOREIGN KEY ON DELETE CASCADE / SET NULL", "Composite UNIQUE & Primary keys", "Domain CHECK constraints", "DEFERRABLE INITIALLY DEFERRED constraints"],
      decks: [],
      handouts: [],
      snippets: [],
      labs: [],
      labTasks: [],
      keyTakeaways: [],
      predict: [],
      flashcards: []
    },
    {
      id: 13,
      label: "Week 13",
      title: "Connecting Database to an Application & Project Review",
      status: "upcoming",
      co: ["CO3", "CO4"],
      cluster: "modern",
      dataset: "library",
      summary: "Connect PostgreSQL to modern web and desktop programming languages (Java JDBC, Node.js pg, Python psycopg2/SQLAlchemy) and present sessional project progress.",
      topics: ["Connection pools & environment configuration", "Parameterized queries (preventing SQL injection)", "Sessional project milestone review", "Viva preparation"],
      decks: [],
      handouts: [],
      snippets: [],
      labs: [],
      labTasks: [],
      keyTakeaways: [],
      predict: [],
      flashcards: []
    },
    {
      id: 14,
      label: "Week 14",
      title: "Final Evaluation & Comprehensive Revision",
      status: "upcoming",
      co: ["CO2", "CO3", "CO4"],
      cluster: "revision",
      dataset: "library",
      summary: "Course culmination: Final Lab Test 2, team application demonstration, lab report submission, project viva, and comprehensive CO assessment.",
      topics: ["Lab Test 2 examination", "Team project demonstration", "Final viva voce", "Course Outcome (CO) achievement review"],
      decks: [],
      handouts: [],
      snippets: [],
      labs: [],
      labTasks: [],
      keyTakeaways: [],
      predict: [],
      flashcards: []
    }
  ] as WeekData[]
};
