import React, { useState, useEffect } from 'react';
import './Contato.css';
import { motion } from 'framer-motion';

const GITHUB = 'https://github.com/danielneves2';
const LINKEDIN = 'https://www.linkedin.com/in/daniel-neves-asplo/';
const EMAIL = 'danielneveslm@gmail.com';

// Variantes de animação
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      when: "beforeChildren"
    }
  }
};

const itemVariants = {
  hidden: { y: 15, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 120
    }
  }
};

export default function Contato() {
  // Sistema de likes global - cada visitante pode dar 1 like
  const [globalLikes, setGlobalLikes] = useState(() => {
    // Pega o total global de likes
    const saved = localStorage.getItem('cw_global_likes');
    return saved ? parseInt(saved, 10) : 0;
  });
  
  const [userLiked, setUserLiked] = useState(() => {
    // Verifica se ESTE usuário já deu like
    return localStorage.getItem('cw_user_liked') === 'true';
  });

  useEffect(() => {
    // Salva o total global
    localStorage.setItem('cw_global_likes', globalLikes);
  }, [globalLikes]);

  const handleLike = () => {
    if (!userLiked) {
      // Incrementa o contador global
      setGlobalLikes(globalLikes + 1);
      // Marca que este usuário já deu like
      setUserLiked(true);
      localStorage.setItem('cw_user_liked', 'true');
    }
  };

  return (
    <footer className="contato-footer" id="contato">
      <div className="contato-container">
        <motion.div 
          className="contato-info"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2 variants={itemVariants}>Contato &amp; Redes</motion.h2>
          <ul>
            <motion.li variants={itemVariants}>
              <i className="fas fa-user"></i>
              <strong>Nome:</strong> Daniel Neves
            </motion.li>
            <motion.li variants={itemVariants}>
              <i className="fas fa-envelope"></i>
              <strong>Email:</strong> <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </motion.li>
            <motion.li variants={itemVariants}>
              <i className="fab fa-github"></i>
              <strong>GitHub:</strong> <a href={GITHUB} target="_blank" rel="noopener noreferrer">@danielneves2</a>
            </motion.li>
            <motion.li variants={itemVariants}>
              <i className="fab fa-linkedin"></i>
              <strong>LinkedIn:</strong> <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">/daniel-neves-asplo</a>
            </motion.li>
          </ul>
        </motion.div>
        
        <div className="contato-likebox">
          <span className="like-title vintage">Se gostou desse projeto, deixe o like!</span>
          <button 
            className={`like-btn vintage${userLiked ? ' liked' : ''}`} 
            onClick={handleLike} 
            disabled={userLiked} 
            title={userLiked ? 'Obrigado pelo seu like!' : 'Clique para curtir!'}
          >
            <span role="img" aria-label="joinha">👍</span>
            <span className="like-count">{globalLikes}</span>
          </button>
        </div>
      </div>
      <div className="contato-copy">© {new Date().getFullYear()} Coffee Wave. Todos os direitos reservados.</div>
    </footer>
  );
}
