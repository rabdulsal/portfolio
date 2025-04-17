import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const iconUrl = `https://res.cloudinary.com/${cloudName}/image/upload/v1744870439/qy3rpcppyfp6cs4nwv52.png`;

export const metadata: Metadata = {
  title: 'Rashad Abdul-Salaam | Web & Mobile Engineer',
  description: 'Web and mobile engineer helping businesses grow with AI and automation.',
  icons: {
    icon: iconUrl,
    shortcut: iconUrl,
    apple: iconUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      
      <body className={inter.className}>
        
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>

        {/* Botpress Webchat */}
        <script src="https://cdn.botpress.cloud/webchat/v2.2/inject.js"></script>
        <script src="https://files.bpcontent.cloud/2025/03/09/22/20250309224320-1WWO1AQF.js"></script>
      </body>
    </html>
  );
}