# Build Prompt: CSE 2206 Database Management Systems Sessional Study Website

> **How to use this file:** Give this whole file to an AI coding assistant (Claude, Claude Code, Cursor, etc.) and open the `CSE_2206` folder as its working folder. The file contains the course facts, the exact file names, every lab dataset, the expected query outputs, the page structure, the visual design and the interactive SQL labs. The assistant should not need to guess anything.
>
> **Companion site:** This is the *sessional (lab)* course, and its theory partner is **CSE 2205**. The CSE 2205 site focuses on theory visualizations. **This site focuses on SQL itself**: writing it, running it, seeing its output, and seeing *why* the output looks the way it does.

---

## 1. Your Role and Goal

You are a senior front-end engineer and a learning-experience designer. Build a **beautiful, student-friendly, hands-on SQL study website** for **CSE 2206: Database Management Systems Sessional** at BAUST.

The website must:

1. Present the course **week by week**. Each week's lab slides can be **viewed in the browser** and **downloaded**.
2. Make **every SQL statement on the site runnable**. A student presses **Run** and sees the real output in a results table, next to the expected output from the slide.
3. Run a **real PostgreSQL engine inside the browser** (PGlite, Section 5), because every lab in this course uses **PostgreSQL**: `\d`, `ALTER COLUMN … TYPE … USING`, schemas, PL/pgSQL procedures, triggers, materialized views, `SAVEPOINT`.
4. Include **smart, interactive visualizations** of how each SQL feature works: clause execution order, filters, grouping, joins, subqueries, DDL changes, triggers, views and transactions with savepoints.
5. Attach **every lab slide deck and handout** in the root folder.
6. Include a **70-question SQL MCQ Practice** page (4 options each, with answers and explanations; full bank in **Appendix A**). Students choose to see answers **after submitting everything** or **one question at a time**.
7. Include a dedicated **Cheat Sheets** menu with ready-to-run example queries for every topic.
8. Open in **light mode by default**, with a **dark mode toggle** that remembers the student's choice.
9. Work well on **mobile phones**. Most students will open it on a phone.
10. Be a **static site** with no server, no login and no database server. It must be deployable for free on **GitHub Pages**, **Netlify** or **Vercel**.

---

## 2. Course Facts (use exactly as written)

Source: `CSE_2206_Course_Outline_Winter_2026.docx` (read it, do not publish it).

| Field | Value |
|---|---|
| Course code | CSE 2206 |
| Course title | Database Management Systems Sessional |
| Credit | 1.50 (3.00 hours/week) |

### Course Outcomes (COs)

| CO | Statement | PO | Bloom's level |
|---|---|---|---|
| CO1 | Apply SQL data definition, manipulation and control commands with appropriate integrity constraints to create, maintain and query relational databases using modern DBMS tools. | PO5 | C3, P3 |
| CO2 | Design ER models and normalized relational schemas for real-world problems and implement them in a relational DBMS. | PO3 | C5, C6, P4 |
| CO3 | Construct complex queries and database programs using joins, subqueries, views, PL/SQL, stored procedures, functions, triggers and transaction control. | PO2 | C3, C4, P4 |
| CO4 | Develop a database-driven application as a team and present it through report, demonstration and viva. | PO8 | A3, P3 |

### Assessment (show as a donut chart on the Course Info page)

| Method | Weight |
|---|---|
| Attendance | 5% |
| Lab Performance | 15% |
| Lab Report | 15% |
| Quiz | 10% |
| Lab Test (Lab Test 1 + Lab Test 2) | 25% |
| Project | 20% |
| Viva | 10% |
| **Total** | **100%** |

---

## 3. Source Files: The Exact Inventory

The website is built from the `CSE_2206` folder. **All week-wise slides are in the root of the folder.** There are no subfolders.

### 3.1 Week-wise slide decks (root folder): ALL must be attached

The **file names are the source of truth for the week numbers**. Three file names contain spaces and commas, so handle them carefully in scripts (always quote paths).

| Week | Slide file (root folder) | Slides | Size | What the deck covers (section by section) | Lab dataset |
|---|---|---|---|---|---|
| 1 | `Week_1_PostgreSQL_SQL_Basics.pptx` | 19 | 4.8 MB | Roadmap · Server → Database → Schema → Table → Column · Connecting (host, port, user, password, database; `psql` command and URI) · psql shortcuts `\l \c \dn \dt \d \q` · Defining the Library table · The 5 starting rows · `SELECT *` · Selecting columns, `DISTINCT`, `AS` · `WHERE` with `= <> > < >= <=` · `ORDER BY ASC/DESC` · `LIMIT`, `OFFSET`, Top-N · Clause order (written vs executed) · `INSERT` (named columns, multi-row) · `UPDATE … SET … WHERE` · `DELETE` vs `DELETE` without WHERE vs `DROP TABLE` · Three rules for write queries · Lab tasks (8) · Wrap-up | `Library` (§6.1) |
| 2 | `Week_2_DDL_Tables_Schemas_Databases.pptx` | 18 | 4.5 MB | DDL vs DML · `CREATE TABLE IF NOT EXISTS` with `PRIMARY KEY`, `NOT NULL`, `DEFAULT` · Reading structure (`\d library`, `information_schema.columns`) · `ALTER TABLE` actions · `ADD COLUMN` · `DROP COLUMN` (`IF EXISTS`, `CASCADE`) · `RENAME COLUMN` / `RENAME TO` · `ALTER COLUMN … TYPE` (+ `USING`) · `ADD CONSTRAINT … PRIMARY KEY` · `SET/DROP NOT NULL`, `SET DEFAULT` · `DROP TABLE` vs `DELETE` vs `TRUNCATE` · Schemas (`CREATE/ALTER/DROP SCHEMA`, `SET SCHEMA`, `search_path`) · Databases (`CREATE/ALTER/DROP DATABASE`) · DDL cheat sheet · Lab tasks (8) · Wrap-up | `Library` (§6.1) |
| 3 | `Week_3_Aggregation_Grouping_Subqueries.pptx` | 14 | 3.9 MB | The lab database (STUDENT, COURSE, ENROLLMENT) · `COUNT(*)` vs `COUNT(col)` vs `COUNT(DISTINCT col)` · `SUM`, `AVG`, `ROUND`, `COALESCE` · `MIN`, `MAX` (also on text) · `GROUP BY` (+ the classic error) · `GROUP BY` with `JOIN`, grouping by two columns · `HAVING` vs `WHERE`, execution order · Scalar subqueries · `IN` / `NOT IN` (the NULL trap) · `ANY` / `ALL` · `EXISTS` / `NOT EXISTS` · Correlated subqueries · Lab tasks (8) | `STUDENT/COURSE/ENROLLMENT` (§6.2) |
| 4 | `Week_4_SQL_Joins_and_Set_Operations.pptx` | 7 | 0.3 MB | Inner joins: theta, equi, natural, cross · Outer joins: left, right, full (and the `UNION` workaround for MySQL) · Self join · `UNION`, `INTERSECT` (via `IN`), `EXCEPT` (via `NOT IN`) · Semi join and anti join with `EXISTS` / `NOT EXISTS` · Four-table join, join + `GROUP BY` + `CASE` (estimated GPA) · Spotting unmatched rows with `LEFT JOIN … IS NULL`, `COALESCE` report | `Students/Courses/Enrollments/Departments/Faculty` (§6.3) |
| 5 | `Week_5_Stored Procedures, Functions, Triggers, Views & Materialized Views.pptx` | 9 | 2.0 MB | Agenda · Stored procedures (`CREATE PROCEDURE … LANGUAGE plpgsql`, `CALL`, `INOUT`) · Functions (`RETURNS`, used inside `SELECT`) · Triggers (`BEFORE INSERT` timestamp, `AFTER UPDATE` audit log) · Views (filter view, join view) · Materialized views (`REFRESH`, `REFRESH … CONCURRENTLY`) · View vs materialized view comparison table · Lab task: Library Management System (6 parts) | `Student/Result/Employee/Orders` + Library system (§6.4) |
| 6 | `Week_6_PostgreSQL Triggers, Backup & Restore.pptx` | 6 | 0.4 MB | What a trigger is (event, timing, level; `BEFORE` vs `AFTER`) · `NEW`, `OLD`, `TG_OP` · Managing triggers (list via `pg_trigger`, `DISABLE/ENABLE`, `DROP`, `RETURN NULL` to skip a row) · Backup with `pg_dump` (plain, custom `-Fc`, directory `-Fd -j 4`, `pg_dumpall`) · Restore with `psql` and `pg_restore` (`--clean --if-exists`, `-l`, `-t`) | `employee` + `salary_audit` (§6.5) |
| 7 | `Week_7_Transactions_Rollback_Savepoints.pptx` | 12 | 1.8 MB | Agenda · The autocommit problem (Scene 1: `UPDATE` without `WHERE`; Scene 2: half-finished transfer with the `'B-2O2'` typo) · Transaction control commands · `COMMIT` & `ROLLBACK` · Atomicity (and automatic rollback on a `CHECK` violation) · Isolation (two DBeaver tabs, t1 → t8) · Savepoints (the 20-mice order) · `RELEASE SAVEPOINT` · Savepoint commands compared · Lab task Part A (single savepoint) · Lab task Part B (multiple savepoints) | `txn_lab` schema (§6.6) |

**Note on the decks (do not "fix" the slides, just be aware):**
- The **Week 6** title slide says "WEEK 5" and repeats the Week 5 subtitle. The file name says Week 6, so the site labels it **Week 6: Triggers, Backup & Restore**.
- In the **Week 7** deck, slide 6 calls the `E-505` holder "Nila". In the handout and the setup script, `D-404` is **Nila** and `E-505` is **Sumi**. The site uses the **handout** values (§6.6).

### 3.2 Week-wise handouts (root folder): ALL must be attached

| File (root folder) | Pages | Size | What it is | Link it to |
|---|---|---|---|---|
| `Week_7_Transactions.pdf` | 9 | 150 KB | Full lab handout: *Transactions Lab: COMMIT, ROLLBACK and SAVEPOINT* (PostgreSQL + DBeaver). Setup, the two autocommit scenes, ROLLBACK/COMMIT scenarios, the isolation t1–t8 walkthrough, automatic rollback (errors `23514`, `25P02`), savepoints, RELEASE, quick reference. | Week 7 |
| `Week_7_Transaction_Rollback_Savepoint_Problem_Statement.pdf` | 1 | 3 KB | The lab problem: *Inventory Restocking with Savepoint*, Part A (steps 1–8) and Part B (steps 9–17). | Week 7, Lab Test Prep |

### 3.3 Lab setup resource (root folder)

| File | What it is | Where |
|---|---|---|
| `setup_docker_postgres.sh` | Installs Docker Engine + Compose on Linux Mint/Ubuntu and starts `postgres:16-alpine` (container `pg16_alpine`, port 5432, user `postgres`). Idempotent. | **Setup** page (§8.9), as a download with the usage lines `chmod +x setup_docker_postgres.sh` and `sudo ./setup_docker_postgres.sh`. |

*The script contains the lab's default local password. It only applies to a container on the student's own machine, so publishing it is fine. Still, show a note: "Change `PG_PASSWORD` if you expose port 5432 beyond your own computer."*

### 3.4 Do NOT publish these

These files are private or assessment material. They must **not** be copied into the website, and not into the Git repository either:

- `CSE 2206 — Summer 2026 —Lab Performance 1 - A.xlsx`, `… - B.xlsx`, `CSE_2206___Summer_2026__Lab_Performance_1_-_A.xlsx`, `…_-_B.xlsx` (**student marks: private data**)
- `CSE2206_Lab_Mid_Sets_ABCD.docx` (lab mid-term question sets)
- `CSE2206_Lab_Mid_Solutions_ABCD.docx` (**solutions**)
- `CSE2206_Lab_Performance_2_Sets_ABCD.docx` (assessment sets)
- `CSE_2206_Course_Outline_Winter_2026.docx` is the source of Section 2. Read it, but do not link it unless the instructor asks.
- The textbook PDF (if one is ever added) is copyrighted. Show it only as a citation with a link to the publisher's page.
- `.DS_Store` files

Add all of these to `.gitignore` as well, so they cannot be pushed by accident.

---

## 4. Preparing the Files (do this first)

Browsers **cannot display `.pptx` files**. Do this:

1. **Convert every slide deck to PDF** with LibreOffice (free). Keep the original `.pptx` so students can download it:
   ```bash
   soffice --headless --convert-to pdf --outdir site/assets/slides/pdf ./Week_*.pptx
   ```
2. **Rename to safe web names**: lowercase, hyphens, no spaces or commas, two-digit week. For example:
   - `Week_5_Stored Procedures, Functions, Triggers, Views & Materialized Views.pptx` → `week-05-procedures-functions-triggers-views.pptx` / `.pdf`
   - `Week_6_PostgreSQL Triggers, Backup & Restore.pptx` → `week-06-triggers-backup-restore.pptx` / `.pdf`
   - `Week_7_Transactions.pdf` → `assets/handouts/week-07-transactions-lab-handout.pdf`
   - `Week_7_Transaction_Rollback_Savepoint_Problem_Statement.pdf` → `assets/handouts/week-07-savepoint-problem-statement.pdf`
3. **Generate a thumbnail** (the first slide as `.webp`, about 640 px wide) for each deck and handout. The week cards use these:
   ```bash
   pdftoppm -f 1 -l 1 -r 60 -png input.pdf thumb && cwebp thumb-1.png -o thumb.webp
   ```
