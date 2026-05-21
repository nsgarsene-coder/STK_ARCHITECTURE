// src/components/GameBoard.jsx
import { useGameState } from '../state/gameState';
import { resetGame, getGameStats, selectCard } from '../logic/gameEngine';
import Card from './Card';

export default function GameBoard() {
  const cards         = useGameState((state) => state.cards);
  const selectedCards = useGameState((state) => state.selectedCards);
  const matchedPairs  = useGameState((state) => state.matchedPairs);

  const stats         = getGameStats();
  const selectionFull = selectedCards.length >= 2;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F4F1EA', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', gap: '32px' }}>

      <header style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#1A1A18', letterSpacing: '0.15em', textTransform: 'uppercase', margin: 0 }}>STK Memory</h1>
        <p style={{ color: '#4A5D60', fontSize: '0.875rem', margin: '4px 0 0' }}>Retrouve toutes les paires</p>
      </header>

      <div style={{ display: 'flex', gap: '32px', fontSize: '0.875rem' }}>
        <Stat label="Paires trouvées" value={`${matchedPairs} / ${stats.totalPairs}`} />
        <Stat label="Sélection" value={`${selectedCards.length} / 2`} />
      </div>

      {selectionFull && (
        <div style={{ padding: '8px 16px', borderRadius: '12px', backgroundColor: 'rgba(255,180,0,0.15)', border: '1px solid rgba(255,180,0,0.4)', color: '#7A5C00', fontSize: '0.875rem' }}>
          ⚠️ Max 2 cartes — clique sur une carte pour la désélectionner
        </div>
      )}

      <main style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {cards.map((card, index) => (
          <div key={card.id}>
            <Card
              data={card}
              state={
                card.isMatched
                  ? 'matched'
                  : selectedCards.includes(card.id)
                  ? 'selected'
                  : 'idle'
              }
              onClick={() => selectCard(card.id)}
            />
          </div>
        ))}
      </main>

      <button
        onClick={resetGame}
        style={{ padding: '10px 20px', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '600', backgroundColor: '#3A593E', color: '#fff', border: 'none', cursor: 'pointer', letterSpacing: '0.05em' }}
      >
        🔄 Nouvelle partie
      </button>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <span style={{ fontSize: '0.7rem', color: '#4A5D60', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</span>
      <span style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1A1A18' }}>{value}</span>
    </div>
  );
}