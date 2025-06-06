import React, { useState, useEffect, useRef } from 'react';
import './Cardapio.css';

const Cardapio = () => {
  const [categoriaAtiva, setCategoriaAtiva] = useState('cafes');
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isChangingCategory, setIsChangingCategory] = useState(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.05,
      rootMargin: '50px'
    };

    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Observar a seção
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Função para atualizar a posição do efeito de luz
  const handleCardMouseMove = (e, card) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    requestAnimationFrame(() => {
      card.style.setProperty('--mouseX', `${x}px`);
      card.style.setProperty('--mouseY', `${y}px`);
    });
  };

  // Função para mudar categoria com transição suave
  const handleCategoryChange = (novaCategoria) => {
    if (novaCategoria !== categoriaAtiva) {
      setIsChangingCategory(true);
      setTimeout(() => {
        setCategoriaAtiva(novaCategoria);
        setIsChangingCategory(false);
      }, 150);
    }
  };

  const categorias = [
    { id: 'cafes', nome: 'Cafés Especiais' },
    { id: 'doces', nome: 'Doces & Sobremesas' },
    { id: 'salgados', nome: 'Salgados Gourmet' },
    { id: 'bebidas', nome: 'Outras Bebidas' }
  ];

  const produtos = {
    cafes: [
      {
        nome: 'Espresso Clássico',
        descricao: 'Café puro e encorpado, extraído sob pressão',
        preco: 'R$ 6,90',
        destaque: true,
        imagem: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=500&auto=format&fit=crop&q=80'
      },
      {
        nome: 'Cappuccino Italiano',
        descricao: 'Café espresso, leite vaporizado e espuma de leite',
        preco: 'R$ 9,90',
        imagem: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&auto=format&fit=crop&q=80'
      },
      {
        nome: 'Latte Artesanal',
        descricao: 'Café espresso com leite vaporizado e arte em espuma',
        preco: 'R$ 11,90',
        imagem: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=500&auto=format&fit=crop&q=80'
      },
      {
        nome: 'Mocha Premium',
        descricao: 'Café espresso, chocolate belga e leite vaporizado',
        preco: 'R$ 13,90',
        imagem: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&auto=format&fit=crop&q=80'
      }
    ],
    doces: [
      {
        nome: 'Bolo de Chocolate',
        descricao: 'Bolo caseiro com cobertura de ganache belga',
        preco: 'R$ 12,90',
        imagem: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=500&auto=format&fit=crop&q=80'
      },
      {
        nome: 'Cheesecake',
        descricao: 'Cheesecake cremoso com calda de frutas vermelhas',
        preco: 'R$ 14,90',
        destaque: true,
        imagem: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&auto=format&fit=crop&q=80'
      },
      {
        nome: 'Croissant de Amêndoas',
        descricao: 'Croissant folhado com creme de amêndoas',
        preco: 'R$ 11,90',
        imagem: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&auto=format&fit=crop&q=80'
      }
    ],
    salgados: [
      {
        nome: 'Quiche Lorraine',
        descricao: 'Quiche de bacon e queijo gruyère',
        preco: 'R$ 18,90',
        destaque: true,
        imagem: 'https://images.unsplash.com/photo-1623855244183-52fd8d3ce2f7?w=500&auto=format&fit=crop&q=80'
      },
      {
        nome: 'Pão na Chapa',
        descricao: 'Pão artesanal na manteiga',
        preco: 'R$ 7,90',
        imagem: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=500&auto=format&fit=crop&q=80'
      },
      {
        nome: 'Croissant Recheado',
        descricao: 'Croissant com queijo e presunto',
        preco: 'R$ 13,90',
        imagem: 'https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?w=500&auto=format&fit=crop&q=80'
      }
    ],
    bebidas: [
      {
        nome: 'Chá Gelado',
        descricao: 'Chá da casa com frutas frescas',
        preco: 'R$ 8,90',
        imagem: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&auto=format&fit=crop&q=80'
      },
      {
        nome: 'Chocolate Quente',
        descricao: 'Chocolate belga com marshmallow',
        preco: 'R$ 12,90',
        destaque: true,
        imagem: 'https://images.unsplash.com/photo-1517578239113-b03992dcdd25?w=500&auto=format&fit=crop&q=80'
      },
      {
        nome: 'Suco Natural',
        descricao: 'Suco de frutas frescas da estação',
        preco: 'R$ 9,90',
        imagem: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=500&auto=format&fit=crop&q=80'
      }
    ]
  };

  return (
    <section className="cardapio-section" id="menu" ref={sectionRef}>
      <div className="cardapio-container">
        <div className="cardapio-header">
          <h2 className="cardapio-title">
            <div className="title-container">
              <span className="subtitle-top">Descubra</span>
              <span>Nosso Cardápio</span>
              <span className="subtitle-bottom">Sabores Exclusivos</span>
            </div>
          </h2>
        </div>

        <nav className="categorias-nav">
          {categorias.map((categoria) => (
            <button
              key={categoria.id}
              className={`categoria-btn ${categoriaAtiva === categoria.id ? 'ativo' : ''}`}
              onClick={() => handleCategoryChange(categoria.id)}
            >
              {categoria.nome}
            </button>
          ))}
        </nav>

        <div className="produtos-container">
          <div className={`produtos-grid ${isChangingCategory ? 'changing' : ''}`}>
            {produtos[categoriaAtiva].map((produto, index) => (
              <article 
                key={`${categoriaAtiva}-${index}`} 
                className={`produto-card ${produto.destaque ? 'destaque' : ''} ${isVisible ? 'visible' : ''}`}
                style={{ 
                  '--mouseX': '50%', 
                  '--mouseY': '50%',
                  animationDelay: `${index * 0.05}s`
                }}
                onMouseMove={(e) => handleCardMouseMove(e, e.currentTarget)}
                onMouseEnter={(e) => handleCardMouseMove(e, e.currentTarget)}
                onMouseLeave={(e) => {
                  e.currentTarget.style.setProperty('--mouseX', '50%');
                  e.currentTarget.style.setProperty('--mouseY', '50%');
                }}
              >
                <div className="produto-imagem">
                  <img 
                    src={produto.imagem} 
                    alt={produto.nome} 
                    loading="eager"
                    decoding="async"
                  />
                  {produto.destaque && (
                    <div className="produto-badge">
                      <span className="badge-star">★</span>
                      <span className="badge-text">Chef's Choice</span>
                    </div>
                  )}
                </div>
                
                <div className="produto-conteudo">
                  <h3 className="produto-nome">{produto.nome}</h3>
                  <p className="produto-descricao">{produto.descricao}</p>
                  <span className="produto-preco">{produto.preco}</span>
                </div>
              </article>
            ))}
          </div>
          <div className="scroll-indicator-cardapio">
            <span>← Deslize para explorar →</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cardapio;
