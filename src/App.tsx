import React, { useState, useEffect } from 'react';
import {
  Database,
  Moon,
  Sun,
  BookOpen,
  Terminal,
  HelpCircle,
  FileText,
  Award,
  Layers,
  Search,
  Menu,
  X,
  Bookmark,
  RotateCcw,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { course } from './data/course';
import { HomePage } from './components/HomePage';
import { RoadmapPage } from './components/RoadmapPage';
import { WeekDetailPage } from './components/WeekDetailPage';
import { PlaygroundPage } from './components/PlaygroundPage';
import { McqPage } from './components/McqPage';
import { CheatsheetsPage } from './components/CheatsheetsPage';
import { GlossaryPage } from './components/GlossaryPage';
import { SlidesPage } from './components/SlidesPage';

// Pages that were removed from the site — old links fall back to Home
const REMOVED_ROUTES = ['notes', 'labtest', 'about', 'setup'];

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    const hash = window.location.hash.replace('#/', '');
    if (hash.startsWith('week/')) return 'week-detail';
    if (hash.startsWith('slides')) return 'slides';
    if (REMOVED_ROUTES.includes(hash)) return 'home';
    return hash || 'home';
  });

  const [activeWeekId, setActiveWeekId] = useState<number>(() => {
    const m = window.location.hash.match(/#\/(?:week|slides)\/(\d+)/);
    return m ? parseInt(m[1], 10) : 1;
  });
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('cse2206-theme') === 'dark';
    } catch (e) {
      return false;
    }
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Sync route on hashchange
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '');
      if (hash.startsWith('week/')) {
        const id = parseInt(hash.replace('week/', ''), 10);
        if (!isNaN(id)) {
          setActiveWeekId(id);
          setCurrentRoute('week-detail');
          return;
        }
      }
      if (hash.startsWith('slides')) {
        const id = parseInt(hash.replace('slides/', ''), 10);
        if (!isNaN(id)) setActiveWeekId(id);
        setCurrentRoute('slides');
        return;
      }
      setCurrentRoute(REMOVED_ROUTES.includes(hash) ? 'home' : (hash || 'home'));
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    try {
      if (nextDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('cse2206-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('cse2206-theme', 'light');
      }
    } catch (e) {}
  };

  const navigateTo = (route: string) => {
    setMobileMenuOpen(false);
    if (route.startsWith('week/')) {
      const id = parseInt(route.replace('week/', ''), 10);
      setActiveWeekId(id);
      window.location.hash = `#/${route}`;
      setCurrentRoute('week-detail');
      return;
    }
    if (route.startsWith('slides')) {
      const id = parseInt(route.replace('slides/', ''), 10);
      if (!isNaN(id)) setActiveWeekId(id);
      window.location.hash = `#/${route}`;
      setCurrentRoute('slides');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.location.hash = `#/${route}`;
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectWeek = (id: number) => {
    setActiveWeekId(id);
    navigateTo(`week/${id}`);
  };

  const handleOpenInPlayground = (sql: string) => {
    navigateTo('playground');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Main navigation items as shown in reference header:
  // Roadmap | Slides | Labs | MCQ | Cheat Sheets | Glossary (+ Playground)
  const navItems = [
    { id: 'weeks', label: 'Roadmap' },
    { id: 'slides', label: 'Slides' },
    { id: 'labs', label: 'Labs' },
    { id: 'mcq', label: 'MCQ Practice' },
    { id: 'cheatsheets', label: 'Cheat Sheets' },
    { id: 'glossary', label: 'Glossary' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-bg text-text selection:bg-primary/20 selection:text-primary">
      {/* Top Navbar Matching the Reference UI exactly */}
      <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-border/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo & Brand: Blue rounded square icon with cylinder database glyph */}
          <div
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3 cursor-pointer select-none group shrink-0"
          >
            <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <Database className="w-5 h-5" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-text">
                CSE 2206
              </span>
              <span className="text-text-muted font-normal text-sm sm:text-base">·</span>
              <span className="font-bold text-base sm:text-lg tracking-tight text-text">
                DBMS Sessional
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links with Active Underline Bar */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            {navItems.map((item) => {
              const isActive =
                (item.id === 'weeks' && (currentRoute === 'weeks' || currentRoute === 'week-detail')) ||
                (item.id === 'slides' && currentRoute === 'slides') ||
                (item.id === 'labs' && currentRoute === 'labs') ||
                (item.id === 'mcq' && currentRoute === 'mcq') ||
                (item.id === 'cheatsheets' && currentRoute === 'cheatsheets') ||
                (item.id === 'glossary' && currentRoute === 'glossary');

              return (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`relative py-5 transition-colors cursor-pointer ${
                    isActive
                      ? 'text-primary font-semibold'
                      : 'text-text-muted hover:text-text'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Toolbar: Search input, Bookmark icon, Theme icon, Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-surface-2/80 border border-border/80 text-text-muted hover:text-text text-xs flex items-center gap-2 transition hidden sm:flex cursor-pointer"
              title="Search topics and queries (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
              <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border text-[10px] text-text-muted font-mono font-semibold">
                ⌘K
              </kbd>
            </button>

            <button
              onClick={() => navigateTo('cheatsheets')}
              className="p-2 rounded-xl text-text-muted hover:text-text hover:bg-surface-2 transition cursor-pointer hidden sm:flex"
              title="Saved Bookmarks & Cheats"
            >
              <Bookmark className="w-4 h-4" />
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-text-muted hover:text-text hover:bg-surface-2 transition cursor-pointer"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-text-muted hover:text-text hover:bg-surface-2 transition lg:hidden"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-surface px-4 py-4 space-y-1 shadow-xl">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  currentRoute === item.id
                    ? 'bg-primary text-white'
                    : 'text-text hover:bg-surface-2'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => navigateTo('playground')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold text-primary hover:bg-primary/10 transition mt-2 border border-primary/20"
            >
              SQL Playground
            </button>
          </div>
        )}
      </header>

      {/* Main Page Content Body */}
      <main className="flex-1">
        {currentRoute === 'home' && (
          <HomePage onNavigate={navigateTo} onSelectWeek={handleSelectWeek} />
        )}
        {currentRoute === 'weeks' && (
          <RoadmapPage onSelectWeek={handleSelectWeek} />
        )}
        {currentRoute === 'slides' && (
          <SlidesPage
            activeWeek={activeWeekId}
            onChangeWeek={(w) => {
              setActiveWeekId(w);
              window.history.replaceState(null, '', `#/slides/${w}`);
            }}
            onSelectWeek={handleSelectWeek}
          />
        )}
        {currentRoute === 'week-detail' && (
          <WeekDetailPage
            weekId={activeWeekId}
            onSelectWeek={handleSelectWeek}
            onOpenInPlayground={handleOpenInPlayground}
          />
        )}
        {currentRoute === 'playground' && (
          <PlaygroundPage />
        )}
        {currentRoute === 'labs' && (
          <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Interactive Labs</span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-text mt-1">Hands-On SQL Visualizers</h1>
                <p className="text-xs sm:text-sm text-text-muted mt-1">Explore real PostgreSQL clause orders, transaction savepoints, relational joins, and group by filters.</p>
              </div>
              <button
                onClick={() => navigateTo('playground')}
                className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 transition flex items-center gap-2"
              >
                <Terminal className="w-4 h-4" /> Open SQL Playground
              </button>
            </div>
            <WeekDetailPage weekId={1} onSelectWeek={handleSelectWeek} onOpenInPlayground={handleOpenInPlayground} />
            <WeekDetailPage weekId={4} onSelectWeek={handleSelectWeek} onOpenInPlayground={handleOpenInPlayground} />
            <WeekDetailPage weekId={7} onSelectWeek={handleSelectWeek} onOpenInPlayground={handleOpenInPlayground} />
          </div>
        )}
        {currentRoute === 'mcq' && (
          <McqPage onOpenInPlayground={handleOpenInPlayground} />
        )}
        {currentRoute === 'cheatsheets' && (
          <CheatsheetsPage onOpenInPlayground={handleOpenInPlayground} />
        )}
        {currentRoute === 'glossary' && (
          <GlossaryPage onSelectWeek={handleSelectWeek} onOpenInPlayground={handleOpenInPlayground} />
        )}
      </main>

      {/* Global Search Dialog Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 pt-20">
          <div className="custom-card w-full max-w-xl p-4 shadow-2xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <span className="font-bold text-xs uppercase tracking-wider text-text-muted flex items-center gap-1.5">
                <Search className="w-4 h-4 text-primary" /> Command &amp; Topic Search
              </span>
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 rounded text-text-muted hover:text-text cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search weeks, keywords, having, savepoint, joins, sqlstate..."
              className="w-full px-3 py-2 rounded-xl bg-surface-2 border border-border text-xs sm:text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20"
            />

            <div className="max-h-64 overflow-auto space-y-1 text-xs">
              {course.weeks
                .filter(w =>
                  !searchQuery ||
                  w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  w.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  w.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
                )
                .slice(0, 5)
                .map(w => (
                  <div
                    key={w.id}
                    onClick={() => {
                      setSearchOpen(false);
                      handleSelectWeek(w.id);
                    }}
                    className="p-2.5 rounded-lg hover:bg-surface-2 flex items-center justify-between cursor-pointer transition"
                  >
                    <div>
                      <div className="font-bold text-text">{w.label}: {w.title}</div>
                      <div className="text-[11px] text-text-muted truncate max-w-sm">{w.summary}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-text-muted" />
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Clean Footer Matching Reference */}
      <footer className="border-t border-border bg-surface py-8 px-4 text-xs text-text-muted transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-text">CSE 2206: DBMS Sessional</span>
            <span>·</span>
            <span>Bangladesh Army University of Science and Technology (BAUST)</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (confirm("Reset all local progress (quizzes, completed weeks, starred cheat sheets)?")) {
                  localStorage.clear();
                  window.location.reload();
                }
              }}
              className="hover:text-text flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> Reset My Progress
            </button>
            <span className="text-text-muted">Instructor: Md. Rakib Trofder, Lecturer, Dept. of CSE, BAUST</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
