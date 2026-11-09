import React, { useState } from 'react';
import { HelpCircle, Check, X, RotateCcw, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PredictCardProps {
  sql: string;
  choices: string[];
  answer: number;
  explain: string;
}

export const PredictOutputCard: React.FC<PredictCardProps> = ({
  sql,
  choices,
  answer,
  explain
}) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = (idx: number) => {
    if (revealed) return;
    setSelected(idx);
    setRevealed(true);
    if (idx === answer) {
      try {
        confetti({ particleCount: 30, spread: 60, origin: { y: 0.8 } });
      } catch (e) {}
    }
  };

  const handleReset = () => {
    setSelected(null);
    setRevealed(false);
  };

  return (
    <div className="custom-card p-4 my-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-primary flex items-center gap-1">
          <HelpCircle className="w-3.5 h-3.5" /> Predict the Output
        </span>
        {revealed && (
          <button
            onClick={handleReset}
            className="text-xs text-text-muted hover:text-text flex items-center gap-1 transition"
          >
            <RotateCcw className="w-3 h-3" /> Retry
          </button>
        )}
      </div>

      <div className="p-2.5 rounded-lg bg-code-bg font-mono text-xs text-code-text mb-3 border border-border">
        {sql}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {choices.map((choice, idx) => {
          const isChosen = selected === idx;
          const isCorrect = idx === answer;

          let btnClass = "border-border bg-surface hover:bg-surface-2 text-text";
          if (revealed) {
            if (isCorrect) {
              btnClass = "border-success bg-success/10 text-success font-bold";
            } else if (isChosen && !isCorrect) {
              btnClass = "border-danger bg-danger/10 text-danger";
            } else {
              btnClass = "border-border/60 bg-surface opacity-50";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={revealed}
              className={`p-2.5 rounded-lg border text-left text-xs transition flex items-center justify-between cursor-pointer ${btnClass}`}
            >
              <span>{choice}</span>
              {revealed && isCorrect && <Check className="w-4 h-4 text-success shrink-0" />}
              {revealed && isChosen && !isCorrect && <X className="w-4 h-4 text-danger shrink-0" />}
            </button>
          );
        })}
      </div>

      {revealed && (
        <div className={`mt-3 p-3 rounded-lg text-xs leading-relaxed ${
          selected === answer ? 'bg-success/10 text-success' : 'bg-primary/5 text-text'
        }`}>
          <strong>{selected === answer ? 'Correct!' : 'Explanation:'}</strong> {explain}
        </div>
      )}
    </div>
  );
};
