import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter, Instrument_Serif } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://str-s.dev'),
  title: {
    template: '%s | STR',
    default: 'STR (str-s) — SVG to React + Tailwind, Everywhere',
  },
  description:
    'The smallest and fastest SVG to React + Tailwind converter, purpose-built for icons with zero runtime dependencies.',
  authors: [{ name: '@everywhereayush', url: 'https://x.com/everywhereayush' }],
  icons: {
    icon: '/str-logo.svg',
    shortcut: '/str-logo.svg',
    apple: '/str-logo.png',
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${inter.className} ${inter.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
