import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Suspense } from "react";
import Loading from "./loading";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "CoinVerse",
  description: "CryptoCurrency App",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={<Loading />}>
          {/* Toast container to handle toast notifications globally */}
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={true}
          />

          {/* ThemeProvider for theme control */}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
              <Navbar />
              {children}
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
