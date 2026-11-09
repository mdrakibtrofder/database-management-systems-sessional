import React from 'react';
import {
  BookOpen,
  Calendar,
  Users,
  Award,
  Download,
  Terminal,
  FileCheck,
  CheckCircle2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { course, WeekData } from '../data/course';

interface CourseInfoPageProps {
  onSelectWeek: (weekId: number) => void;
}

export const CourseInfoPage: React.FC<CourseInfoPageProps> = ({ onSelectWeek }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Hero Header */}
      <div className="custom-card p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary">
              Course Information &amp; Syllabus
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text mt-2">
              {course.code}: {course.title}
            </h1>
            <p className="text-sm text-text-muted mt-1">
              Credit: 1.50 (3.00 Contact Hours/Week) · Semester: {course.semester} · BAUST
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-surface-2 border border-border text-xs font-mono font-bold text-text">
              PostgreSQL {course.dbms.version}
            </span>
          </div>
        </div>
      </div>

      {/* Instructors */}
      <div>
        <h3 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" /> Course Instructors
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {course.instructors.map((inst, idx) => (
            <div key={idx} className="custom-card p-5">
              <h4 className="font-bold text-base text-text">{inst.name}</h4>
              <p className="text-xs text-primary font-medium">{inst.role}</p>

              <div className="mt-3 space-y-1 text-xs text-text-muted">
                {inst.email && (
                  <div>
                    <strong>Email: </strong>
                    <a href={`mailto:${inst.email}`} className="text-primary hover:underline">
                      {inst.email}
                    </a>
                  </div>
                )}
                {inst.room && <div><strong>Office Room: </strong>{inst.room}</div>}
                {inst.hours && (
                  <div className="pt-1">
                    <strong>Counselling Hours:</strong>
                    <ul className="list-disc list-inside mt-0.5 space-y-0.5">
                      {inst.hours.map((h, hIdx) => (
                        <li key={hIdx}>{h}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Assessment Weights (Donut / Progress Cards) */}
      <div className="custom-card p-6">
        <h3 className="text-lg font-bold text-text mb-2 flex items-center gap-2">
          <Award className="w-5 h-5 text-primary" /> Assessment Breakdown (100% Total)
        </h3>
        <p className="text-xs text-text-muted mb-4">
          Grading distribution according to official BAUST CSE 2206 course outline.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
          {course.assessment.map((item, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-surface-2 border border-border">
              <div className="text-2xl font-black" style={{ color: item.color }}>
                {item.pct}%
              </div>
              <div className="text-xs font-semibold text-text mt-1 truncate">
                {item.method}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Course Outcomes (COs) */}
      <div className="custom-card p-6">
        <h3 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-primary" /> Course Outcomes (COs)
        </h3>
        <div className="space-y-3">
          {course.outcomes.map((co) => (
            <div key={co.co} className="p-4 rounded-xl bg-surface-2/60 border border-border flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <span className="font-bold text-sm text-primary font-mono mr-2">
                  {co.co}
                </span>
                <span className="text-xs text-text leading-relaxed">
                  {co.statement}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0 text-[11px] font-mono">
                <span className="px-2 py-0.5 rounded bg-surface border border-border text-text-muted">
                  {co.po}
                </span>
                <span className="px-2 py-0.5 rounded bg-surface border border-border text-primary font-bold">
                  {co.bloom}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full 14-Week Semester Plan Table */}
      <div className="custom-card p-6">
        <h3 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" /> 14-Week Semester Syllabus
        </h3>

        <div className="divide-y divide-border/60">
          {course.weeks.map((w: WeekData) => (
            <div
              key={w.id}
              onClick={() => onSelectWeek(w.id)}
              className="py-3 flex items-center justify-between hover:bg-surface-2/40 px-2 rounded-lg cursor-pointer transition"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-primary w-16">
                  {w.label}
                </span>
                <div>
                  <h4 className="font-semibold text-xs sm:text-sm text-text">
                    {w.title}
                  </h4>
                  <p className="text-[11px] text-text-muted hidden sm:block truncate max-w-lg">
                    {w.summary}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  w.status === 'published'
                    ? 'bg-success/10 text-success'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                }`}>
                  {w.status === 'published' ? 'Published' : 'Upcoming'}
                </span>
                <ChevronRight className="w-4 h-4 text-text-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
