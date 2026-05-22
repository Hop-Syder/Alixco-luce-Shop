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
    <html lang="fr" className="h-full antialiased overflow-x-hidden">
      <body className="min-h-full flex flex-col overflow-x-hidden">
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
