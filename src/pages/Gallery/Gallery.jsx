
import React from 'react'
import CircularGallery from '../../components/CircularGallery/CircularGallery'
import styles from './Gallery.module.css'

const galleryItems = [
  {
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=85',
    text: 'Cafe Moments'
  },
  {
    image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=1200&q=85',
    text: 'Chai Time'
  },
  {
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=85',
    text: 'Burger Love'
  },
  {
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1200&q=85',
    text: 'Tasty Bites'
  },
  {
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1200&q=85',
    text: 'Coffee Break'
  },
  {
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f4f?auto=format&fit=crop&w=1200&q=85',
    text: 'Cozy Corners'
  },
  {
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=85',
    text: 'Snack Time'
  },
  {
    image: 'https://images.unsplash.com/photo-1551024506-0 very?auto=format&fit=crop&w=1200&q=85',
    text: 'Sweet Treats'
  }
]

const Gallery = () => {
  return (
    <section className={styles.gallerySection} id="gallery">
      <div className={styles.galleryContainer}>
        <div className={styles.galleryHeader}>
          <span className={styles.eyebrow}>A GLIMPSE OF THE GOOD TIMES</span>

          <h2>
            Little moments,
            <br />
            <span>big memories.</span>
          </h2>

          <p>
            Take a little scroll through the flavours, corners,
            and moments that make Chai Loop feel special.
          </p>
        </div>

        <div className={styles.galleryFrame}>
          <CircularGallery
            items={galleryItems}
            bend={1}
            textColor="#fff8ed"
            borderRadius={0.05}
            scrollEase={0.05}
            scrollSpeed={1.5}
          />
        </div>

        <div className={styles.galleryFooter}>
          <span className={styles.galleryLine} />
          <p>Drag or scroll to explore</p>
          <span className={styles.galleryLine} />
        </div>
      </div>
    </section>
  )
}

export default Gallery