import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Sunil | Data Engineer Portfolio',
  description: 'Data Engineer specializing in real-time streaming pipelines, Kafka, Spark, and cloud-native data platforms. AWS & Databricks certified.',
  generator: 'Sunilkumar',
  icons: {
    icon: [
      {
        url: '../public/images/profile.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '../public/images/profile.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '../public/images/profile.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '../public/images/profile.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
