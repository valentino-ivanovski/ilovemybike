import { Manrope } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { ToastProvider } from "@/contexts/ToastContext";
import NewHeader from "@/components/NewHeader";
import Footer from "@/components/Footer";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "I 💚 MY BIKE",
  description: "Your bike site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={manrope.className}>
        <ToastProvider>
          <CartProvider>
            <NewHeader />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
