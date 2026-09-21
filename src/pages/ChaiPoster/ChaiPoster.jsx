
import React from 'react'
import ScrollExpand from '../../components/ScrollExpand/ScrollExpand'
import styles from './ChaiPoster.module.css'

const ChaiPoster = () => {
  return (
    <section className={styles.posterSection} id="chai-poster">
      <div className={styles.posterIntro}>
        <span className={styles.eyebrow}>A LITTLE CHAI, A LOT OF JOY</span>
        <p>Scroll down and let the chai moment unfold.</p>
      </div>

      <div className={styles.expandWrapper}>
        <ScrollExpand
          src="https://images.pexels.com/photos/27860686/pexels-photo-27860686/free-photo-of-coffee-cup.jpeg?h=1000&w=1500&fit=crop"
          alt="A freshly brewed cup of chai at Chai Loop Cafe"
          title="We don’t say hai, we say chaii!"
          scrollHint=""
          startWidth={78}
          startHeight={62}
          startRadius={24}
          endRadius={0}
          mediaZoom={1.3}
          scrollDistance={1.2}
          holdDistance={0.35}
          smoothing={0.1}
          overlayScrim={0.55}
          useWindowScroll
          className={styles.scrollExpand}
        >
          <div className={styles.overlayContent}>
            <span className={styles.overlayLabel}>YOUR DAILY CHAI MOMENT</span>
            <h2>Good chai. Great moments.</h2>
            <p>
              Good chai, tasty bites, and moments worth sharing.
              Welcome to Chai Loop.
            </p>
            <a href="/booking" className={styles.orderButton}>
              Order Your Favourites <span aria-hidden="true">→</span>
            </a>
          </div>
        </ScrollExpand>
      </div>
    </section>
  )
}

export default ChaiPoster