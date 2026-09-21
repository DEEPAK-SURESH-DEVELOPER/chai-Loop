
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Menu.module.css'

const categories = ['All', 'Chai', 'Coffee', 'Snacks', 'Desserts', 'Combos']

const menuItems = [
  {
    id: 1,
    name: 'Classic Masala Chai',
    category: 'Chai',
    description: 'A timeless blend of tea, spices and comfort.',
    price: 40,
    image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'A warm cup of traditional tea'
  },
  {
    id: 2,
    name: 'Kesar Chai',
    category: 'Chai',
    description: 'A royal sip with saffron’s golden touch.',
    price: 60,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'A freshly prepared cup of tea'
  },
  {
    id: 3,
    name: 'Cappuccino',
    category: 'Coffee',
    description: 'Bold coffee, velvety milk, pure joy.',
    price: 90,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Cappuccino with milk foam'
  },
  {
    id: 4,
    name: 'Punjabi Samosa',
    category: 'Snacks',
    description: 'Crispy outside, flavourful inside.',
    price: 50,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Golden samosas served on a plate'
  },
  {
    id: 5,
    name: 'Cheese Sandwich',
    category: 'Snacks',
    description: 'Perfectly toasted, endlessly satisfying.',
    price: 80,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Toasted sandwich with cheese'
  },
  {
    id: 6,
    name: 'Chocolate Brownie',
    category: 'Desserts',
    description: 'A sweet ending to a perfect day.',
    price: 100,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Rich chocolate brownie'
  },
  {
    id: 7,
    name: 'Chai & Bun Maska',
    category: 'Combos',
    description: 'A classic pair, made for better mornings.',
    price: 70,
    image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'A comforting cup of chai'
  },
  {
    id: 8,
    name: 'Iced Latte',
    category: 'Coffee',
    description: 'Cool sips for warm-hearted moments.',
    price: 110,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Iced coffee in a glass'
  }
]

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [favorites, setFavorites] = useState([])

  const filteredItems =
    activeCategory === 'All'
      ? menuItems
      : menuItems.filter(item => item.category === activeCategory)

  const toggleFavorite = id => {
    setFavorites(current =>
      current.includes(id)
        ? current.filter(itemId => itemId !== id)
        : [...current, id]
    )
  }

  return (
    <section className={styles.menuSection} id="menu">
      <div className={styles.menuContainer}>
        <div className={styles.menuHeader}>
          <div className={styles.headingLine}>
            <span />
            <span className={styles.eyebrow}>OUR MENU</span>
            <span />
          </div>

          <h2>Brews, Bites &amp; Better Days</h2>

          <p className={styles.introText}>
            From classic chai to delicious snacks, everything here is made
            to bring people together.
          </p>

          <span className={styles.decorativeText} aria-hidden="true">
            Good Food<br />Good Mood
          </span>
        </div>

        <div className={styles.categoryList} aria-label="Menu categories">
          {categories.map(category => (
            <button
              key={category}
              type="button"
              className={`${styles.categoryButton} ${
                activeCategory === category ? styles.activeCategory : ''
              }`}
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
            >
              {category === 'All' && <span aria-hidden="true">▦</span>}
              {category === 'Chai' && <span aria-hidden="true">♨</span>}
              {category === 'Coffee' && <span aria-hidden="true">☕</span>}
              {category === 'Snacks' && <span aria-hidden="true">♧</span>}
              {category === 'Desserts' && <span aria-hidden="true">♙</span>}
              {category === 'Combos' && <span aria-hidden="true">▣</span>}
              {category}
            </button>
          ))}
        </div>

        <div className={styles.menuGrid} aria-live="polite">
          {filteredItems.map((item, index) => (
            <article
              className={styles.menuCard}
              key={item.id}
              style={{ '--card-index': index }}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  loading="lazy"
                  className={styles.foodImage}
                />

                <span className={styles.itemCategory}>
                  {item.category}
                </span>

                <button
                  type="button"
                  className={`${styles.favoriteButton} ${
                    favorites.includes(item.id) ? styles.isFavorite : ''
                  }`}
                  onClick={() => toggleFavorite(item.id)}
                  aria-label={
                    favorites.includes(item.id)
                      ? `Remove ${item.name} from favorites`
                      : `Add ${item.name} to favorites`
                  }
                  aria-pressed={favorites.includes(item.id)}
                >
                  {favorites.includes(item.id) ? '♥' : '♡'}
                </button>
              </div>

              <div className={styles.cardContent}>
                <h3>{item.name}</h3>
                <p>{item.description}</p>

                <div className={styles.cardFooter}>
                  <span className={styles.price}>₹{item.price}</span>

                  <Link
                    to="/booking"
                    className={styles.addButton}
                    aria-label={`Order ${item.name}`}
                    title={`Order ${item.name}`}
                  >
                    +
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.menuBottom}>
          <blockquote className={styles.menuQuote}>
            <span aria-hidden="true">“</span>
            <p>Good food<br />brings people closer.</p>
          </blockquote>

          <Link to="/booking" className={styles.exploreButton}>
            Explore Full Menu <span aria-hidden="true">→</span>
          </Link>

          <div className={styles.sipStamp}>
            <span>SIP</span>
            <span>SAVOUR</span>
            <span>REPEAT</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Menu