4. **Shrink the heavy decks for phones.** Weeks 1–3 are 4–5 MB each as PPTX. After conversion, if a PDF is over 3 MB, compress a "light" copy with Ghostscript and keep the normal PDF as the full-quality download:
   ```bash
   gs -sDEVICE=pdfwrite -dPDFSETTINGS=/ebook -dNOPAUSE -dBATCH -sOutputFile=out.pdf in.pdf
   ```
5. **Extract every SQL code block and every result table** from the decks with `python-pptx`. This goes into `data/course.js` (Section 7) as runnable snippets with their expected output. On these decks, code sits in text boxes whose first line is a comment or an SQL keyword, and results are real PowerPoint tables.
6. **Record each file's size and page count** in the data file. The UI shows them ("PDF · 19 slides · 1.2 MB").
7. Write `scripts/prepare-assets.sh` (and `scripts/extract_sql.py`) that repeat steps 1 to 6. The instructor reruns them when a deck changes or a new week is added. **The script must skip every file in §3.4.**

### Target folder structure

```
site/
├── index.html
├── assets/
│   ├── slides/
│   │   ├── pptx/    week-01-postgresql-sql-basics.pptx …
│   │   ├── pdf/     week-01-postgresql-sql-basics.pdf …
│   │   └── thumbs/  week-01.webp …
│   ├── handouts/    week-07-transactions-lab-handout.pdf, week-07-savepoint-problem-statement.pdf
│   ├── setup/       setup_docker_postgres.sh
│   └── img/         logo, favicon, og-image
├── data/
│   ├── course.js            ← single source of truth (Section 7)
│   ├── mcq.js               ← the 70-question SQL MCQ bank (§8.13, Appendix A)
│   ├── cheatsheets.js       ← example queries by topic (§8.6)
│   └── datasets/            ← one .sql seed file per lab dataset (Section 6)
│       ├── library.sql  uni3.sql  joins.sql  programs.sql  triggers.sql  txn_lab.sql
├── css/   input.css (Tailwind source + tokens) → tailwind.css (generated, committed)
├── tailwind.config.js
├── js/    app.js, router.js, viewer.js, sql/engine.js, sql/editor.js, sql/results.js, viz/*.js
├── tests/ expected-outputs.test.js   ← checks every slide query against its slide output
└── scripts/ prepare-assets.sh, extract_sql.py
```

---

## 5. Tech Stack

The instructor is not a full-time developer, so keep it **simple and dependency-light**:

- **Plain HTML + vanilla JavaScript (ES modules) + Tailwind CSS (v3, pinned)**. No JavaScript framework. Generate the stylesheet with the **Tailwind standalone CLI** (a single binary, no Node project needed): `tailwindcss -i css/input.css -o css/tailwind.css --minify`. Commit the generated `css/tailwind.css`, so the deployed site is still a plain static folder, and add the command to `README.md`. Do **not** use the Tailwind Play CDN in production. Map the theme tokens of §10.2 into `tailwind.config.js` as CSS variables (e.g. `colors: { bg: 'var(--bg)', primary: 'var(--primary)', foundations: 'var(--c-foundations)' }`, `borderRadius: { card: 'var(--radius)' }`, `boxShadow: { card: 'var(--shadow)' }`, `fontFamily: { sans: ['Plus Jakarta Sans', 'Hind Siliguri', …], mono: ['JetBrains Mono', …] }`) and set `darkMode: ['selector', '[data-theme="dark"]']`, so utilities like `bg-surface text-text rounded-card shadow-card dark:…` follow the theme.
- **Hash-based routing** (`#/week/3`, `#/playground`, `#/lab/joins`), so it works on GitHub Pages without server config.
- **PGlite** (`@electric-sql/pglite`, real PostgreSQL compiled to WebAssembly, from jsDelivr, **pinned to an exact version**) for **every runnable query**. Why PGlite and not sql.js/SQLite: the labs depend on PostgreSQL-only features: `ALTER COLUMN … TYPE … USING`, `CREATE SCHEMA`, `search_path`, PL/pgSQL `CREATE PROCEDURE` / `CALL`, `CREATE TRIGGER … EXECUTE FUNCTION`, `CREATE MATERIALIZED VIEW` / `REFRESH`, `NEW`/`OLD`, transactional DDL, `SAVEPOINT` / `RELEASE`, and real PostgreSQL error codes (`23505`, `23514`, `25P02`, `3B001`). Load PGlite **lazily**, only when the student first presses Run, and show a friendly "Starting PostgreSQL in your browser…" loader.
  - PGlite is single-connection. Where a lab needs **two sessions** (Week 7 isolation), create **two PGlite instances** loaded from the same seed, or simulate the second session in the visualization (see Lab 18).
  - `pg_dump`/`pg_restore` and `CREATE/DROP DATABASE` cannot run in the browser. Week 6 backup and Week 2 database commands are taught with **command builders and animated simulations** (Labs 7 and 16), not a real run. Say so in the UI.
- **CodeMirror 5** (cdnjs, pinned, `text/x-pgsql` mode) for the SQL editor: syntax highlighting, line numbers, bracket matching, Ctrl/⌘+Enter to run. No build step needed.
- **psql meta-commands**: implement `\l`, `\c`, `\dn`, `\dt`, `\d <table>`, `\q` in the playground by translating them to `information_schema` / `pg_catalog` queries, and print the result in psql style (like slide 5 of Week 2).
- **PDF.js** (cdnjs, pinned) for the in-page slide and handout viewer.
- **D3.js v7** (pinned) for joins, Venn diagrams, query-plan flows and timelines.
- **Fonts**: *Plus Jakarta Sans* for all UI text (headings and body), *JetBrains Mono* for code, SQL and result tables, *Hind Siliguri* as the Bangla fallback (Google Fonts).
- **Icons**: Lucide (inline SVG).
- **No tracking, no login, no backend.** Student progress and saved queries are stored in `localStorage` only. Wrap every read and write in `try/catch`; the site must still work when storage is blocked.
- **Pin every CDN library to an exact version** (no `@latest`, no `@7`).

---

## 6. The Lab Datasets (exact seed data)

Every week runs against a known dataset, so students can **check every answer by eye**, as the slides say. Each dataset is a `.sql` seed file in `data/datasets/`. The playground has a **dataset switcher** and a **Reset dataset** button that reloads the seed.

### 6.1 `library.sql` (Weeks 1–2), exactly as on the slides

```sql
CREATE TABLE Library (
  BookID          INT PRIMARY KEY,
  BookTitle       VARCHAR(120) NOT NULL,
  Author          VARCHAR(100),
  Category        VARCHAR(50),
  Publisher       VARCHAR(100),
  AvailableCopies INT DEFAULT 0
);
INSERT INTO Library VALUES
 (1,'Database System Concepts','Silberschatz','Database','McGraw Hill',6),
 (2,'Computer Networks','Andrew Tanenbaum','Networking','Pearson',5),
 (3,'Operating System Concepts','Silberschatz','Operating System','Wiley',4),
 (4,'Introduction to Algorithms','Cormen','Algorithms','MIT Press',3),
 (5,'Clean Code','Robert C. Martin','Programming','Prentice Hall',7);
```
Check values from the slides: `DISTINCT Author` → 4 rows · `WHERE AvailableCopies > 4` → 3 rows · `< 5` → 2 rows · `WHERE … > 3 ORDER BY … DESC LIMIT 2` → Clean Code 7, Database System Concepts 6 · `UPDATE … WHERE Author = 'Silberschatz'` → `UPDATE 2` · `DELETE … WHERE AvailableCopies < 4` → `DELETE 1`.

### 6.2 `uni3.sql` (Week 3), exactly as on the slides

```sql
CREATE TABLE STUDENT (StuID VARCHAR(5) PRIMARY KEY, StuName VARCHAR(30), Dept VARCHAR(5));
INSERT INTO STUDENT VALUES
 ('S101','Rakib','CSE'),('S102','Sadia','CSE'),('S103','Tanvir','EEE'),
 ('S104','Mim','CSE'),('S105','Arif','EEE'),('S106','Nabila','CSE');   -- S106: no enrolment

CREATE TABLE COURSE (CourseID VARCHAR(10) PRIMARY KEY, Title VARCHAR(30), Dept VARCHAR(5), Credit NUMERIC(3,1));
INSERT INTO COURSE VALUES
 ('CSE-3101','DBMS','CSE',3.0),('CSE-3103','OOP','CSE',3.0),
 ('CSE-4105','AI','CSE',3.0),('EEE-2101','Circuits','EEE',3.0);

CREATE TABLE ENROLLMENT (StuID VARCHAR(5) REFERENCES STUDENT, CourseID VARCHAR(10) REFERENCES COURSE, Marks INT);
INSERT INTO ENROLLMENT VALUES
 ('S101','CSE-3101',82),('S101','CSE-3103',75),('S102','CSE-3101',91),('S102','CSE-4105',88),
 ('S103','EEE-2101',68),('S104','CSE-3101',55),('S104','CSE-3103',NULL),('S105','EEE-2101',77);
```
Check values from the slides: `COUNT(*)` 8 · `COUNT(Marks)` 7 · `COUNT(DISTINCT StuID)` 5 · `SUM` 536 · `AVG` 76.57 · `AVG(COALESCE(Marks,0))` 67.00 · `MIN/MAX` 55/91 · per-course averages CSE-4105 88.00, CSE-3101 76.00, CSE-3103 75.00, EEE-2101 72.50 · Dept averages CSE 78.20, EEE 72.50 · `NOT EXISTS` → S106 Nabila.

### 6.3 `joins.sql` (Week 4), **site-authored seed (the deck shows queries but no data)**

The Week 4 queries use `Students(student_id, name, age, major)`, `Courses(course_id, course_name, department)`, `Enrollments(enrollment_id, student_id, course_id, grade, semester)`, `Departments(dept_name, …)` and `Faculty(name, …)`. Use this small seed. It is designed so that **every** Week 4 query returns something interesting: one student with no enrolment, one course with no enrolment, two students sharing a major, grades that hit every `CASE` branch.

```sql
CREATE TABLE Departments (dept_name VARCHAR(10) PRIMARY KEY, building VARCHAR(20));
INSERT INTO Departments VALUES ('CSE','Academic Building 3'),('EEE','Academic Building 2'),('ME','Academic Building 1');

CREATE TABLE Students (student_id INT PRIMARY KEY, name VARCHAR(30), age INT, major VARCHAR(10));
INSERT INTO Students VALUES
 (1,'Rakib',21,'CSE'),(2,'Sadia',20,'CSE'),(3,'Tanvir',22,'EEE'),
 (4,'Mim',19,'CSE'),(5,'Arif',23,'EEE'),(6,'Nabila',20,'ME');          -- Nabila: not enrolled

CREATE TABLE Courses (course_id INT PRIMARY KEY, course_name VARCHAR(40), department VARCHAR(10) REFERENCES Departments);
INSERT INTO Courses VALUES
 (101,'Database Systems','CSE'),(102,'Algorithms','CSE'),(103,'Circuits','EEE'),
 (104,'Thermodynamics','ME'),(105,'Machine Learning','CSE');           -- 105: no enrolments

CREATE TABLE Enrollments (enrollment_id INT PRIMARY KEY, student_id INT REFERENCES Students,
                          course_id INT REFERENCES Courses, grade VARCHAR(2), semester VARCHAR(10));
INSERT INTO Enrollments VALUES
 (1,1,101,'A','Spring'),(2,1,102,'B+','Spring'),(3,2,101,'A','Spring'),(4,3,103,'B','Fall'),
 (5,4,102,'C','Fall'),(6,5,103,'A','Fall'),(7,2,102,'B','Fall'),(8,4,104,'B+','Spring');

CREATE TABLE Faculty (faculty_id INT PRIMARY KEY, name VARCHAR(30), dept VARCHAR(10));
INSERT INTO Faculty VALUES (1,'Karim','CSE'),(2,'Hasan','EEE'),(3,'Rakib','CSE');  -- 'Rakib' also a student: shows UNION behaviour
```
Generate the expected outputs for this dataset by running every Week 4 query in PostgreSQL once, and store them in `course.js`. *(The instructor may replace this seed with the official lab data; see Open Items.)*

### 6.4 `programs.sql` (Week 5), site-authored seed matching the slide code

Tables used by the Week 5 examples: `Student(id SERIAL PRIMARY KEY, name, dept, cgpa NUMERIC(3,2), dob DATE, created_at TIMESTAMP)`, `Result(student_id, course_id, marks)`, `Employee(id, name, salary)`, `Salary_Audit(emp_id, old_sal, new_sal, changed_at DEFAULT now())`, `Orders(product_id, qty)`. Seed 6 students across CSE/EEE with CGPAs on both sides of 3.5, results on both sides of 60 and 80, 3 employees and 8 orders.

Also include the **Week 5 lab system**, empty-ish, so students can build it: `Book(book_id, title, author, copies_available)` with one book at `copies_available = 0`, `Member(member_id, name)`, `Loan(loan_id, book_id, member_id, loan_date, return_date, fine)` with one overdue open loan.

### 6.5 `triggers.sql` (Week 6), site-authored seed

`employee(id, name, salary)` (4 rows) and `salary_audit(emp_id, old_salary, new_salary, op, changed_at)`, plus the trigger function and `trg_salary_audit` from the slides, so `NEW`, `OLD` and `TG_OP` can be watched live.

### 6.6 `txn_lab.sql` (Week 7), from the handout

