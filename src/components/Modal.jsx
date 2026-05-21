// src/components/Modal.jsx
import React from 'react';

export default function Modal({ 
    isOpen, 
    onClose, 
    // --- TES PROPS (DEV 4) ---
    hintText, 
    showRevealBtn, 
    onReveal,
    // --- PROPS DU DEV 5 (Il les gérera plus tard) ---
    isFicheExplorationReady, 
    ficheData 
}) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">

                {/* =========================================
                    ZONE DEV 5 : LA FICHE DE FIN
                    Si la fiche est prête, on l'affiche
                ========================================= */}
                {isFicheExplorationReady ? (
                    <div className="dev5-fiche-zone">
                        <h2>Fiche d'exploration générée !</h2>
                        <p>Score final : ...</p>
                    </div>
                ) : (
                    /* =========================================
                        ZONE DEV 4 : TON CODE (INDICES ET REVEAL)
                        Tant que la fiche n'est pas prête, c'est ton code qui gère
                    ========================================= */
                    <div className="dev4-assistance-zone">
                        <small style={{ color: '#4a7298', fontWeight: 'bold' }}>
                            CELLULE D'AIDE BIOMIMÉTIQUE
                        </small>
                        
                        {/* Affichage de tes indices */}
                        {hintText ? (
                            <p style={{ margin: '15px 0' }}>💡 {hintText}</p>
                        ) : (
                            <p style={{ margin: '15px 0' }}>Analysez les cartes pour trouver le lien.</p>
                        )}

                        <div className="actions">
                            <button onClick={onClose} className="btn-continue">
                                Continuer à chercher
                            </button>
                            
                            {/* Ton bouton de secours */}
                            {showRevealBtn && (
                                <button onClick={onReveal} className="btn-reveal">
                                    👁 VOIR LA SOLUTION
                                </button>
                            )}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}