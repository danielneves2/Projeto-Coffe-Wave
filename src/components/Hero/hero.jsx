import React from 'react';
import './Hero.css';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    // Abordagem 1: Scroll direto
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="hero-section" id="home">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">
          Bem-vindo à <span className="highlight">Coffee Wave</span>
        </h1>
        <p className="hero-subtitle">
          Uma viagem no tempo através dos sabores clássicos dos anos dourados
        </p>
        <div className="hero-buttons">
          <button 
            className="btn-primary"
            onClick={() => scrollToSection('menu')}
            type="button"
          >
            Nosso Cardápio
          </button>
          <button 
            className="btn-secondary"
            onClick={() => scrollToSection('about')}
            type="button"
          >
            Conheça Nossa História
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;