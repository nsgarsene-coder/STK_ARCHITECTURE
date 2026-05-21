import React, { useEffect, useState } from 'react';
import gameState from '../state/gameState'; // On suppose que le store ou l'état est importé ainsi
import gameEngine from '../logic/gameEngine';

export default function Feedback() {
  const [lineCoords, setLineCoords] = useState(null);
  const [explanation, setExplanation] = useState("");

  useEffect(() => {
    // Écouter les changements dans le gameState pour les cartes sélectionnées
    const unsubscribe = gameState.subscribe((state) => {
      setExplanation(state.currentExplanation || "");

      // Si 2 cartes sont sélectionnées, on calcule les coordonnées pour tracer la ligne
      if (state.selectedCards && state.selectedCards.length === 2) {
        const card1 = document.getElementById(card-${state.selectedCards[0].id});
        const card2 = document.getElementById(card-${state.selectedCards[1].id});

        if (card1 && card2) {
          const rect1 = card1.getBoundingClientRect();
          const rect2 = card2.getBoundingClientRect();
          const boardRect = document.getElementById('game-board').getBoundingClientRect();

          // Calcul du centre de chaque carte par rapport au plateau de jeu
          setLineCoords({
            x1: rect1.left + rect1.width / 2 - boardRect.left,
            y1: rect1.top + rect1.height / 2 - boardRect.top,
            x2: rect2.left + rect2.width / 2 - boardRect.left,
            y2: rect2.top + rect2.height / 2 - boardRect.top,
            status: state.lastValidationStatus // 'success', 'error', ou 'pending'
          });
        }
      } else {
        setLineCoords(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      {/* Tracé de la ligne SVG entre les deux cartes */}
      {lineCoords && (
        <svg 
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
          style={{ transition: 'all 0.3s ease' }}
        >
          <line
            x1={lineCoords.x1}
            y1={lineCoords.y1}
            x2={lineCoords.x2}
            y2={lineCoords.y2}
            stroke={lineCoords.status === 'success' ? '#10B981' : lineCoords.status === 'error' ? '#EF4444' : '#3B82F6'}
            strokeWidth="4"
            strokeDasharray={lineCoords.status === 'pending' ? '5,5' : 'none'}
            className={lineCoords.status === 'error' ? 'animate-fade-out' : ''}
          />
        </svg>
      )}

      {/* Affichage textuel de l'explication si match réussi */}
      {explanation && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-xl border border-emerald-500 max-w-md text-center transition-all duration-300 animate-slide-up z-50">
          <p className="text-sm font-medium">{explanation}</p>
        </div>
      )}
    </>
  );
}
