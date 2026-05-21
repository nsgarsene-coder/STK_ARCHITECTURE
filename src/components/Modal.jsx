// src/components/Modal.jsx
import React from 'react';
import '../style.css'; // S'assure que le style global est chargé

const Modal = ({ 
    isOpen, 
    onClose, 
    // Props injectées par ton gameEngine
    hintText, 
    showRevealBtn, 
    onReveal 
}) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                
                {/* Zone d'Assistance (DEV 4) */}
                <div className="assistance-zone" style={{ marginBottom: '20px', padding: '15px', background: '#f5f2eb', borderRadius: '8px' }}>
                    <small style={{ color: '#4a7298', fontWeight: 'bold', letterSpacing: '1px' }}>
                        CELLULE D'AIDE BIOMIMÉTIQUE
                    </small>
                    
                    {hintText ? (
                        <p style={{ marginTop: '10px', fontSize: '1rem', fontStyle: 'italic' }}>
                            💡 {hintText}
                        </p>
                    ) : (
                        <p style={{ marginTop: '10px', fontSize: '1rem', color: '#666' }}>
                            Analysez les caractéristiques des cartes pour trouver le lien.
                        </p>
                    )}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-start' }}>
                    <button className="btn-continue" onClick={onClose}>
                        CONTINUER À CHERCHER
                    </button>
                    
                    {/* Bouton de secours (Reveal) - Apparaît au niveau 3 */}
                    {showRevealBtn && (
                        <button 
                            onClick={onReveal}
                            style={{
                                background: 'transparent',
                                border: '1px solid #d4b5ad',
                                color: '#a86c60',
                                borderRadius: '30px',
                                padding: '10px 25px',
                                fontWeight: 'bold',
                                fontSize: '0.8rem',
                                cursor: 'pointer'
                            }}
                        >
                            👁 VOIR LA SOLUTION
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Modal;