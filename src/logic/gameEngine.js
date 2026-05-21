// src/logic/gameEngine.js
import { getHint } from './helpers.js';

/**
 * Analyse les erreurs pour déclencher les indices et le bouton de secours
 * @param {number} currentErrors - Provient de gameState.js (lu par ton composant)
 * @param {string} currentPairId - La paire que l'utilisateur essaie de trouver
 */
export const evaluateAssistance = (currentErrors, currentPairId) => {
    const assistanceState = {
        showHint: false,
        hintText: "",
        showRevealButton: false
    };

    // Déclenchement progressif des indices
    if (currentErrors > 0) {
        assistanceState.showHint = true;
        assistanceState.hintText = getHint(currentPairId, currentErrors);
    }

    // Seuil de déclenchement du bouton "Voir la solution" (ex: après 3 erreurs)
    if (currentErrors >= 3) {
        assistanceState.showRevealButton = true;
    }

    return assistanceState;
};

/**
 * Logique Reveal : Isole les deux cartes formant la bonne paire
 * @param {string} pairIdToReveal - L'ID de la paire (A, B ou C)
 * @param {Array} allCards - Le tableau contenant toutes les cartes du jeu
 */
export const triggerReveal = (pairIdToReveal, allCards) => {
    // Retourne uniquement les cartes qui correspondent à la bonne solution
    return allCards.filter(card => card.pairId === pairIdToReveal);
};