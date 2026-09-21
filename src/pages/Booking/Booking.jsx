
import React, { useMemo, useState } from 'react'
import styles from './Booking.module.css'
import Header from '../../components/Header/Header'

const menuItems = [
  { id: 1, name: 'Classic French Fries', category: 'Fries', price: 99, description: 'Golden, crispy fries with a pinch of seasoning.', emoji: '🍟' },
  { id: 2, name: 'Peri Peri Fries', category: 'Fries', price: 129, description: 'Crispy fries tossed in spicy peri peri seasoning.', emoji: '🌶️' },
  { id: 3, name: 'Loaded Cheese Fries', category: 'Loaded Fries', price: 179, description: 'Crispy fries topped with creamy cheese sauce.', emoji: '🧀' },
  { id: 4, name: 'Loaded Beef Fries', category: 'Loaded Fries', price: 249, description: 'Loaded fries with beef and delicious toppings.', emoji: '🍖' },
  { id: 5, name: 'Classic Smash Burger', category: 'Burgers', price: 199, description: 'Juicy smashed patty with fresh toppings.', emoji: '🍔' },
  { id: 6, name: 'Double Cheese Burger', category: 'Burgers', price: 279, description: 'Double patty, melted cheese, and house sauce.', emoji: '🧀' },
  { id: 7, name: 'Hot Masala Chai', category: 'Drinks', price: 25, description: 'Freshly brewed tea with aromatic spices.', emoji: '☕' },
  { id: 8, name: 'Fresh Lime', category: 'Drinks', price: 50, description: 'Refreshing lime drink served chilled.', emoji: '🍋' }
]

const categories = ['All', 'Fries', 'Loaded Fries', 'Burgers', 'Drinks']

