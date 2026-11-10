import React from 'react';
import { Download, FileText, Presentation, ArrowRight } from 'lucide-react';
import { SlideViewer } from './SlideViewer';
import { slideDecks, deckImageUrl, deckPdfUrl, deckPptxUrl } from '../data/slides';

interface SlidesPageProps {
  activeWeek: number;
  onChangeWeek: (week: number) => void;
  onSelectWeek: (week: number) => void;
}

export const SlidesPage: React.FC<SlidesPageProps> = ({ activeWeek, onChangeWeek, onSelectWeek }) => {
  const deck = slideDecks.find(d => d.week === activeWeek) ?? slideDecks[0];
  const totalSlides = slideDecks.reduce((n, d) => n + d.slides, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Lecture Slides</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text mt-1">Weekly Slide Decks</h1>
          <p className="text-xs sm:text-sm text-text-muted mt-1">
            {slideDecks.length} decks · {totalSlides} slides. Flip through them here, or download the PowerPoint or PDF.
          </p>
        </div>
      </div>

      {/* Deck picker */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-2">
        {slideDecks.map(d => (
          <button
            key={d.week}
            onClick={() => onChangeWeek(d.week)}
            className={`shrink-0 px-3.5 py-2 rounded-xl text-left text-xs transition border cursor-pointer max-w-[220px] ${
              d.week === deck.week
                ? 'bg-primary text-white border-primary shadow-sm'
                : 'bg-surface border-border text-text hover:bg-surface-2'
            }`}
          >
            <div className="font-bold">Week {d.week}</div>
            <div className={`truncate ${d.week === deck.week ? 'text-white/85' : 'text-text-muted'}`}>{d.title}</div>
          </button>
        ))}
      </div>

      <SlideViewer deck={deck} globalKeys />

      <div className="flex flex-wrap items-center justify-between gap-3 -mt-2 mb-10">
        <div className="flex flex-wrap gap-1.5">
          {deck.topics.map(t => (
            <span key={t} className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-surface border border-border text-text-muted">{t}</span>
          ))}
        </div>
        <button
          onClick={() => onSelectWeek(deck.week)}
          className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
        >
          Open Week {deck.week} lesson, SQL &amp; labs <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* All decks */}
      <h2 className="text-sm font-bold uppercase tracking-wider text-text-muted mb-3">All decks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {slideDecks.map(d => (
          <div key={d.week} className={`custom-card overflow-hidden flex flex-col ${d.week === deck.week ? 'ring-2 ring-primary/40' : ''}`}>
            <button
              onClick={() => { onChangeWeek(d.week); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="relative aspect-video bg-slate-200 overflow-hidden group cursor-pointer"
              title="View in browser"
            >
              <img src={deckImageUrl(d, 1)} alt={`${d.title} cover`} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.02] transition" />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-bold">Week {d.week}</span>
              <span className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/35 transition">
                <span className="opacity-0 group-hover:opacity-100 transition px-3 py-1.5 rounded-lg bg-white text-slate-900 text-xs font-bold flex items-center gap-1.5">
                  <Presentation className="w-3.5 h-3.5" /> View slides
                </span>
              </span>
            </button>
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-bold text-sm text-text leading-snug">{d.title}</h3>
              <p className="text-xs text-text-muted mt-1 leading-relaxed flex-1">{d.summary}</p>
              <div className="text-[11px] text-text-muted mt-3 font-mono">{d.slides} slides</div>
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
                <a
                  href={deckPptxUrl(d)}
                  download={`${d.file}.pptx`}
                  className="flex-1 px-2.5 py-1.5 rounded-lg bg-primary text-white hover:bg-primary/90 text-xs font-semibold flex items-center justify-center gap-1 transition"
                >
                  <Download className="w-3.5 h-3.5" /> PPTX · {d.pptxSize}
                </a>
                <a
                  href={deckPdfUrl(d)}
                  download={`${d.file}.pdf`}
                  className="flex-1 px-2.5 py-1.5 rounded-lg bg-surface-2 border border-border hover:bg-border text-xs font-semibold text-text flex items-center justify-center gap-1 transition"
                >
                  <FileText className="w-3.5 h-3.5" /> PDF · {d.pdfSize}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
