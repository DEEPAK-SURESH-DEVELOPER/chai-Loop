
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Home.module.css'

const Home = () => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const parallaxOffset = Math.min(scrollY * 0.25, 180)

  return (
    <section id="home" className={styles.home}>
      <div
        className={styles.background}
        style={{ transform: `translate3d(0, ${parallaxOffset}px, 0)` }}
        aria-hidden="true"
      />

      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.textContent}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <span>KAKKANAD · KERALA</span>
          </div>

          <h1 className={styles.headline}>
            <span className={styles.titleLine}>A little chai.</span>
            <span className={styles.titleLine}>
              <span className={styles.accent}>A lot</span> of joy.
            </span>
          </h1>

          <p className={styles.description}>
            From comforting cups of chai to loaded fries and smashed
            burgers, there’s always something delicious waiting for you.
          </p>

          <div className={styles.actions}>
            <a href="#menu" className={styles.primaryButton}>
              Explore Menu <span aria-hidden="true">↗</span>
            </a>

            <Link to="/booking" className={styles.secondaryButton}>
              Order Food <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className={styles.bottomNote}>
            <span className={styles.noteDot} />
            <span>Good food. Great company. Repeat.</span>
          </div>
        </div>

        <div className={styles.sideNote} aria-hidden="true">
          <span>BREWED WITH LOVE</span>
          <span className={styles.sideNoteLine} />
          <span>MADE FOR YOUR MOMENTS</span>
        </div>
      </div>

      <div className={styles.scrollIndicator} aria-hidden="true">
        <span>SCROLL TO EXPLORE</span>
        <span className={styles.scrollLine} />
      </div>

      <div className={styles.cornerLabel} aria-hidden="true">
        <span>CHAI LOOP</span>
        <span>CAFE & BITES</span>
      </div>
    </section>
  )
}

export default Home