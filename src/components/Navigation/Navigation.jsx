import { useState, useEffect } from 'react'
import './Navigation.css'
import logo from '../../assets/logo.svg'

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleNavClick = (e) => {
    const target = e.target.getAttribute('href')
    if (target && target.startsWith('#')) {
      e.preventDefault()
      const element = document.querySelector(target)
      if (element) {
        const offsetTop = element.offsetTop
        window.scrollTo({
          top: offsetTop - 80, // Compensar o header fixo
          behavior: 'smooth'
        })
      }
      closeMenu()
    }
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // Bloqueia scroll quando menu está aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <img src={logo} alt="Coffee Wave Logo" className="logo-image" />
          <span className="logo-tagline">Est. 1958</span>
        </div>
        
        <button 
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li><a href="#home" onClick={handleNavClick}>HOME</a></li>
          <li><a href="#about" onClick={handleNavClick}>SOBRE</a></li>
          <li><a href="#menu" onClick={handleNavClick}>CARDÁPIO</a></li>
          <li><a href="#contato" onClick={handleNavClick}>CONTATO</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation