import { productCategories, type ProductCategory } from '../../data/catalog'
import brandLogo from '../../assets/360foods-logo-circle-of-flavor.png'
import Cart from './cart/Cart'

type HeaderProps = {
  activeCategory: ProductCategory
  cartCount: number
  cartTotal: string
  onCartClick: () => void
  onCategoryChange: (category: ProductCategory) => void
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[22px] w-[22px]">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function Header({
  activeCategory,
  cartCount,
  cartTotal,
  onCartClick,
  onCategoryChange,
}: HeaderProps) {
  return (
    <header className="w-full overflow-hidden border border-[rgba(15,23,15,0.08)] bg-[rgba(5,189,88,0.96)] shadow-[0_22px_50px_rgba(20,33,20,0.08)]">
      <div className="grid min-h-[138px] grid-cols-1 place-items-center gap-5 px-[18px] py-[22px] md:grid-cols-[auto_1fr_auto] md:items-center md:gap-6 md:px-[42px] md:pt-6 md:pb-[18px]">
        <button
          type="button"
          className="h-[52px] w-[52px] items-center justify-center rounded-full border border-[rgba(20,33,20,0.12)] bg-white p-0 text-[#111111] transition duration-200 hover:-translate-y-px hover:border-[rgba(28,107,47,0.28)] hover:text-[#1c6b2f] hover:shadow-[0_10px_24px_rgba(28,107,47,0.12)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2e7d32] hidden md:inline-flex"
          aria-label="Open navigation menu"
        >
          <MenuIcon />
        </button>

        <div
          className="relative isolate flex h-32 w-32 justify-self-center overflow-hidden rounded-full text-center"
          aria-label="360Foods"
        >
          <img
            src={brandLogo}
            alt="360Foods Circle of Flavor"
            className="h-full w-full scale-110 rounded-full border object-cover shadow-md"
          />
        </div>

        <div className="hidden md:block">
          <Cart total={cartTotal} count={cartCount} onClick={onCartClick} />
        </div>

        <div className="flex w-full items-center justify-between md:hidden">
          <button
            type="button"
            className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-full border border-white/30 bg-white/20 p-0 text-white transition duration-200 hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            aria-label="Menu button (desktop feature)"
          >
            <MenuIcon />
          </button>

          <Cart total={cartTotal} count={cartCount} onClick={onCartClick} />
        </div>
      </div>

      <nav
        className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 border-t border-t-[rgba(17,17,17,0.06)] bg-[linear-gradient(180deg,#f3f7f1_0%,#edf3eb_100%)] px-4 pt-4 pb-[18px] md:gap-x-[clamp(14px,3vw,42px)] md:px-6"
        aria-label="Primary"
      >
        {productCategories.map((category) => (
          <button
            key={category}
            type="button"
            className={`relative px-0.5 py-1 text-base font-medium no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2e7d32] ${
              activeCategory === category
                ? "text-[#2e7d32] after:absolute after:right-0 after:bottom-[-1px] after:left-0 after:h-0.5 after:rounded-full after:bg-current after:content-['']"
                : "text-[rgba(17,17,17,0.84)] hover:text-[#2e7d32] hover:after:absolute hover:after:right-0 hover:after:bottom-[-1px] hover:after:left-0 hover:after:h-0.5 hover:after:rounded-full hover:after:bg-current hover:after:content-['']"
            }`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </nav>
    </header>
  )
}

export default Header
