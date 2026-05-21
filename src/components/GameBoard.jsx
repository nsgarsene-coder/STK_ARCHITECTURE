// src/components/GameBoard.jsx
import { useGameState } from '../state/gameState';
import { resetGame, getGameStats } from '../logic/gameEngine';
import Card from './Card';

export default function GameBoard() {
  const cards         = useGameState((state) => state.cards);
  const selectedCards = useGameState((state) => state.selectedCards);
  const matchedPairs  = useGameState((state) => state.matchedPairs);

  const stats         = getGameStats();
  const selectionFull = selectedCards.length >= 2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex flex-col items-center justify-center p-6 gap-8">

      {/* En-tête */}
      <header className="text-center space-y-1">
        <h1 className="text-3xl font-bold text-white tracking-tight">STK Memory</h1>
        <p className="text-indigo-300 text-sm">Retrouve toutes les paires</p>
      </header>

      {/* Stats */}
      <div className="flex items-center gap-6 text-sm">
        <Stat label="Paires trouvées" value={`${matchedPairs} / ${stats.totalPairs}`} />
        <Stat label="Sélection"       value={`${selectedCards.length} / 2`} />
      </div>

      {/* Alerte max 2 */}
      <div
        role="status"
        aria-live="polite"
        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
          selectionFull
            ? 'bg-amber-500/20 border border-amber-400/40 text-amber-300 opacity-100'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        ⚠️ Max 2 cartes — clique sur une carte pour la désélectionner
      </div>

      {/* Grille */}
      <main role="grid" aria-label="Plateau de jeu" className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <div key={card.id} role="gridcell">
            <Card card={card} />
          </div>
        ))}
      </main>

      {/* Aperçu sélection */}
      {selectedCards.length > 0 && (
        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
          <span className="text-indigo-300 text-xs uppercase tracking-widest">Sélection</span>
          <div className="flex gap-2">
            {selectedCards.map((id) => {
              const card = cards.find((c) => c.id === id);
              return (
                <span key={id} className="text-2xl w-10 h-10 flex items-center justify-center rounded-lg bg-indigo-500/20 border border-indigo-400/30">
                  {card?.symbol}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Reset */}
      <button
        onClick={resetGame}
        className="px-5 py-2 rounded-xl text-sm font-medium bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all duration-150 active:scale-95"
      >
        🔄 Nouvelle partie
      </button>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-xs text-indigo-400 uppercase tracking-widest">{label}</span>
      <span className="text-lg font-semibold text-white">{value}</span>
    </div>
  );
}