import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/layout/Footer";
import { AuthProvider } from "../context/AuthContext";

export const metadata: Metadata = {
  title: "Alixco-luce Shop",
  description: "L'artisanat du luxe",
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
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
