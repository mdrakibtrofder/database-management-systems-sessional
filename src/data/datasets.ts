export const DATASET_SEEDS = {
  library: `
CREATE TABLE IF NOT EXISTS Library (
  BookID          INT PRIMARY KEY,
  BookTitle       VARCHAR(120) NOT NULL,
  Author          VARCHAR(100),
  Category        VARCHAR(50),
  Publisher       VARCHAR(100),
  AvailableCopies INT DEFAULT 0
);
DELETE FROM Library;
INSERT INTO Library VALUES
 (1,'Database System Concepts','Silberschatz','Database','McGraw Hill',6),
 (2,'Computer Networks','Andrew Tanenbaum','Networking','Pearson',5),
 (3,'Operating System Concepts','Silberschatz','Operating System','Wiley',4),
 (4,'Introduction to Algorithms','Cormen','Algorithms','MIT Press',3),
 (5,'Clean Code','Robert C. Martin','Programming','Prentice Hall',7);
`,

  uni3: `
CREATE TABLE IF NOT EXISTS STUDENT (
  StuID VARCHAR(5) PRIMARY KEY,
  StuName VARCHAR(30),
  Dept VARCHAR(5)
);
DELETE FROM STUDENT;
INSERT INTO STUDENT VALUES
 ('S101','Rakib','CSE'),('S102','Sadia','CSE'),('S103','Tanvir','EEE'),
 ('S104','Mim','CSE'),('S105','Arif','EEE'),('S106','Nabila','CSE');

CREATE TABLE IF NOT EXISTS COURSE (
  CourseID VARCHAR(10) PRIMARY KEY,
  Title VARCHAR(30),
  Dept VARCHAR(5),
  Credit NUMERIC(3,1)
);
DELETE FROM COURSE;
INSERT INTO COURSE VALUES
 ('CSE-3101','DBMS','CSE',3.0),('CSE-3103','OOP','CSE',3.0),
 ('CSE-4105','AI','CSE',3.0),('EEE-2101','Circuits','EEE',3.0);

CREATE TABLE IF NOT EXISTS ENROLLMENT (
  StuID VARCHAR(5) REFERENCES STUDENT,
  CourseID VARCHAR(10) REFERENCES COURSE,
  Marks INT
);
DELETE FROM ENROLLMENT;
INSERT INTO ENROLLMENT VALUES
 ('S101','CSE-3101',82),('S101','CSE-3103',75),('S102','CSE-3101',91),('S102','CSE-4105',88),
 ('S103','EEE-2101',68),('S104','CSE-3101',55),('S104','CSE-3103',NULL),('S105','EEE-2101',77);
`,

  joins: `
CREATE TABLE IF NOT EXISTS Departments (
  dept_name VARCHAR(10) PRIMARY KEY,
  building VARCHAR(20)
);
DELETE FROM Departments;
INSERT INTO Departments VALUES
 ('CSE','Academic Building 3'),('EEE','Academic Building 2'),('ME','Academic Building 1');

CREATE TABLE IF NOT EXISTS Students (
  student_id INT PRIMARY KEY,
  name VARCHAR(30),
  age INT,
  major VARCHAR(10)
);
DELETE FROM Students;
INSERT INTO Students VALUES
 (1,'Rakib',21,'CSE'),(2,'Sadia',20,'CSE'),(3,'Tanvir',22,'EEE'),
 (4,'Mim',19,'CSE'),(5,'Arif',23,'EEE'),(6,'Nabila',20,'ME');

CREATE TABLE IF NOT EXISTS Courses (
  course_id INT PRIMARY KEY,
  course_name VARCHAR(40),
  department VARCHAR(10) REFERENCES Departments
);
DELETE FROM Courses;
INSERT INTO Courses VALUES
 (101,'Database Systems','CSE'),(102,'Algorithms','CSE'),(103,'Circuits','EEE'),
 (104,'Thermodynamics','ME'),(105,'Machine Learning','CSE');

CREATE TABLE IF NOT EXISTS Enrollments (
  enrollment_id INT PRIMARY KEY,
  student_id INT REFERENCES Students,
  course_id INT REFERENCES Courses,
  grade VARCHAR(2),
  semester VARCHAR(10)
);
DELETE FROM Enrollments;
INSERT INTO Enrollments VALUES
 (1,1,101,'A','Spring'),(2,1,102,'B+','Spring'),(3,2,101,'A','Spring'),(4,3,103,'B','Fall'),
 (5,4,102,'C','Fall'),(6,5,103,'A','Fall'),(7,2,102,'B','Fall'),(8,4,104,'B+','Spring');

CREATE TABLE IF NOT EXISTS Faculty (
  faculty_id INT PRIMARY KEY,
  name VARCHAR(30),
  dept VARCHAR(10)
);
DELETE FROM Faculty;
INSERT INTO Faculty VALUES
 (1,'Karim','CSE'),(2,'Hasan','EEE'),(3,'Rakib','CSE');
`,

  programs: `
CREATE TABLE IF NOT EXISTS Student (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30),
  dept VARCHAR(5),
  cgpa NUMERIC(3,2),
  dob DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
DELETE FROM Student;
INSERT INTO Student (id, name, dept, cgpa, dob) VALUES
 (1, 'Rafi', 'CSE', 3.85, '2003-05-12'),
 (2, 'Anika', 'CSE', 3.40, '2004-02-18'),
 (3, 'Hasan', 'EEE', 3.65, '2003-11-20'),
 (4, 'Fariha', 'CSE', 3.92, '2004-07-09'),
 (5, 'Zubair', 'EEE', 2.95, '2003-09-14'),
 (6, 'Tasmia', 'CSE', 3.10, '2004-01-30');

CREATE TABLE IF NOT EXISTS Result (
  student_id INT,
  course_id VARCHAR(10),
  marks INT
);
DELETE FROM Result;
INSERT INTO Result VALUES
 (1, 'CSE-3101', 88), (1, 'CSE-3103', 92),
 (2, 'CSE-3101', 65), (2, 'CSE-3103', 74),
 (3, 'EEE-2101', 78), (4, 'CSE-3101', 95);

CREATE TABLE IF NOT EXISTS Employee (
  id INT PRIMARY KEY,
  name VARCHAR(30),
  salary NUMERIC(10,2)
);
DELETE FROM Employee;
INSERT INTO Employee VALUES
 (1, 'Kamal Hossain', 45000),
 (2, 'Nusrat Jahan', 52000),
 (3, 'Tareq Mahmud', 38000);

CREATE TABLE IF NOT EXISTS Salary_Audit (
  emp_id INT,
  old_sal NUMERIC(10,2),
  new_sal NUMERIC(10,2),
  changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Orders (
  order_id SERIAL PRIMARY KEY,
  product_id INT,
  qty INT
);
DELETE FROM Orders;
INSERT INTO Orders (product_id, qty) VALUES
 (101, 2), (102, 5), (101, 1), (103, 10), (102, 3), (104, 1), (101, 4), (103, 2);
`,

  triggers: `
CREATE TABLE IF NOT EXISTS employee (
  id INT PRIMARY KEY,
  name VARCHAR(30),
  salary NUMERIC(10,2)
);
DELETE FROM employee;
INSERT INTO employee VALUES
 (1, 'Rakibul Hasan', 40000),
 (2, 'Sharmin Akter', 48000),
 (3, 'Jasim Uddin', 35000),
 (4, 'Farhana Sultana', 60000);

CREATE TABLE IF NOT EXISTS salary_audit (
  emp_id INT,
  old_salary NUMERIC(10,2),
  new_salary NUMERIC(10,2),
  op VARCHAR(10),
  changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`,

  txn_lab: `
CREATE SCHEMA IF NOT EXISTS txn_lab;
SET search_path TO txn_lab;

CREATE TABLE IF NOT EXISTS account (
  acc_no VARCHAR(5) PRIMARY KEY,
  holder VARCHAR(20),
  balance NUMERIC(12,2) CHECK (balance >= 0)
);
DELETE FROM account;
INSERT INTO account VALUES
 ('A-101','Rahim',1000),
 ('B-202','Karim',2000),
 ('C-303','Jamal',1500),
 ('D-404','Nila',500),
 ('E-505','Sumi',3000);

CREATE TABLE IF NOT EXISTS product (
  product_id INT PRIMARY KEY,
  name VARCHAR(30),
  stock INT
);
DELETE FROM product;
INSERT INTO product VALUES
 (1,'Laptop',5),
 (2,'Mouse',50),
 (5,'Keyboard',50);

CREATE TABLE IF NOT EXISTS orders (
  order_id INT PRIMARY KEY,
  customer VARCHAR(30)
);
DELETE FROM orders;

CREATE TABLE IF NOT EXISTS order_item (
  order_id INT,
  product_id INT,
  qty INT,
  unit_price NUMERIC(10,2)
);
DELETE FROM order_item;
`
};
