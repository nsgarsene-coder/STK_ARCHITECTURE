// src/logic/helpers.js

export const hintsRepository = {
    "A": { // Feuille de Lotus -> Façade
        1: "Observez la surface de cet élément naturel.",
        2: "L'eau n'y adhère pas, tout comme les saletés.",
        3: "Pensez à un revêtement de bâtiment qui se nettoie tout seul."
    },
    "B": { // Martin-Pêcheur -> Shinkansen
        1: "Regardez la forme aérodynamique pour pénétrer un milieu fluide.",
        2: "Cela évite de faire du bruit ou des éclaboussures en plongeant.",
        3: "Pensez à l'avant d'un train à très grande vitesse."
    },
    "C": { // Moule -> Colle
        1: "Cet organisme résiste à la force puissante des vagues.",
        2: "Il utilise des filaments extrêmement solides pour s'ancrer sous l'eau.",
        3: "Pensez à une application médicale en milieu humide."
    }
};

/**
 * Récupère l'indice approprié en fonction du nombre d'erreurs
 */
export const getHint = (pairId, errorCount) => {
    if (errorCount === 0 || !hintsRepository[pairId]) return null;
    
    // Plafonne le niveau d'indice à 3, même s'il y a 4 ou 5 erreurs
    const level = errorCount > 3 ? 3 : errorCount;
    return hintsRepository[pairId][level];
};