import type { Metadata } from 'next';
import { Inter, DM_Sans } from 'next/font/google';
import { ThemeProvider } from '@/lib/theme-context';
import { Nav } from '@/components/nav';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ComPsych Mobile Design System',
  description: 'Live visual reference for the ComPsych Mobile Design System.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSans.variable}`}>
      <body data-theme="compsych-gro">
        <ThemeProvider>
          <div className="flex min-h-screen">
            <Nav />
            <div className="flex-1 min-w-0 flex flex-col">
              <main className="flex-1 px-10 py-12 max-w-6xl w-full">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
