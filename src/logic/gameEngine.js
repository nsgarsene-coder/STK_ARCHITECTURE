// src/logic/gameEngine.js
import { useGameState } from '../state/gameState';

export function getSelectedCards() {
  return useGameState.getState().selectedCards;
}

export function isCardSelected(cardId) {
  return useGameState.getState().selectedCards.includes(cardId);
}

export function isCardMatched(cardId) {
  const card = useGameState.getState().cards.find((c) => c.id === cardId);
  return card?.isMatched ?? false;
}

export function selectCard(cardId) {
  useGameState.getState().selectCard(cardId);
}

export function resetGame() {
  useGameState.getState().resetGame();
}

export function canSelectCard(cardId) {
  const state = useGameState.getState();
  if (state.isLocked) return false;
  if (isCardMatched(cardId)) return false;
  if (isCardSelected(cardId)) return true;
  if (state.selectedCards.length >= 2) return false;
  return true;
}

export function getGameStats() {
  const { cards, matchedPairs } = useGameState.getState();
  const totalPairs = cards.length / 2;
  return {
    totalPairs,
    matchedPairs,
    remainingPairs: totalPairs - matchedPairs,
  };
}