```sql
CREATE SCHEMA txn_lab;  SET search_path TO txn_lab;
CREATE TABLE account (acc_no VARCHAR(5) PRIMARY KEY, holder VARCHAR(20),
                      balance NUMERIC(12,2) CHECK (balance >= 0));
INSERT INTO account VALUES
 ('A-101','Rahim',1000),('B-202','Karim',2000),('C-303','Jamal',1500),
 ('D-404','Nila',500),('E-505','Sumi',3000);                          -- SUM = 8000.00
CREATE TABLE product (product_id INT PRIMARY KEY, name VARCHAR(30), stock INT);
INSERT INTO product VALUES (1,'Laptop',5),(2,'Mouse',50),(5,'Keyboard',100);
CREATE TABLE orders (order_id INT PRIMARY KEY, customer VARCHAR(30));
CREATE TABLE order_item (order_id INT REFERENCES orders, product_id INT REFERENCES product,
                         qty INT, unit_price NUMERIC(10,2));
```
Check values from the handout: Scene 1 → `SUM` 10500.00 then 8000.00 · Scene 2 → 7500.00 · correct transfer → A-101 500, B-202 2500 · CHECK violation → `23514`, then `COMMIT` silently becomes `ROLLBACK` · after the savepoint order → Laptop 4, Mouse 48 · `RELEASE` example → 120, then `3B001`, then back to 100.

**Lab problem expected values** (problem-statement PDF, Keyboard starting at 50): Part A → 60 → 70 → `ROLLBACK TO s1` → **60** committed. Part B → +5 = 65 (s1) → +15 = 80 (s2) → −8 = 72 (s3) → +20 = 92 → `ROLLBACK TO s3` = **72** → `ROLLBACK TO s2` = **80** → `ROLLBACK TO s1` = **65** → `COMMIT` **65**.

---

## 7. Single Source of Truth: `data/course.js`

All content comes from one data file, so the instructor can add a week by editing one place and dropping in one file. Use this shape:

```js
export const course = {
  code: "CSE 2206",
  title: "Database Management Systems Sessional",
  semester: "Summer 2026",
  theoryPartner: { code: "CSE 2205", url: "" },        // link to the CSE 2205 site when it exists
  instructors: [
    { name: "Md. Rakib Trofder", role: "Lecturer, Dept. of CSE", email: "trofder@baust.edu.bd",
      room: "303 (C)", hours: ["Sun 10:50 AM – 1:20 PM", "Thu 10:50 AM – 1:20 PM"] },
    { name: "Saad Ahmed", role: "Lecturer, Dept. of CSE", email: "" }   // TODO: instructor to fill
  ],
  dbms: { name: "PostgreSQL", version: "16", clients: ["psql", "DBeaver"] },
  assessment: [ { method: "Attendance", pct: 5 }, /* … Section 2 … */ ],
  outcomes:   [ /* CO1–CO4 */ ],
  labTestDates: { labTest1: null, labTest2: null },    // shown in the countdown when set
  datasets: [
    { id: "library",  title: "Library",                   file: "data/datasets/library.sql",  weeks: [1, 2] },
    { id: "uni3",     title: "Student · Course · Enrollment", file: "data/datasets/uni3.sql", weeks: [3] },
    // joins, programs, triggers, txn_lab …
  ],
  weeks: [
    {
      id: 3,
      label: "Week 3",
      title: "Aggregation, Grouping & Subqueries",
      status: "published",                    // "published" | "upcoming"
      co: ["CO1", "CO3"],
      cluster: "sql",                        // foundations | relational | sql | storage | transactions | modern | revision
      dataset: "uni3",
      summary: "Summarise many rows into one with aggregates, split them into groups, filter groups with HAVING, and nest queries inside queries.",
      topics: ["COUNT / SUM / AVG / MIN / MAX", "NULL in aggregates", "GROUP BY", "HAVING vs WHERE",
               "Scalar subquery", "IN / NOT IN", "ANY / ALL", "EXISTS", "Correlated subquery"],
      decks: [
        { title: "Aggregation, Grouping & Subqueries",
          pdf: "assets/slides/pdf/week-03-aggregation-grouping-subqueries.pdf",
          pptx: "assets/slides/pptx/week-03-aggregation-grouping-subqueries.pptx",
          thumb: "assets/slides/thumbs/week-03.webp", slides: 14, size: "3.9 MB" }
      ],
      handouts: [],                          // Week 7 has two
      snippets: [                            // every SQL block from the deck, in slide order
        { id: "w3-count", slide: 3, title: "COUNT three ways",
          sql: "SELECT COUNT(*) AS TotalRows FROM ENROLLMENT;",
          expected: { columns: ["totalrows"], rows: [[8]] },
          explain: "COUNT(*) counts rows, including the row whose Marks is NULL." }
      ],
      labs: ["aggregate-lens", "groupby", "subquery"],     // ids of interactive visualizations
      labTasks: [                            // the deck's "Lab Tasks" slide, verbatim
        { n: 1, text: "Count how many courses each department offers.", check: null }  // check: see §9.3
      ],
      keyTakeaways: [ /* 3–5 bullets from the deck's wrap-up / callout boxes */ ],
      predict: [ /* 5 "predict the output" questions: { sql, choices[], answer, explain } */ ],
      quiz:    [ /* 5 MCQs: { q, options[], answer, explain } */ ],
      flashcards: [ /* { front, back } */ ],
      cheatsheet: [ /* { goal, statement, watchOut } */ ]
    },
    // … one object per week
  ]
};
```

**Rules and special cases:**
- **Weeks 1–7** are `status: "published"` and come from the decks.
- **Weeks 8–14** have no decks yet. Create them as `status: "upcoming"` using the outline topics, so the roadmap shows the full semester. They render as locked "Coming soon" cards with the topic list. When the instructor adds a deck, they change `status` to `"published"` and fill `decks`. Use these titles (from the outline, adjusted to what the decks have not covered yet):
  - Week 8: ER Modeling & Schema Design (ER → tables with keys and constraints) · CO2
  - Week 9: Normalization in Practice (FDs, anomalies, 1NF → BCNF) · CO2
  - Week 10: Indexes, Sequences & DCL (`CREATE INDEX`, `GRANT`, `REVOKE`) · CO1, CO3
  - Week 11: Procedural SQL: Blocks, Variables, Loops, Cursors & Exceptions · CO3
  - Week 12: Integrity Constraints in Depth (`FOREIGN KEY`, `UNIQUE`, `CHECK`, `ON DELETE CASCADE / SET NULL`) · CO1, CO2
  - Week 13: Connecting a Database to an Application (Java / PHP / Python) & project review · CO3, CO4
  - Week 14: Final Evaluation: Lab Test 2, project demo, report, viva · CO2, CO3, CO4 → show the **Revision page** (§8.8)
- **Week 7** has one deck **and two handouts**. Show the deck in the viewer, and the two PDFs as "Lab handout" and "Problem statement" tabs in the same viewer.
- **Read each deck's text** with `python-pptx` to fill `summary`, `topics`, `snippets`, `labTasks`, `keyTakeaways` and `cheatsheet`. **Write the quiz, flashcards and predict-the-output questions from the slide content only.** Do not invent facts beyond the slides and standard PostgreSQL behaviour.
- **Every `snippet` must have `expected` output** where the slide shows a result. A test (`tests/expected-outputs.test.js`, run with Node + PGlite) executes every snippet against its dataset and fails if the output differs from the slide. This is how you prove the site matches the lectures.

---

## 8. Site Map and Pages

### 8.1 Home (`#/`)
- **Hero**: "CSE 2206 · DBMS Sessional" badge, title, semester, both instructors, and a friendly line such as *"Write it. Run it. See why it works."*
- **Live hero demo**: a tiny editor with `SELECT BookTitle, AvailableCopies FROM Library ORDER BY AvailableCopies DESC LIMIT 3;` and an animated result table that fills row by row. One click on **Run** wakes the real engine. Pause the animation under `prefers-reduced-motion`.
- **"Continue where you left off"** card (last week, last slide page, last playground query), from localStorage.
- **Quick stats**: 7 lab decks · 2 handouts · 6 datasets · 100+ runnable queries · 18 interactive labs (count the real numbers from `course.js`). Count up on first view.
- **Course progress ring**: the share of published weeks marked done.
- **Lab test countdown** (hidden until a date is set in `course.js`).
- **Weekly roadmap preview**: the first 4 week cards and a "See full roadmap" link.
- **Quick links**: SQL Playground · SQL MCQ Practice · Cheat Sheets · Lab Test Prep · Setup PostgreSQL · Project.

**Main navigation (top bar on desktop, bottom tab bar + "More" drawer on phones):** Home · Weeks · Playground · Labs · **MCQ** · **Cheat Sheets** · Lab Test Prep · More (Setup, Project, Glossary, Course Info).

### 8.2 Weekly Roadmap (`#/weeks`)
- A **vertical timeline** on mobile and a **metro-map / winding path** on desktop. Each stop is a week, coloured by **topic cluster**:
  - **Foundations** (W1: PostgreSQL & SQL basics): indigo `--c-foundations`
  - **Relational** (W2: DDL, tables & schemas · W8: ER modeling · W9: normalization · W12: integrity constraints): violet `--c-relational`
  - **SQL** (W3: aggregation & subqueries · W4: joins & set operations): blue `--c-sql`
  - **Storage** (W6: triggers, backup & restore · W10: indexes, sequences & DCL): teal `--c-storage`
  - **Transactions** (W7: transactions, rollback & savepoints): amber `--c-txn`
  - **Modern** (W5: procedures, functions, triggers & views · W11: procedural SQL · W13: application connectivity & project): rose `--c-modern`
  - **Revision** (W14: final evaluation & revision): slate `--c-revision`

  These are the same seven chapter colours and names as the CSE 2205 site, so the two courses feel like one family.
- Each card shows: thumbnail, week number, title, CO chips, number of slides, number of runnable queries, the dataset used, a ✓ "Done" toggle, and a mini progress dot. Upcoming weeks show a lock and "Coming soon".
- **Filters**: by CO (CO1–CO4), by cluster, "Not done yet", "Published only".

### 8.3 Week Detail (`#/week/:id`)
Layout: a **sticky left sidebar** (week list, collapses into a drawer on mobile) and a main column with:
1. **Header**: "Week 3 · Aggregation, Grouping & Subqueries", CO chips, cluster colour strip, the dataset chip ("Runs on: Student · Course · Enrollment"), prev/next arrows.
2. **Slide Viewer** (PDF.js):
   - Large page view, thumbnail strip, page x / y, zoom, **full-screen / presentation mode**, keyboard ←/→.
   - Buttons: **Download PPTX** · **Download PDF** · **Open in new tab**.
   - **"Run this slide's SQL"** button: when the current slide has snippets, it opens them in the side runner (below) already loaded.
   - Lazy-load: render only when scrolled into view, with a skeleton loader. On phones, start in fit-to-width and allow swipe.
3. **Meet the data**: the week's tables shown as compact, styled result tables, with an ER-style mini diagram of the keys. "Every answer this week can be checked against these rows."
4. **Runnable examples**: every snippet from the deck in slide order. Each is a **SQL card**:
   - The SQL (highlighted, editable), the slide number it came from, and a one-line "what this shows".
   - **Run** (Ctrl/⌘+Enter) → real output table, the PostgreSQL command tag (`SELECT 3`, `UPDATE 2`, `INSERT 0 2`, `DELETE 1`) and the run time.
   - **Expected (from slide)** tab next to **Your output**. When they match, show a green ✓ "Matches the slide". When the student edits the query and the output changes, highlight the changed cells.
   - **Explain** toggle: a plain-language walk-through of the clauses in execution order (§9, Lab 2).
   - **Reset** (restore the original query) and **Copy**.
   - Write queries (`INSERT/UPDATE/DELETE/ALTER/DROP`) run on the student's own copy of the dataset and show a **before → after diff** of the table (added rows green, changed cells amber, deleted rows red, struck through).
5. **What you'll learn**: topic chips.
6. **Interactive lab(s)** for this week, embedded inline (Section 9).
7. **Key takeaways**: 3–5 cards.
8. **Predict the output**: 5 cards. The student sees a query and picks the result *before* running it, then the site runs it and shows why.
9. **Lab tasks**: the deck's "Lab Tasks" slide, verbatim, each with its own editor (§9.3 for checking). A **"Download my answers as .sql"** button builds the submission file the slides ask for (one statement per task, each with a comment above it; Week 3 uses the name `<StudentID>_Lab_Aggregation.sql`).
10. **Check yourself**: a 5-question MCQ quiz with instant feedback and an explanation. Score saved locally.
11. **Flashcards**: flip cards for key terms.
12. **Mark week as done** button.

