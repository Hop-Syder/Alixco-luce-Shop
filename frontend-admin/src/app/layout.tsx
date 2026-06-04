import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Alixco-luce Admin",
  description: "Administration du site Alixco-luce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="antialiased">
      <body className="min-h-screen flex flex-col bg-[hsl(var(--background))] text-[hsl(var(--text-main))]">
        <AuthProvider>
          <Toaster 
            position="top-center"
            toastOptions={{
              style: {
                background: '#1c1917',
                color: '#d6d3d1',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              },
              success: {
                iconTheme: {
                  primary: 'hsl(var(--primary))',
                  secondary: '#000000',
                },
              },
            }}
          />
          {/* Simple Admin Header */}
          <header className="bg-black text-white p-4 flex justify-between items-center border-b border-white/10">
            <Link href="/" className="text-2xl font-bold">Alixco<span className="text-[hsl(var(--primary))]">Admin</span></Link>
            <nav className="flex space-x-4">
              <Link href="/products" className="hover:text-[hsl(var(--primary))]">Produits</Link>
              <Link href="/categories" className="hover:text-[hsl(var(--primary))]">Catégories</Link>
              <Link href="/orders" className="hover:text-[hsl(var(--primary))]">Commandes</Link>
            </nav>
          </header>
          
          <main className="flex-grow p-6">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
