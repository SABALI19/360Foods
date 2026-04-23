import { products, type ProductCategory } from '../../../data/catalog'

type CardProps = {
  activeCategory: ProductCategory
  cartItems: Record<string, number>
  onAddToCart: (productId: string) => void
}

function LeafBadge() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5 text-emerald-400"
    >
      <path
        d="M20 4c-6.8.1-11.7 1.9-14.7 5.4-2 2.3-2.8 5-2.3 8.1 2.8-.7 5-2 6.8-4l2.6-2.8-1.4 3.4c-.7 1.6-1.6 3-2.8 4.3 2.8.3 5.2-.4 7.1-2.1C18.9 13.3 20.4 9.2 20 4Z"
        fill="currentColor"
      />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 ">
      <path
        d="M12 5v14M5 12h14"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.9"
      />
    </svg>
  )
}

function Card({ activeCategory, cartItems, onAddToCart }: CardProps) {
  const filteredProducts =
    activeCategory === 'All'
      ? products
      : products.filter((product) => product.category === activeCategory)

  const priceFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  return (
    <section className="w-full px-5 py-8 md:px-8 md:py-12">
      <div className="mx-auto mb-6 flex w-full max-w-[1180px] items-center justify-between gap-4">
        <div>
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.24em] text-[#2e7d32]">
            Browse Collection
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[#111111]">
            {activeCategory === 'All' ? 'All Products' : activeCategory}
          </h2>
        </div>
        <p className="text-sm text-[#111111]/55">
          {filteredProducts.length} item
          {filteredProducts.length === 1 ? '' : 's'}
        </p>
      </div>

      <div className="mx-auto grid w-full max-w-[1180px] gap-px overflow-hidden rounded-[2px] border border-[#e9ece7] bg-[#e9ece7] md:grid-cols-2 xl:grid-cols-4">
        {filteredProducts.map((product) => {
          const quantity = cartItems[product.id] ?? 0
          const isInCart = quantity > 0

          return (
            <article
              key={product.id}
              className={`group flex min-h-[328px] flex-col bg-white px-5 pt-6 pb-4 transition duration-300 ${
                product.featured
                  ? 'shadow-[0_12px_30px_rgba(34,34,34,0.09)]'
                  : 'hover:shadow-[0_10px_24px_rgba(34,34,34,0.05)]'
              }`}
            >
            <div className="min-h-[62px] text-center">
              <div className="flex items-start justify-center gap-2">
                <h3
                  className={`text-[1rem] leading-none font-semibold ${
                    product.featured ? 'text-[#2e7d32]' : 'text-[#2a2a2a]'
                  }`}
                >
                  {product.name}
                </h3>
                {product.accent ? <LeafBadge /> : null}
              </div>
              <p className="mt-2 text-[0.72rem] font-medium text-[#2e7d32]/80">
                {product.category}
              </p>
              <p className="mt-2 text-[0.72rem] text-[#9d9d9d]">{product.weight}</p>
            </div>

            <div className="mt-2 flex flex-1 items-center justify-center">
              <div className="h-[150px] w-full max-w-[220px]">
                {product.imageSrc ? (
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-2xl bg-[#f3f9f3] text-sm font-medium text-[#2e7d32]">
                    Upload product image
                  </div>
                )}
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => onAddToCart(product.id)}
                aria-pressed={isInCart}
                className={`inline-flex items-center border px-3 py-2 text-[0.78rem] font-medium transition ${
                  isInCart
                    ? 'border-[#2e7d32] bg-[#2e7d32] text-white hover:bg-[#276b2a]'
                    : 'border-[#2e7d32] bg-white text-[#2e7d32] hover:bg-[#f3f9f3]'
                }`}
              >
                <span>{isInCart ? `In Cart(${quantity})` : 'Add to Cart'}</span>
                <span
                  className={`ml-3 border-l pl-3 ${
                    isInCart
                      ? 'border-l-white/35 text-white'
                      : 'border-l-[#2e7d32]/35 text-[#2e7d32]'
                  }`}
                >
                  <PlusIcon />
                </span>
              </button>

              <p
                className={`text-[1.05rem] font-semibold tracking-[0.01em] ${
                  isInCart ? 'text-[#2e7d32]' : 'text-[#111111]'
                }`}
              >
                {priceFormatter.format(product.price)}
              </p>
            </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default Card
