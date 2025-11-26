import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'QA Assignment - Buggy E-Commerce Testing',
  description: 'Comprehensive QA testing suite with manual tests, bug reports, and Playwright automation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <div className="min-h-screen">
          <nav className="bg-primary text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold">QA Assignment Portal</h1>
              <div className="flex gap-6">
                <a href="/" className="hover:bg-opacity-80 px-3 py-2 rounded">Dashboard</a>
                <a href="/manual-tests" className="hover:bg-opacity-80 px-3 py-2 rounded">Manual Tests</a>
                <a href="/bug-reports" className="hover:bg-opacity-80 px-3 py-2 rounded">Bug Reports</a>
                <a href="/automation-suite" className="hover:bg-opacity-80 px-3 py-2 rounded">Automation</a>
              </div>
            </div>
          </nav>
          <main className="max-w-7xl mx-auto px-4 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
