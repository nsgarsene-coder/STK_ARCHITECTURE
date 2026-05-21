import React, { useEffect, useState } from 'react';
import Card from './Card'; // Géré par DEV 1
import Feedback from './Feedback'; // Ton composant de feedback
import gameState from '../state/gameState';

export default function GameBoard() {
  const [cards, setCards] = useState([]);
  const [validationStatus, setValidationStatus] = useState(null); // 'success' ou 'error'
  const [failedCardIds, setFailedCardIds] = useState([]);

  useEffect(() => {
    const unsubscribe = gameState.subscribe((state) => {
      setCards(state.cards || []);
      setValidationStatus(state.lastValidationStatus);
      
      if (state.lastValidationStatus === 'error') {
        setFailedCardIds(state.selectedCards.map(c => c.id));
        // Reset de l'effet shake après 500ms
        setTimeout(() => {
          setFailedCardIds([]);
        }, 500);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div id="game-board" className="relative w-full max-w-4xl mx-auto p-4 grid grid-cols-4 gap-4 bg-gray-50 rounded-xl overflow-hidden">
      {/* Injection du composant de feedback (Ligne SVG + Popups explications) */}
      <Feedback />

      {cards.map((card) => {
        const isFailed = failedCardIds.includes(card.id);
        
        return (
          <div
            key={card.id}
            id={`card-${card.id}`}
            className={`transition-all duration-300
              ${card.isMatched ? 'opacity-40 grayscale pointer-events-none scale-95' : ''}
              ${isFailed ? 'animate-shake border-red-500' : ''}
            `}
          >
            {/* Le composant Card de DEV 1 gère le hover/focus et le clic interne */}
            <Card card={card} />
          </div>
        );
      })}
    </div>
  );
}
