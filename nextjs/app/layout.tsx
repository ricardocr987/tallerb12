import type { Metadata } from 'next'
import './globals.css'
import { SolanaContextProvider } from './contexts/SolanaProvider'

export const metadata: Metadata = {
  title: 'ExampleStore',
  description: 'Example store by ricardocr98',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body className={`bg-gray-50 text-gray-950 relative dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90`}>
        <SolanaContextProvider>{children}</SolanaContextProvider>
      </body>
    </html>
  )
}