### 8.4 SQL Playground (`#/playground`): the heart of the site
A full-page, IDE-style workspace (stacks vertically on phones):
- **Left: schema browser.** Dataset switcher, then a tree of schemas → tables → columns with types, PK 🔑 and FK 🔗 icons. Click a table to insert `SELECT * FROM table;`. Click a column to insert its name.
- **Centre: editor** (CodeMirror, PostgreSQL mode) with multiple tabs ("Query 1", "Query 2"…), **Run** (runs the statement at the cursor or the selection), **Run all** (runs the whole script in order, like DBeaver's Alt+X), **Format**, **Clear**. psql meta-commands (`\d library`, `\dt`, `\dn`) work.
- **Bottom: results.** One result tab per statement in a script. Sortable columns, NULL shown as a faint `NULL` pill, row count and command tag, **Copy as CSV** and **Download CSV**. Errors appear as a friendly card: the PostgreSQL message and SQLSTATE code, the line highlighted in the editor, and a plain-English hint for common errors (§9.4).
- **Transaction indicator** in the status bar: `Autocommit` / `In transaction` / `Transaction aborted (25P02)`, plus the current savepoint stack. This makes Week 7 visible everywhere.
- **"Example queries" dropdown** grouped by week (every snippet from `course.js`).
- **History** of the last 50 queries and **Saved snippets** (localStorage).
- **Reset dataset** and **Export my database as .sql** (a `pg_dump`-like script generated from the catalog, so students can take their work to the real lab machine).
- **Shareable link**: `#/playground?ds=uni3&q=<base64 sql>` opens the playground with that query loaded (never auto-runs write queries from a link).

### 8.5 Interactive Labs (`#/labs`)
A gallery of all visualizations from Section 9. Each card has a short animated preview and a "Week X" chip. Each lab also has its own route (`#/lab/joins`).

### 8.6 Cheat Sheets (`#/cheatsheets`): its own top-level menu
A dedicated page (and nav item) that students can open in a hurry during the lab. All content comes from `data/cheatsheets.js`, so the instructor can add a card without touching code.

**Layout:** a left category rail (a horizontal chip bar on phones), a search box ("type `having`, `savepoint`, `between`…"), and a grid of cards. Each card has a title, a one-line "when to use it", and rows of **syntax → example query → what it returns**. Every example has **▶ Run** (runs on the right dataset and shows the output inline in the card), **Open in playground**, **Copy**, and a "Learn in Week X" link. Each category card carries its chapter colour strip (§8.2). Sub-routes: `#/cheatsheets/ddl`, `#/cheatsheets/joins`, etc.

**Categories: example queries** (every example runs on the lab datasets in Section 6, and its expected output is stored in the file). Do **not** add a keyboard-shortcuts category to this page.

| # | Category | Must include (at least) |
|---|---|---|
| 1 | **DDL** | `CREATE TABLE` with PK / NOT NULL / DEFAULT, `IF NOT EXISTS`, `ALTER TABLE … ADD / DROP / RENAME COLUMN`, `RENAME TO`, `ALTER COLUMN … TYPE … USING`, `ADD CONSTRAINT … PRIMARY KEY`, `SET / DROP NOT NULL`, `SET DEFAULT`, `DROP TABLE [IF EXISTS] [CASCADE]`, `TRUNCATE`, schemas & `search_path`, `CREATE / ALTER / DROP DATABASE`. Plus the full W2 cheat-sheet table (slide 16). |
| 2 | **DML** | `INSERT` (named columns, multi-row), `UPDATE … SET … WHERE` (incl. `col = col - 1`), `DELETE … WHERE`; and the **DELETE vs TRUNCATE vs DROP** comparison. |
| 3 | **Querying (DQL)** | `SELECT *` / columns, `DISTINCT`, `AS`, `WHERE` with `= <> > < >= <=`, `AND`, `OR`, `NOT`, `BETWEEN … AND …`, `IN (…)`, `LIKE 'C%'` / `'%Code'` / `'_o%'`, `ILIKE`, `IS NULL` / `IS NOT NULL`, `ORDER BY … ASC/DESC` (multi-column), `LIMIT`, `LIMIT … OFFSET` (paging), Top-N. Plus **clause order: written vs executed**. |
| 4 | **Aggregates & grouping** | `COUNT(*)` vs `COUNT(col)` vs `COUNT(DISTINCT col)`, `SUM`, `AVG`, `ROUND`, `COALESCE`, `MIN/MAX`, `GROUP BY` one/two columns, `GROUP BY` after `JOIN`, `HAVING`, `WHERE` vs `HAVING`. |
| 5 | **Subqueries** | Scalar, `IN` / `NOT IN` (the NULL trap), `ANY` / `ALL` (`> ANY ≡ > MIN`, `> ALL ≡ > MAX`), `EXISTS` / `NOT EXISTS`, correlated. |
| 6 | **Joins & set operations** | Inner (theta, equi, natural), `CROSS`, `LEFT`, `RIGHT`, `FULL`, self join, semi/anti join, "find unmatched rows" (`LEFT JOIN … IS NULL`), `UNION`, `UNION ALL`, `INTERSECT`, `EXCEPT`. Each with a mini Venn icon and its symbol ⋈ ⟕ ⟖ ⟗ ×. |
| 7 | **Database programs** | Procedure + `CALL`, `INOUT`, function used in `SELECT`, `BEFORE` / `AFTER` triggers, `NEW` / `OLD` / `TG_OP` table, list/disable/drop a trigger, view, materialized view + `REFRESH`, view vs materialized view table, `pg_dump` / `pg_restore` / `psql -f` commands. |
| 8 | **Transactions** | `BEGIN`, `COMMIT`, `ROLLBACK`, `SAVEPOINT`, `ROLLBACK TO SAVEPOINT`, `RELEASE SAVEPOINT`, the "commands compared" table (W7 slide 10), ACID in one line each, the `pg_stat_activity` "who is in a transaction?" query, and the error codes `23514`, `25P02`, `3B001`. |
| 9 | **Common errors** | The SQLSTATE hint table from §9.4, each with a one-line broken query and its fix. |

**Extras:** **Print this sheet** / **Print all** (A4, two columns, light background; "Save as PDF" works through the browser's print dialog), and ☆ to pin favourite cards to the top (localStorage).

### 8.7 Lab Test Prep (`#/labtest`)
- **Exam-weight reminder**: Lab Test = 25%, Lab Performance = 15%, Quiz = 10%.
- **Practice sets** built only from the decks' lab tasks and the Week 7 problem statement (never from the private assessment files in §3.4): "Library set" (W1–2), "Aggregation set" (W3), "Joins set" (W4), "Programs set" (W5–6), "Transactions set" (W7).
- **Timed mode**: pick a set and a time (30/45/60 min). Each task has an editor and an auto-check (§9.3). At the end: score, time per task, and a downloadable `.sql` file.
- **"Common mistakes"** list, built from the slides' warning boxes: `UPDATE` without `WHERE`, `NOT IN` with a NULL, a non-grouped column in `SELECT`, `LIMIT` without `ORDER BY`, `ADD COLUMN … NOT NULL` without a default, `COMMIT` after an error.
- A **study-plan generator**: the student picks the lab test date, and the site spreads the unfinished weeks across the remaining days.

### 8.8 Revision (`#/week/14`)
An auto-generated one-page summary of every published week (title, topics, takeaways, one key query each), a **CO-wise checklist** ("CO1: I can create a table with constraints ☐ …"), and links to Lab Test Prep, Cheat Sheets and the Project page.

### 8.9 Setup PostgreSQL (`#/setup`)
Help students reproduce the lab on their own laptop:
- **The five connection values** (host, port, user, password, database) with a live builder that outputs the `psql -h … -p … -U … -d …` command and the `postgresql://…` URI (W1 slide 4).
- **Option A, Docker (recommended in the lab)**: download `setup_docker_postgres.sh`, the two usage lines, and what each of its 8 steps does.
- **Option B, native installer**: links to the official PostgreSQL downloads for Windows/macOS/Linux.
- **Connect with DBeaver**: a short illustrated checklist (new connection → PostgreSQL → the five values → test connection), plus the handout's tips: Ctrl+Enter runs one statement, Alt+X runs the script, Ctrl+] opens a new SQL tab, `SET search_path TO txn_lab;` in every new tab.
- **Troubleshooting**: "connection refused" (is the service/container running? is it port 5432?), "password authentication failed", "database does not exist", "relation does not exist" (schema / `search_path`, lower-case names).
- **Load the lab data**: each dataset in §6 as a downloadable `.sql` file.

### 8.10 Project (`#/project`) (CO4)
From the outline: team project kick-off in Week 7, progress review in Week 13, demonstration, presentation, report and viva in Week 14. Show a timeline of these milestones, a checklist (proposal → ER diagram → normalized schema → tables with constraints → sample data → queries, views, procedures and triggers → application connection → report → demo → viva), and a "Starter ideas" list (Library, Hospital, University, Bank, E-commerce, Food delivery). Leave a clear `TODO` in `course.js` for the instructor's rules (team size, deadlines, report format).

### 8.11 Glossary (`#/glossary`)
An A–Z list of 60+ terms, each with a one-line definition, a tiny SQL example and a "Learn in Week X" link: schema, `search_path`, primary key, NOT NULL, DEFAULT, DDL, DML, TCL, DCL, `DISTINCT`, alias, `LIMIT`/`OFFSET`, aggregate, `COALESCE`, `GROUP BY`, `HAVING`, scalar subquery, correlated subquery, `ANY`, `ALL`, `EXISTS`, theta join, equi join, natural join, cross join, outer join, self join, semi join, anti join, `UNION` vs `UNION ALL`, `INTERSECT`, `EXCEPT`, stored procedure, `CALL`, `INOUT`, function, PL/pgSQL, trigger, `NEW`, `OLD`, `TG_OP`, `BEFORE`/`AFTER`/`INSTEAD OF`, row-level vs statement-level trigger, view, materialized view, `REFRESH … CONCURRENTLY`, `pg_dump`, `pg_restore`, `pg_dumpall`, autocommit, transaction, `BEGIN`, `COMMIT`, `ROLLBACK`, atomicity, isolation, savepoint, `RELEASE SAVEPOINT`, SQLSTATE, `25P02`, `pg_stat_activity`, … Include live search.

### 8.12 Course Info (`#/about`)
Course facts, instructor cards with email, room and counselling hours, the synopsis, the assessment donut chart, the CO table with delivery and assessment methods, the references, and the full 14-week plan table (published weeks link to their page).

### 8.13 SQL MCQ Practice (`#/mcq`): Complete SQL Review
A top-level menu page with a bank of **70 multiple-choice questions**, each with **exactly 4 options (A–D), one correct answer, and a short explanation**. Use the bank in **Appendix A word for word**, and store it in `data/mcq.js`. It is a complete SQL review of the four syllabus areas:

| Section | Covers | Questions | Learn in |
|---|---|---|---|
| **1. Data Definition Language (DDL)** | `CREATE`, `ALTER`, `DROP`, `TRUNCATE`, constraints, schemas | Q1–Q15 (15) | Weeks 1–2 |
| **2. Data Manipulation & Querying (DML & DQL)** | `INSERT`, `UPDATE`, `DELETE`, `SELECT`, `WHERE`, `LIKE`, `LIMIT`, `ORDER BY`, `BETWEEN`, `AND`, `OR`, `IS NULL`, `DISTINCT`, `AS` | Q16–Q35 (20) | Weeks 1–2 |
| **3. Aggregation & Relational Joins** | `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`, `GROUP BY`, `HAVING`, `INNER`, `LEFT`, `RIGHT`, `FULL`, `CROSS`, `NATURAL`, self join, `UNION` | Q36–Q55 (20) | Weeks 3–4 |
| **4. Database Transactions** | ACID, autocommit, `BEGIN`, `COMMIT`, `ROLLBACK`, `SAVEPOINT`, `RELEASE`, errors inside a transaction, isolation | Q56–Q70 (15) | Week 7 |

**Page intro text:** *"Complete SQL Review. 70 questions across DDL, DML & querying, aggregation & joins, and transactions. Most questions use the same lab tables you practised on, so you can run any question in the playground to check yourself."*

**Setup panel (before starting):**
- **Answer mode**: two large radio cards; the student picks one.
  1. **Exam mode: "Show answers after I submit"**. No feedback while answering. A progress bar and a question-navigator grid (answered / unanswered / flagged ⚑). A **Submit** button with a confirm dialog that lists unanswered questions. After submitting, show the **score**, percentage, time taken and a **per-section breakdown bar** (DDL / DML & DQL / Aggregation & Joins / Transactions). Below that, a **review list**: every question with the student's choice, the correct option in green, a wrong choice in red, and the explanation. A filter shows "Wrong only / All".
  2. **Practice mode: "Show the answer per question"**. The student picks an option and presses **Check answer** to see correct/incorrect (green/red) and the explanation. Or they press **Show answer** to reveal it without answering; this counts as "revealed", not "correct". They move on with Next/Previous at their own pace, with a running score.
- **Sections**: all four (default) or any subset.
- **Number of questions**: 10 · 20 · 35 · **70 (all)**.
- **Shuffle questions** and **Shuffle options** toggles. When options are shuffled, the correct answer must follow its option text, not its letter.
- **Timer** (exam mode only): off · 30 · 45 · 60 min. When time runs out, the quiz is submitted automatically.

**Question card:** section chip, "Q12 of 70", the question, an optional **SQL block** (JetBrains Mono, highlighted), a dataset chip when the question uses lab data ("Uses: Library"), 4 large tap-friendly options (at least 48 px tall), ⚑ Flag for review, and, once the answer is shown, **▶ Run this in the playground** for questions that contain SQL.

**After a round:** **Retry wrong answers only**, **Retry all**, **New random set**. Best score per section and questions answered wrongly twice are saved in `localStorage` (`cse2206-mcq`, wrapped in `try/catch`). The weakest section links to its week and its cheat-sheet card.

**Data shape (`data/mcq.js`):**
```js
export const mcqs = [
  { id: 1, section: "DDL", weeks: [2], dataset: null,
    q: "CREATE TABLE belongs to which category of SQL commands?",
    sql: null,
    options: ["DML", "DDL", "TCL", "DCL"],
    answer: 1,                       // index into options (0 = A, 1 = B, …)
    explain: "CREATE, ALTER and DROP define or change structure, so they are Data Definition Language." },
  // … 70 questions, copied from Appendix A
];
```
Keyboard: 1–4 or A–D picks an option, Enter checks or moves next, F flags. Accessibility: options are a radio group, and feedback is announced with `aria-live`.

The **Week Detail** page's "Check yourself" quiz also pulls up to 5 matching questions from this bank (filtered by `weeks`), and **global search** indexes the MCQ questions.

---

## 9. Smart Visualizations: SQL You Can See

Every lab must: work with **mouse, touch and keyboard**; have **Play / Step / Back / Reset** controls and a **speed slider**; show a **plain-language caption** for every step ("WHERE keeps 4 of 5 rows: AvailableCopies > 3"); use the **theme colour tokens** so it looks right in both themes; respect `prefers-reduced-motion`; and **run the real query on PGlite**, so the animation always agrees with the actual output. Where possible, the student can **edit the query** and the visualization rebuilds itself.

### 9.1 The labs

| # | Lab | Week | What the student does and sees |
|---|---|---|---|
| 1 | **Where Does My Data Live? (Server → Column)** | 1 | Nested, zoomable boxes: server `localhost:5432` → database `libraryDB` → schema `public` → table `library` → column `booktitle`. Clicking a level shows the psql command that lists it (`\l`, `\dn`, `\dt`, `\d library`) and runs it. Includes the connection-string builder. |
| 2 | **Clause Execution Order Animator** | 1, 3 | Type any SELECT. The query is split into clause chips in **written order**, which then rearrange into **execution order** (FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT). Stepping shows the intermediate table after each clause: rows fade out at WHERE, columns collapse at SELECT, rows reorder at ORDER BY, rows are cut at LIMIT. Preload the W1 slide 13 example (5 → 4 → 2 columns → sorted → 2 rows) and the W3 HAVING example. |
| 3 | **WHERE Filter Lens** | 1 | The Library table with a condition builder (column, operator `= <> > < >= <=`, value). Each row gets a ✓ or ✗ badge as the condition is tested, and failing rows dim. Shows the count ("3 rows"). Includes a "Text is case-sensitive" demo with `'database'` vs `'Database'`. |
| 4 | **Safe Write Simulator (INSERT / UPDATE / DELETE)** | 1, 7 | Write an UPDATE or DELETE. Before it runs, the site shows a **preview**: the rows the WHERE matches, highlighted. Then it runs and shows the before → after diff and the reply (`UPDATE 2`, `DELETE 0`). Removing the WHERE triggers a red "This changes all 5 rows" warning, and a **Run inside BEGIN … ROLLBACK** button teaches the three habits from W1 slide 17. |
| 5 | **DDL Table Morpher** | 2 | A live table "card" with a header row (column name, type, NOT NULL, DEFAULT, 🔑). Each ALTER TABLE action animates the card: a column slides in filled with `NULL` (ADD COLUMN), drains out (DROP COLUMN), relabels (RENAME), changes its type badge (ALTER TYPE). The `\d library` panel updates beside it. Includes the three failure demos from the slides with their real PostgreSQL errors: `ADD COLUMN … NOT NULL` without a default on a non-empty table, shrinking `BookTitle` to `VARCHAR(10)`, and `SET NOT NULL` while NULLs exist. Every step can be wrapped in `BEGIN; … ROLLBACK;` to show that DDL is transactional in PostgreSQL. |
| 6 | **DELETE vs TRUNCATE vs DROP** | 2 | Three identical Library tables side by side. Press a button on each: rows disappear (DELETE, with optional WHERE), all rows vanish at once (TRUNCATE), the whole table, header included, disappears and `SELECT` returns "relation does not exist" (DROP). A summary row compares rows / structure / WHERE allowed. |
| 7 | **Schemas & search_path Explorer** | 2 | Create schemas `campus` → rename to `academics`, move `Library` with `SET SCHEMA`, change `search_path`, and see which table an unqualified `SELECT * FROM Library` actually reads. `DROP SCHEMA` (fails when not empty) vs `DROP SCHEMA … CASCADE`. Database-level commands are simulated, with the "disconnect first" and "cannot run inside a transaction" rules shown. |
| 8 | **Aggregate Lens (NULL-aware)** | 3 | The ENROLLMENT table with the NULL mark highlighted. Toggle COUNT(\*) / COUNT(Marks) / COUNT(DISTINCT StuID) / SUM / AVG / AVG(COALESCE(Marks,0)) / MIN / MAX. Cells that count light up, the NULL row stays grey for column aggregates, and a formula strip shows the arithmetic (`536 ÷ 7 = 76.57` vs `536 ÷ 8 = 67.00`). |
| 9 | **GROUP BY / HAVING Animator** | 3 | Rows slide into coloured buckets by the grouping column, each bucket computes its aggregates, and HAVING fades out the buckets that fail. Shows the "classic error": adding a non-grouped column turns the SELECT red with the real PostgreSQL error. Supports grouping by two columns and grouping after a JOIN (Dept-wise report). |
| 10 | **Subquery Explorer** | 3 | Five modes, one per slide: **Scalar** (the inner query collapses into one glowing value that drops into the outer WHERE) · **IN / NOT IN** (the inner list appears as chips; inject a NULL into the list and watch NOT IN return zero rows: the NULL trap) · **ANY / ALL** (a number line with the inner set; `> ANY` shades everything above MIN, `> ALL` above MAX) · **EXISTS / NOT EXISTS** (for each outer row, a probe searches the inner table and stops at the first match) · **Correlated** (the inner query re-runs once per outer row, with the outer value plugged in and a counter of executions). |
| 11 | **Join Visualizer** | 4 | Pick INNER (theta / equi / natural), CROSS, LEFT, RIGHT, FULL or SELF. Left: a Venn diagram (or a grid for CROSS JOIN). Centre: lines connect matching rows of the two tables. Right: the actual result table. NULL-padded cells glow. Shows the row count of each join on the same data, and the MySQL `LEFT … UNION … RIGHT` workaround for FULL JOIN. Runs on `joins.sql`; an "Import from Week 3 data" toggle uses STUDENT/ENROLLMENT. |
| 12 | **Set Operations & Semi/Anti Join** | 4 | Two SELECT results as coloured stacks. UNION (duplicates merge), UNION ALL (they don't), INTERSECT, EXCEPT. A "union-compatible?" checker turns red when the column counts or types differ. Second tab: semi join vs anti join with EXISTS, side by side with the equivalent IN / NOT IN and LEFT JOIN … IS NULL versions, proving they return the same rows. |
| 13 | **Procedure vs Function vs Trigger** | 5 | Three lanes. **Procedure**: `CALL AddStudent('Rafi','CSE')` → a row is inserted (`INOUT` value comes back for `GetStudentCount`). **Function**: `GetGrade(marks)` is applied to every row inside a SELECT, the result column filling cell by cell. **Trigger**: nobody calls it; an INSERT event fires `set_created_at()` and the `created_at` cell is stamped. A summary table compares *how it is invoked / returns / can be used in SELECT*. |
| 14 | **View vs Materialized View: Staleness Demo** | 5 | Base table `Student`, a view `CSE_Students` and a materialized view `Dept_Avg_CGPA` side by side. Change a CGPA or insert a student: the view updates immediately, the materialized view shows a "stale" badge until **REFRESH MATERIALIZED VIEW** is pressed. A timing bar compares query cost (live recomputation vs reading stored rows). |
| 15 | **Trigger Inspector (NEW / OLD / TG_OP)** | 6 | Run INSERT, UPDATE or DELETE on `employee`. A panel shows the `OLD` row and the `NEW` row side by side (greyed out when "not available"), the `TG_OP` value, timing (BEFORE / AFTER) and level (ROW / STATEMENT). AFTER UPDATE writes an audit row that slides into `salary_audit`. A BEFORE trigger with `RETURN NULL` shows the row being skipped. Buttons for `DISABLE TRIGGER` / `ENABLE TRIGGER` / `DROP TRIGGER`, and the `pg_trigger` listing query. |
| 16 | **Backup & Restore Builder** | 6 | Choose a format (plain SQL, custom `-Fc`, directory `-Fd -j N`, all databases) and options. The site generates the exact `pg_dump` command, the matching restore command (`psql -f` for plain, `pg_restore` for the others, with `--clean --if-exists`, `-l`, `-t`), and an animated diagram: database → dump file (readable script vs compressed archive vs folder of files) → new database. A "plain SQL preview" shows a real dump-style script generated from the current playground database. Clearly labelled: "These commands run on your own computer, not in the browser." |
| 17 | **Transaction & Savepoint Timeline** | 7 | A horizontal timeline. Each statement becomes a block; `BEGIN` opens a bracket; `SAVEPOINT s1` drops a flag; `ROLLBACK TO s1` rewinds the line to the flag, greying out later blocks; `RELEASE` removes a flag but keeps the blocks; `COMMIT` seals everything; `ROLLBACK` wipes the bracket. A live value chart shows `stock` (or account balances) after each step, and a savepoint **stack** shows the flags. Preloaded scenarios: **Lab Part A** (50 → 60 → 70 → 60 ✓) and **Lab Part B** (65 → 80 → 72 → 92 → 72 → 80 → 65 ✓), the **20-mice order**, and the **RELEASE** example ending in error `3B001`. |
| 18 | **Autocommit vs Transaction, Atomicity & Isolation** | 7 | Three tabs. **Autocommit**: replays Scene 1 (`SUM` 8000 → 10500) and Scene 2 (the `'B-2O2'` typo, `SUM` 8000 → 7500, "500 Tk vanished"), then the same scenes inside BEGIN/ROLLBACK where nothing is lost. **Atomicity**: the Sumi/Nila transfer hits the CHECK constraint (`23514`), the next statement is refused with `25P02`, and `COMMIT` silently turns into ROLLBACK. **Isolation**: two "DBeaver tabs" side by side stepping through t1 → t8; Tab 1 sees 2500 while Tab 2 still sees 1500, with a `pg_stat_activity` panel showing `idle in transaction` → `idle`. A "COMMIT instead" toggle shows Tab 2 then seeing 2500. |

> **Priority if time is short:** build the **SQL Playground (§8.4)**, the **runnable SQL cards (§8.3 item 4)**, then **#2 Clause Order, #11 Join Visualizer, #9 GROUP BY / HAVING, #10 Subquery Explorer, #17 Savepoint Timeline and #5 DDL Morpher**. These cover the most lab-test material.

### 9.2 Output conventions (apply everywhere)
- Result tables use JetBrains Mono, zebra rows, sticky header, right-aligned numbers, and a faint `NULL` pill (never an empty cell).
- Always show the **command tag** under the result (`SELECT 5`, `INSERT 0 2`, `UPDATE 2`, `DELETE 1`, `CREATE TABLE`, `ALTER TABLE`, `BEGIN`, `COMMIT`, `ROLLBACK`).
- Numbers keep PostgreSQL formatting (`76.5714285714285714` for raw `AVG`, `76.57` after `ROUND`). When the slide shows a rounded value, the "Expected" tab explains the difference in one line.
- Long results scroll **inside** the card, never the page. On phones, the table scrolls horizontally inside its own container only.

### 9.3 Auto-checking lab tasks
For each lab task, `course.js` may hold a hidden **reference query**. "Check my answer" runs both queries on a fresh copy of the dataset and compares the result sets (column count, row count, values; order is ignored unless the task says "sort"). For write tasks (INSERT, ALTER…), it compares the resulting table state instead. The feedback is specific: "Your query returns 4 rows; the expected result has 3. Did you forget to filter out NULL marks?"

Add a per-week switch `showTaskChecker: true/false` and `showSolutions: false` in `course.js`, so the instructor can hide the checker during the week a task is being graded, and decide if and when solutions appear.

### 9.4 Friendly error hints
Map common SQLSTATE codes to a short explanation and a hint: `42P01` relation does not exist (check spelling, schema, `search_path`) · `42703` column does not exist (names fold to lower case) · `42601` syntax error (missing comma, quote or semicolon) · `42803` must appear in GROUP BY · `23505` duplicate key · `23502` NOT NULL violation · `23514` CHECK violation · `22P02` invalid input syntax (text into INT) · `22001` value too long for VARCHAR · `25P02` transaction aborted (end it with ROLLBACK) · `3B001` savepoint does not exist · `2BP01` cannot drop because other objects depend on it (use CASCADE carefully).

---

## 10. Visual Design System

### 10.1 Overall feel and design style
- **Style:** a modern, minimal **SaaS aesthetic built on Tailwind CSS**, clean and calm, like a premium coding-practice app (think Linear, Notion and Brilliant.org, with a touch of a well-designed SQL client). Generous white space. Code and results are first-class citizens: they should look as good as the headings.
- **Shape:** **16 px border radius** on cards, panels, modals and the SQL card, for a soft, rounded look (8–10 px on buttons, chips and inputs).
- **Depth:** shadows are **subtle and layered**: a **dual-layer box shadow** (a tight 1 px contact shadow plus a soft 24 px ambient shadow, see `--shadow`). Cards lift by 2 px with a slightly stronger shadow on hover.
- **Typography:** **Plus Jakarta Sans for all UI text** and **JetBrains Mono for code** (§10.4).
- **Scrollbar:** styled to be **unobtrusive**: thin (8 px), a rounded thumb in `--border` that darkens to `--text-muted` on hover, and a transparent track. Use `scrollbar-width: thin; scrollbar-color: …` for Firefox and `::-webkit-scrollbar` rules for Chrome/Safari/Edge, defined for both themes. Apply it to the page, result tables, the editor and the sidebar.
- **Colour:** used **meaningfully**, not for decoration (§10.2):
  - **Light mode:** a clean off-white background (`#F8FAFC`), white surfaces (`#FFFFFF`) and deep slate text (`#0F172A`). The **primary brand colour is indigo (`#4F46E5`)**, with a **sky blue accent (`#0EA5E9`)**.
  - **Dark mode:** flips to deep navy backgrounds (`#0B1120` page, `#111827` surfaces) with light grey text (`#E5E7EB`).
  - **Semantic chapter colours:** each course chapter has its own colour, giving the UI a visually distinct, topic-coded feel: **indigo for Foundations, violet for Relational, blue for SQL, teal for Storage, amber for Transactions, rose for Modern, and slate for Revision**. They appear on the roadmap, week cards, the week header strip, CO/chapter chips, lab cards, cheat-sheet cards and MCQ section chips.
  - SQL output states (added / changed / removed rows, NULL pills) have their own soft tokens.
- **Accessibility polish:** full dark-mode support and `prefers-reduced-motion` respect throughout.

### 10.2 Theme tokens (CSS custom properties)

**Light mode (default)**
```css
:root {
  --bg: #F8FAFC;          --surface: #FFFFFF;     --surface-2: #F1F5F9;
  --text: #0F172A;        --text-muted: #475569;  --border: #E2E8F0;
  --primary: #4F46E5;     --primary-soft: #EEF2FF;
  --accent: #0EA5E9;      --success: #16A34A;     --warning: #D97706;  --danger: #DC2626;
  /* chapter colours: Foundations · Relational · SQL · Storage · Transactions · Modern · Revision */
  --c-foundations: #6366F1; --c-relational: #8B5CF6; --c-sql: #3B82F6;
  --c-storage: #14B8A6;     --c-txn: #F59E0B;        --c-modern: #F43F5E; --c-revision: #64748B;
  /* scrollbar */
  --scrollbar-thumb: #CBD5E1; --scrollbar-thumb-hover: #94A3B8;
  /* SQL output states */
  --row-added: #DCFCE7;   --row-changed: #FEF3C7; --row-removed: #FEE2E2;
  --null-pill: #E2E8F0;   --match: #16A34A;
  /* code editor (light) */
  --code-bg: #F8FAFC;     --code-text: #0F172A;   --code-keyword: #7C3AED;
  --code-string: #047857; --code-number: #B45309; --code-comment: #64748B;
  --shadow: 0 1px 2px rgba(15,23,42,.06), 0 8px 24px rgba(15,23,42,.06);
  --radius: 16px;
}
```

**Dark mode**
```css
:root[data-theme="dark"] {
  --bg: #0B1120;          --surface: #111827;     --surface-2: #1F2937;
  --text: #E5E7EB;        --text-muted: #9CA3AF;  --border: #273244;
  --primary: #818CF8;     --primary-soft: #1E1B4B;
  --row-added: #14532D;   --row-changed: #713F12; --row-removed: #7F1D1D;
  --null-pill: #334155;
  --code-bg: #0F172A;     --code-text: #E2E8F0;   --code-keyword: #C4B5FD;
  --code-string: #6EE7B7; --code-number: #FCD34D; --code-comment: #94A3B8;
  --scrollbar-thumb: #334155; --scrollbar-thumb-hover: #475569;
  --shadow: 0 1px 2px rgba(0,0,0,.4), 0 8px 24px rgba(0,0,0,.35);
}
```
The chapter colours (`--c-*`), `--accent` and the status colours stay the same in dark mode. When chapter colours are used as a **background** behind text, use a 10–15% tint (e.g. `color-mix(in srgb, var(--c-sql) 12%, transparent)`) with the full colour for the text or border. Check every pair for WCAG AA contrast in both themes, and adjust shades if needed.

**Unobtrusive scrollbar**
```css
* { scrollbar-width: thin; scrollbar-color: var(--scrollbar-thumb) transparent; }
*::-webkit-scrollbar { width: 8px; height: 8px; }
*::-webkit-scrollbar-track { background: transparent; }
*::-webkit-scrollbar-thumb { background: var(--scrollbar-thumb); border-radius: 999px; }
*::-webkit-scrollbar-thumb:hover { background: var(--scrollbar-thumb-hover); }
```

### 10.3 Theme toggle rules
- **Light mode is the default** on first visit, even if the operating system is dark.
- A sun/moon toggle sits in the top bar. The choice is saved in `localStorage` (`cse2206-theme`).
- Apply the theme **before first paint** (a tiny inline script in `<head>`), so there is no flash.
- The theme crossfades smoothly (200 ms). All visualizations, charts, the SQL editor and result tables follow the theme.
- The PDF viewer page stays white (the slides are designed on light backgrounds). Only the frame around it changes.

### 10.4 Typography
- **UI font: *Plus Jakarta Sans*** for everything that is not code: headings 700 with tight letter-spacing (−0.02em), body 400/500 at 16–17 px with line-height 1.65, labels and buttons 600. Bangla fallback *Hind Siliguri*.
- Code, SQL and result tables: *JetBrains Mono* 14–15 px, with ligatures off in result tables.
- Relational symbols (⋈ ⟕ ⟖ ⟗ × ∪ ∩ −) render clearly in join and set-operation labs.

### 10.5 Components
Top navigation bar (logo "CSE 2206 · SQL Lab", links incl. **MCQ** and **Cheat Sheets**, search, theme toggle) · mobile bottom tab bar · **MCQ question card + navigator grid + score summary** · **cheat-sheet card with Run / Copy** · sticky week sidebar · week cards · CO chips · cluster colour strip · dataset chip · **SQL card** (editor + Run + output/expected tabs + command tag) · **result table** · **diff table** · **error card** · **transaction status pill** · schema tree · PDF viewer · tabs · accordion · quiz card · predict-the-output card · flip card · toast · progress ring · breadcrumb · footer (course, instructor emails, "Built for BAUST CSE students").

### 10.6 Motion
Small and purposeful: card hover lift (2 px), page fade/slide (150–250 ms), result rows appearing in a quick stagger (30 ms per row, max 300 ms total), visualization steps (400–600 ms, adjustable speed slider). Disable non-essential motion under `prefers-reduced-motion`.

---

## 11. Student-Friendly Features

- **Global search (Ctrl/⌘ + K)**: a command palette that searches week titles, topics, SQL keywords ("HAVING" → Week 3 slide 8 + the GROUP BY lab), glossary terms, cheat-sheet lines, handouts and lab names.
- **"Explain this query" button** on every SQL card and in the playground: breaks the query into clauses, in execution order, each with a one-line plain-English meaning. Rule-based (no AI service, no network).
- **Progress tracking**: weeks done, quiz best scores, lab tasks solved, last-opened slide page per deck. Everything is stored locally, with a **"Reset my progress"** button in the footer.
- **Bookmarks**: star any slide page ("Week 3, page 11") or any query. Listed in a drawer.
- **Resume reading**: reopening a deck jumps to the last page viewed.
- **Lab test countdown** on Home (dates set in `course.js`).
- **Print-friendly** week pages and cheat sheets (hide navigation, expand all sections, show expected outputs).
- **Shareable deep links** to a week, a slide page (`#/week/7?page=8`), a lab, or a playground query.
- **Offline-friendly (nice-to-have)**: a service worker that caches HTML/CSS/JS, PGlite and the PDFs a student has opened, so the playground works without data on the bus home.

---

## 12. Accessibility, Performance and Quality

- WCAG 2.1 AA contrast in **both** themes. Visible focus rings. Full keyboard navigation (including the editor: Esc leaves the editor so Tab can move on). ARIA labels on icon buttons. Result tables use real `<table>` markup with `<th scope>`. Every visualization has a text caption describing the current step.
- Responsive breakpoints: 360 px, 768 px, 1024 px and 1440 px. **No horizontal page scroll on phones.** Wide result tables scroll inside their own container.
- Lazy-load: PDFs (only when a week is opened), PGlite (only on first Run), D3 and lab scripts (only when the lab scrolls into view). The first page load must not download PGlite or any PDF.
- Lighthouse targets: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95 (mobile).
- Pin every CDN library to an exact version.
- Add a favicon, a page `<title>` per route, and Open Graph tags (title + preview image) so links look good in Messenger and WhatsApp groups.
- **Automated test**: `tests/expected-outputs.test.js` runs every snippet in `course.js` on PGlite in Node and compares it with `expected`. It must pass before deploying.

---

## 13. Build Order

1. Run `scripts/prepare-assets.sh`: convert, rename, thumbnail, compress and extract SQL (Section 4). Confirm none of the §3.4 files were copied.
2. Write the six dataset seed files (Section 6) and `data/course.js` (Section 7) from the decks and handouts.
3. Build the layout shell, the theme system and the router.
4. Build the SQL engine wrapper (PGlite, lazy load, reset, error mapping, psql meta-commands) and the **SQL card** component. Run the expected-output test until every slide query matches.
5. Build Home, Weekly Roadmap and Week Detail with the PDF viewer and runnable examples.
6. Build the SQL Playground.
7. Build the priority labs (#2, #11, #9, #10, #17, #5), then the rest.
8. Build the **Cheat Sheets** page (`data/cheatsheets.js`) and the **SQL MCQ Practice** page (`data/mcq.js` from Appendix A, both answer modes). Run every MCQ that contains SQL against its dataset once to confirm the marked answer.
9. Build Lab Test Prep, Setup, Project, Revision, Glossary and Course Info.
10. Add quizzes, predict-the-output, flashcards, lab-task checking, search and progress.
11. Test on a 360 px phone screen in both themes, then deploy to GitHub Pages.
12. Write a short `README.md`: how to add a new week (one `course.js` entry + one deck), how to add an MCQ or a cheat-sheet card, how to add a dataset, how to rerun asset preparation and the output test, and how to deploy.

---

## 14. Acceptance Checklist

- [ ] All **7 slide decks** (Weeks 1–7) from the root folder are attached, viewable in the browser, and downloadable as PPTX and PDF.
- [ ] Both **Week 7 PDFs** (lab handout and problem statement) are attached, viewable and downloadable from Week 7.
- [ ] `setup_docker_postgres.sh` is downloadable from the Setup page.
- [ ] Weeks 8–14 appear as "upcoming" from the outline, and Week 14 shows the Revision page.
- [ ] No mark sheet (`.xlsx`), lab mid set, lab mid solution, Lab Performance 2 set, the course outline or `.DS_Store` is published or committed.
- [ ] Every SQL snippet from the slides is runnable, and the expected-output test passes for every slide that shows a result.
- [ ] The playground runs real PostgreSQL in the browser: PL/pgSQL procedures, functions, triggers, views, materialized views, transactions and savepoints all work.
- [ ] The Week 7 savepoint lab reproduces Part A = 60 and Part B = 72 → 80 → 65 exactly.
- [ ] The **SQL MCQ Practice** page has all **70** questions from Appendix A (4 options each), filterable by section, and works in **both** modes: answers after submitting everything (with score, section breakdown and review), **and** the answer shown per question on click.
- [ ] The **Cheat Sheets** menu shows runnable example queries for DDL, DML, querying, aggregates, subqueries, joins, programs, transactions and common errors, and it prints cleanly.
- [ ] The colour palette, chapter colours (Foundations indigo · Relational violet · SQL blue · Storage teal · Transactions amber · Modern rose · Revision slate), 16 px radius, dual-layer shadows, Plus Jakarta Sans / JetBrains Mono and the slim scrollbar match §10 in both themes.
- [ ] Light mode is the default. Dark mode toggles, persists, and has no flash on load. The editor and result tables follow the theme.
- [ ] Every lab works with touch, has step controls and captions, and looks correct in both themes.
- [ ] The site works at 360 px wide with no horizontal page scrolling.
- [ ] All content comes from `data/course.js`. Adding a week takes one entry plus one file.
- [ ] Deployed and reachable by a public URL.

---

## 15. Open Items for the Instructor (fill in if you want; sensible defaults are used otherwise)

| Item | Default if left blank |
|---|---|
| Semester label (folder says Summer 2026, outline file says Winter 2026) | **Summer 2026** |
| Saad Ahmed's email and room | Name and designation only |
| Official Week 4 / Week 5 / Week 6 lab data | The site-authored seeds in §6.3–6.5 |
| Lab Test 1 and Lab Test 2 dates (countdown, study plan) | Hidden until set in `course.js` |
| Should lab-task auto-checking and solutions be visible? | Checker **on**, solutions **hidden** |
| Project rules (team size, milestones, report format) | Outline milestones only, with a `TODO` block |
| Link to the CSE 2205 theory site | No link until the URL is set |
| Site name / logo | "CSE 2206 · SQL Lab" with a database-cylinder + terminal-cursor logo |
| BAUST branding (logo, maroon/blue colours) | Neutral indigo theme above. Swap `--primary` if you want BAUST colours. |
| Language of UI | English, with Bangla-friendly font fallback (*Hind Siliguri*) |
| Hosting | GitHub Pages |
| Show instructor phone number | No (email and room only) |

---

## Appendix A: SQL MCQ Bank: Complete SQL Review (70 questions)

> **Instructions for the builder:** Copy these 70 questions into `data/mcq.js` **exactly as written** (question, SQL, the 4 options in this order, the answer letter and the explanation). Questions marked *Uses: Library / uni3 / joins / txn_lab* refer to the datasets in Section 6, and their answers were worked out from that data. Run each of those once on PGlite to confirm (build step 8). Answer letters are spread evenly across A–D.

### Section 1: Data Definition Language (DDL) · Q1–Q15

**Q1.** `CREATE TABLE` belongs to which category of SQL commands?
- A) DML
- B) DDL
- C) TCL
- D) DCL

