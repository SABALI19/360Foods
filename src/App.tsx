import { useState } from 'react'
import Checkout from './components/ui/cart/Checkout'
import Card from './components/ui/cards/Card'
import { products, type ProductCategory } from './data/catalog'
import Layout from './layouts/Layout'

type CartItems = Record<string, number>
type AppView = 'shop' | 'checkout'

function App() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('All')
  const [cartItems, setCartItems] = useState<CartItems>({})
  const [view, setView] = useState<AppView>('shop')

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

  return (
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
  )
}

export default App
