
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './About.module.css'

const highlights = [
  {
    icon: '☕',
    title: 'Chai Moments',
    description: 'A comforting cup for every kind of day.'
  },
  {
    icon: '🍔',
    title: 'Tasty Bites',
    description: 'Delicious bites to make every visit special.'
  },
  {
    icon: '🤎',
    title: 'Good Company',
    description: 'A place to catch up, relax and connect.'
  }
]

const About = () => {
  return (
    <section className={styles.aboutSection} id="about">
      <div className={styles.aboutContainer}>
        <div className={styles.aboutImageWrapper}>
          <img
            src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1200&q=85"
            alt="A warm and inviting cafe interior"
            className={styles.aboutImage}
            loading="lazy"
          />

          <div className={styles.imageBadge}>
            <span className={styles.badgeIcon}>☕</span>
            <span>
              <strong>Chai time</strong>
              <small>Anytime is the right time</small>
            </span>
          </div>
        </div>

        <div className={styles.aboutContent}>
          <span className={styles.eyebrow}>A LITTLE ABOUT US</span>

          <h2>
            More than chai.
            <br />
            <span>A whole lot of heart.</span>
          </h2>

          <p className={styles.aboutDescription}>
            Every great moment deserves something delicious.
            Chai Loop is a place to slow down, enjoy your favourites,
            and make room for conversations that matter.
          </p>

          <p className={styles.aboutDescription}>
            From a comforting cup of chai to satisfying bites,
            we’re here to make your everyday moments feel a little
            more special.
          </p>

          <div className={styles.highlightGrid}>
            {highlights.map((item, index) => (
              <article
                className={styles.highlightCard}
                key={item.title}
                style={{ '--card-index': index }}
              >
                <span className={styles.highlightIcon} aria-hidden="true">
                  {item.icon}
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>

          <Link to="/booking" className={styles.aboutButton}>
            Come, grab a bite
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default About