**Answer: B.** `CREATE`, `ALTER` and `DROP` define or change the structure of database objects, so they are Data Definition Language.

**Q2.** Which statement adds a new column `Edition` of type `INT` to the `Library` table?
- A) `UPDATE Library ADD Edition INT;`
- B) `INSERT COLUMN Edition INT INTO Library;`
- C) `ALTER TABLE Library ADD COLUMN Edition INT;`
- D) `MODIFY TABLE Library ADD Edition INT;`

**Answer: C.** New columns are added with `ALTER TABLE … ADD COLUMN`.

**Q3.** *Uses: Library.* After `ALTER TABLE Library ADD COLUMN Edition INT;` on the 5-row table, what does `Edition` hold in the existing rows?
- A) `NULL`
- B) `0`
- C) An empty string
- D) The statement fails

**Answer: A.** Without a `DEFAULT`, a new column is filled with `NULL` in every existing row.

**Q4.** What happens when you run `ALTER TABLE Library ADD COLUMN Price NUMERIC(8,2) NOT NULL;` (no `DEFAULT`) on a table that already has rows?
- A) It succeeds and fills `Price` with 0
- B) It succeeds and fills `Price` with `NULL`
- C) It fails, because the existing rows would have no value for a NOT NULL column
- D) It adds the column only for future rows

