import React, { useState } from 'react';
import { RotateCw, Check } from 'lucide-react';

interface FlashcardProps {
  cards: Array<{ front: string; back: string }>;
}

export const FlashcardsSection: React.FC<FlashcardProps> = ({ cards }) => {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});

  const toggleFlip = (index: number) => {
    setFlipped(prev => ({ ...prev, [index]: !prev[index] }));
  };

  if (!cards || cards.length === 0) return null;

  return (
    <div className="my-6">
      <h4 className="text-sm font-bold text-text mb-3 flex items-center gap-2">
        <RotateCw className="w-4 h-4 text-primary" /> Key Concept Flashcards (Click to flip)
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {cards.map((c, i) => {
          const isFlipped = flipped[i];

          return (
            <div
              key={i}
              onClick={() => toggleFlip(i)}
              className="custom-card p-4 h-36 flex flex-col justify-between cursor-pointer hover:border-primary/50 transition-all select-none"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                  {isFlipped ? "Definition / Detail" : "Concept"}
                </span>
                <p className={`mt-1 font-semibold text-text leading-snug ${isFlipped ? 'text-xs text-text-muted font-normal' : 'text-sm'}`}>
                  {isFlipped ? c.back : c.front}
                </p>
              </div>

              <div className="flex justify-end">
                <span className="text-[10px] text-text-muted flex items-center gap-1">
                  <RotateCw className="w-3 h-3" /> Flip
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
