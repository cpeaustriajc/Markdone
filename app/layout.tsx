import "./globals.css";
import { Inter, Roboto_Mono } from "next/font/google";

export const metadata = {
  title: "Markdone | Get more things done with Markdone!",
  icons: {
    apple: {
      sizes: "180x180",
      url: "/apple-touch-icon.png",
    },
    icon: [
      {
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
      {
        type: "image/png",
        sizes: "16x16",
        url: "/favicon-16x16.png",
      },
      {
        type: "image/x-icon",
        url: "/favicon.ico",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-inter",
});

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto_mono.variable}`}>
      <body className="dark:bg-slate-900 bg-white text-slate-800 dark:text-slate-200">
        {children}
      </body>
    </html>
  );
}