**Answer: C.** Give a `DEFAULT`, or add the column as nullable, fill it with `UPDATE`, then `SET NOT NULL`.

**Q5.** Which statement removes both the rows **and** the structure of the `Library` table?
- A) `DELETE FROM Library;`
- B) `TRUNCATE Library;`
- C) `ALTER TABLE Library DROP ALL;`
- D) `DROP TABLE Library;`

**Answer: D.** `DELETE` and `TRUNCATE` remove rows but keep the table; `DROP TABLE` removes the table itself.

**Q6.** Which statement about `TRUNCATE Library;` is true?
- A) It can be filtered with a `WHERE` clause
- B) It removes all rows at once but keeps the table structure
- C) It removes the table structure as well
- D) It removes only rows that contain `NULL`

**Answer: B.** `TRUNCATE` empties the whole table quickly; no `WHERE` is allowed, and the table remains.

**Q7.** In PostgreSQL, which statement renames the column `Author` to `AuthorName`?
- A) `ALTER TABLE Library RENAME COLUMN Author TO AuthorName;`
- B) `UPDATE Library SET Author = AuthorName;`
- C) `ALTER TABLE Library CHANGE Author AuthorName;`
- D) `RENAME Library.Author AuthorName;`

**Answer: A.** `RENAME COLUMN … TO …` changes only the name; data, type and constraints stay the same.

