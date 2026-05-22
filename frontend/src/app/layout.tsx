import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
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
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
