import React from 'react';
import './Card.css'; // Assurez-vous de créer ce fichier CSS ou d'utiliser Tailwind

/**
 * Composant Card - Module Universel
 * @param {Object} data - Les infos de la carte (nom, image, type)
 * @param {string} state - L'état actuel ('idle', 'selected', 'matched', 'error')
 * @param {function} onClick - Fonction de rappel au clic
 */
const Card = ({ data, state, onClick }) => {
  const { nom, image, type } = data;
  const isNature = type === 'nature';

  return (
    <div 
      className={`stk-card ${isNature ? 'is-nature' : 'is-application'} state-${state}`}
      onClick={() => state !== 'matched' && onClick()}
    >
      {/* En-tête avec Logo */}
      <div className="stk-card-header">
        <span className="stk-logo">STK</span>
      </div>

      {/* Zone Image avec découpe diagonale */}
      <div className="stk-card-image-container">
        <img src={image} alt={nom} className="stk-card-image" />
        <div className="stk-card-overlay"></div>
      </div>

      {/* Zone Texte */}
      <div className="stk-card-footer">
        <h3 className="stk-card-title">{nom}</h3>
        <div className="stk-card-badge">
          {isNature ? 'NATURE' : 'APPLICATION HUMAINE'}
        </div>
        
        {/* Décoration d'angle en bas à droite */}
        <div className="stk-card-corner"></div>
      </div>

      {/* Overlay d'état (Grisage si matched, etc.) */}
      {state === 'matched' && <div className="stk-card-matched-overlay"></div>}
    </div>
  );
};

export default Card;