type Product = {
  name: string
  weight: string
  price: string
  featured?: boolean
  actionLabel: string
  accent?: boolean
  image: 'mud' | 'forest' | 'berry' | 'italian'
}

const products: Product[] = [
  {
    name: 'Mud Cake White',
    weight: '1.9kg',
    price: '$34',
    actionLabel: 'Add to Cart',
    image: 'mud',
  },
  {
    name: 'Black Forest',
    weight: '0.8kg',
    price: '$31.95',
    actionLabel: 'In Cart(1)',
    featured: true,
    accent: true,
    image: 'forest',
  },
  {
    name: 'Strawberry Fields',
    weight: '1.7kg',
    price: '$40',
    actionLabel: 'Add to Cart',
    image: 'berry',
  },
  {
    name: 'Italian Sponge',
    weight: '4kg',
    price: '$57.50',
    actionLabel: 'Add to Cart',
    accent: true,
    image: 'italian',
  },
]

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
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
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

function CakeArt({ kind }: { kind: Product['image'] }) {
  if (kind === 'mud') {
    return (
      <svg viewBox="0 0 240 150" aria-hidden="true" className="h-full w-full">
        <ellipse cx="120" cy="126" rx="76" ry="14" fill="#d9d9d9" opacity="0.35" />
        <ellipse cx="120" cy="92" rx="64" ry="34" fill="#f4ebd8" />
        <ellipse cx="120" cy="86" rx="58" ry="28" fill="#fffdf6" />
        <ellipse cx="120" cy="80" rx="55" ry="24" fill="#f0d894" />
        {[
          [86, 66],
          [117, 62],
          [147, 68],
          [76, 89],
          [108, 86],
          [138, 90],
          [99, 108],
          [130, 110],
        ].map(([x, y], index) => (
          <g key={`${x}-${y}-${index}`}>
            <circle cx={x} cy={y} r="12" fill="#fffaf1" />
            <circle cx={x} cy={y} r="9" fill="#faf4ea" />
            <path
              d={`M${x - 7} ${y}c3-4 11-4 14 0`}
              fill="none"
              stroke="#d7d0c5"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx={x + 1} cy={y - 1} r="1.5" fill="#e7e0d8" />
          </g>
        ))}
      </svg>
    )
  }

  if (kind === 'forest') {
    return (
      <svg viewBox="0 0 240 150" aria-hidden="true" className="h-full w-full">
        <ellipse cx="120" cy="126" rx="78" ry="14" fill="#d9d9d9" opacity="0.35" />
        <path d="M56 104 82 70h100l10 34Z" fill="#4f2d24" />
        <path d="M60 96 85 66h96l10 30Z" fill="#705147" />
        <path d="M64 91 90 62h89l10 26Z" fill="#f7e9e2" />
        <path d="M70 87 96 58h79l8 22Z" fill="#3d1f19" />
        <path d="M71 77h98" stroke="#fff" strokeOpacity="0.65" strokeWidth="3" />
        {[74, 101, 129, 157].map((x) => (
          <circle key={x} cx={x} cy="60" r="10" fill="#8d0f1f" />
        ))}
        {[90, 142, 171].map((x) => (
          <circle key={x} cx={x} cy="84" r="8" fill="#a51427" />
        ))}
        {[74, 101, 129, 157, 90, 142, 171].map((x, index) => (
          <path
            key={`${x}-${index}`}
            d={`M${x} ${x > 160 ? 49 : 50}c4-7 8-10 11-11`}
            fill="none"
            stroke="#85704d"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}
      </svg>
    )
  }

  if (kind === 'berry') {
    return (
      <svg viewBox="0 0 240 150" aria-hidden="true" className="h-full w-full">
        <ellipse cx="120" cy="126" rx="74" ry="14" fill="#d9d9d9" opacity="0.35" />
        <ellipse cx="120" cy="92" rx="60" ry="32" fill="#4d251f" />
        <ellipse cx="120" cy="84" rx="54" ry="26" fill="#5f2a22" />
        {[
          [82, 76, 13],
          [104, 63, 15],
          [126, 70, 14],
          [150, 62, 15],
          [166, 82, 13],
          [95, 92, 12],
          [136, 94, 12],
        ].map(([x, y, r], index) => (
          <g key={`${x}-${y}-${index}`}>
            <circle cx={x} cy={y} r={r} fill="#dd1c2c" />
            <circle cx={x - 4} cy={y + 2} r={r * 0.32} fill="#ffd2c7" opacity="0.45" />
            <path
              d={`M${x - 8} ${y - r + 3}c4-5 11-6 16-1`}
              fill="none"
              stroke="#2f7d32"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
        ))}
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 240 150" aria-hidden="true" className="h-full w-full">
      <ellipse cx="120" cy="126" rx="78" ry="14" fill="#d9d9d9" opacity="0.35" />
      <ellipse cx="120" cy="96" rx="74" ry="32" fill="#d48f32" />
      <ellipse cx="120" cy="89" rx="68" ry="26" fill="#fff4e6" />
      <ellipse cx="120" cy="83" rx="62" ry="22" fill="#f0a03e" />
      <ellipse cx="120" cy="80" rx="55" ry="18" fill="#fffaf3" />
      {[
        [83, 81, '#1d1d1d'],
        [99, 73, '#f5c75a'],
        [115, 84, '#d9edf7'],
        [132, 74, '#1d1d1d'],
        [148, 84, '#f5c75a'],
        [162, 76, '#d9edf7'],
      ].map(([x, y, color], index) => (
        <circle key={`${x}-${y}-${index}`} cx={Number(x)} cy={Number(y)} r="8.5" fill={String(color)} />
      ))}
      {Array.from({ length: 16 }).map((_, index) => {
        const angle = (Math.PI * 2 * index) / 16
        const x = 120 + Math.cos(angle) * 51
        const y = 90 + Math.sin(angle) * 21
        return <circle key={index} cx={x} cy={y} r="4" fill="#fff7ef" />
      })}
    </svg>
  )
}

function Card() {
  return (
    <section className="w-full px-5 py-8 md:px-8 md:py-12">
      <div className="mx-auto grid w-full max-w-[1180px] gap-px overflow-hidden rounded-[2px] border border-[#e9ece7] bg-[#e9ece7] md:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <article
            key={product.name}
            className={`group flex min-h-[328px] flex-col bg-white px-5 pt-6 pb-4 transition duration-300 ${
              product.featured
                ? 'shadow-[0_12px_30px_rgba(34,34,34,0.09)]'
                : 'hover:shadow-[0_10px_24px_rgba(34,34,34,0.05)]'
            }`}
          >
            <div className="min-h-[62px] text-center">
              <div className="flex items-start justify-center gap-2">
                <h2
                  className={`text-[1rem] leading-none font-semibold ${
                    product.featured ? 'text-[#c79b74]' : 'text-[#2a2a2a]'
                  }`}
                >
                  {product.name}
                </h2>
                {product.accent ? <LeafBadge /> : null}
              </div>
              <p className="mt-4 text-[0.72rem] text-[#9d9d9d]">{product.weight}</p>
            </div>

            <div className="mt-2 flex flex-1 items-center justify-center">
              <div className="h-[150px] w-full max-w-[220px]">
                <CakeArt kind={product.image} />
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between gap-4">
              <button
                type="button"
                className={`inline-flex items-center border px-3 py-2 text-[0.78rem] font-medium transition ${
                  product.featured
                    ? 'border-[#2e7d32] bg-[#2e7d32] text-white hover:bg-[#276b2a]'
                    : 'border-[#2e7d32] bg-white text-[#2e7d32] hover:bg-[#f3f9f3]'
                }`}
              >
                <span>{product.actionLabel}</span>
                <span
                  className={`ml-3 border-l pl-3 ${
                    product.featured
                      ? 'border-l-white/35 text-white'
                      : 'border-l-[#2e7d32]/35 text-[#2e7d32]'
                  }`}
                >
                  <PlusIcon />
                </span>
              </button>

              <p
                className={`text-[1.05rem] font-semibold tracking-[0.01em] ${
                  product.featured ? 'text-[#2e7d32]' : 'text-[#111111]'
                }`}
              >
                {product.price}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Card
