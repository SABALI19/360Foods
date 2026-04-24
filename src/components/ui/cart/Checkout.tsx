import {
  Check,
  CreditCard,
  LockKeyhole,
  MapPinHouse,
  Store,
  Truck,
} from 'lucide-react'
import type { Product } from '../../../data/catalog'

type CheckoutProps = {
  cartItems: Record<string, number>
  products: Product[]
  subtotal: number
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

function Checkout({ cartItems, products, subtotal }: CheckoutProps) {
  const orderedProducts = products.filter(
    (product) => (cartItems[product.id] ?? 0) > 0,
  )
  const deliveryFee = orderedProducts.length > 0 ? 4.5 : 0
  const tax = subtotal * 0.08
  const total = subtotal + deliveryFee + tax

  return (
    <section className="w-full px-4 py-8 md:px-8 md:py-10">
      <div className="mx-auto flex w-full max-w-[1080px] flex-col gap-6 rounded-[28px] bg-[linear-gradient(180deg,#f6fbef_0%,#fdfef8_100%)] px-4 py-6 shadow-[0_20px_60px_rgba(64,92,46,0.08)] md:px-8 md:py-8">
        <div className="flex items-center justify-center gap-5 md:gap-14">
          {[
            { number: 1, label: 'Cart', active: true },
            { number: 2, label: 'Details', active: true },
            { number: 3, label: 'Payment', active: false },
          ].map((step, index) => (
            <div key={step.label} className="flex items-center gap-5 md:gap-14">
              <div className="flex flex-col items-center gap-1.5">
                <span
                  className={`inline-flex h-6 w-6 items-center justify-center rounded-md text-[0.72rem] font-semibold ${
                    step.active
                      ? 'bg-[#2f7f37] text-white'
                      : 'bg-[#d9dfcf] text-[#6e7565]'
                  }`}
                >
                  {step.number}
                </span>
                <span className="text-[0.68rem] font-medium text-[#6a705f]">
                  {step.label}
                </span>
              </div>
              {index < 2 ? (
                <span className="hidden h-px w-12 bg-[#cfd8c4] md:block"></span>
              ) : null}
            </div>
          ))}
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.35fr_0.85fr]">
          <div className="space-y-4">
            <div className="rounded-[14px] border border-[#dce7d2] bg-white/85 p-4 shadow-[0_8px_24px_rgba(47,127,55,0.04)]">
              <h2 className="text-[1.02rem] font-semibold text-[#1d241d]">
                Delivery Method
              </h2>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <button
                  type="button"
                  className="rounded-[10px] border border-[#58a45f] bg-[#f4fbf2] px-3 py-3 text-left shadow-[inset_0_0_0_1px_rgba(47,127,55,0.05)] transition hover:border-[#2f7f37]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex gap-2.5">
                      <Truck className="mt-0.5 h-4 w-4 text-[#2f7f37]" />
                      <div>
                        <p className="text-[0.82rem] font-semibold text-[#203020]">
                          Standard Delivery
                        </p>
                        <p className="mt-1 text-[0.72rem] text-[#6a705f]">
                          25 Minutes Delivery
                        </p>
                      </div>
                    </div>
                    <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full border border-[#2f7f37] text-[#2f7f37]">
                      <Check className="h-2.5 w-2.5" strokeWidth={2.4} />
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  className="rounded-[10px] border border-[#d9e2ce] bg-white px-3 py-3 text-left transition hover:border-[#9fbea0]"
                >
                  <div className="flex items-start gap-2.5">
                    <Store className="mt-0.5 h-4 w-4 text-[#4d5648]" />
                    <div>
                      <p className="text-[0.82rem] font-semibold text-[#203020]">
                        Local Pickup
                      </p>
                      <p className="mt-1 text-[0.72rem] text-[#6a705f]">
                        Ready in 2 hours
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <div className="rounded-[14px] border border-[#dce7d2] bg-white/85 p-4 shadow-[0_8px_24px_rgba(47,127,55,0.04)]">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-[1.02rem] font-semibold text-[#1d241d]">
                  Payment Method
                </h2>
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-5 rounded-[3px] bg-[#ced8c1]"></span>
                  <span className="h-3 w-5 rounded-[3px] bg-[#dde6d2]"></span>
                  <span className="h-3 w-5 rounded-[3px] bg-[#2f7f37]"></span>
                </div>
              </div>

              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-[10px] border border-[#d9e2ce] bg-white px-3 py-3 text-[0.8rem] font-medium text-[#2a2f28]"
                >
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-[#b8c5ab] text-[0.48rem] font-semibold">
                    AP
                  </span>
                  Apple Pay
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-[10px] border border-[#d9e2ce] bg-white px-3 py-3 text-[0.8rem] font-medium text-[#2a2f28]"
                >
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-[#b8c5ab] text-[0.55rem]">
                    G
                  </span>
                  Google Pay
                </button>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <span className="h-px flex-1 bg-[#e4eadc]"></span>
                <span className="text-[0.68rem] uppercase tracking-[0.18em] text-[#8a917d]">
                  Or pay with card
                </span>
                <span className="h-px flex-1 bg-[#e4eadc]"></span>
              </div>

              <div className="mt-4 space-y-3">
                <label className="block">
                  <span className="mb-1.5 block text-[0.68rem] font-medium uppercase tracking-[0.12em] text-[#7f8674]">
                    Card Number
                  </span>
                  <div className="flex items-center rounded-[10px] bg-[#f4f8ee] px-3 py-2.5">
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      className="w-full bg-transparent text-[0.82rem] text-[#1f261e] outline-none placeholder:text-[#a6ac9b]"
                    />
                    <CreditCard className="h-4 w-4 text-[#7f8674]" />
                  </div>
                </label>

                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-[0.68rem] font-medium uppercase tracking-[0.12em] text-[#7f8674]">
                      Expiry Date
                    </span>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full rounded-[10px] bg-[#f4f8ee] px-3 py-2.5 text-[0.82rem] text-[#1f261e] outline-none placeholder:text-[#a6ac9b]"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-[0.68rem] font-medium uppercase tracking-[0.12em] text-[#7f8674]">
                      CVV
                    </span>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full rounded-[10px] bg-[#f4f8ee] px-3 py-2.5 text-[0.82rem] text-[#1f261e] outline-none placeholder:text-[#a6ac9b]"
                    />
                  </label>
                </div>

                <label className="flex items-center gap-2 pt-1 text-[0.72rem] text-[#6e7565]">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-3.5 w-3.5 rounded border border-[#b7c4aa] accent-[#2f7f37]"
                  />
                  Save card for future purchases
                </label>
              </div>
            </div>
          </div>

          <aside className="rounded-[14px] border border-[#dce7d2] bg-[rgba(252,253,248,0.9)] p-4 shadow-[0_8px_24px_rgba(47,127,55,0.04)]">
            <h2 className="text-[1.02rem] font-semibold text-[#1d241d]">
              Order Summary
            </h2>

            <div className="mt-4 space-y-4">
              {orderedProducts.length > 0 ? (
                orderedProducts.map((product) => {
                  const quantity = cartItems[product.id] ?? 0
                  return (
                    <div key={product.id} className="flex items-start gap-3">
                      <div className="h-12 w-12 overflow-hidden rounded-[10px] bg-[#f0f6ea]">
                        {product.imageSrc ? (
                          <img
                            src={product.imageSrc}
                            alt={product.imageAlt}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[0.62rem] text-[#7f8674]">
                            No image
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[0.78rem] font-semibold text-[#203020]">
                          {product.name}
                        </p>
                        <p className="mt-1 text-[0.7rem] text-[#727866]">
                          {quantity} x {formatCurrency(product.price)}
                        </p>
                      </div>
                      <p className="text-[0.78rem] font-semibold text-[#203020]">
                        {formatCurrency(product.price * quantity)}
                      </p>
                    </div>
                  )
                })
              ) : (
                <div className="rounded-[12px] bg-[#f4f8ee] px-4 py-5 text-center text-[0.82rem] text-[#6e7565]">
                  Your cart is empty. Add products to continue.
                </div>
              )}
            </div>

            <div className="mt-5 space-y-2 border-t border-t-[#e5ebdc] pt-4 text-[0.78rem] text-[#5d6455]">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Delivery</span>
                <span>{deliveryFee === 0 ? 'FREE' : formatCurrency(deliveryFee)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Tax</span>
                <span>{formatCurrency(tax)}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-t-[#dce7d2] pt-4">
              <span className="text-[1.08rem] font-semibold text-[#1c231d]">Total</span>
              <span className="text-[1.25rem] font-bold text-[#1d241d]">
                {formatCurrency(total)}
              </span>
            </div>

            <button
              type="button"
              disabled={orderedProducts.length === 0}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-[10px] bg-[#2f7f37] px-4 py-3 text-[0.82rem] font-semibold text-white transition hover:bg-[#286d30] disabled:cursor-not-allowed disabled:bg-[#a6bba4]"
            >
              <LockKeyhole className="h-4 w-4" />
              Complete Order
            </button>

            <div className="mt-4 flex items-start gap-2 rounded-[10px] bg-[#f4f8ee] px-3 py-3 text-[0.72rem] leading-5 text-[#6e7565]">
              <MapPinHouse className="mt-0.5 h-4 w-4 shrink-0 text-[#2f7f37]" />
              <p>
                By placing your order, you agree to our Terms of Service and
                delivery policy.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default Checkout