**Q8.** `AvailableCopies` was changed to `VARCHAR(10)`. To change it back to `INT`, which clause must be added to `ALTER TABLE Library ALTER COLUMN AvailableCopies TYPE INT`?
- A) `DEFAULT 0`
- B) `USING AvailableCopies::INT`
- C) `CASCADE`
- D) `NOT NULL`

**Answer: B.** Text-to-number is not an automatic conversion, so PostgreSQL needs `USING` to know how to convert each value.

**Q9.** A `PRIMARY KEY` column guarantees that its values are:
- A) Unique, but may be `NULL`
- B) Not `NULL`, but may repeat
- C) Unique and never `NULL`
- D) Sorted in ascending order

**Answer: C.** A primary key is `UNIQUE` + `NOT NULL` (and PostgreSQL builds an index on it).

**Q10.** How many `PRIMARY KEY` constraints can one table have?
- A) Exactly one (it may span several columns)
- B) Two
- C) One per column
- D) Unlimited

**Answer: A.** A table has only one primary key, though that key can be composite, e.g. `PRIMARY KEY (BookID, Publisher)`.

**Q11.** `AvailableCopies INT DEFAULT 0` means:
- A) An `INSERT` that omits the column is rejected
- B) When an `INSERT` does not mention the column, 0 is stored
- C) All existing values are set to 0 and locked
- D) The column can never hold any value other than 0

**Answer: B.** `DEFAULT` quietly supplies a value; `NOT NULL` is what rejects a missing value.

**Q12.** In PostgreSQL, the unquoted table names `Library` and `library` are:
- A) Two different tables
- B) Both folded to upper case
- C) The same table, because unquoted names are folded to lower case
- D) Rejected, because mixed case is not allowed

**Answer: C.** Unquoted identifiers are folded to lower case; only names in double quotes keep their case.

**Q13.** What does `CREATE TABLE IF NOT EXISTS Library (…);` do when `Library` already exists?
- A) Raises an error
- B) Drops the old table and creates a new one
- C) Adds any missing columns
- D) Skips the statement with a notice instead of an error

**Answer: D.** `IF NOT EXISTS` makes scripts safe to re-run.

**Q14.** When does `DROP SCHEMA academics;` (without `CASCADE`) fail?
- A) When the schema is empty
- B) When the schema still contains tables or other objects
- C) Whenever you are connected to the database
- D) Never

**Answer: B.** A non-empty schema can only be dropped with `CASCADE`, which also drops everything inside it.

**Q15.** Which of these **cannot** run inside a `BEGIN … COMMIT` block in PostgreSQL?
- A) `ALTER TABLE`
- B) `DROP TABLE`
- C) `CREATE SCHEMA`
- D) `CREATE DATABASE`

**Answer: D.** `CREATE DATABASE` and `DROP DATABASE` cannot run inside a transaction. Most other DDL in PostgreSQL is transactional and can be rolled back.

### Section 2: Data Manipulation & Querying (DML & DQL) · Q16–Q35

*Q16–Q29 use the 5-row **Library** table (§6.1): (1) Database System Concepts · Silberschatz · Database · McGraw Hill · 6, (2) Computer Networks · Andrew Tanenbaum · Networking · Pearson · 5, (3) Operating System Concepts · Silberschatz · Operating System · Wiley · 4, (4) Introduction to Algorithms · Cormen · Algorithms · MIT Press · 3, (5) Clean Code · Robert C. Martin · Programming · Prentice Hall · 7. Show this table above these questions in the UI.*

**Q16.** How many rows does `SELECT DISTINCT Author FROM Library;` return?
- A) 5
- B) 4
- C) 3
- D) 2

**Answer: B.** Silberschatz appears twice but is listed once.

**Q17.** How many rows does `SELECT * FROM Library WHERE AvailableCopies > 4;` return?
- A) 4
- B) 2
- C) 5
- D) 3

**Answer: D.** Clean Code (7), Database System Concepts (6) and Computer Networks (5).

**Q18.** How many rows does `SELECT BookTitle FROM Library WHERE BookTitle LIKE 'C%';` return?
- A) 2
- B) 1
- C) 3
- D) 0

**Answer: A.** `'C%'` means "starts with C": Computer Networks and Clean Code.

**Q19.** In a `LIKE` pattern, `'_o%'` matches values whose:
- A) First character is `o`
- B) Second character is `o`
- C) Last character is `o`
- D) Only character is `o`

**Answer: B.** `_` matches exactly one character and `%` matches any number of characters (including none).

**Q20.** How many rows does `SELECT * FROM Library WHERE AvailableCopies BETWEEN 4 AND 6;` return?
- A) 1
- B) 2
- C) 3
- D) 4

**Answer: C.** `BETWEEN` includes both ends: 6, 5 and 4 copies.

**Q21.** How many rows does this return?
```sql
SELECT * FROM Library
WHERE Author = 'Silberschatz' AND AvailableCopies > 5;
```
- A) 0
- B) 1
- C) 2
- D) 3

**Answer: B.** Both conditions must be true: only Database System Concepts (6 copies).

**Q22.** How many rows does this return?
```sql
SELECT * FROM Library
WHERE Category = 'Database' OR Publisher = 'Pearson';
```
- A) 1
- B) 3
- C) 2
- D) 4

**Answer: C.** Either condition is enough: Database System Concepts (Database) and Computer Networks (Pearson).

**Q23.** Which book does `SELECT BookTitle FROM Library ORDER BY AvailableCopies DESC LIMIT 1;` return?
- A) Introduction to Algorithms
- B) Clean Code
- C) Database System Concepts
- D) Computer Networks

**Answer: B.** Sorted from most to fewest copies, Clean Code (7) comes first.

**Q24.** What does `LIMIT 3 OFFSET 3` do?
- A) Returns the first three rows
- B) Returns the last three rows
- C) Returns rows 3 to 5
- D) Skips the first three rows and returns up to the next three

**Answer: D.** `OFFSET` skips rows and `LIMIT` caps the count, which is how "page two" is fetched.

**Q25.** `SELECT * FROM Library LIMIT 3;` (no `ORDER BY`) returns:
- A) The first three rows inserted, guaranteed
- B) The three rows with the smallest `BookID`, guaranteed
- C) Some three rows, with no guarantee which ones
- D) An error, because `LIMIT` requires `ORDER BY`

**Answer: C.** Without `ORDER BY` the server may return rows in any order. Use `ORDER BY … LIMIT` for a reliable Top-N.

**Q26.** In which order does PostgreSQL **execute** the clauses of `SELECT … FROM … WHERE … ORDER BY … LIMIT …`?
- A) SELECT → FROM → WHERE → ORDER BY → LIMIT
- B) FROM → WHERE → SELECT → ORDER BY → LIMIT
- C) FROM → SELECT → WHERE → LIMIT → ORDER BY
- D) WHERE → FROM → SELECT → LIMIT → ORDER BY

**Answer: B.** You write `SELECT` first, but the server starts from the table, filters, picks columns, sorts, and finally cuts.

**Q27.** What reply does PostgreSQL give for this statement?
```sql
UPDATE Library SET AvailableCopies = AvailableCopies - 1
WHERE Author = 'Silberschatz';
```
- A) `UPDATE 1`
- B) `UPDATE 5`
- C) `UPDATE 0`
- D) `UPDATE 2`

**Answer: D.** Two books are by Silberschatz, so two rows change.

**Q28.** What does `UPDATE Library SET AvailableCopies = 0;` do?
- A) Raises an error because `WHERE` is missing
- B) Updates only the first row
- C) Updates all 5 rows
- D) Asks for confirmation first

**Answer: C.** Without `WHERE`, every row is changed. Preview with `SELECT` first, or wrap it in `BEGIN … ROLLBACK`.

**Q29.** Which row does `DELETE FROM Library WHERE AvailableCopies < 4;` remove?
- A) Introduction to Algorithms
- B) Operating System Concepts
- C) Both Introduction to Algorithms and Operating System Concepts
- D) No rows

**Answer: A.** Only Introduction to Algorithms has fewer than 4 copies (3). Operating System Concepts has exactly 4. The reply is `DELETE 1`.

**Q30.** Which statement inserts several rows at once?
- A) `INSERT INTO Library VALUES (7, …), (8, …);`
- B) `INSERT MANY INTO Library (7, …), (8, …);`
- C) `INSERT INTO Library ROWS (7, …), (8, …);`
- D) `INSERT INTO Library VALUES (7, …) VALUES (8, …);`

**Answer: A.** One `VALUES` keyword followed by comma-separated row lists. PostgreSQL replies `INSERT 0 2`.

**Q31.** *Uses: Library.* What happens when you insert a new row with `BookID = 1`?
- A) A duplicate-key error; the row is rejected
- B) The old row is replaced
- C) A second row with `BookID = 1` is added
- D) `BookID` is set to `NULL`

**Answer: A.** `BookID` is the primary key, so a duplicate value violates its uniqueness (SQLSTATE `23505`).

**Q32.** In SQL, a text value such as Pearson is written as:
- A) `"Pearson"`
- B) `'Pearson'`
- C) `` `Pearson` ``
- D) `Pearson` (no quotes)

**Answer: B.** String literals use single quotes. Double quotes are for identifiers (names of tables and columns).

**Q33.** Which condition correctly finds rows where `Publisher` has no value?
- A) `WHERE Publisher = NULL`
- B) `WHERE Publisher = 'NULL'`
- C) `WHERE Publisher == NULL`
- D) `WHERE Publisher IS NULL`

**Answer: D.** Any comparison with `NULL` using `=` is unknown (never true), so SQL uses `IS NULL` / `IS NOT NULL`.

**Q34.** What does `SELECT BookTitle AS Title FROM Library;` do?
- A) Renames the column in the table permanently
- B) Shows the column under the heading `Title` in this result only
- C) Creates a view named `Title`
- D) Raises an error

**Answer: B.** `AS` creates a column alias for the output; the table is unchanged.

**Q35.** Which habit is the safest before running a `DELETE … WHERE …`?
- A) Run the same `WHERE` as a `SELECT` first and check the rows
- B) Drop the table and recreate it
- C) Remove the primary key
- D) Use `TRUNCATE` instead

**Answer: A.** Preview what would disappear, then swap `SELECT *` for `DELETE` (and use a transaction if unsure).

### Section 3: Aggregation & Relational Joins · Q36–Q55

*Q36–Q45 use the Week 3 **uni3** data (§6.2): `ENROLLMENT` has 8 rows for 5 different students. Marks are 82, 75, 91, 88, 68, 55, **NULL**, 77. Show the ENROLLMENT table above these questions in the UI.*

**Q36.** What does `SELECT COUNT(Marks) FROM ENROLLMENT;` return?
- A) 8
- B) 6
- C) 7
- D) 5

**Answer: C.** `COUNT(column)` counts non-NULL values only; `COUNT(*)` would return 8.

**Q37.** `AVG(Marks)` returns 76.57, but `AVG(COALESCE(Marks, 0))` returns 67.00. Why?
- A) `AVG` always rounds up
- B) `AVG` ignores `NULL`, so it divides 536 by 7, while `COALESCE` turns the `NULL` into 0 and divides by 8
- C) `NULL` is treated as 100 by `AVG`
- D) `COALESCE` causes a rounding error

**Answer: B.** Aggregates skip `NULL`. Replace it with `COALESCE` only if "missing" should really count as zero.

**Q38.** What does `SELECT COUNT(DISTINCT StuID) FROM ENROLLMENT;` return?
- A) 6
- B) 8
- C) 4
- D) 5

**Answer: D.** S101–S105 are enrolled; S106 has no enrolment rows.

**Q39.** Which aggregate function also works on a **text** column such as `Title`?
- A) `SUM`
- B) `AVG`
- C) `MAX`
- D) None of them

**Answer: C.** `MIN` and `MAX` work on text and dates (alphabetical order); `SUM` and `AVG` need numbers.

