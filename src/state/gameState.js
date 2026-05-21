// src/state/gameState.js
import { create } from 'zustand';

const CARD_SYMBOLS = ['🔥', '💧', '⚡', '🌿', '🌀', '🔮', '⚙️', '🎯'];

function generateDeck() {
  const pairs = [...CARD_SYMBOLS, ...CARD_SYMBOLS];
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  return pairs.map((symbol, index) => ({
    id: index,
    symbol,
    isMatched: false,
  }));
}

export const useGameState = create((set, get) => ({
  cards: generateDeck(),
  selectedCards: [],   // max 2 — contrainte critique DEV 1
  matchedPairs: 0,
  isLocked: false,     // activé en DEV 2 pendant la comparaison

  selectCard: (id) => {
    const { selectedCards, isLocked } = get();
    if (isLocked) return;

    const alreadySelected = selectedCards.includes(id);
    if (alreadySelected) {
      set({ selectedCards: selectedCards.filter((cid) => cid !== id) });
      return;
    }

    // CONTRAINTE CRITIQUE : max 2 cartes simultanément
    if (selectedCards.length >= 2) return;

    const newSelected = [...selectedCards, id];
    set({ selectedCards: newSelected });

    // Hook DEV 2 : if (newSelected.length === 2) checkPair(newSelected);
  },

  resetGame: () => {
    set({
      cards: generateDeck(),
      selectedCards: [],
      matchedPairs: 0,
      isLocked: false,
    });
  },
}));