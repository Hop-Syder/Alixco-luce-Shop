import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/layout/Footer";
import { AuthProvider } from "../context/AuthContext";
import { LanguageProvider } from "../context/LanguageContext";
import { Toaster } from "react-hot-toast";

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
        <LanguageProvider>
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
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
