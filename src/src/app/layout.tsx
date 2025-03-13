import '@/styles/globals.css';
import { Inter, Poppins } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { Metadata } from 'next';
import { StateProvider } from '@/lib/contexts/state';
import ParallaxProvider from '@/lib/parallax';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'ICP.Hub Philippines',
  description: 'Where Ideas Transform into Innovations on the Internet Computer.',
  keywords: ['icp.hub', 'internet computer'],
  openGraph: {
    title: 'ICP.Hub Philippines',
    description: 'Where Ideas Transform into Innovations on the Internet Computer.',
    images: ['/logo/colored-white.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ICP Hub Philippines',
    description: 'Where Ideas Transform into Innovations on the Internet Computer.',
    images: ['/logo/colored-white.png'],
  },
  icons: {
    icon: '/logo/icon.png',
    shortcut: '/logo/icon.png',
    apple: '/logo/icon.png',
  },
  category: 'computer',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} scroll-smooth`}>
        <ParallaxProvider>
          <StateProvider>{children}</StateProvider>
        </ParallaxProvider>
        <Toaster />
      </body>
    </html>
  );
}
