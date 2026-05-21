// src/state/gameState.js
import { create } from 'zustand';

// Base de données moderne et professionnelle conforme au Figma de STK Architecture
const BIOMIMICRY_DECK_DATA = [
  { pairId: "A", type: "vivant", badgeId: "V01", title: "Feuille de lotus", sub: "Nelumbo nucifera", category: "PLANTE", icon: "🌱", img: "https://images.unsplash.com/photo-1468413922365-e3766a17da9e?auto=format&fit=crop&w=400&q=80" },
  { pairId: "A", type: "app", badgeId: "A17", title: "Façade autonettoyante", sub: "Revêtement effet lotus", category: "MATÉRIAU", icon: "🏢", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80" },
  { pairId: "B", type: "vivant", badgeId: "V02", title: "Bec du Martin-Pêcheur", sub: "Alcedo atthis", category: "OISEAU", icon: "🦅", img: "https://images.unsplash.com/photo-1555556214-411cb3556057?auto=format&fit=crop&w=400&q=80" },
  { pairId: "B", type: "app", badgeId: "A32", title: "Nez du Shinkansen", sub: "Aérodynamisme ferroviaire", category: "TRANSPORT", icon: "🚄", img: "https://images.unsplash.com/photo-1533228876829-65c94e7b5025?auto=format&fit=crop&w=400&q=80" },
  { pairId: "C", type: "vivant", badgeId: "V03", title: "Fils de Moule", sub: "Mytilus edulis", category: "MOLLUSQUE", icon: "🐚", img: "https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&w=400&q=80" },
  { pairId: "C", type: "app", badgeId: "A08", title: "Colle chirurgicale", sub: "Adhésif en milieu humide", category: "MÉDECINE", icon: "🩹", img: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=400&q=80" }
];

function generateDeck() {
  // On clone les données pour pouvoir les mélanger de façon aléatoire à chaque partie
  const deck = [...BIOMIMICRY_DECK_DATA];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  // On génère un identifiant unique (index) pour chaque carte générée
  return deck.map((card, index) => ({
    id: index,
    ...card,
    isMatched: false,
  }));
}

export const useGameState = create((set, get) => ({
  // =========================================
  // ZONE DEV 1 : Interaction et Deck
  // =========================================
  cards: generateDeck(),
  selectedCards: [],   // Stocke désormais les id (index de 0 à 5) des cartes sélectionnées
  matchedPairs: 0,
  isLocked: false,     // Bloque l'interface pendant les vérifications du DEV 2

  // =========================================
  // ZONE DEV 4 : Flow Utilisateur et Assistance
  // =========================================
  errors: 0,             // Compteur d'erreurs lu par ton moteur d'assistance
  isRevealActive: false, // État global pour afficher la solution forcée

  incrementErrors: () => {
    set((state) => ({ errors: state.errors + 1 }));
  },

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

    if (selectedCards.length >= 2) return; // Contrainte max 2 cartes du DEV 1

    const newSelected = [...selectedCards, id];
    set({ selectedCards: newSelected });

    // Le DEV 2 viendra brancher sa fonction checkPair ici
  },

  resetGame: () => {
    set({
      cards: generateDeck(),
      selectedCards: [],
      matchedPairs: 0,
      isLocked: false,
      errors: 0,
      isRevealActive: false,
    });
  },
}));