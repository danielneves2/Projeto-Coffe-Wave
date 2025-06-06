import React, { useEffect, useRef, useState } from 'react';
import './About.css';
// Importar a thumbnail
import coffeeThumbnail from '../../assets/coffee-thumbnail.jpg';

const About = () => {
  const aboutRef = useRef(null);
  const quoteRef = useRef(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(1);
  const valuesTrackRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const values = [
    {
      image: '../../src/assets/torra.jpg',
      title: 'Tradição Artesanal',
      description: 'Nossa tradição na torra artesanal garante a qualidade e o sabor único em cada grão de café.'
    },
    {
      image: '../../src/assets/qualidade.jpg',
      title: 'Qualidade',
      description: 'Selecionamos criteriosamente cada grão para garantir uma experiência excepcional em cada xícara.'
    },
    {
      image: '../../src/assets/ambiente.jpg',
      title: 'Ambiente',
      description: 'Criamos um espaço acolhedor onde cada momento é uma experiência única e memorável.'
    }
  ];

  // Detectar se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Função para navegar no carrossel (apenas mobile)
  const handleCardChange = (direction) => {
    if (!isMobile) return;
    
    const maxIndex = values.length - 1;
    if (direction === 'next') {
      setActiveCardIndex(prev => prev === maxIndex ? 0 : prev + 1);
    } else {
      setActiveCardIndex(prev => prev === 0 ? maxIndex : prev - 1);
    }
  };

  // Touch handlers para swipe (apenas mobile)
  const handleTouchStart = (e) => {
    if (!isMobile) return;
    const touchDown = e.touches[0].clientX;
    valuesTrackRef.current.dataset.touchStart = touchDown;
  };

  const handleTouchMove = (e) => {
    if (!isMobile) return;
    if (!valuesTrackRef.current.dataset.touchStart) return;
    
    const touchDown = parseFloat(valuesTrackRef.current.dataset.touchStart);
    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleCardChange('next');
      } else {
        handleCardChange('prev');
      }
      valuesTrackRef.current.dataset.touchStart = null;
    }
  };

  useEffect(() => {
    // Observer para elementos fade-in
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observer específico para a citação
    const quoteObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
            console.log('Citação visível! Iniciando animação...');
            entry.target.classList.add('visible');
            // Desconecta o observer após ativar a animação
            quoteObserver.unobserve(entry.target);
          }
        });
      },
      { 
        threshold: 0.3, // Reduzindo para 30% para ativar mais cedo
        rootMargin: '-50px' // Adiciona uma margem para garantir que está bem visível
      }
    );

    // Observar elementos fade-in
    const elements = aboutRef.current.querySelectorAll('.fade-in');
    elements.forEach((el) => fadeObserver.observe(el));

    // Observar a citação
    if (quoteRef.current) {
      quoteObserver.observe(quoteRef.current);
    }

    return () => {
      fadeObserver.disconnect();
      quoteObserver.disconnect();
    };
  }, []);

  return (
    <section className="about-section" id="about" ref={aboutRef}>
      {/* Divisor dourado */}
      <div className="golden-divider"></div>
      
      {/* Padrão decorativo */}
      <div className="section-pattern"></div>
      
      {/* Textura adicional */}
      <div className="texture-overlay"></div>
      
      {/* Pattern decorativo */}
      <div className="about-pattern"></div>
      
      {/* Header da seção */}
      <div className="about-header">
        <div className="title-wrapper">
          <div className="title-decoration left">
            <span className="coffee-bean">☕</span>
            <div className="line"></div>
          </div>
          
          <h2 className="about-title fade-in">
            <span className="title-top">Conheça</span>
            <span className="title-main">Nossa História</span>
            <span className="title-year">Since 1958</span>
          </h2>
          
          <div className="title-decoration right">
            <div className="line"></div>
            <span className="coffee-bean">☕</span>
          </div>
        </div>
      </div>

      <div className="about-container">
        <div className="about-content">
          <div className="about-main fade-in">
            <div className="story-content">
              <h3>Desde 1958</h3>
              <p>
                O Coffee Wave nasceu do sonho de Giovanni Rossini, um imigrante italiano 
                que trouxe consigo não apenas receitas de família, mas uma paixão 
                contagiante pelo café perfeito.
              </p>
              <p>
                Em uma esquina charmosa do centro, criamos mais que uma cafeteria - 
                construímos um refúgio onde o tempo desacelera e cada xícara conta 
                uma história dos anos dourados.
              </p>
            </div>

            <div className="video-showcase">
              <div className="video-card">
                <div className="video-thumbnail" onClick={() => setIsVideoModalOpen(true)}>
                  <img 
                    src={coffeeThumbnail} 
                    alt="Coffee Wave História" 
                    className="thumbnail-image"
                  />
                  <div className="thumbnail-overlay"></div>
                  <div className="play-button">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M8 5v14l11-7z" fill="currentColor"/>
                    </svg>
                  </div>
                  <div className="video-duration">1:00</div>
                </div>
                <div className="video-info">
                  <h4>Conheça nossa história</h4>
                  <p>Assista ao vídeo e embarque em uma viagem pelos 65 anos do Coffee Wave</p>
                  <button className="watch-button" onClick={() => setIsVideoModalOpen(true)}>
                    Assistir agora →
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="values-section fade-in">
            <div className="values-title">
              <div className="values-title-border"></div>
              <div className="values-title-line left"></div>
              <div className="values-title-dot left"></div>
              <span>Nossos Valores</span>
              <div className="values-title-dot right"></div>
              <div className="values-title-line right"></div>
            </div>
            <div className="values-container">
              <div 
                className="values-track" 
                ref={valuesTrackRef}
                onTouchStart={isMobile ? handleTouchStart : undefined}
                onTouchMove={isMobile ? handleTouchMove : undefined}
              >
                {values.map((value, index) => (
                  <div 
                    key={index} 
                    className={`value-card ${isMobile && index === activeCardIndex ? 'active' : ''}`}
                    onClick={() => isMobile && setActiveCardIndex(index)}
                  >
                    <div className="card-corner corner-top-left"></div>
                    <div className="card-corner corner-top-right"></div>
                    <img 
                      src={value.image}
                      alt={value.title}
                      className="value-card-image"
                      loading="lazy"
                    />
                    <div className="value-card-content">
                      <h4>{value.title}</h4>
                      <p>{value.description}</p>
                    </div>
                    <div className="card-corner corner-bottom-left"></div>
                    <div className="card-corner corner-bottom-right"></div>
                  </div>
                ))}
              </div>
              {isMobile && (
                <div className="carousel-controls">
                  <button 
                    className="carousel-btn prev"
                    onClick={() => handleCardChange('prev')}
                    aria-label="Card anterior"
                  >
                    ←
                  </button>
                  <div className="carousel-dots">
                    {values.map((_, index) => (
                      <button
                        key={index}
                        className={`dot ${index === activeCardIndex ? 'active' : ''}`}
                        onClick={() => setActiveCardIndex(index)}
                        aria-label={`Ir para card ${index + 1}`}
                      />
                    ))}
                  </div>
                  <button 
                    className="carousel-btn next"
                    onClick={() => handleCardChange('next')}
                    aria-label="Próximo card"
                  >
                    →
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="about-quote" ref={quoteRef}>
            <div className="quote-corner quote-corner-tl"></div>
            <div className="quote-corner quote-corner-tr"></div>
            <div className="quote-corner quote-corner-bl"></div>
            <div className="quote-corner quote-corner-br"></div>
            <div className="quote-decoration left"></div>
            <div className="quote-content">
              <blockquote>
                <div className="quote-text-wrapper">
                  <div className="quote-lines">
                    <span className="quote-text line1">"Um bom café é como uma máquina do tempo -</span>
                    <span className="quote-text line2">te transporta para momentos especiais com apenas um aroma"</span>
                  </div>
                </div>
                <cite>- Giovanni Rossini, Fundador</cite>
              </blockquote>
            </div>
            <div className="quote-decoration right"></div>
          </div>
        </div>
      </div>

      {/* Modal do Vídeo */}
      {isVideoModalOpen && (
        <div className="video-modal" onClick={() => setIsVideoModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setIsVideoModalOpen(false)}>×</button>
            <div className="video-wrapper">
              <iframe
                src="https://www.youtube.com/embed/snZ8jo8m6N4?autoplay=1&rel=0&modestbranding=1"
                title="Coffee Wave - Nossa História"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default About;