// src/state/gameState.js
import { create } from 'zustand';

// Note : Le DEV 1 utilise ici des émojis génériques pour ses tests.
// Quand le DEV 2 intégrera la vraie data, cela sera remplacé par les données Biomimétisme.
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
  // =========================================
  // ZONE DEV 1 : Interaction et Deck
  // =========================================
  cards: generateDeck(),
  selectedCards: [],   // max 2 — contrainte critique DEV 1
  matchedPairs: 0,
  isLocked: false,     // activé en DEV 2 pendant la comparaison

  // =========================================
  // ZONE DEV 4 : Flow Utilisateur et Assistance
  // =========================================
  errors: 0,             // Compteur d'erreurs pour déclencher les indices
  isRevealActive: false, // État pour afficher la solution si l'utilisateur bloque

  // Action pour le DEV 2 : Il appellera cette fonction quand 2 cartes ne matchent pas
  incrementErrors: () => {
    set((state) => ({ errors: state.errors + 1 }));
  },

  // Action DEV 4 : Pour activer le mode "Voir solution"
  triggerRevealMode: () => {
    set({ isRevealActive: true });
  },
  // =========================================

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
      // Réinitialisation de tes variables DEV 4
      errors: 0,
      isRevealActive: false,
    });
  },
}));