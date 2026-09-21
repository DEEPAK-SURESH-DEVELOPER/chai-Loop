
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.css'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Menu', href: '#menu' },
  { label: 'Our Story', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Visit Us', href: '#visit' }
]

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const closeMenu = () => setMenuOpen(false)

  const handleSectionClick = href => {
    closeMenu()

    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const section = document.querySelector(href)

    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
    >
      <div className={styles.headerInner}>
        <a
          href="#home"
          className={styles.brand}
          onClick={event => {
            event.preventDefault()
            handleSectionClick('#home')
          }}
          aria-label="Chai Loop Cafe home"
        >
          <span  aria-hidden="true">
                <img src="https://static.vecteezy.com/system/resources/thumbnails/035/108/040/small_2x/chai-time-text-with-indian-tea-glass-illustration-free-vector.jpg" style={{width:"50px"}} alt="Chai Loop Cafe logo" />
          </span>
          <span className={styles.brandText}>
            <span className={styles.brandName}>Chai Loop</span>
            <span className={styles.brandTagline}>CAFE · KAKKANAD</span>
          </span>
        </a>

        <nav className={styles.desktopNav} aria-label="Main navigation">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={styles.navLink}
              onClick={event => {
                event.preventDefault()
                handleSectionClick(link.href)
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.headerActions}>
          <Link
            to="/booking"
            className={styles.orderButton}
            onClick={closeMenu}
          >
            <span>Order Now</span>
            <span aria-hidden="true">↗</span>
          </Link>

          <button
            type="button"
            className={`${styles.menuToggle} ${
              menuOpen ? styles.menuToggleActive : ''
            }`}
            onClick={() => setMenuOpen(open => !open)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={`${styles.mobileDropdown} ${
          menuOpen ? styles.mobileDropdownOpen : ''
        }`}
        aria-hidden={!menuOpen}
      >
        <nav className={styles.mobileNav} aria-label="Mobile navigation">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={styles.mobileNavLink}
              tabIndex={menuOpen ? 0 : -1}
              onClick={event => {
                event.preventDefault()
                handleSectionClick(link.href)
              }}
            >
              {link.label}
              <span aria-hidden="true">↗</span>
            </a>
          ))}

          <Link
            to="/booking"
            className={styles.mobileOrderButton}
            tabIndex={menuOpen ? 0 : -1}
            onClick={closeMenu}
          >
            Order Food <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header