**Q40.** What happens with this query?
```sql
SELECT CourseID, StuID, COUNT(*)
FROM ENROLLMENT
GROUP BY CourseID;
```
- A) It works and shows every student
- B) Error: `StuID` must appear in `GROUP BY` or be used in an aggregate
- C) It shows the first `StuID` of each group
- D) It shows `StuID` as `NULL`

**Answer: B.** Every column in the `SELECT` list must be either grouped or aggregated.

**Q41.** Which clause filters **groups** using an aggregate value?
- A) `WHERE`
- B) `ORDER BY`
- C) `GROUP BY`
- D) `HAVING`

**Answer: D.** `WHERE` filters rows before grouping; `HAVING` filters groups after aggregation.

**Q42.** Which of these conditions causes an error?
- A) `WHERE AVG(Marks) > 75`
- B) `HAVING AVG(Marks) > 75`
- C) `WHERE Marks > 75`
- D) `HAVING COUNT(*) > 1`

**Answer: A.** Aggregates are not allowed in `WHERE`, because `WHERE` runs before any group exists.

**Q43.** How many rows does this return?
```sql
SELECT CourseID, ROUND(AVG(Marks), 2) AS AvgMarks
FROM ENROLLMENT
WHERE Marks IS NOT NULL
GROUP BY CourseID
HAVING AVG(Marks) > 75;
```
- A) 1
- B) 2
- C) 3
- D) 4

**Answer: B.** Course averages are CSE-4105 88, CSE-3101 76, CSE-3103 75 and EEE-2101 72.5. Only 88 and 76 are greater than 75.

**Q44.** What is the logical execution order of a grouped query?
- A) FROM → GROUP BY → WHERE → HAVING → SELECT → ORDER BY
- B) SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY
- C) FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY
- D) FROM → WHERE → HAVING → GROUP BY → ORDER BY → SELECT

**Answer: C.** Rows are filtered, then grouped, then groups are filtered, then columns are produced and sorted.

**Q45.** What does `SELECT SUM(Marks) FROM ENROLLMENT;` return?
- A) `NULL`, because one mark is `NULL`
- B) 613
- C) 0
- D) 536

**Answer: D.** `SUM` ignores the `NULL` row: 82 + 75 + 91 + 88 + 68 + 55 + 77 = 536.

*Q46–Q55 use the Week 4 **joins** data (§6.3): 6 Students (Nabila has no enrolment), 5 Courses (Machine Learning has no enrolment) and 8 Enrollments.*

**Q46.** An `INNER JOIN` returns:
- A) All rows from the left table
- B) Only the rows that have a match in both tables
- C) All rows from both tables
- D) Every combination of rows (Cartesian product)

**Answer: B.** Rows without a match on the other side are dropped.

**Q47.** In `Students s LEFT JOIN Enrollments e ON s.student_id = e.student_id`, how does Nabila (no enrolments) appear?
- A) She does not appear
- B) She appears twice
- C) Once, with `NULL` in all the Enrollments columns
- D) The query fails

**Answer: C.** A left join keeps every left-table row and pads the missing right side with `NULL`.

**Q48.** How many rows does `SELECT s.name, c.course_name FROM Students s CROSS JOIN Courses c;` return?
- A) 11
- B) 30
- C) 6
- D) 5

**Answer: B.** A cross join pairs every student with every course: 6 × 5 = 30.

**Q49.** Which query finds students who are **not** enrolled in any course?
- A) `… FROM Students s LEFT JOIN Enrollments e ON s.student_id = e.student_id WHERE e.enrollment_id IS NULL;`
- B) `… FROM Students s INNER JOIN Enrollments e ON s.student_id = e.student_id;`
- C) `… FROM Students s CROSS JOIN Enrollments e;`
- D) `… FROM Students s RIGHT JOIN Enrollments e ON s.student_id = e.student_id WHERE s.student_id IS NOT NULL;`

**Answer: A.** A left join plus an `IS NULL` check on the right side isolates rows that had nothing to match (here: Nabila).

**Q50.** A `NATURAL JOIN` matches rows on:
- A) The primary keys only
- B) The first column of each table
- C) The columns listed in `ON`
- D) All columns that have the same name in both tables

**Answer: D.** That is why a natural join can surprise you if two tables share an unrelated column name.

**Q51.** A **self join** is:
- A) A join without any condition
- B) A join that only uses primary keys
- C) A table joined with itself, using two aliases
- D) A join between two tables that have the same columns

**Answer: C.** For example, `Students a JOIN Students b ON a.major = b.major WHERE a.student_id < b.student_id` lists pairs of students sharing a major.

**Q52.** A `FULL OUTER JOIN` returns:
- A) All matched rows, plus the unmatched rows from **both** tables padded with `NULL`
- B) Only the unmatched rows
- C) Only rows from the left table
- D) The Cartesian product

**Answer: A.** It is a left join and a right join combined. MySQL lacks it, so it is simulated with `LEFT JOIN … UNION … RIGHT JOIN`.

**Q53.** What is the difference between `UNION` and `UNION ALL`?
- A) `UNION` keeps duplicates; `UNION ALL` removes them
- B) `UNION` needs the same table; `UNION ALL` does not
- C) `UNION` removes duplicate rows; `UNION ALL` keeps them
- D) There is no difference

**Answer: C.** Both need union-compatible SELECTs (same number of columns, compatible types).

**Q54.** A `RIGHT JOIN` always keeps:
- A) Only matching rows
- B) Every row from the left table
- C) Rows that match neither table
- D) Every row from the right table

**Answer: D.** Missing left-side columns are padded with `NULL`.

**Q55.** How many rows does this return?
```sql
SELECT s.name, e.course_id
FROM Students s
LEFT JOIN Enrollments e ON s.student_id = e.student_id;
```
- A) 6
- B) 8
- C) 9
- D) 14

**Answer: C.** The 8 enrolment rows match 5 students, and Nabila is added once with `NULL`: 8 + 1 = 9.

### Section 4: Database Transactions · Q56–Q70

*Q61–Q70 use the Week 7 **txn_lab** data (§6.6): accounts A-101 Rahim 1000, B-202 Karim 2000, C-303 Jamal 1500, D-404 Nila 500, E-505 Sumi 3000 (total 8000). `balance` has `CHECK (balance >= 0)`.*

**Q56.** In ACID, what does **A** stand for?
- A) Accuracy
- B) Atomicity
- C) Availability
- D) Authorization

**Answer: B.** Atomicity: all statements of a transaction succeed together or none of them take effect.

**Q57.** Which ACID property means that changes made inside an unfinished transaction are not visible to other sessions?
- A) Durability
- B) Atomicity
- C) Consistency
- D) Isolation

**Answer: D.** Isolation keeps concurrent transactions from seeing each other's uncommitted work.

**Q58.** Which ACID property guarantees that committed changes survive a crash or power cut?
- A) Durability
- B) Isolation
- C) Atomicity
- D) Consistency

**Answer: A.** Once `COMMIT` succeeds, the change is permanent (PostgreSQL uses its write-ahead log for this).

**Q59.** Which ACID property means a transaction takes the database from one valid state to another, without breaking any constraint?
- A) Atomicity
- B) Isolation
- C) Consistency
- D) Durability

**Answer: C.** For example, a `CHECK (balance >= 0)` constraint can never be left violated after a commit.

**Q60.** Without `BEGIN`, PostgreSQL runs in autocommit mode. This means:
- A) Every statement is saved permanently as soon as it finishes
- B) Nothing is saved until you type `COMMIT`
- C) Statements are queued and run together later
- D) Only DDL statements are saved

**Answer: A.** That is why a mistake such as an `UPDATE` without `WHERE` cannot be undone in autocommit mode.

**Q61.** What are the balances after this script?
```sql
BEGIN;
UPDATE account SET balance = balance + 500000;
ROLLBACK;
```
- A) Every balance is 500000 higher
- B) The original balances (A-101 1000 … E-505 3000)
- C) All balances are 0
- D) Only the first account changed

**Answer: B.** `ROLLBACK` throws away every change made since `BEGIN`.

**Q62.** In autocommit mode, a clerk transfers 500 Tk from A-101 to B-202 but types `'B-2O2'` (letter O) in the second statement:
```sql
UPDATE account SET balance = balance - 500 WHERE acc_no = 'A-101';
UPDATE account SET balance = balance + 500 WHERE acc_no = 'B-2O2';
```
What is `SUM(balance)` afterwards?
- A) 8000
- B) 8500
- C) 7500
- D) 7000

**Answer: C.** The first update is saved; the second updates 0 rows with no error, so 500 Tk "vanishes".

**Q63.** What does `ROLLBACK TO SAVEPOINT s1;` do?
- A) Ends the transaction and undoes everything
- B) Commits everything before `s1`
- C) Deletes the savepoint and keeps all changes
- D) Undoes only the work done after `s1`; the transaction stays open

**Answer: D.** The savepoint is kept, so you can roll back to it again.

**Q64.** What does `RELEASE SAVEPOINT s1;` do?
- A) Removes the bookmark `s1` but keeps the changes; nothing is committed yet
- B) Undoes the changes made after `s1`
- C) Commits the transaction
- D) Rolls back the whole transaction

**Answer: A.** The transaction is still open and can still be rolled back as a whole.

**Q65.** What happens here?
```sql
BEGIN;
UPDATE product SET stock = stock + 10 WHERE product_id = 5;
SAVEPOINT s1;
UPDATE product SET stock = stock + 10 WHERE product_id = 5;
RELEASE SAVEPOINT s1;
ROLLBACK TO SAVEPOINT s1;
```
- A) The second update is undone
- B) Error: savepoint "s1" does not exist (SQLSTATE `3B001`)
- C) Both updates are undone
- D) The transaction is committed

**Answer: B.** After `RELEASE`, the bookmark is gone, so you cannot roll back to it.

**Q66.** The Keyboard (product 5) starts with stock 50. What is the final stock?
```sql
BEGIN;
UPDATE product SET stock = stock + 10 WHERE product_id = 5;
SAVEPOINT s1;
UPDATE product SET stock = stock + 10 WHERE product_id = 5;
ROLLBACK TO SAVEPOINT s1;
COMMIT;
```
- A) 50
- B) 70
- C) 60
- D) 80

**Answer: C.** Only the second batch is undone: 50 + 10 = 60 (Week 7 Lab, Part A).

**Q67.** Stock starts at 60. What is the stock right after `ROLLBACK TO SAVEPOINT s3`?
```sql
BEGIN;
UPDATE product SET stock = stock + 5  WHERE product_id = 5;  SAVEPOINT s1;
UPDATE product SET stock = stock + 15 WHERE product_id = 5;  SAVEPOINT s2;
UPDATE product SET stock = stock - 8  WHERE product_id = 5;  SAVEPOINT s3;
UPDATE product SET stock = stock + 20 WHERE product_id = 5;
ROLLBACK TO SAVEPOINT s3;
```
- A) 92
- B) 80
- C) 65
- D) 72

**Answer: D.** 60 + 5 + 15 − 8 = 72. Only the wrong +20 is undone (Week 7 Lab, Part B).

**Q68.** Nila (D-404) has 500. What is saved after this script?
```sql
BEGIN;
UPDATE account SET balance = balance + 1500 WHERE acc_no = 'E-505';  -- succeeds
UPDATE account SET balance = balance - 1500 WHERE acc_no = 'D-404';  -- CHECK violation
COMMIT;
```
- A) Nothing; PostgreSQL turns the `COMMIT` of a failed transaction into a `ROLLBACK`
- B) Only Sumi's +1500
- C) Both updates
- D) Nila's balance becomes −1000

**Answer: A.** The transfer is all-or-nothing, so Sumi's credit is undone too (atomicity).

**Q69.** Inside a transaction, a statement fails with an error. What happens to the **next** statement you run before ending the transaction?
- A) It runs normally
- B) It is committed automatically
- C) It is refused: "current transaction is aborted" (SQLSTATE `25P02`)
- D) The database restarts

**Answer: C.** Every further statement is refused until you end the transaction with `ROLLBACK` (or `COMMIT`, which then acts as a rollback).

**Q70.** Tab 1 runs `BEGIN; UPDATE account SET balance = balance + 1000 WHERE acc_no = 'C-303';` and has **not** committed. Tab 2 then runs `SELECT balance FROM account WHERE acc_no = 'C-303';`. What does Tab 2 see?
- A) 2500
- B) 1500
- C) 1000
- D) Tab 2 waits until Tab 1 finishes

**Answer: B.** Uncommitted changes are invisible to other sessions (isolation), and a plain `SELECT` in PostgreSQL does not wait for the writer.

### Answer key (for checking `mcq.js`)

| Q | Ans | Q | Ans | Q | Ans | Q | Ans | Q | Ans | Q | Ans | Q | Ans |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | B | 11 | B | 21 | B | 31 | A | 41 | D | 51 | C | 61 | B |
| 2 | C | 12 | C | 22 | C | 32 | B | 42 | A | 52 | A | 62 | C |
| 3 | A | 13 | D | 23 | B | 33 | D | 43 | B | 53 | C | 63 | D |
| 4 | C | 14 | B | 24 | D | 34 | B | 44 | C | 54 | D | 64 | A |
| 5 | D | 15 | D | 25 | C | 35 | A | 45 | D | 55 | C | 65 | B |
| 6 | B | 16 | B | 26 | B | 36 | C | 46 | B | 56 | B | 66 | C |
| 7 | A | 17 | D | 27 | D | 37 | B | 47 | C | 57 | D | 67 | D |
| 8 | B | 18 | A | 28 | C | 38 | D | 48 | B | 58 | A | 68 | A |
| 9 | C | 19 | B | 29 | A | 39 | C | 49 | A | 59 | C | 69 | C |
| 10 | A | 20 | C | 30 | A | 40 | B | 50 | D | 60 | A | 70 | B |
