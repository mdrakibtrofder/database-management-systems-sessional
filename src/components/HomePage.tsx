import React from 'react';
import {
  ArrowRight,
  ArrowDown,
  Database,
  Table2,
  KeyRound,
  ShieldCheck,
  Repeat,
  Code2,
  Layers,
  Map,
  Presentation,
  FlaskConical,
  ListChecks,
  FileText,
  BookA,
  Terminal,
  User
} from 'lucide-react';
import { course } from '../data/course';
import { mcqs } from '../data/mcq';
import { slideDecks } from '../data/slides';
import { cheatsheets } from '../data/cheatsheets';
import { glossaryTerms } from '../data/glossary';

interface HomePageProps {
  onNavigate: (route: string) => void;
  onSelectWeek: (weekId: number) => void;
}

// Core DBMS ideas — one short card each
const KEY_IDEAS = [
  {
    icon: Database,
    title: 'Data & Database',
    text: 'Data are raw facts (a name, a mark, a price). A database is an organised, shared collection of related data stored for long-term use.',
    accent: 'text-c-foundations bg-c-foundations/10'
  },
  {
    icon: Table2,
    title: 'Tables (Relations)',
    text: 'A relational DBMS stores data in tables. Each row (tuple) is one record; each column (attribute) holds one kind of value with a fixed data type.',
    accent: 'text-c-relational bg-c-relational/10'
  },
  {
    icon: KeyRound,
    title: 'Keys & Constraints',
    text: 'A PRIMARY KEY identifies each row uniquely; a FOREIGN KEY links tables. NOT NULL, UNIQUE, CHECK and DEFAULT keep the data valid.',
    accent: 'text-c-sql bg-c-sql/10'
  },
  {
    icon: Code2,
    title: 'SQL',
    text: 'Structured Query Language is how we talk to the DBMS: define tables, add and change rows, and ask questions of the data.',
    accent: 'text-c-storage bg-c-storage/10'
  },
  {
    icon: Repeat,
    title: 'Transactions & ACID',
    text: 'A transaction groups statements into one all-or-nothing unit. ACID — Atomicity, Consistency, Isolation, Durability — keeps data correct even on failure.',
    accent: 'text-c-txn bg-c-txn/10'
  },
  {
    icon: ShieldCheck,
    title: 'Why a DBMS, not files?',
    text: 'Less duplicate data, safe access by many users at once, security, backup & recovery, and powerful queries — things plain files cannot give.',
    accent: 'text-c-modern bg-c-modern/10'
  }
];

