import type { Metadata } from "next";
import "./globals.css";
import NavbarClient from "@/components/NavbarClient";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "JastipHub | Premium Personal Shopper",
  description: "Your trusted platform for premium global goods. Request, Track, and Enjoy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CartProvider>
          <NavbarClient />
          <main className="main-content flex-grow">
            {children}
          </main>
          <footer className="glass-panel" style={{ padding: '2rem 0', marginTop: 'auto', borderRadius: '0', borderLeft: 'none', borderRight: 'none', borderBottom: 'none' }}>
            <div className="container" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
              <p>&copy; {new Date().getFullYear()} JastipHub Platform. All rights reserved.</p>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}

