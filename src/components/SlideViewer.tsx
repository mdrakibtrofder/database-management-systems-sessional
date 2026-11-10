import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FileText,
  Download,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Sparkles,
  Presentation
} from 'lucide-react';
import { SlideDeck, deckImageUrl, deckPdfUrl, deckPptxUrl, getDeckByWeek } from '../data/slides';

interface SlideViewerProps {
  /** Week number of the deck to show (looked up in data/slides.ts) */
  week?: number;
  /** Or pass a deck directly */
  deck?: SlideDeck;
  title?: string;
  onRunSlideSql?: () => void;
  /** Listen to ←/→ keys globally (use on a page that shows only one viewer) */
  globalKeys?: boolean;
  /** Kept for backwards compatibility with older call sites */
  pdfUrl?: string;
  pptxUrl?: string;
  slideCount?: number;
  fileSize?: string;
}

export const SlideViewer: React.FC<SlideViewerProps> = ({ week, deck: deckProp, title, onRunSlideSql, globalKeys }) => {
  const deck = deckProp ?? (week !== undefined ? getDeckByWeek(week) : undefined);
  const [current, setCurrent] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const total = deck?.slides ?? 0;

  // Reset when the deck changes
  useEffect(() => { setCurrent(1); }, [deck?.week]);
  useEffect(() => { setLoaded(false); }, [current, deck?.week]);

  const go = useCallback((n: number) => {
    if (!total) return;
    setCurrent(Math.min(total, Math.max(1, n)));
  }, [total]);

  const handleKey = useCallback((e: KeyboardEvent | React.KeyboardEvent) => {
    const target = e.target as HTMLElement;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return;
    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); setCurrent(c => Math.min(total, c + 1)); }
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); setCurrent(c => Math.max(1, c - 1)); }
    else if (e.key === 'Home') { e.preventDefault(); setCurrent(1); }
    else if (e.key === 'End') { e.preventDefault(); setCurrent(total); }
  }, [total]);

  useEffect(() => {
    if (!globalKeys) return;
    const fn = (e: KeyboardEvent) => handleKey(e);
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [globalKeys, handleKey]);

  useEffect(() => {
    const onFs = () => setIsFullscreen(document.fullscreenElement === rootRef.current);
    document.addEventListener('fullscreenchange', onFs);
    return () => document.removeEventListener('fullscreenchange', onFs);
  }, []);

  // Keep the active thumbnail in view
  useEffect(() => {
    const el = thumbsRef.current?.querySelector<HTMLElement>(`[data-slide="${current}"]`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [current]);

  // Preload neighbours
  useEffect(() => {
    if (!deck) return;
    [current + 1, current - 1].forEach(n => {
      if (n >= 1 && n <= total) { const img = new Image(); img.src = deckImageUrl(deck, n); }
    });
  }, [current, deck, total]);

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await rootRef.current?.requestFullscreen();
    } catch (e) {}
  };

  if (!deck) return null;

  const heading = title ?? `Week ${deck.week}: ${deck.title}`;

  return (
    <div
      ref={rootRef}
      tabIndex={0}
      onKeyDown={globalKeys ? undefined : handleKey}
      className={`custom-card overflow-hidden border border-border focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
        isFullscreen ? 'flex flex-col !rounded-none bg-black' : 'my-6'
      }`}
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-surface-2 border-b border-border gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <Presentation className="w-4 h-4 text-primary shrink-0" />
          <span className="font-semibold text-xs sm:text-sm text-text truncate">{heading}</span>
          <span className="text-[11px] px-2 py-0.5 rounded bg-surface border border-border text-text-muted hidden sm:inline whitespace-nowrap">
            {deck.slides} slides
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {onRunSlideSql && (
            <button
              onClick={onRunSlideSql}
              className="px-2.5 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" /> Run Slide SQL
            </button>
          )}
          <a
            href={deckPptxUrl(deck)}
            download={`${deck.file}.pptx`}
            className="px-2.5 py-1.5 rounded-lg bg-primary text-white hover:bg-primary/90 text-xs font-semibold flex items-center gap-1 transition"
            title={`Download PowerPoint (${deck.pptxSize})`}
          >
            <Download className="w-3.5 h-3.5" /> PPTX <span className="opacity-75 font-normal hidden sm:inline">· {deck.pptxSize}</span>
          </a>
          <a
            href={deckPdfUrl(deck)}
            download={`${deck.file}.pdf`}
            className="px-2.5 py-1.5 rounded-lg bg-surface border border-border hover:bg-border text-xs font-semibold text-text flex items-center gap-1 transition"
            title={`Download PDF (${deck.pdfSize})`}
          >
            <Download className="w-3.5 h-3.5" /> PDF
          </a>
          <a
            href={deckPdfUrl(deck)}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg bg-surface border border-border hover:bg-border text-text transition"
            title="Open PDF in a new tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg bg-surface border border-border hover:bg-border text-text transition cursor-pointer"
            title={isFullscreen ? 'Exit full screen (Esc)' : 'Full screen'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Stage */}
      <div className={`relative bg-slate-900 select-none ${isFullscreen ? 'flex-1 flex items-center justify-center' : ''}`}>
        <div className={`relative w-full ${isFullscreen ? 'h-full' : 'aspect-video'}`}>
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-xs gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Loading slide {current}…
            </div>
          )}
          <img
            key={`${deck.week}-${current}`}
            src={deckImageUrl(deck, current)}
            alt={`${deck.title}, slide ${current} of ${total}`}
            onLoad={() => setLoaded(true)}
            className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-200 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            draggable={false}
          />

          {/* Click zones */}
          <button
            aria-label="Previous slide"
            onClick={() => go(current - 1)}
            disabled={current === 1}
            className="absolute left-0 top-0 h-full w-1/3 group cursor-pointer disabled:cursor-default"
          >
            <span className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/45 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-disabled:!opacity-0 transition">
              <ChevronLeft className="w-5 h-5" />
            </span>
          </button>
          <button
            aria-label="Next slide"
            onClick={() => go(current + 1)}
            disabled={current === total}
            className="absolute right-0 top-0 h-full w-1/3 group cursor-pointer disabled:cursor-default"
          >
            <span className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/45 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-disabled:!opacity-0 transition">
              <ChevronRight className="w-5 h-5" />
            </span>
          </button>

          <span className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/55 text-white text-[11px] font-mono">
            {current} / {total}
          </span>
        </div>

        {/* Progress */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
          <div className="h-full bg-primary transition-all duration-300" style={{ width: `${(current / total) * 100}%` }} />
        </div>
      </div>

      {/* Controls + thumbnails */}
      <div className={`px-3 py-3 bg-surface border-t border-border ${isFullscreen ? 'shrink-0' : ''}`}>
        <div className="flex items-center gap-2 mb-2.5">
          <button
            onClick={() => go(current - 1)}
            disabled={current === 1}
            className="px-3 py-1.5 rounded-lg border border-border text-xs font-semibold text-text disabled:opacity-30 hover:bg-surface-2 transition flex items-center gap-1 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" /> Prev
          </button>
          <span className="flex-1 text-center text-[11px] text-text-muted">
            <span className="hidden sm:inline">Use ← → keys, click the slide edges, or pick a thumbnail</span>
            <span className="sm:hidden">Slide {current} of {total}</span>
          </span>
          <button
            onClick={() => go(current + 1)}
            disabled={current === total}
            className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold disabled:opacity-30 hover:bg-primary/90 transition flex items-center gap-1 cursor-pointer"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div ref={thumbsRef} className="flex gap-2 overflow-x-auto pb-1">
          {Array.from({ length: total }, (_, i) => i + 1).map(n => (
            <button
              key={n}
              data-slide={n}
              onClick={() => go(n)}
              className={`relative shrink-0 w-24 sm:w-28 aspect-video rounded-md overflow-hidden border-2 transition cursor-pointer ${
                n === current ? 'border-primary ring-2 ring-primary/25' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
              title={`Slide ${n}`}
            >
              <img src={deckImageUrl(deck, n)} alt="" loading="lazy" className="w-full h-full object-cover bg-slate-200" />
              <span className="absolute bottom-0.5 left-0.5 px-1 rounded bg-black/60 text-white text-[9px] font-mono">{n}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
