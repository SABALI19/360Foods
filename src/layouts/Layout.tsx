import type { ReactNode } from 'react'
import Footer from '../components/Footer'
import Header from '../components/ui/Header'

type LayoutProps = {
  children?: ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen w-full bg-[radial-gradient(circle_at_top,rgba(46,125,50,0.14),transparent_36%),linear-gradient(180deg,#f7fbf7_0%,#ffffff_48%)]">
      <Header />
      <main className="w-full">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
