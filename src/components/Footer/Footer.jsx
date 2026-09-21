
import React from 'react'
import styles from './Footer.module.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.brandBlock}>
            <a href="#home" className={styles.brand}>
              <span className={styles.brandIcon}>☕</span>
              <span>
                <strong>Chai Loop</strong>
                <small>CAFE · KAKKANAD</small>
              </span>
            </a>

            <h2>
              Good chai.
              <br />
              <span>Good vibes.</span>
            </h2>

            <p>
              Your little corner for chai, tasty bites, and moments worth
              sharing.
            </p>

            <a href="/booking" className={styles.orderButton}>
              Order Your Favourites <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className={styles.linksBlock}>
            <div className={styles.linkColumn}>
              <h3>Explore</h3>
              <a href="#home">Home</a>
              <a href="#menu">Our Menu</a>
              <a href="#about">Our Story</a>
              <a href="#gallery">Gallery</a>
            </div>

            <div className={styles.linkColumn}>
              <h3>Visit</h3>
              <a href="#visit">Find Us</a>
              <a href="#visit">Opening Hours</a>
              <a href="/booking">Order Food</a>
            </div>

            <div className={styles.linkColumn}>
              <h3>Say Hello</h3>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Chai+Loop+Cafe+Kunnumpuram+Thrikkakara+Kakkanad+Kerala"
                target="_blank"
                rel="noreferrer"
              >
                Get Directions ↗
              </a>
              <span className={styles.socialLabel}>Follow our journey</span>
              <div className={styles.socials}>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                >
                  ig
                </a>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                >
                  f
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.marquee} aria-label="Good chai, good bites, good times">
          <div className={styles.marqueeTrack} aria-hidden="true">
            <span>GOOD CHAI</span><b>✳</b>
            <span>GOOD BITES</span><b>✳</b>
            <span>GOOD TIMES</span><b>✳</b>
            <span>GOOD CHAI</span><b>✳</b>
            <span>GOOD BITES</span><b>✳</b>
            <span>GOOD TIMES</span><b>✳</b>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <p>© {currentYear} Chai Loop Cafe. All rights reserved.</p>
          <a href="#home" className={styles.backToTop}>
            Back to top <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer