import './globals.css';
import type { Metadata } from 'next';
import { Bricolage_Grotesque, DM_Mono, Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['300', '400', '500'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const iconUrl = `https://res.cloudinary.com/${cloudName}/image/upload/v1744870439/qy3rpcppyfp6cs4nwv52.png`;

export const metadata: Metadata = {
  title: 'Rashad Salaam — Staff iOS Engineer + AI Automation',
  description:
    'Penn Medicine CIO 100 Award recipient. Published researcher. 10+ years shipping enterprise iOS. Salaam Solutions LLC.',
  icons: { icon: iconUrl, shortcut: iconUrl, apple: iconUrl },
  openGraph: {
    title: 'Rashad Salaam — Staff iOS Engineer + AI Automation',
    description:
      'Penn Medicine CIO 100 Award recipient. Published researcher. 10+ years shipping enterprise iOS.',
    type: 'website',
    url: 'https://www.rashadsalaam.com',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="dark"
      suppressHydrationWarning
      style={{ colorScheme: 'dark' }}
    >
      <body
        className={`${bricolage.variable} ${dmMono.variable} ${inter.variable} font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>

      </body>
    </html>
  );
}
