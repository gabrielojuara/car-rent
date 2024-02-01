import { Footer, Navbar } from '@/components'

import './globals.css'

export const metadata = {
  title: 'RentWheels',
  description: 'Procure e encontre os melhores veículos para você.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-Br">
      <body className="relative">
        <Navbar />
        {children}
        <Footer />
        </body>
    </html>
  )
}
