// ─── DEV 2 — Logique des paires ──────────────────────────────────
import pairs from './pairs.js'

export function checkPair(selectedIds) {
  const state = useGameState.getState()
  const cards = state.cards

  // Récupère les 2 cartes sélectionnées
  const carte1 = cards.find(c => c.id === selectedIds[0])
  const carte2 = cards.find(c => c.id === selectedIds[1])

  // Vérifie si elles forment une paire
  const paire = pairs.find(p =>
    (p.carteVivant.id === carte1.id && p.carteApplication.id === carte2.id) ||
    (p.carteVivant.id === carte2.id && p.carteApplication.id === carte1.id)
  )

  if (paire) {
    // Succès : griser les cartes et déverrouiller
    useGameState.setState(state => ({
      cards: state.cards.map(c =>
        c.id === carte1.id || c.id === carte2.id
          ? { ...c, isMatched: true }
          : c
      ),
      matchedPairs: state.matchedPairs + 1,
      selectedCards: [],
      isLocked: false,
    }))
    return { succes: true, explication: paire.explication }
  } else {
    // Erreur : déverrouiller et vider la sélection
    useGameState.setState({
      selectedCards: [],
      isLocked: false,
    })
    return { succes: false, explication: null }
  }
}