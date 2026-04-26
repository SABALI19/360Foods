import { useEffect, useState } from 'react'
import brandLogo from './assets/360foods-logo-circle-of-flavor.png'
import Checkout from './components/ui/cart/Checkout'
import Card from './components/ui/cards/Card'
import { products, type ProductCategory } from './data/catalog'
import Layout from './layouts/Layout'

type CartItems = Record<string, number>
type AppView = 'shop' | 'checkout'
const splashDurationMs = 2400

function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true)
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('All')
  const [cartItems, setCartItems] = useState<CartItems>({})
  const [view, setView] = useState<AppView>('shop')

  useEffect(() => {
    const splashTimer = window.setTimeout(() => {
      setIsSplashVisible(false)
    }, splashDurationMs)

    return () => window.clearTimeout(splashTimer)
  }, [])

  const cartCount = Object.values(cartItems).reduce(
    (total, quantity) => total + quantity,
    0,
  )

  const cartTotalValue = products.reduce((total, product) => {
    const quantity = cartItems[product.id] ?? 0

    return total + product.price * quantity
  }, 0)

  const cartTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cartTotalValue)

  function handleAddToCart(productId: string) {
    setCartItems((currentCart) => ({
      ...currentCart,
      [productId]: (currentCart[productId] ?? 0) + 1,
    }))
  }

  function handleCategoryChange(category: ProductCategory) {
    setActiveCategory(category)
    setView('shop')
  }

  function handleCartClick() {
    setView('checkout')
  }

  function handleOrderComplete() {
    setCartItems({})
    setView('shop')
  }

  return (
    <>
      <Layout
        activeCategory={activeCategory}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onCartClick={handleCartClick}
        onCategoryChange={handleCategoryChange}
      >
        {view === 'checkout' ? (
          <Checkout
            cartItems={cartItems}
            onOrderComplete={handleOrderComplete}
            products={products}
            subtotal={cartTotalValue}
          />
        ) : (
          <Card
            activeCategory={activeCategory}
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
          />
        )}
      </Layout>

     {isSplashVisible && (
  <div className="fixed inset-0 z-50 bg-[#05bd58]">
    <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2">
      <img
        src={brandLogo}
        alt="360Foods Circle of Flavor"
        className="splash-logo-spin h-38 w-38 rounded-full border object-cover shadow-[0_24px_70px_rgba(20,33,20,0.2)] md:h-40 md:w-40"
      />
    </div>
  </div>
)}
    </>
  )
}

export default App
