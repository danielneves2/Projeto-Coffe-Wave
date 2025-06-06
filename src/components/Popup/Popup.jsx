import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Popup.css';

export default function Popup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('coffee_wave_popup_seen');
    
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('coffee_wave_popup_seen', 'true');
    setIsVisible(false);
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const popupVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="popup-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={handleAccept}
        >
          <motion.div 
            className="popup-container"
            variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="popup-header">
              <i className="fas fa-info-circle popup-icon"></i>
              <h3>Aviso Importante</h3>
            </div>
            
            <div className="popup-content">
              <p>
                Este projeto é um <strong>projeto pessoal</strong> desenvolvido para demonstrar 
                minhas habilidades em desenvolvimento web. A empresa <strong>Coffee Wave</strong> é 
                <strong> fictícia</strong> e foi criada por mim para fins educacionais e de portfólio.
              </p>
              <p>
                Espero que gostem do resultado! 😊☕
              </p>
            </div>
            
            <div className="popup-footer">
              <button 
                className="popup-btn"
                onClick={handleAccept}
              >
                <i className="fas fa-check"></i>
                Concordo
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 