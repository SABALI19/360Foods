import { ShoppingBasketIcon } from 'lucide-react'

type CartProps = {
  onClick?: () => void
  total: string
  count: number
}

function Cart({ onClick, total, count }: CartProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-3.5 text-[#111111]"
      aria-label={`${count} items in cart, total ${total}`}
    >
      <span className="text-[1.05rem] font-bold text-[#c7f5c9]">{total}</span>
      <span className="relative inline-flex text-[#111111]" aria-hidden="true">
        <ShoppingBasketIcon className="h-[22px] w-[22px] text-[#c7f5c9]" strokeWidth={1.9} />
        <span className="absolute top-[-8px] right-[-10px] inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#3b9240] px-1 text-[0.72rem] leading-none font-bold text-[#c7f5c9]">
          {count}
        </span>
      </span>
    </button>
  )
}

export default Cart
