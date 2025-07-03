import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Snippet",
  description: "Intelligent code snippet management",
  icons: {
    icon: '/favicon.ico',
  },
  metadataBase: new URL('https://ai-snippet.com'), // Replace with your actual domain
  openGraph: {
    title: "AI Snippet",
    description: "Intelligent code snippet management",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Snippet",
    description: "Intelligent code snippet management",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="
        font-sans 
        bg-gradient-to-br 
        from-gray-50 
        to-gray-100 
        text-gray-900 
        min-h-screen 
        flex 
        flex-col 
        antialiased 
        selection:bg-blue-100 
        selection:text-blue-800
        scroll-smooth
        max-w-screen-xl 
        mx-auto 
        px-4 
        sm:px-6 
        lg:px-8 
        py-8
        transition-colors 
        duration-300 
        ease-in-out
      ">
        <div className="
          fixed 
          inset-x-0 
          top-0 
          h-1 
          bg-gradient-to-r 
          from-blue-500 
          to-purple-600 
          z-50 
          animate-gradient-x
        "></div>

        <a
          href="#main-content"
          className="
            absolute 
            -top-full 
            left-4 
            bg-blue-600 
            text-white 
            px-4 
            py-2 
            rounded 
            transition-all 
            duration-300 
            focus:top-4 
            z-50
          "
        >
          Skip to main content
        </a>

        <main
          id="main-content"
          tabIndex={-1}
          className="
            flex-grow 
            w-full 
            max-w-4xl 
            mx-auto 
            bg-white 
            shadow-xl 
            rounded-2xl 
            p-6 
            md:p-8 
            lg:p-10 
            transition-all 
            duration-500 
            hover:shadow-2xl
          "
        >
          {children}
        </main>

        <footer
          className="
            text-center 
            text-gray-500 
            text-sm 
            py-6 
            mt-8 
            border-t 
            border-gray-200 
            bg-opacity-50 
            backdrop-blur-sm
          "
        >
          <div className="
            flex 
            flex-col 
            justify-center 
            items-center 
            max-w-4xl 
            mx-auto
          ">
            <p>© {new Date().getFullYear()} AI Snippet</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
