import { useEffect, useState } from 'react'
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
  const [isScrolled, setIsScrolled] = useState(false)
  const remainingCategories = productCategories.filter(
    (category) => category !== 'All',
  )

  useEffect(() => {
    let animationFrameId = 0

    function handleScroll() {
      cancelAnimationFrame(animationFrameId)

      animationFrameId = window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 48)
      })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  function getCategoryButtonClass(category: ProductCategory) {
    return `relative flex-none whitespace-nowrap px-0.5 py-1 text-base font-medium no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2e7d32] ${
      activeCategory === category
        ? "text-[#2e7d32] after:absolute after:right-0 after:bottom-[-1px] after:left-0 after:h-0.5 after:rounded-full after:bg-current after:content-['']"
        : "text-[rgba(17,17,17,0.84)] hover:text-[#2e7d32] hover:after:absolute hover:after:right-0 hover:after:bottom-[-1px] hover:after:left-0 hover:after:h-0.5 hover:after:rounded-full hover:after:bg-current hover:after:content-['']"
    }`
  }

  return (
    <header
      className={`sticky top-0 z-40 w-full overflow-hidden border border-[rgba(15,23,15,0.08)] bg-[rgba(5,189,88,0.96)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isScrolled
          ? 'shadow-[0_14px_36px_rgba(20,33,20,0.14)] backdrop-blur-md'
          : 'shadow-[0_22px_50px_rgba(20,33,20,0.08)]'
      }`}
    >
      <div
        className={`grid grid-cols-1 place-items-center px-[18px] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:grid-cols-[auto_1fr_auto] md:items-center md:gap-6 md:px-[42px] ${
          isScrolled
            ? 'min-h-[82px] gap-2 py-2 md:min-h-[86px] md:pt-2 md:pb-2'
            : 'min-h-[138px] gap-5 py-[22px] md:pt-6 md:pb-[18px]'
        }`}
      >
        <button
          type="button"
          className="h-[52px] w-[52px] items-center justify-center rounded-full border border-[rgba(20,33,20,0.12)] bg-white p-0 text-[#111111] transition duration-200 hover:-translate-y-px hover:border-[rgba(28,107,47,0.28)] hover:text-[#1c6b2f] hover:shadow-[0_10px_24px_rgba(28,107,47,0.12)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2e7d32] hidden md:inline-flex"
          aria-label="Open navigation menu"
        >
          <MenuIcon />
        </button>

        <div
          className={`relative isolate flex justify-self-center overflow-hidden rounded-full text-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isScrolled ? 'h-16 w-16 md:h-20 md:w-20' : 'h-32 w-32'
          }`}
          aria-label="360Foods"
        >
          <img
            src={brandLogo}
            alt="360Foods Circle of Flavor"
            className={`h-full w-full rounded-full border object-cover shadow-md transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isScrolled ? 'scale-105' : 'scale-110'
            }`}
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
        className={`flex items-center border-t border-t-[rgba(17,17,17,0.06)] bg-[linear-gradient(180deg,#f3f7f1_0%,#edf3eb_100%)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          isScrolled ? 'pt-2 pb-3' : 'pt-4 pb-[18px]'
        }`}
        aria-label="Primary"
      >
        <div className="relative z-10 flex-none bg-[linear-gradient(180deg,#f3f7f1_0%,#edf3eb_100%)] px-4 pr-5 shadow-[12px_0_18px_rgba(237,243,235,0.92)]">
          <button
            type="button"
            className={getCategoryButtonClass('All')}
            onClick={() => onCategoryChange('All')}
          >
            All
          </button>
        </div>

        <div className="flex min-w-0 flex-1 flex-nowrap items-center gap-x-5 overflow-x-auto overscroll-x-contain pr-4 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {remainingCategories.map((category) => (
            <button
              key={category}
              type="button"
              className={getCategoryButtonClass(category)}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </nav>

      <nav
        className={`hidden flex-nowrap items-center justify-center gap-x-[clamp(14px,3vw,42px)] overflow-x-auto overscroll-x-contain border-t border-t-[rgba(17,17,17,0.06)] bg-[linear-gradient(180deg,#f3f7f1_0%,#edf3eb_100%)] px-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [-webkit-overflow-scrolling:touch] [scrollbar-width:none] md:flex [&::-webkit-scrollbar]:hidden ${
          isScrolled ? 'pt-2 pb-3' : 'pt-4 pb-[18px]'
        }`}
        aria-label="Primary"
      >
        {productCategories.map((category) => (
          <button
            key={category}
            type="button"
            className={getCategoryButtonClass(category)}
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