// SQL command families covered in the lab
const SQL_FAMILIES = [
  { tag: 'DDL', name: 'Data Definition', cmds: 'CREATE · ALTER · DROP · TRUNCATE' },
  { tag: 'DML', name: 'Data Manipulation', cmds: 'INSERT · UPDATE · DELETE' },
  { tag: 'DQL', name: 'Data Query', cmds: 'SELECT · WHERE · GROUP BY · JOIN' },
  { tag: 'TCL', name: 'Transaction Control', cmds: 'BEGIN · COMMIT · ROLLBACK · SAVEPOINT' }
];

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  // Every page of the site, shown as a card
  const PAGES = [
    {
      route: 'weeks',
      icon: Map,
      label: 'Roadmap',
      title: 'Weekly Roadmap',
      text: `All ${course.weeks.length} weekly modules with topics, SQL examples and lab tasks, from PostgreSQL basics to transactions.`,
      accent: 'text-c-foundations bg-c-foundations/10'
    },
    {
      route: 'slides',
      icon: Presentation,
      label: 'Slides',
      title: 'Lab Slide Decks',
      text: `${slideDecks.length} lab decks to view in the browser or download as PPTX / PDF.`,
      accent: 'text-c-relational bg-c-relational/10'
    },
    {
      route: 'labs',
      icon: FlaskConical,
      label: 'Labs',
      title: 'Interactive Labs',
      text: 'Hands-on visualizers for clause order, joins, GROUP BY and transaction savepoints.',
      accent: 'text-c-storage bg-c-storage/10'
    },
    {
      route: 'mcq',
      icon: ListChecks,
      label: 'MCQ Practice',
      title: `${mcqs.length}-Question MCQ Bank`,
      text: 'Quick overview with answers, instant-feedback practice, or a timed exam-style quiz.',
      accent: 'text-c-sql bg-c-sql/10'
    },
    {
      route: 'cheatsheets',
      icon: FileText,
      label: 'Cheat Sheets',
      title: 'SQL Cheat Sheets',
      text: `${cheatsheets.length} compact syntax references for DDL, DML, joins, aggregation, stored programs and transactions.`,
      accent: 'text-c-txn bg-c-txn/10'
    },
    {
      route: 'glossary',
      icon: BookA,
      label: 'Glossary',
      title: 'Database Glossary',
      text: `${glossaryTerms.length} DBMS terms explained in plain words, each linked to its week.`,
      accent: 'text-c-modern bg-c-modern/10'
    },
    {
      route: 'playground',
      icon: Terminal,
      label: 'Playground',
      title: 'SQL Playground',
      text: 'A real PostgreSQL engine running in your browser. Write and run queries on sample datasets — no install needed.',
      accent: 'text-c-revision bg-c-revision/10'
    }
  ];

  return (
    <div className="space-y-14 pb-16">
      {/* Hero: what is a DBMS */}
      <section className="pt-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="p-7 sm:p-12 rounded-[28px] bg-surface-2/40 border border-border/80">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="text-xs font-semibold tracking-wide text-text-muted flex flex-wrap items-center gap-2">
                  <span className="text-primary font-bold">{course.code}</span>
                  <span>·</span>
                  <span>DBMS Sessional</span>
                  <span>·</span>
                  <span>Level-2, Term-II</span>
                  <span>·</span>
                  <span>1.50 Credits</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black text-text tracking-tight leading-[1.12]">
                  What is a <br className="hidden sm:block" />
                  <span className="text-primary">Database Management System?</span>
                </h1>

                <p className="text-base sm:text-lg text-text-muted max-w-xl leading-relaxed">
                  A <strong className="text-text">DBMS</strong> is software that stores, organises and protects data so that many
                  users and programs can share it safely. You describe <em>what</em> data you want using SQL, and the DBMS
                  works out <em>how</em> to store, find and update it.
                </p>
                <p className="text-sm text-text-muted max-w-xl leading-relaxed">
                  Examples include PostgreSQL, MySQL, Oracle and SQL Server. In this sessional we use{' '}
                  <strong className="text-text">PostgreSQL</strong>.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => onNavigate('weeks')}
                    className="px-6 py-3.5 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-sm transition shadow-sm cursor-pointer flex items-center gap-2"
                  >
                    Start with the Roadmap <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onNavigate('playground')}
                    className="px-6 py-3.5 rounded-2xl bg-surface hover:bg-surface-2 border border-border text-text font-bold text-sm transition cursor-pointer flex items-center gap-2.5"
                  >
                    <Terminal className="w-4 h-4 text-primary" /> Try SQL Now
                  </button>
                </div>
              </div>

              {/* How a DBMS sits between users and data */}
              <div className="lg:col-span-5">
                <div className="p-6 rounded-[24px] bg-surface border border-border shadow-sm space-y-2.5 text-center">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-text-muted mb-1">How it fits together</div>

                  <div className="px-4 py-3 rounded-xl bg-surface-2 border border-border flex items-center justify-center gap-2 text-sm font-semibold text-text">
                    <User className="w-4 h-4 text-primary" /> User / Application
                  </div>
                  <div className="flex flex-col items-center text-[11px] font-mono text-primary">
                    <ArrowDown className="w-4 h-4" />
                    <span>SELECT name FROM student WHERE cgpa &gt; 3.5;</span>
                  </div>
                  <div className="px-4 py-3.5 rounded-xl bg-primary text-white font-bold text-sm shadow-md flex items-center justify-center gap-2">
                    <Layers className="w-4 h-4" /> DBMS (PostgreSQL)
                  </div>
                  <div className="text-[11px] text-text-muted">checks rules · plans the query · manages transactions</div>
                  <div className="flex justify-center text-primary"><ArrowDown className="w-4 h-4" /></div>

                  <div className="rounded-xl border border-border overflow-hidden text-xs font-mono">
                    <div className="px-3 py-1.5 bg-surface-2 text-left font-bold text-text flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5 text-primary" /> Database · student
                    </div>
                    <div className="grid grid-cols-3 px-3 py-1.5 border-t border-border text-text-muted font-semibold">
                      <span>id</span><span>name</span><span>cgpa</span>
                    </div>
                    <div className="grid grid-cols-3 px-3 py-1.5 border-t border-border text-text">
                      <span>101</span><span>Rahim</span><span>3.85</span>
                    </div>
                    <div className="grid grid-cols-3 px-3 py-1.5 border-t border-border text-text">
                      <span>102</span><span>Karim</span><span>3.40</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key ideas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl font-bold text-text">DBMS in six ideas</h2>
        <p className="text-sm text-text-muted mt-1 mb-5">The core vocabulary you will use in every lab.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {KEY_IDEAS.map(({ icon: Icon, title, text, accent }) => (
            <div key={title} className="custom-card p-5">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${accent}`}>
                <Icon className="w-4.5 h-4.5" />
              </div>
              <h3 className="font-bold text-base text-text">{title}</h3>
              <p className="text-sm text-text-muted mt-1.5 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SQL command families */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl font-bold text-text">The SQL command families</h2>
        <p className="text-sm text-text-muted mt-1 mb-5">Every statement you write in this course belongs to one of these groups.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SQL_FAMILIES.map(f => (
            <div key={f.tag} className="custom-card p-5">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-black text-primary">{f.tag}</span>
                <span className="text-sm font-semibold text-text">{f.name}</span>
              </div>
              <div className="mt-2 text-xs font-mono text-text-muted leading-relaxed">{f.cmds}</div>
            </div>
          ))}
        </div>
      </section>

      {/* All pages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl font-bold text-text">Explore the study portal</h2>
        <p className="text-sm text-text-muted mt-1 mb-5">Everything on this site, one click away.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PAGES.map(({ route, icon: Icon, label, title, text, accent }) => (
            <button
              key={route}
              onClick={() => onNavigate(route)}
              className="custom-card p-5 text-left hover:border-primary/50 cursor-pointer transition flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${accent}`}>
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">{label}</span>
                </div>
                <h3 className="font-bold text-base text-text">{title}</h3>
                <p className="text-xs text-text-muted mt-1.5 leading-relaxed">{text}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-primary">
                <span>Open {label}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
