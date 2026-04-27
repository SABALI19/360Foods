import { useState } from 'react'
import {
  ArrowRight,
  Check,
  CircleHelp,
  CreditCard,
  LockKeyhole,
  Mail,
  MapPinHouse,
  PackageCheck,
  Store,
  Truck,
  X,
} from 'lucide-react'
import type { Product } from '../../../data/catalog'

type CheckoutProps = {
  cartItems: Record<string, number>
  onOrderComplete: () => void
  products: Product[]
  subtotal: number
}

type DeliveryMethod = 'delivery' | 'pickup'
type PaymentMethod = 'apple-pay' | 'google-pay' | 'card'

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

function Checkout({
  cartItems,
  onOrderComplete,
  products,
  subtotal,
}: CheckoutProps) {
  const [orderId] = useState(() =>
    Math.floor(10000000 + Math.random() * 90000000).toString(),
  )
  const orderedProducts = products.filter(
    (product) => (cartItems[product.id] ?? 0) > 0,
  )
  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryMethod>('delivery')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card')
  const [isReceiptOpen, setIsReceiptOpen] = useState(false)
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false)
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterTouched, setNewsletterTouched] = useState(false)
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false)

  const deliveryFee =
    orderedProducts.length === 0
      ? 0
      : deliveryMethod === 'delivery'
        ? 4.5
        : 0
  const tax = subtotal * 0.08
  const total = subtotal + deliveryFee + tax
  const itemCount = orderedProducts.reduce(
    (count, product) => count + (cartItems[product.id] ?? 0),
    0,
  )
  const trimmedEmail = newsletterEmail.trim()
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)

  function handleCompleteOrder() {
    setIsReceiptOpen(true)
  }

  function handleReturnToShop() {
    setIsReceiptOpen(false)
    setIsNewsletterOpen(true)
  }

  function handleNewsletterSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setNewsletterTouched(true)

    if (!isEmailValid) {
      return
    }

    setNewsletterSubscribed(true)
  }

  function handleSkipNewsletter() {
    setNewsletterSubscribed(false)
    setNewsletterEmail('')
    setIsNewsletterOpen(false)
    onOrderComplete()
  }

  function handleNewsletterContinue() {
    setIsNewsletterOpen(false)
    onOrderComplete()
  }

  return (
    <section className="relative w-full px-4 py-8 md:px-8 md:py-10">
      <div className="mx-auto flex w-full max-w-[1080px] flex-col gap-6  bg-[linear-gradient(180deg,#f6fbef_0%,#fdfef8_100%)] px-4 py-6 shadow-[0_20px_60px_rgba(64,92,46,0.08)] md:px-8 md:py-8">
        <div className="flex items-center justify-center gap-5 md:gap-14">
          {[
            { number: 1, label: 'Cart', active: true },
            { number: 2, label: 'Details', active: true },
            { number: 3, label: 'Payment', active: false },
          ].map((step, index) => (
            <div key={step.label} className="flex items-center gap-5 md:gap-14">
              <div className="flex flex-col items-center gap-1.5">
                <span
                  className={`inline-flex h-6 w-6 items-center justify-center  text-[0.72rem] font-semibold ${
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
            <div className=" border border-[#dce7d2] bg-white/85 p-4 shadow-[0_8px_24px_rgba(47,127,55,0.04)]">
              <h2 className="text-[1.02rem] font-semibold text-[#1d241d]">
                Delivery Method
              </h2>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod('delivery')}
                  aria-pressed={deliveryMethod === 'delivery'}
                  className={`rounded- px-3 py-3 text-left transition ${
                    deliveryMethod === 'delivery'
                      ? 'border border-[#58a45f] bg-[#f4fbf2] shadow-[inset_0_0_0_1px_rgba(47,127,55,0.05)]'
                      : 'border border-[#d9e2ce] bg-white hover:border-[#9fbea0]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-8">
                    <div className="flex gap-2.5">
                      <Truck
                        className={`mt-0.5 h-4 w-4 ${
                          deliveryMethod === 'delivery'
                            ? 'text-[#2f7f37]'
                            : 'text-[#4d5648]'
                        }`}
                      />
                      <div>
                        <p className="text-[0.82rem] font-semibold text-[#203020]">
                          Standard Delivery
                        </p>
                        <p className="mt-1 text-[0.72rem] text-[#6a705f]">
                          25 Minutes Delivery
                        </p>
                      </div>
                    </div>
                    {deliveryMethod === 'delivery' ? (
                      <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full border border-[#2f7f37] text-[#2f7f37]">
                        <Check className="h-2.5 w-2.5" strokeWidth={2.4} />
                      </span>
                    ) : null}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryMethod('pickup')}
                  aria-pressed={deliveryMethod === 'pickup'}
                  className={` px-3 py-3 text-left transition ${
                    deliveryMethod === 'pickup'
                      ? 'border border-[#58a45f] bg-[#f4fbf2] shadow-[inset_0_0_0_1px_rgba(47,127,55,0.05)]'
                      : 'border border-[#d9e2ce] bg-white hover:border-[#9fbea0]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <Store
                        className={`mt-0.5 h-4 w-4 ${
                          deliveryMethod === 'pickup'
                            ? 'text-[#2f7f37]'
                            : 'text-[#4d5648]'
                        }`}
                      />
                      <div>
                        <p className="text-[0.82rem] font-semibold text-[#203020]">
                          Local Pickup
                        </p>
                        <p className="mt-1 text-[0.72rem] text-[#6a705f]">
                          Ready in 2 hours
                        </p>
                      </div>
                    </div>
                    {deliveryMethod === 'pickup' ? (
                      <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full border border-[#2f7f37] text-[#2f7f37]">
                        <Check className="h-2.5 w-2.5" strokeWidth={2.4} />
                      </span>
                    ) : null}
                    <div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <div className=" border border-[#dce7d2] bg-white/85 p-4 shadow-[0_8px_24px_rgba(47,127,55,0.04)]">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-[1.02rem] font-semibold text-[#1d241d]">
                  Payment Method
                </h2>
                <div className="flex items-center gap-1.5">
                  <CreditCard  className='text-gray-600'/>
                  {/* <span className="h-3 w-5 rounded-[3px] bg-[#ced8c1]"></span>
                  <span className="h-3 w-5 rounded-[3px] bg-[#dde6d2]"></span>
                  <span className="h-3 w-5 rounded-[3px] bg-[#2f7f37]"></span> */}
                </div>
              </div>

              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple-pay')}
                  aria-pressed={paymentMethod === 'apple-pay'}
                  className={`flex items-center justify-center gap-2  px-3 py-3 text-[0.8rem] font-medium transition ${
                    paymentMethod === 'apple-pay'
                      ? 'border border-[#58a45f] bg-[#f4fbf2] text-[#203020]'
                      : 'border border-[#d9e2ce] bg-white text-[#2a2f28] hover:border-[#9fbea0]'
                  }`}
                >
                 
                  Apple Pay
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('google-pay')}
                  aria-pressed={paymentMethod === 'google-pay'}
                  className={`flex items-center justify-center gap-2  px-3 py-3 text-[0.8rem] font-medium transition ${
                    paymentMethod === 'google-pay'
                      ? 'border border-[#58a45f] bg-[#f4fbf2] text-[#203020]'
                      : 'border border-[#d9e2ce] bg-white text-[#2a2f28] hover:border-[#9fbea0]'
                  }`}
                >
                  {/* <span
                    className={`inline-flex h-4 w-4 items-center justify-center rounded-[4px] text-[0.55rem] ${
                      paymentMethod === 'google-pay'
                        ? 'border border-[#2f7f37] text-[#2f7f37]'
                        : 'border border-[#b8c5ab]'
                    }`}
                  >
                    G
                  </span> */}
                  Google Pay
                </button>
              </div>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                aria-pressed={paymentMethod === 'card'}
                className={`mt-4 flex w-full items-center gap-3 rounded-[10px] px-3 py-3 transition ${
                  paymentMethod === 'card'
                    ? 'border border-[#58a45f] bg-[#f4fbf2]'
                    : 'border border-transparent hover:border-[#d9e2ce]'
                }`}
              >
                <span className="h-px flex-1 bg-[#e4eadc]"></span>
                <span
                  className={`text-[0.68rem] uppercase tracking-[0.18em] ${
                    paymentMethod === 'card'
                      ? 'font-semibold text-[#2f7f37]'
                      : 'text-[#8a917d]'
                  }`}
                >
                  Or pay with card
                </span>
                <span className="h-px flex-1 bg-[#e4eadc]"></span>
              </button>

              <div
                className={`mt-4 space-y-3 ${
                  paymentMethod === 'card' ? '' : 'opacity-50'
                }`}
              >
                <label className="block">
                  <span className="mb-1.5 block text-[0.68rem] font-medium uppercase tracking-[0.12em] text-[#7f8674]">
                    Card Number
                  </span>
                  <div className="flex items-center rounded-[10px] bg-[#f4f8ee] px-3 py-2.5">
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      disabled={paymentMethod !== 'card'}
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
                      disabled={paymentMethod !== 'card'}
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
                      disabled={paymentMethod !== 'card'}
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

          <aside className=" border border-[#dce7d2] bg-[rgba(252,253,248,0.9)] p-4 shadow-[0_8px_24px_rgba(47,127,55,0.04)]">
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
                <span>
                  {orderedProducts.length === 0 || deliveryMethod === 'pickup'
                    ? 'FREE'
                    : formatCurrency(deliveryFee)}
                </span>
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
              onClick={handleCompleteOrder}
              className="mt-5 flex w-full items-center justify-center gap-2  bg-[#2f7f37] px-4 py-3 text-[0.82rem] font-semibold text-white transition hover:bg-[#286d30] disabled:cursor-not-allowed disabled:bg-[#a6bba4]"
            >
              <LockKeyhole className="h-4 w-4" />
              Complete Order
            </button>

            <div className="mt-4 flex items-start gap-2  bg-[#f4f8ee] px-3 py-3 text-[0.72rem] leading-5 text-[#6e7565]">
              <MapPinHouse className="mt-0.5 h-4 w-4 shrink-0 text-[#2f7f37]" />
              <p>
                By placing your order, you agree to our Terms of Service and
                delivery policy.
              </p>
            </div>
          </aside>
        </div>
      </div>

      {isReceiptOpen ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#101710]/45 px-4 py-6 backdrop-blur-[2px] md:py-8">
          <div className="w-full max-w-[620px] overflow-hidden rounded-[16px] bg-white shadow-[0_30px_90px_rgba(16,23,16,0.28)]">
            <div className="flex items-center justify-between border-b border-b-[#edf1e8] px-5 py-4 md:px-7">
              <h3 className="text-[1.2rem] font-bold text-[#101510]">
                Checkout
              </h3>
              <div className="flex items-center gap-3 text-[#6c6f75]">
                <CircleHelp className="h-5 w-5" />
                <PackageCheck className="h-5 w-5" />
              </div>
            </div>

            <div className="px-5 py-7 md:px-8 md:py-9">
              <div className="text-center">
                <span className="mx-auto inline-flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#e2f6e9] text-[#047a36]">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#047a36] text-white">
                    <Check className="h-6 w-6" strokeWidth={3} />
                  </span>
                </span>
                <h4 className="mt-6 text-[clamp(1.8rem,6vw,2.5rem)] leading-tight font-bold text-[#101510]">
                  Thanks for your patronage
                </h4>
                <p className="mt-2 text-[0.98rem] text-[#626262]">
                  Order #{orderId} has been confirmed.
                </p>
              </div>

              <div className="mx-auto mt-8 grid max-w-[480px] grid-cols-[auto_1fr_auto_1fr_auto] items-center">
                <div className="flex flex-col items-center gap-2">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#16c767] text-white">
                    <Check className="h-4 w-4" strokeWidth={2.7} />
                  </span>
                  <span className="text-[0.82rem] font-semibold text-[#047a36]">
                    Ordered
                  </span>
                </div>
                <span className="mb-7 h-px bg-[#e3e5e2]"></span>
                <div className="flex flex-col items-center gap-2">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#d9f4e5] text-[#047a36]">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#047a36] text-white">
                      <PackageCheck className="h-4 w-4" />
                    </span>
                  </span>
                  <span className="text-[0.82rem] font-semibold text-[#047a36]">
                    Processing
                  </span>
                </div>
                <span className="mb-7 h-px bg-[#e3e5e2]"></span>
                <div className="flex flex-col items-center gap-2">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#e6e6e6] text-[#616161]">
                    <Truck className="h-4 w-4" />
                  </span>
                  <span className="text-[0.82rem] font-semibold text-[#616161]">
                    Shipped
                  </span>
                </div>
              </div>

              <div className="mt-8 overflow-hidden rounded-[12px] bg-[#f1f1f2]">
                <div className="flex items-center justify-between bg-[#e9e9ea] px-5 py-4">
                  <p className="text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[#565656]">
                    Summary
                  </p>
                  <p className="text-[0.82rem] font-bold uppercase tracking-[0.08em] text-[#565656]">
                    {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
                  </p>
                </div>

                <div className="space-y-5 px-5 py-5">
                  {orderedProducts.map((product) => {
                    const quantity = cartItems[product.id] ?? 0
                    return (
                      <div
                        key={product.id}
                        className="grid grid-cols-[64px_1fr_auto] items-center gap-4"
                      >
                        <div className="h-16 w-16 overflow-hidden rounded-[8px] bg-[#111111]">
                          {product.imageSrc ? (
                            <img
                              src={product.imageSrc}
                              alt={product.imageAlt}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-[0.62rem] text-white">
                              No image
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-[0.95rem] font-semibold text-[#111111]">
                            {product.name}
                          </p>
                          <span className="mt-1 inline-flex rounded-full bg-[#d8f3df] px-2.5 py-0.5 text-[0.62rem] font-bold uppercase text-[#047a36]">
                            Qty {quantity}
                          </span>
                        </div>
                        <p className="text-[0.9rem] font-bold text-[#111111]">
                          {formatCurrency(product.price * quantity)}
                        </p>
                      </div>
                    )
                  })}
                </div>

                <div className="flex items-center justify-between bg-[#e8e8e9] px-5 py-5">
                  <span className="text-[1rem] text-[#666666]">
                    Total Amount
                  </span>
                  <span className="text-[1.75rem] font-bold text-[#047a36]">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[12px] border border-[#e3e5e2] px-5 py-4">
                  <p className="text-[0.76rem] font-bold uppercase tracking-[0.14em] text-[#626262]">
                    Shipping To
                  </p>
                  <p className="mt-3 text-[0.9rem] leading-6 text-[#202020]">
                    360 Foods Customer
                    <br />
                    {deliveryMethod === 'delivery'
                      ? 'Standard Delivery'
                      : 'Local Pickup'}
                    <br />
                    Lagos, Nigeria
                  </p>
                </div>

                <div className="rounded-[12px] border border-[#e3e5e2] px-5 py-4">
                  <p className="text-[0.76rem] font-bold uppercase tracking-[0.14em] text-[#626262]">
                    Payment Method
                  </p>
                  <p className="mt-3 flex items-center gap-2 text-[0.9rem] text-[#202020]">
                    <CreditCard className="h-4 w-4 text-[#626262]" />
                    {paymentMethod === 'card'
                      ? 'Visa **** 4242'
                      : paymentMethod === 'apple-pay'
                        ? 'Apple Pay'
                        : 'Google Pay'}
                  </p>
                  <p className="mt-7 text-[0.7rem] font-bold uppercase tracking-[0.08em] text-[#047a36]">
                    Receipt Generated
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleReturnToShop}
                className="mt-8 flex w-full items-center justify-center gap-4 rounded-[12px] bg-[#047a36] px-5 py-4 text-[1rem] font-semibold text-white shadow-[0_14px_28px_rgba(4,122,54,0.22)] transition hover:bg-[#03682e]"
              >
                Return to Shop
                <ArrowRight className="h-5 w-5" />
              </button>

              <p className="mt-4 text-center text-[0.86rem] text-[#626262]">
                Need help?{' '}
                <span className="font-semibold text-[#047a36]">
                  Contact Support
                </span>
              </p>
            </div>
          </div>
        </div>
      ) : null}

      {isNewsletterOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#101710]/45 px-4 backdrop-blur-[2px]">
          <div className="w-full max-w-[440px] rounded-[24px] bg-white p-5 shadow-[0_24px_70px_rgba(16,23,16,0.22)] md:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#edf7eb] text-[#2f7f37]">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-[#2f7f37]">
                    Stay Updated
                  </p>
                  <h3 className="mt-1 text-[1.2rem] font-semibold text-[#182118]">
                    Receive newsletters by email?
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSkipNewsletter}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#dde8d8] text-[#667060] transition hover:border-[#b9cbb4] hover:text-[#2f7f37]"
                aria-label="Close newsletter modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {newsletterSubscribed ? (
              <div className="mt-5 rounded-[18px] bg-[#f4fbf2] px-4 py-5 text-center">
                <span className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#2f7f37] text-white">
                  <Check className="h-5 w-5" strokeWidth={2.5} />
                </span>
                <h4 className="mt-3 text-[1rem] font-semibold text-[#1d241d]">
                  You&apos;re subscribed
                </h4>
                <p className="mt-2 text-[0.84rem] leading-6 text-[#5f6756]">
                  We&apos;ll send product updates, newsletters, and special
                  offers to{' '}
                  <span className="font-medium text-[#2f7f37]">
                    {trimmedEmail}
                  </span>
                  .
                </p>
                <button
                  type="button"
                  onClick={handleNewsletterContinue}
                  className="mt-4 inline-flex items-center justify-center rounded-[10px] bg-[#2f7f37] px-4 py-2.5 text-[0.82rem] font-semibold text-white transition hover:bg-[#286d30]"
                >
                  Continue
                </button>
              </div>
            ) : (
              <form className="mt-5" onSubmit={handleNewsletterSubmit}>
                <p className="text-[0.84rem] leading-6 text-[#5f6756]">
                  Enter your email if you&apos;d like newsletters, new menu
                  alerts, and special updates from 360 Foods.
                </p>

                <label className="mt-4 block">
                  <span className="mb-1.5 block text-[0.7rem] font-medium uppercase tracking-[0.14em] text-[#6e7565]">
                    Email Address
                  </span>
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(event) => setNewsletterEmail(event.target.value)}
                    onBlur={() => setNewsletterTouched(true)}
                    placeholder="you@example.com"
                    className="w-full rounded-[12px] border border-[#d7e3d1] bg-[#f7fbf4] px-4 py-3 text-[0.86rem] text-[#1f261e] outline-none transition placeholder:text-[#98a18f] focus:border-[#2f7f37] focus:bg-white"
                  />
                </label>

                {newsletterTouched && !isEmailValid ? (
                  <p className="mt-2 text-[0.74rem] text-[#b63c2f]">
                    Enter a valid email address to subscribe.
                  </p>
                ) : null}

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    className="inline-flex flex-1 items-center justify-center rounded-[12px] bg-[#2f7f37] px-4 py-3 text-[0.84rem] font-semibold text-white transition hover:bg-[#286d30]"
                  >
                    Subscribe
                  </button>
                  <button
                    type="button"
                    onClick={handleSkipNewsletter}
                    className="inline-flex flex-1 items-center justify-center rounded-[12px] border border-[#d7e3d1] px-4 py-3 text-[0.84rem] font-semibold text-[#4e5849] transition hover:border-[#b8c9b4] hover:text-[#2f7f37]"
                  >
                    No thanks
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default Checkout
