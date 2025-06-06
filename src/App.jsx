import { useEffect } from 'react'
import './App.css'
import Navigation from './components/Navigation/Navigation'
import Hero from './components/Hero/hero'
import About from './components/About/About'
import Cardapio from './components/Cardapio/Cardapio'
import Contato from './components/Contato/Contato'
import Popup from './components/Popup/Popup'

function App() {
  useEffect(() => {
    // Função para scroll suave
    const smoothScroll = (targetId) => {
      const element = document.getElementById(targetId);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    };

    // Adiciona o listener para todos os links internos
    const handleClick = (e) => {
      const target = e.target;
      if (target.tagName === 'BUTTON' && target.dataset.scroll) {
        e.preventDefault();
        smoothScroll(target.dataset.scroll);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="App">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Cardapio />
        <Contato />
      </main>
      <Popup />
    </div>
  );
}

export default App;