const Booking = () => {
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState([])
  const [orderType, setOrderType] = useState('Pickup')
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  })
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesCategory = category === 'All' || item.category === category
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [category, search])

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const deliveryFee = orderType === 'Delivery' && cart.length > 0 ? 40 : 0
  const total = subtotal + deliveryFee

  const addToCart = item => {
    setOrderPlaced(false)
    setCart(currentCart => {
      const existingItem = currentCart.find(cartItem => cartItem.id === item.id)

      if (existingItem) {
        return currentCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }

      return [...currentCart, { ...item, quantity: 1 }]
    })
  }

  const updateQuantity = (id, amount) => {
    setCart(currentCart =>
      currentCart
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter(item => item.quantity > 0)
    )
  }

  const removeItem = id => {
    setCart(currentCart => currentCart.filter(item => item.id !== id))
  }

  const handleCustomerChange = event => {
    const { name, value } = event.target
    setCustomer(current => ({ ...current, [name]: value }))
  }

  const handleSubmit = event => {
    event.preventDefault()

    if (cart.length === 0) {
      alert('Please add at least one item to your cart.')
      return
    }

    if (orderType === 'Delivery' && !customer.address.trim()) {
      alert('Please enter your delivery address.')
      return
    }

    const newOrderNumber = `CL-${Date.now().toString().slice(-6)}`

    setOrderNumber(newOrderNumber)
    setOrderPlaced(true)
    setCart([])
    setCustomer({ name: '', phone: '', address: '', notes: '' })
  }

  if (orderPlaced) {
    return (
    
      <main className={styles.successPage}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>✓</div>
          <p className={styles.eyebrow}>CHAI LOOP CAFE</p>
          <h1>Order received!</h1>
          <p>
            Your demo order has been completed successfully on this page.
            No order has been sent to the cafe.
          </p>
          <div className={styles.orderNumber}>
            Order reference: <strong>{orderNumber}</strong>
          </div>
          <button
            className={styles.primaryButton}
            onClick={() => setOrderPlaced(false)}
          >
            Order More
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.bookingPage}>
      <Header/>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>FRESHLY MADE • JUST FOR YOU</p>
        <h1>Good food. <span>Good mood.</span></h1>
        <p>Choose your favourites and get your Chai Loop cravings sorted.</p>
      </section>

      <div className={styles.orderLayout}>
        <section className={styles.menuSection}>
          <div className={styles.menuHeading}>
            <div>
              <p className={styles.eyebrow}>EXPLORE OUR MENU</p>
              <h2>What are you craving?</h2>
            </div>
            <span className={styles.cartBadge}>
              <span aria-hidden="true">🛒</span> {cartCount} items
            </span>
          </div>

          <input
            className={styles.searchInput}
            type="search"
            placeholder="Search fries, burgers, chai..."
            value={search}
            onChange={event => setSearch(event.target.value)}
            aria-label="Search menu"
          />

          <div className={styles.categories} aria-label="Menu categories">
            {categories.map(item => (
              <button
                key={item}
                type="button"
                className={`${styles.categoryButton} ${
                  category === item ? styles.activeCategory : ''
                }`}
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
              >
                {item}
              </button>
            ))}
          </div>

          <div className={styles.menuGrid}>
            {filteredItems.map(item => (
              <article className={styles.menuCard} key={item.id}>
                <div className={styles.foodImage} aria-hidden="true">
                  {item.emoji}
                </div>
                <div className={styles.foodDetails}>
                  <span className={styles.foodCategory}>{item.category}</span>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div className={styles.foodFooter}>
                    <strong>₹{item.price}</strong>
                    <button
                      type="button"
                      className={styles.addButton}
                      onClick={() => addToCart(item)}
                      aria-label={`Add ${item.name} to cart`}
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <p className={styles.emptyMessage}>
              No items found. Try another search or category.
            </p>
          )}
        </section>

        <aside className={styles.cartSection}>
          <div className={styles.cartHeader}>
            <div>
              <p className={styles.eyebrow}>YOUR SELECTION</p>
              <h2>Your Cart</h2>
            </div>
            <span className={styles.cartIcon}>🛍️</span>
          </div>

          {cart.length === 0 ? (
            <div className={styles.emptyCart}>
              <span aria-hidden="true">🍟</span>
              <h3>Your cart is waiting</h3>
              <p>Add something delicious from the menu.</p>
            </div>
          ) : (
            <div className={styles.cartItems}>
              {cart.map(item => (
                <div className={styles.cartItem} key={item.id}>
                  <div className={styles.cartItemEmoji} aria-hidden="true">
                    {item.emoji}
                  </div>
                  <div className={styles.cartItemInfo}>
                    <h3>{item.name}</h3>
                    <p>₹{item.price} each</p>
                    <div className={styles.quantityControls}>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        aria-label={`Decrease ${item.name} quantity`}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className={styles.cartItemPrice}>
                    <strong>₹{item.price * item.quantity}</strong>
                    <button
                      type="button"
                      className={styles.removeButton}
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.name}`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <form className={styles.orderForm} onSubmit={handleSubmit}>
            <h3>Order details</h3>

            <div className={styles.orderType}>
              <button
                type="button"
                className={orderType === 'Pickup' ? styles.activeType : ''}
                onClick={() => setOrderType('Pickup')}
                aria-pressed={orderType === 'Pickup'}
              >
                🛍️ Pickup
              </button>
              <button
                type="button"
                className={orderType === 'Delivery' ? styles.activeType : ''}
                onClick={() => setOrderType('Delivery')}
                aria-pressed={orderType === 'Delivery'}
              >
                🛵 Delivery
              </button>
            </div>

            <label htmlFor="customerName">Full name</label>
            <input
              id="customerName"
              name="name"
              type="text"
              placeholder="Your name"
              value={customer.name}
              onChange={handleCustomerChange}
              required
              autoComplete="name"
            />

            <label htmlFor="customerPhone">Phone number</label>
            <input
              id="customerPhone"
              name="phone"
              type="tel"
              placeholder="Your contact number"
              value={customer.phone}
              onChange={handleCustomerChange}
              required
              autoComplete="tel"
              pattern="[0-9+\-\s()]{7,20}"
              title="Enter a valid phone number."
            />

            {orderType === 'Delivery' && (
              <>
                <label htmlFor="customerAddress">Delivery address</label>
                <textarea
                  id="customerAddress"
                  name="address"
                  placeholder="Enter your complete delivery address"
                  value={customer.address}
                  onChange={handleCustomerChange}
                  required
                  rows="3"
                  autoComplete="street-address"
                />
              </>
            )}

            <label htmlFor="orderNotes">Special instructions (optional)</label>
            <textarea
              id="orderNotes"
              name="notes"
              placeholder="Any preferences or instructions?"
              value={customer.notes}
              onChange={handleCustomerChange}
              rows="2"
            />

            <div className={styles.bill}>
              <div>
                <span>Subtotal</span>
                <strong>₹{subtotal}</strong>
              </div>
              <div>
                <span>Delivery fee</span>
                <strong>{deliveryFee === 0 ? '₹0' : `₹${deliveryFee}`}</strong>
              </div>
              <div className={styles.totalRow}>
                <span>Total</span>
                <strong>₹{total}</strong>
              </div>
            </div>

            <button
              type="submit"
              className={styles.primaryButton}
              disabled={cart.length === 0}
            >
              Place Demo Order • ₹{total}
            </button>

            <p className={styles.disclaimer}>
              Demo only. This form does not send an order to the cafe.
            </p>
          </form>
        </aside>
      </div>
    </main>
  )
}

export default Booking