'use client'
import { ThemeProvider } from 'next-themes'
import { Provider as JotaiProvider } from 'jotai'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <JotaiProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </JotaiProvider>
  )
}
