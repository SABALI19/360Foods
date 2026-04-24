import type { ReactNode } from 'react'
import Footer from '../components/Footer'
import Header from '../components/ui/Header'
import type { ProductCategory } from '../data/catalog'

type LayoutProps = {
  activeCategory: ProductCategory
  cartCount: number
  cartTotal: string
  children?: ReactNode
  onCartClick: () => void
  onCategoryChange: (category: ProductCategory) => void
}

function Layout({
  activeCategory,
  cartCount,
  cartTotal,
  children,
  onCartClick,
  onCategoryChange,
}: LayoutProps) {
  return (
    <div className="min-h-screen w-full bg-[radial-gradient(circle_at_top,rgba(46,125,50,0.14),transparent_36%),linear-gradient(180deg,#f7fbf7_0%,#ffffff_48%)]">
      <Header
        activeCategory={activeCategory}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onCartClick={onCartClick}
        onCategoryChange={onCategoryChange}
      />
      <main className="w-full">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
