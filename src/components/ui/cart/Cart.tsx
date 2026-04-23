type CartProps = {
  total: string
  count: number
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[22px] w-[22px]">
      <path
        d="M7.5 9V7.75a4.5 4.5 0 0 1 9 0V9M6 9h12l-.85 10.2a1.5 1.5 0 0 1-1.49 1.38H8.34a1.5 1.5 0 0 1-1.49-1.38L6 9Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
    </svg>
  )
}

function Cart({ total, count }: CartProps) {
  return (
    <div
      className="inline-flex items-center gap-3.5 text-[#111111]"
      aria-label={`${count} items in cart, total ${total}`}
    >
      <span className="text-[1.05rem] font-bold text-[#2e7d32]">{total}</span>
      <span className="relative inline-flex text-[#111111]" aria-hidden="true">
        <BagIcon />
        <span className="absolute top-[-8px] right-[-10px] inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#2e7d32] px-1 text-[0.72rem] leading-none font-bold text-white">
          {count}
        </span>
      </span>
    </div>
  )
}

export default Cart
