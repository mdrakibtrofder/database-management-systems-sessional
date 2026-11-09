import React, { useState } from 'react';
import {
  FileText,
  Download,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Sparkles
} from 'lucide-react';

interface SlideViewerProps {
  title: string;
  pdfUrl: string;
  pptxUrl?: string;
  slideCount?: number;
  fileSize?: string;
  onRunSlideSql?: () => void;
}

export const SlideViewer: React.FC<SlideViewerProps> = ({
  title,
  pdfUrl,
  pptxUrl,
  slideCount,
  fileSize,
  onRunSlideSql
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);

  return (
    <div className="custom-card overflow-hidden my-6 border border-border">
      {/* Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-surface-2 border-b border-border gap-2">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" />
          <span className="font-semibold text-xs sm:text-sm text-text truncate max-w-[200px] sm:max-w-xs">
            {title}
          </span>
          {slideCount && (
            <span className="text-xs px-2 py-0.5 rounded bg-surface border border-border text-text-muted hidden sm:inline">
              {slideCount} slides · {fileSize || "PDF"}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {onRunSlideSql && (
            <button
              onClick={onRunSlideSql}
              className="px-2.5 py-1 rounded bg-primary/10 text-primary hover:bg-primary/20 text-xs font-semibold flex items-center gap-1 transition"
            >
              <Sparkles className="w-3.5 h-3.5" /> Run Slide's SQL
            </button>
          )}

          {pptxUrl && (
            <a
              href={pptxUrl}
              download
              className="px-2.5 py-1 rounded bg-surface hover:bg-border text-xs font-medium text-text flex items-center gap-1 transition"
              title="Download original PowerPoint deck"
            >
              <Download className="w-3.5 h-3.5" /> PPTX
            </a>
          )}

          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 rounded bg-surface hover:bg-border text-xs font-medium text-text flex items-center gap-1 transition"
            title="Open full PDF in new tab"
          >
            <ExternalLink className="w-3.5 h-3.5" /> PDF
          </a>
        </div>
      </div>

      {/* Embedded Slide Viewer Container with Graceful Placeholder */}
      <div className="relative bg-slate-900/90 w-full min-h-[360px] sm:min-h-[460px] flex flex-col items-center justify-center p-4">
        <div className="custom-card w-full max-w-2xl p-6 sm:p-8 text-center bg-surface border-border shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary mx-auto flex items-center justify-center mb-4">
            <FileText className="w-6 h-6" />
          </div>

          <h3 className="font-extrabold text-base sm:text-lg text-text">
            {title}
          </h3>
          <p className="text-xs text-text-muted mt-1.5 max-w-md mx-auto leading-relaxed">
            All SQL code blocks, results, and learning tasks from this deck are extracted below and 100% executable on the live PostgreSQL engine.
          </p>

          <div className="mt-4 p-3 rounded-xl bg-surface-2 border border-border inline-flex items-center gap-2 text-xs font-mono text-text-muted">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            Slide attachment slot: <span className="text-text font-bold">{pdfUrl.split('/').pop()}</span>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {onRunSlideSql && (
              <button
                onClick={onRunSlideSql}
                className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                <Sparkles className="w-4 h-4" /> Run Slide SQL Below
              </button>
            )}
            <a
              href={`#`}
              onClick={(e) => {
                e.preventDefault();
                alert(`The slide file '${pdfUrl.split('/').pop()}' will be available once uploaded to the project assets.`);
              }}
              className="px-4 py-2 rounded-xl border border-border bg-surface hover:bg-surface-2 text-xs font-semibold text-text flex items-center gap-1.5 transition"
            >
              <Download className="w-4 h-4" /> Download Slide File
            </a>
          </div>
        </div>
      </div>

      {/* Viewer Footer Note */}
      <div className="px-4 py-2 bg-surface text-xs text-text-muted flex items-center justify-between border-t border-border">
        <span>Slide deck viewable in browser. Original .pptx is ready for download.</span>
        <a
          href={pdfUrl}
          download
          className="font-medium text-primary hover:underline flex items-center gap-1"
        >
          <Download className="w-3 h-3" /> Direct PDF Download
        </a>
      </div>
    </div>
  );
};
