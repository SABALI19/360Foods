const footerLinks = ['About Us', 'Delivery', 'Order Policies', 'Contact']

function Footer() {
  return (
    <footer className="mt-10 border-t border-t-[#2e7d32]/15 bg-[linear-gradient(180deg,#ffffff_0%,#f7fbf7_100%)]">
      <div className="mx-auto flex min-h-[98px] w-full max-w-[1180px] flex-col items-center justify-center px-4 py-6 text-center">
        <nav
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          aria-label="Footer"
        >
          {footerLinks.map((link) => (
            <a
              key={link}
              href="/"
              className="text-[0.82rem] font-medium text-[#111111]/72 no-underline transition-colors hover:text-[#2e7d32]"
              onClick={(event) => event.preventDefault()}
            >
              {link}
            </a>
          ))}
        </nav>
        <p className="mt-4 text-[0.75rem] text-[#111111]/38">
          2026 360Foods. All rights reserved
        </p>
        <p className="mt-4 text-[0.75rem] text-[#111111]/38">
          
        </p>
      </div>
    </footer>
  )
}

export default Footer
