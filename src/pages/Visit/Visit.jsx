
import React from 'react'
import styles from './Visit.module.css'

const Visit = () => {
  return (
    <section className={styles.visitSection} id="visit">
      <div className={styles.container}>
        <div className={styles.heading}>
          <span className={styles.eyebrow}>COME SAY CHAI</span>
          <h2>Your next chai moment <span>starts here.</span></h2>
          <p>Drop by for a cup of chai, something delicious, and a little time to unwind.</p>
        </div>

        <div className={styles.visitGrid}>
          <div className={styles.infoCard}>
            <div className={styles.infoItem}>
              <span className={styles.icon}>⌖</span>
              <div>
                <h3>Find Us</h3>
                <p>Chai Loop Cafe</p>
                <p>Kunnumpuram, Thrikkakara</p>
                <p>Vazhakkala, Kakkanad, Kerala 682030</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.icon}>◷</span>
              <div>
                <h3>Opening Hours</h3>
                <p>Opening time: 10 AM*</p>
                <small>*Please confirm the café's current hours.</small>
              </div>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.icon}>☕</span>
              <div>
                <h3>Made for Your Moments</h3>
                <p>Dine-in, drive-through, and no-contact delivery.</p>
              </div>
            </div>

            <a
              className={styles.mapButton}
              href="https://www.google.com/maps/search/?api=1&query=Chai+Loop+Cafe+Kunnumpuram+Thrikkakara+Kakkanad+Kerala"
              target="_blank"
              rel="noreferrer"
            >
              Get Directions <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className={styles.mapCard}>
            <div className={styles.mapOverlay}>
              <span className={styles.mapPin}>☕</span>
              <h3>Chai Loop Cafe</h3>
              <p>Kunnumpuram, Kakkanad</p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Chai+Loop+Cafe+Kunnumpuram+Thrikkakara+Kakkanad+Kerala"
                target="_blank"
                rel="noreferrer"
              >
                Open in Google Maps ↗
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottomNote}>
          <span>GOOD CHAI.</span>
          <span>GOOD BITES.</span>
          <span>GOOD TIMES.</span>
        </div>
      </div>
    </section>
  )
}

export default Visit