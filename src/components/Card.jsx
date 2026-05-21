// src/components/Card.jsx
import { useCallback } from 'react';
import { useGameState } from '../state/gameState';
import { selectCard, canSelectCard } from '../logic/gameEngine';

export default function Card({ card }) {
  const selectedCards = useGameState((state) => state.selectedCards);

  const isSelected  = selectedCards.includes(card.id);
  const isMatched   = card.isMatched;
  const isClickable = canSelectCard(card.id);

  const handleClick = useCallback(() => {
    if (!isClickable) return;
    selectCard(card.id);
  }, [card.id, isClickable]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }, [handleClick]);

  const baseClasses = [
    'relative flex items-center justify-center',
    'w-24 h-32 rounded-2xl border-2 text-4xl',
    'select-none transition-all duration-200 ease-out outline-none',
  ];

  const stateClasses = isMatched
    ? ['border-emerald-400 bg-emerald-50 opacity-60 cursor-default scale-95']
    : isSelected
    ? [
        'border-indigo-500 bg-indigo-100 shadow-lg shadow-indigo-200',
        'scale-105 ring-4 ring-indigo-300 ring-offset-2 cursor-pointer',
      ]
    : isClickable
    ? [
        'border-slate-300 bg-white cursor-pointer',
        'hover:border-indigo-400 hover:bg-indigo-50 hover:scale-105 hover:shadow-md',
        'focus-visible:ring-4 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:border-indigo-400',
      ]
    : ['border-slate-200 bg-slate-50 opacity-50 cursor-not-allowed'];

  return (
    <div
      role="button"
      tabIndex={isClickable ? 0 : -1}
      aria-pressed={isSelected}
      aria-label={`Carte ${card.symbol}${isMatched ? ' — appariée' : isSelected ? ' — sélectionnée' : ''}`}
      className={[...baseClasses, ...stateClasses].join(' ')}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <span className="pointer-events-none">{card.symbol}</span>

      {isMatched && (
        <span className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 rounded-full bg-emerald-400 text-white text-xs font-bold shadow">
          ✓
        </span>
      )}

      {isSelected && !isMatched && (
        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
      )}
    </div>
  );
}